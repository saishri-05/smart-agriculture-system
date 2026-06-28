import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  Brain,
  ChartColumn,
  CheckCircle2,
  Cpu,
  LayoutDashboard,
  Link as LinkIcon,
  LogOut,
  Menu,
  Search,
  Settings,
  Sprout,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/sensors-details", label: "Sensors Details", icon: Cpu },
  { to: "/farms", label: "Farms", icon: Sprout },
  { to: "/robots", label: "Robots", icon: Bot },
  { to: "/robot-assignment", label: "Robot Assignment", icon: LinkIcon },
  { to: "/ai-recommendations", label: "AI Recommendations", icon: Brain },
  { to: "/historical-data", label: "Historical Data", icon: ChartColumn },
  { to: "/alerts", label: "Alerts", icon: Bell, count: 4 },
  { to: "/settings", label: "Settings", icon: Settings },
];

const searchData = [
  { label: "Sector A", type: "Farm Sector", route: "/farms", icon: Sprout, desc: "Rice — 5.2 acres" },
  { label: "Sector B", type: "Farm Sector", route: "/farms", icon: Sprout, desc: "Wheat — 4.8 acres" },
  { label: "Sector C", type: "Farm Sector", route: "/farms", icon: Sprout, desc: "Corn — 3.5 acres" },
  { label: "Sector D", type: "Farm Sector", route: "/farms", icon: Sprout, desc: "Tomato — 6.0 acres" },
  { label: "Green Valley Farm", type: "Farm", route: "/farms", icon: Sprout, desc: "Main farm" },
  { label: "Robot #1", type: "Robot", route: "/robots", icon: Bot, desc: "Harvester — Active" },
  { label: "Robot #2", type: "Robot", route: "/robots", icon: Bot, desc: "Weeder — Active" },
  { label: "Robot #3", type: "Robot", route: "/robots", icon: Bot, desc: "Sprayer — Charging" },
  { label: "Robot #4", type: "Robot", route: "/robots", icon: Bot, desc: "Soil Analyzer — Low Battery" },
  { label: "Robot #5", type: "Robot", route: "/robots", icon: Bot, desc: "Irrigator — Idle" },
  { label: "Low Soil Moisture", type: "Alert", route: "/alerts", icon: AlertTriangle, desc: "Sector C — 34%" },
  { label: "pH Abnormal", type: "Alert", route: "/alerts", icon: AlertTriangle, desc: "Sector D — 8.9 pH" },
  { label: "Sensor Offline", type: "Alert", route: "/alerts", icon: AlertTriangle, desc: "Temperature sensor #7" },
  { label: "Pest Detected", type: "Alert", route: "/alerts", icon: AlertTriangle, desc: "Sector A — northeast corner" },
  { label: "Battery Low", type: "Alert", route: "/alerts", icon: AlertTriangle, desc: "Robot #4 at 15%" },
  { label: "Nitrogen (N)", type: "Sensor", route: "/sensors-details", icon: Cpu, desc: "48 mg/kg — Good" },
  { label: "Phosphorus (P)", type: "Sensor", route: "/sensors-details", icon: Cpu, desc: "32 mg/kg — Low" },
  { label: "Potassium (K)", type: "Sensor", route: "/sensors-details", icon: Cpu, desc: "185 mg/kg — Good" },
  { label: "Soil Moisture", type: "Sensor", route: "/sensors-details", icon: Cpu, desc: "68% across sectors" },
  { label: "Robot Assignment", type: "Page", route: "/robot-assignment", icon: LinkIcon, desc: "Assign robots to farms" },
  { label: "AI Recommendations", type: "Page", route: "/ai-recommendations", icon: Brain, desc: "Smart farming insights" },
  { label: "Analytics", type: "Page", route: "/analytics", icon: BarChart3, desc: "Charts and reports" },
  { label: "Historical Data", type: "Page", route: "/historical-data", icon: ChartColumn, desc: "Activity logs" },
];

function AppShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? searchData.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  function handleSearchSelect(item) {
    setSearchQuery("");
    setSearchOpen(false);
    navigate(item.route);
  }

  return (
    <div className="min-h-screen text-[#111827]">
      <header className="glass-navbar sticky top-0 z-40 flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <button
            className="rounded-xl p-2 text-[#0F2440] hover:bg-black/5 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold text-[#111827]">
            <Sprout size={28} className="text-[#10B981]" />
            <span className="hidden sm:inline">Smart Agriculture</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]" size={18} />
              <input
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => searchQuery.trim() && setSearchOpen(true)}
                className="w-56 rounded-xl border border-white/50 bg-white/30 py-2 pl-10 pr-4 text-sm font-[400] text-[#111827] outline-none transition placeholder:text-[#8E8E93] focus:border-[#10B981]/30 focus:bg-white/60 lg:w-64"
                placeholder="Search farms, robots, alerts..."
              />
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-white/50 bg-white shadow-lg backdrop-blur-xl">
                  {searchResults.map((item, i) => (
                    <button key={i} onClick={() => handleSearchSelect(item)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[rgba(16,185,129,0.06)]">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <item.icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#111827]">{item.label}</p>
                        <p className="truncate text-xs text-[#6B7280]">{item.desc} · {item.type}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Link
            to="/alerts"
            className="relative rounded-xl p-2.5 text-[#6B7280] transition hover:bg-black/5"
          >
            <Bell size={22} />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-xs font-bold text-white">
              4
            </span>
          </Link>
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10B981] text-sm font-bold text-white transition hover:bg-[#059669]"
            >
              JD
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48">
                <div className="glass-card !rounded-xl !p-1.5">
                  <button
                    onClick={() => { navigate("/settings"); setProfileOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#111827] transition hover:bg-black/5"
                  >
                    <User size={16} /> My Profile
                  </button>
                  <button
                    onClick={() => { navigate("/login"); setProfileOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#EF4444] transition hover:bg-[rgba(239,68,68,0.06)]"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="glass-card relative h-full w-72 overflow-y-auto px-4 pt-4 !rounded-none">
            <div className="mb-2 flex items-center gap-3 border-b border-white/30 pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981] text-sm font-bold text-white">
                JD
              </span>
              <div>
                <p className="font-bold text-[#111827]">John Doe</p>
                <p className="text-sm text-[#6B7280]">Farm Owner</p>
              </div>
            </div>
            <div className="space-y-1 pb-6">
              {navItems.map((item) => {
                const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition ${
                      active
                        ? "bg-[#10B981]/10 text-[#10B981]"
                        : "text-[#6B7280] hover:bg-black/5"
                    }`}
                  >
                    <item.icon size={22} />
                    <span className="flex-1">{item.label}</span>
                    {item.count ? (
                      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#EF4444] px-2 text-xs font-bold text-white">
                        {item.count}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="glass-sidebar fixed inset-y-0 left-0 z-20 hidden w-64 flex-col pt-16 text-white md:flex">
        <div className="px-5 py-6">
          <p className="text-sm font-[400] text-white/60">IoT & AI Farming</p>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.filter((i) => i.to !== "/alerts").map((item) => {
            const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white/90"
                }`}
              >
                <item.icon size={20} />
                <span className="flex-1">{item.label}</span>
                {item.count ? (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1.5 text-xs font-bold text-white">
                    {item.count}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-5 py-6 text-sm font-[400] text-white/40">
          © 2026 Smart Agriculture
        </div>
      </aside>

      <main className="px-4 py-8 md:ml-64 md:px-10 lg:px-12">
        {children}
      </main>
    </div>
  );
}

export default AppShell;
