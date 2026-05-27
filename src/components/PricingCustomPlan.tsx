import { useState } from "react";
import { ArrowRight, Check, Code2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PricingCustomPlanProps {
  accentVar: string;
  title: string;
  description: string;
  bullets: string[];
  badgeText?: string;
  /**
   * Rótulo do eyebrow acima do título. Default em PT, mas páginas i18n
   * devem passar o valor traduzido.
   */
  customPlanLabel?: string;
  ctaText: string;
  ctaHref?: string;
  footerText?: string;
  accordionTitle?: string;
  accordionBody?: string;
}

export function PricingCustomPlan({
  accentVar,
  title,
  description,
  bullets,
  badgeText = "Sob Medida",
  customPlanLabel = "Plano Customizado",
  ctaText,
  ctaHref,
  footerText,
  accordionTitle,
  accordionBody,
}: PricingCustomPlanProps) {
  const accent = `hsl(var(${accentVar}))`;
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div
      className="relative rounded-3xl p-8 md:p-10 overflow-hidden border"
      style={{
        borderColor: `${accent}40`,
        background: "var(--dark-section-bg)",
        boxShadow: `0 24px 60px -30px ${accent}80`,
      }}
    >
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: accent }}
      />
      <div className="relative grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${accent}25`, color: accent }}
            >
              <Code2 className="h-5 w-5" />
            </div>
            <div
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: accent }}
            >
              {customPlanLabel}
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-sm text-white/70 mb-5 max-w-xl">{description}</p>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-white/80">
                <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: accent }} />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4 md:mt-6">
          <div
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold border"
            style={{
              color: accent,
              borderColor: `${accent}55`,
              backgroundColor: `${accent}15`,
            }}
          >
            {badgeText}
          </div>
          <Button
            size="lg"
            asChild={!!ctaHref}
            className="group font-semibold text-white w-full md:w-auto"
            style={{ backgroundColor: accent }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = `color-mix(in srgb, ${accent} 90%, black)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = accent;
            }}
          >
            {ctaHref ? (
              <Link to={ctaHref} className="inline-flex items-center">
                {ctaText}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <>
                {ctaText}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>
      </div>

      {accordionTitle && accordionBody && (
        <div className="relative mt-6 pt-6 border-t border-white/10">
          <button
            onClick={() => setAccordionOpen((o) => !o)}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <span className="text-sm font-semibold" style={{ color: accent }}>
              {accordionTitle}
            </span>
            <ChevronDown
              className="h-4 w-4 shrink-0 transition-transform duration-300"
              style={{
                color: accent,
                transform: accordionOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
          {accordionOpen && (
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              {accordionBody}
            </p>
          )}
        </div>
      )}

      {footerText && (
        <div className="relative mt-6 pt-6 border-t border-white/10">
          <p className="text-sm text-white/40 leading-relaxed">{footerText}</p>
        </div>
      )}
    </div>
  );
}
