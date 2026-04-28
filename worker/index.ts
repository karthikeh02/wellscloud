interface Env {
  ASSETS: Fetcher;
  TURNSTILE_SECRET: string;
  TURNSTILE_SITE_KEY: string;
  CHALLENGE_AES_KEY_B64: string;
  CHALLENGE_RL?: KVNamespace;
}

const CHALLENGE_COOKIE = "__wc_chl";
const CHALLENGE_TTL_SECONDS = 600;
const CHALLENGE_PATH = "/_challenge";
const VERIFY_PATH = "/_challenge/verify";

const EXEMPT_PATH_PREFIXES = [
  "/_challenge",
  "/assets/",
  "/favicon",
  "/robots.txt",
  "/sitemap",
  "/manifest",
  "/sw.js",
];

const STATIC_EXTENSIONS = /\.(?:js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|eot|map|txt|xml|json)$/i;
const UA_BLOCK_SUBSTRINGS = [
  "headlesschrome",
  "python-requests",
  "curl/",
  "wget/",
  "go-http-client",
  "httpclient",
  "axios/",
  "scrapy",
  "selenium",
  "playwright",
  "puppeteer",
  "phantomjs",
  "google-safety",
  "safebrowsing",
  "sqlmap",
  "nmap",
  "masscan",
];
const UA_BLOCK_REGEXES = [
  /bot\b/i,
  /crawler/i,
  /spider/i,
  /scanner/i,
];

type ChallengePayload = {
  exp: number;
  jti: string;
  uah: string;
};

const RL_WINDOW_SECONDS = 60;
const RL_CHALLENGE_PAGE_MAX = 30;
const RL_VERIFY_FAIL_MAX = 10;
const RL_VERIFY_ATTEMPT_MAX = 20;

function getCookieValue(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(";")) {
    const [rawName, ...valueParts] = part.trim().split("=");
    if (rawName === name) {
      return decodeURIComponent(valueParts.join("="));
    }
  }
  return null;
}

function getClientKey(request: Request): string {
  const ip = request.headers.get("CF-Connecting-IP")?.trim();
  return ip && ip.length > 0 ? ip : "unknown";
}

async function incrementRateLimitCounter(
  env: Env,
  bucket: string,
  identity: string,
  limit: number,
  windowSeconds = RL_WINDOW_SECONDS,
): Promise<{ allowed: boolean; count: number }> {
  const kv = env.CHALLENGE_RL;
  // Keep this optional: if KV isn't bound yet, behavior remains unchanged.
  if (!kv) return { allowed: true, count: 0 };

  const window = Math.floor(Date.now() / 1000 / windowSeconds);
  const key = `rl:${bucket}:${identity}:${window}`;
  const currentRaw = await kv.get(key);
  const current = Number(currentRaw ?? "0");
  const next = Number.isFinite(current) ? current + 1 : 1;
  await kv.put(key, String(next), { expirationTtl: windowSeconds + 5 });
  return { allowed: next <= limit, count: next };
}

function uint8ToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) {
    binary += String.fromCharCode(b);
  }
  return btoa(binary);
}

function base64ToUint8(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function importAesKey(keyB64: string): Promise<CryptoKey> {
  const keyBytes = base64ToUint8(keyB64);
  return crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
}

async function sha256Base64Url(input: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return uint8ToBase64(new Uint8Array(digest))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function encryptPayload(
  payload: ChallengePayload,
  key: CryptoKey,
): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(payload));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintext,
  );

  const packed = new Uint8Array(iv.length + ciphertext.byteLength);
  packed.set(iv, 0);
  packed.set(new Uint8Array(ciphertext), iv.length);
  return uint8ToBase64(packed);
}

async function decryptPayload(
  token: string,
  key: CryptoKey,
): Promise<ChallengePayload | null> {
  try {
    const packed = base64ToUint8(token);
    if (packed.length <= 12) return null;
    const iv = packed.slice(0, 12);
    const ciphertext = packed.slice(12);
    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext,
    );
    return JSON.parse(
      new TextDecoder().decode(plaintext),
    ) as ChallengePayload;
  } catch {
    return null;
  }
}

