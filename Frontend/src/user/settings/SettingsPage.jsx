import { Bell } from "lucide-react";
import AppShell from "../components/AppShell";

const toggleClass =
  "peer sr-only";
const trackClass =
  "absolute inset-0 rounded-full bg-[#7A9CB8] transition-all duration-200 peer-checked:bg-[#2E7D32] peer-focus:ring-4 peer-focus:ring-[rgba(46,125,50,0.15)]";
const thumbClass =
  "absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200 peer-checked:translate-x-5";

function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">System Settings</h1>
          <p className="mt-1 text-sm font-[400] text-[#5A7A5A]">Manage your notification preferences</p>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="space-y-8">
            <Section title="System Alerts">
              <ToggleRow label="Critical threshold warnings (e.g. Urgent Water Needs)" defaultChecked />
              <ToggleRow label="Sensor offline / disconnection alerts" defaultChecked />
              <ToggleRow label="Battery low warnings for field devices" defaultChecked />
            </Section>

          </div>
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
    <div className="card flex items-center justify-between">
      <p className="text-sm font-semibold text-[#5A7A5A]">{label}</p>
      <label className="relative inline-flex h-7 w-12 cursor-pointer items-center">
        <input type="checkbox" className={toggleClass} defaultChecked={defaultChecked} />
        <span className={trackClass} />
        <span className={thumbClass} />
      </label>
    </div>
  );
}

export default SettingsPage;
