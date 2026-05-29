import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import { Home, Activity, Server, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

const cpuData = [
  { value: 14 }, { value: 12 }, { value: 15 }, { value: 11 }, { value: 13 },
  { value: 18 }, { value: 16 }, { value: 12 }, { value: 10 }, { value: 14 },
  { value: 22 }, { value: 19 }, { value: 15 }, { value: 12 }, { value: 11 },
  { value: 13 }, { value: 16 }, { value: 14 }, { value: 10 }, { value: 8 },
  { value: 12 }, { value: 15 }, { value: 13 }, { value: 11 }, { value: 12 },
];

// VMs têm nomes técnicos universais — não traduzidos
const VMS = [
  { name: "vm-prod-sp-01", cpu: "12%", dotColor: "#00de71", paused: false },
  { name: "vm-prod-sp-02", cpu: "8%",  dotColor: "#00de71", paused: false },
  { name: "vm-staging",    cpu: "3%",  dotColor: "#00de71", paused: false },
  { name: "vm-backup",     cpu: "0%",  dotColor: "#9ca3af", paused: true  },
];

const KPI_KEYS = ["cpu", "ram"] as const;

export const CloudHeroMockup = () => {
  const { t } = useTranslation("cloud");

  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[280px] bg-[#C6E8F1] border border-black/5 rounded-[36px] p-2.5 relative shadow-2xl"
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
              <div className="w-[26px] h-[26px] rounded-full bg-[#E0F5FB] flex items-center justify-center">
                <Activity size={12} className="text-[#00CBFF]" />
              </div>
            </div>
          </div>

          {/* Main Metric */}
          <div className="px-[18px] pt-4 pb-1">
            <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">{t("mockup.uptimeLabel")}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-bold text-[#1e1e1e]">{t("mockup.uptimeValue")}</span>
              <span className="text-[11px] px-[7px] py-0.5 rounded-full bg-[#E1F5EE] text-[#085041] font-medium">{t("mockup.uptimeBadge")}</span>
            </div>
          </div>

          {/* Chart Label */}
          <div className="px-[18px] pt-2">
            <p className="text-[10px] text-[#1e1e1e]/40 font-medium">{t("mockup.chartLabel")}</p>
          </div>

          {/* Chart */}
          <div className="px-[18px] h-[80px] mt-0.5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuData}>
                <defs>
                  <linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00CBFF" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#00CBFF" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    fontSize: "12px",
                  }}
                  formatter={(v: number) => [`${v}%`, t("mockup.tooltipCpu")]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#00CBFF"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#cloudGradient)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 2-col KPI Cards */}
          <div className="px-[18px] pt-2">
            <div className="grid grid-cols-2 gap-2">
              {KPI_KEYS.map((key) => (
                <div key={key} className="bg-[#E0F5FB] rounded-2xl p-2.5">
                  <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">{t(`mockup.kpi.${key}.label`)}</p>
                  <p className="text-[15px] font-bold text-[#1e1e1e]">{t(`mockup.kpi.${key}.value`)}</p>
                  <p className="text-[11px] text-[#0F6E56] mt-0.5">{t(`mockup.kpi.${key}.delta`)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* VM List */}
          <div className="px-[18px] pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1e1e1e]/40 mb-2">
              {t("mockup.vmsLabel")}
            </p>
            <div className="flex flex-col gap-1.5">
              {VMS.map((vm) => (
                <div
                  key={vm.name}
                  className="flex items-center justify-between rounded-xl px-2.5 py-1.5"
                  style={{ backgroundColor: "rgba(224, 245, 251, 0.5)" }}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-[7px] h-[7px] rounded-full flex-shrink-0"
                      style={{ backgroundColor: vm.dotColor }}
                    />
                    <span className="text-[11px] text-[#1e1e1e] font-medium">{vm.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-semibold text-[#1e1e1e]">{vm.cpu}</span>
                    {vm.paused && (
                      <span className="text-[9px] text-[#1e1e1e]/40 ml-0.5">{t("mockup.paused")}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Tab Bar */}
          <div className="px-[18px] pt-2.5 pb-[14px] border-t border-black/5 flex justify-center gap-[22px] bg-white">
            <Home size={18} className="text-[#00CBFF]" fill="#00CBFF" />
            <Activity size={18} className="text-[#1e1e1e]/30" />
            <Server size={18} className="text-[#1e1e1e]/30" />
            <Settings size={18} className="text-[#1e1e1e]/30" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
