import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { TerritoryMap } from "@/components/territory-map";
import { pageHead } from "@/lib/seo";
import { counters, indicators } from "@/lib/content";
import { formatCount, formatNumberEs, usePublicStats, type CounterKey, type PublicStats } from "@/lib/public-stats";

const COUNTER_KEY: Record<string, CounterKey> = {
  adhesiones: "adhesiones",
  voluntarios: "voluntarios",
  entidades: "entidades",
  ayuntamientos: "ayuntamientos",
};

function counterValue(stats: PublicStats | null, key: CounterKey) {
  if (!stats) return null;
  const direct = stats.contadores?.[key];
  if (typeof direct === "number" && Number.isFinite(direct)) return direct;

  // Fallback seguro para los contadores que también existen en el mapa.
  if (key === "adhesiones") {
    return Object.values(stats.porComunidad ?? {}).reduce((sum, item) => sum + (Number(item?.adhesiones) || 0), 0);
  }
  if (key === "entidades") {
    return Object.values(stats.porComunidad ?? {}).reduce((sum, item) => sum + (Number(item?.entidades) || 0), 0);
  }
  if (key === "ayuntamientos") {
    return Object.entries(stats.tiposOrganizacion ?? {})
      .filter(([name]) => /ayuntamiento|entidad local/i.test(name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
      .reduce((sum, [, value]) => sum + (Number(value) || 0), 0);
  }
  return null;
}

export const Route = createFileRoute("/datos")({
  head: () =>
    pageHead({
      path: "/datos",
      title: "Datos e indicadores",
      description:
        "Indicadores sobre la dependencia en España y el avance de las adhesiones, entidades y mociones de Plataforma Dorada por comunidad autónoma.",
    }),
  component: Page,
});

function Page() {
  const { stats } = usePublicStats();

  return (
    <>
      <PageHeader
        eyebrow="Transparencia"
        title="Datos e indicadores"
        lead="Cifras del sistema de dependencia y del avance del movimiento. Cada dato indica su fuente."
      />

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {indicators.map((i) => {
            const data = stats?.indicadores?.[i.key];
            const loading = !stats;
            const value = data?.valor != null ? formatNumberEs(data.valor) : null;
            const displayValue = loading ? "Cargando…" : value && value !== "—" ? `${value}${data?.unidad === "meses" ? " meses" : data?.unidad === "%" ? " %" : data?.unidad === "días" ? " días" : ""}` : "Dato no disponible";
            return (
              <Panel key={i.key}>
                <p className="font-display text-3xl font-semibold text-primary" aria-live="polite">
                  {loading ? (
                    <span className="inline-flex items-center gap-2 text-base font-sans font-normal">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-primary/25 border-t-primary" aria-hidden="true" />
                      Cargando…
                    </span>
                  ) : displayValue}
                </p>
                <p className="mt-2 text-sm">{i.label}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {data?.fuente ?? i.source}
                  {data?.fechaDato ? ` · Dato: ${data.fechaDato}` : ""}
                  {data?.actualizado ? ` · Actualizado: ${data.actualizado}` : ""}
                </p>
                {data?.url && (
                  <a href={data.url} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs underline underline-offset-2">
                    Ver fuente
                  </a>
                )}
                {data?.nota && <p className="mt-1 text-xs text-muted-foreground">{data.nota}</p>}
              </Panel>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <h2 className="font-display text-3xl">El movimiento en cifras</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {counters.map((c) => (
            <Panel key={c.key}>
              <p className="font-display text-3xl font-semibold">
                {COUNTER_KEY[c.key]
                  ? stats
                    ? formatCount(counterValue(stats, COUNTER_KEY[c.key]!))
                    : <span className="inline-flex items-center gap-2 text-base font-sans font-normal" role="status" aria-live="polite"><span className="h-3 w-3 rounded-full border-2 border-primary/25 border-t-primary" aria-hidden="true" />Cargando…</span>
                  : c.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{c.label}</p>
            </Panel>
          ))}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Panel><p className="font-display text-3xl font-semibold">{stats ? formatCount(stats.contadores?.testimoniosRecibidos ?? 0) : "…"}</p><p className="mt-2 text-sm text-muted-foreground">Testimonios recibidos</p></Panel>
          <Panel><p className="font-display text-3xl font-semibold">{stats ? formatCount(stats.contadores?.testimoniosPublicados ?? 0) : "…"}</p><p className="mt-2 text-sm text-muted-foreground">Testimonios publicados</p></Panel>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <h2 className="font-display text-3xl">Por territorio</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Selecciona un indicador para ver cómo se distribuye por comunidad autónoma. También incluimos testimonios, además de adhesiones, entidades y mociones.</p>
        <div className="mt-6">
          <TerritoryMap stats={stats} />
        </div>
      </section>
    </>
  );
}
