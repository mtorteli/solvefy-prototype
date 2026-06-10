import { useState, useEffect } from "react";
import { isPrerender } from "@/hooks/useReveal";

const CONSENT_KEY = "solvefy_cookie_consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    loadContentsquare?: () => void;
  }
}

// Preferências granulares por categoria. "Necessários" não entra aqui porque
// é sempre ativo. O valor é salvo como JSON no localStorage; os formatos
// legados "accepted"/"rejected" continuam sendo lidos (aqui e no index.html).
type Prefs = { analytics: boolean; ads: boolean };

const readPrefs = (): Prefs | null => {
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

// Atualiza o Google Consent Mode v2 (default fica como "denied" no index.html)
// e carrega o Contentsquare quando a categoria de análise é aceita.
const applyPrefs = (prefs: Prefs) => {
  const ads = prefs.ads ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: prefs.analytics ? "granted" : "denied",
  });
  if (prefs.analytics) window.loadContentsquare?.();
};

const CookieIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[26px] h-[26px]">
    <circle cx="16" cy="16" r="13" fill="white" opacity="0.95" />
    <path d="M16 5C10 5 5 10 5 16C5 22 10 27 16 27C22 27 27 22 27 16C27 13 26 11 24 9" stroke="#00DF71" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 9C23 7.5 21.5 6.5 20 6C21 7 21.5 8.5 21 10C22.5 9.5 23.5 9 24 9Z" fill="#00DF71" />
    <circle cx="12" cy="13" r="1.5" fill="#00DF71" />
    <circle cx="17" cy="11" r="1.2" fill="#00DF71" opacity="0.7" />
    <circle cx="11" cy="18" r="1.2" fill="#00DF71" opacity="0.7" />
    <circle cx="18" cy="19" r="1.5" fill="#00DF71" />
    <circle cx="14" cy="21" r="1" fill="#00DF71" opacity="0.6" />
  </svg>
);

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

type State = "idle" | "banner" | "prefs" | "fab";

export const CookieBanner = () => {
  const [state, setState] = useState<State>("idle");
  const [prefs, setPrefs] = useState<Prefs>({ analytics: false, ads: false });

  useEffect(() => {
    // Não exibir durante o prerender (react-snap): manter "idle"/null para que o
    // HTML capturado bata com o primeiro render do cliente e não quebre a hidratação.
    if (isPrerender) return;
    setState(readPrefs() ? "fab" : "banner");
  }, []);

  const save = (next: Prefs) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    applyPrefs(next);
    setState("fab");
  };

  const openPrefs = () => {
    setPrefs(readPrefs() ?? { analytics: false, ads: false });
    setState("prefs");
  };

  if (state === "idle") return null;

  if (state === "fab") {
    return (
      <button
        onClick={() => setState("banner")}
        title="Preferências de cookies"
        aria-label="Abrir preferências de cookies"
        style={{ animation: "cookieFabIn 0.25s ease-out both" }}
        className={[
          "fixed bottom-5 right-5 z-[9000]",
          "w-[48px] h-[48px] rounded-full",
          "bg-[#00DF71] border-none cursor-pointer",
          "shadow-[0_4px_16px_-2px_rgba(0,223,113,0.55),0_2px_6px_rgba(0,0,0,0.10)]",
          "flex items-center justify-center",
          "transition-[transform,box-shadow] duration-200",
          "hover:scale-[1.08] hover:shadow-[0_8px_24px_-4px_rgba(0,223,113,0.65)]",
        ].join(" ")}
      >
        <CookieIcon />
        <style>{`
          @keyframes cookieFabIn {
            from { opacity: 0; transform: scale(0.75); }
            to   { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </button>
    );
  }

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
