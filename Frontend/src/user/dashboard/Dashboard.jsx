import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Bell, Bot, CheckCircle2, Clock, Droplets, Leaf, MapPin, Sprout, Thermometer } from "lucide-react";
import AppShell from "../components/AppShell";

const recentActivity = [
  { action: "Irrigation completed", sector: "Farm 1", time: "1 hour ago", icon: Sprout },
  { action: "Soil sampling done", sector: "Farm 3", time: "3 hours ago", icon: Sprout },
  { action: "Crop health report generated", sector: "Farm 2", time: "6 hours ago", icon: MapPin },
  { action: "Fertilizer applied", sector: "Farm 1", time: "8 hours ago", icon: Sprout },
  { action: "New farm mapped", sector: "Farm 4", time: "1 day ago", icon: MapPin },
];

const alerts = [
  ["Low soil moisture in Farm 3", "2 hours ago", "border-amber-500 bg-amber-50"],
  ["Optimal growth conditions in Farm 1", "5 hours ago", "border-green-500 bg-green-50"],
  ["Farm 4 mapping pending", "1 day ago", "border-slate-500 bg-slate-50"],
];

function FarmSectors({ sectors }) {
  const map = useMap();

  useEffect(() => {
    if (!sectors || sectors.length === 0) return;
    const group = new L.FeatureGroup();

    sectors.forEach((s) => {
      if (!s.coords || s.coords.length < 3) return;
      const polygon = L.polygon(s.coords, {
        color: s.mapColor,
        weight: 3,
        fillColor: s.mapColor,
        fillOpacity: 0.25,
      });
      polygon.bindPopup(`<b>${s.name}</b><br/>${s.area || ""}${s.crop ? " — " + s.crop : ""}`);
      polygon.addTo(group);

      s.coords.forEach((c) => {
        L.circleMarker(c, {
          radius: 5,
          color: s.mapColor,
          fillColor: "#fff",
          fillOpacity: 1,
          weight: 2,
        }).addTo(group);
      });

      const center = polygon.getBounds().getCenter();
      L.marker(center, {
        icon: L.divIcon({
          className: "",
          html: `<div style="display:flex;align-items:center;gap:4px;background:#fff;border:2px solid ${s.mapColor};color:${s.mapColor};font-weight:900;font-size:12px;padding:3px 10px;border-radius:8px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.15)"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="${s.mapColor}" stroke="${s.mapColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>${s.name}</div>`,
        }),
      }).addTo(group);
    });

    group.addTo(map);
    if (group.getLayers().length > 0) map.fitBounds(group.getBounds().pad(0.3));

    return () => { map.removeLayer(group); };
  }, [map, sectors]);

  return null;
}

const statusIcon = (s) => {
  if (s.status === "completed") return <CheckCircle2 size={22} className="text-[#2E7D32]" />;
  if (s.status === "in-progress") return <Clock size={22} className="text-[#F59E0B]" />;
  return <Clock size={22} className="text-slate-400" />;
};

