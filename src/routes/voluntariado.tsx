import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/content";
import { ShareButtons } from "@/components/share-buttons";
import { LiveCount, listStatus, usePublicStats } from "@/lib/public-stats";

export const Route = createFileRoute("/voluntariado")({
  head: () =>
    pageHead({
      path: "/voluntariado",
      title: "Hazte voluntario/a",
      description:
        "Colabora con Plataforma Dorada: difusión, apoyo a familias, organización de encuentros y trabajo territorial.",
    }),
  component: Voluntariado,
});

function Voluntariado() {
  const state = usePublicStats();
  const recent = state.stats?.ultimosVoluntarios ?? [];
  const status = listStatus(state, recent.length, "Todavía no hay incorporaciones públicas.");
  return (
    <>
      <PageHeader
        eyebrow="Voluntariado"
        title="Hazte voluntario/a"
        lead="El movimiento lo sostienen personas voluntarias. Puedes ayudar desde tu casa, tu municipio o tu entidad, con el tiempo del que dispongas."
      >
        <a
          href={SITE.volunteerFormUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground"
        >
          Quiero ser voluntario/a
        </a>
      </PageHeader>
      <section className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6"><div className="ml-auto w-full max-w-xs rounded-3xl border border-border bg-card p-5 text-right shadow-sm"><p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Voluntariado</p><p className="mt-1 font-display text-4xl font-bold text-primary"><LiveCount name="voluntarios" /></p></div></section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <Panel as="section" className="lg:col-span-7">
            <h2 className="font-display text-2xl font-semibold">Formas de colaborar</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li>· Difundir el movimiento en tu entorno y en redes sociales.</li>
              <li>· Recoger y acompañar testimonios de familias.</li>
              <li>· Ayudar a organizar encuentros y actos públicos.</li>
              <li>· Contactar con asociaciones, entidades y ayuntamientos.</li>
              <li>· Aportar conocimientos profesionales (jurídicos, sociales, comunicación).</li>
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              De momento no existe un área privada de voluntariado. La coordinación se hace por
              correo electrónico.
            </p>
          </Panel>

          <div className="space-y-6 lg:col-span-5">
            <Panel>
              <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Voluntarios y voluntarias
              </p>
              <p className="mt-2 font-display text-4xl font-bold text-primary">
                <LiveCount name="voluntarios" />
              </p>
            </Panel>
            <Panel>
              <h2 className="font-display text-xl font-semibold">Últimas incorporaciones</h2>
              {status ? (
                <p className="mt-4 text-sm text-muted-foreground" role="status">
                  {status}
                </p>
              ) : (
                <ul className="mt-4 space-y-2 text-sm">
                  {recent.map((n, i) => (
                    <li key={i} className="border-b border-border pb-2 last:border-0">
                      {n}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                Solo aparecen quienes lo han autorizado expresamente.
              </p>
            </Panel>
            <Panel>
              <h2 className="font-display text-xl font-semibold">Comparte</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Cuéntaselo a quien pueda querer colaborar: cada persona voluntaria suma.
              </p>
              <ShareButtons path="/voluntariado" />
            </Panel>
          </div>
        </div>
      </section>
    </>
  );
}
