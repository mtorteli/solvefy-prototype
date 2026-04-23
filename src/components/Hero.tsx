import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroTeam from "@/assets/hero-team.jpg";

export const Hero = () => {
  return (
    <section
      className="relative overflow-hidden bg-background bg-no-repeat bg-cover bg-center md:bg-right"
      style={{ backgroundImage: `url(${heroTeam})` }}
    >
      {/* Left-to-right white wash for text legibility (does not affect right side) */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent pointer-events-none" />

      <div className="container mx-auto relative px-6 py-16 md:py-24">
        <div className="max-w-2xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-black"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Junte-se a 20mil empresas
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05] text-black"
          >
            Mais <span className="text-primary">perto</span> do seu cliente.
            <br />
            Mais <span className="text-primary">rápido</span> para o seu negócio.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-xl text-base md:text-lg font-normal text-black/75 text-balance leading-snug"
          >
            Esqueça isso de múltiplos softwares. Atraia, engaje e converta com um ecossistema de
            comunicação nativamente integrado. Toda a jornada do cliente em uma única plataforma,
            com um único login.
          </motion.p>

        </div>
      </div>
    </section>
  );
};
