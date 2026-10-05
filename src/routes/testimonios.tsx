import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE, regions } from "@/lib/content";
import { LiveCount, formatCount, listStatus, usePublicStats } from "@/lib/public-stats";
import { TestimonyCarousel } from "@/components/testimony-carousel";

export const Route = createFileRoute("/testimonios")({
  head: () => pageHead({ path: "/testimonios", title: "Testimonios", description: "Testimonios de personas dependientes, familias y cuidadores sobre los retrasos y dificultades del sistema de dependencia." }),
  component: Testimonios,
});

function Testimonios() {
  const state = usePublicStats();
  const items = state.stats?.testimonios ?? [];
  const status = listStatus(state, items.length, "Todavía no hay testimonios publicados.");
  const counts = state.stats?.testimoniosPorComunidad ?? {};
  const regionRows = regions.map((r) => ({ name: r.name, count: Number(counts[r.name] ?? 0) })).filter((r) => r.count > 0);
  return (
    <>
      <PageHeader eyebrow="Voces reales" title="Testimonios" lead="Detrás de cada expediente hay una familia. Estos son los relatos de quienes esperan una valoración, una ayuda o un respiro."
        titleAside={<div className="rounded-2xl border border-border bg-card px-5 py-3 text-right shadow-sm"><p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Testimonios recibidos</p><p className="font-display text-3xl font-bold text-primary"><LiveCount name="testimoniosRecibidos" /></p></div>}
      >
        <a href={SITE.testimonyFormUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground">Comparte tu testimonio</a>
      </PageHeader>
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        {status ? <p className="text-muted-foreground" role="status">{status}</p> : <TestimonyCarousel items={items} />}
        <Panel className="mt-8">
          <h2 className="font-display text-xl font-semibold">Publicación y consentimiento</h2>
          <p className="mt-3 text-sm text-muted-foreground">Un testimonio puede incluir información sensible. Solo se muestran testimonios cuyo uso público ha sido autorizado y que han autorizado expresamente su uso público.</p>
          <p className="mt-3 text-sm text-muted-foreground">Autorizados para publicar: <strong><LiveCount name="testimoniosAutorizados" /></strong></p>
        </Panel>
        <Panel className="mt-8">
          <h2 className="font-display text-xl font-semibold">Testimonios por comunidad autónoma</h2>
          <p className="mt-2 text-sm text-muted-foreground">Mapa y resumen agregado. Nunca se muestran ubicaciones personales.</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Testimonios por comunidad autónoma">
            {regions.map((r) => <div key={r.name} className="glass-soft flex items-center justify-between rounded-2xl px-4 py-3 text-sm" role="listitem"><span>{r.name}</span><strong>{formatCount(Number(counts[r.name] ?? 0))}</strong></div>)}
          </div>
          {regionRows.length === 0 && <p className="mt-4 text-sm text-muted-foreground">Aún no hay datos territoriales disponibles.</p>}
        </Panel>
      </section>
    </>
  );
}
