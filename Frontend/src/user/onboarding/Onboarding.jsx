import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, MapPin, Sprout, Trash2, UserRound, Wheat } from "lucide-react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const steps = [
  { label: "Farmer Info", icon: UserRound },
  { label: "Farm Details", icon: Wheat },
  { label: "Farm Location", icon: MapPin },
  { label: "Confirmation", icon: Check },
];

const predefinedBoundaries = [
  { label: "Small Rectangle (~2 acres)", coords: [[28.6209, 77.2150], [28.6269, 77.2150], [28.6269, 77.2230], [28.6209, 77.2230]] },
  { label: "Medium Rectangle (~5 acres)", coords: [[28.6189, 77.2120], [28.6289, 77.2120], [28.6289, 77.2260], [28.6189, 77.2260]] },
  { label: "Large Square (~10 acres)", coords: [[28.6159, 77.2100], [28.6319, 77.2100], [28.6319, 77.2280], [28.6159, 77.2280]] },
  { label: "Irregular (~7 acres)", coords: [[28.6209, 77.2140], [28.6279, 77.2110], [28.6309, 77.2200], [28.6259, 77.2260], [28.6189, 77.2220]] },
];

const sectorColors = ["#0F2440", "#1A3A5C", "#234F78", "#3A6B96"];

function OnboardingSectors({ boundary }) {
  const map = useMap();

  useEffect(() => {
    const group = new L.FeatureGroup();

    if (boundary && boundary.length >= 3) {
      const points = boundary.map((c) => [parseFloat(c[0]), parseFloat(c[1])]);
      const polygon = L.polygon(points, {
        color: "#0F2440",
        weight: 3,
        fillColor: "#0F2440",
        fillOpacity: 0.25,
      });
      polygon.bindPopup("<b>Your Farm</b><br/>" + points.length + " boundary points");
      polygon.addTo(group);

      const center = polygon.getBounds().getCenter();
      L.marker(center, {
        icon: L.divIcon({
          className: "",
          html: `<div style="background:#0F2440;color:#fff;font-weight:900;font-size:13px;padding:4px 10px;border-radius:8px;white-space:nowrap">My Farm</div>`,
        }),
      }).addTo(group);

      polygon.getLatLngs()[0].forEach((p) => {
        L.circleMarker(p, {
          radius: 5,
          color: "#1A3A5C",
          fillColor: "#fff",
          fillOpacity: 1,
          weight: 3,
        }).bindPopup("Boundary point").addTo(group);
      });

      map.fitBounds(group.getBounds().pad(0.2));
    } else {
      predefinedBoundaries.forEach((b, idx) => {
        const polygon = L.polygon(b.coords, {
          color: sectorColors[idx % sectorColors.length],
          weight: 2,
          fillColor: sectorColors[idx % sectorColors.length],
          fillOpacity: 0.12,
          dashArray: "6 4",
        });
        polygon.bindPopup("<b>" + b.label + "</b>");
        polygon.addTo(group);

        const center = polygon.getBounds().getCenter();
        L.marker(center, {
          icon: L.divIcon({
            className: "",
            html: `<div style="background:${sectorColors[idx % sectorColors.length]};color:#fff;font-weight:900;font-size:11px;padding:3px 8px;border-radius:6px;white-space:nowrap;opacity:0.6">${b.label.split("(")[0].trim()}</div>`,
          }),
        }).addTo(group);
      });

      map.fitBounds(group.getBounds().pad(0.2));
    }

    group.addTo(map);
    return () => { map.removeLayer(group); };
  }, [map, boundary]);

  return null;
}

