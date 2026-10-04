/**
 * Plataforma Dorada — contador + contenido público + pequeño backoffice.
 *
 * El mismo Web App sirve para:
 *  - GET normal: contador de adhesiones.
 *  - GET ?action=content: noticias y recursos publicados (solo datos públicos).
 *  - GET ?view=admin: panel de gestión HTML.
 *
 * El panel de gestión guarda noticias en la hoja "NoticiasWeb" y los archivos
 * en una carpeta de Google Drive. La hoja de respuestas y sus datos personales
 * nunca se devuelven al navegador público.
 */

function doGet(e) {
  var params = (e && e.parameter) || {};

  if (params.view === 'admin') {
    return HtmlService.createHtmlOutputFromFile('admin')
      .setTitle('Plataforma Dorada · Backoffice')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  // Solo se admiten nombres de función JSONP válidos (evita inyectar código).
  var callback = /^[A-Za-z_$][\w$.]*$/.test(params.callback || '') ? params.callback : '';
  var action = params.action || 'count';

  var payload;
  if (action === 'content') {
    payload = getPublicContent_();
  } else if (action === 'public') {
    // Cifras y listas públicas de adhesiones, voluntarios y testimonios (ver publico.gs).
    payload = getPublicStats_();
  } else {
    payload = {
      adhesiones: countAllAdhesions_(),
      actualizado: new Date().toISOString()
    };
  }

  return outputJson_(payload, callback);
}

function outputJson_(payload, callback) {
  var json = JSON.stringify(payload);
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function countAllAdhesions_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Firmantes');
  if (sheet) return Math.max(0, sheet.getLastRow() - 1);

  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var current = sheets[i];
    var lastColumn = current.getLastColumn();
    if (!lastColumn) continue;
    var headers = current.getRange(1, 1, 1, lastColumn).getDisplayValues()[0];
    var hasAdhesion = headers.some(function(h) {
      var text = String(h).toLowerCase();
      return text.indexOf('privacidad') >= 0 || text.indexOf('adherirte') >= 0;
    });
    if (hasAdhesion) return Math.max(0, current.getLastRow() - 1);
  }
  return 0;
}

function getPublicContent_() {
  return {
    noticias: readNews_(),
    recursos: readResources_(),
    actualizado: new Date().toISOString()
  };
}

function getOrCreateSheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function readNews_() {
  var sheet = getOrCreateSheet_('NoticiasWeb', ['id', 'titulo', 'medio', 'fecha', 'url', 'resumen', 'publicada', 'creada']);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  var values = sheet.getRange(2, 1, lastRow - 1, 8).getDisplayValues();
  return values.filter(function(r) { return String(r[6]).toLowerCase() !== 'no'; }).map(function(r) {
    return { id: r[0], title: r[1], media: r[2], date: r[3], url: r[4], summary: r[5] };
  }).reverse();
}

function readResources_() {
  var sheet = getOrCreateSheet_('RecursosWeb', ['id', 'titulo', 'categoria', 'descripcion', 'archivo', 'url', 'creado']);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  var values = sheet.getRange(2, 1, lastRow - 1, 7).getDisplayValues();
  return values.map(function(r) {
    return { id: r[0], title: r[1], category: r[2], description: r[3], filename: r[4], url: r[5] };
  }).reverse();
}

function getDriveFolder_() {
  var props = PropertiesService.getScriptProperties();
  var folderId = props.getProperty('RECURSOS_FOLDER_ID');
  if (folderId) return DriveApp.getFolderById(folderId);

  var folders = DriveApp.getFoldersByName('Plataforma Dorada - Recursos');
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder('Plataforma Dorada - Recursos');
  folderId = folder.getId();
  props.setProperty('RECURSOS_FOLDER_ID', folderId);
  return folder;
}

function checkPassword(password) {
  var expected = PropertiesService.getScriptProperties().getProperty('BACKOFFICE_PASSWORD');
  if (!expected) throw new Error('El backoffice aún no tiene contraseña configurada.');
  if (String(password || '') !== expected) throw new Error('Contraseña incorrecta.');
  return true;
}

function getPublicContent() {
  return getPublicContent_();
}

function setupBackoffice() {
  getOrCreateSheet_('NoticiasWeb', ['id', 'titulo', 'medio', 'fecha', 'url', 'resumen', 'publicada', 'creada']);
  getOrCreateSheet_('RecursosWeb', ['id', 'titulo', 'categoria', 'descripcion', 'archivo', 'url', 'creado']);
  getDriveFolder_();
  return 'Backoffice preparado';
}

function saveNews(data) {
  assertAdmin_(data && data.password);
  var sheet = getOrCreateSheet_('NoticiasWeb', ['id', 'titulo', 'medio', 'fecha', 'url', 'resumen', 'publicada', 'creada']);
  var id = Utilities.getUuid();
  sheet.appendRow([
    id,
    String(data.title || '').trim(),
    String(data.media || '').trim(),
    String(data.date || '').trim(),
    String(data.url || '').trim(),
    String(data.summary || '').trim(),
    data.published === false ? 'No' : 'Sí',
    new Date().toISOString()
  ]);
  return { ok: true, id: id };
}

function saveResource(data) {
  assertAdmin_(data && data.password);
  if (!data.fileName || !data.base64) throw new Error('Falta el archivo.');

  var bytes = Utilities.base64Decode(data.base64);
  if (bytes.length > 10 * 1024 * 1024) throw new Error('El archivo supera el límite de 10 MB.');

  var blob = Utilities.newBlob(bytes, data.mimeType || 'application/octet-stream', data.fileName);
  var folder = getDriveFolder_();
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  var sheet = getOrCreateSheet_('RecursosWeb', ['id', 'titulo', 'categoria', 'descripcion', 'archivo', 'url', 'creado']);
  var id = Utilities.getUuid();
  sheet.appendRow([
    id,
    String(data.title || data.fileName).trim(),
    String(data.category || 'Materiales').trim(),
    String(data.description || '').trim(),
    data.fileName,
    'https://drive.google.com/uc?export=download&id=' + file.getId(),
    new Date().toISOString()
  ]);
  return { ok: true, id: id, url: 'https://drive.google.com/uc?export=download&id=' + file.getId() };
}

function deleteNews(data) {
  assertAdmin_(data && data.password);
  return deleteRowById_('NoticiasWeb', data.id);
}

function deleteResource(data) {
  assertAdmin_(data && data.password);
  var sheet = getOrCreateSheet_('RecursosWeb', ['id', 'titulo', 'categoria', 'descripcion', 'archivo', 'url', 'creado']);
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      var url = String(values[i][5]);
      var match = url.match(/id=([^&]+)/);
      if (match) {
        try { DriveApp.getFileById(match[1]).setTrashed(true); } catch (err) {}
      }
      sheet.deleteRow(i + 1);
      return { ok: true };
    }
  }
  throw new Error('Recurso no encontrado.');
}

function deleteRowById_(sheetName, id) {
  var sheet = getOrCreateSheet_(sheetName, []);
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      sheet.deleteRow(i + 1);
      return { ok: true };
    }
  }
  throw new Error('Registro no encontrado.');
}

function assertAdmin_(password) {
  var expected = PropertiesService.getScriptProperties().getProperty('BACKOFFICE_PASSWORD');
  if (!expected) throw new Error('El backoffice aún no tiene contraseña configurada. Ejecuta setupBackofficePassword una vez.');
  if (String(password || '') !== expected) throw new Error('Contraseña incorrecta.');
}
