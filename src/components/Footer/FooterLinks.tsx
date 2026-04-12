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
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                color: '#5a469b',
                fontSize: '0.76470588rem',
                fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                textDecoration: 'underline',
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
