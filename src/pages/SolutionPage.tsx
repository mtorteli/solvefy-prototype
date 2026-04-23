import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SolutionPageProps {
  name: string;
  headline: string;
  desc: string;
  color: string;
  icon: string;
}

export const SolutionPage = ({ name, headline, desc, color, icon }: SolutionPageProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-6"
              style={{ backgroundColor: `${color}26`, color }}
            >
              <img src={icon} alt={name} className="w-4 h-4 object-contain" />
              {name}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-balance mb-6">
              {headline}
            </h1>
            <p className="text-lg text-muted-foreground leading-snug mb-8 text-balance">{desc}</p>
            <Button variant="hero" size="lg" className="group">
              Fale com um especialista
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SolutionPage;
