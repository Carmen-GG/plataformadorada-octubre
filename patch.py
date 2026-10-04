from pathlib import Path
import re, zipfile, shutil, os
root=Path('/mnt/data/pdwork')

# 1) Real gold palette, based on the uploaded Plataforma Dorada logo (#A18756).
css=root/'src/styles.css'
s=css.read_text()
start=s.index(':root {')
end=s.index('\n}\n\n@layer base', start)+2
new_root=''' :root {
  --radius: 1rem;

  /* Plataforma Dorada — paleta oficial */
  --ink: #2F2B24;
  --brand: #80683F;
  --brand-soft: #C9B78F;
  --accent: #A18756;
  --accent-foreground: #2F2B24;
  --mist: #F3EFE7;

  --background: #FBFAF7;
  --foreground: #2F2B24;
  --card: rgba(255, 255, 255, 0.78);
  --card-foreground: #2F2B24;
  --popover: #FFFFFF;
  --popover-foreground: #2F2B24;
  --primary: #A18756;
  --primary-foreground: #2F2B24;
  --secondary: #F3EFE7;
  --secondary-foreground: #80683F;
  --muted: #F3EFE7;
  --muted-foreground: #665D50;
  --destructive: #A33B32;
  --destructive-foreground: #FFFFFF;
  --border: #DDD4C5;
  --input: #DDD4C5;
  --ring: #80683F;

  --glass: rgba(255, 255, 255, 0.78);
  --glass-border: rgba(161, 135, 86, 0.28);

  --chart-1: #A18756;
  --chart-2: #80683F;
  --chart-3: #C9B78F;
  --chart-4: #6F8065;
  --chart-5: #8B5E4A;

  --gradient-page: linear-gradient(140deg, #F8F4EC 0%, #FBFAF7 52%, #F3EFE7 100%);
  --shadow-glass: 0 20px 50px rgba(128, 104, 63, 0.12);
  --shadow-soft: 0 8px 30px rgba(128, 104, 63, 0.08);
}'''
s=s[:start]+new_root+s[end:]
css.write_text(s)

# 2) Make the header immune to a missing locale-name export.
header=root/'src/components/site-header.tsx'
s=header.read_text()
s=s.replace('import { LOCALES, LOCALE_LABELS, LOCALE_NAMES, useI18n } from "@/lib/i18n";', 'import { LOCALES, LOCALE_LABELS, useI18n } from "@/lib/i18n";')
s=s.replace('const navItems = [', '''const LOCALE_NAMES_SAFE = { es: "Castellano", ca: "Català", eu: "Euskara", gl: "Galego" } as const;\n\nconst navItems = [''')
s=s.replace('{LOCALE_NAMES[code]}', '{LOCALE_NAMES_SAFE[code]}')
header.write_text(s)

