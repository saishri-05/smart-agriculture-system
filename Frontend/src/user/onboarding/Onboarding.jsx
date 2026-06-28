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
      <div className="space-y-6">
        <div>
          <label className="mb-2 block font-black" style={{ color: "#00112b" }}>Farmer Name *</label>
          <input value={form.farmerName} onChange={(e) => update("farmerName", e.target.value)}
            className="w-full rounded-xl border border-white/30 bg-white/20 px-5 py-4 text-lg outline-none backdrop-blur-sm" style={{ color: "#00112b" }}
            placeholder="John Doe" />
          {errors.farmerName && <p className="mt-1 text-sm font-bold text-red-500">{errors.farmerName}</p>}
        </div>
        <div>
          <label className="mb-2 block font-black" style={{ color: "#00112b" }}>Phone Number *</label>
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-xl border border-white/30 bg-white/20 px-5 py-4 text-lg outline-none backdrop-blur-sm" style={{ color: "#00112b" }}
            placeholder="+1 (555) 123-4567" />
          {errors.phone && <p className="mt-1 text-sm font-bold text-red-500">{errors.phone}</p>}
        </div>
        <div>
          <label className="mb-2 block font-black" style={{ color: "#00112b" }}>Region / Country *</label>
          <input value={form.region} onChange={(e) => update("region", e.target.value)}
            className="w-full rounded-xl border border-white/30 bg-white/20 px-5 py-4 text-lg outline-none backdrop-blur-sm" style={{ color: "#00112b" }}
            placeholder="California, USA" />
          {errors.region && <p className="mt-1 text-sm font-bold text-red-500">{errors.region}</p>}
        </div>
      </div>
    );
  }

  function renderStep1() {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-black" style={{ color: "#00112b" }}>Farm Name *</label>
          <input value={form.farmName} onChange={(e) => update("farmName", e.target.value)}
            className="w-full rounded-xl border border-white/30 bg-white/20 px-5 py-4 text-lg outline-none backdrop-blur-sm" style={{ color: "#00112b" }}
            placeholder="Green Valley Farm" />
          {errors.farmName && <p className="mt-1 text-sm font-bold text-red-500">{errors.farmName}</p>}
        </div>
        <div>
          <label className="mb-2 block font-black" style={{ color: "#00112b" }}>Farm Area *</label>
          <input value={form.farmArea} onChange={(e) => update("farmArea", e.target.value)}
            className="w-full rounded-xl border border-white/30 bg-white/20 px-5 py-4 text-lg outline-none backdrop-blur-sm" style={{ color: "#00112b" }}
            placeholder="18 acres" />
          {errors.farmArea && <p className="mt-1 text-sm font-bold text-red-500">{errors.farmArea}</p>}
        </div>
        <div>
          <label className="mb-2 block font-black" style={{ color: "#00112b" }}>Main Crop *</label>
          <select value={form.crop} onChange={(e) => update("crop", e.target.value)}
            className="w-full rounded-xl border border-white/30 bg-white/20 px-5 py-4 text-lg outline-none backdrop-blur-sm" style={{ color: "#00112b" }}>
            <option value="">Select crop</option>
            <option>Rice</option>
            <option>Wheat</option>
            <option>Corn</option>
            <option>Tomato</option>
          </select>
          {errors.crop && <p className="mt-1 text-sm font-bold text-red-500">{errors.crop}</p>}
        </div>
        <div>
          <label className="mb-2 block font-black" style={{ color: "#00112b" }}>Soil Type *</label>
          <select value={form.soil} onChange={(e) => update("soil", e.target.value)}
            className="w-full rounded-xl border border-white/30 bg-white/20 px-5 py-4 text-lg outline-none backdrop-blur-sm" style={{ color: "#00112b" }}>
            <option value="">Select soil type</option>
            <option>Loamy Soil</option>
            <option>Clay Soil</option>
            <option>Black Soil</option>
          </select>
          {errors.soil && <p className="mt-1 text-sm font-bold text-red-500">{errors.soil}</p>}
        </div>
      </div>
    );
  }

  function renderStep2() {
    return (
      <div className="space-y-6">
        <p className="text-lg font-semibold" style={{ color: "#6B7280" }}>
          Choose a predefined farm boundary or draw your own on the map.
        </p>

        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[280px] flex-1">
            <span className="mb-2 block text-sm font-black uppercase tracking-wide" style={{ color: "#00112b" }}>Select Boundary</span>
            <select value={selectedTemplate} onChange={(e) => handleTemplateSelect(e.target.value)}
              className="w-full rounded-xl border border-white/30 bg-white/20 px-5 py-4 text-lg font-bold outline-none backdrop-blur-sm" style={{ color: "#00112b" }}>
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
                <span className="mb-2 block text-sm font-black uppercase tracking-wide" style={{ color: "#00112b" }}>Latitude</span>
                <input type="number" step="any" value={latInput} onChange={(e) => setLatInput(e.target.value)}
                  className="w-full rounded-xl border border-white/30 bg-white/20 px-5 py-4 text-lg outline-none backdrop-blur-sm" style={{ color: "#00112b" }}
                  placeholder="28.6139" />
              </div>
              <div className="min-w-[160px] flex-1">
                <span className="mb-2 block text-sm font-black uppercase tracking-wide" style={{ color: "#00112b" }}>Longitude</span>
                <input type="number" step="any" value={lngInput} onChange={(e) => setLngInput(e.target.value)}
                  className="w-full rounded-xl border border-white/30 bg-white/20 px-5 py-4 text-lg outline-none backdrop-blur-sm" style={{ color: "#00112b" }}
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
                  className="rounded-xl bg-[#1A3A5C] px-6 py-4 text-sm font-bold text-white hover:bg-[#0F2440]">
                  Add Point
                </button>
              </div>
            </>
          )}
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-xl border border-white/50 shadow-md">
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
            className="absolute right-3 top-3 z-[1000] rounded-xl bg-white/70 px-4 py-2 text-sm font-bold shadow-lg backdrop-blur-md border border-white/50 hover:bg-white">
            {drawMode === "draw" ? "Draw Mode Active" : "Draw Custom"}
          </button>
        </div>

        {drawMode === "draw" && (
          <p className="text-sm font-bold" style={{ color: "#00112b" }}>
            Click on the map to mark boundary points.
          </p>
        )}

        {errors.boundary && <p className="text-sm font-bold text-red-500">{errors.boundary}</p>}

        {boundary && boundary.length > 0 && (
          <div className="rounded-xl border border-white/30 bg-white/10 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-black" style={{ color: "#00112b" }}>Farm Boundary Coordinates</h3>
              <button type="button" onClick={() => { setBoundary(null); setSelectedTemplate(""); }}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-black text-white">
                <Trash2 size={16} /> Clear All
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {boundary.map((coord, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-white/30 bg-white/30 px-4 py-3 shadow-sm backdrop-blur-sm">
                  <div>
                    <span className="font-black" style={{ color: "#00112b" }}>Point {i + 1}:</span>
                    <span className="ml-2" style={{ color: "#6B7280" }}>{coord[0]}, {coord[1]}</span>
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
            {!boundary ? "Please add at least 3 points to define your farm boundary." : "Need " + (3 - boundary.length) + " more point(s)."}
          </p>
        )}
      </div>
    );
  }

  function renderStep3() {
    return (
      <div className="text-center">
        <Check className="mx-auto rounded-full bg-[#1A3A5C] p-4 text-white" size={86} />
        <h2 className="mt-6 text-3xl font-black" style={{ color: "#00112b" }}>Your farm is ready</h2>
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
            <div key={label} className="flex justify-between rounded-xl border border-white/30 bg-white/20 px-5 py-3 backdrop-blur-sm">
              <span className="font-bold" style={{ color: "#6B7280" }}>{label}</span>
              <span className="font-black" style={{ color: "#00112b" }}>{value}</span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-xl text-lg" style={{ color: "#6B7280" }}>
          You can now monitor weather, soil, robots, alerts, and crop health from the dashboard.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10" style={{ background: "transparent" }}>
      <section className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="flex items-center justify-center gap-3 text-3xl font-black md:text-4xl" style={{ color: "#00112b" }}>
            <Sprout size={42} /> Welcome to Smart Agriculture
          </h1>
          <p className="mt-4 text-lg" style={{ color: "#6B7280" }}>Let's set up your first farm</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-4 items-start gap-3">
          {steps.map((item, index) => (
            <div key={item.label} className="text-center">
              <button type="button"
                onClick={() => setStep(index)}
                className={"mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-black " + (index <= step ? "bg-[#1A3A5C] text-white" : "border border-white/30 bg-white/30 text-slate-600 backdrop-blur-sm")}>
                {index + 1}
              </button>
              <p className="mt-3 text-sm font-semibold" style={{ color: "#6B7280" }}>{item.label}</p>
            </div>
          ))}
        </div>

        <section className="mx-auto mt-10 max-w-4xl glass-card p-8">
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-xl border border-white/30 bg-white/30 p-4 text-[#1A3A5C] backdrop-blur-sm">
              <StepIcon size={38} />
            </span>
            <h2 className="text-2xl font-bold" style={{ color: "#00112b" }}>{steps[step].label}</h2>
          </div>

          {step === 0 && renderStep0()}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </section>

        <div className="mx-auto mt-8 flex max-w-4xl justify-between">
          <button type="button" onClick={goBack}
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/40 px-6 py-4 text-lg font-black backdrop-blur-sm hover:bg-white/60" style={{ color: "#00112b" }}>
            <ChevronLeft size={22} /> {step === 0 ? "Skip" : "Back"}
          </button>
          <button type="button" onClick={goNext}
            className={"inline-flex items-center gap-2 rounded-xl px-6 py-4 text-lg font-black " + (isValid(step) ? "bg-[#1A3A5C] text-white hover:bg-[#0F2440]" : "border border-white/20 bg-white/20 text-slate-400")}>
            {step === steps.length - 1 ? "Open Dashboard" : "Next"} <ChevronRight size={22} />
          </button>
        </div>
      </section>
    </main>
  );
}

export default Onboarding;
