/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADHESION_COUNT_URL?: string;
  /** Dirección pública de la web, p. ej. https://plataformadorada.es (sin barra final). */
  readonly VITE_SITE_URL?: string;
  readonly VITE_CONTACT_FORM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
