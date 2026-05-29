import { motion } from "framer-motion";
import { Check, Home, BarChart2, MessageSquare, Settings, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const AgentIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="14 23 69 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#6487c4" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="52" r="11" />
      <path d="M 30 84 Q 35 69 50 69 Q 57 69 63 75" />
      <path d="M 46 77.5 A 26 26 0 0 0 75.7 56 A 4.5 4.5 0 0 0 75.7 48 A 26 26 0 0 0 24 52" />
      <path d="M 17 44 L 24 52 L 32 47" />
    </g>
  </svg>
);

const SQUAD_KEYS = [
  { key: "facebook",  done: true },
  { key: "instagram", done: true },
  { key: "linkedin",  done: false },
] as const;

export const AgentsHeroMockup = () => {
  const { t } = useTranslation("agents");
  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[280px] bg-[#C8D8F0] border border-black/5 rounded-[36px] p-2.5 relative shadow-2xl"
      >
        <div className="w-[260px] h-[562px] bg-[#F4F7FB] rounded-[30px] overflow-hidden border-[0.5px] border-black/5 flex flex-col">

          {/* Status Bar */}
          <div className="px-[18px] pt-2.5 pb-0 flex justify-center bg-white">
            <span className="text-[12px] font-medium text-[#1e1e1e]">9:41</span>
          </div>

          {/* Agent Header */}
          <div className="px-[14px] pt-2 pb-3 bg-white border-b border-black/[0.06] flex items-center gap-2.5">
            <ArrowLeft size={15} className="text-[#6487C4] shrink-0" />
            <div className="w-[30px] h-[30px] rounded-full bg-[#EAF0F9] flex items-center justify-center shrink-0">
              <AgentIcon size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-[#1e1e1e] leading-none truncate">
                {t("mockup.headerAgent")}
              </p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 px-[14px] py-4 flex flex-col gap-3">

            {/* User bubble — right */}
            <div className="flex justify-end">
              <div
                className="max-w-[185px] rounded-[14px] rounded-tr-[4px] px-3 py-2"
                style={{ backgroundColor: "#6487C4" }}
              >
                <p className="text-[11px] text-white leading-[1.45]">
                  {t("mockup.userMessage")}
                </p>
              </div>
            </div>

            {/* AI bubble — left */}
            <div className="flex items-end gap-2">
              <div className="w-[22px] h-[22px] rounded-full bg-[#EAF0F9] flex items-center justify-center shrink-0 mb-0.5">
                <AgentIcon size={12} />
              </div>
              <div
                className="max-w-[185px] rounded-[14px] rounded-bl-[4px] px-3 py-2"
                style={{ backgroundColor: "#FFFFFF", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
              >
                <p className="text-[11px] text-[#1e1e1e] leading-[1.45]">
                  {t("mockup.aiMessage")}
                </p>
                {/* Typing indicator */}
                <div className="flex items-center gap-[3px] mt-1.5">
                  {[0, 0.18, 0.36].map((delay) => (
                    <motion.span
                      key={delay}
                      className="w-[5px] h-[5px] rounded-full bg-[#6487C4]/50"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Squad Pipeline */}
          <div className="px-[14px] pb-3">
            <div
              className="rounded-2xl px-3 pt-2.5 pb-3"
              style={{
                background: "white",
                border: "1px solid #E2EAF5",
                boxShadow: "0 1px 6px rgba(100,135,196,0.08)",
              }}
            >
              <p className="text-[9px] font-bold text-[#6487C4] uppercase tracking-[0.1em] mb-2">
                {t("mockup.squadLabel")}
              </p>
              <div className="flex flex-col gap-[7px]">
                {SQUAD_KEYS.map((member) => (
                  <div key={member.key} className="flex items-center justify-between gap-2">
                    <span
                      className="text-[11px] font-medium leading-none truncate"
                      style={{ color: member.done ? "#1e1e1e80" : "#1e1e1e" }}
                    >
                      {t(`mockup.squad.${member.key}`)}
                    </span>

                    {member.done ? (
                      <span className="w-[16px] h-[16px] rounded-full bg-[#E1F5EE] flex items-center justify-center shrink-0">
                        <Check size={9} className="text-[#0F6E56]" strokeWidth={3} />
                      </span>
                    ) : (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-[16px] h-[16px] rounded-full shrink-0"
                        style={{
                          border: "2px solid #6487C4",
                          borderTopColor: "transparent",
                          display: "block",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="px-[18px] pt-2.5 pb-[14px] border-t border-black/5 flex justify-center gap-[22px] bg-white">
            <Home size={18} className="text-[#1e1e1e]/30" />
            <BarChart2 size={18} className="text-[#1e1e1e]/30" />
            <MessageSquare size={18} style={{ color: "#6487C4" }} fill="#6487C4" />
            <Settings size={18} className="text-[#1e1e1e]/30" />
          </div>

        </div>
      </motion.div>
    </div>
  );
};
