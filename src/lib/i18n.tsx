import { extraTranslations } from "./i18n-extra";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const LOCALES = ["es", "ca", "eu", "gl"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_LABELS: Record<Locale, string> = { es: "ES", ca: "CA", eu: "EU", gl: "GL" };
export const LOCALE_NAMES: Record<Locale, string> = {
  es: "Castellano",
  ca: "Català",
  eu: "Euskara",
  gl: "Galego",
};
type Dictionary = Record<string, string>;

const es: Dictionary = {
  "nav.home": "Inicio",
  "nav.about": "La Plataforma",
  "nav.social": "Redes sociales",
  "nav.dependency": "La Dependencia",
  "nav.join": "Únete",
  "nav.volunteer": "Voluntariado",
  "nav.testimonials": "Testimonios",
  "nav.events": "Eventos",
  "nav.data": "Datos e indicadores",
  "nav.entities": "Entidades adheridas",
  "nav.news": "Novedades",
  "nav.press": "Prensa y recursos",
  "nav.contact": "Contacto",
  "nav.menu": "Menú",
  "nav.close": "Cerrar",
  "nav.language": "Idioma",
  "nav.skip": "Saltar al contenido principal",
  "cta.join": "Adhiérete",
  "cta.joinNow": "Adhiérete ahora",
  "cta.collaborate": "Quiero colaborar",
  "cta.share": "Comparte esta página",
  "home.badge": "Movimiento ciudadano · no partidista",
  "home.title": "Plataforma Dorada: Por un Pacto de Estado por la Dependencia y los Cuidados",
  "home.lead":
    "La dependencia no puede esperar. Miles de familias esperan meses o años una valoración, una ayuda o una plaza. Pedimos un compromiso estable, apartidista y financiado con quien cuida y con quien es cuidado.",
  "home.countersTitle": "Adhesiones en vivo",
  "home.goal": "Objetivo",
  "common.updated": "Actualizado",
  "common.viewAll": "Ver todo",
  "common.placeholderNote":
    "Contenido de ejemplo. Los datos reales se cargarán desde el backoffice.",
};

const ca: Dictionary = {
  "nav.home": "Inici",
  "nav.about": "La Plataforma",
  "nav.social": "Xarxes socials",
  "nav.dependency": "La Dependència",
  "nav.join": "Uneix-t'hi",
  "nav.volunteer": "Voluntariat",
  "nav.testimonials": "Testimonis",
  "nav.events": "Esdeveniments",
  "nav.data": "Dades i indicadors",
  "nav.entities": "Entitats adherides",
  "nav.news": "Novetats",
  "nav.press": "Premsa i recursos",
  "nav.contact": "Contacte",
  "nav.menu": "Menú",
  "nav.close": "Tanca",
  "nav.language": "Idioma",
  "nav.skip": "Vés al contingut principal",
  "cta.join": "Adhereix-t'hi",
  "cta.joinNow": "Adhereix-t'hi ara",
  "cta.collaborate": "Vull col·laborar",
  "cta.share": "Comparteix aquesta pàgina",
  "home.badge": "Moviment ciutadà · no partidista",
  "home.title": "Plataforma Dorada: Per un Pacte d'Estat per la Dependència i les Cures",
  "home.lead":
    "La dependència no pot esperar. Milers de famílies esperen mesos o anys una valoració, una ajuda o una plaça. Demanem un compromís estable, apartidista i finançat amb qui cuida i amb qui és cuidat.",
  "home.countersTitle": "Adhesions en directe",
  "home.goal": "Objectiu",
  "common.updated": "Actualitzat",
  "common.viewAll": "Veure-ho tot",
  "common.placeholderNote":
    "Contingut d'exemple. Les dades reals es carregaran des del backoffice.",
};

const eu: Dictionary = {
  "nav.home": "Hasiera",
  "nav.about": "Plataforma",
  "nav.social": "Sare sozialak",
  "nav.dependency": "Mendekotasuna",
  "nav.join": "Bat egin",
  "nav.volunteer": "Boluntariotza",
  "nav.testimonials": "Testigantzak",
  "nav.events": "Ekitaldiak",
  "nav.data": "Datuak eta adierazleak",
  "nav.entities": "Atxikitako erakundeak",
  "nav.news": "Albisteak",
  "nav.press": "Prentsa eta baliabideak",
  "nav.contact": "Harremana",
  "nav.menu": "Menua",
  "nav.close": "Itxi",
  "nav.language": "Hizkuntza",
  "nav.skip": "Joan eduki nagusira",
  "cta.join": "Bat egin",
  "cta.joinNow": "Bat egin orain",
  "cta.collaborate": "Lagundu nahi dut",
  "cta.share": "Partekatu orri hau",
  "home.badge": "Herritarren mugimendua · alderdikeriarik gabe",
  "home.title": "Plataforma Dorada: Mendekotasunaren eta Zaintzen aldeko Estatu Itun baten alde",
  "home.lead":
    "Mendekotasunak ezin du itxaron. Milaka familiak hilabeteak edo urteak ematen dituzte balorazio, laguntza edo plaza baten zain. Konpromiso egonkorra, alderdikeriarik gabekoa eta finantzatua eskatzen dugu, zaintzen duenarekin eta zaindua denarekin.",
  "home.countersTitle": "Atxikimenduak zuzenean",
  "home.goal": "Helburua",
  "common.updated": "Eguneratuta",
  "common.viewAll": "Dena ikusi",
  "common.placeholderNote": "Adibidezko edukia. Benetako datuak backoffice-tik kargatuko dira.",
};

const gl: Dictionary = {
  "nav.home": "Inicio",
  "nav.about": "A Plataforma",
  "nav.social": "Redes sociais",
  "nav.dependency": "A Dependencia",
  "nav.join": "Únete",
  "nav.volunteer": "Voluntariado",
  "nav.testimonials": "Testemuños",
  "nav.events": "Eventos",
  "nav.data": "Datos e indicadores",
  "nav.entities": "Entidades adheridas",
  "nav.news": "Novidades",
  "nav.press": "Prensa e recursos",
  "nav.contact": "Contacto",
  "nav.menu": "Menú",
  "nav.close": "Pechar",
  "nav.language": "Idioma",
  "nav.skip": "Ir ao contido principal",
  "cta.join": "Adhírete",
  "cta.joinNow": "Adhírete agora",
  "cta.collaborate": "Quero colaborar",
  "cta.share": "Comparte esta páxina",
  "home.badge": "Movemento cidadán · non partidista",
  "home.title": "Plataforma Dorada: Por un Pacto de Estado pola Dependencia e os Coidados",
  "home.lead":
    "A dependencia non pode esperar. Miles de familias agardan meses ou anos por unha valoración, unha axuda ou unha praza. Pedimos un compromiso estable, apartidista e financiado con quen coida e con quen é coidado.",
  "home.countersTitle": "Adhesións en directo",
  "home.goal": "Obxectivo",
  "common.updated": "Actualizado",
  "common.viewAll": "Ver todo",
  "common.placeholderNote": "Contido de exemplo. Os datos reais cargaranse desde o backoffice.",
};

const dictionaries: Record<Locale, Dictionary> = { es, ca, eu, gl };

// Textos visibles del sitio. Se mantienen fuera de los componentes para que el cambio de idioma
// afecte también al contenido que todavía procede de componentes existentes del proyecto.
const pageTranslations: Record<string, Partial<Record<Locale, string>>> = {
  "Por un Pacto de Estado por la dependencia y los cuidados": {
    ca: "Per un Pacte d'Estat per la Dependència i les Cures",
    eu: "Mendekotasunaren eta Zaintzen aldeko Estatu Itun baten alde",
    gl: "Por un Pacto de Estado pola Dependencia e os Coidados",
  },
  dependencia: { ca: "dependència", eu: "mendekotasuna", gl: "dependencia" },
  "y los cuidados": { ca: "i les cures", eu: "eta zaintzak", gl: "e os coidados" },
  "Datos agregados. Nunca se publican datos personales ni ubicaciones individuales.": {
    ca: "Dades agregades. Mai no es publiquen dades personals ni ubicacions individuals.",
    eu: "Datu agregatuak. Ez dira inoiz datu pertsonalik edo banakako kokapenik argitaratzen.",
    gl: "Datos agregados. Nunca se publican datos persoais nin localizacións individuais.",
  },
  "Cifras del movimiento": {
    ca: "Xifres del moviment",
    eu: "Mugimenduaren zifrak",
    gl: "Cifras do movemento",
  },
  "¿Qué está pasando?": {
    ca: "Què està passant?",
    eu: "Zer gertatzen ari da?",
    gl: "Que está a pasar?",
  },
  "Indicadores del sistema de atención a la dependencia. Se ampliarán con nuevas fuentes verificadas desde el backoffice.":
    {
      ca: "Indicadors del sistema d'atenció a la dependència. S'ampliaran amb noves fonts verificades des del backoffice.",
      eu: "Mendekotasuna artatzeko sistemaren adierazleak. Backoffice-tik egiaztatutako iturri berriekin zabalduko dira.",
      gl: "Indicadores do sistema de atención á dependencia. Ampliaranse con novas fontes verificadas desde o backoffice.",
    },
  "Ver todos los datos e indicadores": {
    ca: "Veure totes les dades i indicadors",
    eu: "Ikusi datu eta adierazle guztiak",
    gl: "Ver todos os datos e indicadores",
  },
  "Mapa de adhesiones": {
    ca: "Mapa d'adhesions",
    eu: "Atxikimenduen mapa",
    gl: "Mapa de adhesións",
  },
  "Datos agregados por territorio": {
    ca: "Dades agregades per territori",
    eu: "Lurraldeka agregatutako datuak",
    gl: "Datos agregados por territorio",
  },
  adhesiones: { ca: "adhesions", eu: "atxikimendu", gl: "adhesións" },
  "Ver el mapa completo por comunidad y provincia": {
    ca: "Veure el mapa complet per comunitat i província",
    eu: "Ikusi mapa osoa autonomia-erkidego eta probintziaka",
    gl: "Ver o mapa completo por comunidade e provincia",
  },
  Hitos: { ca: "Fites", eu: "Mugarriak", gl: "Fitos" },
  "Últimas adhesiones": {
    ca: "Últimes adhesions",
    eu: "Azken atxikimenduak",
    gl: "Últimas adhesións",
  },
  "Solo se publican las personas que han autorizado expresamente aparecer, con nombre, inicial del primer apellido y ciudad.":
    {
      ca: "Només es publiquen les persones que han autoritzat expressament aparèixer, amb nom, inicial del primer cognom i ciutat.",
      eu: "Berariaz baimendu duten pertsonak bakarrik argitaratzen dira, izenarekin, lehen abizenaren inizialarekin eta hiriarekin.",
      gl: "Só se publican as persoas que autorizaron expresamente aparecer, co nome, a inicial do primeiro apelido e a cidade.",
    },
  "Voces del cuidado": {
    ca: "Veus de les cures",
    eu: "Zaintzaren ahotsak",
    gl: "Voces dos coidados",
  },
  "Leer y compartir testimonios": {
    ca: "Llegir i compartir testimonis",
    eu: "Testigantzak irakurri eta partekatu",
    gl: "Ler e compartir testemuños",
  },
  "Próximos eventos": {
    ca: "Propers esdeveniments",
    eu: "Datozen ekitaldiak",
    gl: "Próximos eventos",
  },
  "Entidades adheridas": {
    ca: "Entitats adherides",
    eu: "Atxikitako erakundeak",
    gl: "Entidades adheridas",
  },
  "Ver todas las entidades": {
    ca: "Veure totes les entitats",
    eu: "Erakunde guztiak ikusi",
    gl: "Ver todas as entidades",
  },
  "Redes sociales": { ca: "Xarxes socials", eu: "Sare sozialak", gl: "Redes sociais" },
  "Síguenos y mira las últimas publicaciones": {
    ca: "Segueix-nos i mira les darreres publicacions",
    eu: "Jarraitu gaitzazu eta ikusi azken argitalpenak",
    gl: "Síguenos e mira as últimas publicacións",
  },
  "Aquí encontrarás las publicaciones más recientes de nuestras redes sociales.": {
    ca: "Aquí trobaràs les publicacions més recents de les nostres xarxes socials.",
    eu: "Hemen aurkituko dituzu gure sare sozialetako azken argitalpenak.",
    gl: "Aquí atoparás as publicacións máis recentes das nosas redes sociais.",
  },
  "Últimas publicaciones de Instagram": {
    ca: "Darreres publicacions d'Instagram",
    eu: "Instagrameko azken argitalpenak",
    gl: "Últimas publicacións de Instagram",
  },
  "Últimos vídeos de TikTok": {
    ca: "Darrers vídeos de TikTok",
    eu: "TikTokeko azken bideoak",
    gl: "Últimos vídeos de TikTok",
  },
  "Ver Instagram": { ca: "Veure Instagram", eu: "Ikusi Instagram", gl: "Ver Instagram" },
  "Ver TikTok": { ca: "Veure TikTok", eu: "Ikusi TikTok", gl: "Ver TikTok" },
  Novedades: { ca: "Novetats", eu: "Albisteak", gl: "Novidades" },
  "Prensa y recursos": {
    ca: "Premsa i recursos",
    eu: "Prentsa eta baliabideak",
    gl: "Prensa e recursos",
  },
  "Logotipos, dossier de prensa y materiales para difundir el movimiento.": {
    ca: "Logotips, dossier de premsa i materials per difondre el moviment.",
    eu: "Logotipoak, prentsa-dosierra eta mugimendua zabaltzeko materialak.",
    gl: "Logotipos, dossier de prensa e materiais para difundir o movemento.",
  },
  "Ir a recursos": { ca: "Anar als recursos", eu: "Baliabideetara joan", gl: "Ir aos recursos" },
  Contacto: { ca: "Contacte", eu: "Harremana", gl: "Contacto" },
  "¿Eres periodista, entidad o ayuntamiento? Escríbenos.": {
    ca: "Ets periodista, entitat o ajuntament? Escriu-nos.",
    eu: "Kazetaria, erakundea edo udala zara? Idatzi.",
    gl: "Es xornalista, entidade ou concello? Escríbenos.",
  },
  Escríbenos: { ca: "Escriu-nos", eu: "Idatzi", gl: "Escríbenos" },
  "Quiénes somos": { ca: "Qui som", eu: "Nor gara", gl: "Quen somos" },
  "La Plataforma": { ca: "La Plataforma", eu: "Plataforma", gl: "A Plataforma" },
  "Nuestra trayectoria": {
    ca: "La nostra trajectòria",
    eu: "Gure ibilbidea",
    gl: "A nosa traxectoria",
  },
  "Hoja de ruta": { ca: "Full de ruta", eu: "Ibilbide-orria", gl: "Folla de ruta" },
  "Únete al movimiento": {
    ca: "Uneix-te al moviment",
    eu: "Bat egin mugimenduarekin",
    gl: "Únete ao movemento",
  },
  "Entender el problema": {
    ca: "Entendre el problema",
    eu: "Arazoa ulertzea",
    gl: "Entender o problema",
  },
  "La Dependencia": { ca: "La Dependència", eu: "Mendekotasuna", gl: "A Dependencia" },
  "¿Qué es la dependencia?": {
    ca: "Què és la dependència?",
    eu: "Zer da mendekotasuna?",
    gl: "Que é a dependencia?",
  },
  "¿Cómo funciona el sistema?": {
    ca: "Com funciona el sistema?",
    eu: "Nola funtzionatzen du sistemak?",
    gl: "Como funciona o sistema?",
  },
  "El problema": { ca: "El problema", eu: "Arazoa", gl: "O problema" },
  "La propuesta": { ca: "La proposta", eu: "Proposamena", gl: "A proposta" },
  "Datos e indicadores": {
    ca: "Dades i indicadors",
    eu: "Datuak eta adierazleak",
    gl: "Datos e indicadores",
  },
  Adhesión: { ca: "Adhesió", eu: "Atxikimendua", gl: "Adhesión" },
  "Únete a Plataforma Dorada": {
    ca: "Uneix-te a Plataforma Dorada",
    eu: "Egin bat Plataforma Doradarekin",
    gl: "Únete a Plataforma Dorada",
  },
  "Rellenar el formulario de adhesión": {
    ca: "Omplir el formulari d'adhesió",
    eu: "Atxikimendu-inprimakia bete",
    gl: "Cubrir o formulario de adhesión",
  },
  "Por qué adherirte": {
    ca: "Per què adherir-t'hi",
    eu: "Zergatik egin bat",
    gl: "Por que adherirte",
  },
  "Qué datos pedimos": {
    ca: "Quines dades demanem",
    eu: "Zer datu eskatzen ditugu",
    gl: "Que datos pedimos",
  },
  "política de privacidad": {
    ca: "política de privacitat",
    eu: "pribatutasun-politika",
    gl: "política de privacidade",
  },
  "Últimas adhesiones públicas": {
    ca: "Últimes adhesions públiques",
    eu: "Azken atxikimendu publikoak",
    gl: "Últimas adhesións públicas",
  },
  Comparte: { ca: "Comparteix", eu: "Partekatu", gl: "Comparte" },
  "Hazte voluntario/a": {
    ca: "Fes-te voluntari/ària",
    eu: "Egin zaitez boluntario/a",
    gl: "Faite voluntario/a",
  },
  "Formas de colaborar": {
    ca: "Maneres de col·laborar",
    eu: "Laguntzeko moduak",
    gl: "Formas de colaborar",
  },
  "Últimas incorporaciones": {
    ca: "Últimes incorporacions",
    eu: "Azken txertatzeak",
    gl: "Últimas incorporacións",
  },
  Testimonios: { ca: "Testimonis", eu: "Testigantzak", gl: "Testemuños" },
  "Voces reales": { ca: "Veus reals", eu: "Benetako ahotsak", gl: "Voces reais" },
  "Comparte tu testimonio": {
    ca: "Comparteix el teu testimoni",
    eu: "Partekatu zure testigantza",
    gl: "Comparte o teu testemuño",
  },
  "Publicación y consentimiento": {
    ca: "Publicació i consentiment",
    eu: "Argitalpena eta baimena",
    gl: "Publicación e consentimento",
  },
  "Red de apoyo": { ca: "Xarxa de suport", eu: "Laguntza-sarea", gl: "Rede de apoio" },
  "Adherir mi entidad": {
    ca: "Adherir la meva entitat",
    eu: "Nire erakundea atxikitzea",
    gl: "Adherir a miña entidade",
  },
  "Filtrar por tipo": {
    ca: "Filtrar per tipus",
    eu: "Motaren arabera iragazi",
    gl: "Filtrar por tipo",
  },
  Todas: { ca: "Totes", eu: "Guztiak", gl: "Todas" },
  Agenda: { ca: "Agenda", eu: "Agenda", gl: "Axenda" },
  Eventos: { ca: "Esdeveniments", eu: "Ekitaldiak", gl: "Eventos" },
  "Eventos realizados": {
    ca: "Esdeveniments realitzats",
    eu: "Egindako ekitaldiak",
    gl: "Eventos realizados",
  },
  Transparencia: { ca: "Transparència", eu: "Gardentasuna", gl: "Transparencia" },
  "El movimiento en cifras": {
    ca: "El moviment en xifres",
    eu: "Mugimendua zifretan",
    gl: "O movemento en cifras",
  },
  "Por territorio": { ca: "Per territori", eu: "Lurraldeka", gl: "Por territorio" },
  Comunidad: { ca: "Comunitat", eu: "Erkidegoa", gl: "Comunidade" },
  Entidades: { ca: "Entitats", eu: "Erakundeak", gl: "Entidades" },
  "Leer noticia": { ca: "Llegir la notícia", eu: "Albistea irakurri", gl: "Ler a noticia" },
  "Para medios y difusión": {
    ca: "Per a mitjans i difusió",
    eu: "Hedabideentzat eta zabalkunderako",
    gl: "Para medios e difusión",
  },
  "Descarga disponible próximamente": {
    ca: "Descàrrega disponible pròximament",
    eu: "Deskarga laster egongo da eskuragarri",
    gl: "Descarga dispoñible proximamente",
  },
  "Imagen de perfil solidaria": {
    ca: "Imatge de perfil solidària",
    eu: "Elkartasuneko profileko irudia",
    gl: "Imaxe de perfil solidaria",
  },
  "Añade el marco dorado a tu foto y compártela en redes.": {
    ca: "Afegeix el marc daurat a la teva foto i comparteix-la a les xarxes.",
    eu: "Gehitu urrezko markoa zure argazkiari eta partekatu sareetan.",
    gl: "Engade o marco dourado á túa foto e compártea nas redes.",
  },
  "Crear mi imagen": {
    ca: "Crear la meva imatge",
    eu: "Nire irudia sortu",
    gl: "Crear a miña imaxe",
  },
  Hablemos: { ca: "Parlem", eu: "Hitz egin dezagun", gl: "Falemos" },
  Enviar: { ca: "Enviar", eu: "Bidali", gl: "Enviar" },
  Nombre: { ca: "Nom", eu: "Izena", gl: "Nome" },
  "Correo electrónico": {
    ca: "Correu electrònic",
    eu: "Posta elektronikoa",
    gl: "Correo electrónico",
  },
  Mensaje: { ca: "Missatge", eu: "Mezua", gl: "Mensaxe" },
  "He leído y acepto la política de privacidad.": {
    ca: "He llegit i accepto la política de privacitat.",
    eu: "Pribatutasun-politika irakurri eta onartzen dut.",
    gl: "Lin e acepto a política de privacidade.",
  },
  "Gracias. Hemos recibido tu mensaje.": {
    ca: "Gràcies. Hem rebut el teu missatge.",
    eu: "Eskerrik asko. Zure mezua jaso dugu.",
    gl: "Grazas. Recibimos a túa mensaxe.",
  },
  Difunde: { ca: "Difon", eu: "Zabaldu", gl: "Difunde" },
  "Tu imagen de perfil": {
    ca: "La teva imatge de perfil",
    eu: "Zure profileko irudia",
    gl: "A túa imaxe de perfil",
  },
  "Sube una foto. Se procesa solo en tu dispositivo: no la enviamos a ningún servidor.": {
    ca: "Puja una foto. Es processa només al teu dispositiu: no l'enviem a cap servidor.",
    eu: "Kargatu argazki bat. Zure gailuan bakarrik prozesatzen da: ez dugu zerbitzarira bidaltzen.",
    gl: "Sube unha foto. Procésase só no teu dispositivo: non a enviamos a ningún servidor.",
  },
  "Elige tu foto": {
    ca: "Tria la teva foto",
    eu: "Aukeratu zure argazkia",
    gl: "Escolle a túa foto",
  },
  "Descargar imagen": { ca: "Descarregar imatge", eu: "Irudia deskargatu", gl: "Descargar imaxe" },
  "Declaración de accesibilidad": {
    ca: "Declaració d'accessibilitat",
    eu: "Irisgarritasun-adierazpena",
    gl: "Declaración de accesibilidade",
  },
  "Política de privacidad": {
    ca: "Política de privacitat",
    eu: "Pribatutasun-politika",
    gl: "Política de privacidade",
  },
  "Política de cookies": {
    ca: "Política de cookies",
    eu: "Cookie-en politika",
    gl: "Política de cookies",
  },
  "Aviso legal": { ca: "Avís legal", eu: "Lege-oharra", gl: "Aviso legal" },
};

Object.assign(pageTranslations, {
  "Personas adheridas": {
    ca: "Persones adherides",
    eu: "Atxikitako pertsonak",
    gl: "Persoas adheridas",
  },
  "Voluntarios y voluntarias": {
    ca: "Voluntaris i voluntàries",
    eu: "Boluntarioak",
    gl: "Voluntarios e voluntarias",
  },
  Ayuntamientos: { ca: "Ajuntaments", eu: "Udalak", gl: "Concellos" },
  Municipios: { ca: "Municipis", eu: "Udalerriak", gl: "Municipios" },
  Provincias: { ca: "Províncies", eu: "Probintziak", gl: "Provincias" },
  Organizaciones: { ca: "Organitzacions", eu: "Erakundeak", gl: "Organizacións" },
  Objetivo: { ca: "Objectiu", eu: "Helburua", gl: "Obxectivo" },
  "Tiempo medio de espera desde la solicitud hasta la resolución": {
    ca: "Temps mitjà d'espera des de la sol·licitud fins a la resolució",
    eu: "Eskaeratik ebazpenera arteko batez besteko itxaronaldia",
    gl: "Tempo medio de espera desde a solicitude ata a resolución",
  },
  "Personas en lista de espera de servicios de dependencia": {
    ca: "Persones en llista d'espera de serveis de dependència",
    eu: "Mendekotasun-zerbitzuen itxaron-zerrendan dauden pertsonak",
    gl: "Persoas en lista de espera de servizos de dependencia",
  },
  "Cuidadores no profesionales con convenio especial de Seguridad Social": {
    ca: "Cuidadors i cuidadores no professionals amb conveni especial de la Seguretat Social",
    eu: "Gizarte Segurantzako hitzarmen berezia duten zaintzaile ez-profesionalak",
    gl: "Coidadores e coidadores non profesionais con convenio especial da Seguridade Social",
  },
  "Municipios con mociones aprobadas a favor del Pacto": {
    ca: "Municipis amb mocions aprovades a favor del Pacte",
    eu: "Itunaren aldeko mozioak onartu dituzten udalerriak",
    gl: "Municipios con mocións aprobadas a favor do Pacto",
  },
  "Fuente pendiente de verificación": {
    ca: "Font pendent de verificació",
    eu: "Egiaztatzeko dagoen iturria",
    gl: "Fonte pendente de verificación",
  },
  "Nace Plataforma Dorada": {
    ca: "Neix Plataforma Dorada",
    eu: "Plataforma Dorada sortzen da",
    gl: "Nace Plataforma Dorada",
  },
  "Primeras adhesiones": {
    ca: "Primeres adhesions",
    eu: "Lehen atxikimenduak",
    gl: "Primeiras adhesións",
  },
  "Primera entidad adherida": {
    ca: "Primera entitat adherida",
    eu: "Lehen erakunde atxikia",
    gl: "Primeira entidade adherida",
  },
  "Cuidadora familiar": {
    ca: "Cuidadora familiar",
    eu: "Familiako zaintzailea",
    gl: "Coidadora familiar",
  },
  "Profesional del cuidado": {
    ca: "Professional de les cures",
    eu: "Zaintzako profesionala",
    gl: "Profesional dos coidados",
  },
  Familiar: { ca: "Familiar", eu: "Senidea", gl: "Familiar" },
  "[NÚMERO] meses": { ca: "[NÚMERO] mesos", eu: "[ZENBAKIA] hilabete", gl: "[NÚMERO] meses" },
  "[NÚMERO] %": { ca: "[NÚMERO] %", eu: "[ZENBAKIA] %", gl: "[NÚMERO] %" },
  "[NOMBRE] G. · [CIUDAD]": {
    ca: "[NOM] G. · [CIUTAT]",
    eu: "[IZENA] G. · [HIRIA]",
    gl: "[NOME] G. · [CIDADE]",
  },
  "[NOMBRE] L. · [CIUDAD]": {
    ca: "[NOM] L. · [CIUTAT]",
    eu: "[IZENA] L. · [HIRIA]",
    gl: "[NOME] L. · [CIDADE]",
  },
  "[NOMBRE] R. · [CIUDAD]": {
    ca: "[NOM] R. · [CIUTAT]",
    eu: "[IZENA] R. · [HIRIA]",
    gl: "[NOME] R. · [CIDADE]",
  },
  "[NOMBRE] P. · [CIUDAD]": {
    ca: "[NOM] P. · [CIUTAT]",
    eu: "[IZENA] P. · [HIRIA]",
    gl: "[NOME] P. · [CIDADE]",
  },
  "[NOMBRE] M. · [CIUDAD]": {
    ca: "[NOM] M. · [CIUTAT]",
    eu: "[IZENA] M. · [HIRIA]",
    gl: "[NOME] M. · [CIDADE]",
  },
  "[NOMBRE] S. · [CIUDAD]": {
    ca: "[NOM] S. · [CIUTAT]",
    eu: "[IZENA] S. · [HIRIA]",
    gl: "[NOME] S. · [CIDADE]",
  },
  "[TESTIMONIO PENDIENTE DE PUBLICACIÓN AUTORIZADA]": {
    ca: "[TESTIMONI PENDENT DE PUBLICACIÓ AUTORITZADA]",
    eu: "[ARGITARATZEKO BAIMENDUTAKO TESTIGANTZA]",
    gl: "[TESTEMUÑO PENDENTE DE PUBLICACIÓN AUTORIZADA]",
  },
  "[DESCRIPCIÓN PENDIENTE]": {
    ca: "[DESCRIPCIÓ PENDENT]",
    eu: "[ZAIN DAGOEN DESKRIBAPENA]",
    gl: "[DESCRICIÓN PENDENTE]",
  },
  "[TÍTULO DEL EVENTO]": {
    ca: "[TÍTOL DE L'ESDEVENIMENT]",
    eu: "[EKITALDIAREN IZENBURUA]",
    gl: "[TÍTULO DO EVENTO]",
  },
  "[TÍTULO DEL EVENTO REALIZADO]": {
    ca: "[TÍTOL DE L'ESDEVENIMENT REALITZAT]",
    eu: "[EGINDAKO EKITALDIAREN IZENBURUA]",
    gl: "[TÍTULO DO EVENTO REALIZADO]",
  },
  Asociación: { ca: "Associació", eu: "Elkartea", gl: "Asociación" },
  Fundación: { ca: "Fundació", eu: "Fundazioa", gl: "Fundación" },
  Empresa: { ca: "Empresa", eu: "Enpresa", gl: "Empresa" },
  Ayuntamiento: { ca: "Ajuntament", eu: "Udala", gl: "Concello" },
  "Entidad social": { ca: "Entitat social", eu: "Gizarte-erakundea", gl: "Entidade social" },
  Documentos: { ca: "Documents", eu: "Dokumentuak", gl: "Documentos" },
  Identidad: { ca: "Identitat", eu: "Nortasuna", gl: "Identidade" },
  Materiales: { ca: "Materials", eu: "Materialak", gl: "Materiais" },
  "Dossier de prensa": { ca: "Dossier de premsa", eu: "Prentsa-dosierra", gl: "Dossier de prensa" },
  Logotipos: { ca: "Logotips", eu: "Logotipoak", gl: "Logotipos" },
  "Carteles y banners": {
    ca: "Cartells i bàners",
    eu: "Kartelak eta banner-ak",
    gl: "Cartaces e banners",
  },
  "Material para redes": {
    ca: "Material per a xarxes",
    eu: "Sareetarako materiala",
    gl: "Material para redes",
  },
  "La dependencia no puede esperar.": {
    ca: "La dependència no pot esperar.",
    eu: "Mendekotasunak ezin du itxaron.",
    gl: "A dependencia non pode esperar.",
  },
  "Quiénes somos: un movimiento ciudadano y apartidista que reclama un Pacto de Estado por la Dependencia y los Cuidados.":
    {
      ca: "Qui som: un moviment ciutadà i apartidista que reclama un Pacte d'Estat per la Dependència i les Cures.",
      eu: "Nor gara: herritarren mugimendu alderdikeriarik gabea, Mendekotasunaren eta Zaintzen aldeko Estatu Ituna eskatzen duena.",
      gl: "Quen somos: un movemento cidadán e apartidista que reclama un Pacto de Estado pola Dependencia e os Coidados.",
    },
  "Plataforma Dorada es un movimiento ciudadano y apartidista. Nacemos de familias, cuidadoras y profesionales que piden un acuerdo estable entre todas las fuerzas políticas.":
    {
      ca: "Plataforma Dorada és un moviment ciutadà i apartidista. Naixem de famílies, cuidadores i professionals que demanen un acord estable entre totes les forces polítiques.",
      eu: "Plataforma Dorada herritarren mugimendu alderdikeriarik gabea da. Familiak, zaintzaileak eta profesionalak gara, indar politiko guztien arteko akordio egonkorra eskatzen dugunak.",
      gl: "Plataforma Dorada é un movemento cidadán e apartidista. Nacemos de familias, coidadoras e profesionais que piden un acordo estable entre todas as forzas políticas.",
    },
  Misión: { ca: "Missió", eu: "Misioa", gl: "Misión" },
  Principios: { ca: "Principis", eu: "Printzipioak", gl: "Principios" },
  "Cómo actuamos": { ca: "Com actuem", eu: "Nola jarduten dugu", gl: "Como actuamos" },
  "Conseguir un Pacto de Estado que garantice una atención a la dependencia digna, ágil y suficiente.":
    {
      ca: "Aconseguir un Pacte d'Estat que garanteixi una atenció a la dependència digna, àgil i suficient.",
      eu: "Mendekotasunari arreta duina, arina eta nahikoa bermatuko dion Estatu Ituna lortzea.",
      gl: "Conseguir un Pacto de Estado que garanta unha atención á dependencia digna, áxil e suficiente.",
    },
  "Independencia política, transparencia, respeto a las personas y rigor en los datos.": {
    ca: "Independència política, transparència, respecte a les persones i rigor en les dades.",
    eu: "Independentzia politikoa, gardentasuna, pertsonenganako errespetua eta zorroztasuna datuetan.",
    gl: "Independencia política, transparencia, respecto ás persoas e rigor nos datos.",
  },
  "Sumando adhesiones, entidades y ayuntamientos, y dando voz a quienes cuidan y son cuidados.": {
    ca: "Sumant adhesions, entitats i ajuntaments, i donant veu a qui cuida i és cuidat.",
    eu: "Atxikimenduak, erakundeak eta udalak batuz, eta zaintzen duten eta zainduak diren pertsonei ahotsa emanez.",
    gl: "Sumando adhesións, entidades e concellos, e dando voz a quen coida e é coidado.",
  },
  "Una explicación clara del sistema de atención a la dependencia y de por qué necesita un acuerdo de todos.":
    {
      ca: "Una explicació clara del sistema d'atenció a la dependència i de per què necessita un acord de tothom.",
      eu: "Mendekotasuna artatzeko sistemaren eta guztion akordioa zergatik behar duen azaltzen duen azalpen argia.",
      gl: "Unha explicación clara do sistema de atención á dependencia e de por que precisa un acordo de todos.",
    },
  "Es la situación de las personas que, por edad, enfermedad o discapacidad, necesitan ayuda de otras para realizar actividades básicas de la vida diaria.":
    {
      ca: "És la situació de les persones que, per edat, malaltia o discapacitat, necessiten l'ajuda d'altres per fer activitats bàsiques de la vida diària.",
      eu: "Adinagatik, gaixotasunagatik edo desgaitasunagatik eguneroko bizitzako oinarrizko jarduerak egiteko beste pertsona batzuen laguntza behar duten pertsonen egoera da.",
      gl: "É a situación das persoas que, por idade, enfermidade ou discapacidade, precisan axuda doutras para realizar actividades básicas da vida diaria.",
    },
  "La persona solicita una valoración, recibe un grado de dependencia y, después, un plan con servicios o prestaciones. Cada paso puede tardar meses.":
    {
      ca: "La persona sol·licita una valoració, rep un grau de dependència i, després, un pla amb serveis o prestacions. Cada pas pot trigar mesos.",
      eu: "Pertsonak balorazioa eskatzen du, mendekotasun-maila jasotzen du eta, ondoren, zerbitzu edo prestazioak dituen plan bat. Urrats bakoitzak hilabeteak har ditzake.",
      gl: "A persoa solicita unha valoración, recibe un grao de dependencia e, despois, un plan con servizos ou prestacións. Cada paso pode tardar meses.",
    },
  "Listas de espera largas, diferencias entre territorios y familias —sobre todo mujeres— que cuidan sin apoyo suficiente.":
    {
      ca: "Llistes d'espera llargues, diferències entre territoris i famílies —sobretot dones— que cuiden sense prou suport.",
      eu: "Itxaron-zerrenda luzeak, lurraldeen arteko aldeak eta nahikoa laguntzarik gabe zaintzen duten familiak —batez ere emakumeak—.",
      gl: "Listas de espera longas, diferenzas entre territorios e familias —sobre todo mulleres— que coidan sen apoio suficiente.",
    },
  "Un Pacto de Estado: financiación estable, plazos garantizados, igualdad territorial y reconocimiento de quienes cuidan.":
    {
      ca: "Un Pacte d'Estat: finançament estable, terminis garantits, igualtat territorial i reconeixement de qui cuida.",
      eu: "Estatu Ituna: finantzaketa egonkorra, bermatutako epeak, lurralde-berdintasuna eta zaintzen dutenen aintzatespena.",
      gl: "Un Pacto de Estado: financiamento estable, prazos garantidos, igualdade territorial e recoñecemento de quen coida.",
    },
  "Las cifras detalladas están en": {
    ca: "Les xifres detallades són a",
    eu: "Datu zehatzak hemen daude",
    gl: "As cifras detalladas están en",
  },
  "Todas se publicarán con su fuente verificada.": {
    ca: "Totes es publicaran amb la seva font verificada.",
    eu: "Guztiak egiaztatutako iturriarekin argitaratuko dira.",
    gl: "Todas se publicarán coa súa fonte verificada.",
  },
});

Object.assign(pageTranslations, {
  "Cifras del sistema de dependencia y del avance del movimiento. Cada dato indica su fuente.": {
    ca: "Xifres del sistema de dependència i de l'avanç del moviment. Cada dada indica la seva font.",
    eu: "Mendekotasun-sistemaren eta mugimenduaren aurrerapenaren zifrak. Datu bakoitzak bere iturria adierazten du.",
    gl: "Cifras do sistema de dependencia e do avance do movemento. Cada dato indica a súa fonte.",
  },
  "Encuéntranos en tu ciudad. La agenda se actualiza desde el equipo de la Plataforma.": {
    ca: "Troba'ns a la teva ciutat. L'agenda s'actualitza des de l'equip de la Plataforma.",
    eu: "Aurki gaitzazu zure hirian. Agenda Plataformako taldeak eguneratzen du.",
    gl: "Atópanos na túa cidade. A axenda actualízase desde o equipo da Plataforma.",
  },
  "Próximos encuentros, concentraciones y actos de la Plataforma Dorada, y eventos ya realizados.":
    {
      ca: "Propers trobades, concentracions i actes de Plataforma Dorada, i esdeveniments ja realitzats.",
      eu: "Plataforma Doradaren datozen topaketak, elkarretaratzeak eta ekitaldiak, eta dagoeneko egindako ekitaldiak.",
      gl: "Próximos encontros, concentracións e actos de Plataforma Dorada, e eventos xa realizados.",
    },
  "Asociaciones, fundaciones, empresas y ayuntamientos que apoyan el Pacto de Estado por la Dependencia y los Cuidados.":
    {
      ca: "Associacions, fundacions, empreses i ajuntaments que donen suport al Pacte d'Estat per la Dependència i les Cures.",
      eu: "Mendekotasunaren eta Zaintzen aldeko Estatu Itunaren alde dauden elkarteak, fundazioak, enpresak eta udalak.",
      gl: "Asociacións, fundacións, empresas e concellos que apoian o Pacto de Estado pola Dependencia e os Coidados.",
    },
  "Organizaciones que se suman a la petición de un Pacto de Estado.": {
    ca: "Organitzacions que se sumen a la petició d'un Pacte d'Estat.",
    eu: "Estatu Itunaren eskaerarekin bat egiten duten erakundeak.",
    gl: "Organizacións que se suman á petición dun Pacto de Estado.",
  },
  "Últimas noticias y apariciones en medios de la Plataforma Dorada.": {
    ca: "Últimes notícies i aparicions als mitjans de Plataforma Dorada.",
    eu: "Plataforma Doradaren azken albisteak eta hedabideetako agerraldiak.",
    gl: "Últimas noticias e aparicións nos medios de Plataforma Dorada.",
  },
  "Dossier de prensa, logotipos, carteles y material para redes de la Plataforma Dorada.": {
    ca: "Dossier de premsa, logotips, cartells i material per a xarxes de Plataforma Dorada.",
    eu: "Plataforma Doradaren prentsa-dosierra, logotipoak, kartelak eta sareetarako materiala.",
    gl: "Dossier de prensa, logotipos, carteis e material para redes de Plataforma Dorada.",
  },
  "Escribe a la Plataforma Dorada: dudas, propuestas, prensa o colaboración.": {
    ca: "Escriu a Plataforma Dorada: dubtes, propostes, premsa o col·laboració.",
    eu: "Idatzi Plataforma Doradari: zalantzak, proposamenak, prentsa edo lankidetza.",
    gl: "Escribe a Plataforma Dorada: dúbidas, propostas, prensa ou colaboración.",
  },
  "También puedes escribirnos a": {
    ca: "També pots escriure'ns a",
    eu: "Honako helbide honetara ere idatz diezagukezu",
    gl: "Tamén podes escribirnos a",
  },
  "Detrás de cada expediente hay una familia. Estos son los relatos de quienes esperan una valoración, una ayuda o un respiro.":
    {
      ca: "Darrere de cada expedient hi ha una família. Aquests són els relats de qui espera una valoració, una ajuda o un respir.",
      eu: "Espediente bakoitzaren atzean familia bat dago. Hauek balorazio, laguntza edo atseden baten zain daudenen kontakizunak dira.",
      gl: "Detrás de cada expediente hai unha familia. Estes son os relatos de quen agarda unha valoración, unha axuda ou un respiro.",
    },
  "Un testimonio puede incluir información sensible. Por eso el formulario distingue claramente entre el consentimiento para enviarnos tu testimonio y el consentimiento, separado y opcional, para publicarlo. Solo se publican los testimonios autorizados, y el equipo puede ocultarlos, editarlos o eliminarlos en cualquier momento.":
    {
      ca: "Un testimoni pot incloure informació sensible. Per això el formulari distingeix clarament entre el consentiment per enviar-nos el teu testimoni i el consentiment, separat i opcional, per publicar-lo. Només es publiquen els testimonis autoritzats, i l'equip pot ocultar-los, editar-los o eliminar-los en qualsevol moment.",
      eu: "Testigantza batek informazio sentikorra izan dezake. Horregatik, inprimakiak argi bereizten ditu testigantza bidaltzeko baimena eta argitaratzeko baimena, bereizia eta aukerakoa. Baimendutako testigantzak bakarrik argitaratzen dira, eta taldeak edozein unetan ezkutatu, editatu edo ezabatu ditzake.",
      gl: "Un testemuño pode incluír información sensible. Por iso o formulario distingue claramente entre o consentimento para enviarnos o teu testemuño e o consentimento, separado e opcional, para publicalo. Só se publican os testemuños autorizados, e o equipo pode ocultalos, editalos ou eliminalos en calquera momento.",
    },
  "Testimonios publicados:": {
    ca: "Testimonis publicats:",
    eu: "Argitaratutako testigantzak:",
    gl: "Testemuños publicados:",
  },
  "Adherirte es gratuito y no implica militancia en ningún partido. Cuantas más personas seamos, más fuerza tendrá la petición de un Pacto de Estado por la Dependencia y los Cuidados.":
    {
      ca: "Adherir-t'hi és gratuït i no implica militància en cap partit. Com més persones siguem, més força tindrà la petició d'un Pacte d'Estat per la Dependència i les Cures.",
      eu: "Bat egitea doakoa da eta ez dakar inongo alderditan militante izatea. Zenbat eta pertsona gehiago izan, orduan eta indar handiagoa izango du Mendekotasunaren eta Zaintzen aldeko Estatu Itunaren eskaerak.",
      gl: "Adherirte é gratuíto e non implica militancia en ningún partido. Cantas máis persoas sexamos, máis forza terá a petición dun Pacto de Estado pola Dependencia e os Coidados.",
    },
  "Para pedir plazos razonables en las valoraciones y concesiones de ayudas.": {
    ca: "Per demanar terminis raonables en les valoracions i concessions d'ajudes.",
    eu: "Balorazio eta laguntzen emakidetarako epe arrazoizkoak eskatzeko.",
    gl: "Para pedir prazos razoables nas valoracións e concesións de axudas.",
  },
  "Para visibilizar los retrasos y las dificultades administrativas.": {
    ca: "Per visibilitzar els retards i les dificultats administratives.",
    eu: "Atzerapenak eta zailtasun administratiboak ikusarazteko.",
    gl: "Para visibilizar os atrasos e as dificultades administrativas.",
  },
  "Para reconocer y apoyar a quienes cuidan.": {
    ca: "Per reconèixer i donar suport a qui cuida.",
    eu: "Zaintzen dutenak aitortu eta babesteko.",
    gl: "Para recoñecer e apoiar a quen coida.",
  },
  "Para reclamar un acuerdo estable y apartidista entre administraciones.": {
    ca: "Per reclamar un acord estable i apartidista entre administracions.",
    eu: "Administrazioen arteko akordio egonkor eta alderdikeriarik gabea eskatzeko.",
    gl: "Para reclamar un acordo estable e apartidista entre administracións.",
  },
  "Solo los datos mínimos necesarios. En el formulario se solicita por separado el consentimiento para tratar tu adhesión y el consentimiento, opcional, para aparecer públicamente en la web con tu nombre, la inicial de tu primer apellido y tu ciudad.":
    {
      ca: "Només les dades mínimes necessàries. Al formulari se sol·licita per separat el consentiment per tractar la teva adhesió i el consentiment, opcional, per aparèixer públicament al web amb el teu nom, la inicial del primer cognom i la teva ciutat.",
      eu: "Beharrezko gutxieneko datuak baino ez. Inprimakian bereizita eskatzen da zure atxikimendua tratatzeko baimena eta, aukeran, webgunean publikoki agertzeko baimena, zure izenarekin, lehen abizenaren inizialarekin eta hiriarekin.",
      gl: "Só os datos mínimos necesarios. No formulario solicítase por separado o consentimento para tratar a túa adhesión e o consentimento, opcional, para aparecer publicamente na web co teu nome, a inicial do primeiro apelido e a túa cidade.",
    },
  "Envía esta página a tu familia, tu barrio o tu asociación. El boca a boca es nuestra mejor herramienta.":
    {
      ca: "Envia aquesta pàgina a la teva família, al teu barri o a la teva associació. El boca-orella és la nostra millor eina.",
      eu: "Bidali orri hau zure familiari, auzoari edo elkarteari. Ahoz ahokoa da gure tresnarik onena.",
      gl: "Envía esta páxina á túa familia, ao teu barrio ou á túa asociación. O boca a boca é a nosa mellor ferramenta.",
    },
  "El movimiento lo sostienen personas voluntarias. Puedes ayudar desde tu casa, tu municipio o tu entidad, con el tiempo del que dispongas.":
    {
      ca: "El moviment el sostenen persones voluntàries. Pots ajudar des de casa, el teu municipi o la teva entitat, amb el temps de què disposis.",
      eu: "Mugimendua boluntarioek sostengatzen dute. Etxetik, udalerritik edo erakundetik lagun dezakezu, duzun denborarekin.",
      gl: "O movemento sostéñeno persoas voluntarias. Podes axudar desde a túa casa, o teu municipio ou a túa entidade, co tempo do que dispoñas.",
    },
  "Quiero ser voluntario/a": {
    ca: "Vull ser voluntari/ària",
    eu: "Boluntarioa izan nahi dut",
    gl: "Quero ser voluntario/a",
  },
  "Difundir el movimiento en tu entorno y en redes sociales.": {
    ca: "Difondre el moviment al teu entorn i a les xarxes socials.",
    eu: "Mugimendua zure ingurunean eta sare sozialetan zabaltzea.",
    gl: "Difundir o movemento na túa contorna e nas redes sociais.",
  },
  "Recoger y acompañar testimonios de familias.": {
    ca: "Recollir i acompanyar testimonis de famílies.",
    eu: "Familien testigantzak jasotzea eta laguntzea.",
    gl: "Recoller e acompañar testemuños de familias.",
  },
  "Ayudar a organizar encuentros y actos públicos.": {
    ca: "Ajudar a organitzar trobades i actes públics.",
    eu: "Topaketak eta ekitaldi publikoak antolatzen laguntzea.",
    gl: "Axudar a organizar encontros e actos públicos.",
  },
  "Contactar con asociaciones, entidades y ayuntamientos.": {
    ca: "Contactar amb associacions, entitats i ajuntaments.",
    eu: "Elkarte, erakunde eta udalekin harremanetan jartzea.",
    gl: "Contactar con asociacións, entidades e concellos.",
  },
  "Aportar conocimientos profesionales (jurídicos, sociales, comunicación).": {
    ca: "Aportar coneixements professionals (jurídics, socials, comunicació).",
    eu: "Ezagutza profesionalak eskaintzea (juridikoak, sozialak, komunikazioa).",
    gl: "Achegar coñecementos profesionais (xurídicos, sociais, comunicación).",
  },
  "De momento no existe un área privada de voluntariado. La coordinación se hace por correo electrónico.":
    {
      ca: "De moment no existeix una àrea privada de voluntariat. La coordinació es fa per correu electrònic.",
      eu: "Oraingoz ez dago boluntariotzako eremu pribaturik. Koordinazioa posta elektronikoz egiten da.",
      gl: "De momento non existe unha área privada de voluntariado. A coordinación faise por correo electrónico.",
    },
  "Solo aparecen quienes lo han autorizado expresamente.": {
    ca: "Només hi apareixen les persones que ho han autoritzat expressament.",
    eu: "Berariaz baimendu dutenak bakarrik agertzen dira.",
    gl: "Só aparecen quen o autorizou expresamente.",
  },
});

Object.assign(pageTranslations, extraTranslations);

const dictionariesWithPageText: Record<Locale, Dictionary> = { es, ca, eu, gl };
for (const [source, variants] of Object.entries(pageTranslations)) {
  dictionariesWithPageText.es[source] = source;
  for (const locale of ["ca", "eu", "gl"] as Locale[])
    if (variants[locale]) dictionariesWithPageText[locale][source] = variants[locale]!;
}

const textOriginals = new WeakMap<Text, string>();
const STORAGE_KEY = "pd-locale";
type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};
const I18nContext = createContext<I18nValue | null>(null);

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function translateText(text: string, locale: Locale) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return text;
  const direct = pageTranslations[clean]?.[locale];
  if (direct) return text.replace(clean, direct);
  let out = text;
  const replacements: Array<[string, string, string]> = [];
  for (const [source, variants] of Object.entries(pageTranslations).sort(
    (a, b) => b[0].length - a[0].length,
  )) {
    const target = variants[locale];
    if (!target || !out.includes(source)) continue;
    const token = `__PD_I18N_${replacements.length}__`;
    const pattern = new RegExp(
      `(?<![\\p{L}\\p{N}_])${escapeRegExp(source)}(?![\\p{L}\\p{N}_])`,
      "gu",
    );
    if (!pattern.test(out)) continue;
    out = out.replace(pattern, token);
    replacements.push([token, target, source]);
  }
  for (const [token, target] of replacements) out = out.split(token).join(target);
  return out;
}

