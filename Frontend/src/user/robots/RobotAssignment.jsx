import { useState, useCallback, useEffect, useRef } from "react";
import { Bot, Check, ChevronDown, Clock, MapPin, Search, X } from "lucide-react";
import AppShell from "../components/AppShell";

const availableRobots = [
  { name: "AgriBot Gamma", id: "ROB-003", battery: 20, status: "charging", location: "Base Station", lastSeen: "1 hour ago" },
  { name: "AgriBot Delta", id: "ROB-004", battery: 100, status: "idle", location: "Base Station", lastSeen: "2 hours ago" },
];

const farms = [
  { name: "Green Valley Farm", crop: "Wheat", robots: ["ROB-001"] },
  { name: "Sunny Acres", crop: "Corn", robots: ["ROB-002"] },
  { name: "Riverside Farm", crop: "Rice", robots: [] },
];

const statusLabel = { idle: "Ready", active: "Busy", charging: "Charging", maintenance: "Maintenance" };
const statusColor = { idle: "badge-success", active: "badge-info", charging: "badge-warning", maintenance: "badge-danger" };

function batteryColor(v) {
  if (v <= 25) return "bg-red-500";
  if (v <= 50) return "bg-yellow-500";
  return "bg-[#2E7D32]";
}

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={"fixed top-6 right-6 z-[60] flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-2xl text-sm font-bold transition-all " + (type === "success" ? "bg-[#2E7D32] text-white" : "bg-red-600 text-white")}>
      {type === "success" ? <Check size={18} /> : <X size={18} />}
      {message}
    </div>
  );
}

