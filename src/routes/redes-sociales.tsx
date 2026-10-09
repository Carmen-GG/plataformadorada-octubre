import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
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
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "spotify", label: "Spotify" },
  { id: "lemas", label: "Lemas" },
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

  return <>
    <PageHeader eyebrow="Redes sociales" title="Síguenos y participa" lead="Encuentra nuestras publicaciones y ayúdanos a construir una comunidad que también comparte música, frases y mensajes por los cuidados." />
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-muted/40 p-2 sm:grid-cols-4" role="tablist" aria-label="Contenido de redes sociales">
        {socialTabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${activeTab === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div id="panel-instagram" role="tabpanel" aria-labelledby="tab-instagram" hidden={activeTab !== "instagram"}>
        <article className="glass-panel rounded-3xl p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Instagram</p><h2 className="mt-1 font-display text-2xl font-semibold">Último vídeo de @assumptaserna</h2></div>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Ver Instagram</a>
          </div>
          <div className="mx-auto mt-5 max-w-2xl"><LatestInstagramVideo /></div>
        </article>
      </div>

      <div id="panel-tiktok" role="tabpanel" aria-labelledby="tab-tiktok" hidden={activeTab !== "tiktok"}>
        <article className="glass-panel rounded-3xl p-5 sm:p-7">
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
        <article id="frases" className="glass-panel rounded-3xl p-5 sm:p-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Palabras</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Lemas y citas</h2>
          <PhraseCarousel phrases={visiblePhrases}/>
          <ProposalForm type="frase" />
        </article>
      </div>
    </section>
  </>;
}
