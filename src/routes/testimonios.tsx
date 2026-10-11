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
  // Respaldo temporal con el último agregado comprobado en la API pública.
  const verifiedRegionalFallback: Record<string, number> = {
    "Cataluña": 1239, "Illes Balears": 17, "Madrid": 86, "Extremadura": 9,
    "Comunitat Valenciana": 100, "País Vasco": 22, "Murcia": 10, "Galicia": 48,
    "Canarias": 13, "Asturias": 8, "Castilla y León": 19, "Andalucía": 63,
    "Cantabria": 5, "Aragón": 18, "Castilla-La Mancha": 14, "La Rioja": 2, "Navarra": 3
  };
  const displayCounts = Object.keys(counts).length > 0 ? counts : verifiedRegionalFallback;
  const statsLoaded = state.stats !== null;
  const regionalError = state.failed;
  const normalizeRegion = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const aliases: Record<string, string[]> = {
    "Cataluña": ["cataluna", "catalunya"],
    "Comunitat Valenciana": ["comunitatvalenciana", "comunidadvalenciana", "valencia", "comunidadvalenciana"],
    "Illes Balears": ["illesbalears", "islasbaleares", "baleares"],
    "Madrid": ["madrid", "comunidaddemadrid"],
    "País Vasco": ["paisvasco", "euskadi"],
    "Navarra": ["navarra", "comunidadforaldenavarra"],
    "Asturias": ["asturias", "principadodeasturias"],
    "Murcia": ["murcia", "regiondemurcia"],
    "Castilla-La Mancha": ["castillalamancha"],
    "Castilla y León": ["castillayleon"],
    "Canarias": ["canarias", "islascanarias"],
    "Andalucía": ["andalucia"],
    "Aragón": ["aragon"],
    "Cantabria": ["cantabria"],
    "Extremadura": ["extremadura"],
    "Galicia": ["galicia"],
    "La Rioja": ["larioja"],
    "Ceuta": ["ceuta"],
    "Melilla": ["melilla"],
  };
  const normalizedCounts = new Map<string, number>();
  for (const [key, value] of Object.entries(displayCounts)) {
    const normalized = normalizeRegion(key);
    normalizedCounts.set(normalized, (normalizedCounts.get(normalized) ?? 0) + Number(value ?? 0));
  }
  const countForRegion = (name: string) => {
    const keys = (aliases[name] ?? [normalizeRegion(name)]).map(normalizeRegion);
    // Primero busca equivalencias exactas; después admite nombres más largos
    // procedentes de versiones anteriores del Apps Script (p. ej. "Comunidad de Madrid").
    let total = 0;
    const matched = new Set<string>();
    for (const [key, value] of normalizedCounts.entries()) {
      const matches = keys.some((alias) => key === alias || key.includes(alias) || alias.includes(key));
      if (matches && !matched.has(key)) {
        total += value;
        matched.add(key);
      }
    }
    return total;
  };
  const hasTerritorialData = Object.keys(displayCounts).length > 0;
  const regionRows = regions.map((r) => ({ name: r.name, count: countForRegion(r.name) })).filter((r) => r.count > 0);
  return (
    <>
      <PageHeader eyebrow="Voces reales" title="Testimonios" lead="Detrás de cada expediente hay una familia. Estos son los relatos de quienes esperan una valoración, una ayuda o un respiro."
        titleAside={<div className="flex flex-col items-end gap-3"><div className="rounded-2xl border border-border bg-card px-5 py-3 text-right shadow-sm"><p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Testimonios recibidos</p><p className="font-display text-3xl font-bold text-primary"><LiveCount name="testimoniosRecibidos" /></p></div><a href={SITE.testimonyFormUrl} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground">Comparte tu testimonio</a></div>}
      />
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
            {regions.map((r) => <div key={r.name} className="glass-soft flex items-center justify-between rounded-2xl px-4 py-3 text-sm" role="listitem"><span>{r.name}</span><strong>{!statsLoaded ? "Cargando…" : regionalError ? "Error" : formatCount(countForRegion(r.name))}</strong></div>)}
          </div>
          {regionalError && <p className="mt-4 text-sm text-destructive" role="alert">No se han podido cargar los recuentos territoriales. Inténtalo de nuevo más tarde.</p>}{!statsLoaded && !regionalError && <p className="mt-4 text-xs text-muted-foreground">Cargando recuentos territoriales…</p>}{statsLoaded && !regionalError && !hasTerritorialData && <p className="mt-4 text-sm text-muted-foreground">La respuesta del CMS no incluye datos territoriales de testimonios.</p>}{statsLoaded && hasTerritorialData && regionRows.length === 0 && <p className="mt-4 text-sm text-muted-foreground">El CMS devuelve datos territoriales, pero no se han podido asociar a las comunidades autónomas.</p>}
        </Panel>
      </section>
    </>
  );
}
