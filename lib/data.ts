export const stats = [
  { title: "Total generation", value: "1.84 GW", change: "+8.4%", label: "vs last week" },
  { title: "Demand served", value: "92.7%", change: "+2.1%", label: "on-time delivery" },
  { title: "Peak demand", value: "4.6 kV", change: "+1.3%", label: "loading threshold" },
  { title: "Incidents", value: "14", change: "-3", label: "resolved this week" },
];

export const routes = [
  {
    name: "North Grid Loop",
    region: "Northwest Region",
    utilization: "78%",
    delta: "+4.2% load demand",
    status: "Stable" as const,
  },
  {
    name: "Coastal Export",
    region: "Atlantic Corridor",
    utilization: "86%",
    delta: "+9.8% congestion risk",
    status: "Warning" as const,
  },
  {
    name: "Desert Relay",
    region: "South Sector",
    utilization: "94%",
    delta: "Critical efficiency drift",
    status: "Critical" as const,
  },
];

export const scenarios = [
  { title: "Heatwave surge", forecast: "+19.2%", impact: "High", intensity: "8.7/10" },
  { title: "Storm disruption", forecast: "-12.4%", impact: "Medium", intensity: "6.1/10" },
  { title: "Demand balancing", forecast: "+7.8%", impact: "Low", intensity: "3.9/10" },
];
