import { useEffect, useState } from "react";
import { ArrowLeft, Bot, CheckCircle2, Clock, Droplets, Leaf, ListTodo, MapPin, Search, Sprout } from "lucide-react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import AppShell from "../components/AppShell";

function sortPointsByAngle(points) {
  if (points.length < 3) return points;
  const centroid = points.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1]], [0, 0]);
  centroid[0] /= points.length;
  centroid[1] /= points.length;
  return [...points].sort((a, b) => Math.atan2(a[0] - centroid[0], a[1] - centroid[1]) - Math.atan2(b[0] - centroid[0], b[1] - centroid[1]));
}

const farmTasks = {
  "Green Valley Farm": [
    { task: "Irrigation", status: "completed" },
    { task: "Fertilizer Application", status: "completed" },
    { task: "Pest Inspection", status: "completed" },
    { task: "Soil Sampling", status: "in-progress" },
    { task: "Harvest Prep", status: "pending" },
  ],
  "Sunny Acres": [
    { task: "Irrigation", status: "completed" },
    { task: "Weeding", status: "completed" },
    { task: "Crop Monitoring", status: "in-progress" },
    { task: "Fertilizer Application", status: "pending" },
  ],
  "Riverside Farm": [
    { task: "Water Level Check", status: "completed" },
    { task: "Pest Control", status: "in-progress" },
    { task: "Soil Testing", status: "pending" },
    { task: "Drainage Inspection", status: "pending" },
  ],
};

const farmBoundaries = {
  "Green Valley Farm": [[28.6209, 77.215], [28.6269, 77.215], [28.6269, 77.223], [28.6209, 77.223]],
  "Sunny Acres": [[28.6189, 77.212], [28.6289, 77.212], [28.6289, 77.226], [28.6189, 77.226]],
  "Riverside Farm": [[28.6209, 77.214], [28.6279, 77.211], [28.6309, 77.22], [28.6259, 77.226], [28.6189, 77.222]],
};

const allFarms = [
  {
    name: "Green Valley Farm", location: "Sangli, Maharashtra",
    area: "18 acres", cropsPerYear: 2, soil: "Loamy Soil",
    previousCrops: ["Wheat", "Sugarcane"], crop: "Rice", water: 72, status: "Active",
    yearsActive: 12,
    description: "Green Valley Farm has been family-run for over a decade, known for its high-yield rice cultivation using traditional methods blended with modern drip irrigation. The loamy soil retains moisture well, making it ideal for two crop cycles per year. The farm also experiments with sugarcane during the off-season to maximize land use.",
  },
  {
    name: "Sunny Acres", location: "Kolhapur, Maharashtra",
    area: "12 acres", cropsPerYear: 1, soil: "Black Soil",
    previousCrops: ["Cotton"], crop: "Corn", water: 61, status: "Monitoring",
    yearsActive: 8,
    description: "Sunny Acres sits on rich black soil ideal for cotton and corn. The farm follows a single-crop cycle focusing on quality over quantity. Recent soil tests show adequate nutrient levels, though water retention varies during dry spells. The farmer is exploring rotation with pulses to improve nitrogen fixation.",
  },
  {
    name: "Riverside Farm", location: "Satara, Maharashtra",
    area: "9 acres", cropsPerYear: 2, soil: "Alluvial Soil",
    previousCrops: ["Rice", "Vegetables"], crop: "Rice", water: 42, status: "In Progress",
    yearsActive: 6,
    description: "Situated along the riverbank, Riverside Farm benefits from nutrient-rich alluvial deposits. The farm has been active for 6 years, growing rice and seasonal vegetables. Current water levels are lower than ideal, and the farmer is considering switching to less water-intensive crops or investing in rainwater harvesting.",
  },
];

function FarmPolygon({ boundary }) {
  const map = useMap();
  useEffect(() => {
    if (!boundary || boundary.length < 3) return;
    const pts = sortPointsByAngle(boundary);
    const poly = L.polygon(pts, { color: "#2E7D32", weight: 3, fillColor: "#2E7D32", fillOpacity: 0.2 });
    poly.addTo(map);
    map.fitBounds(poly.getBounds().pad(0.3));
    return () => { map.removeLayer(poly); };
  }, [map, boundary]);
  return null;
}

