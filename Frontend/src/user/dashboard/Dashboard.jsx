import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Bell, Bot, CheckCircle2, Clock, Droplets, FlaskConical, Leaf, MapPin, Sprout } from "lucide-react";
import AppShell from "../components/AppShell";

const sectors = [
  { id: 1, name: "Sector A", status: "completed", area: "5.2 acres", crop: "Rice", color: "bg-green-500", mapColor: "#2e7d32", coords: [[28.6239, 77.2090], [28.6339, 77.2090], [28.6339, 77.2190], [28.6239, 77.2190]] },
  { id: 2, name: "Sector B", status: "completed", area: "4.8 acres", crop: "Wheat", color: "bg-green-500", mapColor: "#2e7d32", coords: [[28.6239, 77.2190], [28.6339, 77.2190], [28.6339, 77.2290], [28.6239, 77.2290]] },
  { id: 3, name: "Sector C", status: "in-progress", area: "3.5 acres", crop: "Corn", color: "bg-amber-500", mapColor: "#f59e0b", coords: [[28.6139, 77.2090], [28.6239, 77.2090], [28.6239, 77.2190], [28.6139, 77.2190]] },
  { id: 4, name: "Sector D", status: "pending", area: "6.0 acres", crop: "Tomato", color: "bg-slate-400", mapColor: "#94a3b8", coords: [[28.6139, 77.2190], [28.6239, 77.2190], [28.6239, 77.2290], [28.6139, 77.2290]] },
];

const recentActivity = [
  { action: "Irrigation completed", sector: "Sector A", time: "1 hour ago", icon: Sprout },
  { action: "Soil sampling done", sector: "Sector C", time: "3 hours ago", icon: Sprout },
  { action: "Crop health report generated", sector: "Sector B", time: "6 hours ago", icon: MapPin },
  { action: "Fertilizer applied", sector: "Sector A", time: "8 hours ago", icon: Sprout },
  { action: "New sector mapped", sector: "Sector D", time: "1 day ago", icon: MapPin },
];

const alerts = [
  ["Low soil moisture in Sector C", "2 hours ago", "border-amber-500 bg-amber-50"],
  ["Optimal growth conditions in Sector A", "5 hours ago", "border-green-500 bg-green-50"],
  ["Sector D mapping pending", "1 day ago", "border-slate-500 bg-slate-50"],
];

function FarmSectors() {
  const map = useMap();

  useEffect(() => {
    const group = new L.FeatureGroup();

    sectors.forEach((s) => {
      const polygon = L.polygon(s.coords, {
        color: s.mapColor,
        weight: 3,
        fillColor: s.mapColor,
        fillOpacity: 0.25,
      });
      polygon.bindPopup(`<b>${s.name}</b><br/>${s.area} — ${s.crop}<br/>Status: ${s.status}`);
      polygon.addTo(group);

      const center = polygon.getBounds().getCenter();
      L.marker(center, {
        icon: L.divIcon({
          className: "",
          html: `<div style="background:${s.mapColor};color:#fff;font-weight:900;font-size:13px;padding:4px 10px;border-radius:8px;white-space:nowrap">${s.name}</div>`,
        }),
      }).addTo(group);
    });

    group.addTo(map);
    map.fitBounds(group.getBounds().pad(0.3));

    return () => { map.removeLayer(group); };
  }, [map]);

  return null;
}

const statusIcon = (s) => {
  if (s.status === "completed") return <CheckCircle2 size={22} className="text-green-600" />;
  if (s.status === "in-progress") return <Clock size={22} className="text-amber-600" />;
  return <Clock size={22} className="text-slate-400" />;
};

