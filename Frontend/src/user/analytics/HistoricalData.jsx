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
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-black text-[#287c30] md:text-4xl">Historical Data</h1>
            <p className="mt-2 text-lg text-slate-700">Previous sensor readings for easy farm checking</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#287c30] px-6 py-4 text-lg font-black text-white">
            <Download size={24} /> Export CSV
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-lg md:flex-row">
          <label className="flex flex-1 items-center gap-3 rounded-lg border px-4 py-3">
            <Search className="text-[#287c30]" size={24} />
            <input className="w-full text-lg outline-none" placeholder="Search by date or field" />
          </label>
          <select className="rounded-lg border-2 border-[#287c30] bg-white px-5 py-3 text-lg font-bold outline-none">
            <option>All Fields</option>
            <option>Green Valley</option>
            <option>Sunny Acres</option>
          </select>
        </div>

        <section className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="flex items-center gap-4 border-b p-6">
            <History className="text-[#287c30]" size={42} />
            <h2 className="text-2xl font-black">Sensor Reading History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-[#fbfdf8]">
                <tr>
                  {["Date", "Field", "Temperature", "Humidity", "Moisture", "NPK Values"].map((head) => (
                    <th key={head} className="px-6 py-5 font-black">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {readings.map((row) => (
                  <tr key={`${row.date}-${row.field}`} className="border-t">
                    <td className="px-6 py-5 font-semibold">{row.date}</td>
                    <td className="px-6 py-5 font-semibold">{row.field}</td>
                    <td className="px-6 py-5">{row.temperature}</td>
                    <td className="px-6 py-5">{row.humidity}</td>
                    <td className="px-6 py-5">{row.moisture}</td>
                    <td className="px-6 py-5">{row.npk}</td>
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
