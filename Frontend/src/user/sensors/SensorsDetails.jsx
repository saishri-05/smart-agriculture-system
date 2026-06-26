import { AlertTriangle, Camera, CheckCircle2, FlaskConical, Leaf, TestTube } from "lucide-react";
import AppShell from "../components/AppShell";

const npkSectors = [
  {
    sector: "Sector A", N: { value: 48, level: "Good", color: "bg-green-500" },
    P: { value: 32, level: "Good", color: "bg-green-500" },
    K: { value: 185, level: "Good", color: "bg-green-500" },
  },
  {
    sector: "Sector B", N: { value: 22, level: "Low", color: "bg-red-500" },
    P: { value: 18, level: "Low", color: "bg-red-500" },
    K: { value: 92, level: "Good", color: "bg-green-500" },
  },
  {
    sector: "Sector C", N: { value: 62, level: "Good", color: "bg-green-500" },
    P: { value: 45, level: "Good", color: "bg-green-500" },
    K: { value: 210, level: "Too High", color: "bg-amber-500" },
  },
  {
    sector: "Sector D", N: { value: 55, level: "Good", color: "bg-green-500" },
    P: { value: 28, level: "Good", color: "bg-green-500" },
    K: { value: 145, level: "Good", color: "bg-green-500" },
  },
];

const levelColor = (level) => {
  if (level === "Low") return "text-red-500";
  if (level === "Too High") return "text-amber-500";
  return "text-green-600";
};

const barBg = (level) => {
  if (level === "Low") return "bg-red-400";
  if (level === "Too High") return "bg-amber-400";
  return "bg-green-400";
};

function Bar({ level }) {
  const width = level === "Low" ? "30%" : level === "Too High" ? "85%" : "65%";
  return (
    <div className="h-3 w-full rounded-full bg-slate-200">
      <div className={`h-3 rounded-full ${barBg(level)}`} style={{ width }} />
    </div>
  );
}

function SensorsDetails() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sensors Details</h1>
          <p className="mt-1 text-sm text-gray-500">A simple look at your farm sensors and soil health</p>
        </div>

        {/* 1. Sensor Connection Checklist */}
        <section>
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
            <CheckCircle2 size={24} className="text-green-600" /> Sensor Connection Checklist
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <FlaskConical size={26} />
                </span>
                <div>
                  <p className="text-lg font-bold text-gray-900">NPK Soil Probes</p>
                  <p className="text-sm text-gray-500">8 Working Perfectly</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
                <CheckCircle2 size={16} /> 0 Offline
              </span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Camera size={26} />
                </span>
                <div>
                  <p className="text-lg font-bold text-gray-900">Field Camera</p>
                  <p className="text-sm text-gray-500">1 Needs Attention</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700">
                <AlertTriangle size={16} /> Lens may be dirty
              </span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <TestTube size={26} />
                </span>
                <div>
                  <p className="text-lg font-bold text-gray-900">Fertilizer Tester</p>
                  <p className="text-sm text-gray-500">Ready to Use</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
                <CheckCircle2 size={16} /> All Systems OK
              </span>
            </div>
          </div>
        </section>

        {/* 2. AI Field Camera Feed */}
        <section>
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Camera size={24} className="text-green-600" /> AI Field Camera Feed
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="relative mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3/4 w-5/6 rounded-xl bg-slate-200" />
                </div>
                <div className="absolute left-[18%] top-[22%] h-16 w-20 rounded-lg border-[3px] border-red-500 bg-red-100/30" />
                <span className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1.5 text-sm font-semibold text-white">
                  ⚠️ Large Stone Detected in Path
                </span>
              </div>
              <p className="text-base font-bold text-gray-900">Camera #2 — Sector B (North Path)</p>
              <p className="mt-1 text-sm text-gray-500">A large stone is blocking the access path near the north gate.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="relative mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3/4 w-5/6 rounded-xl bg-slate-200" />
                </div>
                <div className="absolute left-[55%] top-[45%] h-24 w-28 rounded-[30px] border-[3px] border-red-500 bg-red-100/30" />
                <span className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1.5 text-sm font-semibold text-white">
                  ⚠️ Deep Washout Hole Detected
                </span>
              </div>
              <p className="text-base font-bold text-gray-900">Camera #4 — Sector B (Drainage Ditch)</p>
              <p className="mt-1 text-sm text-gray-500">Heavy rain has created a deep washout near the drainage ditch.</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border-l-4 border-amber-500 bg-amber-50 px-6 py-5">
            <div className="flex items-start gap-3">
              <AlertTriangle size={22} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-base font-semibold text-gray-800">
                Warning: Obstacles detected in Sector B. Clear the stones and avoid the washout
                hole before driving heavy machinery or tractors through this path.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Soil Nutrition Breakdown */}
        <section>
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Leaf size={24} className="text-green-600" /> Soil Nutrition Breakdown
          </h2>
          <div className="grid gap-5 lg:grid-cols-2">
            {npkSectors.map((s) => (
              <div key={s.sector} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-5 text-lg font-bold text-gray-900">{s.sector}</h3>
                <div className="space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-600">Nitrogen (N)</span>
                      <span className={`font-bold ${levelColor(s.N.level)}`}>{s.N.level}</span>
                    </div>
                    <Bar level={s.N.level} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-600">Phosphorus (P)</span>
                      <span className={`font-bold ${levelColor(s.P.level)}`}>{s.P.level}</span>
                    </div>
                    <Bar level={s.P.level} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-600">Potassium (K)</span>
                      <span className={`font-bold ${levelColor(s.K.level)}`}>{s.K.level}</span>
                    </div>
                    <Bar level={s.K.level} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border-l-4 border-green-500 bg-green-50 px-6 py-5">
            <div className="flex items-start gap-3">
              <Leaf size={22} className="mt-0.5 shrink-0 text-green-600" />
              <p className="text-base font-semibold text-gray-800">
                🌱 Fertilizer Tip: Soil Nitrogen is Low in Sector B. Add a light application of
                nitrogen-rich fertilizer during your next watering cycle.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export default SensorsDetails;
