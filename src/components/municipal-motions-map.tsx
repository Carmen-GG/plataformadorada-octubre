import { useEffect, useRef, useState } from "react";
import { formatCount } from "@/lib/public-stats";

type MotionStatus = "presentada" | "aprobada" | "rechazada";
type Feature = {
  type: "Feature";
  properties?: Record<string, unknown>;
  geometry?: { type: string; coordinates: any };
};
type MotionMapData = { ok: boolean; total: number; features: Feature[]; error?: string };

const STATUS: Record<MotionStatus, { label: string; color: string }> = {
  presentada: { label: "Presentada", color: "#2586d8" },
  aprobada: { label: "Aprobada", color: "#39a34a" },
  rechazada: { label: "Rechazada", color: "#e53935" },
};
const NO_STATUS = "#ffffff";

declare global {
  interface Window { L?: any }
}

function loadLeaflet(): Promise<any> {
  if (window.L) return Promise.resolve(window.L);
  return new Promise((resolve, reject) => {
    const cssId = "pd-leaflet-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    const existing = document.getElementById("pd-leaflet-js") as HTMLScriptElement | null;
    const finish = () => window.L ? resolve(window.L) : reject(new Error("No se ha podido cargar la librería cartográfica."));
    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener("error", () => reject(new Error("Error al cargar Leaflet.")), { once: true });
      if (window.L) resolve(window.L);
      return;
    }
    const script = document.createElement("script");
    script.id = "pd-leaflet-js";
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = finish;
    script.onerror = () => reject(new Error("Error al cargar Leaflet."));
    document.body.appendChild(script);
  });
}

function normalizeStatus(value: unknown): MotionStatus | null {
  const status = String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  if (status.startsWith("aprob") || status.startsWith("acept")) return "aprobada";
  if (status.startsWith("rechaz") || status.startsWith("deneg") || status.startsWith("no aprob")) return "rechazada";
  if (status.startsWith("present")) return "presentada";
  return null;
}

function featureName(feature: Feature) {
  const p = feature.properties || {};
  return String(p.NAMEUNIT ?? p.name ?? p.NOMBRE ?? p.municipio ?? "Municipio");
}

function featureStatus(feature: Feature): MotionStatus | null {
  return normalizeStatus(feature.properties?.motionStatus);
}

