import {
  ArrowRight,
  ShoppingBag,
  Dice5,
  Building2,
  Cpu,
  TrendingDown,
  Check,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { AdsStepsFlow } from "@/components/AdsStepsFlow";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { useRdStationLoader } from "@/lib/rdStation";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import { ProductHero } from "@/components/ProductHero";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RDFormModal, RD_SCRIPT_ID, RD_SCRIPT_SRC } from "@/components/RDFormModal";
import iconAds from "@/assets/icons/ads.svg";
import logoAds from "@/assets/logos/solvefy-ads.png";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";
import { CpaasChannelFlow } from "@/components/CpaasChannelFlow";
import { Heading } from "@/components/ui/Typography";
import { AdsHeroMockup } from "@/components/AdsHeroMockup";
import { useLocale } from "@/i18n/useLocale";

const ACCENT = "hsl(var(--ads))";

const BEFORE_KEYS = ["p1", "p2", "p3"] as const;
const AFTER_KEYS  = ["p1", "p2", "p3"] as const;
const COMPARISON_KEYS = ["traditional", "solvefy"] as const;
const USE_CASE_KEYS = [
  { key: "ecommerce", Icon: ShoppingBag },
  { key: "igaming",   Icon: Dice5 },
  { key: "agencies",  Icon: Building2 },
  { key: "saas",      Icon: Cpu },
] as const;

const PRICING_KEYS = [
  { key: "performance", bullets: ["b1", "b2", "b3"] as const, highlight: false },
  { key: "reach",       bullets: ["b1", "b2", "b3"] as const, highlight: true },
] as const;

