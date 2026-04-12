export default function PromoBanner() {
  return (
    <div className="w-full bg-white" style={{ minHeight: '432px' }}>
      <div className="max-w-[1400px] mx-auto relative">
        {/* Background image */}
        <img
          src="https://www17.wellsfargomedia.com/assets/images/contextual/responsive/lpromo/wfi_ph_g_1199830824_1600x700.jpg"
          alt=""
          className="w-full"
          style={{ aspectRatio: '540/251' }}
          loading="lazy"
        />

        {/* Content overlay */}
        <div
          className="absolute text-center w-full"
          style={{
            top: '78px',
            left: '0',
            padding: '0 20px',
          }}
        >
          <h2
            style={{
              fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
              fontSize: '2.47058824rem',
              lineHeight: '1.333',
              color: '#141414',
              fontWeight: 300,
              margin: '32px 0 24px',
            }}
          >
            A home of your own
          </h2>
          <p
            style={{
              fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
              fontSize: '1.41176471rem',
              lineHeight: '1.25',
              color: '#141414',
              margin: '21px 0 40px',
            }}
          >
            With low down payment options on a fixed-rate mortgage
          </p>
          <a
            href="#"
            className="inline-block"
            style={{
              backgroundColor: '#fff',
              border: '1px solid #3b3331',
              color: '#3b3331',
              borderRadius: '24px',
              fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: '1.29',
              padding: '9px 44px',
              minWidth: '176px',
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  );
}
