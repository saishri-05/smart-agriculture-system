import { createContext, useContext } from "react";

const robots = [
  { id: "ROB-001", name: "AgriBot Alpha", model: "Harvester v3", farm: "Green Valley Farm", status: "Active", battery: 85, lastSeen: "5 mins ago" },
  { id: "ROB-002", name: "AgriBot Beta", model: "Weeder v2", farm: "Sunny Acres", status: "Active", battery: 45, lastSeen: "12 mins ago" },
  { id: "ROB-003", name: "AgriBot Gamma", model: "Sprayer v2", farm: "Green Valley Farm", status: "Charging", battery: 20, lastSeen: "1 hour ago" },
  { id: "ROB-004", name: "AgriBot Delta", model: "Soil Analyzer v1", farm: "Riverside Farm", status: "Idle", battery: 100, lastSeen: "2 hours ago" },
  { id: "ROB-005", name: "AgriBot Epsilon", model: "Irrigator v3", farm: "Sunny Acres", status: "Offline", battery: 0, lastSeen: "1 day ago" },
];

const RobotContext = createContext({ robots });

export function RobotProvider({ children }) {
  return <RobotContext.Provider value={{ robots }}>{children}</RobotContext.Provider>;
}

export function useRobots() {
  return useContext(RobotContext);
}
