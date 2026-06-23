// Integração com o PostHog (product analytics).
//
// O PostHog é tratado como ferramenta de ANÁLISE: assim como o Contentsquare e o
// GA4, só é ativado quando o visitante aceita a categoria "Análise" no banner de
// cookies (LGPD). Por isso a instância é inicializada sob demanda por
// `syncPostHogConsent()` — chamado no boot e sempre que o consentimento muda —
// e nunca durante o prerender do react-snap.

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

const options: Partial<PostHogConfig> = {
  api_host: API_HOST,
  // Preset recomendado pelo PostHog: habilita autocapture, $pageview em
  // mudanças de rota (SPA) e $pageleave com os defaults atuais.
  defaults: "2026-05-30",
};

// Inicializa o PostHog uma única vez, no cliente real. Idempotente.
const initPostHog = () => {
  if (initialized || isPrerender || typeof window === "undefined") return;
  if (!TOKEN) {
    if (import.meta.env.DEV) {
      console.warn("[posthog] VITE_POSTHOG_PROJECT_TOKEN ausente — desativado.");
    }
    return;
  }
  initialized = true;
  posthog.init(TOKEN, options);
};

// Evento de conversão das landing pages de campanha: clique num CTA que leva ao
// formulário/cadastro externo. `campaign` identifica a LP e `location` o ponto da
// página (hero, topbar, plano, etc.). No-op se a análise não foi consentida.
export const trackCampaignCta = (campaign: string, location: string) =>
  posthog.capture("campaign_cta_clicked", { campaign, location });

// Aplica o consentimento atual de "Análise": inicializa/retoma a captura quando
// concedido e a interrompe (opt-out) quando recusado/revogado. Seguro para
// chamar várias vezes — é o ponto único de verdade entre boot e mudança de banner.
export const syncPostHogConsent = () => {
  if (isPrerender || typeof window === "undefined") return;
  const prefs = readConsent();
  if (prefs?.analytics) {
    if (!initialized) initPostHog();
    else posthog.opt_in_capturing();
  } else if (initialized) {
    posthog.opt_out_capturing();
  }
};
