import { useEffect, useId, useRef } from "react";
import { countLabel, useI18n } from "@/lib/i18n";

export type PublicAdhesion = { nombre: string; municipio: string };

export function AdhesionCarousel({
  items,
  itemLabel = "Adhesión",
}: {
  items: PublicAdhesion[];
  itemLabel?: string;
}) {
  const { t, locale } = useI18n();
  const labelKey: Record<string, string> = {
    "Adhesión": "carousel.pledge",
    "Voluntario/a": "carousel.volunteer",
  };
  const label = labelKey[itemLabel] ? t(labelKey[itemLabel]) : t(itemLabel);
  const labelLower = label.toLowerCase();
  const reactId = useId();
  const groupName = `pd-carousel-${reactId}`;
  const idFor = (index: number) => `${groupName}-${index}`;
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = window.setInterval(() => {
      const radios = carouselRef.current?.querySelectorAll<HTMLInputElement>(
        'input[type="radio"]',
      );
      if (!radios?.length) return;
      const currentIndex = Array.from(radios).findIndex((radio) => radio.checked);
      const nextIndex = (currentIndex + 1) % radios.length;
      radios[nextIndex].checked = true;
    }, 5000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div ref={carouselRef} className="mt-6" aria-roledescription="carrusel" aria-label={`${t("carousel.latestPublic")}: ${labelLower}`}>
      <style>{`
        .pd-carousel-radio { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
        .pd-carousel-slide { display: none; }
        .pd-carousel-radio:checked + .pd-carousel-slide { display: flex; }
        .pd-carousel-radio:focus-visible + .pd-carousel-slide { outline: 2px solid currentColor; outline-offset: 4px; }
      `}</style>
      {items.map((item, i) => {
        const previousIndex = (i - 1 + items.length) % items.length;
        const nextIndex = (i + 1) % items.length;
        return (
          <div key={item.nombre + item.municipio + i}>
            <input
              className="pd-carousel-radio"
              type="radio"
              name={groupName}
              id={idFor(i)}
              defaultChecked={i === 0}
              aria-label={`${label} ${i + 1}`}
            />
            <div className="pd-carousel-slide glass-panel min-h-36 flex-col items-center justify-center rounded-3xl px-6 py-8 text-center sm:px-10">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                {countLabel(locale, label, i + 1, items.length)}
              </p>
              <p className="mt-3 font-display text-2xl font-semibold">{item.nombre}</p>
              {item.municipio && <p className="mt-1 text-sm text-muted-foreground">{item.municipio}</p>}
              {items.length > 1 && (
                <>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <label htmlFor={idFor(previousIndex)} role="button" tabIndex={0} className="cursor-pointer rounded-full border border-border px-4 py-2 text-sm font-semibold">Anterior</label>
                    <label htmlFor={idFor(nextIndex)} role="button" tabIndex={0} className="cursor-pointer rounded-full border border-border px-4 py-2 text-sm font-semibold">Siguiente</label>
                  </div>
                  <div className="mt-3 flex justify-center gap-1.5" aria-label={`${t("carousel.select")}: ${labelLower}`}>
                    {items.map((dot, dotIndex) => (
                      <label
                        key={dot.nombre + dot.municipio + dotIndex}
                        htmlFor={idFor(dotIndex)}
                        title={`${label} ${dotIndex + 1}`}
                        className={`h-2.5 w-2.5 cursor-pointer rounded-full border ${dotIndex === i ? "bg-primary" : "bg-transparent"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
