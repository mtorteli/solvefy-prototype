/**
 * AgentsFlow — catálogo animado de agentes Solvefy
 * Ciclo 18 000 ms (0.5× do ecossistema), badge fade-in no topo do card ativo,
 * texto descritivo centralizado abaixo.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import {
  Target,
  Crosshair,
  Users,
  BarChart2,
  Zap,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const CYCLE_MS = 18_000;

const AGENTS = [
  { id: "sdr",     Icon: Target,    BadgeIcon: TrendingUp },
  { id: "deal",    Icon: Crosshair, BadgeIcon: Zap },
  { id: "social",  Icon: Users,     BadgeIcon: Sparkles },
  { id: "reuniao", Icon: BarChart2, BadgeIcon: Star },
] as const;

interface AgentsFlowProps {
  accent?: string;
  accentBg?: string;
}

export const AgentsFlow = ({
  accent = "#6487C4",
  accentBg = "#C8D8F0",
}: AgentsFlowProps = {}) => {
  const { t } = useTranslation("agents");
  const [activeIdx, setActiveIdx] = useState(0);
  const reveal = useReveal();
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
  const tags = [
    t(`agentsFlow.agents.${active.id}.t1`),
    t(`agentsFlow.agents.${active.id}.t2`),
    t(`agentsFlow.agents.${active.id}.t3`),
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <h2 className="tracking-tighter leading-tight text-balance">
            <Trans
              i18nKey="agentsFlow.title"
              ns="agents"
              components={{ accent: <span style={{ color: accent }} /> }}
            />
          </h2>
          <p className="section-subtitle mt-4">{t("agentsFlow.subtitle")}</p>
        </div>

        {/* Cards */}
        <div className="relative sm:[mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {AGENTS.map((agent, i) => {
              const isActive = activeIdx === i;
              return (
                <div key={agent.id} className="relative pt-8">
                  {/* Badge */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key={`badge-${agent.id}`}
                        initial={reveal ? { opacity: 0, y: -8 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm"
                        style={{ backgroundColor: accent, color: "#fff" }}
                      >
                        <agent.BadgeIcon className="h-2.5 w-2.5" />
                        {t(`agentsFlow.agents.${agent.id}.badge`)}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card */}
                  <div
                    className="relative flex min-h-[140px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border px-4 py-5 text-center transition-all duration-500"
                    style={
                      isActive
                        ? {
                            borderColor: accent,
                            backgroundColor: `${accent}0D`,
                            boxShadow: `0 0 0 2px ${accent}30, 0 8px 24px -8px ${accent}40`,
                          }
                        : {
                            borderColor: "rgba(229,231,235,0.9)",
                            backgroundColor: "rgba(255,255,255,0.65)",
                            boxShadow: "0 1px 4px 0 rgba(0,0,0,0.05)",
                          }
                    }
                  >
                    {/* Online indicator */}
                    <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      <span className="text-[9px] font-semibold text-emerald-600 tracking-wide">
                        {t("agentsFlow.online")}
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase transition-colors duration-300"
                      style={{ color: isActive ? accent : "#9ca3af" }}
                    >
                      {t(`agentsFlow.agents.${agent.id}.number`)}
                    </span>

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

                    <p
                      className="text-sm font-semibold leading-snug tracking-tight transition-colors duration-300"
                      style={{ color: isActive ? accent : "#9ca3af" }}
                    >
                      {t(`agentsFlow.agents.${agent.id}.label`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Texto dinâmico */}
        <div className="mt-8 min-h-[110px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reveal ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center text-center rounded-2xl bg-card/60 px-6 py-5"
            >
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {tags.map((tag) => (
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
                {t(`agentsFlow.agents.${active.id}.description`)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
