import {
  ArrowRight,
  Sparkles,
  Check,
  Workflow,
  Layers,
  TrendingUp,
  Send,
  Bot,
  Wand2,
  FlaskConical,
  Users,
  Code2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import iconMarketing from "@/assets/icons/marketing-pink.png";
import { StackedCardsCarousel, type StackedSlide } from "@/components/StackedCardsCarousel";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";

import marketingWhatsapp from "@/assets/marketing-channels/whatsapp.png";
import marketingRcs from "@/assets/marketing-channels/rcs.png";
import marketingSms from "@/assets/marketing-channels/sms.png";
import marketingEmail from "@/assets/marketing-channels/email.png";
import marketingVoz from "@/assets/marketing-channels/voz.png";
import marketingGrupos from "@/assets/marketing-channels/grupos.png";

import heroMarketing1 from "@/assets/marketing-hero/hero-1.png";
import heroMarketing2 from "@/assets/marketing-hero/hero-2.png";
import heroMarketing3 from "@/assets/marketing-hero/hero-3.png";

import logoContaAzul from "@/assets/integrations/conta-azul.svg";
import logoEliteSoft from "@/assets/integrations/elite-soft.svg";
import logoHubsoft from "@/assets/integrations/hubsoft.svg";
import logoIxcSoft from "@/assets/integrations/ixcsoft.svg";
import logoMake from "@/assets/integrations/make.svg";
import logoMautic from "@/assets/integrations/mautic.svg";
import logoPipedrive from "@/assets/integrations/pipedrive.svg";
import logoSpg from "@/assets/integrations/spg.svg";
import logoZapier from "@/assets/integrations/zapier.svg";

const ACCENT = "#e64499";

const marketingSlides: StackedSlide[] = [
  { src: marketingWhatsapp, alt: "WhatsApp Oficial" },
  { src: marketingRcs, alt: "RCS" },
  { src: marketingSms, alt: "SMS" },
  { src: marketingEmail, alt: "E-mail" },
  { src: marketingVoz, alt: "Disparo de Voz" },
  { src: marketingGrupos, alt: "Gestão de Grupos" },
];

const heroSlides: StackedSlide[] = [
  { src: heroMarketing1, alt: "Profissional de marketing planejando jornadas" },
  { src: heroMarketing2, alt: "Painel de Disparos e API da Solvefy/Marketing" },
  { src: heroMarketing3, alt: "Construção de relatórios multicanal na Solvefy/Marketing" },
];

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
    name: "Closer",
    price: "R$ 197",
    period: "/mês",
    ideal: "Para quem está começando a estruturar a comunicação.",
    features: [
      "Disparos em todos os canais",
      "Templates prontos de mensagem",
      "Histórico e relatórios básicos",
      "Suporte humano por chat",
    ],
    cta: "Começar com Closer",
    highlight: false,
  },
  {
    name: "Quicker",
    price: "R$ 597",
    period: "/mês",
    ideal: "Para times que precisam acelerar conversão.",
    features: [
      "Tudo do Closer",
      "Construtor visual de jornadas",
      "Segmentação avançada por comportamento",
      "Dashboards em tempo real",
      "Suporte prioritário",
    ],
    cta: "Quero o Quicker",
    highlight: true,
    badge: "Mais Popular",
  },
  {
    name: "Better",
    price: "R$ 1.997",
    period: "/mês",
    ideal: "Para escalar com inteligência e previsibilidade.",
    features: [
      "Tudo do Quicker",
      "EasyIA — Inteligência Artificial nativa",
      "Gestão de Grupos no WhatsApp",
      "Acesso completo à API",
      "Customer Success dedicado",
    ],
    cta: "Falar com Vendas",
    highlight: false,
  },
];

const apiPlan = {
  name: "Solve Customizing",
  priceTag: "API Personalizado",
  ideal: "Para empresas que precisam de uma operação sob medida via API.",
  features: [
    "Integração ponta-a-ponta via API",
    "SLA, throughput e segurança dedicados",
    "Onboarding técnico assistido",
    "Faturamento e contratos customizados",
  ],
  cta: "Falar com Especialista",
};

