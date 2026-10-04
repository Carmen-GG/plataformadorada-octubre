import { Link } from "@tanstack/react-router";
import { openCookieSettings } from "@/lib/consent";
import { SITE } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import logo from "@/assets/logo-plataforma-dorada.png";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <div className="rounded-3xl bg-primary p-7 text-primary-foreground sm:p-9">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo de Plataforma Dorada"
                className="size-12 rounded-full object-cover"
              />
              <p className="font-display text-xl font-semibold">Plataforma Dorada</p>
            </div>
            <p className="mt-3 max-w-[32ch] text-sm text-primary-foreground/75">
              Por un Pacto de Estado por la Dependencia y los Cuidados. Movimiento ciudadano y
              apartidista.
            </p>
            <Link
              to="/unete"
              className="mt-5 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
            >
              {t("cta.join")}
            </Link>
          </div>

          <nav aria-label="Navegación del pie">
            <h2 className="font-display text-sm font-semibold tracking-[0.15em] text-accent uppercase">
              Navegación
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
              <li>
                <Link to="/la-plataforma" className="hover:text-accent">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/la-dependencia" className="hover:text-accent">
                  {t("nav.dependency")}
                </Link>
              </li>
              <li>
                <Link to="/redes-sociales" className="hover:text-accent">
                  {t("nav.social")}
                </Link>
              </li>
              <li>
                <Link to="/voluntariado" className="hover:text-accent">
                  {t("nav.volunteer")}
                </Link>
              </li>
              <li>
                <Link to="/testimonios" className="hover:text-accent">
                  {t("nav.testimonials")}
                </Link>
              </li>
              <li>
                <Link to="/prensa" className="hover:text-accent">
                  {t("nav.press")}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-[0.15em] text-accent uppercase">
              Contacto
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
              <li>{SITE.email}</li>
              <li>
                <a href={SITE.instagram} className="hover:text-accent">
                  Instagram
                </a>
              </li>
              <li>
                <a href={SITE.tiktok} className="hover:text-accent">
                  TikTok
                </a>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-accent">
                  Formulario de contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-[0.15em] text-accent uppercase">
              Legal
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
              <li>
                <Link to="/aviso-legal" className="hover:text-accent">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="hover:text-accent">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-accent">
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link to="/accesibilidad" className="hover:text-accent">
                  Accesibilidad
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="text-left hover:text-accent"
                >
                  Cambiar preferencias de cookies
                </button>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-9 border-t border-primary-foreground/20 pt-5 text-sm text-primary-foreground/70">
          Plataforma Dorada — Por un Pacto de Estado por la Dependencia y los Cuidados.
        </p>
      </div>
    </footer>
  );
}