const TRANSLATABLE_ATTRIBUTES = ["aria-label", "placeholder", "title", "alt"] as const;

function translateDom(locale: Locale) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) nodes.push(node as Text);
  for (const text of nodes) {
    const parent = text.parentElement;
    if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) continue;
    if (parent.closest("[data-no-translate]")) continue;
    if (!textOriginals.has(text)) textOriginals.set(text, text.nodeValue || "");
    const original = textOriginals.get(text) || "";
    const next = locale === "es" ? original : translateText(original, locale);
    if (next !== text.nodeValue) text.nodeValue = next;
  }
  for (const attr of TRANSLATABLE_ATTRIBUTES) {
    // dataset solo admite claves camelCase: "pdOriginal-title" lanza SyntaxError.
    const dataKey = `pdOriginal${attr.replace(/(^|-)(\w)/g, (_m, _d, c: string) => c.toUpperCase())}`;
    document.querySelectorAll<HTMLElement>(`[${attr}]`).forEach((el) => {
      if (el.closest("[data-no-translate]")) return;
      if (el.dataset[dataKey] === undefined) el.dataset[dataKey] = el.getAttribute(attr) || "";
      const original = el.dataset[dataKey] ?? "";
      const next = locale === "es" ? original : translateText(original, locale);
      if (next !== el.getAttribute(attr)) el.setAttribute(attr, next);
    });
  }
  translateHead(locale);
}

