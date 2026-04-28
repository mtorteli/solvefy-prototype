import { useState } from "react";
import { Play, X } from "lucide-react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { Heading, SectionSubtitle } from "@/components/ui/Typography";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import somosOsSolvers from "@/assets/somos-os-solvers.png";
import solversHero from "@/assets/solvers-hero.jpg";
import logoSolvefyDark from "@/assets/logo-solvefy-dark.png";
import solversLogoBlack from "@/assets/solvers-logo-black.png";
import manifestoSolvers from "@/assets/manifesto-solvers.png";
import videoThumbnail from "@/assets/video-thumbnail.jpg";
import iconCloud from "@/assets/icons/cloud-blue.png";
import iconCpaas from "@/assets/icons/cpaas-purple.png";
import iconMarketing from "@/assets/icons/marketing-pink.png";
import iconCrm from "@/assets/icons/crm-dark.png";

const values = [
  {
    icon: iconCloud,
    color: "hsl(var(--cloud))",
    titleStart: "Simplicidade que ",
    titleAccent: "Conecta",
    desc: "Acreditamos que o universo da tecnologia não precisa ser frio, robótico ou chato. Traduzimos a complexidade em uma linguagem acessível e humana. Trabalhamos lado a lado, com um tom afirmativo e transparente, construindo parcerias baseadas em proximidade e precisão.",
  },
  {
    icon: iconCpaas,
    color: "hsl(var(--cpaas))",
    titleStart: "Sem ",
    titleAccent: "Rodeios",
    desc: "Não gostamos de perder tempo e sabemos que você também não. Nossa comunicação é clara, ágil e livre de jargões desnecessários. Enquanto o mercado se perde em parágrafos, nós resolvemos em uma linha. Cada palavra nossa tem um propósito: acelerar seu negócio.",
  },
  {
    icon: iconMarketing,
    color: "hsl(var(--marketing))",
    titleStart: "Agilidade que ",
    titleAccent: "Impulsiona",
    desc: "Sabemos que no cenário atual da tecnologia, o tempo define quem lidera. Nossa rapidez não é sinônimo de pressa, mas de eficiência, ritmo e prontidão. Porque eliminamos a burocracia e dominamos o que fazemos, retiramos o atrito da execução. Transformamos o nosso tempo de resposta na sua vantagem competitiva.",
  },
  {
    icon: iconCrm,
    color: "hsl(var(--crm))",
    titleStart: "Especialistas em ",
    titleAccent: "Impacto",
    desc: "Assumimos nossa posição de especialistas sem espaço para arrogância ou dúvidas. Nosso foco não é o que fazemos, mas o que você ganha com o que entregamos. Trabalhamos com dados, métricas e impacto real. Nossa confiança se baseia na certeza de que entregamos o melhor.",
  },
];

const QuemSomos = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Quem Somos — A Solvefy"
        description="Conheça a Solvefy, a plataforma B2B que nasceu para simplificar a comunicação entre empresas e seus clientes. Nossa missão, valores e time."
        canonical="/quem-somos"
      />
      <Header />
      <main className="flex-1">
        {/* Bloco 1: Hero */}
        <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
          <img
            src={solversHero}
            alt="Equipe Solvers"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 container mx-auto h-full w-full flex flex-col items-start justify-center text-left px-4">
            <h1 className="sr-only">Somos os Solvers</h1>
            <img
              src={somosOsSolvers}
              alt="Somos os Solvers"
              className="block h-12 md:h-16 lg:h-20 w-auto object-contain drop-shadow-lg"
            />
            <SectionSubtitle as="p" className="max-w-4xl mt-8 md:mt-10 text-white/90 drop-shadow-lg">
              Existimos para acelerar resultados reais ao unir tecnologia, estratégia e clareza humana.
              Eliminamos a burocracia e a frieza para entregar execução ágil e parcerias próximas,
              transformando complexidade em vantagem competitiva e crescimento direto.
            </SectionSubtitle>
          </div>
        </section>

        {/* Bloco 2: Manifesto */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-base md:text-lg leading-snug text-gray-800 text-left font-light">
              <h2 className="sr-only">Manifesto Solvers</h2>
              <img
                src={manifestoSolvers}
                alt="Manifesto Solvers"
                className="h-8 md:h-10 w-auto object-contain"
              />
              <div className="space-y-6 mt-16">
                <p className="font-light">
                  Viemos para simplificar o que o mercado insistiu em complicar. Acreditamos que a tecnologia é o meio,
                  mas a relação humana é o fundamento.
                </p>
                <p className="font-light">
                  Embora nossas mesas estejam em diferentes coordenadas, temos uma só direção, e estamos conectados por um
                  objetivo único: aproximar pessoas e negócios. Para nós, a distância física não é barreira; é o que nos
                  move a sermos especialistas em tecnologia.
                </p>
                <p className="font-light">
                  Não gostamos de perder tempo. Falamos a real, sem rodeios e sem jargões, traduzindo complexidade em
                  agilidade. A Solvefy chega para dar nome ao que a gente já faz com excelência há duas décadas.
                </p>
              </div>

              <div className="mt-16 pt-10 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <img
                  src={logoSolvefyDark}
                  alt="Solvefy"
                  className="h-6 w-auto object-contain opacity-20 grayscale"
                />
                <p className="text-base md:text-lg font-medium tracking-tight m-0">
                  <span className="text-black">closer. quicker. </span>
                  <span className="text-[hsl(var(--solve-green))]">better.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bloco 3: Modal de Vídeo */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <button
              onClick={() => setVideoOpen(true)}
              className="group relative w-full max-w-5xl block rounded-2xl overflow-hidden shadow-elegant aspect-video focus:outline-none focus:ring-4 focus:ring-primary/40"
              aria-label="Assistir vídeo institucional Solvefy"
            >
              <img
                src={videoThumbnail}
                alt="Vídeo institucional Solvefy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-8 w-8 md:h-10 md:w-10 ml-1" fill="currentColor" />
                </span>
              </div>
            </button>
          </div>

          <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
            <DialogContent className="max-w-4xl p-0 border-0 bg-black overflow-hidden">
              <DialogClose className="absolute right-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors">
                <X className="h-5 w-5" />
                <span className="sr-only">Fechar</span>
              </DialogClose>
              <div className="aspect-video w-full flex items-center justify-center bg-black text-white/60">
                <p className="text-sm">Espaço reservado para o vídeo institucional</p>
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {/* Bloco 4: Nossos Valores */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-left w-full mb-12">
              <Heading className="leading-tight">
                Quais são os nossos valores?
              </Heading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {values.map((v) => (
                <article
                  key={v.titleAccent}
                  className="group rounded-2xl border border-border bg-card p-8 hover:shadow-elegant transition-all duration-300 text-left"
                  style={{ ["--card-accent" as any]: v.color }}
                >
                  <div
                    className="flex items-center justify-center h-12 w-12 rounded-xl mb-5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${v.color}1A` }}
                  >
                    <img src={v.icon} alt="" className="h-6 w-6 object-contain" />
                  </div>
                  <Heading variant="h3">
                    {v.titleStart}
                    <span style={{ color: v.color }}>{v.titleAccent}</span>
                  </Heading>
                  <p className="mt-3 text-muted-foreground leading-snug">{v.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuemSomos;
