import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import imgWhatsapp from "@/assets/marketing-channels/whatsapp.png";
import imgRcs from "@/assets/marketing-channels/rcs.png";
import imgSms from "@/assets/marketing-channels/sms.png";
import imgVoz from "@/assets/marketing-channels/voz.png";

const CHANNELS = [
  { key: "whatsapp", label: "WhatsApp", img: imgWhatsapp },
  { key: "sms",      label: "SMS",      img: imgSms },
  { key: "rcs",      label: "RCS",      img: imgRcs },
  { key: "voz",      label: "Voz",      img: imgVoz },
] as const;

const ACCENT = "hsl(var(--marketing))";
const INTERVAL = 5000;

export const MarketingChannelCarousel = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setActive((p) => (p + 1) % CHANNELS.length), INTERVAL);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Image area */}
      <div className="relative w-[360px] sm:w-[440px] lg:w-[500px]" style={{ aspectRatio: "580/760" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={CHANNELS[active].img}
            alt={CHANNELS[active].label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
          />
        </AnimatePresence>
      </div>

      {/* Channel tabs */}
      <div className="flex items-center gap-2">
        {CHANNELS.map(({ key, label }, i) => (
          <button
            key={key}
            onClick={() => setActive(i)}
            className="rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200"
            style={
              i === active
                ? { backgroundColor: ACCENT, color: "#fff", boxShadow: `0 4px 14px -4px ${ACCENT}80` }
                : { backgroundColor: `${ACCENT}18`, color: ACCENT }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-1.5">
        {CHANNELS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              backgroundColor: i === active ? ACCENT : `${ACCENT}40`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
