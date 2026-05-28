import { useState } from "react";
import { Play, X } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema } from "@/lib/schemas";
import { Footer } from "@/components/Footer";
import { Heading } from "@/components/ui/Typography";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useLocale } from "@/i18n/useLocale";
import somosOsSolvers from "@/assets/somos-os-solvers.png";
import solversHero from "@/assets/solvers-hero.png";
import logoSolvefyDark from "@/assets/logo-solvefy-dark.png";
import iconCloud from "@/assets/icons/cloud.svg";
import iconMarketing from "@/assets/icons/marketing.svg";
import iconCrm from "@/assets/icons/crm.svg";

const valueMeta = [
  { key: "owner",         icon: iconCloud,     color: "hsl(var(--cloud))" },
  { key: "initiative",    icon: iconMarketing, color: "hsl(var(--marketing))" },
  { key: "communication", icon: iconCrm,       color: "hsl(var(--crm))" },
] as const;

const QuemSomos = () => {
  const { t } = useTranslation("quemSomos");
  const { locale } = useLocale();
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={t("meta.title")}
        description={t("meta.description")}
        canonical="/quem-somos"
        ogImage="/og/og-quem-somos.jpg"
        schemas={[
          breadcrumbSchema(
            [
              { name: t("meta.breadcrumbHome"), path: "/" },
              { name: t("meta.breadcrumbSelf"), path: "/quem-somos" },
            ],
            locale,
          ),
        ]}
      />
      <Header />
      <main id="main" className="flex-1">
        {/* Bloco 1: Hero */}
        <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
          <img
            src={solversHero}
            alt={t("hero.imgAlt")}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 container mx-auto h-full w-full flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-2xl text-center mx-auto">
              <h1 className="sr-only">{t("hero.title")}</h1>
              <img
                src={somosOsSolvers}
                alt={t("hero.titleImgAlt")}
                className="block h-12 md:h-16 lg:h-20 w-auto object-contain drop-shadow-lg mx-auto"
              />
              <p className="max-w-xl mt-8 md:mt-10 text-white/95 font-light leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] mx-auto">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Bloco 2: Manifesto */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl mx-auto text-base md:text-lg leading-snug text-[#1e1e1e] text-left font-light">
              <h2 className="sr-only">{t("manifesto.srTitle")}</h2>
              <div className="space-y-6">
                <p className="font-light">{t("manifesto.p1")}</p>
                <p className="font-light">{t("manifesto.p2")}</p>
                <p className="font-light">{t("manifesto.p3")}</p>
                <p className="font-light">{t("manifesto.p4")}</p>
                <p className="font-light">{t("manifesto.p5")}</p>
              </div>

              <div className="mt-16 pt-10 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <img
                  src={logoSolvefyDark}
                  alt="Solvefy"
                  className="h-6 w-auto object-contain opacity-20 grayscale"
                />
                <p className="text-base md:text-lg font-medium tracking-tight m-0">
                  <Trans
                    i18nKey="manifesto.tagline"
                    ns="quemSomos"
                    components={{
                      dark: <span className="text-black" />,
                      accent: <span className="text-[hsl(var(--solve-green))]" />,
                    }}
                  />
                </p>
              </div>

              {/* Vídeo institucional — abaixo do manifesto, tamanho reduzido */}
              <div className="mt-12">
                <button
                  onClick={() => setVideoOpen(true)}
                  className="group relative w-full max-w-2xl mx-auto block rounded-2xl overflow-hidden shadow-elegant aspect-video focus:outline-none focus:ring-4 focus:ring-primary/40"
                  aria-label={t("video.buttonAria")}
                >
                  <img
                    src="/images/solvefy-capa.png"
                    alt={t("video.thumbnailAlt")}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 md:h-7 md:w-7 ml-1" fill="currentColor" />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
            <DialogContent className="max-w-4xl p-0 border-0 bg-black overflow-hidden">
              <DialogClose className="absolute right-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors">
                <X className="h-5 w-5" />
                <span className="sr-only">{t("video.close")}</span>
              </DialogClose>
              <div className="aspect-video w-full bg-black">
                <video
                  src="/video-institucional.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {/* Bloco 4: Nossos Valores */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-left w-full mb-12">
              <Heading className="leading-tight">{t("values.title")}</Heading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {valueMeta.map((v) => (
                <article
                  key={v.key}
                  className="group flex flex-col items-start rounded-2xl border border-border bg-card p-8 hover:shadow-elegant transition-all duration-300"
                  style={{ ["--card-accent" as any]: v.color }}
                >
                  <div
                    className="flex items-center justify-center h-10 w-10 rounded-xl mb-5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${v.color}1A` }}
                  >
                    <img src={v.icon} alt="" className="h-7 w-7 object-contain" />
                  </div>
                  <Heading variant="h3" className="text-left">
                    {t(`values.items.${v.key}.titleStart`)}
                    <span style={{ color: v.color }}>
                      {t(`values.items.${v.key}.titleAccent`)}
                    </span>
                  </Heading>
                  <p className="mt-3 text-muted-foreground leading-snug text-left">
                    {t(`values.items.${v.key}.desc`)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuemSomos;
