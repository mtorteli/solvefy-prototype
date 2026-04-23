import { Header } from "@/components/Header";
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
      <Header />
      <main>
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
