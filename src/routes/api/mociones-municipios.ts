import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_CMS_URL =
  "https://script.google.com/macros/s/AKfycbxKl68XDCa_Z7XAisrDDjYwrDz-1hHMGJ8JwnErWvB1s6aIwClitHKmpbbKON63D0KZ/exec";
const CMS_URL = import.meta.env.VITE_ADHESION_COUNT_URL?.trim() || DEFAULT_CMS_URL;
const CACHE_MS = 5 * 60 * 1000;
let cachedResponse: { at: number; data: any } | null = null;
let cmsRequest: Promise<any> | null = null;

async function getCmsData() {
  if (cachedResponse && Date.now() - cachedResponse.at < CACHE_MS) return cachedResponse.data;
  if (!cmsRequest) {
    cmsRequest = (async () => {
      const response = await fetch(CMS_URL + "?action=public", { cache: "no-store" });
      if (!response.ok) throw new Error("El servicio de mociones ha respondido HTTP " + response.status);
      const cms = await response.json();
      if (!cms || typeof cms !== "object") throw new Error("El servicio de mociones no ha devuelto un JSON válido.");
      if (cms.ok === false) throw new Error(String(cms.error || "El servicio de mociones ha indicado un error."));
      cachedResponse = { at: Date.now(), data: cms };
      return cms;
    })().finally(() => { cmsRequest = null; });
  }
  return cmsRequest;
}

function norm(value: unknown) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

function status(value: unknown): "presentada" | "aprobada" | "rechazada" {
  const state = norm(value);
  if (state.startsWith("aprob") || state.startsWith("acept")) return "aprobada";
  if (state.startsWith("rechaz") || state.startsWith("deneg") || state.startsWith("no aprob")) return "rechazada";
  return "presentada";
}

export const Route = createFileRoute("/api/mociones-municipios")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const cms = await getCmsData();
          const motions = Array.isArray(cms.mocionesMunicipios) ? cms.mocionesMunicipios : [];
          const byMunicipalityProvince = new Map<string, any>();

          for (const motion of motions) {
            const municipality = String(motion.municipio || "").trim();
            if (!municipality) continue;

            const province = String(motion.provincia || "").trim();
            // La unidad de recuento es la pareja municipio + provincia.
            // Normalizamos para evitar diferencias de mayúsculas, tildes o espacios,
            // pero nunca fusionamos provincias distintas ni una provincia vacía
            // con otra informada.
            const key = norm(municipality) + "|" + norm(province);
            const current = byMunicipalityProvince.get(key);
            const count = Math.max(1, Number(motion.mociones || 1));
            const previousMotions = Number(current?.mociones) || 0;

            byMunicipalityProvince.set(key, {
              municipio: current?.municipio || municipality,
              provincia: current?.provincia || province,
              estado: String(motion.estado || current?.estado || "Sin resolución registrada"),
              mociones: previousMotions + count,
              motionStatus: status(motion.estado || current?.estado),
            });
          }
          const records = Array.from(byMunicipalityProvince.values());
          const out = {
            ok: true,
            // Este endpoint cuenta parejas únicas de municipio + provincia, no mociones individuales del CMS.
            total: records.length,
            records,
          };
          return Response.json(out, { headers: { "Cache-Control": "public, max-age=300" } });
        } catch (error) {
          console.error("No se pudieron cargar los datos de mociones del mapa", error);
          const detail = error instanceof Error ? error.message : String(error);
          return Response.json({ ok: false, total: 0, records: [], error: "Error al consultar los datos de mociones: " + detail }, { status: 502 });
        }
      },
    },
  },
});
