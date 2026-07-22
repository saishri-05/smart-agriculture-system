import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Activity, Battery, Bot, ChevronDown, Home, MapPin, Maximize2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import AppShell from "../components/AppShell";

const robotLocations = {
  "ROB-001": { lat: 28.6239, lng: 77.2090, sector: "Sector A" },
  "ROB-002": { lat: 28.6260, lng: 77.2150, sector: "Sector C" },
  "ROB-003": { lat: 28.6200, lng: 77.2190, sector: "Base Station" },
  "ROB-004": { lat: 28.6200, lng: 77.2190, sector: "Base Station" },
  "ROB-005": { lat: 28.6250, lng: 77.2120, sector: "Maintenance Bay" },
};

const robots = [
  { id: "ROB-001", name: "AgriBot Alpha", lastSeen: "5 mins ago", battery: 85, farm: "Green Valley Farm", status: "active", location: "Sector A" },
  { id: "ROB-002", name: "AgriBot Beta", lastSeen: "12 mins ago", battery: 45, farm: "Sunny Acres", status: "active", location: "Sector C" },
  { id: "ROB-003", name: "AgriBot Gamma", lastSeen: "1 hour ago", battery: 20, farm: "Not assigned", status: "charging", location: "Base Station" },
  { id: "ROB-004", name: "AgriBot Delta", lastSeen: "2 hours ago", battery: 100, farm: "Not assigned", status: "idle", location: "Base Station" },
  { id: "ROB-005", name: "AgriBot Epsilon", lastSeen: "1 day ago", battery: 0, farm: "Riverside Farm", status: "maintenance", location: "Maintenance Bay" },
];

const statusStyle = {
  active: "badge-success",
  charging: "badge-success",
  idle: "badge-neutral",
  maintenance: "badge-warning",
};

function RobotQR({ robotId, size = 48 }) {
  return (
    <div className="shrink-0 overflow-hidden rounded-lg border border-[#DDE8DD] bg-white p-1">
      <QRCodeSVG value={`https://smartagri.app/robot/${robotId}`} size={size - 8} />
    </div>
  );
}

function batteryColor(value) {
  if (value <= 25) return "bg-red-500";
  if (value <= 50) return "bg-yellow-500";
  return "bg-[#2E7D32]";
}

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={"fixed top-6 right-6 z-[60] flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-2xl text-sm font-bold transition-all " + (type === "success" ? "bg-[#2E7D32] text-white" : "bg-amber-600 text-white")}>
      {message}
    </div>
  );
}

const baseIcon = L.divIcon({
  className: "",
  html: `<div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:#2E7D32;color:white;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function Robots() {
  const [trackedRobot, setTrackedRobot] = useState(null);
  const [trackingToast, setTrackingToast] = useState(null);

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-6 md:space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#111827]">Robot Management</h1>
            <p className="mt-1 text-sm text-[#5A7A5A]">Monitor and manage your agricultural robots</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total Robots", "5", Bot],
            ["Active", "2", Activity],
            ["Idle", "1", Battery],
            ["Assigned to Farms", "3", MapPin],
          ].map(([label, value, Icon]) => (
            <article key={label} className="card">
              <div className="stat-card">
                <div>
                  <p className="stat-card-label">{label}</p>
                  <p className="stat-card-value">{value}</p>
                </div>
                <Icon className="text-[#2E7D32]" size={30} />
              </div>
            </article>
          ))}
        </div>

        <section className="table-wrap">
          <div className="overflow-x-auto">
            <table className="table min-w-[980px]">
              <thead>
                <tr>
                  {["Robot ID", "Robot", "Battery", "Assigned Farm", "Status", "Location", "Tracking"].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {robots.map((robot) => {
                  const isTracking = trackedRobot === robot.id;
                  return (
                    <tr key={robot.id}>
                      <td className="font-semibold">{robot.id}</td>
                      <td>
                        <div className="flex items-center gap-4">
                          <RobotQR robotId={robot.id} size={48} />
                          <div>
                            <p className="text-lg font-black">{robot.id}</p>
                            <p className="text-[#5A7A5A]">{robot.lastSeen}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 rounded-full bg-white/30">
                            <div className={`h-2 rounded-full ${batteryColor(robot.battery)}`} style={{ width: `${robot.battery}%` }} />
                          </div>
                          <span className="font-black">{robot.battery}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={robot.farm === "Not assigned" ? "text-[#5A7A5A]" : ""}>{robot.farm}</span>
                      </td>
                      <td>
                        <span className={`badge ${statusStyle[robot.status]}`}>{robot.status}</span>
                      </td>
                      <td>{robot.location}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setTrackedRobot(isTracking ? null : robot.id)}
                            className="btn btn-primary btn-sm">
                            <MapPin size={16} /> Track
                          </button>
                          <button onClick={() => setTrackingToast({ message: `${robot.id} returning to Base Station...`, type: "info" })}
                            className="btn btn-sm border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[rgba(46,125,50,0.1)]">
                            <Home size={16} /> Recall
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {trackedRobot && (() => {
          const robot = robots.find(r => r.id === trackedRobot);
          const loc = robotLocations[trackedRobot];
          if (!robot || !loc) return null;
          return (
            <section className="card">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#111827] flex items-center gap-3">
                  <MapPin size={24} className="text-[#2E7D32]" /> {robot.id} — Live Location
                </h2>
                <button onClick={() => setTrackedRobot(null)} className="btn btn-sm border border-[#DDE8DD] text-[#5A7A5A] hover:bg-[#F3F7F3]">
                  Close
                </button>
              </div>
              <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                <div className="h-[300px] overflow-hidden rounded-xl border border-[#DDE8DD]">
                  <MapContainer center={[loc.lat, loc.lng]} zoom={16} className="h-full w-full" scrollWheelZoom={false}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[loc.lat, loc.lng]} icon={baseIcon}>
                      <Popup>{robot.id} — {loc.sector}<br/>Last seen: {robot.lastSeen}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-[rgba(46,125,50,0.06)] p-4">
                    <p className="text-sm font-semibold text-[#5A7A5A]">Coordinates</p>
                    <p className="mt-1 text-lg font-bold text-[#111827]">{loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</p>
                  </div>
                  <div className="rounded-lg bg-[rgba(46,125,50,0.06)] p-4">
                    <p className="text-sm font-semibold text-[#5A7A5A]">Current Sector</p>
                    <p className="mt-1 text-lg font-bold text-[#111827]">{loc.sector}</p>
                  </div>
                  <div className="rounded-lg bg-[rgba(46,125,50,0.06)] p-4">
                    <p className="text-sm font-semibold text-[#5A7A5A]">Assigned Farm</p>
                    <p className="mt-1 text-lg font-bold text-[#111827]">{robot.farm}</p>
                  </div>
                  <button onClick={() => { setTrackedRobot(null); setTrackingToast({ message: `${robot.id} returning to Base Station...`, type: "info" }); }}
                    className="w-full rounded-xl bg-[#2E7D32] py-3 font-bold text-white hover:bg-[#256D28] transition flex items-center justify-center gap-2">
                    <Home size={20} /> Recall to Base
                  </button>
                </div>
              </div>
            </section>
          );
        })()}
      </section>

      {trackingToast && <Toast message={trackingToast.message} type={trackingToast.type} onClose={() => setTrackingToast(null)} />}
    </AppShell>
  );
}

export default Robots;