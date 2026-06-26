import { useState } from "react";
import {
  Bell,
  Database,
  Globe,
  Key,
  Moon,
  RefreshCw,
  Save,
  Shield,
  Sun,
  Trash2,
  Users,
} from "lucide-react";
import AppShell from "../components/AppShell";

const tabs = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "data", label: "Data Management", icon: Database },
  { id: "security", label: "Security", icon: Shield },
  { id: "preferences", label: "Preferences", icon: Globe },
];

const toggleClass =
  "peer sr-only";
const trackClass =
  "absolute inset-0 rounded-full bg-[#7A9CB8] transition-all duration-200 peer-checked:bg-[#0F2440] peer-focus:ring-4 peer-focus:ring-[#D0E0F0]";
const thumbClass =
  "absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200 peer-checked:translate-x-5";

const selectClass =
  "w-full rounded-xl border border-white/50 bg-white/30 px-4 py-3 text-sm font-semibold text-[#111827] outline-none transition focus:border-[#10B981]/50 focus:ring-2 focus:ring-[rgba(16,185,129,0.15)]";

const inputClass =
  "w-full rounded-xl border border-white/50 bg-white/30 px-4 py-3 text-sm font-semibold text-[#111827] outline-none transition focus:border-[#10B981]/50 focus:ring-2 focus:ring-[rgba(16,185,129,0.15)]";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications");
  const [darkMode, setDarkMode] = useState(false);

  const TabContent = () => {
    switch (activeTab) {
      case "notifications":
        return (
          <div className="space-y-8">
            <Section title="System Alerts">
              <ToggleRow label="Critical threshold warnings (e.g. Urgent Water Needs)" defaultChecked />
              <ToggleRow label="Sensor offline / disconnection alerts" defaultChecked />
              <ToggleRow label="Battery low warnings for field devices" defaultChecked />
            </Section>
            <Section title="Report Frequency">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-[#6B7280]">Daily Summary</span>
                  <select className={selectClass} defaultValue="disabled">
                    <option value="disabled">Disabled</option>
                    <option value="6am">6:00 AM</option>
                    <option value="12pm">12:00 PM</option>
                    <option value="6pm">6:00 PM</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-[#6B7280]">Weekly Summary</span>
                  <select className={selectClass} defaultValue="monday">
                    <option value="disabled">Disabled</option>
                    <option value="monday">Every Monday</option>
                    <option value="friday">Every Friday</option>
                    <option value="sunday">Every Sunday</option>
                  </select>
                </label>
              </div>
            </Section>
          </div>
        );
      case "data":
        return (
          <div className="space-y-8">
            <Section title="Backup & Restore">
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-3 text-sm font-semibold text-white hover:bg-[#059669]">
                  <Database size={18} /> Backup Historical Data
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 bg-white/30 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <RefreshCw size={18} /> Restore from Backup
                </button>
              </div>
            </Section>
            <Section title="Automated Data Purge">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-[#6B7280]">Archive telemetry data older than</span>
                  <select className={selectClass} defaultValue="1year">
                    <option value="3months">3 Months</option>
                    <option value="6months">6 Months</option>
                    <option value="1year">1 Year</option>
                    <option value="2years">2 Years</option>
                    <option value="never">Never</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-[#6B7280]">Auto-delete old reports after</span>
                  <select className={selectClass} defaultValue="never">
                    <option value="3months">3 Months</option>
                    <option value="6months">6 Months</option>
                    <option value="1year">1 Year</option>
                    <option value="never">Keep Forever</option>
                  </select>
                </label>
              </div>
            </Section>
            <Section title="Sync Controls">
              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-3 text-sm font-semibold text-white hover:bg-[#059669]">
                  <RefreshCw size={18} /> Sync Now — All Field Hardware
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#EF4444]/30 bg-[rgba(239,68,68,0.06)] px-6 py-3 text-sm font-black text-[#EF4444] transition hover:bg-red-100">
                  <Trash2 size={18} /> Clear Temporary Cache
                </button>
              </div>
            </Section>
          </div>
        );
      case "security":
        return (
          <div className="space-y-8">
            <Section title="System Master Password">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-[#6B7280]">Current Password</span>
                  <input className={inputClass} type="password" placeholder="••••••••" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-[#6B7280]">New Password</span>
                  <input className={inputClass} type="password" placeholder="New master password" />
                </label>
              </div>
            </Section>
            <Section title="IoT Device API Keys">
              <div className="space-y-4">
                {["Sensor Network API", "Weather API", "Robot Fleet API"].map((name) => (
                  <div key={name} className="flex items-center justify-between rounded-xl border border-white/30 bg-white/20 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Key size={18} className="text-slate-500" />
                      <span className="font-bold text-slate-700">{name}</span>
                    </div>
                    <button className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-200">
                      Rotate Key
                    </button>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="Role-Based Access Control">
              <div className="space-y-3">
                {[
                  { role: "Farm Manager", users: 3, badge: "bg-[#10B981] text-white" },
                  { role: "Field Technician", users: 5, badge: "bg-blue-100 text-blue-700" },
                  { role: "Read-Only Operator", users: 2, badge: "bg-slate-100 text-slate-700" },
                ].map((r) => (
                  <div key={r.role} className="flex items-center justify-between rounded-xl border border-white/30 bg-white/20 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Users size={18} className="text-slate-500" />
                      <span className="font-bold text-slate-700">{r.role}</span>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${r.badge}`}>{r.users} Users</span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        );
      case "preferences":
        return (
          <div className="space-y-8">
            <Section title="Appearance">
              <div className="flex items-center justify-between rounded-xl border border-white/30 bg-white/20 px-5 py-4">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon size={20} className="text-slate-600" /> : <Sun size={20} className="text-slate-600" />}
                  <div>
                    <p className="font-bold text-slate-700">Dark Mode</p>
                    <p className="text-sm text-slate-500">Switch between light and dark theme</p>
                  </div>
                </div>
                <label className="relative inline-flex h-7 w-12 cursor-pointer items-center">
                  <input type="checkbox" className={toggleClass} checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                  <span className={trackClass} />
                  <span className={thumbClass} />
                </label>
              </div>
            </Section>
            <Section title="Measurement Units">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-[#6B7280]">Distance / Area</span>
                  <select className={selectClass} defaultValue="metric">
                    <option value="metric">Metric (ha, m, cm)</option>
                    <option value="imperial">Imperial (acres, ft, in)</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-[#6B7280]">Temperature</span>
                  <select className={selectClass} defaultValue="celsius">
                    <option value="celsius">Celsius (°C)</option>
                    <option value="fahrenheit">Fahrenheit (°F)</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-[#6B7280]">Precipitation</span>
                  <select className={selectClass} defaultValue="mm">
                    <option value="mm">Millimeters (mm)</option>
                    <option value="inches">Inches (in)</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-[#6B7280]">Time Zone</span>
                  <select className={selectClass} defaultValue="utc">
                    <option value="utc">UTC (Coordinated Universal Time)</option>
                    <option value="est">EST (Eastern Standard Time)</option>
                    <option value="pst">PST (Pacific Standard Time)</option>
                    <option value="ist">IST (India Standard Time)</option>
                  </select>
                </label>
              </div>
            </Section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">System Settings</h1>
          <p className="mt-1 text-sm font-[400] text-[#6B7280]">Configure notifications, data, security, and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-5 py-4 text-sm font-black transition ${
                  active
                    ? "border-[#10B981] text-[#10B981]"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="glass-card p-7">
          <TabContent />
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#10B981] px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#059669]">
            <Save size={20} /> Save All Changes
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 text-base font-bold text-[#111827]">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function ToggleRow({ label, defaultChecked }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/30 bg-white/20 px-5 py-4">
      <p className="text-sm font-semibold text-[#6B7280]">{label}</p>
      <label className="relative inline-flex h-7 w-12 cursor-pointer items-center">
        <input type="checkbox" className={toggleClass} defaultChecked={defaultChecked} />
        <span className={trackClass} />
        <span className={thumbClass} />
      </label>
    </div>
  );
}

export default SettingsPage;
