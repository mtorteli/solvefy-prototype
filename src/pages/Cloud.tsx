import { useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  Building2,
  Wallet,
  Layers,
  Server,
  Gauge,
  DatabaseBackup,
  HardDrive,
  Map,
  Users,
  BookOpen,
  X,
  Code2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { useRdStationLoader } from "@/lib/rdStation";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import { ProductHero } from "@/components/ProductHero";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";
import { useLocale } from "@/i18n/useLocale";
import iconCloud from "@/assets/icons/cloud.svg";
import logoCloud from "@/assets/logos/solvefy-cloud.png";
import { CloudHeroMockup } from "@/components/CloudHeroMockup";
import roiCalculatorHtml from "@/data/roi-calculator.html?raw";

const ACCENT = "hsl(var(--cloud))";

// Cards do bloco 1 — 3 simples + 3 com SVG inline
const BLOCK1_CARD_KEYS = [
  { key: "whitelabel",  iconEl: <Building2 className="h-5 w-5" /> },
  { key: "billing",     iconEl: <Wallet className="h-5 w-5" /> },
  { key: "portal",      iconEl: <Layers className="h-5 w-5" /> },
  { key: "sdn",         iconEl: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="1" width="6" height="4" rx="1"/><rect x="1" y="19" width="6" height="4" rx="1"/>
      <rect x="17" y="19" width="6" height="4" rx="1"/><rect x="9" y="10" width="6" height="4" rx="1"/>
      <line x1="12" y1="5" x2="12" y2="10"/><line x1="4" y1="19" x2="10" y2="14"/>
      <line x1="20" y1="19" x2="14" y2="14"/>
    </svg>
  ) },
  { key: "security",    iconEl: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  ) },
  { key: "performance", iconEl: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ) },
] as const;

const BLOCK2_KEYS: Array<{ key: string; icon: ReactNode }> = [
  { key: "sizing",     icon: <Gauge className="h-5 w-5" /> },
  { key: "cluster",    icon: <Server className="h-5 w-5" /> },
  { key: "backup",     icon: <DatabaseBackup className="h-5 w-5" /> },
  { key: "topology",   icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" /><circle cx="4" cy="20" r="2" /><circle cx="20" cy="20" r="2" />
      <line x1="12" y1="6" x2="12" y2="12" /><line x1="12" y1="12" x2="4" y2="18" /><line x1="12" y1="12" x2="20" y2="18" />
    </svg>
  ) },
  { key: "storage",    icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="6" rx="2" /><rect x="2" y="9" width="20" height="6" rx="2" /><rect x="2" y="16" width="20" height="6" rx="2" />
    </svg>
  ) },
  { key: "continuity", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />
    </svg>
  ) },
];

const BLOCK3_KEYS: Array<{ key: string; icon: ReactNode }> = [
  { key: "k8s",     icon: <Layers className="h-5 w-5" /> },
  { key: "rdbms",   icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ) },
  { key: "mongo",   icon: <HardDrive className="h-5 w-5" /> },
  { key: "observ",  icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
    </svg>
  ) },
  { key: "patroni", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <polyline points="9 11 12 14 15 11" />
    </svg>
  ) },
  { key: "k8sSec",  icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ) },
];

const BLOCK4_KEYS = [
  { key: "roadmap",    Icon: Map },
  { key: "onboarding", Icon: Users },
  { key: "knowledge",  Icon: BookOpen },
] as const;

const PLAN_KEYS = [
  { key: "next", featureKeys: ["f1","f2","f3","f4","f5","f6"] as const,        highlight: false, hasBadge: false },
  { key: "fast", featureKeys: ["f1","f2","f3","f4","f5","f6","f7"] as const,   highlight: true,  hasBadge: true },
  { key: "best", featureKeys: ["f1","f2","f3","f4","f5","f6","f7"] as const,   highlight: false, hasBadge: false },
] as const;

