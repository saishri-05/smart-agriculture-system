import { AlertTriangle, Bell, Info, ShieldAlert } from "lucide-react";
import AppShell from "../components/AppShell";

const alerts = [
  { type: "Critical", time: "10:20 AM", field: "Green Valley Farm", message: "Low soil moisture detected in Sector A.", status: "Open" },
  { type: "Critical", time: "09:50 AM", field: "Water Tank", message: "Motor temperature is too high.", status: "Open" },
  { type: "Warning", time: "08:45 AM", field: "Rice Field", message: "Possible fungal infection detected.", status: "Checking" },
  { type: "Info", time: "06:10 AM", field: "Robot Alpha", message: "Daily crop scan report is ready.", status: "Done" },
];

const styles = {
  Critical: { icon: ShieldAlert, color: "border-red-400 bg-gradient-to-r from-red-50 to-red-50/50 text-red-800", badge: "bg-gradient-to-r from-red-500 to-red-400 text-white" },
  Warning: { icon: AlertTriangle, color: "border-orange-400 bg-gradient-to-r from-orange-50 to-orange-50/50 text-orange-800", badge: "bg-gradient-to-r from-orange-500 to-orange-400 text-white" },
  Info: { icon: Info, color: "border-blue-400 bg-gradient-to-r from-blue-50 to-blue-50/50 text-blue-800", badge: "bg-gradient-to-r from-blue-500 to-blue-400 text-white" },
};

function Alerts() {
  return (
    <AppShell>
      <section className="mx-auto max-w-6xl space-y-10">
        <div>
          <h1 className="text-4xl font-black text-[#6b4f8a] md:text-5xl">Alerts</h1>
          <p className="mt-2 text-xl text-[#9a8aaa]">Important farm problems in simple language</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: ShieldAlert, label: "Critical", count: "2", color: "from-red-50 to-red-50/50 text-red-600" },
            { icon: AlertTriangle, label: "Warning", count: "1", color: "from-orange-50 to-orange-50/50 text-orange-600" },
            { icon: Bell, label: "Info", count: "1", color: "from-blue-50 to-blue-50/50 text-blue-600" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6] transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
              <div className={`inline-flex rounded-2xl bg-gradient-to-br p-4 shadow-md ${item.color}`}>
                <item.icon size={44} />
              </div>
              <p className="mt-6 text-5xl font-black text-[#6b4f8a]">{item.count}</p>
              <p className="mt-2 text-xl font-bold text-[#9a8aaa]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {alerts.map((alert) => {
            const style = styles[alert.type];
            const Icon = style.icon;
            return (
              <article key={`${alert.time}-${alert.message}`} className={`rounded-3xl border-l-8 p-8 shadow-lg transition-all duration-200 hover:scale-[1.01] hover:shadow-xl ${style.color}`}>
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                  <div className="flex gap-5">
                    <Icon size={52} />
                    <div>
                      <h2 className="text-2xl font-black text-[#00112b]">{alert.message}</h2>
                      <p className="mt-2 text-lg font-bold text-slate-500">{alert.field} &bull; {alert.time}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-6 py-3 text-base font-black shadow-md ${style.badge}`}>{alert.status}</span>
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
