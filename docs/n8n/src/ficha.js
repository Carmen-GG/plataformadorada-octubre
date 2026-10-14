// Nodo «Ficha para el registro» (Code, una vez para todos los elementos).
// Prepara una fila con la ficha completa para la pestaña «Fichas IA» (historial de revisiones).
return $("Validar ficha").all().map((item) => {
  const r = item.json;
  return {
    json: {
      fecha_revision: r.hoy,
      provincia: r.provincia,
      ...r.ficha,
      filas_hoja_mociones: r.filas.join(", "),
      resolucion_escrita_en_hoja: $input.all().some((i) => i.json[r.col_resolucion]) ? "SÍ" : "NO",
      avisos: r.avisos.join(" | "),
      modelo: r.modelo_usado,
      rondas_busqueda: r.rondas,
      busquedas_web: r.uso ? r.uso.web_search_requests : "",
      lecturas_web: r.uso ? r.uso.web_fetch_requests : "",
      tokens_entrada: r.uso ? r.uso.input_tokens : "",
      tokens_salida: r.uso ? r.uso.output_tokens : "",
    },
  };
});
