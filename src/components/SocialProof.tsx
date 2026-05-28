import { useTranslation } from "react-i18next";
import spoleto from "@/assets/logos/spoleto.png";
import acordocerto from "@/assets/logos/acordocerto.png";
import agibank from "@/assets/logos/agibank.png";
import ixcsoft from "@/assets/logos/ixcsoft.png";
import wmodal from "@/assets/logos/wmodal.png";
import gendai from "@/assets/logos/gendai.png";

const logos = [
  { src: spoleto, alt: "Spoleto" },
  { src: acordocerto, alt: "acordocerto" },
  { src: agibank, alt: "Agibank" },
  { src: ixcsoft, alt: "IXCsoft" },
  { src: wmodal, alt: "WMODAL" },
  { src: gendai, alt: "Gendai" },
];

export const SocialProof = () => {
  const { t } = useTranslation("home");
  const items = [...logos, ...logos];
  return (
    <section className="py-16 md:py-24 border-y border-border bg-card/40">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <p className="text-center text-base md:text-lg text-muted-foreground mb-8">
          {t("socialProof.headline")}
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex items-center gap-16 marquee w-max">
            {items.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                width="120"
                height="40"
                className="h-8 md:h-10 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
