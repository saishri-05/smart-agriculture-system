import { useState } from "react";
import { ArrowLeft, Droplets, History, Leaf, MapPin, Search, Sprout, User } from "lucide-react";
import AppShell from "../components/AppShell";

const allFarms = [
  {
    name: "Green Valley Farm", location: "Sangli, Maharashtra", farmer: "Ramesh Patil",
    area: "18 acres", cropsPerYear: 2, soil: "Loamy Soil",
    previousCrops: ["Wheat", "Sugarcane"], crop: "Rice", water: 72, status: "Active",
  },
  {
    name: "Sunny Acres", location: "Kolhapur, Maharashtra", farmer: "Suresh Deshmukh",
    area: "12 acres", cropsPerYear: 1, soil: "Black Soil",
    previousCrops: ["Cotton"], crop: "Corn", water: 61, status: "Monitoring",
  },
  {
    name: "Riverside Farm", location: "Satara, Maharashtra", farmer: "Anita Jadhav",
    area: "9 acres", cropsPerYear: 2, soil: "Alluvial Soil",
    previousCrops: ["Rice", "Vegetables"], crop: "Rice", water: 42, status: "In Progress",
  },
];

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

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <article className="card">
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><User size={30} /></span>
                <h3 className="font-black">Farmer</h3>
              </div>
              <p className="text-3xl font-bold text-black">{f.farmer}</p>
              <p className="mt-2 text-sm text-slate-600">Owner</p>
            </article>
            <article className="card">
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><MapPin size={30} /></span>
                <h3 className="font-black">Area</h3>
              </div>
              <p className="text-3xl font-bold text-black">{f.area}</p>
              <p className="mt-2 text-sm text-slate-600">{f.location}</p>
            </article>
            <article className="card">
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><Leaf size={30} /></span>
                <h3 className="font-black">Current Crop</h3>
              </div>
              <p className="text-3xl font-bold text-black">{f.crop}</p>
              <p className="mt-2 text-sm text-slate-600">{f.soil} &middot; {f.cropsPerYear} crop{ f.cropsPerYear > 1 ? "s" : ""}/yr</p>
            </article>
            <article className="card">
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><Droplets size={30} /></span>
                <h3 className="font-black">Water Level</h3>
              </div>
              <p className="text-3xl font-bold text-black">{f.water}%</p>
              <p className="mt-2 text-sm text-slate-600">{f.water >= 70 ? "Optimal" : f.water >= 40 ? "Moderate" : "Low"}</p>
            </article>
          </div>

          <div className="card">
            <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#111827]">
              <History size={24} className="text-[#2E7D32]" /> Previous Crops
            </h2>
            <div className="flex flex-wrap gap-3">
              {f.previousCrops.map((crop) => (
                <span key={crop} className="rounded-lg bg-[rgba(46,125,50,0.1)] px-4 py-2 text-sm font-bold text-[#2E7D32]">{crop}</span>
              ))}
            </div>
          </div>
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