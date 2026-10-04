import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, MapPin } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { useCmsContent } from "@/lib/cms";

export const Route = createFileRoute("/eventos")({
  head: () =>
    pageHead({
      path: "/eventos",
      title: "Eventos",
      description:
        "Próximos encuentros, concentraciones y actos de la Plataforma Dorada, y eventos ya realizados.",
    }),
  component: Page,
});

function parseEventDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return new Date(year, month - 1, day, 12, 0, 0);
}

function EventCard({ event }: { event: NonNullable<ReturnType<typeof useCmsContent>>["eventos"][number] }) {
  const date = parseEventDate(event.date);
  const day = date ? String(date.getDate()).padStart(2, "0") : "—";
  const month = date
    ? date.toLocaleDateString("es-ES", { month: "short" }).replace(".", "").toUpperCase()
    : "";

  return (
    <li className="glass-panel rounded-3xl p-5 sm:flex sm:items-start sm:gap-5">
      <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary text-center text-primary-foreground">
        <span className="font-display text-xl font-semibold leading-none">
          {day}
          <br />
          <span className="text-xs">{month}</span>
        </span>
      </div>
      <div className="mt-4 sm:mt-0">
        <p className="font-display text-lg font-semibold">{event.title}</p>
        {(event.place || event.city || event.time) && (
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin size={15} aria-hidden="true" />
            {[event.place, event.city, event.time].filter(Boolean).join(" · ")}
          </p>
        )}
        {event.description && (
          <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
        )}
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
          >
            Más información <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </li>
  );
}

function Page() {
  const cms = useCmsContent();
  const allEvents = cms?.eventos ?? [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const events = allEvents
    .map((event) => ({ event, date: parseEventDate(event.date) }))
    .filter((item) => item.date !== null)
    .sort((a, b) => a.date!.getTime() - b.date!.getTime());

  const upcoming = events.filter((item) => item.date!.getTime() >= today.getTime()).map((item) => item.event);
  const past = events
    .filter((item) => item.date!.getTime() < today.getTime())
    .map((item) => item.event)
    .reverse();

  return (
    <>
      <PageHeader
        eyebrow="Agenda"
        title="Eventos"
        lead="Encuéntranos en tu ciudad. La agenda se actualiza desde el equipo de la Plataforma."
      />
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <h2 className="font-display text-3xl">Próximos eventos</h2>
        {cms === null ? (
          <p className="mt-6 text-muted-foreground">Cargando agenda…</p>
        ) : upcoming.length ? (
          <ul className="mt-6 space-y-4">
            {upcoming.map((event) => <EventCard key={event.id} event={event} />)}
          </ul>
        ) : (
          <p className="mt-6 text-muted-foreground">No hay próximos eventos publicados.</p>
        )}
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <h2 className="font-display text-3xl">Eventos realizados</h2>
        {past.length ? (
          <ul className="mt-6 space-y-4">
            {past.map((event) => <EventCard key={event.id} event={event} />)}
          </ul>
        ) : (
          <p className="mt-6 text-muted-foreground">Todavía no hay eventos realizados publicados.</p>
        )}
      </section>
    </>
  );
}
