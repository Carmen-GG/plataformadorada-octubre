import { useSyncExternalStore } from "react";

/**
 * Cifras y listas públicas del movimiento, leídas de Google Sheets a través de /api/cms.
 * El navegador nunca habla con Google directamente y solo recibe datos ya agregados o
 * autorizados expresamente (ver google-apps-script/publico.gs).
 */

const REFRESH_MS = 30_000;
const TIMEOUT_MS = 35_000;
export const NO_DATA = "—";

export type PublicStats = {
  ok: boolean;
  errores: string[];
  actualizado?: string;
  contadores: {
    adhesiones: number | null;
    entidades: number | null;
    ayuntamientos: number | null;
    voluntarios: number | null;
    testimoniosRecibidos: number | null;
    testimoniosPublicados: number | null;
  };
  tiposOrganizacion?: Record<string, number>;
  porComunidad: Record<string, { adhesiones: number; entidades: number }>;
  mociones?: Record<string, { mocionesPresentadas: number; mocionesAceptadas: number }>;
  indicadores?: Record<string, { valor: number | string | null; unidad: string; fuente: string; url?: string; fechaDato?: string; actualizado?: string; modo?: string; nota?: string }>;
  ultimasAdhesiones: string[];
  ultimosVoluntarios: string[];
  entidadesAdheridas?: Array<{ nombre: string; tipo: string; ambito: string; web: string }>;
  testimonios: Array<{ texto: string; autor: string; contexto: string }>;
};

type State = { stats: PublicStats | null; failed: boolean };

let state: State = { stats: null, failed: false };
let timer: number | undefined;
let loading = false;
const listeners = new Set<() => void>();
const SERVER_STATE: State = { stats: null, failed: false };

function set(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

function isStats(value: unknown): value is PublicStats {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as PublicStats).contadores === "object" &&
    (value as PublicStats).contadores !== null
  );
}

/** Rellena lo que falte (p. ej. si Apps Script está en una versión anterior) para no romper la página. */
function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const clean = value.replace(/\.\s/g, "").replace(/\./g, "").replace(/,/g, ".").trim();
    const parsed = Number(clean);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function normalize(raw: PublicStats): PublicStats {
  const porComunidad =
    raw.porComunidad && typeof raw.porComunidad === "object" ? raw.porComunidad : {};
  const tiposOrganizacion =
    raw.tiposOrganizacion && typeof raw.tiposOrganizacion === "object"
      ? Object.fromEntries(
          Object.entries(raw.tiposOrganizacion).map(([key, value]) => [key, toNumber(value) ?? 0]),
        )
      : {};

  // Algunas versiones de Apps Script ya devuelven los datos territoriales pero no
  // todos los contadores superiores. Recuperamos los que se pueden reconstruir
  // de forma segura para que una actualización del CMS no deje la página en “—”.
  const adhesionesTerritorio = Object.values(porComunidad).reduce(
    (sum, item) => sum + (toNumber(item?.adhesiones) ?? 0),
    0,
  );
  const entidadesTerritorio = Object.values(porComunidad).reduce(
    (sum, item) => sum + (toNumber(item?.entidades) ?? 0),
    0,
  );
  const rawContadores = raw.contadores ?? ({} as PublicStats["contadores"]);
  const adhesiones = toNumber(rawContadores.adhesiones) ?? (adhesionesTerritorio || null);
  const entidades = toNumber(rawContadores.entidades) ?? (entidadesTerritorio || null);
  const ayuntamientoTypes = Object.entries(tiposOrganizacion)
    .filter(([key]) => {
      const normalized = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      return normalized.includes("ayuntamiento") || normalized.includes("entidad local");
    })
    .reduce((sum, [, value]) => sum + value, 0);

  return {
    ...raw,
    ok: raw.ok !== false,
    errores: Array.isArray(raw.errores) ? raw.errores : [],
    contadores: {
      adhesiones,
      entidades,
      ayuntamientos: toNumber(rawContadores.ayuntamientos) ?? (ayuntamientoTypes || null),
      voluntarios: toNumber(rawContadores.voluntarios),
      testimoniosRecibidos: toNumber(rawContadores.testimoniosRecibidos),
      testimoniosPublicados: toNumber(rawContadores.testimoniosPublicados),
    },
    tiposOrganizacion,
    porComunidad,
    mociones: raw.mociones && typeof raw.mociones === "object" ? raw.mociones : {},
    indicadores: raw.indicadores && typeof raw.indicadores === "object" ? raw.indicadores : {},
    ultimasAdhesiones: Array.isArray(raw.ultimasAdhesiones) ? raw.ultimasAdhesiones : [],
    ultimosVoluntarios: Array.isArray(raw.ultimosVoluntarios) ? raw.ultimosVoluntarios : [],
    entidadesAdheridas: Array.isArray(raw.entidadesAdheridas) ? raw.entidadesAdheridas : [],
    testimonios: Array.isArray(raw.testimonios) ? raw.testimonios : [],
  };
}

