import { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading, SectionSubtitle } from "@/components/ui/Typography";

interface ProductHeroProps {
  accentVar: string;
  badgeIcon: string;
  badgeLabel: string;
  logoImage?: string;
  topSlot?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  ctaText: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
  ctaTextColor?: string;
  ctaSecondary?: { text: string; href?: string; onClick?: () => void };
  trustItems: string[];
  right: ReactNode;
}

export function ProductHero({
  accentVar,
  badgeIcon,
  badgeLabel,
  logoImage,
  topSlot,
  title,
  subtitle,
  ctaText,
  ctaHref,
  ctaOnClick,
  ctaTextColor = "text-white",
  ctaSecondary,
  trustItems,
  right,
}: ProductHeroProps) {
  const accent = `hsl(var(${accentVar}))`;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: `hsl(var(${accentVar}-surface))` }}
    >
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-10"
        style={{ background: accent }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full blur-3xl opacity-[0.07]"
        style={{ background: accent }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="grid md:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
          <div>
            {topSlot && <div className="mb-5">{topSlot}</div>}

            {logoImage ? (
              <img
                src={logoImage}
                alt={badgeLabel}
                className="h-5 w-auto object-contain mb-12"
              />
            ) : (
              <div
                className="inline-flex items-center gap-2 rounded-full pr-3 py-1 text-xs font-medium mb-6"
                style={{
                  backgroundColor: `${accent}1A`,
                  color: accent,
                }}
              >
                <img src={badgeIcon} alt={badgeLabel} className="w-4 h-4 object-contain" />
                {badgeLabel}
              </div>
            )}

            <Heading variant="h1" className="text-balance mb-6">
              {title}
            </Heading>

            <SectionSubtitle className="mb-8">
              {subtitle}
            </SectionSubtitle>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                asChild={!!ctaHref}
                onClick={!ctaHref ? ctaOnClick : undefined}
                className={`group font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 ${ctaTextColor}`}
                style={{ backgroundColor: accent }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = `color-mix(in srgb, ${accent} 90%, black)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = accent;
                }}
              >
                {ctaHref ? (
                  <a href={ctaHref} className="inline-flex items-center">
                    {ctaText}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <>
                    {ctaText}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              {ctaSecondary && (
                <Button
                  size="lg"
                  variant="outline"
                  className="group font-semibold transition-all duration-200 hover:-translate-y-0.5 border-foreground/20 hover:border-foreground/40"
                  onClick={ctaSecondary.onClick}
                  asChild={!!ctaSecondary.href}
                >
                  {ctaSecondary.href ? (
                    <a href={ctaSecondary.href}>
                      {ctaSecondary.text}
                    </a>
                  ) : (
                    ctaSecondary.text
                  )}
                </Button>
              )}
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#1e1e1e]">
              {trustItems.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" style={{ color: accent }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center md:justify-end">
            {right}
          </div>
        </div>
      </div>
    </section>
  );
}
