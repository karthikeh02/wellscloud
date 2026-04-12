export default function TopBar() {
  return (
    <header
      className="w-full flex items-center h-[75px] relative"
      style={{ backgroundColor: '#D71E28', borderBottom: '4px solid #FFCD41' }}
    >
      <div className="max-w-[1400px] w-full mx-auto px-5 relative h-full flex items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#">
            <img
              src="https://www17.wellsfargomedia.com/assets/images/rwd/wf_logo_220x23.png"
              alt="Wells Fargo Home Page"
              className="h-[23px] w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>
        </div>

        {/* Right Nav */}
        <nav className="absolute right-0 top-0 h-full flex items-center pr-5">
          <ul className="flex items-center list-none m-0 p-0 gap-0">
            <li className="mx-3">
              <a
                href="#"
                className="text-white no-underline hover:underline"
                style={{ fontSize: '0.76470588rem', fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif' }}
              >
                ATMs/Locations
              </a>
            </li>
            <li className="mx-3">
              <a
                href="#"
                className="text-white no-underline hover:underline"
                style={{ fontSize: '0.76470588rem' }}
              >
                Help
              </a>
            </li>
            <li className="mx-3">
              <a
                href="#"
                className="text-white no-underline hover:underline"
                style={{ fontSize: '0.76470588rem' }}
                lang="es"
              >
                Espa&ntilde;ol
              </a>
            </li>
            <li className="mx-3">
              <a
                href="#"
                className="no-underline hover:underline"
                aria-label="Search"
                style={{ fontSize: '0.76470588rem', color: '#fff' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </a>
            </li>
            <li className="ml-3">
              {/* Sign On - White pill button */}
              <div
                className="flex items-center justify-center rounded-full bg-white"
                style={{ minWidth: '82px', height: '40px' }}
              >
                <a
                  href="#"
                  className="no-underline hover:underline px-4 py-2.5 text-center"
                  style={{
                    color: '#3b3331',
                    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.88235294rem',
                    lineHeight: '1.267',
                  }}
                >
                  Sign On
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
