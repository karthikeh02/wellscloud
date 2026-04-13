import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, type User } from '../lib/supabase';
import { hashPassword } from '../lib/session';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;
const ADMIN_AUTH_KEY = 'wf_admin_auth';

export default function Admin() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(ADMIN_AUTH_KEY) === '1');

  if (!authed) {
    return <AdminLogin onSuccess={() => { sessionStorage.setItem(ADMIN_AUTH_KEY, '1'); setAuthed(true); }} onBack={() => navigate('/')} />;
  }

  return <AdminLookup onLogout={() => { sessionStorage.removeItem(ADMIN_AUTH_KEY); setAuthed(false); }} onHome={() => navigate('/')} />;
}

function AdminLogin({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ADMIN_PASSWORD) {
      setError('VITE_ADMIN_PASSWORD is not set in .env');
      return;
    }
    if (password === ADMIN_PASSWORD) onSuccess();
    else setError('Incorrect password.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: f, backgroundColor: '#f2f2f2' }}>
      <AdminHeader onHome={onBack} title="Admin" rightAction={null} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#fff', borderRadius: '12px', padding: '32px',
          maxWidth: '400px', width: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}>
          <h1 style={{ fontFamily: f, fontSize: '1.6rem', color: '#141414', margin: '0 0 8px', fontWeight: 400 }}>Admin Access</h1>
          <p style={{ fontFamily: f, fontSize: '0.88rem', color: '#555', margin: '0 0 20px' }}>
            Enter the admin password to continue.
          </p>
          {error && <ErrorBanner>{error}</ErrorBanner>}
          <label htmlFor="adminpw" style={{ display: 'block', fontSize: '0.82rem', color: '#555', marginBottom: '6px' }}>Password</label>
          <input
            id="adminpw" type="password" autoFocus required
            value={password} onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={primaryBtn}>Continue</button>
        </form>
      </div>
    </div>
  );
}

