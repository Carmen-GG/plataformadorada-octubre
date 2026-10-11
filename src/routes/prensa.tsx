import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, Headphones, Tv } from "lucide-react";
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

function videoEmbedUrl(raw: string) {
  try {
    const u = new URL(raw);
    if (u.hostname === "youtu.be") return "https://www.youtube-nocookie.com/embed/" + u.pathname.slice(1);
    if (u.hostname.endsWith("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return "https://www.youtube-nocookie.com/embed/" + id;
      if (u.pathname.startsWith("/embed/")) return "https://www.youtube-nocookie.com" + u.pathname;
    }
    if (u.hostname.endsWith("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id)) return "https://player.vimeo.com/video/" + id;
    }
  } catch {}
  return "";
}

function audioEmbedUrl(raw: string) {
  try {
    const u = new URL(raw);
    if (u.hostname === "open.spotify.com") {
      const parts = u.pathname.split("/").filter(Boolean);
      if (["episode", "show", "track", "album"].includes(parts[0] || "") && parts[1]) {
        return "https://open.spotify.com/embed/" + parts[0] + "/" + parts[1];
      }
    }
    if (u.hostname === "soundcloud.com" || u.hostname === "www.soundcloud.com") {
      return "https://w.soundcloud.com/player/?url=" + encodeURIComponent(u.toString()) + "&auto_play=false";
    }
  } catch {}
  return "";
}

function MediaStage({ item }: { item: NonNullable<ReturnType<typeof useCmsContent>>["noticias"][number] | null }) {
  const type = item?.type || "texto";
  const videoItem = item && type === "video" ? item : null;
  const audioItem = item && type === "audio" ? item : null;
  const textItem = item && type === "texto" ? item : null;

  const videoUrl = videoItem ? (videoItem.mediaUrl || videoItem.url) : "";
  const embed = videoUrl ? videoEmbedUrl(videoUrl) : "";
  const audioSrc = audioItem ? (audioItem.mediaUrl || audioItem.url) : "";
  const directAudio = /\\.(mp3|m4a|ogg|wav|aac|opus)(?:$|[?#])/i.test(audioSrc);
  const audioEmbed = audioSrc ? audioEmbedUrl(audioSrc) : "";

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-3xl border border-border bg-slate-950 p-3 text-white shadow-sm sm:p-5">
        <div className="mb-3 flex items-center gap-2"><Tv aria-hidden="true" /><h2 className="font-display text-lg font-semibold">Visor de vídeo</h2></div>
        {videoItem ? (
          <>
            {embed ? <div className="aspect-video overflow-hidden rounded-xl bg-black"><iframe className="h-full w-full" src={embed} title={`Vídeo: ${videoItem.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" /></div> : <div className="rounded-xl bg-slate-800 p-5"><p className="text-sm text-slate-200">Este proveedor no permite insertar automáticamente el vídeo. Puedes abrirlo en su página original.</p><a className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900" href={videoUrl} target="_blank" rel="noreferrer">Ver vídeo externo</a></div>}
            <h3 className="mt-3 font-semibold">{videoItem.title}</h3>
            {videoItem.summary && <p className="mt-1 text-sm text-slate-200">{videoItem.summary}</p>}
          </>
        ) : <div className="flex aspect-video flex-col items-center justify-center rounded-xl bg-slate-800 px-5 text-center text-slate-200"><Tv size={32} aria-hidden="true" /><p className="mt-3 font-semibold">{item ? "Esta noticia no es un vídeo" : "Selecciona una noticia"}</p><p className="mt-1 text-sm text-slate-300">Los vídeos seleccionados aparecerán aquí.</p></div>}
      </section>

      <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-3"><div className="rounded-2xl bg-primary/10 p-3 text-primary"><Headphones size={26} aria-hidden="true" /></div><div><p className="text-xs font-semibold uppercase tracking-widest text-primary">Audio / podcast</p><h2 className="font-display text-lg font-semibold">Reproductor de audio</h2></div></div>
        {audioItem ? <><h3 className="mb-3 font-semibold">{audioItem.title}</h3>{directAudio ? <audio key={audioSrc} className="w-full" controls preload="none" src={audioSrc}>Tu navegador no admite la reproducción de audio. <a href={audioSrc}>Abrir audio</a>.</audio> : audioEmbed ? <iframe key={audioEmbed} className="h-40 w-full rounded-xl border-0 sm:h-48" src={audioEmbed} title={`Reproductor de audio: ${audioItem.title}`} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" /> : <p className="text-sm text-muted-foreground">Este enlace no se puede reproducir aquí automáticamente. Puedes abrirlo en la plataforma de origen.</p>}<a className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" href={audioSrc} target="_blank" rel="noreferrer">Abrir audio o podcast</a>{audioItem.summary && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{audioItem.summary}</p>}</> : <p className="rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">{item ? "Esta noticia no contiene audio. Selecciona una noticia de tipo audio para escucharla aquí." : "Cuando selecciones una noticia de audio, podrás escucharla aquí."}</p>}
      </section>

      <article className="overflow-hidden rounded-3xl border border-amber-200 bg-[#fff9ed] text-[#382b1d] shadow-sm">
        <div className="border-b-4 border-double border-amber-300 px-5 py-4 text-center sm:px-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8a6a43]">Plataforma Dorada · Prensa</p>
          <div className="my-2 border-y border-[#bba17e] py-2"><h2 className="font-serif text-3xl font-black tracking-tight sm:text-4xl">EL PERIÓDICO</h2></div>
          <p className="text-[10px] uppercase tracking-widest text-[#8a6a43]">Dependencia · Cuidados · Derechos</p>
        </div>
        {textItem ? <div className="p-5 sm:p-7"><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#8a6a43]">{[textItem.media, textItem.date].filter(Boolean).join(" · ")}</p><h3 className="font-serif text-2xl font-bold leading-tight sm:text-3xl">{textItem.title}</h3>{textItem.summary && <p className="mt-4 border-l-4 border-amber-300 pl-4 font-serif text-lg italic leading-relaxed">{textItem.summary}</p>}<div className="mt-5 whitespace-pre-line font-serif text-base leading-8">{textItem.contentText || "No se ha añadido el texto completo de esta noticia. Puedes consultar la fuente original."}</div>{textItem.url && <a className="mt-6 inline-flex rounded-full bg-[#704516] px-5 py-3 text-sm font-semibold text-white" href={textItem.url} target="_blank" rel="noreferrer">Leer noticia original</a>}</div> : <div className="p-6 text-center sm:p-8"><BookOpen size={32} className="mx-auto text-[#8a6a43]" aria-hidden="true" /><h3 className="mt-3 font-serif text-xl font-bold">{item ? "Esta noticia no es un texto" : "Tu espacio de lectura"}</h3><p className="mt-2 text-sm leading-relaxed text-[#725d45]">{item ? "Selecciona una noticia de tipo texto para leerla en esta página de periódico." : "Al seleccionar una noticia de texto, su contenido aparecerá maquetado como una página de periódico."}</p></div>}
      </article>
    </div>
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
  const [selectedNewsKey, setSelectedNewsKey] = useState<string>("");
  const selectedNews = news.find((item, index) => newsKey(item, index) === selectedNewsKey) ?? news[0] ?? null;
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
          <button type="button" role="tab" id="tab-prensa" aria-controls="panel-prensa" aria-selected={activeTab === "prensa"} onClick={() => setActiveTab("prensa")} className={activeTab === "prensa" ? "rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm" : "rounded-xl px-5 py-3 text-sm font-semibold text-muted-foreground hover:bg-background hover:text-foreground"}>Prensa</button>
          <button type="button" role="tab" id="tab-recursos" aria-controls="panel-recursos" aria-selected={activeTab === "recursos"} onClick={() => setActiveTab("recursos")} className={activeTab === "recursos" ? "rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm" : "rounded-xl px-5 py-3 text-sm font-semibold text-muted-foreground hover:bg-background hover:text-foreground"}>Material oficial descargable</button>
        </div>

        <div id="panel-prensa" role="tabpanel" aria-labelledby="tab-prensa" hidden={activeTab !== "prensa"}>
          {news.length ? (
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="space-y-3" aria-label="Listado de noticias">
                <h2 className="font-display text-xl font-semibold">Noticias</h2>
                {news.map((item) => {
                  const itemKey = newsKey(item, news.indexOf(item));
                  const active = selectedNews ? newsKey(selectedNews, news.indexOf(selectedNews)) === itemKey : false;
                  const type = item.type || "texto";
                  return <button key={itemKey} type="button" onClick={() => setSelectedNewsKey(itemKey)} aria-pressed={active} className={active ? "w-full rounded-2xl border-2 border-primary bg-primary/5 p-4 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" : "w-full rounded-2xl border border-border bg-card p-4 text-left transition hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"}>
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold uppercase"><span aria-hidden="true">{type === "video" ? "▶" : type === "audio" ? "♫" : "▤"}</span>{type === "video" ? "Vídeo" : type === "audio" ? "Audio / podcast" : "Texto"}</span>
                    <span className="mt-2 block font-display text-lg font-semibold">{item.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{[item.media,item.date].filter(Boolean).join(" · ")}</span>
                    {item.summary && <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{item.summary}</span>}
                  </button>;
                })}
              </div>
              <div className="min-w-0 lg:sticky lg:top-6"><MediaStage item={selectedNews} /></div>
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
