import { useState, useCallback, useEffect } from "react";
import { Bot, Check, Camera, Key, MapPin, Plus, Search, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import AppShell from "../components/AppShell";

const allRobots = [
  { name: "AgriBot Alpha", id: "ROB-001", battery: 85, status: "active", location: "Sector A", lastSeen: "5 mins ago" },
  { name: "AgriBot Beta", id: "ROB-002", battery: 45, status: "active", location: "Sector C", lastSeen: "12 mins ago" },
  { name: "AgriBot Gamma", id: "ROB-003", battery: 20, status: "charging", location: "Base Station", lastSeen: "1 hour ago" },
  { name: "AgriBot Delta", id: "ROB-004", battery: 100, status: "idle", location: "Base Station", lastSeen: "2 hours ago" },
  { name: "AgriBot Epsilon", id: "ROB-005", battery: 0, status: "maintenance", location: "Maintenance Bay", lastSeen: "1 day ago" },
];

const farms = [
  { name: "Green Valley Farm", crop: "Wheat" },
  { name: "Sunny Acres", crop: "Corn" },
  { name: "Riverside Farm", crop: "Rice" },
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

function FarmSelect({ farms, selectedFarm, setSelectedFarm, onClose }) {
  const [query, setQuery] = useState("");
  const filtered = farms.filter(f => f.name.toLowerCase().includes(query.toLowerCase()) || f.crop.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#DDE8DD] px-6 py-4">
          <h2 className="text-lg font-bold text-[#111827]">Select Farm</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[#5A7A5A] hover:bg-[#F3F7F3] transition"><X size={20} /></button>
        </div>
        <div className="flex items-center gap-3 border-b border-[#DDE8DD] px-6 py-3">
          <Search size={18} className="text-[#9CA3AF]" />
          <input className="w-full text-base outline-none bg-transparent" placeholder="Search farms..." autoFocus value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="max-h-64 overflow-y-auto p-4 space-y-2">
          {filtered.map(f => (
            <button key={f.name} onClick={() => { setSelectedFarm(f); onClose(); }}
              className={"flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition hover:bg-[#F3F7F3] " + (selectedFarm?.name === f.name ? "bg-[rgba(46,125,50,0.08)]" : "")}>
              <div>
                <p className="font-bold text-[#111827]">{f.name}</p>
                <p className="text-sm text-[#5A7A5A]">{f.crop}</p>
              </div>
              {selectedFarm?.name === f.name && <Check size={18} className="text-[#2E7D32]" />}
            </button>
          ))}
          {filtered.length === 0 && <p className="py-8 text-center text-sm text-[#5A7A5A]">No farms found</p>}
        </div>
      </div>
    </div>
  );
}

function AddRobotModal({ onClose, onAdd }) {
  const [scanMode, setScanMode] = useState(false);
  const [manualId, setManualId] = useState("");

  const handleManualAdd = () => {
    if (!manualId.trim()) return;
    const exists = allRobots.find(r => r.id === manualId.trim());
    if (exists) {
      onAdd(exists);
    } else {
      onAdd({ id: manualId.trim(), name: "Unknown Robot", battery: 0, status: "idle", location: "Unregistered", lastSeen: "Just now" });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#DDE8DD] px-6 py-4">
          <h2 className="text-lg font-bold text-[#111827]">{scanMode ? "Scan QR Code" : "Add Robot"}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[#5A7A5A] hover:bg-[#F3F7F3] transition"><X size={20} /></button>
        </div>

        {scanMode ? (
          <div className="p-6 space-y-5">
            <div className="flex justify-center">
              <div className="rounded-xl border-2 border-dashed border-[#2E7D32] bg-[#F3F7F3] p-4">
                <QRCodeSVG value="scan-robot-qr" size={200} />
              </div>
            </div>
            <p className="text-center text-sm text-[#5A7A5A]">Scan the QR code on the robot to register it automatically.</p>
            <div className="flex gap-3">
              <button onClick={() => setScanMode(false)} className="flex-1 rounded-xl border-2 border-[#DDE8DD] py-3 font-bold text-[#5A7A5A] hover:bg-[#F3F7F3] transition">Back</button>
              <button className="flex-1 rounded-xl bg-[#2E7D32] py-3 font-bold text-white hover:bg-[#256D28] transition">Start Scanning</button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            <p className="text-sm text-[#5A7A5A]">Choose how to register a new robot:</p>
            <button onClick={() => setScanMode(true)}
              className="w-full flex items-center gap-4 rounded-xl border-2 border-[#DDE8DD] p-4 text-left hover:border-[#2E7D32] hover:bg-[#F3F7F3] transition group">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F3F7F3] text-[#2E7D32] group-hover:bg-white transition">
                <Camera size={24} />
              </span>
              <div>
                <p className="font-bold text-[#111827]">Scan QR Code</p>
                <p className="text-sm text-[#5A7A5A]">Use camera to scan the robot&rsquo;s QR code</p>
              </div>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#DDE8DD]" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-sm text-[#5A7A5A]">or</span></div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[#5A7A5A]">Enter Robot ID Manually</label>
              <div className="flex items-center gap-3 rounded-xl border border-[#DDE8DD] px-4 py-3 focus-within:border-[#2E7D32] transition">
                <Key size={18} className="text-[#5A7A5A]" />
                <input className="w-full text-base outline-none bg-transparent" placeholder="e.g. ROB-006" value={manualId} onChange={e => setManualId(e.target.value)} />
              </div>
              <button onClick={handleManualAdd} className="w-full rounded-xl bg-[#2E7D32] py-3 font-bold text-white hover:bg-[#256D28] transition">Register Robot</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RobotAssignment() {
  const [assignTarget, setAssignTarget] = useState(null);
  const [showFarmSelect, setShowFarmSelect] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [assigned, setAssigned] = useState(() => {
    const store = localStorage.getItem("robotAssignments");
    return store ? JSON.parse(store) : {};
  });
  const [toast, setToast] = useState(null);
  const [robotList, setRobotList] = useState(allRobots);

  useEffect(() => { localStorage.setItem("robotAssignments", JSON.stringify(assigned)); }, [assigned]);

  const assignedRobotIds = Object.values(assigned).flat();
  const available = robotList.filter(r => !assignedRobotIds.includes(r.id));

  const handleAssignClick = (robot) => {
    setAssignTarget(robot);
    setShowFarmSelect(true);
  };

  const handleFarmSelected = (farm) => {
    setAssigned(prev => ({ ...prev, [farm.name]: [...(prev[farm.name] || []), assignTarget.id] }));
    setAssignTarget(null);
    setToast({ message: `${assignTarget.id} assigned to ${farm.name}`, type: "success" });
  };

  const handleRemove = useCallback((robot, farmName) => {
    setAssigned(prev => ({ ...prev, [farmName]: (prev[farmName] || []).filter(id => id !== robot.id) }));
    setToast({ message: `${robot.id} removed from ${farmName}`, type: "success" });
  }, []);

  const handleAddRobot = (robot) => {
    if (!robotList.find(r => r.id === robot.id)) {
      setRobotList(prev => [...prev, robot]);
    }
    setAssignTarget(robot);
    setShowFarmSelect(true);
  };

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Robot Assignment</h1>
            <p className="mt-1 text-sm text-[#5A7A5A]">View all robots and assign them to farms</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
            <Plus size={20} /> Add Robot
          </button>
        </div>

        <section>
          <h2 className="mb-6 text-xl font-bold text-[#111827]">Available Robots ({available.length})</h2>
          {available.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {available.map(robot => (
                <div key={robot.id} className="card cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md" onClick={() => handleAssignClick(robot)}>
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

                  <div className="mt-4">
                    <div className="flex justify-between text-sm font-semibold mb-1">
                      <span className="text-[#5A7A5A]">Battery</span>
                      <span>{robot.battery}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-[#F3F7F3]">
                      <div className={"h-2.5 rounded-full " + batteryColor(robot.battery)} style={{ width: robot.battery + "%" }} />
                    </div>
                  </div>

                  {(robot.location || robot.lastSeen) && (
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5A7A5A]">
                      {robot.location && <span className="flex items-center gap-1"><MapPin size={12} /> {robot.location}</span>}
                      {robot.lastSeen && <span className="flex items-center gap-1"><Bot size={12} /> {robot.lastSeen}</span>}
                    </div>
                  )}

                  <div className="mt-4">
                    <button className="w-full rounded-xl bg-[#2E7D32] py-3 font-bold text-white hover:bg-[#256D28] transition flex items-center justify-center gap-2">
                      <Check size={18} /> Assign to Farm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-[#DDE8DD] bg-white p-16 text-center">
              <Bot size={48} className="mx-auto mb-4 text-[#5A7A5A] opacity-40" />
              <p className="text-lg font-semibold text-[#5A7A5A]">All robots are assigned to farms</p>
              <p className="mt-1 text-sm text-[#5A7A5A]">Add a new robot to continue assigning</p>
            </div>
          )}
        </section>

        {/* Show assigned robots grouped by farm */}
        {Object.keys(assigned).length > 0 && (
          <section>
            <h2 className="mb-6 text-xl font-bold text-[#111827]">Assigned Robots</h2>
            <div className="space-y-6">
              {Object.entries(assigned).map(([farmName, robotIds]) => {
                if (robotIds.length === 0) return null;
                return (
                  <div key={farmName}>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#111827]">
                      <MapPin size={20} className="text-[#2E7D32]" /> {farmName}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {robotIds.map(id => {
                        const robot = robotList.find(r => r.id === id);
                        if (!robot) return null;
                        return (
                          <div key={robot.id} className="card">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="rounded-xl bg-[rgba(46,125,50,0.1)] p-3 text-[#2E7D32] shrink-0">
                                  <Bot size={26} />
                                </span>
                                <div className="min-w-0">
                                  <p className="text-lg font-black text-[#111827]">{robot.id}</p>
                                  <p className="text-sm text-[#5A7A5A]">{robot.name}</p>
                                </div>
                              </div>
                              <span className={"badge shrink-0 " + (statusColor[robot.status] || "badge-neutral")}>
                                {statusLabel[robot.status] || robot.status}
                              </span>
                            </div>
                            <div className="mt-4">
                              <div className="flex justify-between text-sm font-semibold mb-1">
                                <span className="text-[#5A7A5A]">Battery</span>
                                <span>{robot.battery}%</span>
                              </div>
                              <div className="h-2.5 rounded-full bg-[#F3F7F3]">
                                <div className={"h-2.5 rounded-full " + batteryColor(robot.battery)} style={{ width: robot.battery + "%" }} />
                              </div>
                            </div>
                            <div className="mt-4">
                              <button onClick={() => handleRemove(robot, farmName)}
                                className="w-full rounded-xl border-2 border-red-200 py-3 font-bold text-red-600 hover:bg-red-50 transition flex items-center justify-center gap-2">
                                <X size={18} /> Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </section>

      {showFarmSelect && (
        <FarmSelect farms={farms} selectedFarm={null} setSelectedFarm={handleFarmSelected} onClose={() => { setShowFarmSelect(false); setAssignTarget(null); }} />
      )}

      {showAddModal && (
        <AddRobotModal onClose={() => setShowAddModal(false)} onAdd={handleAddRobot} />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AppShell>
  );
}

export default RobotAssignment;