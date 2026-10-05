# Cambios web — Plataforma Dorada · 5 octubre 2026

## Frontend
- Números con formato español: `.` para miles y `,` para decimales en indicadores y contadores públicos.
- Página Datos/Indicadores: botones del mapa renombrados a **Adhesiones individuales · Entidades adheridas · Mociones presentadas · Mociones aprobadas · Testimonios**.
- Mapa territorial ampliado: números y etiquetas más legibles, degradado más contrastado, leyenda visible, tooltip accesible con los cinco indicadores y tabla de la derecha sin scroll vertical, igualada en altura al mapa.
- Testimonios públicos: la interfaz refleja que se muestran todos los testimonios con consentimiento de uso público, incluidos los anónimos.
- Spotify reducido a un reproductor compacto de 152 px, sin ocupar el espacio de una lista de reproducción completa.
- Generador de imagen de perfil: logo arrastrable libremente por la imagen, hashtag sobre una pastilla de fondo, botón claro para subir foto y descarga PNG circular con exterior transparente.
- Recursos: filtros por tipo en la parte superior y miniaturas robustas para imágenes/PDF/otros archivos.
- Novedades y Recursos siguen consumiéndose desde el CMS de la web.

## Apps Script / CMS
- `google-apps-script/Admin.gs` usa ahora la base CMS:
  `1nNK3t4_jrJf9n1bUs1W-bg09-zprzKsZ3KRfFPSoyC4`
  para `NoticiasWeb`, `RecursosWeb`, `PropuestasWeb`, `TrayectoriaWeb` y `HojaRutaWeb`.
- Los recursos de Drive generan una URL de vista directa para imágenes, además de miniatura para documentos, para evitar imágenes rotas.
- El ID de eventos externo se mantiene:
  `1uexiL3JPV1DTDGLl6NsbGWjMmn9584thAmVaheyAYpU`.
- El comportamiento de testimonios queda definido como: cualquier respuesta que haya marcado **Sí** al consentimiento de uso público puede aparecer; si elige anónimo, se publica como **Anónima** y no se muestra el nombre.

## Importante
El `publico.gs` activo que ya tienes puede conservarse con su configuración actual de voluntarios. Para este cambio de CMS hay que sustituir **Admin.gs** por la versión incluida y volver a desplegar la versión del Web App.
