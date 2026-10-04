import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/content";
import { LiveCount, listStatus, usePublicStats } from "@/lib/public-stats";

export const Route = createFileRoute("/testimonios")({
  head: () =>
    pageHead({
      path: "/testimonios",
      title: "Testimonios",
      description:
        "Testimonios de personas dependientes, familias y cuidadores sobre los retrasos y dificultades del sistema de dependencia.",
    }),
  component: Testimonios,
});

function Testimonios() {
  const state = usePublicStats();
  const items = state.stats?.testimonios ?? [];
  const status = listStatus(state, items.length, "Todavía no hay testimonios publicados.");
  return (
    <>
      <PageHeader
        eyebrow="Voces reales"
        title="Testimonios"
        lead="Detrás de cada expediente hay una familia. Estos son los relatos de quienes esperan una valoración, una ayuda o un respiro."
      >
        <a
          href={SITE.testimonyFormUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground"
        >
          Comparte tu testimonio
        </a>
      </PageHeader>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <Panel className="mb-6">
          <h2 className="font-display text-xl font-semibold">Publicación y consentimiento</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Un testimonio puede incluir información sensible. Por eso el formulario distingue
            claramente entre el consentimiento para enviarnos tu testimonio y el consentimiento,
            separado y opcional, para publicarlo. Solo se publican los testimonios autorizados, y el
            equipo puede ocultarlos, editarlos o eliminarlos en cualquier momento.
          </p>
        </Panel>

        <p className="mb-6 text-sm text-muted-foreground">
          Testimonios recibidos:{" "}
          <strong>
            <LiveCount name="testimoniosRecibidos" />
          </strong>{" "}
          · Testimonios publicados:{" "}
          <strong>
            <LiveCount name="testimoniosPublicados" />
          </strong>
        </p>

        {status ? (
          <p className="text-muted-foreground" role="status">
            {status}
          </p>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {items.map((item, i) => (
              <li key={i}>
                <figure className="glass-panel h-full rounded-3xl p-6">
                  <blockquote className="text-lg leading-relaxed whitespace-pre-line">
                    {item.texto}
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold">
                    {item.autor}
                    {item.contexto && (
                      <span className="block font-normal text-muted-foreground">
                        {item.contexto}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
