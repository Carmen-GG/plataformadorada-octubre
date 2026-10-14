// Nodo «Seleccionar municipios» (Code, una vez para todos los elementos).
// Recibe las filas de la pestaña de mociones y devuelve un elemento por municipio
// que todavía hay que revisar, con la petición a Claude ya preparada.

// ───────────── CONFIGURACIÓN (puedes cambiar estos valores) ─────────────
const CONFIG = {
  // Modelo de Claude y nivel de esfuerzo (low | medium | high | xhigh | max).
  MODELO: "claude-opus-5-5",
  ESFUERZO: "high",
  MAX_TOKENS: 32000,
  // Límite de búsquedas y lecturas de páginas por municipio (controla el coste).
  MAX_BUSQUEDAS: 15,
  MAX_LECTURAS: 15,
  // Máximo de municipios revisados en cada ejecución (los demás quedan para la siguiente).
  MAX_MUNICIPIOS: 40,
  // No volver a revisar un municipio revisado hace menos de estos días
  // (evita gastar dos veces si lanzas el flujo a mano entre dos ejecuciones programadas).
  DIAS_MINIMOS_ENTRE_REVISIONES: 10,
  // Escribir «Aprobada» / «Rechazada» en la columna RESOLUCIÓN DEL PLENO (la que usa el
  // mapa de la web) solo si la confianza es ALTA y la fuente es oficial y verificada.
  ESCRIBIR_RESOLUCION: true,
};

// Nombres de las columnas que añade el flujo (se crean solas la primera vez).
const COL = {
  estado: "IA estado moción",
  fecha: "IA fecha moción",
  fuente: "IA fuente moción",
  evidencia: "IA evidencia moción",
  plataforma: "IA referencia Plataforma Dorada",
  confianza: "IA confianza",
  revision: "IA última revisión",
  aviso: "IA avisos",
};

const PROMPT_SISTEMA = __PROMPT_SISTEMA__;

function norm(v) {
  return String(v ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function findKey(keys, ...needles) {
  for (const needle of needles) {
    const k = keys.find((key) => norm(key).includes(needle));
    if (k) return k;
  }
  return null;
}

// Misma regla que google-apps-script/publico.gs para saber si el pleno ya resolvió.
function resolucionFinal(v) {
  return /^(aprobada|aceptada|rechazada|denegada|no aprobada)\b/.test(norm(v));
}

function hoyMadrid() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date());
}

function diasDesde(fechaIso, hoy) {
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(String(fechaIso || ""));
  if (!m) return Infinity;
  return (Date.parse(hoy) - Date.parse(m[1])) / 86400000;
}

// Las fechas de Google Sheets pueden llegar como 24/09/2026, 2026-09-24 o número de serie.
function fechaIso(v) {
  const s = String(v ?? "").trim();
  let m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = /^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})/.exec(s);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  if (/^\d{5}(\.\d+)?$/.test(s)) {
    const d = new Date(Date.UTC(1899, 11, 30) + Number(s) * 86400000);
    return d.toISOString().slice(0, 10);
  }
  return "";
}

const filas = $input.all().map((i) => i.json).filter((r) => r && r.row_number);
if (!filas.length) return [];

const keys = Object.keys(Object.assign({}, ...filas));
const K = {
  entidad: findKey(keys, "nombre entidad local", "nombre del ayuntamiento", "ayuntamiento", "municipio"),
  ccaa: findKey(keys, "comunidad autonoma"),
  provincia: findKey(keys, "provincia"),
  fecha: findKey(keys, "fecha en que se ha presentado la mocion", "fecha de presentacion"),
  resolucion: findKey(keys, "resolucion del pleno"),
  ine: findKey(keys, "codigo ine", "cod ine", "ine"),
};
if (!K.entidad) {
  throw new Error("No encuentro la columna del ayuntamiento («NOMBRE ENTIDAD LOCAL O AYUNTAMIENTO…») en la hoja de mociones.");
}
if (!K.resolucion) {
  throw new Error("No encuentro la columna «RESOLUCIÓN DEL PLENO» en la hoja de mociones.");
}

