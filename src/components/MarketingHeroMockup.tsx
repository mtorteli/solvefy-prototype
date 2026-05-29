import { motion } from "framer-motion";
import { Home, Zap, Users, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

const FUNNEL_KEYS = ["input", "sent", "opened", "clicked", "converted"] as const;
const FUNNEL_COUNTS = [4280, 3847, 1538, 614, 189];
const FUNNEL_COLORS = ["#E64499", "#E64499", "#E64499", "#E64499", "#00de71"];
const MAX = 4280;

const KPI_KEYS = ["open", "revenue"] as const;

export const MarketingHeroMockup = () => {
  const { t, i18n } = useTranslation("marketing");

  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[280px] bg-[#FFE9F5] border border-black/5 rounded-[36px] p-2.5 relative shadow-2xl"
      >
        <div className="w-[260px] h-[562px] bg-white rounded-[30px] overflow-hidden border-[0.5px] border-black/5 flex flex-col">

          {/* Status Bar */}
          <div className="px-[18px] pt-2.5 pb-0 flex justify-center">
            <span className="text-[12px] font-medium text-[#1e1e1e]">9:41</span>
          </div>

          {/* Header */}
          <div className="px-[18px] pt-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold text-[#1e1e1e] leading-none">{t("mockup.header")}</p>
                <p className="text-[11px] text-[#1e1e1e]/60 mt-0.5">{t("mockup.subheader")}</p>
              </div>
              <div className="w-[26px] h-[26px] rounded-full bg-[#FFF2FA] flex items-center justify-center">
                <Zap size={12} className="text-[#E64499]" />
              </div>
            </div>
          </div>

          {/* Main Metric */}
          <div className="px-[18px] pt-4 pb-1">
            <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">{t("mockup.totalLabel")}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-bold text-[#1e1e1e]">{t("mockup.totalValue")}</span>
              <span className="text-[11px] px-[7px] py-0.5 rounded-full bg-[#E1F5EE] text-[#085041] font-medium">{t("mockup.totalDelta")}</span>
            </div>
          </div>

          {/* Funnel Section */}
          <div className="px-[18px] pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1e1e1e]/40 mb-2">
              {t("mockup.funnelLabel")}
            </p>
            <div className="flex flex-col gap-[6px]">
              {FUNNEL_KEYS.map((key, i) => {
                const count = FUNNEL_COUNTS[i];
                const widthPct = Math.round((count / MAX) * 100);
                const pct = i18n.exists(`marketing:mockup.funnel.${key}.pct`)
                  ? t(`mockup.funnel.${key}.pct`)
                  : null;
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-[3px]">
                      <span className="text-[11px] text-[#1e1e1e]/70">{t(`mockup.funnel.${key}.label`)}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-[#1e1e1e]">
                          {count.toLocaleString(i18n.language)}
                        </span>
                        {pct && <span className="text-[10px] text-[#1e1e1e]/40">{pct}</span>}
                      </div>
                    </div>
                    <div className="w-full h-[5px] bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${widthPct}%`, backgroundColor: FUNNEL_COLORS[i] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1x2 KPI Cards */}
          <div className="px-[18px] pt-3">
            <div className="grid grid-cols-2 gap-2">
              {KPI_KEYS.map((key) => (
                <div key={key} className="bg-[#FFF2FA] rounded-2xl p-2.5">
                  <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">{t(`mockup.kpi.${key}.label`)}</p>
                  <p className="text-[15px] font-bold text-[#1e1e1e]">{t(`mockup.kpi.${key}.value`)}</p>
                  <p className="text-[11px] text-[#0F6E56] mt-0.5">{t(`mockup.kpi.${key}.delta`)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Tab Bar */}
          <div className="px-[18px] pt-2.5 pb-[14px] border-t border-black/5 flex justify-center gap-[22px] bg-white">
            <Home size={18} className="text-[#E64499]" fill="#E64499" />
            <Zap size={18} className="text-[#1e1e1e]/30" />
            <Users size={18} className="text-[#1e1e1e]/30" />
            <Settings size={18} className="text-[#1e1e1e]/30" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
