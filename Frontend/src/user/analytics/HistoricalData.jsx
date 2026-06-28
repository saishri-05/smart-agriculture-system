import { useState } from "react";
import {
  AlertTriangle,
  Bug,
  CalendarDays,
  CheckCircle2,
  Download,
  Droplets,
  FlaskConical,
  Info,
  Leaf,
  RefreshCw,
  Sprout,
  Trash2,
  WifiOff,
} from "lucide-react";
import AppShell from "../components/AppShell";

const logData = [
  { id: 1, time: "2026-06-29 08:15 AM", type: "irrigation", detail: "Sector A — drip irrigation started", severity: "info", area: "Sector A" },
  { id: 2, time: "2026-06-29 07:52 AM", type: "sensor", detail: "Soil moisture dropped to 34% in Sector C", severity: "warning", area: "Sector C" },
  { id: 3, time: "2026-06-29 07:30 AM", type: "system", detail: "Robot #4 battery at 15% — returning to dock", severity: "warning", area: "Base" },
  { id: 4, time: "2026-06-29 06:45 AM", type: "crop", detail: "Sector B — weekly crop health scan completed", severity: "info", area: "Sector B" },
  { id: 5, time: "2026-06-29 06:00 AM", type: "fertilizer", detail: "Sector D — NPK 20-20-20 applied (100 kg)", severity: "info", area: "Sector D" },
  { id: 6, time: "2026-06-28 11:20 PM", type: "sensor", detail: "Temperature sensor #7 offline", severity: "error", area: "Sector A" },
  { id: 7, time: "2026-06-28 09:10 PM", type: "system", detail: "Firmware update applied to all field sensors", severity: "info", area: "All" },
  { id: 8, time: "2026-06-28 07:00 PM", type: "irrigation", detail: "Sector C — sprinklers activated (15 min)", severity: "info", area: "Sector C" },
  { id: 9, time: "2026-06-28 05:30 PM", type: "crop", detail: "Pest detected in Sector A — northeast corner", severity: "error", area: "Sector A" },
  { id: 10, time: "2026-06-28 04:15 PM", type: "fertilizer", detail: "Sector B — organic compost spread", severity: "info", area: "Sector B" },
  { id: 11, time: "2026-06-28 02:00 PM", type: "sensor", detail: "Water pH reading abnormal (8.9) in Sector D", severity: "warning", area: "Sector D" },
  { id: 12, time: "2026-06-28 12:00 PM", type: "system", detail: "Solar battery array at 94% capacity", severity: "info", area: "Base" },
  { id: 13, time: "2026-06-28 10:30 AM", type: "irrigation", detail: "Sector B — flood irrigation completed", severity: "info", area: "Sector B" },
  { id: 14, time: "2026-06-28 08:45 AM", type: "robot", detail: "Robot #2 assigned to weed removal in Sector A", severity: "info", area: "Sector A" },
  { id: 15, time: "2026-06-28 07:00 AM", type: "sensor", detail: "NPK sensor returned to normal range", severity: "info", area: "Sector C" },
];

const severityConfig = {
  info: { icon: Info, label: "Info", dot: "bg-blue-500", badge: "bg-blue-100 text-blue-700", border: "border-l-blue-500" },
  warning: { icon: AlertTriangle, label: "Warning", dot: "bg-amber-500", badge: "bg-amber-100 text-amber-700", border: "border-l-amber-500" },
  error: { icon: Bug, label: "Error", dot: "bg-red-500", badge: "bg-red-100 text-red-700", border: "border-l-red-500" },
};

const typeBadges = {
  irrigation: { icon: Droplets, label: "Irrigation", cls: "bg-cyan-100 text-cyan-700" },
  sensor: { icon: WifiOff, label: "Sensor", cls: "bg-purple-100 text-purple-700" },
  system: { icon: RefreshCw, label: "System", cls: "bg-slate-100 text-slate-700" },
  crop: { icon: Leaf, label: "Crop", cls: "bg-emerald-100 text-emerald-700" },
  fertilizer: { icon: FlaskConical, label: "Fertilizer", cls: "bg-orange-100 text-orange-700" },
  robot: { icon: Sprout, label: "Robot", cls: "bg-indigo-100 text-indigo-700" },
};

