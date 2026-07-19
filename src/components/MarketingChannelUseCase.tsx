import { useState, useRef, useEffect } from "react";
import { ArrowRight, ShoppingBag, Building2, GraduationCap, LayoutGrid, CreditCard, MessageSquare, PhoneCall, Layers2, Tag, Receipt, Play, Pause } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

import wppEcommerce    from "@/assets/marketing-channels/wpp-ecommerce.png";
import wppEducacao     from "@/assets/marketing-channels/wpp-educacao.png";
import wppInfoprodutor from "@/assets/marketing-channels/wpp-infoprodutor.png";
import wppSaude        from "@/assets/marketing-channels/wpp-saude.png";
import smsBetting         from "@/assets/marketing-channels/sms-betting.png";
import smsConsignado      from "@/assets/marketing-channels/sms-consignado.png";
import smsCobranca        from "@/assets/marketing-channels/sms-cobranca.png";
import smsClinicas        from "@/assets/marketing-channels/sms-clinicas.png";
import rcsSaude           from "@/assets/marketing-channels/rcs-saude.png";
import rcsEducacao        from "@/assets/marketing-channels/rcs-educacao.png";
import rcsInfoprodutor    from "@/assets/marketing-channels/rcs-infoprodutor.png";
import rcsEcommerce       from "@/assets/marketing-channels/rcs-ecommerce.png";
import vozBettingAudio    from "@/assets/marketing-channels/voz-betting.mp3";
import vozConsignadoAudio from "@/assets/marketing-channels/voz-consignado.mp3";
import vozCobrancaAudio   from "@/assets/marketing-channels/voz-cobranca.mp3";
import vozClinicasAudio   from "@/assets/marketing-channels/voz-clinicas.mp3";

const WhatsAppIcon = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

// Os textos (label da aba, título e descrição de cada caso, CTA e título da
// seção) vêm do i18n — ver a chave "channelUseCase" em marketing.json. Aqui
// guardamos apenas ícone, chave de tradução e os assets de cada caso.
interface UseCase {
  Icon: LucideIcon;
  key: string;
  image: string;
  audio?: string;
}

interface ChannelTab {
  id: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
}

const CHANNEL_TABS: ChannelTab[] = [
  { id: "whatsapp", Icon: WhatsAppIcon as LucideIcon },
  { id: "sms",      Icon: MessageSquare },
  { id: "rcs",      Icon: Layers2 },
  { id: "voz",      Icon: PhoneCall },
];

const CHANNEL_CASES: Record<string, UseCase[]> = {
  whatsapp: [
    { Icon: ShoppingBag,   key: "ecommerce",      image: wppEcommerce },
    { Icon: GraduationCap, key: "educacao",       image: wppEducacao },
    { Icon: LayoutGrid,    key: "infoprodutores", image: wppInfoprodutor },
    { Icon: Building2,     key: "saude",          image: wppSaude },
  ],
  sms: [
    { Icon: CreditCard,  key: "betting",     image: smsBetting },
    { Icon: Tag,         key: "consignado",  image: smsConsignado },
    { Icon: Receipt,     key: "cobranca",    image: smsCobranca },
    { Icon: Building2,   key: "clinicas",    image: smsClinicas },
  ],
  rcs: [
    { Icon: ShoppingBag,   key: "ecommerce",      image: rcsEcommerce },
    { Icon: Building2,     key: "saude",          image: rcsSaude },
    { Icon: GraduationCap, key: "educacao",       image: rcsEducacao },
    { Icon: LayoutGrid,    key: "infoprodutores", image: rcsInfoprodutor },
  ],
  voz: [
    { Icon: CreditCard,  key: "betting",     image: smsBetting,    audio: vozBettingAudio },
    { Icon: Tag,         key: "consignado",  image: smsConsignado,  audio: vozConsignadoAudio },
    { Icon: Receipt,     key: "cobranca",    image: smsCobranca,    audio: vozCobrancaAudio },
    { Icon: Building2,   key: "clinicas",    image: smsClinicas,    audio: vozClinicasAudio },
  ],
};

const CHANNEL_GRADIENT: Record<string, string> = {
  whatsapp: "linear-gradient(135deg, #fce4ec 0%, #E64499 100%)",
  sms:      "linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%)",
  rcs:      "linear-gradient(135deg, #ede7f6 0%, #9C7BFF 100%)",
  voz:      "linear-gradient(135deg, #e3f2fd 0%, #64b5f6 100%)",
};

const SEEK_STEP = 5; // segundos por tecla de seta

