import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import {
  Search,
  Bell,
  Home,
  BarChart2,
  Users,
  Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useReveal } from "@/hooks/useReveal";

const data = [
  { value: 80 }, { value: 95 }, { value: 110 }, { value: 125 }, { value: 130 },
  { value: 142 }, { value: 138 }, { value: 155 }, { value: 168 }, { value: 175 },
  { value: 190 }, { value: 205 }, { value: 198 }, { value: 215 }, { value: 230 },
  { value: 242 }, { value: 255 }, { value: 270 }, { value: 265 }, { value: 285 },
  { value: 300 }, { value: 318 }, { value: 335 }, { value: 350 }, { value: 362 },
  { value: 380 }, { value: 395 }, { value: 415 }, { value: 440 }, { value: 470 },
];

const KPI_KEYS = ["spent", "cpl", "conv", "roas"] as const;
// "spent" sobe (vermelho); demais descem ou sobem positivo (verde)
const KPI_DELTA_COLORS: Record<(typeof KPI_KEYS)[number], string> = {
  spent: "#A32D2D",
  cpl:   "#0F6E56",
  conv:  "#0F6E56",
  roas:  "#0F6E56",
};

export const AdsHeroMockup = () => {
  const { t } = useTranslation("ads");
  const reveal = useReveal();

  return (
    <div className="flex justify-center">
      <motion.div
        initial={reveal ? { opacity: 0, scale: 0.95 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[280px] bg-[#f6f5ef] border border-black/5 rounded-[36px] p-2.5 relative shadow-2xl"
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
              <div className="flex gap-1.5">
                <div className="w-[26px] h-[26px] rounded-full bg-[#f6f5ef] flex items-center justify-center text-[#1e1e1e]/60">
                  <Search size={12} />
                </div>
                <div className="w-[26px] h-[26px] rounded-full bg-[#f6f5ef] flex items-center justify-center text-[#1e1e1e]/60">
                  <Bell size={12} />
                </div>
              </div>
            </div>
          </div>

          {/* Leads Summary */}
          <div className="px-[18px] pt-4 pb-2">
            <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">{t("mockup.totalLabel")}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-bold text-[#1e1e1e]">{t("mockup.totalValue")}</span>
              <span className="text-[11px] px-[7px] py-0.5 rounded-full bg-[#E1F5EE] text-[#085041] font-medium">{t("mockup.totalDelta")}</span>
            </div>
          </div>

          {/* Chart Section */}
          <div className="px-[18px] h-[180px] mt-1 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="leadsC3Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D85A30" stopOpacity={0.22}/>
                    <stop offset="100%" stopColor="#D85A30" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontSize: '12px',
                  }}
                  labelFormatter={(v) => t("mockup.tooltipDay", { n: (v as number) + 1 })}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#D85A30"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#leadsC3Gradient)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Timeline Labels */}
          <div className="px-[18px] pt-1 flex justify-between">
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className="text-[11px] text-[#1e1e1e]/40">
                {t("mockup.week", { n })}
              </span>
            ))}
          </div>

          {/* KPI Grid */}
          <div className="px-[18px] pt-4 pb-0">
            <div className="grid grid-cols-2 gap-2">
              {KPI_KEYS.map((key) => (
                <div key={key} className="bg-[#f6f5ef] rounded-2xl p-2.5">
                  <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">{t(`mockup.kpi.${key}.label`)}</p>
                  <p className="text-[15px] font-bold text-[#1e1e1e]">{t(`mockup.kpi.${key}.value`)}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: KPI_DELTA_COLORS[key] }}>
                    {t(`mockup.kpi.${key}.delta`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Tab Bar */}
          <div className="px-[18px] pt-2.5 pb-[14px] border-t border-black/5 flex justify-center gap-[22px] bg-white">
            <Home size={18} className="text-[#D85A30]" fill="#D85A30" />
            <BarChart2 size={18} className="text-[#1e1e1e]/30" />
            <Users size={18} className="text-[#1e1e1e]/30" />
            <Settings size={18} className="text-[#1e1e1e]/30" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
