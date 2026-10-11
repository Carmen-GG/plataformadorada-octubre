import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/mapa-web")({
  head: () => pageHead({
    path: "/mapa-web",
    title: "Mapa web",
    description: "Todas las secciones y páginas de Plataforma Dorada, organizadas por áreas de navegación.",
  }),
  component: SitemapPage,
});

const groups = [
  {
    title: "Inicio",
    description: "Accede a la portada y a las principales vías de participación.",
    links: [{ to: "/", label: "Página de inicio" }, { to: "/unete", label: "Adhiérete al Pacto" }, { to: "/contacto", label: "Formulario de contacto" }],
  },
  {
    title: "La Plataforma",
    description: "Conoce el movimiento, sus principios y su recorrido.",
    links: [
      { to: "/la-plataforma", label: "Quiénes somos" },
      { to: "/la-plataforma#principios", label: "Los 10 principios de Plataforma Dorada" },
      { to: "/la-plataforma#trayectoria", label: "Nuestra trayectoria" },
      { to: "/la-plataforma#hoja-de-ruta", label: "Hoja de ruta" },
    ],
  },
  {
    title: "La Dependencia",
    description: "Información sobre la dependencia y los cuidados.",
    links: [{ to: "/la-dependencia", label: "La Dependencia y los cuidados" }],
  },
  {
    title: "Participa",
    description: "Súmate al movimiento y comparte experiencias.",
    links: [
      { to: "/unete", label: "Firma el Pacto / Adhiérete" },
      { to: "/voluntariado", label: "Voluntariado" },
      { to: "/testimonios", label: "Testimonios" },
      { to: "/entidades", label: "Entidades" },
      { to: "/mociones-ayuntamientos", label: "Mociones en ayuntamientos" },
    ],
  },
  {
    title: "Datos y actualidad",
    description: "Consulta indicadores, novedades y actividades.",
    links: [
      { to: "/datos", label: "Datos de Plataforma Dorada" },
      { to: "/novedades", label: "Novedades" },
      { to: "/eventos", label: "Eventos" },
    ],
  },
  {
    title: "Prensa y recursos",
    description: "Materiales, publicaciones y presencia en medios.",
    links: [
      { to: "/prensa", label: "Prensa" },
      { to: "/prensa#prensa", label: "Noticias y apariciones en medios" },
      { to: "/prensa#recursos", label: "Recursos y documentos" },
    ],
  },
  {
    title: "Redes sociales",
    description: "Síguenos y comparte los contenidos del movimiento.",
    links: [
      { to: "/redes-sociales", label: "Instagram y TikTok" },
      { to: "/redes-sociales#spotify", label: "Spotify y música" },
      { to: "/redes-sociales#lemas", label: "Lemas y citas" },
      { to: "/redes-sociales#videos", label: "Vídeos y entrevistas" },
      { to: "/imagen-perfil", label: "Crea tu imagen de perfil" },
    ],
  },
  {
    title: "Información legal",
    description: "Información jurídica, privacidad y accesibilidad.",
    links: [
      { to: "/aviso-legal", label: "Aviso legal" },
      { to: "/privacidad", label: "Política de privacidad" },
      { to: "/cookies", label: "Política de cookies" },
      { to: "/accesibilidad", label: "Accesibilidad" },
    ],
  },
];

function SitemapPage() {
  return <>
    <PageHeader
      eyebrow="Explora la web"
      title="Mapa web"
      lead="Encuentra todas las páginas y secciones de Plataforma Dorada organizadas por temas. Todos los enlaces te llevan directamente al contenido."
    />
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, index) => (
          <Panel key={group.title} className="h-full transition-transform duration-200 hover:-translate-y-1">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-display text-lg font-bold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="font-display text-xl font-semibold">{group.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2 border-t border-border/70 pt-4">
              {group.links.map((item) => (
                <li key={item.to + item.label}>
                  <Link to={item.to as any} className="group inline-flex items-start gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
                    <span className="mt-0.5 text-primary" aria-hidden="true">↗</span>
                    <span className="underline decoration-primary/25 underline-offset-4 group-hover:decoration-primary">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </section>
  </>;
}
