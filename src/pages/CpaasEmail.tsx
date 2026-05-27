import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema } from "@/lib/schemas";
import { useLocale } from "@/i18n/useLocale";

const CpaasEmail = () => {
  const { t } = useTranslation("cpaasComingSoon");
  const { locale } = useLocale();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={t("email.metaTitle")}
        description={t("email.metaDescription")}
        canonical="/cpaas/email"
        noindex
        schemas={[
          breadcrumbSchema(
            [
              { name: t("common.breadcrumbHome"), path: "/" },
              { name: t("common.breadcrumbCpaas"), path: "/cpaas" },
              { name: t("email.breadcrumbSelf"), path: "/cpaas/email" },
            ],
            locale,
          ),
        ]}
      />
      <Header />
      <main id="main" className="flex-1">
        <section className="py-24 bg-[hsl(var(--cpaas-tint))]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
              style={{
                backgroundColor: "hsl(var(--cpaas) / 0.1)",
                color: "hsl(var(--cpaas))",
              }}
            >
              {t("email.badge")}
            </div>
            <h1 className="tracking-tight leading-tight text-balance">
              {t("common.soonHeading")}
              <span className="text-[hsl(var(--cpaas))]">
                {t("email.soonHighlight")}
              </span>
            </h1>
            <p className="section-subtitle mt-4">
              {t("common.soonBody", { channel: t("email.channelName") })}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CpaasEmail;
