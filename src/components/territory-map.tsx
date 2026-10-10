import { useState } from "react";
import { formatCount, type PublicStats } from "@/lib/public-stats";

type MetricKey = "adhesiones" | "entidades" | "mocionesPresentadas" | "mocionesAceptadas" | "testimonios";
const METRICS: Array<{ key: MetricKey; label: string }> = [
  { key: "adhesiones", label: "Adhesiones individuales" },
  { key: "entidades", label: "Entidades adheridas" },
  { key: "mocionesPresentadas", label: "Mociones presentadas" },
  { key: "mocionesAceptadas", label: "Mociones aprobadas" },
  { key: "testimonios", label: "Testimonios" },
];

const POINTS: Record<string, { x: number; y: number; label?: string }> = {
  Galicia: { x: 274, y: 70 },
  Asturias: { x: 390, y: 30 },
  Cantabria: { x: 484, y: 40 },
  "País Vasco": { x: 550, y: 53 },
  Navarra: { x: 605, y: 77 },
  "La Rioja": { x: 560, y: 93 },
  Castilla_y_Leon: { x: 444, y: 140, label: "Castilla y León" },
  Aragón: { x: 651, y: 187 },
  Cataluña: { x: 762, y: 133 },
  Madrid: { x: 499, y: 227 },
  "Castilla-La Mancha": { x: 535, y: 293 },
  Extremadura: { x: 383, y: 300 },
  "Comunitat Valenciana": { x: 651, y: 287 },
  Murcia: { x: 615, y: 393 },
  Andalucía: { x: 444, y: 440 },
  "Illes Balears": { x: 817, y: 281 },
  Canarias: { x: 164, y: 604 },
  Ceuta: { x: 425, y: 604 },
  Melilla: { x: 497, y: 604 },
};

const MAP_BASE_URL = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Blank_Spain_Map_(Autonomous_Communities).svg";

function displayName(name: string) {
  return POINTS[name]?.label ?? name;
}