function SelectFarm({ farms, selectedFarm, setSelectedFarm }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = farms.filter(f => f.name.toLowerCase().includes(query.toLowerCase()) || f.crop.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="relative" ref={ref}>
      <label className="mb-2 block text-sm font-semibold text-[#5A7A5A] uppercase tracking-wide">Select Farm</label>
      <button onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border-2 border-[#DDE8DD] bg-white px-5 py-4 text-left text-lg font-bold text-[#111827] hover:border-[#2E7D32] transition">
        <span className={selectedFarm ? "" : "text-[#9CA3AF] font-normal"}>
          {selectedFarm ? selectedFarm.name : "Choose a farm..."}
        </span>
        <ChevronDown size={22} className={"text-[#5A7A5A] transition " + (open ? "rotate-180" : "")} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-10 rounded-xl border border-[#DDE8DD] bg-white shadow-xl overflow-hidden">
          <div className="flex items-center gap-3 border-b border-[#DDE8DD] px-4 py-3">
            <Search size={18} className="text-[#9CA3AF] shrink-0" />
            <input className="w-full text-base outline-none bg-transparent" placeholder="Search farms..." autoFocus
              value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.map(f => (
              <button key={f.name} onClick={() => { setSelectedFarm(f); setOpen(false); setQuery(""); }}
                className={"flex w-full items-center justify-between px-5 py-3.5 text-left transition hover:bg-[#F3F7F3] " + (selectedFarm?.name === f.name ? "bg-[rgba(46,125,50,0.08)]" : "")}>
                <div>
                  <p className="font-bold text-[#111827]">{f.name}</p>
                  {f.crop && <p className="text-sm text-[#5A7A5A]">{f.crop}</p>}
                </div>
                {selectedFarm?.name === f.name && <Check size={18} className="text-[#2E7D32]" />}
              </button>
            ))}
            {filtered.length === 0 && <p className="px-5 py-8 text-center text-sm text-[#5A7A5A]">No farms found</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function RobotCard({ robot, onAssign, onRemove, showAssign, showRemove }) {
  return (
    <div className="rounded-xl border border-[#DDE8DD] bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="rounded-xl bg-[rgba(46,125,50,0.1)] p-3 text-[#2E7D32] shrink-0">
            <Bot size={26} />
          </span>
          <div className="min-w-0">
            <p className="text-lg font-black text-[#111827]">{robot.id}</p>
            {robot.name && <p className="text-sm text-[#5A7A5A] truncate">{robot.name}</p>}
          </div>
        </div>
        <span className={"badge shrink-0 " + (statusColor[robot.status] || "badge-neutral")}>
          {statusLabel[robot.status] || robot.status}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1">
          <div className="flex justify-between text-sm font-semibold mb-1">
            <span className="text-[#5A7A5A]">Battery</span>
            <span>{robot.battery}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-[#F3F7F3]">
            <div className={"h-2.5 rounded-full " + batteryColor(robot.battery)} style={{ width: robot.battery + "%" }} />
          </div>
        </div>
      </div>

      {(robot.location || robot.lastSeen) && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5A7A5A]">
          {robot.location && <span className="flex items-center gap-1"><MapPin size={12} /> {robot.location}</span>}
          {robot.lastSeen && <span className="flex items-center gap-1"><Clock size={12} /> {robot.lastSeen}</span>}
        </div>
      )}

      <div className="mt-4">
        {showAssign && (
          <button onClick={() => onAssign(robot)}
            className="w-full rounded-xl bg-[#2E7D32] py-3 font-bold text-white hover:bg-[#256D28] transition flex items-center justify-center gap-2">
            <Check size={18} /> Assign Robot
          </button>
        )}
        {showRemove && (
          <button onClick={() => onRemove(robot)}
            className="w-full rounded-xl border-2 border-red-200 py-3 font-bold text-red-600 hover:bg-red-50 transition flex items-center justify-center gap-2">
            <X size={18} /> Remove Assignment
          </button>
        )}
      </div>
    </div>
  );
}

function RobotAssignment() {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [assigned, setAssigned] = useState(() => {
    const store = localStorage.getItem("robotAssignments");
    return store ? JSON.parse(store) : Object.fromEntries(farms.map(f => [f.name, [...f.robots]]));
  });
  const [toast, setToast] = useState(null);

  useEffect(() => { localStorage.setItem("robotAssignments", JSON.stringify(assigned)); }, [assigned]);

  const allRobots = availableRobots.concat(
    farms.flatMap(f => {
      const full = [{ name: "AgriBot Alpha", id: "ROB-001", battery: 85, status: "active", location: "Sector A", lastSeen: "5 mins ago" },
                    { name: "AgriBot Beta", id: "ROB-002", battery: 45, status: "active", location: "Sector C", lastSeen: "12 mins ago" }];
      return f.robots.map(id => full.find(r => r.id === id)).filter(Boolean);
    })
  );

  const assignedIds = selectedFarm ? (assigned[selectedFarm.name] || []) : [];
  const available = allRobots.filter(r => !assignedIds.includes(r.id));

  const handleAssign = useCallback((robot) => {
    setAssigned(prev => ({ ...prev, [selectedFarm.name]: [...(prev[selectedFarm.name] || []), robot.id] }));
    setToast({ message: "Robot assigned successfully.", type: "success" });
  }, [selectedFarm]);

  const handleRemove = useCallback((robot) => {
    setAssigned(prev => ({ ...prev, [selectedFarm.name]: (prev[selectedFarm.name] || []).filter(id => id !== robot.id) }));
    setToast({ message: "Robot removed successfully.", type: "success" });
  }, [selectedFarm]);

  return (
    <AppShell>
      <section className="mx-auto max-w-4xl space-y-6 md:space-y-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111827]">Robot Assignment</h1>
          <p className="mt-1 text-sm text-[#5A7A5A]">Select a farm, then assign or remove robots</p>
        </div>

        <SelectFarm farms={farms} selectedFarm={selectedFarm} setSelectedFarm={setSelectedFarm} />

        {selectedFarm && (
          <>
            <section>
              <h2 className="mb-4 text-lg font-bold text-[#111827]">Available Robots</h2>
              {available.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {available.map(robot => (
                    <RobotCard key={robot.id} robot={robot} onAssign={handleAssign} showAssign />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-[#DDE8DD] bg-white p-10 text-center">
                  <Bot size={40} className="mx-auto mb-3 text-[#5A7A5A] opacity-40" />
                  <p className="font-semibold text-[#5A7A5A]">All robots are assigned to this farm or none are available</p>
                </div>
              )}
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-[#111827]">Assigned Robots</h2>
              {assignedIds.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {assignedIds.map(id => {
                    const robot = allRobots.find(r => r.id === id);
                    if (!robot) return null;
                    return (
                      <RobotCard key={robot.id} robot={robot} onRemove={handleRemove} showRemove />
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-[#DDE8DD] bg-white p-10 text-center">
                  <MapPin size={40} className="mx-auto mb-3 text-[#5A7A5A] opacity-40" />
                  <p className="font-semibold text-[#5A7A5A]">No robots assigned to this farm yet</p>
                </div>
              )}
            </section>
          </>
        )}

        {!selectedFarm && (
          <div className="rounded-xl border-2 border-dashed border-[#DDE8DD] bg-white p-16 text-center">
            <MapPin size={48} className="mx-auto mb-4 text-[#5A7A5A] opacity-40" />
            <p className="text-lg font-semibold text-[#5A7A5A]">Select a farm above to manage its robot assignments</p>
          </div>
        )}
      </section>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AppShell>
  );
}

export default RobotAssignment;