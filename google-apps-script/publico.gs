/**
 * Plataforma Dorada — cifras y listas PÚBLICAS a partir de las hojas de respuestas.
 *
 * Lee las tres hojas (adhesiones, voluntarios y testimonios) y devuelve SOLO:
 *  - números agregados;
 *  - listas ya formateadas ("María G. · Cataluña") de personas que han autorizado
 *    expresamente aparecer;
 *  - testimonios cuyo uso público ha sido autorizado por la persona que responde, con nombre o de forma anónima.
 * Nunca se devuelven apellidos completos, correos, teléfonos, DNI ni respuestas sin autorizar.
 *
 * Se llama desde la web con: <URL /exec>?action=public
 *
 * INSTALACIÓN: ver PUBLICO-README.md
 */

var PD = {
  // Hoja de adhesiones: el script está en esa hoja, así que se deja vacío.
  ADHESIONES_SPREADSHEET_ID: "",
  // Pestaña con TODAS las firmas. Si la dejas vacía se usa la primera pestaña cuya cabecera
  // contenga «¿Cómo quieres adherirte…?». Con varias pestañas parecidas conviene fijarla.
  ADHESIONES_SHEET_NAME: "Firmantes",
  // ID de las otras dos hojas (lo que hay entre /d/ y /edit en la URL de la hoja).
  VOLUNTARIOS_SPREADSHEET_ID: "PEGAR_AQUI_EL_ID_DE_LA_HOJA_DE_VOLUNTARIOS",
  TESTIMONIOS_SPREADSHEET_ID: "1dg5REsWA6xb0jVcEH5VSkpOI94ih9rbkqWLSYHf4pbU",
  // Registro de mociones presentado por el equipo.
  MOCIONES_SPREADSHEET_ID: "15HvL9Mu5r9iSGq4sJ2vYTlrkDY3SubfEOxYCmGL10Kg",
  MOCIONES_SHEET_NAME: "presentades",
  INDICADORES_SHEET_NAME: "Indicadores",
  SAAD_SOURCE_URL: "https://www.dsca.gob.es/es/comunicacion/notas-prensa/lista-espera-dependencia-acelera-su-descenso-baja-21-ultimo-ano",
  CUIDADORES_SOURCE_URL: "https://imserso.es/documents/20123/11674011/inf_empleo_ss_1trim_2026.pdf/077f23fd-104d-a426-e8d8-c2166519dc7c",

  // Cuántas personas se muestran en cada lista "últimas/últimos".
  // Texto (sin tildes, en minúsculas) que identifica la pregunta de permiso para aparecer
  // en la web. Si cambias el texto de la pregunta en el formulario, mantén esta frase o cámbiala aquí.
  CONSENT_HEADER_TEXT: "aparezcan publicamente",

  LIST_ADHESIONES: 8,
  LIST_VOLUNTARIOS: 6,
  LIST_TESTIMONIOS: 12,
  // Máximo de entidades que se publican en la página «Entidades adheridas».
  LIST_ENTIDADES: 500,

  // TESTIMONIOS
  // Los testimonios se publican automáticamente cuando la persona ha respondido Sí
  // al consentimiento de uso público; no se exige una segunda columna de moderación.
  REQUIRE_APPROVAL: false,
  TESTIMONIO_TEXTO_AUTO: "que cosas deberian mejorar",
  // Los marcados como "Anónimo" también se publican, sin nombre.
  PUBLISH_ANONYMOUS: true,

  CACHE_SECONDS: 20,

  // Mientras ajustáis la web: añade al JSON un bloque "diagnostico" con recuentos (sin datos
  // personales) para ver cómo se están leyendo las hojas. Ponlo en false cuando todo esté bien.
  INCLUDE_DIAGNOSTICO: false,
};

// ───────────────────────────── utilidades ─────────────────────────────

