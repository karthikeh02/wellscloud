import { useState } from 'react';

const navItems = [
  { label: 'Personal', href: '/' },
  { label: 'Investing & Wealth Management', href: '/investing-wealth/' },
  { label: 'Business', href: '/biz/' },
  { label: 'Commercial Banking', href: '/com/' },
  { label: 'Corporate & Investment Banking', href: '/cib/' },
  { label: 'About Wells Fargo', href: '/about/' },
];

const subNavItems = [
  'Checking',
  'Savings & CDs',
  'Credit Cards',
  'Home Loans',
  'Personal Loans',
  'Auto Loans',
  'Premier',
  'Education & Tools',
];

export default function MainNav() {
  const [active, setActive] = useState(0);

  return (
    <div
      className="w-full"
      style={{ backgroundColor: '#f9f7f6' }}
    >
      <nav
        className="max-w-[1400px] mx-auto px-5"
        aria-label="Main Navigation"
      >
        {/* L1 - Primary nav tabs */}
        <div
          className="flex items-end h-[60px]"
        >
          <ul className="flex items-end list-none m-0 p-0 h-full">
            {navItems.map((item, i) => (
              <li key={item.label} className="inline-block h-full">
                <button
                  onClick={() => setActive(i)}
                  className="h-full cursor-pointer bg-transparent border-none"
                  style={{
                    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                    fontSize: '0.94117647rem',
                    fontWeight: i === active ? 700 : 400,
                    color: i === active ? '#141414' : '#3b3331',
                    padding: '0 0 10px',
                    marginRight: '42px',
                    borderBottom: i === active ? '4px solid #D71E28' : '4px solid transparent',
                    lineHeight: '1.25',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* L2 - Sub nav items (shown when Personal is active) */}
        {active === 0 && (
          <div
            className="flex items-center h-[48px] overflow-x-auto"
            style={{ borderTop: '1px solid #e2dede' }}
          >
            <ul className="flex items-center list-none m-0 p-0 gap-0">
              {subNavItems.map((item) => (
                <li key={item} className="inline-block">
                  <a
                    href="#"
                    className="no-underline hover:underline whitespace-nowrap"
                    style={{
                      display: 'inline-block',
                      padding: '12px 16px',
                      color: '#3b3331',
                      fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                      fontSize: '0.94117647rem',
                      fontWeight: 400,
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
