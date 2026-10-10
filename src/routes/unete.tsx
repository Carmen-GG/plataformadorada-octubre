import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/content";
import { ShareButtons } from "@/components/share-buttons";
import { listStatus, usePublicStats, LiveCount } from "@/lib/public-stats";
import { useEffect, useState } from "react";

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
  const [recentIndex, setRecentIndex] = useState(0);

  useEffect(() => {
    setRecentIndex(0);
  }, [recent.length]);

  useEffect(() => {
    if (recent.length < 2) return;
    const timer = window.setInterval(() => {
      setRecentIndex((current) => (current + 1) % recent.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [recent.length]);

  const currentRecent = recent[recentIndex] ?? recent[0];
  const recentStatus = listStatus(state, recent.length, "Todavía no hay adhesiones públicas autorizadas.");
  return (
    <>
      <PageHeader
        eyebrow="Adhesión"
        title="Únete a Plataforma Dorada"
        lead="Adherirte es gratuito y no implica militancia en ningún partido. Cuantas más personas seamos, más fuerza tendrá la petición de un Pacto de Estado por la Dependencia y los Cuidados."
        titleAside={
          <div className="flex w-full max-w-xs flex-col items-end gap-4">
            <div className="w-full rounded-3xl border border-border bg-card px-6 py-4 text-right shadow-sm">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Adhesiones</p>
              <p className="mt-1 font-display text-4xl font-bold text-primary"><LiveCount name="adhesiones" /></p>
            </div>
            <a
              href={SITE.joinFormUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Adherirse
            </a>
          </div>
        }
      />

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
              {recentStatus ? (
                <p className="mt-4 text-sm text-muted-foreground" role="status">{recentStatus}</p>
              ) : (
                <div className="mt-4" aria-roledescription="carrusel" aria-label="Últimas adhesiones públicas">
                  <div className="flex min-h-28 flex-col justify-center rounded-2xl border border-border/70 bg-background/50 px-4 py-5">
                    <p className="font-display text-2xl font-semibold">{currentRecent?.nombre}</p>
                    {currentRecent?.municipio && <p className="mt-1 text-sm text-muted-foreground">{currentRecent.municipio}</p>}
                    <p className="mt-3 text-xs text-muted-foreground">Adhesión {recentIndex + 1} de {recent.length}</p>
                  </div>
                  {recent.length > 1 && (
                    <div className="mt-3 flex justify-center gap-2">
                      <button type="button" onClick={() => setRecentIndex((recentIndex - 1 + recent.length) % recent.length)} className="rounded-full border border-border px-3 py-1.5 text-sm">Anterior</button>
                      <button type="button" onClick={() => setRecentIndex((recentIndex + 1) % recent.length)} className="rounded-full border border-border px-3 py-1.5 text-sm">Siguiente</button>
                    </div>
                  )}
                </div>
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
