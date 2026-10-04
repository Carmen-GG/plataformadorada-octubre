/**
 * Contenido de ejemplo claramente identificable.
 * NO son datos reales: los marcadores [ ] se sustituirán por datos del backoffice.
 */

export const SITE = {
  name: "Plataforma Dorada",
  claim: "Plataforma Dorada: Por un Pacto de Estado por la Dependencia y los Cuidados",
  email: "plataformadoradaes@gmail.com",
  // Lista colaborativa de Spotify (solo el identificador; se quitan los parámetros de seguimiento).
  spotifyPlaylistId: "0kRnwDpv1l5UsiDVg0Po96",
  // Enlace de INVITACIÓN a colaborar (Spotify → Invitar a colaboradores → copiar enlace).
  // Quien lo tiene puede añadir y QUITAR canciones. Si se deja vacío no se muestra el botón.
  spotifyInviteUrl: "",
  instagram: "https://www.instagram.com/assumptaserna/",
  tiktok: "https://www.tiktok.com/@assumptaserna_fdc",
  joinFormUrl: "https://xurl.es/pacto-adhesion",
  volunteerFormUrl: "https://xurl.es/voluntario",
  testimonyFormUrl: "https://xurl.es/testimonios",
  // Las entidades se adhieren con el mismo formulario (opción «En representación de…»).
  entityFormUrl: "https://xurl.es/pacto-adhesion",
};

export const counters = [
  { key: "adhesiones", label: "Personas adheridas", value: "[NÚMERO DE ADHESIONES]" },
  { key: "voluntarios", label: "Voluntarios y voluntarias", value: "[NÚMERO]" },
  { key: "entidades", label: "Entidades adheridas", value: "[NÚMERO]" },
  { key: "ayuntamientos", label: "Ayuntamientos", value: "[NÚMERO]" },
];

export const indicators = [
  {
    key: "lista_espera",
    value: "[NÚMERO]",
    label: "Personas en lista de espera de servicios de dependencia",
    source: "Fuente oficial del SAAD",
  },
  {
    key: "tiempo_tramitacion",
    value: "[NÚMERO] meses",
    label: "Tiempo medio desde la solicitud hasta la resolución",
    source: "Fuente oficial del SAAD",
  },
  {
    key: "cuidadores_convenio",
    value: "[NÚMERO]",
    label: "Cuidadores no profesionales con convenio especial de Seguridad Social",
    source: "IMSERSO",
  },
  {
    key: "municipios_mociones_aprobadas",
    value: "[NÚMERO]",
    label: "Municipios con mociones aprobadas a favor del Pacto",
    source: "Registro de mociones de Plataforma Dorada",
  },
];

export const regions = [
  "Andalucía",
  "Aragón",
  "Asturias",
  "Illes Balears",
  "Canarias",
  "Cantabria",
  "Castilla-La Mancha",
  "Castilla y León",
  "Cataluña",
  "Comunitat Valenciana",
  "Extremadura",
  "Galicia",
  "La Rioja",
  "Madrid",
  "Murcia",
  "Navarra",
  "País Vasco",
  "Ceuta",
  "Melilla",
].map((name) => ({ name, adhesiones: "[NÚMERO]", entidades: "[NÚMERO]" }));

export const milestones = [
  {
    date: "[FECHA DE INICIO]",
    title: "Nace Plataforma Dorada",
    description: "Inicio del movimiento ciudadano. [DESCRIPCIÓN PENDIENTE]",
  },
  {
    date: "[FECHA]",
    title: "Primeras adhesiones",
    description: "[DESCRIPCIÓN PENDIENTE]",
  },
  {
    date: "[FECHA]",
    title: "Primera entidad adherida",
    description: "[NOMBRE DE ENTIDAD] · [DESCRIPCIÓN PENDIENTE]",
  },
];

export const events = [
  {
    day: "[DD]",
    month: "[MES]",
    title: "[TÍTULO DEL EVENTO]",
    place: "[LUGAR] · [HORA]",
    past: false,
  },
  {
    day: "[DD]",
    month: "[MES]",
    title: "[TÍTULO DEL EVENTO]",
    place: "[LUGAR] · [HORA]",
    past: false,
  },
  {
    day: "[DD]",
    month: "[MES]",
    title: "[TÍTULO DEL EVENTO REALIZADO]",
    place: "[LUGAR]",
    past: true,
  },
];

export const news = [
  { title: "[TITULAR DE LA NOTICIA]", media: "[MEDIO]", date: "[FECHA]", url: "#" },
  { title: "[TITULAR DE LA NOTICIA]", media: "[MEDIO]", date: "[FECHA]", url: "#" },
  { title: "[TITULAR DE LA NOTICIA]", media: "[MEDIO]", date: "[FECHA]", url: "#" },
];

export const pressResources = [
  { title: "Dossier de prensa", category: "Documentos", description: "[DESCRIPCIÓN]" },
  { title: "Logotipos", category: "Identidad", description: "[DESCRIPCIÓN]" },
  { title: "Carteles y banners", category: "Materiales", description: "[DESCRIPCIÓN]" },
  { title: "Material para redes", category: "Redes sociales", description: "[DESCRIPCIÓN]" },
];

export const roadmap = [
  { phase: "Fase 1", title: "Difusión y adhesiones", detail: "[DESCRIPCIÓN PENDIENTE]" },
  { phase: "Fase 2", title: "Encuentros territoriales", detail: "[DESCRIPCIÓN PENDIENTE]" },
  { phase: "Fase 3", title: "Propuesta del Pacto de Estado", detail: "[DESCRIPCIÓN PENDIENTE]" },
];
