import { useState, useEffect } from "react";
import { isPrerender } from "@/hooks/useReveal";
import {
  CONSENT_KEY,
  CONSENT_UPDATED_EVENT,
  ConsentPrefs,
  readConsent,
} from "@/lib/consent";

const OPEN_PREFS_EVENT = "solvefy:open-cookie-prefs";

// Reabre o painel de preferências de qualquer lugar do site (ex.: link no footer).
export const openCookiePreferences = () => {
  window.dispatchEvent(new Event(OPEN_PREFS_EVENT));
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    loadContentsquare?: () => void;
    loadMetaPixel?: () => void;
  }
}

// Atualiza o Google Consent Mode v2 (default fica como "denied" no index.html),
// carrega o Contentsquare quando a categoria de análise é aceita e o Meta Pixel
// quando a categoria de publicidade é aceita.
const applyPrefs = (prefs: ConsentPrefs) => {
  const ads = prefs.ads ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: prefs.analytics ? "granted" : "denied",
  });
  if (prefs.analytics) window.loadContentsquare?.();
  if (prefs.ads) window.loadMetaPixel?.();
};

const Toggle = ({
  checked,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange?.(!checked)}
    className={[
      "relative shrink-0 w-[36px] h-[20px] rounded-full border-none transition-colors duration-150",
      checked ? "bg-[#00DF71]" : "bg-[#d1d5db]",
      disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
    ].join(" ")}
  >
    <span
      className={[
        "absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white",
        "shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-[left] duration-150",
        checked ? "left-[18px]" : "left-[2px]",
      ].join(" ")}
    />
  </button>
);

type State = "idle" | "banner" | "prefs";

export const CookieBanner = () => {
  const [state, setState] = useState<State>("idle");
  const [prefs, setPrefs] = useState<ConsentPrefs>({ analytics: false, ads: false });

  useEffect(() => {
    // Não exibir durante o prerender (react-snap): manter "idle"/null para que o
    // HTML capturado bata com o primeiro render do cliente e não quebre a hidratação.
    if (isPrerender) return;
    if (!readConsent()) setState("banner");
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setPrefs(readConsent() ?? { analytics: false, ads: false });
      setState("prefs");
    };
    window.addEventListener(OPEN_PREFS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, onOpen);
  }, []);

  const save = (next: ConsentPrefs) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    applyPrefs(next);
    // Notifica hooks de tracking montados na página (ex.: loader RD Station)
    // para que carreguem imediatamente após o aceite, sem exigir navegação.
    window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
    setState("idle");
  };

  const openPrefs = () => {
    setPrefs(readConsent() ?? { analytics: false, ads: false });
    setState("prefs");
  };

  if (state === "idle") return null;

  const panelClass = [
    "fixed bottom-5 right-5 z-[9000]",
    "w-[340px] max-w-[calc(100vw-40px)]",
    "bg-white rounded-2xl",
    "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.18),0_2px_12px_-2px_rgba(0,0,0,0.10)]",
    "border border-[#e5e7eb]",
    "p-5 flex flex-col gap-4",
  ].join(" ");

  const panelAnimation = (
    <style>{`
      @keyframes cookieBannerIn {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  );

  if (state === "prefs") {
    const categories = [
      {
        name: "Necessários",
        description: "Essenciais para o funcionamento do site. Sempre ativos.",
        checked: true,
        disabled: true,
      },
      {
        name: "Análise",
        description: "Nos ajudam a entender como o site é usado (GA4, Contentsquare).",
        checked: prefs.analytics,
        onChange: (v: boolean) => setPrefs((p) => ({ ...p, analytics: v })),
      },
      {
        name: "Publicidade",
        description: "Usados para medir e personalizar anúncios.",
        checked: prefs.ads,
        onChange: (v: boolean) => setPrefs((p) => ({ ...p, ads: v })),
      },
    ];

    return (
      <div
        role="region"
        aria-label="Preferências de cookies"
        style={{ animation: "cookieBannerIn 0.3s ease-out both" }}
        className={panelClass}
      >
        {panelAnimation}

        <div className="flex items-center gap-2">
          <span className="text-[20px] leading-none" aria-hidden="true">🍪</span>
          <span className="text-[14px] font-bold text-[#111827]">
            Preferências de cookies
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[12.5px] font-semibold text-[#111827]">{cat.name}</span>
                <span className="text-[11.5px] text-[#6b7280] leading-[1.5]">{cat.description}</span>
              </div>
              <Toggle
                checked={cat.checked}
                disabled={cat.disabled}
                label={`Cookies de ${cat.name.toLowerCase()}`}
                onChange={cat.onChange}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setState("banner")}
            className="flex-1 text-[12.5px] font-semibold py-2 px-3 rounded-lg cursor-pointer transition-all duration-150 bg-white text-[#374151] border border-[#d1d5db] hover:bg-[#f9fafb] hover:border-[#9ca3af]"
          >
            Voltar
          </button>
          <button
            onClick={() => save(prefs)}
            className="flex-1 text-[12.5px] font-semibold py-2 px-3 rounded-lg cursor-pointer transition-all duration-150 bg-[#00DF71] text-white border border-[#00DF71] hover:bg-[#00c063] hover:border-[#00c063]"
          >
            Salvar preferências
          </button>
        </div>
      </div>
    );
  }

  // state === "banner"
  return (
    <div
      role="region"
      aria-label="Preferências de cookies"
      style={{ animation: "cookieBannerIn 0.3s ease-out both" }}
      className={panelClass}
    >
      {panelAnimation}

      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-[20px] leading-none" aria-hidden="true">🍪</span>
        <span className="text-[14px] font-bold text-[#111827]">
          Este site usa cookies
        </span>
      </div>

      {/* Description */}
      <p className="text-[12.5px] text-[#6b7280] leading-[1.6]">
        Usamos cookies para análise, publicidade e personalização de anúncios.
        Saiba mais na nossa{" "}
        <a
          href="https://solvefy.com/termos-e-politicas/#politica-de-cookies"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00c063] underline hover:opacity-75 transition-opacity"
        >
          Política de Cookies
        </a>
        .
      </p>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => save({ analytics: false, ads: false })}
          className="flex-1 text-[12.5px] font-semibold py-2 px-3 rounded-lg cursor-pointer transition-all duration-150 bg-white text-[#374151] border border-[#d1d5db] hover:bg-[#f9fafb] hover:border-[#9ca3af]"
        >
          Rejeitar
        </button>
        <button
          onClick={() => save({ analytics: true, ads: true })}
          className="flex-1 text-[12.5px] font-semibold py-2 px-3 rounded-lg cursor-pointer transition-all duration-150 bg-[#00DF71] text-white border border-[#00DF71] hover:bg-[#00c063] hover:border-[#00c063]"
        >
          Aceitar
        </button>
      </div>

      <button
        onClick={openPrefs}
        className="text-[12px] font-semibold text-[#6b7280] bg-transparent border-none cursor-pointer underline underline-offset-2 hover:text-[#374151] transition-colors self-center"
      >
        Gerenciar preferências
      </button>
    </div>
  );
};
