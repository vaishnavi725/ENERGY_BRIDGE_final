type RouteCardProps = {
  name: string;
  region: string;
  utilization: string;
  delta: string;
  status: "Stable" | "Warning" | "Critical";
};

const statusStyles = {
  Stable: "bg-emerald-100 text-emerald-700",
  Warning: "bg-amber-100 text-amber-700",
  Critical: "bg-rose-100 text-rose-700",
};

export function RouteCard({ name, region, utilization, delta, status }: RouteCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-sm ring-1 ring-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-slate-100">{name}</p>
          <p className="mt-1 text-sm text-slate-400">{region}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
          <span>Utilization</span>
          <span className="font-semibold text-slate-200">{utilization}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
            style={{ width: utilization }}
          />
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-slate-300">{delta}</p>
    </div>
  );
}
