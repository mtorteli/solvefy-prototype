import { Trans, useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema } from "@/lib/schemas";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/i18n/useLocale";
import { RD_FORM_ID, useRdStationForm } from "@/lib/rdStation";
import { useReveal } from "@/hooks/useReveal";

const Contact = () => {
  const { t } = useTranslation("contato");
  const { locale } = useLocale();
  const reveal = useReveal();

  useRdStationForm(true);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={t("meta.title")}
        description={t("meta.description")}
        canonical="/contato"
        ogImage="/og/og-contato.jpg"
        schemas={[
          breadcrumbSchema(
            [
              { name: t("meta.breadcrumbHome"), path: "/" },
              { name: t("meta.breadcrumbSelf"), path: "/contato" },
            ],
            locale,
          ),
        ]}
      />
      <Header />
      <main id="main" className="flex-1 pt-12 md:pt-20">
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Content */}
              <motion.div
                initial={reveal ? { opacity: 0, x: -20 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
                  {t("hero.badge")}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  <Trans
                    i18nKey="hero.title"
                    ns="contato"
                    components={{
                      accent: <span className="text-primary text-glow" />,
                    }}
                  />
                </h1>
                <p className="section-subtitle mb-8 max-w-lg">
                  {t("hero.subtitle")}
                </p>
              </motion.div>

              {/* Right Side: Form */}
              <motion.div
                initial={reveal ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card rounded-[2rem] border border-border p-6 md:p-10 shadow-elegant relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div role="main" id={RD_FORM_ID}></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
