import { useState } from "react";
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

const farmsData = [
  {
    id: "green-valley",
    name: "Green Valley Farm",
    crop: "Rice",
    performance: [
      { title: "Growth Status", value: "Healthy", note: "85% optimal", icon: CheckCircle2, color: "bg-[#2E7D32] text-white" },
      { title: "Harvest In", value: "12 Days", note: "Oct 25, 2026", icon: CalendarDays, color: "bg-[#2E7D32] text-white", dark: true },
      { title: "Yield", value: "2.3 Tons", note: "↗ +15%", icon: TrendingUp, color: "bg-[#F59E0B] text-white" },
      { title: "Net Profit", value: "₹17K", note: "Revenue: ₹45K", icon: DollarSign, color: "bg-[#2E7D32] text-white" },
    ],
    charts: [
      { title: "Temperature", value: "28°C", status: "Normal", dataKey: "temperature", color: "#ff5b1a", icon: Thermometer, iconBg: "bg-orange-500" },
      { title: "Soil Moisture", value: "56%", status: "Low", dataKey: "moisture", color: "#2f7df6", icon: Droplets, iconBg: "bg-blue-500" },
      { title: "Humidity", value: "72%", status: "Normal", dataKey: "humidity", color: "#06b6d4", icon: Droplets, iconBg: "bg-cyan-500" },
      { title: "NPK Level", value: "45 ppm", status: "Optimal", dataKey: "npk", color: "#0F2440", icon: Leaf, iconBg: "bg-[#0F2440]" },
    ],
    sensorData: [
      { time: "00:00", temperature: 18, moisture: 65, humidity: 74, npk: 38 },
      { time: "04:00", temperature: 16, moisture: 62, humidity: 76, npk: 40 },
      { time: "08:00", temperature: 22, moisture: 58, humidity: 73, npk: 42 },
      { time: "12:00", temperature: 28, moisture: 55, humidity: 70, npk: 45 },
      { time: "16:00", temperature: 26, moisture: 53, humidity: 72, npk: 46 },
      { time: "20:00", temperature: 22, moisture: 56, humidity: 75, npk: 44 },
      { time: "24:00", temperature: 19, moisture: 60, humidity: 77, npk: 45 },
    ],
    summary: "Rice crop is healthy. Water is slightly low, so irrigate Sector A for 20 minutes today.",
  },
  {
    id: "sunrise",
    name: "Sunrise Organic Farm",
    crop: "Wheat",
    performance: [
      { title: "Growth Status", value: "Good", note: "78% optimal", icon: CheckCircle2, color: "bg-[#2E7D32] text-white" },
      { title: "Harvest In", value: "21 Days", note: "Nov 5, 2026", icon: CalendarDays, color: "bg-[#2E7D32] text-white", dark: true },
      { title: "Yield", value: "1.8 Tons", note: "↗ +8%", icon: TrendingUp, color: "bg-[#F59E0B] text-white" },
      { title: "Net Profit", value: "₹12K", note: "Revenue: ₹32K", icon: DollarSign, color: "bg-[#2E7D32] text-white" },
    ],
    charts: [
      { title: "Temperature", value: "24°C", status: "Normal", dataKey: "temperature", color: "#ff5b1a", icon: Thermometer, iconBg: "bg-orange-500" },
      { title: "Soil Moisture", value: "62%", status: "Normal", dataKey: "moisture", color: "#2f7df6", icon: Droplets, iconBg: "bg-blue-500" },
      { title: "Humidity", value: "68%", status: "Normal", dataKey: "humidity", color: "#06b6d4", icon: Droplets, iconBg: "bg-cyan-500" },
      { title: "NPK Level", value: "38 ppm", status: "Low", dataKey: "npk", color: "#0F2440", icon: Leaf, iconBg: "bg-[#0F2440]" },
    ],
    sensorData: [
      { time: "00:00", temperature: 15, moisture: 70, humidity: 71, npk: 32 },
      { time: "04:00", temperature: 13, moisture: 68, humidity: 73, npk: 34 },
      { time: "08:00", temperature: 19, moisture: 64, humidity: 70, npk: 36 },
      { time: "12:00", temperature: 24, moisture: 62, humidity: 68, npk: 38 },
      { time: "16:00", temperature: 23, moisture: 60, humidity: 69, npk: 40 },
      { time: "20:00", temperature: 19, moisture: 63, humidity: 72, npk: 37 },
      { time: "24:00", temperature: 16, moisture: 66, humidity: 74, npk: 35 },
    ],
    summary: "Wheat crop in tillering stage. Apply nitrogen fertilizer in Sector B within 2 days.",
  },
  {
    id: "bluebell",
    name: "Bluebell Estates",
    crop: "Corn",
    performance: [
      { title: "Growth Status", value: "Excellent", note: "92% optimal", icon: CheckCircle2, color: "bg-[#2E7D32] text-white" },
      { title: "Harvest In", value: "7 Days", note: "Oct 20, 2026", icon: CalendarDays, color: "bg-[#2E7D32] text-white", dark: true },
      { title: "Yield", value: "3.1 Tons", note: "↗ +22%", icon: TrendingUp, color: "bg-[#F59E0B] text-white" },
      { title: "Net Profit", value: "₹22K", note: "Revenue: ₹58K", icon: DollarSign, color: "bg-[#2E7D32] text-white" },
    ],
    charts: [
      { title: "Temperature", value: "26°C", status: "Normal", dataKey: "temperature", color: "#ff5b1a", icon: Thermometer, iconBg: "bg-orange-500" },
      { title: "Soil Moisture", value: "48%", status: "Low", dataKey: "moisture", color: "#2f7df6", icon: Droplets, iconBg: "bg-blue-500" },
      { title: "Humidity", value: "65%", status: "Low", dataKey: "humidity", color: "#06b6d4", icon: Droplets, iconBg: "bg-cyan-500" },
      { title: "NPK Level", value: "52 ppm", status: "Optimal", dataKey: "npk", color: "#0F2440", icon: Leaf, iconBg: "bg-[#0F2440]" },
    ],
    sensorData: [
      { time: "00:00", temperature: 17, moisture: 55, humidity: 70, npk: 44 },
      { time: "04:00", temperature: 15, moisture: 52, humidity: 72, npk: 46 },
      { time: "08:00", temperature: 20, moisture: 50, humidity: 68, npk: 48 },
      { time: "12:00", temperature: 26, moisture: 48, humidity: 65, npk: 52 },
      { time: "16:00", temperature: 25, moisture: 46, humidity: 66, npk: 54 },
      { time: "20:00", temperature: 21, moisture: 49, humidity: 69, npk: 50 },
      { time: "24:00", temperature: 18, moisture: 53, humidity: 71, npk: 47 },
    ],
    summary: "Corn approaching harvest. Moisture levels dropping — schedule irrigation in Sector C tonight.",
  },
  {
    id: "meadow",
    name: "Meadow Creek Farms",
    crop: "Soybean",
    performance: [
      { title: "Growth Status", value: "Fair", note: "60% optimal", icon: CheckCircle2, color: "bg-[#F59E0B] text-white" },
      { title: "Harvest In", value: "35 Days", note: "Nov 18, 2026", icon: CalendarDays, color: "bg-[#2E7D32] text-white", dark: true },
      { title: "Yield", value: "1.2 Tons", note: "↗ +5%", icon: TrendingUp, color: "bg-[#F59E0B] text-white" },
      { title: "Net Profit", value: "₹8K", note: "Revenue: ₹22K", icon: DollarSign, color: "bg-[#2E7D32] text-white" },
    ],
    charts: [
      { title: "Temperature", value: "30°C", status: "High", dataKey: "temperature", color: "#ff5b1a", icon: Thermometer, iconBg: "bg-orange-500" },
      { title: "Soil Moisture", value: "42%", status: "Critical", dataKey: "moisture", color: "#2f7df6", icon: Droplets, iconBg: "bg-blue-500" },
      { title: "Humidity", value: "58%", status: "Low", dataKey: "humidity", color: "#06b6d4", icon: Droplets, iconBg: "bg-cyan-500" },
      { title: "NPK Level", value: "28 ppm", status: "Low", dataKey: "npk", color: "#0F2440", icon: Leaf, iconBg: "bg-[#0F2440]" },
    ],
    sensorData: [
      { time: "00:00", temperature: 22, moisture: 48, humidity: 62, npk: 24 },
      { time: "04:00", temperature: 20, moisture: 46, humidity: 64, npk: 25 },
      { time: "08:00", temperature: 25, moisture: 44, humidity: 60, npk: 26 },
      { time: "12:00", temperature: 30, moisture: 42, humidity: 58, npk: 28 },
      { time: "16:00", temperature: 29, moisture: 40, humidity: 59, npk: 30 },
      { time: "20:00", temperature: 26, moisture: 43, humidity: 61, npk: 27 },
      { time: "24:00", temperature: 23, moisture: 46, humidity: 63, npk: 26 },
    ],
    summary: "Soybean under heat stress. Increase irrigation frequency and consider shade netting for Sector D.",
  },
];

