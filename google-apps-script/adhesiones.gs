/**
 * Plataforma Dorada — punto de entrada público del Web App.
 *
 * Las funciones compartidas del CMS y del backoffice están en Admin.gs.
 * Las estadísticas públicas están en publico.gs.
 * Este archivo conserva únicamente el enrutamiento GET para evitar duplicar
 * funciones globales (outputJson_, countAllAdhesions_, getPublicContent_, etc.).
 */

function doGet(e) {
  var params = (e && e.parameter) || {};

  if (params.view === "admin") {
    return HtmlService.createHtmlOutputFromFile("admin")
      .setTitle("Plataforma Dorada · Backoffice")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  var callback = /^[A-Za-z_$][\w$.]*$/.test(params.callback || "") ? params.callback : "";
  var action = params.action || "count";
  var payload;

  if (action === "content") {
    payload = getPublicContent_();
  } else if (action === "public") {
    payload = getPublicStats_();
  } else {
    payload = {
      adhesiones: countAllAdhesions_(),
      actualizado: new Date().toISOString()
    };
  }

  return outputJson_(payload, callback);
}
