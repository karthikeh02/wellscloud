const cards = [
  {
    icon: 'https://www17.wellsfargomedia.com/assets/images/contextual/responsive/smlprimary/wfi000_ic_b-wf_icon_house_gradient_default_64x64.png',
    title: 'Find mortgage happiness',
    desc: 'With a down payment as low as 3%',
    cta: 'Learn more',
    ctaLabel: 'Find mortgage happiness with a down payment as low as 3%. Learn more.',
  },
  {
    icon: 'https://www17.wellsfargomedia.com/assets/images/contextual/responsive/smlprimary/wf_ic_check-mark_con-gra_hpps_64x64.png',
    title: 'Check all the boxes on checking',
    desc: 'Discover checking options with the right benefits and features for your goals',
    cta: 'Explore options',
    ctaLabel: 'Explore options and discover the benefits of our checking accounts.',
  },
  {
    icon: 'https://www17.wellsfargomedia.com/assets/images/contextual/responsive/smlprimary/wfi000_ic_b-wf_icon_ui_card_gradient_default_64x64.png',
    title: 'Find a credit card',
    desc: 'Low intro rate, cash back, rewards and more',
    cta: 'Learn more',
    ctaLabel: 'Find a credit card. Low intro rate, cash back, rewards and more. Learn more.',
  },
];

export default function ProductCards() {
  return (
    <div className="max-w-[1400px] mx-auto px-5 py-6">
      <div className="flex gap-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex-1 flex"
          >
            <div className="flex items-start gap-4 p-4">
              <div className="flex-shrink-0">
                <img src={card.icon} alt="" className="w-[64px] h-[64px]" />
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                    fontSize: '1.17647059rem',
                    lineHeight: '1.25',
                    color: '#141414',
                    fontWeight: 400,
                    margin: '0 0 8px',
                  }}
                >
                  {card.title}
                </h2>
                <p
                  style={{
                    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                    fontSize: '1rem',
                    lineHeight: '1.294',
                    color: '#787070',
                    margin: '0 0 12px',
                  }}
                >
                  {card.desc}
                </p>
                <a
                  href="#"
                  aria-label={card.ctaLabel}
                  style={{
                    color: '#5a469b',
                    fontSize: '1rem',
                    textDecoration: 'underline',
                    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                  }}
                >
                  {card.cta}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Rates Widget - 4th card */}
        <div className="flex-1">
          <div className="p-4">
            <h2
              style={{
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                fontSize: '1.17647059rem',
                lineHeight: '1.25',
                color: '#141414',
                fontWeight: 400,
                margin: '0 0 16px',
              }}
            >
              Interest rates today
            </h2>
            <a
              href="#"
              className="block mb-4"
              style={{
                color: '#5a469b',
                fontSize: '1rem',
                textDecoration: 'underline',
              }}
            >
              Check rates
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
