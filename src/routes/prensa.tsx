import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE, pressResources as fallbackResources } from "@/lib/content";
import { useCmsContent, type CmsResource } from "@/lib/cms";

export const Route = createFileRoute("/prensa")({
  head: () => pageHead({ path: "/prensa", title: "Recursos", description: "Dossier de prensa, logotipos, carteles y material para redes de la Plataforma Dorada." }),
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
  const resources = cms?.recursos ?? fallbackResources.map((r, i) => ({ id: String(i), title: r.title, category: r.category, description: r.description, filename: "", url: "", previewUrl: "" }));
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(resources.map(categoryFor)))], [resources]);
  const [selected, setSelected] = useState("Todos");
  const visible = selected === "Todos" ? resources : resources.filter((resource) => categoryFor(resource) === selected);

  return (
    <>
      <PageHeader
        eyebrow="Para medios y difusión"
        title="Recursos"
        lead={`Contacto de prensa: ${SITE.email}`}
        titleAside={<Link to="/imagen-perfil" className="shrink-0 rounded-3xl bg-accent px-5 py-3 text-right font-semibold text-accent-foreground shadow-sm"><span className="block text-xs uppercase tracking-[0.16em]">Herramienta</span><span>Crea tu imagen de perfil solidaria</span></Link>}
      >
        <span className="text-sm text-muted-foreground">Materiales para comunicar y compartir Plataforma Dorada.</span>
      </PageHeader>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
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
      </section>
    </>
  );
}
