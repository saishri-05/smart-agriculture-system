import { Bell, Bot, Cloud, CloudRain, Droplets, Leaf, MapPin, Sun, Thermometer, Wind } from "lucide-react";
import AppShell from "../components/AppShell";

const weatherCards = [
  { label: "Temperature", value: "24°C", icon: Sun, color: "bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600" },
  { label: "Humidity", value: "72%", icon: Droplets, color: "bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600" },
  { label: "Wind Speed", value: "12 km/h", icon: Wind, color: "bg-gradient-to-br from-cyan-100 to-cyan-50 text-cyan-600" },
  { label: "Rain Chance", value: "25%", icon: CloudRain, color: "bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600" },
];

const forecast = [
  ["Mon", Sun, "28°C", "10%"], ["Tue", CloudRain, "26°C", "45%"], ["Wed", Cloud, "27°C", "20%"],
  ["Thu", Sun, "29°C", "5%"], ["Fri", CloudRain, "25°C", "60%"], ["Sat", Cloud, "24°C", "30%"], ["Sun", Cloud, "26°C", "15%"],
];

const sensorCards = [
  { label: "Soil Moisture", value: "56%", change: "+3%", icon: Droplets, color: "from-blue-500 to-blue-400" },
  { label: "Temperature", value: "24°C", change: "+2°C", icon: Thermometer, color: "from-orange-500 to-orange-400" },
  { label: "Humidity", value: "72%", change: "0%", icon: CloudRain, color: "from-cyan-500 to-cyan-400" },
  { label: "NPK Average", value: "45", change: "+5", icon: Leaf, color: "from-[#8e6abf] to-[#b39ddb]" },
];

const alerts = [
  ["Green Valley Farm", "Low soil moisture detected in Sector A", "2 hours ago", "border-red-400 bg-gradient-to-r from-red-50 to-red-50/50"],
  ["Green Valley Farm", "Possible fungal infection detected", "5 hours ago", "border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-50/50"],
  ["Sunny Acres", "Robot battery low - AgriBot Alpha", "8 hours ago", "border-blue-400 bg-gradient-to-r from-blue-50 to-blue-50/50"],
  ["Riverside Farm", "Temperature sensor malfunction", "12 hours ago", "border-red-400 bg-gradient-to-r from-red-50 to-red-50/50"],
];

const selectClass = "w-full rounded-2xl border-2 border-[#d1c4e9] bg-white px-6 py-5 text-xl font-bold outline-none transition-all duration-200 focus:border-[#8e6abf] focus:ring-4 focus:ring-[#f0e6f6]";

