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

function batteryColor(v) {
  if (v <= 25) return "from-red-400 to-red-300";
  if (v <= 50) return "from-yellow-400 to-yellow-300";
  return "from-[#8e6abf] to-[#b39ddb]";
}

const selectClass = "w-full rounded-2xl border-2 border-[#d1c4e9] bg-white px-6 py-5 text-xl font-bold outline-none transition-all duration-200 focus:border-[#8e6abf] focus:ring-4 focus:ring-[#f0e6f6]";

function RobotAssignment() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-10">
        <div>
          <h1 className="text-4xl font-black text-[#6b4f8a] md:text-5xl">Robot Assignment</h1>
          <p className="mt-2 text-xl text-[#9a8aaa]">Assign robots to farms by selecting a robot and farm</p>
        </div>

        <section className="rounded-3xl bg-white p-10 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6]">
          <h2 className="mb-8 text-3xl font-black text-[#6b4f8a]">Manual Assignment</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <label>
              <span className="mb-3 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Select Robot</span>
              <select className={selectClass}>
                <option>Choose a robot</option>
                <option>AgriBot Gamma</option>
                <option>AgriBot Delta</option>
              </select>
            </label>
            <label>
              <span className="mb-3 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Select Farm</span>
              <select className={selectClass}>
                <option>Choose a farm</option>
                <option>Green Valley Farm</option>
                <option>Riverside Farm</option>
              </select>
            </label>
            <button className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] px-10 py-5 text-xl font-black text-white shadow-lg shadow-[#8e6abf]/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
              <Check size={28} /> Assign Robot
            </button>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-6 text-3xl font-black text-[#6b4f8a]">Available Robots</h2>
            <div className="space-y-6">
              {availableRobots.map((robot) => (
                <article key={robot.id} className="group rounded-3xl border-2 border-[#ede7f6] bg-white p-8 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d1c4e9]/20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-5">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8e6abf] to-[#b39ddb] text-white shadow-md">
                        <Bot size={36} />
                      </span>
                      <div>
                        <h3 className="text-2xl font-black text-[#6b4f8a]">{robot.name}</h3>
                        <p className="text-lg text-[#9a8aaa]">{robot.id}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-gradient-to-r from-[#f0e6f6] to-[#faf0f6] px-5 py-2 text-sm font-black text-[#7b55a8] shadow-sm">available</span>
                  </div>
                  <div className="mt-6 flex justify-between text-lg font-bold text-[#6b5b7b]">
                    <span>Battery</span>
                    <span>{robot.battery}%</span>
                  </div>
                  <div className="mt-3 h-4 rounded-full bg-[#ede7f6]">
                    <div className={`h-4 rounded-full bg-gradient-to-r ${batteryColor(robot.battery)}`} style={{ width: `${robot.battery}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-3xl font-black text-[#6b4f8a]">Farms</h2>
            <div className="space-y-6">
              {farms.map((farm) => (
                <article key={farm.name} className="group rounded-3xl border-2 border-[#ede7f6] bg-white p-8 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d1c4e9]/20">
                  <div className="flex gap-5">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b39ddb] to-[#d1c4e9] text-white shadow-md">
                      <MapPin size={36} />
                    </span>
                    <div>
                      <h3 className="text-2xl font-black text-[#6b4f8a]">{farm.name}</h3>
                      <p className="text-lg text-[#9a8aaa]">{farm.crop}</p>
                    </div>
                  </div>
                  <p className="mt-6 text-lg font-bold text-[#6b5b7b]">Assigned Robots ({farm.robots.length})</p>
                  {farm.robots.length ? (
                    <div className="mt-4 space-y-3">
                      {farm.robots.map((robot) => (
                        <div key={robot} className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#faf0f6] to-[#f5f0fa] px-6 py-4 text-lg font-black shadow-sm">
                          <span className="flex items-center gap-3"><Bot size={22} className="text-[#8e6abf]" /> {robot}</span>
                          <button className="rounded-xl bg-gradient-to-br from-red-50 to-red-50/50 p-2 text-red-500 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-90"><X size={22} /></button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl border-2 border-dashed border-[#d1c4e9] bg-gradient-to-br from-[#faf0f6] to-[#f5f0fa] p-8 text-center">
                      <LinkIcon className="mx-auto mb-2 text-[#b39ddb]" size={36} />
                      <p className="text-lg font-bold text-[#b39ddb]">Drop robot here to assign</p>
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
