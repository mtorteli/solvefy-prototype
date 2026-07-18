/**
 * JourneyDiagram — layout React/Tailwind do diagrama de jornada
 * Agents (topo) + 4 soluções + canais (direita), com animação cíclica.
 */

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Smartphone,
  Mail,
  Phone,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import iconCpaas     from "@/assets/icons/cpaas.svg";
import iconAds       from "@/assets/icons/ads.svg";
import iconMarketing from "@/assets/icons/marketing.svg";
import iconCrm       from "@/assets/icons/crm.svg";

/* ── Dados ───────────────────────────────────────────────────────────────── */

const SOLUTIONS = [
  {
    id:    "cpaas",
    label: "CPaaS",
    sub:   "Omnichannel",
    icon:  iconCpaas,
    color: "hsl(var(--cpaas))",
    bg:    "hsl(var(--cpaas-surface))",
  },
  {
    id:    "ads",
    label: "Ads",
    sub:   "Aquisição",
    icon:  iconAds,
    color: "hsl(var(--ads))",
    bg:    "hsl(var(--ads-surface))",
  },
  {
    id:    "marketing",
    label: "Marketing",
    sub:   "Nutrição",
    icon:  iconMarketing,
    color: "hsl(var(--marketing))",
    bg:    "hsl(var(--marketing-surface))",
  },
  {
    id:    "crm",
    label: "CRM",
    sub:   "Base de Dados",
    icon:  iconCrm,
    color: "hsl(var(--crm))",
    bg:    "hsl(var(--crm-surface))",
  },
] as const;

const CHANNELS = [
  { id: "sms",   label: "SMS",      Icon: MessageSquare },
  { id: "rcs",   label: "RCS",      Icon: Smartphone    },
  { id: "email", label: "E-mail",   Icon: Mail          },
  { id: "voz",   label: "Voz",      Icon: Phone         },
  { id: "wa",    label: "WhatsApp", Icon: MessageCircle },
] as const;

const STEP_MS   = 2200;   // tempo por solução
const CHAN_MS   = 160;    // intervalo entre canais
const PULSE_MS  = 1300;   // duração do pulso dos Agents

/* ── Ícone inline dos Agents (usa currentColor) ──────────────────────────── */
const AgentsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="14 16 69 71"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="50" cy="52" r="11" />
      <path d="M 30 84 Q 35 69 50 69 Q 57 69 63 75" />
      <path d="M 46 77.5 A 26 26 0 0 0 75.7 56 A 4.5 4.5 0 0 0 75.7 48 A 26 26 0 0 0 24 52" />
      <path d="M 17 44 L 24 52 L 32 47" />
    </g>
  </svg>
);

