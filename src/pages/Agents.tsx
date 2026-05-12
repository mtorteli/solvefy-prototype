import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  Bot,
  GitMerge,
  Globe,
  Layers,
  Target,
  TrendingUp,
  Brain,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ProductHero } from "@/components/ProductHero";
import { AgentsFlow } from "@/components/AgentsFlow";
import { AgentsHeroMockup } from "@/components/AgentsHeroMockup";
import iconAgents from "@/assets/icons/agents.svg";

const ACCENT      = "hsl(var(--agents))";
const ACCENT_BG   = "hsl(var(--agents-surface))";
const ACCENT_TINT = "hsl(var(--agents-tint))";

/* ── 3. Diferenciais ─────────────────────────────────────────────────────── */
const PILLARS = [
  {
    Icon: Bot,
    title: "Agentes prontos, não templates",
    desc: "Não perca tempo a construir. Entregamos 15+ agentes configurados e a rodar hoje.",
  },
  {
    Icon: GitMerge,
    title: "Squads visuais",
    desc: "Orquestre agentes em pipelines de trabalho transparentes com personas nomeadas.",
  },
  {
    Icon: Layers,
    title: "Vendas + Marketing",
    desc: "SDR, Discovery e Proposta, a trabalhar lado a lado com criação de conteúdo social.",
  },
  {
    Icon: Globe,
    title: "DNA Brasileiro",
    desc: "Esqueça as traduções robóticas. Prompts treinados no nosso mercado, usando SPIN e MEDDPICC.",
  },
];

