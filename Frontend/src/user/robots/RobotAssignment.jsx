import { Bot, Check, Link as LinkIcon, MapPin, X } from "lucide-react";
import AppShell from "../components/AppShell";

const availableRobots = [
  { name: "AgriBot Gamma", id: "ROB-003", battery: 20 },
  { name: "AgriBot Delta", id: "ROB-004", battery: 100 },
];

const farms = [
  { name: "Green Valley Farm", crop: "Wheat", robots: ["AgriBot Alpha"] },
  { name: "Sunny Acres", crop: "Corn", robots: ["AgriBot Beta"] },
  { name: "Riverside Farm", crop: "Rice", robots: [] },
];

function batteryColor(value) {
  if (value <= 25) return "bg-red-500";
  if (value <= 50) return "bg-yellow-500";
  return "bg-green-500";
}

function RobotAssignment() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-black text-[#132D4A] md:text-4xl">Robot Assignment</h1>
          <p className="mt-2 text-lg text-slate-700">Assign robots to farms by selecting a robot and farm</p>
        </div>

        <section className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-5 text-2xl font-black">Manual Assignment</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            <label>
              <span className="mb-2 block font-semibold">Select Robot</span>
              <select className="w-full rounded-lg border border-slate-300 bg-white px-5 py-4 text-lg outline-none">
                <option>Choose a robot</option>
                <option>AgriBot Gamma</option>
                <option>AgriBot Delta</option>
              </select>
            </label>
            <label>
              <span className="mb-2 block font-semibold">Select Farm</span>
              <select className="w-full rounded-lg border border-slate-300 bg-white px-5 py-4 text-lg outline-none">
                <option>Choose a farm</option>
                <option>Green Valley Farm</option>
                <option>Riverside Farm</option>
              </select>
            </label>
            <button className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-300 px-5 py-4 text-lg font-black text-white">
              <Check size={22} /> Assign Robot
            </button>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-4 text-2xl font-black">Available Robots</h2>
            <div className="space-y-4">
              {availableRobots.map((robot) => (
                <article key={robot.id} className="rounded-xl border bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="rounded-lg bg-[#132D4A] p-4 text-white">
                        <Bot size={34} />
                      </span>
                      <div>
                        <h3 className="text-xl font-black">{robot.name}</h3>
                        <p className="text-slate-600">{robot.id}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-black text-green-700">available</span>
                  </div>
                  <div className="mt-5 flex justify-between font-semibold">
                    <span>Battery</span>
                    <span>{robot.battery}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-200">
                    <div className={`h-2 rounded-full ${batteryColor(robot.battery)}`} style={{ width: `${robot.battery}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-black">Farms</h2>
            <div className="space-y-4">
              {farms.map((farm) => (
                <article key={farm.name} className="rounded-xl border bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <span className="rounded-lg bg-[#0F2440]/80 p-4 text-white">
                      <MapPin size={34} />
                    </span>
                    <div>
                      <h3 className="text-2xl font-black">{farm.name}</h3>
                      <p className="text-slate-600">{farm.crop}</p>
                    </div>
                  </div>
                  <p className="mt-5 font-semibold">Assigned Robots ({farm.robots.length})</p>
                  {farm.robots.length ? (
                    <div className="mt-3 space-y-2">
                      {farm.robots.map((robot) => (
                        <div key={robot} className="flex items-center justify-between rounded-lg bg-[#E8F0F8] px-4 py-3 font-black">
                          <span className="flex items-center gap-2"><Bot size={18} className="text-[#132D4A]" /> {robot}</span>
                          <X className="text-red-500" size={20} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 rounded-lg border-2 border-dashed border-slate-300 p-6 text-center text-slate-500">
                      <LinkIcon className="mx-auto mb-2" /> Drop robot here to assign
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </AppShell>
  );
}

export default RobotAssignment;
