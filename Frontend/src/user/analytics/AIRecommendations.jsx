import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  CheckCircle2,
  Cpu,
  DollarSign,
  Droplets,
  FlaskConical,
  Leaf,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import AppShell from "../components/AppShell";

const insights = [
  { icon: Droplets, title: "Water Requirement", value: "120L", note: "Needed in 4h", status: "URGENT", color: "bg-[#2E7D32]", pill: "bg-[#EF4444]" },
  { icon: Leaf, title: "Fertilizer Need", value: "Nitrogen Low", note: "Apply within 2 days", status: "WARN", color: "bg-[#2E7D32]", pill: "bg-[#F59E0B]" },
  { icon: TrendingUp, title: "Yield Prediction", value: "2.3 Tons", note: "+15% vs last season", status: "OK", color: "bg-[#0D9488]", pill: "bg-[#2E7D32]" },
  { icon: DollarSign, title: "Profit Estimate", value: "₹45K", note: "Estimated revenue", status: "OK", color: "bg-[#2E7D32]", pill: "bg-[#2E7D32]" },
];

const legend = [
  { color: "bg-[#0D9488]", label: "Water Needed" },
  { color: "bg-[#F59E0B]", label: "Nutrient Low" },
  { color: "bg-[#2E7D32]", label: "Healthy" },
  { color: "bg-[#EF4444]", label: "Risk Zone" },
];

const summaryBadges = [
  { label: "Water Zones", value: "3 Sectors", color: "bg-[rgba(46,125,50,0.06)] text-[#2E7D32] border-[#2E7D32]/50" },
  { label: "Nutrient Low", value: "2 Sectors", color: "bg-[rgba(245,158,11,0.06)] text-[#F59E0B] border-[#F59E0B]/50" },
  { label: "Risk Areas", value: "1 Sector", color: "bg-[rgba(239,68,68,0.06)] text-[#EF4444] border-[#EF4444]/50" },
  { label: "Healthy", value: "4 Sectors", color: "bg-[rgba(46,125,50,0.06)] text-[#2E7D32] border-[#2E7D32]/50" },
];

const markers = [
  { icon: Droplets, x: "23%", y: "20%", color: "text-blue-600", bg: "bg-blue-100", size: "h-12 w-12", sector: "Sector A", info: "Water needed: 80L", priority: "Medium" },
  { icon: FlaskConical, x: "56%", y: "14%", color: "text-green-600", bg: "bg-green-100", size: "h-10 w-10", sector: "Sector B", info: "Fertilizer: Optimal", priority: "Healthy" },
  { icon: FlaskConical, x: "78%", y: "25%", color: "text-red-600", bg: "bg-red-100", size: "h-12 w-12", sector: "Sector C", info: "Fertilizer: Over-Applied", priority: "High" },
  { icon: Droplets, x: "61%", y: "31%", color: "text-blue-600", bg: "bg-blue-100", size: "h-9 w-9", sector: "Sector B", info: "Water needed: 45L", priority: "Low" },
  { icon: Droplets, x: "33%", y: "57%", color: "text-blue-600", bg: "bg-blue-100", size: "h-12 w-12", sector: "Sector C", info: "Water needed: 120L", priority: "High" },
  { icon: FlaskConical, x: "18%", y: "73%", color: "text-amber-600", bg: "bg-amber-100", size: "h-10 w-10", sector: "Sector D", info: "Fertilizer: Low", priority: "Medium" },
  { icon: FlaskConical, x: "84%", y: "57%", color: "text-amber-600", bg: "bg-amber-100", size: "h-10 w-10", sector: "Sector D", info: "Fertilizer: Low", priority: "Medium" },
  { icon: Droplets, x: "73%", y: "73%", color: "text-blue-600", bg: "bg-blue-100", size: "h-9 w-9", sector: "Sector A", info: "Water needed: 30L", priority: "Low" },
  { icon: Droplets, x: "46%", y: "89%", color: "text-blue-600", bg: "bg-blue-100", size: "h-8 w-8", sector: "Sector A", info: "Water needed: 20L", priority: "Low" },
];

