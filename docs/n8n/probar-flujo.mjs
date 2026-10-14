// Prueba local del flujo sin n8n, sin Google Sheets y sin llamar a Claude.
// Ejecuta el código de los nodos del JSON generado con filas y respuestas simuladas.
// Uso: node docs/n8n/probar-flujo.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const wf = JSON.parse(readFileSync(join(dir, "flujo-mociones-plataforma-dorada.json"), "utf8"));
const byName = Object.fromEntries(wf.nodes.map((nd) => [nd.name, nd]));
const next = (name, out = 0) => (wf.connections[name]?.main[out] || []).map((c) => c.node);

// Salida más reciente de cada nodo (el bucle procesa un municipio cada vez).
const runs = {};
function runCode(name, items) {
  const $input = { all: () => items, first: () => items[0] };
  const $ = (other) => ({
    all: () => runs[other],
    first: () => runs[other][0],
    itemMatching: (i) => runs[other][i],
  });
  const fn = new Function("$input", "$", byName[name].parameters.jsCode);
  const out = fn($input, $).map((it) => ({ json: JSON.parse(JSON.stringify(it.json)) }));
  runs[name] = out;
  return out;
}

const HOY = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date());
const ACTA = "https://www.villaprueba.es/sede/actas/pleno-2026-09-25.pdf";
const filasHoja = [
  { row_number: 2, "NOMBRE ENTIDAD LOCAL O AYUNTAMIENTO EN LA QUE SE HA PRESENTADO LA MOCIÓN": "Villaprueba", "PROVINCIA": "Soria", "COMUNIDAD AUTÓNOMA": "Castilla y León", "FECHA EN QUE SE HA PRESENTADO LA MOCIÓN": "01/09/2026", "RESOLUCIÓN DEL PLENO": "", "TELÉFONO": "600000000" },
  { row_number: 3, "NOMBRE ENTIDAD LOCAL O AYUNTAMIENTO EN LA QUE SE HA PRESENTADO LA MOCIÓN": "Ya Aprobado", "PROVINCIA": "Lugo", "COMUNIDAD AUTÓNOMA": "Galicia", "FECHA EN QUE SE HA PRESENTADO LA MOCIÓN": "01/06/2026", "RESOLUCIÓN DEL PLENO": "Aprobada por unanimidad", "TELÉFONO": "" },
  { row_number: 4, "NOMBRE ENTIDAD LOCAL O AYUNTAMIENTO EN LA QUE SE HA PRESENTADO LA MOCIÓN": "Sin Datos", "PROVINCIA": "Teruel", "COMUNIDAD AUTÓNOMA": "Aragón", "FECHA EN QUE SE HA PRESENTADO LA MOCIÓN": "", "RESOLUCIÓN DEL PLENO": "", "IA estado moción": "PENDIENTE", "IA fecha moción": "2026-11-05", "IA fuente moción": "https://x", "IA última revisión": "2026-01-01" },
  { row_number: 5, "NOMBRE ENTIDAD LOCAL O AYUNTAMIENTO EN LA QUE SE HA PRESENTADO LA MOCIÓN": "Revisado Ayer", "PROVINCIA": "Cádiz", "COMUNIDAD AUTÓNOMA": "Andalucía", "RESOLUCIÓN DEL PLENO": "", "IA última revisión": HOY },
  { row_number: 6, "NOMBRE ENTIDAD LOCAL O AYUNTAMIENTO EN LA QUE SE HA PRESENTADO LA MOCIÓN": "villaprueba", "PROVINCIA": "Soria", "COMUNIDAD AUTÓNOMA": "Castilla y León", "FECHA EN QUE SE HA PRESENTADO LA MOCIÓN": "", "RESOLUCIÓN DEL PLENO": "En trámite" },
];