function Dashboard() {
  const completed = sectors.filter((s) => s.status === "completed").length;
  const inProgress = sectors.filter((s) => s.status === "in-progress").length;
  const pending = sectors.filter((s) => s.status === "pending").length;

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h1 className="text-3xl font-black text-[#287c30] md:text-4xl">Farm Dashboard</h1>
            <p className="mt-2 text-lg text-slate-700">Overview of your farm sectors and activity</p>
          </div>
          <label className="w-full max-w-xs">
            <span className="mb-2 block font-semibold">Select Farm</span>
            <select className="w-full rounded-lg border-2 border-[#287c30] bg-white px-5 py-4 text-lg font-bold outline-none">
              <option>Green Valley Farm</option>
            </select>
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-lg bg-green-100 p-3 text-green-700"><MapPin size={28} /></span>
              <p className="text-lg font-semibold text-slate-700">Total Sectors</p>
            </div>
            <p className="text-5xl font-black">{sectors.length}</p>
          </article>
          <article className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-lg bg-green-100 p-3 text-green-700"><CheckCircle2 size={28} /></span>
              <p className="text-lg font-semibold text-slate-700">Completed</p>
            </div>
            <p className="text-5xl font-black text-green-600">{completed}</p>
          </article>
          <article className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-lg bg-amber-100 p-3 text-amber-600"><Clock size={28} /></span>
              <p className="text-lg font-semibold text-slate-700">In Progress</p>
            </div>
            <p className="text-5xl font-black text-amber-600">{inProgress}</p>
          </article>
          <article className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-lg bg-slate-100 p-3 text-slate-500"><Clock size={28} /></span>
              <p className="text-lg font-semibold text-slate-700">Pending</p>
            </div>
            <p className="text-5xl font-black text-slate-400">{pending}</p>
          </article>
        </div>

        <section className="rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-lg bg-[#2e7d32] p-3 text-white"><Bot size={32} /></span>
            <div>
              <h2 className="text-2xl font-black">Robot Status</h2>
              <p className="text-slate-600">Fleet Overview</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-5">
              <p className="font-semibold text-green-700">Active</p>
              <p className="mt-2 text-4xl font-black">4/5</p>
              <p className="text-sm text-slate-600">Robots Online</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-5">
              <p className="font-semibold text-blue-700">Battery</p>
              <p className="mt-2 text-4xl font-black">78%</p>
              <p className="text-sm text-slate-600">Average Level</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-5">
              <p className="font-semibold text-purple-700">Tasks</p>
              <p className="mt-2 text-4xl font-black">23</p>
              <p className="text-sm text-slate-600">Today&rsquo;s Tasks</p>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-lg bg-[#2e7d32] p-3 text-white"><Leaf size={32} /></span>
            <div>
              <h2 className="text-2xl font-black">Soil &amp; Water Levels</h2>
              <p className="text-slate-600">Real-time sensor readings across your farm</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-amber-50 p-5">
              <p className="font-semibold text-amber-700">Nitrogen (N)</p>
              <p className="mt-2 text-4xl font-black">48</p>
              <p className="text-sm text-slate-600">mg/kg</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-5">
              <p className="font-semibold text-blue-700">Phosphorus (P)</p>
              <p className="mt-2 text-4xl font-black">32</p>
              <p className="text-sm text-slate-600">mg/kg</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-5">
              <p className="font-semibold text-purple-700">Potassium (K)</p>
              <p className="mt-2 text-4xl font-black">185</p>
              <p className="text-sm text-slate-600">mg/kg</p>
            </div>
            <div className="rounded-lg bg-green-50 p-5">
              <p className="font-semibold text-green-700">Organic</p>
              <p className="mt-2 text-4xl font-black">2.4%</p>
              <p className="text-sm text-slate-600">Organic Matter</p>
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-lg bg-cyan-50 p-5">
              <span className="rounded-lg bg-cyan-600 p-3 text-white"><Droplets size={24} /></span>
              <div>
                <p className="font-semibold text-cyan-700">Water Level</p>
                <p className="text-3xl font-black">68%</p>
                <p className="text-sm text-slate-600">Soil moisture across sectors</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-emerald-50 p-5">
              <span className="rounded-lg bg-emerald-600 p-3 text-white"><FlaskConical size={24} /></span>
              <div>
                <p className="font-semibold text-emerald-700">Fertilizer Level</p>
                <p className="text-3xl font-black">42%</p>
                <p className="text-sm text-slate-600">Remaining reserves</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-1 text-2xl font-black">Farm Sectors Map</h2>
            <p className="mb-5 text-slate-600">Click on a sector for details</p>
            <div className="h-[420px] overflow-hidden rounded-xl border-2 border-[#287c30]">
              <MapContainer center={[28.6239, 77.2190]} zoom={14} className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FarmSectors />
              </MapContainer>
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-1 text-2xl font-black">Recent Activity</h2>
            <p className="mb-5 text-slate-600">Latest updates across your farm</p>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-4 rounded-lg bg-[#f6f9f0] p-4">
                  <span className="mt-1 rounded-lg bg-[#287c30] p-2 text-white">
                    <item.icon size={18} />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-[#00112b]">{item.action}</p>
                    <p className="text-sm text-slate-600">{item.sector} &middot; {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-5 text-2xl font-black">Sector Overview</h2>
          <div className="space-y-3">
            {sectors.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-[#fafcfa] px-5 py-4">
                <div className="flex items-center gap-4">
                  {statusIcon(s)}
                  <div>
                    <p className="font-black text-[#00112b]">{s.name}</p>
                    <p className="text-sm text-slate-600">{s.area} &middot; {s.crop}</p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-black text-white ${s.color}`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </AppShell>
  );
}

export default Dashboard;
