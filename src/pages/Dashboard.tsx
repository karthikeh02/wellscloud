import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterHelp from '../components/Footer/FooterHelp';
import FooterLinks from '../components/Footer/FooterLinks';
import FooterDisclaimer from '../components/Footer/FooterDisclaimer';
import { getCurrentUser, logout, initials, formatCurrency } from '../lib/session';
import { supabase, type User, type Transaction } from '../lib/supabase';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

const toolIcons: Record<string, JSX.Element> = {
  spending: (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px', color: '#D71E28' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  goals: (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px', color: '#D71E28' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  mobile: (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px', color: '#D71E28' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  alerts: (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px', color: '#D71E28' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user + transactions on mount; poll every 15s so admin changes appear
  useEffect(() => {
    let active = true;
    async function load() {
      const u = await getCurrentUser();
      if (!active) return;
      if (!u) {
        navigate('/');
        return;
      }
      setUser(u);
      // Fetch only THIS user's transactions
      const { data: t } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', u.id)
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });
      if (!active) return;
      setTxns((t as Transaction[]) || []);
      setLoading(false);
    }
    load();
    const interval = setInterval(load, 15000);
    return () => { active = false; clearInterval(interval); };
  }, [navigate]);

  const handleSignOff = () => {
    logout();
    navigate('/');
  };

  // Close dropdown on Escape or click outside
  useEffect(() => {
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') setMenuOpen(false); }
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    if (menuOpen) {
      window.addEventListener('keydown', handleKey);
      window.addEventListener('mousedown', handleClick);
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [menuOpen]);

  if (loading || !user) {
    return <div className="wf-loading">Loading your accounts…</div>;
  }

  const userInitials = initials(user.full_name, user.username);
  const checkingStr = formatCurrency(Number(user.checking_balance));
  const investmentStr = formatCurrency(Number(user.investment_balance));

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: f }}>
      {/* Header */}
      <header style={{ backgroundColor: '#D71E28', borderBottom: '4px solid #FFCD41', height: '60px', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-[1400px] mx-auto w-full wf-section-px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ textDecoration: 'none' }}>
            <img src="https://www17.wellsfargomedia.com/assets/images/rwd/wf_logo_220x23.png" alt="Wells Fargo" width="180" height="20" style={{ height: '20px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button type="button" aria-label="Search" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '22px', height: '22px', color: '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <div className="wf-hide-mobile" style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
            <a href="/" onClick={(e) => { e.preventDefault(); handleSignOff(); }} className="wf-hide-mobile hover:underline" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Sign Off
            </a>
            <div className="wf-hide-mobile" style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
            <div ref={menuRef} style={{ position: 'relative' }}>
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                aria-label="User menu"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                  backgroundColor: menuOpen ? '#9c0b18' : 'transparent',
                  padding: '10px 14px', borderRadius: menuOpen ? '4px 4px 0 0' : '0',
                  transition: 'background-color 0.15s',
                  border: 'none',
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', color: '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="wf-welcome-text" style={{ color: '#fff', lineHeight: '1.2', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.76rem' }}>Welcome</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{userInitials}</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '14px', color: '#fff', transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {menuOpen && (
                <div role="menu" style={{
                  position: 'absolute', top: '100%', right: 0, backgroundColor: '#fff',
                  minWidth: '220px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  borderRadius: '0 0 4px 4px', zIndex: 1000, marginTop: '4px', overflow: 'hidden',
                }}>
                  {['Account', 'My Profile', 'Message Center', 'Locations', 'Language Preference'].map((item, i, arr) => (
                    <a
                      key={item}
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'block', padding: '14px 20px', color: '#141414',
                        fontSize: '0.94rem', fontFamily: f, textDecoration: 'none',
                        borderBottom: i < arr.length - 1 ? '1px solid #e2dede' : 'none',
                      }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <div className="max-w-[960px] mx-auto wf-section-px" style={{ paddingTop: '32px', paddingBottom: '40px' }}>
          <h1 style={{ fontFamily: f, fontSize: '1.76rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', margin: '0 0 24px' }}>
            Account Summary
          </h1>

          {/* Warning banner */}
          <div role="alert" style={{ backgroundColor: '#FFF3CD', border: '1px solid #F0E0A0', borderRadius: '4px', padding: '14px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.2rem' }} aria-hidden="true">⚠️</span>
            <span style={{ fontFamily: f, fontSize: '0.94rem', color: '#664D03' }}>
              Accounts under surveillance by the Department of Treasury.
            </span>
          </div>

          <AccountCard title="EVERYDAY CHECKING" balance={checkingStr} transactions={txns.filter((t) => t.account_type === 'checking')} />
          <AccountCard title="INVESTMENT" balance={investmentStr} transactions={txns.filter((t) => t.account_type === 'investment')} />

          {/* Quick Actions */}
          <div style={{ marginBottom: '32px', marginTop: '8px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Transfer & Pay', 'Deposit', 'Pay Bills', 'Wire Transfer', 'Zelle'].map((action) => (
                <a key={action} style={{
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
          <div className="wf-grid-3" style={{ backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '32px', gap: 0 }}>
            <div style={{ padding: '24px 20px', borderRight: '1px solid #e2dede' }}>
              <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>Find a credit card</h3>
              <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#555', margin: 0, lineHeight: '1.4' }}>Choose from cash rewards low intro rate and more.</p>
            </div>
            <div style={{ padding: '24px 20px', borderRight: '1px solid #e2dede' }}>
              <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>Stock Fractions</h3>
              <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#555', margin: 0, lineHeight: '1.4' }}>Start investing with just $10</p>
            </div>
            <div style={{ padding: '24px 20px' }}>
              <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>Invest and bank</h3>
              <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#555', margin: 0, lineHeight: '1.4' }}>All in one place - the Wells Fargo Mobile app</p>
            </div>
          </div>
        </div>

        {/* Security Center Banner */}
        <div style={{ backgroundColor: '#1a1a2e' }}>
          <div className="max-w-[960px] mx-auto wf-stack-row wf-section-px" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
            <div style={{ flexShrink: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '48px', height: '48px', color: '#FFCD41' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: f, fontSize: '1.17rem', fontWeight: 600, color: '#fff', margin: '0 0 6px' }}>Security Center</h3>
              <p style={{ fontFamily: f, fontSize: '0.88rem', color: '#ccc', margin: 0, lineHeight: '1.4' }}>
                Protect yourself from fraud. Review your recent activity, set up alerts, and learn how to keep your accounts safe.
              </p>
            </div>
            <a style={{
              backgroundColor: '#FFCD41', color: '#141414', borderRadius: '24px',
              padding: '9px 28px', fontFamily: f, fontWeight: 600, fontSize: '0.88rem',
              textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              Review Activity
            </a>
          </div>
        </div>

        {/* Financial Tools */}
        <div style={{ backgroundColor: '#fff' }}>
          <div className="max-w-[960px] mx-auto wf-section-px" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <h2 style={{ fontFamily: f, fontSize: '1.41rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', margin: '0 0 24px' }}>
              Financial Tools
            </h2>
            <div className="wf-grid-4">
              {[
                { key: 'spending', title: 'Spending Summary', desc: 'See where your money goes each month with spending insights by category.' },
                { key: 'goals', title: 'Financial Goals', desc: 'Set savings goals and track your progress over time.' },
                { key: 'mobile', title: 'Mobile Banking', desc: 'Bank on the go with the Wells Fargo Mobile app. Deposit checks, pay bills, and more.' },
                { key: 'alerts', title: 'Account Alerts', desc: 'Set up email or text alerts for transactions, low balances, and more.' },
              ].map((tool) => (
                <div key={tool.title} style={{ backgroundColor: '#f9f7f6', borderRadius: '8px', padding: '24px 20px' }}>
                  <div style={{ marginBottom: '12px' }}>{toolIcons[tool.key]}</div>
                  <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>{tool.title}</h3>
                  <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#555', margin: 0, lineHeight: '1.4' }}>{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fargo Assistant */}
        <div style={{ background: 'linear-gradient(135deg, #4a3728 0%, #3b3331 40%, #2a2a2a 100%)' }}>
          <div className="max-w-[960px] mx-auto wf-stack-row wf-section-px" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <div style={{ flex: '1 1 auto' }}>
              <h2 style={{ fontFamily: f, fontSize: '1.41rem', color: '#fff', fontWeight: 400, margin: '0 0 12px' }}>
                Need help? Ask Fargo<sup style={{ fontSize: '0.7em' }}>&reg;</sup>
              </h2>
              <p style={{ fontFamily: f, fontSize: '0.94rem', color: '#ccc', margin: '0 0 20px', lineHeight: '1.4' }}>
                Get valuable insights like a summary of your spending by category, retailer and across accounts.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a aria-label="Download on the App Store"><img src="https://www17.wellsfargomedia.com/assets/images/rwd/App_Store_Badge.png" alt="" loading="lazy" style={{ height: '36px' }} /></a>
                <a aria-label="Get it on Google Play"><img src="https://www17.wellsfargomedia.com/assets/images/rwd/GooglePlay_Badge.png" alt="" loading="lazy" style={{ height: '36px' }} /></a>
              </div>
            </div>
            <img
              src="https://www17.wellsfargomedia.com/assets/images/rwd/Fargo-Spending-Insights-Wells-Fargo-Mobile-App-2025.png"
              alt="" loading="lazy"
              style={{ maxHeight: '280px', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Offers for You */}
        <div style={{ backgroundColor: '#f9f7f6' }}>
          <div className="max-w-[960px] mx-auto wf-section-px" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <h2 style={{ fontFamily: f, fontSize: '1.41rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', margin: '0 0 24px' }}>
              Offers for You
            </h2>
            <div className="wf-grid-3">
              {[
                { img: 'https://www17.wellsfargomedia.com/mkt/marketing/digital-containers/images/616x353/wfi_ph_g_1263166552-protecting_hpsp_616x353.jpg', title: 'Protect what matters', desc: 'Learn about identity theft protection and fraud monitoring services.', cta: 'Learn more' },
                { img: 'https://www17.wellsfargomedia.com/mkt/marketing/digital-containers/images/616x353/wfi_ph_g_1184079607-financialgoals_hpsp_616x353.jpg', title: 'Your financial goals', desc: 'Start crafting the foundation for the future you see yourself in.', cta: 'Get started' },
                { img: 'https://www17.wellsfargomedia.com/assets/images/contextual/responsive/smlpromo/wfi_ph_hpsp_fsalockup_616x353.jpg', title: 'Fraud & Scam Alert', desc: 'Spot the latest tactics scammers are using and stay protected.', cta: 'Stay updated' },
              ].map((card) => (
                <div key={card.title} className="wf-card-hover" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <img src={card.img} alt="" loading="lazy" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ padding: '16px 20px' }}>
                    <h3 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 600, color: '#141414', margin: '0 0 8px' }}>{card.title}</h3>
                    <p style={{ fontFamily: f, fontSize: '0.82rem', color: '#555', margin: '0 0 12px', lineHeight: '1.4' }}>{card.desc}</p>
                    <a style={{ color: '#5a469b', fontSize: '0.82rem', fontFamily: f }} className="hover:underline">{card.cta} &gt;</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FooterHelp />
      <FooterLinks />
      <FooterDisclaimer />
    </div>
  );
}

function AccountCard({ title, balance, transactions }: { title: string; balance: string; transactions: Transaction[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
      className="wf-card-hover"
      style={{
        backgroundColor: '#fff', borderRadius: '4px', marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div style={{ width: '4px', backgroundColor: '#D71E28', flexShrink: 0 }} />
        <div style={{ flex: 1, padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <h2 style={{ fontFamily: f, fontSize: '1rem', fontWeight: 700, color: '#D71E28', margin: 0, letterSpacing: '0.5px' }}>{title}</h2>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: f, fontSize: '1.29rem', fontWeight: 400, color: '#141414' }}>{balance}</div>
            <div style={{ fontFamily: f, fontSize: '0.82rem', color: '#555' }}>Available balance</div>
          </div>
        </div>
        <button
          type="button"
          aria-label={expanded ? 'Collapse' : 'Expand'}
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          style={{ width: '40px', backgroundColor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, border: 'none' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', color: '#fff' }} fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>
      {expanded && (
        <div style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid #e2dede' }}>
          <div style={{ width: '4px', backgroundColor: '#D71E28', flexShrink: 0 }} />
          <div style={{ flex: 1, padding: '20px', fontFamily: f }}>
            {transactions.length === 0 ? (
              <div style={{ fontSize: '1rem', color: '#555', fontStyle: 'italic' }}>
                No transactions available.
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '0.82rem', color: '#555', fontWeight: 600, marginBottom: '8px' }}>
                  Recent transactions
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ color: '#555', borderBottom: '1px solid #e2dede', textAlign: 'left' }}>
                        <th style={{ padding: '8px 12px', fontWeight: 600 }}>Date</th>
                        <th style={{ padding: '8px 12px', fontWeight: 600 }}>Description</th>
                        <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody onClick={(e) => e.stopPropagation()}>
                      {transactions.map((t) => (
                        <tr key={t.id} style={{ borderBottom: '1px solid #f4f0ed' }}>
                          <td style={{ padding: '10px 12px', color: '#555', whiteSpace: 'nowrap' }}>{t.date}</td>
                          <td style={{ padding: '10px 12px', color: '#141414' }}>{t.description}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: Number(t.amount) >= 0 ? '#2e7d32' : '#b01c24' }}>
                            {Number(t.amount) >= 0 ? '+' : ''}{formatCurrency(Number(t.amount))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
