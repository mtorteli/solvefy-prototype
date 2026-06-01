import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CONSENT_KEY = "solvefy_cookie_consent";

// Cookie SVG icon used in the FAB
const CookieIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[26px] h-[26px]">
    <circle cx="16" cy="16" r="13" fill="white" opacity="0.95" />
    {/* cookie body */}
    <path d="M16 5C10 5 5 10 5 16C5 22 10 27 16 27C22 27 27 22 27 16C27 13 26 11 24 9" stroke="#00DF71" strokeWidth="2" strokeLinecap="round" />
    {/* bite */}
    <path d="M24 9C23 7.5 21.5 6.5 20 6C21 7 21.5 8.5 21 10C22.5 9.5 23.5 9 24 9Z" fill="#00DF71" />
    {/* chips */}
    <circle cx="12" cy="13" r="1.5" fill="#00DF71" />
    <circle cx="17" cy="11" r="1.2" fill="#00DF71" opacity="0.7" />
    <circle cx="11" cy="18" r="1.2" fill="#00DF71" opacity="0.7" />
    <circle cx="18" cy="19" r="1.5" fill="#00DF71" />
    <circle cx="14" cy="21" r="1" fill="#00DF71" opacity="0.6" />
  </svg>
);

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [fabVisible, setFabVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved) {
      setFabVisible(true);
    } else {
      setVisible(true);
    }
  }, []);

  const closeModal = () => {
    setVisible(false);
    setFabVisible(true);
  };

  const openModal = () => {
    setVisible(true);
    setFabVisible(false);
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    closeModal();
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    closeModal();
  };

  const handleOptions = () => {
    // Navigate to the cookies policy page for full opt-out options
    window.location.href = "/termos-e-politicas#politica-de-cookies";
  };

  return (
    <>
      {/* ── Overlay + Modal ──────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        className={[
          "fixed inset-0 z-[9000] flex items-center justify-center p-4",
          "bg-black/45 backdrop-blur-[3px]",
          "transition-opacity duration-[250ms]",
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "bg-white rounded-[20px] w-full max-w-[460px] p-7 flex flex-col gap-[18px]",
            "shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18),0_4px_16px_-4px_rgba(0,0,0,0.08)]",
            "transition-[transform,opacity] duration-[250ms]",
            visible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-4 scale-[0.97] opacity-0",
          ].join(" ")}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <h2
              id="cookie-modal-title"
              className="text-[18px] font-bold leading-[1.3] text-[#111827]"
            >
              Controle sua privacidade
            </h2>
            <span className="inline-flex items-center gap-[5px] bg-[#e7fff3] text-[#00c063] text-[11px] font-bold tracking-[0.04em] px-[10px] py-1 rounded-full border border-[rgba(0,223,113,0.25)] whitespace-nowrap shrink-0">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[13px] h-[13px]">
                <circle cx="8" cy="8" r="7" fill="#00DF71" opacity="0.25" />
                <circle cx="8" cy="8" r="4" fill="#00DF71" />
              </svg>
              Solvefy
            </span>
          </div>

          {/* Description */}
          <p className="text-[13.5px] text-[#6b7280] leading-[1.6]">
            Nosso site usa cookies para melhorar a navegação.
          </p>

          {/* Cookie info box */}
          <div className="border-[1.5px] border-[#e5e7eb] rounded-xl px-4 py-[14px] text-[13px] text-[#6b7280] leading-[1.65] bg-[#fafafa]">
            Usamos cookies para compartilhar dados de{" "}
            <strong className="text-[#111827] font-semibold">análise</strong>,{" "}
            <strong className="text-[#111827] font-semibold">publicidade</strong>,
            dados de usuários e{" "}
            <strong className="text-[#111827] font-semibold">
              personalização de anúncios
            </strong>{" "}
            com o Google.
          </div>

          {/* Links row */}
          <div className="flex flex-wrap gap-x-4 gap-y-[6px] items-center">
            <Link
              to="/termos-e-politicas#politica-de-privacidade"
              className="text-[12px] text-[#00c063] font-medium no-underline hover:opacity-75 hover:underline transition-opacity"
            >
              Política de Privacidade
            </Link>
            <span className="inline-block w-px h-3 bg-[#e5e7eb]" />
            <Link
              to="/termos-e-politicas#politica-de-cookies"
              className="text-[12px] text-[#00c063] font-medium no-underline hover:opacity-75 hover:underline transition-opacity"
            >
              Política de Cookies
            </Link>
            <span className="inline-block w-px h-3 bg-[#e5e7eb]" />
            <Link
              to="/termos-e-politicas#termos-de-uso"
              className="text-[12px] text-[#00c063] font-medium no-underline hover:opacity-75 hover:underline transition-opacity"
            >
              Termos de uso
            </Link>
            <span className="inline-block w-px h-3 bg-[#e5e7eb]" />
            <Link
              to="/termos-e-politicas#politica-de-cookies"
              className="text-[12px] text-[#00c063] font-medium no-underline hover:opacity-75 hover:underline transition-opacity"
            >
              Opt-out
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-[10px] flex-wrap max-sm:flex-col max-sm:items-start">
            <button
              onClick={handleOptions}
              className="text-[13px] font-bold text-[#111827] underline underline-offset-[3px] bg-transparent border-none cursor-pointer p-0 hover:text-[#00c063] transition-colors"
            >
              Minhas opções
            </button>
            <div className="flex gap-2 max-sm:w-full">
              <button
                onClick={handleReject}
                className="font-sans text-[13.5px] font-semibold py-[9px] px-[22px] rounded-[10px] cursor-pointer transition-all duration-150 whitespace-nowrap max-sm:flex-1 max-sm:text-center bg-white text-[#00c063] border-2 border-[#00DF71] hover:bg-[#e7fff3]"
              >
                Rejeitar
              </button>
              <button
                onClick={handleAccept}
                className="font-sans text-[13.5px] font-semibold py-[9px] px-[22px] rounded-[10px] cursor-pointer transition-all duration-150 whitespace-nowrap max-sm:flex-1 max-sm:text-center bg-[#00DF71] text-white border-2 border-[#00DF71] hover:bg-[#00c063] hover:border-[#00c063]"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating cookie button ────────────────────────── */}
      <button
        onClick={openModal}
        title="Preferências de cookies"
        aria-label="Abrir preferências de cookies"
        className={[
          "fixed bottom-6 right-6 z-[8999] w-[52px] h-[52px] rounded-full",
          "bg-[#00DF71] border-none cursor-pointer",
          "shadow-[0_6px_20px_-4px_rgba(0,223,113,0.55),0_2px_8px_rgba(0,0,0,0.12)]",
          "flex items-center justify-center",
          "transition-[transform,box-shadow,opacity] duration-200",
          "hover:scale-[1.08] hover:shadow-[0_10px_28px_-4px_rgba(0,223,113,0.65),0_2px_8px_rgba(0,0,0,0.12)]",
          fabVisible
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-[0.8]",
        ].join(" ")}
      >
        <CookieIcon />
      </button>
    </>
  );
};
