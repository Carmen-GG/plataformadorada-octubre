# Última ronda de cambios — 5 octubre 2026

## Home
- Mapa/listado de adhesiones ordenado de mayor a menor número de adhesiones.
- Últimas adhesiones públicas: nombre abreviado + municipio, en lugar de un texto combinado.
- Grandes indicadores de «La situación actual» visibles de inmediato con valores de respaldo oficiales mientras llega el dato dinámico.
- «Voces del cuidado» usa el mismo carrusel accesible que la página de Testimonios.
- El carrusel de testimonios solo recibe testimonios con consentimiento público «Sí…».
- Se muestra nombre y primer apellido cuando la persona ha elegido aparecer con su nombre; «Anónima» cuando ha elegido anonimato; siempre con municipio si existe.
- El endpoint de Instagram busca publicaciones de vídeo estándar (`/p/`) y excluye reels.

## Testimonios
- Se reutiliza exactamente el mismo componente de carrusel accesible de la Home.
- Los datos públicos los prepara Apps Script; no se envían al navegador datos no autorizados.

## Eventos
- `Admin.gs` lee los eventos de todas las pestañas del Spreadsheet configurado en `PD_CMS.EVENTOS_SPREADSHEET_ID`, siempre que tengan cabeceras reconocibles de título y fecha.
- Se conserva el mismo ID de Spreadsheet: `1uexiL3JPV1DTDGLl6NsbGWjMmn9584thAmVaheyAYpU`.

## Apps Script
- Se elimina el `doGet` duplicado de `Admin.gs` del paquete local para que el enrutador único siga estando en `Código.gs`.
- Se mantiene `doPost` para propuestas.
- Se añade `checkBackofficePassword` y el alias `obtenerContenidoPublico` para el enrutador actual.
