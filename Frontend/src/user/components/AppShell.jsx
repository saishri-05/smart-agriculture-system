import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Bell,
  Bot,
  Brain,
  LayoutDashboard,
  Link as LinkIcon,
  Settings,
  Sprout,
  User,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/farms", label: "Farms", icon: Sprout },
  { to: "/robot-assignment", label: "Robot Assignment", icon: LinkIcon },
  { to: "/robots", label: "Robots", icon: Bot },
  { to: "/alerts", label: "Alerts", icon: Bell, count: 4 },
  { to: "/ai-recommendations", label: "AI Recommendations", icon: Brain },
  { to: "/historical-data", label: "Historical Data", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

function AppShell({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f7faf4] text-[#00112b]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#2e7d32] text-white md:flex">
        <div className="px-5 py-8">
          <h1 className="text-3xl font-black leading-tight">Smart<br />Agriculture</h1>
          <p className="mt-2 text-sm font-medium text-green-100">IoT & AI Farming</p>
        </div>

        <nav className="flex-1 space-y-2 px-2">
          {navItems.map((item) => {
            const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition ${
                  active ? "bg-white/12 text-white" : "text-green-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon size={22} />
                <span className="flex-1">{item.label}</span>
                {item.count ? (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-black">
                    {item.count}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-green-700 px-5 py-6 text-sm font-medium text-green-100">
          © 2026 Smart Agriculture
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex items-center justify-between bg-[#2e7d32] px-4 py-4 text-white md:hidden">
        <Link to="/dashboard" className="text-xl font-black">Smart Agriculture</Link>
        <Link to="/alerts" className="relative rounded-lg bg-white/15 p-2">
          <Bell size={22} />
          <span className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-red-500 px-1 text-center text-xs font-black">4</span>
        </Link>
      </header>

      <main className="px-4 py-6 md:ml-64 md:px-8 lg:px-10">
        <div className="mb-6 flex items-center justify-end gap-4">
          <Link to="/alerts" className="relative rounded-lg bg-[#2e7d32] p-2.5 text-white transition hover:bg-[#1f5e1f]">
            <Bell size={20} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-black">4</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-2 rounded-lg bg-[#2e7d32] px-4 py-2.5 text-white transition hover:bg-[#1f5e1f]">
            <User size={20} />
            <span className="text-sm font-bold">Profile</span>
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}

export default AppShell;
