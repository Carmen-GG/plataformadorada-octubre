import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/accesibilidad")({
  head: () =>
    pageHead({
      path: "/accesibilidad",
      title: "Declaración de accesibilidad",
      description: "Compromiso de accesibilidad del sitio de Plataforma Dorada según WCAG 2.1 AA.",
    }),
  component: () => <LegalPage doc="accesibilidad" />,
});
