import {
  ArrowRight,
  Target,
  Settings2,
  Wallet,
  Layers,
  Users,
  ImageIcon,
  ShoppingBag,
  Dice5,
  Building2,
  Cpu,
  TrendingDown,
  Check,
  X,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { AdsStepsFlow } from "@/components/AdsStepsFlow";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import { ProductHero } from "@/components/ProductHero";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import iconAds from "@/assets/icons/ads.svg";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";
import { CpaasChannelFlow } from "@/components/CpaasChannelFlow";
import { Heading, SectionSubtitle } from "@/components/ui/Typography";
import { AdsHeroMockup } from "@/components/AdsHeroMockup";

const ACCENT = "hsl(var(--ads))";

const steps = [
  {
    icon: Target,
    title: "Objetivo",
    desc: "Defina a meta e nossa IA sugere os criativos certos.",
  },
  {
    icon: Settings2,
    title: "Setup",
    desc: "Nome da campanha, período e segmento.",
  },
  {
    icon: Wallet,
    title: "Orçamento",
    desc: "Diário ou total, sem surpresas no fechamento.",
  },
  {
    icon: Layers,
    title: "Posicionamentos",
    desc: "Distribua sua verba em inventário premium e qualificado.",
  },
  {
    icon: Users,
    title: "Público",
    desc: "Segmente por tags e base própria (1st party).",
  },
  {
    icon: ImageIcon,
    title: "Criativos",
    desc: "Texto, mídia e CTAs gerados com apoio de IA.",
  },
];

const useCases = [
  {
    icon: ShoppingBag,
    title: "E-commerce & Varejo",
    desc: "Campanhas de aquisição e remarketing com CPA controlado, sem leilões inflacionados.",
  },
  {
    icon: Dice5,
    title: "iGaming & Apostas",
    desc: "Aquisição de jogadores em escala, sem o risco de bloqueios injustos.",
  },
  {
    icon: Building2,
    title: "Agências de Marketing",
    desc: "Diversifique o mix de mídia dos seus clientes e blinde a operação contra dependências.",
  },
  {
    icon: Cpu,
    title: "SaaS e Tech",
    desc: "Geração de demanda B2B com tráfego qualificado e atribuição transparente.",
  },
];

const comparison = [
  {
    name: "Plataformas Tradicionais",
    cpa: "Leilões inflacionados",
    autonomy: "Dependência de ecossistemas fechados",
    stability: "Risco constante de bloqueios",
    highlight: false,
  },
  {
    name: "Solvefy/Ads",
    cpa: "Até 20% menor",
    autonomy: "Controle total, sem vínculo",
    stability: "Tráfego contínuo",
    highlight: true,
  },
];

const pricing = [
  {
    title: "Mais performance",
    desc: "Para operações que precisam de cada real otimizado. CPA até 20% menor e atribuição transparente em cada conversão.",
    bullets: [
      "CPA até 20% menor",
      "Otimização contínua por IA",
      "Atribuição em tempo real",
    ],
    cta: "Quero performance",
  },
  {
    title: "Alcance mais rápido",
    desc: "Para quem precisa escalar volume de impressões qualificadas rapidamente, sem competir por scroll de feed saturado.",
    bullets: [
      "Inventário premium",
      "Escala em dias, não meses",
      "Previsibilidade total",
    ],
    cta: "Quero alcance",
    highlight: true,
  },
];

const Ads = () => {
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    segmento: "",
    investimento: "",
  });
  const [result, setResult] = useState<null | {
    investido: number;
    economia: number;
    novoCusto: number;
  }>(null);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleCalc = (e: FormEvent) => {
    e.preventDefault();
    const investido = Number(
      form.investimento.replace(/[^\d.,]/g, "").replace(",", "."),
    );
    if (!investido || investido <= 0) return;
    const economia = investido * 0.2;
    const novoCusto = investido - economia;
    setResult({ investido, economia, novoCusto });
  };

  const formatBRL = (n: number) =>
    n.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2,
    });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Ads — Gestão de Tráfego Pago Inteligente"
        description="Gerencie campanhas de mídia paga com inteligência e automação. Maximize o ROI dos seus investimentos em anúncios com a Solvefy Ads."
        canonical="/ads"
        ogImage="/og/og-ads.jpg"
        schemas={[
          serviceSchema({
            name: "Solvefy/Ads",
            description:
              "Gestão de tráfego pago em Google, Meta e demais plataformas com automação, otimização e relatórios unificados.",
            path: "/ads",
            serviceType: "Gestão de tráfego pago / Mídia paga",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solvefy/Ads", path: "/ads" },
          ]),
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Solvefy Ads",
          "applicationCategory": "BusinessApplication",
          "description": "Gestão inteligente de tráfego pago e campanhas de mídia para máximo ROI.",
          "operatingSystem": "Web",
          "url": "https://solvefy.com/ads"
        }}
      />
      <Header />
      <main id="main" className="flex-1">
        <ProductHero
          accentVar="--ads"
          badgeIcon={iconAds}
          badgeLabel="Solvefy/Ads"
          title={<>Escale suas vendas com um{" "}
            <span className="text-[hsl(var(--ads))]">CPA até 20% menor</span>{" "}
            que nos outros Ads.</>}
          subtitle="Pare de queimar orçamento em plataformas saturadas e leilões inflacionados. A Solvefy/Ads entrega tráfego qualificado de alta performance com total autonomia. Sem bloqueios injustos, sem vínculo com outras redes. Apenas resultados reais e escaláveis."
          ctaText="Comprar Agora"
          ctaHref="/contato"
          ctaTextColor="text-gray-950"
          trustItems={["CPA até 20% menor", "CTR de até 35%", "Zero Vínculos"]}
          right={<AdsHeroMockup />}
        />

        {/* ============ DOR vs SOLUÇÃO ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <Heading className="text-balance">
                O fim do dinheiro{" "}
                <span style={{ color: ACCENT }}>evaporando</span>. Compare o que
                você paga hoje com o que você poderia estar pagando.
              </Heading>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Card 1 — Problema */}
              <div className="relative rounded-2xl bg-card border border-border p-7 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    <TrendingDown className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-destructive">
                    A concorrência.
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                  Tráfego tradicional: você paga caro e ainda fica refém.
                </h3>
                <ul className="space-y-3 text-base text-foreground/80">
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 mt-0.5 text-destructive shrink-0" />
                    Custo por aquisição cresce ano após ano em leilões
                    inflacionados.
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 mt-0.5 text-destructive shrink-0" />
                    Vínculo obrigatório com ecossistemas fechados e regras
                    ocultas.
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 mt-0.5 text-destructive shrink-0" />
                    Risco constante de bloqueios injustos travando sua operação.
                  </li>
                </ul>
              </div>

              {/* Card 2 — Solução com Autonomia Total */}
              <div
                className="relative rounded-2xl p-7 overflow-hidden border border-border transition-all hover:-translate-y-1"
                style={{
                  background: `linear-gradient(165deg, #ffffff 0%, ${ACCENT}08 100%)`,
                  boxShadow: `0 12px 30px -15px rgba(255, 170, 0, 0.35)`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: ACCENT }}
                  >
                    Solvefy/Ads
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                  Você no comando. Sem vínculos, sem reféns.
                </h3>
                <p className="text-sm text-foreground/85 leading-relaxed mb-4">
                  Não exigimos vínculo com outras plataformas. Mantenha o
                  controle da sua operação, diversifique seu tráfego e proteja
                  sua empresa contra bloqueios e regras ocultas do mercado
                  tradicional.
                </p>
                <ul className="space-y-3 text-sm text-foreground/85">
                  <li className="flex items-start gap-2">
                    <Check
                      className="h-4 w-4 mt-0.5 shrink-0"
                      style={{ color: ACCENT }}
                    />
                    CPA até 20% menor que os leilões tradicionais.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className="h-4 w-4 mt-0.5 shrink-0"
                      style={{ color: ACCENT }}
                    />
                    CTR de até 35% em campanhas otimizadas.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className="h-4 w-4 mt-0.5 shrink-0"
                      style={{ color: ACCENT }}
                    />
                    Tráfego contínuo, estável e sem regras ocultas.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <AdsStepsFlow />

        {/* ============ CANAIS — Animated Flow ============ */}
        <CpaasChannelFlow accent="#F0A800" accentBg="#FFF7E5" />

        <EcosystemDiagram accent="hsl(var(--ads))" />

        {/* ============ COMPARATIVO ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <h2 className="tracking-tight leading-tight text-balance">
                Solvefy/Ads vs.{" "}
                <span style={{ color: ACCENT }}>o resto do mercado</span>.
              </h2>
              <p className="section-subtitle mt-4">
                Comparativo direto com o que as plataformas tradicionais
                oferecem hoje.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div>Plataforma</div>
                <div>Custo por Aquisição (CPA)</div>
                <div>Autonomia de Conta</div>
                <div>Estabilidade</div>
              </div>

              {comparison.map((row, i) => (
                <div
                  key={row.name}
                  className={`grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 px-6 py-5 ${
                    i !== comparison.length - 1 ? "border-b border-border" : ""
                  }`}
                  style={
                    row.highlight
                      ? { backgroundColor: `${ACCENT}10` }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-base font-bold tracking-tight ${
                        row.highlight ? "" : "text-foreground"
                      }`}
                      style={row.highlight ? { color: ACCENT } : undefined}
                    >
                      {row.name}
                    </span>
                    {row.highlight && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                        style={{ backgroundColor: ACCENT, color: "#0a0a0a" }}
                      >
                        Recomendado
                      </span>
                    )}
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    {row.highlight ? (
                      <Check
                        className="h-4 w-4 mt-0.5 shrink-0"
                        style={{ color: ACCENT }}
                      />
                    ) : (
                      <X className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    )}
                    <span
                      className={
                        row.highlight
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {row.cpa}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    {row.highlight ? (
                      <Check
                        className="h-4 w-4 mt-0.5 shrink-0"
                        style={{ color: ACCENT }}
                      />
                    ) : (
                      <X className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    )}
                    <span
                      className={
                        row.highlight
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {row.autonomy}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    {row.highlight ? (
                      <Check
                        className="h-4 w-4 mt-0.5 shrink-0"
                        style={{ color: ACCENT }}
                      />
                    ) : (
                      <X className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    )}
                    <span
                      className={
                        row.highlight
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {row.stability}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CALCULADORA DE PERFORMANCE ============ */}
        {/* <section className="relative py-20 overflow-hidden bg-[#0a0a0f]">
          ... (contéudo comentado) ...
        </section> */}

        {/* ============ PARA QUEM É ============ */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <h2 className="tracking-tight leading-tight text-balance">
                Operações que vivem de{" "}
                <span style={{ color: ACCENT }}>conversão real</span>.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {useCases.map(({ icon: Icon, title, desc }) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ACCENT;
                    e.currentTarget.style.boxShadow = `0 12px 40px -12px ${ACCENT}55`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "var(--shadow-soft)";
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl mb-5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRECIFICAÇÃO (estilo CPaaS) ============ */}
        <section className="py-16 bg-[hsl(var(--ads-tint))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <h2 className="tracking-tight leading-tight text-balance">
                Precificação que{" "}
                <span style={{ color: ACCENT }}>cabe na sua operação</span>.
              </h2>
              <p className="section-subtitle mt-4">
                Dois modelos para escolher como você quer escalar, sem letras miúdas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {pricing.map(({ title, desc, bullets, cta, highlight }) => (
                <div
                  key={title}
                  className={`relative rounded-3xl p-8 flex flex-col transition-all ${
                    highlight
                      ? "shadow-2xl"
                      : "border border-border bg-card hover:-translate-y-1 hover:shadow-md"
                  }`}
                  style={
                    highlight
                      ? {
                          borderWidth: "2px",
                          borderStyle: "solid",
                          borderColor: ACCENT,
                          background: `linear-gradient(160deg, ${ACCENT}18 0%, hsl(var(--card)) 55%)`,
                          boxShadow: `0 32px 80px -24px ${ACCENT}99`,
                        }
                      : undefined
                  }
                >
                  {highlight && (
                    <span
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-950 shadow-lg"
                      style={{ background: ACCENT }}
                    >
                      Mais escolhido
                    </span>
                  )}

                  {/* Nome do plano */}
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: ACCENT }}
                  >
                    {title}
                  </div>

                  {/* Título grande */}
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4">
                    {desc}
                  </h3>

                  {/* Divisor */}
                  <div
                    className="w-12 h-1 rounded-full mb-6"
                    style={{ background: ACCENT }}
                  />

                  {/* Features */}
                  <ul className="space-y-3 mb-8 text-sm flex-1">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <Check
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: ACCENT }}
                        />
                        <span className="text-foreground/85">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    asChild
                    className="w-full group font-semibold mt-auto bg-[hsl(var(--ads))] hover:bg-[hsl(var(--ads))]/90 text-gray-950"
                  >
                    <Link to="/contato" className="inline-flex items-center justify-center">
                      {cta}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Ads;
