import {
  Bug,
  ChevronDown,
  Droplets,
  Leaf,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import AppShell from "../components/AppShell";

const insights = [
  {
    icon: Droplets,
    title: "Water Requirement",
    value: "120L",
    note: "Needed in 4h",
    status: "URGENT",
    color: "bg-blue-500",
    pill: "bg-red-500",
  },
  {
    icon: Leaf,
    title: "Fertilizer Need",
    value: "Nitrogen Low",
    note: "Apply within 2 days",
    status: "WARN",
    color: "bg-green-500",
    pill: "bg-amber-500",
  },
  {
    icon: Bug,
    title: "Disease Risk",
    value: "Medium",
    note: "Sector B affected",
    status: "WARN",
    color: "bg-orange-500",
    pill: "bg-amber-500",
  },
  {
    icon: TrendingUp,
    title: "Yield Prediction",
    value: "2.3 Tons",
    note: "+15% vs last season",
    status: "OK",
    color: "bg-teal-500",
    pill: "bg-green-500",
  },
];

const legend = [
  ["bg-blue-500", "Water Needed"],
  ["bg-green-500", "Healthy"],
  ["bg-amber-500", "Nutrient Low"],
  ["bg-red-500", "Risk Zone"],
];

const markers = [
  { icon: Droplets, x: "23%", y: "20%", color: "text-blue-600", bg: "bg-blue-100", size: "h-12 w-12" },
  { icon: Leaf, x: "56%", y: "14%", color: "text-green-500", bg: "bg-white", size: "h-8 w-8" },
  { icon: Leaf, x: "78%", y: "25%", color: "text-red-600", bg: "bg-red-100", size: "h-12 w-12" },
  { icon: Droplets, x: "61%", y: "31%", color: "text-blue-500", bg: "bg-blue-100", size: "h-9 w-9" },
  { icon: Droplets, x: "33%", y: "57%", color: "text-blue-600", bg: "bg-blue-100", size: "h-12 w-12" },
  { icon: Leaf, x: "18%", y: "73%", color: "text-amber-600", bg: "bg-amber-100", size: "h-10 w-10" },
  { icon: Leaf, x: "84%", y: "57%", color: "text-amber-600", bg: "bg-amber-100", size: "h-10 w-10" },
  { icon: Droplets, x: "73%", y: "73%", color: "text-blue-500", bg: "bg-blue-100", size: "h-9 w-9" },
  { icon: Droplets, x: "46%", y: "89%", color: "text-blue-500", bg: "bg-blue-100", size: "h-8 w-8" },
];

function SelectBox({ label, value }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#00112b]">{label}</span>
      <span className="flex min-h-14 items-center justify-between rounded-lg border-2 border-[#0F2440] bg-white px-5 text-base font-black">
        {value}
        <ChevronDown className="text-[#0F2440]" size={20} />
      </span>
    </label>
  );
}

function AIRecommendations() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-9">
        <div>
          <div className="flex items-center gap-4">
            <span className="rounded-xl bg-gradient-to-br from-[#0F2440] to-[#4A7BA5] p-3 text-white shadow-sm">
              <Sparkles size={32} />
            </span>
            <div>
              <h1 className="text-3xl font-black text-[#234F78] md:text-4xl">
                AI Recommendations - Green Valley Farm (Wheat)
              </h1>
              <p className="mt-1 text-lg text-slate-700">Visual insights powered by machine learning</p>
            </div>
          </div>

          <div className="mt-8 grid max-w-[540px] gap-4 sm:grid-cols-2">
            <SelectBox label="Select Farm" value="Green Valley Farm" />
            <SelectBox label="Select Crop" value="Wheat" />
          </div>
        </div>

        <div className="grid gap-9 xl:grid-cols-2">
          <section>
            <h2 className="mb-5 text-2xl font-black">AI Insights</h2>
            <div className="space-y-5">
              {insights.map((item) => (
                <article key={item.title} className="flex items-center gap-5 rounded-xl bg-white p-7 shadow-lg">
                  <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg text-white ${item.color}`}>
                    <item.icon size={34} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-700">{item.title}</p>
                    <p className="mt-1 text-2xl font-black leading-tight">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.note}</p>
                  </div>
                  <span className={`rounded-full px-4 py-2 text-xs font-black text-white ${item.pill}`}>{item.status}</span>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-black">Farm Zone Analysis</h2>
            <div className="mb-5 rounded-xl bg-white p-5 shadow-lg">
              <h3 className="mb-4 text-lg font-black">Map Legend</h3>
              <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                {legend.map(([color, label]) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className={`h-5 w-5 rounded ${color}`} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white p-7 shadow-lg">
            <div className="relative aspect-[1.12] overflow-hidden rounded-xl bg-[linear-gradient(rgba(15,36,64,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(15,36,64,0.09)_1px,transparent_1px),linear-gradient(135deg,#d4e4f7,#d0e4f8_55%,#c0d8f0)] bg-[length:56px_56px,56px_56px,auto]">
              <div className="absolute inset-[4%] rounded-lg border-2 border-blue-400/70" />
              <span className="absolute left-[50%] top-[52%] h-5 w-5 rounded-full border-2 border-white bg-[#0F2440] shadow-md" />
                {markers.map((marker, index) => (
                  <span
                    key={`${marker.x}-${marker.y}-${index}`}
                    className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-md ${marker.bg} ${marker.color} ${marker.size}`}
                    style={{ left: marker.x, top: marker.y }}
                  >
                    <marker.icon size={24} />
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </AppShell>
  );
}

export default AIRecommendations;
