import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema } from "@/lib/schemas";

const CpaasEmail = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="E-mail — Solvefy/CPaaS"
        description="API de E-mail da Solvefy/CPaaS: entrega transacional e em massa com alta reputação e relatórios completos."
        canonical="/cpaas/email"
        noindex
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solvefy/CPaaS", path: "/cpaas" },
            { name: "E-mail", path: "/cpaas/email" },
          ]),
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
              Solvefy/CPaaS · E-mail
            </div>
            <h1 className="tracking-tight leading-tight text-balance">
              Em breve:{" "}
              <span className="text-[hsl(var(--cpaas))]">API de E-mail</span>
            </h1>
            <p className="section-subtitle mt-4">
              Esta página está em construção. Em breve, detalhes sobre o canal
              de E-mail da Solvefy/CPaaS.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CpaasEmail;
