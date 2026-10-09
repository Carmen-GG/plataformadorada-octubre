# Gestionar vídeos desde el backoffice

La pestaña **Vídeos** permite añadir, editar, ordenar, ocultar y eliminar vídeos de YouTube y Facebook. Los publicados se muestran en `/redes-sociales#videos` y se reproducen en el televisor central.

## Activación en Google Apps Script

Estos cambios en GitHub no actualizan automáticamente el proyecto de Google Apps Script que está desplegado. Para activar el circuito completo:

1. Conserva el mismo proyecto de Apps Script que sirve el backoffice actual.
2. Integra `videos.gs` junto con `Admin.gs`, `publico.gs` y el archivo de enrutamiento `adhesiones.gs`, evitando duplicar funciones globales.
3. La función `getPublicContent_()` ya incluye `videos: readVideos_()` en el código actual de GitHub; no vuelvas a añadir esa propiedad.
4. Sustituye el HTML del panel por `admin.html` de este repositorio.
5. **No ejecutes todavía `setupVideoBackoffice()`**: si la hoja está vacía, esta función puede insertar cuatro vídeos de ejemplo. Hazlo solo cuando se haya revisado el código y se haya confirmado que corresponde preparar los datos del CMS.
6. Cuando se apruebe la sincronización, revisa la hoja `VideosWeb` y decide expresamente si hay que inicializarla. Después se podrá publicar una nueva versión desde **Implementar → Administrar implementaciones**. La URL `/exec` debería mantenerse al editar la implementación existente.

## Campos

- **Título**: texto que aparece en la lista.
- **Descripción**: texto opcional.
- **Enlace**: URL de YouTube o Facebook.
- **Orden**: número ascendente; los valores más bajos aparecen primero.
- **Publicar en la web**: desmárcalo para ocultar un vídeo sin eliminarlo.

La web solo recibe los vídeos publicados. La lectura y las modificaciones desde el backoffice requieren la contraseña existente.
