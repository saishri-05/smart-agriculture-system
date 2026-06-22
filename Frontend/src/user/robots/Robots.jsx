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
  active: "bg-green-100 text-green-700",
  charging: "bg-blue-100 text-blue-700",
  idle: "bg-slate-100 text-slate-700",
  maintenance: "bg-orange-100 text-orange-700",
};

function batteryColor(value) {
  if (value <= 25) return "bg-red-500";
  if (value <= 50) return "bg-yellow-500";
  return "bg-green-500";
}

function Robots() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-black text-[#287c30] md:text-4xl">Robot Management</h1>
            <p className="mt-2 text-lg text-slate-700">Monitor and manage your agricultural robots</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#287c30] px-6 py-4 text-lg font-black text-white">
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
            <article key={label} className="rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg text-slate-700">{label}</p>
                  <p className="mt-3 text-4xl font-black">{value}</p>
                </div>
                <Icon className="text-[#287c30]" size={30} />
              </div>
            </article>
          ))}
        </div>

        <section className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead className="border-b bg-[#fbfdf8]">
                <tr>
                  {["Robot ID", "Robot Name", "Battery", "Assigned Farm", "Status", "Location", "Actions"].map((head) => (
                    <th key={head} className="px-6 py-5 font-black">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {robots.map((robot) => (
                  <tr key={robot.id} className="border-b last:border-0">
                    <td className="px-6 py-5 font-semibold">{robot.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <span className="rounded-lg bg-[#287c30] p-3 text-white">
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
                        <div className="h-2 w-24 rounded-full bg-slate-200">
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
                        <Eye className="text-[#287c30]" size={22} />
                        {robot.farm === "Not assigned" ? <LinkIcon className="text-blue-600" size={22} /> : <XCircle className="text-red-500" size={22} />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-black">Robot Health Overview</h2>
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
                <div className="mt-2 h-2 rounded-full bg-slate-200">
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
