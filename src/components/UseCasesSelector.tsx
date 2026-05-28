import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingCart,
  Store,
  Gamepad2,
  Dice5,
  Megaphone,
  Cloud,
  Cpu,
  GraduationCap,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";

const ACCENT = "hsl(var(--cpaas))";
const BRAND_GREEN = "hsl(var(--solve-green))";

const SEGMENT_META: Array<{
  id: string;
  icon: LucideIcon;
  caseIcons: [LucideIcon, LucideIcon, LucideIcon];
}> = [
  { id: "agencias",   icon: Megaphone,      caseIcons: [Megaphone, Store, Cpu] },
  { id: "bets",       icon: Dice5,          caseIcons: [Dice5, Megaphone, Cpu] },
  { id: "ecommerce",  icon: ShoppingCart,   caseIcons: [ShoppingCart, Megaphone, Store] },
  { id: "educacao",   icon: GraduationCap,  caseIcons: [GraduationCap, Megaphone, HeartPulse] },
  { id: "igaming",    icon: Gamepad2,       caseIcons: [Gamepad2, Megaphone, Cpu] },
  { id: "saas",       icon: Cloud,          caseIcons: [Cloud, Megaphone, Store] },
  { id: "saude",      icon: HeartPulse,     caseIcons: [HeartPulse, Megaphone, Cpu] },
  { id: "tech",       icon: Cpu,            caseIcons: [Cpu, Cloud, Megaphone] },
  { id: "varejo",     icon: Store,          caseIcons: [Megaphone, Store, HeartPulse] },
];

export const UseCasesSelector = () => {
  const { t } = useTranslation("cpaas");
  const [activeId, setActiveId] = useState<string>("ecommerce");
  const active = SEGMENT_META.find((s) => s.id === activeId) ?? SEGMENT_META[0];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 p-6 md:p-10"
      style={{
        background:
          "linear-gradient(135deg, #0a041f 0%, #1a1033 55%, #0a041f 100%)",
        boxShadow:
          "0 30px 80px -30px rgba(108, 74, 255, 0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-[360px] w-[360px] rounded-full blur-3xl opacity-30"
        style={{ background: ACCENT }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[360px] w-[360px] rounded-full blur-3xl opacity-20"
        style={{ background: BRAND_GREEN }}
      />

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col items-start">
          <label className="mb-2 text-sm font-medium text-gray-400">
            {t("useCases.selectLabel")}
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="group inline-flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium text-white transition-all duration-200 backdrop-blur-md hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-offset-0 min-w-[260px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(156,123,255,0.18), rgba(0,222,113,0.08))",
                borderColor: "rgba(156,123,255,0.35)",
                boxShadow:
                  "0 10px 30px -12px rgba(156,123,255,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                }}
              >
                <active.icon className="h-4 w-4" />
              </span>
              <span className="flex-1 text-left">
                {t(`useCases.segments.${active.id}.label`)}
              </span>
              <ChevronDown className="h-4 w-4 opacity-70 transition-transform group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-[260px] border-white/10 p-1.5 text-white"
              style={{
                background:
                  "linear-gradient(160deg, #120726 0%, #1a1033 100%)",
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {SEGMENT_META.map((seg) => {
                const Icon = seg.icon;
                const isActive = seg.id === activeId;
                return (
                  <DropdownMenuItem
                    key={seg.id}
                    onSelect={() => setActiveId(seg.id)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:bg-white/[0.06] focus:text-white"
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-md"
                      style={{
                        background: isActive
                          ? "rgba(255,255,255,0.18)"
                          : "rgba(156,123,255,0.12)",
                        color: isActive ? "#ffffff" : ACCENT,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      {t(`useCases.segments.${seg.id}.label`)}
                    </span>
                    {isActive && (
                      <Check className="h-4 w-4" style={{ color: BRAND_GREEN }} />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
            >
              {([1, 2, 3] as const).map((n, idx) => {
                const Icon = active.caseIcons[idx];
                const title = t(`useCases.segments.${active.id}.c${n}t`);
                const description = t(`useCases.segments.${active.id}.c${n}d`);
                return (
                  <motion.article
                    key={`${active.id}-${n}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group relative h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                      boxShadow:
                        "0 20px 50px -25px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(156,123,255,0.45)";
                      e.currentTarget.style.boxShadow =
                        "0 24px 60px -20px rgba(156,123,255,0.45), inset 0 1px 0 rgba(255,255,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 50px -25px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)";
                    }}
                  >
                    <div
                      className="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"
                      style={{ background: ACCENT }}
                    />
                    <div
                      className="relative flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                      style={{
                        background: "rgba(156,123,255,0.15)",
                        color: ACCENT,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="relative text-lg font-semibold tracking-tight text-white leading-snug">
                      {title}
                    </h3>
                    <p className="relative mt-2 text-sm text-gray-400 leading-relaxed">
                      {description}
                    </p>
                    <div className="relative mt-auto pt-4 flex items-center gap-2 text-xs text-gray-400">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: BRAND_GREEN, boxShadow: `0 0 8px ${BRAND_GREEN}` }}
                      />
                      <span>{t("useCases.activeUseCase")}</span>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
