# Plataforma Dorada

Plataforma Dorada — movimiento ciudadano por un Pacto de Estado por la Dependencia y los Cuidados.

## Desarrollo local

Este proyecto es independiente de Lovable y puede desarrollarse localmente con Node.js y npm.

### Requisitos

- Node.js LTS
- npm

### Instalar dependencias

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en la URL que indique Vite (normalmente `http://localhost:5173`).

### Crear una compilación de producción

```bash
npm run build
```

### Previsualizar la compilación

```bash
npm run preview
```

## Arquitectura

- React
- TypeScript
- Vite
- TanStack Start / TanStack Router
- Tailwind CSS
- Nitro

## Independencia de Lovable

Este repositorio no requiere Lovable para instalar, ejecutar, editar o compilar la aplicación.

Lovable puede utilizarse opcionalmente como herramienta de edición, pero no forma parte de las dependencias de ejecución del proyecto.


## Redes sociales

La página `/redes-sociales` muestra las publicaciones recientes mediante los sistemas oficiales de inserción de Instagram y TikTok. No requiere claves API en el frontend.

- Instagram: `@assumptaserna`
- TikTok: `@assumptaserna_fdc`
- El perfil de TikTok se integra mediante el Creator Profile Embed oficial, que puede mostrar hasta 10 vídeos recientes.
- Instagram se integra mediante el embed del perfil; la disponibilidad depende de que el perfil sea público y permita la inserción.

## Voluntariado

El botón de `/voluntariado` abre el formulario oficial de Google Forms:

`https://docs.google.com/forms/d/e/1FAIpQLSfqqhGbA71cZ8S7h29mrlTMau76PiVBK0Hbbf5MNisx8_0R_w/viewform`

## Idiomas

- Idiomas: castellano (por defecto), catalán, euskera y gallego.
- Textos de interfaz: `src/lib/i18n.tsx` (diccionario base) y `src/lib/i18n-extra.ts` (traducciones adicionales; la clave es el texto en castellano).
- Textos legales: `src/lib/legal-content.ts`, escritos completos en los cuatro idiomas.
- Las traducciones al euskera y al gallego están pendientes de revisión por hablantes nativos.

## Textos legales (borrador)

Están redactados para un movimiento ciudadano sin personalidad jurídica. Los datos que faltan aparecen entre corchetes y resaltados en la web: `[RESPONSABLE]`, `[DOMICILIO]`, `[DATOS DEL FORMULARIO DE ADHESIÓN]`, `[DATOS DEL FORMULARIO DE VOLUNTARIADO]`, `[PLAZO]`, `[CONFIRMAR ACCESO]`, `[CONDICIONES DE USO DE LOS MATERIALES]` y `[FECHA]`. Búscalos con `[` en `legal-content.ts`. Requieren revisión jurídica antes de publicar.

## Cookies y redes sociales

Instagram y TikTok solo se cargan si la persona pulsa «Aceptar» en el aviso de cookies (`src/lib/consent.ts`). Se puede cambiar la elección desde el pie de página.

## Datos en vivo desde Google Sheets

Contadores y listas públicas (adhesiones, voluntarios, testimonios, por comunidad): ver
`google-apps-script/PUBLICO-README.md`.

## SEO

- Define `VITE_SITE_URL` (p. ej. `https://plataformadorada.es`, sin barra final) al compilar. Con ella la web emite URL canónica, `og:url`, imagen al compartir (`public/og-image.png`) y datos estructurados de la organización.
- `/robots.txt` y `/sitemap.xml` se generan solos (`src/routes/robots[.]txt.ts`, `src/routes/sitemap[.]xml.ts`). Si añades una página pública nueva, inclúyela en `PUBLIC_PATHS` de `src/lib/seo.ts`.
- El backoffice lleva `noindex` y está excluido en `robots.txt`.
- Las tipografías (Inter y Fraunces) se sirven desde la propia web: no se envía la IP de las visitas a Google Fonts.
- Limitación conocida: los idiomas se traducen en el navegador, con una única dirección para todos. Los buscadores solo ven el castellano, y por eso no hay etiquetas `hreflang`. Para posicionar en catalán, euskera o gallego hay que crear direcciones por idioma (`/ca/…`).
