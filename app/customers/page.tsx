const customerSegments = [
  ["Industrial", "1.2 GW", "92% uptime", "Priority accounts: 32"],
  ["Commercial", "860 MW", "88% uptime", "Peak load window: 17:00-20:00"],
  ["Residential", "640 MW", "94% uptime", "Demand variance: -3.4%"],
  ["Public services", "420 MW", "96% uptime", "Critical support coverage: 100%"],
];

const demandRegions = [
  { region: "Northwest", demand: "482 MW", change: "+4.2%" },
  { region: "Coastal", demand: "611 MW", change: "+6.8%" },
  { region: "Central", demand: "524 MW", change: "+2.1%" },
  { region: "South", demand: "439 MW", change: "-1.3%" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Customers</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100">Customer load profile</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {customerSegments.map(([segment, load, uptime, note]) => (
          <div key={segment} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
            <p className="text-sm font-medium text-slate-400">{segment}</p>
            <p className="mt-4 text-3xl font-bold text-slate-100">{load}</p>
            <p className="mt-2 text-sm text-slate-400">{uptime}</p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{note}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-100">Regional demand</h2>
          <span className="text-sm font-medium text-slate-400">Updated 10 mins ago</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {demandRegions.map((region) => (
            <div key={region.region} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-slate-100">{region.region}</p>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                  {region.change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-100">{region.demand}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
