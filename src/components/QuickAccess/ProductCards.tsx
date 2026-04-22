const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

const cards = [
  {
    icon: '/icons/icon-card.png',
    title: 'Earn 20,000 bonus points',
    desc: 'Plus, earn 3X points on many everyday categories with $0 annual fee. Terms apply.',
    cta: 'Learn more',
    tint: 'linear-gradient(180deg, #FFF0E8 0%, #fff 50%)',
  },
  {
    icon: '/icons/icon-check-mark.png',
    title: 'New customer? Say hello to a $125 bonus',
    desc: 'Open a Clear Access Banking account, great for students & more, complete offer requirements',
    cta: 'See offer details',
    tint: 'linear-gradient(180deg, #FFF8E0 0%, #fff 50%)',
  },
  {
    icon: '/icons/icon-house.png',
    title: 'Open a savings account',
    desc: 'Explore our savings accounts and find the right fit for you',
    cta: 'Get started',
    tint: 'linear-gradient(180deg, #F0EBF5 0%, #fff 50%)',
  },
];

export default function ProductCards() {
  return (
    <div style={{ backgroundColor: '#f9f7f6', padding: '40px 0' }}>
      <div className="max-w-[1400px] mx-auto wf-section-px">
        <div className="wf-grid-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="wf-card-hover"
              style={{
                background: card.tint,
                borderRadius: '12px',
                boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
                padding: '40px 20px 24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img src={card.icon} alt="" width="64" height="64" style={{ display: 'inline-block' }} loading="lazy" />
              </div>
              <h2 style={{ fontFamily: f, fontSize: '1.05882353rem', lineHeight: '1.25', color: '#141414', fontWeight: 600, margin: '0 0 8px' }}>
                {card.title}
              </h2>
              <p style={{ fontFamily: f, fontSize: '0.82352941rem', lineHeight: '1.294', color: '#555', margin: '0 0 16px', flex: 1 }}>
                {card.desc}
              </p>
              <a className="inline-flex items-center gap-1 hover:underline" style={{ color: '#5a469b', fontSize: '0.82352941rem', fontFamily: f, textDecoration: 'none' }}>
                {card.cta}
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '10px', height: '10px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}

          {/* Rates Widget Card */}
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
              padding: '40px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2 style={{ fontFamily: f, fontSize: '1.17647059rem', lineHeight: '1.25', color: '#D71E28', fontWeight: 400, margin: '0 0 20px' }}>
              Interest rates today
            </h2>
            <div style={{ flex: 1 }}>
              <label htmlFor="ratesSelect" className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>Check rates</label>
              <select
                id="ratesSelect"
                aria-label="Check rates"
                style={{
                  border: 'none', borderBottom: '1px solid #787070', padding: '8px 0',
                  fontSize: '0.88235294rem', fontFamily: f, color: '#141414',
                  backgroundColor: 'transparent', outline: 'none', cursor: 'pointer', width: '100%',
                }}
              >
                <option value="mortgage">Mortgage rates</option>
                <option value="savings">Savings and CDs rates</option>
                <option value="credit">Credit card rates</option>
                <option value="personal">Personal loan rates</option>
                <option value="all">All rates</option>
              </select>
            </div>
            <a className="inline-flex items-center gap-1 mt-4 hover:underline" style={{ color: '#5a469b', fontSize: '0.82352941rem', fontFamily: f, textDecoration: 'none' }}>
              Check rates
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '10px', height: '10px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
