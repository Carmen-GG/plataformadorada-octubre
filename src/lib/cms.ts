import { useSyncExternalStore } from "react";

const REFRESH_MS = 15_000;
const TIMEOUT_MS = 7_000;

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
export type CmsVideo = { id: string; title: string; description: string; url: string; platform: "youtube" | "facebook"; order: number; published: boolean };
export type CmsRoadmap = { id: string; phase: string; title: string; detail: string; date?: string; active?: boolean };

export type CmsPayload = {
  noticias: CmsNews[];
  recursos: CmsResource[];
  eventos: CmsEvent[];
  trayectoria?: CmsMilestone[];
  videos?: CmsVideo[];
  hojaRuta?: CmsRoadmap[];
  canciones?: Array<{x:string;artist:string}>;
  frases?: Array<{text:string;name:string}>;
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
type AppsScriptVideo = { id?:string; title?:string; description?:string; url?:string; platform?:string; order?:number|string; published?:boolean|string };
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

type AppsScriptEvent = { id?:string; titulo?:string; fecha?:string; hora?:string; lugar?:string; ciudad?:string; descripcion?:string; url?:string; documentoUrl?:string; documentoNombre?:string; previewUrl?:string };

type AppsScriptContentResponse = {
  noticias?: AppsScriptNews[];
  recursos?: AppsScriptResource[];
  eventos?: AppsScriptEvent[];
  trayectoria?: AppsScriptMilestone[];
  videos?: AppsScriptVideo[];
  hojaRuta?: AppsScriptRoadmap[];
  canciones?: Array<{x?:string;artist?:string}>;
  frases?: Array<{text?:string;name?:string}>;
  actualizado?: string;
};

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
    const controller = new AbortController();

    const timeout = window.setTimeout(() => {
      controller.abort();
    }, TIMEOUT_MS);

    const response = await fetch("/api/cms?action=content", {
      cache: "no-store",
      signal: controller.signal,
    });

    window.clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("CMS no disponible");
    }

    const raw = (await response.json()) as AppsScriptContentResponse;

    data = {
      noticias: (raw.noticias ?? []).map((item) => ({
        id: String(item.id ?? ""),
        title: String(item.titulo ?? item.title ?? ""),
        media: String(item.medio ?? item.media ?? ""),
        date: String(item.fecha ?? item.date ?? ""),
        url: String(item.url ?? ""),
        summary: String(item.resumen ?? item.summary ?? ""),
        type: (["video","audio","texto"].includes(String(item.tipo ?? item.type ?? "").toLowerCase()) ? String(item.tipo ?? item.type).toLowerCase() : "texto") as "video" | "audio" | "texto",
        mediaUrl: String(item.urlMultimedia ?? item.mediaUrl ?? ""),
        contentText: String(item.contenidoTexto ?? item.contentText ?? ""),
        published: item.publicada !== false && String(item.publicada ?? "Sí").toLowerCase() !== "no",
      })),

      canciones: (raw.canciones ?? []).map((item) => ({ x:String(item.x??""), artist:String(item.artist??"") })),
      frases: (raw.frases ?? []).map((item) => ({ text:String(item.text??""), name:String(item.name??"") })),

      eventos: (raw.eventos ?? []).map((item) => ({
        id: String(item.id ?? ""), title: String(item.titulo ?? ""), date: String(item.fecha ?? ""), time: String(item.hora ?? ""), place: String(item.lugar ?? ""), city: String(item.ciudad ?? ""), description: String(item.descripcion ?? ""), url: String(item.url ?? ""), documentUrl: String(item.documentoUrl ?? ""), documentName: String(item.documentoNombre ?? ""), previewUrl: String(item.previewUrl ?? ""),
      })),

      recursos: (raw.recursos ?? []).map((item) => ({
        id: String(item.id ?? ""),
        title: String(item.titulo ?? item.title ?? ""),
        category: String(item.categoria ?? item.category ?? ""),
        description: String(item.descripcion ?? item.description ?? ""),
        filename: String(item.nombreArchivo ?? item.filename ?? ""),
        url: String(item.url ?? ""),
        previewUrl: String(item.vistaPreviaUrl ?? ""),
      })),

      trayectoria: (raw.trayectoria ?? []).map((x) => ({ id:String(x.id??""), date:String(x.fecha??""), title:String(x.titulo??""), description:String(x.descripcion??""), imageUrl:String(x.imagenUrl??"") })),
      ...(raw.videos ? { videos: raw.videos.map((x) => ({ id:String(x.id??""), title:String(x.title??""), description:String(x.description??""), url:String(x.url??""), platform:x.platform === "facebook" ? "facebook" as const : "youtube" as const, order:Number(x.order??0), published:x.published !== false && String(x.published??"Sí").toLowerCase() !== "no" })) } : {}),
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