const hoy = hoyMadrid();
const grupos = new Map();
for (const r of filas) {
  const municipio = String(r[K.entidad] ?? "").trim();
  if (!municipio) continue;
  const provincia = K.provincia ? String(r[K.provincia] ?? "").trim() : "";
  const key = norm(municipio) + "|" + norm(provincia);
  const g = grupos.get(key) || {
    municipio,
    provincia,
    comunidad_autonoma: "",
    codigo_ine: "",
    fecha_presentacion: "",
    filas: [],
    filas_sin_resolucion: [],
    cerrado: false,
    ultima_revision: "",
    previo: { estado: "", fecha: "", fuente: "" },
  };
  g.filas.push(r.row_number);
  if (!String(r[K.resolucion] ?? "").trim()) g.filas_sin_resolucion.push(r.row_number);
  if (!g.comunidad_autonoma && K.ccaa) g.comunidad_autonoma = String(r[K.ccaa] ?? "").trim();
  if (!g.codigo_ine && K.ine) g.codigo_ine = String(r[K.ine] ?? "").trim();
  const f = K.fecha ? fechaIso(r[K.fecha]) : "";
  if (f && (!g.fecha_presentacion || f > g.fecha_presentacion)) g.fecha_presentacion = f;
  const estadoIa = norm(r[COL.estado]).toUpperCase();
  if (resolucionFinal(r[K.resolucion]) || estadoIa === "APROBADA" || estadoIa === "RECHAZADA") g.cerrado = true;
  if (!g.previo.estado && estadoIa) {
    g.previo = { estado: estadoIa, fecha: String(r[COL.fecha] ?? ""), fuente: String(r[COL.fuente] ?? "") };
  }
  const rev = String(r[COL.revision] ?? "");
  if (rev > g.ultima_revision) g.ultima_revision = rev;
  grupos.set(key, g);
}

const pendientes = [...grupos.values()]
  .filter((g) => !g.cerrado)
  .filter((g) => diasDesde(g.ultima_revision, hoy) >= CONFIG.DIAS_MINIMOS_ENTRE_REVISIONES)
  // Primero los que nunca se han revisado y después los revisados hace más tiempo.
  .sort((a, b) => (a.ultima_revision || "").localeCompare(b.ultima_revision || ""))
  .slice(0, CONFIG.MAX_MUNICIPIOS);

return pendientes.map((g) => {
  const mensaje = [
    "Municipio: " + g.municipio,
    "Provincia: " + (g.provincia || "(no consta en el registro)"),
    "Comunidad autónoma: " + (g.comunidad_autonoma || "(no consta en el registro)"),
    "Código INE: " + (g.codigo_ine || ""),
    "Fecha de presentación de la moción de Plataforma Dorada según el registro de la plataforma: " +
      (g.fecha_presentacion || "(no consta)"),
    "Fecha de hoy: " + hoy,
    "",
    "Elabora la ficha verificable de este municipio siguiendo tus instrucciones y devuelve únicamente el objeto JSON.",
  ].join("\n");

  const request = {
    model: CONFIG.MODELO,
    max_tokens: CONFIG.MAX_TOKENS,
    output_config: { effort: CONFIG.ESFUERZO },
    fallbacks: "default",
    system: [{ type: "text", text: PROMPT_SISTEMA, cache_control: { type: "ephemeral" } }],
    tools: [
      {
        type: "web_search_20260209",
        name: "web_search",
        max_uses: CONFIG.MAX_BUSQUEDAS,
        user_location: { type: "approximate", country: "ES", timezone: "Europe/Madrid" },
      },
      { type: "web_fetch_20260209", name: "web_fetch", max_uses: CONFIG.MAX_LECTURAS, max_content_tokens: 40000 },
    ],
    messages: [{ role: "user", content: mensaje }],
  };

  return {
    json: {
      municipio: g.municipio,
      provincia: g.provincia,
      comunidad_autonoma: g.comunidad_autonoma,
      codigo_ine: g.codigo_ine,
      fecha_presentacion: g.fecha_presentacion,
      filas: g.filas,
      filas_sin_resolucion: g.filas_sin_resolucion,
      previo: g.previo,
      hoy,
      config: CONFIG,
      col: COL,
      col_resolucion: K.resolucion,
      urls_vistas: [],
      ronda: 0,
      request,
    },
  };
});
