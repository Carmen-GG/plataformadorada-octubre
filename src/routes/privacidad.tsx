import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacidad")({
  head: () =>
    pageHead({
      path: "/privacidad",
      title: "Política de privacidad",
      description: "Cómo trata Plataforma Dorada tus datos personales y cómo ejercer tus derechos.",
    }),
  component: () => <LegalPage doc="privacidad" />,
});
