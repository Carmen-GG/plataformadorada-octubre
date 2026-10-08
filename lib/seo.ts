import { SITE } from "@/lib/content";

/**
 * Dirección pública de la web, sin barra final (p. ej. https://plataformadorada.es).
 * Se define con VITE_SITE_URL al compilar. Sin ella no se emiten URLs canónicas ni
 * imagen para redes (requieren dirección absoluta); robots.txt y sitemap.xml usan
 * entonces la dirección con la que se accede a la web.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").trim().replace(/\/+$/, "");

/** Páginas públicas que se listan en sitemap.xml. */
export const PUBLIC_PATHS = [
  "/",
  "/la-plataforma",
  "/la-dependencia",
  "/unete",
  "/voluntariado",
  "/testimonios",
  "/eventos",
  "/datos",
  "/mociones-ayuntamientos",
  "/entidades",
  "/novedades",
  "/prensa",
  "/redes-sociales",
  "/imagen-perfil",
  "/contacto",
  "/aviso-legal",
  "/privacidad",
  "/cookies",
  "/accesibilidad",
] as const;

type HeadOptions = {
  title: string;
  description: string;
  /** Título completo, sin añadir el sufijo de la marca (portada). */
  fullTitle?: string;
  /** Ruta de la página ("/unete"); permite emitir la URL canónica. */
  path?: string;
  /** Páginas que no deben aparecer en buscadores (backoffice). */
  noindex?: boolean;
};

export function pageHead({
  title,
  description,
  path,
  noindex,
  fullTitle: fixedTitle,
}: HeadOptions) {
  const fullTitle = fixedTitle ?? `${title} · Plataforma Dorada`;
  const url = SITE_URL && path ? `${SITE_URL}${path === "/" ? "" : path}` : "";
  const image = SITE_URL ? `${SITE_URL}/og-image.png` : "";
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_ES" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      ...(url ? [{ property: "og:url", content: url }] : []),
      ...(image
        ? [
            { property: "og:image", content: image },
            { property: "og:image:alt", content: "Logotipo de Plataforma Dorada" },
            { name: "twitter:image", content: image },
          ]
        : []),
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: url ? [{ rel: "canonical", href: url }] : [],
  };
}

/** Datos estructurados de la organización (solo si se conoce la dirección pública). */
export function organizationJsonLd(): string | null {
  if (!SITE_URL) return null;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Plataforma Dorada",
    alternateName: "Plataforma Dorada — Por un Pacto de Estado por la Dependencia y los Cuidados",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-plataforma-dorada.png`,
    description:
      "Movimiento ciudadano y apartidista que reclama un Pacto de Estado por la Dependencia y los Cuidados en España.",
    email: SITE.email,
  });
}
