
import { Activity, Battery, Bot, Eye, Link as LinkIcon, MapPin, XCircle } from "lucide-react";
import AppShell from "../components/AppShell";

const robots = [
  { id: "ROB-001", name: "AgriBot Alpha", lastSeen: "5 mins ago", battery: 85, farm: "Green Valley Farm", status: "active", location: "Sector A" },
  { id: "ROB-002", name: "AgriBot Beta", lastSeen: "12 mins ago", battery: 45, farm: "Sunny Acres", status: "active", location: "Sector C" },
  { id: "ROB-003", name: "AgriBot Gamma", lastSeen: "1 hour ago", battery: 20, farm: "Not assigned", status: "charging", location: "Base Station" },
  { id: "ROB-004", name: "AgriBot Delta", lastSeen: "2 hours ago", battery: 100, farm: "Not assigned", status: "idle", location: "Base Station" },
  { id: "ROB-005", name: "AgriBot Epsilon", lastSeen: "1 day ago", battery: 0, farm: "Riverside Farm", status: "maintenance", location: "Maintenance Bay" },
];

const statusStyle = {
  active: "badge-success",
  charging: "badge-success",
  idle: "badge-neutral",
  maintenance: "badge-warning",
};

const scannerColors = [
  { ring: "#2E7D32", scan: "rgba(46,125,50,0.3)", bg: "#E8F5E9" },
  { ring: "#2563EB", scan: "rgba(37,99,235,0.3)", bg: "#EFF6FF" },
  { ring: "#D97706", scan: "rgba(217,119,6,0.3)", bg: "#FFFBEB" },
  { ring: "#7C3AED", scan: "rgba(124,58,237,0.3)", bg: "#F5F3FF" },
  { ring: "#DC2626", scan: "rgba(220,38,38,0.3)", bg: "#FEF2F2" },
];

const robotIdIndex = (id) => parseInt(id.slice(-1), 10) % 5;

function RobotScanner({ robotId, size = 48 }) {
  const c = scannerColors[robotIdIndex(robotId)];
  const s = size, t = size * 0.28;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${s} ${s}`} className="shrink-0">
      <rect x={1} y={1} width={s - 2} height={s - 2} rx={4} fill={c.bg} />
      <rect x={t} y={s * 0.22} width={s - t * 2} height={s * 0.14} rx={1.5} fill={c.ring} opacity="0.15" />
      <rect x={t} y={s * 0.55} width={s - t * 2} height={s * 0.14} rx={1.5} fill={c.ring} opacity="0.15" />
      <rect x={s * 0.35} y={s * 0.38} width={s * 0.08} height={s * 0.08} rx={1} fill={c.ring} opacity="0.25" />
      <rect x={s * 0.46} y={s * 0.38} width={s * 0.08} height={s * 0.08} rx={1} fill={c.ring} opacity="0.25" />
      <rect x={s * 0.57} y={s * 0.38} width={s * 0.08} height={s * 0.08} rx={1} fill={c.ring} opacity="0.25" />
      <text x={s / 2} y={s * 0.88} textAnchor="middle" fontSize={s * 0.17} fontWeight="800" fill={c.ring}>{robotId.slice(-3)}</text>
    </svg>
  );
}

function batteryColor(value) {
  if (value <= 25) return "bg-red-500";
  if (value <= 50) return "bg-yellow-500";
  return "bg-[#2E7D32]";
}

function Robots() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-6 md:space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#111827]">Robot Management</h1>
            <p className="mt-1 text-sm text-[#5A7A5A]">Monitor and manage your agricultural robots</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total Robots", "5", Bot],
            ["Active", "2", Activity],
            ["Idle", "1", Battery],
            ["Assigned to Farms", "3", MapPin],
          ].map(([label, value, Icon]) => (
            <article key={label} className="card">
              <div className="stat-card">
                <div>
                  <p className="stat-card-label">{label}</p>
                  <p className="stat-card-value">{value}</p>
                </div>
                <Icon className="text-[#2E7D32]" size={30} />
              </div>
            </article>
          ))}
        </div>

        <section className="table-wrap">
          <div className="overflow-x-auto">
            <table className="table min-w-[980px]">
              <thead>
                <tr>
                  {["Robot ID", "Robot", "Battery", "Assigned Farm", "Status", "Location", "Actions"].map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {robots.map((robot) => (
                  <tr key={robot.id}>
                    <td className="font-semibold">{robot.id}</td>
                    <td>
                      <div className="flex items-center gap-4">
                        <RobotScanner robotId={robot.id} size={48} />
                        <div>
                          <p className="text-lg font-black">{robot.id}</p>
                          <p className="text-[#5A7A5A]">{robot.lastSeen}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 rounded-full bg-white/30">
                          <div className={`h-2 rounded-full ${batteryColor(robot.battery)}`} style={{ width: `${robot.battery}%` }} />
                        </div>
                        <span className="font-black">{robot.battery}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={robot.farm === "Not assigned" ? "text-[#5A7A5A]" : ""}>{robot.farm}</span>
                    </td>
                    <td>
                      <span className={`badge ${statusStyle[robot.status]}`}>{robot.status}</span>
                    </td>
                    <td>{robot.location}</td>
                    <td>
                      <div className="flex items-center gap-4">
                        <Eye className="text-[#2E7D32]" size={22} />
                        {robot.farm === "Not assigned" ? <LinkIcon className="text-[#2E7D32]" size={22} /> : <XCircle className="text-red-500" size={22} />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>

    </AppShell>
  );
}

export default Robots;