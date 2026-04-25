import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import augustoPhoto from "@/assets/photo-augusto.webp";
import deivePhoto from "@/assets/photo-deive.webp";

const tabs = [
  {
    id: "chapecoense",
    label: "Chapecoense",
    quote:
      "Nós percebemos que o SMS era um canal bastante eficiente para a nossa necessidade. Precisávamos alcançar o torcedor associado de forma rápida e eficaz para mantê-lo engajado com o Clube. Considerando o investimento, o retorno foi muito positivo!",
    author: "Augusto Dalvit Tonelo",
    role: "Vice-Presidente de Marketing da Chapecoense",
    image: augustoPhoto,
  },
  {
    id: "deive",
    label: "Deive Leonardo",
    quote:
      "Quando fizemos o lançamento do filme A Resposta, a Disparo Pro nos ajudou a alcançar todos os nossos leads e pessoas que fizeram parte da nossa história. Foi o melhor lançamento que pudemos imaginar, e ficamos no Top 10 da Netflix!",
    author: "Deive Leonardo",
    role: "Evangelista e influenciador Digital",
    image: deivePhoto,
  },
];

export const Testimonial = () => {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
                  key={current.id}
                  src={current.image}
                  alt={current.author}
                  initial={{ opacity: 0 }}
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
              aria-label="Depoimentos de clientes"
              className="flex flex-wrap gap-x-10 gap-y-3 border-b border-border/60"
            >
              {tabs.map((t) => {
                const isActive = t.id === active;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(t.id)}
                    className={`relative pb-4 text-base md:text-lg tracking-tight transition-colors ${
                      isActive
                        ? "font-bold text-foreground"
                        : "font-medium text-gray-500 hover:text-foreground/80"
                    }`}
                  >
                    {t.label}
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
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full"
                >
                  <blockquote className="mt-8 text-lg md:text-xl font-light leading-snug text-foreground/80 text-balance">
                    "{current.quote}"
                  </blockquote>

                  <div className="mt-8">
                    <div className="text-base md:text-lg font-bold text-foreground">
                      {current.author}
                    </div>
                    <div className="text-sm md:text-base font-normal text-muted-foreground mt-1">
                      {current.role}
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
