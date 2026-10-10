import { useEffect, useState } from "react";

export type PublicAdhesion = { nombre: string; municipio: string };

export function AdhesionCarousel({ items }: { items: PublicAdhesion[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [items]);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const current = items[index] ?? items[0];
  const previous = () => setIndex((value) => (value - 1 + items.length) % items.length);
  const next = () => setIndex((value) => (value + 1) % items.length);

  return (
    <div className="mt-6" aria-roledescription="carrusel" aria-label="Últimas adhesiones públicas">
      <div className="glass-panel flex min-h-36 flex-col items-center justify-center rounded-3xl px-6 py-8 text-center sm:px-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          Adhesión {index + 1} de {items.length}
        </p>
        <p className="mt-3 font-display text-2xl font-semibold">{current.nombre}</p>
        {current.municipio && <p className="mt-1 text-sm text-muted-foreground">{current.municipio}</p>}
      </div>
      {items.length > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={previous} className="rounded-full border border-border px-4 py-2 text-sm font-semibold" aria-label="Adhesión anterior">Anterior</button>
          <button type="button" onClick={next} className="rounded-full border border-border px-4 py-2 text-sm font-semibold" aria-label="Siguiente adhesión">Siguiente</button>
        </div>
      )}
      {items.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5" aria-label="Seleccionar adhesión">
          {items.map((item, i) => (
            <button
              key={item.nombre + item.municipio + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver adhesión ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 w-2.5 rounded-full border ${i === index ? "bg-primary" : "bg-transparent"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
