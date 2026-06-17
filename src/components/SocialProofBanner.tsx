import { CSSProperties } from "react";
import { Trans, useTranslation } from "react-i18next";

import chinaInBoxLogo  from "@/assets/clients/china-in-box.jpg";
import ixcsoftLogo     from "@/assets/clients/ixcsoft.png";
import chapecoenseLogo from "@/assets/clients/chapecoense.svg";

const CLIENTS: {
  name: string;
  logo: string;
  bg: string;
  imgStyle: CSSProperties;
}[] = [
  {
    name: "China in Box",
    logo: chinaInBoxLogo,
    bg: "#fff",
    imgStyle: { objectFit: "cover", objectPosition: "center 20%" },
  },
  {
    name: "IXC Soft",
    logo: ixcsoftLogo,
    bg: "#111",
    imgStyle: { objectFit: "cover", objectPosition: "center center" },
  },
  {
    name: "Chapecoense",
    logo: chapecoenseLogo,
    bg: "#0e8d3a",
    // scale(1.6) gera overflow suficiente para o overflow-hidden cortar a estrela do topo
    imgStyle: {
      objectFit: "cover",
      objectPosition: "center 65%",
      transform: "scale(1.25)",
    },
  },
];

export function SocialProofBanner() {
  const { t } = useTranslation("common");

  return (
    <div className="inline-flex items-center gap-3">
      <div className="flex items-center">
        {CLIENTS.map(({ name, logo, bg, imgStyle }, i) => (
          <div
            key={name}
            title={name}
            className="w-10 h-10 rounded-full border-2 border-white/80 overflow-hidden flex-shrink-0"
            style={{
              marginLeft: i === 0 ? 0 : -10,
              zIndex: CLIENTS.length - i,
              backgroundColor: bg,
              position: "relative",
            }}
          >
            <img
              src={logo}
              alt={name}
              className="w-full h-full"
              style={imgStyle}
            />
          </div>
        ))}
      </div>

      <span className="text-sm font-medium text-foreground/75 whitespace-nowrap">
        <Trans
          i18nKey="socialProof.text"
          ns="common"
          components={{ strong: <strong className="text-foreground font-semibold" /> }}
        />
      </span>
    </div>
  );
}
