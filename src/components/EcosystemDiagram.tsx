import React from "react";
import { motion } from "framer-motion";
import { Heading } from "@/components/ui/Typography";

export const EcosystemDiagram = ({ accent = "#00de71" }: { accent?: string }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="max-w-[960px] mx-auto text-left mb-12">
          <Heading className="text-balance">
            Tecnologia que <span style={{ color: accent }}>simplifica</span>,
            <br />
            integração que gera{" "}
            <span style={{ color: accent }}>resultado</span>.
          </Heading>
        </div>

        <div className="w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <svg
              width="100%"
              viewBox="0 0 1200 385"
              role="img"
              style={{ fontFamily: "'Pacaembu', sans-serif" }}
            >
              <title>Ecossistema Solvefy</title>
              <desc>Diagrama do ecossistema Solvefy.</desc>
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path
                    d="M2 1L8 5L2 9"
                    fill="none"
                    stroke="context-stroke"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>
              </defs>


              {/* ====== ROW 1: Jornada do lead ====== */}
              <text x="580" y="30" textAnchor="middle" fill="#888888" fontSize="12">
                Jornada do lead
              </text>

              {/* Ads */}
              <rect x="130" y="42" width="280" height="56" rx="12" fill="#FFFFFF" stroke="#F0A800" strokeWidth="2" />
              <text x="270" y="66" textAnchor="middle" fill="#1A1A1A" fontSize="14" fontWeight="600">
                Solvefy/Ads
              </text>
              <text x="270" y="84" textAnchor="middle" fill="#888888" fontSize="11">
                Aquisição
              </text>

              <line x1="410" y1="70" x2="440" y2="70" stroke="#D4D4D4" strokeWidth="1" markerEnd="url(#arrow)" />

              {/* Marketing */}
              <rect x="440" y="42" width="280" height="56" rx="12" fill="#FFFFFF" stroke="#E64499" strokeWidth="2" />
              <text x="580" y="66" textAnchor="middle" fill="#1A1A1A" fontSize="14" fontWeight="600">
                Solvefy/Marketing
              </text>
              <text x="580" y="84" textAnchor="middle" fill="#888888" fontSize="11">
                Nutrição
              </text>

              <line x1="720" y1="70" x2="750" y2="70" stroke="#D4D4D4" strokeWidth="1" markerEnd="url(#arrow)" />

              {/* CRM */}
              <rect x="750" y="42" width="280" height="56" rx="12" fill="#FFFFFF" stroke="#E1611C" strokeWidth="2" />
              <text x="890" y="66" textAnchor="middle" fill="#1A1A1A" fontSize="14" fontWeight="600">
                Solvefy/CRM
              </text>
              <text x="890" y="84" textAnchor="middle" fill="#888888" fontSize="11">
                Venda
              </text>

              <line
                x1="580" y1="98" x2="580" y2="148"
                stroke="#D4D4D4" strokeWidth="0.8" strokeDasharray="4 4"
              />

              {/* ====== ROW 2: CPaaS ====== */}
              <text x="580" y="144" textAnchor="middle" fill="#888888" fontSize="12">
                Comunicação omnichannel
              </text>

              <rect x="130" y="156" width="900" height="100" rx="12" fill="#FFFFFF" stroke="#9C7BFF" strokeWidth="2" />
              <text x="580" y="182" textAnchor="middle" fill="#1A1A1A" fontSize="14" fontWeight="600">
                Solvefy/CPaaS
              </text>

              {/* Channel pills */}
              <rect x="217" y="198" width="120" height="36" rx="12" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="0.8" />
              <text x="277" y="220" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="500">SMS</text>

              <rect x="361" y="198" width="120" height="36" rx="12" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="0.8" />
              <text x="421" y="220" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="500">RCS</text>

              <rect x="505" y="198" width="130" height="36" rx="12" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="0.8" />
              <text x="570" y="220" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="500">E-mail</text>

              <rect x="659" y="198" width="120" height="36" rx="12" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="0.8" />
              <text x="719" y="220" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="500">Voz</text>

              <rect x="803" y="198" width="140" height="36" rx="12" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="0.8" />
              <text x="873" y="220" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="500">WhatsApp</text>

              <line
                x1="580" y1="256" x2="580" y2="304"
                stroke="#D4D4D4" strokeWidth="0.8" strokeDasharray="4 4"
              />

              {/* ====== ROW 3: Cloud ====== */}
              <text x="580" y="300" textAnchor="middle" fill="#888888" fontSize="12">
                Infraestrutura
              </text>

              <rect x="130" y="312" width="900" height="56" rx="12" fill="#FFFFFF" stroke="#00CBFF" strokeWidth="2" />
              <text x="580" y="336" textAnchor="middle" fill="#1A1A1A" fontSize="14" fontWeight="600">
                Solvefy/Cloud
              </text>
              <text x="580" y="354" textAnchor="middle" fill="#888888" fontSize="11">
                Sustenta todo o ecossistema
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
