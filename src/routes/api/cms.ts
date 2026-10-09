import { createFileRoute } from "@tanstack/react-router";


const DEFAULT_CMS_URL =
  "https://script.google.com/macros/s/AKfycbxKl68XDCa_Z7XAisrDDjYwrDz-1hHMGJ8JwnErWvB1s6aIwClitHKmpbbKON63D0KZ/exec";
const CMS_URL = import.meta.env.VITE_ADHESION_COUNT_URL?.trim() || DEFAULT_CMS_URL;

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


async function fetchCmsPost(url: string, payload: Record<string, unknown>) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Google Apps Script respondió ${response.status}`);
  return response.json();
}

export const Route = createFileRoute("/api/cms")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Record<string, unknown>;
          const type = body.type === "cancion" ? "cancion" : body.type === "frase" ? "frase" : "";
          if (!type) return Response.json({ error: "Tipo de propuesta no válido" }, { status: 400 });
          const payload = {
            action: "proposal",
            type,
            title: String(body.title ?? "").trim(),
            artist: String(body.artist ?? "").trim(),
            text: String(body.text ?? "").trim(),
            proposer: String(body.proposer ?? "").trim(),
          };
          if (type === "cancion" && (!payload.title || !payload.artist)) {
            return Response.json({ error: "Indica canción y artista" }, { status: 400 });
          }
          if (type === "frase" && !payload.text) {
            return Response.json({ error: "Indica la frase o cita" }, { status: 400 });
          }
          const response = await fetchCmsPost(CMS_URL, payload);
          return Response.json(response, { headers: { "Cache-Control": "no-store" } });
        } catch (error) {
          console.error("Error enviando propuesta:", error);
          return Response.json({ error: "No se ha podido enviar la propuesta" }, { status: 502 });
        }
      },
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
