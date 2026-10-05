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
  return <>
    <PageHeader eyebrow="Quiénes somos" title="La Plataforma" lead="Plataforma Dorada es un movimiento ciudadano y apartidista. Nacemos de familias, cuidadoras y profesionales que piden un acuerdo estable entre todas las fuerzas políticas." />
    <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 pb-10 sm:px-6 md:grid-cols-3">
      {[["Misión","Conseguir un Pacto de Estado que garantice una atención a la dependencia digna, ágil y suficiente."],["Principios","Independencia política, transparencia, respeto a las personas y rigor en los datos."],["Cómo actuamos","Sumando adhesiones, entidades y ayuntamientos, y dando voz a quienes cuidan y son cuidados."]].map(([t,d]) => <Panel key={t}><h2 className="font-display text-xl font-semibold">{t}</h2><p className="mt-3 text-muted-foreground">{d}</p></Panel>)}
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
      <Link to="/unete" className="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">Únete al movimiento</Link>
    </section>
  </>;
}
