import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Check,
  Clock,
  Workflow,
  Layers,
  TrendingUp,
  Bot,
  Wand2,
  FlaskConical,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { ProductHero } from "@/components/ProductHero";
import { PricingCustomPlan } from "@/components/PricingCustomPlan";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import iconMarketing from "@/assets/icons/marketing.svg";
import { MarketingHeroMockup } from "@/components/MarketingHeroMockup";
import { CpaasChannelFlow } from "@/components/CpaasChannelFlow";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";
import { Heading, SectionSubtitle } from "@/components/ui/Typography";


import logoContaAzul from "@/assets/integrations/conta-azul.svg";
import logoEliteSoft from "@/assets/integrations/elite-soft.svg";
import logoHubsoft from "@/assets/integrations/hubsoft.svg";
import logoIxcSoft from "@/assets/integrations/ixcsoft.svg";
import logoMake from "@/assets/integrations/make.svg";
import logoMautic from "@/assets/integrations/mautic.svg";
import logoPipedrive from "@/assets/integrations/pipedrive.svg";
import logoSpg from "@/assets/integrations/spg.svg";
import logoZapier from "@/assets/integrations/zapier.svg";

const ACCENT = "hsl(var(--marketing))";


const painCards = [
  {
    icon: Workflow,
    title: "Automação que poupa seu tempo.",
    desc: "Diga adeus aos envios manuais que não escalam. Crie réguas de relacionamento, fluxos de nutrição e jornadas complexas que rodam 24/7 de forma automática.",
  },
  {
    icon: TrendingUp,
    title: "Taxas de conversão imbatíveis.",
    desc: "Chega de ser ignorado. Alcance seu público onde ele realmente está com integrações nativas de WhatsApp Oficial, SMS e RCS (mensagens ricas).",
  },
  {
    icon: Layers,
    title: "Todo o seu marketing em um só lugar.",
    desc: "Pare de gastar com dezenas de ferramentas soltas. Centralize sua base, acompanhe métricas em tempo real e tenha previsibilidade sobre o que realmente gera ROI.",
  },
];

const integrationLogos = [
  { src: logoContaAzul, alt: "Conta Azul" },
  { src: logoEliteSoft, alt: "Elite Soft" },
  { src: logoHubsoft, alt: "HubSoft" },
  { src: logoIxcSoft, alt: "IXC Soft" },
  { src: logoMake, alt: "Make" },
  { src: logoMautic, alt: "Mautic" },
  { src: logoPipedrive, alt: "Pipedrive" },
  { src: logoSpg, alt: "SPG" },
  { src: logoZapier, alt: "Zapier" },
];

const easyIaPills = [
  { icon: Wand2, label: "Copywriting Persuasivo" },
  { icon: FlaskConical, label: "Sugestão de Testes A/B" },
  { icon: Users, label: "Segmentação Personalizada" },
];

const plans = [
  {
    name: "Próximo",
    desc: "Perfeito para começar e estruturar sua comunicação.",
    monthly: "R$ 77",
    annual:  "R$ 47",
    period: "/mês",
    features: [
      "Módulo de disparos simples",
      "Upload de arquivos",
      "Formulários",
      "Histórico de disparos",
      "Etiquetas",
      "WhatsApp, e-mail, RCS, Voz e SMS",
      "Acesso Próximo a API Disparo Pro",
    ],
    soon: [] as string[],
    cta: "Começar com Próximo",
    highlight: false,
    badge: null as string | null,
  },
  {
    name: "Veloz",
    desc: "Ideal para quem quer escalar com organização e integração.",
    monthly: "R$ 577",
    annual:  "R$ 447",
    period: "/mês",
    features: [
      "Tudo do plano Próximo",
      "Criação de Segmentos",
      "Criação de Jornadas de Atendimento",
      "Integração com Ecommerce",
      "Módulo de produtos",
      "Gestão de Clientes",
      "Acesso Veloz a API Disparo Pro",
    ],
    soon: [] as string[],
    cta: "Começar com Veloz",
    highlight: true,
    badge: "Recomendado" as string | null,
  },
  {
    name: "Melhor",
    desc: "Para operações que exigem performance máxima e inteligência.",
    monthly: "R$ 1.987",
    annual:  "R$ 1.347",
    period: "/mês",
    features: [
      "Tudo do plano Veloz",
      "Disparo AI",
      "Gestão de Grupos",
      "Acesso Melhor a API Disparo Pro",
    ],
    soon: ["IA Conversacional", "Agentes de atendimento IA"] as string[],
    cta: "Falar com Vendas",
    highlight: false,
    badge: null as string | null,
  },
];

