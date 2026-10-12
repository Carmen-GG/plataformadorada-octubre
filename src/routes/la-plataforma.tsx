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
        <ol className="relative mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["La atención a la dependencia es un derecho", "La atención a la dependencia debe reconocerse y garantizarse como un derecho."],
            ["Igualdad de derechos en todo el territorio", "Todas las personas deben tener los mismos derechos y garantías, con independencia de dónde vivan."],
            ["Financiación suficiente, estable y sostenible", "El sistema debe contar con recursos suficientes y una financiación estable y sostenible en el tiempo."],
            ["Atención centrada en la persona", "La atención debe respetar las necesidades, preferencias, autonomía y dignidad de cada persona."],
            ["Derecho a elegir dónde y cómo vivir", "Las personas deben poder decidir dónde y cómo vivir, con los apoyos que necesiten."],
            ["Calidad y dignidad en los cuidados", "Los cuidados deben prestarse con calidad, respeto y dignidad."],
            ["Coordinación sociosanitaria real", "Los servicios sociales y sanitarios deben coordinarse de forma efectiva para ofrecer una atención integral."],
            ["Apoyo real a las familias cuidadoras", "Las familias y personas cuidadoras deben recibir apoyo, reconocimiento y recursos adecuados."],
            ["Transparencia, evaluación y rendición de cuentas", "Las políticas y recursos destinados a la dependencia deben gestionarse con transparencia, evaluación y rendición de cuentas."],
            ["Un compromiso que trascienda las legislaturas", "La atención a la dependencia requiere un compromiso de Estado estable, que vaya más allá de los cambios de gobierno."]
          ].map(([title, description], index) => (
            <li key={title} className="flex gap-4 rounded-2xl border border-primary/15 bg-background/85 p-5 shadow-sm">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground" aria-hidden="true">{index + 1}</span>
              <div>
                <h3 className="font-display text-lg font-bold leading-snug text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section id="trayectoria" className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Historia viva</p>
          <h2 className="mt-2 font-display text-3xl">Nuestra trayectoria</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">Actualizada desde el backoffice</span>
          <div className="flex gap-2" aria-label="Controles para recorrer la trayectoria">
            <button type="button" aria-label="Subir por la trayectoria" title="Subir por la trayectoria" onClick={() => document.getElementById("trayectoria-lista")?.scrollBy({ top: -320, behavior: "smooth" })} className="inline-flex size-10 items-center justify-center rounded-full border border-primary/20 bg-background text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span aria-hidden="true" className="text-xl leading-none">↑</span>
            </button>
            <button type="button" aria-label="Bajar por la trayectoria" title="Bajar por la trayectoria" onClick={() => document.getElementById("trayectoria-lista")?.scrollBy({ top: 320, behavior: "smooth" })} className="inline-flex size-10 items-center justify-center rounded-full border border-primary/20 bg-background text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span aria-hidden="true" className="text-xl leading-none">↓</span>
            </button>
          </div>
        </div>
      </div>
      <div id="trayectoria-lista" className="mt-8 max-h-[34rem] overflow-y-auto overscroll-contain rounded-2xl pr-3 scroll-smooth" tabIndex={0} aria-label="Recorrido por la trayectoria; usa las flechas para subir o bajar">
        <ol className="relative space-y-7 border-l-2 border-accent pl-7" aria-label="Línea del tiempo de Plataforma Dorada">
          {milestones.map((m:any, i:number) => <li key={m.id ?? i} className="relative"><span className="absolute -left-[37px] top-1.5 size-4 rounded-full border-4 border-background bg-primary" aria-hidden="true"/><p className="text-sm font-semibold text-primary">{m.date}</p><h3 className="mt-1 font-display text-xl font-semibold">{m.title}</h3><p className="mt-2 max-w-3xl text-muted-foreground">{m.description}</p>{m.imageUrl && <img src={m.imageUrl} alt="" className="mt-4 max-h-48 rounded-2xl object-cover" />}</li>)}
        </ol>
      </div>
    </section>
    <section id="hoja-de-ruta" className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
      <h2 className="font-display text-3xl">Hoja de ruta</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">{roadmap.filter((r:any)=>r.active!==false).map((r:any) => <Panel key={r.id ?? r.phase}><p className="text-xs font-semibold tracking-widest text-primary uppercase">{r.phase}{r.date ? ` · ${r.date}` : ""}</p><h3 className="mt-2 font-display text-lg font-semibold">{r.title}</h3><p className="mt-2 text-muted-foreground">{r.detail}</p></Panel>)}</div>
    </section>
  </>;
}
