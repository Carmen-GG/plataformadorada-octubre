import { useEffect, useRef, useState } from "react";

export type PublicTestimony = { texto: string; autor: string; contexto: string };

export function TestimonyCarousel({ items }: { items: PublicTestimony[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (timer.current !== undefined) window.clearInterval(timer.current);
    timer.current = undefined;
    if (paused || items.length < 2) return;
    timer.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 7000);
    return () => {
      if (timer.current !== undefined) window.clearInterval(timer.current);
      timer.current = undefined;
    };
  }, [paused, items.length]);
  useEffect(() => { setIndex((i) => Math.min(i, Math.max(0, items.length - 1))); }, [items.length]);
  if (!items.length) return null;
  const item = items[index];
  const next = () => setIndex((current) => (current + 1) % items.length);
  const previous = () => setIndex((current) => (current - 1 + items.length) % items.length);
  return (
    <div className="mt-6" aria-roledescription="carrusel" aria-label="Voces del cuidado">
      <div key={index} className="glass-panel rounded-3xl p-7 sm:p-10" tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowLeft") previous(); if (e.key === "ArrowRight") next(); if (e.key === " ") { e.preventDefault(); setPaused(v => !v); } }}>
        <p className="text-sm font-semibold text-primary">Testimonio {index + 1} de {items.length}</p>
        <blockquote className="mt-4 text-base leading-relaxed italic whitespace-pre-wrap">“{item.texto}”</blockquote>
        <figcaption className="mt-6 text-sm font-semibold">{item.autor}{item.contexto && <span className="block font-normal text-muted-foreground">{item.contexto}</span>}</figcaption>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button type="button" className="rounded-full border border-border px-4 py-2 text-sm font-semibold" onClick={previous} aria-label="Testimonio anterior">Anterior</button>
        <button type="button" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" onClick={() => setPaused(v => !v)} aria-pressed={paused}>{paused ? "Reanudar" : "Pausar"}</button>
        <button type="button" className="rounded-full border border-border px-4 py-2 text-sm font-semibold" onClick={next} aria-label="Siguiente testimonio">Siguiente</button>
      </div>
      <div className="mt-3 flex justify-center gap-1.5" aria-label="Seleccionar testimonio">
        {items.map((_, i) => <button key={i} type="button" onClick={() => setIndex(i)} aria-label={`Ir al testimonio ${i + 1}`} aria-current={i === index} className={`h-2.5 w-2.5 rounded-full border ${i === index ? "bg-primary" : "bg-transparent"}`} />)}
      </div>
    </div>
  );
}
