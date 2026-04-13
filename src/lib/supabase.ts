import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !anonKey) {
  // Don't throw — just warn so the app still renders during setup
  console.warn('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-key',
);

export interface User {
  id: string;
  full_name: string | null;
  advisory_custodian: string | null;
  dob: string | null;
  address: string | null;
  phone: string | null;
  email: string;
  ssn: string | null;
  username: string;
  password_hash: string;
  checking_balance: number;
  investment_balance: number;
  created_at: string;
}

export type NewUser = Omit<User, 'id' | 'checking_balance' | 'investment_balance' | 'created_at'>;

export type AccountType = 'checking' | 'investment';

export interface Transaction {
  id: string;
  user_id: string;
  account_type: AccountType;
  description: string;
  amount: number;
  date: string;
  created_at: string;
}

export type NewTransaction = Omit<Transaction, 'id' | 'created_at'>;
