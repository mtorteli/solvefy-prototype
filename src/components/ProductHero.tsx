import { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading, SectionSubtitle } from "@/components/ui/Typography";

interface ProductHeroProps {
  accentVar: string;
  badgeIcon: string;
  badgeLabel: string;
  title: ReactNode;
  subtitle: ReactNode;
  ctaText: string;
  ctaTextColor?: string;
  trustItems: string[];
  right: ReactNode;
}

export function ProductHero({
  accentVar,
  badgeIcon,
  badgeLabel,
  title,
  subtitle,
  ctaText,
  ctaTextColor = "text-white",
  trustItems,
  right,
}: ProductHeroProps) {
  const accent = `hsl(var(${accentVar}))`;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--hero-bg)" }}
    >
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-15"
        style={{ background: accent }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full blur-3xl opacity-10"
        style={{ background: accent }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-6"
              style={{
                backgroundColor: `${accent}1A`,
                color: accent,
              }}
            >
              <img src={badgeIcon} alt={badgeLabel} className="w-4 h-4 object-contain" />
              {badgeLabel}
            </div>

            <Heading variant="h1" className="text-balance mb-6">
              {title}
            </Heading>

            <SectionSubtitle className="mb-8">
              {subtitle}
            </SectionSubtitle>

            <Button
              size="lg"
              className={`group font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 ${ctaTextColor}`}
              style={{
                backgroundColor: accent,
              }}
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

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
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
