import {
  ArrowRight,
  Kanban,
  Bell,
  BarChart3,
  Check,
  DollarSign,
  TrendingUp,
  Sparkles,
  Rocket,
} from "lucide-react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { ProductHero } from "@/components/ProductHero";
import { PricingCustomPlan } from "@/components/PricingCustomPlan";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import iconCrm from "@/assets/icons/crm-dark.png";
import {
  WhatsappChannelIcon,
} from "@/components/icons/ChannelIcons";
import { StackedCardsCarousel, type StackedSlide } from "@/components/StackedCardsCarousel";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";
import { Heading, SectionSubtitle } from "@/components/ui/Typography";

import channelWhatsapp from "@/assets/crm-channels/whatsapp.png";
import channelSms from "@/assets/crm-channels/sms.png";
import channelEmail from "@/assets/crm-channels/email.png";
import channelVoz from "@/assets/crm-channels/voz.png";

import crmHero1 from "@/assets/crm-hero/hero-1.png";
import crmHero2 from "@/assets/crm-hero/hero-2.png";
import crmHero3 from "@/assets/crm-hero/hero-3.png";

const heroSlides: StackedSlide[] = [
  { src: crmHero1, alt: "Dashboard CRM em monitor" },
  { src: crmHero2, alt: "Dashboard CRM em tablet" },
  { src: crmHero3, alt: "Dashboard CRM em notebook" },
];

const ACCENT = "hsl(var(--crm))";

const features = [
  {
    icon: Kanban,
    title: "Acelere o ciclo de vendas",
    desc: "Funil Kanban visual para mover leads entre etapas com agilidade cirúrgica e enxergar o pipeline em segundos.",
  },
  {
    icon: WhatsappChannelIcon,
    title: "Mapeie o engajamento",
    desc: "Dispare WhatsApp e SMS direto do card do cliente. Registro automático de cada interação para nunca perder o contexto.",
  },
  {
    icon: Bell,
    title: "Esmague suas metas",
    desc: "Automações de tarefas, alertas e follow-ups que eliminam o esquecimento e mantêm seu time sempre em ataque.",
  },
  {
    icon: BarChart3,
    title: "Previsibilidade real de receita",
    desc: "Taxa de conversão, ticket médio e velocidade do funil em tempo real. Decida com dados, não com achismo.",
  },
];

const channelSlides: StackedSlide[] = [
  { src: channelWhatsapp, alt: "WhatsApp Oficial" },
  { src: channelSms, alt: "SMS" },
  { src: channelEmail, alt: "E-mail" },
  { src: channelVoz, alt: "Voz" },
];

const plans = [
  {
    name: "Quicker",
    price: "R$ 47",
    period: "/usuário/mês",
    ideal: "Para times comerciais que precisam acelerar fechamentos e organizar o funil agora.",
    features: [
      "Funil Kanban ilimitado",
      "Click-to-Chat WhatsApp/SMS",
      "Até 3 usuários inclusos",
      "Migração gratuita do RD CRM",
      "Suporte humano por chat",
    ],
    cta: "Começar Teste Grátis",
    highlight: false,
  },
  {
    name: "Better",
    price: "R$ 97",
    period: "/usuário/mês",
    ideal: "Para equipes de alta performance que esmagam metas com automação e inteligência comercial.",
    features: [
      "Tudo do Quicker",
      "Automação de tarefas e alertas",
      "Dashboards gerenciais avançados",
      "Integração nativa com Solvefy/Marketing",
      "Inteligência comercial e relatórios",
      "Suporte prioritário",
    ],
    cta: "Quero o Better",
    highlight: true,
    badge: "Mais Escolhido",
  },
];

const apiPlan = {
  name: "Solve Customizing",
  priceTag: "Customizado",
  ideal: "Para operações comerciais com SLA dedicado, governança e times distribuídos em múltiplas unidades.",
  features: [
    "SLA contratual e CSM dedicado",
    "API e Webhooks ilimitados",
    "SSO e auditoria avançada",
    "Onboarding white-glove",
  ],
  cta: "Falar com Especialista",
};

