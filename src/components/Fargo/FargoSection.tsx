const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

export default function FargoSection() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #4a3728 0%, #3b3331 40%, #2a2a2a 100%)' }}>
      <div className="max-w-[1400px] mx-auto wf-section-px" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <div className="wf-stack-row">
          {/* Left: Phone image */}
          <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
            <img
              src="/images/fargo-hero.png"
              alt=""
              loading="lazy"
              style={{ maxHeight: '420px', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Right: Text + CTA */}
          <div style={{ flex: '1 1 auto' }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: f, fontSize: '1.64705882rem', lineHeight: '1.25',
                color: '#fff', fontWeight: 400, margin: '0 0 16px',
              }}>
                Need help? Ask Fargo<sup style={{ fontSize: '0.7em' }}>&reg;</sup>
              </h2>
              <p style={{
                fontFamily: f, fontSize: '1.05882353rem', lineHeight: '1.35',
                color: '#e0dcd9', margin: '0 0 28px',
              }}>
                Fargo<sup>1</sup> gives you valuable insights like a summary of your spending by
                category, retailer and across accounts. Find it only in the Wells Fargo Mobile<sup>&reg;</sup> app.
              </p>

              <div className="flex items-center gap-3 mb-4">
                <a  aria-label="Download on the App Store">
                  <img
                    src="/logo/App_Store_Badge.png"
                    alt="" style={{ height: '40px' }}
                  />
                </a>
                <a  aria-label="Get it on Google Play">
                  <img
                    src="/logo/GooglePlay_Badge.png"
                    alt="" style={{ height: '40px' }}
                  />
                </a>
              </div>
              <span style={{ fontSize: '0.76470588rem', color: '#b5adad', fontFamily: f }}>
                *Screen image is simulated
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
