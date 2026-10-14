// Nodo «Validar ficha» (Code, una vez para todos los elementos).
// Extrae el JSON de la respuesta final de Claude y lo comprueba contra las reglas
// del prompt: valores permitidos, formato de fechas y URLs que hayan aparecido de verdad
// en las búsquedas (para detectar URLs inventadas).
const CAMPOS = [
  "codigo_ine", "municipio", "web_oficial", "seccion_plenos", "frecuencia_plenos",
  "fuente_frecuencia", "ultimo_pleno", "fuente_ultimo_pleno", "proximo_pleno",
  "fuente_proximo_pleno", "plataforma_dorada", "evidencia_plataforma", "fuente_plataforma",
  "estado_mocion", "fecha_mocion", "fuente_mocion", "evidencia_mocion",
  "documentos_consultados", "palabras_clave_encontradas", "confianza",
];
const ESTADOS_MOCION = ["APROBADA", "RECHAZADA", "PENDIENTE", "PRESENTADA", ""];
const PLATAFORMA = ["SÍ", "NO", "NO ENCONTRADO"];
const CONFIANZA = ["ALTA", "MEDIA", "BAJA"];

function extraerJson(texto) {
  const s = String(texto || "").replace(/```(?:json)?/g, "");
  const ini = s.indexOf("{");
  const fin = s.lastIndexOf("}");
  if (ini < 0 || fin <= ini) return null;
  try {
    return JSON.parse(s.slice(ini, fin + 1));
  } catch (e) {
    return null;
  }
}

function sinBarra(u) {
  return String(u).replace(/[#?].*$/, "").replace(/\/+$/, "").toLowerCase();
}

return $input.all().map((item, i) => {
  const e = item.json;
  const avisos = [];
  let f = e.error ? null : extraerJson(e.texto_final);
  if (!e.error && !f) avisos.push("La respuesta de Claude no contenía un JSON válido.");
  if (e.error) avisos.push(e.error);
  f = f && typeof f === "object" ? f : {};

  const ficha = {};
  for (const c of CAMPOS) ficha[c] = f[c] == null ? "" : String(f[c]).trim();

  // El municipio y el código INE no se pueden modificar.
  if (ficha.municipio && ficha.municipio !== e.municipio) avisos.push(`Claude devolvió el municipio «${ficha.municipio}».`);
  if (ficha.codigo_ine && ficha.codigo_ine !== e.codigo_ine) avisos.push(`Claude devolvió el código INE «${ficha.codigo_ine}».`);
  ficha.municipio = e.municipio;
  ficha.codigo_ine = e.codigo_ine;

  ficha.estado_mocion = ficha.estado_mocion.toUpperCase();
  if (!ESTADOS_MOCION.includes(ficha.estado_mocion)) {
    avisos.push(`estado_mocion no válido («${ficha.estado_mocion}»).`);
    ficha.estado_mocion = "";
  }
  const pd = ficha.plataforma_dorada.toUpperCase().replace(/^SI$/, "SÍ");
  ficha.plataforma_dorada = PLATAFORMA.includes(pd) ? pd : "NO ENCONTRADO";
  ficha.confianza = ficha.confianza.toUpperCase();
  if (!CONFIANZA.includes(ficha.confianza)) ficha.confianza = "BAJA";

  for (const c of ["ultimo_pleno", "proximo_pleno", "fecha_mocion"]) {
    if (ficha[c] && !/^\d{4}-\d{2}-\d{2}$/.test(ficha[c])) {
      avisos.push(`${c} con formato no válido («${ficha[c]}»), se deja vacío.`);
      ficha[c] = "";
    }
  }
  if (ficha.proximo_pleno && ficha.proximo_pleno <= e.hoy) {
    avisos.push(`proximo_pleno (${ficha.proximo_pleno}) no es una fecha futura, se deja vacío.`);
    ficha.proximo_pleno = "";
  }
  if (ficha.ultimo_pleno && ficha.ultimo_pleno > e.hoy) {
    avisos.push(`ultimo_pleno (${ficha.ultimo_pleno}) es una fecha futura, se deja vacío.`);
    ficha.ultimo_pleno = "";
  }

  // Una fecha sin fuente no es trazable.
  for (const [c, fuente] of [["ultimo_pleno", "fuente_ultimo_pleno"], ["proximo_pleno", "fuente_proximo_pleno"], ["fecha_mocion", "fuente_mocion"]]) {
    if (ficha[c] && !/https?:\/\//.test(ficha[fuente])) {
      avisos.push(`${c} (${ficha[c]}) no indica fuente, se deja vacío.`);
      ficha[c] = "";
    }
  }

  // Comprobación de URLs: toda URL citada debe haber salido en las búsquedas o lecturas.
  const vistas = new Set((e.urls_vistas || []).map(sinBarra));
  const camposUrl = ["web_oficial", "seccion_plenos", "fuente_frecuencia", "fuente_ultimo_pleno",
    "fuente_proximo_pleno", "fuente_plataforma", "fuente_mocion"];
  const noVerificadas = [];
  for (const c of camposUrl) {
    for (const u of ficha[c].match(/https?:\/\/[^\s|,;"'<>)\]]+/g) || []) {
      if (!vistas.has(sinBarra(u))) noVerificadas.push(`${c}: ${u}`);
    }
  }
  const fuenteMocionVerificada =
    /^https?:\/\//.test(ficha.fuente_mocion) &&
    !noVerificadas.some((x) => x.startsWith("fuente_mocion:"));
  if (noVerificadas.length) {
    avisos.push("URLs que no aparecieron en las búsquedas (revisar a mano): " + noVerificadas.join(" · "));
    if (ficha.confianza === "ALTA") ficha.confianza = "MEDIA";
  }
  if ((ficha.estado_mocion === "APROBADA" || ficha.estado_mocion === "RECHAZADA") && !fuenteMocionVerificada) {
    avisos.push("El estado de la moción no tiene una fuente verificada: no se considera definitivo.");
    if (ficha.confianza === "ALTA") ficha.confianza = "MEDIA";
  }

  return {
    json: {
      municipio: e.municipio,
      provincia: e.provincia,
      filas: e.filas,
      filas_sin_resolucion: e.filas_sin_resolucion,
      previo: e.previo,
      hoy: e.hoy,
      config: e.config,
      col: e.col,
      col_resolucion: e.col_resolucion,
      ficha,
      valida: !e.error && Object.keys(f).length > 0,
      fuente_mocion_verificada: fuenteMocionVerificada,
      avisos,
      modelo_usado: e.modelo_usado || "",
      rondas: e.ronda || 0,
      uso: e.uso || null,
    },
    pairedItem: { item: i },
  };
});
