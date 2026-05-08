import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoFooter from "@/assets/logo-solvefy-footer.png";

const linkGroups = [
  {
    title: "Soluções",
    links: [
      { name: "Solvefy/CPaaS", to: "/cpaas" },
      { name: "Solvefy/Ads", to: "/ads" },
      { name: "Solvefy/Marketing", to: "/marketing" },
      { name: "Solvefy/CRM", to: "/crm" },
      { name: "Solvefy/Cloud", to: "/cloud" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { name: "Blog", to: "/blog" },
      { name: "Central de Ajuda", to: "/" },
      { name: "Documentação", to: "/" },
      { name: "API Reference", to: "/" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Quem Somos", to: "/quem-somos" },
      { name: "Seja um Solvers", to: "/" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-dark-foreground">
      <div className="container mx-auto py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link to="/" aria-label="Solvefy" className="block ml-0 pl-0">
              <img
                src={logoFooter}
                alt="Solvefy"
                className="h-7 w-auto ml-0 pl-0"
                loading="lazy"
                width="120"
                height="28"
              />
            </Link>
            <h3 className="text-white mt-6 text-xl md:text-2xl font-bold tracking-tighter text-balance">
              Próximo<span className="text-primary">.</span> Veloz
              <span className="text-primary">.</span> Melhor
              <span className="text-primary">.</span>
            </h3>
            <p className="mt-3 text-dark-foreground/60 max-w-md leading-relaxed">
              Tecnologia que simplifica, integração que gera resultado.
            </p>
            <Link to="/contato">
              <Button variant="hero" size="lg" className="mt-7 group">
                Entre em Contato
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <div className="mt-8 flex items-center gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-muted hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-bold text-dark-foreground mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={typeof link === "string" ? link : link.name}>
                      {typeof link === "string" ? (
                        <a
                          href="#"
                          className="text-sm text-dark-foreground/60 hover:text-primary transition-colors"
                        >
                          {link}
                        </a>
                      ) : link.to ? (
                        <Link
                          to={link.to}
                          className="text-sm text-dark-foreground/60 hover:text-primary transition-colors"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <a
                          href="#"
                          className="text-sm text-dark-foreground/60 hover:text-primary transition-colors"
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-[#F8FaFC99] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-xs text-dark-foreground/50">
            © {new Date().getFullYear()} Solvefy. Todos os direitos reservados.
            CNPJ 35.693.806/0001-97
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs text-dark-foreground/50">
              <a
                href="/termos-e-politicas#politica-de-privacidade"
                className="hover:text-primary transition-colors"
              >
                Privacidade
              </a>
              <a
                href="/termos-e-politicas#termos-de-uso"
                className="hover:text-primary transition-colors"
              >
                Termos
              </a>
              <a
                href="/termos-e-politicas#politica-de-privacidade"
                className="hover:text-primary transition-colors"
              >
                LGPD
              </a>
            </div>
            {/* ACATE seal */}
            <div className="flex items-center gap-2 rounded-lg border border-[#F8FAFC99] bg-[#F8FAFC99] px-4 py-2.5">
              <Award className="h-5 w-5 text-primary" />
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-dark-foreground/50">
                  Selo
                </div>
                <div className="text-xs font-bold text-dark-foreground">
                  ACATE 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