async function refresh() {
  if (loading || typeof window === "undefined" || document.hidden) return;
  loading = true;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch("/api/cms?action=public", {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const raw: unknown = await response.json();
    if (!isStats(raw)) throw new Error("Respuesta inesperada");
    set({ stats: normalize(raw), failed: false });
  } catch {
    // Si ya había datos, se conservan; solo se marca el fallo cuando no hay nada que mostrar.
    set({ stats: state.stats, failed: state.stats === null });
  } finally {
    window.clearTimeout(timeout);
    loading = false;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1 && typeof window !== "undefined") {
    void refresh();
    timer = window.setInterval(() => void refresh(), REFRESH_MS);
    document.addEventListener("visibilitychange", onVisible);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
      document.removeEventListener("visibilitychange", onVisible);
    }
  };
}

function onVisible() {
  if (!document.hidden) void refresh();
}

export function usePublicStats(): State {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => SERVER_STATE,
  );
}

const nf = new Intl.NumberFormat("es-ES");

export type CounterKey = keyof PublicStats["contadores"];

export function formatCount(value: number | null | undefined): string {
  return typeof value === "number" ? nf.format(value) : NO_DATA;
}

/** Número en vivo; muestra "—" mientras carga o si no hay dato. */
export function LiveCount({ name }: { name: CounterKey }) {
  const { stats } = usePublicStats();
  if (!stats) {
    return (
      <span className="inline-flex items-center gap-2" role="status" aria-live="polite">
        <span
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary/25 border-t-primary"
          aria-hidden="true"
        />
        <span className="text-sm font-sans font-normal">Cargando…</span>
      </span>
    );
  }

  let value = stats.contadores[name];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    if (name === "adhesiones") {
      value = Object.values(stats.porComunidad ?? {}).reduce(
        (sum, item) => sum + (toNumber(item?.adhesiones) ?? 0),
        0,
      );
    } else if (name === "entidades") {
      value = Object.values(stats.porComunidad ?? {}).reduce(
        (sum, item) => sum + (toNumber(item?.entidades) ?? 0),
        0,
      );
    } else if (name === "ayuntamientos") {
      value = Object.entries(stats.tiposOrganizacion ?? {})
        .filter(([key]) => {
          const normalized = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          return normalized.includes("ayuntamiento") || normalized.includes("entidad local");
        })
        .reduce((sum, [, count]) => sum + (toNumber(count) ?? 0), 0);
    } else {
      value = null;
    }
  }
  return <>{formatCount(value)}</>;
}

/** Texto de estado para listas: cargando / error / vacío. */
export function listStatus(state: State, count: number, emptyText: string): string | null {
  if (count > 0) return null;
  if (state.failed)
    return "No se han podido cargar los datos ahora mismo. Vuelve a intentarlo en unos minutos.";
  if (!state.stats) return "Cargando…";
  return emptyText;
}
