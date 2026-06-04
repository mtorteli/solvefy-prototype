import { useEffect, useState } from "react";

// react-snap (prerender) roda em puppeteer com userAgent "ReactSnap".
export const isPrerender =
  typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap";

/**
 * Retorna `true` apenas no cliente real, após o mount.
 *
 * Use no `initial` de animações de entrada do framer-motion:
 *   `initial={reveal ? { opacity: 0, y: 20 } : false}`
 *
 * Durante o prerender e no primeiro paint (hidratação) o valor é `false`, então
 * o elemento renderiza direto no estado final — o HTML capturado pelo react-snap
 * bate com o primeiro render do cliente e não há mismatch de hidratação. Após o
 * mount passa a `true` e a animação de entrada toca normalmente.
 */
export function useReveal() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return !isPrerender && mounted;
}
