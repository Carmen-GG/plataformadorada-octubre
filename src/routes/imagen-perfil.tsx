import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import logoTransparent from "@/assets/logo-plataforma-dorada-transparent.png";

export const Route = createFileRoute("/imagen-perfil")({
  head: () => pageHead({ path: "/imagen-perfil", title: "Crea tu imagen de perfil solidaria", description: "Crea en tu dispositivo una imagen de perfil circular para apoyar a Plataforma Dorada." }),
  component: Page,
});

const SIZE = 1000;
const LOGO_SIZE = 230;
const MIN_LOGO_CENTER = 145;
const MAX_LOGO_CENTER = SIZE - 145;

type Point = { x: number; y: number };

function Page() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [logo, setLogo] = useState(true);
  const [border, setBorder] = useState(true);
  const [hashtag, setHashtag] = useState<"none" | "PlataformaDorada" | "PactoDeEstado">("none");
  const [scale, setScale] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [logoPosition, setLogoPosition] = useState<Point>({ x: 805, y: 805 });
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const draggingLogo = useRef(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setLogoImg(image);
    image.src = logoTransparent;
  }, []);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const gold = "#c79b45";
    const ink = "#4b321d";
    ctx.clearRect(0, 0, SIZE, SIZE);

    // Todo lo que queda fuera del círculo permanece transparente en la descarga PNG.
    ctx.save();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
    ctx.clip();

    if (img) {
      const base = Math.max(SIZE / img.width, SIZE / img.height) * scale;
      ctx.drawImage(img, (SIZE - img.width * base) / 2 + x, (SIZE - img.height * base) / 2 + y, img.width * base, img.height * base);
    }

    if (logo && logoImg) {
      ctx.drawImage(logoImg, logoPosition.x - LOGO_SIZE / 2, logoPosition.y - LOGO_SIZE / 2, LOGO_SIZE, LOGO_SIZE);
    }

    if (border) {
      ctx.lineWidth = 42;
      ctx.strokeStyle = gold;
      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 22, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (hashtag !== "none") {
      const label = `#${hashtag}`;
      ctx.font = "700 38px Inter, sans-serif";
      const textWidth = ctx.measureText(label).width;
      const boxWidth = textWidth + 70;
      const boxHeight = 62;
      const boxX = (SIZE - boxWidth) / 2;
      const boxY = SIZE - 98;
      ctx.fillStyle = gold;
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 31);
      ctx.fill();
      ctx.fillStyle = ink;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, SIZE / 2, boxY + boxHeight / 2 + 1);
      ctx.textBaseline = "alphabetic";
    }

    ctx.restore();
  }, [img, logo, border, hashtag, scale, x, y, logoImg, logoPosition]);

  function canvasPoint(event: PointerEvent<HTMLCanvasElement>): Point {
    const c = canvas.current!;
    const rect = c.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * SIZE,
      y: ((event.clientY - rect.top) / rect.height) * SIZE,
    };
  }

  function onPointerDown(event: PointerEvent<HTMLCanvasElement>) {
    if (!logo || !logoImg) return;
    const point = canvasPoint(event);
    const half = LOGO_SIZE / 2 + 18;
    if (Math.abs(point.x - logoPosition.x) <= half && Math.abs(point.y - logoPosition.y) <= half) {
      draggingLogo.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.preventDefault();
    }
  }

  function onPointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (!draggingLogo.current) return;
    const point = canvasPoint(event);
    setLogoPosition({
      x: Math.max(MIN_LOGO_CENTER, Math.min(MAX_LOGO_CENTER, point.x)),
      y: Math.max(MIN_LOGO_CENTER, Math.min(MAX_LOGO_CENTER, point.y)),
    });
  }

  function stopDragging(event: PointerEvent<HTMLCanvasElement>) {
    draggingLogo.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <>
      <PageHeader
        eyebrow="Difunde"
        title="Crea tu imagen de perfil solidaria"
        lead="Sube tu foto, ajusta el encuadre y coloca el logo donde quieras. Todo se procesa en tu dispositivo."
      />
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-2">
        <Panel className="space-y-5">
          <div>
            <label htmlFor="profile-upload" className="inline-flex cursor-pointer items-center rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm">
              Sube tu imagen
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const image = new Image();
                image.onload = () => setImg(image);
                image.src = URL.createObjectURL(file);
              }}
            />
            <p className="mt-2 text-xs text-muted-foreground">JPG o PNG · la foto no se sube a ningún servidor.</p>
          </div>

          <div>
            <label htmlFor="scale" className="block text-sm font-semibold">Tamaño de la imagen: {Math.round(scale * 100)}%</label>
            <input id="scale" type="range" min="0.7" max="2.2" step="0.01" value={scale} onChange={(e) => setScale(Number(e.target.value))} className="mt-2 w-full" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="x" className="block text-sm font-semibold">Desplazar foto horizontal</label><input id="x" type="range" min="-250" max="250" step="1" value={x} onChange={(e) => setX(Number(e.target.value))} className="mt-2 w-full" /></div>
            <div><label htmlFor="y" className="block text-sm font-semibold">Desplazar foto vertical</label><input id="y" type="range" min="-250" max="250" step="1" value={y} onChange={(e) => setY(Number(e.target.value))} className="mt-2 w-full" /></div>
          </div>

          <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={logo} onChange={(e) => setLogo(e.target.checked)} /> Añadir logo de Plataforma Dorada</label>
          <p className="rounded-2xl bg-accent/15 px-4 py-3 text-sm text-muted-foreground">Con el logo activado, también puedes <strong>arrastrarlo directamente sobre la vista previa</strong> para colocarlo donde quieras.</p>
          <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={border} onChange={(e) => setBorder(e.target.checked)} /> Añadir contorno dorado</label>

          <fieldset>
            <legend className="text-sm font-semibold">Hashtag (opcional)</legend>
            <div className="mt-2 space-y-2 text-sm">
              <label className="flex items-center gap-3"><input type="radio" name="hash" checked={hashtag === "none"} onChange={() => setHashtag("none")} /> Ninguno</label>
              <label className="flex items-center gap-3"><input type="radio" name="hash" checked={hashtag === "PlataformaDorada"} onChange={() => setHashtag("PlataformaDorada")} /> #PlataformaDorada</label>
              <label className="flex items-center gap-3"><input type="radio" name="hash" checked={hashtag === "PactoDeEstado"} onChange={() => setHashtag("PactoDeEstado")} /> #PactoDeEstado</label>
            </div>
          </fieldset>

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
            Descargar imagen circular
          </button>
          <p className="text-xs text-muted-foreground">PNG circular con el exterior transparente.</p>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between gap-3">
            <div><h2 className="font-display text-xl font-semibold">Vista previa</h2><p className="text-sm text-muted-foreground">Arrastra el logo sobre la imagen.</p></div>
            <Link to="/prensa" className="text-sm font-semibold text-primary underline">Volver a recursos</Link>
          </div>
          <div className="mt-5 rounded-3xl p-3" style={{ backgroundImage: "linear-gradient(45deg,#eee 25%,transparent 25%),linear-gradient(-45deg,#eee 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#eee 75%),linear-gradient(-45deg,transparent 75%,#eee 75%)", backgroundSize: "24px 24px", backgroundPosition: "0 0,0 12px,12px -12px,-12px 0" }}>
            <canvas
              ref={canvas}
              width={SIZE}
              height={SIZE}
              className="mx-auto h-auto w-full max-w-[650px] touch-none rounded-full"
              role="img"
              aria-label="Vista previa de tu imagen de perfil. El logo puede arrastrarse por el círculo."
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={stopDragging}
              onPointerCancel={stopDragging}
            />
          </div>
        </Panel>
      </section>
    </>
  );
}
