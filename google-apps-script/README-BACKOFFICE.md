# Backoffice de Plataforma Dorada

Este backoffice permite gestionar desde Google Apps Script:

- **Noticias**: titular, medio, fecha, URL y resumen.
- **Recursos**: subir PDF, imágenes y otros materiales (hasta 10 MB), con categoría y descripción.
- **Borrado** de noticias y recursos.
- Los recursos se guardan en una carpeta de Google Drive.
- Las noticias y metadatos se guardan en las hojas `NoticiasWeb` y `RecursosWeb`.
- La web pública solo recibe los contenidos publicados; nunca recibe la hoja de respuestas de adhesiones.

## 1. En tu proyecto actual de Apps Script

No crees otro proyecto de Apps Script. Usa el mismo proyecto que ya está vinculado a la hoja donde tienes `Firmantes`.

1. Sustituye el código del archivo de servidor por `adhesiones.gs` incluido en esta carpeta, o incorpora sus funciones al código actual.
2. En Apps Script crea un archivo HTML llamado exactamente `admin` y pega el contenido de `admin.html`.
3. Guarda.

## 2. Configura la contraseña

En Apps Script abre:

**Configuración del proyecto → Propiedades del script → Añadir propiedad**

Nombre:

`BACKOFFICE_PASSWORD`

Valor: una contraseña larga que solo conozcas tú.

No la pongas en el código del sitio web.

## 3. Prepara las hojas y la carpeta

Desde el editor de Apps Script ejecuta una vez:

`setupBackoffice`

Autoriza Drive y Sheets cuando Google lo solicite.

Se crearán automáticamente:

- `NoticiasWeb`
- `RecursosWeb`
- carpeta de Drive `Plataforma Dorada - Recursos`

## 4. Nueva implementación

Después de guardar el código:

**Implementar → Nueva implementación → Aplicación web**

- Ejecutar como: **Yo**
- Quién tiene acceso: **Cualquier usuario**

La misma URL `/exec` sirve para:

- contador: `/exec`
- contenido público: `/exec?action=content`
- backoffice: `/exec?view=admin`

## 5. Abrir el backoffice

Una vez desplegado, abre:

`TU_URL_EXEC?view=admin`

Introduce la contraseña configurada en `BACKOFFICE_PASSWORD`.

## 6. Conectar la web

La web usa `VITE_ADHESION_COUNT_URL` para consultar el mismo Web App. No hace falta otra URL para el CMS.

Cuando publiques una noticia o recurso desde el backoffice, la web lo recogerá automáticamente en:

- `/novedades`
- `/prensa`
- el bloque de novedades de la portada

La actualización pública se comprueba aproximadamente cada 60 segundos mientras la página está abierta.


## Eventos

El backoffice incluye una pestaña **Eventos** para publicar actos de la Plataforma Dorada. Los registros se guardan en la hoja `EventosWeb` con título, fecha, hora, lugar, ciudad, descripción y enlace. La web pública los muestra automáticamente en «Próximos eventos» o «Eventos realizados» según la fecha.

Después de actualizar `adhesiones.gs` y `admin.html`, vuelve a desplegar el Web App creando una **nueva versión**.
