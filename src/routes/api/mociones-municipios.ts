import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_CMS_URL =
  "https://script.google.com/macros/s/AKfycbxKl68XDCa_Z7XAisrDDjYwrDz-1hHMGJ8JwnErWvB1s6aIwClitHKmpbbKON63D0KZ/exec";
const CMS_URL = import.meta.env.VITE_ADHESION_COUNT_URL?.trim() || DEFAULT_CMS_URL;
const MUNICIPAL_URL =
  "https://mapas.fomento.gob.es/arcgis/rest/services/SIU/ENTIDADES_TERRITORIALES_EGRN/MapServer/4/query";

const cache = new Map<number, { at: number; data: unknown }>();
const CACHE_MS = 5 * 60 * 1000;
const PAGE_SIZE = 300;

function norm(v: unknown) {
  return String(v ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function centroidOf(geometry: any): [number, number] | null {
  if (!geometry) return null;
  const rings = geometry.type === "Polygon" ? geometry.coordinates : geometry.type === "MultiPolygon" ? geometry.coordinates.flat() : [];
  let x = 0, y = 0, n = 0;
  for (const ring of rings) {
    if (!Array.isArray(ring)) continue;
    for (const point of ring) {
      if (!Array.isArray(point) || point.length < 2) continue;
      x += Number(point[0]); y += Number(point[1]); n++;
    }
  }
  return n ? [x / n, y / n] : null;
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
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const parsedOffset = Number.parseInt(url.searchParams.get("offset") || "0", 10);
        const offset = Number.isFinite(parsedOffset) ? Math.max(0, parsedOffset) : 0;
        const cached = cache.get(offset);
        if (cached && Date.now() - cached.at < CACHE_MS) return Response.json(cached.data);

        let stage = "consulta de datos de mociones";
        try {
          const cmsResponse = await fetch(CMS_URL + "?action=public", { cache: "no-store" });
          if (!cmsResponse.ok) throw new Error("El servicio de mociones ha respondido HTTP " + cmsResponse.status);
          const cms = await cmsResponse.json();
          if (!cms || typeof cms !== "object") throw new Error("El servicio de mociones no ha devuelto un JSON válido.");
          if (cms.ok === false) throw new Error(String(cms.error || "El servicio de mociones ha indicado un error."));

          stage = "descarga de la cartografía municipal (bloque " + offset + ")";
          const params = new URLSearchParams({
            where: "1=1",
            outFields: "NAMEUNIT,CodINE,NATCODE",
            returnGeometry: "true",
            outSR: "4326",
            f: "geojson",
            resultRecordCount: String(PAGE_SIZE),
            resultOffset: String(offset),
            geometryPrecision: "3",
            maxAllowableOffset: "0.02",
            orderByFields: "OBJECTID",
          });
          const response = await fetch(MUNICIPAL_URL + "?" + params.toString(), { cache: "no-store" });
          if (!response.ok) throw new Error("Cartografía municipal HTTP " + response.status);
          const page = await response.json();
          if (page?.error) throw new Error("ArcGIS: " + String(page.error.message || page.error));
          if (!Array.isArray(page.features)) throw new Error("ArcGIS no ha devuelto una lista de geometrías GeoJSON.");
          if (!page.features.length && offset === 0) throw new Error("La cartografía municipal ha devuelto cero municipios.");

          stage = "preparación de los datos del mapa";
          const motions = Array.isArray(cms.mocionesMunicipios) ? cms.mocionesMunicipios : [];
          const byName = new Map<string, any[]>();
          for (const motion of motions) {
            const key = norm(motion.municipio);
            if (!key) continue;
            const list = byName.get(key) || [];
            list.push(motion);
            byName.set(key, list);
          }

          const features = page.features.map((feature: any) => {
            const name = prop(feature, ["NAMEUNIT", "name", "NOMBRE", "municipio"]);
            const code = String(prop(feature, ["CodINE", "CODINE", "CODIGOINE", "CUMUN", "cumun", "codigo_ine", "NATCODE"]));
            const last5 = code.match(/(\d{5})$/)?.[1] || "";
            const candidates = byName.get(norm(name)) || [];
            let match = candidates[0];
            if (candidates.length > 1 && last5) {
              const provinceCode = last5.slice(0, 2);
              match = candidates.find((m: any) => String(m.provinciaCodigo || "") === provinceCode) || candidates[0];
            }
            let motionStatus: string | null = null;
            if (match) {
              const status = norm(match.estado);
              if (status.startsWith("aprob") || status.startsWith("acept")) motionStatus = "aprobada";
              else if (status.startsWith("rechaz") || status.startsWith("deneg") || status.startsWith("no aprob")) motionStatus = "rechazada";
              else motionStatus = "presentada";
            }
            const center = centroidOf(feature.geometry);
            return {
              type: "Feature",
              geometry: center ? { type: "Point", coordinates: center } : null,
              properties: {
                NAMEUNIT: name,
                codigoIne: last5,
                motionStatus: motionStatus || "no presentada",
                motionCount: Number(match?.mociones || 0),
                motionProvince: match?.provincia || "",
              },
            };
          });

          const out = {
            ok: true,
            offset,
            pageSize: PAGE_SIZE,
            hasMore: page.features.length === PAGE_SIZE,
            total: Number(cms.contadores?.mocionesPresentadas || motions.length || 0),
            features,
          };
          cache.set(offset, { at: Date.now(), data: out });
          return Response.json(out, { headers: { "Cache-Control": "public, max-age=300" } });
        } catch (error) {
          console.error("No se pudo cargar el mapa municipal de mociones", error);
          const detail = error instanceof Error ? error.message : String(error);
          return Response.json({ ok: false, offset, total: 0, features: [], error: "Error en " + stage + ": " + detail }, { status: 502 });
        }
      },
    },
  },
});
