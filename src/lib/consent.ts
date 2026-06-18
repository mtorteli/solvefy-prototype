// Util compartilhado de consentimento de cookies (LGPD). Centraliza a leitura
// das preferências e o nome do evento disparado quando o usuário salva o banner,
// para que tanto o `CookieBanner` quanto os hooks de tracking leiam o mesmo estado.

export const CONSENT_KEY = "solvefy_cookie_consent";
export const CONSENT_UPDATED_EVENT = "solvefy:consent-updated";

// "Necessários" não entra aqui porque é sempre ativo.
export type ConsentPrefs = { analytics: boolean; ads: boolean };

// Lê as preferências salvas. Os formatos legados "accepted"/"rejected" (usados
// antes das categorias granulares) continuam sendo aceitos — assim como no index.html.
export const readConsent = (): ConsentPrefs | null => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    if (raw === "accepted") return { analytics: true, ads: true };
    if (raw === "rejected") return { analytics: false, ads: false };
    const parsed = JSON.parse(raw);
    return { analytics: !!parsed.analytics, ads: !!parsed.ads };
  } catch {
    return null;
  }
};
