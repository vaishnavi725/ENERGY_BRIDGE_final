export type DemandLevel = "Normal" | "+10%" | "+20%";
export type InventoryLevel = "Current" | "Reduced" | "Increased";
export type AlternativeLevel = "Conservative" | "Balanced" | "Aggressive";
export type DurationOption = 30 | 60 | 90;
export type AlertSeverity = "HIGH" | "MEDIUM" | "LOW";
export type PlanStatus = "Not Started" | "In Progress" | "Completed" | "Blocked";

export type ScenarioState = {
  disruptionDuration: DurationOption;
  demandLevel: DemandLevel;
  inventoryLevel: InventoryLevel;
  alternativeSupply: AlternativeLevel;
};

export type SimulationResult = {
  inventoryRunway: number;
  supplyCoverage: number;
  demandExposure: number;
  costImpact: number;
  deliveryDelay: number;
};

export type AlternativeOption = {
  id: string;
  name: string;
  capacity: string;
  deliveryTime: string;
  costImpact: string;
  risk: "Low" | "Medium" | "High";
  readiness: "Ready" | "Trial" | "Planning";
  supplyCoverage: number;
};

export type AlertItem = {
  id: string;
  title: string;
  severity: AlertSeverity;
  detail: string;
};

export type DecisionTask = {
  id: string;
  phase: string;
  title: string;
  owner: string;
  deadline: string;
  status: PlanStatus;
};

export type InventoryFacility = {
  facility: string;
  inventory: number;
  dailyConsumption: number;
  daysRemaining: number;
  criticality: "Critical" | "Elevated" | "Stable";
};

export type AIRecommendation = {
  id: string;
  recommendation: string;
  reason: string;
  expectedImpact: string;
  assumptions: string;
};
