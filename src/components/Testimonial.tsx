import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useReveal } from "@/hooks/useReveal";
import augustoPhoto from "@/assets/photo-augusto.webp";
import deivePhoto from "@/assets/photo-deive.webp";

const tabImages = {
  chapecoense: augustoPhoto,
  deive: deivePhoto,
} as const;

type TabId = keyof typeof tabImages;
const TAB_IDS: TabId[] = ["chapecoense", "deive"];

export const Testimonial = () => {
  const { t } = useTranslation("home");
  const [active, setActive] = useState<TabId>(TAB_IDS[0]);
  const reveal = useReveal();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={reveal ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-12 gap-10 md:gap-16 items-center"
        >
          {/* Left Column — Photo */}
          <div className="md:col-span-4 flex justify-center">
            <div className="w-full max-w-xs">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={tabImages[active]}
                  alt={t(`testimonials.items.${active}.author`)}
                  initial={reveal ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                  width={800}
                  height={1000}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column — Tabs + Quote + Author */}
          <div className="md:col-span-8 flex flex-col">
            {/* Tabs */}
            <div
              role="tablist"
              aria-label={t("testimonials.ariaLabel")}
              className="flex flex-wrap gap-x-10 gap-y-3 border-b border-border/60"
            >
              {TAB_IDS.map((id) => {
                const isActive = id === active;
                return (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(id)}
                    className={`relative pb-4 text-base md:text-lg tracking-tight transition-colors ${
                      isActive
                        ? "font-bold text-foreground"
                        : "font-medium text-gray-500 hover:text-foreground/80"
                    }`}
                  >
                    {t(`testimonials.items.${id}.label`)}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-[320px] md:min-h-[280px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={active}
                  initial={reveal ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full"
                >
                  <blockquote className="mt-8 text-lg md:text-xl font-light leading-snug text-foreground/80 text-balance">
                    "{t(`testimonials.items.${active}.quote`)}"
                  </blockquote>

                  <div className="mt-8">
                    <div className="text-base md:text-lg font-bold text-foreground">
                      {t(`testimonials.items.${active}.author`)}
                    </div>
                    <div className="text-sm md:text-base font-normal text-muted-foreground mt-1">
                      {t(`testimonials.items.${active}.role`)}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
