import { useState, useEffect } from 'react';

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

  return (
    <div className="w-[335px] flex-shrink-0">
      {/* Top section - white */}
      <div
        className="p-4"
        style={{
          backgroundColor: '#fff',
          borderRadius: '10px 10px 0 0',
          boxShadow: '0 0 12px 0 rgba(0,0,0,0.2)',
        }}
      >
        <h2
          style={{
            color: '#141414',
            fontSize: '1.41176471rem',
            lineHeight: '1.25',
            margin: 0,
            fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
            fontWeight: 400,
          }}
        >
          {greeting}
        </h2>
        <span
          style={{
            color: '#787070',
            display: 'inline-block',
            fontSize: '0.88235294rem',
            margin: '5px 0 10px',
            fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
          }}
        >
          Sign on to manage your accounts.
        </span>

        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          {/* Username */}
          <div
            className="mb-2.5 relative flex flex-col"
            style={{ border: '1px solid #141414', borderRadius: '3px' }}
          >
            <label
              htmlFor="userid"
              className="block"
              style={{
                color: '#787070',
                fontSize: '0.76470588rem',
                padding: '4px 16px 0',
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                backgroundColor: '#f9f7f6',
              }}
            >
              Username
            </label>
            <input
              type="text"
              id="userid"
              className="outline-none"
              style={{
                border: 'none',
                borderBottom: '1px solid #787070',
                height: '30px',
                padding: '0 16px',
                fontSize: '20px',
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                color: '#141414',
                width: '100%',
              }}
            />
          </div>

          {/* Password */}
          <div
            className="mb-2.5 relative flex flex-col"
            style={{ border: '1px solid #141414', borderRadius: '3px' }}
          >
            <label
              htmlFor="password"
              className="block"
              style={{
                color: '#787070',
                fontSize: '0.76470588rem',
                padding: '4px 16px 0',
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                backgroundColor: '#f9f7f6',
              }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="outline-none w-full"
                style={{
                  border: 'none',
                  borderBottom: '1px solid #787070',
                  height: '30px',
                  padding: '0 80px 0 16px',
                  fontSize: '20px',
                  fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                  color: '#141414',
                }}
              />
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{
                  color: '#5a469b',
                  fontSize: '0.88235294rem',
                  textDecoration: 'none',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </a>
            </div>
          </div>

          {/* Save username */}
          <div className="flex items-center gap-2 mt-5 mb-1 relative" style={{ left: '-16px' }}>
            <input type="checkbox" id="saveusername" className="w-[22px] h-[22px] accent-[#3b3331]" />
            <label
              htmlFor="saveusername"
              style={{
                color: '#3b3331',
                fontSize: '15px',
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
              }}
            >
              Save username
            </label>
          </div>

          {/* Sign On Button - pill shaped red */}
          <div className="pt-5 pb-4">
            <button
              type="submit"
              className="w-full cursor-pointer border-none"
              style={{
                backgroundColor: '#D71E28',
                color: '#fff',
                borderRadius: '24px',
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                lineHeight: '1.29',
                padding: '9px 16px',
                minWidth: '176px',
                textAlign: 'center',
              }}
            >
              Sign On
            </button>
            <a
              href="#"
              className="inline-block mt-3 no-underline hover:underline"
              style={{
                color: '#5a469b',
                fontSize: '15px',
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
              }}
            >
              Enroll
            </a>
          </div>
        </form>
      </div>

      {/* Bottom section - warm gray */}
      <div
        className="px-4 py-3"
        style={{
          backgroundColor: '#f4f0ed',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.2)',
        }}
      >
        <a
          href="#"
          className="block mb-1"
          style={{
            color: '#141414',
            fontSize: '15px',
            fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
            lineHeight: '1.466',
            textDecoration: 'none',
          }}
        >
          Sign on with a passkey
        </a>
        <a
          href="#"
          className="block mb-1"
          style={{
            color: '#141414',
            fontSize: '15px',
            fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
            lineHeight: '1.466',
            textDecoration: 'none',
          }}
        >
          Forgot username or password?
        </a>
        <a
          href="#"
          className="block"
          style={{
            color: '#141414',
            fontSize: '15px',
            fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
            lineHeight: '1.466',
            textDecoration: 'none',
          }}
        >
          Privacy, Cookies, and Legal
        </a>
      </div>
    </div>
  );
}
