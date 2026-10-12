import { useEffect, useRef, useState } from "react";
import { formatCount } from "@/lib/public-stats";

type MotionStatus = "presentada" | "aprobada" | "rechazada" | "no presentada";
type MotionRecord = {
  municipio: string;
  provincia: string;
  estado: string;
  mociones: number;
  motionStatus: MotionStatus;
};
type MotionMapData = { ok: boolean; total: number; records: MotionRecord[]; error?: string };

const STATUS: Record<MotionStatus, { label: string; color: string }> = {
  presentada: { label: "Presentada", color: "#2586d8" },
  aprobada: { label: "Aprobada", color: "#39a34a" },
  rechazada: { label: "Rechazada", color: "#e53935" },
  "no presentada": { label: "No presentada", color: "#ffffff" },
};

const IGN_STYLE = "https://vt-unidades-administrativas.ign.es/demo/style_s3_cloud.json";
const OSM_TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

declare global {
  interface Window { maplibregl?: any }
}

function loadMapLibre(): Promise<any> {
  if (window.maplibregl) return Promise.resolve(window.maplibregl);
  return new Promise((resolve, reject) => {
    if (!document.getElementById("pd-maplibre-css")) {
      const link = document.createElement("link");
      link.id = "pd-maplibre-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.css";
      document.head.appendChild(link);
    }
    const existing = document.getElementById("pd-maplibre-js") as HTMLScriptElement | null;
    const finish = () => window.maplibregl ? resolve(window.maplibregl) : reject(new Error("No se ha podido cargar MapLibre."));
    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener("error", () => reject(new Error("Error al cargar MapLibre.")), { once: true });
      if (window.maplibregl) resolve(window.maplibregl);
      return;
    }
    const script = document.createElement("script");
    script.id = "pd-maplibre-js";
    script.src = "https://unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.js";
    script.onload = finish;
    script.onerror = () => reject(new Error("Error al cargar MapLibre."));
    document.head.appendChild(script);
  });
}

