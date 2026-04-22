const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

const cards = [
  {
    img: '/images/guidance-protecting.jpg',
    title: 'Your dreams, your plan',
    desc: 'Start crafting the foundation for the future you see yourself in',
    cta: 'Get started',
  },
  {
    img: '/images/guidance-financialgoals.jpg',
    title: 'Borrowing built around you',
    desc: 'Discover borrowing designed for every step of your journey',
    cta: 'Explore borrowing',
  },
  {
    img: '/images/guidance-fsalockup.jpg',
    title: 'Your shield against scams',
    desc: 'Spot the latest tactics scammers are using',
    cta: 'Get the latest',
  },
];

export default function GuidanceCards() {
  return (
    <div className="bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section title with yellow line */}
        <div className="text-center" style={{ paddingBottom: '40px' }}>
          <div style={{ borderBottom: '2px solid #FFCD41', height: '10px', width: '74px', display: 'inline-block', verticalAlign: 'bottom' }} />
          <h2 style={{
            fontFamily: f, fontSize: '2.47058824rem', lineHeight: '1.285', color: '#141414',
            fontWeight: 300, margin: 0, padding: '25px 0 0',
          }}>
            Financial guidance and support
          </h2>
        </div>

        {/* Three cards */}
        <div className="wf-grid-3 wf-section-px" style={{ paddingBottom: '40px' }}>
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col wf-card-hover"
              style={{ borderRadius: '12px', boxShadow: '0 1px 5px 0 rgba(0,0,0,0.15)', overflow: 'hidden', backgroundColor: '#fff' }}
            >
              <img
                src={card.img} alt="" loading="lazy"
                style={{ width: '100%', aspectRatio: '616/353', display: 'block', objectFit: 'cover' }}
              />
              <div className="flex flex-col flex-1" style={{ padding: '20px 24px' }}>
                <div style={{ fontFamily: f, fontSize: '1.17647059rem', lineHeight: '1.292', color: '#141414', fontWeight: 600, margin: '0 0 12px' }}>
                  {card.title}
                </div>
                <div style={{ fontFamily: f, fontSize: '0.94117647rem', lineHeight: '1.294', color: '#787070', margin: '0 0 24px', flex: 1 }}>
                  {card.desc}
                </div>
                <p>
                  <a
                    
                    className="inline-flex items-center gap-1 hover:underline"
                    style={{
                      color: '#5a469b', fontFamily: f, fontSize: '0.88235294rem',
                      textDecoration: 'none',
                    }}
                  >
                    {card.cta}
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '10px', height: '10px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
