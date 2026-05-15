import { Sparkles } from "lucide-react";
import heroVideo from "@/assets/hero-video/hero-video-v2.mp4";
import { Heading, SectionSubtitle } from "@/components/ui/Typography";

export const Hero = () => {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "#f6f5ef",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Column: Content — sem animações de entrada para preservar LCP */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-black">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Junte-se a 20mil empresas
            </div>

            <Heading variant="h1" className="mt-6 text-balance">
              Mais <span className="text-primary">perto</span>
              <br />
              do seu cliente.
              <br />
              Mais <span className="text-primary">rápido</span> para
              <br />o seu negócio.
            </Heading>

            <SectionSubtitle className="mt-6 max-w-[460px] leading-snug">
              Você não precisa de múltiplos softwares, você só precisa da
              plataforma certa. Com nosso ecossistema de comunicação integrado,
              você faz toda a jornada do cliente em um só lugar. Atrair, engajar
              e converter nunca foi tão simples.
            </SectionSubtitle>
          </div>

          {/* Right Column: Video */}
          <div className="w-full max-w-[320px] lg:max-w-[380px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              width="380"
              height="380"
              className="w-full object-cover"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
