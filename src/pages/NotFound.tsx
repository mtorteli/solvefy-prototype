import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/useLocale";

const NotFound = () => {
  const { t } = useTranslation("notFound");
  const { localizedPath } = useLocale();
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={t("meta.title")}
        description={t("meta.description")}
        canonical="/404"
        noindex
      />
      <Header />
      <main id="main" className="flex-1 flex items-center justify-center py-24 px-6">
        <div className="text-center max-w-lg">
          <div className="text-[120px] font-black leading-none tracking-tight text-foreground/10 select-none mb-2">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t("heading")}
          </h1>
          <p className="section-subtitle mb-8">
            {t("subtitle")}
          </p>
          <Button
            size="lg"
            asChild
            className="group font-semibold"
          >
            <a href={localizedPath("/") || "/"}>
              {t("cta")}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
