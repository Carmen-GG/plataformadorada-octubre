import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { milestones, roadmap } from "@/lib/content";

export const Route = createFileRoute("/la-plataforma")({
  head: () =>
    pageHead({
      path: "/la-plataforma",
      title: "La Plataforma",
      description:
        "Quiénes somos: un movimiento ciudadano y apartidista que reclama un Pacto de Estado por la Dependencia y los Cuidados.",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Quiénes somos"
        title="La Plataforma"
        lead="Plataforma Dorada es un movimiento ciudadano y apartidista. Nacemos de familias, cuidadoras y profesionales que piden un acuerdo estable entre todas las fuerzas políticas."
      />
      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 pb-10 sm:px-6 md:grid-cols-3">
        {[
          [
            "Misión",
            "Conseguir un Pacto de Estado que garantice una atención a la dependencia digna, ágil y suficiente.",
          ],
          [
            "Principios",
            "Independencia política, transparencia, respeto a las personas y rigor en los datos.",
          ],
          [
            "Cómo actuamos",
            "Sumando adhesiones, entidades y ayuntamientos, y dando voz a quienes cuidan y son cuidados.",
          ],
        ].map(([t, d]) => (
          <Panel key={t}>
            <h2 className="font-display text-xl font-semibold">{t}</h2>
            <p className="mt-3 text-muted-foreground">{d}</p>
          </Panel>
        ))}
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <h2 className="font-display text-3xl">Nuestra trayectoria</h2>
        <ol className="mt-6 space-y-4 border-l-2 border-accent pl-6">
          {milestones.map((m, i) => (
            <li key={i}>
              <p className="text-sm font-semibold text-primary">{m.date}</p>
              <p className="font-display text-lg font-semibold">{m.title}</p>
              <p className="text-muted-foreground">{m.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <h2 className="font-display text-3xl">Hoja de ruta</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {roadmap.map((r) => (
            <Panel key={r.phase}>
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                {r.phase}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-muted-foreground">{r.detail}</p>
            </Panel>
          ))}
        </div>
        <Link
          to="/unete"
          className="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground"
        >
          Únete al movimiento
        </Link>
      </section>
    </>
  );
}
