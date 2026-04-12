export default function FooterDisclaimer() {
  const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

  return (
    <div style={{ backgroundColor: '#f9f7f6' }}>
      <div className="max-w-[1400px] mx-auto px-5 py-8">
        {/* Investment Disclaimer */}
        <div
          className="mb-6 p-5"
          style={{ border: '1px solid #e2dede', borderRadius: '4px', backgroundColor: '#fff' }}
        >
          <p style={{ fontFamily: f, fontSize: '0.82352941rem', fontWeight: 600, color: '#141414', margin: '0 0 12px' }}>
            Investment and Insurance Products are:
          </p>
          <div className="flex gap-0 mb-4">
            <div className="flex-1 text-center px-3 py-2">
              <p style={{ fontFamily: f, fontSize: '0.76470588rem', color: '#141414', fontWeight: 600, lineHeight: '1.3' }}>
                Not Insured by the FDIC or Any Federal Government Agency
              </p>
            </div>
            <div className="flex-1 text-center px-3 py-2" style={{ borderLeft: '1px solid #e2dede', borderRight: '1px solid #e2dede' }}>
              <p style={{ fontFamily: f, fontSize: '0.76470588rem', color: '#141414', fontWeight: 600, lineHeight: '1.3' }}>
                Not a Deposit or Other Obligation of, or Guaranteed by, the Bank or Any Bank Affiliate
              </p>
            </div>
            <div className="flex-1 text-center px-3 py-2">
              <p style={{ fontFamily: f, fontSize: '0.76470588rem', color: '#141414', fontWeight: 600, lineHeight: '1.3' }}>
                Subject to Investment Risks, Including Possible Loss of the Principal Amount Invested
              </p>
            </div>
          </div>
          <p style={{ fontFamily: f, fontSize: '0.76470588rem', color: '#787070', lineHeight: '1.4' }}>
            Investment products and services are offered through Wells Fargo Advisors. Wells Fargo
            Advisors is a trade name used by Wells Fargo Clearing Services, LLC (WFCS) and Wells
            Fargo Advisors Financial Network, LLC, Members{' '}
            <a href="#" style={{ color: '#5a469b' }}>SIPC</a>, separate registered
            broker-dealers and non-bank affiliates of Wells Fargo &amp; Company.
          </p>
        </div>

        {/* Footnotes */}
        <div style={{ fontFamily: f, fontSize: '0.76470588rem', color: '#787070', lineHeight: '1.4' }} className="space-y-3 mb-6">
          <p>
            1. Availability may be affected by your mobile carrier&rsquo;s coverage area. Your
            mobile carrier&rsquo;s message and data rates may apply. Fargo is only available on
            the smartphone versions of the Wells Fargo Mobile&reg; app.
          </p>
          <p>
            Android, Google Play, Chrome, Pixel and other marks are trademarks of Google LLC.
          </p>
          <p>
            Apple, the Apple logo, Apple Pay, Apple Watch, Face ID, iCloud Keychain, iPad, iPad Pro,
            iPhone, iTunes, Mac, Safari, and Touch ID are trademarks of Apple Inc., registered in
            the U.S. and other countries. Apple Wallet is a trademark of Apple Inc. App Store is a
            service mark of Apple Inc.
          </p>
          <p>Deposit products offered by Wells Fargo Bank, N.A. Member FDIC.</p>
          <p className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h16v12H4V4zm2 2v8h12V6H6zm-2 14h16v-2H4v2z" />
            </svg>
            Equal Housing Lender
          </p>
        </div>

        {/* Social + Copyright */}
        <div className="flex items-center justify-between" style={{ borderTop: '1px solid #e2dede', paddingTop: '20px' }}>
          <p style={{ fontFamily: f, fontSize: '0.76470588rem', color: '#787070' }}>
            &copy; 1999 - 2026 Wells Fargo. NMLSR ID 399801
          </p>
          <div className="flex items-center gap-4">
            {[
              { name: 'Facebook', d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { name: 'LinkedIn', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              { name: 'Instagram', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
              { name: 'Pinterest', d: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24 18.635 24 24.001 18.633 24.001 12.017 24.001 5.396 18.635 0 12.017 0z' },
              { name: 'YouTube', d: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              { name: 'X', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
            ].map((s) => (
              <a key={s.name} href="#" title={s.name} style={{ color: '#787070' }} className="hover:opacity-70">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d={s.d} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
