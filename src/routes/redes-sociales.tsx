import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Instagram, Music2, Headphones, Quote, Youtube, HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { LatestInstagramVideo, TikTokFeed } from "@/components/social-feeds";
import { SITE } from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { useCmsContent, type CmsVideo } from "@/lib/cms";

const fallbackPhrases = [
  "Cuidar también es sostener la vida.",
  "La dependencia necesita derechos, recursos y tiempo.",
  "Los cuidados son una responsabilidad colectiva.",
  "Por un Pacto de Estado por la Dependencia y los Cuidados.",
];

const socialTabs = [
  { id: "instagram", label: "Instagram", Icon: Instagram },
  { id: "tiktok", label: "TikTok", Icon: Music2 },
  { id: "spotify", label: "Spotify", Icon: Headphones },
  { id: "lemas", label: "Lemas", Icon: Quote },
  { id: "videos", label: "Vídeos", Icon: Youtube },
] as const;

type SocialTab = (typeof socialTabs)[number]["id"];

function ProposalForm({ type }: { type: "cancion" | "frase" }) {
  const [title, setTitle] = useState(""); const [artist, setArtist] = useState(""); const [text, setText] = useState(""); const [proposer, setProposer] = useState(""); const [status, setStatus] = useState("");
  const submit = async (e: FormEvent) => { e.preventDefault(); setStatus("Enviando…"); try { const r = await fetch("/api/cms", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({type,title,artist,text,proposer}) }); const d=await r.json(); if(!r.ok) throw new Error(d.error||"No se ha podido enviar"); setTitle("");setArtist("");setText("");setProposer("");setStatus("Gracias. La propuesta queda pendiente de revisión."); } catch(err){setStatus(err instanceof Error?err.message:"No se ha podido enviar la propuesta.");} };
  return <form onSubmit={submit} className="mt-5 space-y-3 rounded-2xl border border-border bg-background/60 p-4">
    {type === "cancion" ? <><label className="block text-sm font-semibold">Canción<input required value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2" /></label><label className="block text-sm font-semibold">Artista<input required value={artist} onChange={e=>setArtist(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2" /></label></> : <label className="block text-sm font-semibold">Frase o cita<textarea required value={text} onChange={e=>setText(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2" /></label>}
    <label className="block text-sm font-semibold">Tu nombre (opcional)<input value={proposer} onChange={e=>setProposer(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2" /></label>
    <button type="submit" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Enviar propuesta</button>
    {status && <p className="text-sm text-muted-foreground" role="status">{status}</p>}
  </form>;
}

function PhraseCarousel({ phrases }: { phrases: string[] }) {
  const [index,setIndex]=useState(0); const [paused,setPaused]=useState(false);
  useEffect(()=>{if(paused||phrases.length<2)return;const id=window.setInterval(()=>setIndex(i=>(i+1)%phrases.length),6500);return()=>window.clearInterval(id)},[paused,phrases.length]);
  if(!phrases.length)return null;
  return <div className="mt-5 rounded-3xl bg-accent/15 p-7 sm:p-9" aria-roledescription="carrusel" aria-label="Frases de Plataforma Dorada">
    <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Frase destacada</p>
    <blockquote className="mt-4 min-h-24 font-display text-2xl leading-snug italic sm:text-3xl" aria-live="polite">“{phrases[index]}”</blockquote>
    <div className="mt-6 flex flex-wrap gap-3"><button type="button" className="rounded-full border border-border px-4 py-2 text-sm font-semibold" onClick={()=>setIndex(i=>(i-1+phrases.length)%phrases.length)}>Anterior</button><button type="button" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" onClick={()=>setPaused(v=>!v)} aria-pressed={paused}>{paused?"Reanudar":"Pausar"}</button><button type="button" className="rounded-full border border-border px-4 py-2 text-sm font-semibold" onClick={()=>setIndex(i=>(i+1)%phrases.length)}>Siguiente</button></div>
  </div>;
}

export const Route = createFileRoute("/redes-sociales")({ head:()=>pageHead({path:"/redes-sociales",title:"Redes sociales",description:"Instagram, TikTok, Spotify y frases de Plataforma Dorada."}), component:RedesSociales });

function RedesSociales(){
  const cms=useCmsContent();
  const phrases=((cms?.frases??[]).map(x=>x.text).filter(Boolean));
  const visiblePhrases=phrases.length?phrases:fallbackPhrases;
  const [activeTab, setActiveTab] = useState<SocialTab>("instagram");
  const locationHash = useLocation({ select: (location) => location.hash });

  useEffect(() => {
    const hash = locationHash.replace("#", "");
    if (socialTabs.some((tab) => tab.id === hash)) setActiveTab(hash as SocialTab);
  }, [locationHash]);

  const changeTab = (id: SocialTab) => {
    setActiveTab(id);
    window.history.replaceState(null, "", window.location.pathname + window.location.search + "#" + id);
  };

  return <>
    <PageHeader
      eyebrow="Redes sociales"
      title="Síguenos y participa"
      lead="Encuentra nuestras publicaciones y ayúdanos a construir una comunidad que también comparte música, frases y mensajes por los cuidados."
      titleAside={
        <a
          href="https://plataforma-dorada.ccguzmangallego.workers.dev/imagen-perfil"
          className="group relative inline-flex max-w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 px-6 py-4 text-base font-extrabold text-slate-950 shadow-[0_8px_24px_rgba(245,158,11,0.32)] transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(245,158,11,0.42)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 focus-visible:ring-offset-2 sm:px-7 sm:py-5 sm:text-lg"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
          <HeartHandshake size={26} strokeWidth={2.5} aria-hidden="true" />
          <span className="relative flex flex-col items-start leading-tight">
            <span>Crea tu imagen de perfil</span>
            <span className="mt-1 text-xs font-bold uppercase tracking-[0.12em] sm:text-sm">Únete al movimiento solidario</span>
          </span>
          <span className="text-2xl leading-none" aria-hidden="true">→</span>
        </a>
      }
    />
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-muted/40 p-2 sm:grid-cols-3 lg:grid-cols-5" role="tablist" aria-label="Contenido de redes sociales">
        {socialTabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => changeTab(tab.id)}
            className={`rounded-xl px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${activeTab === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}
          >
            <span className="inline-flex items-center justify-center gap-2"><tab.Icon aria-hidden="true" size={17} strokeWidth={2.2} />{tab.label}</span>
          </button>
        ))}
      </div>

      <div id="panel-instagram" role="tabpanel" aria-labelledby="tab-instagram" hidden={activeTab !== "instagram"}>
        <article id="instagram" className="glass-panel rounded-3xl p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Instagram</p>
              <h2 className="mt-1 font-display text-2xl font-semibold">@assumptaserna</h2>
              <p className="mt-2 text-sm text-muted-foreground">Sigue el perfil de Assumpta Serna y descubre sus publicaciones sobre Plataforma Dorada.</p>
            </div>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Ver perfil de Instagram <Instagram size={17} aria-hidden="true" /></a>
          </div>
          <div className="mx-auto mt-5 max-w-2xl">
            <div className="mb-4 rounded-2xl border border-border bg-background/70 p-4 text-sm text-muted-foreground">
              Instagram no permite incrustar de forma fiable un perfil completo en todas las webs. Por eso mostramos el acceso directo al perfil y, cuando Instagram lo permite, el último vídeo público.
            </div>
            <LatestInstagramVideo />
          </div>
        </article>
      </div>

      <div id="panel-tiktok" role="tabpanel" aria-labelledby="tab-tiktok" hidden={activeTab !== "tiktok"}>
        <article id="tiktok" className="glass-panel rounded-3xl p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">TikTok</p><h2 className="mt-1 font-display text-2xl font-semibold">Últimos vídeos</h2></div>
            <a href={SITE.tiktok} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Ver TikTok</a>
          </div>
          <div className="mt-5"><TikTokFeed /></div>
        </article>
      </div>

      <div id="panel-spotify" role="tabpanel" aria-labelledby="tab-spotify" hidden={activeTab !== "spotify"}>
        <article id="spotify" className="glass-panel rounded-3xl p-5 sm:p-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Spotify</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Nuestra música</h2>
          <p className="mt-2 text-sm text-muted-foreground">Canciones que nos acompañan y nos representan.</p>
          <div className="mt-5 overflow-hidden rounded-2xl"><iframe title="Spotify de Plataforma Dorada" src={`https://open.spotify.com/embed/playlist/${SITE.spotifyPlaylistId}`} width="100%" height="152" style={{border:0}} allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /></div>
          <ProposalForm type="cancion" />
        </article>
      </div>

      <div id="panel-lemas" role="tabpanel" aria-labelledby="tab-lemas" hidden={activeTab !== "lemas"}>
        <article id="lemas" className="glass-panel rounded-3xl p-5 sm:p-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Palabras</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Lemas y citas</h2>
          <PhraseCarousel phrases={visiblePhrases}/>
          <ProposalForm type="frase" />
        </article>
      </div>
      <div id="panel-videos" role="tabpanel" aria-labelledby="tab-videos" hidden={activeTab !== "videos"}>
        <article id="videos" className="glass-panel rounded-3xl p-5 sm:p-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Archivo audiovisual</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Plataforma Dorada en vídeo</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Entrevistas y vídeos sobre la dependencia, los cuidados y la iniciativa de Plataforma Dorada. Abre una búsqueda de la lista y pega el enlace del vídeo que quieras reproducir en el televisor.</p>
          <VideosLibrary videos={cms?.videos ?? videoSearches} />
        </article>
      </div>
    </section>
  </>;
}

const videoSearches: CmsVideo[] = [
  { id: "video-1", title: "Plataforma Dorada · Vídeo 1", description: "Vídeo de YouTube", url: "https://www.youtube.com/watch?v=-s3pZV8apaY", platform: "youtube", order: 1, published: true },
  { id: "video-2", title: "Plataforma Dorada · Vídeo 2", description: "Vídeo de YouTube", url: "https://www.youtube.com/watch?v=5sbiaLrUKjM", platform: "youtube", order: 2, published: true },
  { id: "video-3", title: "¿Qué es Plataforma Dorada?", description: "Vídeo publicado en Facebook por Assumpta Serna y Alicia Lopmar", url: "https://www.facebook.com/100058237623701/videos/ya-sab%C3%A9is-qu%C3%A9-es-plataforma-dorada-assumptaserna-y-alicialopmar-est%C3%A1n-denunciand/1070927795538559/", platform: "facebook", order: 3, published: true },
  { id: "video-4", title: "3 millones de visualizaciones y más de 2.100 testimonios", description: "Vídeo de Assumpta Serna en Facebook", url: "https://www.facebook.com/assumptaserna/videos/nunca-imagin%C3%A9-esto-y-aqu%C3%AD-estamos3-millones-de-visualizaciones-2100-testimonios-/1690736175986098/", platform: "facebook", order: 4, published: true },
];
function getYouTubeId(value: string) {
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1).split("/")[0] || null;
    if (url.hostname.includes("youtube.com")) {
      if (url.pathname === "/watch") return url.searchParams.get("v");
      const match = url.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/);
      return match?.[1] ?? null;
    }
  } catch { /* URL todavía incompleta */ }
  return null;
}

function VideosLibrary({ videos }: { videos: CmsVideo[] }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<(typeof videoSearches)[number] | null>(null);
  const [error, setError] = useState("");
  const playVideo = () => {
    const id = getYouTubeId(videoUrl.trim());
    if (!id) { setError("Pega un enlace válido de YouTube (youtube.com/watch, youtu.be, Shorts o embed)."); return; }
    setSelectedVideo({ title: "Vídeo de YouTube", description: "Vídeo seleccionado", url: "https://www.youtube.com/watch?v=" + id, platform: "youtube" });
    setError("");
  };
  const embedUrl = selectedVideo
    ? selectedVideo.platform === "youtube"
      ? "https://www.youtube-nocookie.com/embed/" + (getYouTubeId(selectedVideo.url) ?? "") + "?autoplay=0&rel=0"
      : "https://www.facebook.com/plugins/video.php?href=" + encodeURIComponent(selectedVideo.url) + "&show_text=false&width=800"
    : null;

  return <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.85fr)]">
    <div className="rounded-[2rem] border-4 border-primary/80 bg-accent/25 p-3 shadow-xl sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3 px-2"><span className="font-display text-sm font-semibold tracking-wide text-primary">PLATAFORMA DORADA · TELEVISIÓN</span><span className="size-3 rounded-full bg-primary/70 shadow-inner" aria-hidden="true" /></div>
      <div className="rounded-[1.4rem] border-[7px] border-foreground/80 bg-foreground p-2 shadow-inner sm:border-[10px] sm:p-3">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-primary">
          {embedUrl ? <iframe key={embedUrl} title={selectedVideo?.title ?? "Vídeo sobre Plataforma Dorada"} src={embedUrl} className="absolute inset-0 h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-primary-foreground"><Youtube size={42} className="mb-3 text-accent" aria-hidden="true" /><p className="font-display text-xl sm:text-2xl">Tu ventana a los cuidados</p><p className="mt-2 max-w-sm text-xs leading-relaxed text-primary-foreground/75 sm:text-sm">Selecciona uno de los vídeos de la lista para reproducirlo aquí.</p></div>}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 px-2 text-xs font-semibold text-primary"><span className="truncate">{selectedVideo?.title ?? "ARCHIVO AUDIOVISUAL"}</span><span aria-hidden="true">● ━━━ ◉</span></div>
      {selectedVideo && <a className="mt-2 inline-block px-2 text-xs font-semibold text-primary underline" href={selectedVideo.url} target="_blank" rel="noreferrer">Abrir vídeo en {selectedVideo.platform === "youtube" ? "YouTube" : "Facebook"} si no se reproduce</a>}
    </div>
    <div className="space-y-4">
      <form onSubmit={(e) => { e.preventDefault(); playVideo(); }} className="rounded-2xl border border-border bg-background/70 p-4">
        <label htmlFor="youtube-video-url" className="block text-sm font-semibold">También puedes pegar un enlace de YouTube</label>
        <div className="mt-2 flex gap-2"><input id="youtube-video-url" type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Pega aquí el enlace del vídeo" className="min-w-0 flex-1 rounded-xl border border-input bg-card px-3 py-2 text-sm" /><button type="submit" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Ver</button></div>
        {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
      </form>
      <div><h3 className="mb-3 font-display text-xl font-semibold">Vídeos para descubrir</h3><ul className="space-y-2">
        {videos.filter((item) => item.published).sort((a, b) => a.order - b.order).map((item) => <li key={item.id || item.url}><button type="button" onClick={() => { setSelectedVideo(item); setError(""); }} aria-pressed={selectedVideo?.url === item.url} className={"group flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors " + (selectedVideo?.url === item.url ? "border-primary bg-accent/20" : "border-border bg-background/65 hover:bg-accent/15")}><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">{item.platform === "youtube" ? <Youtube size={20} aria-hidden="true" /> : <span className="text-xs font-bold">f</span>}</span><span className="min-w-0"><span className="block text-sm font-semibold group-hover:text-primary">{item.title}</span><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.description}</span><span className="mt-1 block text-xs font-semibold text-primary">▶ Reproducir en el televisor</span></span></button></li>)}
      </ul>{videos.filter((item) => item.published).length === 0 && <p className="text-sm text-muted-foreground">Todavía no hay vídeos publicados.</p>}<p className="mt-3 text-xs leading-relaxed text-muted-foreground">Pulsa cualquier elemento de la lista para cargar el vídeo en la pantalla central. Los vídeos de Facebook dependen de que su autor permita la reproducción incrustada.</p></div>
    </div>
  </div>;
}