/* ── 5. Para Quem É ─────────────────────────────────────────────────────── */
const PERSONAS = [
  {
    id: "founders",
    label: "Founders / PMEs",
    Icon: Target,
    headline: "A sua equipa virtual para escalar sem aumentar a folha salarial.",
    desc: "Contrate 15 especialistas hoje por menos do que um CLT de R$ 2.500. O Agents faz a prospecção, cria o conteúdo e acompanha os leads enquanto o seu time foca em fechar.",
    bullets: [
      "SDR operando 24h em paralelo com o seu time",
      "Propostas completas geradas em minutos",
      "Conteúdo para redes sociais sem depender de agência",
    ],
    metrics: [
      { value: "15×", label: "mais capacidade" },
      { value: "24/7", label: "prospecção ativa" },
      { value: "1 plano", label: "15 especialistas" },
    ],
  },
  {
    id: "comercial",
    label: "Head Comercial",
    Icon: TrendingUp,
    headline: "Duplique o output dos seus SDRs e garanta vendedores 100% preparados.",
    desc: "Análise de reuniões, preparação automática de vendedores e follow-up orquestrado. O seu time foca em fechar — o Agents faz tudo o resto.",
    bullets: [
      "Análise de transcrições com insights acionáveis",
      "Preparação automática antes de cada call",
      "Follow-up sem silêncio e sem leads perdidos",
    ],
    metrics: [
      { value: "2×", label: "output por SDR" },
      { value: "−60%", label: "prep time por call" },
      { value: "0", label: "leads perdidos" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing / Agências",
    Icon: Brain,
    headline: "Substitua freelancers caros e entregue campanhas inteiras em minutos.",
    desc: "10 agentes especializados em conteúdo, trabalhando em paralelo: pesquisa, fact-check, redação, carrossel e scheduling — com o tom e a voz da sua marca.",
    bullets: [
      "10 agentes de conteúdo operando em paralelo",
      "Posts, carrosséis e artigos em horas, não dias",
      "Consistência de tom e voz em todas as peças",
    ],
    metrics: [
      { value: "10", label: "agentes em paralelo" },
      { value: "min", label: "para criar conteúdo" },
      { value: "∞", label: "consistência de marca" },
    ],
  },
];

/* ── 6. Planos ───────────────────────────────────────────────────────────── */
const PLANS = [
  {
    name: "Básico",
    price: "R$ 97,90",
    period: "/mês",
    description: "Ideal para founders e times enxutos.",
    highlight: false,
    bullets: [
      "15+ agentes pré-configurados em PT-BR",
      "20 créditos mensais inclusos",
      "Usuários ilimitados no workspace",
      "Analytics nativo em tempo real",
    ],
  },
  {
    name: "Completo",
    price: "R$ 187,90",
    period: "/mês",
    description: "Para times comerciais que precisam escalar.",
    highlight: true,
    bullets: [
      "Tudo do plano Básico",
      "Criação de agentes customizados",
      "Squads próprios com orquestração visual",
      "50 créditos mensais inclusos",
      "Multi-modelo: Gemini, Claude e GPT",
    ],
  },
];


/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Agents() {
  const [activePersona, setActivePersona] = useState(0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Solvefy Agents — Copiloto de IA para Vendas e Marketing B2B"
        description="15+ agentes de IA prontos para operar 24/7 no seu time comercial. SDR, deal estratégico, conteúdo e análise de reunião. Comece com 50% OFF."
        canonical="/agents"
      />
      <Header />
      <main className="flex-1">

        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <ProductHero
          accentVar="--agents"
          badgeIcon={iconAgents}
          badgeLabel="Solvefy/Agents"
          title={
            <>
              Agentes de IA para{" "}
              <span style={{ color: ACCENT }}>
                equipes comerciais e de marketing
              </span>
            </>
          }
          subtitle="Tenha múltiplos especialistas trabalhando 24/7 na sua operação. De SDRs rodando metodologias adaptadas ao mercado a squads criando conteúdo para as redes sociais, o Agents faz o trabalho operacional para o seu time focar em fechar negócios. Tudo em português e dentro de uma única plataforma."
          ctaText="Comprar Agora"
          ctaHref="#pricing"
          ctaTextColor="text-white"
          trustItems={[
            "Inteligência Artificial",
            "Múltiplos Especialistas",
            "Workspace Ilimitado",
          ]}
          right={<AgentsHeroMockup />}
        />

        {/* ── 2. AGITAÇÃO DA DOR ───────────────────────────────────────────── */}
        <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: "#080b12" }}>
          {/* Glow blobs */}
          <div
            className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div
            className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />

          <div className="max-w-6xl mx-auto px-6 relative">
            {/* Gradient-border card */}
            <div
              className="relative max-w-5xl rounded-[2rem] p-[1.5px]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, transparent 40%, transparent 60%, ${ACCENT} 100%)`,
                boxShadow: `0 30px 90px -30px ${ACCENT}80`,
              }}
            >
              <div
                className="relative rounded-[2rem] p-6 sm:p-8 md:p-14 backdrop-blur-xl text-white"
                style={{ backgroundColor: "#080b12f5" }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4 md:mb-6 border border-white/10 bg-white/5 text-white/80">
                  <Brain className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  A realidade de quem escala
                </div>

                {/* Heading */}
                <h2 className="tracking-tight leading-[1.1] md:leading-[1.05] text-white mb-4 md:mb-6">
                  O seu time é a linha de frente.{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${ACCENT} 0%, #fff 100%)`,
                    }}
                  >
                    O Solvefy/Agents é o motor operacional.
                  </span>
                </h2>

                {/* Subtext */}
                <p className="text-sm md:text-lg text-white/70 leading-relaxed max-w-2xl mb-8 md:mb-10">
                  Prospectar, qualificar, escrever propostas e criar conteúdo consome
                  horas preciosas que deveriam ser dedicadas a construir relacionamentos
                  com os clientes. O Solvefy/Agents age como um copiloto lado a lado com
                  os seus colaboradores. Ele assume o trabalho manual e repetitivo para
                  que a sua equipe possa produzir mais, focar na estratégia e multiplicar
                  os resultados.
                </p>

                {/* Label overline */}
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35 mb-4">
                  Sem o Solvefy/Agents
                </p>

                {/* Pain points */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Ineficiência Operacional",
                      desc: "Profissionais de alto custo alocados em mineração de dados e rotinas repetitivas, desperdiçando capacidade analítica e reduzindo o ROI da equipe.",
                    },
                    {
                      title: "Latência no Ciclo de Vendas",
                      desc: "A estruturação manual de propostas comerciais gera atrito no pipeline, esfriando leads de alta intenção e derrubando as taxas de conversão.",
                    },
                    {
                      title: "Fragmentação de Esforços",
                      desc: "A ausência de processos orquestrados por IA obriga a operação a dividir o foco entre a geração de demanda e o fechamento, travando a escalabilidade.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex flex-col gap-2.5 rounded-xl border border-white/[0.08] p-5 bg-white/[0.03]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1 h-4 rounded-full bg-white/20 shrink-0" />
                        <span className="text-[12px] font-semibold text-white/60 uppercase tracking-wide">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. DIFERENCIAIS ──────────────────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ backgroundColor: ACCENT_TINT }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="tracking-tighter leading-tight text-balance">
                Por que o{" "}
                <span style={{ color: ACCENT }}>Solvefy Agents</span>
                {" "}é diferente?
              </h2>
              <p className="section-subtitle mt-4 max-w-xl mx-auto">
                Não somos mais uma ferramenta de IA genérica. Somos especialistas
                em vendas B2B no Brasil.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border bg-card p-8 flex gap-5 items-start hover:shadow-elegant transition-all duration-300"
                  style={{ borderColor: `${ACCENT}20` }}
                >
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                  >
                    <pillar.Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold mb-2 leading-snug"
                      style={{ color: ACCENT }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. CATÁLOGO DE AGENTES (ANIMADO) ─────────────────────────────── */}
        <AgentsFlow accent={ACCENT} accentBg={ACCENT_BG} />

        {/* ── 5. PARA QUEM É ────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ backgroundColor: ACCENT_TINT }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="tracking-tighter leading-tight text-balance">
                Feito para{" "}
                <span style={{ color: ACCENT }}>quem precisa de resultado</span>
              </h2>
              <p className="section-subtitle mt-4 max-w-xl mx-auto">
                Diferentes perfis, o mesmo impacto: mais output com menos esforço.
              </p>
            </div>

            {/* Tabs */}
            <div
              className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-card border max-w-lg mx-auto mb-10"
              style={{ borderColor: `${ACCENT}15` }}
            >
              {PERSONAS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActivePersona(i)}
                  className="flex-1 min-w-[110px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={
                    activePersona === i
                      ? { backgroundColor: ACCENT, color: "#fff" }
                      : { color: "hsl(var(--muted-foreground))" }
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {(() => {
                const persona = PERSONAS[activePersona];
                return (
                  <motion.div
                    key={persona.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="grid md:grid-cols-2 gap-10 items-center rounded-3xl border bg-card p-8 md:p-12"
                    style={{ borderColor: `${ACCENT}20` }}
                  >
                    {/* Left: copy */}
                    <div>
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center mb-6"
                        style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                      >
                        <persona.Icon className="h-6 w-6" strokeWidth={1.6} />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight leading-snug mb-4">
                        {persona.headline}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {persona.desc}
                      </p>
                      <ul className="space-y-3">
                        {persona.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm">
                            <Check
                              className="h-4 w-4 mt-0.5 shrink-0"
                              style={{ color: ACCENT }}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/contato"
                        className="inline-flex items-center gap-2 mt-8 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                        style={{ backgroundColor: ACCENT }}
                      >
                        Começar agora
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Right: métricas */}
                    <div className="grid grid-cols-3 gap-4">
                      {persona.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-center"
                          style={{
                            backgroundColor: `${ACCENT}10`,
                            border: `1px solid ${ACCENT}20`,
                          }}
                        >
                          <span
                            className="text-3xl font-black leading-none"
                            style={{ color: ACCENT }}
                          >
                            {m.value}
                          </span>
                          <span className="text-xs text-muted-foreground leading-snug">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </section>

        {/* ── 6. PRICING ───────────────────────────────────────────────────── */}
        <section id="pricing" className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">

            <div className="flex flex-col items-center text-center mb-10 gap-3">
              <span
                className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
              >
                Planos & Precificação
              </span>
              <div
                className="inline-flex items-center rounded-full px-5 py-2 text-sm font-bold text-white shadow-lg"
                style={{ backgroundColor: ACCENT }}
              >
                🎉 Promoção de Lançamento: 50% OFF por 6 meses
              </div>
              <h2 className="tracking-tighter leading-tight text-balance mt-2">
                Escolha o seu plano
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className="relative rounded-2xl border p-8 flex flex-col transition-all duration-300 hover:shadow-elegant"
                  style={{
                    borderColor: plan.highlight ? ACCENT : `${ACCENT}25`,
                    backgroundColor: plan.highlight ? `${ACCENT}08` : "transparent",
                    boxShadow: plan.highlight
                      ? `0 0 0 2px ${ACCENT}30, 0 8px 32px -8px ${ACCENT}30`
                      : undefined,
                  }}
                >
                  {plan.highlight && (
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white shadow"
                      style={{ backgroundColor: ACCENT }}
                    >
                      Mais Escolhido
                    </div>
                  )}

                  <div className="mb-6">
                    <p
                      className="text-sm font-semibold uppercase tracking-widest mb-1"
                      style={{ color: ACCENT }}
                    >
                      {plan.name}
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                      <span className="text-muted-foreground mb-1">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: ACCENT }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contato"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                    style={
                      plan.highlight
                        ? { backgroundColor: ACCENT, color: "#fff" }
                        : { backgroundColor: `${ACCENT}15`, color: ACCENT }
                    }
                  >
                    Começar Agora
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground/60 mt-8 max-w-lg mx-auto leading-relaxed">
              1 crédito = R$ 1,00, consumido proporcionalmente ao uso real da IA.
              Sem taxas ocultas e sem surpresas.
            </p>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}
