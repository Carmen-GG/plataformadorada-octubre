import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { LOCALES, LOCALE_LABELS, LOCALE_NAMES, useI18n } from "@/lib/i18n";
import logo from "@/assets/logo-plataforma-dorada.png";

const GROUPS = {
  es: [{label:"La Plataforma",items:[["/la-plataforma","Quiénes somos","Conoce el movimiento"],["/la-plataforma#trayectoria","Nuestra trayectoria","Cómo hemos llegado hasta aquí"],["/la-dependencia","10 principios","Las bases de nuestro movimiento"],["/la-plataforma#hoja-de-ruta","Hoja de ruta","Qué queremos conseguir"]]},{label:"Participa",items:[["/unete","Firma el Pacto","Adhiérete"],["/testimonios","Tu testimonio","Cuéntanos tu experiencia"],["/voluntariado","Hazte voluntario/a","Ayúdanos a impulsar el movimiento"],["/mociones-ayuntamientos","Mociones en ayuntamientos","Consulta y sigue las mociones presentadas"]]},{label:"Datos",items:[["/datos","Datos de Plataforma Dorada","Adhesiones · entidades · mociones · testimonios"]]},{label:"Recursos",items:[["/prensa","Recursos y documentos","Materiales para difundir el movimiento"],["/imagen-perfil","Crea tu imagen de perfil","Personaliza tu imagen solidaria"]]},{label:"Conecta",items:[["/redes-sociales","Instagram · TikTok","Síguenos y participa"],["/redes-sociales#spotify","Spotify","Nuestra música"],["/redes-sociales#frases","Lemas y citas","Frases para compartir"]]}],
  ca: [{label:"La Plataforma",items:[["/la-plataforma","Qui som","Coneix el moviment"],["/la-plataforma#trayectoria","La nostra trajectòria","Com hi hem arribat"],["/la-dependencia","10 principis","Les bases del moviment"],["/la-plataforma#hoja-de-ruta","Full de ruta","Què volem aconseguir"]]},{label:"Participa",items:[["/unete","Signa el Pacte","Adhereix-t'hi"],["/testimonios","El teu testimoni","Explica'ns la teva experiència"],["/voluntariado","Fes-te voluntari/a","Ajuda'ns a impulsar el moviment"],["/mociones-ayuntamientos","Mocions als ajuntaments","Consulta i segueix les mocions presentades"]]},{label:"Dades",items:[["/datos","Dades de Plataforma Dorada","Adhesions · entitats · mocions · testimonis"]]},{label:"Recursos",items:[["/prensa","Recursos i documents","Materials per difondre el moviment"],["/imagen-perfil","Crea la teva imatge de perfil","Personalitza la teva imatge solidària"]]},{label:"Connecta",items:[["/redes-sociales","Instagram · TikTok","Segueix-nos i participa"],["/redes-sociales#spotify","Spotify","La nostra música"],["/redes-sociales#frases","Lemes i cites","Frases per compartir"]]}],
  eu: [{label:"Plataforma",items:[["/la-plataforma","Nor gara","Ezagutu mugimendua"],["/la-plataforma#trayectoria","Gure ibilbidea","Nola iritsi gara honaino"],["/la-dependencia","10 printzipio","Mugimenduaren oinarriak"],["/la-plataforma#hoja-de-ruta","Ibilbide-orria","Zer lortu nahi dugu"]]},{label:"Parte hartu",items:[["/unete","Itunaren alde sinatu","Bat egin"],["/testimonios","Zure testigantza","Kontatu zure esperientzia"],["/voluntariado","Boluntario izan","Lagundu mugimenduari"],["/mociones-ayuntamientos","Mozioak udaletxeetan","Kontsultatu aurkeztutako mozioak"]]},{label:"Datuak",items:[["/datos","Plataforma Doradaren datuak","Atxikimenduak · erakundeak · mozioak · testigantzak"]]},{label:"Baliabideak",items:[["/prensa","Baliabideak eta dokumentuak","Mugimendua zabaltzeko materialak"],["/imagen-perfil","Sortu zure profileko irudia","Pertsonalizatu zure irudi solidarioa"]]},{label:"Konektatu",items:[["/redes-sociales","Instagram · TikTok","Jarraitu eta parte hartu"],["/redes-sociales#spotify","Spotify","Gure musika"],["/redes-sociales#frases","Leloak eta aipuak","Partekatzeko esaldiak"]]}],
  gl: [{label:"A Plataforma",items:[["/la-plataforma","Quen somos","Coñece o movemento"],["/la-plataforma#trayectoria","A nosa traxectoria","Como chegamos ata aquí"],["/la-dependencia","10 principios","As bases do movemento"],["/la-plataforma#hoja-de-ruta","Folla de ruta","Que queremos conseguir"]]},{label:"Participa",items:[["/unete","Asina o Pacto","Adhírete"],["/testimonios","O teu testemuño","Cóntanos a túa experiencia"],["/voluntariado","Faite voluntario/a","Axúdanos a impulsar o movemento"],["/mociones-ayuntamientos","Mocións nos concellos","Consulta e segue as mocións presentadas"]]},{label:"Datos",items:[["/datos","Datos de Plataforma Dorada","Adhesións · entidades · mocións · testemuños"]]},{label:"Recursos",items:[["/prensa","Recursos e documentos","Materiais para difundir o movemento"],["/imagen-perfil","Crea a túa imaxe de perfil","Personaliza a túa imaxe solidaria"]]},{label:"Conecta",items:[["/redes-sociales","Instagram · TikTok","Síguenos e participa"],["/redes-sociales#spotify","Spotify","A nosa música"],["/redes-sociales#frases","Lemas e citas","Frases para compartir"]]}],
} as const;

