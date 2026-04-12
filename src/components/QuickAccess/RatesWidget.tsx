export default function RatesWidget() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 pb-8">
        <div className="bg-[#F0F0F0] rounded-[8px] p-5 flex items-center gap-5 flex-wrap">
          <h3 className="text-[16px] font-bold text-wf-dark whitespace-nowrap">Interest rates today</h3>
          <div className="flex items-center gap-2 flex-1">
            <select className="border border-[#ccc] rounded-[3px] px-3 py-[7px] text-[13px] bg-white flex-1 max-w-[280px] focus:outline-none focus:border-wf-link cursor-pointer">
              <option value="">Check rates</option>
              <option value="mortgage">Mortgage rates</option>
              <option value="savings">Savings and CDs rates</option>
              <option value="credit">Credit card rates</option>
              <option value="personal">Personal loan rates</option>
              <option value="all">All rates</option>
            </select>
            <button className="bg-wf-red text-white px-5 py-[7px] rounded-[3px] font-bold text-[13px] hover:bg-wf-dark-red transition-colors cursor-pointer border-none">
              Go
            </button>
          </div>
          <a href="#" className="text-[13px] text-wf-link font-semibold hover:underline inline-flex items-center gap-1">
            Check rates
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
