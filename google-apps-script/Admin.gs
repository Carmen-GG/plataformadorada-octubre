/** Plataforma Dorada — CMS + backoffice.
 * Hojas propias: NoticiasWeb, RecursosWeb, PropuestasWeb, TrayectoriaWeb, HojaRutaWeb.
 * Eventos: hoja externa configurada en EVENTOS_SPREADSHEET_ID.
 */

var PD_CMS = {
  // Base de datos CMS para NoticiasWeb y RecursosWeb.
  CMS_SPREADSHEET_ID: "1nNK3t4_jrJf9n1bUs1W-bg09-zprzKsZ3KRfFPSoyC4",
  EVENTOS_SHEET_NAME: "EventosWeb",
  RESOURCE_FOLDER_PROPERTY: "RECURSOS_FOLDER_ID",
};

var NEWS_HEADERS = ["id","titulo","medio","fecha","url","resumen","publicada","creada","tipo","urlMultimedia","contenidoTexto"];
var RESOURCE_HEADERS = ["id","titulo","categoria","descripcion","archivo","url","creado","archivoId"];
var EVENT_HEADERS = ["id","titulo","fecha","hora","lugar","ciudad","descripcion","url","documentoNombre","documentoUrl","documentoId","publicada","creada"];
var PROPOSAL_HEADERS = ["id","tipo","titulo","artista","texto","proponente","publicada","creada"];
var TIMELINE_HEADERS = ["id","fecha","titulo","descripcion","imagenNombre","imagenUrl","imagenId","orden","activa","creada"];
var ROADMAP_HEADERS = ["id","fase","titulo","detalle","fecha","orden","activa","creada"];

function checkBackofficePassword(password) {
  var expected = PropertiesService.getScriptProperties().getProperty("BACKOFFICE_PASSWORD");
  if (!expected) return { ok:false, error:"El backoffice aún no tiene contraseña configurada." };
  return String(password || "") === String(expected) ? { ok:true } : { ok:false, error:"Contraseña incorrecta." };
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData && e.postData.contents || "{}");
    return outputJson_(saveProposalPublic_(body));
  } catch (err) {
    return outputJson_({ ok:false, error:String(err && err.message || err) });
  }
}

function outputJson_(payload, callback) {
  var json = JSON.stringify(payload);
  if (callback) return ContentService.createTextOutput(callback + "(" + json + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function countAllAdhesions_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Firmantes");
  return sheet ? Math.max(0, sheet.getLastRow() - 1) : 0;
}

function getCmsSpreadsheet_() {
  return SpreadsheetApp.openById(PD_CMS.CMS_SPREADSHEET_ID);
}

function cmsGetOrCreateSheet_(name, headers) {
  var ss = getCmsSpreadsheet_();
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  ensureHeaders_(sheet, headers);
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  if (!headers || !headers.length) return sheet;
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1,1,1,headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    return sheet;
  }
  var current = sheet.getRange(1,1,1,Math.max(sheet.getLastColumn(), headers.length)).getDisplayValues()[0];
  var changed = false;
  headers.forEach(function(h,i){ if (!String(current[i] || "").trim()) { sheet.getRange(1,i+1).setValue(h); changed = true; } });
  if (changed) sheet.setFrozenRows(1);
  return sheet;
}

function openEventsSpreadsheet_() { return getCmsSpreadsheet_(); }
function getEventsSheet_() {
  var ss = getCmsSpreadsheet_();
  var sh = ss.getSheetByName(PD_CMS.EVENTOS_SHEET_NAME);
  if (!sh) sh = ss.insertSheet(PD_CMS.EVENTOS_SHEET_NAME);
  ensureHeaders_(sh, EVENT_HEADERS);
  return sh;
}