const Ads = () => {
  const { t } = useTranslation("ads");
  useRdStationLoader();
  const { locale } = useLocale();
  const [modalOpen, setModalOpen] = useState(false);

  // Pré-carrega o script da RD Station assim que a página monta,
  // para que o formulário abra instantaneamente quando o usuário clicar.
  useEffect(() => {
    if (document.getElementById(RD_SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = RD_SCRIPT_ID;
    script.src = RD_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={t("meta.title")}
        description={t("meta.description")}
        canonical="/ads"
        ogImage="/og/og-ads.jpg"
        schemas={[
          serviceSchema(
            {
              name: "Solvefy/Ads",
              description: t("meta.description"),
              path: "/ads",
              serviceType: "Paid traffic management",
            },
            locale,
          ),
          breadcrumbSchema(
            [
              { name: t("meta.breadcrumbHome"), path: "/" },
              { name: t("meta.breadcrumbSelf"), path: "/ads" },
            ],
            locale,
          ),
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Solvefy Ads",
          applicationCategory: "BusinessApplication",
          description: t("meta.description"),
          operatingSystem: "Web",
          url: "https://solvefy.com/ads",
        }}
      />
      <Header />
      <main id="main" className="flex-1">
        <ProductHero
          accentVar="--ads"
          badgeIcon={iconAds}
          badgeLabel="Solvefy/Ads"
          logoImage={logoAds}
          title={
            <Trans
              i18nKey="hero.title"
              ns="ads"
              components={{ accent: <span className="text-[hsl(var(--ads))]" /> }}
            />
          }
          subtitle={t("hero.subtitle")}
          ctaText={t("hero.cta")}
          ctaOnClick={() => setModalOpen(true)}
          ctaTextColor="text-gray-950"
          trustItems={[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")]}
          right={<AdsHeroMockup />}
        />

        {/* ============ DOR vs SOLUÇÃO ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <Heading className="text-balance">
                <Trans
                  i18nKey="problem.title"
                  ns="ads"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </Heading>
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
                  boxShadow: `0 12px 30px -15px rgba(255, 170, 0, 0.35)`,
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

        <AdsStepsFlow />

        {/* ============ CANAIS ============ */}
        <CpaasChannelFlow accent="#F0A800" accentBg="#FFF7E5" />

        <EcosystemDiagram accent="hsl(var(--ads))" />

        {/* ============ COMPARATIVO ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <h2 className="tracking-tight leading-tight text-balance">
                <Trans
                  i18nKey="comparison.title"
                  ns="ads"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle mt-4">{t("comparison.subtitle")}</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div>{t("comparison.headers.platform")}</div>
                <div>{t("comparison.headers.cpa")}</div>
                <div>{t("comparison.headers.autonomy")}</div>
                <div>{t("comparison.headers.stability")}</div>
              </div>

              {COMPARISON_KEYS.map((rowKey, i) => {
                const isHighlight = rowKey === "solvefy";
                return (
                  <div
                    key={rowKey}
                    className={`grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 px-6 py-5 ${
                      i !== COMPARISON_KEYS.length - 1 ? "border-b border-border" : ""
                    }`}
                    style={
                      isHighlight
                        ? { backgroundColor: `${ACCENT}10` }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="text-base font-bold tracking-tight"
                        style={isHighlight ? { color: ACCENT } : undefined}
                      >
                        {t(`comparison.rows.${rowKey}.name`)}
                      </span>
                      {isHighlight && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                          style={{ backgroundColor: ACCENT, color: "#0a0a0a" }}
                        >
                          {t("comparison.recommended")}
                        </span>
                      )}
                    </div>
                    {(["cpa", "autonomy", "stability"] as const).map((col) => (
                      <div key={col} className="flex items-start gap-2 text-sm">
                        {isHighlight ? (
                          <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                        ) : (
                          <X className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={
                            isHighlight
                              ? "text-foreground font-medium"
                              : "text-muted-foreground"
                          }
                        >
                          {t(`comparison.rows.${rowKey}.${col}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ PARA QUEM É ============ */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <h2 className="tracking-tight leading-tight text-balance">
                <Trans
                  i18nKey="useCases.title"
                  ns="ads"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {USE_CASE_KEYS.map(({ key, Icon }) => (
                <article
                  key={key}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ACCENT;
                    e.currentTarget.style.boxShadow = `0 12px 40px -12px ${ACCENT}55`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "var(--shadow-soft)";
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl mb-5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {t(`useCases.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                    {t(`useCases.items.${key}.desc`)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRECIFICAÇÃO ============ */}
        <section className="py-16 bg-[hsl(var(--ads-tint))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <h2 className="tracking-tight leading-tight text-balance">
                <Trans
                  i18nKey="pricing.title"
                  ns="ads"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle mt-4">{t("pricing.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {PRICING_KEYS.map(({ key, bullets, highlight }) => (
                <div
                  key={key}
                  className={`relative rounded-3xl p-8 flex flex-col transition-all ${
                    highlight
                      ? "shadow-2xl"
                      : "border border-border bg-card hover:-translate-y-1 hover:shadow-md"
                  }`}
                  style={
                    highlight
                      ? {
                          borderWidth: "2px",
                          borderStyle: "solid",
                          borderColor: ACCENT,
                          background: `linear-gradient(160deg, ${ACCENT}18 0%, hsl(var(--card)) 55%)`,
                          boxShadow: `0 32px 80px -24px ${ACCENT}99`,
                        }
                      : undefined
                  }
                >
                  {highlight && (
                    <span
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-950 shadow-lg"
                      style={{ background: ACCENT }}
                    >
                      {t("pricing.mostChosen")}
                    </span>
                  )}

                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: ACCENT }}
                  >
                    {t(`pricing.plans.${key}.name`)}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4">
                    {t(`pricing.plans.${key}.desc`)}
                  </h3>

                  <div
                    className="w-12 h-1 rounded-full mb-6"
                    style={{ background: ACCENT }}
                  />

                  <ul className="space-y-3 mb-8 text-sm flex-1">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                        <span className="text-foreground/85">{t(`pricing.plans.${key}.${b}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    onClick={() => setModalOpen(true)}
                    className="w-full group font-semibold mt-auto bg-[hsl(var(--ads))] hover:bg-[hsl(var(--ads))]/90 text-gray-950"
                  >
                    {t(`pricing.plans.${key}.cta`)}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <RDFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Ads;