export function MunicipalMotionsMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const [data, setData] = useState<MotionMapData | null>(null);
  const [statusFilter, setStatusFilter] = useState<MotionStatus | "todas">("todas");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/mociones-municipios", { cache: "no-store" })
      .then((response) => { if (!response.ok) throw new Error("No se han podido obtener los datos del mapa."); return response.json(); })
      .then((json) => { if (active) setData(json); })
      .catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : "No se ha podido cargar el mapa."); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!mapElement.current || !data?.ok || !data.features.length) return;
    let active = true;
    let map: any;
    loadLeaflet().then((L) => {
      if (!active || !mapElement.current) return;
      map = L.map(mapElement.current, { zoomControl: true, scrollWheelZoom: true, preferCanvas: true });
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const geoJson = { type: "FeatureCollection", features: data.features };
      const layer = L.geoJSON(geoJson, {
        style: (feature: Feature) => {
          const status = featureStatus(feature);
          const visible = statusFilter === "todas" || status === statusFilter;
          return {
            color: "#ffffff",
            weight: 0.6,
            opacity: 0.95,
            fillColor: status ? STATUS[status].color : NO_STATUS,
            fillOpacity: visible && status ? 0.78 : 0.18,
          };
        },
        onEachFeature: (feature: Feature, leafletLayer: any) => {
          const status = featureStatus(feature);
          const statusLabel = status ? STATUS[status].label : "No presentada";
          const province = String(feature.properties?.motionProvince ?? "");
          const count = Number(feature.properties?.motionCount ?? 0);
          const detail = status
            ? `<div style="font-size:12px;color:#666;margin-top:8px">Estado de la moción</div><div style="font-size:16px;margin-top:4px">${statusLabel}</div>${province ? `<div style="font-size:12px;color:#666;margin-top:8px">${province}</div>` : ""}${count > 1 ? `<div style="font-size:12px;margin-top:6px">${formatCount(count)} mociones</div>` : ""}`
            : '<div style="font-size:12px;color:#666;margin-top:8px">Estado de la moción</div><div style="font-size:16px;margin-top:4px">No presentada</div><div style="font-size:12px;color:#666;margin-top:6px">No consta ninguna moción registrada.</div>';
          const safeName = featureName(feature).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] || char);
          leafletLayer.bindPopup(`<div style="min-width:180px"><strong style="font-size:18px">${safeName}</strong>${detail}</div>`);
          leafletLayer.on("mouseover", () => leafletLayer.setStyle({ weight: 2, color: "#333" }));
          leafletLayer.on("mouseout", () => layer.resetStyle(leafletLayer));
        },
      }).addTo(map);
      layerRef.current = layer;
      const bounds = layer.getBounds();
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [12, 12] });
    }).catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : "No se ha podido cargar el mapa interactivo."); });

    return () => {
      active = false;
      if (map) map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, [data]);

  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!L || !map || !layer) return;
    layer.eachLayer((item: any) => {
      const status = featureStatus(item.feature as Feature);
      const visible = statusFilter === "todas" || status === statusFilter;
      item.setStyle({
        color: "#ffffff",
        weight: 0.6,
        fillColor: status ? STATUS[status].color : NO_STATUS,
        fillOpacity: visible && status ? 0.78 : 0.18,
      });
    });
  }, [statusFilter]);

  return (
    <div className="space-y-4">
      {!data && !error && <p className="text-sm text-muted-foreground" role="status">Cargando mapa municipal…</p>}
      {error && <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm" role="alert">{error}</p>}
      {data && !data.ok && <p className="text-sm text-muted-foreground" role="status">{data.error || "No se ha podido cargar el mapa."}</p>}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="relative">
          <div ref={mapElement} className="h-[68vh] min-h-[480px] w-full bg-[#e7edf0]" role="application" aria-label="Mapa interactivo de mociones por municipio" />
          <aside className="absolute right-3 top-3 z-[500] max-h-[calc(100%-24px)] w-56 overflow-y-auto rounded-xl border border-black/10 bg-white/95 p-4 shadow-lg sm:right-5 sm:top-5" aria-label="Leyenda del mapa">
            <h3 className="mb-3 font-semibold text-gray-900">Estado de las mociones</h3>
            <div className="space-y-3 text-sm text-gray-800">
              {(Object.keys(STATUS) as MotionStatus[]).map((key) => <button type="button" key={key} onClick={() => setStatusFilter(statusFilter === key ? "todas" : key)} className={`flex w-full items-center gap-2 rounded-md text-left ${statusFilter === key ? "font-bold" : ""}`} aria-pressed={statusFilter === key}><span className="size-3.5 shrink-0 rounded-full" style={{ backgroundColor: STATUS[key].color }} />{STATUS[key].label}</button>)}
              <button type="button" onClick={() => setStatusFilter("todas")} className={`flex w-full items-center gap-2 rounded-md text-left ${statusFilter === "todas" ? "font-bold" : ""}`} aria-pressed={statusFilter === "todas"}><span className="size-3.5 shrink-0 rounded-full border border-gray-400 bg-white" />No presentada</button>
            </div>
            <div className="mt-4 border-t border-gray-200 pt-3 text-xs text-gray-600">{data ? `${formatCount(data.features.filter((f) => featureStatus(f as Feature)).length)} municipios con estado registrado` : "Cargando municipios…"}</div>
            <p className="mt-2 text-[10px] text-gray-500">Cartografía base: OpenStreetMap</p>
          </aside>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">El color indica el estado registrado de la moción. Los municipios sin registro aparecen en blanco. Cartografía base: OpenStreetMap.</p>
    </div>
  );
}
