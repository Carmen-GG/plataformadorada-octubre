import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/mapa-web")({
  head: () =>
    pageHead({
      path: "/mapa-web",
      title: "Mapa web",
      description:
        "Mapa de Plataforma Dorada organizado siguiendo los mismos apartados y enlaces que la navegación principal y el pie de página.",
    }),
  component: SitemapPage,
});

// Mantener este listado alineado con SiteHeader y SiteFooter.
// Los destinos y anclas corresponden a los enlaces reales de navegación.
const groups = [
  {
    title: "Inicio y contacto",
    description: "Acceso a la portada y a las formas de contactar con Plataforma Dorada.",
    links: [
      { to: "/", label: "Página de inicio" },
      { to: "/contacto", label: "Formulario de contacto" },
    ],
  },
  {
    title: "Plataforma",
    description: "Conoce el movimiento, su trayectoria y sus objetivos.",
    links: [
      { to: "/la-plataforma", label: "Quiénes somos" },
      { to: "/eventos", label: "Eventos y actividades" },
      { to: "/la-plataforma#trayectoria", label: "Nuestra trayectoria" },
      { to: "/la-plataforma#hoja-de-ruta", label: "Hoja de ruta" },
    ],
  },
  {
    title: "Dependencia",
    description: "Información sobre la dependencia y los cuidados.",
    links: [{ to: "/la-dependencia", label: "La dependencia y los cuidados" }],
  },
  {
    title: "Participa",
    description: "Formas de apoyar el Pacto y contribuir al movimiento.",
    links: [
      { to: "/unete", label: "Firma el Pacto / Adhiérete" },
      { to: "/testimonios", label: "Comparte tu testimonio" },
      { to: "/voluntariado", label: "Hazte voluntario/a" },
      { to: "/mociones-ayuntamientos", label: "Mociones en ayuntamientos" },
      { to: "/entidades", label: "Entidades que apoyan el movimiento" },
    ],
  },
  {
    title: "Datos",
    description: "Consulta los principales indicadores de Plataforma Dorada.",
    links: [{ to: "/datos", label: "Datos de Plataforma Dorada" }],
  },
  {
    title: "Prensa",
    description: "Noticias, apariciones en medios y materiales oficiales.",
    links: [
      { to: "/prensa#prensa", label: "Noticias y apariciones en medios" },
      { to: "/prensa#recursos", label: "Material oficial descargable" },
    ],
  },
  {
    title: "Conecta",
    description: "Redes sociales, música, vídeos y materiales para compartir.",
    links: [
      { to: "/redes-sociales#instagram", label: "Instagram" },
      { to: "/redes-sociales#tiktok", label: "TikTok" },
      { to: "/redes-sociales#spotify", label: "Spotify y música" },
      { to: "/redes-sociales#lemas", label: "Lemas y citas" },
      { to: "/redes-sociales#videos", label: "Vídeos y entrevistas" },
      { to: "/imagen-perfil", label: "Crea tu imagen de perfil" },
    ],
  },
  {
    title: "Información legal",
    description: "Información legal, privacidad, cookies y accesibilidad.",
    links: [
      { to: "/aviso-legal", label: "Aviso legal" },
      { to: "/privacidad", label: "Política de privacidad" },
      { to: "/cookies", label: "Política de cookies" },
      { to: "/accesibilidad", label: "Accesibilidad" },
    ],
  },
];

function SitemapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Explora la web"
        title="Mapa web"
        lead="Encuentra las páginas de Plataforma Dorada organizadas según los apartados de la navegación principal y del pie de página. Cada enlace lleva a su página o sección correspondiente."
      />
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Panel
              key={group.title}
              className="h-full transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-display text-lg font-bold text-primary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold">{group.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-2 border-t border-border/70 pt-4">
                {group.links.map((item) => (
                  <li key={item.to + item.label}>
                    <Link
                      to={item.to as any}
                      className="group inline-flex items-start gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      <span className="mt-0.5 text-primary" aria-hidden="true">
                        ↗
                      </span>
                      <span className="underline decoration-primary/25 underline-offset-4 group-hover:decoration-primary">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      </section>
    </>
  );
}
