"use client";

import { useMemo, useState } from "react";
import { alerts, alternativeOptions, baseAiRecommendations, decisionTasks, initialScenario, inventoryFacilities } from "@/data/straitbridge";
import { calculateScenarioOutcome, getAiResponse, getSelectedAlternatives, getSummaryText } from "@/lib/demo";
import type { AIRecommendation, AlternativeOption, DecisionTask, ScenarioState } from "@/types/straitbridge";

const scenarioChoices = {
  duration: [30, 60, 90] as const,
  demand: ["Normal", "+10%", "+20%"] as const,
  inventory: ["Current", "Reduced", "Increased"] as const,
  supply: ["Conservative", "Balanced", "Aggressive"] as const,
};

function getTone(status: string) {
  if (status === "Critical" || status === "HIGH") return "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30";
  if (status === "Elevated" || status === "MEDIUM" || status === "Warning") return "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30";
  return "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30";
}

export default function HomePage() {
  const [draftScenario, setDraftScenario] = useState<ScenarioState>(initialScenario);
  const [appliedScenario, setAppliedScenario] = useState<ScenarioState>(initialScenario);
  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);
  const [selectedAlternatives, setSelectedAlternatives] = useState<string[]>(["supplier-a", "inventory-release"]);
  const [showExposure, setShowExposure] = useState(true);
  const [aiResponses, setAiResponses] = useState<AIRecommendation[]>(baseAiRecommendations.slice(0, 2));
  const [planItems, setPlanItems] = useState<DecisionTask[]>(decisionTasks);
  const [executiveSummary, setExecutiveSummary] = useState<ReturnType<typeof getSummaryText> | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);

  const simulation = useMemo(() => calculateScenarioOutcome(appliedScenario), [appliedScenario]);
  const selectedOptions = useMemo(() => getSelectedAlternatives(selectedAlternatives), [selectedAlternatives]);
  const summaryText = useMemo(
    () => getSummaryText(appliedScenario, simulation, selectedOptions),
    [appliedScenario, selectedOptions, simulation],
  );

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateDraftScenario = <K extends keyof ScenarioState>(key: K, value: ScenarioState[K]) => {
    setDraftScenario((current) => ({ ...current, [key]: value }));
  };

  const toggleAlternative = (id: string) => {
    setSelectedAlternatives((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) return [...current.slice(1), id];
      return [...current, id];
    });
  };

  const handleAiClick = (type: "90-day" | "facilities" | "compare" | "summary") => {
    const response = getAiResponse(type, appliedScenario, selectedOptions, simulation);
    setAiResponses((current) => [response, ...current.filter((item) => item.id !== response.id)].slice(0, 3));
  };

  const handleAddToDecisionPlan = (response: AIRecommendation) => {
    const item: DecisionTask = {
      id: `ai-${response.id}`,
      phase: "PHASE 2 — WEEK 1",
      title: response.recommendation,
      owner: "Bridge AI",
      deadline: "72h",
      status: "Not Started",
    };

    setPlanItems((current) => [item, ...current]);
  };

  const handleStatusChange = (id: string, status: DecisionTask["status"]) => {
    setPlanItems((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const handleGenerateBrief = () => {
    setExecutiveSummary(summaryText);
  };

  const resetDemo = () => {
    setDraftScenario(initialScenario);
    setAppliedScenario(initialScenario);
    setSelectedAlternatives(["supplier-a", "inventory-release"]);
    setSelectedAlert(alerts[0]);
    setAiResponses(baseAiRecommendations.slice(0, 2));
    setPlanItems(decisionTasks);
    setExecutiveSummary(null);
    setCompareOpen(false);
    setShowExposure(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.22),_transparent_40%),linear-gradient(180deg,#020817_0%,#0f172a_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-lg font-bold text-white shadow-lg shadow-orange-500/20">
                S
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">Prototype</p>
                <h1 className="text-2xl font-black tracking-tight text-white">StraitBridge</h1>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 lg:flex">
              {[
                ["Overview", "overview"],
                ["Scenarios", "scenarios"],
                ["Alternatives", "alternatives"],
                ["Inventory", "inventory"],
                ["Decision Plan", "decision-plan"],
                ["Alerts", "alerts"],
              ].map(([label, id]) => (
                <button key={id} type="button" onClick={() => scrollToSection(id)} className="transition hover:text-white">
                  {label}
                </button>
              ))}
            </nav>

            <button type="button" onClick={resetDemo} className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800">
              Reset Demo
            </button>
          </header>
        </div>

        <div id="overview" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-300">
              Energy Continuity Control Tower
            </div>

            <h2 className="mt-6 text-5xl font-black tracking-tight text-white sm:text-6xl">
              Keep energy moving when routes don’t.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              StraitBridge helps businesses understand supply disruption, evaluate alternatives, and create an actionable continuity plan.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button type="button" onClick={() => scrollToSection("control-tower")} className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400">
                Open Control Tower
              </button>
              <button type="button" onClick={() => scrollToSection("scenarios")} className="rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800">
                Explore Demo
              </button>
            </div>

            <div className="mt-10 grid max-w-lg gap-4 sm:grid-cols-3">
              {[
                ["42%", "Supply exposure"],
                ["18d", "Inventory runway"],
                ["71%", "Alternative capacity"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/40">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5 shadow-[0_30px_80px_rgba(2,6,23,0.65)] backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Current scenario</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Hormuz Unavailable</h3>
              </div>
              <span className="rounded-full bg-orange-500/15 px-3 py-1.5 text-xs font-semibold text-orange-300 ring-1 ring-orange-500/30">
                {appliedScenario.disruptionDuration} Days
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { label: "Supply Exposure", value: `${simulation.demandExposure}%`, tone: "rose" },
                { label: "Inventory Runway", value: `${simulation.inventoryRunway} Days`, tone: "amber" },
                { label: "Demand at Risk", value: `${simulation.demandExposure}%`, tone: "orange" },
                { label: "Estimated Cost Impact", value: `+$${simulation.costImpact.toFixed(1)}M`, tone: "emerald" },
                { label: "Alternative Capacity", value: `${simulation.supplyCoverage}%`, tone: "cyan" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3">
                  <span className="text-sm text-slate-300">{item.label}</span>
                  <span className={`rounded-full px-2.5 py-1 text-sm font-bold ${
                    item.tone === "rose" ? "bg-rose-500/15 text-rose-300" :
                    item.tone === "amber" ? "bg-amber-500/15 text-amber-300" :
                    item.tone === "orange" ? "bg-orange-500/15 text-orange-300" :
                    item.tone === "emerald" ? "bg-emerald-500/15 text-emerald-300" : "bg-cyan-500/15 text-cyan-300"
                  }`}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/70 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Prototype analysis based on simulated data.</p>
              <p className="mt-2">This view models a 60-day disruption and highlights the main continuity decisions for a controlled pilot demo.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section id="control-tower" className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">Control Tower</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-white">Hormuz Unavailable</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-orange-500/15 px-3 py-1.5 text-xs font-semibold text-orange-300">Duration: {appliedScenario.disruptionDuration} Days</span>
              <button type="button" onClick={() => setShowExposure((current) => !current)} className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700">
                View Exposure
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              ["Supply Exposure", `${simulation.demandExposure}%`, "SIMULATED"],
              ["Inventory Runway", `${simulation.inventoryRunway}d`, "SIMULATED"],
              ["Demand at Risk", `${simulation.demandExposure}%`, "SIMULATED"],
              ["Estimated Cost Impact", `+$${simulation.costImpact.toFixed(1)}M`, "SIMULATED"],
              ["Alternative Capacity", `${simulation.supplyCoverage}%`, "SIMULATED"],
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</p>
                <p className="mt-3 text-3xl font-black text-white">{value}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">{note}</p>
              </div>
            ))}
          </div>

          {showExposure ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <h4 className="text-lg font-bold text-white">Supply exposure details</h4>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Affected suppliers", "4 major suppliers"],
                    ["Affected facilities", "6 critical sites"],
                    ["Inventory levels", "Low across 3 hubs"],
                    ["Demand exposure", "27% of demand at risk"],
                    ["Supply routes", "2 primary routes compromised"],
                    ["Supply coverage", `${simulation.supplyCoverage}%`],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</p>
                      <p className="mt-3 text-lg font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <h4 className="text-lg font-bold text-white">Distribution snapshot</h4>
                <div className="mt-5 space-y-4">
                  {[
                    ["Western network", 72],
                    ["Northern corridor", 58],
                    ["Eastern logistics", 63],
                    ["Southern grid", 45],
                  ].map(([name, value]) => (
                    <div key={name}>
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                        <span>{name}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400" style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section id="scenarios" className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">Scenario Simulator</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-white">Simulation Results</h3>
            </div>
            <button type="button" onClick={() => setAppliedScenario(draftScenario)} className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400">
              Run Simulation
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Disruption Duration</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {scenarioChoices.duration.map((option) => (
                  <button key={option} type="button" onClick={() => updateDraftScenario("disruptionDuration", option)} className={`rounded-full px-3 py-2 text-sm font-semibold ${draftScenario.disruptionDuration === option ? "bg-orange-500 text-white" : "bg-slate-800 text-slate-200"}`}>
                    {option} days
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Demand</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {scenarioChoices.demand.map((option) => (
                  <button key={option} type="button" onClick={() => updateDraftScenario("demandLevel", option)} className={`rounded-full px-3 py-2 text-sm font-semibold ${draftScenario.demandLevel === option ? "bg-orange-500 text-white" : "bg-slate-800 text-slate-200"}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Inventory</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {scenarioChoices.inventory.map((option) => (
                  <button key={option} type="button" onClick={() => updateDraftScenario("inventoryLevel", option)} className={`rounded-full px-3 py-2 text-sm font-semibold ${draftScenario.inventoryLevel === option ? "bg-orange-500 text-white" : "bg-slate-800 text-slate-200"}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Alternative Supply</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {scenarioChoices.supply.map((option) => (
                  <button key={option} type="button" onClick={() => updateDraftScenario("alternativeSupply", option)} className={`rounded-full px-3 py-2 text-sm font-semibold ${draftScenario.alternativeSupply === option ? "bg-orange-500 text-white" : "bg-slate-800 text-slate-200"}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              ["Inventory Runway", `${simulation.inventoryRunway} days`],
              ["Supply Coverage", `${simulation.supplyCoverage}%`],
              ["Demand Exposure", `${simulation.demandExposure}%`],
              ["Cost Impact", `$${simulation.costImpact.toFixed(1)}M`],
              ["Delivery Delay", `${simulation.deliveryDelay} days`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</p>
                <p className="mt-3 text-2xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="alternatives" className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">Alternatives</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-white">Response options</h3>
            </div>
            <div className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm text-slate-200">
              Selected alternatives: {selectedAlternatives.length}/3
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {alternativeOptions.map((option) => {
              const isSelected = selectedAlternatives.includes(option.id);
              return (
                <div key={option.id} className={`rounded-2xl border p-4 ${isSelected ? "border-orange-500/60 bg-orange-500/5" : "border-slate-800 bg-slate-950"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-bold text-white">{option.name}</p>
                      <p className="mt-1 text-sm text-slate-400">Capacity {option.capacity}</p>
                    </div>
                    <input type="checkbox" checked={isSelected} onChange={() => toggleAlternative(option.id)} className="mt-1 h-4 w-4 accent-orange-500" />
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between"><span>Capacity</span><span className="font-semibold text-white">{option.capacity}</span></div>
                    <div className="flex justify-between"><span>Delivery time</span><span className="font-semibold text-white">{option.deliveryTime}</span></div>
                    <div className="flex justify-between"><span>Cost impact</span><span className="font-semibold text-white">{option.costImpact}</span></div>
                    <div className="flex justify-between"><span>Risk</span><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${getTone(option.risk)}`}>{option.risk}</span></div>
                    <div className="flex justify-between"><span>Readiness</span><span className="font-semibold text-white">{option.readiness}</span></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" onClick={() => setCompareOpen(true)} className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white">
              Compare Selected
            </button>
          </div>
        </section>

        {compareOpen ? (
          <section className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">Compare Options</p>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-white">Trade-offs</h3>
              </div>
              <button type="button" onClick={() => scrollToSection("ai-analysis")} className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800">
                Generate Continuity Plan
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm text-slate-200">
                <thead>
                  <tr>
                    <th className="py-2 pr-4 text-[10px] uppercase tracking-[0.18em] text-slate-400">Option</th>
                    <th className="py-2 pr-4 text-[10px] uppercase tracking-[0.18em] text-slate-400">Supply Coverage</th>
                    <th className="py-2 pr-4 text-[10px] uppercase tracking-[0.18em] text-slate-400">Delivery Time</th>
                    <th className="py-2 pr-4 text-[10px] uppercase tracking-[0.18em] text-slate-400">Cost</th>
                    <th className="py-2 pr-4 text-[10px] uppercase tracking-[0.18em] text-slate-400">Risk</th>
                    <th className="py-2 pr-4 text-[10px] uppercase tracking-[0.18em] text-slate-400">Readiness</th>
                  </tr>
                </thead>
                <tbody>
                  {getSelectedAlternatives(selectedAlternatives).map((option) => (
                    <tr key={option.id} className="rounded-2xl bg-slate-950">
                      <td className="rounded-l-2xl px-3 py-3 font-semibold text-white">{option.name}</td>
                      <td className="px-3 py-3">{option.supplyCoverage}%</td>
                      <td className="px-3 py-3">{option.deliveryTime}</td>
                      <td className="px-3 py-3">{option.costImpact}</td>
                      <td className="px-3 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${getTone(option.risk)}`}>{option.risk}</span></td>
                      <td className="rounded-r-2xl px-3 py-3">{option.readiness}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Alternative Supplier A", "Higher capacity, moderate cost, medium implementation time."],
                ["Alternative Route", "Longer delivery, higher transportation cost, lower supplier dependency."],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-base font-bold text-white">{title}</p>
                  <p className="mt-2 text-sm text-slate-300">{detail}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section id="ai-analysis" className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">Bridge AI</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-white">AI continuity analyst</h3>
            </div>
            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
              AI-generated prototype analysis based on simulated data.
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              ["What happens if disruption lasts 90 days?", "90-day"],
              ["Which facilities are most exposed?", "facilities"],
              ["Compare selected alternatives.", "compare"],
              ["Create executive summary.", "summary"],
            ].map(([label, type]) => (
              <button key={type} type="button" onClick={() => handleAiClick(type as "90-day" | "facilities" | "compare" | "summary")} className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800">
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {aiResponses.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-base font-bold text-white">{item.recommendation}</p>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div><span className="font-semibold text-white">Reason:</span> {item.reason}</div>
                  <div><span className="font-semibold text-white">Expected Impact:</span> {item.expectedImpact}</div>
                  <div><span className="font-semibold text-white">Assumptions:</span> {item.assumptions}</div>
                </div>
                <button type="button" onClick={() => handleAddToDecisionPlan(item)} className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                  Add to Decision Plan
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="decision-plan" className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">Decision Plan</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-white">Continuity response plan</h3>
            </div>
            <button type="button" onClick={handleGenerateBrief} className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white">
              Generate Executive Brief
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {Array.from(new Set(planItems.map((item) => item.phase))).map((phase) => (
              <div key={phase} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-300">{phase}</p>
                <div className="mt-4 space-y-3">
                  {planItems
                    .filter((item) => item.phase === phase)
                    .map((item) => (
                      <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-base font-semibold text-white">{item.title}</p>
                          <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-400">
                            <span>Owner: {item.owner}</span>
                            <span>Deadline: {item.deadline}</span>
                          </div>
                        </div>
                        <select value={item.status} onChange={(event) => handleStatusChange(item.id, event.target.value as DecisionTask["status"])} className="rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none">
                          {[
                            "Not Started",
                            "In Progress",
                            "Completed",
                            "Blocked",
                          ].map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div id="inventory" className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">Inventory</p>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-white">Facility coverage</h3>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-300">Runway {simulation.inventoryRunway}d</span>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-200">
                <thead>
                  <tr>
                    <th className="py-2 pr-4 text-[10px] uppercase tracking-[0.18em] text-slate-400">Facility</th>
                    <th className="py-2 pr-4 text-[10px] uppercase tracking-[0.18em] text-slate-400">Inventory</th>
                    <th className="py-2 pr-4 text-[10px] uppercase tracking-[0.18em] text-slate-400">Daily Consumption</th>
                    <th className="py-2 pr-4 text-[10px] uppercase tracking-[0.18em] text-slate-400">Days Remaining</th>
                    <th className="py-2 pr-4 text-[10px] uppercase tracking-[0.18em] text-slate-400">Criticality</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryFacilities.map((facility) => (
                    <tr key={facility.facility} className="border-t border-slate-800">
                      <td className="py-3 pr-4 font-medium text-white">{facility.facility}</td>
                      <td className="py-3 pr-4">{facility.inventory}</td>
                      <td className="py-3 pr-4">{facility.dailyConsumption}</td>
                      <td className="py-3 pr-4">{facility.daysRemaining}</td>
                      <td className="py-3 pr-4"><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${getTone(facility.criticality)}`}>{facility.criticality}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-700 bg-[#020d1f] p-4 shadow-inner shadow-slate-950/50">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xl font-bold text-slate-100">Inventory runway chart</p>
                <span className="text-sm font-medium text-sky-300">Current: {simulation.inventoryRunway} days</span>
              </div>

              <div className="h-[220px] w-full overflow-hidden rounded-[18px] bg-[#020d1f]">
                <svg viewBox="0 0 700 180" className="h-full w-full" preserveAspectRatio="none" aria-label="Inventory runway chart">
                  <defs>
                    <linearGradient id="runwayFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.04" />
                    </linearGradient>
                  </defs>

                  {[0, 25, 50, 75, 100].map((tick) => (
                    <line
                      key={tick}
                      x1="35"
                      x2="675"
                      y1={20 + tick * 1.3}
                      y2={20 + tick * 1.3}
                      stroke="#1e2d45"
                      strokeDasharray="4 6"
                    />
                  ))}

                  <path
                    d="M 35 130 L 135 120 L 245 108 L 350 92 L 460 110 L 575 72 L 675 58 L 675 150 L 35 150 Z"
                    fill="url(#runwayFill)"
                  />

                  <path
                    d="M 35 130 L 135 120 L 245 108 L 350 92 L 460 110 L 575 72 L 675 58"
                    fill="none"
                    stroke="#7dd3fc"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {[35, 135, 245, 350, 460, 575, 675].map((x, idx) => (
                    <g key={x}>
                      <circle cx={x} cy={[130, 120, 108, 92, 110, 72, 58][idx]} r="3" fill="#7dd3fc" />
                      <text x={x} y="170" textAnchor="middle" fontSize="12" fill="#8aa3bd">{idx + 1}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          <div id="alerts" className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">Alerts</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-white">Operational notices</h3>
            </div>

            <div className="mt-6 space-y-3">
              {alerts.map((alert) => (
                <button key={alert.id} type="button" onClick={() => setSelectedAlert(alert)} className={`w-full rounded-2xl border p-3 text-left ${selectedAlert.id === alert.id ? "border-orange-500/60 bg-orange-500/5" : "border-slate-800 bg-slate-950"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${getTone(alert.severity)}`}>{alert.severity}</span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Alert</span>
                  </div>
                  <p className="mt-3 text-base font-semibold text-white">{alert.title}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Alert Detail</p>
              <p className="mt-3 text-base font-semibold text-white">{selectedAlert.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{selectedAlert.detail}</p>
            </div>
          </div>
        </section>

        {executiveSummary ? (
          <section className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">Executive Summary</p>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-white">Continuity brief</h3>
              </div>
              <button type="button" onClick={() => window.print()} className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800">
                Download / Print Summary
              </button>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Current scenario</p>
                <p className="mt-2 text-2xl font-black text-white">{executiveSummary.currentScenario}</p>
                <div className="mt-4 space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between"><span>Current exposure</span><span className="font-semibold text-white">{executiveSummary.currentExposure}</span></div>
                  <div className="flex justify-between"><span>Inventory runway</span><span className="font-semibold text-white">{executiveSummary.inventoryRunway}</span></div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Selected response</p>
                <p className="mt-2 text-lg font-semibold text-white">{executiveSummary.selectedResponse}</p>
                <div className="mt-4 space-y-2 text-sm text-slate-300">
                  {executiveSummary.keyRisks.map((risk) => (
                    <div key={risk} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-500" /> {risk}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Next actions</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {executiveSummary.nextActions.map((action) => (
                  <span key={action} className="rounded-full bg-slate-800 px-3 py-1.5 text-sm text-slate-200">{action}</span>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col items-center text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">Product Demo</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">See StraitBridge in Action</h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              This 2-minute walkthrough shows how the control tower helps teams assess disruption, compare response options, and coordinate a continuity plan in real time.
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-[26px] border border-slate-700 bg-slate-950 shadow-[0_30px_80px_rgba(2,6,23,0.7)]">
            <video
              className="h-full w-full max-h-[620px] object-cover"
              controls
              preload="metadata"
              playsInline
            >
              <source src="/straitbridge-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </div>
    </main>
  );
}
