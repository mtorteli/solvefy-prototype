import {
  PhoneCall,
  Combine,
  BadgePercent,
  Mic2,
  LogIn,
  Route,
  Send,
  Code2,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ProductHero } from "@/components/ProductHero";
import { FaqSection } from "@/components/FaqSection";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import iconCpaas from "@/assets/icons/cpaas.svg";
import logoCpaas from "@/assets/logos/solvefy-cpaas.png";

const ACCENT = "hsl(var(--cpaas))";

const benefits = [
  {
    icon: Combine,
    title: "Voz + SMS no mesmo fluxo",
    desc: "Combine torpedo de voz e SMS na mesma jornada. Ative o canal certo no momento certo sem trocar de ferramenta.",
  },
  {
    icon: BadgePercent,
    title: "Pague só pelo atendido",
    desc: "Cobrança por chamada efetivamente atendida. Caixa postal, ocupado ou não atende não entram na conta.",
  },
  {
    icon: Mic2,
    title: "Áudios humanizados",
    desc: "Suba locuções profissionais ou use vozes de influenciadores para aumentar atenção e taxa de escuta da campanha.",
  },
];

const steps = [
  {
    icon: LogIn,
    img: "/images/cpaas/voz/passo-1-cadastro.svg",
    title: "1. Acesse a plataforma",
    desc: "Login em segundos. Sem instalação, sem setup.",
  },
  {
    icon: Route,
    img: "/images/cpaas/voz/passo-2-jornada.svg",
    title: "2. Monte a jornada",
    desc: "Escolha o canal de voz, faça upload do áudio e segmente o público.",
  },
  {
    icon: Send,
    img: "/images/cpaas/voz/passo-3-disparo.svg",
    title: "3. Dispare ou agende",
    desc: "Envio imediato ou agendado por data, hora e janela de operação.",
  },
];

const useCases = [
  {
    img: "/images/cpaas/voz/caso-betting.webp",
    sector: "Apostas (Betting)",
    desc: "Amplifique ofertas de odds e boas-vindas com áudios curtos e vozes reconhecidas — alto engajamento em tempo real.",
  },
  {
    img: "/images/cpaas/voz/caso-consignado.webp",
    sector: "Crédito Consignado",
    desc: "Divulgue propostas pré-aprovadas combinando áudio explicativo e SMS com link de adesão na mesma jornada.",
  },
  {
    img: "/images/cpaas/voz/caso-cobranca.webp",
    sector: "Cobrança",
    desc: "Reduza inadimplência com lembretes humanizados antes do vencimento e avisos pós-atraso, com cadência configurável.",
  },
  {
    img: "/images/cpaas/voz/caso-clinicas.webp",
    sector: "Saúde & Clínicas",
    desc: "Diminua o no-show confirmando consultas por voz com possibilidade de reagendamento via tom (DTMF).",
  },
];

const faq = [
  {
    question: "O que é o canal de Voz da Solvefy/CPaaS?",
    answer:
      "É a API de voz que dispara chamadas em massa com áudios pré-gravados (torpedo de voz) ou ligações interativas com URA. Permite atingir grandes volumes em minutos, com personalização por contato e relatórios de entrega em tempo real.",
  },
  {
    question: "Posso personalizar a mensagem para cada destinatário?",
    answer:
      "Sim. Use variáveis (nome, número de contrato, valor, vencimento, etc.) no script ou em locuções dinâmicas para que cada chamada chegue contextualizada — sem precisar gravar um áudio por pessoa.",
  },
  {
    question: "Qual a diferença entre Voz e os outros canais (SMS, WhatsApp)?",
    answer:
      "Voz entrega presença e tom — útil quando o impacto humano da fala converte mais que o texto. Some-se a isso o modelo de cobrança por chamada atendida, que dá previsibilidade. Voz combina bem com SMS/WhatsApp para reforço de mensagem.",
  },
  {
    question: "Qual a taxa de alcance de uma campanha de voz?",
    answer:
      "Em bases qualificadas, a taxa de atendimento chega à casa dos 80%. O resultado depende da qualidade do mailing, horário do disparo, perfil do público e da locução. Nosso time apoia a calibragem das campanhas.",
  },
  {
    question: "É difícil de operar? Preciso de equipe técnica?",
    answer:
      "Não. A interface é pensada para áreas de marketing, cobrança e relacionamento operarem direto. Para fluxos automatizados a partir do seu sistema, integração via API REST está disponível.",
  },
  {
    question: "Tem suporte humano em português?",
    answer:
      "Sim. Suporte humano em português e inglês, com SLA real para operações críticas. Acompanhamento dedicado para clientes Enterprise.",
  },
];

