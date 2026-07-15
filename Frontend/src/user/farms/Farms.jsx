import { useState } from "react";
import { Droplets, FlaskConical, Leaf, MapPin, Search } from "lucide-react";
import AppShell from "../components/AppShell";

const allFarms = [
  { name: "Green Valley Farm", crop: "Rice", area: "18 acres", fertilizer: 74, water: 72, status: "Active" },
  { name: "Sunny Acres", crop: "Corn", area: "12 acres", fertilizer: 62, water: 61, status: "Monitoring" },
  { name: "Riverside Farm", crop: "Rice", area: "9 acres", fertilizer: 41, water: 42, status: "In Progress" },
];

function Farms() {
  const [filter, setFilter] = useState("All Farms");
  const [search, setSearch] = useState("");

  const filtered = allFarms.filter((f) => {
    const matchFilter = filter === "All Farms" || f.status === filter;
    const matchSearch = !search.trim() || f.name.toLowerCase().includes(search.toLowerCase()) || f.crop.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-6 md:space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#111827]">Farms</h1>
            <p className="mt-1 text-sm text-[#5A7A5A]">Simple view of your fields, crops, water, and soil health</p>
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
            <article key={farm.name} className="card">
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
                    <span className="flex items-center gap-2"><FlaskConical size={16} /> Fertilizer Level</span>
                    <span>{farm.fertilizer}%</span>
                  </div>
                  <div className="h-2.5 md:h-3 rounded-full bg-white/30">
                    <div className="h-2.5 md:h-3 rounded-full bg-[#2E7D32]" style={{ width: `${farm.fertilizer}%` }} />
                  </div>
                </div>
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