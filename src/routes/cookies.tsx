import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cookies")({
  head: () =>
    pageHead({
      path: "/cookies",
      title: "Política de cookies",
      description: "Qué cookies usa el sitio de Plataforma Dorada y cómo gestionarlas.",
    }),
  component: () => <LegalPage doc="cookies" />,
});
