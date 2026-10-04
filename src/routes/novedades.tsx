import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { news as fallbackNews } from "@/lib/content";
import { useCmsContent } from "@/lib/cms";

export const Route = createFileRoute("/novedades")({
  head: () =>
    pageHead({
      path: "/novedades",
      title: "Novedades",
      description: "Últimas noticias y apariciones en medios de la Plataforma Dorada.",
    }),
  component: Page,
});

function Page() {
  const cms = useCmsContent();
  const items =
    cms?.noticias ??
    fallbackNews.map((n, i) => ({
      id: String(i),
      title: n.title,
      media: n.media,
      date: n.date,
      url: n.url,
      summary: "",
    }));
  return (
    <>
      <PageHeader
        eyebrow="Actualidad"
        title="Novedades"
        lead="Lo último del movimiento y lo que dicen los medios."
      />
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        {items.length ? (
          <ul className="grid gap-5 md:grid-cols-3">
            {items.map((n) => (
              <li key={n.id} className="glass-panel rounded-3xl p-6">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  {n.media} · {n.date}
                </p>
                <p className="mt-3 font-display text-lg font-semibold">{n.title}</p>
                {n.summary && <p className="mt-2 text-sm text-muted-foreground">{n.summary}</p>}
                {n.url && n.url !== "#" && (
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-primary underline"
                  >
                    Leer noticia
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Todavía no hay noticias publicadas.</p>
        )}
      </section>
    </>
  );
}
