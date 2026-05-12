/**
 * AgentsFlow — exibe os 5 agentes Solvefy com animação cíclica
 * Mesma lógica do CpaasChannelFlow: ciclo 18 000 ms (0.5× do ecossistema),
 * badge fade-in no topo do card ativo, texto dinâmico centralizado abaixo.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  FileText,
  Users,
  BarChart2,
  MessageCircle,
  Zap,
  Sparkles,
  Star,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

// 0.5× do ciclo padrão (9 000 ms) → 18 000 ms
const CYCLE_MS = 18_000;

interface AgentCard {
  id: string;
  number: string;
  label: string;
  Icon: React.ElementType;
  BadgeIcon: React.ElementType;
  badgeText: string;
  description: string;
  tags: string[];
}

const AGENTS: AgentCard[] = [
  {
    id: "sdr",
    number: "01",
    label: "SDR Geral",
    Icon: Target,
    BadgeIcon: TrendingUp,
    badgeText: "SPIN + MEDDPICC",
    description:
      "Faz pesquisa, outreach, discovery e qualificação com base em SPIN e MEDDPICC.",
    tags: ["Prospecção", "Qualificação", "Outreach"],
  },
  {
    id: "proposta",
    number: "02",
    label: "Proposta",
    Icon: FileText,
    BadgeIcon: Zap,
    badgeText: "Em Minutos",
    description:
      "Estrutura narrativas convincentes e cria propostas completas em minutos.",
    tags: ["Narrativa", "Pitch", "Personalizado"],
  },
  {
    id: "social",
    number: "03",
    label: "Squad Social",
    Icon: Users,
    BadgeIcon: Sparkles,
    badgeText: "10 Agentes",
    description:
      "Orquestra 10 agentes para pesquisar, escrever e criar carrosséis para o Instagram e posts para o LinkedIn.",
    tags: ["Instagram", "LinkedIn", "Carrossel"],
  },
  {
    id: "reuniao",
    number: "04",
    label: "Análise de Reunião",
    Icon: BarChart2,
    BadgeIcon: Star,
    badgeText: "Insights IA",
    description:
      "Avalia transcrições de chamadas e gera notas e insights acionáveis para o time.",
    tags: ["Transcrição", "Notas", "Insights"],
  },
  {
    id: "followup",
    number: "05",
    label: "Follow-up",
    Icon: MessageCircle,
    BadgeIcon: ShieldCheck,
    badgeText: "Anti-Silêncio",
    description:
      "Gera sequências de acompanhamento baseadas no histórico, reduzindo perdas por silêncio.",
    tags: ["Sequência", "Histórico", "Retenção"],
  },
];

interface AgentsFlowProps {
  accent?: string;
  accentBg?: string;
}

export const AgentsFlow = ({
  accent = "#6487C4",
  accentBg = "#C8D8F0",
}: AgentsFlowProps = {}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const lastIdxRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const t0Ref = useRef<number>(0);

  useEffect(() => {
    const loop = (now: number) => {
      if (!t0Ref.current) t0Ref.current = now;
      const t = ((now - t0Ref.current) % CYCLE_MS) / CYCLE_MS;
      const idx = Math.min(AGENTS.length - 1, Math.floor(t * AGENTS.length));
      if (idx !== lastIdxRef.current) {
        lastIdxRef.current = idx;
        setActiveIdx(idx);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const active = AGENTS[activeIdx];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <h2 className="tracking-tighter leading-tight text-balance">
            Um time inteiro de{" "}
            <span style={{ color: accent }}>especialistas operando 24/7</span>
          </h2>
          <p className="section-subtitle mt-4">
            Cada agente é treinado para uma missão específica. Juntos, cobrem
            todo o ciclo de vendas e marketing B2B.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {AGENTS.map((agent, i) => {
            const isActive = activeIdx === i;
            return (
              <div key={agent.id} className="relative pt-8">

                {/* Badge */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key={`badge-${agent.id}`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm"
                      style={{ backgroundColor: accent, color: "#fff" }}
                    >
                      <agent.BadgeIcon className="h-2.5 w-2.5" />
                      {agent.badgeText}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Card */}
                <div
                  className="relative flex min-h-[140px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border bg-card px-4 py-5 text-center transition-all duration-500"
                  style={
                    isActive
                      ? {
                          borderColor: accent,
                          backgroundColor: `${accent}0D`,
                          boxShadow: `0 0 0 2px ${accent}30, 0 8px 24px -8px ${accent}40`,
                        }
                      : {
                          borderColor: "#e5e7eb",
                          backgroundColor: "transparent",
                        }
                  }
                >
                  {/* Número */}
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase transition-colors duration-300"
                    style={{ color: isActive ? accent : "#9ca3af" }}
                  >
                    {agent.number}
                  </span>

                  {/* Ícone */}
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? accent : accentBg,
                      color: isActive ? "#ffffff" : accent,
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <agent.Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  {/* Nome */}
                  <p
                    className="text-sm font-semibold leading-snug tracking-tight transition-colors duration-300"
                    style={{ color: isActive ? accent : "#9ca3af" }}
                  >
                    {agent.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Área de texto dinâmico */}
        <div className="mt-8 min-h-[110px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center text-center rounded-2xl bg-card/60 px-6 py-5"
            >
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{ backgroundColor: accentBg, color: accent }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-base font-medium leading-snug text-foreground">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
