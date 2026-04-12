import { useState, useEffect } from 'react';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 3 && hour <= 11) return 'Good morning';
  if (hour >= 12 && hour <= 17) return 'Good afternoon';
  return 'Good evening';
}

export default function SignOnBox() {
  const [greeting, setGreeting] = useState(getGreeting());
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  const inputStyle: React.CSSProperties = {
    border: 'none', borderBottom: '1px solid #787070', height: '36px',
    padding: '0 16px', fontSize: '20px', fontFamily: f, color: '#141414',
    width: '100%', backgroundColor: '#fff', outline: 'none',
  };

  return (
    <div style={{ width: '335px', flexShrink: 0 }}>
      {/* Top section - white */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '10px 10px 0 0',
          boxShadow: '0 0 12px 0 rgba(0,0,0,0.2)',
          padding: '16px 16px 16px',
        }}
      >
        <h2 style={{ color: '#141414', fontSize: '1.41176471rem', lineHeight: '1.25', margin: 0, fontFamily: f, fontWeight: 400 }}>
          {greeting}
        </h2>
        <span style={{ color: '#787070', display: 'inline-block', fontSize: '0.88235294rem', margin: '5px 0 14px', fontFamily: f }}>
          Sign on to manage your accounts.
        </span>

        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          {/* Username - no box border, just bottom line */}
          <div className="mb-5">
            <label htmlFor="userid" className="block" style={{
              color: '#787070', fontSize: '0.76470588rem', padding: '0 0 2px',
              fontFamily: f,
            }}>
              Username
            </label>
            <input type="text" id="userid" style={inputStyle} />
          </div>

          {/* Password - no box border, just bottom line */}
          <div className="mb-4">
            <label htmlFor="password" className="block" style={{
              color: '#787070', fontSize: '0.76470588rem', padding: '0 0 2px',
              fontFamily: f,
            }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                style={{ ...inputStyle, paddingRight: '80px' }}
              />
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:underline"
                style={{ color: '#5a469b', fontSize: '0.88235294rem', textDecoration: 'underline' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </a>
            </div>
          </div>

          {/* Save username */}
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="saveusername"
              style={{ width: '22px', height: '22px', accentColor: '#3b3331', cursor: 'pointer' }}
            />
            <label htmlFor="saveusername" style={{ color: '#3b3331', fontSize: '15px', fontFamily: f }}>
              Save username
            </label>
          </div>

          {/* Sign On Button + Enroll side by side */}
          <div className="flex items-center gap-4" style={{ paddingTop: '16px', paddingBottom: '12px' }}>
            <button
              type="submit"
              className="cursor-pointer"
              style={{
                backgroundColor: '#D71E28', color: '#fff', borderRadius: '24px',
                fontFamily: f, fontWeight: 600, fontSize: '1rem', lineHeight: '1.29',
                padding: '9px 32px', textAlign: 'center', border: 'none',
                minWidth: '160px',
              }}
            >
              Sign On
            </button>
            <a
              href="#"
              className="hover:underline"
              style={{ color: '#5a469b', fontSize: '15px', fontFamily: f, textDecoration: 'none' }}
            >
              Enroll
            </a>
          </div>
        </form>
      </div>

      {/* Bottom section - warm gray, BLACK links, NO chevrons */}
      <div
        style={{
          backgroundColor: '#f4f0ed',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.2)',
          padding: '12px 16px 16px',
        }}
      >
        <a href="#" className="block mb-1 hover:underline" style={{
          color: '#141414', fontSize: '15px', fontFamily: f, lineHeight: '1.466', textDecoration: 'none',
        }}>
          Sign on with a passkey
        </a>
        <a href="#" className="block mb-1 hover:underline" style={{
          color: '#141414', fontSize: '15px', fontFamily: f, lineHeight: '1.466', textDecoration: 'none',
        }}>
          Forgot username or password?
        </a>
        <a href="#" className="block hover:underline" style={{
          color: '#141414', fontSize: '15px', fontFamily: f, lineHeight: '1.466', textDecoration: 'none',
        }}>
          Privacy, Cookies, and Legal
        </a>
      </div>
    </div>
  );
}
