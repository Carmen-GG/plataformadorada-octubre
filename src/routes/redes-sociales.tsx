import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Instagram, Music2, Headphones, Quote, Youtube } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { LatestInstagramVideo, TikTokFeed } from "@/components/social-feeds";
import { SITE } from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { useCmsContent } from "@/lib/cms";

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
    <PageHeader eyebrow="Redes sociales" title="Síguenos y participa" lead="Encuentra nuestras publicaciones y ayúdanos a construir una comunidad que también comparte música, frases y mensajes por los cuidados." />
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
            <div><p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Instagram</p><h2 className="mt-1 font-display text-2xl font-semibold">Último vídeo de @assumptaserna</h2></div>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Ver Instagram</a>
          </div>
          <div className="mx-auto mt-5 max-w-2xl"><LatestInstagramVideo /></div>
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
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Entrevistas y vídeos sobre la dependencia, los cuidados y la iniciativa de Plataforma Dorada. Elige una búsqueda de la lista o pega el enlace de un vídeo de YouTube para verlo en el televisor.</p>
          <VideosLibrary />
        </article>
      </div>
    </section>
  </>;
}

const videoSearches = [
  { title: "Plataforma Dorada: entrevistas y noticias", description: "Cobertura de la iniciativa y del Pacto de Estado.", query: "Plataforma Dorada Assumpta Serna" },
  { title: "Assumpta Serna denuncia el sistema de dependencia", description: "Vídeos sobre el origen de la iniciativa y su denuncia pública.", query: "Assumpta Serna dependencia no es ni humano ni justo" },
  { title: "Pacto de Estado por la Dependencia", description: "Debates y entrevistas sobre la necesidad de un pacto estatal.", query: "Pacto de Estado dependencia cuidados España" },
  { title: "Familias cuidadoras y personas dependientes", description: "Testimonios y reportajes sobre las dificultades de los cuidados.", query: "familias cuidadoras dependencia España reportaje" },
  { title: "Entrevistas en medios de comunicación", description: "Conversaciones con Assumpta Serna sobre cuidados y derechos.", query: "Assumpta Serna Plataforma Dorada entrevista" },
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

function VideosLibrary() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const playVideo = () => {
    const id = getYouTubeId(videoUrl.trim());
    if (!id) { setError("Pega un enlace válido de YouTube (youtube.com/watch, youtu.be, Shorts o embed)."); return; }
    setVideoId(id);
    setError("");
  };
  return <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.85fr)]">
    <div className="rounded-[2rem] border-4 border-primary/80 bg-accent/25 p-3 shadow-xl sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3 px-2"><span className="font-display text-sm font-semibold tracking-wide text-primary">PLATAFORMA DORADA · TELEVISIÓN</span><span className="size-3 rounded-full bg-primary/70 shadow-inner" aria-hidden="true" /></div>
      <div className="rounded-[1.4rem] border-[7px] border-foreground/80 bg-foreground p-2 shadow-inner sm:border-[10px] sm:p-3">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-[#211b14]">
          {videoId ? <iframe title="Vídeo de YouTube sobre Plataforma Dorada" src={"https://www.youtube-nocookie.com/embed/" + videoId + "?autoplay=0&rel=0"} className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-primary-foreground"><Youtube size={42} className="mb-3 text-accent" aria-hidden="true" /><p className="font-display text-xl sm:text-2xl">Tu ventana a los cuidados</p><p className="mt-2 max-w-sm text-xs leading-relaxed text-primary-foreground/75 sm:text-sm">Selecciona una búsqueda y pega el enlace del vídeo que quieras reproducir aquí.</p></div>}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between px-2 text-xs font-semibold text-primary"><span>ARCHIVO AUDIOVISUAL</span><span aria-hidden="true">● ━━━ ◉</span></div>
    </div>
    <div className="space-y-4">
      <form onSubmit={(e) => { e.preventDefault(); playVideo(); }} className="rounded-2xl border border-border bg-background/70 p-4">
        <label htmlFor="youtube-video-url" className="block text-sm font-semibold">Reproducir un vídeo de YouTube</label>
        <div className="mt-2 flex gap-2"><input id="youtube-video-url" type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Pega aquí el enlace del vídeo" className="min-w-0 flex-1 rounded-xl border border-input bg-card px-3 py-2 text-sm" /><button type="submit" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Ver</button></div>
        {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
      </form>
      <div><h3 className="mb-3 font-display text-xl font-semibold">Vídeos para descubrir</h3><ul className="space-y-2">
        {videoSearches.map((item) => <li key={item.title}><a href={"https://www.youtube.com/results?search_query=" + encodeURIComponent(item.query)} target="_blank" rel="noreferrer" className="group flex gap-3 rounded-2xl border border-border bg-background/65 p-3 transition-colors hover:bg-accent/15"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Youtube size={20} aria-hidden="true" /></span><span className="min-w-0"><span className="block text-sm font-semibold group-hover:text-primary">{item.title}</span><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.description}</span><span className="mt-1 block text-xs font-semibold text-primary">Buscar en YouTube ↗</span></span></a></li>)}
      </ul><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Los enlaces abren búsquedas de YouTube para que puedas escoger vídeos disponibles y actuales; después, pega el enlace del vídeo en el reproductor para verlo en el televisor.</p></div>
    </div>
  </div>;
}
