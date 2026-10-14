// Textos legales de Plataforma Dorada en todos los idiomas de la web.
//
// ESTADO: BORRADOR pendiente de revisión jurídica. Plataforma Dorada es, de momento,
// un movimiento ciudadano sin personalidad jurídica propia; los textos están escritos
// para esa situación. Cuando se constituya como asociación u otra entidad habrá que
// actualizar los apartados de identificación del responsable.
//
// MARCADORES: todo lo que va entre corchetes MAYÚSCULAS (por ejemplo [RESPONSABLE])
// es un dato que no se ha proporcionado y que hay que completar. Se mantienen en
// castellano en los cuatro idiomas para poder localizarlos fácilmente (buscar "[").
// {email} se sustituye automáticamente por el correo de contacto de la web.
//
// Las versiones en euskera, gallego, valenciano, francés y alemán deben ser revisadas por hablantes nativos.
// La versión en inglés es una traducción de trabajo; conviene que la revise también quien haga la revisión jurídica.

import type { Locale } from "./i18n";
import { LEGAL_DE } from "./legal-de";
import { LEGAL_FR } from "./legal-fr";

/** intro: párrafos que van antes de la lista; paragraphs: después. id: ancla opcional (#id). */
export type LegalSection = { id?: string; heading: string; intro?: string[]; paragraphs?: string[]; items?: string[] };
export type LegalDoc = { title: string; lead: string; sections: LegalSection[] };
export type LegalKey = "aviso" | "privacidad" | "cookies" | "accesibilidad";

