// Traducciones adicionales (catalán, euskera y gallego) para textos de la interfaz.
// La clave es el texto original en castellano, exactamente como aparece en la página.
// IMPORTANTE: las versiones en euskera y gallego deben ser revisadas por personas
// hablantes nativas antes de publicar la web definitivamente.

type Variants = { ca?: string; eu?: string; gl?: string };

export const extraTranslations: Record<string, Variants> = {
  // --- Estructura general, errores y navegación ---
  "Saltar al contenido principal": {
    ca: "Saltar al contingut principal",
    eu: "Joan eduki nagusira",
    gl: "Saltar ao contido principal",
  },
  "Esta página no se ha cargado": {
    ca: "Aquesta pàgina no s'ha carregat",
    eu: "Orri hau ez da kargatu",
    gl: "Esta páxina non se cargou",
  },
  "Ha ocurrido un problema. Puedes reintentar o volver al inicio.": {
    ca: "Hi ha hagut un problema. Pots tornar-ho a provar o tornar a l'inici.",
    eu: "Arazo bat gertatu da. Berriro saia zaitezke edo hasierara itzuli.",
    gl: "Produciuse un problema. Podes tentalo de novo ou volver ao inicio.",
  },
  "La página que buscas no existe o se ha movido.": {
    ca: "La pàgina que busques no existeix o s'ha mogut.",
    eu: "Bilatzen duzun orria ez da existitzen edo lekuz aldatu da.",
    gl: "A páxina que buscas non existe ou moveuse.",
  },
  "Página no encontrada": {
    ca: "Pàgina no trobada",
    eu: "Ez da orria aurkitu",
    gl: "Páxina non atopada",
  },
  Reintentar: { ca: "Tornar-ho a provar", eu: "Berriro saiatu", gl: "Tentar de novo" },
  "Ir al inicio": { ca: "Anar a l'inici", eu: "Hasierara joan", gl: "Ir ao inicio" },
  "Volver al inicio": { ca: "Tornar a l'inici", eu: "Hasierara itzuli", gl: "Volver ao inicio" },
  "Plataforma Dorada · Por un Pacto de Estado por la Dependencia y los Cuidados": {
    ca: "Plataforma Dorada · Per un Pacte d'Estat per la Dependència i les Cures",
    eu: "Plataforma Dorada · Mendekotasunaren eta Zaintzen aldeko Estatu Itun baten alde",
    gl: "Plataforma Dorada · Por un Pacto de Estado pola Dependencia e os Coidados",
  },
  "Plataforma Dorada — Por un Pacto de Estado por la Dependencia y los Cuidados.": {
    ca: "Plataforma Dorada — Per un Pacte d'Estat per la Dependència i les Cures.",
    eu: "Plataforma Dorada — Mendekotasunaren eta Zaintzen aldeko Estatu Itun baten alde.",
    gl: "Plataforma Dorada — Por un Pacto de Estado pola Dependencia e os Coidados.",
  },
  "Por un Pacto de Estado por la Dependencia y los Cuidados. Movimiento ciudadano y apartidista.": {
    ca: "Per un Pacte d'Estat per la Dependència i les Cures. Moviment ciutadà i apartidista.",
    eu: "Mendekotasunaren eta Zaintzen aldeko Estatu Itun baten alde. Herritarren mugimendu alderdikeriarik gabea.",
    gl: "Por un Pacto de Estado pola Dependencia e os Coidados. Movemento cidadán e apartidista.",
  },
  "Logo de Plataforma Dorada": {
    ca: "Logotip de Plataforma Dorada",
    eu: "Plataforma Doradaren logotipoa",
    gl: "Logotipo de Plataforma Dorada",
  },
  Navegación: { ca: "Navegació", eu: "Nabigazioa", gl: "Navegación" },
  "Navegación del pie": {
    ca: "Navegació del peu de pàgina",
    eu: "Orri-oinaren nabigazioa",
    gl: "Navegación do pé de páxina",
  },
  Legal: { ca: "Legal", eu: "Lege-informazioa", gl: "Legal" },
  Accesibilidad: { ca: "Accessibilitat", eu: "Irisgarritasuna", gl: "Accesibilidade" },
  "Formulario de contacto": {
    ca: "Formulari de contacte",
    eu: "Harremanetarako inprimakia",
    gl: "Formulario de contacto",
  },
  Descargar: { ca: "Descarregar", eu: "Deskargatu", gl: "Descargar" },

  // --- Cookies ---
  Cookies: { ca: "Galetes", eu: "Cookieak", gl: "Cookies" },
  "Usamos solo cookies técnicas necesarias. No cargamos cookies analíticas ni de terceros sin tu consentimiento.":
    {
      ca: "Fem servir només galetes tècniques necessàries. No carreguem galetes analítiques ni de tercers sense el teu consentiment.",
      eu: "Beharrezkoak diren cookie teknikoak soilik erabiltzen ditugu. Ez ditugu analisi-cookieak edo hirugarrenenak kargatzen zure baimenik gabe.",
      gl: "Usamos só cookies técnicas necesarias. Non cargamos cookies analíticas nin de terceiros sen o teu consentimento.",
    },
  "Más información": { ca: "Més informació", eu: "Informazio gehiago", gl: "Máis información" },
  Aceptar: { ca: "Acceptar", eu: "Onartu", gl: "Aceptar" },
  Rechazar: { ca: "Rebutjar", eu: "Baztertu", gl: "Rexeitar" },
  "Solo esenciales": { ca: "Només essencials", eu: "Ezinbestekoak soilik", gl: "Só esenciais" },
  "Cambiar preferencias de cookies": {
    ca: "Canviar les preferències de galetes",
    eu: "Cookie-llehentasunak aldatu",
    gl: "Cambiar as preferencias de cookies",
  },
  "Este contenido lo ofrece un servicio externo y puede instalar cookies de terceros. Para verlo, acepta las cookies de terceros.":
    {
      ca: "Aquest contingut l'ofereix un servei extern i pot instal·lar galetes de tercers. Per veure'l, accepta les galetes de tercers.",
      eu: "Eduki hau kanpoko zerbitzu batek eskaintzen du eta hirugarrenen cookieak instalatu ditzake. Ikusteko, onartu hirugarrenen cookieak.",
      gl: "Este contido ofrécello un servizo externo e pode instalar cookies de terceiros. Para velo, acepta as cookies de terceiros.",
    },
  "Aceptar cookies de terceros y mostrar": {
    ca: "Acceptar galetes de tercers i mostrar",
    eu: "Hirugarrenen cookieak onartu eta erakutsi",
    gl: "Aceptar cookies de terceiros e mostrar",
  },
  "Abrir en Instagram": {
    ca: "Obrir a Instagram",
    eu: "Instagramen ireki",
    gl: "Abrir en Instagram",
  },
  "Abrir en TikTok": { ca: "Obrir a TikTok", eu: "TikTokean ireki", gl: "Abrir en TikTok" },

  // --- Novedades, prensa, datos ---
  Actualidad: { ca: "Actualitat", eu: "Gaurkotasuna", gl: "Actualidade" },
  "Lo último del movimiento y lo que dicen los medios.": {
    ca: "Les darreres novetats del moviment i el que diuen els mitjans.",
    eu: "Mugimenduaren azken berriak eta hedabideek diotena.",
    gl: "As últimas novidades do movemento e o que din os medios.",
  },
  "Todavía no hay noticias publicadas.": {
    ca: "Encara no hi ha notícies publicades.",
    eu: "Oraindik ez dago albisterik argitaratuta.",
    gl: "Aínda non hai noticias publicadas.",
  },
  Adhesiones: { ca: "Adhesions", eu: "Atxikimenduak", gl: "Adhesións" },
  "Adhesiones y entidades por comunidad autónoma": {
    ca: "Adhesions i entitats per comunitat autònoma",
    eu: "Atxikimenduak eta erakundeak autonomia-erkidegoka",
    gl: "Adhesións e entidades por comunidade autónoma",
  },
  "Indicadores sobre la dependencia en España y el avance de las adhesiones a la Plataforma por comunidad autónoma.":
    {
      ca: "Indicadors sobre la dependència a Espanya i l'avanç de les adhesions a la Plataforma per comunitat autònoma.",
      eu: "Espainiako mendekotasunari buruzko adierazleak eta Plataformarako atxikimenduen bilakaera autonomia-erkidegoka.",
      gl: "Indicadores sobre a dependencia en España e o avance das adhesións á Plataforma por comunidade autónoma.",
    },

  // --- Páginas informativas ---
  "Qué es la dependencia, cómo funciona el sistema de atención en España y por qué hace falta un Pacto de Estado.":
    {
      ca: "Què és la dependència, com funciona el sistema d'atenció a Espanya i per què cal un Pacte d'Estat.",
      eu: "Zer den mendekotasuna, Espainiako arreta-sistemak nola funtzionatzen duen eta zergatik behar den Estatu Itun bat.",
      gl: "Que é a dependencia, como funciona o sistema de atención en España e por que fai falta un Pacto de Estado.",
    },
  "Testimonios de personas dependientes, familias y cuidadores sobre los retrasos y dificultades del sistema de dependencia.":
    {
      ca: "Testimonis de persones dependents, famílies i cuidadors sobre els retards i les dificultats del sistema de dependència.",
      eu: "Pertsona mendekoen, familien eta zaintzaileen testigantzak mendekotasun-sistemaren atzerapen eta zailtasunei buruz.",
      gl: "Testemuños de persoas dependentes, familias e coidadores sobre os atrasos e as dificultades do sistema de dependencia.",
    },
  "Asociaciones, fundaciones, empresas y ayuntamientos que apoyan el Pacto de Estado por la Dependencia.":
    {
      ca: "Associacions, fundacions, empreses i ajuntaments que donen suport al Pacte d'Estat per la Dependència.",
      eu: "Mendekotasunaren aldeko Estatu Ituna babesten duten elkarteak, fundazioak, enpresak eta udalak.",
      gl: "Asociacións, fundacións, empresas e concellos que apoian o Pacto de Estado pola Dependencia.",
    },
  "Últimas publicaciones de Plataforma Dorada en Instagram y TikTok.": {
    ca: "Darreres publicacions de Plataforma Dorada a Instagram i TikTok.",
    eu: "Plataforma Doradaren azken argitalpenak Instagramen eta TikTokean.",
    gl: "Últimas publicacións de Plataforma Dorada en Instagram e TikTok.",
  },
  "Crea tu imagen de perfil con el marco dorado de apoyo al Pacto de Estado por la Dependencia.": {
    ca: "Crea la teva imatge de perfil amb el marc daurat de suport al Pacte d'Estat per la Dependència.",
    eu: "Sortu zure profileko irudia Mendekotasunaren aldeko Estatu Itunaren aldeko marko urrezkoarekin.",
    gl: "Crea a túa imaxe de perfil co marco dourado de apoio ao Pacto de Estado pola Dependencia.",
  },
  "Imagen de perfil": { ca: "Imatge de perfil", eu: "Profileko irudia", gl: "Imaxe de perfil" },
  "Vista previa de tu imagen de perfil con marco dorado": {
    ca: "Previsualització de la teva imatge de perfil amb marc daurat",
    eu: "Zure profileko irudiaren aurrebista marko urrezkoarekin",
    gl: "Vista previa da túa imaxe de perfil con marco dourado",
  },
  "Te responderemos a la dirección de correo que has indicado.": {
    ca: "Et respondrem a l'adreça de correu que has indicat.",
    eu: "Adierazi duzun helbide elektronikora erantzungo dizugu.",
    gl: "Responderémosche ao enderezo de correo que indicaches.",
  },
  "No rellenar este campo": {
    ca: "No omplir aquest camp",
    eu: "Ez bete eremu hau",
    gl: "Non cubrir este campo",
  },

  // --- Voluntariado y adhesión ---
  Voluntariado: { ca: "Voluntariat", eu: "Boluntariotza", gl: "Voluntariado" },
  "Colabora con Plataforma Dorada: difusión, apoyo a familias, organización de encuentros y trabajo territorial.":
    {
      ca: "Col·labora amb Plataforma Dorada: difusió, suport a famílies, organització de trobades i treball territorial.",
      eu: "Lankidetzan aritu Plataforma Doradarekin: hedapena, familiei laguntza, topaketen antolaketa eta lurralde-lana.",
      gl: "Colabora con Plataforma Dorada: difusión, apoio ás familias, organización de encontros e traballo territorial.",
    },
  "Adhiérete a Plataforma Dorada y suma tu voz para exigir un Pacto de Estado por la Dependencia y los Cuidados.":
    {
      ca: "Adhereix-te a Plataforma Dorada i suma la teva veu per exigir un Pacte d'Estat per la Dependència i les Cures.",
      eu: "Atxiki zaitez Plataforma Doradara eta gehitu zure ahotsa Mendekotasunaren eta Zaintzen aldeko Estatu Itun bat eskatzeko.",
      gl: "Adhírete a Plataforma Dorada e suma a túa voz para esixir un Pacto de Estado pola Dependencia e os Coidados.",
    },
  "Para pedir plazos razonables en las valoraciones y concesiones de ayudas.": {
    ca: "Per demanar terminis raonables en les valoracions i concessions d'ajudes.",
    eu: "Balorazioetan eta laguntzen emakidetan epe zentzuzkoak eskatzeko.",
    gl: "Para pedir prazos razoables nas valoracións e concesións de axudas.",
  },
  "Para visibilizar los retrasos y las dificultades administrativas.": {
    ca: "Per visibilitzar els retards i les dificultats administratives.",
    eu: "Atzerapenak eta administrazio-zailtasunak ikusarazteko.",
    gl: "Para visibilizar os atrasos e as dificultades administrativas.",
  },
  "Para reconocer y apoyar a quienes cuidan.": {
    ca: "Per reconèixer i donar suport a qui cuida.",
    eu: "Zaintzen dutenak aitortzeko eta babesteko.",
    gl: "Para recoñecer e apoiar a quen coida.",
  },
  "Para reclamar un acuerdo estable y apartidista entre administraciones.": {
    ca: "Per reclamar un acord estable i apartidista entre administracions.",
    eu: "Administrazioen arteko akordio egonkor eta alderdikeriarik gabea eskatzeko.",
    gl: "Para reclamar un acordo estable e apartidista entre administracións.",
  },

  // --- Backoffice ---
  Backoffice: { ca: "Backoffice", eu: "Backoffice", gl: "Backoffice" },
  "Gestión interna": { ca: "Gestió interna", eu: "Barne-kudeaketa", gl: "Xestión interna" },
  "Gestión interna de noticias y recursos de Plataforma Dorada.": {
    ca: "Gestió interna de notícies i recursos de Plataforma Dorada.",
    eu: "Plataforma Doradaren albiste eta baliabideen barne-kudeaketa.",
    gl: "Xestión interna de noticias e recursos de Plataforma Dorada.",
  },
  "Desde aquí puedes abrir el panel para publicar noticias y subir materiales de la Plataforma Dorada.":
    {
      ca: "Des d'aquí pots obrir el tauler per publicar notícies i pujar materials de Plataforma Dorada.",
      eu: "Hemendik panela ireki dezakezu albisteak argitaratzeko eta Plataforma Doradaren materialak igotzeko.",
      gl: "Desde aquí podes abrir o panel para publicar noticias e subir materiais de Plataforma Dorada.",
    },
  "Panel de gestión": { ca: "Tauler de gestió", eu: "Kudeaketa-panela", gl: "Panel de xestión" },
  "Abrir panel de gestión": {
    ca: "Obrir el tauler de gestió",
    eu: "Kudeaketa-panela ireki",
    gl: "Abrir o panel de xestión",
  },
  Noticias: { ca: "Notícies", eu: "Albisteak", gl: "Noticias" },
  Recursos: { ca: "Recursos", eu: "Baliabideak", gl: "Recursos" },
  "Titular, medio, fecha, enlace y resumen.": {
    ca: "Titular, mitjà, data, enllaç i resum.",
    eu: "Titularra, hedabidea, data, esteka eta laburpena.",
    gl: "Titular, medio, data, ligazón e resumo.",
  },
  "PDF, imágenes, carteles y otros materiales hasta 10 MB.": {
    ca: "PDF, imatges, cartells i altres materials fins a 10 MB.",
    eu: "PDFak, irudiak, kartelak eta beste material batzuk, 10 MB arte.",
    gl: "PDF, imaxes, carteis e outros materiais ata 10 MB.",
  },

  // --- Páginas legales (títulos y descripciones para el <head>) ---
  "Aviso legal": { ca: "Avís legal", eu: "Lege-oharra", gl: "Aviso legal" },
  "Política de privacidad": {
    ca: "Política de privacitat",
    eu: "Pribatutasun-politika",
    gl: "Política de privacidade",
  },
  "Política de cookies": {
    ca: "Política de galetes",
    eu: "Cookien politika",
    gl: "Política de cookies",
  },
  "Declaración de accesibilidad": {
    ca: "Declaració d'accessibilitat",
    eu: "Irisgarritasun-adierazpena",
    gl: "Declaración de accesibilidade",
  },
  "Información legal sobre la titularidad y el uso del sitio web de Plataforma Dorada.": {
    ca: "Informació legal sobre la titularitat i l'ús del lloc web de Plataforma Dorada.",
    eu: "Plataforma Doradaren webgunearen titulartasunari eta erabilerari buruzko lege-informazioa.",
    gl: "Información legal sobre a titularidade e o uso do sitio web de Plataforma Dorada.",
  },
  "Cómo trata Plataforma Dorada tus datos personales y cómo ejercer tus derechos.": {
    ca: "Com tracta Plataforma Dorada les teves dades personals i com exercir els teus drets.",
    eu: "Plataforma Doradak zure datu pertsonalak nola tratatzen dituen eta zure eskubideak nola gauzatu.",
    gl: "Como trata Plataforma Dorada os teus datos persoais e como exercer os teus dereitos.",
  },
  "Qué cookies usa el sitio de Plataforma Dorada y cómo gestionarlas.": {
    ca: "Quines galetes fa servir el lloc de Plataforma Dorada i com gestionar-les.",
    eu: "Plataforma Doradaren webguneak zein cookie erabiltzen dituen eta nola kudeatu.",
    gl: "Que cookies usa o sitio de Plataforma Dorada e como xestionalas.",
  },
  "Compromiso de accesibilidad del sitio de Plataforma Dorada según WCAG 2.1 AA.": {
    ca: "Compromís d'accessibilitat del lloc de Plataforma Dorada segons WCAG 2.1 AA.",
    eu: "Plataforma Doradaren webgunearen irisgarritasun-konpromisoa, WCAG 2.1 AA arabera.",
    gl: "Compromiso de accesibilidade do sitio de Plataforma Dorada segundo WCAG 2.1 AA.",
  },

  // --- Estados de carga y listas en vivo ---
  "Cargando…": { ca: "Carregant…", eu: "Kargatzen…", gl: "Cargando…" },
  "No se han podido cargar los datos ahora mismo. Vuelve a intentarlo en unos minutos.": {
    ca: "Ara mateix no s'han pogut carregar les dades. Torna-ho a provar d'aquí a uns minuts.",
    eu: "Une honetan ezin izan dira datuak kargatu. Saiatu berriro minutu batzuk barru.",
    gl: "Agora mesmo non se puideron cargar os datos. Volve tentalo dentro duns minutos.",
  },
  "Todavía no hay adhesiones públicas.": {
    ca: "Encara no hi ha adhesions públiques.",
    eu: "Oraindik ez dago atxikimendu publikorik.",
    gl: "Aínda non hai adhesións públicas.",
  },
  "Todavía no hay incorporaciones públicas.": {
    ca: "Encara no hi ha incorporacions públiques.",
    eu: "Oraindik ez dago gehitze publikorik.",
    gl: "Aínda non hai incorporacións públicas.",
  },
  "Todavía no hay testimonios publicados.": {
    ca: "Encara no hi ha testimonis publicats.",
    eu: "Oraindik ez dago testigantzarik argitaratuta.",
    gl: "Aínda non hai testemuños publicados.",
  },
  "Todavía no hay entidades adheridas públicas.": {
    ca: "Encara no hi ha entitats adherides públiques.",
    eu: "Oraindik ez dago atxikitako erakunde publikorik.",
    gl: "Aínda non hai entidades adheridas públicas.",
  },
  "Testimonios recibidos:": {
    ca: "Testimonis rebuts:",
    eu: "Jasotako testigantzak:",
    gl: "Testemuños recibidos:",
  },
  "Testimonios publicados:": {
    ca: "Testimonis publicats:",
    eu: "Argitaratutako testigantzak:",
    gl: "Testemuños publicados:",
  },
  "Entidades adheridas públicamente:": {
    ca: "Entitats adherides públicament:",
    eu: "Publikoki atxikitako erakundeak:",
    gl: "Entidades adheridas publicamente:",
  },
  "Todas tienen la misma visibilidad y se muestran por orden alfabético.": {
    ca: "Totes tenen la mateixa visibilitat i es mostren per ordre alfabètic.",
    eu: "Denek ikusgarritasun bera dute eta ordena alfabetikoan erakusten dira.",
    gl: "Todas teñen a mesma visibilidade e amósanse por orde alfabética.",
  },
  "Web de la entidad": {
    ca: "Web de l'entitat",
    eu: "Erakundearen webgunea",
    gl: "Web da entidade",
  },
  "(se abre en otra pestaña)": {
    ca: "(s'obre en una altra pestanya)",
    eu: "(beste fitxa batean irekitzen da)",
    gl: "(ábrese noutra pestana)",
  },
  "Comunidades autónomas": {
    ca: "Comunitats autònomes",
    eu: "Autonomia-erkidegoak",
    gl: "Comunidades autónomas",
  },

  "Cuéntaselo a quien pueda querer colaborar: cada persona voluntaria suma.": {
    ca: "Explica-ho a qui pugui voler col·laborar: cada persona voluntària suma.",
    eu: "Kontatu lankidetzan aritu nahi dezakeenari: boluntario bakoitzak batzen du.",
    gl: "Cóntallo a quen poida querer colaborar: cada persoa voluntaria suma.",
  },
  "Abrir en Spotify": { ca: "Obrir a Spotify", eu: "Spotifyn ireki", gl: "Abrir en Spotify" },
  "Nuestra lista colaborativa": {
    ca: "La nostra llista col·laborativa",
    eu: "Gure zerrenda kolaboratiboa",
    gl: "A nosa lista colaborativa",
  },
  "Una lista de reproducción en Spotify para escuchar y hacer entre todas las personas.": {
    ca: "Una llista de reproducció a Spotify per escoltar i fer entre totes les persones.",
    eu: "Spotifyko erreprodukzio-zerrenda bat, guztion artean entzuteko eta egiteko.",
    gl: "Unha lista de reprodución en Spotify para escoitar e facer entre todas as persoas.",
  },
  "Añadir canciones": { ca: "Afegir cançons", eu: "Abestiak gehitu", gl: "Engadir cancións" },
  "Últimas publicaciones de Plataforma Dorada en Instagram, TikTok y Spotify.": {
    ca: "Darreres publicacions de Plataforma Dorada a Instagram, TikTok i Spotify.",
    eu: "Plataforma Doradaren azken argitalpenak Instagramen, TikTokean eta Spotifyn.",
    gl: "Últimas publicacións de Plataforma Dorada en Instagram, TikTok e Spotify.",
  },
};
