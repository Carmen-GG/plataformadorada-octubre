import { createFileRoute, Link } from "@tanstack/react-router";
import { Panel } from "@/components/page-header";
import { INTL_LOCALE, useI18n } from "@/lib/i18n";
import { AdhesionCount } from "@/lib/adhesions";
import {
  LiveCount,
  formatCount,
  formatNumberEs,
  listStatus,
  usePublicStats,
  type CounterKey,
} from "@/lib/public-stats";
import { useCmsContent } from "@/lib/cms";
import { GOBIERNOS, matchGobierno } from "@/lib/gobiernos";
import { LatestInstagramVideo } from "@/components/social-feeds";
import { SocialViewsCounter } from "@/components/social-views-counter";
import { TestimonyCarousel } from "@/components/testimony-carousel";
import { AdhesionCarousel } from "@/components/adhesion-carousel";
import { pageHead } from "@/lib/seo";
import {
  counters,
  indicators,
  regions,
} from "@/lib/content";

const COUNTER_KEY: Record<string, CounterKey> = {
  adhesiones: "adhesiones",
  voluntarios: "voluntarios",
  entidades: "entidades",
  ayuntamientos: "ayuntamientos",
};

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title: "Inicio",
      fullTitle:
        "Plataforma Dorada · Por un Pacto de Estado por la Dependencia y los Cuidados",
      description:
        "Movimiento ciudadano apartidista para exigir un Pacto de Estado por la Dependencia y los Cuidados. Adhiérete, hazte voluntario y comparte tu testimonio.",
    }),
  component: Home,
});

