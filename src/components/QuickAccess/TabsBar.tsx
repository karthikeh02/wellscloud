const tabs = [
  'Checking',
  'Savings & CDs',
  'Credit Cards',
  'Home Loans',
  'Personal Loans',
  'Auto Loans',
  'Investing',
  'Premier',
  'Education & Tools',
];

export default function TabsBar() {
  return (
    <div className="bg-white border-b border-wf-border">
      <div className="max-w-[1280px] mx-auto px-5 flex items-center gap-1.5 py-3 overflow-x-auto">
        {tabs.map((tab) => (
          <a
            key={tab}
            href="#"
            className="text-[12px] text-wf-link border border-[#c8c8c8] rounded-full px-[14px] py-[5px] hover:bg-[#E8F0FE] hover:border-wf-link transition-colors whitespace-nowrap no-underline hover:no-underline"
          >
            {tab}
          </a>
        ))}
      </div>
    </div>
  );
}
