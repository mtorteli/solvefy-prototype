import {
  KeyRound,
  Globe2,
  Headphones,
  Banknote,
  Network,
  Layers,
  Lock,
  FileCheck2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { ProductHero } from "@/components/ProductHero";
import { PricingCustomPlan } from "@/components/PricingCustomPlan";
import { Footer } from "@/components/Footer";
import iconCpaas from "@/assets/icons/cpaas.svg";

import { UseCasesSelector } from "@/components/UseCasesSelector";
import { ChannelsCarousel } from "@/components/ChannelsCarousel";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";
import { CpaasHeroMockup } from "@/components/CpaasHeroMockup";
import { CpaasChannelFlow } from "@/components/CpaasChannelFlow";

const ACCENT = "hsl(var(--cpaas))";

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

const enterprisePlan = {
  title: "Solve Customizing",
  desc: "Negociação customizada, precificação de acordo com o que cabe no seu bolso e arquitetura sob medida para operações de alta criticidade.",
  bullets: ["Preço Acessível", "SLA Personalizado", "Suporte Especializado"],
  cta: "Falar com um Especialista",
};

const Cpaas = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="CPaaS — Comunicação Programável via API"
        description="Integre WhatsApp, SMS, RCS e voz diretamente no seu sistema com a API de comunicação da Solvefy. Alta disponibilidade e escala para o seu negócio."
        canonical="/cpaas"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Solvefy CPaaS",
          "applicationCategory": "BusinessApplication",
          "description": "Plataforma de comunicação programável via API para WhatsApp, SMS, RCS e voz.",
          "operatingSystem": "Web",
          "url": "https://solvefy.com/cpaas",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "BRL",
            "description": "Cobrança por volume de mensagens, sem taxa de setup"
          }
        }}
      />
      <Header />
      <main className="flex-1">
        <ProductHero
          accentVar="--cpaas"
          badgeIcon={iconCpaas}
          badgeLabel="Solvefy/CPaaS"
          title={<>Se comunique em alta escala e crie{" "}
            <span className="text-[hsl(var(--cpaas))]">conexões em tempo real</span></>}
          subtitle="O coração transacional do ecossistema. É uma plataforma robusta de comunicação via API desenvolvida para empresas que demandam alto volume de disparos. Atua como a engrenagem invisível que também potencializa as outras soluções (como o Solvefy Marketing)."
          ctaText="Fale com um Especialista"
          trustItems={["Integração via API", "Sem taxa de setup", "Cobrança por volume"]}
          right={<CpaasHeroMockup />}
        />

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
                <h2 className="tracking-tight leading-tight text-balance mb-5">
                  Nascemos como telecom e evoluímos para{" "}
                  <span style={{ color: ACCENT }}>CPaaS</span>.
                </h2>
                <p className="section-subtitle mb-6">
                  Atuamos no mercado de comunicação há duas décadas; por isso,
                  entregamos rotas próprias, faturamento em reais e suporte
                  humano em português e inglês, com a estabilidade de quem viu o
                  mercado mudar várias vezes.
                </p>
                <div
                  className="rounded-2xl border p-5 flex items-start gap-4"
                  style={{
                    borderColor: `${ACCENT}33`,
                    backgroundColor: `${ACCENT}0D`,
                  }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
                  >
                    <Layers className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    A{" "}
                    <span className="font-semibold text-foreground">
                      única solução de CPaaS
                    </span>{" "}
                    nativamente integrada a{" "}
                    <span className="font-semibold text-foreground">
                      Marketing, Ads e CRM
                    </span>
                    . Um ecossistema robusto com acesso simplificado e
                    unificado.
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
                        style={{
                          backgroundColor: `${ACCENT}1A`,
                          color: ACCENT,
                        }}
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
                    <h3 className="text-base font-semibold tracking-tight mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Channels — Infinite Carousel */}
        <section className="py-20 bg-[hsl(var(--cpaas-tint))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* LEFT — Heading & description */}
              <div className="max-w-xl">
                <h2 className="tracking-tight leading-tight text-balance">
                  Conecte o seu sistema aos{" "}
                  <span style={{ color: ACCENT }}>seus clientes</span>
                </h2>
                <p className="section-subtitle mt-4">
                  Via API ou interface web, envie e receba mensagens com um
                  contrato só, uma fatura só e um dashboard só.
                </p>
              </div>

              {/* RIGHT — Carousel */}
              <div className="w-full">
                <ChannelsCarousel />
              </div>
            </div>
          </div>
        </section>

        <CpaasChannelFlow />

        <EcosystemDiagram accent="hsl(var(--cpaas))" />

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <h2 className="tracking-tight leading-tight text-balance">
                Casos de uso que{" "}
                <span style={{ color: ACCENT }}>movem o seu negócio</span>
              </h2>
            </div>

            <UseCasesSelector />
          </div>
        </section>

        {/* Segurança e Compliance */}
        <section className="py-16 bg-[hsl(var(--cpaas-tint))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Segurança & Compliance
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                Conformidade{" "}
                <span style={{ color: ACCENT }}>do dado ao disparo</span>.
              </h2>
              <p className="section-subtitle mt-4">
                Infraestrutura projetada para operar no Brasil, com a régua
                jurídica brasileira.
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
                  <h3 className="text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
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
              <h2 className="tracking-tight leading-tight text-balance">
                Precificação que{" "}
                <span style={{ color: ACCENT }}>cabe na sua operação</span>.
              </h2>
              <p className="section-subtitle mt-4">
                Do primeiro disparo ao volume Enterprise, sem letra miúda.
              </p>
            </div>

            <PricingCustomPlan
              accentVar="--cpaas"
              title={enterprisePlan.title}
              description={enterprisePlan.desc}
              bullets={enterprisePlan.bullets}
              badgeText="Sob Medida"
              ctaText={enterprisePlan.cta}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cpaas;
