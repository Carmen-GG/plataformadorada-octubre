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

1. Conserva el proyecto de Apps Script existente y sus funciones relacionadas con adhesiones y estadísticas.
2. Integra los archivos de servidor de esta carpeta en el mismo proyecto: `adhesiones.gs` (enrutamiento), `Admin.gs` (CMS/backoffice), `publico.gs` (estadísticas públicas) y `videos.gs` (gestión de vídeos). No dupliques funciones globales si ya existen en el proyecto.
3. En Apps Script crea un archivo HTML llamado exactamente `admin` y pega el contenido de `admin.html`.
4. Guarda.

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

Se crearán automáticamente las hojas `NoticiasWeb`, `RecursosWeb`, `EventosWeb`, `PropuestasWeb`, `TrayectoriaWeb` y `HojaRutaWeb`, además de la carpeta de Drive `Plataforma Dorada - Recursos`. La hoja `VideosWeb` se prepara con `setupVideoBackoffice()` cuando se decida activar y revisar esa función.

## 4. Nueva implementación

Después de guardar el código:

**Implementar → Nueva implementación → Aplicación web**

- Ejecutar como: **Yo**
- Quién tiene acceso: **Cualquier usuario**

La misma URL `/exec` sirve para:

- contador: `/exec`
- estadísticas públicas: `/exec?action=public`
- contenido editorial público: `/exec?action=content`
- backoffice: `/exec?view=admin`

**Importante:** los cambios de GitHub no se aplican automáticamente al despliegue. Primero termina la revisión de los archivos y de las hojas; después sincroniza el conjunto completo y publica una nueva versión de Apps Script. No ejecutes funciones de preparación que escriban en el CMS hasta haber confirmado que corresponde hacerlo.

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
