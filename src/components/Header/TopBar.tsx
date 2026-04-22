import { useState } from 'react';

export default function TopBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkStyle: React.CSSProperties = {
    fontSize: '0.76470588rem',
    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
    color: '#fff',
    textDecoration: 'none',
    letterSpacing: 0,
    lineHeight: '1.231',
  };

  return (
    <header
      className="w-full relative"
      style={{ backgroundColor: '#D71E28', borderBottom: '4px solid #FFCD41' }}
    >
      <div
        className="max-w-[1400px] w-full mx-auto wf-section-px"
        style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {/* Logo */}
        <a className="flex items-center" style={{ textDecoration: 'none' }}>
          <img
            src="/logo/wf_logo_220x23.png"
            alt="Wells Fargo Home Page"
            style={{ height: '23px', width: 'auto', filter: 'brightness(0) invert(1)' }}
          />
        </a>

        {/* Right Nav */}
        <nav aria-label="Header Navigation" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/register" style={linkStyle} className="wf-hide-mobile hover:underline">Open an Account</a>
          <a style={linkStyle} className="wf-hide-mobile hover:underline">ATMs/Locations</a>
          <a style={linkStyle} className="wf-hide-mobile hover:underline">Help</a>
          <a style={linkStyle} className="wf-hide-mobile hover:underline" lang="es">Espa&ntilde;ol</a>
          <button
            aria-label="Search"
            type="button"
            style={{ color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}
            className="wf-hide-mobile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Sign On pill */}
          <div className="flex items-center justify-center rounded-full bg-white" style={{ minWidth: '80px', height: '36px' }}>
            <a
              style={{
                color: '#3b3331',
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                fontWeight: 600,
                fontSize: '0.88235294rem',
                lineHeight: '1.267',
                padding: '0 20px',
                textDecoration: 'none',
                textAlign: 'center',
                borderRadius: '24px',
              }}
              className="hover:underline"
            >
              Sign On
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="wf-mobile-only"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff', padding: '8px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="wf-mobile-only"
          style={{ backgroundColor: '#b01c24', padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.2)' }}
        >
          <a href="/register" style={{ ...linkStyle, display: 'block', padding: '10px 0', fontSize: '0.94rem' }}>Open an Account</a>
          <a style={{ ...linkStyle, display: 'block', padding: '10px 0', fontSize: '0.94rem' }}>ATMs/Locations</a>
          <a style={{ ...linkStyle, display: 'block', padding: '10px 0', fontSize: '0.94rem' }}>Help</a>
          <a style={{ ...linkStyle, display: 'block', padding: '10px 0', fontSize: '0.94rem' }} lang="es">Espa&ntilde;ol</a>
        </div>
      )}
    </header>
  );
}
