import Link from "next/link";

const navItems = [
  { href: "#overview", label: "Overview", icon: "▣", badge: "Live" },
  { href: "#scenarios", label: "Scenarios", icon: "◎", badge: "Demo" },
  { href: "#alternatives", label: "Alternatives", icon: "↗", badge: "3" },
  { href: "#inventory", label: "Inventory", icon: "▤", badge: "Risk" },
  { href: "#decision-plan", label: "Decision Plan", icon: "◫", badge: "Plan" },
  { href: "#alerts", label: "Alerts", icon: "⚑", badge: "3" },
];

const quickActions = [
  { label: "Dispatch", value: "4 tasks", tone: "emerald" },
  { label: "Alerts", value: "3 open", tone: "amber" },
  { label: "Backup", value: "71%", tone: "cyan" },
];

const systemHealth = [
  { label: "Supply coverage", value: "71%" },
  { label: "Demand exposure", value: "27%" },
  { label: "Inventory runway", value: "18d" },
];

const networkMonitors = [
  { label: "Supplier A", value: "Ready" },
  { label: "Harbor Depot", value: "Critical" },
  { label: "Maritime route", value: "Planning" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950/80 p-5 lg:block">
      <div className="mb-8 rounded-2xl bg-slate-900 p-4 text-white shadow-sm ring-1 ring-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-sm font-bold text-orange-300">
            SB
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Prototype</p>
            <p className="text-sm font-semibold">Continuity tower</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Region</p>
            <p className="text-sm font-medium">Hormuz impact</p>
          </div>
          <span className="rounded-full bg-orange-500/20 px-2 py-1 text-[10px] font-semibold text-orange-300">
            Watch
          </span>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <span className="flex items-center gap-3">
              <span className="text-base">{item.icon}</span>
              {item.label}
            </span>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">
              {item.badge}
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Quick actions</p>
        <div className="mt-3 space-y-2">
          {quickActions.map((action) => (
            <div key={action.label} className="flex items-center justify-between rounded-xl bg-slate-950/70 px-2.5 py-2">
              <span className="text-sm text-slate-200">{action.label}</span>
              <span
                className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                  action.tone === "emerald"
                    ? "bg-emerald-500/15 text-emerald-300"
                    : action.tone === "amber"
                      ? "bg-amber-500/15 text-amber-300"
                      : "bg-cyan-500/15 text-cyan-300"
                }`}
              >
                {action.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300">Current load</p>
          <span className="rounded-full bg-orange-400/15 px-2 py-1 text-[10px] font-semibold text-orange-300">+8.1%</span>
        </div>
        <p className="mt-3 text-3xl font-bold text-white">{Math.min(94, Math.max(42, 71))}%</p>
        <p className="mt-1 text-sm text-orange-300">Simulated alternative capacity</p>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Network monitors</p>
        <div className="mt-3 space-y-2">
          {networkMonitors.map((monitor) => (
            <div key={monitor.label} className="flex items-center justify-between rounded-xl bg-slate-950/70 px-2.5 py-2 text-sm text-slate-300">
              <span>{monitor.label}</span>
              <span className="rounded-full bg-orange-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-orange-300">
                {monitor.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Risk summary</p>
        <div className="mt-3 space-y-2">
          {systemHealth.map((status) => (
            <div key={status.label} className="flex items-center justify-between text-sm text-slate-300">
              <span>{status.label}</span>
              <span className="font-semibold text-slate-100">{status.value}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
