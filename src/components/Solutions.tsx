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
import iconAgents from "@/assets/icons/agents.svg";

const solutions = [
  {
    key: "cpaas",
    name: "Solvefy/CPaaS",
    color: "hsl(var(--cpaas))",
    panelBg: "hsl(var(--cpaas-surface))",
    icon: iconCpaas,
    to: "/cpaas",
    headline: "Comunicação em Escala.",
    desc: "O coração transacional do ecossistema. É uma plataforma robusta de comunicação via API desenvolvida para empresas que demandam alto volume de disparos. Atua como a engrenagem invisível que também potencializa as outras soluções (como o Solvefy Marketing).",
    bullets: ["Integração via API", "Sem Taxa de Setup", "Cobrança por Volume"],
  },
  {
    key: "ads",
    name: "Solvefy/Ads",
    color: "hsl(var(--ads))",
    panelBg: "hsl(var(--ads-surface))",
    icon: iconAds,
    to: "/ads",
    headline: "Tráfego Direto",
    desc: "Pare de queimar orçamento em plataformas saturadas e leilões inflacionados. A Solvefy/Ads entrega tráfego qualificado de alta performance com total autonomia. Sem bloqueios injustos, sem vínculo com outras redes. Apenas resultados reais e escaláveis.",
    bullets: ["CPA até 20% menor", "CTR de até 35%", "Zero Vínculos"],
  },
  {
    key: "marketing",
    name: "Solvefy/Marketing",
    color: "hsl(var(--marketing))",
    panelBg: "hsl(var(--marketing-surface))",
    icon: iconMarketing,
    to: "/marketing",
    headline: "Jornadas Inteligentes",
    desc: "Tudo o que o seu marketing precisa em um só lugar. Com a Solvefy/Marketing, você cria jornadas de relacionamento automatizadas e transforma contatos em vendas. Use nossos templates de disparo rápido, acompanhe métricas em tempo real e integre tudo facilmente via API.",
    bullets: ["Todos os Canais", "Construtor Visual de Jornadas", "EasyIA"],
  },
  {
    key: "crm",
    name: "Solvefy/CRM",
    color: "hsl(var(--crm))",
    panelBg: "hsl(var(--crm-surface))",
    icon: iconCrm,
    to: "/crm",
    headline: "Gestão Comercial",
    desc: "Sua equipe comercial está deixando dinheiro na mesa? A Solvefy/CRM é a máquina de vendas definitiva para equipes de alta performance. Elimine o vazamento de leads, automatize follow-ups e tenha previsibilidade real de receita. Feche mais negócios em menos tempo.",
    bullets: ["Migração de Dados Gratuita", "Economize 20% vs. Concorrentes", "Implementação em 24h"],
  },
  {
    key: "agents",
    name: "Solvefy/Agents",
    color: "hsl(var(--agents))",
    panelBg: "hsl(var(--agents-surface))",
    icon: iconAgents,
    to: "/agents",
    headline: "Inteligência Artificial",
    desc: "Tenha múltiplos especialistas trabalhando 24/7 na sua operação. De SDRs rodando metodologias adaptadas ao mercado a squads criando conteúdo para as redes sociais, o Agents faz o trabalho operacional para o seu time focar em fechar negócios. Tudo em português e dentro de uma única plataforma.",
    bullets: ["Inteligência Artificial", "Múltiplos Especialistas", "Workspace Ilimitado"],
  },
  {
    key: "cloud",
    name: "Solvefy/Cloud",
    color: "hsl(var(--cloud))",
    panelBg: "hsl(var(--cloud-surface))",
    icon: iconCloud,
    to: "/cloud",
    headline: "Automação de Cloud",
    desc: "Transforme a infraestrutura ociosa do seu Provedor de Internet (ISP) ou Data Center em um negócio rentável. Automatize 100% da venda, o provisionamento e o faturamento de serviços de cloud com a sua marca, sem depender de terceiros.",
    bullets: ["Plataforma White Label On-Premises", "Proxmox Reseller/Partner Oficial", "Do Zero ao Fim do Processo"],
  },
];

export const Solutions = () => {
  const [active, setActive] = useState(0);
  const current = solutions[active];

  return (
    <section id="solucoes" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl text-left mb-14">
          <Heading className="tracking-tighter text-balance leading-[1.1]">
            Próximo. Veloz. <span className="text-primary">Melhor.</span>
          </Heading>
          <SectionSubtitle className="mt-5">
            Pare de dividir sua estratégia em várias ferramentas. Unifique sua comunicação,
            simplifique sua gestão e gere resultados mais rápidos.
          </SectionSubtitle>
        </div>

        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          {/* Tabs / Cards */}
          <div className="md:col-span-5 space-y-3 flex flex-col justify-between">
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
          <div className="md:col-span-7 h-full">
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
                <ul className="flex flex-col gap-2 mb-8">
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
