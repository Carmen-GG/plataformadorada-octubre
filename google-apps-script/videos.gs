/**
 * Plataforma Dorada — archivo audiovisual y categorías editables desde el backoffice.
 * Las categorías y los vídeos se guardan en el spreadsheet CMS.
 */
function videoSpreadsheet_() {
  return SpreadsheetApp.openById("1nNK3t4_jrJf9n1bUs1W-bg09-zprzKsZ3KRfFPSoyC4");
}
function videoSheet_() {
  var ss = videoSpreadsheet_();
  var sheet = ss.getSheetByName("VideosWeb");
  var headers = ["id", "title", "description", "url", "platform", "order", "published", "created", "category"];
  if (!sheet) sheet = ss.insertSheet("VideosWeb");
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  else {
    // Compatibilidad con la versión anterior de VideosWeb: se añade category al final.
    var existing = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getDisplayValues()[0];
    if (existing.indexOf("category") < 0) {
      sheet.getRange(1, existing.length + 1).setValue("category");
    }
  }
  sheet.setFrozenRows(1);
  return sheet;
}
function videoCategoriesSheet_() {
  var ss = videoSpreadsheet_();
  var sheet = ss.getSheetByName("CategoriasVideosWeb");
  var headers = ["id", "name", "description", "order", "published", "created"];
  if (!sheet) sheet = ss.insertSheet("CategoriasVideosWeb");
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
  if (sheet.getLastRow() < 2) {
    var now = new Date().toISOString();
    sheet.getRange(2, 1, 4, 6).setValues([
      ["residencias", "Residències", "Qualitat assistencial, llistes d'espera, condicions de vida, inspeccions i alternatives.", 1, "Sí", now],
      ["cuidadores", "Persones cuidadores", "Sobrecàrrega, conciliació, salut emocional, drets laborals i reconeixement.", 2, "Sí", now],
      ["dependencia", "Dependència", "Llei de dependència, valoracions, ajuts, atenció domiciliària i finançament.", 3, "Sí", now],
      ["actualidad", "Actualitat", "Notícies, propostes polítiques, iniciatives ciutadanes, mobilitzacions i pactes.", 4, "Sí", now]
    ]);
  }
  return sheet;
}
function videoPlatform_(url) {
  var value = String(url || '').trim();
  if (/^https?:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com)\//i.test(value) || /^https?:\/\/(www\.)?youtu\.be\//i.test(value)) return 'youtube';
  if (/^https?:\/\/(www\.)?facebook\.com\//i.test(value) || /^https?:\/\/(www\.)?fb\.watch\//i.test(value)) return 'facebook';
  throw new Error('El enlace debe ser de YouTube o Facebook.');
}
function videoRows_() {
  var sheet = videoSheet_();
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 9).getDisplayValues().map(function(r) {
    return { id:String(r[0]||''), title:String(r[1]||''), description:String(r[2]||''), url:String(r[3]||''), platform:String(r[4]||'youtube'), order:Number(r[5]||0), published:!/^(no|false|0)$/i.test(String(r[6]||'').trim()), created:String(r[7]||''), category:String(r[8]||'actualidad') };
  });
}
function videoCategoryRows_(includeHidden) {
  var sheet = videoCategoriesSheet_();
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getDisplayValues().map(function(r) {
    return {id:String(r[0]||''), name:String(r[1]||''), description:String(r[2]||''), order:Number(r[3]||0), published:!/^(no|false|0)$/i.test(String(r[4]||'').trim()), created:String(r[5]||'')};
  }).filter(function(c){return c.id && c.name && (includeHidden || c.published);}).sort(function(a,b){return a.order-b.order;});
}
function readVideoCategories_() {
  return videoCategoryRows_(false).map(function(c){return {id:c.id,name:c.name,description:c.description,order:c.order,published:true};});
}
function readVideos_() {
  return videoRows_().filter(function(v){return v.published && v.url;}).sort(function(a,b){return a.order-b.order;})
    .map(function(v){return {id:v.id,title:v.title,description:v.description,url:v.url,platform:v.platform,order:v.order,published:true,category:v.category};});
}
function getVideosForBackoffice(data) { assertAdmin_(data && data.password); return videoRows_().sort(function(a,b){return a.order-b.order;}); }
function getVideoCategoriesForBackoffice(data) { assertAdmin_(data && data.password); return videoCategoryRows_(true); }
function saveVideoCategory(data) {
  assertAdmin_(data && data.password);
  var name=String(data.name||'').trim(), description=String(data.description||'').trim();
  if(!name) throw new Error('Escribe el nombre de la categoría.');
  var sheet=videoCategoriesSheet_(), values=sheet.getDataRange().getValues(), id=String(data.id||'').trim(), row=-1;
  for(var i=1;i<values.length;i++) if(String(values[i][0])===id && id){row=i+1;break;}
  var slug=String(data.slug||'').trim().toLowerCase().replace(/[^a-z0-9-]+/g,'-').replace(/^-|-$/g,'');
  if(!id) id=slug || Utilities.getUuid();
  if(row<0) for(var j=1;j<values.length;j++) if(String(values[j][0])===id) throw new Error('Ya existe una categoría con ese identificador.');
  var record=[id,name,description,Number(data.order||0),data.published===false?'No':'Sí',row>0?values[row-1][5]:new Date().toISOString()];
  if(row>0) sheet.getRange(row,1,1,6).setValues([record]); else sheet.appendRow(record);
  return {ok:true,id:id};
}
function deleteVideoCategory(data) {
  assertAdmin_(data && data.password);
  var id=String(data.id||'');
  var videos=videoRows_();
  if(videos.some(function(v){return v.category===id;})) throw new Error('Aquesta categoria té vídeos assignats. Reassigna’ls a una altra categoria abans d’eliminar-la.');
  var sheet=videoCategoriesSheet_(), values=sheet.getDataRange().getValues();
  for(var i=1;i<values.length;i++) if(String(values[i][0])===id){sheet.deleteRow(i+1);return {ok:true};}
  throw new Error('No se ha encontrado la categoría.');
}
function saveVideo(data) {
  assertAdmin_(data && data.password);
  var title=String(data.title||'').trim(), description=String(data.description||'').trim(), url=String(data.url||'').trim();
  if(!title) throw new Error('Escribe un título para el vídeo.');
  if(!url) throw new Error('Pega el enlace del vídeo.');
  var platform=videoPlatform_(url), categories=videoCategoryRows_(true), category=String(data.category||'');
  if(!categories.some(function(c){return c.id===category;})) throw new Error('Selecciona una categoría válida.');
  var sheet=videoSheet_(), id=String(data.id||'').trim(), values=sheet.getDataRange().getValues(), row=-1;
  for(var i=1;i<values.length;i++) if(String(values[i][0])===id && id){row=i+1;break;}
  var record=[id||Utilities.getUuid(),title,description,url,platform,Number(data.order||0),data.published===false?'No':'Sí',row>0?values[row-1][7]:new Date().toISOString(),category];
  if(row>0) sheet.getRange(row,1,1,record.length).setValues([record]); else sheet.appendRow(record);
  return {ok:true,id:record[0]};
}
function deleteVideo(data) {
  assertAdmin_(data && data.password);
  var sheet=videoSheet_(), values=sheet.getDataRange().getValues();
  for(var i=1;i<values.length;i++) if(String(values[i][0])===String(data.id||'')){sheet.deleteRow(i+1);return {ok:true};}
  throw new Error('No se ha encontrado el vídeo.');
}
function setupVideoBackoffice() {
  videoSheet_(); videoCategoriesSheet_();
  return 'Pestañas VideosWeb y CategoriasVideosWeb preparadas';
}
