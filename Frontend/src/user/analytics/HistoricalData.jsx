import { Download, History, Search } from "lucide-react";
import AppShell from "../components/AppShell";

const readings = [
  { date: "2026-06-21", field: "Green Valley", temperature: "24°C", humidity: "72%", moisture: "56%", npk: "45 ppm" },
  { date: "2026-06-20", field: "Sunny Acres", temperature: "27°C", humidity: "68%", moisture: "61%", npk: "42 ppm" },
  { date: "2026-06-19", field: "Riverside Farm", temperature: "29°C", humidity: "70%", moisture: "44%", npk: "39 ppm" },
  { date: "2026-06-18", field: "Green Valley", temperature: "25°C", humidity: "75%", moisture: "60%", npk: "46 ppm" },
];

function HistoricalData() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-black text-[#6b4f8a] md:text-5xl">Historical Data</h1>
            <p className="mt-2 text-xl text-[#9a8aaa]">Previous sensor readings for easy farm checking</p>
          </div>
          <button className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] px-10 py-5 text-xl font-black text-white shadow-lg shadow-[#8e6abf]/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
            <Download size={28} /> Export CSV
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6] md:flex-row">
          <label className="flex flex-1 items-center gap-3 rounded-2xl border-2 border-[#ede7f6] px-6 py-4 transition-all duration-200 focus-within:border-[#8e6abf] focus-within:ring-4 focus-within:ring-[#f0e6f6]">
            <Search className="text-[#8e6abf]" size={28} />
            <input className="w-full text-xl outline-none placeholder:text-slate-400" placeholder="Search by date or field" />
          </label>
          <select className="w-full max-w-xs rounded-2xl border-2 border-[#d1c4e9] bg-white px-6 py-5 text-xl font-bold outline-none transition-all duration-200 focus:border-[#8e6abf] focus:ring-4 focus:ring-[#f0e6f6]">
            <option>All Fields</option>
            <option>Green Valley</option>
            <option>Sunny Acres</option>
          </select>
        </div>

        <section className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6]">
          <div className="flex items-center gap-4 border-b border-[#ede7f6] p-8">
            <History className="text-[#8e6abf]" size={48} />
            <h2 className="text-3xl font-black text-[#6b4f8a]">Sensor Reading History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-gradient-to-r from-[#f5f0fa] to-[#faf0f6]">
                <tr>
                  {["Date", "Field", "Temperature", "Humidity", "Moisture", "NPK Values"].map((h) => (
                    <th key={h} className="px-8 py-6 text-sm font-black uppercase tracking-wide text-[#6b5b7b]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {readings.map((row) => (
                  <tr key={`${row.date}-${row.field}`} className="border-t border-[#ede7f6] transition-all hover:bg-[#faf0f6]">
                    <td className="px-8 py-6 text-lg font-bold text-[#6b4f8a]">{row.date}</td>
                    <td className="px-8 py-6 text-lg font-bold text-[#6b4f8a]">{row.field}</td>
                    <td className="px-8 py-6 text-lg text-[#6b5b7b]">{row.temperature}</td>
                    <td className="px-8 py-6 text-lg text-[#6b5b7b]">{row.humidity}</td>
                    <td className="px-8 py-6 text-lg text-[#6b5b7b]">{row.moisture}</td>
                    <td className="px-8 py-6 text-lg text-[#6b5b7b]">{row.npk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </AppShell>
  );
}

export default HistoricalData;
