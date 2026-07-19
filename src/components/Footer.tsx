import { ArrowRight } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoFooter from "@/assets/logo-solvefy-footer.png";
import { useLocale } from "@/i18n/useLocale";

type FooterLink = {
  name: string;
  /** path relativo (sem prefixo de locale) ou URL absoluta. */
  to: string;
};

export const Footer = () => {
  const { t } = useTranslation("common");
  const { localizedPath } = useLocale();

  const linkGroups: Array<{ title: string; links: FooterLink[] }> = [
    {
      title: t("footer.groups.solutions"),
      links: [
        { name: "Solvefy/CPaaS", to: localizedPath("/cpaas") },
        { name: "Solvefy/Ads", to: localizedPath("/ads") },
        { name: "Solvefy/Marketing", to: localizedPath("/marketing") },
        { name: "Solvefy/CRM", to: localizedPath("/crm") },
        { name: "Solvefy/Agents", to: localizedPath("/agents") },
        { name: "Solvefy/Cloud", to: localizedPath("/cloud") },
      ],
    },
    {
      title: t("footer.groups.resources"),
      links: [
        { name: t("footer.links.blog"), to: localizedPath("/blog") },
      ],
    },
  ];

  return (
    <footer className="bg-black text-dark-foreground">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link to={localizedPath("/")} aria-label={t("footer.logoAlt")} className="block ml-0 pl-0">
              <img
                src={logoFooter}
                alt={t("footer.logoAlt")}
                className="h-7 w-auto ml-0 pl-0"
                loading="lazy"
                width="120"
                height="28"
              />
            </Link>
            <h3 className="text-white mt-6 text-xl md:text-2xl font-bold tracking-tighter text-balance">
              <Trans
                i18nKey="footer.slogan"
                ns="common"
                components={{ accent: <span className="text-primary" /> }}
              />
            </h3>
            <p className="mt-3 text-dark-foreground/60 max-w-md leading-relaxed">
              {t("footer.tagline")}
            </p>
            <Link to={localizedPath("/contato")}>
              <Button variant="hero" size="lg" className="mt-7 group">
                {t("footer.cta")}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Link columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-bold text-dark-foreground mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      {link.to.startsWith("http") ? (
                        <a
                          href={link.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-dark-foreground/60 hover:text-primary transition-colors"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="text-sm text-dark-foreground/60 hover:text-primary transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Aviso de protótipo — respaldo de que isto é uma demonstração de portfólio */}
        <div className="mt-14 pt-8 border-t border-[#F8FaFC99]">
          <p className="text-sm text-dark-foreground/60 leading-relaxed max-w-3xl">
            <Trans
              i18nKey="footer.institutional"
              ns="common"
              components={{ strong: <strong className="text-dark-foreground" /> }}
            />
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-[#F8FaFC99] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-xs text-dark-foreground/50">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};
