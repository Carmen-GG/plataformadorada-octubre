import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/aviso-legal")({
  head: () =>
    pageHead({
      path: "/aviso-legal",
      title: "Aviso legal",
      description:
        "Información legal sobre la titularidad y el uso del sitio web de Plataforma Dorada.",
    }),
  component: () => <LegalPage doc="aviso" />,
});
