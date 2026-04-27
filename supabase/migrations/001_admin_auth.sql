-- =====================================================================
-- Admin auth migration: secure admin/superadmin credentials & operations
-- =====================================================================
-- Run this in Supabase SQL Editor (one-time).
--
-- What this does:
--   * Creates admin_users (bcrypted credentials) and admin_sessions (tokens)
--   * Locks both tables with RLS so the anon key cannot read/write them
--   * Adds SECURITY DEFINER RPCs that perform admin operations server-side
--     after verifying a session token
--   * Seeds the existing admin/superadmin credentials (rotate them after!)
--
-- After running:
--   1) The client only ever sees a session token (random hex), never the
--      plaintext password or password hash.
--   2) Admin reads/writes go through RPCs that re-verify the token on every
--      call, so tampering with sessionStorage on the browser does nothing.
-- =====================================================================

begin;

-- Make sure crypt/gen_salt/gen_random_bytes resolve whether pgcrypto lives
-- in `public` (older Supabase projects) or `extensions` (newer ones).
set local search_path = public, extensions;

create extension if not exists pgcrypto;

-- ---------- tables ----------------------------------------------------

create table if not exists public.admin_users (
  username      text primary key,
  password_hash text not null,
  role          text not null check (role in ('admin','superadmin')),
  created_at    timestamptz not null default now()
);

create table if not exists public.admin_sessions (
  token       text primary key,
  username    text not null references public.admin_users(username) on delete cascade,
  role        text not null check (role in ('admin','superadmin')),
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null
);

-- Lock down both tables: RLS on, no policies => anon/authenticated cannot
-- read or write directly. Only SECURITY DEFINER functions below can touch
-- them.
alter table public.admin_users    enable row level security;
alter table public.admin_sessions enable row level security;

-- Revoke direct table access (defence-in-depth in case RLS is bypassed)
revoke all on public.admin_users    from anon, authenticated;
revoke all on public.admin_sessions from anon, authenticated;

-- ---------- internal helper: resolve token -> role --------------------

create or replace function public._admin_role_for_token(p_token text)
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_role text;
begin
  if p_token is null or length(p_token) < 32 then
    return null;
  end if;
  -- Opportunistic cleanup of expired sessions
  delete from admin_sessions where expires_at < now();
  select role into v_role
  from admin_sessions
  where token = p_token and expires_at > now();
  return v_role;
end;
$$;
revoke all on function public._admin_role_for_token(text) from public;

-- ---------- public RPCs -----------------------------------------------

-- LOGIN: returns (token, role) on success, empty result on failure.
create or replace function public.admin_login(p_username text, p_password text)
returns table(token text, role text)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_user admin_users%rowtype;
  v_token text;
begin
  select * into v_user from admin_users where username = p_username;
  if not found then
    -- constant-time-ish: still do a dummy crypt to reduce timing leak
    perform crypt(p_password, gen_salt('bf'));
    return;
  end if;
  if v_user.password_hash <> crypt(p_password, v_user.password_hash) then
    return;
  end if;
  v_token := encode(gen_random_bytes(32), 'hex');
  insert into admin_sessions(token, username, role, expires_at)
    values (v_token, v_user.username, v_user.role, now() + interval '12 hours');
  return query select v_token, v_user.role;
end;
$$;
grant execute on function public.admin_login(text, text) to anon, authenticated;

-- LOGOUT
create or replace function public.admin_logout(p_token text)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  delete from admin_sessions where token = p_token;
end;
$$;
grant execute on function public.admin_logout(text) to anon, authenticated;

-- VERIFY SESSION (used by client to gate UI; not a security boundary)
create or replace function public.admin_session_role(p_token text)
returns text
language sql
security definer
set search_path = public, extensions
as $$
  select public._admin_role_for_token(p_token);
$$;
grant execute on function public.admin_session_role(text) to anon, authenticated;

