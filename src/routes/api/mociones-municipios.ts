import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_CMS_URL =
  "https://script.google.com/macros/s/AKfycbxKl68XDCa_Z7XAisrDDjYwrDz-1hHMGJ8JwnErWvB1s6aIwClitHKmpbbKON63D0KZ/exec";
const CMS_URL = import.meta.env.VITE_ADHESION_COUNT_URL?.trim() || DEFAULT_CMS_URL;
const MUNICIPAL_URL =
  "https://mapas.fomento.gob.es/arcgis/rest/services/SIU/ENTIDADES_TERRITORIALES_EGRN/MapServer/4/query";

let cache: { at: number; data: unknown } = { at: 0, data: null };
const CACHE_MS = 60 * 1000;

function norm(v: unknown) {
  return String(v ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function prop(feature: any, names: string[]) {
  const p = feature?.properties || {};
  for (const name of names) {
    if (p[name] !== undefined && p[name] !== null && String(p[name]).trim()) return p[name];
  }
  return "";
}

export const Route = createFileRoute("/api/mociones-municipios")({
  server: {
    handlers: {
      GET: async () => {
        if (cache.data && Date.now() - cache.at < CACHE_MS) return Response.json(cache.data);
        let stage = "consulta de datos de mociones";
        try {
          const cmsResponse = await fetch(`${CMS_URL}?action=public`, { cache: "no-store" });
          if (!cmsResponse.ok) throw new Error(`El servicio de mociones ha respondido HTTP ${cmsResponse.status}`);
          const cms = await cmsResponse.json();
          if (!cms || typeof cms !== "object") throw new Error("El servicio de mociones no ha devuelto un JSON válido.");
          if (cms.ok === false) throw new Error(String(cms.error || "El servicio de mociones ha indicado un error."));
          stage = "descarga de la cartografía municipal";

          // Descarga la capa oficial de municipios por bloques para respetar el límite
          // de registros del servicio ArcGIS y no quedarse solo con una parte de España.
          const allFeatures: any[] = [];
          const pageSize = 2000;
          for (let offset = 0; offset < 12000; offset += pageSize) {
            const params = new URLSearchParams({
              where: "1=1",
              outFields: "*",
              returnGeometry: "true",
              outSR: "4326",
              f: "geojson",
              resultRecordCount: String(pageSize),
              resultOffset: String(offset),
              geometryPrecision: "5",
            });
            const response = await fetch(`${MUNICIPAL_URL}?${params.toString()}`, { cache: "no-store" });
            if (!response.ok) throw new Error(`Cartografía municipal ${response.status}`);
            const page = await response.json();
            if (page?.error) throw new Error(`ArcGIS: ${String(page.error.message || page.error)}`);
            if (!Array.isArray(page.features)) throw new Error("ArcGIS no ha devuelto una lista de geometrías GeoJSON.");
            allFeatures.push(...page.features);
            if (page.features.length < pageSize) break;
          }
          if (!allFeatures.length) throw new Error("La cartografía municipal ha devuelto cero municipios.");
          stage = "preparación de los datos del mapa";
          const geo = { features: allFeatures };
          const motions = Array.isArray(cms.mocionesMunicipios) ? cms.mocionesMunicipios : [];

          const byName = new Map<string, any[]>();
          for (const m of motions) {
            const key = norm(m.municipio);
            if (!key) continue;
            const list = byName.get(key) || [];
            list.push(m);
            byName.set(key, list);
          }

          const features = (geo.features || []).map((feature: any) => {
            const name = prop(feature, ["NAMEUNIT", "name", "NOMBRE", "municipio"]);
            const code = String(prop(feature, ["CODIGOINE", "CUMUN", "cumun", "codigo_ine", "NATCODE"]));
            const last5 = code.match(/(\d{5})$/)?.[1] || "";
            const candidates = byName.get(norm(name)) || [];
            let match = candidates[0];
            if (candidates.length > 1 && last5) {
              const provinceCode = last5.slice(0, 2);
              match = candidates.find((m: any) => String(m.provinciaCodigo || "") === provinceCode) || candidates[0];
            }
            return {
              ...feature,
              properties: {
                NAMEUNIT: name,
                codigoIne: last5,
                motionStatus: match ? (() => {
                  const status = norm(match.estado);
                  if (status.startsWith("aprob") || status.startsWith("acept")) return "aprobada";
                  if (status.startsWith("rechaz") || status.startsWith("deneg") || status.startsWith("no aprob")) return "rechazada";
                  if (status.startsWith("present") || status.startsWith("sin resolucion") || status.startsWith("pendiente")) return "presentada";
                  return "presentada";
                })() : null,
                motionCount: Number(match?.mociones || 0),
                motionProvince: match?.provincia || "",
              },
            };
          });

          const out = { ok: true, total: Number(cms.contadores?.mocionesPresentadas || cms.mocionesMunicipios?.length || 0), features };
          cache = { at: Date.now(), data: out };
          return Response.json(out, { headers: { "Cache-Control": "public, max-age=300" } });
        } catch (error) {
          console.error("No se pudo cargar el mapa municipal de mociones", error);
          if (cache.data) return Response.json(cache.data);
          const detail = error instanceof Error ? error.message : String(error);
          return Response.json({ ok: false, total: 0, features: [], error: `Error en ${stage}: ${detail}` }, { status: 502 });
        }
      },
    },
  },
});