function getSafeReturnPath(returnTo: string | null): string {
  if (!returnTo) return "/";
  if (!returnTo.startsWith("/")) return "/";
  if (returnTo.startsWith("//")) return "/";
  if (STATIC_EXTENSIONS.test(returnTo)) return "/";
  return returnTo;
}

function shouldBypassChallenge(request: Request, url: URL): boolean {
  if (request.method !== "GET") return true;
  if (EXEMPT_PATH_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
    return true;
  }
  if (STATIC_EXTENSIONS.test(url.pathname)) return true;
  const accept = request.headers.get("Accept") ?? "";
  return !accept.includes("text/html");
}

function getBlockedUserAgentRule(userAgent: string): string | null {
  const ua = userAgent.toLowerCase();
  for (const value of UA_BLOCK_SUBSTRINGS) {
    if (ua.includes(value)) {
      return `substring:${value}`;
    }
  }
  for (const pattern of UA_BLOCK_REGEXES) {
    if (pattern.test(userAgent)) {
      return `regex:${pattern.source}`;
    }
  }
  return null;
}

async function isChallengeCookieValid(
  request: Request,
  env: Env,
): Promise<boolean> {
  const cookieValue = getCookieValue(request, CHALLENGE_COOKIE);
  if (!cookieValue) return false;

  const key = await importAesKey(env.CHALLENGE_AES_KEY_B64);
  const payload = await decryptPayload(cookieValue, key);
  if (!payload?.exp || !payload?.uah) return false;

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) return false;

  const ua = request.headers.get("User-Agent") ?? "";
  const expectedUaHash = await sha256Base64Url(ua);
  return payload.uah === expectedUaHash;
}

