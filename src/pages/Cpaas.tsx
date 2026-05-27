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
import { Trans, useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import { ProductHero } from "@/components/ProductHero";
import { PricingCustomPlan } from "@/components/PricingCustomPlan";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/i18n/useLocale";
import iconCpaas from "@/assets/icons/cpaas.svg";
import logoCpaas from "@/assets/logos/solvefy-cpaas.png";

import { UseCasesSelector } from "@/components/UseCasesSelector";
import { CpaasChannelFlow } from "@/components/CpaasChannelFlow";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";
import { CpaasHeroMockup } from "@/components/CpaasHeroMockup";

const ACCENT = "hsl(var(--cpaas))";

const INFRA_KEYS = [
  { key: "nativeOperator", Icon: Globe2 },
  { key: "directRoutes",   Icon: Network },
  { key: "humanSupport",   Icon: Headphones },
  { key: "brlBilling",     Icon: Banknote },
] as const;

const COMPLIANCE_KEYS = [
  { key: "lgpd",       Icon: FileCheck2 },
  { key: "encryption", Icon: Lock },
  { key: "consent",    Icon: KeyRound },
] as const;

const Cpaas = () => {
  const { t } = useTranslation("cpaas");
  const { locale, localizedPath } = useLocale();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={t("meta.title")}
        description={t("meta.description")}
        canonical="/cpaas"
        ogImage="/og/og-cpaas.jpg"
        schemas={[
          serviceSchema(
            {
              name: "Solvefy/CPaaS",
              description: t("meta.description"),
              path: "/cpaas",
              serviceType: "CPaaS — Communications Platform as a Service",
            },
            locale,
          ),
          breadcrumbSchema(
            [
              { name: t("meta.breadcrumbHome"), path: "/" },
              { name: t("meta.breadcrumbSelf"), path: "/cpaas" },
            ],
            locale,
          ),
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Solvefy CPaaS",
          applicationCategory: "BusinessApplication",
          description: t("meta.description"),
          operatingSystem: "Web",
          url: `https://solvefy.com${locale === "pt-BR" ? "/cpaas" : `/${locale === "en" ? "en" : "es"}/cpaas`}`,
          offers: {
            "@type": "Offer",
            priceCurrency: "BRL",
            description: t("pricing.plan.footer"),
          },
        }}
      />
      <Header />
      <main id="main" className="flex-1">
        <ProductHero
          accentVar="--cpaas"
          badgeIcon={iconCpaas}
          badgeLabel="Solvefy/CPaaS"
          logoImage={logoCpaas}
          title={
            <Trans
              i18nKey="hero.title"
              ns="cpaas"
              components={{ accent: <span className="text-[hsl(var(--cpaas))]" /> }}
            />
          }
          subtitle={t("hero.subtitle")}
          ctaText={t("hero.cta")}
          ctaHref={localizedPath("/contato")}
          trustItems={[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")]}
          right={<CpaasHeroMockup />}
        />

        {/* História + Infra */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {t("history.badge")}
                </div>
                <h2 className="tracking-tight leading-tight text-balance mb-5">
                  <Trans
                    i18nKey="history.title"
                    ns="cpaas"
                    components={{ accent: <span style={{ color: ACCENT }} /> }}
                  />
                </h2>
                <p className="section-subtitle mb-6">{t("history.subtitle")}</p>
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
                    <Trans
                      i18nKey="history.callout"
                      ns="cpaas"
                      components={{ strong: <span className="font-semibold text-foreground" /> }}
                    />
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-10">
                {INFRA_KEYS.map(({ key, Icon }) => {
                  const badge = key === "nativeOperator" ? t("infra.nativeOperator.badge") : undefined;
                  return (
                    <div
                      key={key}
                      className="rounded-2xl border border-border bg-card p-5 flex flex-col items-start text-left"
                      style={{ boxShadow: "var(--shadow-soft)" }}
                    >
                      <div className="flex items-center gap-2.5 mb-4">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        {badge && (
                          <span
                            className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold leading-none"
                            style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                          >
                            {badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-semibold tracking-tight mb-1.5">
                        {t(`infra.${key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`infra.${key}.desc`)}
                      </p>
                    </div>
                  );
                })}
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
                <Trans
                  i18nKey="useCases.title"
                  ns="cpaas"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
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
                {t("security.badge")}
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                <Trans
                  i18nKey="security.title"
                  ns="cpaas"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle mt-4">{t("security.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {COMPLIANCE_KEYS.map(({ key, Icon }) => (
                <article
                  key={key}
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
                    {t(`security.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`security.items.${key}.desc`)}
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
                {t("pricing.badge")}
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                <Trans
                  i18nKey="pricing.title"
                  ns="cpaas"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle mt-4">{t("pricing.subtitle")}</p>
            </div>

            <PricingCustomPlan
              accentVar="--cpaas"
              title={t("pricing.plan.title")}
              description={t("pricing.plan.desc")}
              bullets={[
                t("pricing.plan.b1"),
                t("pricing.plan.b2"),
                t("pricing.plan.b3"),
                t("pricing.plan.b4"),
              ]}
              badgeText={t("pricing.customBadge")}
              customPlanLabel={t("pricing.customPlanLabel")}
              ctaText={t("pricing.plan.cta")}
              ctaHref={localizedPath("/contato")}
              footerText={t("pricing.plan.footer")}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cpaas;
