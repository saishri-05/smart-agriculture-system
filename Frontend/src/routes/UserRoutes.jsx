import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../user/home/Home";
import Onboarding from "../user/onboarding/Onboarding";
import Dashboard from "../user/dashboard/Dashboard";
import Farms from "../user/farms/Farms";
import Robots from "../user/robots/Robots";
import RobotAssignment from "../user/robots/RobotAssignment";
import Analytics from "../user/analytics/Analytics";
import AIRecommendations from "../user/analytics/AIRecommendations";
import HistoricalData from "../user/analytics/HistoricalData";
import Alerts from "../user/alerts/Alerts";

function UserRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/robot-assignment" element={<RobotAssignment />} />
        <Route path="/robots" element={<Robots />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ai-recommendations" element={<AIRecommendations />} />
        <Route path="/historical-data" element={<HistoricalData />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default UserRoutes;
