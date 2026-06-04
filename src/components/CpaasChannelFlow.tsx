/**
 * CpaasChannelFlow — canal animado multi-produto
 *
 * Estrutura:
 *  1. 5 cards em grid responsivo
 *  2. Destaque direto no card ativo (borda colorida, ícone, badge)
 *  3. Badge fade-in a partir do topo do card ativo
 *  4. Área de texto dinâmica logo abaixo que troca com AnimatePresence
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
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
import { useReveal } from "@/hooks/useReveal";

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

const CYCLE_MS = 18_000;

interface CpaasChannelFlowProps {
  accent?: string;
  accentBg?: string;
}

const CHANNEL_META = [
  { id: "sms",      Icon: MessageSquare, BadgeIcon: Zap },
  { id: "rcs",      Icon: Layers2,       BadgeIcon: ShieldCheck },
  { id: "voz",      Icon: PhoneCall,     BadgeIcon: Mic2 },
  { id: "whatsapp", Icon: WhatsAppIcon,  BadgeIcon: Star },
  { id: "email",    Icon: Mail,          BadgeIcon: Sparkles },
] as const;

export const CpaasChannelFlow = ({
  accent   = "#9C7BFF",
  accentBg = "#E7DBFF",
}: CpaasChannelFlowProps = {}) => {
  const { t } = useTranslation("cpaas");
  const [activeIdx, setActiveIdx] = useState(0);
  const reveal = useReveal();
  const lastIdxRef                = useRef(-1);
  const rafRef                    = useRef<number>(0);
  const t0Ref                     = useRef<number>(0);

  useEffect(() => {
    const loop = (now: number) => {
      if (!t0Ref.current) t0Ref.current = now;
      const t   = ((now - t0Ref.current) % CYCLE_MS) / CYCLE_MS;
      const idx = Math.min(CHANNEL_META.length - 1, Math.floor(t * CHANNEL_META.length));
      if (idx !== lastIdxRef.current) {
        lastIdxRef.current = idx;
        setActiveIdx(idx);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const active = CHANNEL_META[activeIdx];
  const features = [
    t(`channelFlow.channels.${active.id}.f1`),
    t(`channelFlow.channels.${active.id}.f2`),
    t(`channelFlow.channels.${active.id}.f3`),
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <h2 className="tracking-tighter leading-tight text-balance">
            <Trans
              i18nKey="channelFlow.title"
              ns="cpaas"
              components={{ accent: <span style={{ color: accent }} /> }}
            />
          </h2>
          <p className="section-subtitle mt-4">{t("channelFlow.subtitle")}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CHANNEL_META.map((ch, i) => {
            const isActive = activeIdx === i;
            return (
              <div key={ch.id} className="relative pt-8">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key={`badge-${ch.id}`}
                      initial={reveal ? { opacity: 0, y: -8 } : false}
                      animate={{ opacity: 1, y:  0 }}
                      exit={{    opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm"
                      style={{ backgroundColor: accent, color: "#fff" }}
                    >
                      <ch.BadgeIcon className="h-2.5 w-2.5" />
                      {t(`channelFlow.channels.${ch.id}.badge`)}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  className="relative flex min-h-[140px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border bg-card px-4 py-5 text-center transition-all duration-500"
                  style={
                    isActive
                      ? {
                          borderColor:     accent,
                          backgroundColor: `${accent}0D`,
                          boxShadow:       `0 0 0 2px ${accent}30, 0 8px 24px -8px ${accent}40`,
                        }
                      : {
                          borderColor:     "#e5e7eb",
                          backgroundColor: "transparent",
                        }
                  }
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? accent    : accentBg,
                      color:           isActive ? "#ffffff" : accent,
                      transform:       isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <ch.Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <p
                    className="text-sm font-semibold leading-snug tracking-tight transition-colors duration-300"
                    style={{ color: isActive ? accent : "#9ca3af" }}
                  >
                    {t(`channelFlow.channels.${ch.id}.label`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 min-h-[110px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reveal ? { opacity: 0, y:  8 } : false}
              animate={{ opacity: 1, y:  0 }}
              exit={{    opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center text-center rounded-2xl bg-card/60 px-6 py-5"
            >
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{ backgroundColor: accentBg, color: accent }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <p className="text-base font-medium leading-snug text-foreground">
                {t(`channelFlow.channels.${active.id}.description`)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
