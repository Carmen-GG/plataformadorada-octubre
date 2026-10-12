import { useSyncExternalStore } from "react";

const REFRESH_MS = 15_000;
const TIMEOUT_MS = 20_000;

export type CmsNews = {
  id: string;
  title: string;
  media: string;
  date: string;
  url: string;
  summary?: string;
  type?: "video" | "audio" | "texto";
  mediaUrl?: string;
  contentText?: string;
  published?: boolean;
};

export type CmsResource = {
  id: string; title: string; category: string; description: string; filename: string; url: string; previewUrl?: string;
};

export type CmsEvent = { id:string; title:string; date:string; time:string; place:string; city:string; description:string; url:string; documentUrl:string; documentName:string; previewUrl?:string };

export type CmsMilestone = { id: string; date: string; title: string; description: string; imageUrl?: string };
export type CmsVideo = { id: string; title: string; description: string; url: string; platform: "youtube" | "facebook"; order: number; published: boolean; category?: "residencias" | "cuidadores" | "dependencia" | "actualidad" };
export type CmsRoadmap = { id: string; phase: string; title: string; detail: string; date?: string; active?: boolean };
export type CmsLema = { id: string; text: string; name: string; order: number; published: boolean };

export type CmsPayload = {
  noticias: CmsNews[];
  recursos: CmsResource[];
  eventos: CmsEvent[];
  trayectoria?: CmsMilestone[];
  videos?: CmsVideo[];
  hojaRuta?: CmsRoadmap[];
  canciones?: Array<{x:string;artist:string}>;
  frases?: Array<{text:string;name:string}>;
  lemas?: CmsLema[];
  actualizado?: string;
};

type AppsScriptNews = {
  id?: string;
  fecha?: string;
  titulo?: string;
  medio?: string;
  resumen?: string;
  url?: string;
  title?: string;
  media?: string;
  date?: string;
  summary?: string;
  tipo?: string;
  type?: string;
  urlMultimedia?: string;
  mediaUrl?: string;
  contenidoTexto?: string;
  contentText?: string;
  publicada?: boolean | string;
};

type AppsScriptMilestone = { id?:string; fecha?:string; titulo?:string; descripcion?:string; imagenUrl?:string };
type AppsScriptVideo = { id?:string; title?:string; description?:string; url?:string; platform?:string; order?:number|string; published?:boolean|string; category?:string };
type AppsScriptRoadmap = { id?:string; fase?:string; titulo?:string; detalle?:string; fecha?:string; activa?:boolean };

type AppsScriptResource = {
  id?: string;
  fecha?: string;
  titulo?: string;
  categoria?: string;
  descripcion?: string;
  url?: string;
  vistaPreviaUrl?: string;
  nombreArchivo?: string;
  title?: string;
  category?: string;
  description?: string;
  filename?: string;
};

type AppsScriptEvent = { id?:string; titulo?:string; fecha?:string; hora?:string; lugar?:string; ciudad?:string; descripcion?:string; url?:string; documentoUrl?:string; documentoNombre?:string; previewUrl?:string; title?:string; date?:string; time?:string; place?:string; city?:string; description?:string; documentUrl?:string; documentName?:string };

type AppsScriptContentResponse = {
  noticias?: AppsScriptNews[];
  recursos?: AppsScriptResource[];
  eventos?: AppsScriptEvent[];
  trayectoria?: AppsScriptMilestone[];
  videos?: AppsScriptVideo[];
  hojaRuta?: AppsScriptRoadmap[];
  canciones?: Array<{x?:string;artist?:string}>;
  frases?: Array<{text?:string;name?:string}>;
  lemas?: Array<{id?:string;text?:string;name?:string;autor?:string;author?:string;proponente?:string;order?:number|string;published?:boolean|string}>;
  actualizado?: string;
};

