import React from "react";
import { motion } from "framer-motion";

import { Heading } from "@/components/ui/Typography";

export const EcosystemDiagram = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="max-w-[960px] mx-auto text-left mb-12">
          <Heading className="text-balance">
            Tecnologia que <span className="text-[#00de71]">simplifica</span>,
            <br />
            integração que gera{" "}
            <span className="text-[#00de71]">resultado</span>.
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
              viewBox="0 0 1200 530"
              role="img"
              style={{
                fontFamily: "'Pacaembu', sans-serif",
                background: "#FFFFFF",
              }}
            >
              <title>Ecossistema Solvefy</title>
              <desc>
                Diagrama do ecossistema Solvefy com o ecossistema no topo.
              </desc>
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

              <rect x="0" y="0" width="1200" height="530" fill="#FFFFFF" />

              {/* ====== ROW 0: Solvefy Ecossistema ====== */}
              <rect
                x="130"
                y="20"
                width="900"
                height="64"
                rx="12"
                fill="#FFFFFF"
                stroke="#00de71"
                strokeWidth="2.5"
              />
              <text
                x="580"
                y="48"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="17"
                fontWeight="600"
              >
                Solvefy
              </text>
              <text
                x="580"
                y="70"
                textAnchor="middle"
                fill="#888888"
                fontSize="12"
              >
                Ecossistema completo
              </text>

              <line
                x1="580"
                y1="84"
                x2="580"
                y2="120"
                stroke="#D4D4D4"
                strokeWidth="0.8"
                strokeDasharray="4 4"
                markerEnd="url(#arrow)"
              />

              {/* ====== ROW 1: Jornada do lead ====== */}
              <text
                x="580"
                y="116"
                textAnchor="middle"
                fill="#888888"
                fontSize="12"
              >
                Jornada do lead
              </text>

              <rect
                x="130"
                y="128"
                width="280"
                height="56"
                rx="12"
                fill="#FFFFFF"
                stroke="#FFAA00"
                strokeWidth="2"
              />
              <text
                x="270"
                y="152"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="14"
                fontWeight="600"
              >
                Solvefy/Ads
              </text>
              <text
                x="270"
                y="170"
                textAnchor="middle"
                fill="#888888"
                fontSize="11"
              >
                Aquisição
              </text>

              <line
                x1="410"
                y1="156"
                x2="440"
                y2="156"
                stroke="#D4D4D4"
                strokeWidth="1"
                markerEnd="url(#arrow)"
              />

              <rect
                x="440"
                y="128"
                width="280"
                height="56"
                rx="12"
                fill="#FFFFFF"
                stroke="#EC4899"
                strokeWidth="2"
              />
              <text
                x="580"
                y="152"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="14"
                fontWeight="600"
              >
                Solvefy/Marketing
              </text>
              <text
                x="580"
                y="170"
                textAnchor="middle"
                fill="#888888"
                fontSize="11"
              >
                Nutrição
              </text>

              <line
                x1="720"
                y1="156"
                x2="750"
                y2="156"
                stroke="#D4D4D4"
                strokeWidth="1"
                markerEnd="url(#arrow)"
              />

              <rect
                x="750"
                y="128"
                width="280"
                height="56"
                rx="12"
                fill="#FFFFFF"
                stroke="#2D1B69"
                strokeWidth="2"
              />
              <text
                x="890"
                y="152"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="14"
                fontWeight="600"
              >
                Solvefy/CRM
              </text>
              <text
                x="890"
                y="170"
                textAnchor="middle"
                fill="#888888"
                fontSize="11"
              >
                Venda
              </text>

              <line
                x1="580"
                y1="184"
                x2="580"
                y2="236"
                stroke="#D4D4D4"
                strokeWidth="0.8"
                strokeDasharray="4 4"
              />

              {/* ====== ROW 2: CPaaS ====== */}
              <text
                x="580"
                y="232"
                textAnchor="middle"
                fill="#888888"
                fontSize="12"
              >
                Comunicação omnichannel
              </text>

              <rect
                x="130"
                y="244"
                width="900"
                height="100"
                rx="12"
                fill="#FFFFFF"
                stroke="#9C73FF"
                strokeWidth="2"
              />
              <text
                x="580"
                y="270"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="14"
                fontWeight="600"
              >
                Solvefy/CPaaS
              </text>

              {/* Channel pills */}
              <rect
                x="217"
                y="286"
                width="120"
                height="36"
                rx="12"
                fill="#FAFAFA"
                stroke="#E0E0E0"
                strokeWidth="0.8"
              />
              <text
                x="277"
                y="308"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="12"
                fontWeight="500"
              >
                SMS
              </text>

              <rect
                x="361"
                y="286"
                width="120"
                height="36"
                rx="12"
                fill="#FAFAFA"
                stroke="#E0E0E0"
                strokeWidth="0.8"
              />
              <text
                x="421"
                y="308"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="12"
                fontWeight="500"
              >
                RCS
              </text>

              <rect
                x="505"
                y="286"
                width="130"
                height="36"
                rx="12"
                fill="#FAFAFA"
                stroke="#E0E0E0"
                strokeWidth="0.8"
              />
              <text
                x="570"
                y="308"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="12"
                fontWeight="500"
              >
                E-mail
              </text>

              <rect
                x="659"
                y="286"
                width="120"
                height="36"
                rx="12"
                fill="#FAFAFA"
                stroke="#E0E0E0"
                strokeWidth="0.8"
              />
              <text
                x="719"
                y="308"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="12"
                fontWeight="500"
              >
                Voz
              </text>

              <rect
                x="803"
                y="286"
                width="140"
                height="36"
                rx="12"
                fill="#FAFAFA"
                stroke="#E0E0E0"
                strokeWidth="0.8"
              />
              <text
                x="873"
                y="308"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="12"
                fontWeight="500"
              >
                WhatsApp
              </text>

              <line
                x1="580"
                y1="344"
                x2="580"
                y2="396"
                stroke="#D4D4D4"
                strokeWidth="0.8"
                strokeDasharray="4 4"
              />

              {/* ====== ROW 3: Cloud ====== */}
              <text
                x="580"
                y="392"
                textAnchor="middle"
                fill="#888888"
                fontSize="12"
              >
                Infraestrutura
              </text>

              <rect
                x="130"
                y="404"
                width="900"
                height="56"
                rx="12"
                fill="#FFFFFF"
                stroke="#00C2FF"
                strokeWidth="2"
              />
              <text
                x="580"
                y="428"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="14"
                fontWeight="600"
              >
                Solvefy/Cloud
              </text>
              <text
                x="580"
                y="446"
                textAnchor="middle"
                fill="#888888"
                fontSize="11"
              >
                Sustenta todo o ecossistema
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
