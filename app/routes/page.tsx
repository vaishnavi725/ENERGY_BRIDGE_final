const routeCards = [
  ["North Grid Loop", "Stable", "78%", "24.8 MW headroom"],
  ["Coastal Export", "Warning", "86%", "Reactive support active"],
  ["Desert Relay", "Critical", "94%", "Load shedding pending"],
  ["River Valley", "Stable", "71%", "16.4 MW flexibility"],
  ["Highland Connector", "Warning", "83%", "Weather watch in effect"],
  ["Metro Link", "Stable", "67%", "Demand smoothing enabled"],
];

export default function RoutesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Routes</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100">Transmission routes</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {routeCards.map(([name, status, utilization, detail]) => (
          <div key={name} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-slate-100">{name}</p>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  status === "Critical"
                    ? "bg-rose-100 text-rose-700"
                    : status === "Warning"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {status}
              </span>
            </div>
            <p className="mt-6 text-3xl font-bold text-slate-100">{utilization}</p>
            <p className="mt-2 text-sm text-slate-400">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
