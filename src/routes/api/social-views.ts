import { createFileRoute } from "@tanstack/react-router";

/**
 * Public, read-only endpoint for the homepage social views counter.
 *
 * Deliberately does not invent or scrape numbers. The authorized Meta/TikTok
 * API ingestion must be configured before configured=true is returned.
 * Keep provider tokens in server-side secrets only; never expose them to the browser.
 */
export const Route = createFileRoute("/api/social-views")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json(
          {
            configured: false,
            since: "2026-08-13",
            profiles: {
              instagram: ["assumptaserna", "plataformadorada"],
              tiktok: ["assumptaserna_fdc"],
            },
            refreshMinutes: 60,
            message: "Social platform API credentials and historical metrics have not been configured yet.",
          },
          {
            headers: {
              "Cache-Control": "no-store",
            },
          },
        );
      },
    },
  },
});
