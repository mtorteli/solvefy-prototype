import { useState } from "react";
import {
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
import { Trans, useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import { ProductHero } from "@/components/ProductHero";
import { PricingCustomPlan } from "@/components/PricingCustomPlan";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import iconMarketing from "@/assets/icons/marketing.svg";
import logoMarketing from "@/assets/logos/solvefy-marketing.png";
import { MarketingHeroMockup } from "@/components/MarketingHeroMockup";
import { CpaasChannelFlow } from "@/components/CpaasChannelFlow";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";
import { Heading, SectionSubtitle } from "@/components/ui/Typography";
import { useReveal } from "@/hooks/useReveal";
import { useLocale } from "@/i18n/useLocale";

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

const PAIN_KEYS = [
  { key: "automation",  Icon: Workflow },
  { key: "conversion",  Icon: TrendingUp },
  { key: "centralized", Icon: Layers },
] as const;

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

const EASY_IA_PILLS = [
  { key: "copy", Icon: Wand2 },
  { key: "ab",   Icon: FlaskConical },
  { key: "seg",  Icon: Users },
] as const;

const PLAN_KEYS = [
  { key: "next", featureKeys: ["f1","f2","f3","f4","f5","f6","f7"] as const, soonKeys: [] as readonly string[],         highlight: false, hasBadge: false },
  { key: "fast", featureKeys: ["f1","f2","f3","f4","f5","f6","f7"] as const, soonKeys: [] as readonly string[],         highlight: true,  hasBadge: true },
  { key: "best", featureKeys: ["f1","f2","f3","f4"] as const,                soonKeys: ["soon1","soon2"] as readonly string[], highlight: false, hasBadge: false },
] as const;

const Marketing = () => {
  const { t } = useTranslation("marketing");
  const { locale } = useLocale();
  const [isAnnual, setIsAnnual] = useState(false);
  const reveal = useReveal();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={t("meta.title")}
        description={t("meta.description")}
        canonical="/marketing"
        ogImage="/og/og-marketing.jpg"
        schemas={[
          serviceSchema(
            {
              name: "Solvefy/Marketing",
              description: t("meta.description"),
              path: "/marketing",
              serviceType: "Marketing automation",
              offers: { lowPrice: "197", highPrice: "1997", priceCurrency: "BRL" },
            },
            locale,
          ),
          breadcrumbSchema(
            [
              { name: t("meta.breadcrumbHome"), path: "/" },
              { name: t("meta.breadcrumbSelf"), path: "/marketing" },
            ],
            locale,
          ),
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Solvefy Marketing",
          applicationCategory: "BusinessApplication",
          description: t("meta.description"),
          operatingSystem: "Web",
          url: "https://solvefy.com/marketing",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "197",
            highPrice: "1997",
            priceCurrency: "BRL",
          },
        }}
      />
      <Header />
      <main id="main" className="flex-1">
        <ProductHero
          accentVar="--marketing"
          badgeIcon={iconMarketing}
          badgeLabel="Solvefy/Marketing"
          logoImage={logoMarketing}
          title={
            <Trans
              i18nKey="hero.title"
              ns="marketing"
              components={{ accent: <span className="text-[hsl(var(--marketing))]" /> }}
            />
          }
          subtitle={t("hero.subtitle")}
          ctaText={t("hero.cta")}
          ctaHref="https://disparopro.com.br/cadastro"
          trustItems={[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")]}
          right={<MarketingHeroMockup />}
        />

        {/* ============ INTEGRAÇÕES VIA API ============ */}
        <section className="py-12 md:py-16 bg-white border-y border-border/60">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm md:text-base font-normal text-muted-foreground/60 mb-8">
              {t("integrations.title")}
            </p>

            <div className="relative overflow-hidden">
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
                        style={{ filter: "grayscale(1) brightness(0.55) contrast(1.1)" }}
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

        {/* ============ DORES & POSICIONAMENTO ============ */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-white">
          <div
            className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12 md:mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t("painCards.badge")}
              </div>
              <Heading className="text-balance">
                <Trans
                  i18nKey="painCards.title"
                  ns="marketing"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {PAIN_KEYS.map(({ key, Icon }, i) => (
                <motion.article
                  key={key}
                  initial={reveal ? { opacity: 0, y: 20 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative h-full rounded-3xl p-8 border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{ boxShadow: "0 12px 40px -20px rgba(0,0,0,0.12)" }}
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
                    {t(`painCards.items.${key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`painCards.items.${key}.desc`)}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CANAIS ============ */}
        <CpaasChannelFlow accent="#E64499" accentBg="#FFE9F5" />

        {/* ============ ECOSSISTEMA ============ */}
        <EcosystemDiagram accent={ACCENT} />

        {/* ============ EASY IA ============ */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0f]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
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
              initial={reveal ? { opacity: 0, y: 24 } : false}
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
                  {t("easyIa.badge")}
                </div>

                <Heading className="text-white mb-6">
                  <Trans
                    i18nKey="easyIa.title"
                    ns="marketing"
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
                </Heading>

                <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mb-8">
                  {t("easyIa.subtitle")}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {EASY_IA_PILLS.map(({ key, Icon }) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur"
                    >
                      <Icon className="h-4 w-4" style={{ color: ACCENT }} />
                      {t(`easyIa.pills.${key}`)}
                    </span>
                  ))}
                </div>

                <Button
                  size="lg"
                  disabled
                  className="bg-[hsl(var(--marketing))]/60 text-white font-semibold cursor-default"
                >
                  {t("easyIa.cta")}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section className="py-20 md:py-28 bg-white">
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
              <Heading className="text-balance">
                <Trans
                  i18nKey="pricing.title"
                  ns="marketing"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </Heading>
              <SectionSubtitle className="mt-4">
                {t("pricing.subtitle")}
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
                  {t("pricing.monthly")}
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
                  {t("pricing.annual")}
                </button>
              </div>
              <p className="text-sm font-semibold" style={{ color: ACCENT }}>
                {t("pricing.annualSave")}
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {PLAN_KEYS.map(({ key, featureKeys, soonKeys, highlight, hasBadge }) => (
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
                      className="text-sm font-bold uppercase tracking-wider mb-1"
                      style={{ color: ACCENT }}
                    >
                      {t(`pricing.plans.${key}.name`)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                      {t(`pricing.plans.${key}.desc`)}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">
                        {isAnnual ? t(`pricing.plans.${key}.annual`) : t(`pricing.plans.${key}.monthly`)}
                      </span>
                      <span className="text-sm text-muted-foreground">{t(`pricing.plans.${key}.period`)}</span>
                    </div>
                    {isAnnual && (
                      <p className="mt-1 text-xs font-medium" style={{ color: ACCENT }}>
                        {t("pricing.billedAnnually")}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-2.5 mb-4 text-sm flex-1">
                    {featureKeys.map((fk) => (
                      <li key={fk} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                        <span className="text-foreground/85">{t(`pricing.plans.${key}.${fk}`)}</span>
                      </li>
                    ))}
                  </ul>

                  {soonKeys.length > 0 && (
                    <>
                      <div className="flex items-center gap-2 my-3">
                        <div className="flex-1 border-t border-dashed border-border" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">
                          {t("pricing.comingSoonDivider")}
                        </span>
                        <div className="flex-1 border-t border-dashed border-border" />
                      </div>
                      <ul className="space-y-2.5 mb-5 text-sm">
                        {soonKeys.map((sk) => (
                          <li key={sk} className="flex items-start gap-2 opacity-55">
                            <Clock className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                            <span className="text-foreground/70">{t(`pricing.plans.${key}.${sk}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <Button
                    size="lg"
                    disabled
                    className="w-full font-semibold mt-auto cursor-default opacity-60"
                  >
                    {t("pricing.comingSoon")}
                  </Button>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
              <Trans
                i18nKey="pricing.footerNote"
                ns="marketing"
                components={{ strong: <span className="font-semibold text-foreground/70" /> }}
              />
            </p>

            <div className="mt-8">
              <PricingCustomPlan
                accentVar="--marketing"
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

export default Marketing;
