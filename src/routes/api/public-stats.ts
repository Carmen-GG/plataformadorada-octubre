import { createFileRoute } from "@tanstack/react-router";

const CMS_URL =
  "https://script.google.com/macros/s/AKfycbxKl68XDCa_Z7XAisrDDjYwrDz-1hHMGJ8JwnErWvB1s6aIwClitHKmpbbKON63D0KZ/exec";

export const Route = createFileRoute("/api/public-stats")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const url = new URL(CMS_URL);
          url.searchParams.set("action", "public");
          const response = await fetch(url.toString(), {
            method: "GET",
            headers: { Accept: "application/json" },
            cache: "no-store",
            redirect: "follow",
          });
          if (!response.ok) {
            return Response.json(
              { ok: false, error: "CMS respondió " + response.status },
              { status: 502, headers: { "Cache-Control": "no-store" } },
            );
          }
          const data: unknown = await response.json();
          if (!data || typeof data !== "object" || !("contadores" in data)) {
            return Response.json(
              { ok: false, error: "Respuesta del CMS sin contadores" },
              { status: 502, headers: { "Cache-Control": "no-store" } },
            );
          }
          return Response.json(data, {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate",
              "X-Stats-Source": "google-apps-script-direct",
            },
          });
        } catch (error) {
          console.error("[api/public-stats] Error:", error);
          return Response.json(
            { ok: false, error: "No se han podido cargar los datos públicos" },
            { status: 502, headers: { "Cache-Control": "no-store" } },
          );
        }
      },
    },
  },
});
