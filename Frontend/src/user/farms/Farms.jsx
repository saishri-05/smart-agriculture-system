import { Droplets, Eye, FlaskConical, Leaf, MapPin, Pencil, Plus, Search, Trash2 } from "lucide-react";
import AppShell from "../components/AppShell";

const farms = [
  { name: "Green Valley Farm", crop: "Rice", area: "18 acres", fertilizer: 74, water: 72, status: "Active" },
  { name: "Sunny Acres", crop: "Corn", area: "12 acres", fertilizer: 62, water: 61, status: "Monitoring" },
  { name: "Riverside Farm", crop: "Rice", area: "9 acres", fertilizer: 41, water: 42, status: "In Progress" },
];

function Farms() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-black text-[#132D4A] md:text-4xl">Farms</h1>
            <p className="mt-2 text-lg text-slate-700">Simple view of your fields, crops, water, and soil health</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#132D4A] px-6 py-4 text-lg font-black text-white">
            <Plus size={24} /> Add Farm
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-lg md:flex-row">
          <label className="flex flex-1 items-center gap-3 rounded-lg border px-4 py-3">
            <Search className="text-[#132D4A]" size={24} />
            <input className="w-full text-lg outline-none" placeholder="Search farm or crop" />
          </label>
          <select className="rounded-lg border-2 border-[#132D4A] bg-white px-5 py-3 text-lg font-bold outline-none">
            <option>All Farms</option>
            <option>Active</option>
            <option>Monitoring</option>
            <option>In Progress</option>
          </select>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {farms.map((farm) => (
            <article key={farm.name} className="rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-black">{farm.name}</h2>
                  <p className="mt-1 flex items-center gap-2 text-slate-600"><MapPin size={18} /> {farm.area}</p>
                </div>
                <span className={`rounded-full px-4 py-1 text-sm font-black ${farm.status === "Active" ? "bg-green-100 text-green-700" : farm.status === "Monitoring" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                  {farm.status}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-lg font-bold text-[#132D4A]">
                <Leaf size={20} /> {farm.crop}
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between font-black"><span className="flex items-center gap-2"><FlaskConical size={18} /> Fertilizer Level</span><span>{farm.fertilizer}%</span></div>
                  <div className="h-3 rounded-full bg-slate-200"><div className="h-3 rounded-full bg-[#132D4A]" style={{ width: `${farm.fertilizer}%` }} /></div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between font-black"><span className="flex items-center gap-2"><Droplets size={18} /> Water Level</span><span>{farm.water}%</span></div>
                  <div className="h-3 rounded-full bg-slate-200"><div className="h-3 rounded-full bg-blue-500" style={{ width: `${farm.water}%` }} /></div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="rounded-lg bg-[#D0E0F0] p-3 text-[#132D4A]"><Eye className="mx-auto" /></button>
                <button className="rounded-lg bg-blue-100 p-3 text-blue-700"><Pencil className="mx-auto" /></button>
                <button className="rounded-lg bg-red-100 p-3 text-red-600"><Trash2 className="mx-auto" /></button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

export default Farms;
