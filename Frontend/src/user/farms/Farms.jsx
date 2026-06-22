import { Droplets, Eye, Leaf, MapPin, Pencil, Plus, Search, Sprout, Trash2 } from "lucide-react";
import AppShell from "../components/AppShell";

const farms = [
  { name: "Green Valley Farm", crop: "Rice", area: "18 acres", soil: 86, water: 72, status: "Healthy" },
  { name: "Sunny Acres", crop: "Corn", area: "12 acres", soil: 76, water: 61, status: "Active" },
  { name: "Riverside Farm", crop: "Rice", area: "9 acres", soil: 58, water: 42, status: "Needs Water" },
];

function Farms() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-black text-[#287c30] md:text-4xl">Farms</h1>
            <p className="mt-2 text-lg text-slate-700">Simple view of your fields, crops, water, and soil health</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#287c30] px-6 py-4 text-lg font-black text-white">
            <Plus size={24} /> Add Farm
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-lg md:flex-row">
          <label className="flex flex-1 items-center gap-3 rounded-lg border px-4 py-3">
            <Search className="text-[#287c30]" size={24} />
            <input className="w-full text-lg outline-none" placeholder="Search farm or crop" />
          </label>
          <select className="rounded-lg border-2 border-[#287c30] bg-white px-5 py-3 text-lg font-bold outline-none">
            <option>All Farms</option>
            <option>Healthy</option>
            <option>Needs Water</option>
          </select>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {farms.map((farm) => (
            <article key={farm.name} className="rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-start justify-between">
                <span className="rounded-lg bg-green-100 p-4 text-[#287c30]">
                  <Sprout size={44} />
                </span>
                <span className={`rounded-full px-4 py-1 font-black ${farm.status === "Needs Water" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                  {farm.status}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-black">{farm.name}</h2>
              <p className="mt-2 flex items-center gap-2 text-slate-600"><MapPin size={20} /> {farm.area}</p>
              <p className="mt-2 flex items-center gap-2 text-lg font-bold"><Leaf className="text-[#287c30]" size={22} /> {farm.crop}</p>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between font-black"><span>Soil Health</span><span>{farm.soil}%</span></div>
                  <div className="h-3 rounded-full bg-slate-200"><div className="h-3 rounded-full bg-[#287c30]" style={{ width: `${farm.soil}%` }} /></div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between font-black"><span className="flex items-center gap-2"><Droplets size={20} /> Water Level</span><span>{farm.water}%</span></div>
                  <div className="h-3 rounded-full bg-slate-200"><div className="h-3 rounded-full bg-blue-500" style={{ width: `${farm.water}%` }} /></div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="rounded-lg bg-green-100 p-3 text-[#287c30]"><Eye className="mx-auto" /></button>
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
