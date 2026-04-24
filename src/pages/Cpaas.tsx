import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Bell,
  Megaphone,
  Wallet,
  KeyRound,
  Globe2,
  Headphones,
  Banknote,
  Network,
  Layers,
  Zap,
  Lock,
  FileCheck2,
  Check,
  Send,
  CheckCheck,
  Code2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import iconCpaas from "@/assets/icons/cpaas-purple.png";

import systemShot1 from "@/assets/system/disparo-simples.png";
import systemShot2 from "@/assets/system/disparo-simples-1.png";
import systemShot3 from "@/assets/system/disparo-simples-2.png";
import cpaasHero1 from "@/assets/cpaas-hero/hero-1.png";
import cpaasHero2 from "@/assets/cpaas-hero/hero-2.png";
import cpaasHero3 from "@/assets/cpaas-hero/hero-3.png";
import { StackedCardsCarousel, type StackedSlide } from "@/components/StackedCardsCarousel";
import { UseCasesSelector } from "@/components/UseCasesSelector";
import { ChannelsCarousel } from "@/components/ChannelsCarousel";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";

const ACCENT = "hsl(var(--cpaas))";

const useCases = [
  {
    icon: ShieldCheck,
    title: "Autenticação (OTP)",
    desc: "Confirme cadastros e logins via SMS, WhatsApp ou Flash Call OTP com altíssima taxa de entrega.",
  },
  {
    icon: Bell,
    title: "Notificações",
    desc: "Status de pedidos, agendamentos e atualizações críticas que chegam ao cliente em segundos.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    desc: "Campanhas multimídia via RCS ou WhatsApp com taxas de abertura acima de 95%.",
  },
  {
    icon: Wallet,
    title: "Cobrança",
    desc: "Lembretes de vencimento e negociação automática no canal que o cliente mais usa.",
  },
];

const infraPoints = [
  {
    icon: Globe2,
    title: "Operador Nativo",
    desc: "Operamos a infraestrutura ponta a ponta com rotas próprias e conexão direta com todas as operadoras.",
    badge: "Homologado pela Anatel",
  },
  {
    icon: Network,
    title: "Rotas Diretas",
    desc: "Conexão direta com as principais operadoras do Brasil para máxima entregabilidade.",
  },
  {
    icon: Headphones,
    title: "Suporte Humano",
    desc: "Atendimento 100% humano, em português e inglês, com SLA real para operações críticas.",
  },
  {
    icon: Banknote,
    title: "Faturamento em BRL",
    desc: "Sem variação cambial. Contrato e fatura em Reais, com previsibilidade total.",
  },
];

const compliance = [
  {
    icon: FileCheck2,
    title: "LGPD Nativa",
    desc: "Hosting no Brasil, contratos de operador e processos auditáveis em conformidade com a LGPD.",
  },
  {
    icon: Lock,
    title: "Criptografia ponta-a-ponta",
    desc: "Tráfego e dados sensíveis criptografados em trânsito e em repouso.",
  },
  {
    icon: KeyRound,
    title: "Gestão de Consentimento",
    desc: "Opt-in, opt-out e histórico de consentimento integrados nativamente em cada canal.",
  },
];

const cpaasHeroSlides: StackedSlide[] = [
  { src: cpaasHero1, alt: "Atendimento ao cliente via telefone" },
  { src: cpaasHero2, alt: "Equipe analisando dados de comunicação" },
  { src: cpaasHero3, alt: "Pagamento por aproximação no varejo" },
];

const enterprisePlan = {
  title: "Solve Customizing",
  desc: "Negociação customizada, precificação de acordo com o que cabe no seu bolso e arquitetura sob medida para operações de alta criticidade.",
  bullets: ["Preço Acessível", "SLA Personalizado", "Suporte Especializado"],
  cta: "Falar com um Especialista",
};

const systemSlides = [
  { src: systemShot1, alt: "Painel Solvefy/CPaaS — Chaves de API" },
  { src: systemShot2, alt: "Painel Solvefy/CPaaS — Disparo Simples" },
  { src: systemShot3, alt: "Painel Solvefy/CPaaS — Relatórios" },
];