function DrawControl({ boundary, setBoundary }) {
  const map = useMap();
  const drawnRef = useRef(null);

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    drawnRef.current = drawnItems;
    map.addLayer(drawnItems);
    return () => {
      map.removeLayer(drawnItems);
      map.off("click");
    };
  }, [map]);

  useEffect(() => {
    const handleClick = (e) => {
      const lat = e.latlng.lat.toFixed(6);
      const lng = e.latlng.lng.toFixed(6);
      setBoundary((prev) => (prev ? [...prev, [lat, lng]] : [[lat, lng]]));
    };
    map.on("click", handleClick);
    return () => map.off("click", handleClick);
  }, [map, setBoundary]);

  useEffect(() => {
    const group = drawnRef.current;
    if (!group) return;
    group.clearLayers();

    if (boundary && boundary.length > 0) {
      const points = boundary.map((c) => [parseFloat(c[0]), parseFloat(c[1])]);

      points.forEach((p, i) => {
        L.circleMarker(p, {
          radius: 6,
          color: "#1A3A5C",
          fillColor: "#fff",
          fillOpacity: 1,
          weight: 3,
        })
          .bindPopup("Point " + (i + 1) + ": " + p[0] + ", " + p[1])
          .addTo(group);
      });

      if (points.length >= 2) {
        L.polyline(points, { color: "#1A3A5C", weight: 2, dashArray: "6 4" }).addTo(group);
      }
      if (points.length >= 3) {
        L.polygon(points, { color: "#1A3A5C", weight: 3, fillOpacity: 0.2 }).addTo(group);
      }
    }
  }, [map, boundary]);

  return null;
}

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [boundary, setBoundary] = useState(null);
  const [latInput, setLatInput] = useState("");
  const [lngInput, setLngInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [drawMode, setDrawMode] = useState("draw");
  const [form, setForm] = useState({
    farmerName: "",
    phone: "",
    region: "",
    farmName: "",
    farmArea: "",
    crop: "",
    soil: "",
  });
  const [errors, setErrors] = useState({});

  const StepIcon = steps[step].icon;

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function isValid(s) {
    if (s === 0) return !!(form.farmerName.trim() && form.phone.trim() && form.region.trim());
    if (s === 1) return !!(form.farmName.trim() && form.farmArea.trim() && form.crop && form.soil);
    if (s === 2) return !!(boundary && boundary.length >= 3);
    return true;
  }

  function goNext() {
    if (step === steps.length - 1) {
      navigate("/dashboard");
      return;
    }
    const errs = {};
    if (step === 0) {
      if (!form.farmerName.trim()) errs.farmerName = "Farmer name is required";
      if (!form.phone.trim()) errs.phone = "Phone number is required";
      if (!form.region.trim()) errs.region = "Region is required";
    }
    if (step === 1) {
      if (!form.farmName.trim()) errs.farmName = "Farm name is required";
      if (!form.farmArea.trim()) errs.farmArea = "Farm area is required";
      if (!form.crop) errs.crop = "Select a crop";
      if (!form.soil) errs.soil = "Select soil type";
    }
    if (step === 2) {
      if (!boundary || boundary.length < 3) errs.boundary = "Please define at least 3 boundary points";
    }
    setErrors(errs);
    setStep((s) => s + 1);
  }

  function goBack() {
    navigate("/dashboard");
  }

  function handleTemplateSelect(val) {
    setSelectedTemplate(val);
    if (val === "custom") {
      setBoundary(null);
      setDrawMode("draw");
    } else if (val) {
      const template = predefinedBoundaries[parseInt(val)];
      if (template) {
        const coords = template.coords.map((c) => [c[0].toFixed(6), c[1].toFixed(6)]);
        setBoundary(coords);
        setDrawMode("preview");
      }
    } else {
      setBoundary(null);
    }
  }

  function renderStep0() {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block font-bold text-sm text-[#6B7280] uppercase tracking-wide">Farmer Name *</label>
          <input value={form.farmerName} onChange={(e) => update("farmerName", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
            placeholder="John Doe" />
          {errors.farmerName && <p className="mt-1 text-sm font-semibold text-red-500">{errors.farmerName}</p>}
        </div>
        <div>
          <label className="mb-2 block font-bold text-sm text-[#6B7280] uppercase tracking-wide">Phone Number *</label>
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
            placeholder="+1 (555) 123-4567" />
          {errors.phone && <p className="mt-1 text-sm font-semibold text-red-500">{errors.phone}</p>}
        </div>
        <div>
          <label className="mb-2 block font-bold text-sm text-[#6B7280] uppercase tracking-wide">Region / Country *</label>
          <input value={form.region} onChange={(e) => update("region", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
            placeholder="California, USA" />
          {errors.region && <p className="mt-1 text-sm font-semibold text-red-500">{errors.region}</p>}
        </div>
      </div>
    );
  }

  function renderStep1() {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-bold text-sm text-[#6B7280] uppercase tracking-wide">Farm Name *</label>
          <input value={form.farmName} onChange={(e) => update("farmName", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
            placeholder="Green Valley Farm" />
          {errors.farmName && <p className="mt-1 text-sm font-semibold text-red-500">{errors.farmName}</p>}
        </div>
        <div>
          <label className="mb-2 block font-bold text-sm text-[#6B7280] uppercase tracking-wide">Farm Area *</label>
          <input value={form.farmArea} onChange={(e) => update("farmArea", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
            placeholder="18 acres" />
          {errors.farmArea && <p className="mt-1 text-sm font-semibold text-red-500">{errors.farmArea}</p>}
        </div>
        <div>
          <label className="mb-2 block font-bold text-sm text-[#6B7280] uppercase tracking-wide">Main Crop *</label>
          <select value={form.crop} onChange={(e) => update("crop", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20">
            <option value="">Select crop</option>
            <option>Rice</option>
            <option>Wheat</option>
            <option>Corn</option>
            <option>Tomato</option>
          </select>
          {errors.crop && <p className="mt-1 text-sm font-semibold text-red-500">{errors.crop}</p>}
        </div>
        <div>
          <label className="mb-2 block font-bold text-sm text-[#6B7280] uppercase tracking-wide">Soil Type *</label>
          <select value={form.soil} onChange={(e) => update("soil", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20">
            <option value="">Select soil type</option>
            <option>Loamy Soil</option>
            <option>Clay Soil</option>
            <option>Black Soil</option>
          </select>
          {errors.soil && <p className="mt-1 text-sm font-semibold text-red-500">{errors.soil}</p>}
        </div>
      </div>
    );
  }

  function renderStep2() {
    return (
      <div className="space-y-6">
        <p className="text-base text-[#6B7280]">
          Choose a predefined farm boundary or draw your own on the map.
        </p>

        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[280px] flex-1">
            <span className="mb-2 block text-sm font-bold text-[#6B7280] uppercase tracking-wide">Select Boundary</span>
            <select value={selectedTemplate} onChange={(e) => handleTemplateSelect(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20">
              <option value="">-- Choose a template --</option>
              {predefinedBoundaries.map((b, i) => (
                <option key={i} value={i}>{b.label}</option>
              ))}
              <option value="custom">-- Draw Custom Boundary --</option>
            </select>
          </div>

          {drawMode === "draw" && (
            <>
              <div className="min-w-[160px] flex-1">
                <span className="mb-2 block text-sm font-bold text-[#6B7280] uppercase tracking-wide">Latitude</span>
                <input type="number" step="any" value={latInput} onChange={(e) => setLatInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                  placeholder="28.6139" />
              </div>
              <div className="min-w-[160px] flex-1">
                <span className="mb-2 block text-sm font-bold text-[#6B7280] uppercase tracking-wide">Longitude</span>
                <input type="number" step="any" value={lngInput} onChange={(e) => setLngInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                  placeholder="77.2090" />
              </div>
              <div className="flex items-end gap-2">
                <button type="button"
                  onClick={() => {
                    const lat = parseFloat(latInput);
                    const lng = parseFloat(lngInput);
                    if (isNaN(lat) || isNaN(lng)) return;
                    setBoundary((prev) => (prev ? [...prev, [lat.toFixed(6), lng.toFixed(6)]] : [[lat.toFixed(6), lng.toFixed(6)]]));
                    setLatInput("");
                    setLngInput("");
                  }}
                  className="rounded-xl bg-[#1A3A5C] px-6 py-4 text-sm font-bold text-white hover:bg-[#0F2440] transition">
                  Add Point
                </button>
              </div>
            </>
          )}
        </div>

        <div className="relative h-[480px] overflow-hidden rounded-xl border border-slate-200 shadow-md">
          <MapContainer center={[28.6239, 77.2190]} zoom={14} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <OnboardingSectors boundary={drawMode === "preview" ? boundary : null} />
            {drawMode === "draw" && <DrawControl boundary={boundary} setBoundary={setBoundary} />}
          </MapContainer>
          <button type="button"
            onClick={() => {
              if (drawMode === "preview" || selectedTemplate === "") {
                setDrawMode("draw");
                setSelectedTemplate("custom");
                setBoundary(null);
              }
            }}
            className="absolute right-3 top-3 z-[1000] rounded-xl bg-white/80 px-4 py-2 text-sm font-bold shadow-lg backdrop-blur-md border border-slate-200 hover:bg-white transition">
            {drawMode === "draw" ? "Draw Mode Active" : "Draw Custom"}
          </button>
        </div>

        {drawMode === "draw" && (
          <p className="text-sm font-bold text-[#00112b]">
            Click on the map to mark boundary points.
          </p>
        )}

        {errors.boundary && <p className="text-sm font-bold text-red-500">{errors.boundary}</p>}

        {boundary && boundary.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#00112b]">Farm Boundary Coordinates</h3>
              <button type="button" onClick={() => { setBoundary(null); setSelectedTemplate(""); }}
                className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600 transition">
                <Trash2 size={16} /> Clear All
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {boundary.map((coord, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
                  <div>
                    <span className="font-bold text-[#00112b]">Point {i + 1}:</span>
                    <span className="ml-2 text-[#6B7280]">{coord[0]}, {coord[1]}</span>
                  </div>
                  <button type="button"
                    onClick={() => setBoundary((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-red-500 hover:text-red-700 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!boundary || boundary.length < 3) && (
          <p className="text-sm font-bold text-amber-600">
            {!boundary ? "Please add at least 3 points to define your farm boundary." : "Need " + (3 - boundary.length) + " more point(s)."}
          </p>
        )}
      </div>
    );
  }

  function renderStep3() {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <Check className="mx-auto rounded-full bg-[#10B981] p-4 text-white" size={86} />
        <h2 className="mt-6 text-3xl font-black text-[#111827]">Your farm is ready</h2>
        <div className="mx-auto mt-8 space-y-3">
          {[
            ["Farmer", form.farmerName],
            ["Phone", form.phone],
            ["Region", form.region],
            ["Farm", form.farmName],
            ["Area", form.farmArea],
            ["Crop", form.crop],
            ["Soil", form.soil],
            ["Boundary Points", boundary ? boundary.length : 0],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between rounded-xl border border-slate-100 bg-slate-50 px-6 py-4">
              <span className="font-semibold text-[#6B7280]">{label}</span>
              <span className="font-bold text-[#111827]">{value}</span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 text-lg text-[#6B7280]">
          You can now monitor weather, soil, robots, alerts, and crop health from the dashboard.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10B981]">
              <Sprout size={22} className="text-white" />
            </div>
            <span className="text-lg font-bold text-[#111827]">Smart Agriculture</span>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-semibold text-[#6B7280] hover:text-[#111827] transition"
          >
            Skip to Dashboard &rarr;
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#111827]">
            Set Up Your Farm
          </h1>
          <p className="mt-2 text-lg text-[#6B7280]">
            Fill in the details to get started with smart farming
          </p>
        </div>

        <div className="flex items-center justify-center gap-0 mb-12">
          {steps.map((item, index) => (
            <div key={item.label} className="flex items-center">
              <button
                type="button"
                onClick={() => setStep(index)}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-bold transition ${
                  index <= step
                    ? "bg-[#10B981] text-white shadow-md"
                    : "bg-white border-2 border-slate-200 text-slate-400"
                }`}
              >
                {index + 1}
              </button>
              <span
                className={`ml-3 mr-6 text-sm font-semibold hidden sm:inline ${
                  index <= step ? "text-[#111827]" : "text-slate-400"
                }`}
              >
                {item.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mr-6 ${
                    index < step ? "bg-[#10B981]" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#10B981]/10">
              <StepIcon size={30} className="text-[#10B981]" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827]">{steps[step].label}</h2>
          </div>

          {step === 0 && renderStep0()}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            <ChevronLeft size={20} /> Skip
          </button>
          <button
            type="button"
            onClick={goNext}
            className={`inline-flex items-center gap-2 rounded-xl px-8 py-3 text-base font-bold transition ${
              isValid(step)
                ? "bg-[#10B981] text-white shadow-md hover:bg-[#059669]"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {step === steps.length - 1 ? "Open Dashboard" : "Next"} <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Onboarding;
