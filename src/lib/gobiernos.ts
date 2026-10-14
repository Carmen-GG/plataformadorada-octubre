// Gobiernos autonómicos para la portada. Cada Gobierno lleva su nombre ya escrito en los 8 idiomas
// (la gramática del «Gobierno de…» cambia mucho de un idioma a otro, así que no se compone por reglas).
// Los que han dado su apoyo se marcan con «Sí» en la pestaña GobiernosWeb de la hoja del CMS.
import type { Locale } from "./i18n";

export type Gobierno = { key: string; labels: Record<Locale, string>; aliases: string[] };

export const GOBIERNOS: Gobierno[] = [
  {
    key: "Andalucía",
    labels: { es: "Gobierno de Andalucía", ca: "Govern d'Andalusia", va: "Govern d'Andalusia", eu: "Andaluziako Gobernua", gl: "Goberno de Andalucía", en: "Government of Andalusia", fr: "Gouvernement d'Andalousie", de: "Regierung von Andalusien" },
    aliases: [],
  },
  {
    key: "Aragón",
    labels: { es: "Gobierno de Aragón", ca: "Govern d'Aragó", va: "Govern d'Aragó", eu: "Aragoiko Gobernua", gl: "Goberno de Aragón", en: "Government of Aragon", fr: "Gouvernement d'Aragon", de: "Regierung von Aragonien" },
    aliases: [],
  },
  {
    key: "Asturias",
    labels: { es: "Gobierno del Principado de Asturias", ca: "Govern del Principat d'Astúries", va: "Govern del Principat d'Astúries", eu: "Asturiasko Printzerriaren Gobernua", gl: "Goberno do Principado de Asturias", en: "Government of the Principality of Asturias", fr: "Gouvernement de la Principauté des Asturies", de: "Regierung des Fürstentums Asturien" },
    aliases: ["principado de asturias"],
  },
  {
    key: "Illes Balears",
    labels: { es: "Gobierno de las Illes Balears", ca: "Govern de les Illes Balears", va: "Govern de les Illes Balears", eu: "Balear Uharteetako Gobernua", gl: "Goberno das Illas Baleares", en: "Government of the Balearic Islands", fr: "Gouvernement des Îles Baléares", de: "Regierung der Balearen" },
    aliases: ["islas baleares", "baleares", "illes balears"],
  },
  {
    key: "Canarias",
    labels: { es: "Gobierno de Canarias", ca: "Govern de Canàries", va: "Govern de Canàries", eu: "Kanariar Uharteetako Gobernua", gl: "Goberno de Canarias", en: "Government of the Canary Islands", fr: "Gouvernement des Canaries", de: "Regierung der Kanarischen Inseln" },
    aliases: ["islas canarias"],
  },
  {
    key: "Cantabria",
    labels: { es: "Gobierno de Cantabria", ca: "Govern de Cantàbria", va: "Govern de Cantàbria", eu: "Kantabriako Gobernua", gl: "Goberno de Cantabria", en: "Government of Cantabria", fr: "Gouvernement de Cantabrie", de: "Regierung von Kantabrien" },
    aliases: [],
  },
  {
    key: "Castilla-La Mancha",
    labels: { es: "Gobierno de Castilla-La Mancha", ca: "Govern de Castella-la Manxa", va: "Govern de Castella-la Manxa", eu: "Gaztela-Mantxako Gobernua", gl: "Goberno de Castela-A Mancha", en: "Government of Castilla-La Mancha", fr: "Gouvernement de Castille-La Manche", de: "Regierung von Kastilien-La Mancha" },
    aliases: ["castilla la mancha"],
  },
  {
    key: "Castilla y León",
    labels: { es: "Gobierno de Castilla y León", ca: "Govern de Castella i Lleó", va: "Govern de Castella i Lleó", eu: "Gaztela eta Leongo Gobernua", gl: "Goberno de Castela e León", en: "Government of Castile and León", fr: "Gouvernement de Castille-et-León", de: "Regierung von Kastilien und León" },
    aliases: [],
  },
  {
    key: "Cataluña",
    labels: { es: "Gobierno de Cataluña", ca: "Govern de Catalunya", va: "Govern de Catalunya", eu: "Kataluniako Gobernua", gl: "Goberno de Cataluña", en: "Government of Catalonia", fr: "Gouvernement de Catalogne", de: "Regierung von Katalonien" },
    aliases: ["catalunya"],
  },
  {
    key: "Comunitat Valenciana",
    labels: { es: "Gobierno de la Comunitat Valenciana", ca: "Govern de la Comunitat Valenciana", va: "Govern de la Comunitat Valenciana", eu: "Valentziako Erkidegoko Gobernua", gl: "Goberno da Comunitat Valenciana", en: "Government of the Valencian Community", fr: "Gouvernement de la Communauté valencienne", de: "Regierung der Valencianischen Gemeinschaft" },
    aliases: ["comunidad valenciana", "valencia", "comunitat valenciana"],
  },
  {
    key: "Extremadura",
    labels: { es: "Gobierno de Extremadura", ca: "Govern d'Extremadura", va: "Govern d'Extremadura", eu: "Extremadurako Gobernua", gl: "Goberno de Extremadura", en: "Government of Extremadura", fr: "Gouvernement d'Estrémadure", de: "Regierung von Extremadura" },
    aliases: [],
  },
  {
    key: "Galicia",
    labels: { es: "Gobierno de Galicia", ca: "Govern de Galícia", va: "Govern de Galícia", eu: "Galiziako Gobernua", gl: "Goberno de Galicia", en: "Government of Galicia", fr: "Gouvernement de Galice", de: "Regierung von Galicien" },
    aliases: ["galiza"],
  },
  {
    key: "La Rioja",
    labels: { es: "Gobierno de La Rioja", ca: "Govern de La Rioja", va: "Govern de La Rioja", eu: "Errioxako Gobernua", gl: "Goberno de A Rioxa", en: "Government of La Rioja", fr: "Gouvernement de La Rioja", de: "Regierung von La Rioja" },
    aliases: ["rioja"],
  },
  {
    key: "Madrid",
    labels: { es: "Gobierno de la Comunidad de Madrid", ca: "Govern de la Comunitat de Madrid", va: "Govern de la Comunitat de Madrid", eu: "Madrilgo Erkidegoko Gobernua", gl: "Goberno da Comunidade de Madrid", en: "Government of the Community of Madrid", fr: "Gouvernement de la Communauté de Madrid", de: "Regierung der Region Madrid" },
    aliases: ["comunidad de madrid"],
  },
  {
    key: "Murcia",
    labels: { es: "Gobierno de la Región de Murcia", ca: "Govern de la Regió de Múrcia", va: "Govern de la Regió de Múrcia", eu: "Murtziako Eskualdeko Gobernua", gl: "Goberno da Rexión de Murcia", en: "Government of the Region of Murcia", fr: "Gouvernement de la Région de Murcie", de: "Regierung der Region Murcia" },
    aliases: ["region de murcia"],
  },
  {
    key: "Navarra",
    labels: { es: "Gobierno de Navarra", ca: "Govern de Navarra", va: "Govern de Navarra", eu: "Nafarroako Gobernua", gl: "Goberno de Navarra", en: "Government of Navarre", fr: "Gouvernement de Navarre", de: "Regierung von Navarra" },
    aliases: ["comunidad foral de navarra", "nafarroa"],
  },
  {
    key: "País Vasco",
    labels: { es: "Gobierno Vasco", ca: "Govern Basc", va: "Govern Basc", eu: "Eusko Jaurlaritza", gl: "Goberno Vasco", en: "Basque Government", fr: "Gouvernement basque", de: "Baskische Regierung" },
    aliases: ["euskadi", "pais vasco"],
  },
  {
    key: "Ceuta",
    labels: { es: "Gobierno de Ceuta", ca: "Govern de Ceuta", va: "Govern de Ceuta", eu: "Ceutako Gobernua", gl: "Goberno de Ceuta", en: "Government of Ceuta", fr: "Gouvernement de Ceuta", de: "Regierung von Ceuta" },
    aliases: ["ciudad autonoma de ceuta"],
  },
  {
    key: "Melilla",
    labels: { es: "Gobierno de Melilla", ca: "Govern de Melilla", va: "Govern de Melilla", eu: "Melillako Gobernua", gl: "Goberno de Melilla", en: "Government of Melilla", fr: "Gouvernement de Melilla", de: "Regierung von Melilla" },
    aliases: ["ciudad autonoma de melilla"],
  },
];

/** Quita tildes, mayúsculas y prefijos para comparar nombres escritos a mano en la hoja. */
export function normalizeRegion(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^(gobierno|govern)( de| del)?( la| las)? /, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function matchGobierno(g: Gobierno, sheetName: string): boolean {
  const n = normalizeRegion(sheetName);
  return [g.key, ...g.aliases].some((name) => normalizeRegion(name) === n);
}
