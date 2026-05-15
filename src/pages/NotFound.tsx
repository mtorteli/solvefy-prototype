import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Página não encontrada"
        description="A página que você procura não existe ou foi movida. Volte para a página inicial da Solvefy."
        canonical="/404"
        noindex
      />
      <Header />
      <main className="flex-1 flex items-center justify-center py-24 px-6">
        <div className="text-center max-w-lg">
          <div className="text-[120px] font-black leading-none tracking-tight text-foreground/10 select-none mb-2">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Página não encontrada
          </h1>
          <p className="section-subtitle mb-8">
            Parece que essa página foi movida ou não existe mais.
            Não se preocupe — a home tem tudo que você precisa.
          </p>
          <Button
            size="lg"
            asChild
            className="group font-semibold"
          >
            <a href="/">
              Voltar para a Home
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
