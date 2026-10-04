# Contador público de adhesiones — Plataforma Dorada

Flujo:

**Google Form de adhesión → Hoja de respuestas privada → Google Apps Script → web pública**

El navegador recibe únicamente un número agregado. No se publican nombres, correos electrónicos, ciudades ni respuestas individuales.

## 1. Abrir la hoja de respuestas

Abre el Google Form de adhesión de Plataforma Dorada y entra en **Respuestas → Ver respuestas en Hojas de cálculo**.

## 2. Crear el Apps Script

En la hoja de cálculo:

**Extensiones → Apps Script**

Borra el contenido de `Code.gs` y pega el contenido de `adhesiones.gs`.

## 3. Publicarlo como aplicación web

En Apps Script:

**Implementar → Nueva implementación → Aplicación web**

Configura:

- **Ejecutar como:** tú
- **Quién tiene acceso:** cualquiera

Pulsa **Implementar** y copia la URL que termina en `/exec`.

## 4. Conectar la web

En la carpeta del proyecto crea un archivo llamado `.env.local`:

```env
VITE_ADHESION_COUNT_URL=https://script.google.com/macros/s/TU_ID/exec
```

Sustituye `TU_ID` por la URL real que te da Google.

Después reinicia Vite:

```powershell
npm.cmd run dev
```

## 5. Actualización automática

La web consulta el contador al cargar y después aproximadamente cada **15 segundos** mientras haya una página abierta que muestre el contador.

Esto permite que una nueva adhesión aparezca automáticamente sin recargar la web. El endpoint usa JSONP para evitar problemas de CORS y solo devuelve:

```json
{
  "adhesiones": 123,
  "actualizado": "2026-09-28T00:00:00.000Z"
}
```

La cifra cuenta exclusivamente las respuestas cuya opción sea:

`A título particular, como persona individual`
