import { useEffect } from "react";
import { isPrerender } from "@/hooks/useReveal";
import { CONSENT_UPDATED_EVENT, readConsent } from "@/lib/consent";
import { posthog } from "@/lib/posthog";

export const RD_FORM_ID = "contato-solvefy-com-58c21822e6ec437325ca";
export const RD_SCRIPT_ID = "rd-station-forms-script";
export const RD_SCRIPT_SRC =
  "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

export const RD_LOADER_SCRIPT_ID = "rd-station-loader-script";
export const RD_LOADER_SRC =
  "https://d335luupugsy2.cloudfront.net/js/loader-scripts/e6cade46-582b-4d8d-9c92-e298a07c179d-loader.js";

/**
 * Injeta o código de monitoramento do RD Station Marketing (rastreio de visitas
 * e conversões). Diferente do script de Forms, este é um loader de tracking.
 *
 * Escopo: chamado apenas nas páginas de produto e landing pages de oferta — não
 * é global. Respeita o consentimento de cookies (categoria "Publicidade"/`ads`)
 * e injeta uma única vez. Se o visitante aceitar os cookies enquanto está na
 * página, o evento `solvefy:consent-updated` (disparado pelo `CookieBanner`)
 * dispara a injeção na hora, cobrindo conversões já na primeira página.
 */
export function useRdStationLoader() {
  useEffect(() => {
    // Não injetar durante o prerender (react-snap) para não "assar" a tag de
    // tracking no HTML estático — só carrega para visitantes reais.
    if (isPrerender) return;

    const inject = () => {
      const prefs = readConsent();
      if (!prefs || !prefs.ads) return;
      if (document.getElementById(RD_LOADER_SCRIPT_ID)) return;
      const script = document.createElement("script");
      script.id = RD_LOADER_SCRIPT_ID;
      script.type = "text/javascript";
      script.async = true;
      script.src = RD_LOADER_SRC;
      document.head.appendChild(script);
    };

    inject();
    window.addEventListener(CONSENT_UPDATED_EVENT, inject);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, inject);
  }, []);
}

/**
 * Carrega o script de Forms do RD Station (uma única vez) e instancia o
 * formulário dentro do container `#RD_FORM_ID`.
 *
 * A tag `<script>` existir no DOM não garante que `window.RDStationForms` já
 * tenha sido avaliado — por isso o init faz polling até o construtor e o
 * container estarem disponíveis, em vez de chamar `new` direto no `onload`.
 *
 * @param enabled quando `false`, não injeta o script nem cria o formulário.
 * @param formId id do container/formulário RD a renderizar. Default: `RD_FORM_ID`
 *   (formulário de Contato). Landing pages de campanha passam o seu próprio id.
 */
export function useRdStationForm(enabled: boolean, formId: string = RD_FORM_ID) {
  useEffect(() => {
    if (!enabled) return;

    let retryId: ReturnType<typeof setTimeout>;
    let submitted = false;
    let converted = false;
    let observer: MutationObserver | undefined;

    // Conversão concluída: o RD Station Forms não expõe callback público de
    // sucesso, então observamos o container. Ao converter, o RD substitui o
    // `<form>` pela mensagem de confirmação — quando o `<form>` deixa de existir
    // (mas o container ainda tem conteúdo) após um envio válido, contamos o lead.
    // Dispara uma única vez. No-op se a análise não foi consentida.
    const watchConversion = (container: HTMLElement) => {
      observer?.disconnect();
      observer = new MutationObserver(() => {
        if (converted || !submitted) return;
        if (!container.querySelector("form") && container.childElementCount > 0) {
          converted = true;
          observer?.disconnect();
          posthog.capture("lead_rdstation", {
            form_id: formId,
            page: window.location.pathname,
          });
        }
      });
      observer.observe(container, { childList: true, subtree: true });
    };

    const tryInit = () => {
      // @ts-expect-error — RDStationForms é injetado pelo script externo
      if (typeof window.RDStationForms === "undefined") {
        // Script ainda carregando — tenta novamente em 100 ms
        retryId = setTimeout(tryInit, 100);
        return;
      }

      const container = document.getElementById(formId);
      if (!container) {
        retryId = setTimeout(tryInit, 100);
        return;
      }

      container.innerHTML = "";
      // @ts-expect-error — RDStationForms é injetado pelo script externo
      new window.RDStationForms(formId, "null").createForm();
      watchConversion(container);
    };

    if (!document.getElementById(RD_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = RD_SCRIPT_ID;
      script.src = RD_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    tryInit();

    // Tentativa de envio: o formulário é renderizado pelo script externo do RD,
    // então não há handler React de submit. Ouvimos o evento `submit` nativo
    // (fase de captura) e filtramos pelo container. A validação HTML5
    // (`required`) impede o submit com campos obrigatórios vazios, então isso
    // marca a intenção de envio — o `lead_rdstation` acima confirma a conversão.
    const onSubmit = (e: Event) => {
      const container = document.getElementById(formId);
      if (container && e.target instanceof Node && container.contains(e.target)) {
        submitted = true;
        posthog.capture("contact_form_submitted", { form_id: formId });
      }
    };
    document.addEventListener("submit", onSubmit, true);

    return () => {
      clearTimeout(retryId);
      observer?.disconnect();
      document.removeEventListener("submit", onSubmit, true);
      const container = document.getElementById(formId);
      if (container) container.innerHTML = "";
    };
  }, [enabled, formId]);
}
