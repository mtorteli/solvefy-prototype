import { useState } from "react";
import { Play, X } from "lucide-react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema } from "@/lib/schemas";
import { Footer } from "@/components/Footer";
import { Heading, SectionSubtitle } from "@/components/ui/Typography";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import somosOsSolvers from "@/assets/somos-os-solvers.png";
import solversHero from "@/assets/solvers-hero.png";
import logoSolvefyDark from "@/assets/logo-solvefy-dark.png";
import iconCloud from "@/assets/icons/cloud.svg";
import iconMarketing from "@/assets/icons/marketing.svg";
import iconCrm from "@/assets/icons/crm.svg";

const values = [
  {
    icon: iconCloud,
    color: "hsl(var(--cloud))",
    titleStart: "Senso de ",
    titleAccent: "Dono",
    desc: "Nosso compromisso vai além de entregar tarefas; nós assumimos a responsabilidade pelos resultados. Abraçamos os desafios da empresa e dos nossos clientes como se fossem nossos. É essa postura de quem cuida do negócio, antecipa necessidades e foca na excelência da execução que garante o crescimento de todos. Não terceirizamos problemas: se algo precisa ser resolvido, nós assumimos a frente e resolvemos de verdade.",
  },
  {
    icon: iconMarketing,
    color: "hsl(var(--marketing))",
    titleStart: "Livre ",
    titleAccent: "Iniciativa",
    desc: "Não esperamos as coisas acontecerem; nós fazemos acontecer. Temos a liberdade, a autonomia e a confiança necessárias para criar soluções reais, simplificar caminhos e agir com inteligência. Valorizamos a atitude de quem usa a inovação para ganhar velocidade e tem a coragem de propor novas ideias. Aqui, transformar a complexidade em decisões melhores é responsabilidade de cada um.",
  },
  {
    icon: iconCrm,
    color: "hsl(var(--crm))",
    titleStart: "Comunicação ",
    titleAccent: "Horizontal",
    desc: "Nossas relações são baseadas na proximidade, na clareza e na transparência. Nos comunicamos de forma direta, aberta e sem burocracias ou barreiras. Acreditamos que a inteligência é coletiva e que as melhores soluções nascem quando as pessoas têm voz ativa, independentemente de cargos. O diálogo franco e a visão humana são os alicerces que constroem a verdadeira confiança em nossos times.",
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
        ogImage="/og/og-quem-somos.jpg"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Quem Somos", path: "/quem-somos" },
          ]),
        ]}
      />
      <Header />
      <main id="main" className="flex-1">
        {/* Bloco 1: Hero */}
        <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
          <img
            src={solversHero}
            alt="Equipe Solvers"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 container mx-auto h-full w-full flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-2xl text-center mx-auto">
              <h1 className="sr-only">Somos os Solvers</h1>
              <img
                src={somosOsSolvers}
                alt="Somos os Solvers"
                className="block h-12 md:h-16 lg:h-20 w-auto object-contain drop-shadow-lg mx-auto"
              />
              <p className="max-w-xl mt-8 md:mt-10 text-white/95 font-light leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] mx-auto">
                Existimos para acelerar resultados reais ao unir tecnologia, estratégia e clareza humana.
                Eliminamos a burocracia e a frieza para entregar execução ágil e parcerias próximas,
                transformando complexidade em vantagem competitiva e crescimento direto.
              </p>
            </div>
          </div>
        </section>

        {/* Bloco 2: Manifesto */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl mx-auto text-base md:text-lg leading-snug text-[#1e1e1e] text-left font-light">
              <h2 className="sr-only">Manifesto Solvers</h2>
              <div className="space-y-6">
                <p className="font-light">
                  Embora a tecnologia, os negócios e as relações tenham se transformado, uma necessidade continua a mesma:
                  contar com quem resolve de verdade. Foi por isso que chegamos até aqui e é por isso que seguimos em frente.
                </p>
                <p className="font-light">
                  A Solvefy nasce como a evolução natural de uma trajetória construída à base de confiança, proximidade e
                  resultados consistentes. Somos uma nova marca criada para representar com ainda mais clareza a nossa essência:
                  simplificar caminhos, aproximar pessoas e entregar soluções eficientes.
                </p>
                <p className="font-light">
                  Acreditamos que a tecnologia importa, mas acreditamos ainda mais em pessoas. São elas que entendem os contextos,
                  antecipam as necessidades e transformam os desafios em decisões melhores. Por isso, usamos a inovação para ganhar
                  velocidade, inteligência e escala sem abrir mão do atendimento próximo e da relação humana.
                </p>
                <p className="font-light">
                  Trabalhamos com senso de dono e agimos com iniciativa. Nossa comunicação é direta e sem barreiras, pois sabemos
                  que a confiança se constrói com transparência e os resultados se alcançam com atitude.
                </p>
                <p className="font-light">
                  Mudamos de nome, evoluímos em estrutura e expandimos nossa visão. Apesar de todo esse movimento, permanecemos
                  fiéis ao que sempre nos trouxe até aqui: a parceria verdadeira, a excelência na execução e o compromisso com
                  cada cliente. Mantemos a mesma essência, agora com um nome que traduz perfeitamente o que fazemos todos os dias.
                </p>
              </div>

              <div className="mt-16 pt-10 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <img
                  src={logoSolvefyDark}
                  alt="Solvefy"
                  className="h-6 w-auto object-contain opacity-20 grayscale"
                />
                <p className="text-base md:text-lg font-medium tracking-tight m-0">
                  <span className="text-black">Resolvemos com inteligência. </span>
                  <span className="text-[hsl(var(--solve-green))]">Crescemos com você.</span>
                </p>
              </div>

              {/* Vídeo institucional — abaixo do manifesto, tamanho reduzido */}
              <div className="mt-12">
                <button
                  onClick={() => setVideoOpen(true)}
                  className="group relative w-full max-w-2xl mx-auto block rounded-2xl overflow-hidden shadow-elegant aspect-video focus:outline-none focus:ring-4 focus:ring-primary/40"
                  aria-label="Assistir vídeo institucional Solvefy"
                >
                  <img
                    src="/images/solvefy-capa.png"
                    alt="Vídeo institucional Solvefy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 md:h-7 md:w-7 ml-1" fill="currentColor" />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
            <DialogContent className="max-w-4xl p-0 border-0 bg-black overflow-hidden">
              <DialogClose className="absolute right-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors">
                <X className="h-5 w-5" />
                <span className="sr-only">Fechar</span>
              </DialogClose>
              <div className="aspect-video w-full bg-black">
                <video
                  src="/video-institucional.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
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
                  className="group flex flex-col items-start rounded-2xl border border-border bg-card p-8 hover:shadow-elegant transition-all duration-300"
                  style={{ ["--card-accent" as any]: v.color }}
                >
                  <div
                    className="flex items-center justify-center h-10 w-10 rounded-xl mb-5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${v.color}1A` }}
                  >
                    <img src={v.icon} alt="" className="h-7 w-7 object-contain" />
                  </div>
                  <Heading variant="h3" className="text-left">
                    {v.titleStart}
                    <span style={{ color: v.color }}>{v.titleAccent}</span>
                  </Heading>
                  <p className="mt-3 text-muted-foreground leading-snug text-left">{v.desc}</p>
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