function AudioPlayer({ src, accent }: { src: string; accent: string }) {
  const { t } = useTranslation("marketing");
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => () => { ref.current?.pause(); }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (playing) el.pause();
    else el.play();
    setPlaying(p => !p);
  };

  const seekTo = (time: number) => {
    const el = ref.current;
    if (!el || !el.duration) return;
    el.currentTime = Math.min(el.duration, Math.max(0, time));
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/90 shadow-md w-full">
      <audio
        ref={ref}
        src={src}
        onTimeUpdate={() => setCurrentTime(ref.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(ref.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? t("channelUseCase.audio.pause") : t("channelUseCase.audio.play")}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-transform active:scale-95"
        style={{ backgroundColor: accent }}
      >
        {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
      </button>
      <div className="flex flex-1 flex-col gap-1.5">
        <div
          role="slider"
          tabIndex={0}
          aria-label={t("channelUseCase.audio.seek")}
          aria-valuemin={0}
          aria-valuemax={Math.floor(duration)}
          aria-valuenow={Math.floor(currentTime)}
          aria-valuetext={`${fmt(currentTime)} / ${fmt(duration)}`}
          className="relative h-1.5 w-full rounded-full bg-black/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ "--tw-ring-color": accent } as React.CSSProperties}
          onClick={(e) => {
            const el = ref.current;
            if (!el || !el.duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            seekTo(((e.clientX - rect.left) / rect.width) * el.duration);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              seekTo(currentTime + SEEK_STEP);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              seekTo(currentTime - SEEK_STEP);
            }
          }}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%`, backgroundColor: accent }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>
    </div>
  );
}

interface MarketingChannelUseCaseProps {
  accent?: string;
}

export function MarketingChannelUseCase({ accent = "#E64499" }: MarketingChannelUseCaseProps) {
  const { t } = useTranslation("marketing");
  const [activeChannelId, setActiveChannelId] = useState("whatsapp");
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);

  const handleChannelChange = (id: string) => {
    setActiveChannelId(id);
    setActiveCaseIdx(0);
  };

  const cases = CHANNEL_CASES[activeChannelId] ?? CHANNEL_CASES.whatsapp;
  const activeCase = cases[activeCaseIdx];
  const bgGradient = CHANNEL_GRADIENT[activeChannelId];
  const caseTitle = (uc: UseCase) => t(`channelUseCase.cases.${activeChannelId}.${uc.key}.title`);

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section heading */}
        <div className="mb-10 max-w-2xl">
          <h2 className="tracking-tighter leading-tight">
            <span className="block whitespace-nowrap">
              <Trans i18nKey="channelUseCase.heading1" ns="marketing" components={{ accent: <span style={{ color: accent }} /> }} />
            </span>
            <span className="block whitespace-nowrap">
              <Trans i18nKey="channelUseCase.heading2" ns="marketing" components={{ accent: <span style={{ color: accent }} /> }} />
            </span>
          </h2>
          <p className="section-subtitle mt-4">
            {t("channelUseCase.subtitle")}
          </p>
        </div>

        {/* Channel tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CHANNEL_TABS.map((tab) => {
            const isActive = activeChannelId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleChannelChange(tab.id)}
                aria-pressed={isActive}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
                style={
                  isActive
                    ? { backgroundColor: accent, color: "#fff", boxShadow: `0 4px 14px -4px ${accent}80` }
                    : { backgroundColor: `${accent}15`, color: accent }
                }
              >
                <tab.Icon className="h-4 w-4" />
                {t(`channelUseCase.tabs.${tab.id}`)}
              </button>
            );
          })}
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Phone mockup */}
          <div
            className="relative flex items-center justify-center rounded-3xl py-8"
            style={{ background: bgGradient }}
          >
            <div className="relative w-[72%] max-w-[300px] aspect-[500/709]">
              <img
                key={activeCase.image + activeCaseIdx}
                src={activeCase.image}
                alt={caseTitle(activeCase)}
                className="absolute inset-0 w-full h-full object-cover object-top drop-shadow-2xl"
              />
              {activeCase.audio && (
                <div className="absolute inset-x-[8%] top-1/2 -translate-y-1/2 z-20">
                  <AudioPlayer key={activeCase.audio} src={activeCase.audio} accent={accent} />
                </div>
              )}
            </div>
          </div>

          {/* Use cases list */}
          <div className="flex flex-col justify-center gap-1">
            {cases.map((uc, i) => {
              const isActive = activeCaseIdx === i;
              return (
                <button
                  key={uc.key}
                  type="button"
                  onClick={() => setActiveCaseIdx(i)}
                  aria-pressed={isActive}
                  className="flex items-start gap-4 rounded-2xl px-4 py-4 text-left transition-colors duration-150 hover:bg-muted/40"
                  style={isActive ? { backgroundColor: `${accent}0D` } : {}}
                >
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-150"
                    style={{
                      backgroundColor: isActive ? accent : `${accent}20`,
                      color: isActive ? "#fff" : accent,
                    }}
                  >
                    <uc.Icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p
                      className="text-sm leading-snug tracking-tight transition-colors duration-150"
                      style={{ fontWeight: isActive ? 700 : 500, color: isActive ? accent : "inherit" }}
                    >
                      {caseTitle(uc)}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                      {t(`channelUseCase.cases.${activeChannelId}.${uc.key}.desc`)}
                    </p>
                  </div>
                </button>
              );
            })}

            <a
              href="#/contato"
              className="inline-flex items-center gap-2 self-start mt-4 ml-4 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: accent }}
            >
              {t(`channelUseCase.cta.${activeChannelId}`)}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
