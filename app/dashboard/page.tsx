import { StatCard } from "@/components/StatCard";
import { RouteCard } from "@/components/RouteCard";
import { ScenarioCard } from "@/components/ScenarioCard";
import { stats, routes, scenarios } from "@/lib/data";

const loadTrend = [55, 62, 58, 73, 70, 81, 79, 88, 92, 89, 96, 94];
const alerts = [
  { title: "Substation 7 relay drift", time: "2 min ago", level: "High" },
  { title: "Coastal corridor congestion", time: "12 min ago", level: "Medium" },
  { title: "Maintenance window approved", time: "1 hour ago", level: "Low" },
];

const dispatchFeed = [
  { asset: "North Loop", load: "78%", status: "Stable" },
  { asset: "Coastal Export", load: "86%", status: "Monitoring" },
  { asset: "Desert Relay", load: "94%", status: "Critical" },
  { asset: "Metro Demand", load: "72%", status: "Balanced" },
];

const generationMix = [
  { source: "Solar", share: 31, tone: "bg-amber-400", color: "#fbbf24" },
  { source: "Wind", share: 23, tone: "bg-cyan-500", color: "#06b6d4" },
  { source: "Hydro", share: 18, tone: "bg-emerald-500", color: "#10b981" },
  { source: "Thermal", share: 16, tone: "bg-violet-500", color: "#8b5cf6" },
  { source: "Storage", share: 12, tone: "bg-slate-700", color: "#334155" },
];

const pieGradient = `conic-gradient(${generationMix
  .map((item, index) => {
    const start = generationMix
      .slice(0, index)
      .reduce((sum, current) => sum + current.share, 0);
    const end = start + item.share;
    return `${item.color} ${start}% ${end}%`;
  })
  .join(", ")})`;

const operationsTimeline = [
  { time: "08:10", title: "North Loop cycling", detail: "Voltage normalized across 2 substations" },
  { time: "08:42", title: "Coastal congestion cleared", detail: "Export restrictions lifted for 15 minutes" },
  { time: "09:05", title: "Emergency maintenance check", detail: "Crew confirmed relay health reading stable" },
];

const regionalPerformance = [
  { region: "Northwest", load: "76%", delta: "+3.4%", status: "Healthy" },
  { region: "Coastal", load: "89%", delta: "+7.1%", status: "Watch" },
  { region: "Central", load: "71%", delta: "+1.8%", status: "Healthy" },
  { region: "South", load: "63%", delta: "-1.2%", status: "Stable" },
];

const demandCurve = [48, 52, 59, 63, 60, 72, 68, 75, 78, 82, 86, 80];
const demandCurvePath = demandCurve
  .map((value, index) => `${index === 0 ? "M" : "L"}${index * 24 + 8},${100 - value}`)
  .join(" ");
const demandCurveAreaPath = `${demandCurvePath} L 272,100 L 8,100 Z`;

const operatorActions = [
  { label: "Dispatch reserve battery", status: "Queued" },
  { label: "Stagger rooftop demand", status: "Ready" },
  { label: "Shift hydro output", status: "Monitoring" },
];

const marketSignals = [
  { label: "Day-ahead price", value: "$62.4/MWh", change: "+4.6%" },
  { label: "Balancing market", value: "1.6 GW", change: "+8.1%" },
  { label: "Carbon intensity", value: "214 gCO₂/kWh", change: "-2.3%" },
];

const assetHealth = [
  { name: "Substation A3", health: "98%", tone: "emerald" },
  { name: "Battery Bank 2", health: "91%", tone: "cyan" },
  { name: "Wind Cluster N", health: "82%", tone: "amber" },
  { name: "Metro Feeder 7", health: "76%", tone: "rose" },
];

const weatherSummary = [
  { label: "Temperature", value: "28°C", detail: "Peak at 15:00" },
  { label: "Wind", value: "19 km/h", detail: "Northwest flow" },
  { label: "Rain risk", value: "12%", detail: "Low across zones" },
];

const interconnectors = [
  { name: "N-7 tie line", status: "Nominal", flow: "1.2 GW" },
  { name: "Coast export", status: "Watch", flow: "1.6 GW" },
  { name: "North storage link", status: "Stable", flow: "820 MW" },
];

const inventoryScenarioData = [
  { day: 0, low: 100, base: 100, risk: 100 },
  { day: 15, low: 82, base: 88, risk: 90 },
  { day: 30, low: 66, base: 74, risk: 80 },
  { day: 45, low: 52, base: 62, risk: 70 },
  { day: 60, low: 38, base: 48, risk: 61 },
];

const supplierExposure = [
  { name: "Supplier A", value: 34 },
  { name: "Supplier B", value: 27 },
  { name: "Regional route", value: 21 },
  { name: "Buffer capacity", value: 18 },
];

