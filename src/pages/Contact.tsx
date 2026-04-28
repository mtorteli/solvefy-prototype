import { useEffect } from "react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { captureUtms } from "@/lib/utms";
import { motion } from "framer-motion";

const Contact = () => {
  useEffect(() => {
    // Capture UTMs on mount
    captureUtms();

    // Load RD Station Script
    const scriptId = "rd-station-forms-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const hideUtmFields = () => {
      const labels = document.querySelectorAll('label');
      labels.forEach(label => {
        const text = label.textContent?.toLowerCase().trim() || '';
        if (text.startsWith('utm_')) {
          const container = label.closest('.bricks-form__field') || label.closest('.bricks-form__static-field') || label.parentElement;
          if (container) {
            (container as HTMLElement).style.setProperty('display', 'none', 'important');
            (container as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
            (container as HTMLElement).style.setProperty('height', '0', 'important');
            (container as HTMLElement).style.setProperty('margin', '0', 'important');
            (container as HTMLElement).style.setProperty('padding', '0', 'important');
            (container as HTMLElement).style.setProperty('position', 'absolute', 'important');
            (container as HTMLElement).style.setProperty('pointer-events', 'none', 'important');
          }
        }
      });
    };

    const fillUtms = () => {
      const utms = captureUtms();
      let filledCount = 0;
      
      const labels = document.querySelectorAll('label');
      labels.forEach(label => {
        const text = label.textContent?.toLowerCase().trim() || '';
        if (text.startsWith('utm_') && utms[text as keyof typeof utms]) {
          const inputId = label.getAttribute('for');
          let input = null;
          if (inputId) {
            input = document.getElementById(inputId);
          } else {
             const container = label.closest('.bricks-form__field') || label.parentElement;
             if (container) {
                 input = container.querySelector('input, textarea');
             }
          }
          
          if (input) {
            (input as HTMLInputElement).value = utms[text as keyof typeof utms];
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            filledCount++;
          }
        }
      });
      
      hideUtmFields(); // Always call this to ensure they hide
      return filledCount > 0;
    };

    const initForm = () => {
      // @ts-ignore
      if (window.RDStationForms) {
        // @ts-ignore
        new window.RDStationForms(
          "contato-solvefy-com-58c21822e6ec437325ca",
          "null",
        ).createForm();

        // Poll for form rendered to inject UTMs
        const interval = setInterval(() => {
          if (fillUtms()) {
            clearInterval(interval);
          }
        }, 500);
        setTimeout(() => clearInterval(interval), 10000); // stop after 10s
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";
      script.async = true;
      script.onload = initForm;
      document.body.appendChild(script);
    } else {
      initForm();
    }

    return () => {
      // Optional: Cleanup if navigating away
      // We don't remove the script to avoid reloading it multiple times,
      // but we might want to clear the form container.
      const formContainer = document.getElementById(
        "contato-solvefy-com-58c21822e6ec437325ca",
      );
      if (formContainer) formContainer.innerHTML = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Contato — Fale com a Solvefy"
        description="Entre em contato com nossa equipe comercial. Descubra como a Solvefy pode transformar a comunicação da sua empresa."
        canonical="/contato"
      />
      <Header />
      <main className="flex-1 pt-12 md:pt-20">
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
                  <div
                    role="main"
                    id="contato-solvefy-com-58c21822e6ec437325ca"
                  ></div>
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