function MapMarker({ marker, index, hoveredMarker, setHoveredMarker }) {
  const isHovered = hoveredMarker === index;

  return (
    <div
      className="absolute pointer-events-auto"
      style={{ left: marker.x, top: marker.y }}
      onMouseEnter={() => setHoveredMarker(index)}
      onMouseLeave={() => setHoveredMarker(null)}
    >
      {isHovered && (
        <div className="absolute left-1/2 z-50 mb-2 -translate-x-1/2 bottom-full" style={{ pointerEvents: "none" }}>
          <div className="rounded-lg bg-gray-900 px-4 py-3 text-white shadow-xl">
            <p className="whitespace-nowrap font-bold text-white">{marker.sector} - {marker.priority === "High" ? "High Priority" : marker.priority === "Medium" ? "Medium Priority" : "Low Priority"}</p>
            <p className="mt-0.5 whitespace-nowrap text-sm text-slate-300">{marker.info}</p>
          </div>
          <div className="mx-auto h-0 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900" />
        </div>
      )}
      <span
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
          isHovered ? "h-16 w-16 bg-blue-300/40" : "h-0 w-0"
        }`}
        style={{ pointerEvents: "none" }}
      />
      <span
        className={`relative z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-all duration-200 ${
          marker.bg
        } ${marker.color} ${marker.size} ${isHovered ? "scale-110 ring-2 ring-blue-400" : ""}`}
        style={{ pointerEvents: "none" }}
      >
        <marker.icon size={marker.size === "h-12 w-12" ? 26 : marker.size === "h-10 w-10" ? 22 : 20} />
      </span>
    </div>
  );
}

function AIRecommendations() {
  const [hoveredMarker, setHoveredMarker] = useState(null);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-start gap-4">
          <span className="rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#256D28] p-3 text-white shadow-md">
            <Sparkles size={28} />
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#111827]">
              AI Recommendations - Green Valley Farm (Wheat)
            </h1>
            <p className="mt-1 text-sm text-slate-600">Visual insights powered by machine learning</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 xl:grid-cols-2">
          {/* Left - AI Insights */}
          <section>
            <h2 className="mb-5 text-xl font-bold text-[#111827]">AI Insights</h2>
            <div className="space-y-4">
              {insights.map((item) => (
                <div key={item.title} className="flex items-center gap-4 card">
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white ${item.color}`}>
                    <item.icon size={28} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-500">{item.title}</p>
                    <p className="mt-0.5 text-xl font-bold leading-tight text-[#111827]">{item.value}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{item.note}</p>
                  </div>
                  <span className={`badge ${item.status === "URGENT" ? "badge-danger" : item.status === "WARN" ? "badge-warning" : "badge-success"}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Right - Farm Zone Analysis */}
          <section>
            <h2 className="mb-5 text-xl font-bold text-[#111827]">Farm Zone Analysis</h2>

            {/* Legend + Map */}
            <div className="card">
              {/* Legend */}
              <div className="flex flex-wrap gap-4 border-b px-6 py-4">
                {legend.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <span className={`h-3.5 w-3.5 rounded ${item.color}`} />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Map Grid */}
              <div className="relative aspect-[1.1] rounded-xl">
                <div className="absolute inset-0 z-0">
                  <MapContainer center={[28.6239, 77.219]} zoom={14} className="h-full w-full" zoomControl={false} dragging={false} scrollWheelZoom={false} doubleClickZoom={false} touchZoom={false} keyboard={false} style={{ pointerEvents: "none" }}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  </MapContainer>
                </div>
                <div className="absolute inset-0 z-10 bg-black/5" style={{ pointerEvents: "none" }} />
                <div className="absolute left-1/2 top-1/2 z-20 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#2E7D32] shadow-lg" style={{ pointerEvents: "none" }} />

                <div className="absolute inset-0 z-30">
                  {markers.map((marker, index) => (
                    <MapMarker
                      key={index}
                      marker={marker}
                      index={index}
                      hoveredMarker={hoveredMarker}
                      setHoveredMarker={setHoveredMarker}
                    />
                  ))}
                </div>
              </div>

              {/* Summary Badges */}
              <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-4">
                {summaryBadges.map((badge) => (
                  <div key={badge.label} className={`rounded-lg border px-4 py-3 text-center ${badge.color}`}>
                    <p className="text-xs font-bold uppercase tracking-wide">{badge.label}</p>
                    <p className="mt-1 text-lg font-black">{badge.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#256D28] px-8 py-7 text-white shadow-lg">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="rounded-xl bg-white/15 p-3">
                <Cpu size={32} />
              </span>
              <div>
                <h3 className="text-xl font-black">AI-Powered Analytics</h3>
                <p className="mt-1 max-w-md text-sm text-blue-200">
                  Machine learning models analyze your farm data in real-time to provide actionable
                  recommendations for better yield and resource management.
                </p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-2xl font-black">98.5%</p>
                <p className="text-sm text-blue-200">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black">24/7</p>
                <p className="text-sm text-blue-200">Monitoring</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Tasks Completed */}
        <section className="card">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2E7D32] text-white shadow-lg">
                <CheckCircle2 size={34} />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Total Tasks Completed</p>
                <p className="mt-1 text-4xl font-black text-[#111827]">12</p>
                <p className="mt-0.5 text-sm text-[#2E7D32]">↗ +3 from last week</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Irrigation", value: "5" },
                { label: "Fertilization", value: "4" },
                { label: "Inspection", value: "3" },
              ].map((t) => (
                <div key={t.label} className="text-center">
                  <p className="text-2xl font-black text-[#111827]">{t.value}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export default AIRecommendations;