function AdminLookup({ onLogout, onHome }: { onLogout: () => void; onHome: () => void }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [looking, setLooking] = useState(false);
  const [recent, setRecent] = useState<User[]>([]);

  useEffect(() => {
    supabase.from('users').select('*').order('created_at', { ascending: false }).limit(10).then(({ data }) => {
      if (data) setRecent(data as User[]);
    });
  }, []);

  const handleLookup = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLooking(true);
    try {
      const hash = await hashPassword(form.password);
      const { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('username', form.username)
        .eq('email', form.email)
        .eq('phone', form.phone)
        .eq('password_hash', hash)
        .maybeSingle();
      setLooking(false);
      if (dbError) {
        setError(dbError.message);
        return;
      }
      if (!data) {
        setError('No user matches all four fields. Double-check the registration email.');
        return;
      }
      navigate(`/admin/client/${data.id}`);
    } catch (err) {
      console.error(err);
      setError('Lookup failed. Please try again.');
      setLooking(false);
    }
  };

  const exportCSV = async () => {
    const { data, error: dbError } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    if (dbError || !data) {
      setError(dbError?.message || 'Failed to fetch users for export.');
      return;
    }
    const header = ['id', 'full_name', 'email', 'phone', 'username', 'dob', 'address', 'advisory_custodian', 'checking_balance', 'investment_balance', 'created_at'];
    const rows = (data as User[]).map((u) => header.map((k) => {
      const v = (u as unknown as Record<string, unknown>)[k];
      const s = v == null ? '' : String(v);
      return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(','));
    const csv = [header.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wellsfargo-users-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: f, backgroundColor: '#f2f2f2' }}>
      <AdminHeader
        onHome={onHome}
        title="Admin Dashboard"
        rightAction={
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button type="button" onClick={exportCSV} style={{ ...secondaryBtn, padding: '6px 16px', fontSize: '0.82rem' }}>
              Export CSV
            </button>
            <button type="button" onClick={onLogout} style={{ ...secondaryBtn, padding: '6px 16px', fontSize: '0.82rem' }}>
              Logout
            </button>
          </div>
        }
      />

      <div style={{ flex: 1 }} className="wf-section-px">
        <div className="max-w-[1200px] mx-auto" style={{ paddingTop: '32px', paddingBottom: '40px' }}>
          <h1 style={{ fontFamily: f, fontSize: '1.76rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', margin: '0 0 8px' }}>
            Look up a client
          </h1>
          <p style={{ fontFamily: f, fontSize: '0.94rem', color: '#555', margin: '0 0 20px' }}>
            Enter the client's registration details exactly as they appear in the onboarding email you received. All four fields must match.
          </p>

          {error && <ErrorBanner>{error}</ErrorBanner>}

          <form onSubmit={handleLookup} style={{
            backgroundColor: '#fff', borderRadius: '8px', padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '32px',
            display: 'grid', gap: '14px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}>
            <LabeledInput label="Username" value={form.username} onChange={(v) => setForm({ ...form, username: v })} required />
            <LabeledInput label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <LabeledInput label="Phone number" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
            <LabeledInput label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required />
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" disabled={looking} style={{ ...primaryBtn, width: 'auto', minWidth: '200px', opacity: looking ? 0.7 : 1 }}>
                {looking ? 'Looking up…' : 'Open client dashboard'}
              </button>
            </div>
          </form>

          <h2 style={{ fontFamily: f, fontSize: '1.17rem', fontWeight: 600, color: '#141414', margin: '0 0 12px' }}>
            Recent registrations
          </h2>
          {recent.length === 0 ? (
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', color: '#555', textAlign: 'center' }}>
              No users registered yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recent.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => navigate(`/admin/client/${u.id}`)}
                  style={{
                    textAlign: 'left', backgroundColor: '#fff', borderRadius: '6px',
                    padding: '12px 16px', border: '1px solid #e2dede', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                    fontFamily: f,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: '#141414', fontSize: '0.94rem' }}>
                      {u.full_name || u.username}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#555' }}>{u.email} · {u.phone} · {u.username}</div>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: '#5a469b', fontWeight: 600 }}>Open →</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- shared small components/styles ---------- */

export function AdminHeader({ onHome, title, rightAction }: { onHome: () => void; title: string; rightAction: React.ReactNode }) {
  return (
    <header style={{ backgroundColor: '#D71E28', borderBottom: '4px solid #FFCD41', height: '60px', display: 'flex', alignItems: 'center' }}>
      <div className="max-w-[1400px] mx-auto w-full wf-section-px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a onClick={onHome} style={{ cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="https://www17.wellsfargomedia.com/assets/images/rwd/wf_logo_220x23.png" alt="Wells Fargo" style={{ height: '20px', filter: 'brightness(0) invert(1)' }} />
          <span style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 600, borderLeft: '1px solid rgba(255,255,255,0.4)', paddingLeft: '12px' }}>
            {title}
          </span>
        </a>
        {rightAction}
      </div>
    </header>
  );
}

function LabeledInput({ label, value, onChange, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ fontSize: '0.76rem', color: '#555', marginBottom: '6px', fontFamily: f }}>{label}</div>
      <input
        type={type} value={value} required={required}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </label>
  );
}

export function ErrorBanner({ children }: { children: React.ReactNode }) {
  return (
    <div role="alert" style={{
      backgroundColor: '#FDECEA', border: '1px solid #F5C6CB', color: '#721C24',
      padding: '10px 14px', borderRadius: '6px', marginBottom: '16px',
      fontSize: '0.88rem', fontFamily: f,
    }}>
      {children}
    </div>
  );
}

export function SuccessBanner({ children }: { children: React.ReactNode }) {
  return (
    <div role="status" style={{
      backgroundColor: '#D4EDDA', border: '1px solid #C3E6CB', color: '#155724',
      padding: '10px 14px', borderRadius: '6px', marginBottom: '16px',
      fontSize: '0.88rem', fontFamily: f,
    }}>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', fontSize: '0.94rem',
  border: '1px solid #b5adad', borderRadius: '6px', outline: 'none',
  fontFamily: f, color: '#141414',
};

const primaryBtn: React.CSSProperties = {
  width: '100%', backgroundColor: '#D71E28', color: '#fff', border: 'none',
  borderRadius: '24px', fontFamily: f, fontWeight: 600, fontSize: '1rem',
  padding: '10px 32px', cursor: 'pointer',
};

const secondaryBtn: React.CSSProperties = {
  backgroundColor: '#fff', color: '#3b3331', border: 'none',
  borderRadius: '24px', fontWeight: 600, fontSize: '0.88rem',
  padding: '8px 20px', cursor: 'pointer',
};
