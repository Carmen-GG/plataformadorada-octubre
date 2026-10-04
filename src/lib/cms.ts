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
};

export type CmsEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  place: string;
  city: string;
  description: string;
  url: string;
};

export type CmsResource = {
  id: string;
  title: string;
  category: string;
  description: string;
  filename: string;
  url: string;
};

export type CmsPayload = {
  noticias: CmsNews[];
  eventos: CmsEvent[];
  recursos: CmsResource[];
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
};

type AppsScriptEvent = {
  id?: string;
  titulo?: string;
  fecha?: string;
  hora?: string;
  lugar?: string;
  ciudad?: string;
  descripcion?: string;
  url?: string;
  title?: string;
  date?: string;
  time?: string;
  place?: string;
  city?: string;
  description?: string;
};

type AppsScriptResource = {
  id?: string;
  fecha?: string;
  titulo?: string;
  categoria?: string;
  descripcion?: string;
  url?: string;
  nombreArchivo?: string;
  title?: string;
  category?: string;
  description?: string;
  filename?: string;
};

type AppsScriptContentResponse = {
  noticias?: AppsScriptNews[];
  eventos?: AppsScriptEvent[];
  recursos?: AppsScriptResource[];
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
      })),

      eventos: (raw.eventos ?? []).map((item) => ({
        id: String(item.id ?? ""),
        title: String(item.titulo ?? item.title ?? ""),
        date: String(item.fecha ?? item.date ?? ""),
        time: String(item.hora ?? item.time ?? ""),
        place: String(item.lugar ?? item.place ?? ""),
        city: String(item.ciudad ?? item.city ?? ""),
        description: String(item.descripcion ?? item.description ?? ""),
        url: String(item.url ?? ""),
      })),

      recursos: (raw.recursos ?? []).map((item) => ({
        id: String(item.id ?? ""),
        title: String(item.titulo ?? item.title ?? ""),
        category: String(item.categoria ?? item.category ?? ""),
        description: String(item.descripcion ?? item.description ?? ""),
        filename: String(item.nombreArchivo ?? item.filename ?? ""),
        url: String(item.url ?? ""),
      })),

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
