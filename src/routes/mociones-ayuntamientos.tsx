import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { MunicipalMotionsMap } from "@/components/municipal-motions-map";
import { LiveCount } from "@/lib/public-stats";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/mociones-ayuntamientos")({
  head: () => pageHead({
    path: "/mociones-ayuntamientos",
    title: "Mociones en ayuntamientos",
    description: "Mapa de las mociones de Plataforma Dorada presentadas en ayuntamientos de España y su resultado.",
  }),
  component: MocionesAyuntamientos,
});

function MocionesAyuntamientos() {
  return <>
    <PageHeader
      eyebrow="Participa desde tu municipio"
      title="Mociones en ayuntamientos"
      lead="Consulta dónde se ha presentado la moción de Plataforma Dorada y conoce si ha sido aprobada o rechazada. Los municipios sin moción registrada permanecen sin color."
      titleAside={<div className="rounded-2xl border border-border bg-card px-5 py-3 text-right shadow-sm"><p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Mociones presentadas</p><p className="font-display text-3xl font-bold text-primary"><LiveCount name="mocionesPresentadas" /></p></div>}
    />
    <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
      <MunicipalMotionsMap />
      <div className="mt-8 rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
        <p><strong className="text-foreground">¿Quieres llevar la moción a tu ayuntamiento?</strong> Puedes presentar la propuesta y comunicar después el registro a Plataforma Dorada para que podamos incorporarlo al mapa.</p>
      </div>
    </section>
  </>;
}
