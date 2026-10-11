import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/content";
import { useCmsContent, type CmsResource } from "@/lib/cms";

export const Route = createFileRoute("/prensa")({
  head: () => pageHead({ path: "/prensa", title: "Prensa y recursos", description: "Noticias de prensa y materiales para comunicar y compartir Plataforma Dorada." }),
  component: Page,
});

function extension(filename: string) {
  const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] ?? "archivo";
}

function categoryFor(resource: CmsResource) {
  if (resource.category?.trim()) return resource.category.trim();
  const ext = extension(resource.filename);
  if (ext === "pdf") return "PDFs";
  if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) return "Imágenes";
  if (["ppt", "pptx"].includes(ext)) return "Presentaciones";
  return "Otros";
}

function newsKey(item: { id: string; title: string; url: string }, index: number) {
  // Los IDs del CMS pueden estar vacíos o repetidos; la selección necesita una clave estable y única.
  return item.id ? `${item.id}::${item.url}::${item.title}::${index}` : `${item.url}::${item.title}::${index}`;
}

function ResourcePreview({ resource }: { resource: CmsResource }) {
  const [broken, setBroken] = useState(false);
  const thumb = resource.previewUrl || resource.url;
  const kind = extension(resource.filename);

  if (!thumb || broken) {
    return (
      <div className="flex h-44 w-full flex-col items-center justify-center rounded-2xl bg-accent/15 text-primary">
        <span className="font-display text-3xl font-semibold uppercase">{kind === "archivo" ? "DOC" : kind}</span>
        <span className="mt-1 text-xs font-semibold">Vista previa no disponible</span>
      </div>
    );
  }

  return (
    <a href={resource.url || thumb} target="_blank" rel="noreferrer" className="block" aria-label={`Abrir ${resource.title}`}>
      <img
        src={thumb}
        alt={`Miniatura de ${resource.title}`}
        className="h-44 w-full rounded-2xl object-contain bg-background"
        loading="lazy"
        onError={() => setBroken(true)}
      />
    </a>
  );
}

