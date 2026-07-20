import { AlertTriangle, Bell, Info, ShieldAlert } from "lucide-react";
import AppShell from "../components/AppShell";

const alerts = [
  { type: "Critical", time: "10:20 AM", field: "Green Valley Farm", message: "Low soil moisture detected in Sector A.", status: "Open" },
  { type: "Critical", time: "09:50 AM", field: "Water Tank", message: "Motor temperature is too high.", status: "Open" },
  { type: "Critical", time: "08:30 AM", field: "Sector C", message: "Water requirement is urgent — 120L needed within 4 hours.", status: "Open" },
  { type: "Warning", time: "08:45 AM", field: "Rice Field", message: "Possible fungal infection detected.", status: "Checking" },
  { type: "Warning", time: "07:20 AM", field: "Sector D", message: "Fertilizer level is low — apply nitrogen within 2 days.", status: "Open" },
  { type: "Warning", time: "07:00 AM", field: "Sector C", message: "Fertilizer over-applied in Sector C — risk of crop burn.", status: "Open" },
  { type: "Info", time: "06:10 AM", field: "Robot Alpha", message: "Daily crop scan report is ready.", status: "Done" },
];

const styles = {
  Critical: { icon: ShieldAlert, color: "border-[#EF4444] bg-[rgba(239,68,68,0.06)] text-[#EF4444]", badge: "bg-[#EF4444] text-white" },
  Warning: { icon: AlertTriangle, color: "border-[#F59E0B] bg-[rgba(245,158,11,0.06)] text-[#F59E0B]", badge: "bg-[#F59E0B] text-white" },
  Info: { icon: Info, color: "border-[#0D9488] bg-[rgba(13,148,136,0.06)] text-[#0D9488]", badge: "bg-[#0D9488] text-white" },
};

function Alerts() {
  return (
    <AppShell>
      <section className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Alerts</h1>
          <p className="mt-1 text-sm font-[400] text-[#5A7A5A]">Important farm problems in simple language</p>
        </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="card"><ShieldAlert className="text-[#EF4444]" size={44} /><p className="mt-4 text-3xl font-bold text-black">{alerts.filter(a => a.type === "Critical").length}</p><p className="font-bold text-[#EF4444]">Critical</p></div>
            <div className="card"><AlertTriangle className="text-[#F59E0B]" size={44} /><p className="mt-4 text-3xl font-bold text-black">{alerts.filter(a => a.type === "Warning").length}</p><p className="font-bold text-[#F59E0B]">Warning</p></div>
            <div className="card"><Bell className="text-[#0D9488]" size={44} /><p className="mt-4 text-3xl font-bold text-black">{alerts.filter(a => a.type === "Info").length}</p><p className="font-bold text-[#0D9488]">Info</p></div>
          </div>

        <div className="space-y-4">
          {alerts.map((alert) => {
            const style = styles[alert.type];
            const Icon = style.icon;
            return (
              <article key={`${alert.time}-${alert.message}`} className={`rounded-xl border-l-4 p-6 shadow-lg ${style.color}`}>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="flex gap-4">
                    <Icon size={44} />
                    <div>
                      <h2 className="text-xl font-bold text-[#111827]">{alert.message}</h2>
                      <p className="mt-2 font-bold">{alert.field} • {alert.time}</p>
                    </div>
                  </div>
                  <span className={`badge ${alert.status === "Open" ? "badge-danger" : alert.status === "Checking" ? "badge-warning" : "badge-info"} text-sm px-4 py-2`}>{alert.status}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}

export default Alerts;
