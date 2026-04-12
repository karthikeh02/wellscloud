export default function FooterHelp() {
  return (
    <div style={{ padding: '0 8px' }}>
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <h2
          style={{
            color: '#141414',
            fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
            fontSize: '1.41176471rem',
            fontWeight: 600,
            lineHeight: '1.25',
            padding: '4px 0',
            margin: '0 0 16px',
          }}
        >
          How can we help?
        </h2>
        <div className="flex gap-8 px-4">
          {/* Find a location */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="rounded-full flex-shrink-0"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#787070',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                  fontSize: '0.88235294rem',
                  fontWeight: 600,
                  color: '#3b3331',
                }}
              >
                Find a location
              </span>
            </div>
            <div className="pl-[52px]">
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder=""
                    aria-label="City, State or ZIP"
                    className="outline-none"
                    style={{
                      border: 'none',
                      borderBottom: '1px solid #787070',
                      padding: '30px 8px 8px 16px',
                      fontSize: '1.17647059rem',
                      fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                      color: '#141414',
                      width: '236px',
                      background: 'transparent',
                    }}
                  />
                  <label
                    className="absolute"
                    style={{
                      top: '20px',
                      left: '6px',
                      color: '#787070',
                      fontSize: '0.94117647rem',
                      fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                    }}
                  >
                    City, State or ZIP
                  </label>
                </div>
                <button
                  style={{
                    backgroundColor: '#141414',
                    border: '1px solid #141414',
                    borderRadius: '24px',
                    color: '#fff',
                    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                    fontWeight: 600,
                    fontSize: '1rem',
                    padding: '9px 38px',
                    minHeight: '40px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginTop: '16px',
                    width: 'fit-content',
                  }}
                >
                  Go
                </button>
              </div>
            </div>
          </div>

          {/* Make an appointment */}
          <div className="flex items-start pt-0">
            <div className="flex items-center gap-3">
              <div
                className="rounded-full flex-shrink-0"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#787070',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <a
                href="#"
                style={{
                  fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                  fontSize: '0.88235294rem',
                  fontWeight: 600,
                  color: '#6048ad',
                  textDecoration: 'none',
                }}
              >
                Make an appointment
              </a>
            </div>
          </div>

          {/* Quick help */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="rounded-full flex-shrink-0"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#787070',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                  fontSize: '0.88235294rem',
                  fontWeight: 600,
                  color: '#3b3331',
                }}
              >
                Quick help
              </span>
            </div>
            <ul className="pl-[52px] list-none" style={{ margin: 0, padding: '0 0 0 52px' }}>
              <li className="mb-2" style={{ listStyle: 'none' }}>
                <a
                  href="#"
                  style={{
                    color: '#5a469b',
                    fontSize: '0.88235294rem',
                    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                  }}
                >
                  Customer service and FAQs
                </a>
              </li>
              <li style={{ listStyle: 'none' }}>
                <a
                  href="#"
                  style={{
                    color: '#5a469b',
                    fontSize: '0.88235294rem',
                    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                  }}
                >
                  Find routing and account numbers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
