/**
 * AdsStepsFlow — Jornada animada dos 6 passos da página de Ads.
 * Cards horizontais com destaque direto no card ativo (sem bola animada)
 * e área de texto dinâmica com AnimatePresence.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Settings2,
  Wallet,
  Layers,
  Users,
  ImageIcon,
} from "lucide-react";

// ── Brand constants ────────────────────────────────────────────────────────────
const ACCENT    = "#F0A800";  // Ads amber
const ACCENT_BG = "#FFF7E5";  // Ads light surface

// 0.5× do ciclo base (9 000 ms) → 18 000 ms
const CYCLE_MS = 18_000;

// ── Steps data ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id:    "objetivo",
    num:   "01",
    title: "Objetivo",
    icon:  Target,
    desc:  "Defina a meta da campanha e nossa IA sugere automaticamente os criativos e canais mais adequados para cada objetivo.",
  },
  {
    id:    "setup",
    num:   "02",
    title: "Setup",
    icon:  Settings2,
    desc:  "Configure o nome da campanha, o período de veiculação e o segmento-alvo em poucos minutos, sem complexidade técnica.",
  },
  {
    id:    "orcamento",
    num:   "03",
    title: "Orçamento",
    icon:  Wallet,
    desc:  "Defina um limite diário ou total e acompanhe cada centavo investido em tempo real, sem surpresas no fechamento.",
  },
  {
    id:    "posicionamentos",
    num:   "04",
    title: "Posicionamentos",
    icon:  Layers,
    desc:  "Distribua sua verba de forma inteligente em inventário premium e qualificado, maximizando o alcance com CPA controlado.",
  },
  {
    id:    "publico",
    num:   "05",
    title: "Público",
    icon:  Users,
    desc:  "Segmente com precisão usando tags comportamentais e sua própria base de dados (1st party data) para conversões mais altas.",
  },
  {
    id:    "criativos",
    num:   "06",
    title: "Criativos",
    icon:  ImageIcon,
    desc:  "Gere textos, imagens e CTAs com apoio de IA generativa nativa e publique criativos de alta performance sem depender de agência.",
  },
];

// ── Component ──────────────────────────────────────────────────────────────────
export const AdsStepsFlow = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const lastIdxRef                = useRef(-1);
  const rafRef                    = useRef<number>(0);
  const t0Ref                     = useRef<number>(0);

  // ── rAF loop — apenas troca de índice, sem manipulação de DOM extra ────────
  useEffect(() => {
    const loop = (now: number) => {
      if (!t0Ref.current) t0Ref.current = now;
      const t   = ((now - t0Ref.current) % CYCLE_MS) / CYCLE_MS; // 0..1
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
            Da meta ao disparo em{" "}
            <span style={{ color: ACCENT }}>6 passos</span>.
          </h2>
          <p className="section-subtitle mt-3">
            Um fluxo guiado, com IA assistindo cada decisão crítica da campanha.
          </p>
        </div>

        {/* Grid de 6 cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {STEPS.map((step, i) => {
            const isActive = activeIdx === i;
            const Icon     = step.icon;
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
                  {/* Número do passo */}
                  <span
                    className="text-[10px] font-black tabular-nums leading-none transition-colors duration-300"
                    style={{ color: isActive ? ACCENT : "#d1d5db" }}
                  >
                    {step.num}
                  </span>

                  {/* Ícone */}
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

                  {/* Título curto */}
                  <p
                    className="text-[11px] font-semibold text-center leading-tight transition-colors duration-300"
                    style={{ color: isActive ? ACCENT : "#9ca3af" }}
                  >
                    {step.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Área de texto dinâmico — sem borda, centralizado ─────────────────── */}
        <div className="mt-6 min-h-[80px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex items-center justify-center text-center px-4 py-4"
            >
              <p className="text-base font-medium leading-relaxed text-foreground max-w-xl">
                {active.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
