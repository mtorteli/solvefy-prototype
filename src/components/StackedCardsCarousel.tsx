import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import showcase1 from "@/assets/showcase/showcase-1.jpg";
import showcase2 from "@/assets/showcase/showcase-2.jpg";
import showcase3 from "@/assets/showcase/showcase-3.jpg";

export type StackedSlide = { src: string; alt: string };

export const defaultShowcaseSlides: StackedSlide[] = [
  { src: showcase1, alt: "Vitrine Solvefy 1" },
  { src: showcase2, alt: "Vitrine Solvefy 2" },
  { src: showcase3, alt: "Vitrine Solvefy 3" },
];

type MetricChip = {
  label: string;
  value: string;
  icon?: ReactNode;
  position?: "top-right" | "bottom-left";
};

type BadgeProps = {
  iconSrc: string;
  label: string;
};

type Notification = {
  title: string;
  description?: string;
  icon: "message" | "whatsapp";
};

type Props = {
  /** Hex color for accent (e.g. "hsl(var(--cpaas))") */
  accent: string;
  slides?: StackedSlide[];
  /** Pill badge shown in the bottom-right notification hub. */
  badge?: BadgeProps;
  /** Optional dark-glass notification cards stacked in bottom-right. */
  notifications?: Notification[];
  /** Chips floating around the carousel stage. */
  metrics?: MetricChip[];
  /** Auto-rotation interval in ms. Default 6000. */
  intervalMs?: number;
  /** How the slide image fits its card. Default "cover". */
  imageFit?: "cover" | "contain";
  /** Rendering style: "card" (white rounded card with shadow) or "raw" (image with drop-shadow, no card). */
  variant?: "card" | "raw";
  className?: string;
};

const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFFFFF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFFFFF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
  </svg>
);

export const StackedCardsCarousel = ({
  accent,
  slides = defaultShowcaseSlides,
  badge,
  notifications = [],
  metrics = [],
  intervalMs = 6000,
  imageFit = "cover",
  variant = "card",
  className,
}: Props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const reveal = useReveal();

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  const accentRgba = (alpha: number) => {
    // hex (#rrggbb) to rgba
    const h = accent.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <div
      className={`relative h-[460px] md:h-[520px] flex items-center justify-center ${className ?? ""}`}
      style={{ perspective: "1600px" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] blur-3xl opacity-50"
        style={{
          background: `radial-gradient(ellipse at center, ${accentRgba(0.45)} 0%, transparent 70%)`,
        }}
      />

      {/* Stage */}
      <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {slides.map((slide, i) => {
          const total = slides.length;
          const offset = (i - slideIndex + total) % total;
          const layouts = [
            { x: "0%", y: "0%", scale: 1, opacity: 1, blur: 0, z: 30 },
            { x: "8%", y: "6%", scale: 0.9, opacity: 0.45, blur: 4, z: 20 },
            { x: "-8%", y: "10%", scale: 0.82, opacity: 0.25, blur: 6, z: 10 },
          ];
          const visibleOffset = offset > 2 ? 2 : offset;
          const l = layouts[visibleOffset];

          if (variant === "raw") {
            return (
              <motion.div
                key={slide.src}
                className="absolute inset-0 m-auto flex items-center justify-center"
                style={{ zIndex: l.z }}
                animate={{
                  x: l.x,
                  y: l.y,
                  scale: l.scale,
                  opacity: l.opacity,
                  filter: `blur(${l.blur}px)`,
                }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="max-h-full max-w-full object-contain rounded-2xl"
                  style={{
                    filter:
                      offset === 0
                        ? `drop-shadow(0 30px 60px rgba(0,0,0,0.18)) drop-shadow(0 18px 40px ${accentRgba(0.25)})`
                        : `drop-shadow(0 18px 35px rgba(0,0,0,0.15))`,
                  }}
                  loading="eager"
                  decoding="async"
                />
              </motion.div>
            );
          }

          return (
            <motion.div
              key={slide.src}
              className="absolute inset-0 m-auto h-[88%] w-[86%] rounded-[1.5rem] overflow-hidden bg-white"
              style={{
                zIndex: l.z,
                boxShadow:
                  offset === 0
                    ? `0 45px 110px -20px rgba(0,0,0,0.7), 0 22px 50px -15px ${accentRgba(0.55)}, inset 0 1px 0 rgba(255,255,255,0.14)`
                    : `0 25px 60px -20px rgba(0,0,0,0.55), 0 12px 30px -12px ${accentRgba(0.35)}`,
              }}
              animate={{
                x: l.x,
                y: l.y,
                scale: l.scale,
                opacity: l.opacity,
                filter: `blur(${l.blur}px)`,
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className={`h-full w-full ${imageFit === "contain" ? "object-contain p-4" : "object-cover"}`}
                loading="eager"
                decoding="async"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Floating metric chips around stage */}
      {metrics.map((m, idx) => {
        const pos = m.position ?? (idx % 2 === 0 ? "bottom-left" : "top-right");
        const positionClass =
          pos === "top-right"
            ? "absolute -top-2 -right-2 md:top-6 md:-right-4"
            : "absolute -bottom-2 -left-2 md:bottom-6 md:-left-4";
        return (
          <div
            key={`${m.label}-${idx}`}
            className={`${positionClass} z-40 rounded-xl bg-gray-900/80 backdrop-blur-xl border border-white/10 px-3.5 py-2.5 shadow-2xl`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: accentRgba(0.15), color: accent }}
              >
                {m.icon ?? <Zap className="h-4 w-4" />}
              </div>
              <div className="leading-tight">
                <div className="text-[9px] uppercase tracking-wider text-gray-400">
                  {m.label}
                </div>
                <div className="text-sm font-bold text-white">{m.value}</div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom-right notification hub */}
      {(notifications.length > 0 || badge) && (
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[240px] md:w-[270px] pointer-events-none flex flex-col items-end gap-2">
          {notifications.map((n, idx) => {
            const isFirst = idx === 0;
            return (
              <motion.div
                key={`${n.title}-${idx}`}
                initial={reveal ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.25 }}
                className={`relative w-full ${
                  isFirst ? "" : "-mt-3 mr-3"
                } flex items-stretch rounded-xl overflow-hidden backdrop-blur-xl shadow-[0_24px_55px_-15px_rgba(0,0,0,0.7)]`}
                style={{
                  backgroundColor: isFirst
                    ? "rgba(26,16,51,0.82)"
                    : "rgba(26,16,51,0.88)",
                  border: `1px solid ${accentRgba(0.3)}`,
                }}
              >
                <div
                  className="flex items-center justify-center px-3"
                  style={{ borderRight: `1px solid ${accentRgba(0.2)}` }}
                >
                  {n.icon === "whatsapp" ? <WhatsappIcon /> : <MessageIcon />}
                </div>
                <div className="flex-1 px-3 py-2.5">
                  <div className="text-[13px] font-semibold text-white leading-tight">
                    {n.title}
                  </div>
                  {n.description && (
                    <div className="mt-0.5 text-[11px] text-white/70 leading-snug">
                      {n.description}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {badge && (
            <motion.div
              initial={reveal ? { opacity: 0, y: 4 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + notifications.length * 0.25 + 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border backdrop-blur-xl px-3 py-1.5 text-[11px] font-medium shadow-lg"
              style={{
                backgroundColor: "rgba(20,16,40,0.65)",
                borderColor: accentRgba(0.4),
                color: accent,
              }}
            >
              <img src={badge.iconSrc} alt="" className="h-3.5 w-3.5" />
              {badge.label}
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: accent }}
              />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
