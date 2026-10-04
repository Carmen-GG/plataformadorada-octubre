import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { InstagramFeed, SpotifyFeed, TikTokFeed } from "@/components/social-feeds";
import { SITE } from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/redes-sociales")({
  head: () =>
    pageHead({
      path: "/redes-sociales",
      title: "Redes sociales",
      description: "Últimas publicaciones de Plataforma Dorada en Instagram, TikTok y Spotify.",
    }),
  component: RedesSociales,
});

function RedesSociales() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow={t("nav.social")}
        title={t("Síguenos y mira las últimas publicaciones")}
        lead={t("Aquí encontrarás las publicaciones más recientes de nuestras redes sociales.")}
      />

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-7 lg:grid-cols-2">
          <article className="glass-panel rounded-3xl p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  Instagram
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold">
                  {t("Últimas publicaciones de Instagram")}
                </h2>
              </div>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                {t("Ver Instagram")}
              </a>
            </div>
            <InstagramFeed />
          </article>

          <article className="glass-panel rounded-3xl p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  TikTok
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold">
                  {t("Últimos vídeos de TikTok")}
                </h2>
              </div>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                {t("Ver TikTok")}
              </a>
            </div>
            <TikTokFeed />
          </article>

          <article className="glass-panel rounded-3xl p-4 sm:p-6 lg:col-span-2">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  Spotify
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold">
                  {t("Nuestra lista colaborativa")}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(
                    "Una lista de reproducción en Spotify para escuchar y hacer entre todas las personas.",
                  )}
                </p>
              </div>
              {SITE.spotifyInviteUrl && (
                <a
                  href={SITE.spotifyInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  {t("Añadir canciones")}
                  <span className="sr-only"> {t("(se abre en otra pestaña)")}</span>
                </a>
              )}
            </div>
            <SpotifyFeed />
          </article>
        </div>
      </section>
    </>
  );
}