function inferNewsType(item: AppsScriptNews): "video" | "audio" | "texto" {
  const declared = String(item.tipo ?? item.type ?? "").trim().toLowerCase();
  if (declared.includes("video") || declared.includes("vídeo") || declared.includes("youtube") || declared.includes("facebook")) return "video";

  // La columna tipo de NoticiasWeb es la fuente principal, pero si llega vacía
  // o con un valor inesperado, reconocemos también el servicio por sus enlaces.
  const candidates = [
    item.urlMultimedia, item.mediaUrl, item.url,
    item.resumen, item.summary
  ].map((value) => String(value ?? "").trim().toLowerCase()).filter(Boolean);

  if (declared.includes("audio") || declared.includes("podcast") || declared.includes("pódcast") || declared.includes("ivoox")) return "audio";
  if (candidates.some((value) =>
    value.includes("ivoox.com") ||
    value.includes("open.spotify.com") ||
    value.includes("soundcloud.com") ||
    value.includes("ondacero.es") ||
    value.includes("rtve.es") ||
    value.includes("cope.es") ||
    value.includes("rac1.cat") ||
    value.includes("cadenaser.com") ||
    /\.(mp3|m4a|ogg|wav|aac|opus)(?:$|[?#])/.test(value) ||
    value.includes("/play/audio") ||
    value.includes("/podcast/") ||
    value.includes("/audio/")
  )) return "audio";

  if (candidates.some((value) =>
    value.includes("youtube.com") || value.includes("youtu.be") || value.includes("vimeo.com")
  )) return "video";

  return "texto";
}

function normalizeNewsFields(item: AppsScriptNews) {
  const rawTitle = String(item.titulo ?? item.title ?? "").trim();
  const rawMedia = String(item.medio ?? item.media ?? "").trim();
  const rawDate = String(item.fecha ?? item.date ?? "").trim();

  // La respuesta actual del endpoint llega con estos tres valores desplazados:
  // titulo contiene el medio, medio contiene la fecha y fecha contiene el titular.
  // Lo detectamos por el formato de fecha para no alterar respuestas ya correctas.
  const looksLikeDate = (value: string) => /^\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}(?:\s+\d{1,2}:\d{2})?$/.test(value);
  if (looksLikeDate(rawMedia) && !looksLikeDate(rawDate)) {
    return { title: rawDate, media: rawTitle, date: rawMedia };
  }

  // Compatibilidad con la variante en la que solo titulo y medio estaban intercambiados.
  const knownOutlet = /^(onda cero|la vanguardia|el país|el pais|tele 5|telecinco|radio 4|catalunya ràdio|catalunya radio|agencia efe|efe|elpais)$/i;
  if (knownOutlet.test(rawTitle) && rawMedia.length > rawTitle.length + 12) {
    return { title: rawMedia, media: rawTitle, date: rawDate };
  }

  return { title: rawTitle, media: rawMedia, date: rawDate };
}

let data: CmsPayload | null = null;
let loading = false;
let timer: number | undefined;

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

async function refresh() {
  if (loading || typeof window === "undefined") {
    return;
  }

  loading = true;

  try {
    const response = await fetch("/api/cms?action=content", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("CMS no disponible");
    }

    const raw = (await response.json()) as AppsScriptContentResponse;

    data = {
      noticias: (raw.noticias ?? []).map((item) => ({
        id: String(item.id ?? ""),
        ...normalizeNewsFields(item),
        url: String(item.url ?? ""),
        summary: String(item.resumen ?? item.summary ?? ""),
        type: inferNewsType(item),
        mediaUrl: String(item.urlMultimedia ?? item.mediaUrl ?? ""),
        contentText: String(item.contenidoTexto ?? item.contentText ?? ""),
        published: item.publicada !== false && String(item.publicada ?? "Sí").toLowerCase() !== "no",
      })),

      canciones: (raw.canciones ?? []).map((item) => ({ x:String(item.x??""), artist:String(item.artist??"") })),
      frases: (raw.frases ?? []).map((item) => ({ text:String(item.text??""), name:String(item.name??"") })),
      lemas: (raw.lemas ?? []).map((item) => ({ id:String(item.id??""), text:String(item.text??""), name:[item.name,item.autor,item.author,item.proponente].map((value)=>String(value??"").trim()).find((value)=>value.length>0) ?? "", order:Number(item.order??0), published:item.published !== false && !/^(no|false|0)$/i.test(String(item.published??"Sí")) })),

      eventos: (raw.eventos ?? []).map((item) => {
        const rawDate = String(item.fecha ?? item.date ?? "").trim();
        // Normaliza fechas DD/MM/AAAA o DD-MM-AAAA para que el filtro de próximos eventos funcione.
        const dateMatch = rawDate.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);
        const date = dateMatch
          ? `${dateMatch[3]}-${dateMatch[2].padStart(2, "0")}-${dateMatch[1].padStart(2, "0")}`
          : rawDate;
        return {
          id: String(item.id ?? ""),
          title: String(item.titulo ?? item.title ?? ""),
          date,
          time: String(item.hora ?? item.time ?? ""),
          place: String(item.lugar ?? item.place ?? ""),
          city: String(item.ciudad ?? item.city ?? ""),
          description: String(item.descripcion ?? item.description ?? ""),
          url: String(item.url ?? ""),
          documentUrl: String(item.documentoUrl ?? item.documentUrl ?? ""),
          documentName: String(item.documentoNombre ?? item.documentName ?? ""),
          previewUrl: String(item.previewUrl ?? ""),
        };
      }),

      recursos: (raw.recursos ?? []).map((item) => ({
        id: String(item.id ?? ""),
        title: String(item.titulo ?? item.title ?? ""),
        category: String(item.categoria ?? item.category ?? ""),
        description: String(item.descripcion ?? item.description ?? ""),
        filename: String(item.nombreArchivo ?? item.filename ?? ""),
        url: String(item.url ?? ""),
        previewUrl: String(item.previewUrl ?? item.vistaPreviaUrl ?? ""),
      })),

      trayectoria: (raw.trayectoria ?? []).map((x) => ({ id:String(x.id??""), date:String(x.fecha??""), title:String(x.titulo??""), description:String(x.descripcion??""), imageUrl:String(x.imagenUrl??"") })),
      ...(raw.videos ? { videos: raw.videos.map((x) => ({ id:String(x.id??""), title:String(x.title??""), description:String(x.description??""), url:String(x.url??""), platform:x.platform === "facebook" ? "facebook" as const : "youtube" as const, order:Number(x.order??0), published:x.published !== false && !/^(no|false|0)$/i.test(String(x.published??"Sí")), category:(["residencias","cuidadores","dependencia","actualidad"].includes(String(x.category??"")) ? String(x.category) : "actualidad") as CmsVideo["category"] })) } : {}),
      hojaRuta: (raw.hojaRuta ?? []).map((x) => ({ id:String(x.id??""), phase:String(x.fase??""), title:String(x.titulo??""), detail:String(x.detalle??""), date:String(x.fecha??""), active:x.activa !== false })),
      ...(raw.actualizado ? { actualizado: raw.actualizado } : {}),
    };

    notify();
  } catch (error) {
    console.warn("CMS no disponible:", error);
  } finally {
    loading = false;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (listeners.size === 1 && typeof window !== "undefined") {
    void refresh();

    timer = window.setInterval(() => {
      void refresh();
    }, REFRESH_MS);
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0 && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}

function getSnapshot() {
  return data;
}

function getServerSnapshot() {
  return null;
}

export function useCmsContent() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
