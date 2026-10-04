# Cambios finales incluidos

## Web
- Contadores absolutos y dinámicos en Adhesiones, Entidades, Testimonios y Voluntariado.
- Entidades: nuevo campo **Alcance de la entidad** leído desde Google Sheets.
- Inicio: **La situación actual** con el texto de contexto y la transición hacia el Pacto de Estado.
- Inicio: tabla del área/rango `web` de la pestaña `Resumen` de Firmantes, solo Comunidad Autónoma + Adhesiones.
- Enlace del mapa: **Ver el mapa completo por comunidad autónoma**.
- Inicio: sustitución de Hitos por el último Reel de `@assumptaserna`, obtenido automáticamente desde Instagram cuando Instagram permite su lectura pública.
- Recursos: página más clara para prensa y documentación, con acceso destacado a la herramienta de imagen de perfil.
- Imagen de perfil: ajuste de escala, desplazamiento horizontal/vertical, logo transparente opcional, contorno dorado opcional y `#PlataformaDorada` / `#PactoDeEstado` opcionales.
- Procesamiento de la fotografía exclusivamente en el navegador.
- Testimonios: carrusel accesible con pausa y navegación manual, contador absoluto y resumen territorial por CCAA.
- Redes sociales: Spotify en media página, carrusel de frases con pausa/navegación, formularios de propuestas de canciones y frases y último Reel automático.
- Eventos públicos conectados al CMS y documentos/imágenes adjuntos.
- Eliminada la animación flotante de la portada y los indicadores de carga giratorios.

## Apps Script
- `publico.gs`: añade alcance de entidades, resumen `web`, conteo territorial de testimonios y mantiene el conteo absoluto de todas las filas de testimonios.
- `Admin.gs`: eventos con adjuntos, edición/reemplazo de documentos, borrado de archivo asociado y gestión de propuestas.
- `admin.html`: pestañas Noticias / Eventos / Recursos / Propuestas.
- Las propuestas públicas quedan pendientes hasta aprobación.
- No se publican datos personales de formularios.

## Despliegue
1. Actualizar `publico.gs`, `Admin.gs` y `admin.html` en el proyecto de Google Apps Script.
2. Ejecutar `setupBackoffice()` si todavía no se han creado las hojas CMS.
3. Volver a desplegar la misma aplicación web de Apps Script como nueva versión.
4. Subir el contenido de este ZIP al repositorio `main`.
5. Cloudflare ejecutará el build y despliegue habitual.

La extracción automática del último Reel no requiere mantenimiento en el backoffice. Instagram puede limitar temporalmente la lectura pública; en ese caso la web muestra el enlace directo al perfil en lugar de inventar un contenido.
