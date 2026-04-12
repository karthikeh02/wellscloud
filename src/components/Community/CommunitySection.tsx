const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

const cards = [
  {
    img: '/images/volunteers_cars.jpg',
    title: 'Who we are',
    desc: 'Wells Fargo helps strengthen communities through inclusion, economic empowerment, and sustainability.',
    cta: 'About Wells Fargo',
  },
  {
    img: '/images/women_greenhouse.png',
    title: "Why we\u2019re committed to communities",
    desc: "We don\u2019t just serve our communities\u2014we are our communities. We\u2019re committed to helping customers and neighborhoods across the country thrive.",
    cta: 'Wells Fargo Stories',
  },
];

export default function CommunitySection() {
  return (
    <div className="bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section title with yellow line */}
        <div className="text-center" style={{ paddingBottom: '40px' }}>
          <div style={{ borderBottom: '2px solid #FFCD41', height: '10px', width: '74px', display: 'inline-block', verticalAlign: 'bottom' }} />
          <h2 style={{
            fontFamily: f, fontSize: '2.47058824rem', lineHeight: '1.285',
            color: '#141414', fontWeight: 300, margin: 0, padding: '25px 0 0',
          }}>
            Serving our customers and communities
          </h2>
        </div>

        {/* Subtitle */}
        <div className="text-center" style={{ padding: '0 8.33% 32px' }}>
          <p style={{
            fontFamily: f, fontSize: '1.41176471rem', lineHeight: '1.25', color: '#141414',
          }}>
            It doesn&rsquo;t happen with one transaction, in one day on the job, or in one quarter.
            It&rsquo;s earned relationship by relationship.
          </p>
        </div>

        {/* Two cards */}
        <div className="flex flex-nowrap gap-4" style={{ padding: '0 20px 40px' }}>
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex-1 flex flex-col"
              style={{ borderRadius: '10px', boxShadow: '0 1px 5px 0 rgba(0,0,0,0.3)', overflow: 'hidden' }}
            >
              <img
                src={card.img} alt=""
                style={{ width: '100%', aspectRatio: '616/353', display: 'block', borderRadius: '10px 10px 0 0', objectFit: 'cover' }}
                loading="lazy"
              />
              <div className="flex flex-col flex-1 text-left" style={{ padding: '18px 24px' }}>
                <div style={{ fontFamily: f, fontSize: '1.41176471rem', lineHeight: '1.292', color: '#3b3331', fontWeight: 600, margin: '0 0 17px' }}>
                  {card.title}
                </div>
                <div style={{ fontFamily: f, fontSize: '1rem', lineHeight: '1.294', color: '#3b3331', margin: '0 0 17px' }}>
                  {card.desc}
                </div>
                <p style={{ marginTop: 'auto', marginBottom: '20px' }}>
                  <a
                    href="#"
                    className="inline-block hover:underline"
                    style={{
                      backgroundColor: '#fff', border: '1px solid #3b3331', color: '#3b3331',
                      borderRadius: '24px', fontFamily: f, fontWeight: 600, fontSize: '1rem',
                      lineHeight: '1.29', padding: '9px 16px', minWidth: '176px',
                      textAlign: 'center', textDecoration: 'none', width: '100%',
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
