import {
  Kanban,
  Bell,
  BarChart3,
  Check,
  Sparkles,
  Rocket,
  TrendingDown,
  X,
} from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { useRdStationLoader } from "@/lib/rdStation";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import { ProductHero } from "@/components/ProductHero";
import { PricingCustomPlan } from "@/components/PricingCustomPlan";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/useLocale";
import iconCrm from "@/assets/icons/crm.svg";
import logoCrm from "@/assets/logos/solvefy-crm.png";
import { WhatsappChannelIcon } from "@/components/icons/ChannelIcons";
import { CrmHeroMockup } from "@/components/CrmHeroMockup";
import { CpaasChannelFlow } from "@/components/CpaasChannelFlow";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";

const ACCENT = "hsl(var(--crm))";

const FEATURE_KEYS = [
  { key: "pipeline",   Icon: Kanban },
  { key: "engagement", Icon: WhatsappChannelIcon },
  { key: "alerts",     Icon: Bell },
  { key: "analytics",  Icon: BarChart3 },
] as const;

const BEFORE_KEYS = ["p1", "p2", "p3", "p4"] as const;
const AFTER_KEYS  = ["p1", "p2", "p3", "p4"] as const;

const PLAN_KEYS = [
  { key: "fast", featureKeys: ["f1", "f2", "f3", "f4", "f5"] as const,        highlight: false },
  { key: "best", featureKeys: ["f1", "f2", "f3", "f4", "f5", "f6"] as const,  highlight: true },
] as const;