const headOriginals = new Map<string, string>();
const headApplied = new Map<string, string>();

function translateHead(locale: Locale) {
  const targets: Array<[string, () => string, (value: string) => void]> = [
    [
      "title",
      () => document.title,
      (value) => {
        document.title = value;
      },
    ],
  ];
  for (const selector of [
    'meta[name="description"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
  ]) {
    const el = document.head.querySelector<HTMLMetaElement>(selector);
    if (el) targets.push([selector, () => el.content, (value) => (el.content = value)]);
  }
  for (const [key, get, set] of targets) {
    const current = get();
    // Si el valor actual no es el que escribimos nosotros, la ruta lo ha cambiado: es un nuevo original.
    if (headOriginals.get(key) === undefined || current !== headApplied.get(key))
      headOriginals.set(key, current);
    const original = headOriginals.get(key) ?? current;
    const next = locale === "es" ? original : translateText(original, locale);
    if (next !== current) set(next);
    headApplied.set(key, next);
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LOCALES as readonly string[]).includes(stored)) setLocaleState(stored as Locale);
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    translateDom(locale);
    const observer = new MutationObserver(() => translateDom(locale));
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [locale]);
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);
  const t = useCallback(
    (key: string) => dictionaries[locale][key] ?? dictionaries[DEFAULT_LOCALE][key] ?? key,
    [locale],
  );
  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) return { locale: DEFAULT_LOCALE, setLocale: () => {}, t: (key) => es[key] ?? key };
  return ctx;
}
