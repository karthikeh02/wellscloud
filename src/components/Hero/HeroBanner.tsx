import SignOnBox from './SignOnBox';

export default function HeroBanner() {
  return (
    <div className="w-full" style={{ backgroundColor: '#f9f7f6' }}>
      <div className="max-w-[1400px] mx-auto" style={{ padding: '48px 32px 80px', minHeight: '620px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '48px' }}>
          {/* Sign-On Box - fixed width left side */}
          <div style={{ width: '335px', minWidth: '335px', maxWidth: '335px', flexShrink: 0, flexGrow: 0 }}>
            <SignOnBox />
          </div>

          {/* Hero text content - fills middle */}
          <div style={{ flex: '1 1 auto', paddingTop: '32px', maxWidth: '520px' }}>
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
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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

          {/* Right side promo graphic - fixed width */}
          <div style={{ width: '220px', minWidth: '220px', flexShrink: 0, flexGrow: 0, paddingTop: '32px', textAlign: 'center' }}>
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