const Marketing = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-gray-950">
          <div
            className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-30"
            style={{ background: ACCENT }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full blur-3xl opacity-20"
            style={{ background: ACCENT }}
          />

          <div className="container relative mx-auto px-4 py-20 md:py-28">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-6 bg-[#e64499]/10 text-[#e64499]">
                  <img src={iconMarketing} alt="Solvefy/Marketing" className="w-4 h-4 object-contain" />
                  Solvefy/Marketing
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance mb-6 text-white">
                  Impulsione suas vendas com{" "}
                  <span className="text-[#e64499]">jornadas completas e personalizadas.</span>
                </h1>
                <p className="text-sm md:text-base font-light text-gray-300 leading-relaxed text-balance mb-8">
                  Tudo o que o seu marketing precisa em um só lugar. Com a Solvefy/Marketing, você
                  cria jornadas de relacionamento automatizadas e transforma contatos em vendas. Use
                  nossos templates de disparo rápido, acompanhe métricas em tempo real e integre
                  tudo facilmente via API.
                </p>
                <Button
                  size="lg"
                  className="group bg-[#e64499] hover:bg-[#e64499]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Teste Grátis
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400">
                  {["Todos os Canais", "Construtor Visual de Jornadas", "EasyIA"].map((item) => (
                    <li key={item} className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#e64499]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <StackedCardsCarousel
                accent={ACCENT}
                slides={heroSlides}
                badge={{ iconSrc: iconMarketing, label: "Solvefy/Marketing" }}
                notifications={[
                  { title: "Carrinho recuperado", description: "Jornada multicanal disparada", icon: "message" },
                  { title: "Enviar WhatsApp", description: "Olá {nome}, finalize com 10% OFF 🛒", icon: "whatsapp" },
                ]}
                metrics={[
                  { label: "Conversão", value: "+27%", icon: <Send className="h-4 w-4" />, position: "bottom-left" },
                  { label: "Jornada ativa", value: "Recupera carrinho", icon: <Workflow className="h-4 w-4" />, position: "top-right" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* ============ DORES & POSICIONAMENTO ============ */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div
            className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div className="container relative mx-auto px-4">
            {/* Centered header */}
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Por que Solvefy/Marketing
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
                O marketing que <span style={{ color: ACCENT }}>vende sozinho</span>{" "}
                e mostra exatamente o que <span style={{ color: ACCENT }}>funciona</span>.
              </h2>
            </div>

            {/* Balanced 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
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
                    className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity"
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

        {/* ============ ECOSSISTEMA ============ */}
        <EcosystemDiagram accent={ACCENT} />

        {/* ============ INTEGRAÇÕES VIA API ============ */}
        <section className="py-12 md:py-16 bg-muted/30 border-y border-border/60">
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

        {/* ============ CANAIS — Stacked Cards ============ */}
        <section className="py-20" style={{ backgroundColor: "#F5F8FB" }}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
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

              <div className="w-full">
                <StackedCardsCarousel
                  accent={ACCENT}
                  slides={marketingSlides}
                  variant="raw"
                />
              </div>
            </div>
          </div>
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
            className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-30"
            style={{ background: ACCENT }}
          />
          <div
            className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl opacity-20"
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
              <div className="relative rounded-[2rem] bg-[#0a0a0f]/95 p-10 md:p-14 backdrop-blur-xl">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-6 border border-white/10 bg-white/5 text-white/80">
                  <Bot className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  Inteligência Artificial Exclusiva
                </div>

                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white mb-6">
                  Conheça a{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${ACCENT} 0%, #fff 100%)`,
                    }}
                  >
                    EasyIA
                  </span>
                </h2>

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
                  className="group bg-[#e64499] hover:bg-[#e64499]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Conhecer a EasyIA
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Planos & Precificação
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                Escolha o plano <span style={{ color: ACCENT }}>certo</span> para crescer.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-snug text-balance">
                Faturamento em reais, sem oscilação cambial e sem letras miúdas.
              </p>
            </div>

            {/* 3 main plans */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
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
                  {plan.highlight && plan.badge && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg"
                      style={{ background: ACCENT }}
                    >
                      {plan.badge}
                    </span>
                  )}
                  <div className="mb-5">
                    <div
                      className="text-sm font-bold uppercase tracking-wider mb-2"
                      style={{ color: ACCENT }}
                    >
                      {plan.name}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Ideal para: <span className="text-foreground/80">{plan.ideal}</span>
                    </p>
                  </div>

                  <ul className="space-y-2.5 mb-7 text-sm flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: ACCENT }}
                        />
                        <span className="text-foreground/85">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className={`w-full font-semibold ${
                      plan.highlight
                        ? "bg-[#e64499] hover:bg-[#e64499]/90 text-white"
                        : "bg-foreground/90 hover:bg-foreground text-background"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* API plan — wide row */}
            <div className="max-w-6xl mx-auto mt-8">
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
                        Plano API
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                      {apiPlan.name}
                    </h3>
                    <p className="text-sm text-white/70 mb-5 max-w-xl">{apiPlan.ideal}</p>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                      {apiPlan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-white/80">
                          <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                          {f}
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
                      {apiPlan.priceTag}
                    </div>
                    <Button
                      size="lg"
                      className="group bg-[#e64499] hover:bg-[#e64499]/90 text-white font-semibold w-full md:w-auto"
                    >
                      {apiPlan.cta}
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

export default Marketing;
