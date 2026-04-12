import SignOnBox from './SignOnBox';

export default function HeroBanner() {
  return (
    <div className="relative w-full" style={{ minHeight: '423px' }}>
      {/* Full-width hero image */}
      <div className="w-full">
        <img
          src="https://www17.wellsfargomedia.com/assets/images/contextual/responsive/hpprimary/wfi_ph_hppb_8329906_v3_1700x700.jpg"
          alt="Product showcase. Smartphone screen showing different checking account options."
          className="w-full"
          style={{ aspectRatio: '120/47', maxWidth: '1400px', margin: '0 auto', display: 'block' }}
        />
      </div>

      {/* Content overlay - sign-on + hero text */}
      <div className="absolute inset-0">
        <div className="max-w-[1400px] mx-auto px-5 relative h-full">
          {/* Sign-On Box - absolute positioned on left */}
          <div
            className="absolute z-10"
            style={{ top: '10px', left: '10px' }}
          >
            <SignOnBox />
          </div>

          {/* Hero text content - positioned to the right */}
          <div
            className="absolute"
            style={{
              left: '416px',
              paddingTop: '112px',
              width: '624px',
              textAlign: 'left',
            }}
          >
            <h2
              style={{
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                fontSize: '3.29411765rem',
                lineHeight: '1.107',
                color: '#141414',
                margin: '0 0 20px',
                fontWeight: 400,
              }}
            >
              Checking that fits perfectly
            </h2>
            <p
              style={{
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                fontSize: '1.41176471rem',
                lineHeight: '1.209',
                color: '#141414',
                margin: '0',
              }}
            >
              Explore all the benefits then find a checking account that suits your lifestyle
            </p>
            <div style={{ padding: '20px 0' }}>
              <a
                href="#"
                className="inline-flex items-center justify-center"
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
                  minWidth: '174px',
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                Find your fit &gt;&gt;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
