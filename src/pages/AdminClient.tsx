import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { User, Transaction, AccountType } from '../lib/supabase';
import { formatCurrency } from '../lib/session';
import { AdminHeader, ErrorBanner, SuccessBanner } from './Admin';
import { getCachedAdminRole, adminRpc } from '../lib/adminAuth';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

export default function AdminClient() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const role = getCachedAdminRole();
  const authed = role !== null;
  const isSuperAdmin = role === 'superadmin';
  const [user, setUser] = useState<User | null>(null);
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const backPath = isSuperAdmin ? '/superadmin' : '/admin';

  useEffect(() => {
    if (!authed) {
      navigate('/admin');
      return;
    }
    if (!id) return;
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  async function loadAll() {
    if (!id) return;
    setLoading(true);
    const [uRes, tRes] = await Promise.all([
      adminRpc<User[]>('admin_get_client', { p_user_id: id }),
      adminRpc<Transaction[]>('admin_get_client_transactions', { p_user_id: id }),
    ]);
    if (uRes.error) setError(uRes.error.message);
    setUser((Array.isArray(uRes.data) && uRes.data.length > 0 ? uRes.data[0] : null));
    if (tRes.error) setError(tRes.error.message);
    setTxns((tRes.data as Transaction[]) || []);
    setLoading(false);
  }

  if (!authed) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: f, backgroundColor: '#f2f2f2' }}>
      <AdminHeader
        onHome={() => navigate('/')}
        title="Client Dashboard"
        rightAction={
          <button type="button" onClick={() => navigate(backPath)} style={backBtn}>
            ← Back to lookup
          </button>
        }
      />

      <div style={{ flex: 1 }} className="wf-section-px">
        <div className="max-w-[1100px] mx-auto" style={{ paddingTop: '32px', paddingBottom: '40px' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#555' }}>Loading client…</div>
          ) : !user ? (
            <ErrorBanner>Client not found.</ErrorBanner>
          ) : (
            <>
              {error && <ErrorBanner>{error}</ErrorBanner>}
              {toast && <SuccessBanner>{toast}</SuccessBanner>}

              <ClientHeader user={user} canDelete={isSuperAdmin} onRefresh={loadAll} onToast={setToast} onError={setError} onDeleted={() => navigate(backPath)} />

              <BalanceEditor user={user} onSaved={() => { loadAll(); setToast('Balances updated'); }} onError={setError} />

              <AddTransactionForm userId={user.id} onAdded={() => { loadAll(); setToast('Transaction added'); }} onError={setError} />

              <TransactionsTable
                title="Checking transactions"
                transactions={txns.filter((t) => t.account_type === 'checking')}
                onDelete={async (txnId) => {
                  const { error: dErr } = await adminRpc('admin_delete_transaction', { p_txn_id: txnId });
                  if (dErr) setError(dErr.message); else { loadAll(); setToast('Transaction deleted'); }
                }}
              />

              <TransactionsTable
                title="Investment transactions"
                transactions={txns.filter((t) => t.account_type === 'investment')}
                onDelete={async (txnId) => {
                  const { error: dErr } = await adminRpc('admin_delete_transaction', { p_txn_id: txnId });
                  if (dErr) setError(dErr.message); else { loadAll(); setToast('Transaction deleted'); }
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Client header with name + delete ---------- */

function ClientHeader({ user, canDelete, onRefresh, onToast, onError, onDeleted }: {
  user: User; canDelete: boolean; onRefresh: () => void; onToast: (m: string) => void; onError: (m: string) => void; onDeleted: () => void;
}) {
  const handleDelete = async () => {
    if (!window.confirm(`Permanently delete ${user.username} (${user.email})?\nThis will also delete all their transactions.`)) return;
    const { error: dErr } = await adminRpc('admin_delete_user', { p_user_id: user.id });
    if (dErr) { onError(dErr.message); return; }
    onToast(`Deleted ${user.username}`);
    onDeleted();
  };

  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: '8px', padding: '20px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '20px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px',
    }}>
      <div>
        <h1 style={{ fontFamily: f, fontSize: '1.6rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', margin: '0 0 4px' }}>
          {user.full_name || user.username}
        </h1>
        <div style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.5 }}>
          <div>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
          <div>Username: {user.username}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="button" onClick={onRefresh} style={{ ...subtleBtn }}>Refresh</button>
        {canDelete && (
          <button type="button" onClick={handleDelete} style={{ ...subtleBtn, color: '#fff', backgroundColor: '#b01c24', border: 'none' }}>
            Delete user
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Balance editor ---------- */

function BalanceEditor({ user, onSaved, onError }: { user: User; onSaved: () => void; onError: (m: string) => void }) {
  const [checking, setChecking] = useState(String(user.checking_balance));
  const [investment, setInvestment] = useState(String(user.investment_balance));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setChecking(String(user.checking_balance));
    setInvestment(String(user.investment_balance));
  }, [user]);

  const dirty = Number(checking) !== Number(user.checking_balance) || Number(investment) !== Number(user.investment_balance);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await adminRpc('admin_update_balances', {
      p_user_id: user.id,
      p_checking: Number(checking) || 0,
      p_investment: Number(investment) || 0,
    });
    setSaving(false);
    if (error) onError(error.message); else onSaved();
  };

  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: '8px', padding: '20px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '20px',
    }}>
      <h2 style={{ fontFamily: f, fontSize: '1.1rem', fontWeight: 600, color: '#141414', margin: '0 0 12px' }}>
        Account balances
      </h2>
      <p style={{ fontSize: '0.82rem', color: '#555', margin: '0 0 16px' }}>
        Directly override the balances. This does NOT create a transaction. Use the "Add transaction" section below if you want to record it.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', alignItems: 'end' }}>
        <div>
          <div style={{ fontSize: '0.76rem', color: '#555', marginBottom: '4px' }}>Checking (current {formatCurrency(Number(user.checking_balance))})</div>
          <input type="number" step="0.01" value={checking} onChange={(e) => setChecking(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize: '0.76rem', color: '#555', marginBottom: '4px' }}>Investment (current {formatCurrency(Number(user.investment_balance))})</div>
          <input type="number" step="0.01" value={investment} onChange={(e) => setInvestment(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <button
            type="button" onClick={handleSave} disabled={!dirty || saving}
            style={{ ...primaryBtn, opacity: !dirty || saving ? 0.6 : 1, cursor: !dirty || saving ? 'not-allowed' : 'pointer' }}
          >
            {saving ? 'Saving…' : 'Save balances'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Add transaction form ---------- */

function AddTransactionForm({ userId, onAdded, onError }: { userId: string; onAdded: () => void; onError: (m: string) => void }) {
  const [account, setAccount] = useState<AccountType>('checking');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [adjustBalance, setAdjustBalance] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (isNaN(amt) || amt === 0) {
      onError('Amount must be a non-zero number (use a negative for a debit).');
      return;
    }
    setSaving(true);
    const { error: txnErr } = await adminRpc('admin_insert_transaction', {
      p_user_id: userId,
      p_account: account,
      p_description: description,
      p_amount: amt,
      p_date: date,
      p_adjust_balance: adjustBalance,
    });
    setSaving(false);
    if (txnErr) { onError(txnErr.message); return; }
    setDescription('');
    setAmount('');
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: '#fff', borderRadius: '8px', padding: '20px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '20px',
    }}>
      <h2 style={{ fontFamily: f, fontSize: '1.1rem', fontWeight: 600, color: '#141414', margin: '0 0 12px' }}>
        Add transaction
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
        <div>
          <div style={{ fontSize: '0.76rem', color: '#555', marginBottom: '4px' }}>Account</div>
          <select value={account} onChange={(e) => setAccount(e.target.value as AccountType)} style={inputStyle}>
            <option value="checking">Checking</option>
            <option value="investment">Investment</option>
          </select>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ fontSize: '0.76rem', color: '#555', marginBottom: '4px' }}>Description</div>
          <input type="text" required placeholder="e.g., Payroll deposit" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize: '0.76rem', color: '#555', marginBottom: '4px' }}>Amount (+ / −)</div>
          <input type="number" step="0.01" required placeholder="250 or -45.99" value={amount} onChange={(e) => setAmount(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize: '0.76rem', color: '#555', marginBottom: '4px' }}>Date</div>
          <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
        </div>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', fontSize: '0.88rem', color: '#3b3331', cursor: 'pointer' }}>
        <input type="checkbox" checked={adjustBalance} onChange={(e) => setAdjustBalance(e.target.checked)} style={{ width: 16, height: 16, accentColor: '#D71E28' }} />
        Also adjust the account balance by this amount
      </label>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
        <button type="submit" disabled={saving} style={{ ...primaryBtn, width: 'auto', minWidth: '180px', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Adding…' : 'Add transaction'}
        </button>
      </div>
    </form>
  );
}

