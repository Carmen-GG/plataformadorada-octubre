import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE, pressResources as fallbackResources } from "@/lib/content";
import { useCmsContent } from "@/lib/cms";

export const Route = createFileRoute("/prensa")({
  head: () =>
    pageHead({
      path: "/prensa",
      title: "Recursos",
      description:
        "Dossier de prensa, logotipos, carteles y material para redes de la Plataforma Dorada.",
    }),
  component: Page,
});

function Page() {
  const cms = useCmsContent();
  const resources =
    cms?.recursos ??
    fallbackResources.map((r, i) => ({
      id: String(i),
      title: r.title,
      category: r.category,
      description: r.description,
      filename: "",
      url: "",
    }));
  return (
    <>
      <PageHeader
        eyebrow="Para medios y difusión"
        title="Recursos"
        lead={`Contacto de prensa: ${SITE.email}`}
      />
      <section className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6">
        <div className="flex justify-end">
          <Link to="/imagen-perfil" className="rounded-3xl bg-accent px-5 py-3 text-right font-semibold text-accent-foreground shadow-sm">
            <span className="block text-xs uppercase tracking-[0.16em]">Herramienta</span>
            <span>Crea tu imagen de perfil solidaria</span>
          </Link>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {resources.map((r) => (
            <Panel key={r.id}>
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                {r.category}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold">{r.title}</h2>
              <p className="mt-2 text-muted-foreground">{r.description}</p>
              {r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Descargar
                </a>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  Descarga disponible próximamente
                </p>
              )}
            </Panel>
          ))}
        </div>
      </section>
    </>
  );
}
