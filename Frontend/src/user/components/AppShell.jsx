import { Link, useLocation } from "react-router-dom";
import {
  BarChart3, Bell, Bot, Brain, LayoutDashboard, Link as LinkIcon, Settings, Sprout,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/farms", label: "Farms", icon: Sprout },
  { to: "/robot-assignment", label: "Robot Assignment", icon: LinkIcon },
  { to: "/robots", label: "Robots", icon: Bot },
  { to: "/ai-recommendations", label: "AI Recommendations", icon: Brain },
  { to: "/alerts", label: "Alerts", icon: Bell, count: 4 },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/historical-data", label: "Historical Data", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

function AppShell({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#faf0f6] text-[#00112b]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-gradient-to-b from-[#6b4f8a] to-[#8e6abf] text-white shadow-2xl shadow-[#8e6abf]/20 md:flex">
        <div className="px-6 py-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur shadow-lg">
            <Sprout size={34} />
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight">Smart<br />Agriculture</h1>
          <p className="mt-2 text-sm font-semibold text-purple-200">IoT & AI Farming</p>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-base font-bold transition-all duration-200 ${
                  active
                    ? "bg-white/20 text-white shadow-lg backdrop-blur"
                    : "text-purple-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon size={24} />
                <span className="flex-1">{item.label}</span>
                {item.count ? (
                  <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-gradient-to-r from-red-400 to-red-300 px-2 text-xs font-black shadow-md">
                    {item.count}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-purple-600/30 px-6 py-6 text-sm font-semibold text-purple-200">
          © 2026 Smart Agriculture
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex items-center justify-between bg-gradient-to-r from-[#6b4f8a] to-[#8e6abf] px-6 py-5 text-white shadow-lg md:hidden">
        <Link to="/dashboard" className="flex items-center gap-3 text-xl font-black">
          <Sprout size={28} /> Smart Agriculture
        </Link>
        <Link to="/alerts" className="relative rounded-2xl bg-white/15 p-3 backdrop-blur transition-all hover:bg-white/25">
          <Bell size={24} />
          <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-gradient-to-r from-red-400 to-red-300 px-1 text-xs font-black shadow-md">4</span>
        </Link>
      </header>

      <main className="px-6 py-8 md:ml-64 md:px-10 lg:px-12">{children}</main>
    </div>
  );
}

export default AppShell;
