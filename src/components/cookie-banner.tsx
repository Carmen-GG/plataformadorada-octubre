import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { OPEN_SETTINGS_EVENT, readConsent, saveConsent, type ConsentValue } from "@/lib/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const firstButton = useRef<HTMLButtonElement>(null);
  const reopened = useRef(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
    const reopen = () => {
      reopened.current = true;
      setVisible(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  // Si la persona lo abre desde el pie de página, llevamos el foco al aviso.
  useEffect(() => {
    if (visible && reopened.current) firstButton.current?.focus();
  }, [visible]);

  function decide(value: ConsentValue) {
    saveConsent(value);
    reopened.current = false;
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      className="glass-panel fixed inset-x-3 bottom-3 z-50 rounded-2xl p-5 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md"
      onKeyDown={(event) => {
        if (event.key === "Escape" && readConsent()) setVisible(false);
      }}
    >
      <h2 id="cookie-title" className="font-display text-lg font-semibold">
        Cookies
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Usamos solo cookies técnicas necesarias. No cargamos cookies analíticas ni de terceros sin
        tu consentimiento.{" "}
        <Link to="/cookies" className="font-medium text-primary underline underline-offset-4">
          Más información
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          ref={firstButton}
          type="button"
          onClick={() => decide("aceptadas")}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => decide("rechazadas")}
          className="glass-soft rounded-full px-5 py-2.5 text-sm font-semibold text-primary"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => decide("esenciales")}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-muted-foreground underline underline-offset-4"
        >
          Solo esenciales
        </button>
      </div>
    </div>
  );
}