const Cloud = () => {
  const { t } = useTranslation("cloud");
  useRdStationLoader();
  const { locale, localizedPath } = useLocale();
  const [roiOpen, setRoiOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState<Record<string, number | null>>({});
  const [openCard, setOpenCard] = useState<number | null>(null);
  const reveal = useReveal();

  const toggle = (section: string, i: number) =>
    setOpenAcc((prev) => ({ ...prev, [section]: prev[section] === i ? null : i }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={t("meta.title")}
        description={t("meta.description")}
        canonical="/cloud"
        ogImage="/og/og-cloud.jpg"
        schemas={[
          serviceSchema(
            {
              name: "Solvefy/Cloud",
              description: t("meta.description"),
              path: "/cloud",
              serviceType: "Cloud hosting / IaaS",
              offers: { lowPrice: "990", highPrice: "2390", priceCurrency: "BRL" },
            },
            locale,
          ),
          breadcrumbSchema(
            [
              { name: t("meta.breadcrumbHome"), path: "/" },
              { name: t("meta.breadcrumbSelf"), path: "/cloud" },
            ],
            locale,
          ),
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Solvefy Cloud",
          applicationCategory: "BusinessApplication",
          description: t("meta.description"),
          operatingSystem: "Web",
          url: "https://mtorteli.github.io/solvefy-prototype/cloud",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "990",
            highPrice: "2390",
            priceCurrency: "BRL",
          },
        }}
      />
      <Header />

      {/* ── ROI MODAL ── */}
      {roiOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setRoiOpen(false); }}
        >
          <button
            onClick={() => setRoiOpen(false)}
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label={t("roiModal.closeAria")}
          >
            <X className="h-4 w-4" />
          </button>
          <div
            className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxHeight: "90vh" }}
          >
            <iframe
              srcDoc={roiCalculatorHtml}
              title={t("roiModal.iframeTitle")}
              className="w-full"
              style={{ height: "85vh", border: "none", display: "block" }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}

      <main id="main" className="flex-1">

        {/* ── HERO ── */}
        <ProductHero
          accentVar="--cloud"
          badgeIcon={iconCloud}
          badgeLabel="Solvefy/Cloud"
          logoImage={logoCloud}
          title={
            <Trans
              i18nKey="hero.title"
              ns="cloud"
              components={{ accent: <span className="text-[hsl(var(--cloud))]" /> }}
            />
          }
          subtitle={t("hero.subtitle")}
          ctaText={t("hero.cta")}
          ctaHref={localizedPath("/contato")}
          ctaTextColor="text-gray-950"
          ctaSecondary={{ text: t("hero.ctaSecondary"), onClick: () => setRoiOpen(true) }}
          trustItems={[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")]}
          right={<CloudHeroMockup />}
        />

        {/* ── BLOCO 1 ── */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-[hsl(var(--cloud-tint))]">
          <div
            className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="mb-10 md:mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t("block1.badge")}
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                <Trans
                  i18nKey="block1.title"
                  ns="cloud"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle mt-4">{t("block1.subtitle")}</p>
            </div>

            {/* 6-card accordion grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BLOCK1_CARD_KEYS.map(({ key, iconEl }, i) => (
                <motion.div
                  key={key}
                  initial={reveal ? { opacity: 0, y: 16 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  onClick={() => setOpenCard(openCard === i ? null : i)}
                  className="flex flex-col items-center rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl cursor-pointer select-none transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="flex flex-col items-center justify-center gap-3 w-full min-h-[148px] px-5 pt-5 pb-3 text-center">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                    >
                      {iconEl}
                    </div>
                    <h3 className="text-sm font-medium tracking-tight leading-snug">
                      {t(`block1.cards.${key}.title`)}
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground/40 transition-transform duration-200 ${openCard === i ? "rotate-180" : ""}`}
                    />
                  </div>

                  <div
                    className={`w-full overflow-hidden transition-all duration-300 px-5 ${
                      openCard === i ? "max-h-48 pb-5 opacity-100" : "max-h-0 pb-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3 text-left">
                      {t(`block1.cards.${key}.desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOCO 2 ── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-5"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                  {t("block2.badge")}
                </div>
                <h2 className="tracking-tight leading-tight text-balance mb-4">
                  <Trans
                    i18nKey="block2.title"
                    ns="cloud"
                    components={{ accent: <span style={{ color: ACCENT }} /> }}
                  />
                </h2>
                <p className="section-subtitle">{t("block2.subtitle")}</p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden">
                {BLOCK2_KEYS.map((item, i) => (
                  <div key={item.key} className={i < BLOCK2_KEYS.length - 1 ? "border-b border-border/60" : ""}>
                    <button
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-muted/30 transition-colors"
                      onClick={() => toggle("block2", i)}
                      aria-expanded={openAcc["block2"] === i}
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                      >
                        {item.icon}
                      </div>
                      <span className="flex-1 font-medium text-sm">{t(`block2.items.${item.key}.title`)}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${openAcc["block2"] === i ? "rotate-180" : ""}`}
                        style={{ color: ACCENT }}
                      />
                    </button>
                    {openAcc["block2"] === i && (
                      <div className="px-5 pb-4 pl-16 text-sm text-muted-foreground leading-relaxed">
                        {t(`block2.items.${item.key}.desc`)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOCO 3 ── */}
        <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: "#000" }}>
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full blur-3xl opacity-[0.06]"
            style={{ background: ACCENT }}
          />
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="max-w-4xl text-left mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-5"
                style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
                {t("block3.badge")}
              </div>
              <h2 className="tracking-tight leading-tight text-balance mb-4 text-white">
                <Trans
                  i18nKey="block3.title"
                  ns="cloud"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle" style={{ color: "rgba(255,255,255,0.6)" }}>
                {t("block3.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {BLOCK3_KEYS.map(({ key, icon }, i) => (
                <motion.article
                  key={key}
                  initial={reveal ? { opacity: 0, y: 20 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${ACCENT}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
                  >
                    {icon}
                  </div>
                  <h3 className="text-base font-bold tracking-tight mb-2 text-white">{t(`block3.items.${key}.title`)}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{t(`block3.items.${key}.desc`)}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOCO 4 ── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-5"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /><polyline points="8 13 10 15 16 9" />
                </svg>
                {t("block4.badge")}
              </div>
              <h2 className="tracking-tight leading-tight text-balance mb-4">
                <Trans
                  i18nKey="block4.title"
                  ns="cloud"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
              <p className="section-subtitle">{t("block4.subtitle")}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {BLOCK4_KEYS.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="rounded-2xl border border-border bg-card p-6"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight mb-2">{t(`block4.items.${key}.label`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`block4.items.${key}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="py-20 md:py-28 bg-[hsl(var(--cloud-tint))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                {t("pricing.badge")}
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                <Trans
                  i18nKey="pricing.title"
                  ns="cloud"
                  components={{ accent: <span style={{ color: ACCENT }} /> }}
                />
              </h2>
            </div>

            {/* 3 main plans */}
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {PLAN_KEYS.map(({ key, featureKeys, highlight, hasBadge }) => (
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
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-950 shadow-lg"
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
                    asChild
                    className={`w-full font-semibold ${
                      highlight
                        ? "bg-[hsl(var(--cloud))] hover:bg-[hsl(var(--cloud))]/90 text-gray-950"
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

            {/* Enterprise card */}
            <div
              className="mt-8 relative rounded-3xl p-8 md:p-10 overflow-hidden border"
              style={{
                borderColor: `${ACCENT}40`,
                background: "var(--dark-section-bg)",
                boxShadow: `0 24px 60px -30px ${ACCENT}80`,
              }}
            >
              <div
                className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl opacity-20"
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
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>
                      {t("pricing.enterprise.customPlanLabel")}
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                    {t("pricing.enterprise.name")}
                  </h3>
                  <p className="text-sm text-white/70 mb-5 max-w-xl">
                    {t("pricing.enterprise.desc")}
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-2 text-sm mb-6">
                    {(["b1","b2","b3","b4"] as const).map((bk) => (
                      <li key={bk} className="flex items-start gap-2 text-white/80">
                        <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                        {t(`pricing.enterprise.${bk}`)}
                      </li>
                    ))}
                  </ul>

                  {/* Accordion */}
                  <div
                    className="rounded-xl overflow-hidden border"
                    style={{ borderColor: `${ACCENT}30` }}
                  >
                    <button
                      className="w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-white/5"
                      onClick={() => toggle("enterprise", 0)}
                      aria-expanded={openAcc["enterprise"] === 0}
                    >
                      <span className="font-medium text-sm" style={{ color: ACCENT }}>
                        {t("pricing.enterprise.accordionTitle")}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${openAcc["enterprise"] === 0 ? "rotate-180" : ""}`}
                        style={{ color: ACCENT }}
                      />
                    </button>
                    {openAcc["enterprise"] === 0 && (
                      <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {t("pricing.enterprise.accordionBody")}
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    <Trans
                      i18nKey="pricing.enterprise.note"
                      ns="cloud"
                      components={{ strong: <span className="font-semibold" style={{ color: "rgba(255,255,255,0.55)" }} /> }}
                    />
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end justify-center gap-4">
                  <div
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold border"
                    style={{ color: ACCENT, borderColor: `${ACCENT}55`, backgroundColor: `${ACCENT}15` }}
                  >
                    {t("pricing.enterprise.priceTag")}
                  </div>
                  <Button
                    size="lg"
                    asChild
                    className="group font-semibold text-white w-full md:w-auto"
                    style={{ backgroundColor: ACCENT }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = `color-mix(in srgb, ${ACCENT} 90%, black)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = ACCENT;
                    }}
                  >
                    <Link to={localizedPath("/contato")}>
                      {t("pricing.enterprise.cta")}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
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

export default Cloud;
