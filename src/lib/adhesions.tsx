import { LiveCount } from "@/lib/public-stats";

/** Contador de personas adheridas (se actualiza solo desde Google Sheets). */
export function AdhesionCount(_props: { fallback?: string | undefined } = {}) {
  return <LiveCount name="adhesiones" />;
}
