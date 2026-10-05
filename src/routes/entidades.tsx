import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/content";
import { LiveCount, listStatus, usePublicStats } from "@/lib/public-stats";

export const Route = createFileRoute("/entidades")({
  head: () =>
    pageHead({
      path: "/entidades",
      title: "Entidades adheridas",
      description:
        "Asociaciones, fundaciones, empresas y ayuntamientos que apoyan el Pacto de Estado por la Dependencia.",
    }),
  component: Page,
});

function safeUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function Page() {
  const state = usePublicStats();
  const all = state.stats?.entidadesAdheridas ?? [];
  const [type, setType] = useState("Todas");
  const types = ["Todas", ...Array.from(new Set(all.map((e) => e.tipo)))];
  const activeType = types.includes(type) ? type : "Todas";
  const list = activeType === "Todas" ? all : all.filter((e) => e.tipo === activeType);
  const status = listStatus(state, all.length, "Todavía no hay entidades adheridas públicas.");
  return (
    <>
      <PageHeader eyebrow="Red de apoyo" title="Entidades adheridas" lead="Organizaciones que se suman a la petición de un Pacto de Estado."
        titleAside={<div className="rounded-2xl border border-border bg-card px-5 py-3 text-right shadow-sm"><p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Entidades adheridas</p><p className="font-display text-3xl font-bold text-primary" aria-live="polite"><LiveCount name="entidades" /></p></div>}
      >
        <a href={SITE.entityFormUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">Adherir mi entidad</a>
      </PageHeader>
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        {status ? (
          <p className="text-muted-foreground" role="status">
            {status}
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              Las entidades que han autorizado su publicación se muestran por orden alfabético.
            </p>
            <div role="group" aria-label="Filtrar por tipo" className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={activeType === t}
                  onClick={() => setType(t)}
                  className={
                    activeType === t
                      ? "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                      : "glass-soft rounded-full px-4 py-2 text-sm font-semibold text-primary"
                  }
                >
                  {t}
                </button>
              ))}
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((e, i) => {
                const href = e.web ? safeUrl(e.web) : null;
                return (
                  <li key={`${e.nombre}-${i}`} className="glass-panel rounded-3xl p-5">
                    <p className="font-display text-lg font-semibold">{e.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {e.tipo}
                      {e.alcance ? ` · ${e.alcance}` : e.ambito ? ` · ${e.ambito}` : ""}
                    </p>
                    {href && (
                      <p className="mt-2 text-sm">
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="font-medium text-primary underline underline-offset-4"
                        >
                          Web de la entidad
                          <span className="sr-only"> {e.nombre} (se abre en otra pestaña)</span>
                        </a>
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