function Analytics() {
  const [selectedFarm, setSelectedFarm] = useState(farmsData[0].id);
  const farm = farmsData.find((f) => f.id === selectedFarm) || farmsData[0];

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Analytics - {farm.name} ({farm.crop})</h1>
            <p className="mt-1 text-sm font-[400] text-[#5A7A5A]">Real-time sensor data and performance metrics</p>
          </div>
          <label className="w-56">
            <span className="label">Select Farm</span>
            <select className="input" value={selectedFarm} onChange={(e) => setSelectedFarm(e.target.value)}>
              {farmsData.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </label>
        </div>

        <section>
          <h2 className="mb-6 text-xl font-bold text-[#111827]">Crop Performance</h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {farm.performance.map((item) => (
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
            {farm.charts.map((chart) => (
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
                    <p className={`font-black ${chart.status === "Low" || chart.status === "Critical" || chart.status === "High" ? "text-orange-500" : "text-[#2E7D32]"}`}>{chart.status}</p>
                  </div>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={farm.sensorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey={chart.dataKey} stroke={chart.color} strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 border-t pt-4 text-sm text-slate-600">
                  Trend over time — shows how {chart.title.toLowerCase()} changes throughout the day for {farm.name}.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="flex items-center gap-3 text-xl font-bold text-[#111827]">
            <Sprout className="text-[#2E7D32]" size={34} /> Farmer Summary
          </h2>
          <p className="mt-1 text-sm font-[400] text-[#5A7A5A]">{farm.summary}</p>
        </section>
      </section>
    </AppShell>
  );
}

export default Analytics;
