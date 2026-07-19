/**
 * PROTÓTIPO DE PORTFÓLIO — integração com o RD Station desativada.
 *
 * No site original estes hooks injetavam os scripts do RD Station (Forms e
 * tracking) e enviavam leads/conversões para a conta da empresa. Neste
 * protótipo de demonstração eles são propositalmente no-ops: nenhum script
 * externo é carregado e nenhum dado é enviado para lugar nenhum.
 */

// Mantido apenas para compatibilidade de imports (ex.: container do formulário).
export const RD_FORM_ID = "prototipo-form-demo";

/** No-op: no protótipo não há tracking do RD Station. */
export function useRdStationLoader() {
  // intencionalmente vazio
}

/** No-op: no protótipo não há formulário real do RD Station. */
export function useRdStationForm(_enabled: boolean, _formId: string = RD_FORM_ID) {
  // intencionalmente vazio
}
