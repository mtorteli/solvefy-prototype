import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { organizationSchema, websiteSchema } from "@/lib/schemas";
import { useLocale } from "@/i18n/useLocale";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Solutions } from "@/components/Solutions";
import { Testimonial } from "@/components/Testimonial";
import { Values } from "@/components/Values";
import { Blog } from "@/components/Blog";
import { PressMedia } from "@/components/PressMedia";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { t } = useTranslation("home");
  const { locale } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("meta.title")}
        description={t("meta.description")}
        canonical="/"
        ogImage="/og/og-home.jpg"
        schemas={[organizationSchema(locale), websiteSchema(locale)]}
      />
      <Header />
      <main id="main">
        <Hero />
        <SocialProof />
        <Testimonial />
        <Solutions />
        <Values />
        <Blog />
        <PressMedia />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
