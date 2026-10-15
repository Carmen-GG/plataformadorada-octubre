import { Eye } from "lucide-react";
import { Panel } from "@/components/page-header";
import { useI18n, type Locale } from "@/lib/i18n";

const COPY: Record<Locale, { title: string; message: string }> = {
  es: {
    title: "Visualizaciones en redes sociales",
    message: "Las visualizaciones de Instagram y TikTok superan actualmente las 14.085.893.",
  },
  ca: {
    title: "Visualitzacions a les xarxes socials",
    message: "Les visualitzacions d’Instagram i TikTok actualment superen les 14.085.893.",
  },
  va: {
    title: "Visualitzacions en les xarxes socials",
    message: "Les visualitzacions d’Instagram i TikTok actualment superen les 14.085.893.",
  },
  eu: {
    title: "Sare sozialetako ikustaldiak",
    message: "Instagram eta TikTok sareetako ikustaldiek 14.085.893 gainditzen dituzte gaur egun.",
  },
  gl: {
    title: "Visualizacións nas redes sociais",
    message: "As visualizacións de Instagram e TikTok superan actualmente as 14.085.893.",
  },
  en: {
    title: "Social media views",
    message: "Views across Instagram and TikTok currently exceed 14,085,893.",
  },
  fr: {
    title: "Vues sur les réseaux sociaux",
    message: "Les vues sur Instagram et TikTok dépassent actuellement les 14 085 893.",
  },
  de: {
    title: "Aufrufe in sozialen Medien",
    message: "Die Aufrufe auf Instagram und TikTok liegen derzeit bei über 14.085.893.",
  },
};

export function SocialViewsCounter() {
  const { locale } = useI18n();
  const copy = COPY[locale];

  return (
    <Panel as="section" className="border-primary/20 bg-primary/[0.035] shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Eye aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold">{copy.title}</h2>
          <p className="mt-1 text-xs text-muted-foreground">Instagram · TikTok</p>
        </div>
      </div>

      <p className="mt-4 text-left font-display text-4xl font-bold leading-none tracking-tight text-primary sm:text-5xl">
        14.085.893+
      </p>
      <p className="mt-3 text-left text-sm leading-relaxed text-muted-foreground">
        {copy.message}
      </p>
    </Panel>
  );
}
