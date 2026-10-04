/**
 * MAPA AUTOMÁTICO - PLATAFORMA DORADA
 * V3 - adaptado a la estructura REAL del Google Form.
 *
 * Hoja:
 * 15HvL9Mu5r9iSGq4sJ2vYTlrkDY3SubfEOxYCmGL10Kg
 *
 * Se utiliza:
 * - NOMBRE ENTIDAD LOCAL O AYUNTAMIENTO... -> ubicación del punto
 * - NOMBRE Y APELLIDOS DE LA PERSONA VOLUNTARIA -> creador/color
 */

const CONFIG = {
  SPREADSHEET_ID: '15HvL9Mu5r9iSGq4sJ2vYTlrkDY3SubfEOxYCmGL10Kg',
  SHEET_GID: 1968860899,

  // Encabezado REAL del formulario que contiene el municipio/ayuntamiento.
  MUNICIPIO_HEADER:
    'NOMBRE ENTIDAD LOCAL O AYUNTAMIENTO EN LA QUE SE HA PRESENTADO LA MOCIÓN',

  // Encabezado REAL del formulario que identifica al creador.
  CREADOR_HEADER:
    'NOMBRE Y APELLIDOS DE LA PERSONA VOLUNTARIA'
};

function doGet() {
  return HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Mapa Plataforma Dorada')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getMapData() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

  const sheet = ss.getSheets().find(
    s => s.getSheetId() === CONFIG.SHEET_GID
  );

  if (!sheet) {
    throw new Error(
      'No se encuentra la pestaña indicada por el gid ' +
      CONFIG.SHEET_GID
    );
  }

  const values = sheet.getDataRange().getDisplayValues();

  if (values.length < 2) return [];

  const headers = values[0].map(h => String(h).trim());

  const municipioIndex = findHeader_(
    headers,
    CONFIG.MUNICIPIO_HEADER
  );

  const creadorIndex = findHeader_(
    headers,
    CONFIG.CREADOR_HEADER
  );

  if (municipioIndex === -1) {
    throw new Error(
      'No encuentro la columna de municipio/ayuntamiento. ' +
      'Encabezados encontrados: ' + headers.join(' | ')
    );
  }

  if (creadorIndex === -1) {
    throw new Error(
      'No encuentro la columna de persona voluntaria. ' +
      'Encabezados encontrados: ' + headers.join(' | ')
    );
  }

  const geoCache = PropertiesService.getScriptProperties();
  const records = [];

  for (let r = 1; r < values.length; r++) {
    const row = values[r];

    const municipio = String(row[municipioIndex] || '').trim();
    const creador = String(row[creadorIndex] || '').trim();

    if (!municipio) continue;

    const cacheKey = 'GEO_' + normalize_(municipio);

    let geo = null;
    const cached = geoCache.getProperty(cacheKey);

    if (cached) {
      try {
        geo = JSON.parse(cached);
      } catch (e) {}
    }

    if (!geo) {
      geo = geocodeMunicipio_(municipio);

      if (geo) {
        geoCache.setProperty(
          cacheKey,
          JSON.stringify(geo)
        );
      }
    }

    if (!geo) continue;

    records.push({
      lat: geo.lat,
      lng: geo.lng,
      municipio: municipio,
      creador: creador || 'Sin persona voluntaria',
      fila: r + 1
    });
  }

  return spreadDuplicatePoints_(records);
}

function geocodeMunicipio_(municipio) {
  try {
    const result = Maps.newGeocoder()
      .setLanguage('es')
      .setRegion('es')
      .geocode(municipio + ', España');

    if (
      result.status !== 'OK' ||
      !result.results ||
      !result.results.length
    ) {
      return null;
    }

    const location = result.results[0].geometry.location;

    return {
      lat: location.lat,
      lng: location.lng
    };

  } catch (e) {
    console.error(
      'Error geocodificando ' + municipio + ': ' + e
    );
    return null;
  }
}

/*
 * Si hay varios registros en el mismo municipio,
 * desplaza ligeramente los puntos para que se puedan
 * distinguir visualmente.
 */
function spreadDuplicatePoints_(records) {
  const groups = {};

  records.forEach(item => {
    const key =
      item.lat.toFixed(5) + ',' +
      item.lng.toFixed(5);

    if (!groups[key]) groups[key] = [];

    groups[key].push(item);
  });

  Object.values(groups).forEach(group => {
    if (group.length <= 1) return;

    const radius = 0.0012;
    const step = (Math.PI * 2) / group.length;

    group.forEach((item, i) => {
      item.lat += Math.sin(i * step) * radius;
      item.lng += Math.cos(i * step) * radius;
    });
  });

  return records;
}

function findHeader_(headers, wanted) {
  const target = normalize_(wanted);

  return headers.findIndex(
    h => normalize_(h) === target
  );
}

function normalize_(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}