/* ---------- Transactions table ---------- */

function TransactionsTable({ title, transactions, onDelete }: {
  title: string; transactions: Transaction[]; onDelete: (id: string) => void;
}) {
  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: '8px', padding: '20px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '20px',
    }}>
      <h2 style={{ fontFamily: f, fontSize: '1.1rem', fontWeight: 600, color: '#141414', margin: '0 0 12px' }}>
        {title} ({transactions.length})
      </h2>
      {transactions.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#555', margin: 0 }}>No transactions yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#555', borderBottom: '1px solid #e2dede' }}>
                <th style={{ padding: '8px 12px' }}>Date</th>
                <th style={{ padding: '8px 12px' }}>Description</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '8px 12px' }}></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid #f4f0ed' }}>
                  <td style={{ padding: '10px 12px', color: '#555', whiteSpace: 'nowrap' }}>{t.date}</td>
                  <td style={{ padding: '10px 12px', color: '#141414' }}>{t.description}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: Number(t.amount) >= 0 ? '#2e7d32' : '#b01c24' }}>
                    {Number(t.amount) >= 0 ? '+' : ''}{formatCurrency(Number(t.amount))}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                    <button
                      type="button" onClick={() => { if (window.confirm('Delete this transaction?')) onDelete(t.id); }}
                      style={{ background: 'transparent', border: 'none', color: '#b01c24', cursor: 'pointer', fontSize: '0.82rem' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------- shared styles ---------- */

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', fontSize: '0.94rem',
  border: '1px solid #b5adad', borderRadius: '6px', outline: 'none',
  fontFamily: f, color: '#141414', backgroundColor: '#fff',
};

const primaryBtn: React.CSSProperties = {
  width: '100%', backgroundColor: '#D71E28', color: '#fff', border: 'none',
  borderRadius: '24px', fontFamily: f, fontWeight: 600, fontSize: '0.94rem',
  padding: '10px 32px', cursor: 'pointer',
};

const subtleBtn: React.CSSProperties = {
  backgroundColor: '#fff', color: '#3b3331', border: '1px solid #3b3331',
  borderRadius: '24px', fontWeight: 600, fontSize: '0.82rem',
  padding: '6px 16px', cursor: 'pointer', fontFamily: f,
};

const backBtn: React.CSSProperties = {
  backgroundColor: '#fff', color: '#3b3331', border: 'none',
  borderRadius: '24px', fontWeight: 600, fontSize: '0.82rem',
  padding: '8px 20px', cursor: 'pointer', fontFamily: f,
};
