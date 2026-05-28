import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./i18n/config";
import "./index.css";

const rootEl = document.getElementById("root")!;

const tree = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Quando o HTML já vem renderizado (react-snap no build), hidratamos a árvore
// existente em vez de re-renderizar do zero. Isso preserva o conteúdo do
// primeiro paint e mantém o React em sincronia com o DOM.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, tree);
} else {
  createRoot(rootEl).render(tree);
}