const Crm = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SEO
        title="CRM — Gestão de Relacionamento Omnichannel"
        description="Centralize o relacionamento com seus clientes em um CRM omnichannel. Pipeline, automações e histórico completo de interações em um só lugar."
        canonical="/crm"
      />
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <ProductHero
          accentVar="--crm"
          badgeIcon={iconCrm}
          badgeLabel="Solvefy/CRM"
          title={<>Pare de perder vendas no funil.{" "}
            <span className="text-[hsl(var(--crm))]">Assuma o controle absoluto do seu pipeline.</span></>}
          subtitle="Sua equipe comercial está deixando dinheiro na mesa? A Solvefy/CRM é a máquina de vendas definitiva para equipes de alta performance. Elimine o vazamento de leads, automatize follow-ups e tenha previsibilidade real de receita. Feche mais negócios em menos tempo."
          ctaText="Teste Grátis"
          trustItems={["Migração gratuita de dados", "20% mais barato que o RD CRM", "Implementação em 24h"]}
          right={
            <StackedCardsCarousel
              accent={ACCENT}
              slides={heroSlides}
              badge={{ iconSrc: iconCrm, label: "Solvefy/CRM" }}
              notifications={[
                { title: "Novo lead qualificado", description: "Polaris S.A. · R$ 64.000", icon: "message" },
                { title: "Click-to-Chat", description: "WhatsApp enviado em 1 clique", icon: "whatsapp" },
              ]}
              metrics={[
                { label: "Conversão", value: "28%", icon: <TrendingUp className="h-4 w-4" />, position: "top-right" },
                { label: "Pipeline", value: "R$ 248k", icon: <Kanban className="h-4 w-4" />, position: "bottom-left" },
              ]}
            />
          }
        />

        {/* ============ Problem vs Solution ============ */}
        <section className="py-16 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4 bg-[hsl(var(--crm))]/10 text-[hsl(var(--crm))]">
              <Sparkles className="h-3.5 w-3.5" />
              O fim da colcha de retalhos
            </div>
            <h2 className="tracking-tight text-balance mb-4">
              Um lead, uma jornada,{" "}
              <span className="text-[hsl(var(--crm))]">um único histórico de fechamento.</span>
            </h2>
            <p className="section-subtitle">
              Chega de juntar planilhas, integrações instáveis e silos entre marketing e vendas.
              No ecossistema Solvefy, o lead nasce no Ads, é aquecido no Marketing e cai no CRM
              com todo o histórico, clicks, conversas e comportamento; pronto para o vendedor
              fechar com agressividade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-destructive mb-3">
                Modelo Antigo
              </div>
              <ul className="space-y-3">
                {[
                  "Planilhas e CRMs desconectados do marketing",
                  "Integrações via Zapier que quebram toda semana",
                  "Vendedor sem contexto da campanha que gerou o lead",
                  "Mensagens enviadas por fora, sem registro",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive">?</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl p-6 border"
              style={{
                borderColor: `${ACCENT}33`,
                background: `linear-gradient(135deg, ${ACCENT}0d, transparent)`,
              }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: ACCENT }}
              >
                Solvefy/CRM
              </div>
              <ul className="space-y-3">
                {[
                  "Lead entra no CRM com origem, criativo e jornada anexada",
                  "WhatsApp e SMS nativos, sem APIs externas",
                  "Vendedor abre o card e domina tudo: clicks, mensagens, perfil",
                  "Marketing e vendas no mesmo banco de dados, em tempo real",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-foreground/80">
                    <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: ACCENT }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

        {/* ============ Features ============ */}
        <section className="bg-[#f6f5ef] py-16 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl mb-10 md:mb-12">
              <h2 className="tracking-tight text-balance mb-4">
                Funcionalidades criadas para{" "}
                <span className="text-[hsl(var(--crm))]">esmagar metas</span>.
              </h2>
              <p className="section-subtitle">
                Cada recurso do Solvefy/CRM existe para fazer o vendedor fechar mais rápido, sem
                fricção, sem trocar de tela, sem retrabalho.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: `${ACCENT}1a`, color: ACCENT }}
                  >
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CHANNELS — Stacked Cards 3D (CPaaS-style) ============ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-20 items-center">
              <div className="max-w-xl">
                <h2 className="tracking-tight leading-tight text-balance mb-4 md:mb-6">
                  Seus canais de venda,{" "}
                  <span style={{ color: ACCENT }}>unificados em um só lugar</span>.
                </h2>
                <p className="section-subtitle">
                  WhatsApp, SMS, E-mail e Voz dentro do card do cliente. Toda interação registrada,
                  todo histórico preservado, todo follow-up no canal que o lead realmente responde.
                </p>
              </div>

              <div className="w-full max-w-full overflow-hidden">
                <StackedCardsCarousel
                  accent={ACCENT}
                  slides={channelSlides}
                  variant="raw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============ TRIAL PRO BANNER ============ */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-[#0a0a0f]">
          <div
            className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div
            className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />

          <div className="max-w-6xl mx-auto px-6 relative">
            <div
              className="relative max-w-5xl rounded-[2rem] p-[1.5px]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, transparent 40%, transparent 60%, ${ACCENT} 100%)`,
                boxShadow: `0 30px 90px -30px ${ACCENT}80`,
              }}
            >
              <div className="relative rounded-[2rem] bg-[#0a0a0f]/95 p-6 sm:p-8 md:p-14 backdrop-blur-xl text-white">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4 md:mb-6 border border-white/10 bg-white/5 text-white/80">
                  <Rocket className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  Acesso irrestrito · Sem cartão de crédito
                </div>

                <h2 className="tracking-tight leading-[1.1] md:leading-[1.05] text-white mb-4 md:mb-6">
                  Experimente o poder total{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${ACCENT} 0%, #fff 100%)`,
                    }}
                  >
                    com o trial no Plano Pro.
                  </span>
                </h2>

                <p className="text-sm md:text-lg text-white/70 leading-relaxed max-w-2xl mb-6 md:mb-8">
                  Não acredite apenas em promessas. Damos a você acesso irrestrito às automações
                  avançadas, relatórios gerenciais e inteligência comercial do nosso plano mais
                  robusto. Teste o Solvefy/CRM Pro gratuitamente e veja sua taxa de conversão
                  disparar.
                </p>

                <Button
                  size="lg"
                  className="group w-full sm:w-auto bg-[hsl(var(--crm))] hover:bg-[hsl(var(--crm))]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Testar Grátis
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ============ Ecossistema ============ */}
        <EcosystemDiagram accent="hsl(var(--crm))" />

        {/* ============ PRICING (Marketing-style) ============ */}
        <section className="py-16 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-10 md:mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Planos & Precificação
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                Escolha o plano <span style={{ color: ACCENT }}>certo</span> para acelerar suas vendas.
              </h2>
              <p className="section-subtitle mt-4">
                Faturamento em reais, sem oscilação cambial e sem letras miúdas.
              </p>
            </div>

            {/* 2 main plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
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
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-lg"
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
                        ? "bg-[hsl(var(--crm))] hover:bg-[hsl(var(--crm))]/90 text-white"
                        : "bg-foreground/90 hover:bg-foreground text-background"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PricingCustomPlan
                accentVar="--crm"
                title={apiPlan.name}
                description={apiPlan.ideal}
                bullets={apiPlan.features}
                badgeText={apiPlan.priceTag}
                ctaText={apiPlan.cta}
              />
            </div>

            {/* Migration banner — RD CRM */}
            <div
              className="max-w-6xl mx-auto mt-8 md:mt-10 rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row items-start gap-4 md:gap-6"
              style={{
                borderColor: `${ACCENT}40`,
                background: `linear-gradient(135deg, ${ACCENT}14, transparent)`,
              }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${ACCENT}1f`, color: ACCENT }}
              >
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-base md:text-lg font-bold text-foreground">
                  Traga sua base do RD CRM e ganhe os 2 primeiros meses de isenção.
                </div>
                <div className="text-sm text-muted-foreground font-light mt-1">
                  Migração gratuita, mapeamento de campos e zero downtime no time comercial.
                </div>
              </div>
              <Button
                className="font-semibold shrink-0 w-full md:w-auto md:self-center"
                style={{ background: ACCENT, color: "#fff" }}
              >
                Quero migrar agora
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Crm;

