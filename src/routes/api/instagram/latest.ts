import { createFileRoute } from "@tanstack/react-router";

let cache: { at: number; permalink: string | null } = { at: 0, permalink: null };
const CACHE_MS = 10 * 60 * 1000;

function extractLatestVideo(html: string): string | null {
  const absolute = [...html.matchAll(/https?:\/\/www\.instagram\.com\/(?:reel|reels)\/([A-Za-z0-9_-]+)\/?/gi)];
  if (absolute.length) return `https://www.instagram.com/reel/${absolute[0][1]}/`;
  const paths = [...html.matchAll(/(?:\\?"|\\?')\/?(?:reel|reels)\/([A-Za-z0-9_-]+)\/?/gi)];
  if (paths.length) return `https://www.instagram.com/reel/${paths[0][1]}/`;
  return null;
}

export const Route = createFileRoute("/api/instagram/latest")({
  server: {
    handlers: {
      GET: async () => {
        if (Date.now() - cache.at < CACHE_MS) return Response.json({ permalink: cache.permalink });
        try {
          const response = await fetch("https://www.instagram.com/assumptaserna/", {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/154 Safari/537.36",
              "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
              Accept: "text/html,application/xhtml+xml",
            },
            cache: "no-store",
          });
          if (!response.ok) throw new Error(`Instagram respondió ${response.status}`);
          const html = await response.text();
          const permalink = extractLatestVideo(html);
          cache = { at: Date.now(), permalink };
          return Response.json({ permalink });
        } catch (error) {
          console.error("No se pudo obtener el último Reel de Instagram", error);
          return Response.json({ permalink: cache.permalink, error: "Instagram no disponible temporalmente" });
        }
      },
    },
  },
});
