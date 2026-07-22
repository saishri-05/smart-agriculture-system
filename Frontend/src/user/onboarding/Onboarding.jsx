import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, Crosshair, Eraser, MapPin, Maximize2, MousePointer2, Navigation, Pencil, Plus, Sprout, Trash2, UserRound, Wheat } from "lucide-react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const PhoneInput = PhoneInputModule.default || PhoneInputModule;
import Select from "react-select";

const steps = [
  { label: "Farmer Info", icon: UserRound },
  { label: "Farm Details", icon: Wheat },
  { label: "Farm Location", icon: MapPin },
  { label: "Confirmation", icon: Check },
];

const predefinedBoundaries = [
  { label: "Small Rectangle (~2 acres)", coords: [[28.6209, 77.215], [28.6269, 77.215], [28.6269, 77.223], [28.6209, 77.223]] },
  { label: "Medium Rectangle (~5 acres)", coords: [[28.6189, 77.212], [28.6289, 77.212], [28.6289, 77.226], [28.6189, 77.226]] },
  { label: "Large Square (~10 acres)", coords: [[28.6159, 77.21], [28.6319, 77.21], [28.6319, 77.228], [28.6159, 77.228]] },
  { label: "Irregular (~7 acres)", coords: [[28.6209, 77.214], [28.6279, 77.211], [28.6309, 77.22], [28.6259, 77.226], [28.6189, 77.222]] },
];

