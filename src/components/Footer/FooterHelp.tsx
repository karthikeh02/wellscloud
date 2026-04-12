const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

export default function FooterHelp() {
  return (
    <div style={{ borderTop: '1px solid #e2dede' }}>
      <div className="max-w-[1400px] mx-auto" style={{ padding: '24px 20px 32px' }}>
        <h2 style={{
          color: '#141414', fontFamily: f, fontSize: '1.41176471rem',
          fontWeight: 600, lineHeight: '1.25', margin: '0 0 20px',
        }}>
          How can we help?
        </h2>
        <div className="flex items-start" style={{ justifyContent: 'space-between' }}>
          {/* Find a location */}
          <div className="flex items-center gap-3">
            <div style={{
              width: '40px', height: '40px', backgroundColor: '#787070',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', color: '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span style={{ fontFamily: f, fontSize: '0.88235294rem', fontWeight: 600, color: '#3b3331' }}>
              Find a location
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '10px', height: '10px', marginLeft: '4px', display: 'inline' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>

          {/* Make an appointment */}
          <div className="flex items-center gap-3">
            <div style={{
              width: '40px', height: '40px', backgroundColor: '#787070',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', color: '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <a href="#" style={{ fontFamily: f, fontSize: '0.88235294rem', fontWeight: 600, color: '#6048ad', textDecoration: 'none' }} className="hover:underline">
              Make an appointment
            </a>
          </div>

          {/* Quick help */}
          <div className="flex items-center gap-3">
            <div style={{
              width: '40px', height: '40px', backgroundColor: '#787070',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', color: '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span style={{ fontFamily: f, fontSize: '0.88235294rem', fontWeight: 600, color: '#3b3331' }}>
              Quick help
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '10px', height: '10px', marginLeft: '4px', display: 'inline' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
