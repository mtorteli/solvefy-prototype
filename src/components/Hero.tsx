import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video/hero-video-v2.mp4";

export const Hero = () => {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "#f6f5ef",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left Column: Content (Expanded) */}
          <div className="md:col-span-7 lg:col-span-8">
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
              Mais <span className="text-primary">perto</span>
              <br />
              do seu cliente.
              <br />
              Mais <span className="text-primary">rápido</span>
              <br />
              para o seu negócio.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-6 text-base md:text-lg font-normal text-black/75 text-balance leading-snug max-w-2xl"
            >
              Esqueça isso de múltiplos softwares. Atraia, engaje e converta com
              um ecossistema de comunicação nativamente integrado. Toda a
              jornada do cliente em uma única plataforma, com um único login.
            </motion.p>
          </div>

          {/* Right Column: Video (Shrinked) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end md:col-span-5 lg:col-span-4"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full object-cover"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