function Dashboard() {
  const [sectors, setSectors] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");

  const selectedFarm = selectedFarmId ? sectors.find((s) => s.id === Number(selectedFarmId)) : null;
  const filteredSectors = selectedFarm ? [selectedFarm] : sectors;

  useEffect(() => {
    const stored = localStorage.getItem("onboardingData");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const { form, farms } = data;
        if (farms && farms.length > 0) {
          const mapped = farms.map((f, i) => ({
            id: i + 1,
            name: f.farmName || "Farm " + (i + 1),
            status: f.boundary && f.boundary.length >= 3 ? "completed" : "pending",
            area: form.farmArea || "",
            crop: form.crop || "",
            color: f.boundary && f.boundary.length >= 3 ? "bg-[#2E7D32]" : "bg-slate-400",
            mapColor: f.boundary && f.boundary.length >= 3 ? "#2E7D32" : "#94a3b8",
            coords: f.boundary && f.boundary.length >= 3
              ? f.boundary.map(c => [parseFloat(c[0]), parseFloat(c[1])])
              : null,
          }));
          setSectors(mapped);
          return;
        }
      } catch (e) { console.error("Failed to parse onboarding data", e); }
    }
  }, []);

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-6 md:space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-[#111827]">Dashboard</h1>
          <p className="text-sm text-[#5A7A5A]">Overview of your farms, robots, and tasks</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <article className="glass-card p-4 md:p-6">
            <div className="mb-3 md:mb-4 flex items-center gap-3">
              <span className="rounded-xl bg-[rgba(46,125,50,0.12)] p-2.5 md:p-3 text-[#2E7D32]"><MapPin size={24} /></span>
              <p className="text-sm md:text-lg font-semibold text-slate-700">Total Farms</p>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-black">{sectors.length}</p>
          </article>
          <article className="glass-card p-4 md:p-6">
            <div className="mb-3 md:mb-4 flex items-center gap-3">
              <span className="rounded-xl bg-[rgba(46,125,50,0.12)] p-2.5 md:p-3 text-[#2E7D32]"><Bot size={24} /></span>
              <p className="text-sm md:text-lg font-semibold text-slate-700">Total Robots</p>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-black">5</p>
          </article>
          <article className="glass-card p-4 md:p-6">
            <div className="mb-3 md:mb-4 flex items-center gap-3">
              <span className="rounded-xl bg-[rgba(46,125,50,0.12)] p-2.5 md:p-3 text-[#2E7D32]"><CheckCircle2 size={24} /></span>
              <p className="text-sm md:text-lg font-semibold text-slate-700">Total Tasks</p>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-black">23</p>
          </article>
        </div>

        <section className="glass-card p-4 md:p-6">
          <div className="mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
            <span className="rounded-xl bg-[rgba(46,125,50,0.15)] p-2.5 md:p-3 text-[#2E7D32]"><Bot size={28} /></span>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#111827]">Robot Status</h2>
              <p className="text-sm text-[#5A7A5A]">Fleet Overview</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-[rgba(46,125,50,0.12)] p-4 md:p-5">
              <p className="font-semibold text-[#2E7D32]">Active</p>
              <p className="mt-2 text-3xl md:text-4xl font-black">4/5</p>
              <p className="text-xs md:text-sm text-[#5A7A5A]">Robots Online</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 md:p-5">
              <p className="font-semibold text-blue-700">Battery</p>
              <p className="mt-2 text-3xl md:text-4xl font-black">78%</p>
              <p className="text-xs md:text-sm text-[#5A7A5A]">Average Level</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 md:p-5">
              <p className="font-semibold text-purple-700">Tasks</p>
              <p className="mt-2 text-3xl md:text-4xl font-black">23</p>
              <p className="text-xs md:text-sm text-[#5A7A5A]">Today&rsquo;s Tasks</p>
            </div>
          </div>
        </section>

        <section className="glass-card p-4 md:p-6">
          <div className="mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
            <span className="rounded-xl bg-[rgba(46,125,50,0.15)] p-2.5 md:p-3 text-[#2E7D32]"><CheckCircle2 size={28} /></span>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#111827]">Task Progress</h2>
              <p className="text-sm text-[#5A7A5A]">Completion status of all tasks</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-[rgba(46,125,50,0.12)] p-4 md:p-5">
              <p className="font-semibold text-[#2E7D32]">Completed</p>
              <p className="mt-2 text-3xl md:text-4xl font-black">14</p>
              <p className="text-xs md:text-sm text-[#5A7A5A]">Tasks finished</p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4 md:p-5">
              <p className="font-semibold text-amber-700">In Progress</p>
              <p className="mt-2 text-3xl md:text-4xl font-black">6</p>
              <p className="text-xs md:text-sm text-[#5A7A5A]">Currently active</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4 md:p-5">
              <p className="font-semibold text-slate-600">Pending</p>
              <p className="mt-2 text-3xl md:text-4xl font-black">3</p>
              <p className="text-xs md:text-sm text-[#5A7A5A]">Not yet started</p>
            </div>
          </div>
        </section>

        <section className="glass-card p-4 md:p-6">
          <div className="mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
            <span className="rounded-xl bg-[rgba(46,125,50,0.15)] p-2.5 md:p-3 text-[#2E7D32]"><Leaf size={28} /></span>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#111827]">Daily Field Readings</h2>
              <p className="text-sm text-[#5A7A5A]">Temperature and soil moisture levels</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 md:gap-4 rounded-lg bg-orange-50 p-4 md:p-5">
              <span className="rounded-lg bg-orange-500 p-2.5 md:p-3 text-white"><Thermometer size={22} /></span>
              <div>
                <p className="font-semibold text-orange-700">Temperature</p>
                <p className="text-2xl md:text-3xl font-black">28&deg;C</p>
                <p className="text-xs md:text-sm text-[#5A7A5A]">Daily average</p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 rounded-lg bg-cyan-50 p-4 md:p-5">
              <span className="rounded-lg bg-cyan-600 p-2.5 md:p-3 text-white"><Droplets size={22} /></span>
              <div>
                <p className="font-semibold text-cyan-700">Soil Moisture</p>
                <p className="text-2xl md:text-3xl font-black">68%</p>
                <p className="text-xs md:text-sm text-[#5A7A5A]">Across all sectors</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section className="glass-card p-4 md:p-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[#111827]">Farm Sectors Map</h2>
                <p className="text-sm text-[#5A7A5A]">Click on a sector for details</p>
              </div>
              {sectors.length > 0 && (
                <select
                  value={selectedFarmId}
                  onChange={(e) => setSelectedFarmId(e.target.value)}
                  className="input w-48 text-sm"
                >
                  <option value="">All Farms</option>
                  {sectors.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="h-[250px] sm:h-[320px] md:h-[420px] overflow-hidden rounded-xl border border-white/50">
              <MapContainer center={[28.6239, 77.2190]} zoom={14} className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FarmSectors sectors={filteredSectors} />
              </MapContainer>
            </div>
            {selectedFarm && (
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#5A7A5A]">
                <span><strong>Area:</strong> {selectedFarm.area || "\u2014"}</span>
                <span><strong>Crop:</strong> {selectedFarm.crop || "\u2014"}</span>
                <span><strong>Status:</strong> {selectedFarm.status === "completed" ? "Mapped" : "Pending"}</span>
              </div>
            )}
          </section>

          <section className="glass-card p-4 md:p-6">
            <h2 className="mb-1 text-lg md:text-xl font-bold text-[#111827]">Recent Activity</h2>
            <p className="mb-3 md:mb-5 text-sm text-[#5A7A5A]">Latest updates across your farm</p>
            <div className="space-y-3 md:space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4 rounded-xl bg-[rgba(46,125,50,0.06)] p-3 md:p-4">
                  <span className="mt-1 rounded-xl bg-[rgba(46,125,50,0.15)] p-1.5 md:p-2 text-[#2E7D32]">
                    <item.icon size={16} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base font-bold text-[#111827] truncate">{item.action}</p>
                    <p className="text-xs md:text-sm text-[#5A7A5A]">{item.sector} &middot; {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </section>
    </AppShell>
  );
}

export default Dashboard;