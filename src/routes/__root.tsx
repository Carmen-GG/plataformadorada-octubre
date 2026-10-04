import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { organizationJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieBanner } from "@/components/cookie-banner";
import { I18nProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-6xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o se ha movido.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {}, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          Esta página no se ha cargado
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ha ocurrido un problema. Puedes reintentar o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="glass-soft rounded-full px-5 py-2.5 text-sm font-semibold text-primary"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => {
    const jsonLd = organizationJsonLd();

    return {
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title:
            "Plataforma Dorada · Por un Pacto de Estado por la Dependencia y los Cuidados",
        },
        {
          name: "description",
          content:
            "Movimiento ciudadano y apartidista que reclama un Pacto de Estado por la Dependencia y los Cuidados en España. Adhiérete, colabora y comparte tu testimonio.",
        },
        { property: "og:site_name", content: "Plataforma Dorada" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      ],
      scripts: jsonLd
        ? [{ type: "application/ld+json", children: jsonLd }]
        : [],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <div className="page-gradient relative min-h-screen overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -left-24 size-[420px] rounded-full bg-accent/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/3 -right-24 size-[460px] rounded-full bg-primary/20 blur-3xl"
          />

          <a href="#contenido" className="skip-link">
            Saltar al contenido principal
          </a>

          <SiteHeader />

          <main id="contenido" className="relative z-10">
            <Outlet />
          </main>

          <SiteFooter />
          <CookieBanner />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}
