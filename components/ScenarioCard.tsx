type ScenarioCardProps = {
  title: string;
  forecast: string;
  impact: string;
  intensity: string;
};

export function ScenarioCard({ title, forecast, impact, intensity }: ScenarioCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-sm ring-1 ring-slate-800">
      <div className="flex items-center justify-between gap-3">
        <p className="text-base font-semibold text-slate-100">{title}</p>
        <span className="rounded-full bg-sky-500/15 px-2 py-1 text-xs font-semibold text-sky-300">
          {impact}
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold text-slate-100">{forecast}</p>
      <p className="mt-2 text-sm text-slate-400">Risk index: {intensity}</p>
    </div>
  );
}
