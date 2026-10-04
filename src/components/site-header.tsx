import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { LOCALES, LOCALE_LABELS, LOCALE_NAMES, useI18n } from "@/lib/i18n";
import logo from "@/assets/logo-plataforma-dorada.png";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/la-plataforma", key: "nav.about" },
  { to: "/la-dependencia", key: "nav.dependency" },
  { to: "/datos", key: "nav.data" },
  { to: "/testimonios", key: "nav.testimonials" },
  { to: "/eventos", key: "nav.events" },
  { to: "/entidades", key: "nav.entities" },
  { to: "/novedades", key: "nav.news" },
  { to: "/prensa", key: "nav.press" },
  { to: "/redes-sociales", key: "nav.social" },
  { to: "/voluntariado", key: "nav.volunteer" },
  { to: "/contacto", key: "nav.contact" },
] as const;

export function SiteHeader() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30 mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6">
      <nav
        aria-label={t("nav.menu")}
        className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 sm:px-6 sm:py-4"
      >
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo de Plataforma Dorada"
            className="size-11 rounded-full object-cover"
          />
          <span className="font-display text-base leading-tight font-semibold tracking-tight sm:text-lg">
            Plataforma Dorada
          </span>
        </Link>

        <ul className="hidden items-center gap-5 text-sm font-medium text-muted-foreground xl:flex">
          {navItems.slice(0, 7).map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeProps={{ className: "text-primary underline underline-offset-8" }}
                className="hover:text-primary"
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t("nav.language")}
            className="glass-soft hidden rounded-full p-1 text-xs font-semibold sm:flex"
          >
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                lang={code}
                aria-pressed={locale === code}
                onClick={() => setLocale(code)}
                className={
                  locale === code
                    ? "rounded-full bg-primary px-3 py-1 text-primary-foreground"
                    : "rounded-full px-3 py-1 text-muted-foreground hover:text-primary"
                }
              >
                <span className="sr-only">{LOCALE_NAMES[code]}</span>
                <span aria-hidden="true">{LOCALE_LABELS[code]}</span>
              </button>
            ))}
          </div>

          <Link
            to="/unete"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/85"
          >
            {t("cta.join")}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-completo"
            className="glass-soft rounded-full px-4 py-2.5 text-sm font-semibold text-primary xl:hidden"
          >
            {t("nav.menu")}
          </button>
        </div>

        {open && (
          <ul id="menu-completo" className="w-full border-t border-border pt-4 text-base xl:hidden">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "text-primary font-semibold" }}
                  className="block py-2 text-foreground/80 hover:text-primary"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex gap-2 sm:hidden">
              {LOCALES.map((code) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={locale === code}
                  onClick={() => setLocale(code)}
                  className={
                    locale === code
                      ? "rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground"
                      : "glass-soft rounded-full px-3 py-1 text-sm text-muted-foreground"
                  }
                >
                  {LOCALE_NAMES[code]}
                </button>
              ))}
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
