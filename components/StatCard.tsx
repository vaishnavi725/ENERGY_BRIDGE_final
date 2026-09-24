type StatCardProps = {
  title: string;
  value: string;
  change: string;
  label: string;
};

const statIcons: Record<string, string> = {
  "Total generation": "⚡",
  "Demand served": "✓",
  "Peak demand": "▲",
  Incidents: "!",
};

export function StatCard({ title, value, change, label }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm ring-1 ring-slate-800">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-sm font-bold text-slate-200">
          {statIcons[title] ?? "•"}
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-3xl font-bold tracking-tight text-slate-100">{value}</p>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
          {change}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-400">{label}</p>
    </div>
  );
}