-- LOOKUP CLIENT (admin or superadmin): identifier + password_hash -> user row
create or replace function public.admin_lookup_client(
  p_token text, p_identifier text, p_password_hash text
)
returns table(
  id uuid, full_name text, advisory_custodian text, dob text, address text,
  phone text, email text, ssn text, username text,
  checking_balance numeric, investment_balance numeric, created_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_role text := public._admin_role_for_token(p_token);
begin
  if v_role is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  return query
    select u.id, u.full_name, u.advisory_custodian, u.dob, u.address,
           u.phone, u.email, u.ssn, u.username,
           u.checking_balance, u.investment_balance, u.created_at
    from public.users u
    where (u.username = p_identifier or u.email = p_identifier or u.phone = p_identifier)
      and u.password_hash = p_password_hash
    limit 1;
end;
$$;
grant execute on function public.admin_lookup_client(text, text, text) to anon, authenticated;

-- GET CLIENT BY ID (admin or superadmin)
create or replace function public.admin_get_client(p_token text, p_user_id uuid)
returns table(
  id uuid, full_name text, advisory_custodian text, dob text, address text,
  phone text, email text, ssn text, username text,
  checking_balance numeric, investment_balance numeric, created_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_role text := public._admin_role_for_token(p_token);
begin
  if v_role is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  return query
    select u.id, u.full_name, u.advisory_custodian, u.dob, u.address,
           u.phone, u.email, u.ssn, u.username,
           u.checking_balance, u.investment_balance, u.created_at
    from public.users u
    where u.id = p_user_id
    limit 1;
end;
$$;
grant execute on function public.admin_get_client(text, uuid) to anon, authenticated;

-- LIST CLIENT TRANSACTIONS
create or replace function public.admin_get_client_transactions(p_token text, p_user_id uuid)
returns setof public.transactions
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_role text := public._admin_role_for_token(p_token);
begin
  if v_role is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  return query
    select * from public.transactions
    where user_id = p_user_id
    order by date desc, created_at desc;
end;
$$;
grant execute on function public.admin_get_client_transactions(text, uuid) to anon, authenticated;

-- RECENT USERS (superadmin only): minimal fields
create or replace function public.admin_recent_users(p_token text)
returns table(id uuid, full_name text, email text, phone text, username text, created_at timestamptz)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_role text := public._admin_role_for_token(p_token);
begin
  if v_role <> 'superadmin' then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  return query
    select u.id, u.full_name, u.email, u.phone, u.username, u.created_at
    from public.users u
    order by u.created_at desc
    limit 10;
end;
$$;
grant execute on function public.admin_recent_users(text) to anon, authenticated;

-- EXPORT USERS (superadmin only): full export for CSV
create or replace function public.admin_export_users(p_token text)
returns table(
  id uuid, full_name text, email text, phone text, username text,
  dob text, address text, advisory_custodian text,
  checking_balance numeric, investment_balance numeric, created_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_role text := public._admin_role_for_token(p_token);
begin
  if v_role <> 'superadmin' then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  return query
    select u.id, u.full_name, u.email, u.phone, u.username,
           u.dob, u.address, u.advisory_custodian,
           u.checking_balance, u.investment_balance, u.created_at
    from public.users u
    order by u.created_at desc;
end;
$$;
grant execute on function public.admin_export_users(text) to anon, authenticated;

-- DELETE USER (superadmin only)
create or replace function public.admin_delete_user(p_token text, p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_role text := public._admin_role_for_token(p_token);
begin
  if v_role <> 'superadmin' then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  delete from public.users where id = p_user_id;
end;
$$;
grant execute on function public.admin_delete_user(text, uuid) to anon, authenticated;

-- DELETE TRANSACTION (admin or superadmin)
create or replace function public.admin_delete_transaction(p_token text, p_txn_id uuid)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_role text := public._admin_role_for_token(p_token);
begin
  if v_role is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  delete from public.transactions where id = p_txn_id;
end;
$$;
grant execute on function public.admin_delete_transaction(text, uuid) to anon, authenticated;

-- INSERT TRANSACTION (admin or superadmin), optionally adjust balance
create or replace function public.admin_insert_transaction(
  p_token text,
  p_user_id uuid,
  p_account text,
  p_description text,
  p_amount numeric,
  p_date text,
  p_adjust_balance boolean
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_role text := public._admin_role_for_token(p_token);
begin
  if v_role is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  if p_account not in ('checking', 'investment') then
    raise exception 'invalid account';
  end if;
  insert into public.transactions(user_id, account_type, description, amount, date)
    values (p_user_id, p_account, p_description, p_amount, p_date);
  if p_adjust_balance then
    if p_account = 'checking' then
      update public.users
        set checking_balance = coalesce(checking_balance, 0) + p_amount
        where id = p_user_id;
    else
      update public.users
        set investment_balance = coalesce(investment_balance, 0) + p_amount
        where id = p_user_id;
    end if;
  end if;
end;
$$;
grant execute on function public.admin_insert_transaction(text, uuid, text, text, numeric, text, boolean) to anon, authenticated;

-- UPDATE BALANCES (admin or superadmin)
create or replace function public.admin_update_balances(
  p_token text, p_user_id uuid, p_checking numeric, p_investment numeric
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_role text := public._admin_role_for_token(p_token);
begin
  if v_role is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  update public.users
    set checking_balance = p_checking, investment_balance = p_investment
    where id = p_user_id;
end;
$$;
grant execute on function public.admin_update_balances(text, uuid, numeric, numeric) to anon, authenticated;

-- ---------- seed ------------------------------------------------------
-- Seeds the existing credentials so the app keeps working immediately.
-- ROTATE THESE AFTER MIGRATION: see "rotate password" example at the bottom.

insert into public.admin_users(username, password_hash, role) values
  ('admin',      crypt('admin123',   gen_salt('bf')), 'admin'),
  ('superadmin', crypt('supreme123', gen_salt('bf')), 'superadmin')
on conflict (username) do nothing;

commit;

-- ---------- how to rotate a password ----------------------------------
-- (run with the same search_path; if it errors, prefix with `extensions.`)
-- update public.admin_users
--   set password_hash = crypt('your-new-strong-password', gen_salt('bf'))
--   where username = 'admin';
