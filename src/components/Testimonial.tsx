import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import augustoPhoto from "@/assets/testimonial-augusto.jpg";
import deivePhoto from "@/assets/deive-leonardo.jpg";

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
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-12 gap-10 md:gap-16 items-center max-w-6xl mx-auto"
        >
          {/* Left Column — Image with decorative stacked shapes */}
          <div className="md:col-span-4">
            <div className="relative w-full max-w-xs mx-auto md:mx-0">
              {/* Beige decorative card (back) */}
              <div
                className="absolute -left-8 -bottom-8 w-full h-full rounded-2xl bg-[hsl(35_40%_82%)]"
                aria-hidden="true"
              />
              {/* Green decorative card (middle) */}
              <div
                className="absolute -left-4 -bottom-4 w-full h-full rounded-2xl bg-primary"
                aria-hidden="true"
              />
              {/* Photo (front) — fade between tabs */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-muted">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    src={current.image}
                    alt={current.author}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    width={800}
                    height={1000}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column — Tabs + Quote + Author */}
          <div className="md:col-span-8 min-h-[360px] flex flex-col">
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
                    <span
                      className={`absolute left-0 right-0 -bottom-px h-0.5 rounded-full transition-colors ${
                        isActive ? "bg-foreground" : "bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <blockquote className="mt-8 text-lg md:text-xl font-normal leading-snug text-foreground/80 text-balance">
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
        </motion.div>
      </div>
    </section>
  );
};