const Cpaas = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % systemSlides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: "#f6f5ef" }}>
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-20"
            style={{ background: ACCENT }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />

          <div className="container relative mx-auto px-4 py-20 md:py-28">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* LEFT — Content */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-6 bg-[hsl(var(--cpaas))]/10 text-[hsl(var(--cpaas))]">
                  <img src={iconCpaas} alt="Solvefy/CPaaS" className="w-4 h-4 object-contain" />
                  Solvefy/CPaaS
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance mb-6 text-gray-900">
                  Se comunique em alta escala e crie{" "}
                  <span className="text-[hsl(var(--cpaas))]">conexões em tempo real</span>
                </h1>
                <p className="text-sm md:text-base font-normal text-gray-600 leading-relaxed text-balance mb-8">
                  O coração transacional do ecossistema. É uma plataforma robusta de comunicação via
                  API desenvolvida para empresas que demandam alto volume de disparos. Atua como a
                  engrenagem invisível que também potencializa as outras soluções (como o Solvefy
                  Marketing).
                </p>
                <Button
                  size="lg"
                  className="group bg-[hsl(var(--cpaas))] hover:bg-[hsl(var(--cpaas))]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Fale com um Especialista
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                {/* Trust checklist */}
                <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
                  {["Integração via API", "Sem taxa de setup", "Cobrança por volume"].map((item) => (
                    <li key={item} className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[hsl(var(--cpaas))]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT — 3D Stacked Cards showcase */}
              <StackedCardsCarousel
                accent={ACCENT}
                slides={cpaasHeroSlides}
                badge={{ iconSrc: iconCpaas, label: "Solvefy/CPaaS" }}
                notifications={[
                  { title: "Mensagem inbound", icon: "message" },
                  { title: "Enviar Whatsapp", description: "Podemos começar com seu nome?", icon: "whatsapp" },
                ]}
                metrics={[
                  { label: "Entrega", value: "98.7%", icon: <Zap className="h-4 w-4" />, position: "bottom-left" },
                  { label: "API CPaaS", value: "Live", icon: <Send className="h-4 w-4" />, position: "top-right" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* 20 Anos de Infraestrutura */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  Mais de 20 anos de História
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance mb-5">
                  Nascemos como telecom e evoluímos para{" "}
                  <span style={{ color: ACCENT }}>CPaaS</span>.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-snug text-balance mb-6">
                  Atuamos no mercado de comunicação há duas décadas; por isso, entregamos rotas
                  próprias, faturamento em reais e suporte humano em português e inglês, com a
                  estabilidade de quem viu o mercado mudar várias vezes.
                </p>
                <div
                  className="rounded-2xl border p-5 flex items-start gap-4"
                  style={{ borderColor: `${ACCENT}33`, backgroundColor: `${ACCENT}0D` }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
                  >
                    <Layers className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    A <span className="font-semibold text-foreground">única solução de CPaaS</span>{" "}
                    nativamente integrada a{" "}
                    <span className="font-semibold text-foreground">Marketing, Ads e CRM</span>. Um
                    ecossistema robusto com acesso simplificado e unificado.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {infraPoints.map(({ icon: Icon, title, desc, badge }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-border bg-card p-5"
                    style={{ boxShadow: "var(--shadow-soft)" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      {badge && (
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                          style={{
                            backgroundColor: `${ACCENT}1A`,
                            color: ACCENT,
                          }}
                        >
                          {badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold tracking-tight mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Channels — Infinite Carousel */}
        <section className="py-20 bg-[#f6f5ef]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* LEFT — Heading & description */}
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance text-gray-900">
                  Conecte o seu sistema aos{" "}
                  <span style={{ color: ACCENT }}>seus clientes</span>
                </h2>
                <p className="mt-4 text-base md:text-lg text-gray-500 leading-snug text-balance">
                  Via API ou interface web, envie e receba mensagens com um contrato só, uma fatura
                  só e um dashboard só.
                </p>
              </div>

              {/* RIGHT — Carousel */}
              <div className="w-full">
                <ChannelsCarousel />
              </div>
            </div>
          </div>
        </section>

        <EcosystemDiagram accent="hsl(var(--cpaas))" />


        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                Casos de uso que <span style={{ color: ACCENT }}>movem o seu negócio</span>
              </h2>
            </div>

            <UseCasesSelector />
          </div>
        </section>

        {/* Segurança e Compliance */}
        <section className="py-16 bg-[#f6f5ef]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Segurança & Compliance
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                Conformidade <span style={{ color: ACCENT }}>do dado ao disparo</span>.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-snug text-balance">
                Infraestrutura projetada para operar no Brasil, com a régua jurídica brasileira.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {compliance.map(({ icon: Icon, title, desc }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Precificação */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Transparência total
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                Precificação que <span style={{ color: ACCENT }}>cabe na sua operação</span>.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-snug text-balance">
                Do primeiro disparo ao volume Enterprise, sem letra miúda.
              </p>
            </div>

            <div>
              <div
                className="relative rounded-3xl p-8 md:p-10 overflow-hidden border"
                style={{
                  borderColor: `${ACCENT}40`,
                  background: `linear-gradient(120deg, #0a0a0f 0%, #14101e 100%)`,
                  boxShadow: `0 24px 60px -30px ${ACCENT}80`,
                }}
              >
                <div
                  className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl opacity-30"
                  style={{ background: ACCENT }}
                />
                <div className="relative grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${ACCENT}25`, color: ACCENT }}
                      >
                        <Code2 className="h-5 w-5" />
                      </div>
                      <div
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: ACCENT }}
                      >
                        Plano Customizado
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                      {enterprisePlan.title}
                    </h3>
                    <p className="text-sm text-white/70 mb-5 max-w-xl">{enterprisePlan.desc}</p>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                      {enterprisePlan.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-white/80">
                          <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-4">
                    <div
                      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold border"
                      style={{
                        color: ACCENT,
                        borderColor: `${ACCENT}55`,
                        backgroundColor: `${ACCENT}15`,
                      }}
                    >
                      Sob Medida
                    </div>
                    <Button
                      size="lg"
                      className="group bg-[hsl(var(--cpaas))] hover:bg-[hsl(var(--cpaas))]/90 text-white font-semibold w-full md:w-auto"
                    >
                      {enterprisePlan.cta}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Cpaas;
