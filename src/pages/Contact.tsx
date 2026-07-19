import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema } from "@/lib/schemas";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/i18n/useLocale";
import { useReveal } from "@/hooks/useReveal";

const Contact = () => {
  const { t } = useTranslation("contato");
  const { locale } = useLocale();
  const reveal = useReveal();

  // Formulário de protótipo: não envia dados para lugar nenhum.
  const [sent, setSent] = useState(false);

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
                  {sent ? (
                    <div className="text-center py-10">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary text-2xl">✓</div>
                      <h2 className="text-xl font-bold mb-2">Mensagem registrada!</h2>
                      <p className="text-muted-foreground text-sm">
                        Este é um protótipo de demonstração — nenhum dado foi enviado ou armazenado.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1.5 text-sm font-medium">
                          Nome
                          <input required type="text" className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                        </label>
                        <label className="flex flex-col gap-1.5 text-sm font-medium">
                          E-mail
                          <input required type="email" className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                        </label>
                      </div>
                      <label className="flex flex-col gap-1.5 text-sm font-medium">
                        Empresa
                        <input type="text" className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                      </label>
                      <label className="flex flex-col gap-1.5 text-sm font-medium">
                        Como podemos ajudar?
                        <textarea rows={4} className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                      </label>
                      <button
                        type="submit"
                        className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-black hover:bg-primary/90 transition-colors"
                      >
                        Enviar
                      </button>
                      <p className="text-xs text-muted-foreground text-center">
                        Formulário de protótipo — não envia nem armazena dados.
                      </p>
                    </form>
                  )}
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
