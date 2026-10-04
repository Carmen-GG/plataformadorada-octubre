import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import logoTransparent from "@/assets/logo-plataforma-dorada-transparent.png";

export const Route = createFileRoute("/imagen-perfil")({
  head: () => pageHead({ path: "/imagen-perfil", title: "Crea tu imagen de perfil solidaria", description: "Crea en tu dispositivo una imagen de perfil para apoyar a Plataforma Dorada." }),
  component: Page,
});
const SIZE = 1000;

function Page() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [logo, setLogo] = useState(true);
  const [border, setBorder] = useState(true);
  const [hashtag, setHashtag] = useState<"none" | "PlataformaDorada" | "PactoDeEstado">("none");
  const [scale, setScale] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => { const i = new Image(); i.onload = () => setLogoImg(i); i.src = logoTransparent; }, []);
  useEffect(() => {
    const c = canvas.current; if (!c) return; const ctx = c.getContext("2d"); if (!ctx) return;
    const bg = "#f4ead8"; const gold = "#c79b45";
    ctx.clearRect(0, 0, SIZE, SIZE); ctx.fillStyle = bg; ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.save(); ctx.beginPath(); ctx.arc(SIZE/2, SIZE/2, SIZE/2, 0, Math.PI*2); ctx.clip();
    if (img) { const base = Math.max(SIZE/img.width, SIZE/img.height) * scale; ctx.drawImage(img, (SIZE-img.width*base)/2 + x, (SIZE-img.height*base)/2 + y, img.width*base, img.height*base); }
    else { ctx.fillStyle = "#e6d4b3"; ctx.fillRect(0,0,SIZE,SIZE); }
    ctx.restore();
    if (logo && logoImg) { const ls=230; ctx.drawImage(logoImg, SIZE-ls-45, SIZE-ls-45, ls, ls); }
    if (border) { ctx.lineWidth=42; ctx.strokeStyle=gold; ctx.beginPath(); ctx.arc(SIZE/2,SIZE/2,SIZE/2-22,0,Math.PI*2); ctx.stroke(); }
    if (hashtag !== "none") { ctx.fillStyle=gold; ctx.font="700 38px Inter, sans-serif"; ctx.textAlign="center"; ctx.fillText(`#${hashtag}`, SIZE/2, SIZE-48); }
  }, [img, logo, border, hashtag, scale, x, y, logoImg]);

  return <>
    <PageHeader eyebrow="Difunde" title="Crea tu imagen de perfil solidaria" lead="Sube tu foto, ajústala y añade opcionalmente el logo, el contorno dorado y un hashtag. Todo se procesa en tu dispositivo: la fotografía no se envía a ningún servidor." />
    <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-2">
      <Panel className="space-y-5">
        <label className="block text-sm font-semibold">Sube tu imagen<input type="file" accept="image/*" className="mt-2 block w-full text-sm" onChange={(e)=>{const f=e.target.files?.[0]; if(!f)return; const i=new Image(); i.onload=()=>setImg(i); i.src=URL.createObjectURL(f);}} /></label>
        <div><label htmlFor="scale" className="block text-sm font-semibold">Tamaño de la imagen: {Math.round(scale*100)}%</label><input id="scale" type="range" min="0.7" max="2.2" step="0.01" value={scale} onChange={e=>setScale(Number(e.target.value))} className="mt-2 w-full" /></div>
        <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="x" className="block text-sm font-semibold">Desplazar horizontal</label><input id="x" type="range" min="-250" max="250" step="1" value={x} onChange={e=>setX(Number(e.target.value))} className="mt-2 w-full" /></div><div><label htmlFor="y" className="block text-sm font-semibold">Desplazar vertical</label><input id="y" type="range" min="-250" max="250" step="1" value={y} onChange={e=>setY(Number(e.target.value))} className="mt-2 w-full" /></div></div>
        <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={logo} onChange={e=>setLogo(e.target.checked)} /> Añadir logo de Plataforma Dorada</label>
        <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={border} onChange={e=>setBorder(e.target.checked)} /> Añadir contorno dorado</label>
        <fieldset><legend className="text-sm font-semibold">Hashtag (opcional)</legend><div className="mt-2 space-y-2 text-sm"><label className="flex items-center gap-3"><input type="radio" name="hash" checked={hashtag==="none"} onChange={()=>setHashtag("none")} /> Ninguno</label><label className="flex items-center gap-3"><input type="radio" name="hash" checked={hashtag==="PlataformaDorada"} onChange={()=>setHashtag("PlataformaDorada")} /> #PlataformaDorada</label><label className="flex items-center gap-3"><input type="radio" name="hash" checked={hashtag==="PactoDeEstado"} onChange={()=>setHashtag("PactoDeEstado")} /> #PactoDeEstado</label></div></fieldset>
        <button type="button" disabled={!img} onClick={()=>{const a=document.createElement("a");a.download="plataforma-dorada-perfil.png";a.href=canvas.current!.toDataURL("image/png");a.click();}} className="rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground disabled:opacity-50">Descargar imagen</button>
      </Panel>
      <Panel><canvas ref={canvas} width={SIZE} height={SIZE} className="mx-auto h-auto w-full max-w-[650px] rounded-full" role="img" aria-label="Vista previa de tu imagen de perfil" /></Panel>
    </section>
  </>;
}
