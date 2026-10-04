import { useEffect, useRef } from "react";
import { SITE } from "@/lib/content";
import { saveConsent, useThirdPartyConsent } from "@/lib/consent";

function loadExternalScript(src: string, id: string, onReady?: () => void) {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  if (existing) {
    onReady?.();
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  script.onload = () => onReady?.();
  document.body.appendChild(script);
}

function InstagramEmbed() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadExternalScript("https://www.instagram.com/embed.js", "pd-instagram-embed", () => {
      const instagram = (window as Window & { instgrm?: { Embeds?: { process: () => void } } })
        .instgrm;
      instagram?.Embeds?.process();
    });
  }, []);

  return (
    <div
      ref={ref}
      className="flex min-h-[560px] items-start justify-center overflow-hidden rounded-3xl bg-white p-3 sm:p-5"
    >
      <blockquote
        className="instagram-media w-full"
        data-instgrm-permalink={SITE.instagram}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: 12,
          margin: 0,
          maxWidth: 658,
          minWidth: 288,
          width: "100%",
        }}
      >
        <a href={SITE.instagram} target="_blank" rel="noreferrer">
          @assumptaserna
        </a>
      </blockquote>
    </div>
  );
}

function TikTokEmbed() {
  useEffect(() => {
    loadExternalScript("https://www.tiktok.com/embed.js", "pd-tiktok-embed", () => {
      // TikTok's embed.js processes creator-profile blockquotes automatically.
    });
  }, []);

  return (
    <div className="flex min-h-[560px] items-start justify-center overflow-hidden rounded-3xl bg-white p-3 sm:p-5">
      <blockquote
        className="tiktok-embed w-full"
        cite={SITE.tiktok}
        data-unique-id="assumptaserna_fdc"
        data-embed-type="creator"
        style={{ maxWidth: 720, minWidth: 288, width: "100%" }}
      >
        <section>
          <a href={SITE.tiktok} target="_blank" rel="noreferrer">
            @assumptaserna_fdc
          </a>
        </section>
      </blockquote>
    </div>
  );
}

function ConsentGate({
  href,
  network,
  children,
}: {
  href: string;
  network: string;
  children: React.ReactNode;
}) {
  const allowed = useThirdPartyConsent();
  if (allowed) return <>{children}</>;
  return (
    <div className="flex min-h-[280px] flex-col items-start justify-center gap-4 rounded-3xl bg-white p-6 text-foreground sm:p-8">
      <p className="max-w-prose leading-relaxed">
        Este contenido lo ofrece un servicio externo y puede instalar cookies de terceros. Para
        verlo, acepta las cookies de terceros.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => saveConsent("aceptadas")}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Aceptar cookies de terceros y mostrar
        </button>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-primary underline underline-offset-4"
        >
          Abrir en {network}
        </a>
      </div>
    </div>
  );
}

export function InstagramFeed() {
  return (
    <ConsentGate href={SITE.instagram} network="Instagram">
      <InstagramEmbed />
    </ConsentGate>
  );
}

export function TikTokFeed() {
  return (
    <ConsentGate href={SITE.tiktok} network="TikTok">
      <TikTokEmbed />
    </ConsentGate>
  );
}

function SpotifyEmbed() {
  return (
    <iframe
      title="Lista de reproducción colaborativa de Plataforma Dorada en Spotify"
      src={`https://open.spotify.com/embed/playlist/${SITE.spotifyPlaylistId}`}
      width="100%"
      height="352"
      style={{ border: 0, borderRadius: 12 }}
      allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}

export function SpotifyFeed() {
  return (
    <ConsentGate
      href={`https://open.spotify.com/playlist/${SITE.spotifyPlaylistId}`}
      network="Spotify"
    >
      <SpotifyEmbed />
    </ConsentGate>
  );
}