function groupByDate(entries) {
  const groups = {};
  entries.forEach((e) => {
    const d = e.time.split(" ")[0];
    if (!groups[d]) groups[d] = [];
    groups[d].push(e);
  });
  return groups;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" });
}

function HistoricalData() {
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [logs, setLogs] = useState(logData);

  function clearLogs() {
    setLogs([]);
  }

  const filtered = filterSeverity === "all" ? logs : logs.filter((l) => l.severity === filterSeverity);
  const grouped = groupByDate(filtered);
  const count = (s) => logs.filter((l) => l.severity === s).length;

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#111827" }}>Log Data</h1>
          <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>Activity and event log for your farm</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Total", value: logs.length, color: "text-[#0F2440]", border: "border-l-[#0F2440]" },
            { label: "Info", value: count("info"), color: "text-blue-700", border: "border-l-blue-500" },
            { label: "Warnings", value: count("warning"), color: "text-amber-700", border: "border-l-amber-500" },
            { label: "Errors", value: count("error"), color: "text-red-700", border: "border-l-red-500" },
          ].map((s) => (
            <div key={s.label} className={"glass-card border-l-4 p-5 " + s.border}>
              <p className="text-sm font-semibold" style={{ color: "#6B7280" }}>{s.label}</p>
              <p className={"mt-2 text-3xl font-black " + s.color}>{s.value}</p>
            </div>
          ))}
        </div>

        <section className="glass-card p-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="min-w-[160px] flex-1">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "#6B7280" }}>
                <CalendarDays size={14} /> Date
              </span>
              <select className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-sm font-semibold outline-none backdrop-blur-sm" defaultValue="7days">
                <option value="24h">Last 24 Hours</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <div className="min-w-[160px] flex-1">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide" style={{ color: "#6B7280" }}>Show</span>
              <select className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-sm font-semibold outline-none backdrop-blur-sm" value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
                <option value="all">All Events</option>
                <option value="info">Info Only</option>
                <option value="warning">Warnings Only</option>
                <option value="error">Errors Only</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl bg-[#1A3A5C] px-5 py-3 text-sm font-bold text-white hover:bg-[#0F2440]">
                <Download size={16} /> Export
              </button>
              <button onClick={clearLogs}
                className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-100">
                <Trash2 size={16} /> Clear
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          {Object.keys(grouped).length === 0 ? (
            <div className="glass-card p-12 text-center">
              <CheckCircle2 size={48} className="mx-auto text-[#10B981]" />
              <p className="mt-4 text-lg font-bold" style={{ color: "#111827" }}>All clear</p>
              <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>No log entries match your filter.</p>
            </div>
          ) : (
            Object.entries(grouped).map(([date, entries]) => (
              <div key={date}>
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-lg bg-[#1A3A5C] px-4 py-1.5 text-sm font-bold text-white">{formatDate(date)}</span>
                  <span className="text-xs font-semibold" style={{ color: "#6B7280" }}>{entries.length} event{entries.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="space-y-2">
                  {entries.map((log) => {
                    const sev = severityConfig[log.severity];
                    const typ = typeBadges[log.type];
                    const SevIcon = sev.icon;
                    const TypeIcon = typ.icon;
                    const timeOnly = log.time.split(" ").slice(1).join(" ");
                    return (
                      <div key={log.id} className={"glass-card border-l-4 p-4 " + sev.border}>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-3 min-w-0">
                            <span className={"mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg " + typ.cls}>
                              <TypeIcon size={16} />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-bold truncate" style={{ color: "#00112b" }}>{log.detail}</p>
                              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs">
                                <span style={{ color: "#6B7280" }}>{log.area}</span>
                                <span className={"rounded px-2 py-0.5 font-semibold " + typ.cls}>{typ.label}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
                            <span className="text-xs font-bold" style={{ color: "#6B7280" }}>{timeOnly}</span>
                            <span className={"inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold " + sev.badge}>
                              <SevIcon size={12} /> {sev.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </section>

        <div className="flex items-center justify-between text-sm" style={{ color: "#6B7280" }}>
          <span>{filtered.length} of {logs.length} entries</span>
          <span className="inline-flex items-center gap-1"><RefreshCw size={14} /> Live</span>
        </div>
      </section>
    </AppShell>
  );
}

export default HistoricalData;
