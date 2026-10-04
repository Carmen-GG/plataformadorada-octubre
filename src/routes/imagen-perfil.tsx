import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/imagen-perfil")({
  head: () =>
    pageHead({
      path: "/imagen-perfil",
      title: "Imagen de perfil",
      description:
        "Crea tu imagen de perfil con el marco dorado de apoyo al Pacto de Estado por la Dependencia.",
    }),
  component: Page,
});

const SIZE = 800;

function Page() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const css = getComputedStyle(document.documentElement);
    const primary = css.getPropertyValue("--primary").trim() || "#1f3a5f";
    const accent = css.getPropertyValue("--accent").trim() || "#d4a72c";
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.save();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = primary;
    ctx.fillRect(0, 0, SIZE, SIZE);
    if (img) {
      const s = Math.max(SIZE / img.width, SIZE / img.height);
      ctx.drawImage(
        img,
        (SIZE - img.width * s) / 2,
        (SIZE - img.height * s) / 2,
        img.width * s,
        img.height * s,
      );
    }
    ctx.restore();
    ctx.lineWidth = 48;
    ctx.strokeStyle = accent;
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 24, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = primary;
    ctx.fillRect(SIZE * 0.15, SIZE * 0.8, SIZE * 0.7, 70);
    ctx.fillStyle = accent;
    ctx.font = "600 34px Fraunces, serif";
    ctx.textAlign = "center";
    ctx.fillText("#PactoPorLosCuidados", SIZE / 2, SIZE * 0.8 + 47);
  }, [img]);

  return (
    <>
      <PageHeader
        eyebrow="Difunde"
        title="Tu imagen de perfil"
        lead="Sube una foto. Se procesa solo en tu dispositivo: no la enviamos a ningún servidor."
      />
      <section className="mx-auto grid w-full max-w-5xl gap-6 px-4 pb-14 sm:px-6 md:grid-cols-2">
        <Panel className="space-y-4">
          <label className="block text-sm font-semibold">
            Elige tu foto
            <input
              type="file"
              accept="image/*"
              className="mt-2 block w-full text-sm"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const i = new Image();
                i.onload = () => setImg(i);
                i.src = URL.createObjectURL(f);
              }}
            />
          </label>
          <button
            type="button"
            disabled={!img}
            onClick={() => {
              const a = document.createElement("a");
              a.download = "plataforma-dorada-perfil.png";
              a.href = canvas.current!.toDataURL("image/png");
              a.click();
            }}
            className="rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground disabled:opacity-50"
          >
            Descargar imagen
          </button>
        </Panel>
        <Panel>
          <canvas
            ref={canvas}
            width={SIZE}
            height={SIZE}
            className="h-auto w-full"
            role="img"
            aria-label="Vista previa de tu imagen de perfil con marco dorado"
          />
        </Panel>
      </section>
    </>
  );
}