const apiPlan = {
  name: "Enterprise",
  priceTag: "Sob Medida",
  ideal: "No marketing digital atual, depender de processos manuais ou dados fragmentados significa perder dinheiro. Com o Solvefy Marketing, você orquestra toda a jornada do seu cliente através de uma plataforma robusta, intuitiva e feita para times de alta performance.",
  features: [
    "Campanhas Omnichannel",
    "Automação Inteligente de Funil",
    "Dashboards e Analytics Avançados",
    "Integração Sem Atritos",
  ],
  cta: "Falar com Especialista",
  footerText: "Atraia, engaje e converta. Centralize sua estratégia digital em uma única plataforma de automação com foco em resultados reais.",
};

const Marketing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Marketing — Automação Multicanal"
        description="Crie jornadas automatizadas, dispare campanhas e engaje clientes em todos os canais com a plataforma de marketing da Solvefy."
        canonical="/marketing"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Solvefy Marketing",
          "applicationCategory": "BusinessApplication",
          "description": "Plataforma de automação de marketing multicanal com WhatsApp, SMS, RCS e EasyIA.",
          "operatingSystem": "Web",
          "url": "https://solvefy.com/marketing",
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "197",
            "highPrice": "1997",
            "priceCurrency": "BRL"
          }
        }}
      />
      <Header />
      <main className="flex-1">
        <ProductHero
          accentVar="--marketing"
          badgeIcon={iconMarketing}
          badgeLabel="Solvefy/Marketing"
          title={<>Impulsione suas vendas com{" "}
            <span className="text-[hsl(var(--marketing))]">jornadas completas e personalizadas.</span></>}
          subtitle="Tudo o que o seu marketing precisa em um só lugar. Com a Solvefy/Marketing, você cria jornadas de relacionamento automatizadas e transforma contatos em vendas. Use nossos templates de disparo rápido, acompanhe métricas em tempo real e integre tudo facilmente via API."
          ctaText="Teste Grátis"
          ctaHref="/contato"
          trustItems={["Todos os Canais", "Construtor Visual de Jornadas", "EasyIA"]}
          right={<MarketingHeroMockup />}
        />

        {/* ============ DORES & POSICIONAMENTO ============ */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-white">
          <div
            className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div className="max-w-6xl mx-auto px-6">
            {/* Centered header */}
            <div className="max-w-4xl text-left mb-12 md:mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Por que Solvefy/Marketing
              </div>
              <Heading className="text-balance">
                O marketing que <span style={{ color: ACCENT }}>vende sozinho</span>{" "}
                e mostra exatamente o que <span style={{ color: ACCENT }}>funciona</span>.
              </Heading>
            </div>

            {/* Balanced 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {painCards.map(({ icon: Icon, title, desc }, i) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative h-full rounded-3xl p-8 border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{
                    boxShadow: "0 12px 40px -20px rgba(0,0,0,0.12)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 50px -20px ${ACCENT}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 12px 40px -20px rgba(0,0,0,0.12)";
                  }}
                >
                  <div
                    className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{ background: ACCENT }}
                  />
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl mb-5"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-3">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CANAIS — Animated Flow ============ */}
        <CpaasChannelFlow accent="#E64499" accentBg="#FFE9F5" />

        {/* ============ ECOSSISTEMA ============ */}
        <EcosystemDiagram accent={ACCENT} />

        {/* ============ INTEGRAÇÕES VIA API ============ */}
        <section className="py-12 md:py-16 bg-white border-y border-border/60">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm md:text-base font-semibold tracking-wider uppercase text-muted-foreground mb-8">
              Integrações via API
            </p>

            <div className="relative overflow-hidden">
              {/* edge fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-muted/30 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-muted/30 to-transparent z-10" />

              <div className="flex w-max animate-[scroll_40s_linear_infinite] gap-16 px-8 items-center">
                {[...integrationLogos, ...integrationLogos, ...integrationLogos].map(
                  (logo, idx) => (
                    <div
                      key={`${logo.alt}-${idx}`}
                      className="flex h-10 w-32 shrink-0 items-center justify-center"
                      title={logo.alt}
                      aria-label={logo.alt}
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        loading="lazy"
                        className="max-h-8 w-auto max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                        style={{
                          filter: "grayscale(1) brightness(0.55) contrast(1.1)",
                        }}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.333%); }
            }
          `}</style>
        </section>

        {/* ============ EASY IA ============ */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0f]">
          {/* Subtle grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
          {/* Glows */}
          <div
            className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div
            className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: "#7c3aed" }}
          />

          <div className="container relative mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative max-w-4xl mx-auto rounded-[2rem] p-[1.5px]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, transparent 40%, transparent 60%, ${ACCENT} 100%)`,
                boxShadow: `0 30px 90px -30px ${ACCENT}80`,
              }}
            >
              <div className="relative rounded-[2rem] bg-[#0a0a0f]/95 p-10 md:p-14 backdrop-blur-xl text-white">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-6 border border-white/10 bg-white/5 text-white/80">
                  <Bot className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  Inteligência Artificial Exclusiva
                </div>

                <Heading className="text-white mb-6">
                  Conheça a{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${ACCENT} 0%, #fff 100%)`,
                    }}
                  >
                    EasyIA
                  </span>
                </Heading>

                <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mb-8">
                  Precisa de ajuda para otimizar seu negócio? Nossa Inteligência Artificial nativa
                  redige copys persuasivas, sugere testes A/B e segmenta sua base em segundos.
                  Deixe a tecnologia trabalhar pela sua conversão enquanto você foca na estratégia.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {easyIaPills.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur"
                    >
                      <Icon className="h-4 w-4" style={{ color: ACCENT }} />
                      {label}
                    </span>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="group bg-[hsl(var(--marketing))] hover:bg-[hsl(var(--marketing))]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Conhecer a EasyIA
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="max-w-4xl text-left mb-10">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
                  <path d="M7 7h.01"/>
                </svg>
                Planos & Precificação
              </div>
              <Heading className="text-balance">
                Escolha o plano <span style={{ color: ACCENT }}>certo</span> para crescer.
              </Heading>
              <SectionSubtitle className="mt-4">
                Faturamento em reais, sem oscilação cambial e sem letras miúdas.
              </SectionSubtitle>
            </div>

            {/* Toggle mensal / anual */}
            <div className="flex flex-col items-center gap-3 mb-12">
              <div className="flex items-center gap-1 rounded-full p-1 bg-muted">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    !isAnnual
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 text-white"
                  style={{
                    backgroundColor: isAnnual ? ACCENT : "transparent",
                    color: isAnnual ? "#fff" : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isAnnual) (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isAnnual) (e.currentTarget as HTMLButtonElement).style.color = "";
                  }}
                >
                  Anual
                </button>
              </div>
              <p className="text-sm font-semibold" style={{ color: ACCENT }}>
                Economize até 39% optando pelo plano anual
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-7 flex flex-col transition-all ${
                    plan.highlight
                      ? "shadow-2xl md:-translate-y-2"
                      : "border border-border bg-card hover:-translate-y-1 hover:shadow-md"
                  }`}
                  style={
                    plan.highlight
                      ? {
                          borderWidth: "2px",
                          borderStyle: "solid",
                          borderColor: ACCENT,
                          background: `linear-gradient(160deg, ${ACCENT}10 0%, hsl(var(--card)) 60%)`,
                          boxShadow: `0 24px 60px -24px ${ACCENT}80`,
                        }
                      : undefined
                  }
                >
                  {plan.badge && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg"
                      style={{ background: ACCENT }}
                    >
                      {plan.badge}
                    </span>
                  )}

                  {/* Nome + descrição + preço */}
                  <div className="mb-5">
                    <div
                      className="text-sm font-bold uppercase tracking-wider mb-1"
                      style={{ color: ACCENT }}
                    >
                      {plan.name}
                    </div>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                      {plan.desc}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">
                        {isAnnual ? plan.annual : plan.monthly}
                      </span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    {isAnnual && (
                      <p className="mt-1 text-xs font-medium" style={{ color: ACCENT }}>
                        Cobrado anualmente
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-4 text-sm flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                        <span className="text-foreground/85">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Em breve */}
                  {plan.soon.length > 0 && (
                    <>
                      <div className="flex items-center gap-2 my-3">
                        <div className="flex-1 border-t border-dashed border-border" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">
                          Em breve
                        </span>
                        <div className="flex-1 border-t border-dashed border-border" />
                      </div>
                      <ul className="space-y-2.5 mb-5 text-sm">
                        {plan.soon.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 opacity-55">
                            <Clock className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                            <span className="text-foreground/70">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <Button
                    size="lg"
                    asChild
                    className={`w-full font-semibold mt-auto ${
                      plan.highlight
                        ? "bg-[hsl(var(--marketing))] hover:bg-[hsl(var(--marketing))]/90 text-white"
                        : "bg-foreground/90 hover:bg-foreground text-background"
                    }`}
                  >
                    <Link to="/contato" className="inline-flex items-center justify-center">
                      {plan.cta}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Aviso de rodapé */}
            <p className="mt-8 text-sm text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
              ⚠️ <span className="font-semibold text-foreground/70">Importante:</span> A assinatura dos planos não inclui créditos de envio para os canais. Os disparos são cobrados conforme uso e podem ser adquiridos separadamente em créditos avulsos.
            </p>

            <div className="mt-8">
              <PricingCustomPlan
                accentVar="--marketing"
                title={apiPlan.name}
                description={apiPlan.ideal}
                bullets={apiPlan.features}
                badgeText={apiPlan.priceTag}
                ctaText={apiPlan.cta}
                ctaHref="/contato"
                footerText={apiPlan.footerText}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Marketing;