function embeddedMediaUrl(raw: string) {
  try {
    const u = new URL(raw);
    const host = u.hostname.toLowerCase();

    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1` : "";
    }
    if (host === "youtube.com" || host.endsWith(".youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      if (u.pathname.startsWith("/embed/")) return `https://www.youtube-nocookie.com${u.pathname}`;
    }
    if (host === "vimeo.com" || host.endsWith(".vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    if (host === "open.spotify.com") {
      const parts = u.pathname.split("/").filter(Boolean);
      if (["episode", "show", "track", "album"].includes(parts[0] || "") && parts[1]) {
        return `https://open.spotify.com/embed/${parts[0]}/${parts[1]}`;
      }
    }
    if (host === "soundcloud.com" || host === "www.soundcloud.com") {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(u.toString())}&auto_play=false`;
    }
    return "";
  } catch {
    return "";
  }
}

function MediaStage({ item }: { item: NonNullable<ReturnType<typeof useCmsContent>>["noticias"][number] | null }) {
  const pageUrl = item?.url?.trim() || "";
  const embedUrl = pageUrl ? embeddedMediaUrl(pageUrl) : "";
  const isDirectAudio = /\.(mp3|m4a|ogg|wav|aac|opus)(?:$|[?#])/i.test(pageUrl);
  const isDirectVideo = /\.(mp4|webm|ogv)(?:$|[?#])/i.test(pageUrl);

  return (
    <section className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[2.5rem] border-[8px] border-foreground/85 bg-foreground p-2 shadow-2xl">
      <div className="overflow-hidden rounded-[1.8rem] bg-background">
        <header className="flex min-h-20 flex-col items-center justify-center border-b border-border bg-card px-4 py-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Plataforma Dorada</p>
          <h2 className="mt-1 font-display text-base font-bold leading-tight text-foreground">Últimas noticias</h2>
          {item && <p className="mt-1 max-w-full truncate text-[11px] text-muted-foreground">{item.title}</p>}
        </header>

        <div className="relative aspect-[9/16] w-full overflow-y-auto bg-white text-[#382b1d]">
          {!item ? (
            <div className="flex min-h-full flex-col items-center justify-center px-6 py-10 text-center">
              <span className="font-display text-4xl font-bold text-primary" aria-hidden="true">PD</span>
              <h3 className="mt-4 font-display text-lg font-semibold">Plataforma Dorada</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Selecciona una noticia para verla aquí.</p>
            </div>
          ) : embedUrl ? (
            <iframe
              key={embedUrl}
              className="absolute inset-0 h-full w-full border-0 bg-white"
              src={embedUrl}
              title={`Plataforma Dorada: ${item.title}`}
              loading="eager"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : isDirectAudio ? (
            <div className="flex min-h-full flex-col justify-center px-5 py-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8a6a43]">{item.media || "Audio / podcast"}</p>
              <h3 className="mt-3 font-serif text-xl font-bold leading-tight">{item.title}</h3>
              {item.summary && <p className="mt-3 text-sm leading-relaxed">{item.summary}</p>}
              <audio className="mt-6 w-full" controls autoPlay preload="metadata" src={pageUrl}>Tu navegador no admite la reproducción de audio.</audio>
            </div>
          ) : isDirectVideo ? (
            <video className="h-full min-h-full w-full bg-black object-contain" controls autoPlay playsInline src={pageUrl}>Tu navegador no admite la reproducción de vídeo.</video>
          ) : (
            <article className="px-5 py-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8a6a43]">{[item.media, item.date].filter(Boolean).join(" · ")}</p>
              <h3 className="mt-3 font-serif text-2xl font-bold leading-tight">{item.title}</h3>
              {item.summary && <p className="mt-4 border-l-4 border-amber-300 pl-3 font-serif text-base italic leading-relaxed">{item.summary}</p>}
              {item.contentText && <div className="mt-4 whitespace-pre-line font-serif text-sm leading-6">{item.contentText}</div>}
              <p className="mt-5 text-xs leading-relaxed text-[#725d45]">
                La web de origen no permite mostrarse dentro del teléfono o no ofrece un formato incrustable. Puedes leer aquí los datos disponibles de la noticia y abrir la fuente original.
              </p>
              {pageUrl && <a href={pageUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-[#704516] px-4 py-2.5 text-xs font-semibold text-white">Leer noticia original ↗</a>}
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

function Page() {
  const cms = useCmsContent();
  const resources = cms?.recursos ?? [];
  const news = cms?.noticias ?? [];
  const [activeTab, setActiveTab] = useState<"prensa" | "recursos">(() => {
    if (typeof window === "undefined") return "prensa";
    const hash = window.location.hash.toLowerCase();
    if (hash.includes("recursos") || hash.includes("tab-recursos")) return "recursos";
    return "prensa";
  });

  useEffect(() => {
    const syncTabFromHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("recursos") || hash.includes("tab-recursos")) {
        setActiveTab("recursos");
      } else if (hash.includes("prensa") || hash.includes("tab-prensa") || !hash) {
        setActiveTab("prensa");
      }
    };
    syncTabFromHash();
    window.addEventListener("hashchange", syncTabFromHash);
    return () => window.removeEventListener("hashchange", syncTabFromHash);
  }, []);
  const NEWS_PER_PAGE = 5;
  const [newsPage, setNewsPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(news.length / NEWS_PER_PAGE));
  const visibleNews = news.slice((newsPage - 1) * NEWS_PER_PAGE, newsPage * NEWS_PER_PAGE);
  const [selectedNewsKey, setSelectedNewsKey] = useState<string>("");
  // El reproductor permanece vacío hasta que la persona elija una noticia.
  const selectedNews = selectedNewsKey
    ? visibleNews.find((item) => newsKey(item, news.indexOf(item)) === selectedNewsKey) ?? null
    : null;

  useEffect(() => {
    if (newsPage > pageCount) setNewsPage(pageCount);
  }, [newsPage, pageCount]);

  useEffect(() => {
    if (!selectedNewsKey || typeof document === "undefined") return;
    const player = document.getElementById("reproductor-prensa");
    player?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedNewsKey]);
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(resources.map(categoryFor)))], [resources]);
  const [selected, setSelected] = useState("Todos");
  const visible = selected === "Todos" ? resources : resources.filter((resource) => categoryFor(resource) === selected);

  return (
    <>
      <PageHeader
        eyebrow="Para medios y difusión"
        title="Rincón de prensa"
        lead={`Contacto de prensa: ${SITE.email}`}
      >
        <span className="text-sm text-muted-foreground">Consulta las noticias que compartimos y los materiales para comunicar Plataforma Dorada.</span>
      </PageHeader>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <div className="mb-7 flex flex-wrap gap-2 rounded-2xl border border-border bg-muted/40 p-2" role="tablist" aria-label="Secciones de prensa y recursos">
          <button type="button" role="tab" id="tab-prensa" aria-controls="panel-prensa" aria-selected={activeTab === "prensa"} onClick={() => setActiveTab("prensa")} className={activeTab === "prensa" ? "rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm" : "rounded-xl px-5 py-3 text-sm font-semibold text-muted-foreground hover:bg-background hover:text-foreground"}>Noticias</button>
          <button type="button" role="tab" id="tab-recursos" aria-controls="panel-recursos" aria-selected={activeTab === "recursos"} onClick={() => setActiveTab("recursos")} className={activeTab === "recursos" ? "rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm" : "rounded-xl px-5 py-3 text-sm font-semibold text-muted-foreground hover:bg-background hover:text-foreground"}>Material oficial descargable</button>
        </div>

        <div id="panel-prensa" role="tabpanel" aria-labelledby="tab-prensa" hidden={activeTab !== "prensa"}>
          {news.length ? (
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="space-y-3" aria-label="Listado de noticias">
                <h2 className="font-display text-xl font-semibold">Noticias</h2>
                {visibleNews.map((item) => {
                  const itemKey = newsKey(item, news.indexOf(item));
                  const active = selectedNews ? newsKey(selectedNews, news.indexOf(selectedNews)) === itemKey : false;
                  const type = item.type || "texto";
                  return <article key={itemKey} className={active ? "w-full rounded-2xl border-2 border-primary bg-primary/5 p-4 text-left shadow-sm" : "w-full rounded-2xl border border-border bg-card p-4 text-left transition hover:border-primary/50"}>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase text-foreground"><span aria-hidden="true">{type === "video" ? "▶" : type === "audio" ? "♫" : "▤"}</span>{type === "video" ? "Vídeo" : type === "audio" ? "Audio / podcast" : "Texto"}</span>
                      {item.date && <span>{item.date}</span>}
                      {item.date && item.media && <span aria-hidden="true">·</span>}
                      {item.media && <span>{item.media}</span>}
                    </div>
                    <button type="button" onClick={() => setSelectedNewsKey(itemKey)} aria-pressed={active} className="mt-2 block w-full text-left font-display text-xl font-semibold leading-snug hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{item.title}</button>
                    {item.summary && <p className="mt-2 text-xs leading-relaxed text-muted-foreground break-words">{item.summary}</p>}
                    {item.url && <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 mr-4 inline-flex items-center gap-1 text-[11px] font-medium text-primary underline underline-offset-4 hover:text-primary/80">Enlace original <span aria-hidden="true">↗</span></a>}
                    <button type="button" onClick={() => setSelectedNewsKey(itemKey)} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary underline underline-offset-4 hover:text-primary/80">Abrir en el reproductor <span aria-hidden="true">→</span></button>
                  </article>;
                })}
                {pageCount > 1 && <nav className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4" aria-label="Paginación de noticias">
                  <span className="text-xs text-muted-foreground">Página {newsPage} de {pageCount} · {news.length} noticias</span>
                  <div className="flex items-center gap-2">
                    <button type="button" disabled={newsPage === 1} onClick={() => { const next = newsPage - 1; setNewsPage(next); setSelectedNewsKey(""); }} className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-40">Anterior</button>
                    <button type="button" disabled={newsPage === pageCount} onClick={() => { const next = newsPage + 1; setNewsPage(next); setSelectedNewsKey(""); }} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40">Siguiente</button>
                  </div>
                </nav>}
              </div>
              <div id="reproductor-prensa" className="min-w-0 scroll-mt-6 lg:sticky lg:top-6"><MediaStage item={selectedNews} /></div>
            </div>
          ) : (
            <p className="rounded-2xl border border-border bg-muted/30 p-6 text-muted-foreground">Todavía no hay noticias publicadas. Cuando se introduzcan y publiquen desde el backoffice, aparecerán aquí.</p>
          )}
        </div>

        <div id="panel-recursos" role="tabpanel" aria-labelledby="tab-recursos" hidden={activeTab !== "recursos"}>
        <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filtrar recursos por tipo">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={selected === category}
              onClick={() => setSelected(category)}
              className={selected === category ? "rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground" : "glass-soft rounded-full px-5 py-2.5 text-sm font-semibold text-primary"}
            >
              {category}
            </button>
          ))}
        </div>

        {visible.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((resource) => (
              <Panel key={resource.id} className="overflow-hidden p-0">
                <div className="p-4 pb-0"><ResourcePreview resource={resource} /></div>
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-widest text-primary uppercase">{categoryFor(resource)}</p>
                  <h2 className="mt-2 font-display text-xl font-semibold">{resource.title}</h2>
                  {resource.description && <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>}
                  {resource.url ? (
                    <a href={resource.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Abrir / descargar</a>
                  ) : (
                    <p className="mt-4 text-sm text-muted-foreground">Archivo pendiente de publicación.</p>
                  )}
                </div>
              </Panel>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No hay recursos de este tipo todavía.</p>
        )}
        </div>
      </section>
    </>
  );
}
