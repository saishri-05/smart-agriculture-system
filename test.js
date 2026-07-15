import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, Crosshair, Eraser, MapPin, Maximize2, MousePointer2, Navigation, Pen, Pencil, Plus, Sprout, Trash2, UserRound, Wheat } from "lucide-react";
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

function generateId() {
  return "farm_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
}

function calcArea(boundary) {
  if (!boundary || boundary.length < 3) return { sqMeters: 0, acres: 0, hectares: 0 };
  var pts = boundary.map(function(c) { return [parseFloat(c[0]), parseFloat(c[1])]; });
  var sqMeters = L.polygon(pts).getArea();
  return {
    sqMeters: Math.round(sqMeters),
    acres: parseFloat((sqMeters / 4046.86).toFixed(2)),
    hectares: parseFloat((sqMeters / 10000).toFixed(2)),
  };
}
