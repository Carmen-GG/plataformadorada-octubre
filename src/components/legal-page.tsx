import { Fragment } from "react";
import { PageHeader, Panel } from "@/components/page-header";
import { useI18n } from "@/lib/i18n";
import { LEGAL, type LegalKey } from "@/lib/legal-content";
import { SITE } from "@/lib/content";

const EYEBROW = { es: "Legal", ca: "Legal", eu: "Lege-informazioa", gl: "Legal" } as const;

/** Sustituye {email} y resalta los marcadores [ENTRE CORCHETES] pendientes de completar. */
function Rich({ text }: { text: string }) {
  const parts = text.replace(/\{email\}/g, SITE.email).split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <mark key={i} className="rounded bg-accent/40 px-1 font-medium text-foreground">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function LegalPage({ doc }: { doc: LegalKey }) {
  const { locale } = useI18n();
  const content = LEGAL[locale][doc];
  return (
    // data-no-translate: el texto ya está escrito en el idioma elegido; el traductor
    // automático de la interfaz no debe tocarlo.
    <div data-no-translate lang={locale}>
      <PageHeader eyebrow={EYEBROW[locale]} title={content.title} lead={content.lead} />
      <section className="mx-auto w-full max-w-3xl px-4 pb-14 sm:px-6">
        <Panel className="space-y-8">
          {content.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl font-semibold">{section.heading}</h2>
              {section.items && (
                <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Rich text={item} />
                    </li>
                  ))}
                </ul>
              )}
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 leading-relaxed text-muted-foreground">
                  <Rich text={paragraph} />
                </p>
              ))}
            </div>
          ))}
        </Panel>
      </section>
    </div>
  );
}
