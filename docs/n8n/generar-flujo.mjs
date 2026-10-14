// Genera flujo-mociones-plataforma-dorada.json (flujo importable en n8n) a partir de src/.
// Uso: node docs/n8n/generar-flujo.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const src = (f) => readFileSync(join(dir, "src", f), "utf8");

// Hoja de registro de mociones (la misma que lee google-apps-script/publico.gs).
const HOJA_MOCIONES_ID = "15HvL9Mu5r9iSGq4sJ2vYTlrkDY3SubfEOxYCmGL10Kg";
const PESTANA_MOCIONES = "presentades";
const PESTANA_FICHAS = "Fichas IA";
// Una ronda inicial y hasta tres continuaciones si la búsqueda web se queda a medias.
const RONDAS = 4;

const googleCred = { googleSheetsOAuth2Api: { id: "", name: "Google Sheets (Plataforma Dorada)" } };
const anthropicCred = { httpHeaderAuth: { id: "", name: "Anthropic API (x-api-key)" } };
const doc = { __rl: true, value: HOJA_MOCIONES_ID, mode: "id" };
const sheet = (name) => ({ __rl: true, value: name, mode: "name" });

const nodes = [];
const connections = {};
let n = 0;
function node(name, type, typeVersion, position, parameters, extra = {}) {
  n += 1;
  nodes.push({ id: `pd-${String(n).padStart(2, "0")}`, name, type, typeVersion, position, parameters, ...extra });
  return name;
}
function connect(from, to, fromOutput = 0) {
  connections[from] ??= { main: [] };
  while (connections[from].main.length <= fromOutput) connections[from].main.push([]);
  connections[from].main[fromOutput].push({ node: to, type: "main", index: 0 });
}
const code = (jsCode) => ({ jsCode });

node("Cada 15 días", "n8n-nodes-base.scheduleTrigger", 1.2, [0, 0], {
  rule: { interval: [{ field: "days", daysInterval: 15, triggerAtHour: 8 }] },
});
node("Ejecutar a mano", "n8n-nodes-base.manualTrigger", 1, [0, 200], {});
node("Leer hoja de mociones", "n8n-nodes-base.googleSheets", 4.7, [240, 100], {
  operation: "read",
  documentId: doc,
  sheetName: sheet(PESTANA_MOCIONES),
  options: {},
}, { credentials: googleCred });
connect("Cada 15 días", "Leer hoja de mociones");
connect("Ejecutar a mano", "Leer hoja de mociones");

const seleccionar = src("seleccionar.js").replace("__PROMPT_SISTEMA__", () => JSON.stringify(src("prompt-sistema.md").trim()));
node("Seleccionar municipios", "n8n-nodes-base.code", 2, [480, 100], code(seleccionar));
connect("Leer hoja de mociones", "Seleccionar municipios");

node("Municipio a municipio", "n8n-nodes-base.splitInBatches", 3, [720, 100], { options: {} });
connect("Seleccionar municipios", "Municipio a municipio");

const claude = (name, pos) =>
  node(name, "n8n-nodes-base.httpRequest", 4.2, pos, {
    method: "POST",
    url: "https://api.anthropic.com/v1/messages",
    authentication: "genericCredentialType",
    genericAuthType: "httpHeaderAuth",
    sendHeaders: true,
    headerParameters: {
      parameters: [
        { name: "anthropic-version", value: "2023-06-01" },
        { name: "anthropic-beta", value: "server-side-fallback-2026-07-01" },
      ],
    },
    sendBody: true,
    specifyBody: "json",
    jsonBody: "={{ JSON.stringify($json.request) }}",
    options: { timeout: 900000 },
  }, {
    credentials: anthropicCred,
    retryOnFail: true,
    maxTries: 3,
    waitBetweenTries: 5000,
    onError: "continueRegularOutput",
  });

const seguir = (name, pos) =>
  node(name, "n8n-nodes-base.if", 2.2, pos, {
    conditions: {
      options: { caseSensitive: true, leftValue: "", typeValidation: "loose", version: 2 },
      conditions: [{
        id: `seguir-${name}`,
        leftValue: "={{ $json.seguir }}",
        rightValue: "",
        operator: { type: "boolean", operation: "true", singleValue: true },
      }],
      combinator: "and",
    },
    options: {},
  });

node("Validar ficha", "n8n-nodes-base.code", 2, [960 + RONDAS * 720, 300], code(src("resultado.js")));

let anterior = "Municipio a municipio";
let salida = 1; // salida «loop» del nodo de bucle
for (let k = 1; k <= RONDAS; k++) {
  const x = 960 + (k - 1) * 720;
  const http = claude(`Claude · ronda ${k}`, [x, 100]);
  connect(anterior, http, salida);
  const ultima = k === RONDAS;
  const ronda = node(`Ronda ${k}`, "n8n-nodes-base.code", 2, [x + 240, 100], code(
    src("ronda.js")
      .replace("__NODO_ANTERIOR__", JSON.stringify(k === 1 ? "Municipio a municipio" : `Ronda ${k - 1}`))
      .replace("__ULTIMA_RONDA__", String(ultima)),
  ));
  connect(http, ronda);
  if (ultima) {
    connect(ronda, "Validar ficha");
  } else {
    const si = seguir(`¿Seguir buscando? ${k}`, [x + 480, 100]);
    connect(ronda, si);
    connect(si, "Validar ficha", 1);
    anterior = si;
    salida = 0;
  }
}

const xf = 960 + RONDAS * 720;
node("Filas a actualizar", "n8n-nodes-base.code", 2, [xf + 240, 300], code(src("filas.js")));
connect("Validar ficha", "Filas a actualizar");
node("Actualizar hoja de mociones", "n8n-nodes-base.googleSheets", 4.7, [xf + 480, 300], {
  operation: "update",
  documentId: doc,
  sheetName: sheet(PESTANA_MOCIONES),
  columns: { mappingMode: "autoMapInputData", value: {}, matchingColumns: ["row_number"], schema: [] },
  options: { handlingExtraData: "insertInNewColumn" },
}, { credentials: googleCred });
connect("Filas a actualizar", "Actualizar hoja de mociones");
node("Ficha para el registro", "n8n-nodes-base.code", 2, [xf + 720, 300], code(src("ficha.js")));
connect("Actualizar hoja de mociones", "Ficha para el registro");
node("Guardar en Fichas IA", "n8n-nodes-base.googleSheets", 4.7, [xf + 960, 300], {
  operation: "append",
  documentId: doc,
  sheetName: sheet(PESTANA_FICHAS),
  columns: { mappingMode: "autoMapInputData", value: {}, matchingColumns: [], schema: [] },
  options: { handlingExtraData: "insertInNewColumn" },
}, { credentials: googleCred });
connect("Ficha para el registro", "Guardar en Fichas IA");
connect("Guardar en Fichas IA", "Municipio a municipio");

node("Resumen", "n8n-nodes-base.code", 2, [960, -200], code(src("resumen.js")));
connect("Municipio a municipio", "Resumen", 0);

const workflow = {
  name: "Plataforma Dorada · Seguimiento de mociones en ayuntamientos",
  nodes,
  connections,
  settings: { executionOrder: "v1", timezone: "Europe/Madrid", saveManualExecutions: true },
  pinData: {},
  meta: { templateCredsSetupCompleted: false },
};
const out = join(dir, "flujo-mociones-plataforma-dorada.json");
writeFileSync(out, JSON.stringify(workflow, null, 2) + "\n");
console.log("Flujo generado:", out, `(${nodes.length} nodos)`);
