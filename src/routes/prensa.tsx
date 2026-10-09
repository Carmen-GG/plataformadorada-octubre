import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/content";
import { useCmsContent, type CmsResource } from "@/lib/cms";

export const Route = createFileRoute("/prensa")({
  head: () => pageHead({ path: "/prensa", title: "Prensa y recursos", description: "Noticias de prensa y materiales para comunicar y compartir Plataforma Dorada." }),
  component: Page,
});

function extension(filename: string) {
  const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] ?? "archivo";
}

function categoryFor(resource: CmsResource) {
  if (resource.category?.trim()) return resource.category.trim();
  const ext = extension(resource.filename);
  if (ext === "pdf") return "PDFs";
  if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) return "Imágenes";
  if (["ppt", "pptx"].includes(ext)) return "Presentaciones";
  return "Otros";
}

function ResourcePreview({ resource }: { resource: CmsResource }) {
  const [broken, setBroken] = useState(false);
  const thumb = resource.previewUrl || resource.url;
  const kind = extension(resource.filename);

  if (!thumb || broken) {
    return (
      <div className="flex h-44 w-full flex-col items-center justify-center rounded-2xl bg-accent/15 text-primary">
        <span className="font-display text-3xl font-semibold uppercase">{kind === "archivo" ? "DOC" : kind}</span>
        <span className="mt-1 text-xs font-semibold">Vista previa no disponible</span>
      </div>
    );
  }

  return (
    <a href={resource.url || thumb} target="_blank" rel="noreferrer" className="block" aria-label={`Abrir ${resource.title}`}>
      <img
        src={thumb}
        alt={`Miniatura de ${resource.title}`}
        className="h-44 w-full rounded-2xl object-contain bg-background"
        loading="lazy"
        onError={() => setBroken(true)}
      />
    </a>
  );
}

function Page() {
  const cms = useCmsContent();
  const resources = cms?.recursos ?? [];
  const news = cms?.noticias ?? [];
  const [activeTab, setActiveTab] = useState<"prensa" | "recursos">("recursos");
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(resources.map(categoryFor)))], [resources]);
  const [selected, setSelected] = useState("Todos");
  const visible = selected === "Todos" ? resources : resources.filter((resource) => categoryFor(resource) === selected);

  return (
    <>
      <PageHeader
        eyebrow="Para medios y difusión"
        title="Prensa y recursos"
        lead={`Contacto de prensa: ${SITE.email}`}
      >
        <span className="text-sm text-muted-foreground">Consulta las noticias que compartimos y los materiales para comunicar Plataforma Dorada.</span>
      </PageHeader>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <div className="mb-7 flex flex-wrap gap-2 rounded-2xl border border-border bg-muted/40 p-2" role="tablist" aria-label="Secciones de prensa y recursos">
          <button type="button" role="tab" id="tab-prensa" aria-controls="panel-prensa" aria-selected={activeTab === "prensa"} onClick={() => setActiveTab("prensa")} className={activeTab === "prensa" ? "rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm" : "rounded-xl px-5 py-3 text-sm font-semibold text-muted-foreground hover:bg-background hover:text-foreground"}>Prensa</button>
          <button type="button" role="tab" id="tab-recursos" aria-controls="panel-recursos" aria-selected={activeTab === "recursos"} onClick={() => setActiveTab("recursos")} className={activeTab === "recursos" ? "rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm" : "rounded-xl px-5 py-3 text-sm font-semibold text-muted-foreground hover:bg-background hover:text-foreground"}>Recursos</button>
        </div>

        <div id="panel-prensa" role="tabpanel" aria-labelledby="tab-prensa" hidden={activeTab !== "prensa"}>
          {news.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <Panel key={item.id || item.url || item.title} className="flex flex-col">
                  {item.media && <p className="text-xs font-semibold tracking-widest text-primary uppercase">{item.media}</p>}
                  <h2 className="mt-2 font-display text-xl font-semibold">{item.title}</h2>
                  {item.date && <p className="mt-2 text-xs font-medium text-muted-foreground">{item.date}</p>}
                  {item.summary && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>}
                  {item.url && <a href={item.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Leer noticia</a>}
                </Panel>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-border bg-muted/30 p-6 text-muted-foreground">Todavía no hay noticias publicadas. Cuando se introduzcan y publiquen desde el backoffice, aparecerán aquí.</p>
          )}
        </div>

        <div id="panel-recursos" role="tabpanel" aria-labelledby="tab-recursos" hidden={activeTab !== "recursos"}>
        <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filtrar recursos por tipo">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={selected === category}
              onClick={() => setSelected(category)}
              className={selected === category ? "rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground" : "glass-soft rounded-full px-5 py-2.5 text-sm font-semibold text-primary"}
            >
              {category}
            </button>
          ))}
        </div>

        {visible.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((resource) => (
              <Panel key={resource.id} className="overflow-hidden p-0">
                <div className="p-4 pb-0"><ResourcePreview resource={resource} /></div>
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-widest text-primary uppercase">{categoryFor(resource)}</p>
                  <h2 className="mt-2 font-display text-xl font-semibold">{resource.title}</h2>
                  {resource.description && <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>}
                  {resource.url ? (
                    <a href={resource.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Abrir / descargar</a>
                  ) : (
                    <p className="mt-4 text-sm text-muted-foreground">Archivo pendiente de publicación.</p>
                  )}
                </div>
              </Panel>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No hay recursos de este tipo todavía.</p>
        )}
        </div>
      </section>
    </>
  );
}
