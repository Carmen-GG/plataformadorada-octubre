# Gobiernos autonómicos que apoyan el Pacto (portada)

La caja de la portada «Firmas por el Pacto de Estado» muestra las 19 comunidades y ciudades
autónomas como «Gobierno de …». Las que han dado su apoyo salen primero y con un check verde
fosforito; el resto salen apagadas, con una ✕ y la leyenda «Aún sin apoyo».

## Cómo se marca un Gobierno
1. En el Apps Script, pega el `Admin.gs` actualizado (carpeta `google-apps-script/`) y crea una
   **nueva versión** de la implementación Web App (misma URL /exec).
2. Ejecuta una vez `setupBackoffice` (o abre la web: la pestaña se crea sola al primer acceso).
   Se crea la pestaña **GobiernosWeb** en la hoja del CMS (la misma donde está EventosWeb) con
   las columnas `comunidad · apoya · fecha · nota` y las 19 filas con `apoya = No`.
3. Para marcar un Gobierno, cambia a **Sí** la celda de la columna `apoya`. En unos segundos
   (la caché es de 30 s) aparece el check en la portada. La `fecha` y la `nota` son solo para ti.

Los nombres de la columna `comunidad` se reconocen con o sin tildes y con variantes habituales
(«Comunidad de Madrid», «Euskadi», «Islas Baleares»…); ver `src/lib/gobiernos.ts`.
Los nombres de cada Gobierno están escritos a mano en los 8 idiomas en ese mismo archivo.
