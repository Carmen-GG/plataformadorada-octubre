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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // Apps Script ContentService puede responder mediante una redirección a
    // script.googleusercontent.com. En Cloudflare, seguir esa redirección tras
    // un POST puede dejar la petición esperando aunque doPost ya haya guardado.
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "manual",
      signal: controller.signal,
    });
    let finalResponse = response;

    // Apps Script devuelve el resultado de ContentService mediante una redirección.
    // No damos el guardado por correcto solo por recibir un 302: leemos el JSON real.
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) {
        throw new Error(`Google Apps Script redirigió con estado ${response.status}, pero no devolvió la URL del resultado.`);
      }
      finalResponse = await fetch(new URL(location, url).toString(), {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      });
    }

    if (!finalResponse.ok) {
      throw new Error(`Google Apps Script respondió ${finalResponse.status} al devolver el resultado.`);
    }

    const data = await finalResponse.json();
    if (!data || typeof data !== "object" || !("ok" in data)) {
      throw new Error("Google Apps Script no devolvió una confirmación válida del guardado.");
    }
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Google Apps Script no ha respondido en 30 segundos. Comprueba que la implementación esté actualizada y accesible.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export const Route = createFileRoute("/api/cms")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Record<string, unknown>;
          const type = body.type === "cancion" ? "cancion" : body.type === "frase" ? "frase" : body.type === "lema" ? "lema" : "";
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
          if ((type === "frase" || type === "lema") && !payload.text) {
            return Response.json({ error: "Indica la frase o cita" }, { status: 400 });
          }
          const response = await fetchCmsPost(CMS_URL, payload);
          if (response && typeof response === "object" && "ok" in response && response.ok !== true) {
            const message = "error" in response ? String(response.error) : "Google Apps Script no ha confirmado el guardado.";
            return Response.json({ ok: false, error: message }, { status: 502, headers: { "Cache-Control": "no-store" } });
          }

          // El siguiente GET debe leer de nuevo Google Sheets para que el lema
          // recién guardado pueda aparecer en el carrusel sin esperar la caché.
          cache.delete("content");
          return Response.json(response, { headers: { "Cache-Control": "no-store" } });
        } catch (error) {
          console.error("Error enviando propuesta:", error);
          const message = error instanceof Error ? error.message : "Error desconocido al enviar la propuesta.";
          return Response.json({ error: message }, { status: 502, headers: { "Cache-Control": "no-store" } });
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

          const known = action === "content" || action === "resources" || action === "public" ? action : "count";
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
