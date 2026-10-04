import { createFileRoute } from "@tanstack/react-router";

const CMS_URL = import.meta.env.VITE_ADHESION_COUNT_URL?.trim() ?? "";

const TIMEOUT_MS = 30_000;

// Caché en el servidor: por muchas personas que tengan la web abierta, Google Apps Script
// recibe como mucho una consulta por acción cada CACHE_MS (protege su cuota diaria).
const CACHE_MS = 30_000;
const cache = new Map<string, { at: number; data: unknown }>();

async function fetchCms(url: string) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script respondió ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

export const Route = createFileRoute("/api/cms")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          if (!CMS_URL) {
            return Response.json(
              {
                error: "Falta VITE_ADHESION_COUNT_URL",
              },
              { status: 500 },
            );
          }

          const incomingUrl = new URL(request.url);
          const action = incomingUrl.searchParams.get("action");

          const cmsUrl = new URL(CMS_URL);

          const known = action === "content" || action === "public" ? action : "count";
          if (known !== "count") cmsUrl.searchParams.set("action", known);

          const cached = cache.get(known);
          if (cached && Date.now() - cached.at < CACHE_MS) {
            return Response.json(cached.data, { headers: { "Cache-Control": "no-store" } });
          }

          try {
            const data = await fetchCms(cmsUrl.toString());
            cache.set(known, { at: Date.now(), data });
            return Response.json(data, { headers: { "Cache-Control": "no-store" } });
          } catch (error) {
            // Si Google falla, se sigue sirviendo el último dato bueno en vez de romper la web.
            if (cached) {
              return Response.json(cached.data, { headers: { "Cache-Control": "no-store" } });
            }
            throw error;
          }
        } catch (error) {
          console.error("Error consultando Google Apps Script:", error);

          return Response.json(
            {
              error: "No se ha podido consultar el CMS",
            },
            { status: 502 },
          );
        }
      },
    },
  },
});
