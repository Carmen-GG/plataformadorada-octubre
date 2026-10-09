/**
 * Plataforma Dorada — gestión de vídeos del archivo audiovisual.
 * Añadir este archivo al mismo proyecto de Google Apps Script que sirve el backoffice.
 */

function videoSheet_() {
  // Los datos editoriales de la web van siempre al spreadsheet CMS, nunca a Firmantes.
  var ss = SpreadsheetApp.openById("1nNK3t4_jrJf9n1bUs1W-bg09-zprzKsZ3KRfFPSoyC4");
  var sheet = ss.getSheetByName("VideosWeb");
  var headers = ["id", "title", "description", "url", "platform", "order", "published", "created"];
  if (!sheet) {
    sheet = ss.insertSheet("VideosWeb");
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  } else if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function videoPlatform_(url) {
  var value = String(url || '').trim();
  if (/^https?:\/\/(www\.)?youtube\.com\//i.test(value) || /^https?:\/\/(www\.)?youtu\.be\//i.test(value)) return 'youtube';
  if (/^https?:\/\/(www\.)?facebook\.com\//i.test(value) || /^https?:\/\/(www\.)?fb\.watch\//i.test(value)) return 'facebook';
  throw new Error('El enlace debe ser de YouTube o Facebook.');
}

function videoRows_() {
  var sheet = videoSheet_();
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getDisplayValues().map(function(r) {
    return {
      id: String(r[0] || ''),
      title: String(r[1] || ''),
      description: String(r[2] || ''),
      url: String(r[3] || ''),
      platform: String(r[4] || 'youtube'),
      order: Number(r[5] || 0),
      published: !/^(no|false|0)$/i.test(String(r[6] || '').trim()),
      created: String(r[7] || '')
    };
  });
}

function readVideos_() {
  return videoRows_().filter(function(v) { return v.published && v.url; })
    .sort(function(a, b) { return a.order - b.order; })
    .map(function(v) {
      return { id: v.id, title: v.title, description: v.description, url: v.url, platform: v.platform, order: v.order, published: true };
    });
}

function getVideosForBackoffice(data) {
  assertAdmin_(data && data.password);
  return videoRows_().sort(function(a, b) { return a.order - b.order; });
}

function saveVideo(data) {
  assertAdmin_(data && data.password);
  var title = String(data.title || '').trim();
  var description = String(data.description || '').trim();
  var url = String(data.url || '').trim();
  if (!title) throw new Error('Escribe un título para el vídeo.');
  if (!url) throw new Error('Pega el enlace del vídeo.');
  var platform = videoPlatform_(url);
  var sheet = videoSheet_();
  var id = String(data.id || '').trim();
  var values = sheet.getDataRange().getValues();
  var row = -1;
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === id && id) { row = i + 1; break; }
  }
  var record = [
    id || Utilities.getUuid(),
    title,
    description,
    url,
    platform,
    Number(data.order || 0),
    data.published === false ? 'No' : 'Sí',
    row > 0 ? values[row - 1][7] : new Date().toISOString()
  ];
  if (row > 0) sheet.getRange(row, 1, 1, record.length).setValues([record]);
  else sheet.appendRow(record);
  return { ok: true, id: record[0] };
}

function deleteVideo(data) {
  assertAdmin_(data && data.password);
  var sheet = videoSheet_();
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id || '')) {
      sheet.deleteRow(i + 1);
      return { ok: true };
    }
  }
  throw new Error('No se ha encontrado el vídeo.');
}

function setupVideoBackoffice() {
  var sheet = videoSheet_();
  // Primera instalación: cargar los cuatro vídeos actuales como registros editables.
  if (sheet.getLastRow() < 2) {
    var now = new Date().toISOString();
    sheet.getRange(2, 1, 4, 8).setValues([
      [Utilities.getUuid(), 'Plataforma Dorada · Vídeo 1', 'Vídeo de YouTube', 'https://www.youtube.com/watch?v=-s3pZV8apaY', 'youtube', 1, 'Sí', now],
      [Utilities.getUuid(), 'Plataforma Dorada · Vídeo 2', 'Vídeo de YouTube', 'https://www.youtube.com/watch?v=5sbiaLrUKjM', 'youtube', 2, 'Sí', now],
      [Utilities.getUuid(), '¿Qué es Plataforma Dorada?', 'Vídeo publicado en Facebook por Assumpta Serna y Alicia Lopmar', 'https://www.facebook.com/100058237623701/videos/ya-sab%C3%A9is-qu%C3%A9-es-plataforma-dorada-assumptaserna-y-alicialopmar-est%C3%A1n-denunciand/1070927795538559/', 'facebook', 3, 'Sí', now],
      [Utilities.getUuid(), '3 millones de visualizaciones y más de 2.100 testimonios', 'Vídeo de Assumpta Serna en Facebook', 'https://www.facebook.com/assumptaserna/videos/nunca-imagin%C3%A9-esto-y-aqu%C3%AD-estamos3-millones-de-visualizaciones-2100-testimonios-/1690736175986098/', 'facebook', 4, 'Sí', now]
    ]);
  }
  return 'Pestaña VideosWeb preparada';
}