function buildChallengePage(siteKey: string, returnPath: string): string {
  const safeReturn = returnPath.replace(/"/g, "&quot;");
  const safeSiteKey = siteKey.replace(/"/g, "&quot;");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Verification Required</title>
    <style>
      :root { color-scheme: light dark; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: Inter, system-ui, sans-serif;
        background: #0b1020;
        color: #e6ebff;
      }
      .card {
        width: min(92vw, 420px);
        background: #121a34;
        border: 1px solid #273258;
        border-radius: 12px;
        padding: 24px;
      }
      .card h1 { margin-top: 0; font-size: 1.2rem; }
      .hint { color: #b6c2ee; font-size: 0.92rem; }
      .status { margin-top: 12px; font-size: 0.92rem; color: #9db4ff; }
    </style>
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  </head>
  <body>
    <main class="card">
      <h1>Just one security check</h1>
      <p class="hint">We verify real visitors before loading the website.</p>
      <div
        class="cf-turnstile"
        data-sitekey="${safeSiteKey}"
        data-callback="onTurnstileSolved"
      ></div>
      <p id="status" class="status">Waiting for verification...</p>
    </main>
    <script>
      const returnTo = "${safeReturn}";
      async function onTurnstileSolved(token) {
        const status = document.getElementById("status");
        status.textContent = "Verification successful. Redirecting...";
        const res = await fetch("${VERIFY_PATH}", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token, returnTo })
        });
        if (res.redirected) {
          window.location.href = res.url;
          return;
        }
        if (res.status >= 200 && res.status < 400) {
          window.location.href = returnTo;
          return;
        }
        status.textContent = "Verification failed. Please refresh and retry.";
      }
      window.onTurnstileSolved = onTurnstileSolved;
    </script>
  </body>
</html>`;
}

async function handleChallengePage(request: Request, env: Env): Promise<Response> {
  const identity = getClientKey(request);
  const pageRl = await incrementRateLimitCounter(
    env,
    "challenge_page",
    identity,
    RL_CHALLENGE_PAGE_MAX,
  );
  if (!pageRl.allowed) {
    return new Response("too many challenge requests", {
      status: 429,
      headers: {
        "Cache-Control": "no-store",
        "Retry-After": String(RL_WINDOW_SECONDS),
      },
    });
  }

  const url = new URL(request.url);
  const returnPath = getSafeReturnPath(url.searchParams.get("return"));
  const html = buildChallengePage(env.TURNSTILE_SITE_KEY, returnPath);
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

async function handleChallengeVerify(request: Request, env: Env): Promise<Response> {
  const identity = getClientKey(request);
  const attemptRl = await incrementRateLimitCounter(
    env,
    "verify_attempt",
    identity,
    RL_VERIFY_ATTEMPT_MAX,
  );
  if (!attemptRl.allowed) {
    return new Response("too many verify attempts", {
      status: 429,
      headers: {
        "Cache-Control": "no-store",
        "Retry-After": String(RL_WINDOW_SECONDS),
      },
    });
  }

  let body: { token?: string; returnTo?: string } = {};
  try {
    body = await request.json<{ token?: string; returnTo?: string }>();
  } catch {
    return new Response("invalid payload", { status: 400 });
  }

  const token = body.token ?? "";
  if (!token) return new Response("missing token", { status: 400 });

  const ip = request.headers.get("CF-Connecting-IP") ?? "";
  const form = new FormData();
  form.set("secret", env.TURNSTILE_SECRET);
  form.set("response", token);
  if (ip) form.set("remoteip", ip);
  form.set("idempotency_key", crypto.randomUUID());

  const verifyResult = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: form,
    },
  );

  const verifyBody = (await verifyResult.json()) as {
    success?: boolean;
  };

  if (!verifyResult.ok || verifyBody.success !== true) {
    const failRl = await incrementRateLimitCounter(
      env,
      "verify_fail",
      identity,
      RL_VERIFY_FAIL_MAX,
    );
    if (!failRl.allowed) {
      return new Response("too many failed verifications", {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(RL_WINDOW_SECONDS),
        },
      });
    }
    return new Response("challenge verification failed", { status: 403 });
  }

  const key = await importAesKey(env.CHALLENGE_AES_KEY_B64);
  const ua = request.headers.get("User-Agent") ?? "";
  const uaHash = await sha256Base64Url(ua);
  const now = Math.floor(Date.now() / 1000);
  const payload: ChallengePayload = {
    exp: now + CHALLENGE_TTL_SECONDS,
    jti: crypto.randomUUID(),
    uah: uaHash,
  };
  const sealed = await encryptPayload(payload, key);

  const returnPath = getSafeReturnPath(body.returnTo ?? "/");
  const response = Response.redirect(new URL(returnPath, request.url), 302);
  response.headers.set(
    "Set-Cookie",
    `${CHALLENGE_COOKIE}=${encodeURIComponent(sealed)}; Path=/; Max-Age=${CHALLENGE_TTL_SECONDS}; HttpOnly; Secure; SameSite=Lax`,
  );
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") ?? "";
    const blockedRule = getBlockedUserAgentRule(userAgent);
    if (blockedRule) {
      console.log(
        JSON.stringify({
          event: "ua_blocked",
          rule: blockedRule,
          path: url.pathname,
          ip: request.headers.get("CF-Connecting-IP") ?? "",
          colo: request.cf?.colo ?? "",
        }),
      );
      return new Response("forbidden", {
        status: 403,
        headers: { "Cache-Control": "no-store" },
      });
    }

    if (url.pathname === CHALLENGE_PATH) {
      return handleChallengePage(request, env);
    }
    if (url.pathname === VERIFY_PATH && request.method === "POST") {
      return handleChallengeVerify(request, env);
    }

    if (!shouldBypassChallenge(request, url)) {
      const valid = await isChallengeCookieValid(request, env);
      if (!valid) {
        const ret = encodeURIComponent(`${url.pathname}${url.search}${url.hash}`);
        return Response.redirect(new URL(`${CHALLENGE_PATH}?return=${ret}`, url), 302);
      }
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
