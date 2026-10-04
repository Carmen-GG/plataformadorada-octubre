/**
 * Formulario de contacto de Plataforma Dorada.
 *
 * Despliega este archivo como Web app:
 * - Ejecutar como: tú
 * - Quién tiene acceso: Cualquiera
 *
 * El endpoint recibe nombre, email y mensaje y los reenvía al correo oficial.
 * No guarda el contenido en una hoja de cálculo.
 */

const CONTACT_EMAIL = "plataformadoradaes@gmail.com";

function doPost(e) {
  const params = e && e.parameter ? e.parameter : {};
  const nombre = String(params.nombre || "").trim();
  const email = String(params.email || "").trim();
  const mensaje = String(params.mensaje || "").trim();

  if (!nombre || !email || !mensaje) {
    return json_({ ok: false, error: "Faltan datos obligatorios." });
  }

  const subject = `Contacto Plataforma Dorada — ${nombre}`;
  const body = [
    `Nombre: ${nombre}`,
    `Correo: ${email}`,
    "",
    mensaje,
  ].join("\n");

  MailApp.sendEmail({
    to: CONTACT_EMAIL,
    replyTo: email,
    subject,
    body,
  });

  return json_({ ok: true });
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
