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

export default function SubNav() {
  return (
    <div className="bg-[#F0F0F0] border-b border-wf-border">
      <div className="max-w-[1280px] mx-auto flex items-center px-5 h-[40px] gap-0 overflow-x-auto">
        {subNavItems.map((item, i) => (
          <a
            key={item}
            href="#"
            className={`text-[13px] px-4 py-2 hover:underline whitespace-nowrap ${
              i === 0 ? 'text-wf-dark font-semibold' : 'text-wf-link'
            }`}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
