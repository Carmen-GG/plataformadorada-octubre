import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, FileUp, Newspaper, ShieldCheck } from "lucide-react";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";

const cmsUrl = import.meta.env.VITE_ADHESION_COUNT_URL?.trim() ?? "";

export const Route = createFileRoute("/admin")({
  head: () =>
    pageHead({
      path: "/admin",
      noindex: true,
      title: "Backoffice",
      description: "Gestión interna de noticias y recursos de Plataforma Dorada.",
    }),
  component: Page,
});

function Page() {
  const adminUrl = cmsUrl ? `${cmsUrl}${cmsUrl.includes("?") ? "&" : "?"}admin=1` : "";
  return (
    <>
      <PageHeader
        eyebrow="Gestión interna"
        title="Backoffice"
        lead="Desde aquí puedes abrir el panel para publicar noticias y subir materiales de la Plataforma Dorada."
      />
      <section className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6">
        <Panel>
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-accent/30 p-3 text-primary">
              <ShieldCheck aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Panel de gestión</h2>
              <p className="mt-2 text-muted-foreground">
                El panel se abre en Google Apps Script. Los archivos se guardan en Google Drive y
                las noticias en una hoja privada; la web pública solo recibe los contenidos que
                hayas publicado.
              </p>
            </div>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="glass-soft rounded-2xl p-5">
              <Newspaper className="text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Noticias</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Titular, medio, fecha, enlace y resumen.
              </p>
            </div>
            <div className="glass-soft rounded-2xl p-5">
              <FileUp className="text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Recursos</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                PDF, imágenes, carteles y otros materiales hasta 10 MB.
              </p>
            </div>
          </div>
          <a
            href={adminUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
            aria-disabled={!adminUrl}
            onClick={(event) => {
              if (!adminUrl) event.preventDefault();
            }}
          >
            Abrir panel de gestión <ExternalLink size={17} aria-hidden="true" />
          </a>
          {!adminUrl && (
            <p className="mt-3 text-sm text-destructive">
              Configura primero VITE_ADHESION_COUNT_URL con la URL del Web App de Apps Script.
            </p>
          )}
        </Panel>
      </section>
    </>
  );
}
