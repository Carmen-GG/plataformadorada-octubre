import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacidad")({
  head: () =>
    pageHead({
      path: "/privacidad",
      title: "Política de privacidad del voluntariado",
      description: "Cómo trata Plataforma Dorada los datos de las personas voluntarias y cómo ejercer tus derechos.",
    }),
  component: () => <LegalPage doc="privacidad" />,
});
