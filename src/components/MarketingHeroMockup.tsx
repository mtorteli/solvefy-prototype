import React from "react";
import { motion } from "framer-motion";
import { Home, Zap, Users, Settings } from "lucide-react";

const funnelSteps = [
  { label: "Entrada",       count: 4280, pct: null,  color: "#E64499" },
  { label: "Email enviado", count: 3847, pct: "89,9%", color: "#E64499" },
  { label: "Abriu",         count: 1538, pct: "40,0%", color: "#E64499" },
  { label: "Clicou",        count: 614,  pct: "39,9%", color: "#E64499" },
  { label: "Converteu",     count: 189,  pct: "30,8%", color: "#00de71" },
];

const MAX = 4280;

export const MarketingHeroMockup = () => {
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
                <p className="text-[12px] font-semibold text-[#1e1e1e] leading-none">Jornada: Black Friday</p>
                <p className="text-[11px] text-[#1e1e1e]/60 mt-0.5">3 automações ativas</p>
              </div>
              <div className="w-[26px] h-[26px] rounded-full bg-[#FFF2FA] flex items-center justify-center">
                <Zap size={12} className="text-[#E64499]" />
              </div>
            </div>
          </div>

          {/* Main Metric */}
          <div className="px-[18px] pt-4 pb-1">
            <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">Conversões esta semana</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-bold text-[#1e1e1e]">189</span>
              <span className="text-[11px] px-[7px] py-0.5 rounded-full bg-[#E1F5EE] text-[#085041] font-medium">+27%</span>
            </div>
          </div>

          {/* Funnel Section */}
          <div className="px-[18px] pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1e1e1e]/40 mb-2">
              Funil da jornada
            </p>
            <div className="flex flex-col gap-[6px]">
              {funnelSteps.map((step) => {
                const widthPct = Math.round((step.count / MAX) * 100);
                return (
                  <div key={step.label}>
                    <div className="flex justify-between items-center mb-[3px]">
                      <span className="text-[11px] text-[#1e1e1e]/70">{step.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-[#1e1e1e]">
                          {step.count.toLocaleString("pt-BR")}
                        </span>
                        {step.pct && (
                          <span className="text-[10px] text-[#1e1e1e]/40">{step.pct}</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full h-[5px] bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${widthPct}%`, backgroundColor: step.color }}
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
              <div className="bg-[#FFF2FA] rounded-2xl p-2.5">
                <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">Taxa de abertura</p>
                <p className="text-[15px] font-bold text-[#1e1e1e]">40,0%</p>
                <p className="text-[11px] text-[#0F6E56] mt-0.5">+5,3pp</p>
              </div>
              <div className="bg-[#FFF2FA] rounded-2xl p-2.5">
                <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">Receita gerada</p>
                <p className="text-[15px] font-bold text-[#1e1e1e]">R$ 47k</p>
                <p className="text-[11px] text-[#0F6E56] mt-0.5">+18,9%</p>
              </div>
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
