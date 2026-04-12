const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

const links = [
  'Privacy, Cookies, Security & Legal',
  'Do Not Sell or Share My Personal Information',
  'Notice of Data Collection',
  'General Terms of Use',
  'Online Access Agreement',
  'Report Fraud',
  'About Wells Fargo',
  'Careers',
  'Inclusion and Accessibility',
  'Sitemap',
];

export default function FooterLinks() {
  return (
    <div style={{ borderTop: '1px solid #e2dede' }}>
      <div className="max-w-[1400px] mx-auto" style={{ padding: '16px 20px' }}>
        <div className="flex flex-wrap items-center gap-y-1">
          {links.map((link, i) => (
            <span key={link} className="flex items-center">
              <a href="#" style={{ color: '#5a469b', fontSize: '0.76470588rem', fontFamily: f }} className="hover:underline">
                {link}
              </a>
              {i < links.length - 1 && (
                <span style={{ color: '#b5adad', margin: '0 8px', fontSize: '0.76470588rem' }}>|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
