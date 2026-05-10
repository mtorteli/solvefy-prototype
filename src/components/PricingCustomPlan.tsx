import { ArrowRight, Check, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCustomPlanProps {
  accentVar: string;
  title: string;
  description: string;
  bullets: string[];
  badgeText?: string;
  ctaText: string;
  footerText?: string;
}

export function PricingCustomPlan({
  accentVar,
  title,
  description,
  bullets,
  badgeText = "Sob Medida",
  ctaText,
  footerText,
}: PricingCustomPlanProps) {
  const accent = `hsl(var(${accentVar}))`;

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
              Plano Customizado
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

        <div className="flex flex-col items-start md:items-end gap-4">
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
            className="group font-semibold text-white w-full md:w-auto"
            style={{ backgroundColor: accent }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = `color-mix(in srgb, ${accent} 90%, black)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = accent;
            }}
          >
            {ctaText}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {footerText && (
        <div className="relative mt-6 pt-6 border-t border-white/10">
          <p className="text-sm text-white/40 leading-relaxed">{footerText}</p>
        </div>
      )}
    </div>
  );
}
