import iconAds from "@/assets/icons/ads-yellow.png";
import iconMarketing from "@/assets/icons/marketing-pink.png";
import iconCrm from "@/assets/icons/crm-dark.png";
import iconCpaas from "@/assets/icons/cpaas-purple.png";
import iconCloud from "@/assets/icons/cloud-blue.png";
import logoSolvefyWhite from "@/assets/logo-solvefy-white.png";

const DEFAULT_ACCENT = "#00de71";

type EcoCardProps = {
  title?: string;
  subtitle?: string;
  color?: string;
  icon?: string;
  iconClassName?: string;
  children?: React.ReactNode;
  className?: string;
};

const EcoCard = ({
  title,
  subtitle,
  color,
  icon,
  iconClassName,
  children,
  className,
}: EcoCardProps) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-5 w-44 md:w-48 h-36 md:h-40 text-center flex flex-col items-center justify-center relative ${className ?? ""}`}
  >
    {children ? (
      children
    ) : (
      <>
        {icon && color && (
          <div
            className="p-3 rounded-lg mb-3 flex items-center justify-center"
            style={{ backgroundColor: `${color}1a` }}
          >
            <img
              src={icon}
              alt={title ?? ""}
              className={iconClassName ?? "h-7 w-7 object-contain"}
            />
          </div>
        )}
        {title && (
          <h3 className="font-bold text-sm md:text-base text-gray-900 tracking-tight leading-tight">
            {title}
          </h3>
        )}
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </>
    )}
  </div>
);

/* ---------- Channel SVG icons ---------- */
const iconBase = "h-6 w-6 md:h-7 md:w-7";
const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: iconBase,
};

const RcsIcon = () => (
  <svg {...iconProps}>
    <path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14" />
    <path d="M11 4h2" />
    <path d="M12 17v.01" />
  </svg>
);
const SmsIcon = () => (
  <svg {...iconProps}>
    <path d="M8 9h8" />
    <path d="M8 13h6" />
    <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12" />
  </svg>
);
const WhatsappIcon = () => (
  <svg {...iconProps}>
    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
  </svg>
);
const EmailIcon = () => (
  <svg {...iconProps}>
    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
    <path d="M3 7l9 6l9 -6" />
  </svg>
);
const VoiceIcon = () => (
  <svg {...iconProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    <path d="M14.05 2a9 9 0 0 1 8 7.94" />
    <path d="M14.05 6A5 5 0 0 1 18 10" />
  </svg>
);

const ChannelDot = ({
  children,
  label,
  accent,
}: {
  children: React.ReactNode;
  label: string;
  accent: string;
}) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className="bg-white rounded-full p-2 md:p-2.5 shadow-md border border-gray-100 flex items-center justify-center"
      style={{ color: accent }}
      aria-label={label}
      title={label}
    >
      {children}
    </div>
    <span className="text-[10px] md:text-xs text-gray-400 leading-none">
      {label}
    </span>
  </div>
);

/* ---------- Connector primitives ---------- */

const ArrowConnector = () => (
  <svg
    aria-hidden
    className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-1 text-gray-300"
    width="40"
    height="10"
    viewBox="0 0 40 10"
    fill="none"
  >
    <line x1="0" y1="5" x2="34" y2="5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <polyline
      points="30,1 34,5 30,9"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BiDirectionalArrows = () => (
  <svg
    aria-hidden
    className="text-gray-300"
    width="10"
    height="44"
    viewBox="0 0 10 44"
    fill="none"
  >
    <line x1="5" y1="4" x2="5" y2="40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <polyline
      points="1,8 5,4 9,8"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="1,36 5,40 9,36"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownArrowLine = () => (
  <svg
    aria-hidden
    className="text-gray-300"
    width="10"
    height="44"
    viewBox="0 0 10 44"
    fill="none"
  >
    <line x1="5" y1="2" x2="5" y2="40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <polyline
      points="1,36 5,40 9,36"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------- Reusable Section ---------- */

type EcosystemDiagramProps = {
  /** Cor das palavras destacadas no título. Default: verde da marca. */
  accent?: string;
  /** Permite customizar o background da section (ex: "bg-muted/30"). */
  className?: string;
};

export const EcosystemDiagram = ({
  accent = DEFAULT_ACCENT,
  className = "",
}: EcosystemDiagramProps) => {
  return (
    <section className={`pt-16 md:pt-24 pb-6 md:pb-10 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-left mb-14">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] text-balance">
            <span className="text-black">Tecnologia</span> que{" "}
            <span style={{ color: accent }}>simplifica</span>,
            <br className="hidden md:block" />{" "}
            <span className="text-black">integração</span> que gera{" "}
            <span style={{ color: accent }}>resultado</span>.
          </h2>
        </div>

        <div className="relative w-full">
          {/* DESKTOP — 5 cols grid */}
          <div className="hidden md:grid grid-cols-5 grid-rows-[auto_auto_auto] gap-x-5 gap-y-2 items-center">
            <div className="col-start-1 row-start-1 flex justify-center">
              <div className="bg-black text-white rounded-2xl shadow-lg w-44 md:w-48 h-36 md:h-40 flex flex-col items-center justify-center px-4 text-center gap-2">
                <img
                  src={logoSolvefyWhite}
                  alt="Solvefy"
                  className="h-7 md:h-8 w-auto object-contain"
                />
                <p className="text-xs text-gray-400 mt-1">Ecossistema</p>
              </div>
            </div>

            <div className="col-start-2 row-start-1 relative flex justify-center">
              <ArrowConnector />
              <EcoCard title="Solvefy/Ads" subtitle="Aquisição" color="hsl(var(--ads))" icon={iconAds} />
            </div>

            <div className="col-start-3 row-start-1 relative flex justify-center">
              <ArrowConnector />
              <EcoCard title="Solvefy/Marketing" subtitle="Nutrição" color="hsl(var(--marketing))" icon={iconMarketing} />
            </div>

            <div className="col-start-4 row-start-1 relative flex justify-center">
              <ArrowConnector />
              <EcoCard title="Solvefy/CRM" subtitle="Venda" color="hsl(var(--crm))" icon={iconCrm} />
            </div>

            <div className="col-start-1 row-start-2 flex items-center justify-center py-1">
              <DownArrowLine />
            </div>
            <div className="col-start-2 row-start-2 flex items-center justify-center py-1">
              <BiDirectionalArrows />
            </div>
            <div className="col-start-3 row-start-2 flex items-center justify-center py-1">
              <BiDirectionalArrows />
            </div>
            <div className="col-start-4 row-start-2 flex items-center justify-center py-1">
              <BiDirectionalArrows />
            </div>

            <div className="col-start-1 col-span-4 row-start-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6 w-full flex flex-row items-center gap-5 md:gap-8">
                <div className="flex items-center gap-4 pr-6 border-r border-gray-200">
                  <div
                    className="p-3 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "hsl(var(--cpaas))1a" }}
                  >
                    <img src={iconCpaas} alt="Solvefy/CPaaS" className="h-7 w-7 object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-sm md:text-base text-gray-900 tracking-tight leading-tight">
                      Solvefy/CPaaS
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Comunicação</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-row justify-around items-center gap-6">
                  <ChannelDot label="SMS" accent={accent}><SmsIcon /></ChannelDot>
                  <ChannelDot label="RCS" accent={accent}><RcsIcon /></ChannelDot>
                  <ChannelDot label="E-mail" accent={accent}><EmailIcon /></ChannelDot>
                  <ChannelDot label="Voz" accent={accent}><VoiceIcon /></ChannelDot>
                  <ChannelDot label="WhatsApp" accent={accent}><WhatsappIcon /></ChannelDot>
                </div>
              </div>
            </div>

            <div className="col-start-5 row-start-1 row-span-3 flex items-center justify-center">
              <EcoCard title="Solvefy/Cloud" subtitle="Infraestrutura" color="hsl(var(--cloud))" icon={iconCloud} />
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex flex-col items-center gap-6">
            <div className="bg-black text-white rounded-2xl shadow-lg w-44 h-36 flex flex-col items-center justify-center px-4 text-center gap-2">
              <img src={logoSolvefyWhite} alt="Solvefy" className="h-7 w-auto object-contain" />
              <p className="text-xs text-gray-400 mt-1">Ecossistema</p>
            </div>
            <EcoCard title="Solvefy/Ads" subtitle="Aquisição" color="hsl(var(--ads))" icon={iconAds} />
            <EcoCard title="Solvefy/Marketing" subtitle="Nutrição" color="hsl(var(--marketing))" icon={iconMarketing} />
            <EcoCard title="Solvefy/CRM" subtitle="Venda" color="hsl(var(--crm))" icon={iconCrm} />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 w-full flex flex-col items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(var(--cpaas))1a" }}>
                  <img src={iconCpaas} alt="Solvefy/CPaaS" className="h-7 w-7 object-contain" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-sm text-gray-900 tracking-tight leading-tight">Solvefy/CPaaS</h3>
                  <p className="text-xs text-gray-500 mt-1">Comunicação</p>
                </div>
              </div>
              <div className="flex flex-row justify-around items-center gap-5 w-full">
                <ChannelDot label="SMS" accent={accent}><SmsIcon /></ChannelDot>
                <ChannelDot label="RCS" accent={accent}><RcsIcon /></ChannelDot>
                <ChannelDot label="E-mail" accent={accent}><EmailIcon /></ChannelDot>
                <ChannelDot label="Voz" accent={accent}><VoiceIcon /></ChannelDot>
                <ChannelDot label="WhatsApp" accent={accent}><WhatsappIcon /></ChannelDot>
              </div>
            </div>
            <EcoCard title="Solvefy/Cloud" subtitle="Infraestrutura" color="hsl(var(--cloud))" icon={iconCloud} />
          </div>
        </div>
      </div>
    </section>
  );
};