function Home() {
  const { t, locale } = useI18n();
  const cms = useCmsContent();
  const state = usePublicStats();
  const stats = state.stats;

  const recentJoins = (stats?.ultimasAdhesiones ?? []).slice(0, 8);
  const joinsStatus = listStatus(
    state,
    recentJoins.length,
    "Todavía no hay adhesiones públicas.",
  );

  // Gobiernos autonómicos: los que figuran con apoyo en la pestaña GobiernosWeb salen con check
  // y primero; el resto, detrás y sin check.
  const supportedSheet = (cms?.gobiernos ?? []).filter((x) => x.supports);
  const govRows = GOBIERNOS.map((g) => ({
    g,
    supports: supportedSheet.some((x) => matchGobierno(g, x.community)),
  })).sort((x, y) => Number(y.supports) - Number(x.supports));
  const govSupport = govRows.filter((r) => r.supports).length;

  const entitiesList = (stats?.entidadesAdheridas ?? []).slice(0, 8);
  const entitiesStatus = listStatus(
    state,
    entitiesList.length,
    "Todavía no hay entidades adheridas públicas.",
  );

  const voices = (stats?.testimonios ?? []).slice(0, 8);
  const voicesStatus = listStatus(
    state,
    voices.length,
    "Todavía no hay testimonios publicados.",
  );

  const nextEvent = (cms?.eventos ?? [])
    .filter((event) => {
      if (!event.date) return false;
      const timestamp = new Date(`${event.date}T23:59:59`).getTime();
      return Number.isFinite(timestamp) && timestamp >= Date.now();
    })
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-14 pb-8 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-primary uppercase">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-accent"
              />
              {t("home.badge")}
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.03] tracking-tight md:text-6xl">
              {locale === "en" ? t("For a State Pact on Dependency and Care") : locale === "ca" || locale === "va" ? <>Per un Pacte d’Estat per la{" "}<span className="text-primary italic">dependència</span> i les cures</> : locale === "fr" ? <>Pour un Pacte d’État pour la{" "}<span className="text-primary italic">dépendance</span> et les soins</> : locale === "de" ? <>Für einen Staatspakt für{" "}<span className="text-primary italic">Pflegebedürftigkeit</span> und Pflege</> : locale === "eu" ? <>Mendekotasunaren eta zaintzen aldeko{" "}<span className="text-primary italic">Estatu-ituna</span></> : locale === "gl" ? <>Por un Pacto de Estado pola{" "}<span className="text-primary italic">dependencia</span> e os coidados</> : <>Por un Pacto de Estado por la{" "}<span className="text-primary italic">dependencia</span> y los cuidados</>}
            </h1>
            <div className="mt-6 max-w-xl space-y-3 text-base md:text-[1.05rem] leading-relaxed text-muted-foreground">
              <p>{t("Queremos un sistema que cuide de verdad.")}</p>
              <p>{t("Que las personas dependientes, sus familias y quienes las cuidan sepan que la ayuda no va a fallar ni a desaparecer de un día para otro.")}</p>
              <p>{t("Para eso hace falta una financiación suficiente, estable y pensada para durar. Centrada en dar respuesta a las necesidades reales de las personas, y que no dependa de cambios presupuestarios, tiempos electorales e intereses partidistas.")}</p>
              <p>{t("El cuidado no puede ser un negocio. Tiene que ser transparente, sin especulación, con calidad asistencial comprobada y comprobable, poniendo a las personas en el centro, respetando sus preferencias y sus proyectos vitales.")}</p>
              <p>{t("Necesitamos una cartera básica de servicios de calidad que se adapte a cada territorio, garantizando la accesibilidad a los servicios independientemente de donde resida y de los cambios que pueda haber en su vida.")}</p>
              <p>{t("Y, sobre todo, que las personas puedan elegir de verdad.")}</p>
              <p>{t("Porque cuidar no debería ser una lucha constante. Debería ser un derecho que se cumple.")}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/unete"
                className="rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {t("cta.joinNow")}
              </Link>
              <Link
                to="/voluntariado"
                className="glass-soft rounded-full px-7 py-3.5 text-base font-semibold text-primary"
              >
                {t("cta.collaborate")}
              </Link>
            </div>

          </div>

          <div className="lg:col-span-5">
            <Panel>
              <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                {t("home.countersTitle")}
              </p>
              <p className="mt-2 font-display text-4xl font-bold tabular-nums text-primary sm:text-5xl">
                <AdhesionCount />
              </p>
              <dl className="mt-5">
                <div className="glass-soft rounded-2xl p-3">
                  <dd className="font-display text-xl font-bold tabular-nums">
                    <LiveCount name="mocionesPresentadas" />
                  </dd>
                  <dt className="mt-1 text-[11px] text-muted-foreground">
                    {t("Mociones presentadas")}
                  </dt>
                </div>
              </dl>
              <div className="mt-5" data-no-translate>
                <h3 className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  {t("Gobiernos autonómicos que apoyan el Pacto")}
                </h3>
                <p className="mt-1 text-sm font-semibold text-primary" aria-live="polite">
                  {t("{n} de {total} Gobiernos han dado su apoyo")
                    .replace("{n}", String(govSupport))
                    .replace("{total}", String(govRows.length))}
                </p>
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {govRows.map(({ g, supports }) => (
                    <li
                      key={g.key}
                      className={
                        supports
                          ? "flex items-center gap-2 rounded-xl border border-[#39ff14] bg-[#39ff14]/15 px-2.5 py-2 text-xs font-bold text-foreground shadow-[0_0_14px_rgba(57,255,20,0.45)]"
                          : "flex items-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-2.5 py-2 text-xs text-muted-foreground"
                      }
                    >
                      <span
                        aria-hidden="true"
                        className={
                          supports
                            ? "grid size-6 shrink-0 place-items-center rounded-full bg-[#39ff14] text-base leading-none font-black text-[#053b0c] shadow-[0_0_12px_#39ff14]"
                            : "grid size-6 shrink-0 place-items-center rounded-full border-2 border-dashed border-muted-foreground/40 text-xs leading-none text-muted-foreground/60"
                        }
                      >
                        {supports ? "✓" : "✕"}
                      </span>
                      <span className="min-w-0 leading-snug">
                        {g.labels[locale]}
                        <span className="sr-only">
                          {" — "}
                          {supports ? t("Apoya el Pacto") : t("Aún sin apoyo")}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                {t("Datos agregados. Nunca se publican datos personales ni ubicaciones individuales.")}
              </p>
            </Panel>
          </div>
        </div>
      </section>

      {/* Contadores principales */}
      <section
        aria-labelledby="contadores"
        className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6"
      >
        <h2 id="contadores" className="sr-only">
          {t("Cifras del movimiento")}
        </h2>
        <dl className="grid grid-cols-2 gap-4 lg:w-[70%]">
          {counters.map((c) => (
            <div key={c.key} className="glass-panel rounded-2xl p-5">
              <dd className="font-display text-2xl font-bold text-primary sm:text-3xl">
                {COUNTER_KEY[c.key] ? (
                  <LiveCount name={COUNTER_KEY[c.key]!} />
                ) : (
                  c.value
                )}
              </dd>
              <dt className="mt-1 text-sm text-muted-foreground">
                {t(c.label)}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Situación actual + Instagram */}
      <section
        aria-labelledby="situacion-actual"
        className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6"
      >
        <div className="grid items-start gap-8 lg:grid-cols-[7fr_3fr]">
          <div>
            <h2
              id="situacion-actual"
              className="font-display text-3xl font-semibold"
            >
              {t("La situación actual")}
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                {t("Cuidar no puede seguir recayendo en las familias y dependiendo de la vocación de los cuidadores.")}
              </p>
              <p>
                {t("Miles de personas en situación de dependencia: mayores, personas con discapacidad o con enfermedades crónicas, esperan meses para una valoración y vuelven a esperar para obtener un recurso insuficiente. Mientras tanto, sus familiares y cuidadores sostienen el día a día a costa de su tiempo, su salud y su proyecto vital.")}
              </p>
              <p>
                {t("Negocio a costa de precariedad laboral de las profesionales, baja calidad asistencial hacia las personas dependientes, servicios diseñados en función del mayor beneficio económico, obviando el hecho de la vulnerabilidad extrema en la que se encuentran sus “clientes”.")}
              </p>
              <p>
                {t("Profesionales del ámbito sociosanitario trabajando con un alto compromiso y asumiendo una gran responsabilidad, con medios escasos y exigencias altas para cumplir unos objetivos… pero.. los objetivos de quién?")}
              </p>
              <p>
                {t("El sistema necesita más medios, mejor coordinación sociosanitaria y una respuesta que no dependa de dónde vivas.")}
              </p>
              <p>
                {t("Por eso nace y trabaja Plataforma Dorada, para conseguir un Pacto de Estado por la Dependencia y los Cuidados.")}
              </p>
              <p>
                {t("Plataforma Dorada une las voces de las personas dependientes, de sus familias, de los cuidadores principales y de los profesionales, y trabaja para conseguir que las personas, los cuidados y la dependencia estén en el centro de las políticas públicas.")}
              </p>
            </div>
          </div>

          <div className="grid content-start gap-4">
            <SocialViewsCounter />
            <Panel as="section">
              <h2 className="font-display text-2xl font-semibold">
                {t("Último vídeo de Instagram")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("Se actualiza automáticamente con el contenido más reciente de")}
                @assumptaserna.
              </p>
              <LatestInstagramVideo />
            </Panel>
          </div>
        </div>

        {/* Indicadores */}
        <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {indicators.map((i) => {
            const d = stats?.indicadores?.[i.key];
            const fallback: Record<string, string> = {
              lista_espera: "142.887",
              tiempo_tramitacion: `10,5 ${t("home.months")}`,
              cuidadores_convenio: "101.702",
              municipios_mociones_aprobadas: "—",
            };
            const value =
              d?.valor != null
                ? `${formatNumberEs(d.valor)}${
                    d.unidad === "meses"
                      ? ` ${t("home.months")}`
                      : d.unidad === "días"
                        ? ` ${t("home.days")}`
                        : d.unidad === "%"
                          ? " %"
                          : ""
                  }`
                : fallback[i.key] ?? "—";

            return (
              <div key={i.key} className="glass-panel rounded-3xl p-6">
                <dd
                  className="font-display text-4xl font-bold leading-none tabular-nums text-primary sm:text-5xl"
                  aria-label={`${value}. ${t(i.label)}`}
                >
                  {value}
                </dd>
                <dt className="mt-4 text-sm leading-snug text-muted-foreground">
                  {t(i.label)}
                </dt>
              </div>
            );
          })}
        </dl>
        <p className="mt-4 text-sm">
          <Link
            to="/datos"
            className="font-semibold text-primary underline underline-offset-4"
          >
            {t("Ver todos los datos e indicadores")}
          </Link>
        </p>
      </section>

      {/* Mapa + eventos + últimas entidades */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid items-start gap-6 lg:grid-cols-12">
          {/* Mapa a la izquierda */}
          <Panel as="section" className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-2xl font-semibold">
                {t("Mapa de adhesiones")}
              </h2>
              <span className="text-xs text-muted-foreground">
                {t("Datos agregados por territorio")}
              </span>
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[360px] text-sm">
                <caption className="sr-only">
                  {t("Resumen de adhesiones por comunidad autónoma")}
                </caption>
                <thead>
                  <tr className="bg-muted text-left">
                    <th className="px-4 py-3 font-semibold">
                      {t("Comunidad autónoma")}
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      {t("Adhesiones")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ...(stats?.resumenWeb?.length
                      ? stats.resumenWeb
                      : regions.map((r) => ({
                          comunidad: r.name,
                          adhesiones: Number(
                            stats?.porComunidad[r.name]?.adhesiones ?? 0,
                          ),
                        }))),
                  ]
                    .sort(
                      (a, b) =>
                        b.adhesiones - a.adhesiones ||
                        a.comunidad.localeCompare(b.comunidad, "es"),
                    )
                    .map((r, i) => (
                      <tr
                        key={`${r.comunidad}-${i}`}
                        className="border-t border-border"
                      >
                        <td className="px-4 py-2.5">{t(r.comunidad)}</td>
                        <td className="px-4 py-2.5 text-right font-semibold">
                          {formatCount(r.adhesiones)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm">
              <Link
                to="/datos"
                className="font-semibold text-primary underline underline-offset-4"
              >
                {t("Ver el mapa completo por comunidad autónoma")}
              </Link>
            </p>
          </Panel>

          {/* Eventos arriba y entidades debajo */}
          <div className="grid gap-6 lg:col-span-5">
            <Panel as="section" className="min-w-0 overflow-hidden">
              <h2 className="font-display text-2xl font-semibold">
                {t("Próximo evento")}
              </h2>
              {nextEvent ? (
                <div className="glass-soft mt-5 flex min-w-0 items-center gap-4 overflow-hidden rounded-2xl p-4">
                  <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary px-1 text-center text-primary-foreground">
                    <span className="font-display text-xl font-bold leading-none">
                      {new Date(`${nextEvent.date}T12:00:00`).getDate()}
                      <span className="mt-1 block text-[10px] tracking-wide">
                        {new Date(`${nextEvent.date}T12:00:00`).toLocaleDateString(INTL_LOCALE[locale], { month: "short" }).replace(".", "").toUpperCase()}
                      </span>
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="break-words font-display text-lg font-semibold leading-snug">
                      {nextEvent.title}
                    </p>
                    <p className="mt-1 break-words text-sm text-muted-foreground">
                      {[nextEvent.place, nextEvent.city].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  {t("Próximamente anunciaremos nuevos eventos.")}
                </p>
              )}
              <p className="mt-4 text-sm">
                <Link to="/eventos" className="font-semibold text-primary underline underline-offset-4">
                  {t("Ver todos los eventos")}
                </Link>
              </p>
            </Panel>

            <Panel as="section">
              <h2 className="font-display text-2xl font-semibold">
                {t("Últimas entidades adheridas")}
              </h2>
              {entitiesStatus ? (
                <p
                  className="mt-5 text-sm text-muted-foreground"
                  role="status"
                >
                  {entitiesStatus}
                </p>
              ) : (
                <ul className="mt-5 flex flex-wrap gap-3">
                  {entitiesList.map((e, i) => (
                    <li
                      key={i}
                      className="glass-soft rounded-full px-4 py-2 text-sm font-medium"
                    >
                      {e.nombre} · {e.tipo}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-5 text-sm">
                <Link
                  to="/entidades"
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  {t("Ver todas las entidades")}
                </Link>
              </p>
            </Panel>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section
        aria-labelledby="testimonios"
        className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6"
      >
        <h2 id="testimonios" className="font-display text-3xl font-semibold">
          {t("Testimonios")}
        </h2>
        {voicesStatus ? (
          <p className="mt-6 text-muted-foreground" role="status">
            {voicesStatus}
          </p>
        ) : (
          <TestimonyCarousel items={voices} />
        )}
        <p className="mt-4 text-sm">
          <Link
            to="/testimonios"
            className="font-semibold text-primary underline underline-offset-4"
          >
            {t("Leer y compartir testimonios")}
          </Link>
        </p>
      </section>

      {/* Últimas adhesiones + rincón de prensa + contacto */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8 pb-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Panel as="section">
            <h2 className="font-display text-xl font-semibold">{t("Últimas adhesiones")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("Solo aparecen las personas que han autorizado expresamente la publicación de sus datos.")}
            </p>
            {joinsStatus ? (
              <p className="mt-4 text-sm text-muted-foreground" role="status">{joinsStatus}</p>
            ) : (
              <AdhesionCarousel items={recentJoins} />
            )}
            <p className="mt-4 text-sm">
              <Link to="/datos" className="font-semibold text-primary underline underline-offset-4">
                {t("Ver adhesiones")}
              </Link>
            </p>
          </Panel>
          <Panel as="section">
            <h2 className="font-display text-xl font-semibold">{t("Rincón de prensa")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("Logotipos, dossier de prensa, noticias y materiales para descargar y difundir el movimiento.")}
            </p>
            <Link to="/prensa" className="glass-soft mt-4 inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-primary">
              {t("Ir a prensa/descargables")}
            </Link>
          </Panel>
          <Panel as="section">
            <h2 className="font-display text-xl font-semibold">{t("Contacto")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("¿Eres periodista, entidad o ayuntamiento? Escríbenos.")}
            </p>
            <Link to="/contacto" className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">{t("Escríbenos")}</Link>
          </Panel>
        </div>
      </section>
    </>
  );
}
