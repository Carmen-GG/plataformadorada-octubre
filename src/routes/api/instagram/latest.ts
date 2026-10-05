import { createFileRoute } from "@tanstack/react-router";

let cache: { at: number; permalink: string | null } = { at: 0, permalink: null };
const CACHE_MS = 10 * 60 * 1000;

function extractLatestStandardVideo(html: string): string | null {
  // Instagram's public profile HTML can contain several post records. Prefer standard
  // /p/ publications and only accept records whose nearby structured data marks them
  // as video. Reels (/reel/ or /reels/) are deliberately excluded.
  const seen = new Set<string>();
  const candidates: Array<{ url: string; pos: number }> = [];
  const re = /(?:https?:\/\/www\.instagram\.com)?\/?p\/([A-Za-z0-9_-]+)\/?/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const url = `https://www.instagram.com/p/${m[1]}/`;
    if (!seen.has(url)) { seen.add(url); candidates.push({ url, pos: m.index }); }
  }
  for (const c of candidates) {
    const context = html.slice(Math.max(0, c.pos - 5000), Math.min(html.length, c.pos + 8000));
    if (/(?:\"|')is_video(?:\"|')\s*:\s*true/i.test(context) || /\"video_url\"\s*:/i.test(context) || /<meta[^>]+property=[\"']og:video/i.test(context)) {
      return c.url;
    }
  }
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
          const permalink = extractLatestStandardVideo(html);
          cache = { at: Date.now(), permalink };
          return Response.json({ permalink });
        } catch (error) {
          console.error("No se pudo obtener el último vídeo estándar de Instagram", error);
          return Response.json({ permalink: cache.permalink, error: "Instagram no disponible temporalmente" });
        }
      },
    },
  },
});