const CpaasVoz = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="API de Voz — Solvefy/CPaaS"
        description="API de Voz da Solvefy/CPaaS: chamadas em massa, URA programável e torpedo de voz com cobrança por atendimento. Voz humanizada que converte em escala."
        canonical="/cpaas/voz"
        ogImage="/og/og-cpaas.jpg"
        keywords={[
          "API de voz",
          "torpedo de voz",
          "voz em massa",
          "URA programável",
          "CPaaS",
          "comunicação por voz",
        ]}
        schemas={[
          serviceSchema({
            name: "Solvefy/CPaaS — Voz",
            description:
              "API de voz programável para chamadas em massa, URA e torpedo de voz com cobrança por atendimento.",
            path: "/cpaas/voz",
            serviceType: "Voice API — Voz programável",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solvefy/CPaaS", path: "/cpaas" },
            { name: "Voz", path: "/cpaas/voz" },
          ]),
        ]}
      />
      <Header />
      <main id="main" className="flex-1">
        <ProductHero
          accentVar="--cpaas"
          badgeIcon={iconCpaas}
          badgeLabel="Solvefy/CPaaS · Voz"
          logoImage={logoCpaas}
          title={
            <>
              Comunicação por voz que{" "}
              <span className="text-[hsl(var(--cpaas))]">conecta em escala</span>
            </>
          }
          subtitle="Dispare milhares de chamadas em minutos com áudios humanizados, URA programável e cobrança apenas pelo atendido. A presença da voz, com a previsibilidade de uma API."
          ctaText="Fale com um Especialista"
          ctaHref="/contato"
          trustItems={[
            "Cobrança por chamada atendida",
            "Áudios profissionais",
            "API REST + plataforma",
          ]}
          right={
            <img
              src="/images/cpaas/voz/voz-hero.webp"
              alt="Ilustração de campanha de voz"
              className="w-full h-auto"
              loading="eager"
              decoding="async"
            />
          }
        />

        {/* Benefícios */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <PhoneCall className="h-3.5 w-3.5" />
                Por que voz
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                Engajamento que só a{" "}
                <span style={{ color: ACCENT }}>voz entrega</span>.
              </h2>
              <p className="section-subtitle mt-4">
                Três alavancas que fazem voz performar onde texto satura.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-16 bg-[hsl(var(--cpaas-tint))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Como funciona
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                Da primeira chamada ao{" "}
                <span style={{ color: ACCENT }}>volume Enterprise</span>, em 3
                passos.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {steps.map(({ img, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6 flex flex-col"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="h-32 flex items-center justify-center mb-4">
                    <img
                      src={img}
                      alt=""
                      aria-hidden="true"
                      className="max-h-full w-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Casos de uso */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Casos de uso
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                Voz que{" "}
                <span style={{ color: ACCENT }}>move setores inteiros</span>.
              </h2>
              <p className="section-subtitle mt-4">
                Quatro frentes onde Voz Solvefy já opera em volume.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {useCases.map(({ img, sector, desc }) => (
                <article
                  key={sector}
                  className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="aspect-[16/9] bg-[hsl(var(--cpaas-tint))] flex items-center justify-center">
                    <img
                      src={img}
                      alt=""
                      aria-hidden="true"
                      className="max-h-full w-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {sector}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* API */}
        <section className="py-16 bg-[hsl(var(--cpaas-tint))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  API REST
                </div>
                <h2 className="tracking-tight leading-tight text-balance">
                  Voz dentro do seu{" "}
                  <span style={{ color: ACCENT }}>sistema</span>.
                </h2>
                <p className="section-subtitle mt-4">
                  Integre disparo de voz, URA e callbacks diretamente no seu
                  software. Documentação clara, SDKs e suporte humano para tirar
                  o primeiro callback do zero.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Endpoints REST autenticados por token",
                    "Webhooks de status (entregue, atendida, finalizada)",
                    "Upload de áudios ou TTS dinâmico por variável",
                    "Sandbox para testar antes de produção",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check
                        className="h-5 w-5 shrink-0 mt-0.5"
                        style={{ color: ACCENT }}
                      />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link to="/contato">
                    <Button
                      variant="hero"
                      size="lg"
                      className="group text-black font-semibold"
                    >
                      Falar com um Especialista
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/cpaas/voz/api-code.svg"
                  alt="Exemplo de integração com a API de voz"
                  className="w-full h-auto max-w-md"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection
          title="Perguntas frequentes sobre Voz"
          description="Tudo o que costuma vir antes do primeiro disparo."
          items={faq}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CpaasVoz;
