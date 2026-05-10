/**
 * CpaasChannelFlow — preview draft (não injetado na página ainda)
 *
 * Estrutura:
 *  1. 5 cards em grid responsivo (2 col mobile → 3 tablet → 5 desktop)
 *  2. Bola luminosa varrendo por trás dos cards (z-index 0) a 0.5× (18 s/ciclo)
 *  3. Badge roxa fade-in a partir do topo do card ativo
 *  4. Área de texto dinâmica logo abaixo que troca com AnimatePresence
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  PhoneCall,
  Mail,
  Layers2,
  Zap,
  ShieldCheck,
  Mic2,
  Star,
  Sparkles,
} from "lucide-react";

// SVG oficial do WhatsApp (fonte: brand guide fornecido)
// Aceita React.SVGProps para ser compatível com o mesmo contrato dos ícones Lucide
const WhatsAppIcon = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

// ── Brand constants ────────────────────────────────────────────────────────────
const CPAAS     = "#9C7BFF";   // brand guide CPaaS purple
const CPAAS_BG  = "#E7DBFF";   // CPaaS light surface

// 0.5× do ciclo do ecosistema (9 000 ms) → 18 000 ms
const CYCLE_MS  = 18_000;

// ── Channel data ───────────────────────────────────────────────────────────────
interface Channel {
  id:          string;
  label:       string;
  Icon:        React.ElementType;
  BadgeIcon:   React.ElementType;
  badgeText:   string;
  description: string;
  features:    string[];
}

const CHANNELS: Channel[] = [
  {
    id:          "sms",
    label:       "SMS",
    Icon:        MessageSquare,
    BadgeIcon:   Zap,
    badgeText:   "Alta Entrega",
    description: "Melhor custo benefício para comunicar com velocidade",
    features:    ["Personalizável", "Texto Curto", "Links Diretos"],
  },
  {
    id:          "rcs",
    label:       "RCS",
    Icon:        Layers2,
    BadgeIcon:   ShieldCheck,
    badgeText:   "Verificado",
    description: "Conheça o SMS 2.0: mais rico, mais atrativo e mais rentável",
    features:    ["Use Sua Marca", "Tenha Perfil Verificado", "Botões Interativos"],
  },
  {
    id:          "voz",
    label:       "Disparo de Voz",
    Icon:        PhoneCall,
    BadgeIcon:   Mic2,
    badgeText:   "Alto Engajamento",
    description: "Comunicação humanizada com alto engajamento",
    features:    ["Personalizável", "Chamada Direta para o Cliente", "Integra com SMS"],
  },
  {
    id:          "whatsapp",
    label:       "WhatsApp",
    Icon:        WhatsAppIcon,
    BadgeIcon:   Star,
    badgeText:   "#1 Canal",
    description: "Conte com o canal favorito das empresas para vender",
    features:    ["Perfil Verificado", "Personalizável", "Botões Interativos"],
  },
  {
    id:          "email",
    label:       "E-mail",
    Icon:        Mail,
    BadgeIcon:   Sparkles,
    badgeText:   "Automação",
    description: "Crie jornadas completas com praticidade e automação",
    features:    ["Personalizável", "Botões com Link", "Multimídia"],
  },
];

// ── Component ──────────────────────────────────────────────────────────────────
export const CpaasChannelFlow = () => {
  const [activeIdx, setActiveIdx]   = useState(0);
  const lastIdxRef                  = useRef(-1);
  const containerRef                = useRef<HTMLDivElement>(null);
  const ballRef                     = useRef<HTMLDivElement>(null);
  const rafRef                      = useRef<number>(0);
  const t0Ref                       = useRef<number>(0);

  // ── Animation loop (imperative — zero React re-renders on ball position) ──
  useEffect(() => {
    const loop = (now: number) => {
      if (!t0Ref.current) t0Ref.current = now;
      const t   = ((now - t0Ref.current) % CYCLE_MS) / CYCLE_MS; // 0..1
      const ball = ballRef.current;
      const cont = containerRef.current;

      if (ball && cont) {
        // Move ball across full container width, centered via translateX(-50%)
        ball.style.left = `${t * cont.offsetWidth}px`;

        // Fade in/out at loop edges for clean reset
        let op = 1;
        if (t < 0.02)  op = t / 0.02;
        if (t > 0.95)  op = (1 - t) / 0.05;
        ball.style.opacity = op.toFixed(3);

        // Update active card — only triggers React re-render on change
        const idx = Math.min(CHANNELS.length - 1, Math.floor(t * CHANNELS.length));
        if (idx !== lastIdxRef.current) {
          lastIdxRef.current = idx;
          setActiveIdx(idx);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const active = CHANNELS[activeIdx];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="mb-12 max-w-2xl">
          <h2 className="tracking-tighter leading-tight text-balance">
            Conecte o seu sistema aos{" "}
            <span style={{ color: CPAAS }}>seus clientes</span>
          </h2>
          <p className="section-subtitle mt-4">
            Via API ou interface web, gerencie cada canal de comunicação com
            eficiência e escala.
          </p>
        </div>

        {/* ── Cards + animated glow ── */}
        {/*
            Camadas (z-index):
              0 → bola luminosa (atrás de tudo)
              10 → grid de cards
              20 → badge de topo (acima do card ativo)
        */}
        <div ref={containerRef} className="relative">

          {/* Glow ball — atrás dos cards, nunca capta eventos de mouse */}
          <div
            ref={ballRef}
            aria-hidden
            className="pointer-events-none absolute top-1/2 z-0 rounded-full"
            style={{
              width:      220,
              height:     220,
              marginTop: -110, // centrar verticalmente sem transform para não conflitar com left
              background: `radial-gradient(circle, ${CPAAS}4D 0%, ${CPAAS}1A 40%, transparent 70%)`,
            }}
          />

          {/* Cards */}
          <div className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {CHANNELS.map((ch, i) => {
              const isActive = activeIdx === i;
              return (
                /* pt-8 reserva espaço para o badge flutuar acima do card */
                <div key={ch.id} className="relative pt-8">

                  {/* Badge: fade-in do topo quando o card está ativo */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key={`badge-${ch.id}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y:  0 }}
                        exit={{    opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm"
                        style={{ backgroundColor: CPAAS, color: "#fff" }}
                      >
                        <ch.BadgeIcon className="h-2.5 w-2.5" />
                        {ch.badgeText}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card */}
                  <div
                    className="relative flex min-h-[140px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border bg-card px-4 py-5 text-center transition-all duration-500"
                    style={
                      isActive
                        ? {
                            borderColor:     CPAAS,
                            backgroundColor: `${CPAAS}0D`,
                            boxShadow:       `0 0 0 3px ${CPAAS}2E, 0 16px 40px -10px ${CPAAS}44`,
                          }
                        : {
                            borderColor: "transparent",
                          }
                    }
                  >
                    {/* Barra de destaque lateral esquerda */}
                    <div
                      className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full transition-all duration-400"
                      style={{
                        backgroundColor: CPAAS,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scaleY(1)" : "scaleY(0.4)",
                      }}
                    />

                    {/* Ícone do canal */}
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? CPAAS     : CPAAS_BG,
                        color:           isActive ? "#ffffff" : CPAAS,
                        transform:       isActive ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      <ch.Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    {/* Nome do canal */}
                    <p
                      className="text-sm font-semibold leading-snug tracking-tight transition-colors duration-300"
                      style={{ color: isActive ? CPAAS : undefined }}
                    >
                      {ch.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Área de texto dinâmico ── */}
        {/*
            min-h fixa evita layout shift quando os textos têm comprimentos diferentes.
            AnimatePresence mode="wait" garante que o texto antigo some antes do novo entrar.
        */}
        <div className="mt-8 min-h-[110px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y:  8 }}
              animate={{ opacity: 1, y:  0 }}
              exit={{    opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center text-center rounded-2xl bg-card/60 px-6 py-5"
            >
              {/* Feature pills — topo */}
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {active.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{ backgroundColor: CPAAS_BG, color: CPAAS }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Descrição — abaixo das pills */}
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
