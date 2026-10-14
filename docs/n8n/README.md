# Seguimiento automático de mociones en ayuntamientos (n8n + Claude)

Flujo de n8n que se ejecuta **cada 15 días** y revisa, municipio a municipio, si los ayuntamientos donde se ha presentado la moción de Plataforma Dorada la han **aprobado, rechazado o la tienen pendiente**. El resultado se escribe en la hoja de registro de mociones, y el mapa de la web (`/mociones-ayuntamientos`) se actualiza solo.

## Qué hace

```
Cada 15 días ─┐
Ejecutar a mano ┴─► Leer hoja de mociones ─► Seleccionar municipios ─► Municipio a municipio ─┐
                                                                                             │
   ┌─────────────────────────────────────────────────────────────────────────────────────────┘
   └─► Claude · ronda 1..4 (búsqueda web) ─► Validar ficha ─► Filas a actualizar
          ─► Actualizar hoja de mociones ─► Ficha para el registro ─► Guardar en «Fichas IA» ─► (siguiente municipio)
                                                                     … al terminar ─► Resumen
```

1. **Lee** la pestaña `presentades` de la hoja de registro de mociones (la misma que usa `google-apps-script/publico.gs`).
2. **Selecciona** solo los municipios pendientes:
   - se salta los que ya tienen `RESOLUCIÓN DEL PLENO` aprobada/aceptada/rechazada/denegada;
   - se salta los que la IA ya marcó como `APROBADA` o `RECHAZADA` con fuente verificada;
   - se salta los revisados hace menos de 10 días (por si lo lanzas a mano entre dos ejecuciones);
   - agrupa las filas repetidas del mismo municipio y revisa cada municipio una sola vez;
   - revisa como máximo 40 municipios por ejecución, empezando por los que nunca se han revisado.
3. **Investiga** cada municipio con Claude, que usa búsqueda web y lectura de páginas y PDF para localizar la web oficial, las actas y las convocatorias del Pleno y la moción. Las instrucciones completas están en [`src/prompt-sistema.md`](src/prompt-sistema.md).
4. **Valida** la ficha: comprueba los valores permitidos y el formato de las fechas, descarta las fechas sin fuente y marca las URLs que no aparecieron en las búsquedas, que podrían ser inventadas.
5. **Escribe** en la hoja de mociones y guarda la ficha completa en la pestaña `Fichas IA` (historial).
6. **Resume** al final de la ejecución qué mociones se han encontrado y qué conviene revisar a mano.

### Columnas que añade a la hoja de mociones

Se crean solas la primera vez, al final de la pestaña `presentades`:

| Columna | Contenido |
|---|---|
| `IA estado moción` | `APROBADA`, `RECHAZADA`, `PENDIENTE`, `PRESENTADA`, vacío (sin datos) o `… (sin verificar)` |
| `IA fecha moción` | Fecha del pleno (AAAA-MM-DD) |
| `IA fuente moción` | URL del acta, el acuerdo o la convocatoria |
| `IA evidencia moción` | Qué dice el documento |
| `IA referencia Plataforma Dorada` | `SÍ` / `NO` / `NO ENCONTRADO` y fuente |
| `IA confianza` | `ALTA` / `MEDIA` / `BAJA` |
| `IA última revisión` | Fecha de la última revisión |
| `IA avisos` | Problemas detectados (URLs no verificadas, errores…) |

**Cuándo deja de revisarse un municipio:** cuando `IA estado moción` es `APROBADA` o `RECHAZADA`, o cuando `RESOLUCIÓN DEL PLENO` ya tiene un resultado. Los que están vacíos, `PENDIENTE`, `PRESENTADA` o `(sin verificar)` se vuelven a revisar en la siguiente ejecución.

### Cuándo escribe en `RESOLUCIÓN DEL PLENO`, la columna pública del mapa

Solo escribe `Aprobada` o `Rechazada` cuando se cumplen **las tres** condiciones:

- la confianza es `ALTA`;
- la fuente es una URL que apareció de verdad en las búsquedas;
- la celda estaba vacía o sin resultado. Nunca sobrescribe una resolución que ya existe.

En el resto de casos solo rellena las columnas `IA …`, para que el equipo lo revise. Si prefieres revisarlo siempre a mano antes de publicar, pon `ESCRIBIR_RESOLUCION: false` en el nodo **Seleccionar municipios**.

