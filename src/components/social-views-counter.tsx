import { useEffect, useState } from "react";
import { Eye, Instagram, Music2 } from "lucide-react";
import { Panel } from "@/components/page-header";
import { useI18n } from "@/lib/i18n";

type SocialViews = {
  configured: boolean;
  since: string;
  total?: number;
  instagram?: number;
  tiktok?: number;
  updatedAt?: string;
};

const START_DATE = "2026-08-13";

function formatViews(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value);
}

export function SocialViewsCounter() {
  const { t, locale } = useI18n();
  const [data, setData] = useState<SocialViews | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/api/social-views", { cache: "no-store" });
        const next = (await response.json()) as SocialViews;
        if (active) setData(next);
      } catch {
        if (active) setData(null);
      }
    };
    void load();
    const interval = window.setInterval(load, 60 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const dateLabel = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${START_DATE}T12:00:00Z`));

  return (
    <Panel as="section" className="mt-4" >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Eye aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold">
            {t("Visualizaciones en redes sociales")}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("Desde el")} {dateLabel}
          </p>
        </div>
      </div>

      {data?.configured && typeof data.total === "number" ? (
        <>
          <p className="mt-5 text-center font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            {formatViews(data.total, locale)}
          </p>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            {t("visualizaciones acumuladas")}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-muted/50 p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Instagram aria-hidden="true" className="size-4" /> Instagram
              </div>
              <p className="mt-2 text-xl font-semibold">{formatViews(data.instagram ?? 0, locale)}</p>
              <p className="mt-1 text-xs text-muted-foreground">@assumptaserna · @plataformadorada</p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Music2 aria-hidden="true" className="size-4" /> TikTok
              </div>
              <p className="mt-2 text-xl font-semibold">{formatViews(data.tiktok ?? 0, locale)}</p>
              <p className="mt-1 text-xs text-muted-foreground">@assumptaserna_fdc</p>
            </div>
          </div>
          {data.updatedAt ? (
            <p className="mt-3 text-right text-xs text-muted-foreground">
              {t("Última actualización")}: {new Intl.DateTimeFormat(locale, { dateStyle: "short", timeStyle: "short" }).format(new Date(data.updatedAt))}
            </p>
          ) : null}
        </>
      ) : (
        <div className="mt-4 rounded-2xl bg-muted/40 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("Estamos conectando las estadísticas de las cuentas para mostrar una cifra verificada. El contador se actualizará automáticamente cada hora cuando la conexión esté activa.")}
          </p>
        </div>
      )}
    </Panel>
  );
}
