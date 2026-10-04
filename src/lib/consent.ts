import { useEffect, useState } from "react";

export const CONSENT_KEY = "pd-cookie-consent";
export type ConsentValue = "aceptadas" | "rechazadas" | "esenciales";

const CHANGE_EVENT = "pd-consent-change";
export const OPEN_SETTINGS_EVENT = "pd-open-cookie-settings";

export function readConsent(): ConsentValue | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "aceptadas" || value === "rechazadas" || value === "esenciales" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* almacenamiento no disponible: la elección solo vale para esta visita */
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: value }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

/** true solo si la persona ha aceptado expresamente las cookies de terceros. */
export function useThirdPartyConsent(): boolean {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const update = () => setAllowed(readConsent() === "aceptadas");
    update();
    window.addEventListener(CHANGE_EVENT, update);
    return () => window.removeEventListener(CHANGE_EVENT, update);
  }, []);
  return allowed;
}
