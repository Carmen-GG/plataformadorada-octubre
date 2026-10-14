// Nodo «Resumen» (Code, una vez para todos los elementos).
// Recibe todas las fichas de la ejecución y resume qué ha encontrado.
const fichas = $input.all().map((i) => i.json);
const porEstado = {};
const novedades = [];
const revisar = [];
for (const f of fichas) {
  const estado = f.estado_mocion || "SIN DATOS";
  porEstado[estado] = (porEstado[estado] || 0) + 1;
  if (f.estado_mocion) {
    novedades.push(
      `${f.municipio} (${f.provincia || "—"}): ${f.estado_mocion}` +
        (f.fecha_mocion ? ` el ${f.fecha_mocion}` : "") +
        ` · confianza ${f.confianza}` +
        (f.resolucion_escrita_en_hoja === "SÍ" ? " · escrito en RESOLUCIÓN DEL PLENO" : "") +
        (f.fuente_mocion ? ` · ${f.fuente_mocion}` : ""),
    );
  }
  if (f.avisos) revisar.push(`${f.municipio}: ${f.avisos}`);
}
return [
  {
    json: {
      municipios_revisados: fichas.length,
      por_estado: porEstado,
      mociones_encontradas: novedades,
      a_revisar_a_mano: revisar,
    },
  },
];
