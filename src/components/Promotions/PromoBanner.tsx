const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

export default function PromoBanner() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-[1400px] mx-auto relative" style={{ overflow: 'hidden' }}>
        {/* Background image */}
        <img
          src="/images/promo-beach-family.jpg"
          alt=""
          style={{ width: '100%', display: 'block', minHeight: '350px', objectFit: 'cover' }}
          loading="lazy"
        />

        {/* Content overlay - LEFT aligned */}
        <div
          className="absolute inset-0 flex items-center"
          style={{ padding: '16px' }}
        >
          <div className="wf-promo-content" style={{ maxWidth: '480px', padding: '0 16px' }}>
            <h2 style={{
              fontFamily: f, fontSize: '2.47058824rem', lineHeight: '1.17',
              color: '#141414', fontWeight: 300, margin: '0 0 16px',
            }}>
              A home of your own
            </h2>
            <p style={{
              fontFamily: f, fontSize: '1.17647059rem', lineHeight: '1.35',
              color: '#141414', margin: '0 0 28px',
            }}>
              With low down payment options on a fixed-rate mortgage
            </p>
            <a
              
              className="inline-block hover:underline"
              style={{
                backgroundColor: '#fff', border: '1px solid #3b3331', color: '#3b3331',
                borderRadius: '24px', fontFamily: f, fontWeight: 600, fontSize: '1rem',
                lineHeight: '1.29', padding: '9px 44px', minWidth: '176px',
                textAlign: 'center', textDecoration: 'none',
              }}
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