function Farms() {
  const [filter, setFilter] = useState("All Farms");
  const [search, setSearch] = useState("");
  const [selectedFarm, setSelectedFarm] = useState(null);

  const filtered = allFarms.filter((f) => {
    const matchFilter = filter === "All Farms" || f.status === filter;
    const matchSearch = !search.trim() || f.name.toLowerCase().includes(search.toLowerCase()) || f.crop.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (selectedFarm) {
    const f = selectedFarm;
    const assignments = JSON.parse(localStorage.getItem("robotAssignments") || "{}");
    const hasRobot = Object.values(assignments).flat().some(r => r.farmName === f.name);
    const boundary = farmBoundaries[f.name];

    return (
      <AppShell>
        <section className="mx-auto max-w-7xl space-y-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedFarm(null)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(46,125,50,0.12)] text-[#2E7D32] hover:bg-[rgba(46,125,50,0.2)] transition-all">
              <ArrowLeft size={22} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">{f.name}</h1>
              <p className="mt-1 text-sm text-[#5A7A5A]">{f.location}</p>
            </div>
            <span className={`ml-auto badge shrink-0 whitespace-nowrap ${f.status === "Active" ? "badge-success" : f.status === "Monitoring" ? "badge-info" : "badge-warning"}`}>
              {f.status}
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <article className="card">
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><MapPin size={30} /></span>
                <h3 className="font-black">Farm Size</h3>
              </div>
              <p className="text-3xl font-bold text-black">{f.area}</p>
              <p className="mt-2 text-sm text-slate-600">{f.location}</p>
            </article>
            <article className="card">
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><Leaf size={30} /></span>
                <h3 className="font-black">Soil Type</h3>
              </div>
              <p className="text-3xl font-bold text-black">{f.soil}</p>
              <p className="mt-2 text-sm text-slate-600">{f.cropsPerYear} crop{ f.cropsPerYear > 1 ? "s" : ""}/yr</p>
            </article>
            <article className="card">
              <div className="mb-5 flex items-center gap-4">
                <span className={"rounded-lg p-3 " + (hasRobot ? "bg-[rgba(46,125,50,0.12)] text-[#2E7D32]" : "bg-[rgba(239,68,68,0.08)] text-[#EF4444]")}><Bot size={30} /></span>
                <h3 className="font-black">System Status</h3>
              </div>
              <p className="text-3xl font-bold text-black">{hasRobot ? "Active" : "Idle"}</p>
              <p className="mt-2 text-sm text-slate-600">{hasRobot ? "Robot allocated" : "No robot assigned"}</p>
            </article>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="card">
              <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-[#111827]">
                <Sprout size={24} className="text-[#2E7D32]" /> Crop Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-[rgba(46,125,50,0.06)] px-4 py-3">
                  <span className="text-sm font-semibold text-[#5A7A5A]">Crop Type</span>
                  <span className="text-lg font-bold text-[#111827]">{f.crop}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[rgba(46,125,50,0.06)] px-4 py-3">
                  <span className="text-sm font-semibold text-[#5A7A5A]">Years Cultivated</span>
                  <span className="text-lg font-bold text-[#111827]">{f.yearsActive} years</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[rgba(46,125,50,0.06)] px-4 py-3">
                  <span className="text-sm font-semibold text-[#5A7A5A]">Previous Crops</span>
                  <span className="text-right">
                    <span className="inline-flex flex-wrap gap-1.5">
                      {f.previousCrops.map((c) => (
                        <span key={c} className="rounded-md bg-[rgba(46,125,50,0.1)] px-2.5 py-1 text-xs font-bold text-[#2E7D32]">{c}</span>
                      ))}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[rgba(46,125,50,0.06)] px-4 py-3">
                  <span className="text-sm font-semibold text-[#5A7A5A]">Water Level</span>
                  <span className="text-lg font-bold text-[#111827]">{f.water}% <span className="text-sm font-semibold text-[#5A7A5A]">({f.water >= 70 ? "Optimal" : f.water >= 40 ? "Moderate" : "Low"})</span></span>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-[#111827]">
                <MapPin size={24} className="text-[#2E7D32]" /> Farm Boundary
              </h2>
              <div className="h-[280px] overflow-hidden rounded-xl border border-slate-200">
                <MapContainer center={[28.6239, 77.219]} zoom={14} className="h-full w-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {boundary && <FarmPolygon boundary={boundary} />}
                </MapContainer>
              </div>
              {boundary && (
                <p className="mt-3 text-xs text-[#5A7A5A]">
                  {boundary.length} boundary points &middot; {f.area}
                </p>
              )}
            </div>
          </div>

          <section className="card">
            <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-[#111827]">
              <ListTodo size={24} className="text-[#2E7D32]" /> Tasks
            </h2>
            {(() => {
              const tasks = farmTasks[f.name] || [];
              const completed = tasks.filter(t => t.status === "completed").length;
              const inProgress = tasks.filter(t => t.status === "in-progress").length;
              const pending = tasks.filter(t => t.status === "pending").length;
              return (
                <>
                  <div className="grid gap-4 sm:grid-cols-3 mb-6">
                    <div className="rounded-lg bg-[rgba(46,125,50,0.1)] p-4 text-center">
                      <p className="text-3xl font-black text-[#2E7D32]">{completed}</p>
                      <p className="mt-1 text-sm font-semibold text-[#5A7A5A]">Performed</p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-4 text-center">
                      <p className="text-3xl font-black text-amber-600">{inProgress}</p>
                      <p className="mt-1 text-sm font-semibold text-[#5A7A5A]">In Progress</p>
                    </div>
                    <div className="rounded-lg bg-slate-100 p-4 text-center">
                      <p className="text-3xl font-black text-slate-500">{pending}</p>
                      <p className="mt-1 text-sm font-semibold text-[#5A7A5A]">Pending</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {tasks.map((t, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-[rgba(46,125,50,0.04)] px-4 py-2.5">
                        <span className="text-sm font-semibold text-[#111827]">{t.task}</span>
                        <span className={"flex items-center gap-1.5 text-xs font-semibold " + (t.status === "completed" ? "text-[#2E7D32]" : t.status === "in-progress" ? "text-amber-600" : "text-slate-400")}>
                          {t.status === "completed" ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                          {t.status === "completed" ? "Completed" : t.status === "in-progress" ? "In Progress" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </section>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-6 md:space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#111827]">Farms</h1>
            <p className="mt-1 text-sm text-[#5A7A5A]">Simple view of your fields, crops, water, and soil health</p>
          </div>
        </div>

        <div className="card">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-2.5 text-[#2E7D32]"><Sprout size={24} /></span>
            <div>
              <p className="text-xl font-bold text-[#111827]">{allFarms.length} Farm{allFarms.length !== 1 ? "s" : ""}</p>
              <p className="text-xs text-[#5A7A5A]">{allFarms.map(f => f.name).join(", ")}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-white p-4 md:p-5 shadow-lg md:flex-row">
          <label className="flex flex-1 items-center gap-3 rounded-lg border border-[#DDE8DD] px-4 py-2.5 md:py-3">
            <Search className="text-[#2E7D32] shrink-0" size={20} />
            <input className="w-full text-base outline-none bg-transparent" placeholder="Search farm or crop"
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </label>
          <select className="w-full md:w-auto rounded-lg border border-[#DDE8DD] bg-white px-4 py-2.5 md:py-3 text-base font-semibold outline-none"
            value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All Farms</option>
            <option>Active</option>
            <option>Monitoring</option>
            <option>In Progress</option>
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((farm) => (
            <article key={farm.name} onClick={() => setSelectedFarm(farm)}
              className="card cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="text-lg md:text-xl font-bold text-[#111827] truncate">{farm.name}</h2>
                  <p className="mt-1 flex items-center gap-2 text-sm text-slate-600"><MapPin size={16} /> {farm.area}</p>
                </div>
                <span className={`badge shrink-0 whitespace-nowrap ${farm.status === "Active" ? "badge-success" : farm.status === "Monitoring" ? "badge-info" : "badge-warning"}`}>
                  {farm.status}
                </span>
              </div>

              <div className="mt-3 md:mt-4 flex items-center gap-2 text-base md:text-lg font-bold text-[#111827]">
                <Leaf size={18} /> {farm.crop}
              </div>

              <div className="mt-5 md:mt-6 space-y-4 md:space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-sm font-black">
                    <span className="flex items-center gap-2"><Droplets size={16} /> Water Level</span>
                    <span>{farm.water}%</span>
                  </div>
                  <div className="h-2.5 md:h-3 rounded-full bg-white/30">
                    <div className="h-2.5 md:h-3 rounded-full bg-blue-500" style={{ width: `${farm.water}%` }} />
                  </div>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-[#5A7A5A]">
              <p className="text-lg font-semibold">No farms match your filter</p>
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}

export default Farms;