import { alternativeOptions } from "@/data/straitbridge";
import type {
  AIRecommendation,
  AlternativeOption,
  ScenarioState,
  SimulationResult,
} from "@/types/straitbridge";

export function calculateScenarioOutcome(scenario: ScenarioState): SimulationResult {
  const durationFactor = scenario.disruptionDuration === 30 ? 1 : scenario.disruptionDuration === 60 ? 1.4 : 1.9;
  const demandFactor = scenario.demandLevel === "Normal" ? 0 : scenario.demandLevel === "+10%" ? 1.15 : 1.35;
  const inventoryFactor = scenario.inventoryLevel === "Current" ? 1 : scenario.inventoryLevel === "Reduced" ? 0.74 : 1.22;
  const alternativeFactor = scenario.alternativeSupply === "Conservative" ? 0.88 : scenario.alternativeSupply === "Balanced" ? 1 : 1.17;

  const inventoryRunway = Math.max(6, Math.round((18 * inventoryFactor) / durationFactor));
  const supplyCoverage = Math.min(94, Math.max(46, Math.round((71 * alternativeFactor * inventoryFactor) / durationFactor)));
  const demandExposure = Math.min(68, Math.max(18, Math.round((27 * demandFactor * durationFactor) - (inventoryFactor * 8))));
  const costImpact = Math.max(2.1, Number(((8.4 * durationFactor * demandFactor) + (scenario.alternativeSupply === "Aggressive" ? 3.6 : scenario.alternativeSupply === "Balanced" ? 1.8 : 1.1)).toFixed(1)));
  const deliveryDelay = Math.min(23, Math.max(6, Math.round((12 * durationFactor) + (scenario.alternativeSupply === "Conservative" ? 5 : scenario.alternativeSupply === "Balanced" ? 2 : 0))));

  return {
    inventoryRunway,
    supplyCoverage,
    demandExposure,
    costImpact,
    deliveryDelay,
  };
}

export function getSelectedAlternatives(selectedIds: string[]) {
  return alternativeOptions.filter((option) => selectedIds.includes(option.id));
}

export function getAiResponse(
  type: "90-day" | "facilities" | "compare" | "summary",
  scenario: ScenarioState,
  selectedOptions: AlternativeOption[],
  simulation: SimulationResult,
): AIRecommendation {
  const durationLabel = `${scenario.disruptionDuration}-day disruption`;

  if (type === "90-day") {
    return {
      id: "90-day",
      recommendation: `Model ${durationLabel} with a staged response plan.`,
      reason: "A 90-day outage compounds supply risk and limits recovery options, so early reallocations become critical.",
      expectedImpact: `Protects inventory runway and reduces demand exposure by roughly ${Math.max(8, simulation.demandExposure - 8)} points.`,
      assumptions: "Assumes bundled dispatch support and balanced inventory replenishment actions within the first seven days.",
    };
  }

  if (type === "facilities") {
    return {
      id: "facilities",
      recommendation: "Prioritize Harbor Depot, North Ridge Plant, and South Logistics Center.",
      reason: "These facilities carry the lowest coverage slack and the highest critical usage rates across the simulated network.",
      expectedImpact: "Reduces customer impact by up to 18% while maintaining core continuity service levels.",
      assumptions: "Based on current simulated inventory and daily consumption values and no major weather disruptions.",
    };
  }

  if (type === "compare") {
    const optionSummary = selectedOptions.length
      ? selectedOptions.map((option) => option.name).join(" + ")
      : "Balanced strategy";

    return {
      id: "compare",
      recommendation: `Favour a combined approach using ${optionSummary}.`,
      reason: "The selected package balances coverage, implementation speed, and adoption risk better than a single-supplier or route-only response.",
      expectedImpact: `Maintains supply coverage near ${Math.min(90, simulation.supplyCoverage + 10)}% and keeps cost impact within control.`,
      assumptions: "Assumes a matched dispatch strategy and no external regulatory intervention.",
    };
  }

  return {
    id: "summary",
    recommendation: "Create an executive continuity brief emphasizing supplier validation and buffer restoration.",
    reason: "The current scenario still shows meaningful exposure, but there is a viable response path if actions begin immediately.",
    expectedImpact: "Improves continuity confidence and limits service interruptions across the most exposed facilities.",
    assumptions: "Built from the current disruption, demand, inventory, and alternative supply selections.",
  };
}

export function getSummaryText(scenario: ScenarioState, simulation: SimulationResult, selectedOptions: AlternativeOption[]) {
  const selectedSummary = selectedOptions.length
    ? selectedOptions.map((option) => option.name).join(", ")
    : "Alternative supplier + inventory buffer";

  return {
    currentScenario: `${scenario.disruptionDuration}-day disruption`,
    currentExposure: `${simulation.demandExposure}%`,
    inventoryRunway: `${simulation.inventoryRunway} days`,
    keyRisks: ["Supply shortage", "Inventory depletion", "Transportation delays"],
    selectedResponse: selectedSummary,
    nextActions: ["Reserve capacity", "Validate supplier", "Increase inventory", "Review critical demand"],
  };
}
