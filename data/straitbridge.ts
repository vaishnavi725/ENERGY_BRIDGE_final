import type {
  AIRecommendation,
  AlertItem,
  AlternativeOption,
  DecisionTask,
  InventoryFacility,
  ScenarioState,
} from "@/types/straitbridge";

export const initialScenario: ScenarioState = {
  disruptionDuration: 60,
  demandLevel: "Normal",
  inventoryLevel: "Current",
  alternativeSupply: "Balanced",
};

export const alternativeOptions: AlternativeOption[] = [
  {
    id: "supplier-a",
    name: "Alternative Supplier A",
    capacity: "18.5 kbd",
    deliveryTime: "10 days",
    costImpact: "+$2.1M",
    risk: "Medium",
    readiness: "Ready",
    supplyCoverage: 42,
  },
  {
    id: "supplier-b",
    name: "Alternative Supplier B",
    capacity: "14.2 kbd",
    deliveryTime: "16 days",
    costImpact: "+$1.6M",
    risk: "Low",
    readiness: "Trial",
    supplyCoverage: 35,
  },
  {
    id: "maritime-route",
    name: "Alternative Maritime Route",
    capacity: "12.8 kbd",
    deliveryTime: "21 days",
    costImpact: "+$3.4M",
    risk: "High",
    readiness: "Planning",
    supplyCoverage: 28,
  },
  {
    id: "inventory-release",
    name: "Strategic Inventory Release",
    capacity: "9.6 kbd",
    deliveryTime: "5 days",
    costImpact: "+$0.9M",
    risk: "Low",
    readiness: "Ready",
    supplyCoverage: 31,
  },
  {
    id: "demand-prioritization",
    name: "Demand Prioritization",
    capacity: "7.4 kbd",
    deliveryTime: "3 days",
    costImpact: "+$0.5M",
    risk: "Low",
    readiness: "Ready",
    supplyCoverage: 22,
  },
];

export const alerts: AlertItem[] = [
  {
    id: "inventory-runway",
    title: "Inventory runway below threshold.",
    severity: "HIGH",
    detail: "Current inventory is trending below the 21-day minimum target under a 60-day disruption scenario.",
  },
  {
    id: "supplier-capacity",
    title: "Alternative supplier capacity changed.",
    severity: "MEDIUM",
    detail: "Supplier A has increased confirmed capacity by 1.8 kbd while Supplier B remains in trial status.",
  },
  {
    id: "transport-cost",
    title: "Transportation cost assumption changed.",
    severity: "MEDIUM",
    detail: "Freight costs have risen by 6.4% for emergency routing and extended transit windows.",
  },
];

export const inventoryFacilities: InventoryFacility[] = [
  { facility: "North Ridge Plant", inventory: 2200, dailyConsumption: 90, daysRemaining: 24, criticality: "Critical" },
  { facility: "Harbor Depot", inventory: 1800, dailyConsumption: 140, daysRemaining: 13, criticality: "Elevated" },
  { facility: "Lakeside Hub", inventory: 1300, dailyConsumption: 95, daysRemaining: 14, criticality: "Elevated" },
  { facility: "Central Distribution", inventory: 2600, dailyConsumption: 110, daysRemaining: 24, criticality: "Stable" },
  { facility: "South Logistics Center", inventory: 1600, dailyConsumption: 115, daysRemaining: 14, criticality: "Critical" },
];

export const decisionTasks: DecisionTask[] = [
  {
    id: "validate-supplier",
    phase: "PHASE 1 — 0–72 HOURS",
    title: "Validate supplier availability",
    owner: "Procurement",
    deadline: "24h",
    status: "Not Started",
  },
  {
    id: "reserve-capacity",
    phase: "PHASE 1 — 0–72 HOURS",
    title: "Reserve transportation capacity",
    owner: "Logistics",
    deadline: "36h",
    status: "In Progress",
  },
  {
    id: "inventory-position",
    phase: "PHASE 1 — 0–72 HOURS",
    title: "Confirm inventory position",
    owner: "Operations",
    deadline: "48h",
    status: "Completed",
  },
  {
    id: "notify-stakeholders",
    phase: "PHASE 1 — 0–72 HOURS",
    title: "Notify stakeholders",
    owner: "Leadership",
    deadline: "72h",
    status: "Not Started",
  },
  {
    id: "activate-supplier",
    phase: "PHASE 2 — WEEK 1",
    title: "Activate alternative supply",
    owner: "Procurement",
    deadline: "5d",
    status: "Not Started",
  },
  {
    id: "adjust-procurement",
    phase: "PHASE 2 — WEEK 1",
    title: "Adjust procurement",
    owner: "Supply Chain",
    deadline: "7d",
    status: "Not Started",
  },
  {
    id: "increase-buffer",
    phase: "PHASE 2 — WEEK 1",
    title: "Increase inventory buffer",
    owner: "Operations",
    deadline: "7d",
    status: "In Progress",
  },
  {
    id: "rebalance-network",
    phase: "PHASE 3 — WEEK 2–4",
    title: "Rebalance supply network",
    owner: "Planning",
    deadline: "14d",
    status: "Not Started",
  },
  {
    id: "review-demand",
    phase: "PHASE 3 — WEEK 2–4",
    title: "Review demand priorities",
    owner: "Demand Team",
    deadline: "21d",
    status: "Not Started",
  },
  {
    id: "recalculate-risk",
    phase: "PHASE 3 — WEEK 2–4",
    title: "Recalculate exposure",
    owner: "Risk",
    deadline: "28d",
    status: "Not Started",
  },
];

export const baseAiRecommendations: AIRecommendation[] = [
  {
    id: "90-day-risk",
    recommendation: "Prepare for a 90-day disruption scenario.",
    reason: "The current network is exposed to both demand spikes and supplier delays, creating a compounding inventory risk beyond 60 days.",
    expectedImpact: "Reduce exposure by 14 points and preserve 6-8 days of inventory runway.",
    assumptions: "Assumes balanced alternative supply and no severe weather impacts beyond current baseline assumptions.",
  },
  {
    id: "facility-exposure",
    recommendation: "Prioritize Harbor Depot and South Logistics Center.",
    reason: "These facilities show the sharpest inventory depletion and are the most sensitive to service interruption under disruption conditions.",
    expectedImpact: "Protects 22% of critical volume and lowers emergency substitution costs.",
    assumptions: "Based on simulated current consumption and inventory coverage assumptions.",
  },
  {
    id: "alternative-compare",
    recommendation: "Pair Supplier A with a strategic inventory release.",
    reason: "This combination improves supply coverage while containing the cost and delivery risk associated with a longer freight cycle.",
    expectedImpact: "Improves supply coverage to 67% and limits emergency spend volatility.",
    assumptions: "Assumes balanced alternative capacity and the release is timed within the first week.",
  },
];
