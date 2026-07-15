import {
  CalendarDays,
  CheckCircle2,
  DollarSign,
  Droplets,
  Leaf,
  Sprout,
  Thermometer,
  TrendingUp,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
  { title: "Growth Status", value: "Healthy", note: "85% optimal", icon: CheckCircle2, color: "bg-[#2E7D32] text-white" },
  { title: "Harvest In", value: "12 Days", note: "Oct 25, 2026", icon: CalendarDays, color: "bg-[#2E7D32] text-white", dark: true },
  { title: "Yield", value: "2.3 Tons", note: "↗ +15%", icon: TrendingUp, color: "bg-[#F59E0B] text-white" },
  { title: "Net Profit", value: "₹17K", note: "Revenue: ₹45K", icon: DollarSign, color: "bg-[#2E7D32] text-white" },
];

const charts = [
  { title: "Temperature", value: "28°C", status: "Normal", dataKey: "temperature", color: "#ff5b1a", icon: Thermometer, iconBg: "bg-orange-500" },
  { title: "Soil Moisture", value: "56%", status: "Low", dataKey: "moisture", color: "#2f7df6", icon: Droplets, iconBg: "bg-blue-500" },
  { title: "Humidity", value: "72%", status: "Normal", dataKey: "humidity", color: "#06b6d4", icon: Droplets, iconBg: "bg-cyan-500" },
  { title: "NPK Level", value: "45 ppm", status: "Optimal", dataKey: "npk", color: "#0F2440", icon: Leaf, iconBg: "bg-[#0F2440]" },
];

function Analytics() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Analytics - Green Valley Farm (Rice)</h1>
            <p className="mt-1 text-sm font-[400] text-[#5A7A5A]">Real-time sensor data and performance metrics</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Select Farm", "Select Crop"].map((label, index) => (
              <label key={label}>
                <span className="label">{label}</span>
                <select className="input">
                  <option>{index === 0 ? "Green Valley Farm" : "Rice"}</option>
                </select>
              </label>
            ))}
          </div>
        </div>

        <section>
          <h2 className="mb-6 text-xl font-bold text-[#111827]">Crop Performance</h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {performance.map((item) => (
              <article key={item.title} className={`card ${item.dark ? "bg-[rgba(46,125,50,0.12)]" : ""}`}>
                <div className="mb-5 flex items-center gap-4">
                  <span className={`rounded-lg p-3 ${item.color}`}>
                    <item.icon size={30} />
                  </span>
                  <h3 className="font-black">{item.title}</h3>
                </div>
                <p className={`text-3xl font-bold text-black ${item.value === "Healthy" ? "text-[#2E7D32]" : ""}`}>{item.value}</p>
                <p className={`mt-2 text-sm ${item.dark ? "text-[#5A7A5A]" : "text-slate-600"}`}>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="text-xl font-bold text-[#111827]">Sensor Analytics</h2>
            <label className="w-full max-w-48">
              <span className="label">Graph Type</span>
              <select className="input">
                <option>Line Chart</option>
              </select>
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {charts.map((chart) => (
              <article key={chart.title} className="card">
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`rounded-lg p-4 text-white ${chart.iconBg}`}>
                      <chart.icon size={34} />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-[#111827]">{chart.title}</h3>
                      <p className="mt-1 text-3xl font-bold text-black">{chart.value} <span className="text-lg text-[#2E7D32]">↑</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Status</p>
                    <p className={`font-black ${chart.status === "Low" ? "text-orange-500" : "text-[#2E7D32]"}`}>{chart.status}</p>
                  </div>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sensorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey={chart.dataKey} stroke={chart.color} strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 border-t pt-4 text-sm text-slate-600">
                  Trend over time - shows how {chart.title.toLowerCase()} changes throughout the day.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="flex items-center gap-3 text-xl font-bold text-[#111827]">
            <Sprout className="text-[#2E7D32]" size={34} /> Farmer Summary
          </h2>
          <p className="mt-1 text-sm font-[400] text-[#5A7A5A]">
            Rice crop is healthy. Water is slightly low, so irrigate Sector A for 20 minutes today.
          </p>
        </section>
      </section>
    </AppShell>
  );
}

export default Analytics;
