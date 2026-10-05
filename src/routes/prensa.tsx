import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE, pressResources as fallbackResources } from "@/lib/content";
import { useCmsContent } from "@/lib/cms";

export const Route = createFileRoute("/prensa")({
  head: () => pageHead({ path: "/prensa", title: "Recursos", description: "Dossier de prensa, logotipos, carteles y material para redes de la Plataforma Dorada." }),
  component: Page,
});

function previewUrl(url: string, filename: string) {
  if (!url) return "";
  const id = url.match(/[?&]id=([^&]+)/)?.[1];
  if (id && /\.(pdf)$/i.test(filename)) return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w800`;
  return url;
}

function isImage(filename: string) { return /\.(png|jpe?g|gif|webp|svg)$/i.test(filename); }

function Page() {
  const cms = useCmsContent();
  const resources = cms?.recursos ?? fallbackResources.map((r, i) => ({ id: String(i), title: r.title, category: r.category, description: r.description, filename: "", url: "", previewUrl: "" }));
  return <>
    <PageHeader eyebrow="Para medios y difusión" title="Recursos" lead={`Contacto de prensa: ${SITE.email}`}
      titleAside={<Link to="/imagen-perfil" className="shrink-0 rounded-3xl bg-accent px-5 py-3 text-right font-semibold text-accent-foreground shadow-sm"><span className="block text-xs uppercase tracking-[0.16em]">Herramienta</span><span>Crea tu imagen de perfil solidaria</span></Link>}
    >
      <span className="text-sm text-muted-foreground">Materiales para comunicar y compartir Plataforma Dorada.</span>
    </PageHeader>
    <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {resources.map((r) => {
          const thumb = r.previewUrl || previewUrl(r.url, r.filename);
          return <Panel key={r.id} className="overflow-hidden">
            <div className="grid gap-5 sm:grid-cols-[1fr_180px] sm:items-center">
              <div><p className="text-xs font-semibold tracking-widest text-primary uppercase">{r.category}</p><h2 className="mt-2 font-display text-xl font-semibold">{r.title}</h2>{r.description && <p className="mt-2 text-muted-foreground">{r.description}</p>}{r.url ? <a href={r.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Abrir / descargar</a> : <p className="mt-4 text-sm text-muted-foreground">Descarga disponible próximamente</p>}</div>
              <div className="flex min-h-36 items-center justify-center rounded-2xl border border-border bg-muted/40 p-3">{thumb ? <a href={r.url} target="_blank" rel="noreferrer" className="block" aria-label={`Abrir ${r.title}`}>{isImage(r.filename) ? <img src={thumb} alt={`Miniatura de ${r.title}`} className="max-h-44 w-full rounded-xl object-contain" /> : <img src={thumb} alt={`Vista previa de ${r.title}`} className="max-h-44 w-full rounded-xl object-contain" />}</a> : <span className="text-center text-xs font-semibold text-muted-foreground">Sin vista previa</span>}</div>
            </div>
          </Panel>;
        })}
      </div>
    </section>
  </>;
}
