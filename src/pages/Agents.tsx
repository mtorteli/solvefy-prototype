import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  X,
  Bot,
  GitMerge,
  Globe,
  Layers,
  Target,
  TrendingUp,
  Brain,
} from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import { ProductHero } from "@/components/ProductHero";
import { AgentsFlow } from "@/components/AgentsFlow";
import { AgentsHeroMockup } from "@/components/AgentsHeroMockup";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";
import { useReveal } from "@/hooks/useReveal";
import { useLocale } from "@/i18n/useLocale";
import iconAgents from "@/assets/icons/agents.svg";
import logoAgents from "@/assets/logos/solvefy-agents.png";

const ACCENT      = "hsl(var(--agents))";
const ACCENT_BG   = "hsl(var(--agents-surface))";
const ACCENT_TINT = "hsl(var(--agents-tint))";

const PAIN_KEYS = ["inefficiency", "latency", "fragmented"] as const;

const PILLAR_KEYS = [
  { key: "ready",     Icon: Bot },
  { key: "squads",    Icon: GitMerge },
  { key: "vendasMkt", Icon: Layers },
  { key: "dna",       Icon: Globe },
] as const;

const PERSONA_KEYS = [
  { key: "founders",  Icon: Target },
  { key: "comercial", Icon: TrendingUp },
  { key: "marketing", Icon: Brain },
] as const;

const PLAN_KEYS = [
  { key: "fast", featureKeys: ["f1","f2","f3","f4"] as const,                disabledKeys: ["d1","d2","d3"] as const, highlight: false, hasBadge: false },
  { key: "best", featureKeys: ["f1","f2","f3","f4","f5","f6","f7"] as const, disabledKeys: [] as readonly string[],   highlight: true,  hasBadge: true },
] as const;

