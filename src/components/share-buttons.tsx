import { useEffect, useRef, useState } from "react";
import { useI18n, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

/** Imagen cuadrada (4:5) con el logotipo, para publicar en Instagram. Sin texto incrustado. */
const SHARE_IMAGE = "/compartir.png";

const TEXTS: Record<
  Locale,
  {
    group: string;
    message: string;
    whatsapp: string;
    instagram: string;
    copy: string;
    more: string;
    newTab: string;
    copied: string;
    copyFailed: string;
    igMobile: string;
    igDesktop: string;
    help: string;
  }
> = {
  es: {
    group: "Opciones para compartir",
    message:
      "Súmate a Plataforma Dorada: por un Pacto de Estado por la Dependencia y los Cuidados.",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    copy: "Copiar enlace",
    more: "Más opciones",
    newTab: "(se abre en otra pestaña)",
    copied: "Enlace copiado.",
    copyFailed: "No se ha podido copiar. Copia la dirección desde la barra del navegador.",
    igMobile:
      "Hemos copiado el enlace. Al publicar en Instagram, pégalo en tu historia (pegatina «Enlace») o en tu biografía.",
    igDesktop:
      "Hemos descargado la imagen y copiado el enlace. Súbela a Instagram desde tu móvil y pega el enlace en tu historia o en tu biografía.",
    help: "Instagram no permite enviar enlaces desde una web: compartimos una imagen y copiamos el enlace para que lo pegues.",
  },
  ca: {
    group: "Opcions per compartir",
    message: "Suma't a Plataforma Dorada: per un Pacte d'Estat per la Dependència i les Cures.",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    copy: "Copiar enllaç",
    more: "Més opcions",
    newTab: "(s'obre en una altra pestanya)",
    copied: "Enllaç copiat.",
    copyFailed: "No s'ha pogut copiar. Copia l'adreça des de la barra del navegador.",
    igMobile:
      "Hem copiat l'enllaç. En publicar a Instagram, enganxa'l a la teva història (adhesiu «Enllaç») o a la biografia.",
    igDesktop:
      "Hem descarregat la imatge i copiat l'enllaç. Puja-la a Instagram des del mòbil i enganxa l'enllaç a la història o a la biografia.",
    help: "Instagram no permet enviar enllaços des d'un web: compartim una imatge i copiem l'enllaç perquè l'enganxis.",
  },
  eu: {
    group: "Partekatzeko aukerak",
    message:
      "Batu zaitez Plataforma Doradara: Mendekotasunaren eta Zaintzen aldeko Estatu Itun baten alde.",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    copy: "Esteka kopiatu",
    more: "Aukera gehiago",
    newTab: "(beste fitxa batean irekitzen da)",
    copied: "Esteka kopiatu da.",
    copyFailed: "Ezin izan da kopiatu. Kopiatu helbidea nabigatzailearen barratik.",
    igMobile:
      "Esteka kopiatu dugu. Instagramen argitaratzean, itsatsi zure istorioan («Esteka» eranskailua) edo biografian.",
    igDesktop:
      "Irudia deskargatu eta esteka kopiatu dugu. Igo Instagramera mugikorretik eta itsatsi esteka zure istorioan edo biografian.",
    help: "Instagramek ez du webgune batetik estekak bidaltzen uzten: irudi bat partekatzen dugu eta esteka kopiatzen dugu zuk itsats dezazun.",
  },
  gl: {
    group: "Opcións para compartir",
    message: "Súmate a Plataforma Dorada: por un Pacto de Estado pola Dependencia e os Coidados.",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    copy: "Copiar ligazón",
    more: "Máis opcións",
    newTab: "(ábrese noutra pestana)",
    copied: "Ligazón copiada.",
    copyFailed: "Non se puido copiar. Copia o enderezo desde a barra do navegador.",
    igMobile:
      "Copiamos a ligazón. Ao publicar en Instagram, pégaa na túa historia (adhesivo «Ligazón») ou na biografía.",
    igDesktop:
      "Descargamos a imaxe e copiamos a ligazón. Súbea a Instagram desde o móbil e pega a ligazón na historia ou na biografía.",
    help: "Instagram non permite enviar ligazóns desde unha web: compartimos unha imaxe e copiamos a ligazón para que a pegues.",
  },
};

const buttonClass =
  "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground";
const softButtonClass =
  "glass-soft inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-primary";

function pageUrl(path: string): string {
  const base = SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}${path === "/" ? "" : path}`;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}

/** Botones para compartir la página en WhatsApp, Instagram y por otros medios. */
export function ShareButtons({ path }: { path: string }) {
  const { locale } = useI18n();
  const t = TEXTS[locale];
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState(SITE_URL ? pageUrl(path) : "");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const imageFile = useRef<File | null>(null);

  // Solo en el navegador: dirección real y, si el dispositivo lo permite, la imagen ya
  // descargada (el menú de compartir del móvil exige llamarse justo al pulsar).
  useEffect(() => {
    setUrl(pageUrl(path));
    setCanNativeShare(typeof navigator.share === "function");
    let cancelled = false;
    fetch(SHARE_IMAGE)
      .then((r) => (r.ok ? r.blob() : null))
      .then((blob) => {
        if (blob && !cancelled) {
          imageFile.current = new File([blob], "plataforma-dorada.png", { type: "image/png" });
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [path]);

  const text = `${t.message} ${url}`.trim();
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(text)}`;

  async function onCopy() {
    setStatus((await copyText(url)) ? t.copied : t.copyFailed);
  }

  function onInstagram() {
    const file = imageFile.current;
    void copyText(url);
    if (file && typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
      navigator
        .share({ files: [file], text })
        .then(() => setStatus(t.igMobile))
        .catch((error: unknown) => {
          // Cancelar el menú de compartir no es un error.
          if (!(error instanceof DOMException && error.name === "AbortError"))
            setStatus(t.igMobile);
        });
      return;
    }
    if (file) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }
    setStatus(t.igDesktop);
  }

  function onNative() {
    navigator.share({ text: t.message, url }).catch(() => undefined);
  }

  return (
    <div data-no-translate lang={locale}>
      <div role="group" aria-label={t.group} className="mt-4 flex flex-wrap gap-3">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {t.whatsapp}
          <span className="sr-only"> {t.newTab}</span>
        </a>
        <button type="button" onClick={onInstagram} className={buttonClass}>
          {t.instagram}
        </button>
        <button type="button" onClick={onCopy} className={softButtonClass}>
          {t.copy}
        </button>
        {canNativeShare && (
          <button type="button" onClick={onNative} className={softButtonClass}>
            {t.more}
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{t.help}</p>
      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm font-medium">
        {status}
      </p>
    </div>
  );
}
