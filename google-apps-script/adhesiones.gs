/**
 * Este archivo ya no declara doGet().
 *
 * La única función doGet del proyecto está en Admin.gs para evitar conflictos
 * entre definiciones duplicadas y mantener un único enrutamiento:
 * - ?action=content -> contenido CMS
 * - ?action=public  -> estadísticas, mapa y listas públicas
 * - ?action=count   -> contador simple de adhesiones
 * - ?admin=1        -> backoffice
 *
 * Se mantiene este archivo como nota de compatibilidad para instalaciones
 * antiguas. Las funciones de estadísticas están en publico.gs.
 */