export default function Agents() {
  const { t } = useTranslation("agents");
  const { locale, localizedPath } = useLocale();
  const [activePersona, setActivePersona] = useState(0);
  const reveal = useReveal();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={t("meta.title")}
        description={t("meta.description")}
        canonical="/agents"
        ogImage="/og/og-agents.jpg"
        schemas={[
          serviceSchema(
            {
              name: "Solvefy/Agents",
              description: t("meta.description"),
              path: "/agents",
              serviceType: "AI agents for sales teams",
              offers: { lowPrice: "80", priceCurrency: "BRL" },
            },
            locale,
          ),
          breadcrumbSchema(
            [
              { name: t("meta.breadcrumbHome"), path: "/" },
              { name: t("meta.breadcrumbSelf"), path: "/agents" },
            ],
            locale,
          ),
        ]}
      />
      <Header />
      <main id="main" className="flex-1">

        {/* ── 1. HERO ── */}
        <ProductHero
          accentVar="--agents"
          badgeIcon={iconAgents}
          badgeLabel="Solvefy/Agents"
          logoImage={logoAgents}
          title={
            <Trans
              i18nKey="hero.title"
              ns="agents"
              components={{ accent: <span style={{ color: ACCENT }} /> }}
            />
          }
          subtitle={t("hero.subtitle")}
          ctaText={t("hero.cta")}
          ctaHref={localizedPath("/contato")}
          ctaTextColor="text-white"
          trustItems={[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")]}
          right={<AgentsHeroMockup />}
        />

        {/* ── 2. PAIN ── */}
        <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: "#080b12" }}>
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
              <div
                className="relative rounded-[2rem] p-6 sm:p-8 md:p-14 backdrop-blur-xl text-white"
                style={{ backgroundColor: "#080b12f5" }}
              >
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4 md:mb-6 border border-white/10 bg-white/5 text-white/80">
                  <Brain className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  {t("pain.badge")}
                </div>

                <h2 className="tracking-tight leading-[1.1] md:leading-[1.05] text-white mb-4 md:mb-6">
                  <Trans
                    i18nKey="pain.title"
                    ns="agents"
                    components={{
                      accent: (
                        <span
                          className="bg-clip-text text-transparent"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${ACCENT} 0%, #fff 100%)`,
                          }}
                        />
                      ),
                    }}
                  />
                </h2>

                <p className="text-sm md:text-lg text-white/70 leading-relaxed max-w-2xl mb-8 md:mb-10">
                  {t("pain.subtitle")}
                </p>

                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35 mb-4">
                  {t("pain.withoutLabel")}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PAIN_KEYS.map((k) => (
                    <div
                      key={k}
                      className="flex flex-col gap-2.5 rounded-xl border border-white/[0.08] p-5 bg-white/[0.03]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1 h-4 rounded-full bg-white/20 shrink-0" />
                        <span className="text-[12px] font-semibold text-white/60 uppercase tracking-wide">
                          {t(`pain.items.${k}.title`)}
                        </span>
                      </div>
                      <p className="text-sm text-white/40 leading-relaxed">{t(`pain.items.${k}.desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <EcosystemDiagram accent={ACCENT} />

        {/* ── 3. PILLARS ── */}
        <section className="py-16 md:py-24" style={{ backgroundColor: ACCENT_TINT }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="tracking-tighter leading-tight text-balance">
                <Trans
                  i18nKey="pillars.title"
                  ns="agents"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle mt-4 max-w-xl mx-auto">
                {t("pillars.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PILLAR_KEYS.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="rounded-2xl border bg-white/70 backdrop-blur-md p-8 flex gap-5 items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:[box-shadow:0_16px_40px_-8px_hsl(var(--agents)/0.22)]"
                  style={{ borderColor: `${ACCENT}25` }}
                >
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${ACCENT}20`, color: ACCENT, boxShadow: `0 0 0 6px ${ACCENT}0D` }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold mb-2 leading-snug"
                      style={{ color: ACCENT }}
                    >
                      {t(`pillars.items.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`pillars.items.${key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. AGENTS FLOW ── */}
        <AgentsFlow accent={ACCENT} accentBg={ACCENT_BG} />

        {/* ── 5. PERSONAS ── */}
        <section className="py-16 md:py-24" style={{ backgroundColor: ACCENT_TINT }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="tracking-tighter leading-tight text-balance">
                <Trans
                  i18nKey="personas.title"
                  ns="agents"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle mt-4 max-w-xl mx-auto">
                {t("personas.subtitle")}
              </p>
            </div>

            {/* Tabs */}
            <div
              className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-card border max-w-lg mx-auto mb-10"
              style={{ borderColor: `${ACCENT}15` }}
            >
              {PERSONA_KEYS.map((p, i) => (
                <button
                  key={p.key}
                  onClick={() => setActivePersona(i)}
                  className="flex-1 min-w-[110px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={
                    activePersona === i
                      ? { backgroundColor: ACCENT, color: "#fff" }
                      : { color: "hsl(var(--muted-foreground))" }
                  }
                >
                  {t(`personas.items.${p.key}.label`)}
                </button>
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {(() => {
                const persona = PERSONA_KEYS[activePersona];
                const PersonaIcon = persona.Icon;
                const bulletKeys = ["b1", "b2", "b3"] as const;
                const metricKeys = ["m1", "m2", "m3"] as const;
                return (
                  <motion.div
                    key={persona.key}
                    initial={reveal ? { opacity: 0, y: 10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="grid md:grid-cols-2 gap-10 items-center rounded-3xl border bg-card p-10 md:p-12 ring-1 ring-inset ring-gray-100 transition-all duration-300 hover:ring-[hsl(var(--agents)/0.35)]"
                    style={{ borderColor: `${ACCENT}20` }}
                  >
                    {/* Left: copy */}
                    <div>
                      <div
                        className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6"
                        style={{ backgroundColor: `${ACCENT}18`, color: ACCENT, boxShadow: `0 0 0 8px ${ACCENT}0A` }}
                      >
                        <PersonaIcon className="h-7 w-7" strokeWidth={1.6} />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight leading-snug mb-4">
                        {t(`personas.items.${persona.key}.headline`)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {t(`personas.items.${persona.key}.desc`)}
                      </p>
                      <ul className="space-y-3">
                        {bulletKeys.map((bk) => (
                          <li key={bk} className="flex items-start gap-2.5 text-sm">
                            <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                            <span>{t(`personas.items.${persona.key}.${bk}`)}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={localizedPath("/contato")}
                        className="inline-flex items-center gap-2 mt-8 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                        style={{ backgroundColor: ACCENT }}
                      >
                        {t("personas.cta")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Right: métricas */}
                    <div className="grid grid-cols-3 gap-4">
                      {metricKeys.map((mk) => (
                        <div
                          key={mk}
                          className="rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-center"
                          style={{
                            backgroundColor: `${ACCENT}10`,
                            border: `1px solid ${ACCENT}20`,
                          }}
                        >
                          <span className="text-3xl font-black leading-none" style={{ color: ACCENT }}>
                            {t(`personas.items.${persona.key}.${mk}v`)}
                          </span>
                          <span className="text-xs text-muted-foreground leading-snug">
                            {t(`personas.items.${persona.key}.${mk}l`)}
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

        {/* ── 6. PRICING ── */}
        <section id="pricing" className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">

            <div className="max-w-4xl text-left mb-10">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
                  <path d="M7 7h.01"/>
                </svg>
                {t("pricing.badge")}
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                <Trans
                  i18nKey="pricing.title"
                  ns="agents"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle mt-4">
                {t("pricing.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
              {PLAN_KEYS.map(({ key, featureKeys, disabledKeys, highlight, hasBadge }) => (
                <div
                  key={key}
                  className={`relative rounded-3xl p-7 flex flex-col transition-all ${
                    highlight
                      ? "shadow-2xl md:-translate-y-2"
                      : "border border-border bg-card hover:-translate-y-1 hover:shadow-md"
                  }`}
                  style={
                    highlight
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
                  {hasBadge && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg"
                      style={{ background: ACCENT }}
                    >
                      {t(`pricing.plans.${key}.badge`)}
                    </span>
                  )}

                  <div className="mb-5">
                    <div
                      className="text-sm font-bold uppercase tracking-wider mb-2"
                      style={{ color: ACCENT }}
                    >
                      {t(`pricing.plans.${key}.name`)}
                    </div>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-4xl font-bold tracking-tight">{t(`pricing.plans.${key}.price`)}</span>
                      <span className="text-sm text-muted-foreground">{t(`pricing.plans.${key}.period`)}</span>
                    </div>
                    <div
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                    >
                      {t(`pricing.plans.${key}.credits`)}
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-4 text-sm flex-1">
                    {featureKeys.map((fk) => (
                      <li key={fk} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                        <span className="text-foreground/85">{t(`pricing.plans.${key}.${fk}`)}</span>
                      </li>
                    ))}
                  </ul>

                  {disabledKeys.length > 0 && (
                    <>
                      <div className="flex items-center gap-2 my-3">
                        <div className="flex-1 border-t border-dashed border-border" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">
                          {t("pricing.notIncluded")}
                        </span>
                        <div className="flex-1 border-t border-dashed border-border" />
                      </div>
                      <ul className="space-y-2.5 mb-5 text-sm">
                        {disabledKeys.map((dk) => (
                          <li key={dk} className="flex items-start gap-2 opacity-40">
                            <X className="h-4 w-4 mt-0.5 shrink-0" />
                            <span className="text-foreground/70 line-through">{t(`pricing.plans.${key}.${dk}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <Button
                    size="lg"
                    asChild
                    className={`w-full font-semibold mt-auto ${
                      highlight
                        ? "bg-[hsl(var(--agents))] hover:bg-[hsl(var(--agents))]/90 text-white"
                        : "bg-foreground/90 hover:bg-foreground text-background"
                    }`}
                  >
                    <Link to={localizedPath("/contato")} className="inline-flex items-center justify-center">
                      {t(`pricing.plans.${key}.cta`)}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Nota de rodapé dos planos */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
                <path d="M8 1.5L2 4v4c0 3.3 2.5 5.7 6 6.5 3.5-.8 6-3.2 6-6.5V4L8 1.5z" />
              </svg>
              <span>{t("pricing.footnote")}</span>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
