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

function DrawControl({ boundary, setBoundary, drawMode }) {
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
    if (drawMode === "click") {
      const handleClick = (e) => {
        const lat = e.latlng.lat.toFixed(6);
        const lng = e.latlng.lng.toFixed(6);
        setBoundary((prev) => (prev ? [...prev, [lat, lng]] : [[lat, lng]]));
      };
      map.on("click", handleClick);
      return () => map.off("click", handleClick);
    } else {
      map.off("click");
    }
  }, [map, drawMode, setBoundary]);

  useEffect(() => {
    const group = drawnRef.current;
    if (!group) return;
    group.clearLayers();

    if (boundary && boundary.length > 0) {
      const points = boundary.map((c) => [parseFloat(c[0]), parseFloat(c[1])]);

      points.forEach((p, i) => {
        L.circleMarker(p, {
          radius: 6,
          color: "#2a7a2a",
          fillColor: "#fff",
          fillOpacity: 1,
          weight: 3,
        })
          .bindPopup(`Point ${i + 1}: ${p[0]}, ${p[1]}`)
          .addTo(group);
      });

      if (points.length >= 2) {
        L.polyline(points, { color: "#2a7a2a", weight: 2, dashArray: "6 4" }).addTo(group);
      }

      if (points.length >= 3) {
        L.polygon(points, { color: "#2a7a2a", weight: 3, fillOpacity: 0.2 }).addTo(group);
        map.fitBounds(group.getBounds().pad(0.2));
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
  const [drawMode, setDrawMode] = useState("click");
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

  function validateStep(s) {
    const errs = {};
    if (s === 0) {
      if (!form.farmerName.trim()) errs.farmerName = "Farmer name is required";
      if (!form.phone.trim()) errs.phone = "Phone number is required";
      if (!form.region.trim()) errs.region = "Region is required";
    }
    if (s === 1) {
      if (!form.farmName.trim()) errs.farmName = "Farm name is required";
      if (!form.farmArea.trim()) errs.farmArea = "Farm area is required";
      if (!form.crop) errs.crop = "Select a crop";
      if (!form.soil) errs.soil = "Select soil type";
    }
    return errs;
  }

  function canNext() {
    if (step === 0) return !!(form.farmerName.trim() && form.phone.trim() && form.region.trim());
    if (step === 1) return !!(form.farmName.trim() && form.farmArea.trim() && form.crop && form.soil);
    if (step === 2) return !!(boundary && boundary.length >= 3);
    return true;
  }

  function goNext() {
    if (step === steps.length - 1) {
      navigate("/dashboard");
      return;
    }
    const errs = validateStep(step);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    if (step === 0) {
      navigate("/dashboard");
    } else {
      setStep((s) => s - 1);
    }
  }

  const btn =
    "inline-flex items-center gap-2 rounded-lg px-6 py-4 text-lg font-black";

  function renderStep0() {
    return (
      <div className="space-y-6">
        <label className="block">
          <span className="mb-2 block font-black">Farmer Name *</span>
          <input value={form.farmerName} onChange={(e) => update("farmerName", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]"
            placeholder="John Doe" />
          {errors.farmerName && <p className="mt-1 text-sm font-bold text-red-500">{errors.farmerName}</p>}
        </label>
        <label className="block">
          <span className="mb-2 block font-black">Phone Number *</span>
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]"
            placeholder="+1 (555) 123-4567" />
          {errors.phone && <p className="mt-1 text-sm font-bold text-red-500">{errors.phone}</p>}
        </label>
        <label className="block">
          <span className="mb-2 block font-black">Region / Country *</span>
          <input value={form.region} onChange={(e) => update("region", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]"
            placeholder="California, USA" />
          {errors.region && <p className="mt-1 text-sm font-bold text-red-500">{errors.region}</p>}
        </label>
      </div>
    );
  }

  function renderStep1() {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-black">Farm Name *</span>
          <input value={form.farmName} onChange={(e) => update("farmName", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]"
            placeholder="Green Valley Farm" />
          {errors.farmName && <p className="mt-1 text-sm font-bold text-red-500">{errors.farmName}</p>}
        </label>
        <label className="block">
          <span className="mb-2 block font-black">Farm Area *</span>
          <input value={form.farmArea} onChange={(e) => update("farmArea", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]"
            placeholder="18 acres" />
          {errors.farmArea && <p className="mt-1 text-sm font-bold text-red-500">{errors.farmArea}</p>}
        </label>
        <label className="block">
          <span className="mb-2 block font-black">Main Crop *</span>
          <select value={form.crop} onChange={(e) => update("crop", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]">
            <option value="">Select crop</option>
            <option>Rice</option>
            <option>Wheat</option>
            <option>Corn</option>
            <option>Tomato</option>
          </select>
          {errors.crop && <p className="mt-1 text-sm font-bold text-red-500">{errors.crop}</p>}
        </label>
        <label className="block">
          <span className="mb-2 block font-black">Soil Type *</span>
          <select value={form.soil} onChange={(e) => update("soil", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]">
            <option value="">Select soil type</option>
            <option>Loamy Soil</option>
            <option>Clay Soil</option>
            <option>Black Soil</option>
          </select>
          {errors.soil && <p className="mt-1 text-sm font-bold text-red-500">{errors.soil}</p>}
        </label>
      </div>
    );
  }

  function renderStep2() {
    return (
      <div className="space-y-6">
        <p className="text-lg font-semibold text-slate-700">
          Define your farm boundary by clicking on the map or entering coordinates manually.
        </p>

        {drawMode === "manual" && (
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[180px]">
              <span className="mb-2 block text-sm font-black uppercase tracking-wide text-slate-700">Latitude</span>
              <input type="number" step="any" value={latInput} onChange={(e) => setLatInput(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#287c30]"
                placeholder="28.6139" />
            </div>
            <div className="flex-1 min-w-[180px]">
              <span className="mb-2 block text-sm font-black uppercase tracking-wide text-slate-700">Longitude</span>
              <input type="number" step="any" value={lngInput} onChange={(e) => setLngInput(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#287c30]"
                placeholder="77.2090" />
            </div>
            <div className="flex items-end">
              <button type="button"
                onClick={() => {
                  const lat = parseFloat(latInput);
                  const lng = parseFloat(lngInput);
                  if (isNaN(lat) || isNaN(lng)) return;
                  setBoundary((prev) => (prev ? [...prev, [lat.toFixed(6), lng.toFixed(6)]] : [[lat.toFixed(6), lng.toFixed(6)]]));
                  setLatInput("");
                  setLngInput("");
                }}
                className="rounded-lg bg-[#287c30] px-6 py-3 text-lg font-black text-white hover:bg-[#1f5e1f]">
                Add Point
              </button>
            </div>
          </div>
        )}

        <div className="relative h-[400px] overflow-hidden rounded-xl border-2 border-[#287c30] shadow-md">
          <MapContainer center={[20, 78]} zoom={5} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DrawControl boundary={boundary} setBoundary={setBoundary} drawMode={drawMode} />
          </MapContainer>
          <button type="button"
            onClick={() => setDrawMode((m) => (m === "click" ? "manual" : "click"))}
            className="absolute right-3 top-3 z-[1000] rounded-lg bg-white px-4 py-2 text-sm font-bold shadow-lg hover:bg-slate-100">
            {drawMode === "click" ? "Enter Manually" : "Click on Map"}
          </button>
        </div>

        {boundary && boundary.length > 0 && (
          <div className="rounded-lg border border-slate-200 bg-[#f6f9f0] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-black text-[#287c30]">Farm Boundary Coordinates</h3>
              <button type="button" onClick={() => setBoundary(null)}
                className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-black text-white">
                <Trash2 size={16} /> Clear All
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {boundary.map((coord, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm">
                  <div>
                    <span className="font-black text-[#287c30]">Point {i + 1}:</span>
                    <span className="ml-2 text-slate-700">{coord[0]}, {coord[1]}</span>
                  </div>
                  <button type="button"
                    onClick={() => setBoundary((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!boundary || boundary.length < 3) && (
          <p className="text-sm font-bold text-amber-600">
            {!boundary ? "Please add at least 3 points to define your farm boundary." : `Need ${3 - boundary.length} more point(s).`}
          </p>
        )}
      </div>
    );
  }

  function renderStep3() {
    return (
      <div className="text-center">
        <Check className="mx-auto rounded-full bg-[#287c30] p-4 text-white" size={86} />
        <h2 className="mt-6 text-3xl font-black">Your farm is ready</h2>
        <div className="mx-auto mt-6 max-w-md space-y-3 text-left">
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
            <div key={label} className="flex justify-between rounded-lg bg-[#f6f9f0] px-5 py-3">
              <span className="font-bold text-slate-600">{label}</span>
              <span className="font-black text-[#287c30]">{value}</span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700">
          You can now monitor weather, soil, robots, alerts, and crop health from the dashboard.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faf4] px-4 py-10 text-[#00112b]">
      <section className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="flex items-center justify-center gap-3 text-3xl font-black text-[#287c30] md:text-4xl">
            <Sprout size={42} /> Welcome to Smart Agriculture
          </h1>
          <p className="mt-4 text-lg text-slate-700">Let's set up your first farm</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-4 items-start gap-3">
          {steps.map((item, index) => (
            <div key={item.label} className="text-center">
              <button type="button"
                onClick={() => setStep(index)}
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-black ${index <= step ? "bg-[#287c30] text-white" : "bg-slate-300 text-slate-700"}`}>
                {index + 1}
              </button>
              <p className="mt-3 text-sm font-semibold text-slate-700">{item.label}</p>
            </div>
          ))}
        </div>

        <section className="mx-auto mt-10 max-w-4xl rounded-xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-lg bg-green-100 p-4 text-[#287c30]">
              <StepIcon size={38} />
            </span>
            <h2 className="text-3xl font-black text-[#287c30]">{steps[step].label}</h2>
          </div>

          {step === 0 && renderStep0()}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </section>

        <div className="mx-auto mt-8 flex max-w-4xl justify-between">
          <button type="button" onClick={goBack}
            className={`${btn} bg-slate-300 text-slate-700`}>
            <ChevronLeft size={22} /> {step === 0 ? "Skip" : "Back"}
          </button>
          <button type="button" onClick={goNext}
            disabled={!canNext()}
            className={`${btn} ${canNext() ? "bg-[#287c30] text-white hover:bg-[#1f5e1f]" : "bg-slate-400 text-white"}`}>
            {step === steps.length - 1 ? "Open Dashboard" : "Next"} <ChevronRight size={22} />
          </button>
        </div>
      </section>
    </main>
  );
}

export default Onboarding;
