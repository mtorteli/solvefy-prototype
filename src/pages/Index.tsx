import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { FaqSection } from "@/components/FaqSection";
import { homeFaqs } from "@/data/faqs";
import { organizationSchema, websiteSchema } from "@/lib/schemas";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Solutions } from "@/components/Solutions";
import { Testimonial } from "@/components/Testimonial";
import { Values } from "@/components/Values";
import { Blog } from "@/components/Blog";
import { PressMedia } from "@/components/PressMedia";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Plataforma B2B de Comunicação Multicanal"
        description="A Solvefy conecta sua empresa aos clientes por WhatsApp, SMS, e-mail, voz e RCS. CRM, CPaaS, Marketing e Cloud em uma única plataforma."
        canonical="/"
        ogImage="/og/og-home.jpg"
        schemas={[organizationSchema(), websiteSchema()]}
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
        <FaqSection items={homeFaqs} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
