import {
  Bell,
  Bot,
  Cloud,
  CloudRain,
  Droplets,
  Leaf,
  MapPin,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import AppShell from "../components/AppShell";

const weatherCards = [
  { label: "Temperature", value: "24°C", icon: Sun, color: "bg-orange-50 text-orange-600" },
  { label: "Humidity", value: "72%", icon: Droplets, color: "bg-blue-50 text-blue-600" },
  { label: "Wind Speed", value: "12 km/h", icon: Wind, color: "bg-cyan-50 text-cyan-600" },
  { label: "Rain Chance", value: "25%", icon: CloudRain, color: "bg-purple-50 text-purple-600" },
];

const forecast = [
  ["Mon", Sun, "28°C", "10%"],
  ["Tue", CloudRain, "26°C", "45%"],
  ["Wed", Cloud, "27°C", "20%"],
  ["Thu", Sun, "29°C", "5%"],
  ["Fri", CloudRain, "25°C", "60%"],
  ["Sat", Cloud, "24°C", "30%"],
  ["Sun", Cloud, "26°C", "15%"],
];

const sensorCards = [
  { label: "Soil Moisture", value: "56%", change: "3%", icon: Droplets, color: "bg-blue-500" },
  { label: "Temperature", value: "24°C", change: "2°C", icon: Thermometer, color: "bg-orange-500" },
  { label: "Humidity", value: "72%", change: "0%", icon: CloudRain, color: "bg-cyan-500" },
  { label: "NPK Average", value: "45", change: "5", icon: Leaf, color: "bg-green-700" },
];

const alerts = [
  ["Green Valley Farm", "Low soil moisture detected in Sector A", "2 hours ago", "border-red-500 bg-red-50"],
  ["Green Valley Farm", "Possible fungal infection detected", "5 hours ago", "border-yellow-500 bg-yellow-50"],
  ["Sunny Acres", "Robot battery low - AgriBot Alpha", "8 hours ago", "border-blue-500 bg-blue-50"],
  ["Riverside Farm", "Temperature sensor malfunction", "12 hours ago", "border-red-500 bg-red-50"],
];

function Dashboard() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h1 className="text-3xl font-black text-[#287c30] md:text-4xl">Farm Dashboard</h1>
            <p className="mt-2 text-lg text-slate-700">Real-time monitoring and analytics for your farm</p>
          </div>
          <label className="w-full max-w-xs">
            <span className="mb-2 block font-semibold">Select Farm</span>
            <select className="w-full rounded-lg border-2 border-[#287c30] bg-white px-5 py-4 text-lg font-bold outline-none">
              <option>Green Valley Farm</option>
              <option>Sunny Acres</option>
              <option>Riverside Farm</option>
            </select>
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.7fr_0.85fr]">
          <section className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">Weather Forecast</h2>
                <p className="mt-1 text-slate-600">Green Valley Farm</p>
              </div>
              <Cloud className="text-slate-400" size={40} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {weatherCards.map((item) => (
                <div key={item.label} className={`rounded-lg p-5 ${item.color}`}>
                  <item.icon size={26} />
                  <p className="mt-3 text-sm font-semibold text-slate-700">{item.label}</p>
                  <p className="mt-2 text-3xl font-black text-[#00112b]">{item.value}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-8 text-xl font-black">7-Day Forecast</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {forecast.map(([day, Icon, temp, rain]) => (
                <div key={day} className="rounded-lg bg-[#f6f8f2] p-4 text-center">
                  <p className="font-semibold text-slate-700">{day}</p>
                  <Icon className="mx-auto my-3 text-[#287c30]" size={30} />
                  <p className="text-xl font-black">{temp}</p>
                  <p className="mt-2 text-sm text-slate-600">{rain}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-5">
              <h3 className="text-lg font-black">AI Weather Insights</h3>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                <li>Rain expected tomorrow, irrigation may not be required.</li>
                <li>High humidity may increase risk of fungal disease.</li>
                <li>Temperature is good for rice crop growth this week.</li>
              </ul>
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center gap-4">
              <span className="rounded-lg bg-[#2e7d32] p-4 text-white">
                <Bot size={38} />
              </span>
              <div>
                <h2 className="text-2xl font-black">Robot Status</h2>
                <p className="text-slate-600">Fleet Overview</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-lg bg-green-50 p-5">
                <p className="font-semibold text-green-700">Active</p>
                <p className="mt-2 text-4xl font-black">4/5</p>
                <p className="text-sm text-slate-600">Robots Online</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-5">
                <p className="font-semibold text-blue-700">Battery</p>
                <p className="mt-2 text-4xl font-black">78%</p>
                <p className="text-sm text-slate-600">Average Level</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-purple-50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-purple-700">Tasks Today</p>
                  <p className="mt-2 text-4xl font-black">23</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Completion Rate</p>
                  <div className="mt-2 h-2 w-32 rounded-full bg-slate-200">
                    <div className="h-2 w-[87%] rounded-full bg-[#2e7d32]" />
                  </div>
                  <p className="mt-1 font-bold text-[#2e7d32]">87%</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {sensorCards.map((item) => (
            <article key={item.label} className="rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-5 flex items-center justify-between">
                <span className={`rounded-lg p-4 text-white ${item.color}`}>
                  <item.icon size={36} />
                </span>
                <span className="text-sm font-bold text-green-600">↗ {item.change}</span>
              </div>
              <p className="text-lg font-semibold text-slate-700">{item.label}</p>
              <p className="mt-2 text-4xl font-black">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-black">Robot Location & Farm Plot</h2>
            <div className="mt-5 h-80 overflow-hidden rounded-lg border bg-[#e7f0dc]">
              <div className="grid h-full grid-cols-6 grid-rows-4 gap-1 p-4">
                {Array.from({ length: 24 }).map((_, index) => (
                  <div key={index} className="rounded bg-green-100" />
                ))}
                <div className="col-span-2 col-start-3 row-span-2 row-start-2 flex items-center justify-center rounded-lg border-4 border-[#2e7d32] bg-green-200/70 text-center font-black text-[#2e7d32]">
                  <MapPin size={36} /> Sector A
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-5 flex items-center gap-4">
              <span className="rounded-lg bg-red-500 p-3 text-white">
                <Bell size={32} />
              </span>
              <div>
                <h2 className="text-2xl font-black">Recent Alerts</h2>
                <p className="text-slate-600">4 active alerts</p>
              </div>
            </div>
            <div className="space-y-3">
              {alerts.map(([farm, text, time, color]) => (
                <div key={text} className={`rounded-lg border-l-4 p-5 ${color}`}>
                  <p className="text-sm font-semibold text-slate-600">{farm}</p>
                  <p className="mt-1 font-black">{text}</p>
                  <p className="mt-2 text-sm text-slate-600">{time}</p>
                </div>
              ))}
            </div>
            <button className="mt-5 w-full rounded-lg bg-[#2e7d32] py-4 text-lg font-black text-white">
              View All Alerts →
            </button>
          </section>
        </div>
      </section>
    </AppShell>
  );
}

export default Dashboard;
