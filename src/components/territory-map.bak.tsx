import { formatCount, type PublicStats } from "@/lib/public-stats";

type MetricKey = "adhesiones" | "entidades" | "mocionesPresentadas" | "mocionesAceptadas";

type Metric = {
  key: MetricKey;
  label: string;
  color: string;
  dx: number;
  dy: number;
};

const METRICS: Metric[] = [
  { key: "adhesiones", label: "Adhesiones", color: "var(--map-adhesiones)", dx: -13, dy: -11 },
  { key: "entidades", label: "Entidades", color: "var(--map-entidades)", dx: 13, dy: -11 },
  {
    key: "mocionesPresentadas",
    label: "Mociones presentadas",
    color: "var(--map-mociones-presentadas)",
    dx: -13,
    dy: 12,
  },
  {
    key: "mocionesAceptadas",
    label: "Mociones aceptadas",
    color: "var(--map-mociones-aceptadas)",
    dx: 13,
    dy: 12,
  },
];

// Coordenadas visuales ajustadas a la base cartográfica real de comunidades autónomas.
// El mapa base utiliza la misma proporción 923 × 658.
const POINTS: Record<string, { x: number; y: number; label?: string }> = {
  // Posiciones ajustadas a las formas reales del mapa base (923 × 658).
  Galicia: { x: 292, y: 165 },
  Asturias: { x: 278, y: 190 },
  Cantabria: { x: 330, y: 202 },
  "País Vasco": { x: 382, y: 218 },
  Navarra: { x: 430, y: 246 },
  "La Rioja": { x: 394, y: 266 },
  Castilla_y_Leon: { x: 404, y: 338, label: "Castilla y León" },
  Aragón: { x: 512, y: 334 },
  Cataluña: { x: 665, y: 265 },
  Madrid: { x: 411, y: 365 },
  "Castilla-La Mancha": { x: 505, y: 425 },
  Extremadura: { x: 334, y: 425 },
  "Comunitat Valenciana": { x: 605, y: 405 },
  Murcia: { x: 585, y: 485 },
  Andalucía: { x: 500, y: 535 },
  "Illes Balears": { x: 762, y: 400 },
  Canarias: { x: 164, y: 604 },
  Ceuta: { x: 425, y: 604 },
  Melilla: { x: 497, y: 604 },
};

function displayName(name: string) {
  return POINTS[name]?.label ?? name;
}

function shortCount(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(".0", "")} M`;
  if (value >= 10_000) return `${Math.round(value / 1_000)}k`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(".0", "")}k`;
  return String(value);
}

function radius(value: number) {
  return Math.max(9, Math.min(22, 8 + Math.sqrt(Math.max(value, 0)) * 0.16));
}

function metricValue(stats: PublicStats, community: string, key: MetricKey) {
  if (key === "mocionesPresentadas" || key === "mocionesAceptadas") {
    return stats.mociones?.[community]?.[key] ?? 0;
  }
  return stats.porComunidad[community]?.[key] ?? 0;
}

const MAP_BASE_URL =
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Blank_Spain_Map_(Autonomous_Communities).svg";

export function TerritoryMap({ stats }: { stats: PublicStats | null }) {
  const communities = Object.keys(POINTS);
  const hasStats = Boolean(stats);

  return (
    <div className="space-y-5">
      <div
        className="flex flex-wrap gap-x-5 gap-y-2 rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm"
        aria-label="Leyenda del mapa"
      >
        {METRICS.map((metric) => (
          <div key={metric.key} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: metric.color }}
              aria-hidden="true"
            />
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-border bg-[var(--map-land)] shadow-sm">
        {!hasStats && (
          <div
            className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full border border-border bg-background/95 px-3 py-1.5 text-xs font-medium shadow-sm"
            role="status"
            aria-live="polite"
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="h-3.5 w-3.5 rounded-full border-2 border-primary/25 border-t-primary"
                aria-hidden="true"
              />
              Cargando datos…
            </span>
          </div>
        )}
        <svg
          viewBox="0 0 923 658"
          role="img"
          aria-labelledby="territory-map-title territory-map-description"
          className="block h-auto w-full"
        >
          <title id="territory-map-title">
            Indicadores de Plataforma Dorada por comunidad autónoma
          </title>
          <desc id="territory-map-description">
            Mapa físico de España con las divisiones de las comunidades autónomas y cuatro
            indicadores por comunidad: adhesiones, entidades, mociones presentadas y mociones aceptadas.
          </desc>

          {/* Mapa real de comunidades autónomas de España. La fuente se mantiene como imagen
              para no añadir dependencias cartográficas al proyecto. */}
          <image
            href={MAP_BASE_URL}
            x="0"
            y="0"
            width="923"
            height="658"
            preserveAspectRatio="none"
            opacity="0.82"
          />

          {/* Capa translúcida que integra la cartografía con la paleta de Plataforma Dorada. */}
          <rect x="0" y="0" width="923" height="658" fill="var(--map-land)" opacity="0.18" />

          {communities.map((community) => {
            const point = POINTS[community]!;
            return (
              <g key={community}>
                {METRICS.map((metric) => {
                  const value = hasStats ? metricValue(stats!, community, metric.key) : 0;
                  const r = radius(value);
                  const cx = point.x + metric.dx;
                  const cy = point.y + metric.dy;
                  const title = `${displayName(community)} · ${metric.label}: ${hasStats ? formatCount(value) : "Cargando"}`;

                  return (
                    <g key={metric.key}>
                      <title>{title}</title>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill={metric.color}
                        fillOpacity="0.95"
                        stroke="white"
                        strokeWidth="2.5"
                      />
                      {hasStats && (
                        <text
                          x={cx}
                          y={cy + 2.5}
                          textAnchor="middle"
                          fontSize={r >= 14 ? 7 : 6}
                          fontWeight="700"
                          fill="white"
                        >
                          {shortCount(value)}
                        </text>
                      )}
                    </g>
                  );
                })}
                <text
                  x={point.x}
                  y={point.y + 35}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="700"
                  fill="var(--ink)"
                  paintOrder="stroke"
                  stroke="white"
                  strokeWidth="3"
                  strokeOpacity="0.85"
                >
                  {displayName(community)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-xs leading-5 text-muted-foreground">
        El tamaño de los círculos representa de forma proporcional el volumen de cada indicador.
        El mapa base muestra las comunidades autónomas de España. Datos actualizados desde las
        fuentes públicas de Plataforma Dorada. Mapa base: Az88, Wikimedia Commons, CC BY-SA 3.0.
      </p>
    </div>
  );
}
