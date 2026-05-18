import { useEffect } from "react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema } from "@/lib/schemas";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const RD_FORM_ID = "contato-solvefy-com-58c21822e6ec437325ca";
const RD_SCRIPT_ID = "rd-station-forms-script";
const RD_SCRIPT_SRC =
  "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

const Contact = () => {
  useEffect(() => {
    const initForm = () => {
      // @ts-ignore
      new window.RDStationForms(RD_FORM_ID, "null").createForm();
    };

    const existing = document.getElementById(RD_SCRIPT_ID);
    if (existing) {
      initForm();
    } else {
      const script = document.createElement("script");
      script.id = RD_SCRIPT_ID;
      script.src = RD_SCRIPT_SRC;
      script.async = true;
      script.onload = initForm;
      document.body.appendChild(script);
    }

    return () => {
      const container = document.getElementById(RD_FORM_ID);
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Contato — Fale com a Solvefy"
        description="Entre em contato com nossa equipe comercial. Descubra como a Solvefy pode transformar a comunicação da sua empresa."
        canonical="/contato"
        ogImage="/og/og-contato.jpg"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contato", path: "/contato" },
          ]),
        ]}
      />
      <Header />
      <main id="main" className="flex-1 pt-12 md:pt-20">
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
                  Fale Conosco
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  Pronto para{" "}
                  <span className="text-primary text-glow">escalar</span> sua
                  comunicação?
                </h1>
                <p className="section-subtitle mb-8 max-w-lg">
                  Estamos prontos para ajudar sua empresa a se conectar melhor
                  com seus clientes. Preencha o formulário e receba um
                  diagnóstico personalizado.
                </p>
              </motion.div>

              {/* Right Side: Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
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
