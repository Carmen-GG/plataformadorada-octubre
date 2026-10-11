import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { milestones as fallbackMilestones, roadmap as fallbackRoadmap } from "@/lib/content";
import { useCmsContent } from "@/lib/cms";

export const Route = createFileRoute("/la-plataforma")({
  head: () => pageHead({ path: "/la-plataforma", title: "La Plataforma", description: "Quiénes somos: un movimiento ciudadano y apartidista que reclama un Pacto de Estado por la Dependencia y los Cuidados." }),
  component: Page,
});

function Page() {
  const cms = useCmsContent();
  const milestones = cms?.trayectoria?.length ? cms.trayectoria : fallbackMilestones;
  const roadmap = cms?.hojaRuta?.length ? cms.hojaRuta : fallbackRoadmap.map((r, i) => ({ id: String(i), phase: r.phase, title: r.title, detail: r.detail, date: "", active: true })) as any;
  const principlesResource = cms?.recursos?.find((resource) =>
    /principios de plataforma dorada/i.test(resource.title.trim()) ||
    (/principios/i.test(resource.title) && /plataforma dorada/i.test(resource.description))
  );
  const principlesImage = principlesResource?.previewUrl || principlesResource?.url;

  return <>
    <PageHeader
      eyebrow="Quiénes somos"
      title="La Plataforma"
      lead="Plataforma Dorada es un movimiento ciudadano y apartidista. Nacemos de familias, cuidadoras y profesionales que piden un acuerdo estable entre todas las fuerzas políticas."
      titleAside={
        <Link
          to="/unete"
          className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          Únete
        </Link>
      }
    />
    <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 pb-10 sm:px-6 md:grid-cols-3">
      {[[ "Misión", "Conseguir un Pacto de Estado que garantice una atención a la dependencia digna, ágil y suficiente." ],[ "Principios", "Independencia política, transparencia, respeto a las personas y rigor en los datos." ],[ "Cómo actuamos", "Sumando adhesiones, entidades y ayuntamientos, y dando voz a quienes cuidan y son cuidados." ]].map(([t,d]) => <Panel key={t}><h2 className="font-display text-xl font-semibold">{t}</h2><p className="mt-3 text-muted-foreground">{d}</p></Panel>)}
    </section>

    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6" aria-labelledby="eventos-title">
      <div className="flex flex-col gap-4 rounded-3xl border border-primary/15 bg-gradient-to-r from-primary/10 via-background to-accent/15 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Participa</p>
          <h2 id="eventos-title" className="mt-2 font-display text-2xl font-bold sm:text-3xl">Próximos eventos</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Consulta las próximas actividades y encuentros de Plataforma Dorada.</p>
        </div>
        <Link to="/eventos" className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          Ver eventos <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </div>
    </section>

    <section id="principios" className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6" aria-labelledby="principios-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-accent/20 p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-12 -top-16 size-56 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Lo que nos une</p>
          <h2 id="principios-title" className="mt-3 font-display text-3xl font-bold sm:text-4xl">Los 10 principios de Plataforma Dorada</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Una guía compartida para defender los derechos de las personas en situación de dependencia y de quienes cuidan.</p>
        </div>
        {principlesImage ? (
          <a href={principlesImage} target="_blank" rel="noreferrer" className="relative mx-auto mt-8 block max-w-4xl overflow-hidden rounded-2xl border border-border/60 bg-background/80 p-2 shadow-xl transition-transform duration-300 hover:-translate-y-1" aria-label="Abrir la infografía de los 10 principios de Plataforma Dorada">
            <img src={principlesImage} alt="Infografía: los 10 principios de Plataforma Dorada" className="mx-auto max-h-[900px] w-full rounded-xl object-contain" loading="lazy" />
          </a>
        ) : (
          <div className="relative mx-auto mt-8 max-w-3xl rounded-2xl border border-dashed border-primary/30 bg-background/70 p-6 text-center">
            <p className="font-semibold">La infografía de los 10 principios se mostrará aquí.</p>
            <p className="mt-2 text-sm text-muted-foreground">Para mostrar el contenido aprobado, el recurso público «Principios de Plataforma Dorada» debe estar publicado en el apartado Recursos del backoffice.</p>
          </div>
        )}
        {principlesResource?.url && principlesImage && principlesResource.url !== principlesImage && (
          <p className="relative mt-4 text-center text-sm"><a className="font-semibold text-primary underline underline-offset-4" href={principlesResource.url} target="_blank" rel="noreferrer">Consultar el documento completo</a></p>
        )}
      </div>
    </section>

    <section id="trayectoria" className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
      <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Historia viva</p><h2 className="mt-2 font-display text-3xl">Nuestra trayectoria</h2></div><span className="text-sm text-muted-foreground">Actualizada desde el backoffice</span></div>
      <ol className="relative mt-8 space-y-7 border-l-2 border-accent pl-7" aria-label="Línea del tiempo de Plataforma Dorada">
        {milestones.map((m:any, i:number) => <li key={m.id ?? i} className="relative"><span className="absolute -left-[37px] top-1.5 size-4 rounded-full border-4 border-background bg-primary" aria-hidden="true"/><p className="text-sm font-semibold text-primary">{m.date}</p><h3 className="mt-1 font-display text-xl font-semibold">{m.title}</h3><p className="mt-2 max-w-3xl text-muted-foreground">{m.description}</p>{m.imageUrl && <img src={m.imageUrl} alt="" className="mt-4 max-h-48 rounded-2xl object-cover" />}</li>)}
      </ol>
    </section>
    <section id="hoja-de-ruta" className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
      <h2 className="font-display text-3xl">Hoja de ruta</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">{roadmap.filter((r:any)=>r.active!==false).map((r:any) => <Panel key={r.id ?? r.phase}><p className="text-xs font-semibold tracking-widest text-primary uppercase">{r.phase}{r.date ? ` · ${r.date}` : ""}</p><h3 className="mt-2 font-display text-lg font-semibold">{r.title}</h3><p className="mt-2 text-muted-foreground">{r.detail}</p></Panel>)}</div>
    </section>
  </>;
}
