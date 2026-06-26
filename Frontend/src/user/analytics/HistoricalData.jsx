import { CalendarDays, Download, Filter } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppShell from "../components/AppShell";

const moistureHistory = [
  { date: "Jan 15", moisture: 62 },
  { date: "Jan 22", moisture: 58 },
  { date: "Jan 29", moisture: 65 },
  { date: "Feb 05", moisture: 60 },
  { date: "Feb 12", moisture: 55 },
  { date: "Feb 19", moisture: 58 },
  { date: "Feb 26", moisture: 64 },
  { date: "Mar 05", moisture: 56 },
];

const temperatureHistory = [
  { date: "Jan 15", temperature: 23 },
  { date: "Jan 22", temperature: 25 },
  { date: "Jan 29", temperature: 24 },
  { date: "Feb 05", temperature: 29 },
  { date: "Feb 12", temperature: 31 },
  { date: "Feb 19", temperature: 28 },
  { date: "Feb 26", temperature: 26 },
  { date: "Mar 05", temperature: 27 },
];

function FilterSelect({ label, icon: Icon, value, options }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#00112b]">
        {Icon ? <Icon size={18} className="text-slate-700" /> : null}
        {label}
      </span>
      <select className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-base font-semibold outline-none transition focus:border-[#0F2440] focus:ring-2 focus:ring-[#D0E0F0]">
        <option>{value}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function HistoricalData() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-9">
        <div>
          <h1 className="text-3xl font-black text-[#234F78] md:text-4xl">Historical Data</h1>
          <p className="mt-2 text-lg text-slate-700">Analyze trends and patterns over time</p>
        </div>

        <section className="rounded-xl bg-white p-7 shadow-lg">
          <h2 className="mb-5 flex items-center gap-3 text-2xl font-black">
            <Filter className="text-[#0F2440]" size={28} />
            Filters
          </h2>
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
            <FilterSelect
              label="Date Range"
              icon={CalendarDays}
              value="Last 30 Days"
              options={["Last 60 Days", "Last 90 Days", "This Season"]}
            />
            <FilterSelect label="Crop Type" value="All Crops" options={["Wheat", "Rice", "Corn"]} />
            <FilterSelect label="Field" value="All Fields" options={["Sector A", "Sector B", "Sector C"]} />
            <button className="flex h-11 min-w-64 items-center justify-center gap-3 rounded-lg bg-[#0F2440] px-6 font-black text-white transition hover:bg-[#1E4468]">
              <Download size={20} />
              Export Data
            </button>
          </div>
        </section>

        <section className="rounded-xl bg-white p-7 shadow-lg">
          <h2 className="mb-6 text-xl font-black">Soil Moisture History</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moistureHistory} margin={{ top: 5, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="#d6d6d6" strokeDasharray="4 4" />
                <XAxis dataKey="date" tick={{ fill: "#4b5563", fontSize: 16 }} />
                <YAxis domain={[0, 80]} ticks={[0, 20, 40, 60, 80]} tick={{ fill: "#4b5563", fontSize: 16 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="moisture"
                  name="Soil Moisture (%)"
                  stroke="#0F2440"
                  strokeWidth={2}
                  fill="#B0C4DE"
                  fillOpacity={0.55}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-lg font-semibold text-[#132D4A]">
            <span className="h-2 w-2 rounded-full border-2 border-[#132D4A]" />
            Soil Moisture (%)
          </div>
        </section>

        <section className="rounded-xl bg-white p-7 shadow-lg">
          <h2 className="mb-6 text-xl font-black">Temperature Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureHistory} margin={{ top: 5, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="#d6d6d6" strokeDasharray="4 4" />
                <XAxis dataKey="date" tick={{ fill: "#4b5563", fontSize: 16 }} />
                <YAxis domain={[15, 35]} ticks={[15, 20, 25, 30, 35]} tick={{ fill: "#4b5563", fontSize: 16 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  name="Temperature (C)"
                  stroke="#ff6b1a"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ff6b1a", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </section>
    </AppShell>
  );
}

export default HistoricalData;
