import React from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import { Home, BarChart2, MessageSquare, Settings } from "lucide-react";

const data = [
  { value: 320 }, { value: 410 }, { value: 380 }, { value: 520 }, { value: 610 },
  { value: 580 }, { value: 720 }, { value: 810 }, { value: 760 }, { value: 900 },
  { value: 980 }, { value: 1050 }, { value: 1020 }, { value: 1140 }, { value: 1230 },
  { value: 1180 }, { value: 1320 }, { value: 1410 }, { value: 1380 }, { value: 1520 },
  { value: 1620 }, { value: 1710 }, { value: 1680 }, { value: 1890 }, { value: 2100 },
];

export const CpaasHeroMockup = () => {
  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[280px] bg-[#E7DBFF] border border-black/5 rounded-[36px] p-2.5 relative shadow-2xl"
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
                <p className="text-[12px] font-semibold text-[#1e1e1e] leading-none">Disparos em tempo real</p>
                <p className="text-[11px] text-[#1e1e1e]/60 mt-0.5">Últimas 24 horas</p>
              </div>
              <div className="w-[26px] h-[26px] rounded-full bg-[#F3EDFF] flex items-center justify-center">
                <MessageSquare size={12} className="text-[#9C7BFF]" />
              </div>
            </div>
          </div>

          {/* Main Metric */}
          <div className="px-[18px] pt-4 pb-1">
            <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">Mensagens entregues</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-bold text-[#1e1e1e]">12.847</span>
              <span className="text-[11px] px-[7px] py-0.5 rounded-full bg-[#E1F5EE] text-[#085041] font-medium">+18,2%</span>
            </div>
          </div>

          {/* Chart */}
          <div className="px-[18px] h-[110px] mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="cpaasGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9C7BFF" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#9C7BFF" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#9C7BFF"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#cpaasGradient)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Timeline Labels */}
          <div className="px-[18px] pt-1 flex justify-between">
            <span className="text-[11px] text-[#1e1e1e]/40">00h</span>
            <span className="text-[11px] text-[#1e1e1e]/40">06h</span>
            <span className="text-[11px] text-[#1e1e1e]/40">12h</span>
            <span className="text-[11px] text-[#1e1e1e]/40">18h</span>
            <span className="text-[11px] text-[#1e1e1e]/40">24h</span>
          </div>

          {/* KPI Grid */}
          <div className="px-[18px] pt-3 pb-0">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#F3EDFF] rounded-2xl p-2.5">
                <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">WhatsApp</p>
                <p className="text-[15px] font-bold text-[#1e1e1e]">7.234</p>
                <p className="text-[11px] text-[#0F6E56] mt-0.5">+12,4%</p>
              </div>
              <div className="bg-[#F3EDFF] rounded-2xl p-2.5">
                <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">SMS</p>
                <p className="text-[15px] font-bold text-[#1e1e1e]">3.891</p>
                <p className="text-[11px] text-[#0F6E56] mt-0.5">+8,1%</p>
              </div>
              <div className="bg-[#F3EDFF] rounded-2xl p-2.5">
                <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">RCS</p>
                <p className="text-[15px] font-bold text-[#1e1e1e]">1.245</p>
                <p className="text-[11px] text-[#0F6E56] mt-0.5">+31,5%</p>
              </div>
              <div className="bg-[#F3EDFF] rounded-2xl p-2.5">
                <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">Voz</p>
                <p className="text-[15px] font-bold text-[#1e1e1e]">477</p>
                <p className="text-[11px] text-[#A32D2D] mt-0.5">-2,3%</p>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Tab Bar */}
          <div className="px-[18px] pt-2.5 pb-[14px] border-t border-black/5 flex justify-center gap-[22px] bg-white">
            <Home size={18} className="text-[#9C7BFF]" fill="#9C7BFF" />
            <BarChart2 size={18} className="text-[#1e1e1e]/30" />
            <MessageSquare size={18} className="text-[#1e1e1e]/30" />
            <Settings size={18} className="text-[#1e1e1e]/30" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
