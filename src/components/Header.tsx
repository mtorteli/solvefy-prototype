import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Globe, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import iconCpaas from "@/assets/icons/cpaas.svg";
import iconAds from "@/assets/icons/ads.svg";
import iconMarketing from "@/assets/icons/marketing.svg";
import iconCrm from "@/assets/icons/crm.svg";
import iconCloud from "@/assets/icons/cloud.svg";

const solutions = [
  { name: "Solvefy/CPaaS", icon: iconCpaas, hover: "hover:bg-[hsl(var(--cpaas))]/10", desc: "Comunicação em Escala", to: "/cpaas" },
  { name: "Solvefy/Ads", icon: iconAds, hover: "hover:bg-[hsl(var(--ads))]/10", desc: "Tráfego Direto", to: "/ads" },
  { name: "Solvefy/Marketing", icon: iconMarketing, hover: "hover:bg-[hsl(var(--marketing))]/10", desc: "Jornadas Inteligentes", to: "/marketing" },
  { name: "Solvefy/CRM", icon: iconCrm, hover: "hover:bg-[hsl(var(--crm))]/10", desc: "Gestão Comercial", to: "/crm" },
  { name: "Solvefy/Cloud", icon: iconCloud, hover: "hover:bg-[hsl(var(--cloud))]/10", desc: "Automação Cloud", to: "/cloud" },
];

const resources = [
  { name: "Blog", to: "/blog" }, 
  { name: "Central de Ajuda", to: "/" }, 
  { name: "Documentação", to: "/" }
];
const company = [
  { name: "Quem Somos", to: "/quem-somos" },
  { name: "Seja um Solvers", to: "/" },
];

const NavDropdown = ({
  label,
  items,
}: {
  label: string;
  items: { name: string; desc?: string; to?: string }[];
}) => (
  <div className="relative group">
    <button
      className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
      aria-haspopup="true"
    >
      {label}
      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
    </button>
    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      <div className="w-72 rounded-2xl border border-border bg-card shadow-elegant p-2">
        {items.map((item) =>
          item.to ? (
            <Link
              key={item.name}
              to={item.to}
              className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-muted transition-colors"
            >
              <div>
                <div className="text-sm font-semibold text-foreground">{item.name}</div>
                {item.desc && <div className="text-xs text-muted-foreground">{item.desc}</div>}
              </div>
            </Link>
          ) : (
            <a
              key={item.name}
              href="#"
              className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-muted transition-colors"
            >
              <div>
                <div className="text-sm font-semibold text-foreground">{item.name}</div>
                {item.desc && <div className="text-xs text-muted-foreground">{item.desc}</div>}
              </div>
            </a>
          )
        )}
      </div>
    </div>
  </div>
);

const SolutionsMegaMenu = () => (
  <div className="relative group">
    <button
      className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
      aria-haspopup="true"
      aria-label="Soluções"
    >
      Soluções
      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
    </button>
    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      <div className="w-[600px] rounded-2xl border border-border bg-card shadow-elegant p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {solutions.map((s) => (
            <Link
              key={s.name}
              to={s.to}
              className={`flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm transition-colors duration-200 ${s.hover}`}
            >
              <img src={s.icon} alt={s.name} className="w-8 h-8 object-contain flex-shrink-0" />
              <div className="flex flex-col justify-center">
                <div className="text-sm font-bold text-black">{s.name}</div>
                <div className="text-xs font-normal text-black/70">{s.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled ? "shadow-elegant" : ""
      }`}
    >
      {/* Top bar */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-0 flex h-9 items-center justify-end gap-5 py-2 text-xs">
          <button
            className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            aria-label="Selecionar idioma: Português"
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="font-medium">PT</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          <Link to="/contato" className="text-white hover:text-white/80 font-medium transition-colors">
            Fale Conosco
          </Link>
          <Link
            to="/"
            className="rounded-md bg-white px-3 py-1 text-xs font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`bg-background transition-colors duration-300 ${
          scrolled ? "border-b border-border" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-0 flex h-auto items-center justify-between gap-6 py-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
            >
              Início
            </Link>
            <SolutionsMegaMenu />
            <NavDropdown label="Recursos" items={resources} />
            <NavDropdown label="Empresa" items={company} />
          </nav>

          <div className="hidden lg:flex items-center">
            <Link to="/contato">
              <Button variant="hero" size="lg" className="group text-black font-semibold">
                Fale com um Especialista
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background border-t border-border"
          >
            <div className="container mx-auto py-4 space-y-1">
              <Link to="/" className="block px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium">
                Início
              </Link>
              <div className="text-xs font-semibold uppercase text-muted-foreground px-3 pt-2">Soluções</div>
              {solutions.map((s) => (
                <Link
                  key={s.name}
                  to={s.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted"
                >
                  <img src={s.icon} alt={s.name} className="h-5 w-5 object-contain" />
                  <span className="text-sm font-medium">{s.name}</span>
                </Link>
              ))}
              <Link to="/blog" className="block px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium">
                Recursos
              </Link>
              <Link to="/quem-somos" className="block px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium">
                Empresa
              </Link>
              <div className="px-3 pt-2">
                <Button variant="hero" className="w-full group">
                  Conheça as Soluções
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
