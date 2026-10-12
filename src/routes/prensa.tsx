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

function resourceThumbnailUrl(resource: CmsResource) {
  const preview = resource.previewUrl?.trim();
  if (preview) return preview;

  const url = resource.url?.trim();
  if (!url) return "";
  try {
    const parsed = new URL(url);
    const driveId =
      parsed.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ||
      parsed.searchParams.get("id");
    if ((parsed.hostname === "drive.google.com" || parsed.hostname === "docs.google.com") && driveId) {
      return `https://drive.google.com/thumbnail?id=${encodeURIComponent(driveId)}&sz=w1000`;
    }
  } catch {
    // Si la URL no es absoluta, probamos a usarla tal como llega del CMS.
  }
  return url;
}

function ResourcePreview({ resource }: { resource: CmsResource }) {
  const [broken, setBroken] = useState(false);
  const thumb = resourceThumbnailUrl(resource);
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

function MediaStage({ item }: { item: NonNullable<ReturnType<typeof useCmsContent>>["noticias"][number] | null }) {
  // La vista previa siempre abre el enlace asociado, sin ramificar por tipo de contenido.
  // Si url está vacío, usa mediaUrl como alternativa para noticias del CMS que lo tengan.
  const pageUrl = item?.url?.trim() || item?.mediaUrl?.trim() || "";

  return (
    <section className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[2.5rem] border-[8px] border-foreground/85 bg-foreground p-2 shadow-2xl">
      <div className="overflow-hidden rounded-[1.8rem] bg-background">
        <header className="flex min-h-20 flex-col items-center justify-center border-b border-border bg-card px-4 py-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Plataforma Dorada</p>
          <h2 className="mt-1 max-w-full font-display text-base font-bold leading-tight text-foreground">{item?.title || "Últimas noticias"}</h2>
        </header>
        <div className="relative aspect-[9/16] w-full bg-white">
          {pageUrl ? (
            <iframe
              key={pageUrl}
              className="absolute inset-0 h-full w-full border-0 bg-white"
              src={pageUrl}
              title={item ? item.title : "Últimas noticias de Plataforma Dorada"}
              loading="eager"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <span className="font-display text-4xl font-bold text-primary" aria-hidden="true">PD</span>
              <h3 className="mt-4 font-display text-lg font-semibold">Plataforma Dorada</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Selecciona una noticia para abrirla aquí.</p>
            </div>
          )}
        </div>
      </div>
      {item && pageUrl && (
        <div className="px-3 py-3 text-center">
          <p className="text-[10px] leading-relaxed text-primary-foreground/80">Si la página externa bloquea la visualización incrustada, puedes abrirla directamente.</p>
          <a href={pageUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground underline underline-offset-2">Abrir en otra pestaña ↗</a>
        </div>
      )}
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
    ? news.find((item) => newsKey(item, news.indexOf(item)) === selectedNewsKey) ?? null
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
          ) : cms === null ? (
            <p className="rounded-2xl border border-border bg-muted/30 p-6 text-muted-foreground" role="status">Cargando noticias…</p>
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
