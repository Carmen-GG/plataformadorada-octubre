# Formulario de contacto → email

El sitio utiliza el endpoint de `contacto.gs` para enviar los mensajes del formulario de contacto a:

`plataformadoradaes@gmail.com`

## Configuración

1. Abre Google Apps Script.
2. Crea un proyecto nuevo (o utiliza el mismo proyecto que el contador de adhesiones).
3. Añade el contenido de `contacto.gs`.
4. Ve a **Implementar → Nueva implementación → Aplicación web**.
5. Ejecutar como: **tú**.
6. Quién tiene acceso: **Cualquiera**.
7. Copia la URL que termina en `/exec`.
8. En `.env.local` del proyecto añade:

```env
VITE_CONTACT_FORM_URL=https://script.google.com/macros/s/TU_ID/exec
```

9. Reinicia Vite (`npm.cmd run dev`).

El navegador envía únicamente nombre, email y mensaje al endpoint. El script no devuelve ni expone ninguna hoja de cálculo.

Si `VITE_CONTACT_FORM_URL` está vacío, el formulario utiliza como alternativa un enlace `mailto:` a `plataformadoradaes@gmail.com`.
