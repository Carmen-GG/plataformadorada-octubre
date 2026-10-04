# Cifras y listas públicas desde Google Sheets

`publico.gs` lee las tres hojas de respuestas y devuelve a la web **solo** contadores y listas
ya formateadas ("María G. · Cataluña"). No devuelve apellidos completos, correos, teléfonos, DNI
ni respuestas de personas que no hayan autorizado aparecer.

## 1. Instalar el script (una vez)

1. Abre la hoja de **adhesiones** → Extensiones → Apps Script (es el proyecto que ya tenéis).
2. Crea un archivo nuevo llamado `publico` y pega el contenido de `publico.gs`.
3. Sustituye el archivo `adhesiones.gs` por la versión de este zip (solo cambia `doGet`).
4. En `publico.gs`, rellena `VOLUNTARIOS_SPREADSHEET_ID` y `TESTIMONIOS_SPREADSHEET_ID`
   (el ID es lo que hay entre `/d/` y `/edit` en la URL de cada hoja). La cuenta que despliega
   el script debe tener acceso a las tres hojas.
5. Ejecuta `setupPublico` una vez desde el editor (pide permisos). Añade a la hoja de testimonios
   las columnas `Publicar en web`, `Texto web` y `Ocultar`.
6. Implementar → Administrar implementaciones → editar la actual → **Nueva versión** → Implementar.
   La URL `/exec` no cambia. Si no creas nueva versión, la web sigue usando el código antiguo.
7. Comprueba abriendo `<tu URL /exec>?action=public`: debe salir un JSON con `"ok": true`.

## 2. Preguntas que hay que añadir a los formularios

(Textos listos para pegar en `docs/TEXTOS-FORMULARIOS.md`.)

Sin estas preguntas las listas de nombres salen **vacías** (el sistema falla "cerrado": sin
autorización expresa no se muestra a nadie). Los contadores funcionan igualmente.

- **Adhesión (persona a título particular) y Voluntariado**, con respuesta Sí / No, no obligatoria:
  `¿Autorizas que tu nombre, la inicial de tu primer apellido y tu ciudad aparezcan públicamente en la web de Plataforma Dorada?`
  (el script busca la frase «aparezcan públicamente»; si cambias el texto, mantenla).
- **Adhesión**: añade también `Ciudad en la que vives`. Si no existe, se muestra la comunidad autónoma.
- **Voluntariado**: ya pregunta la ciudad.

## 3. Testimonios

- Solo se publican los que eligieron «Con mi nombre» o «Aceptaría ofrecer mi testimonio en
  medios». «Solo para uso interno» nunca sale. «Anónimo» no sale (cámbialo con `PUBLISH_ANONYMOUS`).
- Con `REQUIRE_APPROVAL = true` (recomendado) el equipo pone `Sí` en **Publicar en web** y escribe
  o pega el extracto en **Texto web**. Así se evita publicar datos de salud de terceros por error.
- `Ocultar = Sí` retira un testimonio en cualquier momento.
- El formulario actual dice que los datos se usan «con la finalidad de adherirte». Hay que
  cambiarlo por un aviso propio de testimonios, con un consentimiento para enviarlo y otro,
  separado, para publicarlo.

## 4. Entidades adheridas

- La página «Entidades adheridas» se alimenta de las filas «En representación de…» de la hoja de adhesiones.
- Solo se publica una entidad si ha marcado el compromiso «Nos comprometemos, como entidad, a hacer
  pública la adhesión…» (cualquier respuesta que no sea «No»). Si esa pregunta no existe, no se publica ninguna.
- Se muestra: nombre, tipo, comunidad autónoma y web (solo si es una dirección web válida).
  Nunca el CIF ni los datos de la persona de contacto.
- Todas tienen la misma visibilidad y salen por orden alfabético.
- Para retirar una entidad, añade a la hoja de adhesiones una columna llamada `Ocultar` y pon `Sí`.
- Los tipos se agrupan en Asociación, Fundación, Empresa, Ayuntamiento, Entidad social y Otra entidad.
  Comprueba en `?action=public` (campo `tiposOrganizacion`) que las opciones de tu formulario se agrupan como esperas.

## 5. Qué cuenta cada cifra

- **Personas adheridas**: filas «A título particular». **Entidades**: filas «En representación de…».
- **Ayuntamientos**: entidades cuyo tipo contiene «ayuntamiento» o «entidad local».
- **Voluntarios**: filas que aceptan el código ético.
- **Testimonios**: recibidos (todos) y publicados (los que cumplen las reglas de arriba).
- Nombre del campo único «Nombre y Apellidos» (voluntarios y testimonios): se toma la primera palabra
  como nombre y la inicial de la segunda (sin «de», «la»…). Los nombres compuestos pueden salir
  mal; lo ideal es separar nombre y apellidos en el formulario.

## 6. Web

Define `VITE_ADHESION_COUNT_URL` con la URL `/exec` en el hosting. La web pide los datos cada
30 s (solo con la pestaña visible) y el servidor guarda una copia 30 s, así que Google recibe como
mucho ~2 consultas por minuto aunque haya mucha gente conectada.
