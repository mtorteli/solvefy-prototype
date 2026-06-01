import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import photoAugusto from "@/assets/photo-augusto.webp";
import photoDeive from "@/assets/photo-deive.webp";
import solversHero from "@/assets/solvers-hero.jpg";
import logoAgents from "@/assets/logos/solvefy-agents.png";

const CampanhaAgentsCopa50 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ─── Hero Section ─── */}
      <section
        className="flex-1 pt-16 pb-24 md:pb-32"
        style={{
          backgroundColor: "#060e1e",
          backgroundImage: [
            "radial-gradient(ellipse 120% 80% at 50% -10%, rgba(100,135,196,0.35) 0%, transparent 65%)",
            "repeating-linear-gradient(-55deg, transparent, transparent 28px, rgba(100,135,196,0.04) 28px, rgba(100,135,196,0.04) 56px)",
          ].join(", "),
        }}
      >
        <div className="max-w-[1240px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left: Copy ── */}
            <div className="flex flex-col gap-6">
              {/* Tag badge */}
              <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-[#6487C4]/60 bg-[#6487C4]/15 text-[#6487C4] text-xs font-bold uppercase tracking-widest">
                ⚽ CONVOCAÇÃO OFICIAL: SOLVEFY AGENTS
              </span>

              {/* H1 */}
              <h1 className="font-black tracking-tight text-4xl md:text-5xl lg:text-[52px] leading-[1.1] text-white font-display">
                <span className="text-[#6487C4]">Escale a seleção</span> de agentes de IA e{" "}
                <span className="text-[#6487C4]">coloque sua empresa no topo</span> da tabela.
              </h1>

              {/* Description */}
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-[520px]">
                O mercado não perdoa time sem estratégia. Tire sua operação da zona de rebaixamento
                com o Solvefy Agents. Nós entramos em campo, dominamos as tarefas repetitivas e
                deixamos você livre para levantar a taça do crescimento.
              </p>

              {/* CTA */}
              <div>
                <a
                  href="https://agents.solvefy.com/painel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#6487C4] hover:bg-[#5070b0] text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200"
                >
                  Compre Agora
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* ── Right: Mosaic ── */}
            <div className="flex gap-3 h-[280px] lg:h-[420px]">

              {/* Column Left: solvers-hero full-height */}
              <div className="flex-[1.4] relative rounded-[18px] overflow-hidden">
                <img
                  src={solversHero}
                  alt="Agentes em campo"
                  className="w-full h-full object-cover"
                />
                {/* Dark gradient overlay bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(6,14,30,0.85) 100%)",
                  }}
                />
                {/* Badge top */}
                <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6487C4] text-white text-xs font-bold">
                  ⚽ AGENTES EM CAMPO
                </span>
                {/* Base text */}
                <p className="absolute bottom-4 left-4 right-4 z-10 text-white text-sm font-bold leading-snug">
                  24 horas por dia, 7 dias por semana
                </p>
              </div>

              {/* Column Center: two stacked cards */}
              <div className="flex-[1] flex flex-col gap-3">
                {/* Card top: white */}
                <div className="flex-1 bg-white rounded-[18px] p-5 flex flex-col justify-between">
                  <img
                    src={logoAgents}
                    alt="Solvefy Agents"
                    className="h-7 w-auto object-contain self-start"
                  />
                  <div>
                    <p className="text-gray-900 font-bold text-sm leading-snug mt-3">
                      IA que trabalha enquanto você dorme.
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Automação inteligente de verdade.
                    </p>
                  </div>
                </div>

                {/* Card bottom: blue with photo background */}
                <div className="flex-1 rounded-[18px] overflow-hidden relative bg-[#6487C4] p-5">
                  <img
                    src={photoDeive}
                    alt="Deive"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(100,135,196,0.55)" }}
                  />
                  {/* Text */}
                  <div className="relative z-10 flex flex-col justify-end h-full">
                    <p className="text-white font-bold text-sm leading-snug">
                      FEITO PARA O BRASIL
                    </p>
                    <p className="text-white/80 text-xs mt-0.5">
                      Agentes prontos para sua operação
                    </p>
                  </div>
                </div>
              </div>

              {/* Column Right: photo-augusto full-height */}
              <div className="flex-[1.3] relative rounded-[18px] overflow-hidden">
                <img
                  src={photoAugusto}
                  alt="Solvefy Agents"
                  className="w-full h-full object-cover object-top"
                />
                {/* Blue gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(6,14,30,0.1), rgba(100,135,196,0.5))",
                  }}
                />
                {/* Badge top */}
                <span className="absolute top-4 left-4 z-10 inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
                  Solvefy Agents
                </span>
                {/* Base text */}
                <p className="absolute bottom-4 left-4 right-4 z-10 text-white text-sm font-bold leading-snug">
                  Entre no time dos que automatizam para crescer.
                </p>
              </div>

            </div>
            {/* end mosaic */}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampanhaAgentsCopa50;
