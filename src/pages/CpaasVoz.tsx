import {
  PhoneCall,
  Combine,
  BadgePercent,
  Mic2,
  LogIn,
  Route,
  Send,
  Code2,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ProductHero } from "@/components/ProductHero";
import { FaqSection } from "@/components/FaqSection";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import { useLocale } from "@/i18n/useLocale";
import iconCpaas from "@/assets/icons/cpaas.svg";
import logoCpaas from "@/assets/logos/solvefy-cpaas.png";

const ACCENT = "hsl(var(--cpaas))";

const BENEFIT_KEYS = [
  { key: "combine", Icon: Combine },
  { key: "billing", Icon: BadgePercent },
  { key: "audio",   Icon: Mic2 },
] as const;

const STEP_KEYS = [
  { key: "login", Icon: LogIn,  img: "/images/cpaas/voz/passo-1-cadastro.svg" },
  { key: "build", Icon: Route,  img: "/images/cpaas/voz/passo-2-jornada.svg" },
  { key: "send",  Icon: Send,   img: "/images/cpaas/voz/passo-3-disparo.svg" },
] as const;

const USE_CASE_KEYS = [
  { key: "betting",    img: "/images/cpaas/voz/caso-betting.webp" },
  { key: "credit",     img: "/images/cpaas/voz/caso-consignado.webp" },
  { key: "collection", img: "/images/cpaas/voz/caso-cobranca.webp" },
  { key: "health",     img: "/images/cpaas/voz/caso-clinicas.webp" },
] as const;

const API_ITEMS = ["auth", "webhooks", "audio", "sandbox"] as const;
const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

const CpaasVoz = () => {
  const { t } = useTranslation("cpaasVoz");
  const { locale, localizedPath } = useLocale();

  const faqItems = FAQ_KEYS.map((k) => ({
    question: t(`faq.items.${k}.question`),
    answer: t(`faq.items.${k}.answer`),
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={t("meta.title")}
        description={t("meta.description")}
        canonical="/cpaas/voz"
        ogImage="/og/og-cpaas.jpg"
        schemas={[
          serviceSchema(
            {
              name: "Solvefy/CPaaS — Voz",
              description: t("meta.description"),
              path: "/cpaas/voz",
              serviceType: "Voice API",
            },
            locale,
          ),
          breadcrumbSchema(
            [
              { name: t("meta.breadcrumbHome"), path: "/" },
              { name: t("meta.breadcrumbCpaas"), path: "/cpaas" },
              { name: t("meta.breadcrumbSelf"), path: "/cpaas/voz" },
            ],
            locale,
          ),
        ]}
      />
      <Header />
      <main id="main" className="flex-1">
        <ProductHero
          accentVar="--cpaas"
          badgeIcon={iconCpaas}
          badgeLabel="Solvefy/CPaaS · Voz"
          logoImage={logoCpaas}
          title={
            <Trans
              i18nKey="hero.title"
              ns="cpaasVoz"
              components={{ accent: <span className="text-[hsl(var(--cpaas))]" /> }}
            />
          }
          subtitle={t("hero.subtitle")}
          ctaText={t("hero.cta")}
          ctaHref={localizedPath("/contato")}
          trustItems={[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")]}
          right={
            <img
              src="/images/cpaas/voz/voz-hero.webp"
              alt={t("hero.imgAlt")}
              className="w-full h-auto"
              loading="eager"
              decoding="async"
            />
          }
        />

        {/* Benefícios */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <PhoneCall className="h-3.5 w-3.5" />
                {t("benefits.badge")}
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                <Trans
                  i18nKey="benefits.title"
                  ns="cpaasVoz"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle mt-4">{t("benefits.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {BENEFIT_KEYS.map(({ key, Icon }) => (
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
                    {t(`benefits.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`benefits.items.${key}.desc`)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-16 bg-[hsl(var(--cpaas-tint))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                {t("steps.badge")}
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                <Trans
                  i18nKey="steps.title"
                  ns="cpaasVoz"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {STEP_KEYS.map(({ key, img }) => (
                <div
                  key={key}
                  className="rounded-2xl border border-border bg-card p-6 flex flex-col"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="h-32 flex items-center justify-center mb-4">
                    <img
                      src={img}
                      alt=""
                      aria-hidden="true"
                      className="max-h-full w-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {t(`steps.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`steps.items.${key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Casos de uso */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                {t("useCases.badge")}
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                <Trans
                  i18nKey="useCases.title"
                  ns="cpaasVoz"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle mt-4">{t("useCases.subtitle")}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {USE_CASE_KEYS.map(({ key, img }) => (
                <article
                  key={key}
                  className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="aspect-[16/9] bg-[hsl(var(--cpaas-tint))] flex items-center justify-center">
                    <img
                      src={img}
                      alt=""
                      aria-hidden="true"
                      className="max-h-full w-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {t(`useCases.items.${key}.sector`)}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {t(`useCases.items.${key}.desc`)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* API */}
        <section className="py-16 bg-[hsl(var(--cpaas-tint))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  {t("api.badge")}
                </div>
                <h2 className="tracking-tight leading-tight text-balance">
                  <Trans
                    i18nKey="api.title"
                    ns="cpaasVoz"
                    components={{ accent: <span style={{ color: ACCENT }} /> }}
                  />
                </h2>
                <p className="section-subtitle mt-4">{t("api.subtitle")}</p>
                <ul className="mt-6 space-y-3">
                  {API_ITEMS.map((k) => (
                    <li key={k} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      <span className="text-foreground/80">{t(`api.items.${k}`)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link to={localizedPath("/contato")}>
                    <Button variant="hero" size="lg" className="group text-black font-semibold">
                      {t("api.cta")}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/cpaas/voz/api-code.svg"
                  alt={t("api.imgAlt")}
                  className="w-full h-auto max-w-md"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection
          title={t("faq.title")}
          description={t("faq.description")}
          items={faqItems}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CpaasVoz;
