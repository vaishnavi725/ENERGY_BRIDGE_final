const reportCards = [
  ["Monthly summary", "78.2%", "Across all regions"],
  ["Maintenance log", "14 tasks", "7 scheduled"],
  ["Carbon impact", "26.8 tCO₂e", "Reduction against target"],
];

const reportQueue = [
  { name: "Grid reliability memo", owner: "Operations", status: "Ready" },
  { name: "Peak demand briefing", owner: "Planning", status: "Review" },
  { name: "Asset resilience review", owner: "Maintenance", status: "Queued" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Reports</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100">Performance reports</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {reportCards.map(([title, value, detail]) => (
          <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className="mt-4 text-3xl font-bold text-slate-100">{value}</p>
            <p className="mt-2 text-sm text-slate-400">{detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-100">Report queue</h2>
          <span className="text-sm font-medium text-slate-400">3 active items</span>
        </div>

        <div className="space-y-3">
          {reportQueue.map((report) => (
            <div key={report.name} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-3">
              <div>
                <p className="font-medium text-slate-100">{report.name}</p>
                <p className="text-sm text-slate-400">{report.owner}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                  report.status === "Ready"
                    ? "bg-emerald-100 text-emerald-700"
                    : report.status === "Review"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-200 text-slate-700"
                }`}
              >
                {report.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
