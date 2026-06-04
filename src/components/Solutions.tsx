import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heading, SectionSubtitle } from "@/components/ui/Typography";
import { useLocale } from "@/i18n/useLocale";
import { useReveal } from "@/hooks/useReveal";
import iconCpaas from "@/assets/icons/cpaas.svg";
import iconAds from "@/assets/icons/ads.svg";
import iconMarketing from "@/assets/icons/marketing.svg";
import iconCrm from "@/assets/icons/crm.svg";
import iconCloud from "@/assets/icons/cloud.svg";
import iconAgents from "@/assets/icons/agents.svg";
import logoCpaas from "@/assets/logos/solvefy-cpaas.png";
import logoAds from "@/assets/logos/solvefy-ads.png";
import logoMarketing from "@/assets/logos/solvefy-marketing.png";
import logoCrm from "@/assets/logos/solvefy-crm.png";
import logoAgents from "@/assets/logos/solvefy-agents.png";
import logoCloud from "@/assets/logos/solvefy-cloud.png";

/**
 * Cada solução tem dados visuais fixos (logo, ícone, cor, rota) e dados
 * traduzíveis (headline, desc, bullets) que vivem em `home.json`.
 */
const solutionMeta = [
  { key: "cpaas",     name: "Solvefy/CPaaS",     logo: logoCpaas,     icon: iconCpaas,     color: "hsl(var(--cpaas))",     panelBg: "hsl(var(--cpaas-surface))",     path: "/cpaas" },
  { key: "ads",       name: "Solvefy/Ads",       logo: logoAds,       icon: iconAds,       color: "hsl(var(--ads))",       panelBg: "hsl(var(--ads-surface))",       path: "/ads" },
  { key: "marketing", name: "Solvefy/Marketing", logo: logoMarketing, icon: iconMarketing, color: "hsl(var(--marketing))", panelBg: "hsl(var(--marketing-surface))", path: "/marketing" },
  { key: "crm",       name: "Solvefy/CRM",       logo: logoCrm,       icon: iconCrm,       color: "hsl(var(--crm))",       panelBg: "hsl(var(--crm-surface))",       path: "/crm" },
  { key: "agents",    name: "Solvefy/Agents",    logo: logoAgents,    icon: iconAgents,    color: "hsl(var(--agents))",    panelBg: "hsl(var(--agents-surface))",    path: "/agents" },
  { key: "cloud",     name: "Solvefy/Cloud",     logo: logoCloud,     icon: iconCloud,     color: "hsl(var(--cloud))",     panelBg: "hsl(var(--cloud-surface))",     path: "/cloud" },
] as const;

export const Solutions = () => {
  const { t } = useTranslation("home");
  const { localizedPath } = useLocale();
  const [active, setActive] = useState(0);
  const reveal = useReveal();
  const current = solutionMeta[active];
  // returnObjects: arrays vêm como string[] do JSON em vez de string única
  const bullets = t(`solutions.items.${current.key}.bullets`, {
    returnObjects: true,
  }) as string[];

  return (
    <section id="solucoes" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl text-left mb-14">
          <Heading className="tracking-tighter text-balance leading-[1.1]">
            {t("solutions.title.before")}
            <span className="text-primary">{t("solutions.title.highlight")}</span>
          </Heading>
          <SectionSubtitle className="mt-5">
            {t("solutions.subtitle")}
          </SectionSubtitle>
        </div>

        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          {/* Tabs / Cards */}
          <div className="md:col-span-5 space-y-3 flex flex-col justify-between">
            {solutionMeta.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.key}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="w-full text-left group"
                  style={{ ["--accent-color" as string]: s.color }}
                >
                  <div
                    className={`relative rounded-2xl border bg-card p-5 transition-all duration-300 ${
                      isActive
                        ? "shadow-elegant scale-[1.01]"
                        : "border-transparent hover:border-foreground/10"
                    }`}
                    style={isActive ? { borderColor: s.color, boxShadow: `0 12px 40px -12px ${s.color}66` } : undefined}
                  >
                    <div className="flex items-center gap-4 pl-2">
                      <div className="flex h-10 w-10 items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                        <img src={s.icon} alt={s.name} className="w-9 h-9 object-contain" width="36" height="36" loading="lazy" />
                      </div>
                      <div className="flex flex-col items-start flex-1">
                        <img src={s.logo} alt={s.name} className="h-4 w-auto" />
                        <div className="text-sm text-[#1e1e1e]">
                          {t(`solutions.items.${s.key}.headline`)}
                        </div>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1"
                        style={isActive ? { color: s.color } : undefined}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="md:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={reveal ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl p-8 md:p-10 overflow-hidden h-full flex flex-col"
                style={{ backgroundColor: current.panelBg }}
              >
                <div
                  className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-20"
                  style={{ background: current.color }}
                />
                <div
                  className="inline-flex self-start items-center gap-2 rounded-full pr-3 py-1 text-xs font-semibold mb-6 w-fit"
                  style={{ backgroundColor: `${current.color}20`, color: current.color }}
                >
                  <img src={current.logo} alt={current.name} className="h-3.5 w-auto" loading="lazy" />
                </div>
                <Heading variant="h3" className="mb-4 text-balance text-[#000000]">
                  {t(`solutions.items.${current.key}.headline`)}
                </Heading>
                <p className="text-[#1e1e1e] text-base md:text-lg leading-snug mb-8">
                  {t(`solutions.items.${current.key}.desc`)}
                </p>
                <ul className="flex flex-col gap-2 mb-8">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-[#1e1e1e]">
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shrink-0"
                        style={{ backgroundColor: current.color }}
                      >
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="w-full flex justify-end mt-auto">
                  <Link
                    to={localizedPath(current.path)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-black transition-transform hover:translate-x-1"
                  >
                    {t("solutions.ctaPricing", { name: current.name })}{" "}
                    <ArrowRight className="h-4 w-4" style={{ color: current.color }} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
