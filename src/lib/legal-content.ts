// Textos legales de Plataforma Dorada en los cuatro idiomas de la web.
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
// Las versiones en euskera y gallego deben ser revisadas por hablantes nativos.

import type { Locale } from "./i18n";

export type LegalSection = { heading: string; paragraphs?: string[]; items?: string[] };
export type LegalDoc = { title: string; lead: string; sections: LegalSection[] };
export type LegalKey = "aviso" | "privacidad" | "cookies" | "accesibilidad";

export const LEGAL: Record<Locale, Record<LegalKey, LegalDoc>> = {
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
          heading: "Legislación aplicable",
          paragraphs: ["Este aviso se rige por la legislación española."],
        },
      ],
    },
    privacidad: {
      title: "Política de privacidad",
      lead: "Texto provisional pendiente de revisión jurídica.",
      sections: [
        {
          heading: "Quién es el responsable del tratamiento",
          paragraphs: [
            "Plataforma Dorada es un movimiento ciudadano sin personalidad jurídica propia. Los datos personales que recogemos los tratan las personas que impulsan el movimiento, que actúan como responsables: [RESPONSABLE].",
            "Domicilio: [DOMICILIO]. Correo electrónico: {email}.",
            "Cuando el movimiento se constituya como entidad, esta pasará a ser la responsable y te informaremos del cambio.",
          ],
        },
        {
          heading: "Qué datos tratamos y para qué",
          items: [
            "Adhesión: los datos que te pedimos en el formulario ([DATOS DEL FORMULARIO DE ADHESIÓN]). Los usamos para contabilizar el apoyo al movimiento y mostrar cifras agregadas. Base: tu consentimiento.",
            "Aparecer públicamente (opcional): solo si lo autorizas expresamente en el formulario, mostramos en la web tu nombre, la inicial de tu primer apellido y tu ciudad. Es un consentimiento distinto del de adherirte: si no lo das, no apareces.",
            "Voluntariado: los datos del formulario ([DATOS DEL FORMULARIO DE VOLUNTARIADO]), para contactarte y coordinar la colaboración. Base: tu consentimiento.",
            "Testimonios: tu testimonio y tus datos de contacto. Un testimonio puede revelar datos de salud o de dependencia, que están especialmente protegidos: solo los tratamos con tu consentimiento explícito. Hay dos consentimientos separados: uno para enviarnos el testimonio y otro, opcional, para publicarlo.",
            "Contacto: el nombre, el correo y el mensaje que nos envías, para responderte. Base: tu consentimiento al enviar el formulario.",
            "Entidades adheridas: datos de la entidad, de su persona de contacto y su logotipo, para mostrarla como entidad adherida. Base: consentimiento.",
          ],
          paragraphs: [
            "No vendemos tus datos, no los usamos con fines publicitarios y no tomamos decisiones automatizadas con ellos.",
          ],
        },
        {
          heading: "Testimonios que hablan de otras personas",
          paragraphs: [
            "Si cuentas la situación de otra persona (por ejemplo, un familiar dependiente), hazlo sin datos que permitan identificarla o asegúrate de contar con su permiso. Podemos ocultar o editar un testimonio para proteger la intimidad de terceros.",
            "Por favor, no incluyas información de salud en el formulario de contacto: para eso existe el formulario de testimonios.",
          ],
        },
        {
          heading: "Con quién compartimos los datos",
          paragraphs: [
            "No cedemos tus datos a terceros para sus propios fines. Para gestionar la web usamos servicios de Google (Formularios, Hojas de cálculo, Drive, Apps Script y Gmail), que tratan datos por cuenta nuestra y pueden implicar transferencias fuera del Espacio Económico Europeo con las garantías previstas en el RGPD.",
            "El acceso a los datos se limita a las personas voluntarias que el movimiento autorice [CONFIRMAR ACCESO].",
            "Lo que autorizas publicar (adhesión o testimonio) es visible para cualquier persona en Internet.",
          ],
        },
        {
          heading: "Cuánto tiempo los conservamos",
          paragraphs: [
            "Conservamos tus datos mientras el movimiento esté activo o hasta que retires tu consentimiento o pidas su supresión. Los mensajes de contacto se conservan [PLAZO]. Después los eliminamos o, si una ley nos obliga a guardarlos, los bloqueamos.",
          ],
        },
        {
          heading: "Tus derechos",
          items: [
            "Acceder a tus datos y obtener una copia.",
            "Rectificarlos si son inexactos.",
            "Pedir su supresión.",
            "Oponerte a un tratamiento o pedir que lo limitemos.",
            "Recibirlos en un formato reutilizable (portabilidad).",
            "Retirar tu consentimiento en cualquier momento, sin que afecte a lo ya realizado.",
          ],
          paragraphs: [
            "Escribe a {email} indicando qué derecho quieres ejercer; te responderemos en el plazo máximo de un mes. Si retiras la autorización para aparecer públicamente o para publicar tu testimonio, lo retiraremos de la web.",
            "Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).",
          ],
        },
        {
          heading: "Menores de edad",
          paragraphs: [
            "Esta web no está dirigida a menores de 14 años. Si eres menor de esa edad, necesitas la autorización de tu padre, madre o tutor legal para darnos tus datos.",
          ],
        },
        {
          heading: "Seguridad",
          paragraphs: [
            "Aplicamos medidas razonables para proteger los datos: acceso restringido, servicios con autenticación y publicación en la web únicamente de datos agregados o autorizados expresamente. Ninguna medida es infalible; si detectas un problema, avísanos en {email}.",
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
            "Web disponible en castellano, catalán, euskera y gallego.",
          ],
        },
        {
          heading: "Limitaciones conocidas",
          items: [
            "Los contenidos incrustados de Instagram, TikTok y Spotify y los formularios de Google son de terceros; su accesibilidad no depende de nosotros. Ofrecemos siempre un enlace alternativo.",
            "Las traducciones al euskera y al gallego están pendientes de revisión por personas hablantes nativas.",
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
          heading: "Legislació aplicable",
          paragraphs: ["Aquest avís es regeix per la legislació espanyola."],
        },
      ],
    },
    privacidad: {
      title: "Política de privacitat",
      lead: "Text provisional pendent de revisió jurídica.",
      sections: [
        {
          heading: "Qui és el responsable del tractament",
          paragraphs: [
            "Plataforma Dorada és un moviment ciutadà sense personalitat jurídica pròpia. Les dades personals que recollim les tracten les persones que impulsen el moviment, que actuen com a responsables: [RESPONSABLE].",
            "Domicili: [DOMICILIO]. Correu electrònic: {email}.",
            "Quan el moviment es constitueixi com a entitat, aquesta passarà a ser la responsable i t'informarem del canvi.",
          ],
        },
        {
          heading: "Quines dades tractem i per a què",
          items: [
            "Adhesió: les dades que et demanem al formulari ([DATOS DEL FORMULARIO DE ADHESIÓN]). Les fem servir per comptabilitzar el suport al moviment i mostrar xifres agregades. Base: el teu consentiment.",
            "Aparèixer públicament (opcional): només si ho autoritzes expressament al formulari, mostrem al web el teu nom, la inicial del primer cognom i la teva ciutat. És un consentiment diferent del d'adherir-te: si no el dónes, no apareixes.",
            "Voluntariat: les dades del formulari ([DATOS DEL FORMULARIO DE VOLUNTARIADO]), per contactar amb tu i coordinar la col·laboració. Base: el teu consentiment.",
            "Testimonis: el teu testimoni i les teves dades de contacte. Un testimoni pot revelar dades de salut o de dependència, que estan especialment protegides: només les tractem amb el teu consentiment explícit. Hi ha dos consentiments separats: un per enviar-nos el testimoni i un altre, opcional, per publicar-lo.",
            "Contacte: el nom, el correu i el missatge que ens envies, per respondre't. Base: el teu consentiment en enviar el formulari.",
            "Entitats adherides: dades de l'entitat, de la seva persona de contacte i el seu logotip, per mostrar-la com a entitat adherida. Base: consentiment.",
          ],
          paragraphs: [
            "No venem les teves dades, no les fem servir amb finalitats publicitàries i no prenem decisions automatitzades amb elles.",
          ],
        },
        {
          heading: "Testimonis que parlen d'altres persones",
          paragraphs: [
            "Si expliques la situació d'una altra persona (per exemple, un familiar dependent), fes-ho sense dades que permetin identificar-la o assegura't de tenir el seu permís. Podem ocultar o editar un testimoni per protegir la intimitat de tercers.",
            "Si us plau, no incloguis informació de salut al formulari de contacte: per a això hi ha el formulari de testimonis.",
          ],
        },
        {
          heading: "Amb qui compartim les dades",
          paragraphs: [
            "No cedim les teves dades a tercers per a les seves pròpies finalitats. Per gestionar el web fem servir serveis de Google (Formularis, Fulls de càlcul, Drive, Apps Script i Gmail), que tracten dades per compte nostre i poden implicar transferències fora de l'Espai Econòmic Europeu amb les garanties previstes en el RGPD.",
            "L'accés a les dades es limita a les persones voluntàries que el moviment autoritzi [CONFIRMAR ACCESO].",
            "El que autoritzes publicar (adhesió o testimoni) és visible per a qualsevol persona a Internet.",
          ],
        },
        {
          heading: "Quant de temps les conservem",
          paragraphs: [
            "Conservem les teves dades mentre el moviment estigui actiu o fins que retiris el consentiment o en demanis la supressió. Els missatges de contacte es conserven [PLAZO]. Després els eliminem o, si una llei ens obliga a guardar-los, els bloquegem.",
          ],
        },
        {
          heading: "Els teus drets",
          items: [
            "Accedir a les teves dades i obtenir-ne una còpia.",
            "Rectificar-les si són inexactes.",
            "Demanar-ne la supressió.",
            "Oposar-te a un tractament o demanar que el limitem.",
            "Rebre-les en un format reutilitzable (portabilitat).",
            "Retirar el teu consentiment en qualsevol moment, sense que afecti el que ja s'ha fet.",
          ],
          paragraphs: [
            "Escriu a {email} indicant quin dret vols exercir; et respondrem en un termini màxim d'un mes. Si retires l'autorització per aparèixer públicament o per publicar el teu testimoni, el retirarem del web.",
            "Si creus que no hem tractat bé les teves dades, pots reclamar davant l'Agència Espanyola de Protecció de Dades (www.aepd.es).",
          ],
        },
        {
          heading: "Menors d'edat",
          paragraphs: [
            "Aquest web no s'adreça a menors de 14 anys. Si ets menor d'aquesta edat, necessites l'autorització del teu pare, mare o tutor legal per donar-nos les teves dades.",
          ],
        },
        {
          heading: "Seguretat",
          paragraphs: [
            "Apliquem mesures raonables per protegir les dades: accés restringit, serveis amb autenticació i publicació al web únicament de dades agregades o autoritzades expressament. Cap mesura és infal·lible; si detectes un problema, avisa'ns a {email}.",
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
            "Web disponible en castellà, català, èuscar i gallec.",
          ],
        },
        {
          heading: "Limitacions conegudes",
          items: [
            "Els continguts incrustats d'Instagram, TikTok i Spotify i els formularis de Google són de tercers; la seva accessibilitat no depèn de nosaltres. Oferim sempre un enllaç alternatiu.",
            "Les traduccions a l'èuscar i al gallec estan pendents de revisió per part de persones parlants natives.",
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
            "Plataforma Doradaren izena, logotipoa eta berezko materialak jabetza intelektualaren araudiak babesten ditu. [CONDICIONES DE USO DE LOS MATERIALES].",
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
          heading: "Aplikatzekoa den legeria",
          paragraphs: ["Lege-ohar hau Espainiako legeriak arautzen du."],
        },
      ],
    },
    privacidad: {
      title: "Pribatutasun-politika",
      lead: "Behin-behineko testua, lege-berrikuspenaren zain.",
      sections: [
        {
          heading: "Nor da tratamenduaren arduraduna",
          paragraphs: [
            "Plataforma Dorada nortasun juridiko propiorik gabeko herritarren mugimendu bat da. Jasotzen ditugun datu pertsonalak mugimendua bultzatzen duten pertsonek tratatzen dituzte, arduradun gisa: [RESPONSABLE].",
            "Helbidea: [DOMICILIO]. Helbide elektronikoa: {email}.",
            "Mugimendua erakunde gisa eratzen denean, erakunde hori izango da arduraduna eta aldaketaren berri emango dizugu.",
          ],
        },
        {
          heading: "Zein datu tratatzen ditugun eta zertarako",
          items: [
            "Atxikimendua: inprimakian eskatzen dizkizugun datuak ([DATOS DEL FORMULARIO DE ADHESIÓN]). Mugimenduarentzako babesa zenbatzeko eta zifra agregatuak erakusteko erabiltzen ditugu. Oinarria: zure baimena.",
            "Publikoki agertzea (aukerakoa): inprimakian berariaz baimentzen baduzu bakarrik, webgunean zure izena, lehen abizenaren inizila eta zure hiria erakusten ditugu. Atxikitzeko baimenaz bereizitako baimena da: ematen ez baduzu, ez zara agertuko.",
            "Boluntariotza: inprimakiko datuak ([DATOS DEL FORMULARIO DE VOLUNTARIADO]), zurekin harremanetan jartzeko eta lankidetza koordinatzeko. Oinarria: zure baimena.",
            "Testigantzak: zure testigantza eta zure harremanetarako datuak. Testigantza batek osasun- edo mendekotasun-datuak azaleraz ditzake, eta datu horiek bereziki babestuta daude: zure berariazko baimenarekin bakarrik tratatzen ditugu. Bi baimen bereizi daude: bat testigantza bidaltzeko eta bestea, aukerakoa, argitaratzeko.",
            "Harremana: bidaltzen diguzun izena, posta eta mezua, erantzun ahal izateko. Oinarria: inprimakia bidaltzean ematen duzun baimena.",
            "Atxikitako erakundeak: erakundearen eta haren harremanetarako pertsonaren datuak eta logotipoa, atxikitako erakunde gisa erakusteko. Oinarria: baimena.",
          ],
          paragraphs: [
            "Ez ditugu zure datuak saltzen, ez ditugu publizitate-helburuetarako erabiltzen eta ez dugu haiekin erabaki automatizaturik hartzen.",
          ],
        },
        {
          heading: "Beste pertsona batzuei buruzko testigantzak",
          paragraphs: [
            "Beste pertsona baten egoera kontatzen baduzu (adibidez, senide mendeko baten egoera), egin ezazu pertsona hori identifikatzea ahalbidetzen duten daturik gabe edo ziurtatu haren baimena duzula. Testigantza bat ezkutatu edo edita dezakegu hirugarrenen intimitatea babesteko.",
            "Mesedez, ez sartu osasun-informaziorik harremanetarako inprimakian: horretarako testigantzen inprimakia dago.",
          ],
        },
        {
          heading: "Norekin partekatzen ditugun datuak",
          paragraphs: [
            "Ez dizkiegu zure datuak hirugarrenei laga haien helburu propioetarako. Webgunea kudeatzeko Google zerbitzuak erabiltzen ditugu (Inprimakiak, Kalkulu-orriak, Drive, Apps Script eta Gmail); zerbitzu horiek gure izenean tratatzen dituzte datuak eta Europako Esparru Ekonomikotik kanpoko transferentziak ekar ditzakete, DBEOn ezarritako bermeekin.",
            "Datuetarako sarbidea mugimenduak baimentzen dituen boluntarioei mugatzen zaie [CONFIRMAR ACCESO].",
            "Argitaratzea baimentzen duzuna (atxikimendua edo testigantza) edonorentzat ikusgai dago Internetean.",
          ],
        },
        {
          heading: "Zenbat denboran gordetzen ditugun",
          paragraphs: [
            "Zure datuak mugimendua aktibo dagoen bitartean gordetzen ditugu, edo zuk baimena kendu arte edo ezabatzea eskatu arte. Harremanetarako mezuak [PLAZO] gordetzen dira. Ondoren ezabatu egiten ditugu edo, lege batek gordetzera behartzen bagaitu, blokeatu.",
          ],
        },
        {
          heading: "Zure eskubideak",
          items: [
            "Zure datuetara sartzea eta kopia bat lortzea.",
            "Zuzentzea, zehatzak ez badira.",
            "Ezabatzea eskatzea.",
            "Tratamendu bati aurka egitea edo mugatzeko eskatzea.",
            "Berrerabil daitekeen formatu batean jasotzea (eramangarritasuna).",
            "Baimena edozein unetan kentzea, dagoeneko egindakoari eragin gabe.",
          ],
          paragraphs: [
            "Idatzi {email} helbidera, gauzatu nahi duzun eskubidea adieraziz; gehienez hilabeteko epean erantzungo dizugu. Publikoki agertzeko baimena edo testigantza argitaratzekoa kentzen baduzu, webgunetik kenduko dugu.",
            "Uste baduzu ez ditugula zure datuak behar bezala tratatu, Datuak Babesteko Espainiako Agentziaren (www.aepd.es) aurrean erreklamatu dezakezu.",
          ],
        },
        {
          heading: "Adingabeak",
          paragraphs: [
            "Webgune hau ez dago 14 urtetik beherakoei zuzenduta. Adin horretatik beherakoa bazara, zure aitaren, amaren edo tutore legalaren baimena behar duzu datuak emateko.",
          ],
        },
        {
          heading: "Segurtasuna",
          paragraphs: [
            "Datuak babesteko neurri zentzuzkoak aplikatzen ditugu: sarbide mugatua, autentifikazioa duten zerbitzuak eta webgunean datu agregatuak edo berariaz baimenduak bakarrik argitaratzea. Ez dago neurri erabat segururik; arazoren bat antzematen baduzu, jakinarazi iezaguzu {email} helbidean.",
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
            "Webgunea gaztelaniaz, katalanez, euskaraz eta galegoz eskuragarri dago.",
          ],
        },
        {
          heading: "Ezagutzen ditugun mugak",
          items: [
            "Instagram, TikTok eta Spotifyko edukiak eta Googleren inprimakiak hirugarrenenak dira; haien irisgarritasuna ez dago gure esku. Beti eskaintzen dugu ordezko esteka bat.",
            "Euskarazko eta galegozko itzulpenak hiztun natiboek berrikusi behar dituzte.",
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
          heading: "Lexislación aplicable",
          paragraphs: ["Este aviso réxese pola lexislación española."],
        },
      ],
    },
    privacidad: {
      title: "Política de privacidade",
      lead: "Texto provisional pendente de revisión xurídica.",
      sections: [
        {
          heading: "Quen é o responsable do tratamento",
          paragraphs: [
            "Plataforma Dorada é un movemento cidadán sen personalidade xurídica propia. Os datos persoais que recollemos trátaos as persoas que impulsan o movemento, que actúan como responsables: [RESPONSABLE].",
            "Domicilio: [DOMICILIO]. Correo electrónico: {email}.",
            "Cando o movemento se constitúa como entidade, esta pasará a ser a responsable e informarémoste do cambio.",
          ],
        },
        {
          heading: "Que datos tratamos e para que",
          items: [
            "Adhesión: os datos que che pedimos no formulario ([DATOS DEL FORMULARIO DE ADHESIÓN]). Úsámolos para contabilizar o apoio ao movemento e amosar cifras agregadas. Base: o teu consentimento.",
            "Aparecer publicamente (opcional): só se o autorizas expresamente no formulario, amosamos na web o teu nome, a inicial do teu primeiro apelido e a túa cidade. É un consentimento distinto do de adherirte: se non o das, non aparecerás.",
            "Voluntariado: os datos do formulario ([DATOS DEL FORMULARIO DE VOLUNTARIADO]), para contactar contigo e coordinar a colaboración. Base: o teu consentimento.",
            "Testemuños: o teu testemuño e os teus datos de contacto. Un testemuño pode revelar datos de saúde ou de dependencia, que están especialmente protexidos: só os tratamos co teu consentimento explícito. Hai dous consentimentos separados: un para enviarnos o testemuño e outro, opcional, para publicalo.",
            "Contacto: o nome, o correo e a mensaxe que nos envías, para responderte. Base: o teu consentimento ao enviar o formulario.",
            "Entidades adheridas: datos da entidade, da súa persoa de contacto e o seu logotipo, para amosala como entidade adherida. Base: consentimento.",
          ],
          paragraphs: [
            "Non vendemos os teus datos, non os usamos con fins publicitarios e non tomamos decisións automatizadas con eles.",
          ],
        },
        {
          heading: "Testemuños que falan doutras persoas",
          paragraphs: [
            "Se contas a situación doutra persoa (por exemplo, un familiar dependente), faino sen datos que permitan identificala ou asegúrate de contar co seu permiso. Podemos ocultar ou editar un testemuño para protexer a intimidade de terceiros.",
            "Por favor, non incluías información de saúde no formulario de contacto: para iso existe o formulario de testemuños.",
          ],
        },
        {
          heading: "Con quen compartimos os datos",
          paragraphs: [
            "Non cedemos os teus datos a terceiros para os seus propios fins. Para xestionar a web usamos servizos de Google (Formularios, Follas de cálculo, Drive, Apps Script e Gmail), que tratan datos por conta noso e poden implicar transferencias fóra do Espazo Económico Europeo coas garantías previstas no RXPD.",
            "O acceso aos datos limítase ás persoas voluntarias que o movemento autorice [CONFIRMAR ACCESO].",
            "O que autorizas publicar (adhesión ou testemuño) é visible para calquera persoa en Internet.",
          ],
        },
        {
          heading: "Canto tempo os conservamos",
          paragraphs: [
            "Conservamos os teus datos mentres o movemento estea activo ou ata que retires o consentimento ou pidas a súa supresión. As mensaxes de contacto consérvanse [PLAZO]. Despois eliminámolas ou, se unha lei nos obriga a gardalas, bloqueámolas.",
          ],
        },
        {
          heading: "Os teus dereitos",
          items: [
            "Acceder aos teus datos e obter unha copia.",
            "Rectificalos se son inexactos.",
            "Pedir a súa supresión.",
            "Opoñerte a un tratamento ou pedir que o limitemos.",
            "Recibilos nun formato reutilizable (portabilidade).",
            "Retirar o teu consentimento en calquera momento, sen que afecte ao xa realizado.",
          ],
          paragraphs: [
            "Escribe a {email} indicando que dereito queres exercer; responderémosche nun prazo máximo dun mes. Se retiras a autorización para aparecer publicamente ou para publicar o teu testemuño, retirarémolo da web.",
            "Se pensas que non tratamos ben os teus datos, podes reclamar ante a Axencia Española de Protección de Datos (www.aepd.es).",
          ],
        },
        {
          heading: "Menores de idade",
          paragraphs: [
            "Esta web non está dirixida a menores de 14 anos. Se es menor desa idade, precisas a autorización do teu pai, nai ou titor legal para nos dar os teus datos.",
          ],
        },
        {
          heading: "Seguridade",
          paragraphs: [
            "Aplicamos medidas razoables para protexer os datos: acceso restrinxido, servizos con autenticación e publicación na web unicamente de datos agregados ou autorizados expresamente. Ningunha medida é infalible; se detectas un problema, avísanos en {email}.",
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
            "Web dispoñible en castelán, catalán, éuscaro e galego.",
          ],
        },
        {
          heading: "Limitacións coñecidas",
          items: [
            "Os contidos incrustados de Instagram, TikTok e Spotify e os formularios de Google son de terceiros; a súa accesibilidade non depende de nós. Ofrecemos sempre unha ligazón alternativa.",
            "As traducións ao éuscaro e ao galego están pendentes de revisión por persoas falantes nativas.",
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
};
