import { Link } from "react-router-dom";
import { Check, ArrowRight, Bot, GitMerge, Globe, Layers } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ProductHero } from "@/components/ProductHero";
import { AgentsFlow } from "@/components/AgentsFlow";
import iconAgents from "@/assets/icons/agents.svg";

const ACCENT     = "hsl(var(--agents))";
const ACCENT_BG  = "hsl(var(--agents-surface))";
const ACCENT_TINT = "hsl(var(--agents-tint))";

// ── Mockup visual para o lado direito do Hero ─────────────────────────────────
const AgentsHeroMockup = () => (
  <div className="relative w-full max-w-sm mx-auto select-none" aria-hidden>
    {/* Container principal */}
    <div
      className="rounded-2xl border bg-white/80 backdrop-blur shadow-2xl p-5 space-y-3"
      style={{ borderColor: `${ACCENT}30` }}
    >
      {/* Header do mockup */}
      <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: `${ACCENT}20` }}>
        <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: ACCENT }}>
          <Bot className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-bold text-foreground">Solvefy Agents</span>
        <span
          className="ml-auto text-[10px] font-semibold rounded-full px-2 py-0.5"
          style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
        >
          15 Ativos
        </span>
      </div>

      {/* Lista de agentes */}
      {[
        { num: "01", name: "SDR Geral", status: "Qualificando", active: true },
        { num: "02", name: "Proposta", status: "Proposta pronta", active: false },
        { num: "03", name: "Squad Social", status: "Criando carrossel", active: true },
        { num: "04", name: "Análise de Reunião", status: "Analisando...", active: false },
        { num: "05", name: "Follow-up", status: "3 sequências ativas", active: true },
      ].map((agent) => (
        <div
          key={agent.num}
          className="flex items-center gap-3 rounded-xl p-2.5 transition-colors"
          style={{ backgroundColor: agent.active ? `${ACCENT}08` : "transparent" }}
        >
          <span
            className="text-[10px] font-bold tabular-nums"
            style={{ color: agent.active ? ACCENT : "#9ca3af" }}
          >
            {agent.num}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">{agent.name}</p>
            <p className="text-[10px] text-muted-foreground">{agent.status}</p>
          </div>
          <span
            className="h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: agent.active ? ACCENT : "#e5e7eb" }}
          />
        </div>
      ))}

      {/* Créditos */}
      <div
        className="mt-1 rounded-xl px-3 py-2 flex items-center justify-between"
        style={{ backgroundColor: `${ACCENT}10` }}
      >
        <span className="text-[10px] text-muted-foreground">Créditos restantes</span>
        <span className="text-xs font-bold" style={{ color: ACCENT }}>38 / 50</span>
      </div>
    </div>

    {/* Floating badge */}
    <div
      className="absolute -top-3 -right-3 rounded-xl px-3 py-2 shadow-lg text-white text-xs font-bold"
      style={{ backgroundColor: ACCENT }}
    >
      24/7 Online
    </div>
  </div>
);

// ── Diferenciais ─────────────────────────────────────────────────────────────
const PILLARS = [
  {
    Icon: Bot,
    title: "Agentes Prontos, não templates",
    desc: "Você não precisa construir. Entregamos os agentes configurados e rodando hoje.",
  },
  {
    Icon: GitMerge,
    title: "Squads Visuais",
    desc: "Encadeie múltiplos agentes em pipelines de trabalho humano e transparente.",
  },
  {
    Icon: Layers,
    title: "Vendas + Marketing",
    desc: "Cobre todo o ciclo: da prospecção fria ao conteúdo do Instagram.",
  },
  {
    Icon: Globe,
    title: "Foco Brasileiro",
    desc: "Prompts treinados para o jeito brasileiro de vender B2B, sem traduções engessadas.",
  },
];

// ── Planos ───────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Básico",
    price: "R$ 97,90",
    period: "/mês",
    description: "Para founders e times enxutos.",
    highlight: false,
    bullets: [
      "Acesso a 15+ agentes pré-configurados",
      "20 créditos mensais inclusos",
      "Usuários ilimitados no workspace",
      "Analytics nativo",
    ],
  },
  {
    name: "Completo",
    price: "R$ 187,90",
    period: "/mês",
    description: "Para times comerciais que precisam escalar.",
    highlight: true,
    bullets: [
      "Tudo do Básico",
      "Criação de agentes customizados",
      "Criação de squads próprios",
      "50 créditos mensais inclusos",
      "Acesso Multi-modelo (Gemini, Claude, GPT)",
    ],
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Agents() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Solvefy Agents — Copiloto de IA para Vendas e Marketing B2B"
        description="15+ agentes de IA prontos para operar 24/7 no seu time comercial. SDR, proposta, conteúdo, análise de reunião e follow-up. Comece hoje."
        canonical="/agents"
      />
      <Header />
      <main className="flex-1">

        {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
        <ProductHero
          accentVar="--agents"
          badgeIcon={iconAgents}
          badgeLabel="Solvefy/Agents"
          title={
            <>
              O copiloto de IA para{" "}
              <span style={{ color: ACCENT }}>
                times de vendas e marketing B2B
              </span>
            </>
          }
          subtitle="Não substitua seu time. Multiplique o que ele consegue fazer. 15 especialistas pelo preço de uma assinatura."
          ctaText="Começar Teste com 50% Off"
          ctaHref="#pricing"
          ctaTextColor="text-white"
          trustItems={[
            "15+ Agentes Especializados em PT-BR",
            "Usuários Ilimitados no Workspace",
            "Créditos Transparentes: 1 Crédito = R$ 1",
          ]}
          right={<AgentsHeroMockup />}
        />

        {/* ── 2. AGENTES ANIMADOS ──────────────────────────────────────────── */}
        <AgentsFlow accent={ACCENT} accentBg={ACCENT_BG} />

        {/* ── 3. DIFERENCIAIS (grid 2×2) ───────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ backgroundColor: ACCENT_TINT }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="tracking-tighter leading-tight text-balance">
                Por que o{" "}
                <span style={{ color: ACCENT }}>Solvefy Agents</span>
                {" "}é diferente?
              </h2>
              <p className="section-subtitle mt-4 max-w-xl mx-auto">
                Não somos mais uma ferramenta de IA genérica. Somos especialistas em
                vendas B2B no Brasil.
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

        {/* ── 4. PRICING ───────────────────────────────────────────────────── */}
        <section id="pricing" className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">

            {/* Labels */}
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
                🎉 Promo de Lançamento: 50% OFF por 6 meses
              </div>
              <h2 className="tracking-tighter leading-tight text-balance mt-2">
                Escolha seu plano
              </h2>
            </div>

            {/* Cards */}
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
                    <p className="text-sm font-semibold uppercase tracking-widest mb-1"
                       style={{ color: ACCENT }}>
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
                        <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
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
                        : {
                            backgroundColor: `${ACCENT}15`,
                            color: ACCENT,
                          }
                    }
                  >
                    Começar Agora
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Rodapé transparência de créditos */}
            <p className="text-center text-xs text-muted-foreground/60 mt-8 max-w-lg mx-auto leading-relaxed">
              1 crédito equivale a R$ 1,00, consumido de forma transparente baseada na
              API de IA. Sem taxas ocultas.
            </p>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