function normalize(value: unknown) {
  return String(value ?? "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}


const MUNICIPALITY_ALIASES: Record<string, string[]> = {
  "alacant alicante": ["alicante", "alacant"],
  "elx elche": ["elche", "elx"],
  "alcoi alcoy": ["alcoy", "alcoi"],
  "sagunt sagunto": ["sagunto", "sagunt"],
  "sant vicent del raspeig san vicente del raspeig": ["san vicente del raspeig", "sant vicent del raspeig"],
  "astillero el": ["el astillero", "astillero"],
  "garriga la": ["la garriga", "garriga"],
  "hospitalet de llobregat l": ["l hospitalet de llobregat", "hospitalet de llobregat"],
  "coruna a": ["a coruna", "la coruna"],
  "palmas de gran canaria las": ["las palmas de gran canaria", "palmas de gran canaria"],
  "ejido el": ["el ejido", "ejido"],
  "puerto de santa maria el": ["el puerto de santa maria", "puerto de santa maria"],
  "roz as de madrid las": ["las rozas de madrid", "rozas de madrid"],
};

function municipalityVariants(value: string) {
  const normalized = normalize(value);
  const aliases = MUNICIPALITY_ALIASES[normalized] || [];
  const variants = [normalized, ...aliases.map(normalize)];
  if (normalized.includes(" ")) variants.push(normalized.replace(/^(el|la|los|las) /, ""));
  return Array.from(new Set(variants.filter(Boolean)));
}

function normalizeStatus(value: unknown): MotionStatus {
  const status = normalize(value);
  if (status.startsWith("aprob") || status.startsWith("acept")) return "aprobada";
  if (status.startsWith("rechaz") || status.startsWith("deneg") || status.startsWith("no aprob")) return "rechazada";
  if (status.startsWith("present") || status.startsWith("registr") || status.startsWith("tramit")) return "presentada";
  return "no presentada";
}

function escapeHtml(value: unknown) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function provinceCodeForName(value: string) {
  const codes: Record<string, string> = {
    alava:"01", araba:"01", albacete:"02", alicante:"03", alacant:"03", almeria:"04", asturias:"33", avila:"05",
    badajoz:"06", baleares:"07", "illes balears":"07", barcelona:"08", burgos:"09", caceres:"10", cadiz:"11",
    cantabria:"39", castellon:"12", castello:"12", "ciudad real":"13", cordoba:"14", cuenca:"16", girona:"17",
    gerona:"17", granada:"18", guadalajara:"19", guipuzcoa:"20", gipuzkoa:"20", huelva:"21", huesca:"22",
    jaen:"23", "la coruna":"15", "a coruna":"15", lleida:"25", lerida:"25", leon:"24", lugo:"27", madrid:"28",
    malaga:"29", murcia:"30", navarra:"31", ourense:"32", palencia:"34", "las palmas":"35", pontevedra:"36",
    "la rioja":"26", rioja:"26", salamanca:"37", "santa cruz de tenerife":"38", segovia:"40", sevilla:"41",
    soria:"42", tarragona:"43", teruel:"44", toledo:"45", valencia:"46", valladolid:"47", vizcaya:"48",
    bizkaia:"48", zamora:"49", zaragoza:"50", ceuta:"51", melilla:"52"
  };
  return codes[normalize(value)] || "";
}

function findMunicipalityLayer(map: any) {
  const style = map.getStyle();
  const sources = style.sources || {};
  const ids = Object.keys(sources).filter((id) => (sources[id]?.tiles || []).some((tile: string) => String(tile).includes("vt-unidades-administrativas.ign.es")));
  const layers = style.layers || [];
  const candidates = layers.filter((layer: any) => layer.type === "fill" && ids.includes(layer.source) && layer["source-layer"]);
  const fallback = layers.filter((layer: any) => layer.source && ids.includes(layer.source) && layer["source-layer"]);
  const layer = candidates[0] || fallback[0];
  return layer ? { source: layer.source, sourceLayer: layer["source-layer"] } : null;
}

export function MunicipalMotionsMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [data, setData] = useState<MotionMapData | null>(null);
  const [statusFilter, setStatusFilter] = useState<MotionStatus | "todas">("todas");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/mociones-municipios", { cache: "default" })
      .then(async (response) => {
        const json = await response.json().catch(() => null);
        if (!response.ok || !json?.ok) throw new Error(String(json?.error || `No se han podido obtener los datos del mapa (HTTP ${response.status}).`));
        return json as MotionMapData;
      })
      .then((json) => { if (active) setData(json); })
      .catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : "No se ha podido cargar el mapa."); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!mapElement.current || !data?.ok) return;
    let active = true;
    let map: any;
    loadMapLibre().then((ml) => {
      if (!active || !mapElement.current) return;
      map = new ml.Map({
        container: mapElement.current,
        style: IGN_STYLE,
        center: [-3.7, 40.2],
        zoom: 5.5,
        attributionControl: true,
      });
      mapRef.current = map;
      map.addControl(new ml.NavigationControl(), "top-left");

      map.on("load", () => {
        if (!active) return;
        // Misma vista inicial que el mapa V14: España completa, con Canarias visible.
        map.fitBounds([[-18.5, 27.5], [4.4, 43.9]], {
          padding: { top: 48, right: 48, bottom: 48, left: 48 },
          duration: 0,
          maxZoom: 5.5,
        });
        try {
          map.addSource("pd-osm-base", { type: "raster", tiles: [OSM_TILES], tileSize: 256, attribution: "&copy; OpenStreetMap contributors" });
          const firstLayer = map.getStyle().layers?.[0];
          map.addLayer({ id: "pd-osm-base", type: "raster", source: "pd-osm-base", paint: { "raster-opacity": 0.32 } }, firstLayer?.id);
        } catch { /* La cartografía oficial del IGN sigue disponible sin la base OSM. */ }

        const info = findMunicipalityLayer(map);
        if (!info) {
          setError("No se ha localizado la capa vectorial municipal del IGN.");
          return;
        }
        // IGN puede devolver los nombres municipales con mayúsculas distintas a las del
        // registro de mociones. Las expresiones de MapLibre distinguen mayúsculas/minúsculas,
        // así que comparamos en minúsculas tanto para el filtro como para el color.
        const colorByName: Record<string, string> = {};
        data.records.forEach((record) => {
          municipalityVariants(record.municipio).forEach((name) => {
            colorByName[name] = STATUS[record.motionStatus].color;
          });
        });
        const filterNames = Object.keys(colorByName);
        const normalizedFeatureName: any = ["to-string", ["get", "nameunit"]];
        const nameMatch: any = ["match", ["downcase", normalizedFeatureName], filterNames, true, false];
        const colorMatch: any = ["match", ["downcase", normalizedFeatureName]];
        Object.entries(colorByName).forEach(([name, color]) => {
          colorMatch.push(name, color);
        });
        colorMatch.push("#00000000");

        map.addLayer({
          id: "pd-municipal-motions-fill",
          type: "fill",
          source: info.source,
          "source-layer": info.sourceLayer,
          filter: nameMatch,
          paint: {
            "fill-color": colorMatch,
            "fill-opacity": ["case", ["==", statusFilter, "todas"], 0.68, 0.68],
          },
        });
        map.addLayer({
          id: "pd-municipal-motions-outline",
          type: "line",
          source: info.source,
          "source-layer": info.sourceLayer,
          filter: nameMatch,
          paint: { "line-color": "#334155", "line-width": 0.7, "line-opacity": 0.75 },
        });

        map.on("click", "pd-municipal-motions-fill", (event: any) => {
          const feature = event.features?.[0];
          if (!feature) return;
          const name = String(feature.properties?.nameunit || "").trim();
          const nationalCode = String(feature.properties?.nationalcode || "");
          const provinceCode = nationalCode.length >= 6 ? nationalCode.substring(4, 6) : "";
          const candidates = data.records.filter((record) => normalize(record.municipio) === normalize(name));
          const record = candidates.length > 1 && provinceCode
            ? candidates.find((item) => provinceCodeForName(item.provincia) === provinceCode) || candidates[0]
            : candidates[0];
          if (!record) return;
          const html = `<div style="min-width:190px"><strong style="font-size:18px">${escapeHtml(record.municipio)}</strong><div style="font-size:12px;color:#666;margin-top:8px">Estado de la moción</div><div style="font-size:16px;margin-top:4px">${escapeHtml(record.estado || STATUS[record.motionStatus].label)}</div>${record.provincia ? `<div style="font-size:12px;color:#666;margin-top:8px">${escapeHtml(record.provincia)}</div>` : ""}${record.mociones > 1 ? `<div style="font-size:12px;margin-top:6px">${formatCount(record.mociones)} mociones</div>` : ""}<div style="font-size:12px;color:#666;margin-top:8px">Moción registrada en Plataforma Dorada</div></div>`;
          new ml.Popup({ closeButton: true, maxWidth: "320px" }).setLngLat(event.lngLat).setHTML(html).addTo(map);
        });
        map.on("mouseenter", "pd-municipal-motions-fill", () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", "pd-municipal-motions-fill", () => { map.getCanvas().style.cursor = ""; });
      });
      map.on("error", (event: any) => { if (event?.error?.message) console.warn("MapLibre:", event.error.message); });
    }).catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : "No se ha podido cargar el mapa interactivo."); });

    return () => {
      active = false;
      if (map) map.remove();
      mapRef.current = null;
    };
  }, [data]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer("pd-municipal-motions-fill") || !data) return;
    const visibleRecords = statusFilter === "todas" ? data.records : data.records.filter((record) => record.motionStatus === statusFilter);
    const names = Array.from(new Set(visibleRecords.flatMap((record) => municipalityVariants(record.municipio))));
    const normalizedName = ["downcase", ["to-string", ["get", "nameunit"]]];
    map.setFilter("pd-municipal-motions-fill", ["match", normalizedName, names, true, false]);
    map.setFilter("pd-municipal-motions-outline", ["match", normalizedName, names, true, false]);
  }, [statusFilter, data]);

  return (
    <div className="space-y-4">
      {!data && !error && <p className="text-sm text-muted-foreground" role="status">Cargando datos de mociones…</p>}
      {error && <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm" role="alert">{error}</p>}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="relative">
          <div ref={mapElement} className="h-[68vh] min-h-[480px] w-full bg-[#e7edf0]" role="application" aria-label="Mapa interactivo de mociones por municipio" />
          <aside className="absolute right-3 top-3 z-[500] max-h-[calc(100%-24px)] w-56 overflow-y-auto rounded-xl border border-black/10 bg-white/95 p-4 shadow-lg sm:right-5 sm:top-5" aria-label="Leyenda del mapa">
            <h3 className="mb-3 font-semibold text-gray-900">Estado de las mociones</h3>
            <div className="space-y-3 text-sm text-gray-800">
              {(Object.keys(STATUS) as MotionStatus[]).map((key) => <button type="button" key={key} onClick={() => setStatusFilter(statusFilter === key ? "todas" : key)} className={`flex w-full items-center gap-2 rounded-md text-left ${statusFilter === key ? "font-bold" : ""}`} aria-pressed={statusFilter === key}><span className="size-3.5 shrink-0 rounded-sm border border-gray-300" style={{ backgroundColor: STATUS[key].color }} />{STATUS[key].label}</button>)}
            </div>
            <div className="mt-4 border-t border-gray-200 pt-3 text-xs text-gray-600">{data ? `${formatCount(data.records.length)} municipios con mociones` : "Cargando registros…"}</div>
            <p className="mt-2 text-[10px] text-gray-500">Cartografía vectorial oficial: IGN/CNIG</p>
          </aside>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">El mapa utiliza las teselas vectoriales oficiales del IGN/CNIG y las carga bajo demanda al mover o ampliar el mapa. Azul: presentada; verde: aprobada; rojo: rechazada. El filtro permite aislar cada estado.</p>
    </div>
  );
}
