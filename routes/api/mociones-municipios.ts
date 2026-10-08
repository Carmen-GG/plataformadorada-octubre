import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_CMS_URL =
  "https://script.google.com/macros/s/AKfycby53cqO5YcEOwgxc5orNADhjFhmXj3_ufXloAXTb573UjVVXzRyvCQyQQJqaJHHio1x/exec";
const CMS_URL = import.meta.env.VITE_ADHESION_COUNT_URL?.trim() || DEFAULT_CMS_URL;
const INE_URL =
  "https://www.ine.es/servergis/rest/services/Hosted/Viviendas_tur%C3%ADsticas_2026M05/FeatureServer/1/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&f=geojson&resultRecordCount=10000&geometryPrecision=5";

let cache: { at: number; data: unknown } = { at: 0, data: null };
const CACHE_MS = 6 * 60 * 60 * 1000;

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
        try {
          const [cmsResponse, geoResponse] = await Promise.all([
            fetch(`${CMS_URL}?action=public`, { cache: "no-store" }),
            fetch(INE_URL, { cache: "no-store" }),
          ]);
          if (!cmsResponse.ok) throw new Error(`CMS ${cmsResponse.status}`);
          if (!geoResponse.ok) throw new Error(`INE ${geoResponse.status}`);
          const cms = await cmsResponse.json();
          const geo = await geoResponse.json();
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
                motionStatus: match?.estado || null,
                motionCount: match?.mociones || 0,
                motionProvince: match?.provincia || "",
              },
            };
          });

          const out = { ok: true, total: Number(cms.contadores?.mocionesPresentadas || 0), features };
          cache = { at: Date.now(), data: out };
          return Response.json(out, { headers: { "Cache-Control": "public, max-age=300" } });
        } catch (error) {
          console.error("No se pudo cargar el mapa municipal de mociones", error);
          if (cache.data) return Response.json(cache.data);
          return Response.json({ ok: false, total: 0, features: [], error: "No se ha podido cargar el mapa municipal de mociones." }, { status: 502 });
        }
      },
    },
  },
});
