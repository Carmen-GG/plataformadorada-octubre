import { createFileRoute, Link } from "@tanstack/react-router";
import { Panel } from "@/components/page-header";
import { useI18n } from "@/lib/i18n";
import { AdhesionCount } from "@/lib/adhesions";
import {
  LiveCount,
  formatCount,
  formatNumberEs,
  listStatus,
  usePublicStats,
  type CounterKey,
} from "@/lib/public-stats";

const COUNTER_KEY: Record<string, CounterKey> = {
  adhesiones: "adhesiones",
  voluntarios: "voluntarios",
  entidades: "entidades",
  ayuntamientos: "ayuntamientos",
};
import { useCmsContent } from "@/lib/cms";
import { LatestInstagramVideo } from "@/components/social-feeds";
import { TestimonyCarousel } from "@/components/testimony-carousel";
import { pageHead } from "@/lib/seo";
import {
  counters,
  events,
  indicators,
  news as fallbackNews,
  regions,
} from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title: "Inicio",
      fullTitle: "Plataforma Dorada · Por un Pacto de Estado por la Dependencia y los Cuidados",
      description:
        "Movimiento ciudadano apartidista para exigir un Pacto de Estado por la Dependencia y los Cuidados. Adhiérete, hazte voluntario y comparte tu testimonio.",
    }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const cms = useCmsContent();
  const state = usePublicStats();
  const stats = state.stats;
  const recentJoins = (stats?.ultimasAdhesiones ?? []).slice(0, 8);
  const joinsStatus = listStatus(state, recentJoins.length, "Todavía no hay adhesiones públicas.");
  // Comunidades autónomas con al menos una adhesión o entidad (dato agregado).
  const regionsWithData = stats
    ? Object.values(stats.porComunidad).filter((r) => r.adhesiones + r.entidades > 0).length
    : null;
  const entitiesList = (stats?.entidadesAdheridas ?? []).slice(0, 8);
  const entitiesStatus = listStatus(
    state,
    entitiesList.length,
    "Todavía no hay entidades adheridas públicas.",
  );
  const voices = (stats?.testimonios ?? []).slice(0, 8);
  const voicesStatus = listStatus(state, voices.length, "Todavía no hay testimonios publicados.");
  const liveNews = cms?.noticias ?? fallbackNews.map((n, i) => ({ id: String(i), ...n, summary: "" }));
  const liveEvents = cms?.eventos?.length ? cms.eventos : events;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-14 pb-8 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-primary uppercase">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
              {t("home.badge")}
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.03] tracking-tight md:text-6xl">
              Por un Pacto de Estado por la <span className="text-primary italic">dependencia</span>{" "}
              y los cuidados
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t("home.lead")}
            </p>
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
              <dl className="mt-5 grid grid-cols-3 gap-3">
                <div className="glass-soft rounded-2xl p-3">
                  <dd className="font-display text-xl font-bold tabular-nums">
                    <LiveCount name="entidades" />
                  </dd>
                  <dt className="mt-1 text-[11px] text-muted-foreground">Organizaciones</dt>
                </div>
                <div className="glass-soft rounded-2xl p-3">
                  <dd className="font-display text-xl font-bold tabular-nums">
                    <LiveCount name="ayuntamientos" />
                  </dd>
                  <dt className="mt-1 text-[11px] text-muted-foreground">Ayuntamientos</dt>
                </div>
                <div className="glass-soft rounded-2xl p-3">
                  <dd className="font-display text-xl font-bold tabular-nums">
                    {formatCount(regionsWithData)}
                  </dd>
                  <dt className="mt-1 text-[11px] text-muted-foreground">Comunidades autónomas</dt>
                </div>
              </dl>
              <p className="mt-5 text-xs text-muted-foreground">
                Datos agregados. Nunca se publican datos personales ni ubicaciones individuales.
              </p>
            </Panel>
          </div>
        </div>
      </section>

      {/* Contadores */}
      <section aria-labelledby="contadores" className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <h2 id="contadores" className="sr-only">
          Cifras del movimiento
        </h2>
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {counters.map((c) => (
            <div key={c.key} className="glass-panel rounded-2xl p-5">
              <dd className="font-display text-2xl font-bold text-primary sm:text-3xl">
                {COUNTER_KEY[c.key] ? <LiveCount name={COUNTER_KEY[c.key]!} /> : c.value}
              </dd>
              <dt className="mt-1 text-sm text-muted-foreground">{c.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Situación actual */}
      <section aria-labelledby="situacion-actual" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <h2 id="situacion-actual" className="font-display text-3xl font-semibold">La situación actual</h2>
        <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-muted-foreground">
          <p>Cuidar no puede seguir siendo una responsabilidad que recaiga principalmente sobre las familias.</p>
          <p>Miles de personas en situación de dependencia esperan durante meses para acceder a una valoración, una prestación o un recurso. Mientras tanto, familiares y cuidadores sostienen cada día una realidad que afecta a su tiempo, su salud, su economía y su proyecto de vida.</p>
          <p>El sistema necesita más recursos, mayor coordinación y una respuesta estable que garantice los mismos derechos con independencia del lugar donde vivamos.</p>
          <p>Ante esta realidad, creemos que ha llegado el momento de alcanzar un <strong className="text-foreground">Pacto de Estado por la Dependencia y los Cuidados.</strong></p>
          <p className="font-semibold text-foreground">Por eso nace Plataforma Dorada</p>
          <p>Para unir voces, visibilizar esta realidad y conseguir un compromiso de Estado que coloque los cuidados y la dependencia en el centro de las políticas públicas.</p>
        </div>
        <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {indicators.map((i) => {
            const d = stats?.indicadores?.[i.key];
            const fallback: Record<string, string> = {
              lista_espera: "142.887",
              tiempo_tramitacion: "10,5 meses",
              cuidadores_convenio: "101.702",
              municipios_mociones_aprobadas: "—",
            };
            const value = d?.valor != null
              ? `${formatNumberEs(d.valor)}${d.unidad === "meses" ? " meses" : d.unidad === "días" ? " días" : d.unidad === "%" ? " %" : ""}`
              : fallback[i.key] ?? "—";
            return (
              <div key={i.key} className="glass-panel rounded-3xl p-6">
                <dd className="font-display text-4xl font-bold leading-none tabular-nums text-primary sm:text-5xl" aria-label={`${value}. ${i.label}`}>{value}</dd>
                <dt className="mt-4 text-sm leading-snug text-muted-foreground">{i.label}</dt>
              </div>
            );
          })}
        </dl>
        <p className="mt-4 text-sm">
          <Link to="/datos" className="font-semibold text-primary underline underline-offset-4">
            Ver todos los datos e indicadores
          </Link>
        </p>
      </section>

      {/* Mapa + hitos */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <Panel as="section" className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-2xl font-semibold">Mapa de adhesiones</h2>
              <span className="text-xs text-muted-foreground">Datos agregados por territorio</span>
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[360px] text-sm"><caption className="sr-only">Resumen de adhesiones por comunidad autónoma</caption><thead><tr className="bg-muted text-left"><th className="px-4 py-3 font-semibold">Comunidad autónoma</th><th className="px-4 py-3 text-right font-semibold">Adhesiones</th></tr></thead><tbody>{[...(stats?.resumenWeb?.length ? stats.resumenWeb : regions.map(r=>({comunidad:r.name,adhesiones:Number(stats?.porComunidad[r.name]?.adhesiones??0)})))]
              .sort((a,b)=>b.adhesiones-a.adhesiones || a.comunidad.localeCompare(b.comunidad,"es"))
              .map((r,i)=><tr key={`${r.comunidad}-${i}`} className="border-t border-border"><td className="px-4 py-2.5">{r.comunidad}</td><td className="px-4 py-2.5 text-right font-semibold">{formatCount(r.adhesiones)}</td></tr>)}</tbody></table>
            </div>
            <p className="mt-4 text-sm"><Link to="/datos" className="font-semibold text-primary underline underline-offset-4">Ver el mapa completo por comunidad autónoma</Link></p>
          </Panel>

          <Panel as="section" className="lg:col-span-5">
            <h2 className="font-display text-2xl font-semibold">Último vídeo de Instagram</h2>
            <p className="mt-2 text-sm text-muted-foreground">Se actualiza automáticamente con el contenido más reciente de @assumptaserna.</p>
            <LatestInstagramVideo />
          </Panel>
        </div>
      </section>

      {/* Últimas adhesiones */}
      <section aria-labelledby="adhesiones" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <h2 id="adhesiones" className="font-display text-3xl font-semibold">
          Últimas adhesiones
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Solo se publican las personas que han autorizado expresamente aparecer, con nombre,
          inicial del primer apellido y ciudad.
        </p>
        {joinsStatus ? (
          <p className="mt-6 text-muted-foreground" role="status">
            {joinsStatus}
          </p>
        ) : (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentJoins.map((item, i) => (
              <li key={`${item.nombre}-${item.municipio}-${i}`} className="glass-panel rounded-2xl px-5 py-4 font-medium">
                <span className="block">{item.nombre}</span>
                {item.municipio && <span className="mt-1 block text-sm font-normal text-muted-foreground">{item.municipio}</span>}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Testimonios */}
      <section aria-labelledby="voces" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <h2 id="voces" className="font-display text-3xl font-semibold">
          Voces del cuidado
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
            Leer y compartir testimonios
          </Link>
        </p>
      </section>

      {/* Eventos + entidades */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel as="section">
            <h2 className="font-display text-2xl font-semibold">Próximos eventos</h2>
            <ul className="mt-5 space-y-4">
              {liveEvents
                .filter((e: any) => e.date ? new Date(`${e.date}T23:59:59`).getTime() >= Date.now() : !e.past)
                .map((e, i) => (
                  <li key={i} className="glass-soft flex items-center gap-4 rounded-2xl p-4">
                    <span className="shrink-0 text-center">
                      <span className="block font-display text-2xl font-bold text-primary">
                        {e.date ? new Date(`${e.date}T12:00:00`).getDate() : e.day}
                      </span>
                      <span className="block text-[10px] tracking-widest text-muted-foreground uppercase">
                        {e.date ? new Date(`${e.date}T12:00:00`).toLocaleDateString("es-ES",{month:"short"}).replace(".","").toUpperCase() : e.month}
                      </span>
                    </span>
                    <span>
                      <span className="block font-semibold">{e.title}</span>
                      <span className="block text-sm text-muted-foreground">{e.place}</span>
                    </span>
                  </li>
                ))}
            </ul>
          </Panel>

          <Panel as="section">
            <h2 className="font-display text-2xl font-semibold">Entidades adheridas</h2>
            {entitiesStatus ? (
              <p className="mt-5 text-sm text-muted-foreground" role="status">
                {entitiesStatus}
              </p>
            ) : (
              <ul className="mt-5 flex flex-wrap gap-3">
                {entitiesList.map((e, i) => (
                  <li key={i} className="glass-soft rounded-full px-4 py-2 text-sm font-medium">
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
                Ver todas las entidades
              </Link>
            </p>
          </Panel>
        </div>
      </section>

      {/* Novedades + prensa + contacto */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8 pb-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Panel as="section">
            <h2 className="font-display text-xl font-semibold">Novedades</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {liveNews.slice(0, 3).map((n) => (
                <li key={n.id}>
                  <a href={n.url} className="font-medium text-primary hover:underline">
                    {n.title}
                  </a>
                  <span className="block text-xs text-muted-foreground">
                    {n.media} · {n.date}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel as="section">
            <h2 className="font-display text-xl font-semibold">Prensa y recursos</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Logotipos, dossier de prensa y materiales para difundir el movimiento.
            </p>
            <Link
              to="/prensa"
              className="glass-soft mt-4 inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-primary"
            >
              Ir a recursos
            </Link>
          </Panel>
          <Panel as="section">
            <h2 className="font-display text-xl font-semibold">Contacto</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              ¿Eres periodista, entidad o ayuntamiento? Escríbenos.
            </p>
            <Link
              to="/contacto"
              className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
            >
              Escríbenos
            </Link>
          </Panel>
        </div>
      </section>
    </>
  );
}