function Dashboard() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <h1 className="text-4xl font-black text-[#6b4f8a] md:text-5xl">Farm Dashboard</h1>
            <p className="mt-2 text-xl text-[#9a8aaa]">Real-time monitoring and analytics for your farm</p>
          </div>
          <label className="w-full max-w-xs">
            <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Select Farm</span>
            <select className={selectClass}>
              <option>Green Valley Farm</option>
              <option>Sunny Acres</option>
              <option>Riverside Farm</option>
            </select>
          </label>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.7fr_0.85fr]">
          <section className="rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6]">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-[#6b4f8a]">Weather Forecast</h2>
                <p className="mt-1 text-lg text-[#9a8aaa]">Green Valley Farm</p>
              </div>
              <Cloud className="text-[#d1c4e9]" size={52} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {weatherCards.map((item) => (
                <div key={item.label} className={`rounded-2xl p-6 shadow-lg transition-all duration-200 hover:scale-[1.02] ${item.color}`}>
                  <item.icon size={34} />
                  <p className="mt-4 text-sm font-bold text-slate-500">{item.label}</p>
                  <p className="mt-2 text-4xl font-black text-[#00112b]">{item.value}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-10 text-2xl font-black text-[#6b4f8a]">7-Day Forecast</h3>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {forecast.map(([day, Icon, temp, rain]) => (
                <div key={day} className="rounded-2xl bg-gradient-to-b from-[#faf0f6] to-[#f5f0fa] p-5 text-center shadow-md transition-all duration-200 hover:scale-[1.05] hover:shadow-lg">
                  <p className="font-bold text-[#6b5b7b]">{day}</p>
                  <Icon className="mx-auto my-4 text-[#8e6abf]" size={34} />
                  <p className="text-2xl font-black text-[#6b4f8a]">{temp}</p>
                  <p className="mt-2 text-sm font-semibold text-[#9a8aaa]">{rain}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border-l-8 border-[#b39ddb] bg-gradient-to-r from-[#f5f0fa] to-[#faf0f6] p-6 shadow-md">
              <h3 className="text-2xl font-black text-[#6b4f8a]">AI Weather Insights</h3>
              <ul className="mt-4 list-disc space-y-3 pl-6 text-lg text-[#6b5b7b]">
                <li>Rain expected tomorrow, irrigation may not be required.</li>
                <li>High humidity may increase risk of fungal disease.</li>
                <li>Temperature is good for rice crop growth this week.</li>
              </ul>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6]">
            <div className="mb-8 flex items-center gap-5">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8e6abf] to-[#b39ddb] text-white shadow-lg shadow-[#8e6abf]/30">
                <Bot size={40} />
              </span>
              <div>
                <h2 className="text-2xl font-black text-[#6b4f8a]">Robot Status</h2>
                <p className="text-lg text-[#9a8aaa]">Fleet Overview</p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-2xl bg-gradient-to-br from-[#f0e6f6] to-[#faf0f6] p-6 shadow-md">
                <p className="text-lg font-bold text-[#7b55a8]">Active</p>
                <p className="mt-2 text-5xl font-black text-[#6b4f8a]">4/5</p>
                <p className="mt-1 text-sm text-[#9a8aaa]">Robots Online</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-50/50 p-6 shadow-md">
                <p className="text-lg font-bold text-blue-700">Battery</p>
                <p className="mt-2 text-5xl font-black text-[#00112b]">78%</p>
                <p className="mt-1 text-sm text-[#9a8aaa]">Average Level</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#f5f0fa] to-[#faf0f6] p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-[#7b55a8]">Tasks Today</p>
                  <p className="mt-2 text-5xl font-black text-[#6b4f8a]">23</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#9a8aaa]">Completion Rate</p>
                  <div className="mt-3 h-3 w-36 rounded-full bg-[#ede7f6]">
                    <div className="h-3 w-[87%] rounded-full bg-gradient-to-r from-[#8e6abf] to-[#b39ddb]" />
                  </div>
                  <p className="mt-1 text-lg font-black text-[#8e6abf]">87%</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {sensorCards.map((item) => (
            <article key={item.label} className="group rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6] transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <span className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${item.color}`}>
                  <item.icon size={36} />
                </span>
                <span className="text-lg font-black text-green-500">{item.change}</span>
              </div>
              <p className="text-lg font-bold text-[#9a8aaa]">{item.label}</p>
              <p className="mt-2 text-5xl font-black text-[#6b4f8a]">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6]">
            <h2 className="mb-6 text-3xl font-black text-[#6b4f8a]">Robot Location & Farm Plot</h2>
            <div className="h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0e6f6] to-[#faf0f6] shadow-inner">
              <div className="grid h-full grid-cols-6 grid-rows-4 gap-2 p-6">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="rounded-xl bg-[#ede7f6] transition-all hover:bg-[#e0d4f0]" />
                ))}
                <div className="col-span-2 col-start-3 row-span-2 row-start-2 flex items-center justify-center gap-3 rounded-2xl border-4 border-[#8e6abf] bg-gradient-to-br from-[#8e6abf]/20 to-[#b39ddb]/20 text-center text-2xl font-black text-[#8e6abf] shadow-lg">
                  <MapPin size={44} /> Sector A
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6]">
            <div className="mb-6 flex items-center gap-5">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-400 to-red-300 text-white shadow-lg">
                <Bell size={36} />
              </span>
              <div>
                <h2 className="text-2xl font-black text-[#6b4f8a]">Recent Alerts</h2>
                <p className="text-lg text-[#9a8aaa]">4 active alerts</p>
              </div>
            </div>
            <div className="space-y-4">
              {alerts.map(([farm, text, time, color]) => (
                <div key={text} className={`rounded-2xl border-l-8 p-6 shadow-md transition-all duration-200 hover:scale-[1.01] ${color}`}>
                  <p className="text-sm font-bold text-slate-500">{farm}</p>
                  <p className="mt-2 text-xl font-black text-[#00112b]">{text}</p>
                  <p className="mt-2 text-sm text-slate-500">{time}</p>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] py-5 text-xl font-black text-white shadow-lg shadow-[#8e6abf]/30 transition-all duration-200 hover:scale-[1.01] hover:shadow-xl active:scale-[0.99]">
              View All Alerts →
            </button>
          </section>
        </div>
      </section>
    </AppShell>
  );
}

export default Dashboard;