export function SiteHeader() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const groups = GROUPS[locale];

  return (
    <header className="relative z-30 mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6">
      <nav aria-label={t("nav.menu")} className="glass-panel rounded-3xl px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => { setActive(null); setOpen(false); }}>
            <img src={logo} alt="Logo de Plataforma Dorada" className="size-11 shrink-0 rounded-full object-cover" />
            <span className="min-w-0 font-display text-base leading-tight font-semibold tracking-tight sm:text-lg">Plataforma Dorada</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {groups.map((group) => (
              <div key={group.label} className="relative">
                <button type="button" aria-expanded={active === group.label} onClick={() => setActive(active === group.label ? null : group.label)} className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${active === group.label ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-accent/20 hover:text-primary"}`}>
                  {group.label}
                  <span aria-hidden="true" className="ml-1 text-xs">⌄</span>
                </button>
                {active === group.label && (
                  <div className="absolute right-0 top-full mt-2 w-80 rounded-3xl border border-border bg-background/98 p-3 shadow-xl backdrop-blur" role="menu">
                    {group.items.map(([to, title, desc]) => (
                      <Link key={to + title} to={to as any} onClick={() => setActive(null)} className="block rounded-2xl px-4 py-3 hover:bg-accent/15" role="menuitem">
                        <span className="block font-semibold text-foreground">{title}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div role="group" aria-label={t("nav.language")} className="glass-soft hidden rounded-full p-1 text-xs font-semibold sm:flex">
              {LOCALES.map((code) => (
                <button key={code} type="button" lang={code} aria-pressed={locale === code} onClick={() => setLocale(code)} className={locale === code ? "rounded-full bg-primary px-3 py-1 text-primary-foreground" : "rounded-full px-3 py-1 text-muted-foreground hover:text-primary"}>
                  <span className="sr-only">{LOCALE_NAMES[code]}</span><span aria-hidden="true">{LOCALE_LABELS[code]}</span>
                </button>
              ))}
            </div>
            <Link to="/unete" className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/85">{t("cta.join")}</Link>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu-completo" className="glass-soft rounded-full px-4 py-2.5 text-sm font-semibold text-primary lg:hidden">☰ <span className="sr-only">{t("nav.menu")}</span></button>
          </div>
        </div>

        {open && (
          <div id="menu-completo" className="mt-4 border-t border-border pt-4 lg:hidden">
            {groups.map((group) => (
              <details key={group.label} className="border-b border-border last:border-0">
                <summary className="cursor-pointer list-none py-3 font-semibold text-primary">{group.label}</summary>
                <div className="pb-3 pl-3">
                  {group.items.map(([to, title, desc]) => <Link key={to + title} to={to as any} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5"><span className="block font-medium">{title}</span><span className="text-xs text-muted-foreground">{desc}</span></Link>)}
                </div>
              </details>
            ))}
            <div className="mt-3 flex gap-2 sm:hidden">
              {LOCALES.map((code) => <button key={code} type="button" aria-pressed={locale === code} onClick={() => setLocale(code)} className={locale === code ? "rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground" : "glass-soft rounded-full px-3 py-1 text-sm text-muted-foreground"}>{LOCALE_NAMES[code]}</button>)}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
