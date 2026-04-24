import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import whatsappImg from "@/assets/channels/whatsapp.png";
import rcsImg from "@/assets/channels/rcs.png";
import smsImg from "@/assets/channels/sms.png";
import vozImg from "@/assets/channels/voz.png";
import emailImg from "@/assets/channels/email.png";

const ACCENT = "hsl(var(--cpaas))";

type Slide = { src: string; alt: string };

const slides: Slide[] = [
  { src: whatsappImg, alt: "WhatsApp Oficial" },
  { src: rcsImg, alt: "RCS" },
  { src: smsImg, alt: "SMS" },
  { src: vozImg, alt: "Voz" },
  { src: emailImg, alt: "E-mail" },
];

const accentRgba = (alpha: number) => {
  const h = ACCENT.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

export const ChannelsCarousel = () => {
  const [active, setActive] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % total), 6000);
    return () => window.clearInterval(id);
  }, [total]);

  return (
    <div
      className="relative h-[460px] md:h-[520px] flex items-center justify-center w-full"
      style={{ perspective: "1600px" }}
    >
      {/* Ambient glow — same vibe as Hero */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] blur-3xl opacity-50"
        style={{
          background: `radial-gradient(ellipse at center, ${accentRgba(0.35)} 0%, transparent 70%)`,
        }}
      />

      {/* Stage — stacked cards identical to Hero */}
      <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {slides.map((slide, i) => {
          const offset = (i - active + total) % total;

          // Same 3-layer logic as the Hero StackedCardsCarousel
          const layouts = [
            { x: "0%", y: "0%", scale: 1, opacity: 1, blur: 0, z: 30 },
            { x: "8%", y: "6%", scale: 0.9, opacity: 0.45, blur: 4, z: 20 },
            { x: "-8%", y: "10%", scale: 0.82, opacity: 0.25, blur: 6, z: 10 },
          ];
          const visibleOffset = offset > 2 ? 2 : offset;
          const l = layouts[visibleOffset];

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
        })}
      </div>
    </div>
  );
};