const LAYER_CONFIGS = {
  street: { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' },
  satellite: { url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", attribution: "&copy; Esri" },
  terrain: { url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>' },
};

const countries = [
  { code: "AF", name: "Afghanistan" }, { code: "AL", name: "Albania" }, { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" }, { code: "AO", name: "Angola" }, { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" }, { code: "AM", name: "Armenia" }, { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" }, { code: "AZ", name: "Azerbaijan" }, { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" }, { code: "BD", name: "Bangladesh" }, { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" }, { code: "BE", name: "Belgium" }, { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" }, { code: "BT", name: "Bhutan" }, { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" }, { code: "BW", name: "Botswana" }, { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" }, { code: "BG", name: "Bulgaria" }, { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" }, { code: "KH", name: "Cambodia" }, { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" }, { code: "CV", name: "Cape Verde" }, { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" }, { code: "CL", name: "Chile" }, { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" }, { code: "KM", name: "Comoros" }, { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo (DRC)" }, { code: "CR", name: "Costa Rica" }, { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" }, { code: "CY", name: "Cyprus" }, { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" }, { code: "DJ", name: "Djibouti" }, { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" }, { code: "EC", name: "Ecuador" }, { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" }, { code: "GQ", name: "Equatorial Guinea" }, { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" }, { code: "SZ", name: "Eswatini" }, { code: "ET", name: "Ethiopia" },
  { code: "FJ", name: "Fiji" }, { code: "FI", name: "Finland" }, { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" }, { code: "GM", name: "Gambia" }, { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" }, { code: "GH", name: "Ghana" }, { code: "GR", name: "Greece" },
  { code: "GD", name: "Grenada" }, { code: "GT", name: "Guatemala" }, { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" }, { code: "GY", name: "Guyana" }, { code: "HT", name: "Haiti" },
  { code: "HN", name: "Honduras" }, { code: "HU", name: "Hungary" }, { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" }, { code: "ID", name: "Indonesia" }, { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" }, { code: "IE", name: "Ireland" }, { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" }, { code: "JM", name: "Jamaica" }, { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" }, { code: "KZ", name: "Kazakhstan" }, { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" }, { code: "KP", name: "North Korea" }, { code: "KR", name: "South Korea" },
  { code: "KW", name: "Kuwait" }, { code: "KG", name: "Kyrgyzstan" }, { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" }, { code: "LB", name: "Lebanon" }, { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" }, { code: "LY", name: "Libya" }, { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" }, { code: "LU", name: "Luxembourg" }, { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" }, { code: "MY", name: "Malaysia" }, { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" }, { code: "MT", name: "Malta" }, { code: "MH", name: "Marshall Islands" },
  { code: "MR", name: "Mauritania" }, { code: "MU", name: "Mauritius" }, { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia" }, { code: "MD", name: "Moldova" }, { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" }, { code: "ME", name: "Montenegro" }, { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" }, { code: "MM", name: "Myanmar" }, { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" }, { code: "NP", name: "Nepal" }, { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" }, { code: "NI", name: "Nicaragua" }, { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" }, { code: "MK", name: "North Macedonia" }, { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" }, { code: "PK", name: "Pakistan" }, { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine" }, { code: "PA", name: "Panama" }, { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" }, { code: "PE", name: "Peru" }, { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" }, { code: "PT", name: "Portugal" }, { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" }, { code: "RU", name: "Russia" }, { code: "RW", name: "Rwanda" },
  { code: "KN", name: "Saint Kitts and Nevis" }, { code: "LC", name: "Saint Lucia" },
  { code: "VC", name: "Saint Vincent and the Grenadines" }, { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" }, { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" }, { code: "SN", name: "Senegal" }, { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" }, { code: "SL", name: "Sierra Leone" }, { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" }, { code: "SI", name: "Slovenia" }, { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" }, { code: "ZA", name: "South Africa" }, { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" }, { code: "LK", name: "Sri Lanka" }, { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" }, { code: "SE", name: "Sweden" }, { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" }, { code: "TW", name: "Taiwan" }, { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" }, { code: "TH", name: "Thailand" }, { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" }, { code: "TO", name: "Tonga" }, { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" }, { code: "TR", name: "Turkey" }, { code: "TM", name: "Turkmenistan" },
  { code: "TV", name: "Tuvalu" }, { code: "UG", name: "Uganda" }, { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" }, { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" }, { code: "UY", name: "Uruguay" }, { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" }, { code: "VA", name: "Vatican City" }, { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" }, { code: "YE", name: "Yemen" }, { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

const countryOptions = countries.map(c => ({ value: c.name, label: c.name }));
const countryCodeToName = Object.fromEntries(countries.map(c => [c.code, c.name]));
const countryNameToCode = Object.fromEntries(countries.map(c => [c.name, c.code]));

function generateId() {
  return "farm_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
}

function calcArea(boundary) {
  if (!boundary || boundary.length < 3) return { sqMeters: 0, acres: 0, hectares: 0 };
  const pts = sortPointsByAngle(boundary.map(c => [parseFloat(c[0]), parseFloat(c[1])]));
  const sqMeters = L.polygon(pts).getArea();
  return {
    sqMeters: Math.round(sqMeters),
    acres: parseFloat((sqMeters / 4046.86).toFixed(2)),
    hectares: parseFloat((sqMeters / 10000).toFixed(2)),
  };
}


function sortPointsByAngle(points) {
  if (points.length < 3) return points;
  const centroid = points.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1]], [0, 0]);
  centroid[0] /= points.length;
  centroid[1] /= points.length;
  return [...points].sort((a, b) => Math.atan2(a[0] - centroid[0], a[1] - centroid[1]) - Math.atan2(b[0] - centroid[0], b[1] - centroid[1]));
}

function FarmBoundaryLayer({ farms, activeFarmIndex, form }) {
  const map = useMap();

  useEffect(() => {
    if (!farms.some(f => f.boundary && f.boundary.length >= 3)) return;
    const group = new L.FeatureGroup();

    farms.forEach((farm, idx) => {
      if (!farm.boundary || farm.boundary.length < 3) return;
      const pts = sortPointsByAngle(farm.boundary.map(c => [parseFloat(c[0]), parseFloat(c[1])]));
      const isActive = idx === activeFarmIndex;
      const area = calcArea(farm.boundary);

      const poly = L.polygon(pts, {
        color: isActive ? "#2E7D32" : "#5A7A5A",
        weight: isActive ? 4 : 2,
        fillColor: isActive ? "#2E7D32" : "#5A7A5A",
        fillOpacity: isActive ? 0.25 : 0.1,
        dashArray: isActive ? null : "6 4",
      });
      poly.bindPopup(
        "<b>" + (farm.farmName || "Farm " + (idx + 1)) + "</b><br/>" +
        "Area: " + area.acres + " ac (" + area.hectares + " ha)<br/>" +
        "Points: " + farm.boundary.length + "<br/>" +
        (form?.crop ? "Crop: " + form.crop : "") +
        (form?.farmArea ? "<br/>Total Area: " + form.farmArea : "")
      );
      poly.addTo(group);

      pts.forEach((c) => {
        L.circleMarker(c, {
          radius: 4, color: isActive ? "#2E7D32" : "#5A7A5A", fillColor: "#fff", fillOpacity: 1, weight: 2,
        }).addTo(group);
      });

      const center = L.polygon(pts).getBounds().getCenter();
      L.marker(center, {
        icon: L.divIcon({
          className: "",
          html: "<div style=\"background:" + (isActive ? "#2E7D32" : "#5A7A5A") + ";color:#fff;font-weight:700;font-size:12px;padding:3px 10px;border-radius:8px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.15)\">" + (farm.farmName || "Farm " + (idx + 1)) + " (" + area.acres + " ac)</div>",
        }),
      }).addTo(group);
    });

    group.addTo(map);
    map.fitBounds(group.getBounds().pad(0.2));

    return () => { map.removeLayer(group); };
  }, [map, farms, activeFarmIndex, form]);

  return null;
}

function DrawInteraction({ farms, setFarms, activeFarmIndex, drawTool, setDrawTool, onDrawingPoints }) {
  const map = useMap();
  const layerRef = useRef(new L.LayerGroup());

  useEffect(() => {
    const layer = layerRef.current;
    layer.addTo(map);
    return () => { map.removeLayer(layer); };
  }, [map]);

  useEffect(() => {
    if (drawTool !== "polygon") { layerRef.current.clearLayers(); return; }

    map.doubleClickZoom.disable();
    const layer = layerRef.current;
    const tempPoints = [];
    let clickTimeout = null;

    const renderPreview = () => {
      layer.clearLayers();
      if (tempPoints.length === 0) return;
      const sorted = tempPoints.length >= 3 ? sortPointsByAngle(tempPoints) : tempPoints;
      tempPoints.forEach((p, i) => {
        L.circleMarker(p, { radius: 6, color: "#2E7D32", fillColor: "#fff", fillOpacity: 1, weight: 3 })
          .bindPopup("Point " + (i + 1) + ": " + p[0].toFixed(4) + ", " + p[1].toFixed(4))
          .addTo(layer);
      });
      if (tempPoints.length >= 2) {
        const sortedLine = tempPoints.length >= 3 ? sortPointsByAngle(tempPoints) : tempPoints;
        L.polyline(sortedLine, { color: "#2E7D32", weight: 2, dashArray: "6 4" }).addTo(layer);
      }
      if (tempPoints.length >= 3)
        L.polygon(sorted, { color: "#2E7D32", weight: 2, fillColor: "#2E7D32", fillOpacity: 0.12 }).addTo(layer);
    };

    const onClick = (e) => {
      if (clickTimeout) { clearTimeout(clickTimeout); clickTimeout = null; return; }
      clickTimeout = setTimeout(() => {
        tempPoints.push([e.latlng.lat, e.latlng.lng]);
        renderPreview();
        if (onDrawingPoints) onDrawingPoints(tempPoints.map(p => [p[0].toFixed(6), p[1].toFixed(6)]));
        clickTimeout = null;
      }, 300);
    };

    const onDblClick = () => {
      if (clickTimeout) { clearTimeout(clickTimeout); clickTimeout = null; }
      if (tempPoints.length >= 3) {
        const sorted = sortPointsByAngle(tempPoints);
        const boundary = sorted.map(p => [p[0].toFixed(6), p[1].toFixed(6)]);
        setFarms(prev => prev.map((f, i) => i === activeFarmIndex ? { ...f, boundary } : f));
      }
      if (onDrawingPoints) onDrawingPoints([]);
      tempPoints.length = 0;
      layer.clearLayers();
      map.doubleClickZoom.enable();
      setDrawTool(null);
    };

    map.on("click", onClick);
    map.on("dblclick", onDblClick);
    return () => {
      if (clickTimeout) clearTimeout(clickTimeout);
      map.off("click", onClick);
      map.off("dblclick", onDblClick);
      map.doubleClickZoom.enable();
      layer.clearLayers();
      if (onDrawingPoints) onDrawingPoints([]);
    };
  }, [map, drawTool, activeFarmIndex, setFarms, setDrawTool, onDrawingPoints]);

  useEffect(() => {
    layerRef.current.clearLayers();
  }, [drawTool]);

  useEffect(() => {
    if (drawTool !== "edit") { layerRef.current.clearLayers(); return; }

    const layer = layerRef.current;
    const farm = farms[activeFarmIndex];
    if (!farm?.boundary || farm.boundary.length < 3) { setDrawTool(null); return; }

    const pts = farm.boundary.map(c => [parseFloat(c[0]), parseFloat(c[1])]);
    const polygon = L.polygon(pts, { color: "#2E7D32", weight: 3, fillColor: "#2E7D32", fillOpacity: 0.15 }).addTo(layer);
    const markers = [];

    if (onDrawingPoints) onDrawingPoints(farm.boundary);

    pts.forEach((p, i) => {
      const marker = L.marker(p, {
        draggable: true,
        icon: L.divIcon({
          className: "",
          html: "<div style=\"width:14px;height:14px;background:#fff;border:3px solid #2E7D32;border-radius:50%;cursor:grab;box-shadow:0 2px 4px rgba(0,0,0,0.2)\"></div>",
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        }),
      });

      marker.on("drag", () => {
        polygon.setLatLngs(markers.map(m => { const ll = m.getLatLng(); return [ll.lat, ll.lng]; }));
      });

      marker.on("dragend", () => {
        const newBoundary = markers.map(m => { const ll = m.getLatLng(); return [ll.lat.toFixed(6), ll.lng.toFixed(6)]; });
        setFarms(prev => prev.map((f, idx) => idx === activeFarmIndex ? { ...f, boundary: newBoundary } : f));
        if (onDrawingPoints) onDrawingPoints(newBoundary);
      });

      marker.addTo(layer);
      markers.push(marker);
    });

    return () => { layer.clearLayers(); if (onDrawingPoints) onDrawingPoints([]); };
  }, [map, drawTool, activeFarmIndex, onDrawingPoints]);

  return null;
}

function FloatingToolbar({ drawTool, setDrawTool, farms, setFarms, activeFarmIndex, mapLayer, setMapLayer }) {
  const map = useMap();
  const activeFarm = farms[activeFarmIndex];

  const tools = [
    { id: "polygon", icon: MousePointer2, label: "Draw Polygon" },
    { id: "edit", icon: Pencil, label: "Edit" },
  ];

  const handleDelete = () => {
    setFarms(prev => prev.map((f, i) => i === activeFarmIndex ? { ...f, boundary: null } : f));
    setDrawTool(null);
  };

  const handleClearAll = () => {
    setFarms(prev => prev.map(f => ({ ...f, boundary: null })));
    setDrawTool(null);
  };

  const handleZoomToFarm = () => {
    if (!activeFarm?.boundary || activeFarm.boundary.length < 3) return;
    const polygon = L.polygon(activeFarm.boundary.map(c => [parseFloat(c[0]), parseFloat(c[1])]));
    map.fitBounds(polygon.getBounds().pad(0.2));
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => map.setView([pos.coords.latitude, pos.coords.longitude], 15),
      () => {}
    );
  };

  const handleFullscreen = () => {
    const el = map.getContainer();
    document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen();
  };

  return (
    <div className="absolute top-3 right-3 z-[1000] flex flex-wrap gap-1.5 max-w-[calc(100%-24px)] justify-end">
      {tools.map(t => (
        <button key={t.id}
          onClick={() => setDrawTool(drawTool === t.id ? null : t.id)}
          className={"flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all " + (drawTool === t.id ? "bg-[#2E7D32] text-white shadow-md" : "bg-white/90 text-[#111827] shadow-sm border border-slate-200 hover:bg-white")}
          title={t.label}>
          <t.icon size={16} />
          <span className="hidden sm:inline">{t.label}</span>
        </button>
      ))}
      <div className="w-px bg-slate-200 mx-1 self-stretch hidden sm:block" />
      <button onClick={handleDelete} disabled={!activeFarm?.boundary}
        className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-red-600 shadow-sm border border-slate-200 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all" title="Delete Boundary">
        <Trash2 size={16} /><span className="hidden sm:inline">Delete</span>
      </button>
      <button onClick={handleClearAll}
        className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-red-600 shadow-sm border border-slate-200 hover:bg-white transition-all" title="Clear All">
        <Eraser size={16} /><span className="hidden sm:inline">Clear</span>
      </button>
      <button onClick={handleZoomToFarm} disabled={!activeFarm?.boundary}
        className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-[#111827] shadow-sm border border-slate-200 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all" title="Zoom to Farm">
        <Crosshair size={16} /><span className="hidden sm:inline">Zoom</span>
      </button>
      <button onClick={handleCurrentLocation}
        className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-[#111827] shadow-sm border border-slate-200 hover:bg-white transition-all" title="My Location">
        <Navigation size={16} /><span className="hidden sm:inline">Locate</span>
      </button>
      <button onClick={handleFullscreen}
        className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-[#111827] shadow-sm border border-slate-200 hover:bg-white transition-all" title="Fullscreen">
        <Maximize2 size={16} /><span className="hidden sm:inline">Full</span>
      </button>
      <div className="w-px bg-slate-200 mx-1 self-stretch hidden sm:block" />
      <div className="flex rounded-lg bg-white/90 shadow-sm border border-slate-200 overflow-hidden">
        {["street", "satellite", "terrain"].map(layer => (
          <button key={layer} onClick={() => setMapLayer(layer)}
            className={"px-2.5 py-2 text-xs font-semibold transition-all " + (mapLayer === layer ? "bg-[#2E7D32] text-white" : "text-[#5A7A5A] hover:text-[#111827]")}>
            {layer === "street" ? "Street" : layer === "satellite" ? "Satellite" : "Terrain"}
          </button>
        ))}
      </div>
    </div>
  );
}
function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [farms, setFarms] = useState([{ id: generateId(), farmName: "", boundary: null, lat: "", lng: "" }]);
  const [activeFarmIndex, setActiveFarmIndex] = useState(0);
  const [drawTool, setDrawTool] = useState(null);
  const [mapLayer, setMapLayer] = useState("street");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [drawingPoints, setDrawingPoints] = useState([]);

  useEffect(() => {
    const farm = farms[activeFarmIndex];
    if (!drawTool && farm?.boundary && farm.boundary.length > 0) {
      setDrawingPoints(farm.boundary);
    } else if (!drawTool) {
      setDrawingPoints([]);
    }
  }, [activeFarmIndex, farms, drawTool]);
  const [form, setForm] = useState({
    farmerName: "", phone: "", region: "", farmName: "", farmArea: "", crop: "", soil: "",
  });
  const [errors, setErrors] = useState({});
  const [phoneCountry, setPhoneCountry] = useState("us");

  const StepIcon = steps[step].icon;

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  }

  function updateFarm(index, field, value) {
    setFarms(prev => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  }

  function removeBoundaryPoint(farmIndex, pointIndex) {
    setFarms(prev => prev.map((f, i) => {
      if (i !== farmIndex) return f;
      const nb = f.boundary.filter((_, idx) => idx !== pointIndex);
      return { ...f, boundary: nb.length > 0 ? nb : null };
    }));
  }

  function handleAddFarm() {
    const idx = farms.length;
    setFarms(prev => [...prev, { id: generateId(), farmName: "", boundary: null, lat: "", lng: "" }]);
    setActiveFarmIndex(idx);
    setDrawTool(null);
    setSelectedTemplate("");
  }

  function isValid(s) {
    if (s === 0) return !!(form.farmerName.trim() && form.phone.trim() && form.region.trim());
    if (s === 1) return !!(form.farmName.trim() && form.farmArea.trim() && form.crop && form.soil);
    if (s === 2) return farms.some(f => f.boundary && f.boundary.length >= 3);
    return true;
  }

  function saveAndGo() {
    localStorage.setItem("onboardingData", JSON.stringify({ form, farms }));
    navigate("/dashboard");
  }

  function goNext() {
    if (step === steps.length - 1) { saveAndGo(); return; }
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
      if (!farms.some(f => f.boundary && f.boundary.length >= 3))
        errs.boundary = "At least one farm must have a defined boundary (3+ points)";
    }
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(s => s + 1);
  }

  function goBack() { setStep(s => Math.max(0, s - 1)); }

  function handleTemplateSelect(val) {
    setSelectedTemplate(val);
    if (!val) return;
    const template = predefinedBoundaries[parseInt(val)];
    if (template) {
      const sorted = sortPointsByAngle(template.coords);
      const coords = sorted.map(c => [c[0].toFixed(6), c[1].toFixed(6)]);
      updateFarm(activeFarmIndex, "boundary", coords);
      setDrawTool(null);
    }
  }

  function renderStep0() {
    const selectedCountry = form.region && countryNameToCode[form.region]
      ? { value: form.region, label: form.region }
      : null;

    const selectStyles = {
      control: (provided, state) => ({
        ...provided,
        minHeight: 47,
        borderRadius: 10,
        border: `1.5px solid ${state.isFocused ? "#2E7D32" : "#DDE8DD"}`,
        boxShadow: state.isFocused ? "0 0 0 3px rgba(46,125,50,0.1)" : "none",
        cursor: "pointer",
      }),
      valueContainer: (provided) => ({ ...provided, padding: "0 16px", fontSize: 14, color: "#111827" }),
      input: (provided) => ({ ...provided, margin: 0, padding: 0, fontSize: 14, color: "#111827" }),
      placeholder: (provided) => ({ ...provided, fontSize: 14, color: "#9CA3AF" }),
      singleValue: (provided) => ({ ...provided, fontSize: 14, color: "#111827" }),
      menu: (provided) => ({ ...provided, borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }),
      option: (provided, state) => ({
        ...provided,
        fontSize: 14,
        padding: "10px 16px",
        backgroundColor: state.isSelected ? "rgba(46,125,50,0.1)" : state.isFocused ? "rgba(46,125,50,0.05)" : "white",
        color: "#111827",
        cursor: "pointer",
      }),
    };

    return (
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="label">Farmer Name *</label>
          <input value={form.farmerName} onChange={e => update("farmerName", e.target.value)}
            className="input" placeholder="John Doe" />
          {errors.farmerName && <p className="mt-1 text-sm font-semibold text-red-500">{errors.farmerName}</p>}
        </div>
        <div>
          <label className="label">Phone Number *</label>
          <PhoneInput
            value={form.phone}
            onChange={(value, countryData) => {
              update("phone", value);
              if (countryData && countryData.countryCode) {
                const code = countryData.countryCode.toUpperCase();
                if (countryCodeToName[code]) {
                  update("region", countryCodeToName[code]);
                }
              }
            }}
            country={phoneCountry}
            inputStyle={{
              width: "100%",
              height: 47,
              paddingLeft: 56,
              fontSize: 14,
              color: "#111827",
              background: "#FFFFFF",
              border: "1.5px solid #DDE8DD",
              borderRadius: 10,
              outline: "none",
            }}
            buttonStyle={{
              border: "1.5px solid #DDE8DD",
              borderRight: "none",
              borderRadius: "10px 0 0 10px",
              background: "#FFFFFF",
            }}
            containerStyle={{ fontFamily: "inherit" }}
            dropdownStyle={{ borderRadius: 10 }}
          />
          {errors.phone && <p className="mt-1 text-sm font-semibold text-red-500">{errors.phone}</p>}
        </div>
        <div>
          <label className="label">Region / Country *</label>
          <Select
            value={selectedCountry}
            onChange={(option) => {
              if (option) {
                update("region", option.value);
                const code = countryNameToCode[option.value];
                if (code) {
                  setPhoneCountry(code.toLowerCase());
                }
              }
            }}
            options={countryOptions}
            styles={selectStyles}
            placeholder="Search country..."
            isSearchable
            noOptionsMessage={() => "No country found"}
          />
          {errors.region && <p className="mt-1 text-sm font-semibold text-red-500">{errors.region}</p>}
        </div>
      </div>
    );
  }

  function renderStep1() {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="label">Farm Name *</label>
          <input value={form.farmName} onChange={e => update("farmName", e.target.value)}
            className="input" placeholder="Green Valley Farm" />
          {errors.farmName && <p className="mt-1 text-sm font-semibold text-red-500">{errors.farmName}</p>}
        </div>
        <div>
          <label className="label">Farm Area *</label>
          <input value={form.farmArea} onChange={e => update("farmArea", e.target.value)}
            className="input" placeholder="18 acres" />
          {errors.farmArea && <p className="mt-1 text-sm font-semibold text-red-500">{errors.farmArea}</p>}
        </div>
        <div>
          <label className="label">Main Crop *</label>
          <select value={form.crop} onChange={e => update("crop", e.target.value)} className="input">
            <option value="">Select crop</option>
            <option>Rice</option><option>Wheat</option><option>Corn</option><option>Tomato</option>
          </select>
          {errors.crop && <p className="mt-1 text-sm font-semibold text-red-500">{errors.crop}</p>}
        </div>
        <div>
          <label className="label">Soil Type *</label>
          <select value={form.soil} onChange={e => update("soil", e.target.value)} className="input">
            <option value="">Select soil type</option>
            <option>Loamy Soil</option><option>Clay Soil</option><option>Black Soil</option>
          </select>
          {errors.soil && <p className="mt-1 text-sm font-semibold text-red-500">{errors.soil}</p>}
        </div>
      </div>
    );
  }

  function renderStep2() {
    const activeFarm = farms[activeFarmIndex] || {};
    const activeArea = activeFarm.boundary ? calcArea(activeFarm.boundary) : null;

    return (
      <div className="space-y-4">
        <p className="text-base text-[#5A7A5A]">
          Define your farm boundaries on the map. Add multiple farms if needed.
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {farms.map((farm, idx) => (
            <button key={farm.id} onClick={() => { setActiveFarmIndex(idx); setDrawTool(null); }}
              className={"flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all " + (idx === activeFarmIndex ? "bg-[#2E7D32] text-white shadow" : "bg-white text-[#111827] border border-slate-200 hover:border-[#2E7D32]")}>
              <MapPin size={14} />
              {farm.farmName || "Farm " + (idx + 1)}
            </button>
          ))}
          <button onClick={handleAddFarm}
            className="flex items-center gap-1.5 rounded-lg border-2 border-dashed border-slate-300 px-3 py-2 text-sm font-semibold text-[#5A7A5A] hover:border-[#2E7D32] hover:text-[#2E7D32] transition-all">
            <Plus size={16} /> Add Farm
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-[180px]">
            <span className="label">Select Farm</span>
            <select value={activeFarmIndex} onChange={e => { setActiveFarmIndex(Number(e.target.value)); setDrawTool(null); setSelectedTemplate(""); }} className="input">
              {farms.map((f, i) => (
                <option key={f.id} value={i}>{f.farmName || "Farm " + (i + 1)}</option>
              ))}
            </select>
          </div>
          <div className="min-w-[220px]">
            <span className="label">Quick Template</span>
            <select value={selectedTemplate} onChange={e => handleTemplateSelect(e.target.value)} className="input">
              <option value="">-- Select for active farm --</option>
              {predefinedBoundaries.map((b, i) => <option key={i} value={i}>{b.label}</option>)}
            </select>
          </div>
        </div>

        <div className="relative h-[480px] overflow-hidden rounded-xl border border-slate-200 shadow-md">
          <MapContainer center={[28.6239, 77.219]} zoom={14} className="h-full w-full">
            <TileLayer key={mapLayer} url={LAYER_CONFIGS[mapLayer].url} attribution={LAYER_CONFIGS[mapLayer].attribution} />
            <FarmBoundaryLayer farms={farms} activeFarmIndex={activeFarmIndex} form={form} />
            <DrawInteraction farms={farms} setFarms={setFarms} activeFarmIndex={activeFarmIndex}
              drawTool={drawTool} setDrawTool={setDrawTool} onDrawingPoints={setDrawingPoints} />
            <FloatingToolbar drawTool={drawTool} setDrawTool={setDrawTool}
              farms={farms} setFarms={setFarms} activeFarmIndex={activeFarmIndex}
              mapLayer={mapLayer} setMapLayer={setMapLayer} />
          </MapContainer>
        </div>

        <p className="text-sm font-medium text-[#5A7A5A]">
          {drawTool === "polygon" && "Click to add vertices, double-click to finish."}

          {drawTool === "edit" && "Drag the green handles to adjust boundary points."}
          {!drawTool && "Select a drawing tool above to define your farm boundary."}
        </p>

        {drawingPoints.length > 0 && (
          <div className="rounded-lg border border-[#2E7D32]/20 bg-[#2E7D32]/5 px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#5A7A5A] uppercase tracking-wide">
                Drawing Points ({drawingPoints.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {drawingPoints.map((coord, i) => (
                <span key={i} className="text-xs font-mono text-[#111827]">
                  <span className="font-bold text-[#2E7D32]">P{i + 1}</span>: {coord[0]}, {coord[1]}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeFarm.boundary && activeFarm.boundary.length > 0 && (
          <div className="rounded-lg border border-[#2E7D32]/20 bg-[#2E7D32]/5 px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#5A7A5A] uppercase tracking-wide">
                Boundary Points ({activeFarm.boundary.length})
              </span>
              <div className="flex items-center gap-2">
                {activeArea && <span className="text-xs font-semibold text-[#2E7D32]">{activeArea.acres} ac</span>}
                <button onClick={() => updateFarm(activeFarmIndex, "boundary", null)}
                  className="text-xs font-semibold text-red-500 hover:text-red-700 transition">
                  Clear
                </button>
              </div>
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {activeFarm.boundary.map((coord, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2">
                  <span className="text-xs text-[#5A7A5A]">
                    <span className="font-semibold text-[#111827]">P{i + 1}:</span> {coord[0]}, {coord[1]}
                  </span>
                  <button onClick={() => removeBoundaryPoint(activeFarmIndex, i)}
                    className="text-red-400 hover:text-red-600 transition">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {errors.boundary && <p className="text-sm font-bold text-red-500">{errors.boundary}</p>}

        {(!activeFarm.boundary || activeFarm.boundary.length < 3) && (
          <p className="text-sm font-bold text-amber-600">
            {!activeFarm.boundary
              ? "Please add at least 3 boundary points for the active farm."
              : "Need " + (3 - activeFarm.boundary.length) + " more point(s)."}
          </p>
        )}
      </div>
    );
  }

  function renderStep3() {
    return (
      <div className="w-full space-y-3">
        <div className="flex items-center gap-3">
          <Check className="rounded-full bg-[#2E7D32] p-2 text-white shrink-0" size={40} />
          <h2 className="text-xl font-black text-[#111827]">Your farm is ready</h2>
        </div>
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {[
            ["Farmer", form.farmerName],
            ["Phone", form.phone],
            ["Region", form.region],
            ["Farm", form.farmName],
            ["Area", form.farmArea],
            ["Crop", form.crop],
            ["Soil", form.soil],
          ].map(function(pair) {
            var label = pair[0], value = pair[1];
            return (
              <div key={label} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                <span className="block text-[10px] font-semibold text-[#5A7A5A] uppercase tracking-wide">{label}</span>
                <span className="block text-sm font-bold text-[#111827] truncate">{value}</span>
              </div>
            );
          })}
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
          <span className="text-xs font-semibold text-[#5A7A5A] uppercase tracking-wide">Registered Farms</span>
          <div className="mt-2 space-y-1.5">
            {farms.map(function(farm, idx) {
              var area = farm.boundary ? calcArea(farm.boundary) : null;
              return (
                <div key={farm.id} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-slate-100 text-sm">
                  <div className="min-w-0 flex items-center gap-2">
                    <span className="font-bold text-[#111827] truncate">{farm.farmName || "Farm " + (idx + 1)}</span>
                    <span className="text-xs text-[#5A7A5A] whitespace-nowrap">
                      {farm.boundary ? farm.boundary.length + " pts" : "No boundary"}
                      {area ? " \xB7 " + area.acres + " ac" : ""}
                    </span>
                  </div>
                  <span className="text-xs text-[#5A7A5A] shrink-0 ml-2">
                    {farm.boundary ? farm.boundary[0][0] + ", " + farm.boundary[0][1] : "\u2014"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E7D32]">
              <Sprout size={22} className="text-white" />
            </div>
            <span className="text-lg font-bold text-[#111827]">Smart Agriculture</span>
          </div>
          <button onClick={() => { saveAndGo(); }} className="btn btn-ghost">
            Skip to Dashboard &rarr;
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#111827]">Set Up Your Farm</h1>
          <p className="mt-2 text-lg text-[#5A7A5A]">Fill in the details to get started with smart farming</p>
        </div>

        <div className="flex items-center justify-center gap-0 mb-12">
          {steps.map(function(item, index) {
            return (
              <div key={item.label} className="flex items-center">
                <button type="button" onClick={() => setStep(index)}
                  className={"flex h-12 w-12 items-center justify-center rounded-full text-base font-bold transition " + (index <= step ? "bg-[#2E7D32] text-white shadow-md" : "bg-white border-2 border-slate-200 text-slate-400")}>
                  {index + 1}
                </button>
                <span className={"ml-3 mr-6 text-sm font-semibold hidden sm:inline " + (index <= step ? "text-[#111827]" : "text-slate-400")}>
                  {item.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={"w-16 h-0.5 mr-6 " + (index < step ? "bg-[#2E7D32]" : "bg-slate-200")} />
                )}
              </div>
            );
          })}
        </div>

        <div className="card">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[rgba(46,125,50,0.1)]">
              <StepIcon size={30} className="text-[#2E7D32]" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827]">{steps[step].label}</h2>
          </div>
          {step === 0 && renderStep0()}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between mt-8 gap-3">
          <button type="button" onClick={goBack}
            className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-[#1B5E20] text-[#1B5E20] font-bold px-6 transition-all duration-[250ms] hover:bg-[#1B5E20] hover:text-white w-full sm:w-auto">
            <ChevronLeft size={20} /> {step === 0 ? "Skip" : "Back"}
          </button>
          <button type="button" onClick={goNext}
            className={"flex items-center justify-center h-12 rounded-xl font-bold transition-all duration-[250ms] w-full sm:w-auto bg-[#1B5E20] text-white " + (isValid(step) ? "hover:bg-[#0D3B0F] shadow-lg scale-100 hover:scale-[1.02] cursor-pointer" : "opacity-50 cursor-not-allowed")}>
            <span className="flex items-center gap-2 px-6">
              {step === steps.length - 1 ? "Open Dashboard" : "Next"} <ChevronRight size={20} />
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Onboarding;