function getDriveFolder_() {
  var props=PropertiesService.getScriptProperties(), id=props.getProperty(PD_CMS.RESOURCE_FOLDER_PROPERTY);
  if(id) return DriveApp.getFolderById(id);
  var folders=DriveApp.getFoldersByName("Plataforma Dorada - Recursos");
  var folder=folders.hasNext()?folders.next():DriveApp.createFolder("Plataforma Dorada - Recursos");
  props.setProperty(PD_CMS.RESOURCE_FOLDER_PROPERTY, folder.getId());
  return folder;
}

function cleanPublicText_(value, max) {
  return String(value == null ? "" : value).replace(/[\u0000-\u001F<>]/g," ").replace(/^\s*[\^`´]+\s*/,"").replace(/\s+/g," ").trim().slice(0,max || 2000);
}
function rowValues_(sheet, headersCount) { return sheet.getLastRow()>1 ? sheet.getRange(2,1,sheet.getLastRow()-1,headersCount).getDisplayValues() : []; }
function findRowById_(sheet,id){ var v=sheet.getDataRange().getDisplayValues(); for(var i=1;i<v.length;i++) if(String(v[i][0])===String(id)) return i+1; return -1; }
function assertAdmin_(password){ var expected=PropertiesService.getScriptProperties().getProperty("BACKOFFICE_PASSWORD"); if(!expected) throw new Error("El backoffice aún no tiene contraseña configurada."); if(String(password||"")!==expected) throw new Error("Contraseña incorrecta."); }

function readNews_(includeUnpublished){
  var s=cmsGetOrCreateSheet_("NoticiasWeb",NEWS_HEADERS), rows=rowValues_(s,NEWS_HEADERS.length);
  return rows.filter(function(r){var p=String(r[6]||"").trim().toLowerCase();return includeUnpublished || (p!=="no"&&p!=="false"&&p!=="0");}).map(function(r){var p=String(r[6]||"").trim().toLowerCase();return {id:String(r[0]||""),title:cleanPublicText_(r[1],300),media:cleanPublicText_(r[2],160),date:String(r[3]||""),url:String(r[4]||""),summary:cleanPublicText_(r[5],1000),type:["video","audio","texto"].indexOf(String(r[8]||"texto").toLowerCase())>=0?String(r[8]||"texto").toLowerCase():"texto",mediaUrl:String(r[9]||""),contentText:String(r[10]||""),published:p!=="no"&&p!=="false"&&p!=="0"};}).reverse();
}

function drivePreviewUrl_(id, filename){
  if (!id) return "";
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(String(filename || ""))) {
    return "https://drive.google.com/uc?export=view&id=" + encodeURIComponent(id);
  }
  return "https://drive.google.com/thumbnail?id=" + encodeURIComponent(id) + "&sz=w1000";
}
function driveDownloadUrl_(id){ return id ? "https://drive.google.com/uc?export=download&id="+encodeURIComponent(id) : ""; }

function readResources_(){
  var s=cmsGetOrCreateSheet_("RecursosWeb",RESOURCE_HEADERS), rows=rowValues_(s,RESOURCE_HEADERS.length);
  return rows.map(function(r){
    var fileId=String(r[7]||"");
    if(!fileId){var m=String(r[5]||"").match(/[?&]id=([^&]+)/);if(m)fileId=m[1];}
    return {id:r[0],title:cleanPublicText_(r[1],300),category:cleanPublicText_(r[2],100),description:cleanPublicText_(r[3],1000),filename:r[4],url:r[5]||driveDownloadUrl_(fileId),previewUrl:drivePreviewUrl_(fileId,r[4])};
  }).reverse();
}

function readEvents_(){
  var sh = getEventsSheet_();
  var lastRow = sh.getLastRow(), lastCol = sh.getLastColumn();
  if (lastRow < 2 || lastCol < 2) return [];
  var headers = sh.getRange(1,1,1,lastCol).getDisplayValues()[0].map(function(x) {
    return String(x||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();
  });
  var titleIdx = headers.findIndex(function(x) { return x === "titulo" || x === "title"; });
  var dateIdx = headers.findIndex(function(x) { return x === "fecha" || x.indexOf("fecha") === 0; });
  if (titleIdx < 0 || dateIdx < 0) return [];
  var idx = function(names, fallback) {
    var i = headers.findIndex(function(h) { return names.some(function(n) { return h === n || h.indexOf(n) >= 0; }); });
    return i >= 0 ? i : fallback;
  };
  var timeIdx=idx(["hora"],3), placeIdx=idx(["lugar"],4), cityIdx=idx(["ciudad"],5),
      descIdx=idx(["descripcion","detalle"],6), urlIdx=idx(["url","enlace"],7),
      docNameIdx=idx(["documentonombre","nombredocumento","archivo"],8),
      docUrlIdx=idx(["documentourl","urldocumento"],9), docIdIdx=idx(["documentoid","idarchivo"],10),
      pubIdx=idx(["publicada","publicado"],11), idIdx=idx(["id"],0);
  var rows=sh.getRange(2,1,lastRow-1,lastCol).getDisplayValues(), all=[];
  rows.forEach(function(r,i) {
    var title=String(r[titleIdx]||"").trim(), date=String(r[dateIdx]||"").trim();
    if (!title || !date) return;
    if (pubIdx < r.length && /^(no|false|0)$/i.test(String(r[pubIdx]||"").trim())) return;
    var docId=String(r[docIdIdx]||"").trim();
    var docUrl=String(r[docUrlIdx]||"").trim() || (docId ? driveDownloadUrl_(docId) : "");
    all.push({
      id:String(r[idIdx]|| (sh.getName()+"-"+(i+2))),
      title:cleanPublicText_(title,300), date:date, time:String(r[timeIdx]||"").trim(),
      place:cleanPublicText_(r[placeIdx],200), city:cleanPublicText_(r[cityIdx],120),
      description:cleanPublicText_(r[descIdx],1500), url:String(r[urlIdx]||"").trim(),
      documentName:String(r[docNameIdx]||"").trim(), documentUrl:docUrl, documentId:docId,
      previewUrl:docId?drivePreviewUrl_(docId):"", sourceSheet:sh.getName()
    });
  });
  return all.sort(function(a,b) { return String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id)); });
}

function readProposals_(){
  var s=cmsGetOrCreateSheet_("PropuestasWeb",PROPOSAL_HEADERS), rows=rowValues_(s,PROPOSAL_HEADERS.length);
  var all=rows.map(function(r){return{id:r[0],type:r[1],title:r[2],artist:r[3],text:r[4],proposer:r[5],published:String(r[6]).toLowerCase()!=="no",created:r[7]};}).reverse();
  return {canciones:all.filter(function(x){return x.type==="cancion"&&x.published;}).map(function(x){return{x:x.title,artist:x.artist};}),frases:all.filter(function(x){return x.type==="frase"&&x.published;}).map(function(x){return{text:x.text,name:x.proposer};}),todas:all};
}

function readTimeline_(){
  var s=cmsGetOrCreateSheet_("TrayectoriaWeb",TIMELINE_HEADERS), rows=rowValues_(s,TIMELINE_HEADERS.length);
  return rows.filter(function(r){return String(r[8]).toLowerCase()!=="no";}).map(function(r){return{id:r[0],fecha:r[1],titulo:cleanPublicText_(r[2],300),descripcion:cleanPublicText_(r[3],1500),imagenNombre:r[4],imagenUrl:r[5],imagenId:r[6],orden:Number(r[7])||0};}).sort(function(a,b){return a.orden-b.orden||String(a.fecha).localeCompare(String(b.fecha));});
}
function readRoadmap_(){
  var s=cmsGetOrCreateSheet_("HojaRutaWeb",ROADMAP_HEADERS), rows=rowValues_(s,ROADMAP_HEADERS.length);
  return rows.filter(function(r){return String(r[6]).toLowerCase()!=="no";}).map(function(r){return{id:r[0],fase:cleanPublicText_(r[1],100),titulo:cleanPublicText_(r[2],300),detalle:cleanPublicText_(r[3],1500),fecha:r[4],orden:Number(r[5])||0,activa:String(r[6]).toLowerCase()!=="no"};}).sort(function(a,b){return a.orden-b.orden;});
}

function getPublicContent_(){
  var p=readProposals_();
  return {noticias:readNews_(),recursos:readResources_(),eventos:readEvents_(),videos:readVideos_(),trayectoria:readTimeline_(),hojaRuta:readRoadmap_(),canciones:p.canciones,frases:p.frases,actualizado:new Date().toISOString()};
}
function getPublicContent(){return getPublicContent_();}
function obtenerContenidoPublico(){return getPublicContent_();}
function getBackofficeContent(){var c=getPublicContent_();c.noticias=readNews_(true);c.propuestas=readProposals_().todas;return c;}

function setupBackoffice(){cmsGetOrCreateSheet_("NoticiasWeb",NEWS_HEADERS);cmsGetOrCreateSheet_("RecursosWeb",RESOURCE_HEADERS);getEventsSheet_();cmsGetOrCreateSheet_("PropuestasWeb",PROPOSAL_HEADERS);cmsGetOrCreateSheet_("TrayectoriaWeb",TIMELINE_HEADERS);cmsGetOrCreateSheet_("HojaRutaWeb",ROADMAP_HEADERS);getDriveFolder_();return "Backoffice preparado en la base CMS configurada";}

// Nombre exclusivo para evitar conflictos con funciones antiguas de otros archivos del proyecto.
function saveNewsToCmsSpreadsheet(data) {
  assertAdmin_(data && data.password);
  var sheet = cmsGetOrCreateSheet_("NoticiasWeb", NEWS_HEADERS);
  var id = String(data.id || "").trim();
  var row = id ? findRowById_(sheet, id) : -1;
  if (row < 0) { id = Utilities.getUuid(); row = sheet.getLastRow() + 1; }
  var created = row <= sheet.getLastRow() ? String(sheet.getRange(row, 8).getDisplayValue() || "") : "";
  if (!created) created = new Date().toISOString();
  var type = String(data.type || "texto").toLowerCase();
  if (["video","audio","texto"].indexOf(type) < 0) type = "texto";
  sheet.getRange(row, 1, 1, NEWS_HEADERS.length).setValues([[id,cleanPublicText_(data.title,300),cleanPublicText_(data.media,160),String(data.date||"").trim(),String(data.url||"").trim(),cleanPublicText_(data.summary,1000),data.published===false?"No":"Sí",created,type,String(data.mediaUrl||"").trim(),String(data.contentText||"").trim()]]);
  return {ok:true,id:id};
}

function saveResource(data){
  assertAdmin_(data&&data.password);
  var s=cmsGetOrCreateSheet_("RecursosWeb",RESOURCE_HEADERS), id=String(data.id||"").trim(), row=id?findRowById_(s,id):-1;
  if(!data.fileName||!data.base64){ if(row<0) throw new Error("Falta el archivo."); return updateResourceMetadata_(data,s,row); }
  var bytes=Utilities.base64Decode(data.base64); if(bytes.length>10*1024*1024)throw new Error("El archivo supera el límite de 10 MB.");
  var oldId=row>0?String(s.getRange(row,8).getDisplayValue()||""):"";
  if(!oldId && row>0){var m=String(s.getRange(row,6).getDisplayValue()||"").match(/[?&]id=([^&]+)/);if(m)oldId=m[1];}
  if(oldId){try{DriveApp.getFileById(oldId).setTrashed(true);}catch(e){}}
  var file=getDriveFolder_().createFile(Utilities.newBlob(bytes,data.mimeType||"application/octet-stream",data.fileName)); file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);
  id=id||Utilities.getUuid(); row=row>0?row:s.getLastRow()+1;
  var created=row<=s.getLastRow()?String(s.getRange(row,7).getDisplayValue()||""):""; if(!created)created=new Date().toISOString();
  s.getRange(row,1,1,8).setValues([[id,cleanPublicText_(data.title||data.fileName,300),cleanPublicText_(data.category||"Materiales",100),cleanPublicText_(data.description,1000),data.fileName,driveDownloadUrl_(file.getId()),created,file.getId()]]);
  return{ok:true,id:id};
}
function updateResourceMetadata_(data,s,row){s.getRange(row,2,1,3).setValues([[cleanPublicText_(data.title,300),cleanPublicText_(data.category,100),cleanPublicText_(data.description,1000)]]);return{ok:true,id:data.id};}

function saveEvent(data){
  assertAdmin_(data&&data.password); var title=cleanPublicText_(data.title,300),date=String(data.date||"").trim(); if(!title)throw new Error("El título del evento es obligatorio."); if(!/^\d{4}-\d{2}-\d{2}$/.test(date))throw new Error("La fecha del evento no es válida.");
  var s=getEventsSheet_(),id=String(data.id||"").trim(),row=id?findRowById_(s,id):-1; if(row<0){id=Utilities.getUuid();row=s.getLastRow()+1;}
  var oldId=row>0?String(s.getRange(row,11).getDisplayValue()||""):""; var documentName=String(data.documentName||"").trim(),documentUrl=String(data.documentUrl||"").trim(),documentId=oldId;
  if(data.base64&&data.fileName){if(oldId){try{DriveApp.getFileById(oldId).setTrashed(true);}catch(e){}}var bytes=Utilities.base64Decode(data.base64);if(bytes.length>10*1024*1024)throw new Error("El documento supera 10 MB.");var file=getDriveFolder_().createFile(Utilities.newBlob(bytes,data.mimeType||"application/octet-stream",data.fileName));file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);documentId=file.getId();documentName=data.fileName;documentUrl=driveDownloadUrl_(documentId);}
  var created=row<=s.getLastRow()?String(s.getRange(row,13).getDisplayValue()||""):"";if(!created)created=new Date().toISOString();
  s.getRange(row,1,1,13).setValues([[id,title,date,String(data.time||"").trim(),cleanPublicText_(data.place,200),cleanPublicText_(data.city,120),cleanPublicText_(data.description,1500),String(data.url||"").trim(),documentName,documentUrl,documentId,data.published===false?"No":"Sí",created]]);return{ok:true,id:id};
}

function saveTimeline(data){
  assertAdmin_(data&&data.password); var s=cmsGetOrCreateSheet_("TrayectoriaWeb",TIMELINE_HEADERS),id=String(data.id||"").trim(),row=id?findRowById_(s,id):-1;if(row<0){id=Utilities.getUuid();row=s.getLastRow()+1;}
  var oldId=row>0?String(s.getRange(row,7).getDisplayValue()||""):"";var imageName=String(data.imageName||"").trim(),imageUrl=String(data.imageUrl||"").trim(),imageId=oldId;
  if(data.base64&&data.fileName){if(oldId){try{DriveApp.getFileById(oldId).setTrashed(true);}catch(e){}}var bytes=Utilities.base64Decode(data.base64);if(bytes.length>10*1024*1024)throw new Error("La imagen supera 10 MB.");var f=getDriveFolder_().createFile(Utilities.newBlob(bytes,data.mimeType||"image/*",data.fileName));f.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);imageId=f.getId();imageName=data.fileName;imageUrl=driveDownloadUrl_(imageId);}
  var created=row<=s.getLastRow()?String(s.getRange(row,10).getDisplayValue()||""):"";if(!created)created=new Date().toISOString();
  s.getRange(row,1,1,10).setValues([[id,String(data.date||"").trim(),cleanPublicText_(data.title,300),cleanPublicText_(data.description,1500),imageName,imageUrl,imageId,Number(data.order)||0,data.active===false?"No":"Sí",created]]);return{ok:true,id:id};
}
function saveRoadmap(data){assertAdmin_(data&&data.password);var s=cmsGetOrCreateSheet_("HojaRutaWeb",ROADMAP_HEADERS),id=String(data.id||"").trim(),row=id?findRowById_(s,id):-1;if(row<0){id=Utilities.getUuid();row=s.getLastRow()+1;}var created=row<=s.getLastRow()?String(s.getRange(row,8).getDisplayValue()||""):"";if(!created)created=new Date().toISOString();s.getRange(row,1,1,8).setValues([[id,cleanPublicText_(data.phase,100),cleanPublicText_(data.title,300),cleanPublicText_(data.detail,1500),String(data.date||"").trim(),Number(data.order)||0,data.active===false?"No":"Sí",created]]);return{ok:true,id:id};}

function deleteNews(data){assertAdmin_(data&&data.password);return deleteRowById_("NoticiasWeb",data.id);}
function deleteEvent(data){assertAdmin_(data&&data.password);var s=getEventsSheet_(),row=findRowById_(s,data.id);if(row<0)throw new Error("Evento no encontrado.");var fid=String(s.getRange(row,11).getDisplayValue()||"");if(fid){try{DriveApp.getFileById(fid).setTrashed(true);}catch(e){}}s.deleteRow(row);return{ok:true};}
function deleteResource(data){assertAdmin_(data&&data.password);var s=cmsGetOrCreateSheet_("RecursosWeb",RESOURCE_HEADERS),row=findRowById_(s,data.id);if(row<0)throw new Error("Recurso no encontrado.");var fid=String(s.getRange(row,8).getDisplayValue()||"");if(!fid){var m=String(s.getRange(row,6).getDisplayValue()||"").match(/[?&]id=([^&]+)/);if(m)fid=m[1];}if(fid){try{DriveApp.getFileById(fid).setTrashed(true);}catch(e){}}s.deleteRow(row);return{ok:true};}
function deleteTimeline(data){assertAdmin_(data&&data.password);var s=cmsGetOrCreateSheet_("TrayectoriaWeb",TIMELINE_HEADERS),row=findRowById_(s,data.id);if(row<0)throw new Error("Hito no encontrado.");var fid=String(s.getRange(row,7).getDisplayValue()||"");if(fid){try{DriveApp.getFileById(fid).setTrashed(true);}catch(e){}}s.deleteRow(row);return{ok:true};}
function deleteRoadmap(data){assertAdmin_(data&&data.password);return deleteRowById_("HojaRutaWeb",data.id);}
function deleteRowById_(name,id){var s=cmsGetOrCreateSheet_(name,[]),row=findRowById_(s,id);if(row<0)throw new Error("Registro no encontrado.");s.deleteRow(row);return{ok:true};}
function setPublished_(data){assertAdmin_(data&&data.password);var s=cmsGetOrCreateSheet_("PropuestasWeb",PROPOSAL_HEADERS),row=findRowById_(s,data.id);if(row<0)throw new Error("Propuesta no encontrada.");s.getRange(row,7).setValue(data.published?"Sí":"No");return{ok:true};}
function deleteProposal(data){assertAdmin_(data&&data.password);return deleteRowById_("PropuestasWeb",data.id);}
function saveProposalPublic_(data){var type=data.type==="cancion"||data.type==="frase"?data.type:"";if(!type)throw new Error("Tipo no válido.");var s=cmsGetOrCreateSheet_("PropuestasWeb",PROPOSAL_HEADERS);s.appendRow([Utilities.getUuid(),type,String(data.title||"").slice(0,200),String(data.artist||"").slice(0,160),String(data.text||"").slice(0,1000),String(data.proposer||"").slice(0,120),"No",new Date().toISOString()]);return{ok:true,message:"Propuesta recibida. Quedará pendiente de revisión."};}
