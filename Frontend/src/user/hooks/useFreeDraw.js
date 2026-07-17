import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";

function perpendicularDist(p, a, b) {
  const [x0, y0] = p, [x1, y1] = a, [x2, y2] = b;
  const num = Math.abs((x2 - x1) * (y1 - y0) - (x1 - x0) * (y2 - y1));
  const den = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return den === 0 ? 0 : num / den;
}

function simplifyPolygon(points, tolerance) {
  if (points.length <= 2) return points;
  let maxDist = 0, maxIdx = 0;
  const first = points[0], last = points[points.length - 1];
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDist(points[i], first, last);
    if (d > maxDist) { maxDist = d; maxIdx = i; }
  }
  if (maxDist > tolerance) {
    const left = simplifyPolygon(points.slice(0, maxIdx + 1), tolerance);
    const right = simplifyPolygon(points.slice(maxIdx), tolerance);
    return [...left.slice(0, -1), ...right];
  }
  return [first, last];
}

export function useFreeDraw({ map, active, tolerance = 0.00005, onComplete }) {
  const layerRef = useRef(new L.LayerGroup());
  const drawingRef = useRef(false);
  const ptsRef = useRef([]);

  const cleanupLayer = useCallback(() => {
    try { layerRef.current.clearLayers(); } catch (_) {}
    ptsRef.current.length = 0;
    drawingRef.current = false;
  }, []);

  useEffect(() => {
    if (!map) return;
    const layer = layerRef.current;
    try { layer.addTo(map); } catch (_) {}
    return () => { try { map.removeLayer(layer); } catch (_) {} };
  }, [map]);

  useEffect(() => {
    if (!map) return;
    if (!active) {
      cleanupLayer();
      return;
    }

    try { map.doubleClickZoom.disable(); } catch (_) {}
    try { map.dragging.disable(); } catch (_) {}

    const onMouseDown = (e) => {
      if (e.originalEvent.button !== 0) return;
      drawingRef.current = true;
      ptsRef.current.length = 0;
      ptsRef.current.push([e.latlng.lat, e.latlng.lng]);
      try { layerRef.current.clearLayers(); } catch (_) {}
    };

    const onMouseMove = (e) => {
      if (!drawingRef.current) return;
      ptsRef.current.push([e.latlng.lat, e.latlng.lng]);
      try { layerRef.current.clearLayers(); } catch (_) {}
      try {
        L.polyline([...ptsRef.current], { color: "#2E7D32", weight: 3, opacity: 0.7 }).addTo(layerRef.current);
      } catch (_) {}
    };

    const onMouseUp = () => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      const pts = ptsRef.current;
      try {
        const simplified = simplifyPolygon(pts, tolerance);
        if (simplified.length >= 3) {
          const boundary = simplified.map(p => [p[0].toFixed(6), p[1].toFixed(6)]);
          layerRef.current.clearLayers();
          L.polygon(boundary.map(c => [parseFloat(c[0]), parseFloat(c[1])]), {
            color: "#2E7D32", weight: 2, fillColor: "#2E7D32", fillOpacity: 0.12,
          }).addTo(layerRef.current);
          if (onComplete) onComplete(boundary);
        } else {
          layerRef.current.clearLayers();
        }
      } catch (_) {
        try { layerRef.current.clearLayers(); } catch (_) {}
      }
      pts.length = 0;
    };

    map.on("mousedown", onMouseDown);
    map.on("mousemove", onMouseMove);
    map.on("mouseup", onMouseUp);

    return () => {
      map.off("mousedown", onMouseDown);
      map.off("mousemove", onMouseMove);
      map.off("mouseup", onMouseUp);
      try { map.dragging.enable(); } catch (_) {}
      try { map.doubleClickZoom.enable(); } catch (_) {}
      cleanupLayer();
    };
  }, [map, active, tolerance, onComplete, cleanupLayer]);

  return { clear: cleanupLayer };
}