const LEGAL_BASE: Record<Exclude<Locale, "va" | "fr" | "de">, Record<LegalKey, LegalDoc>> = {
  // ─────────────────────────────────────────────────────────── CASTELLANO
  es: {
    aviso: {
      title: "Aviso legal",
      lead: "Texto provisional pendiente de revisión jurídica.",
      sections: [
        {
          heading: "Quién está detrás de esta web",
          paragraphs: [
            "Plataforma Dorada es un movimiento ciudadano, apartidista y sin ánimo de lucro. Todavía no es una entidad constituida ni tiene personalidad jurídica propia. Esta web la mantienen, a título personal, las personas voluntarias que impulsan el movimiento.",
            "Responsable de la web: [RESPONSABLE].",
            "Domicilio a efectos de comunicaciones: [DOMICILIO].",
            "Correo electrónico de contacto: {email}.",
            "Cuando el movimiento se constituya como asociación u otra entidad, actualizaremos este aviso con sus datos de identificación.",
          ],
        },
        {
          heading: "Finalidad del sitio",
          paragraphs: [
            "Esta web informa sobre el movimiento y su petición de un Pacto de Estado por la Dependencia y los Cuidados, y permite adherirse, hacerse voluntario o voluntaria, compartir testimonios y ponerse en contacto. No vende productos ni servicios y no tiene finalidad comercial.",
          ],
        },
        {
          heading: "Condiciones de uso",
          paragraphs: [
            "El acceso es libre y gratuito. Te pedimos un uso respetuoso y lícito de la web, y que no intentes dañarla, sobrecargarla ni acceder sin autorización a sus sistemas de gestión.",
          ],
        },
        {
          heading: "Propiedad intelectual",
          paragraphs: [
            "El nombre, el logotipo y los materiales propios de Plataforma Dorada están protegidos por la normativa de propiedad intelectual. [CONDICIONES DE USO DE LOS MATERIALES].",
            "De las noticias de otros medios mostramos solo el título, un breve resumen y el enlace a la publicación original, cuyos derechos pertenecen a sus autores y medios.",
          ],
        },
        {
          heading: "Enlaces y contenidos de terceros",
          paragraphs: [
            "Esta web enlaza o incrusta contenidos de terceros (por ejemplo, Google Forms, Instagram, TikTok o Spotify). Al usarlos sales de nuestra web y se aplican las condiciones y políticas de privacidad de esos servicios, de las que no somos responsables.",
          ],
        },
        {
          heading: "Carácter informativo",
          paragraphs: [
            "La información de la web es divulgativa. No constituye asesoramiento jurídico, sanitario ni social individual. Procuramos que los datos y cifras indiquen su fuente y que la información sea correcta, pero no podemos garantizar que no haya errores o interrupciones del servicio.",
          ],
        },
        {
          id: "condiciones-voluntariado",
          heading: "Aviso legal y condiciones de participación",
          intro: [
            "La participación en el voluntariado de Plataforma Dorada es libre y voluntaria, y tiene como finalidad colaborar en la defensa del derecho a la dependencia y a los cuidados, así como en la promoción del Pacto de Estado por la Dependencia y los Cuidados.",
            "Las personas voluntarias podrán colaborar, según su disponibilidad y capacidades, en tareas de difusión, comunicación, sensibilización, contacto con entidades, apoyo a campañas y otras actividades vinculadas a los objetivos de la plataforma.",
            "La inscripción en el formulario no implica la incorporación automática al voluntariado ni genera por sí misma una relación vinculante con Plataforma Dorada.",
            "Las personas participantes se comprometen a:",
          ],
          items: [
            "Respetar los principios, objetivos y valores de Plataforma Dorada.",
            "Desarrollar su colaboración de forma responsable, respetuosa y no discriminatoria.",
            "Mantener la confidencialidad de la información personal o sensible a la que puedan acceder durante su colaboración.",
            "Utilizar los materiales y la información facilitados exclusivamente para las actividades autorizadas.",
            "Respetar la privacidad y los derechos de las personas con las que contacten.",
          ],
          paragraphs: [
            "La participación es voluntaria y puede finalizar en cualquier momento mediante comunicación al grupo motor de la plataforma.",
            "Plataforma Dorada podrá establecer instrucciones específicas para cada campaña o actividad con el fin de garantizar una colaboración coordinada, segura y coherente con sus objetivos.",
          ],
        },
        {
          heading: "Legislación aplicable",
          paragraphs: ["Este aviso se rige por la legislación española."],
        },
      ],
    },
    privacidad: {
      title: "Política de privacidad del voluntariado",
      lead: "En Plataforma Dorada nos comprometemos a proteger la privacidad de las personas que desean colaborar con nuestra iniciativa. Tratamos los datos personales de forma responsable, transparente y conforme a la normativa vigente en materia de protección de datos.",
      sections: [
        {
          heading: "Responsable del tratamiento",
          items: [
            "Responsable: Plataforma Dorada",
            "Correo electrónico: plataformadoradaes@gmail.com.",
          ],
        },
        {
          heading: "¿Qué datos recogemos?",
          paragraphs: [
            "Podemos recoger datos identificativos y de contacto, como nombre y apellidos, correo electrónico, teléfono y localidad, así como información sobre disponibilidad, experiencia, conocimientos e intereses de colaboración.",
            "Solo solicitaremos los datos necesarios para organizar y coordinar las actividades de voluntariado.",
          ],
        },
        {
          heading: "¿Para qué utilizamos tus datos?",
          intro: [
            "Los datos se utilizarán para:",
          ],
          items: [
            "Gestionar las solicitudes de incorporación al voluntariado.",
            "Contactar con las personas interesadas y coordinar su participación.",
            "Informar sobre campañas, actividades y tareas relacionadas con su colaboración.",
            "Mantener la organización y el seguimiento de las actividades de voluntariado.",
          ],
          paragraphs: [
            "No utilizaremos los datos para finalidades incompatibles con las anteriores ni los incorporaremos a campañas comerciales ajenas a la actividad de la plataforma.",
          ],
        },
        {
          heading: "¿Cuál es la base jurídica del tratamiento?",
          paragraphs: [
            "El tratamiento se fundamentará en la gestión de la solicitud de participación y, cuando proceda, de la relación de voluntariado, así como en el consentimiento para aquellos usos que lo requieran.",
            "Cuando un tratamiento se base en el consentimiento, este podrá retirarse en cualquier momento, sin que ello afecte a la licitud del tratamiento realizado previamente.",
          ],
        },
        {
          heading: "¿Con quién compartimos tus datos?",
          paragraphs: [
            "Los datos no se venderán ni se cederán a terceros para fines comerciales. Solo podrán comunicarse cuando sea necesario para la organización de las actividades, exista una base jurídica válida o resulte exigible legalmente.",
            "Si se utilizan herramientas externas para gestionar formularios, listas de contactos o comunicaciones, se adoptarán las garantías y medidas de protección que correspondan.",
          ],
        },
        {
          heading: "¿Durante cuánto tiempo conservamos tus datos?",
          paragraphs: [
            "Los datos se conservarán durante el tiempo necesario para gestionar la solicitud y la participación en el voluntariado. Posteriormente, se suprimirán o bloquearán cuando proceda, salvo que deban conservarse durante más tiempo por una obligación legal o para atender posibles responsabilidades.",
          ],
        },
        {
          heading: "¿Qué derechos tienes?",
          paragraphs: [
            "Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y, cuando corresponda, portabilidad de tus datos.",
            "Para ello, puedes escribir a plataformadoradaes@gmail.com, indicando el derecho que deseas ejercer.",
            "También puedes presentar una reclamación ante la Agencia Española de Protección de Datos si consideras que el tratamiento de tus datos no se ajusta a la normativa.",
          ],
        },
        {
          heading: "Seguridad y confidencialidad",
          paragraphs: [
            "Plataforma Dorada adoptará las medidas técnicas y organizativas adecuadas para proteger los datos personales frente a accesos no autorizados, pérdida, alteración o divulgación indebida.",
            "La información de las personas voluntarias se utilizará únicamente para los fines informados y con acceso limitado a quienes la necesiten para desarrollar sus funciones.",
            "FECHA DE ACTUALIZACIÓN: 13/10/2026",
          ],
        },
      ],
    },
    cookies: {
      title: "Política de cookies",
      lead: "Texto provisional pendiente de revisión jurídica.",
      sections: [
        {
          heading: "Qué son",
          paragraphs: [
            "Son pequeños archivos o datos que una web guarda en tu navegador. Aquí hablamos de cookies y de tecnologías equivalentes, como el almacenamiento local del navegador.",
          ],
        },
        {
          heading: "Qué usamos nosotros",
          items: [
            "Preferencia de idioma (pd-locale): recuerda el idioma que eliges. Es técnica y se guarda solo en tu navegador.",
            "Preferencia de cookies (pd-cookie-consent): recuerda tu elección en el aviso de cookies. Es técnica.",
            "No usamos cookies analíticas ni publicitarias ni herramientas de seguimiento.",
          ],
        },
        {
          heading: "Contenido de redes sociales",
          paragraphs: [
            "En la página de redes sociales, Instagram, TikTok y Spotify pueden instalar cookies propias cuando se muestran sus publicaciones o su lista de reproducción. Solo cargamos ese contenido si aceptas las cookies de terceros. Si las rechazas, verás un enlace para abrir el contenido en la propia red o servicio.",
            "Al pulsar enlaces a Google Forms u otros sitios sales de nuestra web y se aplican las políticas de esos servicios.",
          ],
        },
        {
          heading: "Cómo gestionar tus preferencias",
          paragraphs: [
            "Puedes aceptar, rechazar o quedarte solo con las esenciales en el aviso de cookies. Para cambiar tu elección, usa el enlace «Cambiar preferencias de cookies» del pie de página. También puedes borrar o bloquear cookies desde los ajustes de tu navegador.",
            "Si en el futuro añadimos analítica u otras herramientas, actualizaremos esta política y te pediremos consentimiento antes.",
          ],
        },
      ],
    },
    accesibilidad: {
      title: "Declaración de accesibilidad",
      lead: "Texto provisional. Estado: en mejora continua.",
      sections: [
        {
          heading: "Nuestro compromiso",
          paragraphs: [
            "Queremos que cualquier persona pueda usar esta web, también quienes navegan con teclado, con lector de pantalla, con ampliación de texto o con dificultades de lectura. Nuestro objetivo es cumplir las pautas WCAG 2.1 nivel AA.",
          ],
        },
        {
          heading: "Estado actual",
          paragraphs: [
            "Todavía no se ha hecho una auditoría de accesibilidad completa ni independiente, por lo que no declaramos conformidad total con WCAG 2.1 AA. Seguimos revisando y corrigiendo la web.",
          ],
        },
        {
          heading: "Medidas que aplicamos",
          items: [
            "Estructura con títulos y zonas de página bien definidos.",
            "Navegación completa con teclado y foco visible.",
            "Enlace para saltar al contenido principal.",
            "Contraste suficiente y textos alternativos en las imágenes.",
            "Diseño adaptable, con zoom hasta el 200 %.",
            "Respeto a la preferencia del sistema de reducir animaciones.",
            "Web disponible en castellano, catalán, valenciano, euskera, gallego, inglés, francés y alemán.",
          ],
        },
        {
          heading: "Limitaciones conocidas",
          items: [
            "Los contenidos incrustados de Instagram, TikTok y Spotify y los formularios de Google son de terceros; su accesibilidad no depende de nosotros. Ofrecemos siempre un enlace alternativo.",
            "Las traducciones al euskera, gallego, valenciano, francés y alemán están pendientes de revisión por personas hablantes nativas.",
            "Algunas partes, como gráficos, mapas o documentos descargables, pueden no ser todavía plenamente accesibles.",
          ],
        },
        {
          heading: "Si encuentras una barrera",
          paragraphs: [
            "Escríbenos a {email} indicando la página y el problema. Procuraremos responderte lo antes posible y corregirlo.",
            "Última revisión de esta declaración: [FECHA].",
          ],
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────── CATALÀ
  ca: {
    aviso: {
      title: "Avís legal",
      lead: "Text provisional pendent de revisió jurídica.",
      sections: [
        {
          heading: "Qui hi ha al darrere d'aquest web",
          paragraphs: [
            "Plataforma Dorada és un moviment ciutadà, apartidista i sense afany de lucre. Encara no és una entitat constituïda ni té personalitat jurídica pròpia. Aquest web el mantenen, a títol personal, les persones voluntàries que impulsen el moviment.",
            "Responsable del web: [RESPONSABLE].",
            "Domicili a efectes de comunicacions: [DOMICILIO].",
            "Correu electrònic de contacte: {email}.",
            "Quan el moviment es constitueixi com a associació o una altra entitat, actualitzarem aquest avís amb les seves dades d'identificació.",
          ],
        },
        {
          heading: "Finalitat del lloc",
          paragraphs: [
            "Aquest web informa sobre el moviment i la seva petició d'un Pacte d'Estat per la Dependència i les Cures, i permet adherir-s'hi, fer-se voluntari o voluntària, compartir testimonis i posar-se en contacte. No ven productes ni serveis i no té finalitat comercial.",
          ],
        },
        {
          heading: "Condicions d'ús",
          paragraphs: [
            "L'accés és lliure i gratuït. Et demanem un ús respectuós i lícit del web, i que no intentis malmetre'l, sobrecarregar-lo ni accedir sense autorització als seus sistemes de gestió.",
          ],
        },
        {
          heading: "Propietat intel·lectual",
          paragraphs: [
            "El nom, el logotip i els materials propis de Plataforma Dorada estan protegits per la normativa de propietat intel·lectual. [CONDICIONES DE USO DE LOS MATERIALES].",
            "De les notícies d'altres mitjans mostrem només el títol, un breu resum i l'enllaç a la publicació original, els drets de la qual pertanyen als seus autors i mitjans.",
          ],
        },
        {
          heading: "Enllaços i continguts de tercers",
          paragraphs: [
            "Aquest web enllaça o incrusta continguts de tercers (per exemple, Google Forms, Instagram, TikTok o Spotify). En fer-los servir surts del nostre web i s'apliquen les condicions i les polítiques de privacitat d'aquests serveis, de les quals no som responsables.",
          ],
        },
        {
          heading: "Caràcter informatiu",
          paragraphs: [
            "La informació del web és divulgativa. No constitueix assessorament jurídic, sanitari ni social individual. Procurem que les dades i xifres indiquin la seva font i que la informació sigui correcta, però no podem garantir que no hi hagi errors o interrupcions del servei.",
          ],
        },
        {
          id: "condiciones-voluntariado",
          heading: "Avís legal i condicions de participació",
          intro: [
            "La participació en el voluntariat de Plataforma Dorada és lliure i voluntària, i té com a finalitat col·laborar en la defensa del dret a la dependència i a les cures, així com en la promoció del Pacte d'Estat per la Dependència i les Cures.",
            "Les persones voluntàries podran col·laborar, segons la seva disponibilitat i capacitats, en tasques de difusió, comunicació, sensibilització, contacte amb entitats, suport a campanyes i altres activitats vinculades als objectius de la plataforma.",
            "La inscripció al formulari no implica la incorporació automàtica al voluntariat ni genera per si mateixa una relació vinculant amb Plataforma Dorada.",
            "Les persones participants es comprometen a:",
          ],
          items: [
            "Respectar els principis, objectius i valors de Plataforma Dorada.",
            "Desenvolupar la seva col·laboració de manera responsable, respectuosa i no discriminatòria.",
            "Mantenir la confidencialitat de la informació personal o sensible a la qual puguin accedir durant la seva col·laboració.",
            "Utilitzar els materials i la informació facilitats exclusivament per a les activitats autoritzades.",
            "Respectar la privacitat i els drets de les persones amb qui contactin.",
          ],
          paragraphs: [
            "La participació és voluntària i pot finalitzar en qualsevol moment mitjançant una comunicació al grup motor de la plataforma.",
            "Plataforma Dorada podrà establir instruccions específiques per a cada campanya o activitat amb la finalitat de garantir una col·laboració coordinada, segura i coherent amb els seus objectius.",
          ],
        },
        {
          heading: "Legislació aplicable",
          paragraphs: ["Aquest avís es regeix per la legislació espanyola."],
        },
      ],
    },
    privacidad: {
      title: "Política de privacitat del voluntariat",
      lead: "A Plataforma Dorada ens comprometem a protegir la privacitat de les persones que volen col·laborar amb la nostra iniciativa. Tractem les dades personals de manera responsable, transparent i d'acord amb la normativa vigent en matèria de protecció de dades.",
      sections: [
        {
          heading: "Responsable del tractament",
          items: [
            "Responsable: Plataforma Dorada",
            "Correu electrònic: plataformadoradaes@gmail.com.",
          ],
        },
        {
          heading: "Quines dades recollim?",
          paragraphs: [
            "Podem recollir dades identificatives i de contacte, com ara nom i cognoms, correu electrònic, telèfon i localitat, així com informació sobre disponibilitat, experiència, coneixements i interessos de col·laboració.",
            "Només demanarem les dades necessàries per organitzar i coordinar les activitats de voluntariat.",
          ],
        },
        {
          heading: "Per a què fem servir les teves dades?",
          intro: [
            "Les dades s'utilitzaran per:",
          ],
          items: [
            "Gestionar les sol·licituds d'incorporació al voluntariat.",
            "Contactar amb les persones interessades i coordinar-ne la participació.",
            "Informar sobre campanyes, activitats i tasques relacionades amb la seva col·laboració.",
            "Mantenir l'organització i el seguiment de les activitats de voluntariat.",
          ],
          paragraphs: [
            "No farem servir les dades per a finalitats incompatibles amb les anteriors ni les incorporarem a campanyes comercials alienes a l'activitat de la plataforma.",
          ],
        },
        {
          heading: "Quina és la base jurídica del tractament?",
          paragraphs: [
            "El tractament es fonamentarà en la gestió de la sol·licitud de participació i, quan escaigui, de la relació de voluntariat, així com en el consentiment per als usos que ho requereixin.",
            "Quan un tractament es basi en el consentiment, aquest es podrà retirar en qualsevol moment, sense que això afecti la licitud del tractament fet prèviament.",
          ],
        },
        {
          heading: "Amb qui compartim les teves dades?",
          paragraphs: [
            "Les dades no es vendran ni es cediran a tercers amb finalitats comercials. Només es podran comunicar quan sigui necessari per a l'organització de les activitats, hi hagi una base jurídica vàlida o sigui exigible legalment.",
            "Si s'utilitzen eines externes per gestionar formularis, llistes de contactes o comunicacions, s'adoptaran les garanties i mesures de protecció que corresponguin.",
          ],
        },
        {
          heading: "Durant quant de temps conservem les teves dades?",
          paragraphs: [
            "Les dades es conservaran durant el temps necessari per gestionar la sol·licitud i la participació en el voluntariat. Posteriorment, se suprimiran o es bloquejaran quan escaigui, tret que s'hagin de conservar durant més temps per una obligació legal o per atendre possibles responsabilitats.",
          ],
        },
        {
          heading: "Quins drets tens?",
          paragraphs: [
            "Pots exercir els teus drets d'accés, rectificació, supressió, oposició, limitació del tractament i, quan correspongui, portabilitat de les teves dades.",
            "Per fer-ho, pots escriure a plataformadoradaes@gmail.com indicant el dret que vols exercir.",
            "També pots presentar una reclamació davant l'Agència Espanyola de Protecció de Dades si consideres que el tractament de les teves dades no s'ajusta a la normativa.",
          ],
        },
        {
          heading: "Seguretat i confidencialitat",
          paragraphs: [
            "Plataforma Dorada adoptarà les mesures tècniques i organitzatives adequades per protegir les dades personals davant d'accessos no autoritzats, pèrdua, alteració o divulgació indeguda.",
            "La informació de les persones voluntàries s'utilitzarà únicament per a les finalitats informades i amb accés limitat a qui la necessiti per exercir les seves funcions.",
            "DATA D'ACTUALITZACIÓ: 13/10/2026",
          ],
        },
      ],
    },
    cookies: {
      title: "Política de galetes",
      lead: "Text provisional pendent de revisió jurídica.",
      sections: [
        {
          heading: "Què són",
          paragraphs: [
            "Són petits arxius o dades que un web desa al teu navegador. Aquí parlem de galetes i de tecnologies equivalents, com l'emmagatzematge local del navegador.",
          ],
        },
        {
          heading: "Què fem servir nosaltres",
          items: [
            "Preferència d'idioma (pd-locale): recorda l'idioma que tries. És tècnica i es desa només al teu navegador.",
            "Preferència de galetes (pd-cookie-consent): recorda la teva elecció a l'avís de galetes. És tècnica.",
            "No fem servir galetes analítiques ni publicitàries ni eines de seguiment.",
          ],
        },
        {
          heading: "Contingut de xarxes socials",
          paragraphs: [
            "A la pàgina de xarxes socials, Instagram, TikTok i Spotify poden instal·lar galetes pròpies quan es mostren les seves publicacions o la seva llista de reproducció. Només carreguem aquest contingut si acceptes les galetes de tercers. Si les rebutges, veuràs un enllaç per obrir el contingut a la mateixa xarxa o servei.",
            "En prémer enllaços a Google Forms o a altres llocs surts del nostre web i s'apliquen les polítiques d'aquests serveis.",
          ],
        },
        {
          heading: "Com gestionar les teves preferències",
          paragraphs: [
            "Pots acceptar, rebutjar o quedar-te només amb les essencials a l'avís de galetes. Per canviar l'elecció, fes servir l'enllaç «Canviar les preferències de galetes» del peu de pàgina. També pots esborrar o bloquejar galetes des dels ajustos del navegador.",
            "Si en el futur afegim analítica o altres eines, actualitzarem aquesta política i et demanarem consentiment abans.",
          ],
        },
      ],
    },
    accesibilidad: {
      title: "Declaració d'accessibilitat",
      lead: "Text provisional. Estat: en millora contínua.",
      sections: [
        {
          heading: "El nostre compromís",
          paragraphs: [
            "Volem que qualsevol persona pugui fer servir aquest web, també qui navega amb teclat, amb lector de pantalla, amb ampliació de text o amb dificultats de lectura. El nostre objectiu és complir les pautes WCAG 2.1 nivell AA.",
          ],
        },
        {
          heading: "Estat actual",
          paragraphs: [
            "Encara no s'ha fet una auditoria d'accessibilitat completa ni independent, per la qual cosa no declarem conformitat total amb WCAG 2.1 AA. Continuem revisant i corregint el web.",
          ],
        },
        {
          heading: "Mesures que apliquem",
          items: [
            "Estructura amb títols i zones de pàgina ben definits.",
            "Navegació completa amb teclat i focus visible.",
            "Enllaç per saltar al contingut principal.",
            "Contrast suficient i textos alternatius a les imatges.",
            "Disseny adaptable, amb zoom fins al 200 %.",
            "Respecte a la preferència del sistema de reduir animacions.",
            "Web disponible en castellà, català, valencià, èuscar, gallec, anglès, francès i alemany.",
          ],
        },
        {
          heading: "Limitacions conegudes",
          items: [
            "Els continguts incrustats d'Instagram, TikTok i Spotify i els formularis de Google són de tercers; la seva accessibilitat no depèn de nosaltres. Oferim sempre un enllaç alternatiu.",
            "Les traduccions a l'èuscar, gallec, valencià, francès i alemany estan pendents de revisió per part de persones parlants natives.",
            "Algunes parts, com gràfics, mapes o documents descarregables, poden no ser encara plenament accessibles.",
          ],
        },
        {
          heading: "Si trobes una barrera",
          paragraphs: [
            "Escriu-nos a {email} indicant la pàgina i el problema. Procurarem respondre't tan aviat com puguem i corregir-lo.",
            "Darrera revisió d'aquesta declaració: [FECHA].",
          ],
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────── EUSKARA
  eu: {
    aviso: {
      title: "Lege-oharra",
      lead: "Behin-behineko testua, lege-berrikuspenaren zain.",
      sections: [
        {
          heading: "Nor dago webgune honen atzean",
          paragraphs: [
            "Plataforma Dorada herritarren mugimendu bat da, alderdikeriarik gabea eta irabazi-asmorik gabea. Oraindik ez da erakunde eratua eta ez du nortasun juridiko propiorik. Webgune hau mugimendua bultzatzen duten boluntarioek mantentzen dute, norbere kabuz.",
            "Webgunearen arduraduna: [RESPONSABLE].",
            "Komunikazioetarako helbidea: [DOMICILIO].",
            "Harremanetarako helbide elektronikoa: {email}.",
            "Mugimendua elkarte edo beste erakunde gisa eratzen denean, lege-ohar hau haren identifikazio-datuekin eguneratuko dugu.",
          ],
        },
        {
          heading: "Webgunearen helburua",
          paragraphs: [
            "Webgune honek mugimenduari eta Mendekotasunaren eta Zaintzen aldeko Estatu Itun baten eskaerari buruzko informazioa ematen du, eta atxikitzeko, boluntario egiteko, testigantzak partekatzeko eta harremanetan jartzeko aukera ematen du. Ez du produkturik ez zerbitzurik saltzen eta ez du helburu komertzialik.",
          ],
        },
        {
          heading: "Erabilera-baldintzak",
          paragraphs: [
            "Sarbidea librea eta doakoa da. Webgunea errespetuz eta legezko moduan erabiltzeko eskatzen dizugu, eta ez saiatzeko hura kaltetzen, gainkargatzen edo haren kudeaketa-sistemetara baimenik gabe sartzen.",
          ],
        },
        {
          heading: "Jabetza intelektuala",
          paragraphs: [
            "Plataforma Dorada mugimenduaren izena, logotipoa eta berezko materialak jabetza intelektualaren araudiak babesten ditu. [CONDICIONES DE USO DE LOS MATERIALES].",
            "Beste hedabide batzuen albisteetatik izenburua, laburpen txiki bat eta jatorrizko argitalpenerako esteka bakarrik erakusten ditugu; argitalpen horren eskubideak egile eta hedabideenak dira.",
          ],
        },
        {
          heading: "Hirugarrenen estekak eta edukiak",
          paragraphs: [
            "Webgune honek hirugarrenen edukiak estekatzen edo txertatzen ditu (adibidez, Google Forms, Instagram, TikTok edo Spotify). Horiek erabiltzean gure webgunetik ateratzen zara eta zerbitzu horien baldintzak eta pribatutasun-politikak aplikatzen dira; haien erantzule ez gara.",
          ],
        },
        {
          heading: "Izaera informatiboa",
          paragraphs: [
            "Webguneko informazioa dibulgatiboa da. Ez da aholkularitza juridiko, sanitario edo sozial indibiduala. Datuek eta zifrek iturria adieraztea eta informazioa zuzena izatea bilatzen dugu, baina ezin dugu bermatu akatsik edo zerbitzu-etenik ez dagoenik.",
          ],
        },
        {
          id: "condiciones-voluntariado",
          heading: "Lege-oharra eta parte hartzeko baldintzak",
          intro: [
            "Plataforma Dorada mugimenduaren boluntariotzan parte hartzea librea eta borondatezkoa da, eta helburua da mendekotasunerako eta zaintzetarako eskubidearen defentsan laguntzea, bai eta Mendekotasunaren eta Zaintzen aldeko Estatu Ituna sustatzen laguntzea ere.",
            "Boluntarioek, beren erabilgarritasunaren eta gaitasunen arabera, zabalkunde-, komunikazio- eta sentsibilizazio-lanetan, erakundeekin harremanetan jartzen, kanpainei laguntzen eta plataformaren helburuekin lotutako beste jarduera batzuetan lagundu ahal izango dute.",
            "Inprimakian izena emateak ez dakar boluntariotzan automatikoki sartzea, eta berez ez du Plataforma Dorada mugimenduarekiko harreman loteslerik sortzen.",
            "Parte-hartzaileek konpromiso hauek hartzen dituzte:",
          ],
          items: [
            "Plataforma Dorada mugimenduaren printzipioak, helburuak eta balioak errespetatzea.",
            "Beren lankidetza modu arduratsuan, errespetuzkoan eta diskriminaziorik gabe garatzea.",
            "Lankidetzan zehar eskura ditzaketen informazio pertsonal edo sentikorraren konfidentzialtasuna gordetzea.",
            "Emandako materialak eta informazioa baimendutako jardueretarako soilik erabiltzea.",
            "Harremanetan jartzen diren pertsonen pribatutasuna eta eskubideak errespetatzea.",
          ],
          paragraphs: [
            "Parte hartzea borondatezkoa da, eta edozein unetan amai daiteke, plataformaren talde eragileari jakinarazita.",
            "Plataforma Dorada mugimenduak jarraibide zehatzak ezarri ahal izango ditu kanpaina edo jarduera bakoitzerako, lankidetza koordinatua, segurua eta bere helburuekin koherentea izan dadin.",
          ],
        },
        {
          heading: "Aplikatzekoa den legeria",
          paragraphs: ["Lege-ohar hau Espainiako legeriak arautzen du."],
        },
      ],
    },
    privacidad: {
      title: "Boluntariotzaren pribatutasun-politika",
      lead: "Plataforma Dorada mugimenduan konpromisoa hartzen dugu gure ekimenarekin lankidetzan aritu nahi duten pertsonen pribatutasuna babesteko. Datu pertsonalak modu arduratsuan eta gardenean tratatzen ditugu, datuen babesari buruzko indarreko araudiaren arabera.",
      sections: [
        {
          heading: "Tratamenduaren arduraduna",
          items: [
            "Arduraduna: Plataforma Dorada",
            "Helbide elektronikoa: plataformadoradaes@gmail.com.",
          ],
        },
        {
          heading: "Zer datu biltzen ditugu?",
          paragraphs: [
            "Identifikazio- eta harreman-datuak bil ditzakegu, hala nola izen-abizenak, helbide elektronikoa, telefonoa eta herria, baita erabilgarritasunari, esperientziari, ezagutzei eta lankidetza-interesei buruzko informazioa ere.",
            "Boluntariotza-jarduerak antolatzeko eta koordinatzeko beharrezkoak diren datuak soilik eskatuko ditugu.",
          ],
        },
        {
          heading: "Zertarako erabiltzen ditugu zure datuak?",
          intro: [
            "Datuak honetarako erabiliko dira:",
          ],
          items: [
            "Boluntariotzan sartzeko eskaerak kudeatzeko.",
            "Interesa duten pertsonekin harremanetan jartzeko eta haien parte-hartzea koordinatzeko.",
            "Haien lankidetzarekin lotutako kanpainei, jarduerei eta zereginei buruz informatzeko.",
            "Boluntariotza-jardueren antolaketa eta jarraipena egiteko.",
          ],
          paragraphs: [
            "Ez ditugu datuak aurreko helburuekin bateraezinak diren helburuetarako erabiliko, ezta plataformaren jardueraz kanpoko kanpaina komertzialetan sartuko ere.",
          ],
        },
        {
          heading: "Zein da tratamenduaren oinarri juridikoa?",
          paragraphs: [
            "Tratamendua parte hartzeko eskaeraren kudeaketan oinarrituko da eta, hala badagokio, boluntariotza-harremanaren kudeaketan, bai eta baimena behar duten erabileretarako emandako baimenean ere.",
            "Tratamendu bat baimenean oinarritzen denean, baimen hori edozein unetan kendu ahal izango da, eta horrek ez dio eragingo aurretik egindako tratamenduaren zilegitasunari.",
          ],
        },
        {
          heading: "Norekin partekatzen ditugu zure datuak?",
          paragraphs: [
            "Datuak ez dira salduko, ezta hirugarrenei lagako ere helburu komertzialetarako. Jarduerak antolatzeko beharrezkoa denean, oinarri juridiko baliozkoa dagoenean edo legez eskatzen denean bakarrik jakinarazi ahal izango dira.",
            "Inprimakiak, harreman-zerrendak edo komunikazioak kudeatzeko kanpoko tresnak erabiltzen badira, dagozkien bermeak eta babes-neurriak hartuko dira.",
          ],
        },
        {
          heading: "Zenbat denboraz gordetzen ditugu zure datuak?",
          paragraphs: [
            "Datuak eskaera eta boluntariotzako parte-hartzea kudeatzeko behar den denboran gordeko dira. Ondoren, ezabatu edo blokeatu egingo dira hala badagokio, legezko betebehar batengatik edo balizko erantzukizunei erantzuteko denbora gehiagoz gorde behar ez badira.",
          ],
        },
        {
          heading: "Zer eskubide dituzu?",
          paragraphs: [
            "Zure datuak eskuratzeko, zuzentzeko, ezabatzeko, aurka egiteko, tratamendua mugatzeko eta, hala badagokio, eramangarritasunerako eskubideak erabil ditzakezu.",
            "Horretarako, plataformadoradaes@gmail.com helbidera idatz dezakezu, erabili nahi duzun eskubidea adierazita.",
            "Halaber, erreklamazio bat aurkez dezakezu Datuak Babesteko Espainiako Agentzian, zure datuen tratamendua araudira egokitzen ez dela uste baduzu.",
          ],
        },
        {
          heading: "Segurtasuna eta konfidentzialtasuna",
          paragraphs: [
            "Plataforma Dorada mugimenduak neurri tekniko eta antolakuntzako egokiak hartuko ditu datu pertsonalak baimenik gabeko sarbideen, galeren, aldaketen edo zabalkunde desegokiaren aurka babesteko.",
            "Boluntarioen informazioa jakinarazitako helburuetarako soilik erabiliko da, eta sarbidea beren eginkizunak betetzeko behar dutenetara mugatuko da.",
            "EGUNERATZE-DATA: 2026/10/13",
          ],
        },
      ],
    },
    cookies: {
      title: "Cookien politika",
      lead: "Behin-behineko testua, lege-berrikuspenaren zain.",
      sections: [
        {
          heading: "Zer dira",
          paragraphs: [
            "Webgune batek zure nabigatzailean gordetzen dituen fitxategi edo datu txikiak dira. Hemen cookieei eta antzeko teknologiei buruz ari gara, hala nola nabigatzailearen biltegiratze lokalari buruz.",
          ],
        },
        {
          heading: "Zer erabiltzen dugun geuk",
          items: [
            "Hizkuntza-lehentasuna (pd-locale): aukeratzen duzun hizkuntza gogoratzen du. Teknikoa da eta zure nabigatzailean bakarrik gordetzen da.",
            "Cookien lehentasuna (pd-cookie-consent): cookien oharrean egiten duzun hautua gogoratzen du. Teknikoa da.",
            "Ez ditugu analisi- edo publizitate-cookieak ez jarraipen-tresnarik erabiltzen.",
          ],
        },
        {
          heading: "Sare sozialetako edukia",
          paragraphs: [
            "Sare sozialen orrian, Instagramek, TikTokek eta Spotifyk cookie propioak instalatu ditzakete haien argitalpenak edo erreprodukzio-zerrenda erakusten direnean. Eduki hori hirugarrenen cookieak onartzen badituzu bakarrik kargatzen dugu. Baztertzen badituzu, edukia sarean edo zerbitzuan bertan irekitzeko esteka bat ikusiko duzu.",
            "Google Forms edo beste webgune batzuetarako estekak sakatzean gure webgunetik ateratzen zara eta zerbitzu horien politikak aplikatzen dira.",
          ],
        },
        {
          heading: "Zure lehentasunak nola kudeatu",
          paragraphs: [
            "Cookien oharrean onartu, baztertu edo ezinbestekoekin soilik gera zaitezke. Hautua aldatzeko, erabili orri-oineko «Cookie-lehentasunak aldatu» esteka. Cookieak nabigatzailearen ezarpenetatik ere ezabatu edo blokea ditzakezu.",
            "Etorkizunean analitika edo beste tresnaren bat gehitzen badugu, politika hau eguneratuko dugu eta lehenago zure baimena eskatuko dugu.",
          ],
        },
      ],
    },
    accesibilidad: {
      title: "Irisgarritasun-adierazpena",
      lead: "Behin-behineko testua. Egoera: etengabeko hobekuntzan.",
      sections: [
        {
          heading: "Gure konpromisoa",
          paragraphs: [
            "Edonork erabili ahal izatea nahi dugu webgune hau, baita teklatuarekin, pantaila-irakurgailuarekin, testua handituz edo irakurtzeko zailtasunekin nabigatzen dutenek ere. Gure helburua WCAG 2.1 AA mailako jarraibideak betetzea da.",
          ],
        },
        {
          heading: "Uneko egoera",
          paragraphs: [
            "Oraindik ez da irisgarritasun-auditoria osorik edo independenterik egin; beraz, ez dugu WCAG 2.1 AA arauarekiko adostasun osoa aldarrikatzen. Webgunea berrikusten eta zuzentzen jarraitzen dugu.",
          ],
        },
        {
          heading: "Aplikatzen ditugun neurriak",
          items: [
            "Izenburuekin eta orriaren eremu ondo definituekin egituratua.",
            "Teklatuarekin nabigazio osoa eta fokua ikusgai.",
            "Eduki nagusira saltatzeko esteka.",
            "Kontraste nahikoa eta irudietan ordezko testuak.",
            "Diseinu moldagarria, %200 arteko zoomarekin.",
            "Animazioak murrizteko sistemaren lehentasunarekiko errespetua.",
            "Webgunea gaztelaniaz, katalanez, valentzieraz, euskaraz, galegoz, ingelesez, frantsesez eta alemanez eskuragarri dago.",
          ],
        },
        {
          heading: "Ezagutzen ditugun mugak",
          items: [
            "Instagram, TikTok eta Spotifyko edukiak eta Googleren inprimakiak hirugarrenenak dira; haien irisgarritasuna ez dago gure esku. Beti eskaintzen dugu ordezko esteka bat.",
            "Euskarazko, galegozko, valentzierazko, frantsesezko eta alemanezko itzulpenak hiztun natiboek berrikusi behar dituzte.",
            "Baliteke zenbait zati (grafikoak, mapak edo deskarga daitezkeen dokumentuak) oraindik guztiz irisgarriak ez izatea.",
          ],
        },
        {
          heading: "Oztoporen bat aurkitzen baduzu",
          paragraphs: [
            "Idatzi {email} helbidera, orria eta arazoa adieraziz. Ahalik eta azkarren erantzuten eta konpontzen saiatuko gara.",
            "Adierazpen honen azken berrikuspena: [FECHA].",
          ],
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────── GALEGO
  gl: {
    aviso: {
      title: "Aviso legal",
      lead: "Texto provisional pendente de revisión xurídica.",
      sections: [
        {
          heading: "Quen está detrás desta web",
          paragraphs: [
            "Plataforma Dorada é un movemento cidadán, apartidista e sen ánimo de lucro. Aínda non é unha entidade constituída nin ten personalidade xurídica propia. Esta web mantéñena, a título persoal, as persoas voluntarias que impulsan o movemento.",
            "Responsable da web: [RESPONSABLE].",
            "Domicilio para efectos de comunicacións: [DOMICILIO].",
            "Correo electrónico de contacto: {email}.",
            "Cando o movemento se constitúa como asociación ou outra entidade, actualizaremos este aviso cos seus datos de identificación.",
          ],
        },
        {
          heading: "Finalidade do sitio",
          paragraphs: [
            "Esta web informa sobre o movemento e a súa petición dun Pacto de Estado pola Dependencia e os Coidados, e permite adherirse, facerse voluntario ou voluntaria, compartir testemuños e poñerse en contacto. Non vende produtos nin servizos e non ten finalidade comercial.",
          ],
        },
        {
          heading: "Condicións de uso",
          paragraphs: [
            "O acceso é libre e gratuíto. Pedímoste un uso respectuoso e lícito da web, e que non intentes danala, sobrecargala nin acceder sen autorización aos seus sistemas de xestión.",
          ],
        },
        {
          heading: "Propiedade intelectual",
          paragraphs: [
            "O nome, o logotipo e os materiais propios de Plataforma Dorada están protexidos pola normativa de propiedade intelectual. [CONDICIONES DE USO DE LOS MATERIALES].",
            "Das noticias doutros medios amosamos só o título, un breve resumo e a ligazón á publicación orixinal, cuxos dereitos pertencen aos seus autores e medios.",
          ],
        },
        {
          heading: "Ligazóns e contidos de terceiros",
          paragraphs: [
            "Esta web enlaza ou incrusta contidos de terceiros (por exemplo, Google Forms, Instagram, TikTok ou Spotify). Ao usalos sáis da nosa web e aplícanse as condicións e as políticas de privacidade desses servizos, dos que non somos responsables.",
          ],
        },
        {
          heading: "Carácter informativo",
          paragraphs: [
            "A información da web é divulgativa. Non constitúe asesoramento xurídico, sanitario nin social individual. Procuramos que os datos e as cifras indiquen a súa fonte e que a información sexa correcta, pero non podemos garantir que non haxa erros ou interrupcións do servizo.",
          ],
        },
        {
          id: "condiciones-voluntariado",
          heading: "Aviso legal e condicións de participación",
          intro: [
            "A participación no voluntariado de Plataforma Dorada é libre e voluntaria, e ten como finalidade colaborar na defensa do dereito á dependencia e aos coidados, así como na promoción do Pacto de Estado pola Dependencia e os Coidados.",
            "As persoas voluntarias poderán colaborar, segundo a súa dispoñibilidade e capacidades, en tarefas de difusión, comunicación, sensibilización, contacto con entidades, apoio a campañas e outras actividades vinculadas aos obxectivos da plataforma.",
            "A inscrición no formulario non implica a incorporación automática ao voluntariado nin xera por si mesma unha relación vinculante con Plataforma Dorada.",
            "As persoas participantes comprométense a:",
          ],
          items: [
            "Respectar os principios, obxectivos e valores de Plataforma Dorada.",
            "Desenvolver a súa colaboración de forma responsable, respectuosa e non discriminatoria.",
            "Manter a confidencialidade da información persoal ou sensible á que poidan acceder durante a súa colaboración.",
            "Utilizar os materiais e a información facilitados exclusivamente para as actividades autorizadas.",
            "Respectar a privacidade e os dereitos das persoas coas que contacten.",
          ],
          paragraphs: [
            "A participación é voluntaria e pode rematar en calquera momento mediante comunicación ao grupo motor da plataforma.",
            "Plataforma Dorada poderá establecer instrucións específicas para cada campaña ou actividade co fin de garantir unha colaboración coordinada, segura e coherente cos seus obxectivos.",
          ],
        },
        {
          heading: "Lexislación aplicable",
          paragraphs: ["Este aviso réxese pola lexislación española."],
        },
      ],
    },
    privacidad: {
      title: "Política de privacidade do voluntariado",
      lead: "En Plataforma Dorada comprometémonos a protexer a privacidade das persoas que desexan colaborar coa nosa iniciativa. Tratamos os datos persoais de forma responsable, transparente e conforme á normativa vixente en materia de protección de datos.",
      sections: [
        {
          heading: "Responsable do tratamento",
          items: [
            "Responsable: Plataforma Dorada",
            "Correo electrónico: plataformadoradaes@gmail.com.",
          ],
        },
        {
          heading: "Que datos recollemos?",
          paragraphs: [
            "Podemos recoller datos identificativos e de contacto, como nome e apelidos, correo electrónico, teléfono e localidade, así como información sobre dispoñibilidade, experiencia, coñecementos e intereses de colaboración.",
            "Só solicitaremos os datos necesarios para organizar e coordinar as actividades de voluntariado.",
          ],
        },
        {
          heading: "Para que utilizamos os teus datos?",
          intro: [
            "Os datos utilizaranse para:",
          ],
          items: [
            "Xestionar as solicitudes de incorporación ao voluntariado.",
            "Contactar coas persoas interesadas e coordinar a súa participación.",
            "Informar sobre campañas, actividades e tarefas relacionadas coa súa colaboración.",
            "Manter a organización e o seguimento das actividades de voluntariado.",
          ],
          paragraphs: [
            "Non utilizaremos os datos para finalidades incompatibles coas anteriores nin os incorporaremos a campañas comerciais alleas á actividade da plataforma.",
          ],
        },
        {
          heading: "Cal é a base xurídica do tratamento?",
          paragraphs: [
            "O tratamento fundamentarase na xestión da solicitude de participación e, cando proceda, da relación de voluntariado, así como no consentimento para aqueles usos que o requiran.",
            "Cando un tratamento se base no consentimento, este poderá retirarse en calquera momento, sen que isto afecte á licitude do tratamento realizado previamente.",
          ],
        },
        {
          heading: "Con quen compartimos os teus datos?",
          paragraphs: [
            "Os datos non se venderán nin se cederán a terceiros para fins comerciais. Só poderán comunicarse cando sexa necesario para a organización das actividades, exista unha base xurídica válida ou resulte esixible legalmente.",
            "Se se utilizan ferramentas externas para xestionar formularios, listas de contactos ou comunicacións, adoptaranse as garantías e medidas de protección que correspondan.",
          ],
        },
        {
          heading: "Durante canto tempo conservamos os teus datos?",
          paragraphs: [
            "Os datos conservaranse durante o tempo necesario para xestionar a solicitude e a participación no voluntariado. Posteriormente, suprimiranse ou bloquearanse cando proceda, salvo que deban conservarse durante máis tempo por unha obriga legal ou para atender posibles responsabilidades.",
          ],
        },
        {
          heading: "Que dereitos tes?",
          paragraphs: [
            "Podes exercer os teus dereitos de acceso, rectificación, supresión, oposición, limitación do tratamento e, cando corresponda, portabilidade dos teus datos.",
            "Para iso, podes escribir a plataformadoradaes@gmail.com indicando o dereito que desexas exercer.",
            "Tamén podes presentar unha reclamación ante a Axencia Española de Protección de Datos se consideras que o tratamento dos teus datos non se axusta á normativa.",
          ],
        },
        {
          heading: "Seguridade e confidencialidade",
          paragraphs: [
            "Plataforma Dorada adoptará as medidas técnicas e organizativas axeitadas para protexer os datos persoais fronte a accesos non autorizados, perda, alteración ou divulgación indebida.",
            "A información das persoas voluntarias utilizarase unicamente para os fins informados e con acceso limitado a quen a precise para desenvolver as súas funcións.",
            "DATA DE ACTUALIZACIÓN: 13/10/2026",
          ],
        },
      ],
    },
    cookies: {
      title: "Política de cookies",
      lead: "Texto provisional pendente de revisión xurídica.",
      sections: [
        {
          heading: "Que son",
          paragraphs: [
            "Son pequenos ficheiros ou datos que unha web garda no teu navegador. Aquí falamos de cookies e de tecnoloxías equivalentes, como o almacenamento local do navegador.",
          ],
        },
        {
          heading: "Que usamos nós",
          items: [
            "Preferencia de idioma (pd-locale): lembra o idioma que escolles. É técnica e gárdase só no teu navegador.",
            "Preferencia de cookies (pd-cookie-consent): lembra a túa elección no aviso de cookies. É técnica.",
            "Non usamos cookies analíticas nin publicitarias nin ferramentas de seguimento.",
          ],
        },
        {
          heading: "Contido de redes sociais",
          paragraphs: [
            "Na páxina de redes sociais, Instagram, TikTok e Spotify poden instalar cookies propias cando se amosan as súas publicacións ou a súa lista de reprodución. Só cargamos ese contido se aceptas as cookies de terceiros. Se as rexeitas, verás unha ligazón para abrir o contido na propia rede ou servizo.",
            "Ao premer ligazóns a Google Forms ou a outros sitios sáis da nosa web e aplícanse as políticas desses servizos.",
          ],
        },
        {
          heading: "Como xestionar as túas preferencias",
          paragraphs: [
            "Podes aceptar, rexeitar ou quedar só coas esenciais no aviso de cookies. Para cambiar a túa elección, usa a ligazón «Cambiar as preferencias de cookies» do pé de páxina. Tamén podes borrar ou bloquear cookies desde os axustes do navegador.",
            "Se no futuro engadimos analítica ou outras ferramentas, actualizaremos esta política e pediremos o teu consentimento antes.",
          ],
        },
      ],
    },
    accesibilidad: {
      title: "Declaración de accesibilidade",
      lead: "Texto provisional. Estado: en mellora continua.",
      sections: [
        {
          heading: "O noso compromiso",
          paragraphs: [
            "Queremos que calquera persoa poida usar esta web, tamén quen navega con teclado, con lector de pantalla, con ampliación de texto ou con dificultades de lectura. O noso obxectivo é cumprir as pautas WCAG 2.1 nivel AA.",
          ],
        },
        {
          heading: "Estado actual",
          paragraphs: [
            "Aínda non se fixo unha auditoría de accesibilidade completa nin independente, polo que non declaramos conformidade total con WCAG 2.1 AA. Seguimos revisando e corrixindo a web.",
          ],
        },
        {
          heading: "Medidas que aplicamos",
          items: [
            "Estrutura con títulos e zonas de páxina ben definidos.",
            "Navegación completa con teclado e foco visible.",
            "Ligazón para saltar ao contido principal.",
            "Contraste suficiente e textos alternativos nas imaxes.",
            "Deseño adaptable, con zoom ata o 200 %.",
            "Respecto á preferencia do sistema de reducir animacións.",
            "Web dispoñible en castelán, catalán, valenciano, éuscaro, galego, inglés, francés e alemán.",
          ],
        },
        {
          heading: "Limitacións coñecidas",
          items: [
            "Os contidos incrustados de Instagram, TikTok e Spotify e os formularios de Google son de terceiros; a súa accesibilidade non depende de nós. Ofrecemos sempre unha ligazón alternativa.",
            "As traducións ao éuscaro, galego, valenciano, francés e alemán están pendentes de revisión por persoas falantes nativas.",
            "Algunhas partes, como gráficos, mapas ou documentos descargables, poden non ser aínda plenamente accesibles.",
          ],
        },
        {
          heading: "Se atopas unha barreira",
          paragraphs: [
            "Escríbenos a {email} indicando a páxina e o problema. Procuraremos responderche canto antes e corrixilo.",
            "Última revisión desta declaración: [FECHA].",
          ],
        },
      ],
    },
  },
  // ─────────────────────────────────────────────────────────── ENGLISH
  en: {
    aviso: {
      title: "Legal notice",
      lead: "Provisional text pending legal review.",
      sections: [
        {
          heading: "Who is behind this website",
          paragraphs: [
            "Plataforma Dorada is a citizens' movement, non-partisan and not-for-profit. It is not yet a constituted organisation and has no legal personality of its own. This website is maintained, in a personal capacity, by the volunteers who drive the movement.",
            "Person responsible for the website: [RESPONSABLE].",
            "Address for communications: [DOMICILIO].",
            "Contact email: {email}.",
            "When the movement is constituted as an association or other organisation, we will update this notice with its identification details.",
          ],
        },
        {
          heading: "Purpose of the site",
          paragraphs: [
            "This website provides information about the movement and its call for a State Pact on Dependency and Care, and lets you pledge your support, volunteer, share testimonials and get in touch. It does not sell products or services and has no commercial purpose.",
          ],
        },
        {
          heading: "Terms of use",
          paragraphs: [
            "Access is free and open. We ask you to use the website respectfully and lawfully, and not to try to damage or overload it or to access its management systems without authorisation.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The name, logo and own materials of Plataforma Dorada are protected by intellectual property law. [CONDICIONES DE USO DE LOS MATERIALES].",
            "For news from other media, we show only the headline, a short summary and a link to the original publication, whose rights belong to its authors and outlets.",
          ],
        },
        {
          heading: "Third-party links and content",
          paragraphs: [
            "This website links to or embeds third-party content (for example Google Forms, Instagram, TikTok or Spotify). When you use it you leave our website and the terms and privacy policies of those services apply; we are not responsible for them.",
          ],
        },
        {
          heading: "Informational nature",
          paragraphs: [
            "The information on this website is for general awareness. It is not individual legal, health or social advice. We try to cite the source of data and figures and to keep information accurate, but we cannot guarantee that there will be no errors or service interruptions.",
          ],
        },
        {
          id: "condiciones-voluntariado",
          heading: "Legal notice and terms of participation",
          intro: [
            "Taking part in Plataforma Dorada's volunteer programme is free and voluntary. Its purpose is to help defend the right to care and support for people in situations of dependency, and to promote the State Pact on Dependency and Care.",
            "Volunteers may help, according to their availability and skills, with outreach, communication, awareness-raising, contacting organisations, supporting campaigns and other activities linked to the platform's objectives.",
            "Signing up through the form does not mean automatic admission to the volunteer programme, nor does it in itself create a binding relationship with Plataforma Dorada.",
            "Participants undertake to:",
          ],
          items: [
            "Respect the principles, objectives and values of Plataforma Dorada.",
            "Carry out their collaboration in a responsible, respectful and non-discriminatory way.",
            "Keep confidential any personal or sensitive information they may have access to during their collaboration.",
            "Use the materials and information provided exclusively for authorised activities.",
            "Respect the privacy and rights of the people they contact.",
          ],
          paragraphs: [
            "Participation is voluntary and may end at any time by notifying the platform's coordinating group.",
            "Plataforma Dorada may set specific instructions for each campaign or activity to ensure coordinated, safe collaboration that is consistent with its objectives.",
          ],
        },
        {
          heading: "Applicable law",
          paragraphs: ["This notice is governed by Spanish law."],
        },
      ],
    },
    privacidad: {
      title: "Volunteer privacy policy",
      lead: "At Plataforma Dorada we are committed to protecting the privacy of the people who wish to collaborate with our initiative. We process personal data responsibly, transparently and in accordance with the data protection legislation in force.",
      sections: [
        {
          heading: "Data controller",
          items: [
            "Controller: Plataforma Dorada",
            "Email: plataformadoradaes@gmail.com.",
          ],
        },
        {
          heading: "What data do we collect?",
          paragraphs: [
            "We may collect identification and contact details, such as first name and surname, email address, telephone number and town or city, as well as information about availability, experience, knowledge and areas of interest for collaboration.",
            "We will only ask for the data needed to organise and coordinate volunteer activities.",
          ],
        },
        {
          heading: "What do we use your data for?",
          intro: [
            "Your data will be used to:",
          ],
          items: [
            "Manage requests to join the volunteer programme.",
            "Contact interested people and coordinate their participation.",
            "Provide information about campaigns, activities and tasks related to their collaboration.",
            "Keep volunteer activities organised and followed up.",
          ],
          paragraphs: [
            "We will not use the data for purposes incompatible with those above, nor include it in commercial campaigns unrelated to the platform's activity.",
          ],
        },
        {
          heading: "What is the legal basis for processing?",
          paragraphs: [
            "Processing will be based on handling the request to take part and, where applicable, the volunteer relationship, as well as on consent for any uses that require it.",
            "Where processing is based on consent, consent may be withdrawn at any time, without affecting the lawfulness of processing carried out before its withdrawal.",
          ],
        },
        {
          heading: "Who do we share your data with?",
          paragraphs: [
            "Your data will not be sold or transferred to third parties for commercial purposes. It may only be disclosed when necessary to organise activities, when there is a valid legal basis or when required by law.",
            "If external tools are used to manage forms, contact lists or communications, the appropriate safeguards and protection measures will be adopted.",
          ],
        },
        {
          heading: "How long do we keep your data?",
          paragraphs: [
            "Data will be kept for as long as necessary to manage the request and participation in the volunteer programme. It will then be deleted or blocked where appropriate, unless it must be kept longer because of a legal obligation or to deal with possible liabilities.",
          ],
        },
        {
          heading: "What are your rights?",
          paragraphs: [
            "You may exercise your rights of access, rectification, erasure, objection, restriction of processing and, where applicable, data portability.",
            "To do so, write to plataformadoradaes@gmail.com stating which right you wish to exercise.",
            "You may also lodge a complaint with the Spanish Data Protection Agency (Agencia Española de Protección de Datos) if you consider that the processing of your data does not comply with the law.",
          ],
        },
        {
          heading: "Security and confidentiality",
          paragraphs: [
            "Plataforma Dorada will adopt appropriate technical and organisational measures to protect personal data against unauthorised access, loss, alteration or improper disclosure.",
            "Volunteers' information will be used only for the stated purposes, and access will be limited to those who need it to carry out their duties.",
            "LAST UPDATED: 13/10/2026",
          ],
        },
      ],
    },
    cookies: {
      title: "Cookie policy",
      lead: "Provisional text pending legal review.",
      sections: [
        {
          heading: "What they are",
          paragraphs: [
            "They are small files or pieces of data that a website stores in your browser. Here we refer to cookies and equivalent technologies, such as the browser's local storage.",
          ],
        },
        {
          heading: "What we use",
          items: [
            "Language preference (pd-locale): remembers the language you choose. It is technical and is stored only in your browser.",
            "Cookie preference (pd-cookie-consent): remembers your choice in the cookie notice. It is technical.",
            "We do not use analytics or advertising cookies or tracking tools.",
          ],
        },
        {
          heading: "Social media content",
          paragraphs: [
            "On the social media page, Instagram, TikTok and Spotify may set their own cookies when their posts or playlist are displayed. We only load that content if you accept third-party cookies. If you reject them, you will see a link to open the content on the network or service itself.",
            "When you click links to Google Forms or other sites you leave our website and those services' policies apply.",
          ],
        },
        {
          heading: "How to manage your preferences",
          paragraphs: [
            "You can accept, reject or keep only the essential ones in the cookie notice. To change your choice, use the “Change cookie preferences” link in the footer. You can also delete or block cookies from your browser settings.",
            "If we add analytics or other tools in the future, we will update this policy and ask for your consent first.",
          ],
        },
      ],
    },
    accesibilidad: {
      title: "Accessibility statement",
      lead: "Provisional text. Status: under continuous improvement.",
      sections: [
        {
          heading: "Our commitment",
          paragraphs: [
            "We want anyone to be able to use this website, including people who browse with a keyboard, a screen reader, text magnification or reading difficulties. Our goal is to meet the WCAG 2.1 level AA guidelines.",
          ],
        },
        {
          heading: "Current status",
          paragraphs: [
            "A full, independent accessibility audit has not yet been carried out, so we do not claim full conformance with WCAG 2.1 AA. We keep reviewing and fixing the website.",
          ],
        },
        {
          heading: "Measures we apply",
          items: [
            "Structure with well-defined headings and page regions.",
            "Full keyboard navigation and visible focus.",
            "Link to skip to the main content.",
            "Sufficient contrast and alternative text for images.",
            "Responsive design, with zoom up to 200%.",
            "Respect for the system preference to reduce motion.",
            "Website available in Spanish, Catalan, Valencian, Basque, Galician, English, French and German.",
          ],
        },
        {
          heading: "Known limitations",
          items: [
            "Embedded content from Instagram, TikTok and Spotify and Google forms are third-party; their accessibility does not depend on us. We always provide an alternative link.",
            "The Basque, Galician, Valencian, French and German translations are pending review by native speakers.",
            "Some parts, such as charts, maps or downloadable documents, may not yet be fully accessible.",
          ],
        },
        {
          heading: "If you find a barrier",
          paragraphs: [
            "Write to us at {email} stating the page and the problem. We will try to reply as soon as possible and fix it.",
            "Last review of this statement: [FECHA].",
          ],
        },
      ],
    },
  },
};

// Valenciano (normativa de la AVL): se parte del texto catalán y se aplican las formas propias
// (demostrativos, subjuntivos y algunas palabras). Debe revisarlo una persona valencianohablante.
const VA_WORDS: Record<string, string> = {
  aquest: "este", aquesta: "esta", aquests: "estos", aquestes: "estes",
  revisi: "revise", constitueixi: "constituïsca", sigui: "siga", retiris: "retires", pugui: "puga", puguin: "puguen", contactin: "contacten", escaigui: "escaiga", requereixin: "requerisquen", basi: "base", corresponguin: "corresponguen", correspongui: "corresponga", hagin: "hagen", necessiti: "necessite",
  permetin: "permeten", intentis: "intentes", indiquin: "indiquen", incloguis: "inclogues",
  hagi: "haja", estigui: "estiga", demanis: "demanes", autoritzi: "autoritze", afecti: "afecte",
  tingui: "tinga", cuidi: "cuide", disposis: "disposes", garanteixi: "garantisca", garanteixin: "garantisquen", introdueixin: "introduïsquen", necessitin: "necessiten", omplis: "òmpliga", resideixi: "residisca", transcendeixi: "transcendisca", vagi: "vaja", visquis: "visques", vulguis: "vulgues", propers: "pròxims", proper: "pròxim", vés: "ves",
};
function toValencian(text: string): string {
  return text.replace(/[A-Za-zÀ-ÿ]+/g, (word) => {
    const hit = VA_WORDS[word.toLowerCase()];
    if (!hit) return word;
    return word[0] === word[0].toUpperCase() ? hit[0].toUpperCase() + hit.slice(1) : hit;
  });
}
function valencianDocs(source: Record<LegalKey, LegalDoc>): Record<LegalKey, LegalDoc> {
  const out = {} as Record<LegalKey, LegalDoc>;
  for (const key of Object.keys(source) as LegalKey[]) {
    const doc = source[key];
    out[key] = {
      title: toValencian(doc.title),
      lead: toValencian(doc.lead),
      sections: doc.sections.map((section) => {
        const next: LegalSection = { heading: toValencian(section.heading) };
        if (section.id) next.id = section.id;
        if (section.intro) next.intro = section.intro.map(toValencian);
        if (section.paragraphs) next.paragraphs = section.paragraphs.map(toValencian);
        if (section.items) next.items = section.items.map(toValencian);
        return next;
      }),
    };
  }
  return out;
}

export const LEGAL: Record<Locale, Record<LegalKey, LegalDoc>> = {
  ...LEGAL_BASE,
  va: valencianDocs(LEGAL_BASE.ca),
  fr: LEGAL_FR,
  de: LEGAL_DE,
};
