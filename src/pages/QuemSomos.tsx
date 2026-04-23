import { useState } from "react";
import { Play, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
import iconCrm from "@/assets/icons/crm-orange.png";

const values = [
  {
    icon: iconCloud,
    color: "#00cbff",
    titleStart: "Simplicidade que ",
    titleAccent: "Conecta",
    desc: "Acreditamos que o universo da tecnologia não precisa ser frio, robótico ou chato. Traduzimos a complexidade em uma linguagem acessível e humana. Trabalhamos lado a lado, com um tom afirmativo e transparente, construindo parcerias baseadas em proximidade e precisão.",
  },
  {
    icon: iconCpaas,
    color: "#9c7bff",
    titleStart: "Sem ",
    titleAccent: "Rodeios",
    desc: "Não gostamos de perder tempo e sabemos que você também não. Nossa comunicação é clara, ágil e livre de jargões desnecessários. Enquanto o mercado se perde em parágrafos, nós resolvemos em uma linha. Cada palavra nossa tem um propósito: acelerar seu negócio.",
  },
  {
    icon: iconMarketing,
    color: "#e64499",
    titleStart: "Agilidade que ",
    titleAccent: "Impulsiona",
    desc: "Sabemos que no cenário atual da tecnologia, o tempo define quem lidera. Nossa rapidez não é sinônimo de pressa, mas de eficiência, ritmo e prontidão. Porque eliminamos a burocracia e dominamos o que fazemos, retiramos o atrito da execução. Transformamos o nosso tempo de resposta na sua vantagem competitiva.",
  },
  {
    icon: iconCrm,
    color: "#ff6b00",
    titleStart: "Especialistas em ",
    titleAccent: "Impacto",
    desc: "Assumimos nossa posição de especialistas sem espaço para arrogância ou dúvidas. Nosso foco não é o que fazemos, mas o que você ganha com o que entregamos. Trabalhamos com dados, métricas e impacto real. Nossa confiança se baseia na certeza de que entregamos o melhor.",
  },
];

const QuemSomos = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
          <div className="relative z-10 container mx-auto h-full w-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="sr-only">Somos os Solvers</h1>
            <img
              src={somosOsSolvers}
              alt="Somos os Solvers"
              className="mx-auto block h-12 md:h-16 lg:h-20 w-auto object-contain drop-shadow-lg"
            />
            <p className="max-w-3xl mt-8 md:mt-10 text-base md:text-lg text-white/90 leading-snug drop-shadow-lg">
              Existimos para acelerar resultados reais ao unir tecnologia, estratégia e clareza humana.
              Eliminamos a burocracia e a frieza para entregar execução ágil e parcerias próximas,
              transformando complexidade em vantagem competitiva e crescimento direto.
            </p>
          </div>
        </section>

        {/* Bloco 2: Manifesto */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-base md:text-lg leading-snug text-gray-800 text-left font-light">
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
                  Reinventamos a marca, mas a nossa essência resolutiva e a parceria de sempre permanecem intocáveis.
                </p>
                <p className="font-light">Nós estamos mais perto. Nós continuamos rápidos. Nós garantimos o melhor.</p>
              </div>
              <div className="flex flex-col items-center justify-center w-full text-center gap-3 mt-16">
                <img
                  src={logoSolvefyDark}
                  alt="Solvefy"
                  className="block h-5 md:h-6 w-auto m-0 p-0"
                />
                <p className="text-base md:text-lg font-medium tracking-tight m-0">
                  <span className="text-black">closer. quicker. </span>
                  <span className="text-[#75e373]">better.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bloco 3: Modal de Vídeo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <button
              onClick={() => setVideoOpen(true)}
              className="group relative w-full max-w-5xl mx-auto block rounded-2xl overflow-hidden shadow-elegant aspect-video focus:outline-none focus:ring-4 focus:ring-primary/40"
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
          <div className="container mx-auto px-4">
            <div className="text-center w-full mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                Quais são os nossos valores?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
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
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
                    {v.titleStart}
                    <span style={{ color: v.color }}>{v.titleAccent}</span>
                  </h3>
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
