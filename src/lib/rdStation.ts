import { useEffect } from "react";

export const RD_FORM_ID = "contato-solvefy-com-58c21822e6ec437325ca";
export const RD_SCRIPT_ID = "rd-station-forms-script";
export const RD_SCRIPT_SRC =
  "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

/**
 * Carrega o script de Forms do RD Station (uma única vez) e instancia o
 * formulário dentro do container `#RD_FORM_ID`.
 *
 * A tag `<script>` existir no DOM não garante que `window.RDStationForms` já
 * tenha sido avaliado — por isso o init faz polling até o construtor e o
 * container estarem disponíveis, em vez de chamar `new` direto no `onload`.
 *
 * @param enabled quando `false`, não injeta o script nem cria o formulário.
 */
export function useRdStationForm(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    let retryId: ReturnType<typeof setTimeout>;

    const tryInit = () => {
      // @ts-ignore — RDStationForms é injetado pelo script externo
      if (typeof window.RDStationForms === "undefined") {
        // Script ainda carregando — tenta novamente em 100 ms
        retryId = setTimeout(tryInit, 100);
        return;
      }

      const container = document.getElementById(RD_FORM_ID);
      if (!container) {
        retryId = setTimeout(tryInit, 100);
        return;
      }

      container.innerHTML = "";
      // @ts-ignore
      new window.RDStationForms(RD_FORM_ID, "null").createForm();
    };

    if (!document.getElementById(RD_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = RD_SCRIPT_ID;
      script.src = RD_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    tryInit();

    return () => {
      clearTimeout(retryId);
      const container = document.getElementById(RD_FORM_ID);
      if (container) container.innerHTML = "";
    };
  }, [enabled]);
}
