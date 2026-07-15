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
  Globe,
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
      {/* Top Navbar */}
      <header className="navbar sticky top-0 z-40 flex items-center justify-between px-4 py-2 md:px-6">
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg p-2 text-[#111827] hover:bg-black/5 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link to="/dashboard" className="flex items-center gap-2 text-lg font-bold text-[#111827]">
            <Sprout size={24} className="text-[#2E7D32]" />
            <span className="hidden sm:inline">Smart Agriculture</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
              <input
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => searchQuery.trim() && setSearchOpen(true)}
                className="h-9 w-48 rounded-lg border border-[#DDE8DD] bg-white/80 pl-9 pr-3 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#2E7D32] lg:w-56"
                placeholder="Search..."
              />
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 overflow-hidden rounded-xl border border-[#DDE8DD] bg-white shadow-lg">
                  {searchResults.map((item, i) => (
                    <button key={i} onClick={() => handleSearchSelect(item)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-[rgba(46,125,50,0.06)]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F7F3] text-[#5A7A5A]">
                        <item.icon size={14} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
                        <p className="truncate text-xs text-[#5A7A5A]">{item.desc} · {item.type}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-lg bg-[#F3F7F3] text-xs font-semibold text-[#5A7A5A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mr-1.5" />
            Online
          </div>

          <Link
            to="/alerts"
            className="relative rounded-lg p-2 text-[#5A7A5A] transition hover:bg-[#F3F7F3]"
          >
            <Bell size={20} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-bold text-white">
              4
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-lg bg-[#F3F7F3] text-xs font-semibold text-[#5A7A5A]">
            <Globe size={14} />
            EN
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2E7D32] text-xs font-bold text-white transition hover:bg-[#256D28]"
            >
              JD
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48">
                <div className="rounded-xl border border-[#DDE8DD] bg-white p-1.5 shadow-lg">
                  <button
                    onClick={() => { navigate("/settings"); setProfileOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#111827] transition hover:bg-[#F3F7F3]"
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
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="bg-white relative h-full w-72 overflow-y-auto px-4 pt-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3 pb-4 border-b border-[#DDE8DD]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E7D32] text-sm font-bold text-white">
                JD
              </span>
              <div>
                <p className="font-bold text-[#111827]">John Doe</p>
                <p className="text-sm text-[#5A7A5A]">Farm Owner</p>
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
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-[rgba(46,125,50,0.08)] text-[#2E7D32]"
                        : "text-[#5A7A5A] hover:bg-[#F3F7F3]"
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
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="sidebar fixed inset-y-0 left-0 z-20 hidden pt-14 md:flex">
        <div className="sidebar-logo">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2E7D32]">
              <Sprout size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Smart Agri</p>
              <p className="text-[10px] text-white/50">IoT & AI Farming</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.filter((i) => i.to !== "/alerts").map((item) => {
            const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`sidebar-link ${active ? "sidebar-link-active" : ""}`}
              >
                <item.icon className="sidebar-link-icon" size={20} />
                <span>{item.label}</span>
                {item.count ? (
                  <span className="sidebar-link-badge">{item.count}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-profile">
            <div className="sidebar-profile-avatar">JD</div>
            <div className="sidebar-profile-info">
              <p className="sidebar-profile-name">John Doe</p>
              <p className="sidebar-profile-role">Farm Owner</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="px-6 py-8 md:ml-64 md:px-8 lg:px-10">
        {children}
      </main>
    </div>
  );
}

export default AppShell;
