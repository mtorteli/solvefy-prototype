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
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import { ProductHero } from "@/components/ProductHero";
import { PricingCustomPlan } from "@/components/PricingCustomPlan";
import { Footer } from "@/components/Footer";
import iconCpaas from "@/assets/icons/cpaas.svg";

import { UseCasesSelector } from "@/components/UseCasesSelector";
import { CpaasChannelFlow } from "@/components/CpaasChannelFlow";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";
import { CpaasHeroMockup } from "@/components/CpaasHeroMockup";

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
  title: "Enterprise",
  desc: "A comunicação moderna exige flexibilidade e rapidez. Com o SolvefyCPaaS, você conecta o seu sistema aos canais favoritos dos seus clientes através de APIs robustas e de fácil implementação. Chega de soluções engessadas: construa a jornada ideal para o seu modelo de negócio.",
  bullets: [
    "Omnichannel de Verdade",
    "Feito para Desenvolvedores",
    "Casos de Uso Infinitos",
    "Escalabilidade Inteligente",
  ],
  cta: "Falar com um Especialista",
  footerText: "Integre APIs de WhatsApp, SMS, Voz e E-mail diretamente no seu software e escale suas interações com facilidade.",
};

const Cpaas = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="CPaaS — Comunicação Programável via API"
        description="Integre WhatsApp, SMS, RCS e voz diretamente no seu sistema com a API de comunicação da Solvefy. Alta disponibilidade e escala para o seu negócio."
        canonical="/cpaas"
        ogImage="/og/og-cpaas.jpg"
        schemas={[
          serviceSchema({
            name: "Solvefy/CPaaS",
            description:
              "Plataforma B2B de comunicação programável via API: WhatsApp, SMS, RCS, voz e e-mail integrados.",
            path: "/cpaas",
            serviceType: "CPaaS — Communications Platform as a Service",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solvefy/CPaaS", path: "/cpaas" },
          ]),
        ]}
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
      <main id="main" className="flex-1">
        <ProductHero
          accentVar="--cpaas"
          badgeIcon={iconCpaas}
          badgeLabel="Solvefy/CPaaS"
          title={<>Se comunique em alta escala e crie{" "}
            <span className="text-[hsl(var(--cpaas))]">conexões em tempo real</span></>}
          subtitle="O coração transacional do ecossistema. É uma plataforma robusta de comunicação via API desenvolvida para empresas que demandam alto volume de disparos. Atua como a engrenagem invisível que também potencializa as outras soluções (como o Solvefy Marketing)."
          ctaText="Fale com um Especialista"
          ctaHref="/contato"
          trustItems={["Integração via API", "Sem Taxa de Setup", "Cobrança por Volume"]}
          right={<CpaasHeroMockup />}
        />

        {/* 20 Anos de Infraestrutura */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
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

              <div className="grid sm:grid-cols-2 gap-4 mt-10">
                {infraPoints.map(({ icon: Icon, title, desc, badge }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-border bg-card p-5 flex flex-col items-start text-left"
                    style={{ boxShadow: "var(--shadow-soft)" }}
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `${ACCENT}1A`,
                          color: ACCENT,
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      {badge && (
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold leading-none"
                          style={{
                            backgroundColor: `${ACCENT}1A`,
                            color: ACCENT,
                          }}
                        >
                          {badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold tracking-tight mb-1.5">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                Transparência Total
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
              ctaHref="/contato"
              footerText={enterprisePlan.footerText}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cpaas;