function normalizeCommunity(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function findCommunityValue<T>(record: Record<string, T> | undefined, community: string): T | undefined {
  if (!record) return undefined;
  const wanted = normalizeCommunity(community);
  const key = Object.keys(record).find((candidate) => normalizeCommunity(candidate) === wanted);
  return key ? record[key] : undefined;
}

function valueFor(stats: PublicStats, community: string, key: MetricKey) {
  if (key === "testimonios") return Number(findCommunityValue(stats.testimoniosPorComunidad, community) ?? 0);
  if (key.startsWith("mociones")) {
    const row = findCommunityValue(stats.mociones, community);
    return Number(row?.[key] ?? 0);
  }
  const row = findCommunityValue(stats.porComunidad, community);
  return Number(row?.[key] ?? 0);
}

function fill(value: number, max: number) {
  if (max <= 0) return "var(--map-land)";
  const ratio = Math.max(0, Math.min(1, value / max));
  // Use a strong gold-to-brown scale with a defined base color; never fall back to black.
  const pct = Math.round(28 + ratio * 72);
  return `color-mix(in oklab, var(--map-deep) ${pct}%, var(--map-light))`;
}

const LEGEND_STEPS = [
  { label: "Muy bajo", pct: 28 },
  { label: "Bajo", pct: 42 },
  { label: "Medio", pct: 56 },
  { label: "Alto", pct: 70 },
  { label: "Muy alto", pct: 85 },
  { label: "Máximo", pct: 100 },
];

export function TerritoryMap({ stats }: { stats: PublicStats | null }) {
  const [metric, setMetric] = useState<MetricKey>("adhesiones");
  const communities = Object.keys(POINTS);
  // Recalcular directamente en cada render: evita conservar valores vacíos si la respuesta
  // del CMS llega después del primer render y el mapa no se invalida como se espera.
  const values = communities.map((community) => ({
    community,
    value: stats ? valueFor(stats, community, metric) : 0,
  }));
  const max = Math.max(...values.map((x) => x.value), 1);
  const metricLabel = METRICS.find((x) => x.key === metric)?.label ?? metric;
  const sorted = [...values].sort((a, b) => b.value - a.value || displayName(a.community).localeCompare(displayName(b.community), "es"));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Elegir indicador del mapa">
        {METRICS.map((m) => (
          <button
            key={m.key}
            type="button"
            aria-pressed={metric === m.key}
            onClick={() => setMetric(m.key)}
            className={
              metric === m.key
                ? "rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm"
                : "glass-soft rounded-full px-4 py-2.5 text-sm font-semibold text-primary"
            }
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-[1.55fr_.85fr]">
        <div className="flex min-h-[620px] flex-col overflow-hidden rounded-3xl border border-border bg-[var(--map-land)] shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card/80 px-5 py-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Mapa territorial</p>
              <h3 className="mt-1 font-display text-2xl font-semibold">{metricLabel}</h3>
            </div>
            <p className="text-right text-xs font-medium text-muted-foreground">Más intenso = mayor valor</p>
          </div>
          {!stats && <div className="px-5 pt-3 text-sm" role="status">Cargando datos territoriales…</div>}
          <div className="flex flex-1 items-center justify-center px-2 py-3 sm:px-5">
            <svg
              key={metric}
              viewBox="0 0 923 658"
              role="img"
              aria-labelledby="territory-map-title territory-map-description"
              className="block h-auto w-full max-w-[940px]"
            >
              <title id="territory-map-title">{metricLabel} por comunidad autónoma</title>
              <desc id="territory-map-description">
                Mapa de España con círculos graduados por intensidad y cifras numéricas visibles dentro de cada círculo. La tabla lateral muestra el total del indicador seleccionado por comunidad.
              </desc>
              <image href={MAP_BASE_URL} x="0" y="0" width="923" height="658" preserveAspectRatio="none" opacity=".7" />
              <rect x="0" y="0" width="923" height="658" fill="var(--map-land)" opacity=".16" />
              {values.map(({ community, value }) => {
                const point = POINTS[community]!;
                const ratio = max > 0 ? value / max : 0;
                const radius = 15 + Math.min(24, Math.sqrt(value) * 0.32);
                const fillColor = fill(value, max);
                const all = {
                  adhesiones: stats ? valueFor(stats, community, "adhesiones") : 0,
                  entidades: stats ? valueFor(stats, community, "entidades") : 0,
                  mocionesPresentadas: stats ? valueFor(stats, community, "mocionesPresentadas") : 0,
                  mocionesAceptadas: stats ? valueFor(stats, community, "mocionesAceptadas") : 0,
                  testimonios: stats ? valueFor(stats, community, "testimonios") : 0,
                };
                const title = `${displayName(community)} · ${metricLabel}: ${stats ? formatCount(value) : "Cargando"}. Adhesiones: ${formatCount(all.adhesiones)} · Entidades: ${formatCount(all.entidades)} · Mociones presentadas: ${formatCount(all.mocionesPresentadas)} · Mociones aprobadas: ${formatCount(all.mocionesAceptadas)} · Testimonios: ${formatCount(all.testimonios)}`;
                return (
                  <g key={community} tabIndex={0} className="cursor-help">
                    <title>{title}</title>
                    <circle cx={point.x} cy={point.y} r={radius} fill={fillColor} stroke="white" strokeWidth="4" opacity={0.96} />
                    <text
                      x={point.x}
                      y={point.y + 5}
                      textAnchor="middle"
                      fontSize={radius > 27 ? 15 : radius > 21 ? 13 : 11}
                      fontWeight="900"
                      fill="#ffffff"
                      paintOrder="stroke"
                      stroke="#49310b"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      strokeOpacity="0.95"
                      style={{ pointerEvents: "none", fontVariantNumeric: "tabular-nums" }}
                    >
                      {stats ? formatCount(value) : "…"}
                    </text>
                    <text x={point.x} y={point.y + radius + 18} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--ink)" paintOrder="stroke" stroke="white" strokeWidth="4">
                      {displayName(community)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="border-t border-border bg-card/85 px-5 py-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground" aria-label="Leyenda de intensidad">
              <span className="mr-2 text-primary">Leyenda</span>
              {LEGEND_STEPS.map((step) => (
                <span key={step.label} className="inline-flex items-center gap-1.5">
                  <span className="size-4 rounded-full border border-white shadow-sm" style={{ background: `color-mix(in oklab, var(--map-deep) ${step.pct}%, var(--map-light))` }} aria-hidden="true" />
                  {step.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-h-[620px] flex-col rounded-3xl border border-border bg-card p-5">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{metricLabel}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">Por comunidad autónoma</h3>
          <div className="mt-4 flex-1">
            <table className="w-full table-fixed text-sm">
              <caption className="sr-only">{metricLabel} por comunidad autónoma</caption>
              <thead>
                <tr className="border-b-2 border-border text-left">
                  <th className="w-[68%] px-2 py-2.5">Comunidad</th>
                  <th className="px-2 py-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody key={metric}>
                {sorted.map((item, index) => (
                  <tr key={item.community} className="border-b border-border/60">
                    <th scope="row" className="px-2 py-[7px] text-left font-medium">
                      <span className="mr-2 inline-flex size-5 items-center justify-center rounded-full bg-accent/30 text-[11px] font-bold text-primary">{index + 1}</span>
                      {displayName(item.community)}
                    </th>
                    <td className="px-2 py-[7px] text-right font-semibold tabular-nums">{stats ? formatCount(item.value) : "…"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
            El color y tamaño de los círculos representan el indicador seleccionado. Pasa o enfoca cada círculo para consultar todos los indicadores de esa comunidad. Los datos son agregados.
          </p>
        </div>
      </div>
    </div>
  );
}
