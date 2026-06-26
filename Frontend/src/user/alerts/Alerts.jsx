import { AlertTriangle, Bell, Info, ShieldAlert } from "lucide-react";
import AppShell from "../components/AppShell";

const alerts = [
  { type: "Critical", time: "10:20 AM", field: "Green Valley Farm", message: "Low soil moisture detected in Sector A.", status: "Open" },
  { type: "Critical", time: "09:50 AM", field: "Water Tank", message: "Motor temperature is too high.", status: "Open" },
  { type: "Warning", time: "08:45 AM", field: "Rice Field", message: "Possible fungal infection detected.", status: "Checking" },
  { type: "Info", time: "06:10 AM", field: "Robot Alpha", message: "Daily crop scan report is ready.", status: "Done" },
];

const styles = {
  Critical: { icon: ShieldAlert, color: "border-red-500 bg-red-50 text-red-800", badge: "bg-red-500 text-white" },
  Warning: { icon: AlertTriangle, color: "border-orange-500 bg-orange-50 text-orange-800", badge: "bg-orange-500 text-white" },
  Info: { icon: Info, color: "border-blue-500 bg-blue-50 text-blue-800", badge: "bg-blue-500 text-white" },
};

function Alerts() {
  return (
    <AppShell>
      <section className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-3xl font-black text-[#287c30] md:text-4xl">Alerts</h1>
          <p className="mt-2 text-lg text-slate-700">Important farm problems in simple language</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl bg-red-50 p-6 shadow-lg"><ShieldAlert className="text-red-600" size={44} /><p className="mt-4 text-4xl font-black">2</p><p className="font-bold text-red-700">Critical</p></div>
          <div className="rounded-xl bg-orange-50 p-6 shadow-lg"><AlertTriangle className="text-orange-600" size={44} /><p className="mt-4 text-4xl font-black">1</p><p className="font-bold text-orange-700">Warning</p></div>
          <div className="rounded-xl bg-blue-50 p-6 shadow-lg"><Bell className="text-blue-600" size={44} /><p className="mt-4 text-4xl font-black">1</p><p className="font-bold text-blue-700">Info</p></div>
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
                      <h2 className="text-2xl font-black">{alert.message}</h2>
                      <p className="mt-2 font-bold">{alert.field} • {alert.time}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-4 py-2 font-black ${style.badge}`}>{alert.status}</span>
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
