import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import photoAugusto from "@/assets/photo-augusto.webp";
import photoDeive from "@/assets/photo-deive.webp";
import solversHero from "@/assets/solvers-hero.png";
import logoAgents from "@/assets/logos/solvefy-agents.png";

const CampanhaAgentsCopa50 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ─── Hero Section ─── */}
      <section
        className="flex-1"
        style={{
          backgroundColor: "#1a3468",
          backgroundImage: [
            "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(130,165,220,0.30) 0%, transparent 60%)",
            "repeating-linear-gradient(-55deg, transparent, transparent 32px, rgba(255,255,255,0.025) 32px, rgba(255,255,255,0.025) 64px)",
          ].join(", "),
        }}
      >
        {/* ── Texto centralizado ── */}
        <div className="max-w-[780px] mx-auto px-4 md:px-6 pt-16 pb-10 text-center flex flex-col items-center gap-5">

          {/* Tag */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white/90 text-xs font-bold uppercase tracking-widest">
            ⚽ CONVOCAÇÃO OFICIAL: SOLVEFY AGENTS
          </span>

          {/* H1 — regular weight */}
          <h1 className="font-normal text-[28px] md:text-[36px] lg:text-[44px] leading-[1.2] text-white font-display">
            Escale a seleção de agentes de IA e coloque sua empresa{" "}
            <span style={{ color: "#a3c0e8" }}>no topo da tabela.</span>
          </h1>

          {/* Descrição */}
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-[580px]">
            O mercado não perdoa time sem estratégia. Tire sua operação da zona de rebaixamento
            com o Solvefy Agents. Nós entramos em campo, dominamos as tarefas repetitivas e
            deixamos você livre para levantar a taça do crescimento.
          </p>

          {/* CTA */}
          <a
            href="https://agents.solvefy.com/painel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#6487C4] hover:bg-[#5070b0] text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 mt-1"
          >
            Compre Agora
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* ── Mosaico abaixo ── */}
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 pb-16">
          <div className="flex gap-3 h-[260px] md:h-[360px] lg:h-[420px]">

            {/* Coluna esquerda: solvers-hero */}
            <div className="flex-[1.4] relative rounded-[18px] overflow-hidden">
              <img
                src={solversHero}
                alt="Agentes em campo"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(15,25,55,0.88) 100%)" }}
              />
              <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6487C4] text-white text-xs font-bold">
                ⚽ AGENTES EM CAMPO
              </span>
              <p className="absolute bottom-4 left-4 right-4 z-10 text-white text-sm font-semibold leading-snug">
                24 horas por dia, 7 dias por semana
              </p>
            </div>

            {/* Coluna central: dois cards empilhados */}
            <div className="flex-[1] flex flex-col gap-3">
              {/* Card branco */}
              <div className="flex-1 bg-white rounded-[18px] p-5 flex flex-col justify-between">
                <img
                  src={logoAgents}
                  alt="Solvefy Agents"
                  className="h-6 w-auto object-contain self-start"
                />
                <div>
                  <p className="text-gray-900 font-semibold text-sm leading-snug mt-2">
                    IA que trabalha enquanto você dorme.
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Automação inteligente de verdade.
                  </p>
                </div>
              </div>

              {/* Card azul com foto */}
              <div className="flex-1 rounded-[18px] overflow-hidden relative">
                <img
                  src={photoDeive}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0" style={{ background: "rgba(26,52,104,0.65)" }} />
                <div className="relative z-10 flex flex-col justify-end h-full p-5">
                  <p className="text-white font-semibold text-sm leading-snug">
                    FEITO PARA O BRASIL
                  </p>
                  <p className="text-white/75 text-xs mt-0.5">
                    Agentes prontos para sua operação
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna direita: foto-augusto */}
            <div className="flex-[1.3] relative rounded-[18px] overflow-hidden">
              <img
                src={photoAugusto}
                alt="Solvefy Agents"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(26,52,104,0.15), rgba(26,52,104,0.65))" }}
              />
              <span className="absolute top-4 left-4 z-10 inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
                Solvefy Agents
              </span>
              <p className="absolute bottom-4 left-4 right-4 z-10 text-white text-sm font-semibold leading-snug">
                Entre no time dos que automatizam para crescer.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampanhaAgentsCopa50;
