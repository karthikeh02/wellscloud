// Admin/superadmin auth.
// Credentials live in Supabase (admin_users table, bcrypted). Login goes
// through the admin_login RPC, which returns a session token. Every admin
// operation calls a SECURITY DEFINER RPC that re-verifies the token, so
// tampering with sessionStorage on the client cannot grant access.

import { supabase } from './supabase';

export type AdminRole = 'admin' | 'superadmin';

const TOKEN_KEY = 'wf_admin_token';
const ROLE_KEY = 'wf_admin_role'; // UI hint only — not a security boundary

export function getAdminToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getCachedAdminRole(): AdminRole | null {
  const r = sessionStorage.getItem(ROLE_KEY);
  return r === 'admin' || r === 'superadmin' ? r : null;
}

export function clearAdminSession() {
  const token = getAdminToken();
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(ROLE_KEY);
  if (token) {
    supabase.rpc('admin_logout', { p_token: token }).then(() => {}, () => {});
  }
}

/** Attempt to log in as the given role. Returns true on success. */
export async function loginAdmin(
  role: AdminRole,
  username: string,
  password: string,
): Promise<boolean> {
  const { data, error } = await supabase.rpc('admin_login', {
    p_username: username,
    p_password: password,
  });
  if (error || !data || (Array.isArray(data) && data.length === 0)) return false;
  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.token || !row?.role) return false;
  if (row.role !== role && !(role === 'admin' && row.role === 'superadmin')) {
    // user logged in with weaker creds than the page requires
    return false;
  }
  sessionStorage.setItem(TOKEN_KEY, row.token);
  sessionStorage.setItem(ROLE_KEY, row.role);
  return true;
}

/** Re-verify the stored token against the server. Returns the role or null. */
export async function verifyAdminSession(): Promise<AdminRole | null> {
  const token = getAdminToken();
  if (!token) return null;
  const { data, error } = await supabase.rpc('admin_session_role', { p_token: token });
  if (error) return null;
  if (data === 'admin' || data === 'superadmin') {
    sessionStorage.setItem(ROLE_KEY, data);
    return data;
  }
  // server says no — drop local state
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(ROLE_KEY);
  return null;
}

/** Call an admin RPC, auto-injecting the session token. */
export async function adminRpc<T = unknown>(
  fn: string,
  args: Record<string, unknown> = {},
): Promise<{ data: T | null; error: { message: string } | null }> {
  const token = getAdminToken();
  if (!token) return { data: null, error: { message: 'Not signed in.' } };
  const { data, error } = await supabase.rpc(fn, { p_token: token, ...args });
  return { data: (data as T) ?? null, error: error ? { message: error.message } : null };
}