// Respuestas simuladas de Claude: Villaprueba necesita dos rondas (pause_turn) y aprueba;
// «Sin Datos» devuelve una ficha sin moción y una URL inventada.
const ficha = (extra) => JSON.stringify({
  codigo_ine: "", municipio: "X", web_oficial: "https://www.villaprueba.es", seccion_plenos: "NO ENCONTRADO",
  frecuencia_plenos: "NO ENCONTRADO", fuente_frecuencia: "", ultimo_pleno: "2026-09-25", fuente_ultimo_pleno: ACTA,
  proximo_pleno: "2026-10-30", fuente_proximo_pleno: "", plataforma_dorada: "SÍ", evidencia_plataforma: "Acta cita a Plataforma Dorada",
  fuente_plataforma: ACTA, estado_mocion: "APROBADA", fecha_mocion: "2026-09-25", fuente_mocion: ACTA,
  evidencia_mocion: "Aprobada por unanimidad", documentos_consultados: ACTA, palabras_clave_encontradas: "dependencia", confianza: "ALTA",
  ...extra,
});
const respuestas = {
  Villaprueba: [
    { model: "claude-opus-5-5", stop_reason: "pause_turn", usage: { input_tokens: 100, output_tokens: 50, server_tool_use: { web_search_requests: 3 } },
      content: [{ type: "server_tool_use", id: "s1", name: "web_search", input: {} },
        { type: "web_search_tool_result", tool_use_id: "s1", content: [{ type: "web_search_result", url: "https://www.villaprueba.es/", title: "Ayto" }] }] },
    { model: "claude-opus-5-5", stop_reason: "end_turn", usage: { input_tokens: 200, output_tokens: 80, server_tool_use: { web_search_requests: 2, web_fetch_requests: 1 } },
      content: [{ type: "server_tool_use", id: "f1", name: "web_fetch", input: {} },
        { type: "web_fetch_tool_result", tool_use_id: "f1", content: { type: "web_fetch_result", url: ACTA } },
        { type: "text", text: "```json\n" + ficha({ municipio: "Villaprueba" }) + "\n```" }] },
  ],
  "Sin Datos": [
    { model: "claude-opus-5-5", stop_reason: "end_turn", usage: { input_tokens: 10, output_tokens: 5 },
      content: [{ type: "text", text: ficha({ municipio: "Sin Datos", estado_mocion: "", fecha_mocion: "", fuente_mocion: "", ultimo_pleno: "25/09/2026", plataforma_dorada: "NO ENCONTRADO", web_oficial: "https://inventada.es" }) }] },
  ],
};

// Ejecución simulada del flujo.
const leidas = filasHoja.map((json) => ({ json }));
const seleccionados = runCode("Seleccionar municipios", leidas);
assert.deepEqual(seleccionados.map((s) => s.json.municipio), ["Villaprueba", "Sin Datos"], "primero los nunca revisados");
const villa = seleccionados.find((s) => s.json.municipio === "Villaprueba").json;
assert.deepEqual(villa.filas, [2, 6]);
assert.equal(villa.fecha_presentacion, "2026-09-01");
assert.ok(!JSON.stringify(villa.request).includes("600000000"), "no se envían datos personales a Claude");
assert.ok(villa.request.system[0].text.includes("Plataforma Dorada"));

const actualizaciones = [];
const fichasGuardadas = [];
for (const item of seleccionados) {
  runs["Municipio a municipio"] = [item];
  const cola = [...respuestas[item.json.municipio]];
  let actual = "Municipio a municipio";
  let salida = 1;
  let items = [item];
  for (;;) {
    const http = next(actual, salida)[0];
    assert.equal(items[0].json.request.model, "claude-opus-5-5");
    const respuesta = cola.shift();
    const ronda = next(http)[0];
    items = runCode(ronda, [{ json: respuesta }]);
    const sig = next(ronda)[0];
    if (sig === "Validar ficha") break;
    if (!items[0].json.seguir) break;
    assert.equal(items[0].json.request.messages.length, 2, "la continuación reenvía la respuesta parcial");
    actual = sig;
    salida = 0;
  }
  assert.equal(cola.length, 0);
  const validada = runCode("Validar ficha", items);
  const filas = runCode("Filas a actualizar", validada);
  actualizaciones.push(...filas.map((f) => f.json));
  runs["Actualizar hoja de mociones"] = filas;
  fichasGuardadas.push(...runCode("Ficha para el registro", filas).map((f) => f.json));
}

const fila = (n) => actualizaciones.find((a) => a.row_number === n);
// Villaprueba: aprobada con acta verificada → se escribe en RESOLUCIÓN DEL PLENO en sus dos filas.
for (const n of [2, 6]) {
  assert.equal(fila(n)["IA estado moción"], "APROBADA");
  assert.equal(fila(n)["IA fecha moción"], "2026-09-25");
}
assert.equal(fila(2)["RESOLUCIÓN DEL PLENO"], "Aprobada");
assert.equal(fila(6)["RESOLUCIÓN DEL PLENO"], undefined, "no se sobrescribe lo que haya escrito el equipo");
// Sin Datos: no se pierde el estado anterior y no se toca la columna pública.
assert.equal(fila(4)["IA estado moción"], "PENDIENTE");
assert.equal(fila(4)["RESOLUCIÓN DEL PLENO"], undefined);
assert.match(fila(4)["IA avisos"], /inventada\.es/);
assert.match(fila(4)["IA avisos"], /ultimo_pleno con formato no válido/);
const fv = fichasGuardadas.find((f) => f.municipio === "Villaprueba");
assert.equal(fv.resolucion_escrita_en_hoja, "SÍ");
assert.equal(fv.busquedas_web, 5);
assert.equal(fv.rondas_busqueda, 2);
assert.equal(fv.proximo_pleno, "", "una fecha sin fuente no se guarda");
assert.match(fv.avisos, /proximo_pleno .* no indica fuente/);

const resumen = runCode("Resumen", fichasGuardadas.map((json) => ({ json })))[0].json;
assert.equal(resumen.municipios_revisados, 2);
console.log("Prueba superada ✔");
console.log(JSON.stringify(resumen, null, 2));