function pdNorm_(s) {
  return String(s == null ? "" : s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pdYes_(v) {
  return /^(si|autorizo|acepto)\b/.test(pdNorm_(v));
}

function pdOpen_(id) {
  return id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
}

function pdHas_(needle) {
  return function (h) {
    return h.indexOf(needle) >= 0;
  };
}

function pdEq_(text) {
  return function (h) {
    return h === text;
  };
}

function pdIdx_(headers, pred, last) {
  var found = -1;
  for (var i = 0; i < headers.length; i++) {
    if (pred(headers[i])) {
      found = i;
      if (!last) return i;
    }
  }
  return found;
}

/**
 * Devuelve {sheet, headers (normalizados), rows} de la pestaña pedida por nombre (si existe y su
 * cabecera contiene `needle`) o, si no, de la 1.ª pestaña cuya cabecera contiene `needle`.
 */
function pdReadTable_(ss, needle, sheetName) {
  var sheets = ss.getSheets();
  if (sheetName) {
    var wanted = pdNorm_(sheetName);
    sheets = sheets
      .filter(function (sh) {
        return pdNorm_(sh.getName()) === wanted;
      })
      .concat(
        sheets.filter(function (sh) {
          return pdNorm_(sh.getName()) !== wanted;
        }),
      );
  }
  for (var s = 0; s < sheets.length; s++) {
    var sheet = sheets[s];
    var lastCol = sheet.getLastColumn();
    if (!lastCol) continue;
    var headers = sheet.getRange(1, 1, 1, lastCol).getDisplayValues()[0].map(pdNorm_);
    if (headers.some(pdHas_(needle))) {
      var lastRow = sheet.getLastRow();
      var rows = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, lastCol).getDisplayValues() : [];
      return { sheet: sheet, headers: headers, rows: rows };
    }
  }
  return null;
}

var PD_PARTICLES = {
  de: 1,
  del: 1,
  la: 1,
  las: 1,
  los: 1,
  el: 1,
  y: 1,
  i: 1,
  da: 1,
  do: 1,
  di: 1,
  van: 1,
  von: 1,
};

function pdClean_(s) {
  return String(s == null ? "" : s)
    .replace(/[^A-Za-zÀ-ÖØ-öø-ÿĀ-žñÑçÇ\s'’\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pdCap_(word) {
  return word
    .split("-")
    .map(function (p) {
      return p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
    })
    .join("-");
}

/** Pone en formato "Título" solo si viene todo en mayúsculas o todo en minúsculas. */
function pdTidy_(s) {
  var t = pdClean_(s);
  if (!t) return "";
  if (t === t.toUpperCase() || t === t.toLowerCase()) {
    t = t
      .split(" ")
      .map(function (w) {
        return PD_PARTICLES[pdNorm_(w)] ? w.toLowerCase() : pdCap_(w);
      })
      .join(" ");
  }
  return t.slice(0, 40);
}

function pdInitial_(surnames) {
  var words = pdClean_(surnames).split(" ");
  for (var i = 0; i < words.length; i++) {
    if (words[i] && !PD_PARTICLES[pdNorm_(words[i])]) return words[i].charAt(0).toUpperCase() + ".";
  }
  return "";
}

/** "María José" + "García López" -> "María José G." */
function pdPublicName_(given, surnames) {
  var g = pdClean_(given);
  if (!g) return "";
  var name = g.split(" ").slice(0, 2).map(pdCap_).join(" ");
  var ini = pdInitial_(surnames);
  return ini ? name + " " + ini : name;
}

/** Campo único "Nombre y Apellidos": 1.ª palabra = nombre; inicial de la 2.ª (sin partículas). */
function pdSplitFull_(full) {
  var w = pdClean_(full).split(" ").filter(Boolean);
  return { given: w[0] || "", surnames: w.slice(1).join(" ") };
}

var PD_CCAA = [
  ["andalucia", "Andalucía"],
  ["aragon", "Aragón"],
  ["asturias", "Asturias"],
  ["balear", "Illes Balears"],
  ["canaria", "Canarias"],
  ["cantabria", "Cantabria"],
  ["castilla la mancha", "Castilla-La Mancha"],
  ["castilla-la mancha", "Castilla-La Mancha"],
  ["castilla y leon", "Castilla y León"],
  ["cataluna", "Cataluña"],
  ["catalunya", "Cataluña"],
  ["valencia", "Comunitat Valenciana"],
  ["madrid", "Madrid"],
  ["extremadura", "Extremadura"],
  ["galicia", "Galicia"],
  ["navarra", "Navarra"],
  ["pais vasco", "País Vasco"],
  ["euskadi", "País Vasco"],
  ["murcia", "Murcia"],
  ["rioja", "La Rioja"],
  ["ceuta", "Ceuta"],
  ["melilla", "Melilla"],
];

function pdCcaa_(raw) {
  var n = pdNorm_(raw);
  if (!n) return "";
  for (var i = 0; i < PD_CCAA.length; i++) {
    if (n.indexOf(PD_CCAA[i][0]) >= 0) return PD_CCAA[i][1];
  }
  return "";
}

/** Agrupa el tipo de organización del formulario en las categorías del filtro de la web. */
function pdTipoEntidad_(raw) {
  var n = pdNorm_(raw);
  if (n.indexOf("asociacion") >= 0) return "Asociación";
  if (n.indexOf("fundacion") >= 0) return "Fundación";
  if (n.indexOf("ayuntamiento") >= 0 || n.indexOf("entidad local") >= 0) return "Ayuntamiento";
  if (n.indexOf("empresa") >= 0 || n.indexOf("sociedad") >= 0 || n.indexOf("mercantil") >= 0)
    return "Empresa";
  if (n.indexOf("entidad social") >= 0 || n.indexOf("tercer sector") >= 0 || /\bong\b/.test(n))
    return "Entidad social";
  return "Otra entidad";
}

/** Solo devuelve URLs http(s) bien formadas; cualquier otra cosa (redes, texto libre) se descarta. */
function pdUrl_(raw) {
  var v =
    String(raw == null ? "" : raw)
      .trim()
      .split(/\s+/)[0] || "";
  if (/^https?:\/\/[^\s<>"']+$/i.test(v)) return v.slice(0, 300);
  if (/^(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/[^\s<>"']*)?$/i.test(v))
    return ("https://" + v).slice(0, 300);
  return "";
}

function pdText_(raw, max) {
  return String(raw == null ? "" : raw)
    .replace(/[\u0000-\u001F<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function pdCell_(row, idx) {
  return idx >= 0 ? String(row[idx] == null ? "" : row[idx]).trim() : "";
}

// ───────────────────────────── adhesiones ─────────────────────────────

function pdAdhesiones_() {
  var t = pdReadTable_(
    pdOpen_(PD.ADHESIONES_SPREADSHEET_ID),
    "como quieres adherirte",
    PD.ADHESIONES_SHEET_NAME,
  );
  if (!t) throw new Error("No encuentro la hoja de adhesiones.");
  var h = t.headers;

  var iType = pdIdx_(h, pdHas_("como quieres adherirte"));
  var iOrgType = pdIdx_(h, pdHas_("tipo de organizacion"));
  var iOrgCcaa = pdIdx_(h, pdHas_("comunidad autonoma de la sede"));
  // Las columnas de la persona individual van DESPUÉS de las de la entidad: última coincidencia.
  var iName = pdIdx_(h, pdEq_("nombre"), true);
  var iSur = pdIdx_(h, pdEq_("apellidos"), true);
  var iCcaa = pdIdx_(h, pdEq_("comunidad autonoma"), true);
  var iCity = pdIdx_(
    h,
    function (x) {
      return x === "municipio adherente" || x === "ciudad" || x.indexOf("ciudad en la que") === 0;
    },
    true,
  );
  // Entidades: nombre, web y compromiso de hacer pública la adhesión.
  var iOrgName = pdIdx_(h, pdHas_("nombre de la entidad"));
  var iWeb = pdIdx_(h, pdHas_("pagina web"));
  var iPublic = pdIdx_(h, pdHas_("hacer publica la adhesion"));
  var iAlcance = pdIdx_(h, pdHas_("alcance de la entidad"));
  var iHide = pdIdx_(h, pdEq_("ocultar"));

  var res = {
    personas: 0,
    entidades: 0,
    ayuntamientos: 0,
    tipos: {},
    porCcaa: {},
    ultimas: [],
    entidadesLista: [],
  };
  res.diag = {
    pestanaLeida: t.sheet.getName(),
    filasTotales: t.rows.length,
    filasSinDatos: 0,
    filasSinMarcaTemporal: 0,
    tiposAdhesion: {},
    columnasEncontradas: {
      tipoAdhesion: iType >= 0,
      tipoOrganizacion: iOrgType >= 0,
      nombreEntidad: iOrgName >= 0,
      nombre: iName >= 0,
      apellidos: iSur >= 0,
      comunidad: iCcaa >= 0,
      ciudad: iCity >= 0,
      compromisoEntidad: iPublic >= 0,
    },
  };

  // Una fila es de ENTIDAD si lo dice el tipo de adhesión o si trae nombre de entidad.
  // Cualquier otra fila con marca temporal es una PERSONA (así también cuentan las
  // respuestas antiguas que no tuvieran la pregunta del tipo).
  function isOrgRow(row) {
    return (
      pdNorm_(pdCell_(row, iType)).indexOf("en representacion") === 0 ||
      (iOrgName >= 0 && pdCell_(row, iOrgName) !== "")
    );
  }

  function bump(ccaa, key) {
    if (!ccaa) return;
    if (!res.porCcaa[ccaa]) res.porCcaa[ccaa] = { adhesiones: 0, entidades: 0 };
    res.porCcaa[ccaa][key]++;
  }

  for (var r = 0; r < t.rows.length; r++) {
    var row = t.rows[r];
    // Una fila cuenta si trae marca temporal o algún dato de la persona/entidad. Así también
    // cuentan las firmas antiguas importadas sin marca temporal; solo se ignoran filas vacías.
    if (!pdCell_(row, 0)) res.diag.filasSinMarcaTemporal++;
    if (
      !pdCell_(row, 0) &&
      !pdCell_(row, iName) &&
      !pdCell_(row, iSur) &&
      !pdCell_(row, iOrgName)
    ) {
      res.diag.filasSinDatos++;
      continue;
    }
    var rawType = pdCell_(row, iType) || "(vacío)";
    res.diag.tiposAdhesion[rawType] = (res.diag.tiposAdhesion[rawType] || 0) + 1;
    if (!isOrgRow(row)) {
      res.personas++;
      bump(pdCcaa_(pdCell_(row, iCcaa)), "adhesiones");
    } else {
      res.entidades++;
      var tipo = pdCell_(row, iOrgType) || "Sin indicar";
      res.tipos[tipo] = (res.tipos[tipo] || 0) + 1;
      var tn = pdNorm_(tipo);
      if (tn.indexOf("ayuntamiento") >= 0 || tn.indexOf("entidad local") >= 0) res.ayuntamientos++;
      bump(pdCcaa_(pdCell_(row, iOrgCcaa)), "entidades");

      // Se publica SOLO si la entidad se ha comprometido a hacer pública su adhesión
      // (y no está oculta). Si esa columna no existe, no se publica ninguna.
      var commit = pdNorm_(pdCell_(row, iPublic));
      var hidden = iHide >= 0 && pdYes_(pdCell_(row, iHide));
      var orgName = pdText_(pdCell_(row, iOrgName), 120);
      if (iPublic >= 0 && commit && !/^no\b/.test(commit) && !hidden && orgName) {
        res.entidadesLista.push({
          nombre: orgName,
          tipo: pdTipoEntidad_(tipo),
          ambito: pdCcaa_(pdCell_(row, iOrgCcaa)),
          alcance: pdText_(pdCell_(row, iAlcance), 100),
          web: pdUrl_(pdCell_(row, iWeb)),
        });
      }
    }
  }
  // Orden alfabético: todas las entidades tienen la misma visibilidad, sin ranking.
  res.entidadesLista.sort(function (x, y) {
    return x.nombre.localeCompare(y.nombre, "es");
  });
  res.entidadesLista = res.entidadesLista.slice(0, PD.LIST_ENTIDADES);

  // Últimas adhesiones individuales en formato anónimo, con el municipio existente.
  // No se publican nombres personales al no existir una columna de consentimiento específico.
  if (iName >= 0) {
    for (var k = t.rows.length - 1; k >= 0 && res.ultimas.length < PD.LIST_ADHESIONES; k--) {
      var rw = t.rows[k];
      if (isOrgRow(rw)) continue;
      if (!pdTidy_(pdCell_(rw, iName))) continue;
      var place = pdTidy_(pdCell_(rw, iCity)) || pdCcaa_(pdCell_(rw, iCcaa));
      res.ultimas.push({ nombre: "Persona adherida", municipio: place });
    }
  }
  return res;
}

// ───────────────────────────── voluntarios ─────────────────────────────

function pdVoluntarios_() {
  var t = pdReadTable_(pdOpen_(PD.VOLUNTARIOS_SPREADSHEET_ID), "codigo etico");
  if (!t) throw new Error("No encuentro la hoja de voluntarios.");
  var h = t.headers;
  var iCode = pdIdx_(h, pdHas_("codigo etico"));
  var iCcaa = pdIdx_(h, pdEq_("autonomia"));
  var iCity = pdIdx_(h, pdHas_("ciudad en la que vives"));
  var iName = pdIdx_(h, pdEq_("nombre y apellidos"));
  var iConsent = pdIdx_(h, pdHas_(PD.CONSENT_HEADER_TEXT), true);

  var res = {
    total: 0,
    ultimos: [],
    diag: { filasTotales: t.rows.length, aceptanCodigo: 0, noAceptan: 0 },
  };
  for (var r = 0; r < t.rows.length; r++) {
    var row = t.rows[r];
    if (!pdCell_(row, 0)) continue;
    if (iCode < 0 || pdYes_(pdCell_(row, iCode))) {
      res.total++;
      res.diag.aceptanCodigo++;
    } else {
      res.diag.noAceptan++;
    }
  }
  if (iConsent >= 0 && iName >= 0) {
    for (var k = t.rows.length - 1; k >= 0 && res.ultimos.length < PD.LIST_VOLUNTARIOS; k--) {
      var rw = t.rows[k];
      if (iCode >= 0 && !pdYes_(pdCell_(rw, iCode))) continue;
      if (!pdYes_(pdCell_(rw, iConsent))) continue;
      var parts = pdSplitFull_(pdCell_(rw, iName));
      var name = pdPublicName_(parts.given, parts.surnames);
      if (!name) continue;
      var place = pdTidy_(pdCell_(rw, iCity)) || pdCcaa_(pdCell_(rw, iCcaa));
      res.ultimos.push(place ? name + " · " + place : name);
    }
  }
  return res;
}

// ───────────────────────────── testimonios ─────────────────────────────

function pdRelacion_(raw) {
  var n = pdNorm_(raw);
  if (n.indexOf("soy persona dependiente") === 0) return "Persona dependiente";
  if (n.indexOf("profesional") >= 0) return "Profesional del cuidado";
  if (n) return "Familiar de persona dependiente";
  return "";
}

function pdPublicFullName_(given, surnames) {
  var g = pdClean_(given).split(" ").filter(Boolean);
  var s = pdClean_(surnames).split(" ").filter(Boolean);
  if (!g.length) return "";
  var firstName = g.slice(0, 2).map(pdCap_).join(" ");
  var firstSurname = "";
  for (var i = 0; i < s.length; i++) {
    if (!PD_PARTICLES[pdNorm_(s[i])]) { firstSurname = pdCap_(s[i]); break; }
  }
  return firstSurname ? firstName + " " + firstSurname : firstName;
}

function pdTestimonios_() {
  var t = pdReadTable_(
    pdOpen_(PD.TESTIMONIOS_SPREADSHEET_ID),
    "quieres que tu testimonio se pueda utilizar en medios de comunicacion o documentos publicos",
  );
  if (!t) throw new Error("No encuentro la hoja de testimonios.");

  var h = t.headers;
  var iUse = pdIdx_(h, pdHas_("quieres que tu testimonio se pueda utilizar en medios de comunicacion o documentos publicos"));
  var iDisplay = pdIdx_(h, function(x) { return x.indexOf("com vols apareixer") >= 0 || x.indexOf("como quieres aparecer") >= 0; });
  var iName = pdIdx_(h, pdHas_("nom nombre y dni"));
  if (iName < 0) iName = pdIdx_(h, pdHas_("nombre y dni"));
  var iCcaa = pdIdx_(h, pdEq_("autonomia"));
  var iCity = pdIdx_(h, pdHas_("ciudad en la que vives"));
  var iAuto = pdIdx_(h, pdHas_("que cosas deberian mejorar"));
  var iAsk = pdIdx_(h, pdHas_("que solicitasteis"));
  var iProblem = pdIdx_(h, pdHas_("cual es el problema principal"));
  var iMore = pdIdx_(h, pdHas_("quieres afegir alguna cosa mes"));

  // Todas las respuestas cuentan como recibidas. Para el carrusel público solo se usan
  // las que han respondido Sí al consentimiento de uso público. No se exponen otros datos.
  var res = { recibidos: t.rows.length, autorizados: 0, publicados: 0, lista: [], porCcaa: {} };

  for (var k = t.rows.length - 1; k >= 0; k--) {
    var row = t.rows[k];
    var autorizado = iUse >= 0 && pdYes_(pdCell_(row, iUse));
    if (autorizado) res.autorizados++;
    var ccaa = iCcaa >= 0 ? pdCcaa_(pdCell_(row, iCcaa)) : "";
    if (ccaa) res.porCcaa[ccaa] = (res.porCcaa[ccaa] || 0) + 1;
    if (!autorizado) continue;

    var text = "";
    var textCandidates = [iAuto, iProblem, iAsk, iMore];
    for (var q = 0; q < textCandidates.length; q++) {
      var idx = textCandidates[q];
      if (idx >= 0 && pdCell_(row, idx)) { text = pdCell_(row, idx); break; }
    }
    text = String(text || "").replace(/[\u0000-\u001F]/g, "").trim().slice(0, 1500);
    if (!text) continue;

    var displayChoice = iDisplay >= 0 ? pdNorm_(pdCell_(row, iDisplay)) : "";
    var anonymous = displayChoice.indexOf("anon") >= 0 || displayChoice.indexOf("anonima") >= 0;
    var author = "Anónima";
    if (!anonymous && iName >= 0) {
      var parts = pdSplitFull_(pdCell_(row, iName));
      author = pdPublicFullName_(parts.given, parts.surnames) || "Anónima";
    }
    var city = iCity >= 0 ? pdTidy_(pdCell_(row, iCity)) : "";

    res.publicados++;
    if (res.lista.length < PD.LIST_TESTIMONIOS) {
      res.lista.push({ texto: text, autor: author, contexto: city });
    }
  }
  return res;
}

// ───────────────────────────── mociones ─────────────────────────────

/**
 * Lee el registro de presentación de mociones.
 * - Presentadas: filas con entidad/ayuntamiento y comunidad autónoma.
 * - Aceptadas: resolución del pleno = "Aprobada" (se acepta también "Aceptada").
 * No se publican nombres de personas, teléfonos, justificantes ni otros datos privados.
 */
function pdMociones_() {
  var t = pdReadTable_(
    pdOpen_(PD.MOCIONES_SPREADSHEET_ID),
    "comunidad autonoma",
    PD.MOCIONES_SHEET_NAME,
  );
  if (!t) throw new Error("No encuentro la hoja de mociones.");
  var h = t.headers;
  var iEntidad = pdIdx_(h, pdHas_("nombre entidad local o ayuntamiento"));
  var iCcaa = pdIdx_(h, pdHas_("comunidad autonoma"));
  var iFecha = pdIdx_(h, pdHas_("fecha en que se ha presentado la mocion"));
  var iResol = pdIdx_(h, pdHas_("resolucion del pleno"));
  var iProvincia = pdIdx_(h, pdHas_("provincia"));

  var res = {
    total: 0,
    aceptadas: 0,
    municipiosAprobados: 0,
    porCcaa: {},
    municipios: [],
    _municipiosAprobados: {},
    diag: {
      pestanaLeida: t.sheet.getName(),
      filasTotales: t.rows.length,
      filasConComunidad: 0,
      aceptadas: 0,
      resoluciones: {},
      municipiosAprobados: 0,
    },
  };

  function bump(ccaa, key) {
    if (!ccaa) return;
    if (!res.porCcaa[ccaa]) {
      res.porCcaa[ccaa] = { mocionesPresentadas: 0, mocionesAceptadas: 0 };
    }
    res.porCcaa[ccaa][key]++;
  }

  for (var r = 0; r < t.rows.length; r++) {
    var row = t.rows[r];
    var entidad = pdCell_(row, iEntidad);
    var ccaa = pdCcaa_(pdCell_(row, iCcaa));
    var fecha = pdCell_(row, iFecha);
    var resol = pdCell_(row, iResol);
    var provincia = pdCell_(row, iProvincia);

    // Cada registro de la hoja representa una moción. Exigimos al menos una
    // entidad/ayuntamiento o una fecha y una comunidad reconocible.
    if (!ccaa || (!entidad && !fecha)) continue;
    res.total++;
    res.diag.filasConComunidad++;
    bump(ccaa, "mocionesPresentadas");

    var normalized = pdNorm_(resol);
    if (normalized) {
      res.diag.resoluciones[resol] = (res.diag.resoluciones[resol] || 0) + 1;
    }
    var estado = "presentada";
    if (/^(aprobada|aceptada)\b/.test(normalized)) estado = "aprobada";
    else if (/^(rechazada|denegada|no aprobada)\b/.test(normalized)) estado = "rechazada";
    if (entidad) res.municipios.push({ municipio: entidad, provincia: provincia, estado: estado, mociones: 1 });
    if (estado === "aprobada") {
      res.aceptadas++;
      res.diag.aceptadas++;
      bump(ccaa, "mocionesAceptadas");
      var municipioKey = pdNorm_(entidad);
      if (municipioKey && !res._municipiosAprobados[municipioKey]) {
        res._municipiosAprobados[municipioKey] = true;
        res.municipiosAprobados++;
      }
    }
  }
  res.diag.municipiosAprobados = res.municipiosAprobados;
  delete res._municipiosAprobados;
  return res;
}


// ───────────────────────────── indicadores públicos ─────────────────────────────

var PD_INDICADORES_HEADERS = [
  "Clave", "Indicador", "Valor", "Unidad", "Fuente", "URL fuente",
  "Fecha del dato", "Última actualización", "Modo", "Notas"
];

function pdIndicadoresSheet_() {
  var ss = pdOpen_(PD.MOCIONES_SPREADSHEET_ID);
  var sh = ss.getSheetByName(PD.INDICADORES_SHEET_NAME);
  if (!sh) sh = ss.insertSheet(PD.INDICADORES_SHEET_NAME);
  if (sh.getLastRow() === 0) sh.getRange(1, 1, 1, PD_INDICADORES_HEADERS.length).setValues([PD_INDICADORES_HEADERS]);
  return sh;
}

function pdParseIntEs_(s) {
  var m = String(s || '').replace(/&nbsp;/g, ' ').match(/(\d{1,3}(?:[.\s]\d{3})+|\d+)/);
  if (!m) return null;
  var n = Number(m[1].replace(/[.\s]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function pdFetchSaad_() {
  var html = UrlFetchApp.fetch(PD.SAAD_SOURCE_URL, { muteHttpExceptions: true }).getContentText('UTF-8');
  var waitMatch = html.match(/lista de espera(?:[\s\S]{0,1800}?)(\d{1,3}(?:[.\s]\d{3})+)\s+personas/i);
  var daysMatch = html.match(/tiempo medio de (?:gesti[oó]n|tramitaci[oó]n)[\s\S]{0,1200}?(\d{2,4})\s+d[ií]as/i);
  var wait = waitMatch ? pdParseIntEs_(waitMatch[1]) : null;
  var days = daysMatch ? Number(daysMatch[1]) : null;
  if (!wait || !days) throw new Error('No se han podido extraer los datos del Panel SAAD.');
  return { wait: wait, days: days, months: Math.round((days / 30.4375) * 10) / 10 };
}

function pdWriteIndicator_(sh, key, title, value, unit, source, url, dataDate, mode, notes) {
  var values = sh.getDataRange().getDisplayValues();
  var row = -1;
  for (var i = 1; i < values.length; i++) if (pdNorm_(values[i][0]) === pdNorm_(key)) { row = i + 1; break; }
  if (row < 0) row = sh.getLastRow() + 1;
  sh.getRange(row, 1, 1, 10).setValues([[
    key, title, value == null ? '' : value, unit, source, url, dataDate || '', new Date(), mode || '', notes || ''
  ]]);
  sh.getRange(row, 8).setNumberFormat('dd/MM/yyyy HH:mm');
}

/**
 * Crea/actualiza la pestaña Indicadores de la hoja de mociones.
 * Los dos indicadores SAAD se refrescan desde la página oficial del Ministerio.
 * El indicador de cuidadores usa el último informe oficial disponible en el código.
 * El número de municipios aprobados se calcula a partir de la pestaña presentades.
 */
function actualizarIndicadores() {
  var sh = pdIndicadoresSheet_();
  var now = new Date();
  var saad = null;
  try {
    saad = pdFetchSaad_();
  } catch (e) {
    // Si la web oficial cambia temporalmente su HTML, conservamos el último valor válido.
    saad = { wait: 142887, days: 314, months: 10.3 };
  }
  pdWriteIndicator_(sh, 'lista_espera', 'Personas en lista de espera de servicios de dependencia', saad.wait, 'personas', 'Ministerio de Derechos Sociales, Consumo y Agenda 2030 — Panel SAAD', PD.SAAD_SOURCE_URL, '30/06/2026', 'automático', 'Situación hasta junio de 2026.');
  pdWriteIndicator_(sh, 'tiempo_tramitacion', 'Tiempo medio desde la solicitud hasta la resolución', saad.months, 'meses', 'Ministerio de Derechos Sociales, Consumo y Agenda 2030 — Panel SAAD', PD.SAAD_SOURCE_URL, '30/06/2026', 'automático', saad.days + ' días; convertido a meses (30,4375 días/mes).');
  pdWriteIndicator_(sh, 'cuidadores_convenio', 'Cuidadores no profesionales con convenio especial de Seguridad Social', 101702, 'personas', 'IMSERSO — Informe de empleo en el sector Servicios Sociales, 1º trimestre de 2026', PD.CUIDADORES_SOURCE_URL, '31/03/2026', 'fuente oficial', 'No se publica como porcentaje de cuidadores sin apoyo formal porque no existe un denominador estatal comparable en la fuente.');
  var m = pdMociones_();
  pdWriteIndicator_(sh, 'municipios_mociones_aprobadas', 'Municipios con mociones aprobadas a favor del Pacto', m.municipiosAprobados, 'municipios', 'Plataforma Dorada — registro de mociones', '', Utilities.formatDate(now, Session.getScriptTimeZone() || 'Europe/Madrid', 'dd/MM/yyyy'), 'automático', 'Cuenta municipios/entidades locales únicos con resolución Aprobada o Aceptada.');
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, 10).setFontWeight('bold');
  return 'Indicadores actualizados: ' + sh.getLastRow() + ' filas.';
}

/** Ejecutar UNA VEZ: crea la hoja Indicadores y programa una actualización diaria. */
function setupIndicadores() {
  actualizarIndicadores();
  var exists = ScriptApp.getProjectTriggers().some(function(t) { return t.getHandlerFunction() === 'actualizarIndicadores'; });
  if (!exists) {
    ScriptApp.newTrigger('actualizarIndicadores').timeBased().everyDays(1).atHour(4).create();
  }
  return 'Hoja Indicadores creada/actualizada y actualización diaria configurada.';
}


function pdIndicadoresPublic_() {
  var ss = pdOpen_(PD.MOCIONES_SPREADSHEET_ID);
  var sh = ss.getSheetByName(PD.INDICADORES_SHEET_NAME);
  if (!sh || sh.getLastRow() < 2) return {};
  var rows = sh.getDataRange().getDisplayValues();
  var out = {};
  for (var i = 1; i < rows.length; i++) {
    var key = pdNorm_(rows[i][0]);
    if (!key) continue;
    var raw = rows[i][2];
    var n = raw === '' ? null : Number(String(raw).replace(/\./g, '').replace(',', '.'));
    out[key] = {
      valor: Number.isFinite(n) ? n : (raw || null),
      unidad: rows[i][3] || '',
      fuente: rows[i][4] || '',
      url: rows[i][5] || '',
      fechaDato: rows[i][6] || '',
      actualizado: rows[i][7] || '',
      modo: rows[i][8] || '',
      nota: rows[i][9] || ''
    };
  }
  return out;
}

// ───────────────────────────── resumen web ─────────────────────────────
function pdResumenWeb_() {
  try {
    var ss = pdOpen_(PD.ADHESIONES_SPREADSHEET_ID);
    var sh = ss.getSheetByName("Resumen");
    if (!sh) return [];
    var range = ss.getRangeByName("web");
    var values = range ? range.getDisplayValues() : sh.getDataRange().getDisplayValues();
    if (!values.length) return [];
    // Preferimos una tabla con cabeceras reconocibles. Si no existen, buscamos dos columnas con CCAA + adhesiones.
    var header = values[0].map(pdNorm_);
    var cc = -1, ad = -1;
    for (var i=0;i<header.length;i++) {
      if (cc < 0 && (header[i].indexOf("comunidad autonoma") >= 0 || header[i] === "comunidad")) cc=i;
      if (ad < 0 && header[i].indexOf("adhesion") >= 0) ad=i;
    }
    var start = (cc >= 0 && ad >= 0) ? 1 : 0;
    if (cc < 0 || ad < 0) {
      // En un rango web de dos columnas, son comunidad + adhesiones.
      cc = 0; ad = 1;
    }
    var out=[];
    for (var r=start;r<values.length;r++) {
      var comunidad=String(values[r][cc]||"").trim();
      var raw=String(values[r][ad]||"").replace(/[^0-9-]/g,"");
      var adhesiones=Number(raw);
      if (!comunidad || !Number.isFinite(adhesiones)) continue;
      out.push({comunidad: comunidad, adhesiones: adhesiones});
    }
    return out;
  } catch (e) {
    console.error("resumen web: "+e);
    return [];
  }
}

// ───────────────────────────── ensamblado ─────────────────────────────

function pdSafe_(name, fn, errors) {
  try {
    return fn();
  } catch (err) {
    console.error(name + ": " + err);
    errors.push(name);
    return null;
  }
}

function buildPublicStats_() {
  var errors = [];
  var a = pdSafe_("adhesiones", pdAdhesiones_, errors);
  var v = pdSafe_("voluntarios", pdVoluntarios_, errors);
  var t = pdSafe_("testimonios", pdTestimonios_, errors);
  var m = pdSafe_("mociones", pdMociones_, errors);

  var out = {
    ok: errors.length === 0,
    errores: errors,
    actualizado: new Date().toISOString(),
    contadores: {
      adhesiones: a ? a.personas : null,
      entidades: a ? a.entidades : null,
      ayuntamientos: a ? a.ayuntamientos : null,
      voluntarios: v ? v.total : null,
      testimoniosRecibidos: t ? t.recibidos : null,
      testimoniosAutorizados: t ? t.autorizados : null,
      testimoniosPublicados: t ? t.publicados : null,
      mocionesPresentadas: m ? m.total : null,
    },
    tiposOrganizacion: a ? a.tipos : {},
    porComunidad: a ? a.porCcaa : {},
    mociones: m ? m.porCcaa : {},
    mocionesMunicipios: m ? m.municipios : [],
    indicadores: pdIndicadoresPublic_(),
    ultimasAdhesiones: a ? a.ultimas : [],
    entidadesAdheridas: a ? a.entidadesLista : [],
    ultimosVoluntarios: v ? v.ultimos : [],
    testimonios: t ? t.lista : [],
    testimoniosPorComunidad: t ? t.porCcaa : {},
    resumenWeb: pdResumenWeb_(),
  };
  if (PD.INCLUDE_DIAGNOSTICO) out.diagnostico = pdDiagnostico_(a, v, t, m);
  return out;
}

/** Recuentos para depurar (sin datos personales). Ver INCLUDE_DIAGNOSTICO. */
function pdDiagnostico_(a, v, t, m) {
  return {
    adhesiones: a ? a.diag : null,
    entidadesTipoRaw: a ? a.tipos : null,
    voluntarios: v ? v.diag : null,
    testimonios: t ? { filasTotales: t.recibidos, autorizados: t.autorizados, publicados: t.publicados } : null,
    mociones: m ? m.diag : null,
  };
}

function getPublicStats_() {
  var cache = CacheService.getScriptCache();
  var hit = cache.get("pd_public_v1");
  if (hit) return JSON.parse(hit);
  var stats = buildPublicStats_();
  // Solo se guarda en caché si todo ha ido bien, para no "fijar" un fallo.
  if (stats.ok) {
    try {
      cache.put("pd_public_v1", JSON.stringify(stats), PD.CACHE_SECONDS);
    } catch (e) {
      /* >100 KB */
    }
  }
  return stats;
}

/**
 * Ejecutar UNA VEZ a mano desde el editor: añade a la hoja de testimonios las tres
 * columnas de moderación (si no existen). El equipo las rellena; el formulario no las toca.
 */
function setupPublico() {
  var ss = pdOpen_(PD.TESTIMONIOS_SPREADSHEET_ID);
  var t = pdReadTable_(ss, "quieres que tu testimonio se pueda utilizar en medios de comunicacion o documentos publicos");
  if (!t) throw new Error("No encuentro la hoja de testimonios.");
  var sheet = t.sheet;
  var wanted = ["Publicar en web", "Texto web", "Ocultar"];
  wanted.forEach(function (title) {
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0].map(pdNorm_);
    if (headers.indexOf(pdNorm_(title)) >= 0) return;
    var col = sheet.getLastColumn() + 1;
    sheet.getRange(1, col).setValue(title);
    if (title !== "Texto web") {
      var rule = SpreadsheetApp.newDataValidation().requireValueInList(["Sí", "No"], true).build();
      sheet.getRange(2, col, Math.max(sheet.getMaxRows() - 1, 1), 1).setDataValidation(rule);
    }
  });
  return "Columnas de moderación preparadas.";
}
