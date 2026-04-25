import React from "react";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, 
  Tooltip, 
  AreaChart, 
  Area 
} from "recharts";
import { 
  Search, 
  Bell, 
  Home, 
  BarChart2, 
  Users, 
  Settings 
} from "lucide-react";

const data = [
  { value: 80 }, { value: 95 }, { value: 110 }, { value: 125 }, { value: 130 },
  { value: 142 }, { value: 138 }, { value: 155 }, { value: 168 }, { value: 175 },
  { value: 190 }, { value: 205 }, { value: 198 }, { value: 215 }, { value: 230 },
  { value: 242 }, { value: 255 }, { value: 270 }, { value: 265 }, { value: 285 },
  { value: 300 }, { value: 318 }, { value: 335 }, { value: 350 }, { value: 362 },
  { value: 380 }, { value: 395 }, { value: 415 }, { value: 440 }, { value: 470 }
];

export const AdsHeroMockup = () => {
  return (
    <div className="flex justify-center">
      {/* Phone Shell */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[280px] bg-[#f6f5ef] border border-black/5 rounded-[36px] p-2.5 relative shadow-2xl"
      >
        {/* Screen */}
        <div className="w-[260px] h-[562px] bg-white rounded-[30px] overflow-hidden border-[0.5px] border-black/5 flex flex-col">
          
          {/* Status Bar */}
          <div className="px-[18px] pt-2.5 pb-0 flex justify-center">
            <span className="text-[12px] font-medium text-[#1e1e1e]">9:41</span>
          </div>

          {/* Header */}
          <div className="px-[18px] pt-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold text-[#1e1e1e] leading-none">Painel de tráfego</p>
                <p className="text-[11px] text-[#1e1e1e]/60 mt-0.5">Últimos 30 dias</p>
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
            <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">Total de leads captados</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-bold text-[#1e1e1e]">4.827</span>
              <span className="text-[11px] px-[7px] py-0.5 rounded-full bg-[#E1F5EE] text-[#085041] font-medium">+23,4%</span>
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
                    fontSize: '12px'
                  }} 
                  labelFormatter={(v) => `Dia ${v + 1}`}
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
            <span className="text-[11px] text-[#1e1e1e]/40">Sem 1</span>
            <span className="text-[11px] text-[#1e1e1e]/40">Sem 2</span>
            <span className="text-[11px] text-[#1e1e1e]/40">Sem 3</span>
            <span className="text-[11px] text-[#1e1e1e]/40">Sem 4</span>
          </div>

          {/* KPI Grid */}
          <div className="px-[18px] pt-4 pb-0">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#f6f5ef] rounded-2xl p-2.5">
                <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">Investido</p>
                <p className="text-[15px] font-bold text-[#1e1e1e]">R$ 12.480</p>
                <p className="text-[11px] text-[#A32D2D] mt-0.5">+8,2%</p>
              </div>
              <div className="bg-[#f6f5ef] rounded-2xl p-2.5">
                <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">Custo por lead</p>
                <p className="text-[15px] font-bold text-[#1e1e1e]">R$ 2,58</p>
                <p className="text-[11px] text-[#0F6E56] mt-0.5">-15,3%</p>
              </div>
              <div className="bg-[#f6f5ef] rounded-2xl p-2.5">
                <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">Conversão</p>
                <p className="text-[15px] font-bold text-[#1e1e1e]">3,7%</p>
                <p className="text-[11px] text-[#0F6E56] mt-0.5">+0,8pp</p>
              </div>
              <div className="bg-[#f6f5ef] rounded-2xl p-2.5">
                <p className="text-[11px] text-[#1e1e1e]/60 mb-0.5">ROAS</p>
                <p className="text-[15px] font-bold text-[#1e1e1e]">4,2x</p>
                <p className="text-[11px] text-[#0F6E56] mt-0.5">+0,6x</p>
              </div>
            </div>
          </div>

          {/* Spacer to push tab bar down */}
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
