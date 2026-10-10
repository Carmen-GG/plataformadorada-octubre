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
  const [recentPaused, setRecentPaused] = useState(false);

  useEffect(() => {
    setRecentIndex(0);
  }, [recent.length]);

  useEffect(() => {
    if (recentPaused || recent.length < 2) return;
    const timer = window.setInterval(() => {
      setRecentIndex((current) => (current + 1) % recent.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [recent.length, recentPaused]);

  const nextRecent = () => setRecentIndex((current) => (current + 1) % recent.length);
  const previousRecent = () => setRecentIndex((current) => (current - 1 + recent.length) % recent.length);
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
                  <div
                    key={recentIndex}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowLeft") previousRecent();
                      if (e.key === "ArrowRight") nextRecent();
                      if (e.key === " ") { e.preventDefault(); setRecentPaused((paused) => !paused); }
                    }}
                    className="glass-panel rounded-3xl p-7 sm:p-8"
                  >
                    <p className="text-sm font-semibold text-primary">Adhesión {recentIndex + 1} de {recent.length}</p>
                    <p className="mt-4 text-xl font-semibold leading-relaxed">{currentRecent?.nombre}</p>
                    {currentRecent?.municipio && <p className="mt-2 text-sm text-muted-foreground">{currentRecent.municipio}</p>}
                  </div>
                  {recent.length > 1 && (
                    <>
                      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                        <button type="button" className="rounded-full border border-border px-4 py-2 text-sm font-semibold" onClick={previousRecent} aria-label="Adhesión anterior">Anterior</button>
                        <button type="button" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" onClick={() => setRecentPaused((paused) => !paused)} aria-pressed={recentPaused}>{recentPaused ? "Reanudar" : "Pausar"}</button>
                        <button type="button" className="rounded-full border border-border px-4 py-2 text-sm font-semibold" onClick={nextRecent} aria-label="Siguiente adhesión">Siguiente</button>
                      </div>
                      <div className="mt-3 flex justify-center gap-1.5" aria-label="Seleccionar adhesión">
                        {recent.map((_, i) => <button key={i} type="button" onClick={() => setRecentIndex(i)} aria-label={`Ir a la adhesión ${i + 1}`} aria-current={i === recentIndex} className={`h-2.5 w-2.5 rounded-full border ${i === recentIndex ? "bg-primary" : "bg-transparent"}`} />)}
                      </div>
                    </>
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
