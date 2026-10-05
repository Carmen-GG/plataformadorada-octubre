# Plataforma Dorada — versión de cambios 1–12

Esta versión incorpora los 12 cambios acordados:

1. Redes sociales: Instagram + TikTok arriba; Spotify + Lemas/Citas debajo.
2. Recursos: herramienta de imagen alineada con el título y miniaturas de archivos.
3. Backoffice Recursos: editar, eliminar y sustituir archivos.
4. Noticias: limpieza del contenido mostrado para evitar caracteres iniciales extraños y pérdida visual del medio.
5. Eventos: CMS conectado al Google Sheets `1uexiL3JPV1DTDGLl6NsbGWjMmn9584thAmVaheyAYpU`; cartel/archivo a la derecha, abrible/descargable y responsive.
6. Entidades: contador alineado con el título.
7. Testimonios: contador alineado con el título.
8. Testimonios: carrusel de testimonios autorizados antes del bloque de consentimiento y después distribución por comunidad; pausa, navegación manual, teclado y reducción de movimiento.
9. Datos: nuevo mapa territorial por indicador con selector de Adhesiones, Entidades, Mociones, Aprobadas y Testimonios; tabla accesible.
10. La Plataforma: trayectoria dinámica gestionable desde Backoffice.
11. Hoja de ruta: fases gestionables desde nueva pestaña de Backoffice.
12. Navegación: La Plataforma · Participa · Datos · Recursos · Conecta, con menús visuales y versión móvil; etiquetas traducidas a ES/CA/EU/GL.

## Apps Script

Actualizar en el proyecto de Google Apps Script:
- `google-apps-script/Admin.gs`
- `google-apps-script/admin.html`

Después ejecutar una vez `setupBackoffice()` para crear/ajustar las hojas CMS nuevas y la hoja `Eventos` del spreadsheet de eventos.

**IMPORTANTE:** no sustituir `publico.gs`, `Código.gs` ni `contacto.gs` por los archivos de esta versión. La versión activa de `publico.gs` ya contiene la configuración real de voluntarios y debe conservarse.

## Despliegue web

Una vez actualizado Apps Script y comprobado el backoffice, subir el contenido del proyecto a la rama `main` de GitHub y dejar que Cloudflare construya la nueva versión.
