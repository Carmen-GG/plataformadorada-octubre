# Gestionar vídeos desde el backoffice

La pestaña **Vídeos** permite añadir, editar, ordenar, ocultar y eliminar vídeos de YouTube y Facebook. Los publicados se muestran en `/redes-sociales#videos` y se reproducen en el televisor central.

## Activación en Google Apps Script

Estos cambios en GitHub no actualizan automáticamente el proyecto de Google Apps Script que está desplegado. Para activar el circuito completo:

1. Abre el mismo proyecto de Apps Script que sirve el backoffice actual.
2. Añade un archivo de script llamado `videos.gs` y pega el contenido de este repositorio.
3. En el archivo de servidor que contiene `getPublicContent_()`, incorpora `videos: readVideos_(),` al objeto devuelto por esa función. En la función `setupBackoffice()`, crea también la hoja con estas cabeceras: `VideosWeb` y `['id', 'title', 'description', 'url', 'platform', 'order', 'published', 'created']`. **Integra estas líneas en el código existente; no sustituyas el servidor completo**, porque puede contener otras funciones del backoffice que no están en este repositorio.
4. Sustituye el HTML del panel por `admin.html` de este repositorio.
5. Ejecuta una vez `setupVideoBackoffice()` desde el editor de Apps Script y autoriza los permisos solicitados. Esto crea la pestaña `VideosWeb`.
6. En **Implementar → Administrar implementaciones**, edita la aplicación web, selecciona **Nueva versión** y vuelve a implementar. La URL `/exec` se mantiene.
7. Abre el backoffice, entra en la pestaña **Vídeos** y añade o revisa los cuatro vídeos iniciales. Si el CMS aún no tiene registros de vídeo, la web conserva la lista inicial como alternativa hasta que el servidor devuelva el campo `videos`.

## Campos

- **Título**: texto que aparece en la lista.
- **Descripción**: texto opcional.
- **Enlace**: URL de YouTube o Facebook.
- **Orden**: número ascendente; los valores más bajos aparecen primero.
- **Publicar en la web**: desmárcalo para ocultar un vídeo sin eliminarlo.

La web solo recibe los vídeos publicados. La lectura y las modificaciones desde el backoffice requieren la contraseña existente.
