// Integração com o PostHog (product analytics).
//
// Dois modos de operação:
//
// 1. COMPLETO (com cookies/localStorage) — ativado quando o visitante aceita a
//    categoria "Análise" no banner de cookies (LGPD), igual ao GA4/Contentsquare.
//
// 2. ANÔNIMO/COOKIELESS (`persistence: "memory"`) — usado só nas landing pages de
//    campanha de anúncios via `useCampaignAnalytics()`. Captura pageviews/eventos
//    anônimos mesmo sem consentimento, sem gravar nada no navegador (o id é mantido
//    apenas em memória e some ao recarregar). Cobre o tráfego pago que não interage
//    com o banner. Se o visitante depois aceitar "Análise", a instância é promovida
//    para o modo completo.
//
// Nunca inicializa durante o prerender do react-snap.

import { useEffect } from "react";
import posthog from "posthog-js";
import type { PostHogConfig } from "posthog-js";
import { readConsent } from "@/lib/consent";
import { isPrerender } from "@/hooks/useReveal";

const TOKEN = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN as string | undefined;
const API_HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
  "https://us.i.posthog.com";

// Reexporta o singleton para captures fora de componentes React
// (ex.: `import { posthog } from "@/lib/posthog"`).
export { posthog };

let initialized = false;
// `true` quando a instância foi iniciada em modo anônimo (sem consentimento).
let cookieless = false;

const baseOptions: Partial<PostHogConfig> = {
  api_host: API_HOST,
  // Preset recomendado pelo PostHog: habilita autocapture, $pageview em
  // mudanças de rota (SPA) e $pageleave com os defaults atuais.
  defaults: "2026-05-30",
};

const canInit = () =>
  !initialized && !isPrerender && typeof window !== "undefined" && !!TOKEN;

const warnMissingToken = () => {
  if (!TOKEN && import.meta.env.DEV) {
    console.warn("[posthog] VITE_POSTHOG_PROJECT_TOKEN ausente — desativado.");
  }
};

// Inicialização completa (com cookies/localStorage). Idempotente.
const initPostHog = () => {
  if (initialized || isPrerender || typeof window === "undefined") return;
  if (!TOKEN) return warnMissingToken();
  initialized = true;
  cookieless = false;
  posthog.init(TOKEN, baseOptions);
};

// Inicialização anônima/cookieless. Se o visitante já consentiu análise, cai no
// modo completo. Idempotente.
const initPostHogAnonymous = () => {
  if (initialized || isPrerender || typeof window === "undefined") return;
  if (!TOKEN) return warnMissingToken();
  if (readConsent()?.analytics) {
    initPostHog();
    return;
  }
  initialized = true;
  cookieless = true;
  posthog.init(TOKEN, { ...baseOptions, persistence: "memory" });
};

// Hook para as landing pages de campanha: liga o tracking anônimo no mount,
// cobrindo o tráfego de anúncios que não passa pelo banner de cookies.
export const useCampaignAnalytics = () => {
  useEffect(() => {
    initPostHogAnonymous();
  }, []);
};

// Evento de conversão das landing pages de campanha: clique num CTA que leva ao
// formulário/cadastro externo. `campaign` identifica a LP e `location` o ponto da
// página (hero, topbar, plano, etc.).
export const trackCampaignCta = (campaign: string, location: string) =>
  posthog.capture("campaign_cta_clicked", { campaign, location });

// Aplica o consentimento atual de "Análise". É o ponto único de verdade entre o
// boot e as mudanças no banner; seguro para chamar várias vezes:
//   - aceitou e não havia instância  → inicia em modo completo
//   - aceitou e havia modo anônimo    → promove para completo (passa a persistir)
//   - aceitou e já estava completo     → retoma a captura
//   - recusou após ter aceitado        → opt-out (para de capturar)
//   - recusou em modo anônimo          → mantém a captura anônima
export const syncPostHogConsent = () => {
  if (isPrerender || typeof window === "undefined") return;
  const prefs = readConsent();
  if (prefs?.analytics) {
    if (!initialized) {
      initPostHog();
    } else {
      if (cookieless) {
        posthog.set_config({ persistence: "localStorage+cookie" });
        cookieless = false;
      }
      posthog.opt_in_capturing();
    }
  } else if (initialized && !cookieless) {
    posthog.opt_out_capturing();
  }
};