# 3) Add missing page translations to the existing translation registry.
i18n=root/'src/lib/i18n.tsx'
s=i18n.read_text()
marker='\n\nconst dictionariesWithPageText:'
extra=r'''

Object.assign(pageTranslations, {
  "Por un Pacto de Estado por la dependencia y los cuidados": {ca:"Per un Pacte d'Estat per la dependència i els ciutadans",eu:"Mendekotasunaren eta Herritarren aldeko Estatu Itun baten alde",gl:"Por un Pacto de Estado pola Dependencia e os Cidadáns"},
  "dependencia": {ca:"dependència",eu:"mendekotasuna",gl:"dependencia"},
  "y los cuidados": {ca:"i els ciutadans",eu:"eta herritarrak",gl:"e os cidadáns"},
  "Datos agregados. Nunca se publican datos personales ni ubicaciones individuales.": {ca:"Dades agregades. Mai no es publiquen dades personals ni ubicacions individuals.",eu:"Datu agregatuak. Ez dira inoiz datu pertsonalak edo banakako kokapenak argitaratzen.",gl:"Datos agregados. Nunca se publican datos persoais nin localizacións individuais."},
  "Cifras del movimiento": {ca:"Xifres del moviment",eu:"Mugimenduaren zifrak",gl:"Cifras do movemento"},
  "¿Qué está pasando?": {ca:"Què està passant?",eu:"Zer gertatzen ari da?",gl:"Que está pasando?"},
  "Indicadores del sistema de atención a la dependencia. Se ampliarán con nuevas fuentes verificadas desde el backoffice.": {ca:"Indicadors del sistema d'atenció a la dependència. S'ampliaran amb noves fonts verificades des del backoffice.",eu:"Mendekotasunaren arretako sistemaren adierazleak. Iturri egiaztatu berriekin zabalduko dira backofficetik.",gl:"Indicadores do sistema de atención á dependencia. Ampliaranse con novas fontes verificadas desde o backoffice."},
  "Ver todos los datos e indicadores": {ca:"Veure totes les dades i els indicadors",eu:"Datu eta adierazle guztiak ikusi",gl:"Ver todos os datos e indicadores"},
  "Mapa de adhesiones": {ca:"Mapa d'adhesions",eu:"Atxikimenduen mapa",gl:"Mapa de adhesións"},
  "Datos agregados por territorio": {ca:"Dades agregades per territori",eu:"Lurraldeka agregatutako datuak",gl:"Datos agregados por territorio"},
  "Ver el mapa completo por comunidad y provincia": {ca:"Veure el mapa complet per comunitat i província",eu:"Mapa osoa erkidego eta probintziaka ikusi",gl:"Ver o mapa completo por comunidade e provincia"},
  "Hitos": {ca:"Fites",eu:"Mugarriak",gl:"Fitios"},
  "Últimas adhesiones": {ca:"Últimes adhesions",eu:"Azken atxikimenduak",gl:"Últimas adhesións"},
  "Solo se publican las personas que han autorizado expresamente aparecer, con nombre, inicial del primer apellido y ciudad.": {ca:"Només es publiquen les persones que han autoritzat expressament aparèixer, amb el nom, la inicial del primer cognom i la ciutat.",eu:"Berariaz baimendu duten pertsonak baino ez dira argitaratzen, izenarekin, lehen abizenaren inizialarekin eta hiriarekin.",gl:"Só se publican as persoas que autorizaron expresamente aparecer, co nome, a inicial do primeiro apelido e a cidade."},
  "Voces del cuidado": {ca:"Veus de les cures",eu:"Zaintzaren ahotsak",gl:"Voces dos coidados"},
  "Leer y compartir testimonios": {ca:"Llegir i compartir testimonis",eu:"Testigantzak irakurri eta partekatu",gl:"Ler e compartir testemuños"},
  "Entidades adheridas": {ca:"Entitats adherides",eu:"Atxikitako erakundeak",gl:"Entidades adheridas"},
  "Ver todas las entidades": {ca:"Veure totes les entitats",eu:"Erakunde guztiak ikusi",gl:"Ver todas as entidades"},
  "Novedades": {ca:"Novetats",eu:"Albisteak",gl:"Novidades"},
  "Prensa y recursos": {ca:"Premsa i recursos",eu:"Prensa eta baliabideak",gl:"Prensa e recursos"},
  "Logotipos, dossier de prensa y materiales para difundir el movimiento.": {ca:"Logotips, dossier de premsa i materials per difondre el moviment.",eu:"Logotipoak, prentsa-dossierra eta mugimendua zabaltzeko materialak.",gl:"Logotipos, dossier de prensa e materiais para difundir o movemento."},
  "Ir a recursos": {ca:"Anar als recursos",eu:"Baliabideetara joan",gl:"Ir aos recursos"},
  "Contacto": {ca:"Contacte",eu:"Harremana",gl:"Contacto"},
  "¿Eres periodista, entidad o ayuntamiento? Escríbenos.": {ca:"Ets periodista, entitat o ajuntament? Escriu-nos.",eu:"Kazetaria, erakundea edo udala zara? Idatzi iezaguzu.",gl:"Es xornalista, entidade ou concello? Escríbenos."},
  "Escríbenos": {ca:"Escriu-nos",eu:"Idatzi iezaguzu",gl:"Escríbenos"},
  "Comparte tu testimonio": {ca:"Comparteix el teu testimoni",eu:"Partekatu zure testigantza",gl:"Comparte o teu testemuño"},
  "Publicación y consentimiento": {ca:"Publicació i consentiment",eu:"Argitalpena eta baimena",gl:"Publicación e consentimento"},
  "Testimonios publicados:": {ca:"Testimonis publicats:",eu:"Argitaratutako testigantzak:",gl:"Testemuños publicados:"},
  "Rellenar el formulario de adhesión": {ca:"Emplenar el formulari d'adhesió",eu:"Atxikimendu-inprimakia bete",gl:"Cubrir o formulario de adhesión"},
  "Por qué adherirte": {ca:"Per què adherir-t'hi",eu:"Zergatik batu",gl:"Por que adherirte"},
  "Qué datos pedimos": {ca:"Quines dades demanem",eu:"Zer datu eskatzen ditugu",gl:"Que datos pedimos"},
  "Puedes consultar la": {ca:"Pots consultar la",eu:"Kontsulta dezakezu",gl:"Podes consultar a"},
  "política de privacidad": {ca:"política de privacitat",eu:"pribatutasun-politika",gl:"política de privacidade"},
  "Personas adheridas": {ca:"Persones adherides",eu:"Atxikitako pertsonak",gl:"Persoas adheridas"},
  "Últimas adhesiones públicas": {ca:"Últimes adhesions públiques",eu:"Azken atxikimendu publikoak",gl:"Últimas adhesións públicas"},
  "Comparte": {ca:"Comparteix",eu:"Partekatu",gl:"Comparte"},
  "Elige tu foto": {ca:"Tria la teva foto",eu:"Aukeratu zure argazkia",gl:"Escolle a túa foto"},
  "Descargar imagen": {ca:"Descarregar imatge",eu:"Irudia deskargatu",gl:"Descargar imaxe"},
  "Leer noticia": {ca:"Llegir notícia",eu:"Albistea irakurri",gl:"Ler noticia"},
  "Próximos eventos": {ca:"Propers esdeveniments",eu:"Hurrengo ekitaldiak",gl:"Próximos eventos"},
  "Eventos realizados": {ca:"Esdeveniments realitzats",eu:"Egindako ekitaldiak",gl:"Eventos realizados"},
  "Nuestra trayectoria": {ca:"La nostra trajectòria",eu:"Gure ibilbidea",gl:"A nosa traxectoria"},
  "Hoja de ruta": {ca:"Full de ruta",eu:"Ibilbide-orria",gl:"Folla de ruta"},
  "Únete al movimiento": {ca:"Uneix-te al moviment",eu:"Batu mugimendura",gl:"Únete ao movemento"},
  "Adherir mi entidad": {ca:"Adherir la meva entitat",eu:"Nire erakundea atxikitzea",gl:"Adherir a miña entidade"},
  "Las cifras detalladas están en": {ca:"Les xifres detallades són a",eu:"Xehetasuneko datuak hemen daude:",gl:"As cifras detalladas están en"},
  "Todas se publicarán con su fuente verificada.": {ca:"Totes es publicaran amb la seva font verificada.",eu:"Guztiak egiaztatutako iturriarekin argitaratuko dira.",gl:"Todas se publicarán coa súa fonte verificada."},
  "Gracias. Hemos recibido tu mensaje.": {ca:"Gràcies. Hem rebut el teu missatge.",eu:"Eskerrik asko. Zure mezua jaso dugu.",gl:"Grazas. Recibimos a túa mensaxe."},
  "Nombre": {ca:"Nom",eu:"Izena",gl:"Nome"},
  "Correo electrónico": {ca:"Correu electrònic",eu:"Helbide elektronikoa",gl:"Correo electrónico"},
  "Mensaje": {ca:"Missatge",eu:"Mezua",gl:"Mensaxe"},
  "He leído y acepto la política de privacidad.": {ca:"He llegit i accepto la política de privacitat.",eu:"Pribatutasun-politika irakurri eta onartzen dut.",gl:"Lin e acepto a política de privacidade."},
  "Enviar": {ca:"Enviar",eu:"Bidali",gl:"Enviar"},
  "El movimiento en cifras": {ca:"El moviment en xifres",eu:"Mugimendua zenbakitan",gl:"O movemento en cifras"},
  "Por territorio": {ca:"Per territori",eu:"Lurraldeka",gl:"Por territorio"},
  "Adhesiones y entidades por comunidad autónoma": {ca:"Adhesions i entitats per comunitat autònoma",eu:"Atxikimenduak eta erakundeak autonomia-erkidegoka",gl:"Adhesións e entidades por comunidade autónoma"},
  "Comunidad": {ca:"Comunitat",eu:"Erkidegoa",gl:"Comunidade"},
  "Adhesiones": {ca:"Adhesions",eu:"Atxikimenduak",gl:"Adhesións"},
  "Entidades": {ca:"Entitats",eu:"Erakundeak",gl:"Entidades"},
  "Quiero ser voluntario/a": {ca:"Vull ser voluntari/ària",eu:"Boluntarioa izan nahi dut",gl:"Quero ser voluntario/a"},
  "Formas de colaborar": {ca:"Maneres de col·laborar",eu:"Laguntzeko moduak",gl:"Formas de colaborar"},
  "Voluntarios y voluntarias": {ca:"Voluntaris i voluntàries",eu:"Boluntarioak",gl:"Voluntarios e voluntarias"},
  "Últimas incorporaciones": {ca:"Últimes incorporacions",eu:"Azken inkorporazioak",gl:"Últimas incorporacións"},
  "Descarga disponible próximamente": {ca:"Descàrrega disponible pròximament",eu:"Deskarga laster erabilgarri",gl:"Descarga dispoñible proximamente"},
  "Imagen de perfil solidaria": {ca:"Imatge de perfil solidària",eu:"Elkartasuneko profileko irudia",gl:"Imaxe de perfil solidaria"},
  "Añade el marco dorado a tu foto y compártela en redes.": {ca:"Afegeix el marc daurat a la teva foto i comparteix-la a les xarxes.",eu:"Gehitu urrezko markoa zure argazkiari eta partekatu sareetan.",gl:"Engade o marco dourado á túa foto e compártea nas redes."},
  "Crear mi imagen": {ca:"Crear la meva imatge",eu:"Nire irudia sortu",gl:"Crear a miña imaxe"},
  "Navegación": {ca:"Navegació",eu:"Nabigazioa",gl:"Navegación"},
  "Formulario de contacto": {ca:"Formulari de contacte",eu:"Harremanetarako inprimakia",gl:"Formulario de contacto"},
  "Legal": {ca:"Legal",eu:"Lege-oharrak",gl:"Legal"},
  "Aviso legal": {ca:"Avís legal",eu:"Lege-oharra",gl:"Aviso legal"},
  "Política de privacidad": {ca:"Política de privacitat",eu:"Pribatutasun-politika",gl:"Política de privacidade"},
  "Política de cookies": {ca:"Política de cookies",eu:"Cookieen politika",gl:"Política de cookies"},
  "Accesibilidad": {ca:"Accessibilitat",eu:"Irisgarritasuna",gl:"Accesibilidade"},
  "Cookies": {ca:"Cookies",eu:"Cookieak",gl:"Cookies"},
  "Más información": {ca:"Més informació",eu:"Informazio gehiago",gl:"Máis información"},
  "Aceptar": {ca:"Acceptar",eu:"Onartu",gl:"Aceptar"},
  "Rechazar": {ca:"Rebutjar",eu:"Baztertu",gl:"Rexeitar"},
  "Solo esenciales": {ca:"Només essencials",eu:"Ezinbestekoak soilik",gl:"Só esenciais"},
  "Página no encontrada": {ca:"Pàgina no trobada",eu:"Orria ez da aurkitu",gl:"Páxina non atopada"},
  "La página que buscas no existe o se ha movido.": {ca:"La pàgina que busques no existeix o s'ha mogut.",eu:"Bilatzen duzun orria ez dago edo lekuz aldatu da.",gl:"A páxina que buscas non existe ou moveuse."},
  "Volver al inicio": {ca:"Tornar a l'inici",eu:"Hasierara itzuli",gl:"Volver ao inicio"},
  "Esta página no se ha cargado": {ca:"Aquesta pàgina no s'ha carregat",eu:"Orrialde hau ez da kargatu",gl:"Esta páxina non se cargou"},
  "Ha ocurrido un problema. Puedes reintentar o volver al inicio.": {ca:"S'ha produït un problema. Pots tornar-ho a provar o tornar a l'inici.",eu:"Arazo bat gertatu da. Berriro saiatu edo hasierara itzuli zaitezke.",gl:"Produciuse un problema. Podes tentalo de novo ou volver ao inicio."},
  "Reintentar": {ca:"Tornar-ho a provar",eu:"Berriro saiatu",gl:"Tentar de novo"},
  "Ir al inicio": {ca:"Anar a l'inici",eu:"Hasierara joan",gl:"Ir ao inicio"},
  "Contraste suficiente, navegación por teclado, foco visible, textos alternativos y respeto a reducir animaciones.": {ca:"Contrast suficient, navegació amb teclat, focus visible, textos alternatius i respecte per la reducció d'animacions.",eu:"Kontraste nahikoa, teklatu bidezko nabigazioa, foku ikusgarria, testu alternatiboak eta animazioak murrizteko errespetua.",gl:"Contraste suficiente, navegación por teclado, foco visible, textos alternativos e respecto pola redución de animacións."},
  "Conseguir un Pacto de Estado que garantice una atención a la dependencia digna, ágil y suficiente.": {ca:"Aconseguir un Pacte d'Estat que garanteixi una atenció a la dependència digna, àgil i suficient.",eu:"Mendekotasunari arreta duina, arina eta nahikoa bermatuko duen Estatu Ituna lortzea.",gl:"Conseguir un Pacto de Estado que garanta unha atención á dependencia digna, áxil e suficiente."},
  "Cómo actuamos": {ca:"Com actuem",eu:"Nola jarduten dugu",gl:"Como actuamos"},
  "Quiénes somos": {ca:"Qui som",eu:"Nor gara",gl:"Quen somos"},
  "Misión": {ca:"Missió",eu:"Misioa",gl:"Misión"},
  "Gestión": {ca:"Gestió",eu:"Kudeaketa",gl:"Xestión"},
  "Qué son": {ca:"Què són",eu:"Zer dira",gl:"Que son"},
  "¿Qué es la dependencia?": {ca:"Què és la dependència?",eu:"Zer da mendekotasuna?",gl:"Que é a dependencia?"},
  "¿Cómo funciona el sistema?": {ca:"Com funciona el sistema?",eu:"Nola funtzionatzen du sistemak?",gl:"Como funciona o sistema?"},
  "Un Pacto de Estado: financiación estable, plazos garantizados, igualdad territorial y reconocimiento de quienes cuidan.": {ca:"Un Pacte d'Estat: finançament estable, terminis garantits, igualtat territorial i reconeixement de qui cuida.",eu:"Estatu Ituna: finantzaketa egonkorra, bermatutako epeak, lurralde-berdintasuna eta zaintzen dutenen aitorpena.",gl:"Un Pacto de Estado: financiamento estable, prazos garantidos, igualdade territorial e recoñecemento de quen coida."},
  "Una explicación clara del sistema de atención a la dependencia y de por qué necesita un acuerdo de todos.": {ca:"Una explicació clara del sistema d'atenció a la dependència i de per què necessita un acord de tothom.",eu:"Mendekotasunaren arreta-sistemaren azalpen argia eta zergatik behar duen guztion arteko akordioa.",gl:"Unha explicación clara do sistema de atención á dependencia e de por que precisa un acordo de todos."},
  "Es la situación de las personas que, por edad, enfermedad o discapacidad, necesitan ayuda de otras para realizar actividades básicas de la vida diaria.": {ca:"És la situació de les persones que, per edat, malaltia o discapacitat, necessiten l'ajuda d'altres per fer activitats bàsiques de la vida diària.",eu:"Adinagatik, gaixotasunagatik edo desgaitasunagatik eguneroko bizitzako oinarrizko jarduerak egiteko beste pertsonen laguntza behar duten pertsonen egoera da.",gl:"É a situación das persoas que, por idade, enfermidade ou discapacidade, precisan axuda doutras para realizar actividades básicas da vida diaria."},
  "La persona solicita una valoración, recibe un grado de dependencia y, después, un plan con servicios o prestaciones. Cada paso puede tardar meses.": {ca:"La persona sol·licita una valoració, rep un grau de dependència i, després, un pla amb serveis o prestacions. Cada pas pot trigar mesos.",eu:"Pertsonak balorazioa eskatzen du, mendekotasun-maila jasotzen du eta, ondoren, zerbitzu edo prestazioen plan bat. Urrats bakoitzak hilabeteak har ditzake.",gl:"A persoa solicita unha valoración, recibe un grao de dependencia e, despois, un plan con servizos ou prestacións. Cada paso pode tardar meses."},
  "Plataforma Dorada es un movimiento ciudadano y apartidista. Nacemos de familias, cuidadoras y profesionales que piden un acuerdo estable entre todas las fuerzas políticas.": {ca:"Plataforma Dorada és un moviment ciutadà i apartidista. Naixem de famílies, cuidadores i professionals que demanen un acord estable entre totes les forces polítiques.",eu:"Plataforma Dorada herritarren eta alderdikeriarik gabeko mugimendua da. Familia, zaintzaile eta profesionalengandik sortu gara, indar politiko guztien arteko akordio egonkorra eskatuz.",gl:"Plataforma Dorada é un movemento cidadán e apartidista. Nacemos de familias, coidadoras e profesionais que piden un acordo estable entre todas as forzas políticas."},
  "Organizaciones que se suman a la petición de un Pacto de Estado.": {ca:"Organitzacions que se sumen a la petició d'un Pacte d'Estat.",eu:"Estatu Itunaren eskaerarekin bat egiten duten erakundeak.",gl:"Organizacións que se suman á petición dun Pacto de Estado."},
  "Los testimonios pueden contener datos de salud; solo se tratan con consentimiento explícito.": {ca:"Els testimonis poden contenir dades de salut; només es tracten amb consentiment explícit.",eu:"Testigantzek osasun-datuak izan ditzakete; berariazko baimenarekin baino ez dira tratatzen.",gl:"Os testemuños poden conter datos de saúde; só se tratan con consentimento explícito."},
  "Información legal sobre la titularidad y el uso del sitio web de Plataforma Dorada.": {ca:"Informació legal sobre la titularitat i l'ús del lloc web de Plataforma Dorada.",eu:"Plataforma Doradaren webgunearen titulartasunari eta erabilerari buruzko legezko informazioa.",gl:"Información legal sobre a titularidade e o uso do sitio web de Plataforma Dorada."},
  "Qué cookies usa el sitio de Plataforma Dorada y cómo gestionarlas.": {ca:"Quines cookies utilitza el lloc de Plataforma Dorada i com gestionar-les.",eu:"Plataforma Doradaren webguneak zer cookie erabiltzen dituen eta nola kudeatu.",gl:"Que cookies usa o sitio de Plataforma Dorada e como xestionalas."},
  "Solo técnicas, necesarias para recordar tus preferencias de idioma y cookies.": {ca:"Només tècniques, necessàries per recordar les teves preferències d'idioma i cookies.",eu:"Teknikoak baino ez, hizkuntza- eta cookie-hobespenak gogoratzeko beharrezkoak.",gl:"Só técnicas, necesarias para lembrar as túas preferencias de idioma e cookies."},
  "Puedes ejercer acceso, rectificación, supresión, oposición y portabilidad escribiendo a [EMAIL].": {ca:"Pots exercir els drets d'accés, rectificació, supressió, oposició i portabilitat escrivint a [EMAIL].",eu:"Sarbide-, zuzenketa-, ezabatze-, aurka egiteko eta eramangarritasun-eskubideak erabil ditzakezu [EMAIL] helbidera idatziz.",gl:"Podes exercer os dereitos de acceso, rectificación, supresión, oposición e portabilidade escribindo a [EMAIL]."},
  "Si encuentras una barrera, escríbenos a [EMAIL].": {ca:"Si trobes una barrera, escriu-nos a [EMAIL].",eu:"Oztopo bat aurkitzen baduzu, idatzi [EMAIL] helbidera.",gl:"Se atopas unha barreira, escríbenos a [EMAIL]."},
  "Los contenidos pertenecen a sus autores salvo indicación contraria.": {ca:"Els continguts pertanyen als seus autors tret que s'indiqui el contrari.",eu:"Edukiak haien egileenak dira, kontrakoa adierazi ezean.",gl:"Os contidos pertencen aos seus autores salvo indicación contraria."},
});'''
s=s.replace(marker, extra+marker)
# Fix homepage claim to use canonical translated key rather than stale hardcoded wording.
idx=root/'src/routes/index.tsx'
s=idx.read_text()
s=s.replace('''            <h1 className="mt-6 font-display text-4xl leading-[1.03] tracking-tight md:text-6xl">\n              Por un Pacto de Estado por la{" "}\n              <span className="text-primary italic">dependencia</span> y los cuidados\n            </h1>''','''            <h1 className="mt-6 font-display text-4xl leading-[1.03] tracking-tight md:text-6xl">\n              {t("home.title")}\n            </h1>''')
idx.write_text(s)

# Fix stale hardcoded fallback colors in profile generator.
p=root/'src/routes/imagen-perfil.tsx'
s=p.read_text().replace('"#1f3a5f"','"#80683F"').replace('"#d4a72c"','"#A18756"')
p.write_text(s)

# Add safer t() fallback and explicit locale map in i18n.
s=i18n.read_text()
s=s.replace('const LOCALE_NAMES: Record<Locale, string> = { es: "Castellano", ca: "Català", eu: "Euskara", gl: "Galego" };','const LOCALE_NAMES: Record<Locale, string> = { es: "Castellano", ca: "Català", eu: "Euskara", gl: "Galego" };')
# no-op: keep export, header no longer depends on it.

# Package output.
out=Path('/mnt/data/plataforma-dorada-corregida.zip')
if out.exists(): out.unlink()
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    for p in root.rglob('*'):
        if p.is_file() and '__pycache__' not in p.parts:
            z.write(p,p.relative_to(root))
print(out)
