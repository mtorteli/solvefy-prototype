import { useState, useRef, useEffect } from "react";
import { ArrowRight, ShoppingBag, Building2, GraduationCap, LayoutGrid, CreditCard, MessageSquare, PhoneCall, Layers2, Tag, Receipt, Play, Pause } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

interface UseCase {
  Icon: LucideIcon;
  title: string;
  desc: string;
  image: string;
  audio?: string;
}

interface ChannelTab {
  id: string;
  label: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
}

const CHANNEL_TABS: ChannelTab[] = [
  { id: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon as LucideIcon },
  { id: "sms",      label: "SMS",       Icon: MessageSquare },
  { id: "rcs",      label: "RCS",       Icon: Layers2 },
  { id: "voz",      label: "Voz",       Icon: PhoneCall },
];

const CHANNEL_CASES: Record<string, UseCase[]> = {
  whatsapp: [
    { Icon: ShoppingBag,   title: "E-Commerce",    desc: "Recupere carrinhos e converta com cupons personalizados.",        image: wppEcommerce },
    { Icon: GraduationCap, title: "Educação",       desc: "Notifique alunos sobre matrículas e prazos com botão de ação.",  image: wppEducacao },
    { Icon: LayoutGrid,    title: "Infoprodutores", desc: "Divulgue lives e engaje sua audiência com confirmação direta.",   image: wppInfoprodutor },
    { Icon: Building2,     title: "Saúde",          desc: "Confirme consultas e reduza faltas com lembretes automáticos.",   image: wppSaude },
  ],
  sms: [
    { Icon: CreditCard,  title: "Betting",             desc: "Dispare alertas sobre jogos e vantagens.",                      image: smsBetting },
    { Icon: Tag,         title: "Crédito Consignado",  desc: "Divulgue condições especiais com links diretos.",               image: smsConsignado },
    { Icon: Receipt,     title: "Cobrança",            desc: "Reduza a inadimplência com lembretes certeiros.",               image: smsCobranca },
    { Icon: Building2,   title: "Clínicas",            desc: "Garanta 100% de presença com lembretes automáticos.",           image: smsClinicas },
  ],
  rcs: [
    { Icon: ShoppingBag,   title: "E-Commerce",    desc: "Campanhas com imagens, carrossel e botões interativos.", image: rcsEcommerce },
    { Icon: Building2,     title: "Saúde",          desc: "Confirmações de consultas e lembretes com rich cards.",  image: rcsSaude },
    { Icon: GraduationCap, title: "Educação",       desc: "Lembretes, comunicados e matrículas com botões ricos.",  image: rcsEducacao },
    { Icon: LayoutGrid,    title: "Infoprodutores", desc: "Lançamentos, lives e ofertas exclusivas com rich cards.", image: rcsInfoprodutor },
  ],
  voz: [
    { Icon: CreditCard,  title: "Betting",             desc: "Alcance apostadores com áudios de influencers.",    image: smsBetting,    audio: vozBettingAudio },
    { Icon: Tag,         title: "Crédito Consignado",  desc: "Divulgue ofertas e diferenciais unindo Voz e SMS.", image: smsConsignado,  audio: vozConsignadoAudio },
    { Icon: Receipt,     title: "Cobrança",            desc: "Reduza a inadimplência com lembretes certeiros.",   image: smsCobranca,    audio: vozCobrancaAudio },
    { Icon: Building2,   title: "Clínicas",            desc: "Garanta 100% de presença com lembretes de Voz.",   image: smsClinicas,    audio: vozClinicasAudio },
  ],
};

const CHANNEL_GRADIENT: Record<string, string> = {
  whatsapp: "linear-gradient(135deg, #fce4ec 0%, #E64499 100%)",
  sms:      "linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%)",
  rcs:      "linear-gradient(135deg, #ede7f6 0%, #9C7BFF 100%)",
  voz:      "linear-gradient(135deg, #e3f2fd 0%, #64b5f6 100%)",
};

const CHANNEL_CTA: Record<string, string> = {
  whatsapp: "Crie sua conta agora!",
  sms:      "Desbrave possibilidades!",
  rcs:      "Crie sua conta agora!",
  voz:      "Desbrave possibilidades!",
};

const CHANNEL_TITLE: Record<string, string> = {
  whatsapp: "Com WhatsApp, o retorno é garantido!",
  sms:      "Com SMS, você melhora sua comunicação em diferentes segmentos de mercado",
  rcs:      "Escolha o formato ideal para seu RCS!",
  voz:      "Crie campanhas interativas unindo Disparos de Voz e SMS",
};

function AudioPlayer({ src, accent }: { src: string; accent: string }) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => () => { ref.current?.pause(); }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    playing ? el.pause() : el.play();
    setPlaying(p => !p);
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
        onClick={toggle}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-transform active:scale-95"
        style={{ backgroundColor: accent }}
      >
        {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
      </button>
      <div className="flex flex-1 flex-col gap-1.5">
        <div
          className="relative h-1.5 w-full rounded-full bg-black/10 cursor-pointer"
          onClick={(e) => {
            const el = ref.current;
            if (!el || !el.duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            el.currentTime = ((e.clientX - rect.left) / rect.width) * el.duration;
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
  const [activeChannelId, setActiveChannelId] = useState("whatsapp");
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);

  const handleChannelChange = (id: string) => {
    setActiveChannelId(id);
    setActiveCaseIdx(0);
  };

  const cases = CHANNEL_CASES[activeChannelId] ?? CHANNEL_CASES.whatsapp;
  const activeCase = cases[activeCaseIdx];
  const bgGradient = CHANNEL_GRADIENT[activeChannelId];
  const ctaLabel = CHANNEL_CTA[activeChannelId] ?? "Crie sua conta agora!";

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section heading */}
        <div className="mb-10 max-w-2xl">
          <h2 className="tracking-tighter leading-tight">
            <span className="block whitespace-nowrap">Mensagens que geram <span style={{ color: accent }}>conexões</span></span>
            <span className="block whitespace-nowrap">Contatos que geram <span style={{ color: accent }}>vendas</span></span>
          </h2>
          <p className="section-subtitle mt-4">
            Veja na tela como os seus clientes recebem as interações e entenda por que nossos formatos convertem mais do que disparos tradicionais.
          </p>
        </div>

        {/* Channel tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CHANNEL_TABS.map((tab) => {
            const isActive = activeChannelId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleChannelChange(tab.id)}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
                style={
                  isActive
                    ? { backgroundColor: accent, color: "#fff", boxShadow: `0 4px 14px -4px ${accent}80` }
                    : { backgroundColor: `${accent}15`, color: accent }
                }
              >
                <tab.Icon className="h-4 w-4" />
                {tab.label}
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
                alt={activeCase.title}
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
                  key={uc.title}
                  onClick={() => setActiveCaseIdx(i)}
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
                      {uc.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                      {uc.desc}
                    </p>
                  </div>
                </button>
              );
            })}

            <a
              href="https://disparopro.com.br/cadastro"
              className="inline-flex items-center gap-2 self-start mt-4 ml-4 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: accent }}
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
