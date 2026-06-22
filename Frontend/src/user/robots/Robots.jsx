import { Activity, Battery, Bot, Eye, Link as LinkIcon, MapPin, Plus, XCircle } from "lucide-react";
import AppShell from "../components/AppShell";

const robots = [
  { id: "ROB-001", name: "AgriBot Alpha", lastSeen: "5 mins ago", battery: 85, farm: "Green Valley Farm", status: "active", location: "Sector A" },
  { id: "ROB-002", name: "AgriBot Beta", lastSeen: "12 mins ago", battery: 45, farm: "Sunny Acres", status: "active", location: "Sector C" },
  { id: "ROB-003", name: "AgriBot Gamma", lastSeen: "1 hour ago", battery: 20, farm: "Not assigned", status: "charging", location: "Base Station" },
  { id: "ROB-004", name: "AgriBot Delta", lastSeen: "2 hours ago", battery: 100, farm: "Not assigned", status: "idle", location: "Base Station" },
  { id: "ROB-005", name: "AgriBot Epsilon", lastSeen: "1 day ago", battery: 0, farm: "Riverside Farm", status: "maintenance", location: "Maintenance Bay" },
];

const statusStyle = {
  active: "bg-gradient-to-r from-[#f0e6f6] to-[#faf0f6] text-[#7b55a8]",
  charging: "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700",
  idle: "bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700",
  maintenance: "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700",
};

function batteryColor(v) {
  if (v <= 25) return "from-red-400 to-red-300";
  if (v <= 50) return "from-yellow-400 to-yellow-300";
  return "from-[#8e6abf] to-[#b39ddb]";
}

function Robots() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-black text-[#6b4f8a] md:text-5xl">Robot Management</h1>
            <p className="mt-2 text-xl text-[#9a8aaa]">Monitor and manage your agricultural robots</p>
          </div>
          <button className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] px-10 py-5 text-xl font-black text-white shadow-lg shadow-[#8e6abf]/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
            <Plus size={28} /> Add Robot
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total Robots", "5", Bot],
            ["Active", "2", Activity],
            ["Idle", "1", Battery],
            ["Assigned to Farms", "3", MapPin],
          ].map(([label, value, Icon]) => (
            <article key={label} className="group rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6] transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg text-[#9a8aaa]">{label}</p>
                  <p className="mt-3 text-5xl font-black text-[#6b4f8a]">{value}</p>
                </div>
                <Icon className="text-[#b39ddb]" size={36} />
              </div>
            </article>
          ))}
        </div>

        <section className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead className="border-b border-[#ede7f6] bg-gradient-to-r from-[#f5f0fa] to-[#faf0f6]">
                <tr>
                  {["Robot ID", "Robot Name", "Battery", "Assigned Farm", "Status", "Location", "Actions"].map((h) => (
                    <th key={h} className="px-8 py-6 text-sm font-black uppercase tracking-wide text-[#6b5b7b]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {robots.map((robot) => (
                  <tr key={robot.id} className="border-b border-[#ede7f6] transition-all hover:bg-[#faf0f6] last:border-0">
                    <td className="px-8 py-6 font-bold text-[#6b4f8a]">{robot.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8e6abf] to-[#b39ddb] text-white shadow-md">
                          <Bot size={30} />
                        </span>
                        <div>
                          <p className="text-xl font-black text-[#6b4f8a]">{robot.name}</p>
                          <p className="text-[#9a8aaa]">{robot.lastSeen}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-28 rounded-full bg-[#ede7f6]">
                          <div className={`h-3 rounded-full bg-gradient-to-r ${batteryColor(robot.battery)}`} style={{ width: `${robot.battery}%` }} />
                        </div>
                        <span className="text-lg font-black text-[#6b4f8a]">{robot.battery}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-semibold">
                      <span className={robot.farm === "Not assigned" ? "text-[#b39ddb]" : "text-[#6b5b7b]"}>{robot.farm}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`rounded-full px-5 py-2 text-sm font-black shadow-sm ${statusStyle[robot.status]}`}>{robot.status}</span>
                    </td>
                    <td className="px-8 py-6 text-[#6b5b7b]">{robot.location}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <button className="rounded-xl bg-gradient-to-br from-[#f0e6f6] to-[#faf0f6] p-3 text-[#8e6abf] shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-90"><Eye size={24} /></button>
                        {robot.farm === "Not assigned" ? (
                          <button className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-50/50 p-3 text-blue-600 shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-90"><LinkIcon size={24} /></button>
                        ) : (
                          <button className="rounded-xl bg-gradient-to-br from-red-50 to-red-50/50 p-3 text-red-500 shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-90"><XCircle size={24} /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6]">
          <h2 className="text-3xl font-black text-[#6b4f8a]">Robot Health Overview</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {robots.slice(0, 3).map((robot) => (
              <article key={robot.id} className="rounded-2xl border-2 border-[#ede7f6] bg-gradient-to-br from-[#faf0f6] to-[#f5f0fa] p-6 shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-[#6b4f8a]">{robot.name}</h3>
                  <span className={`rounded-full px-4 py-2 text-sm font-black shadow-sm ${statusStyle[robot.status]}`}>{robot.status}</span>
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
      </section>
    </AppShell>
  );
}

export default Robots;