## Instalación (una sola vez)

1. **Importar el flujo.** En n8n: *Workflows → Import from File* → elige `flujo-mociones-plataforma-dorada.json`.
2. **Credencial de Google Sheets.** Abre el nodo *Leer hoja de mociones* y crea o elige una credencial *Google Sheets OAuth2* con una cuenta que pueda **editar** la hoja de mociones. Selecciona la misma credencial en *Actualizar hoja de mociones* y en *Guardar en Fichas IA*.
3. **Credencial de Claude.** Abre *Claude · ronda 1* y crea una credencial *Header Auth*:
   - **Name:** `x-api-key`
   - **Value:** tu clave de API de Anthropic (se crea en <https://console.anthropic.com> → *API Keys*).

   Selecciona la misma credencial en las rondas 2, 3 y 4.
4. **Pestaña de historial.** En la hoja de mociones crea una pestaña vacía llamada exactamente `Fichas IA`. Las cabeceras se escriben solas.
5. **Primera prueba.** En el nodo *Seleccionar municipios* cambia `MAX_MUNICIPIOS: 40` por `MAX_MUNICIPIOS: 1` y pulsa *Execute workflow*. Revisa la fila escrita en la hoja y en `Fichas IA`, sobre todo las columnas de tokens, para conocer el coste real. Después vuelve a poner el valor que quieras.
6. **Activar.** Activa el flujo con el interruptor *Active*. Se ejecutará cada 15 días a las 8:00 (hora de Madrid).

## Coste orientativo

Usa `claude-opus-5-5` con esfuerzo `high`: 4 $ por millón de tokens de entrada y 20 $ por millón de salida, más 10 $ por cada 1.000 búsquedas web. Las actas en PDF son largas, así que el coste depende mucho de cada ayuntamiento: **calcula entre 0,5 y 3 $ por municipio** y compruébalo en las columnas `tokens_entrada`, `tokens_salida` y `busquedas_web` de `Fichas IA`.

Puedes ajustarlo en el nodo *Seleccionar municipios*:

- `MAX_MUNICIPIOS`: municipios por ejecución.
- `MAX_BUSQUEDAS` / `MAX_LECTURAS`: búsquedas y páginas leídas por municipio.
- `ESFUERZO`: `medium` sale más barato. `high` es más exhaustivo.
- `MODELO`: `claude-sonnet-5-5` sale más o menos a la mitad de precio, con menos rigor en documentos complejos.

## Privacidad

A Claude solo se envían el **nombre del municipio, la provincia, la comunidad autónoma, el código INE (si existe una columna `CÓDIGO INE`) y la fecha de presentación**. No se envían nombres de personas, teléfonos, correos ni justificantes de la hoja.

## Limitaciones

- Claude solo encuentra lo que el ayuntamiento haya publicado en internet. Muchos plenos tardan semanas en colgar el acta, así que lo normal es que una moción pase un tiempo como `PRESENTADA` o `PENDIENTE`.
- Las actas escaneadas como imagen, o las que solo están en vídeo, pueden no leerse.
- Los municipios con nombre repetido se distinguen por la provincia. Si hay dudas, añade a la hoja una columna `CÓDIGO INE` y el flujo la enviará.
- Revisa siempre la columna `IA avisos` y la lista *a_revisar_a_mano* del nodo *Resumen*.

## Modificar el flujo

El JSON se genera a partir de los ficheros de `src/`. No edites el JSON a mano:

```bash
node docs/n8n/generar-flujo.mjs   # regenera flujo-mociones-plataforma-dorada.json
node docs/n8n/probar-flujo.mjs    # prueba la lógica con datos simulados (sin n8n ni API)
```

| Fichero | Nodo |
|---|---|
| `src/prompt-sistema.md` | Instrucciones de Claude (se incrustan en *Seleccionar municipios*) |
| `src/seleccionar.js` | *Seleccionar municipios*: configuración, filtro y petición |
| `src/ronda.js` | *Ronda 1..4*: continuar la búsqueda si Claude la deja a medias (`pause_turn`) |
| `src/resultado.js` | *Validar ficha* |
| `src/filas.js` | *Filas a actualizar* |
| `src/ficha.js` | *Ficha para el registro* |
| `src/resumen.js` | *Resumen* |

Si ya importaste el flujo, vuelve a importarlo después de regenerarlo, o pega el código del fichero en el nodo correspondiente.
