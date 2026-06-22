import { Droplets, Eye, Leaf, MapPin, Pencil, Plus, Search, Sprout, Trash2 } from "lucide-react";
import AppShell from "../components/AppShell";

const farms = [
  { name: "Green Valley Farm", crop: "Rice", area: "18 acres", soil: 86, water: 72, status: "Healthy" },
  { name: "Sunny Acres", crop: "Corn", area: "12 acres", soil: 76, water: 61, status: "Active" },
  { name: "Riverside Farm", crop: "Rice", area: "9 acres", soil: 58, water: 42, status: "Needs Water" },
];

const inputSelectClass = "w-full rounded-2xl border-2 border-[#d1c4e9] bg-white px-6 py-5 text-lg font-bold outline-none transition-all duration-200 focus:border-[#8e6abf] focus:ring-4 focus:ring-[#f0e6f6]";

function Farms() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-black text-[#6b4f8a] md:text-5xl">Farms</h1>
            <p className="mt-2 text-xl text-[#9a8aaa]">Simple view of your fields, crops, water, and soil health</p>
          </div>
          <button className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] px-10 py-5 text-xl font-black text-white shadow-lg shadow-[#8e6abf]/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
            <Plus size={28} /> Add Farm
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6] md:flex-row">
          <label className="flex flex-1 items-center gap-3 rounded-2xl border-2 border-[#ede7f6] px-6 py-4 transition-all duration-200 focus-within:border-[#8e6abf] focus-within:ring-4 focus-within:ring-[#f0e6f6]">
            <Search className="text-[#8e6abf]" size={28} />
            <input className="w-full text-xl outline-none placeholder:text-slate-400" placeholder="Search farm or crop" />
          </label>
          <select className={`${inputSelectClass} max-w-xs`}>
            <option>All Farms</option>
            <option>Healthy</option>
            <option>Needs Water</option>
          </select>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {farms.map((farm) => (
            <article key={farm.name} className="group rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6] transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#d1c4e9]/30">
              <div className="flex items-start justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0e6f6] to-[#faf0f6] text-[#8e6abf] shadow-md">
                  <Sprout size={44} />
                </span>
                <span className={`rounded-full px-5 py-2 text-sm font-black shadow-sm ${farm.status === "Needs Water" ? "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700" : "bg-gradient-to-r from-[#f0e6f6] to-[#faf0f6] text-[#7b55a8]"}`}>
                  {farm.status}
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-black text-[#6b4f8a]">{farm.name}</h2>
              <p className="mt-3 flex items-center gap-3 text-lg text-[#9a8aaa]"><MapPin size={24} /> {farm.area}</p>
              <p className="mt-2 flex items-center gap-3 text-xl font-bold"><Leaf className="text-[#8e6abf]" size={24} /> {farm.crop}</p>

              <div className="mt-8 space-y-6">
                <div>
                  <div className="mb-3 flex justify-between text-lg font-black text-[#6b4f8a]"><span>Soil Health</span><span>{farm.soil}%</span></div>
                  <div className="h-4 rounded-full bg-[#ede7f6]"><div className="h-4 rounded-full bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] transition-all duration-500" style={{ width: `${farm.soil}%` }} /></div>
                </div>
                <div>
                  <div className="mb-3 flex justify-between text-lg font-black text-[#6b4f8a]"><span className="flex items-center gap-2"><Droplets size={24} /> Water Level</span><span>{farm.water}%</span></div>
                  <div className="h-4 rounded-full bg-[#ede7f6]"><div className="h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-300 transition-all duration-500" style={{ width: `${farm.water}%` }} /></div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <button className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0e6f6] to-[#faf0f6] py-4 text-[#8e6abf] shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"><Eye size={28} /></button>
                <button className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-50/50 py-4 text-blue-600 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"><Pencil size={28} /></button>
                <button className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-red-50/50 py-4 text-red-500 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"><Trash2 size={28} /></button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

export default Farms;