/* ── Componente ──────────────────────────────────────────────────────────── */
export const JourneyDiagram = () => {
  const [activeSolution, setActiveSolution] = useState<number | null>(0);
  const [activeChannels, setActiveChannels] = useState<Set<number>>(
    new Set()
  );
  const [agentsActive, setAgentsActive] = useState(false);

  /* Ciclo de animação */
  useEffect(() => {
    let running = true;
    let step = 0;

    const advance = () => {
      if (!running) return;

      if (step < SOLUTIONS.length) {
        /* Fase 1 — percorre as soluções */
        setActiveSolution(step);
        setActiveChannels(new Set());
        setAgentsActive(false);
        step++;
        setTimeout(advance, STEP_MS);
      } else {
        /* Fase 2 — fan-out para canais */
        setActiveSolution(null);

        CHANNELS.forEach((_, i) => {
          setTimeout(() => {
            if (!running) return;
            setActiveChannels((prev) => new Set([...prev, i]));

            if (i === CHANNELS.length - 1) {
              /* Pulso dos Agents após último canal */
              setTimeout(() => {
                if (!running) return;
                setAgentsActive(true);
                setTimeout(() => {
                  if (!running) return;
                  setAgentsActive(false);
                  step = 0;
                  setTimeout(advance, 700);
                }, PULSE_MS);
              }, 250);
            }
          }, i * CHAN_MS);
        });
      }
    };

    setTimeout(advance, 500);
    return () => {
      running = false;
    };
  }, []);

  /* Aliases de cor para legibilidade */
  const agentsColor = "hsl(var(--agents))";
  const agentsBg    = "hsl(var(--agents-surface))";
  const agentsTint  = "hsl(var(--agents-tint))";
  const leadColor   = "hsl(var(--lead))";

  return (
    /*
     * ── Container principal ──────────────────────────────────────────────
     * Requisito 2: flex flex-col lg:flex-row items-stretch
     * garante que ambas as colunas partilham exactamente a mesma altura.
     */
    <div className="flex flex-col lg:flex-row items-stretch gap-4">

      {/*
       * ── COLUNA ESQUERDA: Agents + 4 Soluções + label retorno ─────────
       * Requisito 1: flex flex-col gap-4
       * O Agents fica colado acima dos 4 cards sem espaço excessivo.
       */}
      <div className="flex flex-col gap-4 flex-1 min-w-0">

        {/* ── Card Agents ───────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-3 flex items-center gap-3"
          style={{
            borderColor: agentsActive
              ? agentsColor
              : `color-mix(in oklab, ${agentsColor} 30%, transparent)`,
            backgroundColor: agentsActive ? agentsBg : agentsTint,
            boxShadow: agentsActive
              ? `0 0 0 4px color-mix(in oklab, ${agentsColor} 14%, transparent)`
              : undefined,
            transition: "all 0.3s ease",
          }}
        >
          {/* Barra de acento lateral */}
          <div
            className="self-stretch rounded-full shrink-0"
            style={{
              width: agentsActive ? "5px" : "3px",
              backgroundColor: agentsColor,
              transition: "width 0.2s ease",
            }}
          />

          {/* Ícone */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{
              backgroundColor: agentsActive ? agentsColor : agentsBg,
              color: agentsActive ? "#fff" : agentsColor,
              transform: agentsActive ? "scale(1.05)" : "scale(1)",
              transition: "all 0.25s ease",
            }}
          >
            <AgentsIcon />
          </div>

          {/* Textos */}
          <div>
            <p className="text-sm font-bold leading-none text-foreground">
              Agents
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
              Inteligência Artificial
            </p>
          </div>
        </div>

        {/* ── 4 Cards de Solução ────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SOLUTIONS.map((sol, i) => {
            const isActive = activeSolution === i;
            return (
              <div
                key={sol.id}
                className="relative rounded-xl border p-4 flex flex-col gap-2 overflow-hidden"
                style={{
                  borderColor: isActive ? sol.color : `color-mix(in oklab, ${sol.color} 25%, transparent)`,
                  backgroundColor: isActive ? sol.bg : "transparent",
                  boxShadow: isActive
                    ? `0 0 0 2px color-mix(in oklab, ${sol.color} 30%, transparent), 0 4px 16px -4px color-mix(in oklab, ${sol.color} 40%, transparent)`
                    : undefined,
                  transition: "all 0.35s ease",
                }}
              >
                {/* Barra lateral */}
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-l-xl"
                  style={{
                    width: isActive ? "4px" : "3px",
                    backgroundColor: sol.color,
                    transition: "width 0.2s ease",
                  }}
                />

                {/* Ícone */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: isActive ? sol.color : sol.bg,
                    transition: "background-color 0.3s ease",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <img
                    src={sol.icon}
                    alt={sol.label}
                    className="w-5 h-5 object-contain"
                    style={
                      isActive
                        ? { filter: "brightness(0) invert(1)" }
                        : undefined
                    }
                  />
                </div>

                <p className="text-sm font-bold leading-none text-foreground">
                  {sol.label}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {sol.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/*
         * ── Label de retorno ─────────────────────────────────────────
         * Requisito 3: w-full flex items-center justify-center text-center mx-auto
         */}
        <div className="w-full flex items-center justify-center text-center mx-auto">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
            <RotateCcw
              className="h-3 w-3 shrink-0"
              style={{ color: leadColor }}
            />
            dados de retorno · engajamento · conversão
          </div>
        </div>

      </div>

      {/*
       * ── COLUNA DIREITA: Canais ───────────────────────────────────────
       * Requisito 2b: flex flex-col justify-between h-full
       * Os 5 canais distribuem-se verticalmente ocupando exactamente
       * a mesma altura que a coluna esquerda (via items-stretch no pai).
       */}
      <div
        className="flex flex-col justify-between h-full"
        style={{ minWidth: "140px", maxWidth: "176px" }}
      >
        {CHANNELS.map((ch, i) => {
          const isActive = activeChannels.has(i);
          return (
            <div
              key={ch.id}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-medium uppercase tracking-wider"
              style={{
                borderColor: isActive ? leadColor : "hsl(var(--border))",
                backgroundColor: isActive
                  ? `color-mix(in oklab, ${leadColor} 8%, transparent)`
                  : "transparent",
                color: isActive
                  ? "hsl(var(--foreground))"
                  : "hsl(var(--muted-foreground))",
                transform: isActive ? "translateX(2px)" : "translateX(0)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                className="w-[18px] h-[18px] rounded flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: isActive
                    ? leadColor
                    : `color-mix(in oklab, ${leadColor} 15%, transparent)`,
                  color: isActive ? "#fff" : leadColor,
                  transition: "all 0.2s ease",
                }}
              >
                <ch.Icon className="w-2.5 h-2.5" strokeWidth={2} />
              </div>
              {ch.label}
            </div>
          );
        })}
      </div>

    </div>
  );
};
