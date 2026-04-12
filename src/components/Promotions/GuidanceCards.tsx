const cards = [
  {
    img: 'https://www17.wellsfargomedia.com/assets/images/contextual/responsive/smlpromo/wfi_ph_g_2181743355-def-financialgoals_hpsp_616x353.jpg',
    title: 'Your dreams, your plan',
    desc: 'Start crafting the foundation for the future you see yourself in',
    cta: 'Get started',
  },
  {
    img: 'https://www17.wellsfargomedia.com/assets/images/contextual/responsive/smlpromo/wfi_ph_g_2051210591-def-borrowing_hpsp_616x353.jpg',
    title: 'Borrowing built around you',
    desc: 'Discover borrowing designed for every step of your journey',
    cta: 'Explore borrowing',
  },
  {
    img: 'https://www17.wellsfargomedia.com/assets/images/contextual/responsive/smlpromo/wfi_ph_hpsp_fsalockup_616x353.jpg',
    title: 'Your shield against scams',
    desc: 'Spot the latest tactics scammers are using',
    cta: 'Stay updated',
  },
];

export default function GuidanceCards() {
  return (
    <div className="bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section title with yellow line */}
        <div className="text-center" style={{ padding: '25px 0 40px' }}>
          <div
            className="inline-block"
            style={{
              borderBottom: '2px solid #FFCD41',
              height: '10px',
              width: '74px',
              marginBottom: '0',
            }}
          />
          <h2
            style={{
              fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
              fontSize: '2.47058824rem',
              lineHeight: '1.285',
              color: '#141414',
              fontWeight: 300,
              margin: 0,
              padding: '25px 0 0',
            }}
          >
            Financial guidance and support
          </h2>
        </div>

        {/* Three cards */}
        <div className="flex flex-nowrap px-5 gap-4 pb-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex-1"
              style={{
                borderRadius: '10px',
                boxShadow: '0 1px 5px 0 rgba(0,0,0,0.3)',
                overflow: 'hidden',
                maxWidth: 'calc(33.33% - 17px)',
              }}
            >
              <img
                src={card.img}
                alt=""
                className="w-full"
                style={{ borderRadius: '10px 10px 0 0', display: 'block' }}
              />
              <div style={{ padding: '18px 24px' }}>
                <div
                  style={{
                    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                    fontSize: '1.41176471rem',
                    lineHeight: '1.292',
                    color: '#3b3331',
                    fontWeight: 600,
                    margin: '0 0 17px',
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                    fontSize: '1rem',
                    lineHeight: '1.294',
                    color: '#3b3331',
                    margin: '0 0 17px',
                  }}
                >
                  {card.desc}
                </div>
                <p style={{ marginBottom: '20px' }}>
                  <a
                    href="#"
                    className="inline-block"
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #3b3331',
                      color: '#3b3331',
                      borderRadius: '24px',
                      fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                      fontWeight: 600,
                      fontSize: '1rem',
                      lineHeight: '1.29',
                      padding: '9px 16px',
                      minWidth: '176px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%',
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
