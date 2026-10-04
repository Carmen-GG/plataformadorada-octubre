# Indicadores automáticos — Plataforma Dorada

## Primera instalación

1. Abre el proyecto de Google Apps Script que ya utiliza Plataforma Dorada.
2. Sustituye el contenido de `publico.gs` por el archivo `google-apps-script/publico.gs` de este paquete.
3. Guarda.
4. En el editor de Apps Script selecciona la función `setupIndicadores`.
5. Pulsa **Ejecutar** y concede los permisos que solicite Google.
6. Se creará la pestaña **Indicadores** en la hoja de mociones (`15HvL9Mu5r9iSGq4sJ2vYTlrkDY3SubfEOxYCmGL10Kg`).
7. Se creará un activador diario para `actualizarIndicadores`.

## Qué actualiza

- Lista de espera: Panel SAAD del Ministerio de Derechos Sociales.
- Tiempo medio de tramitación: Panel SAAD; se muestra en meses a partir de los 314 días publicados.
- Cuidadores: número de afiliados al convenio especial de cuidadores no profesionales, 1º trimestre de 2026, IMSERSO.
- Municipios con mociones aprobadas: cálculo de municipios/entidades locales únicos de `presentades` cuya resolución es `Aprobada` o `Aceptada`.

## Importante sobre el indicador de cuidadores

No se publica como «porcentaje sin apoyo formal», porque las fuentes oficiales consultadas no proporcionan un denominador estatal comparable que permita calcular ese porcentaje de forma rigurosa. Por eso la web muestra el indicador verificable: número de cuidadores no profesionales con convenio especial de Seguridad Social.
