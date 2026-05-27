import { ArrowRight, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const items = [
  { label: "Visão Geral", to: "/cpaas" },
  { label: "Voz", to: "/cpaas/voz" },
  { label: "SMS", to: "/cpaas/sms" },
  { label: "WhatsApp", to: "/cpaas/whatsapp" },
  { label: "E-mail", to: "/cpaas/email" },
  { label: "RCS", to: "/cpaas/rcs" },
];

const isActive = (pathname: string, to: string) =>
  to === "/cpaas" ? pathname === "/cpaas" : pathname === to || pathname.startsWith(`${to}/`);

export const CpaasSubNav = () => {
  const { pathname } = useLocation();
  const onCpaas = pathname === "/cpaas" || pathname.startsWith("/cpaas/");
  if (!onCpaas) return null;

  const current = items.find((i) => isActive(pathname, i.to)) ?? items[0];

  return (
    <nav
      aria-label="Navegação CPaaS"
      className="bg-white border-b border-border border-t-2 border-t-[hsl(var(--cpaas))]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Desktop — espelha a estrutura justify-between do Header para alinhar com a nav de cima */}
        <div className="hidden lg:flex items-center justify-between gap-6 h-12">
          <div className="invisible pointer-events-none" aria-hidden="true">
            <Logo />
          </div>
          <ul className="flex items-center gap-8 h-12">
            {items.map((item) => {
              const active = isActive(pathname, item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center h-12 text-sm transition-colors border-b-2 -mb-px ${
                      active
                        ? "border-[hsl(var(--cpaas))] text-foreground font-medium"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="invisible pointer-events-none" aria-hidden="true">
            <Button variant="hero" size="lg" className="text-black font-semibold" tabIndex={-1}>
              Fale com um Especialista
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="w-full flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2.5 text-sm font-medium"
                aria-label="Navegação CPaaS"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: "hsl(var(--cpaas))" }}
                  />
                  <span className="text-muted-foreground">CPaaS ·</span>
                  <span className="text-foreground">{current.label}</span>
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[calc(100vw-2rem)] max-w-sm">
              {items.map((item) => {
                const active = isActive(pathname, item.to);
                return (
                  <DropdownMenuItem key={item.to} asChild>
                    <Link
                      to={item.to}
                      aria-current={active ? "page" : undefined}
                      className={active ? "font-medium text-[hsl(var(--cpaas))]" : ""}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
