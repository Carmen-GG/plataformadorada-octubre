import { createFileRoute } from "@tanstack/react-router";

let cache: { at: number; permalink: string | null } = { at: 0, permalink: null };
const CACHE_MS = 10 * 60 * 1000;

function extractLatestVideo(html: string): string | null {
  // Instagram publica vídeos tanto como Reels (/reel/) como publicaciones (/p/).
  // Reunimos ambos formatos y recorremos las referencias en el orden en que aparecen
  // en el HTML público del perfil.
  const seen = new Set<string>();
  const candidates: Array<{ url: string; pos: number; isReel: boolean }> = [];
  const re = /(?:https?:\/\/www\.instagram\.com)?\/?(reel|reels|p)\/([A-Za-z0-9_-]+)\/?/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const kind = m[1].toLowerCase();
    const shortcode = m[2];
    const url = `https://www.instagram.com/${kind === "p" ? "p" : "reel"}/${shortcode}/`;
    if (!seen.has(url)) {
      seen.add(url);
      candidates.push({ url, pos: m.index, isReel: kind !== "p" });
    }
  }

  for (const candidate of candidates) {
    // Un Reel es contenido de vídeo. Para publicaciones normales comprobamos
    // los metadatos cercanos para no mostrar una fotografía por error.
    if (candidate.isReel) return candidate.url;
    const context = html.slice(
      Math.max(0, candidate.pos - 5000),
      Math.min(html.length, candidate.pos + 8000),
    );
    if (
      /(?:\"|')is_video(?:\"|')\s*:\s*true/i.test(context) ||
      /\"video_url\"\s*:/i.test(context) ||
      /<meta[^>]+property=[\"']og:video/i.test(context)
    ) {
      return candidate.url;
    }
  }
  return null;
}

export const Route = createFileRoute("/api/instagram/latest")({
  server: {
    handlers: {
      GET: async () => {
        if (Date.now() - cache.at < CACHE_MS) {
          return Response.json({ permalink: cache.permalink });
        }
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
          console.error("No se pudo obtener el último vídeo de Instagram", error);
          return Response.json({
            permalink: cache.permalink,
            error: "Instagram no disponible temporalmente",
          });
        }
      },
    },
  },
});
