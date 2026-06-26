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
  active: "bg-[rgba(16,185,129,0.12)] text-[#10B981]",
  charging: "bg-[rgba(16,185,129,0.12)] text-[#10B981]",
  idle: "bg-slate-100 text-slate-700",
  maintenance: "bg-orange-100 text-orange-700",
};

function batteryColor(value) {
  if (value <= 25) return "bg-red-500";
  if (value <= 50) return "bg-yellow-500";
  return "bg-[#10B981]";
}

function Robots() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Robot Management</h1>
            <p className="mt-1 text-sm font-[400] text-[#6B7280]">Monitor and manage your agricultural robots</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-3 text-sm font-semibold text-white">
            <Plus size={24} /> Add Robot
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total Robots", "5", Bot],
            ["Active", "2", Activity],
            ["Idle", "1", Battery],
            ["Assigned to Farms", "3", MapPin],
          ].map(([label, value, Icon]) => (
            <article key={label} className="glass-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg text-slate-700">{label}</p>
                  <p className="mt-3 text-3xl font-bold text-black">{value}</p>
                </div>
                <Icon className="text-[#10B981]" size={30} />
              </div>
            </article>
          ))}
        </div>

        <section className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead className="border-b bg-white/20">
                <tr>
                  {["Robot ID", "Robot Name", "Battery", "Assigned Farm", "Status", "Location", "Actions"].map((head) => (
                    <th key={head} className="px-6 py-5 text-xs font-semibold uppercase tracking-[0.05em] text-[#6B7280]">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {robots.map((robot) => (
                  <tr key={robot.id} className="border-b last:border-0">
                    <td className="px-6 py-5 font-semibold">{robot.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <span className="rounded-xl bg-[rgba(16,185,129,0.12)] p-3 text-[#10B981]">
                          <Bot size={28} />
                        </span>
                        <div>
                          <p className="text-lg font-black">{robot.name}</p>
                          <p className="text-slate-600">{robot.lastSeen}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 rounded-full bg-white/30">
                          <div className={`h-2 rounded-full ${batteryColor(robot.battery)}`} style={{ width: `${robot.battery}%` }} />
                        </div>
                        <span className="font-black">{robot.battery}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={robot.farm === "Not assigned" ? "text-slate-500" : ""}>{robot.farm}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`rounded-full px-4 py-1 text-sm font-black ${statusStyle[robot.status]}`}>{robot.status}</span>
                    </td>
                    <td className="px-6 py-5">{robot.location}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <Eye className="text-[#10B981]" size={22} />
                        {robot.farm === "Not assigned" ? <LinkIcon className="text-[#10B981]" size={22} /> : <XCircle className="text-red-500" size={22} />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="glass-card p-6">
          <h2 className="text-xl font-bold text-[#111827]">Robot Health Overview</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {robots.slice(0, 3).map((robot) => (
              <article key={robot.id} className="rounded-lg border p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black">{robot.name}</h3>
                  <span className={`rounded-full px-3 py-1 text-sm font-black ${statusStyle[robot.status]}`}>{robot.status}</span>
                </div>
                <div className="mt-5 flex justify-between font-semibold">
                  <span>Battery</span>
                  <span>{robot.battery}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/30">
                  <div className={`h-2 rounded-full ${batteryColor(robot.battery)}`} style={{ width: `${robot.battery}%` }} />
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
