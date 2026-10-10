import { useEffect, useMemo, useState } from "react";
import { formatCount } from "@/lib/public-stats";

type MotionStatus = "presentada" | "aprobada" | "rechazada";
type Feature = {
  type: "Feature";
  properties?: Record<string, unknown>;
  geometry?: { type: string; coordinates: any };
};
type MotionMapData = {
  ok: boolean;
  total: number;
  features: Feature[];
  error?: string;
};

const STATUS = {
  presentada: { label: "Moción presentada", fill: "#B8792A", text: "#fff" },
  aprobada: { label: "Moción aprobada", fill: "#6D7F35", text: "#fff" },
  rechazada: { label: "Moción rechazada", fill: "#8A4F2A", text: "#fff" },
} as const;

function project(lon: number, lat: number, box: { minX: number; maxX: number; minY: number; maxY: number }) {
  const width = 1100;
  const height = 620;
  const pad = 26;
  const scale = Math.min((width - pad * 2) / (box.maxX - box.minX), (height - pad * 2) / (box.maxY - box.minY));
  return [pad + (lon - box.minX) * scale, height - pad - (lat - box.minY) * scale] as const;
}

function coordinatesToPath(coords: any, box: { minX: number; maxX: number; minY: number; maxY: number }) {
  if (!Array.isArray(coords)) return "";
  if (typeof coords[0] === "number") {
    const [x, y] = project(Number(coords[0]), Number(coords[1]), box);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return coords.map((part: any) => {
    if (Array.isArray(part) && part.length && typeof part[0]?.[0] === "number") {
      const points = part.map((p: any) => coordinatesToPath(p, box)).join(" ");
      return points ? `M ${points.replace(/ /g, " L ")} Z` : "";
    }
    return coordinatesToPath(part, box);
  }).join(" ");
}

function geometryPath(feature: Feature, box: { minX: number; maxX: number; minY: number; maxY: number }) {
  const g = feature.geometry;
  if (!g) return "";
  if (g.type === "Polygon") return coordinatesToPath(g.coordinates, box);
  if (g.type === "MultiPolygon") return (g.coordinates || []).map((p: any) => coordinatesToPath(p, box)).join(" ");
  return "";
}

function getName(feature: Feature) {
  const p = feature.properties || {};
  return String(p.NAMEUNIT ?? p.name ?? p.NOMBRE ?? p.municipio ?? "Municipio");
}

function getStatus(feature: Feature): MotionStatus | null {
  const p = feature.properties || {};
  const s = String(p.motionStatus ?? "").toLowerCase();
  return s === "aprobada" || s === "rechazada" || s === "presentada" ? s : null;
}

function getCount(feature: Feature) {
  return Number(feature.properties?.motionCount ?? 0);
}

export function MunicipalMotionsMap() {
  const [data, setData] = useState<MotionMapData | null>(null);
  const [selected, setSelected] = useState<Feature | null>(null);
  const [statusFilter, setStatusFilter] = useState<MotionStatus | "todas">("todas");

  useEffect(() => {
    let active = true;
    fetch("/api/mociones-municipios", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => { if (active) setData(json); })
      .catch(() => { if (active) setData({ ok: false, total: 0, features: [], error: "No se ha podido cargar el mapa." }); });
    return () => { active = false; };
  }, []);

  const features = useMemo(() => data?.features ?? [], [data]);
  const box = useMemo(() => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    const visit = (c: any) => {
      if (Array.isArray(c) && typeof c[0] === "number") { minX = Math.min(minX, c[0]); maxX = Math.max(maxX, c[0]); minY = Math.min(minY, c[1]); maxY = Math.max(maxY, c[1]); return; }
      if (Array.isArray(c)) c.forEach(visit);
    };
    features.forEach((f) => visit(f.geometry?.coordinates));
    if (!Number.isFinite(minX)) return { minX: -10, maxX: 4.5, minY: 27, maxY: 44.5 };
    return { minX, maxX, minY, maxY };
  }, [features]);

  const visible = useMemo(() => features.filter((f) => statusFilter === "todas" || getStatus(f) === statusFilter), [features, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar mociones">
        <button type="button" onClick={() => setStatusFilter("todas")} className={`rounded-full px-4 py-2 text-sm font-semibold ${statusFilter === "todas" ? "bg-primary text-primary-foreground" : "glass-soft text-primary"}`}>Todas</button>
        {(Object.keys(STATUS) as MotionStatus[]).map((key) => <button key={key} type="button" onClick={() => setStatusFilter(key)} className={`rounded-full px-4 py-2 text-sm font-semibold ${statusFilter === key ? "text-white" : "glass-soft text-primary"}`} style={statusFilter === key ? { backgroundColor: STATUS[key].fill } : undefined}>{STATUS[key].label}</button>)}
      </div>
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <svg viewBox="0 0 1100 620" role="img" aria-label="Mapa de mociones presentadas en ayuntamientos de España" className="block min-w-[760px] w-full h-auto bg-[#f1e3cb]">
            <title>Mapa de mociones en ayuntamientos</title>
            <desc>Los municipios con una moción registrada se colorean según su situación: presentada, aprobada o rechazada. Los demás municipios quedan sin color.</desc>
            {features.map((feature, i) => {
              const status = getStatus(feature);
              const path = geometryPath(feature, box);
              if (!path) return null;
              const active = Boolean(status && (statusFilter === "todas" || statusFilter === status));
              const count = getCount(feature);
              return <path key={`${getName(feature)}-${i}`} d={path} fill={active && status ? STATUS[status].fill : "#d9c09c"} fillOpacity={active ? 1 : 1} stroke="#fffaf0" strokeWidth="0.5" vectorEffect="non-scaling-stroke" onClick={() => status && setSelected(feature)} onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && status) { e.preventDefault(); setSelected(feature); } }} tabIndex={status ? 0 : -1} aria-label={status ? `${getName(feature)}: ${STATUS[status].label}${count > 1 ? `, ${count} mociones` : ""}` : `${getName(feature)}: sin moción registrada`} />;
            })}
          </svg>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border bg-card px-5 py-4 text-sm">
          <strong>Leyenda</strong>
          {(Object.keys(STATUS) as MotionStatus[]).map((key) => <span key={key} className="inline-flex items-center gap-2"><span className="size-4 rounded-sm" style={{ backgroundColor: STATUS[key].fill }} aria-hidden="true" />{STATUS[key].label}</span>)}
          <span className="inline-flex items-center gap-2"><span className="size-4 rounded-sm border border-border bg-transparent" aria-hidden="true" />Sin moción registrada</span>
        </div>
      </div>
      {selected && getStatus(selected) && (
        <div className="rounded-2xl border border-border bg-card p-5" role="status">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Ayuntamiento</p>
              <h3 className="mt-1 font-display text-2xl font-semibold">{getName(selected)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{STATUS[getStatus(selected)!].label} · {formatCount(getCount(selected))} {getCount(selected) === 1 ? "moción" : "mociones"}</p>
            </div>
            <button type="button" className="rounded-full glass-soft px-4 py-2 text-sm font-semibold text-primary" onClick={() => setSelected(null)}>Cerrar</button>
          </div>
        </div>
      )}
      {!data && <p className="text-sm text-muted-foreground" role="status">Cargando mapa…</p>}
      {data && !data.ok && <p className="text-sm text-muted-foreground" role="status">{data.error || "No se ha podido cargar el mapa."}</p>}
    </div>
  );
}
