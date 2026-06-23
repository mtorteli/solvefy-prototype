import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { PostHogProvider } from "@posthog/react";
import App from "./App.tsx";
import { posthog, syncPostHogConsent } from "@/lib/posthog";
import "./i18n/config";
import "./index.css";

// Reaplica o consentimento de análise salvo em visitas anteriores (inicializa o
// PostHog apenas se "Análise" foi aceito). Mudanças no banner são tratadas pelo
// CookieBanner via `syncPostHogConsent()`.
syncPostHogConsent();

const rootEl = document.getElementById("root")!;

const tree = (
  <PostHogProvider client={posthog}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </PostHogProvider>
);

// Quando o HTML já vem renderizado (react-snap no build), hidratamos a árvore
// existente em vez de re-renderizar do zero. Isso preserva o conteúdo do
// primeiro paint e mantém o React em sincronia com o DOM.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, tree);
} else {
  createRoot(rootEl).render(tree);
}
