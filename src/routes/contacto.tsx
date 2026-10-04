import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/contacto")({
  head: () =>
    pageHead({
      path: "/contacto",
      title: "Contacto",
      description: "Escribe a la Plataforma Dorada: dudas, propuestas, prensa o colaboración.",
    }),
  component: Page,
});

const contactEndpoint = import.meta.env.VITE_CONTACT_FORM_URL;

function Page() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const field = "mt-1 w-full rounded-xl border border-input bg-background px-4 py-3";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot anti-spam: los usuarios reales no deben rellenarlo.
    if (String(data.get("website") || "").trim()) {
      setSending(false);
      setSent(true);
      return;
    }

    const nombre = String(data.get("nombre") || "").trim();
    const email = String(data.get("email") || "").trim();
    const mensaje = String(data.get("mensaje") || "").trim();

    if (!contactEndpoint) {
      const subject = encodeURIComponent(`Contacto desde Plataforma Dorada — ${nombre}`);
      const body = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${email}\n\n${mensaje}`);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setSending(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      params.set("nombre", nombre);
      params.set("email", email);
      params.set("mensaje", mensaje);

      // Google Apps Script no necesita que el navegador lea la respuesta.
      // El modo no-cors permite enviar el formulario sin exponer datos del backend.
      await fetch(contactEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: params,
      });
      setSent(true);
      form.reset();
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Hablemos"
        title="Contacto"
        lead={`También puedes escribirnos a ${SITE.email}.`}
      />
      <section className="mx-auto w-full max-w-3xl px-4 pb-14 sm:px-6">
        <Panel>
          {sent ? (
            <div className="space-y-2" role="status">
              <p className="text-lg font-semibold">Gracias. Hemos recibido tu mensaje.</p>
              <p className="text-muted-foreground">
                Te responderemos a la dirección de correo que has indicado.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm font-semibold">
                Nombre
                <input required name="nombre" className={field} autoComplete="name" />
              </label>
              <label className="block text-sm font-semibold">
                Correo electrónico
                <input required type="email" name="email" className={field} autoComplete="email" />
              </label>
              <label className="block text-sm font-semibold">
                Mensaje
                <textarea required name="mensaje" rows={5} className={field} />
              </label>

              <label
                className="absolute -left-[10000px] h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                No rellenar este campo
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>

              <label className="flex items-start gap-3 text-sm">
                <input required type="checkbox" className="mt-1" />
                <span>He leído y acepto la política de privacidad.</span>
              </label>

              {error && (
                <p className="text-sm text-destructive" role="alert">
                  No hemos podido enviar el mensaje. Puedes escribirnos directamente a {SITE.email}.
                </p>
              )}

              <button
                disabled={sending}
                className="rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Enviando…" : "Enviar"}
              </button>
            </form>
          )}
        </Panel>
      </section>
    </>
  );
}