const atRiskFacilities = [
  { name: "North Ridge Plant", delta: "-12 days", risk: "Critical" },
  { name: "Harbor Depot", delta: "-9 days", risk: "Elevated" },
  { name: "Lakeside Hub", delta: "-6 days", risk: "Watch" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100">
            Energy portfolio overview
          </h1>
        </div>
        <button className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400">
          Refresh data
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Dispatch rate", "96.2%", "Target achieved"],
          ["Resilience index", "88.4", "Above benchmark"],
          ["Active crews", "19", "2 in the field"],
        ].map(([title, value, detail]) => (
          <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-sm ring-1 ring-slate-800">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</p>
            <p className="mt-3 text-2xl font-bold text-slate-100">{value}</p>
            <p className="mt-2 text-sm text-slate-400">{detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-sm ring-1 ring-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {['All zones', 'Solar', 'Wind', 'Storage', 'Demand'].map((filter) => (
              <button
                key={filter}
                type="button"
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${
                  filter === 'All zones'
                    ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
            Sync 00:42 UTC
          </div>
        </div>
      </div>

      <div className="space-y-6 bg-[#efeae3] p-3 sm:p-5 rounded-[28px] border border-[#d9d2c8]">
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full border border-[#d3b57a] bg-[#f1e6cb] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d5b2a]">
            At-risk facilities flagged
          </span>
          <span className="rounded-full border border-[#9bc3b0] bg-[#dfeee7] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2d5c4c]">
            Inventory buffer active
          </span>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-[26px] border border-[#d5d0c8] bg-[#f6f3ef] p-5 shadow-[0_10px_30px_rgba(95,88,78,0.08)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4e5b67]">Inventory view</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#1d2a2a]">Inventory runway by scenario</h2>

            <div className="mt-6 h-[280px] w-full">
              <svg viewBox="0 0 600 260" className="h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="inventoryFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8ac4b1" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#8ac4b1" stopOpacity="0.04" />
                  </linearGradient>
                </defs>

                {[0, 25, 50, 75, 100].map((tick) => (
                  <g key={tick}>
                    <line x1="32" x2="560" y1={220 - tick * 1.6} y2={220 - tick * 1.6} stroke="#d7d1ca" strokeDasharray="4 6" />
                    <text x="8" y={224 - tick * 1.6} fill="#5f6a72" fontSize="12">{tick}</text>
                  </g>
                ))}

                <line x1="32" x2="560" y1="220" y2="220" stroke="#b8b1a8" />
                <line x1="32" x2="32" y1="20" y2="220" stroke="#b8b1a8" />

                <path
                  d="M 32 220 L 32 180 L 120 150 L 220 120 L 320 90 L 420 70 L 560 40 L 560 220 Z"
                  fill="url(#inventoryFill)"
                />

                <path d="M 32 220 L 32 180 L 120 150 L 220 120 L 320 90 L 420 70 L 560 40" fill="none" stroke="#4c9b7f" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M 32 220 L 32 190 L 120 170 L 220 145 L 320 125 L 420 110 L 560 95" fill="none" stroke="#d8654a" strokeWidth="2.8" strokeLinecap="round" />

                {inventoryScenarioData.map((point, index) => {
                  const x = 32 + index * 132;
                  const y = 220 - point.base * 1.6;
                  return (
                    <g key={index}>
                      <circle cx={x} cy={y} r="3" fill="#4c9b7f" />
                    </g>
                  );
                })}

                {['Day 0', 'Day 15', 'Day 30', 'Day 45', 'Day 60'].map((label, index) => (
                  <text key={label} x={32 + index * 132} y="245" fill="#536774" fontSize="12" textAnchor="middle">{label}</text>
                ))}
              </svg>
            </div>
          </div>

          <div className="rounded-[26px] border border-[#d5d0c8] bg-[#f6f3ef] p-5 shadow-[0_10px_30px_rgba(95,88,78,0.08)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4e5b67]">Exposure</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#1d2a2a]">Supplier exposure</h2>

            <div className="mt-8 space-y-6">
              {supplierExposure.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between text-[16px] text-[#2d3a3f]">
                    <span>{item.name}</span>
                    <span className="font-semibold text-[#2d3a3f]">{item.value}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[#e5e3df]">
                    <div
                      className="h-full rounded-full bg-[#e2613a]"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[26px] border border-[#d5d0c8] bg-[#f6f3ef] p-5 shadow-[0_10px_30px_rgba(95,88,78,0.08)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4e5b67]">At-risk facilities</p>
          <div className="mt-5 space-y-3">
            {atRiskFacilities.map((facility) => (
              <div key={facility.name} className="flex items-center justify-between rounded-2xl border border-[#d8d2cb] bg-white/50 px-4 py-3">
                <div>
                  <p className="text-[17px] font-semibold text-[#23313a]">{facility.name}</p>
                  <p className="text-sm text-[#5f6a72]">{facility.delta} relative to plan</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    facility.risk === "Critical"
                      ? "bg-[#f4d7d0] text-[#9d3a2d]"
                      : facility.risk === "Elevated"
                        ? "bg-[#f3e2bd] text-[#7a5b2a]"
                        : "bg-[#dfeee7] text-[#2d5c4c]"
                  }`}
                >
                  {facility.risk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Command queue', value: '9 active', sub: 'Dispatch aligned with load forecast' },
          { label: 'Crew availability', value: '18/21', sub: 'Two teams in reserve' },
          { label: 'Forecast confidence', value: '94%', sub: 'Based on weather + demand data' },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-sm ring-1 ring-slate-800">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-100">{item.value}</p>
            <p className="mt-2 text-sm text-slate-400">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Weather outlook</h2>
            <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-semibold text-cyan-300">Normal</span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {weatherSummary.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
                <p className="mt-3 text-2xl font-bold text-slate-100">{item.value}</p>
                <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Interconnection status</h2>
            <span className="text-sm font-medium text-slate-400">3 links</span>
          </div>

          <div className="space-y-3">
            {interconnectors.map((link) => (
              <div key={link.name} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-3">
                <div>
                  <p className="font-medium text-slate-100">{link.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{link.flow}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    link.status === "Nominal"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : link.status === "Watch"
                        ? "bg-amber-500/15 text-amber-300"
                        : "bg-cyan-500/15 text-cyan-300"
                  }`}
                >
                  {link.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-100">Load profile</h2>
              <p className="mt-1 text-sm text-slate-400">Last 12 hours</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              +12.4%
            </span>
          </div>

          <div className="flex h-56 items-end gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-4">
            {loadTrend.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-emerald-500 via-cyan-400 to-teal-300"
                  style={{ height: `${value}%` }}
                />
                <span className="text-[10px] text-slate-400">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Operational alerts</h2>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
              14 active
            </span>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.title} className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-slate-100">{alert.title}</p>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      alert.level === "High"
                        ? "bg-rose-100 text-rose-700"
                        : alert.level === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {alert.level}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Route performance</h2>
            <span className="text-sm font-medium text-slate-400">Updated 5 min ago</span>
          </div>

          <div className="space-y-4">
            {routes.map((route) => (
              <RouteCard key={route.name} {...route} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
            <h2 className="text-xl font-semibold text-slate-100">System health</h2>
            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Transmission</span>
                  <span>87%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800">
                  <div className="h-full w-[87%] rounded-full bg-emerald-500" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Distribution</span>
                  <span>73%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800">
                  <div className="h-full w-[73%] rounded-full bg-amber-400" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Storage</span>
                  <span>64%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800">
                  <div className="h-full w-[64%] rounded-full bg-cyan-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
            <h2 className="text-xl font-semibold text-slate-100">Scenario forecast</h2>
            <div className="mt-5 space-y-4">
              {scenarios.map((scenario) => (
                <ScenarioCard key={scenario.title} {...scenario} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Operator actions</h2>
            <span className="text-sm font-medium text-slate-400">Priority queue</span>
          </div>

          <div className="space-y-3">
            {operatorActions.map((action) => (
              <div key={action.label} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-3">
                <p className="font-medium text-slate-100">{action.label}</p>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    action.status === "Queued"
                      ? "bg-cyan-500/15 text-cyan-300"
                      : action.status === "Ready"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-amber-500/15 text-amber-300"
                  }`}
                >
                  {action.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Battery reserve</h2>
            <span className="text-sm font-medium text-slate-400">24h forecast</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-4xl font-bold text-slate-100">82%</p>
                <p className="mt-1 text-sm text-slate-400">Available storage</p>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">+6.4%</span>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-400">
              <div className="rounded-xl bg-slate-950 p-2">
                <p className="text-lg font-semibold text-slate-100">314 MWh</p>
                <p>Stored</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-2">
                <p className="text-lg font-semibold text-slate-100">48 min</p>
                <p>Buffer</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-2">
                <p className="text-lg font-semibold text-slate-100">5.1 GW</p>
                <p>Max flex</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Dispatch feed</h2>
            <span className="text-sm font-medium text-slate-400">Live updates</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="pb-3 pr-4 font-medium">Asset</th>
                  <th className="pb-3 pr-4 font-medium">Load</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {dispatchFeed.map((row) => (
                  <tr key={row.asset} className="border-b border-slate-700 last:border-b-0">
                    <td className="py-3 pr-4 font-medium text-slate-100">{row.asset}</td>
                    <td className="py-3 pr-4 text-slate-300">{row.load}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                          row.status === "Critical"
                            ? "bg-rose-100 text-rose-700"
                            : row.status === "Monitoring"
                              ? "bg-amber-100 text-amber-700"
                              : row.status === "Stable"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-cyan-100 text-cyan-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-100">Generation mix</h2>
              <span className="text-sm font-medium text-slate-400">Today</span>
            </div>

            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full shadow-inner shadow-slate-950/70" style={{ background: pieGradient }}>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-center shadow-sm ring-1 ring-slate-700">
                  <div>
                    <p className="text-xl font-bold text-slate-100">100%</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">mix</p>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-3">
                {generationMix.map((source) => (
                  <div key={source.source}>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${source.tone}`} />
                        <span>{source.source}</span>
                      </div>
                      <span>{source.share}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full ${source.tone}`}
                        style={{ width: `${source.share}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-100">Market signals</h2>
              <span className="text-sm font-medium text-slate-400">Live</span>
            </div>

            <div className="space-y-3">
              {marketSignals.map((signal) => (
                <div key={signal.label} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-3">
                  <div>
                    <p className="text-sm text-slate-400">{signal.label}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-100">{signal.value}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                    {signal.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Regional performance</h2>
            <span className="text-sm font-medium text-slate-400">Current load</span>
          </div>

          <div className="space-y-3">
            {regionalPerformance.map((region) => (
              <div key={region.region} className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-100">{region.region}</p>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      region.status === "Healthy"
                        ? "bg-emerald-100 text-emerald-700"
                        : region.status === "Watch"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {region.status}
                  </span>
                </div>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-2xl font-bold text-slate-100">{region.load}</p>
                  <p className="text-sm font-medium text-emerald-600">{region.delta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Demand curve</h2>
            <span className="text-sm font-medium text-slate-400">Next 12h</span>
          </div>

          <svg viewBox="0 0 280 100" className="h-36 w-full overflow-visible rounded-2xl bg-slate-950 p-2 ring-1 ring-slate-800">
            <defs>
              <linearGradient id="demandFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d={demandCurveAreaPath} fill="url(#demandFill)" />
            <path d={demandCurvePath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
            {demandCurve.map((point, index) => (
              <circle
                key={index}
                cx={index * 24 + 8}
                cy={100 - point}
                r="2.4"
                fill="#10b981"
              />
            ))}
          </svg>

          <div className="mt-3 grid grid-cols-6 gap-2 text-[10px] uppercase tracking-[0.16em] text-slate-400">
            {['00h', '02h', '04h', '06h', '08h', '10h'].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Risk watch</h2>
            <span className="rounded-full bg-rose-500/15 px-2.5 py-1 text-xs font-semibold text-rose-300">
              3 items
            </span>
          </div>

          <div className="space-y-3">
            {[
              ["Weather disruption", "High", "Cascading gusts expected by 14:00"],
              ["Transformer strain", "Medium", "Northwest nodes above 80% load"],
              ["Generator reserve", "Low", "Adequate backup margin preserved"],
            ].map(([title, level, detail]) => (
              <div key={title} className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-100">{title}</p>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      level === "High"
                        ? "bg-rose-500/15 text-rose-300"
                        : level === "Medium"
                          ? "bg-amber-500/15 text-amber-300"
                          : "bg-emerald-500/15 text-emerald-300"
                    }`}
                  >
                    {level}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Asset health</h2>
            <span className="text-sm font-medium text-slate-400">Field fleet</span>
          </div>

          <div className="space-y-4">
            {assetHealth.map((asset) => (
              <div key={asset.name} className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-100">{asset.name}</p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      asset.tone === "emerald"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : asset.tone === "cyan"
                          ? "bg-cyan-500/15 text-cyan-300"
                          : asset.tone === "amber"
                            ? "bg-amber-500/15 text-amber-300"
                            : "bg-rose-500/15 text-rose-300"
                    }`}
                  >
                    {asset.health}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      asset.tone === "emerald"
                        ? "bg-emerald-500"
                        : asset.tone === "cyan"
                          ? "bg-cyan-500"
                          : asset.tone === "amber"
                            ? "bg-amber-400"
                            : "bg-rose-500"
                    }`}
                    style={{ width: asset.health }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-100">Operations timeline</h2>
          <span className="text-sm font-medium text-slate-400">Last 2 hours</span>
        </div>

        <div className="space-y-4">
          {operationsTimeline.map((event) => (
            <div key={event.title} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-3">
              <div className="flex w-16 shrink-0 items-center justify-center rounded-xl bg-emerald-100 px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                {event.time}
              </div>
              <div>
                <p className="font-medium text-slate-100">{event.title}</p>
                <p className="mt-1 text-sm text-slate-400">{event.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
