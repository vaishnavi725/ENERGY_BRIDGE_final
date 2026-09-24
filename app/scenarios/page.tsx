const scenarioCards = [
  ["Heatwave surge", "+19.2%", "High", "Cooling demand spike"],
  ["Storm disruption", "-12.4%", "Medium", "Transmission constraints"],
  ["Demand balancing", "+7.8%", "Low", "Storage optimization"],
  ["Equipment outage", "-8.1%", "Medium", "Backup dispatch required"],
  ["Solar oversupply", "+14.6%", "High", "Curtailment risk"],
  ["Winter peak", "+11.3%", "Medium", "Load shifting needed"],
];

export default function ScenariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Scenarios</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100">Planning simulations</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {scenarioCards.map(([title, forecast, impact, detail]) => (
          <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-slate-100">{title}</p>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  impact === "High"
                    ? "bg-rose-100 text-rose-700"
                    : impact === "Medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {impact}
              </span>
            </div>
            <p className="mt-6 text-3xl font-bold text-slate-100">{forecast}</p>
            <p className="mt-2 text-sm text-slate-400">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
