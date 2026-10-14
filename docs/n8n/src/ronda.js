// Nodo «Ronda N» (Code, una vez para todos los elementos).
// Lee la respuesta de Claude. Si la búsqueda web se ha quedado a medias
// (stop_reason = "pause_turn"), prepara la petición para continuarla en la siguiente ronda.
const NODO_ANTERIOR = __NODO_ANTERIOR__;
const ULTIMA_RONDA = __ULTIMA_RONDA__;

function urlsDe(content) {
  const urls = [];
  for (const b of content || []) {
    if (b.type === "web_search_tool_result" && Array.isArray(b.content)) {
      for (const r of b.content) if (r && r.url) urls.push(r.url);
    }
    if (b.type === "web_fetch_tool_result" && b.content && !b.content.error_code) {
      if (b.content.url) urls.push(b.content.url);
    }
    if (b.type === "text" && Array.isArray(b.citations)) {
      for (const c of b.citations) if (c && c.url) urls.push(c.url);
    }
  }
  return urls;
}

return $input.all().map((item, i) => {
  const estado = $(NODO_ANTERIOR).itemMatching(i).json;
  const res = item.json || {};
  const out = { ...estado, ronda: (estado.ronda || 0) + 1, seguir: false };

  if (res.error || !Array.isArray(res.content)) {
    const e = res.error;
    out.error = "Error al llamar a Claude: " + (typeof e === "object" ? JSON.stringify(e).slice(0, 500) : String(e || "respuesta vacía"));
    delete out.request;
    return { json: out, pairedItem: { item: i } };
  }

  out.urls_vistas = [...new Set([...(estado.urls_vistas || []), ...urlsDe(res.content)])];
  out.modelo_usado = res.model || "";
  // Se suma el consumo de todas las rondas (para controlar el coste en «Fichas IA»).
  const u = res.usage || {};
  const prev = estado.uso || {};
  const stu = u.server_tool_use || {};
  out.uso = {
    input_tokens: (prev.input_tokens || 0) + (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0),
    output_tokens: (prev.output_tokens || 0) + (u.output_tokens || 0),
    web_search_requests: (prev.web_search_requests || 0) + (stu.web_search_requests || 0),
    web_fetch_requests: (prev.web_fetch_requests || 0) + (stu.web_fetch_requests || 0),
  };

  if (res.stop_reason === "pause_turn" && !ULTIMA_RONDA) {
    // Se reenvía lo mismo más la respuesta parcial; la API continúa donde lo dejó.
    out.request = {
      ...estado.request,
      messages: [...estado.request.messages, { role: "assistant", content: res.content }],
    };
    out.seguir = true;
    return { json: out, pairedItem: { item: i } };
  }

  delete out.request;
  out.stop_reason = res.stop_reason;
  if (res.stop_reason === "pause_turn") {
    out.error = "La investigación no terminó tras " + out.ronda + " rondas de búsqueda.";
  } else if (res.stop_reason === "refusal") {
    out.error = "Claude no ha completado la petición (refusal).";
  } else if (res.stop_reason === "max_tokens") {
    out.error = "La respuesta superó el máximo de tokens.";
  }
  // El texto final es el de los bloques «text» posteriores a la última herramienta.
  let texto = "";
  for (const b of res.content) {
    if (b.type === "text") texto += b.text;
    else if (b.type !== "thinking" && b.type !== "redacted_thinking") texto = "";
  }
  out.texto_final = texto;
  return { json: out, pairedItem: { item: i } };
});
