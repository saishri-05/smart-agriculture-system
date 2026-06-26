import { Brain, CloudSun, Droplets, FlaskConical, Leaf } from "lucide-react";
import AppShell from "../components/AppShell";

const recommendations = [
  { icon: Droplets, title: "Water Advice", text: "Water Sector A for 20 minutes today. Soil moisture is below the safe level.", confidence: 88, color: "bg-blue-500" },
  { icon: FlaskConical, title: "Fertilizer Advice", text: "Add nitrogen fertilizer to rice crop within 2 days for better growth.", confidence: 82, color: "bg-purple-500" },
  { icon: Leaf, title: "Crop Health", text: "Crop is healthy. Check leaves near Sector C for early fungal signs.", confidence: 76, color: "bg-[#287c30]" },
  { icon: CloudSun, title: "Weather Advice", text: "Rain may come tomorrow. Avoid pesticide spraying today evening.", confidence: 91, color: "bg-orange-500" },
];

function AIRecommendations() {
  return (
    <AppShell>
      <section className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-3xl font-black text-[#287c30] md:text-4xl">AI Recommendations</h1>
          <p className="mt-2 text-lg text-slate-700">Clear farming advice from sensors, robots, and weather</p>
        </div>

        <section className="rounded-xl bg-white p-6 shadow-lg">
          <div className="flex items-center gap-5">
            <span className="rounded-xl bg-[#287c30] p-5 text-white">
              <Brain size={58} />
            </span>
            <div>
              <h2 className="text-3xl font-black">Today's Best Action</h2>
              <p className="mt-2 text-lg text-slate-700">Water Green Valley Farm Sector A before sunset.</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {recommendations.map((item) => (
            <article key={item.title} className="rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-start gap-5">
                <span className={`rounded-lg p-4 text-white ${item.color}`}>
                  <item.icon size={42} />
                </span>
                <div>
                  <h2 className="text-2xl font-black">{item.title}</h2>
                  <p className="mt-2 text-lg leading-7 text-slate-700">{item.text}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-between font-black">
                <span>Confidence</span>
                <span>{item.confidence}%</span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-200">
                <div className="h-3 rounded-full bg-[#287c30]" style={{ width: `${item.confidence}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

export default AIRecommendations;
