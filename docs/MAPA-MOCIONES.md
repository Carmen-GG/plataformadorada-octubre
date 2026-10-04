# Mapa territorial: adhesiones, entidades y mociones

## Qué cambia

La página `/datos` sustituye la tabla «Por territorio» por un mapa esquemático de España. Cada comunidad autónoma muestra cuatro círculos:

- Dorado: adhesiones.
- Marrón: entidades.
- Ocre/naranja: mociones presentadas.
- Verde: mociones aceptadas.

El tamaño del círculo es proporcional al valor y al pasar el cursor se muestra el valor completo.

## Fuente de mociones

Google Sheets:
`15HvL9Mu5r9iSGq4sJ2vYTlrkDY3SubfEOxYCmGL10Kg`

Pestaña:
`presentades`

Columnas utilizadas:

- `NOMBRE ENTIDAD LOCAL O AYUNTAMIENTO EN LA QUE SE HA PRESENTADO LA MOCIÓN`
- `COMUNIDAD AUTÓNOMA`
- `FECHA EN QUE SE HA PRESENTADO LA MOCIÓN`
- `RESOLUCIÓN DEL PLENO`

Una fila se contabiliza como moción presentada cuando tiene comunidad autónoma reconocible y entidad/ayuntamiento o fecha de presentación.

Una moción se contabiliza como aceptada cuando `RESOLUCIÓN DEL PLENO` empieza por `Aprobada` o `Aceptada`.

## Importante: actualizar Apps Script

El archivo `google-apps-script/publico.gs` ya contiene la lectura de mociones. Hay que copiar ese archivo al proyecto de Google Apps Script que sirve los datos públicos, guardar y crear una nueva versión de la implementación web.

Después de desplegar, la respuesta de `?action=public` incluirá:

```json
"mociones": {
  "Cataluña": {
    "mocionesPresentadas": 0,
    "mocionesAceptadas": 0
  }
}
```

Los números reales los calculará Apps Script directamente desde la hoja.

No se envían a la web nombres de personas, teléfonos, justificantes ni otros datos privados de la hoja de mociones.

## Comprobación local

Con el proyecto ejecutándose:

`http://localhost:3000/datos`

La ruta pública de datos que usa la página es:

`http://localhost:3000/api/cms?action=public`

Si Apps Script todavía no se ha actualizado, el mapa seguirá mostrando adhesiones/entidades cuando estén disponibles y dejará las mociones en cero hasta recibir el nuevo bloque `mociones`.
