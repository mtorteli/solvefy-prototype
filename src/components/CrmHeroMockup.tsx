import { motion } from "framer-motion";
import { Home, TrendingUp, Users, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

const STAGE_KEYS = ["prospect", "qualify", "proposal", "won"] as const;
const STAGE_COUNTS = [8, 5, 3, 2];

const DEAL_KEYS = ["polaris", "nexus", "grupoAbc", "fsLog"] as const;
const DEAL_COLORS = ["#E1611C", "#E1611C", "#00de71", "#E1611C"];

export const CrmHeroMockup = () => {
  const { t } = useTranslation("crm");

  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[280px] bg-[#FFDAC6] border border-black/5 rounded-[36px] p-2.5 relative shadow-2xl"
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
                <p className="text-[11px] text-[#1e1e1e]/60 mt-0.5">{t("mockup.period")}</p>
              </div>
              <div className="w-[26px] h-[26px] rounded-full bg-[#FFEDE3] flex items-center justify-center">
                <TrendingUp size={12} className="text-[#E1611C]" />
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

          {/* Pipeline Stages */}
          <div className="px-[18px] pt-3">
            <div className="grid grid-cols-4 gap-1.5">
              {STAGE_KEYS.map((key, i) => (
                <div key={key} className="bg-[#FFEDE3] rounded-xl p-2 flex flex-col items-center">
                  <span className="text-[16px] font-bold text-[#E1611C] leading-none">{STAGE_COUNTS[i]}</span>
                  <span className="text-[9px] text-[#1e1e1e]/50 mt-0.5 text-center leading-tight">
                    {t(`mockup.stages.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Deals */}
          <div className="px-[18px] pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1e1e1e]/40 mb-2">
              {t("mockup.recentLabel")}
            </p>
            <div className="flex flex-col gap-1.5">
              {DEAL_KEYS.map((key, i) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-xl px-2.5 py-2"
                  style={{ backgroundColor: "rgba(255, 237, 227, 0.6)" }}
                >
                  <div>
                    <p className="text-[11px] font-semibold text-[#1e1e1e] leading-none">{t(`mockup.deals.${key}.name`)}</p>
                    <p className="text-[10px] text-[#1e1e1e]/50 mt-0.5">{t(`mockup.deals.${key}.stage`)}</p>
                  </div>
                  <span className="text-[12px] font-bold" style={{ color: DEAL_COLORS[i] }}>
                    {t(`mockup.deals.${key}.value`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Tab Bar */}
          <div className="px-[18px] pt-2.5 pb-[14px] border-t border-black/5 flex justify-center gap-[22px] bg-white">
            <Home size={18} className="text-[#E1611C]" fill="#E1611C" />
            <TrendingUp size={18} className="text-[#1e1e1e]/30" />
            <Users size={18} className="text-[#1e1e1e]/30" />
            <Settings size={18} className="text-[#1e1e1e]/30" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