const Crm = () => {
  const { t } = useTranslation("crm");
  useRdStationLoader();
  const { locale } = useLocale();

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SEO
        title={t("meta.title")}
        description={t("meta.description")}
        canonical="/crm"
        ogImage="/og/og-crm.jpg"
        schemas={[
          serviceSchema(
            {
              name: "Solvefy/CRM",
              description: t("meta.description"),
              path: "/crm",
              serviceType: "CRM omnichannel",
              offers: { lowPrice: "47", highPrice: "97", priceCurrency: "BRL" },
            },
            locale,
          ),
          breadcrumbSchema(
            [
              { name: t("meta.breadcrumbHome"), path: "/" },
              { name: t("meta.breadcrumbSelf"), path: "/crm" },
            ],
            locale,
          ),
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Solvefy CRM",
          applicationCategory: "BusinessApplication",
          description: t("meta.description"),
          operatingSystem: "Web",
          url: "https://mtorteli.github.io/solvefy-prototype/crm",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "47",
            highPrice: "97",
            priceCurrency: "BRL",
          },
        }}
      />
      <Header />
      <main id="main" className="flex-1 overflow-x-hidden">
        <ProductHero
          accentVar="--crm"
          badgeIcon={iconCrm}
          badgeLabel="Solvefy/CRM"
          logoImage={logoCrm}
          title={
            <Trans
              i18nKey="hero.title"
              ns="crm"
              components={{ accent: <span className="text-[hsl(var(--crm))]" /> }}
            />
          }
          subtitle={t("hero.subtitle")}
          ctaText={t("hero.cta")}
          trustItems={[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")]}
          right={<CrmHeroMockup />}
        />

        {/* ============ Problem vs Solution ============ */}
        <section className="py-16 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4 bg-[hsl(var(--crm))]/10 text-[hsl(var(--crm))]">
                <Sparkles className="h-3.5 w-3.5" />
                {t("problem.badge")}
              </div>
              <h2 className="tracking-tight text-balance mb-4">
                <Trans
                  i18nKey="problem.title"
                  ns="crm"
                  components={{ accent: <span className="text-[hsl(var(--crm))]" /> }}
                />
              </h2>
              <p className="section-subtitle">{t("problem.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Card 1 — Problema */}
              <div className="relative rounded-2xl bg-card border border-border p-7 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    <TrendingDown className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-destructive">
                    {t("problem.before.eyebrow")}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                  {t("problem.before.title")}
                </h3>
                <ul className="space-y-3 text-base text-foreground/80">
                  {BEFORE_KEYS.map((k) => (
                    <li key={k} className="flex items-start gap-2">
                      <X className="h-4 w-4 mt-0.5 text-destructive shrink-0" />
                      {t(`problem.before.${k}`)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2 — Solução */}
              <div
                className="relative rounded-2xl p-7 overflow-hidden border border-border transition-all hover:-translate-y-1"
                style={{
                  background: `linear-gradient(165deg, #ffffff 0%, ${ACCENT}08 100%)`,
                  boxShadow: `0 12px 30px -15px ${ACCENT}55`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: ACCENT }}
                  >
                    {t("problem.after.eyebrow")}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                  {t("problem.after.title")}
                </h3>
                <p className="text-sm text-foreground/85 leading-relaxed mb-4">
                  {t("problem.after.subtitle")}
                </p>
                <ul className="space-y-3 text-sm text-foreground/85">
                  {AFTER_KEYS.map((k) => (
                    <li key={k} className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                      {t(`problem.after.${k}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ Features ============ */}
        <section className="bg-[hsl(var(--crm-tint))] py-16 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl mb-10 md:mb-12">
              <h2 className="tracking-tight text-balance mb-4">
                <Trans
                  i18nKey="features.title"
                  ns="crm"
                  components={{ accent: <span className="text-[hsl(var(--crm))]" /> }}
                />
              </h2>
              <p className="section-subtitle">{t("features.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
              {FEATURE_KEYS.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: `${ACCENT}1a`, color: ACCENT }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {t(`features.items.${key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {t(`features.items.${key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CHANNELS — Animated Flow ============ */}
        <CpaasChannelFlow accent="hsl(var(--crm))" accentBg="#FFEEE5" />

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
                  {t("trial.badge")}
                </div>

                <h2 className="tracking-tight leading-[1.1] md:leading-[1.05] text-white mb-4 md:mb-6">
                  <Trans
                    i18nKey="trial.title"
                    ns="crm"
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

                <p className="text-sm md:text-lg text-white/70 leading-relaxed max-w-2xl mb-6 md:mb-8">
                  {t("trial.subtitle")}
                </p>

                <Button
                  size="lg"
                  disabled
                  className="w-full sm:w-auto bg-[hsl(var(--crm))]/60 text-white font-semibold cursor-default"
                >
                  {t("trial.cta")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ============ Ecossistema ============ */}
        <EcosystemDiagram accent="hsl(var(--crm))" />

        {/* ============ PRICING ============ */}
        <section className="py-16 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-10 md:mb-14">
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
                  ns="crm"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle mt-4">{t("pricing.subtitle")}</p>
            </div>

            {/* 2 main plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {PLAN_KEYS.map(({ key, featureKeys, highlight }) => (
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
                  {highlight && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-lg"
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
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">{t(`pricing.plans.${key}.price`)}</span>
                      <span className="text-sm text-muted-foreground">{t(`pricing.plans.${key}.period`)}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t("pricing.idealFor")}: <span className="text-foreground/80">{t(`pricing.plans.${key}.ideal`)}</span>
                    </p>
                  </div>

                  <ul className="space-y-2.5 mb-7 text-sm flex-1">
                    {featureKeys.map((fk) => (
                      <li key={fk} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                        <span className="text-foreground/85">{t(`pricing.plans.${key}.${fk}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    disabled
                    className="w-full font-semibold cursor-default opacity-60"
                  >
                    {t("pricing.comingSoon")}
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PricingCustomPlan
                accentVar="--crm"
                title={t("pricing.enterprise.name")}
                description={t("pricing.enterprise.ideal")}
                bullets={[
                  t("pricing.enterprise.b1"),
                  t("pricing.enterprise.b2"),
                  t("pricing.enterprise.b3"),
                  t("pricing.enterprise.b4"),
                ]}
                badgeText={t("pricing.enterprise.priceTag")}
                customPlanLabel={t("pricing.enterprise.customPlanLabel")}
                ctaText={t("pricing.enterprise.cta")}
                accordionTitle={t("pricing.enterprise.accordionTitle")}
                accordionBody={t("pricing.enterprise.accordionBody")}
                footerText={t("pricing.enterprise.footer")}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Crm;
