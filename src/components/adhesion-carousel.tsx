import { useEffect, useState } from "react";

export type PublicAdhesion = { nombre: string; municipio: string };

export function AdhesionCarousel({
  items,
  itemLabel = "Adhesión",
}: {
  items: PublicAdhesion[];
  itemLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const itemsKey = items.map((item) => `${item.nombre}\u001f${item.municipio}`).join("\u001e");

  useEffect(() => {
    if (items.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const currentIndex = index % items.length;
  const current = items[currentIndex];
  const previous = () => setIndex((value) => (value - 1 + items.length) % items.length);
  const next = () => setIndex((value) => (value + 1) % items.length);

  return (
    <div className="mt-6" aria-roledescription="carrusel" aria-label={`Últimas incorporaciones públicas: ${itemLabel.toLowerCase()}`}>
      <div className="glass-panel flex min-h-36 flex-col items-center justify-center rounded-3xl px-6 py-8 text-center sm:px-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          {itemLabel} {currentIndex + 1} de {items.length}
        </p>
        <p className="mt-3 font-display text-2xl font-semibold">{current.nombre}</p>
        {current.municipio && <p className="mt-1 text-sm text-muted-foreground">{current.municipio}</p>}
      </div>
      {items.length > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={previous} className="rounded-full border border-border px-4 py-2 text-sm font-semibold" aria-label={`${itemLabel} anterior`}>Anterior</button>
          <button type="button" onClick={next} className="rounded-full border border-border px-4 py-2 text-sm font-semibold" aria-label={`Siguiente ${itemLabel.toLowerCase()}`}>Siguiente</button>
        </div>
      )}
      {items.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5" aria-label={`Seleccionar ${itemLabel.toLowerCase()}`}>
          {items.map((item, i) => (
            <button
              key={item.nombre + item.municipio + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver ${itemLabel.toLowerCase()} ${i + 1}`}
              aria-current={i === currentIndex}
              className={`h-2.5 w-2.5 rounded-full border ${i === currentIndex ? "bg-primary" : "bg-transparent"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
