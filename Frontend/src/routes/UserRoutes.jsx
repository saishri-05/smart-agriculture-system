import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RobotProvider } from "../context/RobotContext";
import { LanguageProvider } from "../context/LanguageContext";
import Home from "../user/home/Home";
import Login from "../user/pages/Login";
import Onboarding from "../user/onboarding/Onboarding";
import Dashboard from "../user/dashboard/Dashboard";
import Farms from "../user/farms/Farms";
import Robots from "../user/robots/Robots";
import RobotAssignment from "../user/robots/RobotAssignment";
import Analytics from "../user/analytics/Analytics";
import AIRecommendations from "../user/analytics/AIRecommendations";
import HistoricalData from "../user/analytics/HistoricalData";
import Alerts from "../user/alerts/Alerts";
import SensorsDetails from "../user/sensors/SensorsDetails";
import SettingsPage from "../user/settings/SettingsPage";

function UserRoutes() {
  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <BrowserRouter>
      <LanguageProvider>
      <RobotProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/robot-assignment" element={<RobotAssignment />} />
        <Route path="/robots" element={<Robots />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ai-recommendations" element={<AIRecommendations />} />
        <Route path="/historical-data" element={<HistoricalData />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/sensors-details" element={<SensorsDetails />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      </RobotProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default UserRoutes;
