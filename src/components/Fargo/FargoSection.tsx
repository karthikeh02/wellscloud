export default function FargoSection() {
  return (
    <div style={{ backgroundColor: '#f9f7f6' }}>
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="flex items-center">
          {/* Left: Phone image */}
          <div className="flex-1 flex justify-center py-8">
            <img
              src="https://www17.wellsfargomedia.com/assets/images/rwd/Fargo-Spending-Insights-Wells-Fargo-Mobile-App-2025.png"
              alt=""
              className="max-h-[400px] object-contain"
            />
          </div>

          {/* Right: Text + CTA */}
          <div className="flex-1 py-8">
            <h2
              style={{
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                fontSize: '2rem',
                lineHeight: '1.166',
                color: '#141414',
                fontWeight: 400,
                margin: '0 0 16px',
              }}
            >
              Need help? Ask Fargo<sup style={{ fontSize: '0.7em' }}>&reg;</sup>
            </h2>
            <p
              style={{
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                fontSize: '1rem',
                lineHeight: '1.294',
                color: '#787070',
                margin: '0 0 24px',
              }}
            >
              Fargo<sup>1</sup> gives you valuable insights like a summary of your spending by
              category, retailer and across accounts. Find it only in the Wells Fargo Mobile<sup>&reg;</sup>
              app.
            </p>

            <div className="flex items-center gap-3 mb-4">
              <a href="#" aria-label="Download on the App Store">
                <img
                  src="https://www17.wellsfargomedia.com/assets/images/rwd/App_Store_Badge.png"
                  alt=""
                  className="h-[40px]"
                />
              </a>
              <a href="#" aria-label="Get it on Google Play">
                <img
                  src="https://www17.wellsfargomedia.com/assets/images/rwd/GooglePlay_Badge.png"
                  alt=""
                  className="h-[40px]"
                />
              </a>
            </div>
            <span
              style={{
                fontSize: '0.76470588rem',
                color: '#787070',
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
              }}
            >
              *Screen image is simulated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
