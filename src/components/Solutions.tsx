import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import iconCpaas from "@/assets/icons/cpaas-purple.png";
import iconAds from "@/assets/icons/ads-yellow.png";
import iconMarketing from "@/assets/icons/marketing-pink.png";
import iconCrm from "@/assets/icons/crm-orange.png";
import iconCloud from "@/assets/icons/cloud-blue.png";

const solutions = [
  {
    key: "cpaas",
    name: "Solvefy/CPaaS",
    color: "hsl(var(--cpaas))",
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
    icon: iconCloud,
    to: "/cloud",
    headline: "A base que sustenta o seu crescimento.",
    desc: "Infraestrutura em nuvem de alta performance (VMS/VPS). Escale sua operação com total segurança e autonomia operacional, sem se preocupar com quedas de servidores.",
    bullets: ["99.99% SLA", "Edge global", "Criptografia ponta-a-ponta"],
  },
];

export const Solutions = () => {
  const [active, setActive] = useState(0);
  const current = solutions[active];

  return (
    <section id="solucoes" className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-balance leading-[1.1]">
            Closer. Quicker. <span className="text-primary">Better.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground text-balance leading-snug">
            Pare de dividir sua estratégia em várias ferramentas. Unifique sua comunicação,
            simplifique sua gestão e gere resultados mais rápidos.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Tabs / Cards */}
          <div className="lg:col-span-5 space-y-3">
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
                        : "border-border hover:border-foreground/20"
                    }`}
                    style={isActive ? { borderColor: s.color, boxShadow: `0 12px 40px -12px ${s.color}66` } : undefined}
                  >
                    <div
                      className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full transition-all"
                      style={{ background: isActive ? s.color : "transparent" }}
                    />
                    <div className="flex items-center gap-4 pl-2">
                      <div className="flex h-11 w-11 items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                        <img src={s.icon} alt={s.name} className="w-8 h-8 object-contain" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{s.name}</div>
                        <div className="text-sm text-muted-foreground">{s.headline}</div>
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
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl bg-dark text-dark-foreground p-8 md:p-10 overflow-hidden shadow-elegant"
              >
                <div
                  className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-30"
                  style={{ background: current.color }}
                />
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-6"
                  style={{ backgroundColor: `${current.color}26`, color: current.color }}
                >
                  <img src={current.icon} alt={current.name} className="h-4 w-4 object-contain" />
                  {current.name}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4 text-balance">
                  {current.headline}
                </h3>
                <p className="text-dark-foreground/80 text-base md:text-lg leading-snug mb-8">
                  {current.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {current.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm">
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{ backgroundColor: current.color, color: "#0f172a" }}
                      >
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="w-full flex justify-end mt-2">
                  <Link
                    to={current.to}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-transform hover:translate-x-1"
                    style={{ color: current.color }}
                  >
                    Veja os preços do {current.name} <ArrowRight className="h-4 w-4" />
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
