import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/content";
import { ShareButtons } from "@/components/share-buttons";
import { listStatus, usePublicStats, LiveCount } from "@/lib/public-stats";

export const Route = createFileRoute("/unete")({
  head: () =>
    pageHead({
      path: "/unete",
      title: "Únete a Plataforma Dorada",
      description:
        "Adhiérete a Plataforma Dorada y suma tu voz para exigir un Pacto de Estado por la Dependencia y los Cuidados.",
    }),
  component: Unete,
});

function Unete() {
  const state = usePublicStats();
  const recent = state.stats?.ultimasAdhesiones ?? [];
  const status = listStatus(state, recent.length, "Todavía no hay adhesiones públicas.");
  return (
    <>
      <PageHeader
        eyebrow="Adhesión"
        title="Únete a Plataforma Dorada"
        lead="Adherirte es gratuito y no implica militancia en ningún partido. Cuantas más personas seamos, más fuerza tendrá la petición de un Pacto de Estado por la Dependencia y los Cuidados."
        titleAside={
          <div className="w-full max-w-xs rounded-3xl border border-border bg-card px-6 py-4 text-right shadow-sm">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Adhesiones</p>
            <p className="mt-1 font-display text-4xl font-bold text-primary"><LiveCount name="adhesiones" /></p>
          </div>
        }
      >
        <a
          href={SITE.joinFormUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Adherirse
        </a>
      </PageHeader>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <Panel as="section" className="lg:col-span-7">
            <h2 className="font-display text-2xl font-semibold">Por qué adherirte</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li>· Para pedir plazos razonables en las valoraciones y concesiones de ayudas.</li>
              <li>· Para visibilizar los retrasos y las dificultades administrativas.</li>
              <li>· Para reconocer y apoyar a quienes cuidan.</li>
              <li>· Para reclamar un acuerdo estable y apartidista entre administraciones.</li>
            </ul>
            <h3 className="mt-8 font-display text-xl font-semibold">Qué datos pedimos</h3>
            <p className="mt-3 text-muted-foreground">
              Solo los datos mínimos necesarios. En el formulario se solicita por separado el
              consentimiento para tratar tu adhesión y el consentimiento, opcional, para aparecer
              públicamente en la web con tu nombre, la inicial de tu primer apellido y tu ciudad.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Puedes consultar la{" "}
              <Link to="/privacidad" className="text-primary underline underline-offset-4">
                política de privacidad
              </Link>{" "}
              antes de enviar el formulario.
            </p>
          </Panel>

          <div className="space-y-6 lg:col-span-5">
            <Panel>
              <h2 className="font-display text-xl font-semibold">Últimas adhesiones públicas</h2>
              {status ? (
                <p className="mt-4 text-sm text-muted-foreground" role="status">
                  {status}
                </p>
              ) : (
                <ul className="mt-4 space-y-2 text-sm">
                  {recent.map((n, i) => (
                    <li key={i} className="border-b border-border pb-2 last:border-0">
                      <span className="font-medium">{n.nombre}</span>
                      {n.municipio && <span className="block text-muted-foreground">{n.municipio}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
            <Panel>
              <h2 className="font-display text-xl font-semibold">Comparte</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Envía esta página a tu familia, tu barrio o tu asociación. El boca a boca es nuestra
                mejor herramienta.
              </p>
              <ShareButtons path="/unete" />
            </Panel>
          </div>
        </div>
      </section>
    </>
  );
}
