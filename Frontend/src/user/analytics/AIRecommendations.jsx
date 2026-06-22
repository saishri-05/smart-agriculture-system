import { Brain, CloudSun, Droplets, FlaskConical, Leaf, TrendingUp, AlertCircle, Sprout } from "lucide-react";
import AppShell from "../components/AppShell";

const recommendations = [
  { icon: Droplets, title: "Water Advice", text: "Water Sector A for 20 minutes today. Soil moisture is below the safe level.", confidence: 88, color: "from-blue-400 to-blue-300" },
  { icon: FlaskConical, title: "Fertilizer Advice", text: "Add nitrogen fertilizer to rice crop within 2 days for better growth.", confidence: 82, color: "from-purple-400 to-purple-300" },
  { icon: Leaf, title: "Crop Health", text: "Crop is healthy. Check leaves near Sector C for early fungal signs.", confidence: 76, color: "from-[#8e6abf] to-[#b39ddb]" },
  { icon: CloudSun, title: "Weather Advice", text: "Rain may come tomorrow. Avoid pesticide spraying today evening.", confidence: 91, color: "from-orange-400 to-orange-300" },
];

const predictions = [
  { metric: "Expected Yield", value: "3.2 tons/acre", change: "+12%", trend: "up", note: "Based on soil NPK & moisture trends" },
  { metric: "Harvest Date", value: "Oct 25–30", change: "On track", trend: "stable", note: "ML model predicts optimal window" },
  { metric: "Water Needed", value: "24L/m²", change: "-8%", trend: "down", note: "Rain expected to reduce irrigation needs" },
  { metric: "Disease Risk", value: "Medium", change: "Leaf blast", trend: "warning", note: "Humidity levels favor fungal growth" },
];

const modelMetrics = [
  { label: "Model Accuracy", value: "94%", bar: 94, color: "from-green-400 to-green-300" },
  { label: "Data Points Analyzed", value: "12,847", bar: 100, color: "from-[#8e6abf] to-[#b39ddb]" },
  { label: "Predictions This Week", value: "48", bar: 48, color: "from-blue-400 to-blue-300" },
  { label: "Recommendations Followed", value: "76%", bar: 76, color: "from-orange-400 to-orange-300" },
];

function AIRecommendations() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-10">
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#8e6abf] to-[#b39ddb] shadow-xl shadow-[#8e6abf]/30">
            <Brain className="text-white" size={48} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-[#6b4f8a] md:text-5xl">AI Predictions</h1>
            <p className="mt-2 text-xl text-[#9a8aaa]">ML-powered forecasts and smart farming recommendations</p>
          </div>
        </div>

        <section className="rounded-3xl bg-white p-10 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6]">
          <div className="flex items-center gap-6">
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8e6abf] to-[#b39ddb] text-white shadow-lg shadow-[#8e6abf]/30">
              <Brain size={52} />
            </span>
            <div>
              <h2 className="text-3xl font-black text-[#6b4f8a]">Today's Best Action</h2>
              <p className="mt-2 text-xl text-[#9a8aaa]">Water Green Valley Farm Sector A before sunset.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-3xl font-black text-[#6b4f8a]">Smart Recommendations</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {recommendations.map((item) => (
              <article key={item.title} className="group rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6] transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex items-start gap-6">
                  <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md ${item.color}`}>
                    <item.icon size={38} />
                  </span>
                  <div>
                    <h2 className="text-2xl font-black text-[#6b4f8a]">{item.title}</h2>
                    <p className="mt-3 text-lg leading-8 text-[#6b5b7b]">{item.text}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between text-lg font-black text-[#6b5b7b]">
                    <span>ML Confidence</span>
                    <span className="text-[#8e6abf]">{item.confidence}%</span>
                  </div>
                  <div className="mt-3 h-4 rounded-full bg-[#ede7f6]">
                    <div className="h-4 rounded-full bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] transition-all duration-1000" style={{ width: `${item.confidence}%` }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-center gap-4">
            <TrendingUp className="text-[#8e6abf]" size={40} />
            <h2 className="text-3xl font-black text-[#6b4f8a]">ML Model Predictions</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {predictions.map((p) => (
              <article key={p.metric} className="rounded-3xl bg-white p-8 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6] transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
                <p className="text-sm font-black uppercase tracking-wide text-[#9a8aaa]">{p.metric}</p>
                <p className="mt-3 text-4xl font-black text-[#6b4f8a]">{p.value}</p>
                <div className="mt-4 flex items-center gap-2">
                  {p.trend === "up" && <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-black text-green-600">{p.change}</span>}
                  {p.trend === "down" && <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-black text-blue-600">{p.change}</span>}
                  {p.trend === "stable" && <span className="rounded-full bg-[#f0e6f6] px-3 py-1 text-sm font-black text-[#7b55a8]">{p.change}</span>}
                  {p.trend === "warning" && <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-black text-orange-600">{p.change}</span>}
                </div>
                <p className="mt-3 text-sm text-[#9a8aaa]">{p.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-10 shadow-xl shadow-[#d1c4e9]/20 ring-1 ring-[#ede7f6]">
          <div className="mb-8 flex items-center gap-4">
            <AlertCircle className="text-[#8e6abf]" size={36} />
            <h2 className="text-3xl font-black text-[#6b4f8a]">Model Performance</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {modelMetrics.map((m) => (
              <div key={m.label} className="rounded-2xl bg-gradient-to-br from-[#faf0f6] to-[#f5f0fa] p-6 shadow-md">
                <p className="text-sm font-black uppercase tracking-wide text-[#6b5b7b]">{m.label}</p>
                <p className="mt-2 text-3xl font-black text-[#6b4f8a]">{m.value}</p>
                <div className="mt-4 h-3 rounded-full bg-[#ede7f6]">
                  <div className={`h-3 rounded-full bg-gradient-to-r ${m.color}`} style={{ width: `${m.bar}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-[#8e6abf] to-[#b39ddb] p-10 text-center text-white shadow-2xl shadow-[#8e6abf]/30">
          <Sprout className="mx-auto" size={56} />
          <h2 className="mt-6 text-3xl font-black">Powered by Machine Learning</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100">
            Our models analyze sensor data, weather forecasts, and historical patterns to give you the best farming advice every day.
          </p>
        </section>
      </section>
    </AppShell>
  );
}

export default AIRecommendations;
