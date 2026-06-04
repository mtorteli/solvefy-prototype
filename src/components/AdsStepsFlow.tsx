/**
 * AdsStepsFlow — Jornada animada dos 6 passos da página de Ads.
 * Cards horizontais com destaque direto no card ativo (sem bola animada)
 * e área de texto dinâmica com AnimatePresence.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import {
  Target,
  Settings2,
  Wallet,
  Layers,
  Users,
  ImageIcon,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const ACCENT    = "#F0A800";
const ACCENT_BG = "#FFF7E5";

const CYCLE_MS = 18_000;

const STEPS = [
  { id: "objetivo",        Icon: Target },
  { id: "setup",           Icon: Settings2 },
  { id: "orcamento",       Icon: Wallet },
  { id: "posicionamentos", Icon: Layers },
  { id: "publico",         Icon: Users },
  { id: "criativos",       Icon: ImageIcon },
] as const;

export const AdsStepsFlow = () => {
  const { t } = useTranslation("ads");
  const [activeIdx, setActiveIdx] = useState(0);
  const reveal = useReveal();
  const lastIdxRef = useRef(-1);
  const rafRef     = useRef<number>(0);
  const t0Ref      = useRef<number>(0);

  useEffect(() => {
    const loop = (now: number) => {
      if (!t0Ref.current) t0Ref.current = now;
      const t = ((now - t0Ref.current) % CYCLE_MS) / CYCLE_MS;
      const idx = Math.min(STEPS.length - 1, Math.floor(t * STEPS.length));
      if (idx !== lastIdxRef.current) {
        lastIdxRef.current = idx;
        setActiveIdx(idx);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const active = STEPS[activeIdx];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl text-left mb-12">
          <h2 className="tracking-tight leading-tight text-balance">
            <Trans
              i18nKey="stepsFlow.title"
              ns="ads"
              components={{ accent: <span style={{ color: ACCENT }} /> }}
            />
          </h2>
          <p className="section-subtitle mt-3">{t("stepsFlow.subtitle")}</p>
        </div>

        {/* Grid de 6 cards */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {STEPS.map((step, i) => {
            const isActive = activeIdx === i;
            const Icon = step.Icon;
            return (
              <button
                key={step.id}
                onClick={() => setActiveIdx(i)}
                className="relative focus:outline-none"
              >
                <div
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-4 min-h-[120px] transition-all duration-500"
                  style={
                    isActive
                      ? {
                          borderColor:     ACCENT,
                          backgroundColor: `${ACCENT}0D`,
                          boxShadow:       `0 0 0 2px ${ACCENT}30, 0 8px 24px -8px ${ACCENT}40`,
                        }
                      : {
                          borderColor:     "#e5e7eb",
                          backgroundColor: "transparent",
                        }
                  }
                >
                  <span
                    className="text-[10px] font-black tabular-nums leading-none transition-colors duration-300"
                    style={{ color: isActive ? ACCENT : "#d1d5db" }}
                  >
                    {t(`stepsFlow.items.${step.id}.num`)}
                  </span>

                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? ACCENT    : ACCENT_BG,
                      color:           isActive ? "#1a1a1a" : ACCENT,
                      transform:       isActive ? "scale(1.08)" : "scale(1)",
                    }}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <p
                    className="text-[11px] font-semibold text-center leading-tight transition-colors duration-300"
                    style={{ color: isActive ? ACCENT : "#9ca3af" }}
                  >
                    {t(`stepsFlow.items.${step.id}.title`)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Área de texto dinâmico */}
        <div className="mt-6 min-h-[80px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reveal ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex items-center justify-center text-center px-4 py-4"
            >
              <p className="text-base font-medium leading-relaxed text-foreground max-w-xl">
                {t(`stepsFlow.items.${active.id}.desc`)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
