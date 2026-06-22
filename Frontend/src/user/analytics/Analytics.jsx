import {
  CalendarDays, CheckCircle2, DollarSign, Droplets, Leaf, Sprout, Thermometer, TrendingUp,
} from "lucide-react";
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import AppShell from "../components/AppShell";

const sensorData = [
  { time: "00:00", temperature: 18, moisture: 65, humidity: 74, npk: 38 },
  { time: "04:00", temperature: 16, moisture: 62, humidity: 76, npk: 40 },
  { time: "08:00", temperature: 22, moisture: 58, humidity: 73, npk: 42 },
  { time: "12:00", temperature: 28, moisture: 55, humidity: 70, npk: 45 },
  { time: "16:00", temperature: 26, moisture: 53, humidity: 72, npk: 46 },
  { time: "20:00", temperature: 22, moisture: 56, humidity: 75, npk: 44 },
  { time: "24:00", temperature: 19, moisture: 60, humidity: 77, npk: 45 },
];

const performance = [
  { title: "Growth Status", value: "Healthy", note: "85% optimal", icon: CheckCircle2, color: "from-green-400 to-green-300 text-white" },
  { title: "Harvest In", value: "12 Days", note: "Oct 25, 2026", icon: CalendarDays, color: "from-[#8e6abf] to-[#b39ddb] text-white", dark: true },
  { title: "Yield", value: "2.3 Tons", note: "+15% vs last season", icon: TrendingUp, color: "from-orange-400 to-orange-300 text-white" },
  { title: "Net Profit", value: "₹17K", note: "Revenue: ₹45K", icon: DollarSign, color: "from-[#6b4f8a] to-[#8e6abf] text-white" },
];

const charts = [
  { title: "Temperature", value: "28°C", status: "Normal", dataKey: "temperature", color: "#ff5b1a", icon: Thermometer, iconBg: "from-orange-400 to-orange-300" },
  { title: "Soil Moisture", value: "56%", status: "Low", dataKey: "moisture", color: "#2f7df6", icon: Droplets, iconBg: "from-blue-400 to-blue-300" },
  { title: "Humidity", value: "72%", status: "Normal", dataKey: "humidity", color: "#06b6d4", icon: Droplets, iconBg: "from-cyan-400 to-cyan-300" },
  { title: "NPK Level", value: "45 ppm", status: "Optimal", dataKey: "npk", color: "#8e6abf", icon: Leaf, iconBg: "from-[#8e6abf] to-[#b39ddb]" },
];

const selectClass = "w-full rounded-2xl border-2 border-[#d1c4e9] bg-white px-6 py-5 text-xl font-bold outline-none transition-all duration-200 focus:border-[#8e6abf] focus:ring-4 focus:ring-[#f0e6f6]";

function Analytics() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <h1 className="text-4xl font-black text-[#6b4f8a] md:text-5xl">Analytics — Green Valley Farm (Rice)</h1>
            <p className="mt-2 text-xl text-[#9a8aaa]">Real-time sensor data and performance metrics</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Select Farm", "Select Crop"].map((label, i) => (
              <label key={label}>
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">{label}</span>
                <select className={selectClass}>
                  <option>{i === 0 ? "Green Valley Farm" : "Rice"}</option>
                </select>
              </label>
            ))}
          </div>
        </div>

        <section>
          <h2 className="mb-8 text-3xl font-black text-[#6b4f8a]">Crop Performance</h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {performance.map((item) => (
              <article key={item.title} className={`rounded-3xl p-8 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${item.dark ? "bg-gradient-to-br from-[#6b4f8a] to-[#8e6abf] text-white" : "bg-white ring-1 ring-[#ede7f6]"}`}>
                <div className="mb-6 flex items-center gap-4">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-md ${item.color}`}>
                    <item.icon size={32} />
                  </span>
                  <h3 className="text-xl font-black">{item.title}</h3>
                </div>
                <p className={`text-5xl font-black ${item.value === "Healthy" ? "text-green-400" : item.dark ? "text-white" : "text-[#6b4f8a]"}`}>{item.value}</p>
                <p className={`mt-3 text-lg ${item.dark ? "text-purple-100" : "text-[#9a8aaa]"}`}>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="text-3xl font-black text-[#6b4f8a]">Sensor Analytics</h2>
            <label className="w-full max-w-48">
              <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Graph Type</span>
              <select className={selectClass}>
                <option>Line Chart</option>
              </select>
            </label>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {charts.map((chart) => (
              <article key={chart.title} className="rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6] transition-all duration-200 hover:shadow-2xl">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-5">
                    <span className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md ${chart.iconBg}`}>
                      <chart.icon size={36} />
                    </span>
                    <div>
                      <h3 className="text-2xl font-black text-[#6b4f8a]">{chart.title}</h3>
                      <p className="mt-1 text-4xl font-black text-[#00112b]">{chart.value} <span className="text-lg text-green-400">↑</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#9a8aaa]">Status</p>
                    <p className={`text-xl font-black ${chart.status === "Low" ? "text-orange-400" : "text-green-500"}`}>{chart.status}</p>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sensorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ede7f6" />
                      <XAxis dataKey="time" tick={{ fill: "#9a8aaa" }} />
                      <YAxis tick={{ fill: "#9a8aaa" }} />
                      <Tooltip />
                      <Line type="monotone" dataKey={chart.dataKey} stroke={chart.color} strokeWidth={4} dot={{ r: 6, fill: chart.color }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-6 border-t border-[#ede7f6] pt-6 text-lg text-[#9a8aaa]">
                  Trend over time — how {chart.title.toLowerCase()} changes throughout the day.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-10 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6]">
          <h2 className="flex items-center gap-4 text-3xl font-black text-[#6b4f8a]">
            <Sprout className="text-[#8e6abf]" size={42} /> Farmer Summary
          </h2>
          <p className="mt-4 text-xl leading-9 text-[#6b5b7b]">
            Rice crop is healthy. Water is slightly low, so irrigate Sector A for 20 minutes today.
          </p>
        </section>
      </section>
    </AppShell>
  );
}

export default Analytics;
