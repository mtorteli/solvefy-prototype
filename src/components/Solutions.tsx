import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Heading, SectionSubtitle } from "@/components/ui/Typography";
import iconCpaas from "@/assets/icons/cpaas.svg";
import iconAds from "@/assets/icons/ads.svg";
import iconMarketing from "@/assets/icons/marketing.svg";
import iconCrm from "@/assets/icons/crm.svg";
import iconCloud from "@/assets/icons/cloud.svg";

const solutions = [
  {
    key: "cpaas",
    name: "Solvefy/CPaaS",
    color: "hsl(var(--cpaas))",
    panelBg: "hsl(var(--cpaas-surface))",
    icon: iconCpaas,
    to: "/cpaas",
    headline: "Comunicação em alta escala.",
    desc: "Dispare WhatsApp, RCS, SMS e Voz com a infraestrutura robusta e rotas de alta performance para sustentar suas operações com máxima estabilidade.",
    bullets: ["WhatsApp Business API", "RCS & SMS", "Voz e URA inteligente"],
  },
  {
    key: "ads",
    name: "Solvefy/Ads",
    color: "hsl(var(--ads))",
    panelBg: "hsl(var(--ads-surface))",
    icon: iconAds,
    to: "/ads",
    headline: "Compre performance, não apenas contatos.",
    desc: "Pare de desperdiçar orçamento. Segmente sua audiência com inteligência e atraia leads qualificados direto para seus canais de conversão, pagando apenas por resultados reais.",
    bullets: ["Meta & Google Ads", "Otimização por LTV", "Atribuição multitouch"],
  },
  {
    key: "marketing",
    name: "Solvefy/Marketing",
    color: "hsl(var(--marketing))",
    panelBg: "hsl(var(--marketing-surface))",
    icon: iconMarketing,
    to: "/marketing",
    headline: "Crie jornadas inteligentes",
    desc: "Tudo o que o seu marketing precisa em um só lugar. Com a Solvefy/Marketing, você cria jornadas de relacionamento automatizadas e transforma contatos em vendas.",
    bullets: ["Automações no-code", "Segmentação por comportamento", "A/B test nativo"],
  },
  {
    key: "crm",
    name: "Solvefy/CRM",
    color: "hsl(var(--crm))",
    panelBg: "hsl(var(--crm-surface))",
    icon: iconCrm,
    to: "/crm",
    headline: "Fechamento rápido e sem atritos.",
    desc: "Um funil de vendas claro e integrado nativamente às suas campanhas. Gerencie negociações, acompanhe o histórico de clientes e impulsione a produtividade do seu time de vendas.",
    bullets: ["Kanban de oportunidades", "Discador integrado", "Forecast em tempo real"],
  },
  {
    key: "cloud",
    name: "Solvefy/Cloud",
    color: "hsl(var(--cloud))",
    panelBg: "hsl(var(--cloud-surface))",
    icon: iconCloud,
    to: "/cloud",
    headline: "A 1ª e-Cloud whitelabel do Brasil.",
    desc: "Plataforma E-CLOUD whitelabel on-premises, suporte em ambientes Proxmox VE/PBS/Ceph e consultoria especializada em Docker, Kubernetes e bancos de dados. Do diagnóstico inicial à operação contínua — do zero ao fim do processo.",
    bullets: ["Plataforma Whitelabel On-Premises", "Proxmox Reseller/Partner Oficial", "Criptografia ponta-a-ponta"],
  },
];

export const Solutions = () => {
  const [active, setActive] = useState(0);
  const current = solutions[active];

  return (
    <section id="solucoes" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl text-left mb-14">
          <Heading className="tracking-tighter text-balance leading-[1.1]">
            Closer. Quicker. <span className="text-primary">Better.</span>
          </Heading>
          <SectionSubtitle className="mt-5">
            Pare de dividir sua estratégia em várias ferramentas. Unifique sua comunicação,
            simplifique sua gestão e gere resultados mais rápidos.
          </SectionSubtitle>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Tabs / Cards */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
            {solutions.map((s, i) => {
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
                      <div className="flex-1">
                        <div className="font-semibold text-[#000000]">{s.name}</div>
                        <div className="text-sm text-[#1e1e1e]">{s.headline}</div>
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
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 12 }}
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
                  <img src={current.icon} alt={current.name} className="h-4 w-4 object-contain" width="16" height="16" loading="lazy" />
                  {current.name}
                </div>
                <Heading variant="h3" className="mb-4 text-balance text-[#000000]">
                  {current.headline}
                </Heading>
                <p className="text-[#1e1e1e] text-base md:text-lg leading-snug mb-8">
                  {current.desc}
                </p>
                <ul className="flex flex-wrap gap-3 mb-8">
                  {current.bullets.map((b) => (
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
                    to={current.to}
                    className="inline-flex items-center gap-2 text-sm font-bold text-black transition-transform hover:translate-x-1"
                  >
                    Veja os preços do {current.name}{" "}
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
