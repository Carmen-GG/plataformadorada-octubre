// Nodo «Filas a actualizar» (Code, una vez para todos los elementos).
// Devuelve un elemento por cada fila de la hoja de mociones de este municipio, solo con
// las columnas que hay que escribir (las columnas «IA …» se crean solas si no existen).
const salida = [];
for (const item of $input.all()) {
  const r = item.json;
  const f = r.ficha;
  const C = r.col;
  const cambios = {};
  let resolucion = "";

  if (!r.valida) {
    // Si la investigación ha fallado no se toca el estado ni la fecha de revisión,
    // para que se vuelva a intentar en la siguiente ejecución.
    cambios[C.aviso] = r.hoy + ": " + r.avisos.join(" | ");
  } else {
    const avisos = [...r.avisos];
    let estado = f.estado_mocion;
    let fecha = f.fecha_mocion;
    let fuente = f.fuente_mocion;
    // Una revisión sin datos no borra lo que ya se había encontrado antes.
    if (!estado && r.previo && r.previo.estado) {
      estado = r.previo.estado;
      fecha = r.previo.fecha;
      fuente = r.previo.fuente;
      avisos.push("Esta revisión no ha encontrado información de la moción; se mantiene el estado anterior.");
    }
    // APROBADA / RECHAZADA sin fuente verificada no se da por definitivo (se volverá a revisar).
    const definitivo = (estado === "APROBADA" || estado === "RECHAZADA") && r.fuente_mocion_verificada;
    if ((estado === "APROBADA" || estado === "RECHAZADA") && !definitivo && estado === f.estado_mocion) {
      estado = estado + " (sin verificar)";
    }

    cambios[C.estado] = estado;
    cambios[C.fecha] = fecha;
    cambios[C.fuente] = fuente;
    cambios[C.evidencia] = f.evidencia_mocion;
    cambios[C.plataforma] = f.plataforma_dorada + (f.fuente_plataforma ? " · " + f.fuente_plataforma : "");
    cambios[C.confianza] = f.confianza;
    cambios[C.revision] = r.hoy;
    cambios[C.aviso] = avisos.join(" | ");

    // Columna pública que usa el mapa de la web: solo con confianza ALTA y fuente oficial verificada,
    // y solo en celdas vacías (nunca se sobrescribe lo que haya escrito el equipo).
    if (r.config.ESCRIBIR_RESOLUCION && definitivo && f.confianza === "ALTA" && f.estado_mocion === estado) {
      resolucion = estado === "APROBADA" ? "Aprobada" : "Rechazada";
    }
  }

  for (const fila of r.filas) {
    const extra = resolucion && r.filas_sin_resolucion.includes(fila) ? { [r.col_resolucion]: resolucion } : {};
    salida.push({ json: { row_number: fila, ...cambios, ...extra } });
  }
}
return salida;
