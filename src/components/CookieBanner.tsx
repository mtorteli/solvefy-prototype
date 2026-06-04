import { useState, useEffect } from "react";
import { isPrerender } from "@/hooks/useReveal";

const CONSENT_KEY = "solvefy_cookie_consent";

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

type State = "idle" | "banner" | "fab";

export const CookieBanner = () => {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    // Não exibir durante o prerender (react-snap): manter "idle"/null para que o
    // HTML capturado bata com o primeiro render do cliente e não quebre a hidratação.
    if (isPrerender) return;
    const saved = localStorage.getItem(CONSENT_KEY);
    setState(saved ? "fab" : "banner");
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setState("fab");
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setState("fab");
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

  // state === "banner"
  return (
    <div
      role="region"
      aria-label="Preferências de cookies"
      style={{ animation: "cookieBannerIn 0.3s ease-out both" }}
      className={[
        "fixed bottom-5 right-5 z-[9000]",
        "w-[340px] max-w-[calc(100vw-40px)]",
        "bg-white rounded-2xl",
        "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.18),0_2px_12px_-2px_rgba(0,0,0,0.10)]",
        "border border-[#e5e7eb]",
        "p-5 flex flex-col gap-4",
      ].join(" ")}
    >
      <style>{`
        @keyframes cookieBannerIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

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
          onClick={reject}
          className="flex-1 text-[12.5px] font-semibold py-2 px-3 rounded-lg cursor-pointer transition-all duration-150 bg-white text-[#374151] border border-[#d1d5db] hover:bg-[#f9fafb] hover:border-[#9ca3af]"
        >
          Rejeitar
        </button>
        <button
          onClick={accept}
          className="flex-1 text-[12.5px] font-semibold py-2 px-3 rounded-lg cursor-pointer transition-all duration-150 bg-[#00DF71] text-white border border-[#00DF71] hover:bg-[#00c063] hover:border-[#00c063]"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
};
