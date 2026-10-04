import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE, pressResources as fallbackResources } from "@/lib/content";
import { useCmsContent } from "@/lib/cms";

export const Route = createFileRoute("/prensa")({
  head: () =>
    pageHead({
      path: "/prensa",
      title: "Prensa y recursos",
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
        title="Prensa y recursos"
        lead={`Contacto de prensa: ${SITE.email}`}
      />
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
        <Panel className="mt-6">
          <h2 className="font-display text-xl font-semibold">Imagen de perfil solidaria</h2>
          <p className="mt-2 text-muted-foreground">
            Añade el marco dorado a tu foto y compártela en redes.
          </p>
          <Link
            to="/imagen-perfil"
            className="mt-4 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground"
          >
            Crear mi imagen
          </Link>
        </Panel>
      </section>
    </>
  );
}
