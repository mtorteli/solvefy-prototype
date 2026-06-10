/**
 * SquadAoVivo — timeline vertical animada "Squad Social em ação"
 * Dispara ao entrar na viewport, roda em loop, botão "Rodar de novo".
 * Respeita prefers-reduced-motion (salta para estado final).
 * Sem dependências externas além do React.
 */

import { useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

/* ── Durações (ms) ── */
const D = {
  LEAD_PROCESSING: 1000,
  AGENT_GAP:        400,
  AGENT_PROCESSING: 1500,
  DONE_PAUSE:       300,
  OUTPUT_LINE:      500,
  LOOP_PAUSE:      3000,
} as const;

interface SquadAoVivoProps {
  accent?:   string;
  accentBg?: string;
}

export const SquadAoVivo = ({
  accent   = "hsl(var(--agents))",
  accentBg = "hsl(var(--agents-surface))",
}: SquadAoVivoProps) => {
  const { t } = useTranslation("agents");
  const rootRef     = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const loopRef     = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (loopRef.current) { clearTimeout(loopRef.current); loopRef.current = null; }
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const prefersReduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Utilitários DOM ── */
  const setState = (stepEl: Element, state: "idle" | "processing" | "done") => {
    (stepEl as HTMLElement).dataset.state = state;

    // status text
    stepEl.querySelectorAll<HTMLElement>("[data-when]").forEach((el) => {
      el.style.display = el.dataset.when === state ? "inline" : "none";
    });
  };

  const setFill = (root: HTMLDivElement, pct: number) => {
    const fill = root.querySelector<HTMLElement>("[data-fill]");
    if (fill) fill.style.height = `${Math.min(100, Math.max(0, pct))}%`;
  };

  const showOutput = useCallback((root: HTMLDivElement) => {
    const out = root.querySelector<HTMLElement>("[data-output]");
    if (!out) return;
    out.dataset.visible = "true";
    const lines = Array.from(out.querySelectorAll<HTMLElement>("[data-line]"));
    lines.forEach((l, i) => {
      after(D.OUTPUT_LINE * (i + 1), () => { l.dataset.visible = "true"; });
    });
    return lines.length;
  }, [after]);

  /* ── Reset visual ── */
  const reset = useCallback((root: HTMLDivElement) => {
    root.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => setState(el, "idle"));
    setFill(root, 0);
    const out = root.querySelector<HTMLElement>("[data-output]");
    if (out) {
      out.dataset.visible = "false";
      out.querySelectorAll<HTMLElement>("[data-line]").forEach((l) => { l.dataset.visible = "false"; });
    }
    const btn = root.querySelector<HTMLButtonElement>("[data-replay]");
    if (btn) btn.style.opacity = "0";
  }, []);

  /* ── Animação principal ── */
  const runAnimation = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    clearAll();
    reset(root);

    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    const btn   = root.querySelector<HTMLButtonElement>("[data-replay]");
    const TOTAL = steps.length;

    /* reduced motion → estado final imediato */
    if (prefersReduced()) {
      steps.forEach((el) => setState(el, "done"));
      setFill(root, 100);
      showOutput(root);
      if (btn) btn.style.opacity = "1";
      return;
    }

    let cursor = 0;

    const activateNext = () => {
      if (cursor >= TOTAL) {
        /* mostrar saída */
        const lineCount = showOutput(root) ?? 0;
        after(D.OUTPUT_LINE * (lineCount + 1) + 300, () => {
          if (btn) btn.style.opacity = "1";
          loopRef.current = setTimeout(runAnimation, D.LOOP_PAUSE);
        });
        return;
      }

      const el = steps[cursor];
      setState(el, "processing");

      after(D.AGENT_PROCESSING, () => {
        setState(el, "done");
        setFill(root, ((cursor + 1) / TOTAL) * 100);
        cursor++;
        after(D.DONE_PAUSE + D.AGENT_GAP, activateNext);
      });
    };

    /* inicia no lead */
    after(200, activateNext);
  }, [after, clearAll, reset, showOutput]);

  /* ── IntersectionObserver ── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(root);
    return () => { observer.disconnect(); clearAll(); };
  }, [runAnimation, clearAll]);

  /* ── Dados ── */
  const steps = [
    {
      id: "nadia",
      role: t("squadLive.steps.nadia.role"),
      label: t("squadLive.steps.nadia.label"),
      detail: t("squadLive.steps.nadia.detail"),
      directive: t("squadLive.steps.nadia.directive"),
    },
    {
      id: "felipe",
      role: t("squadLive.steps.felipe.role"),
      label: t("squadLive.steps.felipe.label"),
      detail: t("squadLive.steps.felipe.detail"),
      directive: t("squadLive.steps.felipe.directive"),
    },
    {
      id: "linkedin",
      role: t("squadLive.steps.linkedin.role"),
      label: t("squadLive.steps.linkedin.label"),
      detail: t("squadLive.steps.linkedin.detail"),
      directive: t("squadLive.steps.linkedin.directive"),
    },
  ];

  const outputLines = [
    t("squadLive.output.hook"),
    t("squadLive.output.pain"),
    t("squadLive.output.cta"),
  ];

  /* ── Estilos inline ── */
  const css = `
    .sav-wrap { position: relative; }

    /* trilho — mobile: centrado na col do nó (2.75rem / 2 = 1.375rem) */
    .sav-track {
      position: absolute;
      left: 1.375rem;
      top: 0.875rem;
      bottom: 0.875rem;
      width: 2px;
      background: ${accentBg};
      border-radius: 9999px;
      overflow: hidden;
      transform: translateX(-50%);
    }
    @media (min-width: 640px) {
      .sav-track { left: 50%; }
    }
    .sav-fill {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 0%;
      background: ${accent};
      border-radius: 9999px;
      transition: height 0.55s cubic-bezier(0.4,0,0.2,1);
    }

    /* linha de step — mobile: nó | card  /  desktop: card | nó | spacer (ímpar) ou spacer | nó | card (par) */
    .sav-row {
      position: relative;
      display: grid;
      grid-template-columns: 2.75rem 1fr;
      gap: 0 1rem;
      padding-bottom: 1.5rem;
      align-items: start;
    }
    .sav-row:last-child { padding-bottom: 0; }

    /* no mobile, nó fica sempre na col-1 */
    .sav-node-col { grid-column: 1; }
    .sav-card     { grid-column: 2; }
    .sav-spacer   { display: none; }

    @media (min-width: 640px) {
      .sav-row {
        grid-template-columns: 1fr 2.75rem 1fr;
        gap: 0 1.25rem;
      }
      .sav-spacer { display: block; }

      /* ímpar: card esquerda — nó centro — espaço direita */
      .sav-row:nth-child(odd) .sav-card     { grid-column: 1; grid-row: 1; order: 1; }
      .sav-row:nth-child(odd) .sav-node-col { grid-column: 2; grid-row: 1; order: 2; }
      .sav-row:nth-child(odd) .sav-spacer   { grid-column: 3; grid-row: 1; order: 3; }

      /* par: espaço esquerda — nó centro — card direita */
      .sav-row:nth-child(even) .sav-spacer   { grid-column: 1; grid-row: 1; order: 1; }
      .sav-row:nth-child(even) .sav-node-col { grid-column: 2; grid-row: 1; order: 2; }
      .sav-row:nth-child(even) .sav-card     { grid-column: 3; grid-row: 1; order: 3; }
    }

    /* nó */
    .sav-node-col {
      display: flex;
      justify-content: center;
      padding-top: 0.875rem;
    }
    .sav-node {
      width: 14px; height: 14px;
      flex-shrink: 0;
      border-radius: 50%;
      border: 2px solid ${accentBg};
      background: white;
      transition: border-color .3s, background .3s, box-shadow .3s;
      position: relative;
      z-index: 2;
    }
    [data-state="processing"] .sav-node {
      border-color: ${accent};
      box-shadow: 0 0 0 4px ${accentBg};
    }
    [data-state="done"] .sav-node {
      border-color: ${accent};
      background: ${accent};
    }

    /* card */
    .sav-card {
      border: 1.5px solid hsl(var(--border));
      background: white;
      border-radius: 1rem;
      padding: .875rem 1.125rem;
      opacity: .45;
      transition: border-color .35s, box-shadow .35s, opacity .35s;
    }
    [data-state="processing"] .sav-card {
      border-color: ${accent}55;
      box-shadow: 0 0 0 3px ${accentBg}, 0 8px 24px -8px ${accent}30;
      opacity: 1;
    }
    [data-state="done"] .sav-card {
      border-color: ${accent}30;
      opacity: 1;
    }

    /* status */
    .sav-badge {
      display: inline-flex;
      align-items: center;
      gap: .3rem;
      font-size: .65rem;
      font-weight: 700;
      letter-spacing: .05em;
      text-transform: uppercase;
      color: hsl(var(--muted-foreground));
      transition: color .3s;
    }
    [data-state="processing"] .sav-badge { color: ${accent}; }
    [data-state="done"]       .sav-badge { color: #16a34a; }

    /* spinner */
    .sav-spinner {
      display: none;
      width: 9px; height: 9px;
      border: 1.5px solid ${accentBg};
      border-top-color: ${accent};
      border-radius: 50%;
      animation: sav-spin .7s linear infinite;
    }
    [data-state="processing"] .sav-spinner { display: block; }
    @keyframes sav-spin { to { transform: rotate(360deg); } }

    /* check */
    .sav-check { display: none; width: 9px; height: 9px; color: #16a34a; }
    [data-state="done"] .sav-check { display: block; }

    /* dot idle */
    .sav-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: hsl(var(--border));
    }
    [data-state="processing"] .sav-dot,
    [data-state="done"]       .sav-dot { display: none; }

    /* orquestrador — nó especial (ícone cérebro simulado via ring duplo) */
    [data-step="orchestrator"] .sav-node {
      width: 18px; height: 18px;
      border-width: 2px;
    }
    [data-step="orchestrator"][data-state="done"] .sav-node {
      box-shadow: 0 0 0 4px ${accentBg};
    }

    /* callout diretriz */
    .sav-directive {
      display: none;
      margin-top: .75rem;
      border-left: 3px solid ${accent};
      border-radius: 0 .5rem .5rem 0;
      background: ${accentBg}70;
      padding: .5rem .75rem;
    }
    [data-state="processing"] .sav-directive,
    [data-state="done"]       .sav-directive { display: block; }

    .sav-directive-label {
      font-size: .6rem;
      font-weight: 700;
      letter-spacing: .07em;
      text-transform: uppercase;
      color: ${accent};
      margin-bottom: .3rem;
      display: flex;
      align-items: center;
      gap: .3rem;
    }
    .sav-directive-text {
      font-size: .72rem;
      line-height: 1.5;
      color: hsl(var(--foreground));
      opacity: .85;
    }

    /* shimmer */
    @keyframes sav-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    .sav-shimmer {
      display: none;
      height: 7px;
      margin-top: .625rem;
      border-radius: 4px;
      background: linear-gradient(90deg, transparent 0%, ${accentBg} 40%, transparent 60%);
      background-size: 200% 100%;
      animation: sav-shimmer 1.4s ease-in-out infinite;
    }
    [data-state="processing"] .sav-shimmer { display: block; }

    /* output */
    .sav-output {
      opacity: 0;
      transform: translateY(8px);
      transition: opacity .4s ease, transform .4s ease;
    }
    [data-visible="true"].sav-output { opacity: 1; transform: translateY(0); }

    /* output lines */
    .sav-line {
      opacity: 0;
      transform: translateY(4px);
      transition: opacity .35s ease, transform .35s ease;
    }
    [data-visible="true"].sav-line { opacity: 1; transform: translateY(0); }
  `;

  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "hsl(var(--agents-tint))" }}
    >
      <style>{css}</style>
      <div className="max-w-3xl mx-auto px-6">

        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: accent }}>
            {t("squadLive.eyebrow")}
          </p>
          <h2 className="tracking-tighter leading-tight text-balance">
            {t("squadLive.title")}
          </h2>
          <p className="section-subtitle mt-3 max-w-lg mx-auto">
            {t("squadLive.subtitle")}
          </p>
        </div>

        {/* Timeline */}
        <div ref={rootRef} className="sav-wrap">

          {/* trilho vertical */}
          <div className="sav-track">
            <div className="sav-fill" data-fill />
          </div>

          {steps.map((step) => (
            <div
              key={step.id}
              className="sav-row"
              data-step={step.id}
              data-state="idle"
            >
              {/* nó — col-1 mobile, col-2 desktop */}
              <div className="sav-node-col">
                <div className="sav-node" />
              </div>

              {/* card — col-2 mobile, col-1 ou col-3 desktop */}
              <div className="sav-card">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: accent }}>
                      {step.role}
                    </p>
                    <p className="text-sm font-semibold text-foreground leading-snug">
                      {step.label}
                    </p>
                  </div>
                  <span className="sav-badge shrink-0">
                    <span className="sav-dot" />
                    <span className="sav-spinner" />
                    <svg className="sav-check" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                    <span>
                      <span data-when="idle">{t("squadLive.status.idle")}</span>
                      <span data-when="processing" style={{ display: "none" }}>{t("squadLive.status.processing")}</span>
                      <span data-when="done" style={{ display: "none" }}>{t("squadLive.status.done")}</span>
                    </span>
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  {step.detail}
                </p>

                {/* Callout diretriz do orquestrador — só nos agentes especialistas */}
                {step.directive && (
                  <div className="sav-directive">
                    <p className="sav-directive-label">
                      {/* ícone seta de delegação */}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 5h8M6 2l3 3-3 3" />
                      </svg>
                      {t("squadLive.directiveLabel")}
                    </p>
                    <p className="sav-directive-text">{step.directive}</p>
                  </div>
                )}

                <div className="sav-shimmer" />
              </div>

              {/* espaçador — só desktop, lado oposto ao card */}
              <div className="sav-spacer" />
            </div>
          ))}
        </div>

        {/* Cartão de saída */}
        <div
          className="sav-output mt-8 rounded-2xl border-2 p-5"
          data-output
          data-visible="false"
          style={{ borderColor: `${accent}40`, background: `${accentBg}60` }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: accent }}>
            {t("squadLive.output.label")}
          </p>
          <div className="flex flex-col gap-3">
            {outputLines.map((line, i) => (
              <p
                key={i}
                className="sav-line text-sm font-medium text-foreground leading-relaxed"
                data-line={i}
                data-visible="false"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Botão replay */}
        <div className="mt-8 flex justify-center">
          <button
            data-replay
            onClick={runAnimation}
            style={{
              opacity: 0,
              borderColor: `${accent}40`,
              color: accent,
            }}
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-colors hover:bg-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 7a6 6 0 1 0 1.22-3.7" />
              <polyline points="1,1 1,4.5 4.5,4.5" />
            </svg>
            {t("squadLive.replay")}
          </button>
        </div>

      </div>
    </section>
  );
};
