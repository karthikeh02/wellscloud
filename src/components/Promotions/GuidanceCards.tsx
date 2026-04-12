const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

const cards = [
  {
    img: 'https://www17.wellsfargomedia.com/mkt/marketing/digital-containers/images/616x353/wfi_ph_g_1263166552-protecting_hpsp_616x353.jpg',
    title: 'Your dreams, your plan',
    desc: 'Start crafting the foundation for the future you see yourself in',
    cta: 'Get started',
  },
  {
    img: 'https://www17.wellsfargomedia.com/mkt/marketing/digital-containers/images/616x353/wfi_ph_g_1184079607-financialgoals_hpsp_616x353.jpg',
    title: 'Borrowing built around you',
    desc: 'Discover borrowing designed for every step of your journey',
    cta: 'Explore borrowing',
  },
  {
    img: 'https://www17.wellsfargomedia.com/assets/images/contextual/responsive/smlpromo/wfi_ph_hpsp_fsalockup_616x353.jpg',
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
        <div className="flex flex-nowrap gap-5" style={{ padding: '0 20px 40px' }}>
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex-1 flex flex-col"
              style={{ borderRadius: '12px', boxShadow: '0 1px 5px 0 rgba(0,0,0,0.15)', overflow: 'hidden', backgroundColor: '#fff' }}
            >
              <img
                src={card.img} alt=""
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
                    href="#"
                    className="inline-block hover:underline"
                    style={{
                      backgroundColor: '#fff', border: '1px solid #3b3331', color: '#3b3331',
                      borderRadius: '24px', fontFamily: f, fontWeight: 600, fontSize: '0.88235294rem',
                      lineHeight: '1.29', padding: '8px 20px',
                      textAlign: 'center', textDecoration: 'none',
                    }}
                  >
                    {card.cta}
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
