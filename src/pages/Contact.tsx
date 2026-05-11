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

    const injectSolucaoField = () => {
      const formContainer = document.getElementById("contato-solvefy-com-58c21822e6ec437325ca");
      if (!formContainer) return false;
      if (formContainer.querySelector("#solucao-interesse")) return true;

      // Encontra o campo "pessoas" pelo texto do label
      const labels = Array.from(formContainer.querySelectorAll("label"));
      const pessoasLabel = labels.find((l) =>
        (l.textContent || "").toLowerCase().includes("pessoas")
      );
      if (!pessoasLabel) return false;

      const pessoasField =
        pessoasLabel.closest(".bricks-form__field") ||
        pessoasLabel.closest(".bricks-form__static-field") ||
        pessoasLabel.parentElement;
      if (!pessoasField) return false;

      // Monta o campo
      const wrapper = document.createElement("div");
      wrapper.className = "bricks-form__field";

      const label = document.createElement("label");
      label.htmlFor = "solucao-interesse";
      label.textContent = "Qual solução você deseja comprar?";

      const select = document.createElement("select");
      select.id = "solucao-interesse";
      select.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`;
      select.style.backgroundRepeat = "no-repeat";
      select.style.backgroundPosition = "right 1rem center";
      select.style.paddingRight = "2.75rem";

      [
        { value: "",          text: "Selecione uma solução...", disabled: true,  selected: true  },
        { value: "cpaas",     text: "Solvefy CPaaS" },
        { value: "ads",       text: "Solvefy Ads" },
        { value: "marketing", text: "Solvefy Marketing" },
        { value: "crm",       text: "Solvefy CRM" },
        { value: "cloud",     text: "Solvefy Cloud" },
      ].forEach(({ value, text, disabled, selected }) => {
        const opt = document.createElement("option");
        opt.value = value;
        opt.textContent = text;
        if (disabled)  opt.disabled  = true;
        if (selected)  opt.selected  = true;
        select.appendChild(opt);
      });

      wrapper.appendChild(label);
      wrapper.appendChild(select);
      pessoasField.insertAdjacentElement("afterend", wrapper);
      return true;
    };

    const initForm = () => {
      // @ts-ignore
      if (window.RDStationForms) {
        // @ts-ignore
        new window.RDStationForms(
          "contato-solvefy-com-58c21822e6ec437325ca",
          "null",
        ).createForm();

        // Poll: preenche UTMs e injeta o campo de solução após "pessoas"
        const interval = setInterval(() => {
          injectSolucaoField();
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

                {/* ── Estilos do formulário RD Station ── */}
                <style dangerouslySetInnerHTML={{ __html: `
                  /* Fonte global */
                  #contato-solvefy-com-58c21822e6ec437325ca,
                  #contato-solvefy-com-58c21822e6ec437325ca * {
                    font-family: 'Pacaembu', 'Inter', system-ui, sans-serif !important;
                    box-sizing: border-box !important;
                  }

                  /* Inputs e textarea */
                  #contato-solvefy-com-58c21822e6ec437325ca input[type="text"],
                  #contato-solvefy-com-58c21822e6ec437325ca input[type="email"],
                  #contato-solvefy-com-58c21822e6ec437325ca input[type="tel"],
                  #contato-solvefy-com-58c21822e6ec437325ca input[type="number"],
                  #contato-solvefy-com-58c21822e6ec437325ca input[type="url"],
                  #contato-solvefy-com-58c21822e6ec437325ca textarea {
                    width: 100% !important;
                    border-radius: 0.5rem !important;
                    border: 1px solid hsl(var(--border)) !important;
                    background: hsl(var(--background)) !important;
                    padding: 0.75rem 1rem !important;
                    font-size: 0.875rem !important;
                    line-height: 1.5 !important;
                    color: hsl(var(--foreground)) !important;
                    outline: none !important;
                    box-shadow: none !important;
                    transition: border-color 0.15s, box-shadow 0.15s !important;
                    -webkit-appearance: none !important;
                    appearance: none !important;
                  }

                  /* Selects — padding explícito para evitar texto cortado */
                  #contato-solvefy-com-58c21822e6ec437325ca select {
                    width: 100% !important;
                    border-radius: 0.5rem !important;
                    border: 1px solid hsl(var(--border)) !important;
                    background: hsl(var(--background)) !important;
                    padding-top: 0.75rem !important;
                    padding-bottom: 0.75rem !important;
                    padding-left: 1rem !important;
                    padding-right: 2.5rem !important;
                    font-size: 0.875rem !important;
                    line-height: 1.5 !important;
                    min-height: 46px !important;
                    color: hsl(var(--foreground)) !important;
                    outline: none !important;
                    box-shadow: none !important;
                    transition: border-color 0.15s, box-shadow 0.15s !important;
                    -webkit-appearance: none !important;
                    appearance: none !important;
                    cursor: pointer !important;
                  }

                  /* Focus sutil — anel leve sem borda verde forte */
                  #contato-solvefy-com-58c21822e6ec437325ca input:focus,
                  #contato-solvefy-com-58c21822e6ec437325ca textarea:focus,
                  #contato-solvefy-com-58c21822e6ec437325ca select:focus {
                    border-color: hsl(var(--border)) !important;
                    box-shadow: 0 0 0 2px hsl(var(--primary) / 0.12) !important;
                    outline: none !important;
                  }

                  /* Labels */
                  #contato-solvefy-com-58c21822e6ec437325ca label {
                    display: block !important;
                    font-size: 0.875rem !important;
                    font-weight: 500 !important;
                    color: hsl(var(--foreground)) !important;
                    margin-bottom: 0.375rem !important;
                  }

                  /* Espaçamento entre campos */
                  #contato-solvefy-com-58c21822e6ec437325ca .bricks-form__field,
                  #contato-solvefy-com-58c21822e6ec437325ca .bricks-form__static-field {
                    margin-bottom: 1rem !important;
                  }

                  /* Botão de envio */
                  #contato-solvefy-com-58c21822e6ec437325ca input[type="submit"],
                  #contato-solvefy-com-58c21822e6ec437325ca button[type="submit"],
                  #contato-solvefy-com-58c21822e6ec437325ca .bricks-form__submit button {
                    width: 100% !important;
                    background-color: hsl(var(--primary)) !important;
                    color: #fff !important;
                    border: none !important;
                    border-radius: 0.5rem !important;
                    padding: 0.8rem 1.5rem !important;
                    font-size: 0.875rem !important;
                    font-weight: 600 !important;
                    cursor: pointer !important;
                    outline: none !important;
                    box-shadow: none !important;
                    transition: background-color 0.2s !important;
                    margin-top: 0.5rem !important;
                  }

                  #contato-solvefy-com-58c21822e6ec437325ca input[type="submit"]:hover,
                  #contato-solvefy-com-58c21822e6ec437325ca button[type="submit"]:hover,
                  #contato-solvefy-com-58c21822e6ec437325ca .bricks-form__submit button:hover {
                    background-color: hsl(var(--primary) / 0.88) !important;
                  }

                  #contato-solvefy-com-58c21822e6ec437325ca input[type="submit"]:focus,
                  #contato-solvefy-com-58c21822e6ec437325ca button[type="submit"]:focus {
                    outline: none !important;
                    box-shadow: none !important;
                  }
                ` }} />

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
