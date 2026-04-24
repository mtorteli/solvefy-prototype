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
  TrendingUp,
  TrendingDown,
  MousePointerClick,
  BarChart3,
  Check,
  X,
  ShieldOff,
  Calculator,
  Sparkles,
  Code2,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import iconAds from "@/assets/icons/ads-yellow.png";
import {
  StackedCardsCarousel,
  type StackedSlide,
} from "@/components/StackedCardsCarousel";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";

import adsHero1 from "@/assets/ads-hero/hero-1.png";
import adsHero2 from "@/assets/ads-hero/hero-2.png";
import adsHero3 from "@/assets/ads-hero/hero-3.png";

const ACCENT = "hsl(var(--ads))";

const adsHeroSlides: StackedSlide[] = [
  { src: adsHero1, alt: "Análise de performance de campanhas em laptop" },
  {
    src: adsHero2,
    alt: "Profissional revisando dashboard de business analytics",
  },
  { src: adsHero3, alt: "Visão global de métricas de vendas em laptop" },
];

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
    eyebrow: "Performance",
    title: "Better Performance",
    subtitle: "Foco em CPA",
    desc: "Para operações que precisam de cada real otimizado. CPA até 20% menor e atribuição transparente em cada conversão.",
    bullets: [
      "CPA até 20% menor",
      "Otimização contínua por IA",
      "Atribuição em tempo real",
    ],
    cta: "Quero performance",
  },
  {
    eyebrow: "Alcance",
    title: "Alcance Quicker",
    subtitle: "Foco em escala",
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
      <Header />
      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section
          className="relative overflow-hidden"
          style={{ background: "#f6f5ef" }}
        >
          <div
            className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />

          <div className="container relative mx-auto px-4 py-20 md:py-28">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-6 bg-[hsl(var(--ads))]/10 text-[hsl(var(--ads))]">
                  <img
                    src={iconAds}
                    alt="Solvefy/Ads"
                    className="w-4 h-4 object-contain"
                  />
                  Solvefy/Ads
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance mb-6 text-gray-900">
                  Escale suas vendas com um{" "}
                  <span className="text-[hsl(var(--ads))]">
                    CPA até 20% menor
                  </span>{" "}
                  que nos outros Ads.
                </h1>
                <p className="text-sm md:text-base font-light text-gray-600 leading-relaxed text-balance mb-8">
                  Pare de queimar orçamento em plataformas saturadas e leilões
                  inflacionados. A Solvefy/Ads entrega tráfego qualificado de
                  alta performance com total autonomia para sua operação. Sem
                  bloqueios injustos, sem vínculo obrigatório com outras redes.
                  Apenas resultados reais e escaláveis.
                </p>
                <Button
                  size="lg"
                  className="group bg-[hsl(var(--ads))] hover:bg-[hsl(var(--ads))]/90 text-gray-950 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Comprar Agora
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
                  {["CPA até 20% menor", "CTR de até 35%", "Zero Vínculos"].map(
                    (item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Check className="h-3.5 w-3.5 text-[hsl(var(--ads))]" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <StackedCardsCarousel
                accent={ACCENT}
                slides={adsHeroSlides}
                badge={{ iconSrc: iconAds, label: "Solvefy/Ads" }}
                metrics={[
                  {
                    label: "CTR",
                    value: "35%",
                    icon: <MousePointerClick className="h-4 w-4" />,
                    position: "top-right",
                  },
                  {
                    label: "CPA",
                    value: "-20%",
                    icon: <BarChart3 className="h-4 w-4" />,
                    position: "bottom-left",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* ============ DOR vs SOLUÇÃO ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                O fim do dinheiro{" "}
                <span style={{ color: ACCENT }}>evaporando</span>. Compare o que
                você paga hoje com o que você poderia estar pagando.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Card 1 — Problema */}
              <div className="relative rounded-2xl border border-border bg-card p-7 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-destructive/70" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    <TrendingDown className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-destructive">
                    O Problema
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                  Tráfego tradicional: você paga caro e ainda fica refém.
                </h3>
                <ul className="space-y-3 text-sm text-foreground/80">
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
                className="relative rounded-2xl p-7 overflow-hidden border"
                style={{
                  borderColor: `${ACCENT}55`,
                  background: `linear-gradient(160deg, ${ACCENT}1A 0%, ${ACCENT}05 100%)`,
                  boxShadow: `0 16px 40px -20px ${ACCENT}80`,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: ACCENT }}
                />
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
                  >
                    <ShieldOff className="h-5 w-5" />
                  </div>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: ACCENT }}
                  >
                    Autonomia Total
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                  Você no comando. Sem vínculos, sem reféns.
                </h3>
                <p className="text-sm text-foreground/85 leading-relaxed mb-4">
                  Não exigimos vínculo obrigatório com outras plataformas de
                  anúncios. Mantenha o controle da sua operação, diversifique
                  suas fontes de tráfego e blinde sua empresa contra bloqueios e
                  regras ocultas do mercado tradicional.
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

        {/* ============ COMO FUNCIONA — 6 PASSOS ============ */}
        <section className="py-16 bg-[#f6f5ef]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Como funciona
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                Da meta ao disparo em{" "}
                <span style={{ color: ACCENT }}>6 passos</span>.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-snug text-balance">
                Um fluxo guiado, com IA assistindo cada decisão crítica da
                campanha.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1"
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
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span
                      className="text-3xl font-bold leading-none opacity-10"
                      style={{ color: ACCENT }}
                    >
                      0{i + 1}
                    </span>
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

        <EcosystemDiagram accent="hsl(var(--ads))" />

        {/* ============ COMPARATIVO ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                Solvefy/Ads vs.{" "}
                <span style={{ color: ACCENT }}>o resto do mercado</span>.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-snug text-balance">
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
        <section className="relative py-20 overflow-hidden bg-[#0a0a0f]">
          {/* Radial glows */}
          <div
            className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full blur-3xl opacity-25"
            style={{ background: ACCENT }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 right-1/4 h-[420px] w-[420px] rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          {/* Grid background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <Calculator className="h-3.5 w-3.5" />
                Calculadora de Performance
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance text-white">
                Veja os resultados em{" "}
                <span style={{ color: ACCENT }}>números reais</span>.
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/60 leading-snug text-balance">
                Informe seu investimento atual e descubra exatamente quanto sua
                operação economiza com a Solvefy/Ads.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div
                className="relative rounded-3xl p-8 md:p-10 border"
                style={{
                  borderColor: `${ACCENT}40`,
                  background:
                    "linear-gradient(120deg, #0d0d14 0%, #14101e 100%)",
                  boxShadow: `0 24px 60px -30px ${ACCENT}80`,
                }}
              >
                <form
                  onSubmit={handleCalc}
                  className="grid md:grid-cols-2 gap-5"
                >
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-white/80 text-sm">
                      Nome
                    </Label>
                    <Input
                      id="nome"
                      value={form.nome}
                      onChange={handleChange("nome")}
                      placeholder="Seu nome completo"
                      maxLength={100}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[hsl(var(--ads))]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj" className="text-white/80 text-sm">
                      CNPJ
                    </Label>
                    <Input
                      id="cnpj"
                      value={form.cnpj}
                      onChange={handleChange("cnpj")}
                      placeholder="00.000.000/0000-00"
                      maxLength={20}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[hsl(var(--ads))]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/80 text-sm">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="voce@empresa.com"
                      maxLength={120}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[hsl(var(--ads))]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-white/80 text-sm">
                      Telefone
                    </Label>
                    <Input
                      id="telefone"
                      value={form.telefone}
                      onChange={handleChange("telefone")}
                      placeholder="(11) 99999-9999"
                      maxLength={20}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[hsl(var(--ads))]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="segmento" className="text-white/80 text-sm">
                      Segmento
                    </Label>
                    <Input
                      id="segmento"
                      value={form.segmento}
                      onChange={handleChange("segmento")}
                      placeholder="Ex.: E-commerce, SaaS, iGaming"
                      maxLength={80}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[hsl(var(--ads))]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="investimento"
                      className="text-white/80 text-sm"
                    >
                      Investimento atual em Ads por campanha (R$)
                    </Label>
                    <Input
                      id="investimento"
                      type="number"
                      min={0}
                      step="0.01"
                      value={form.investimento}
                      onChange={handleChange("investimento")}
                      placeholder="Ex.: 10000"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[hsl(var(--ads))]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="group w-full md:w-auto bg-[hsl(var(--ads))] hover:bg-[hsl(var(--ads))]/90 text-gray-950 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                    >
                      Ver economia na Solvefy
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </form>

                {result && (
                  <div
                    className="mt-8 rounded-2xl p-6 border"
                    style={{
                      borderColor: `${ACCENT}55`,
                      background: `linear-gradient(160deg, ${ACCENT}1A 0%, ${ACCENT}05 100%)`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5" style={{ color: ACCENT }} />
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: ACCENT }}
                      >
                        Sua economia projetada
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mb-1">
                          Investimento atual
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-white">
                          {formatBRL(result.investido)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mb-1">
                          Economia (-20%)
                        </div>
                        <div
                          className="text-xl md:text-2xl font-bold"
                          style={{ color: ACCENT }}
                        >
                          {formatBRL(result.economia)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mb-1">
                          Novo custo na Solvefy
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-white">
                          {formatBRL(result.novoCusto)}
                        </div>
                      </div>
                    </div>
                    <p className="mt-5 text-sm text-white/70 leading-relaxed">
                      Com a Solvefy/Ads, sua operação reduz em{" "}
                      <strong style={{ color: ACCENT }}>20%</strong> o custo por
                      campanha sem abrir mão de alcance ou autonomia.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============ PARA QUEM É ============ */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Para quem é
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
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
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRECIFICAÇÃO (estilo CPaaS) ============ */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Transparência total
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                Precificação que{" "}
                <span style={{ color: ACCENT }}>cabe na sua operação</span>.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-snug text-balance">
                Dois modelos para escolher como você quer escalar — sem letra
                miúda.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 items-stretch mb-8">
              {pricing.map(
                ({
                  eyebrow,
                  title,
                  subtitle,
                  desc,
                  bullets,
                  cta,
                  highlight,
                }) => (
                  <div
                    key={title}
                    className={`relative rounded-2xl p-7 flex flex-col ${
                      highlight ? "" : "border border-border bg-card"
                    }`}
                    style={
                      highlight
                        ? {
                            background: `linear-gradient(160deg, ${ACCENT} 0%, #b8860b 100%)`,
                            boxShadow: `0 20px 50px -20px ${ACCENT}99`,
                            color: "#0a0a0a",
                          }
                        : { boxShadow: "var(--shadow-soft)" }
                    }
                  >
                    {highlight && (
                      <span className="absolute -top-3 right-6 inline-flex items-center rounded-full bg-background px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--ads))]">
                        Mais escolhido
                      </span>
                    )}
                    <div
                      className={`text-xs font-semibold uppercase tracking-widest mb-2 ${
                        highlight ? "text-gray-950/80" : ""
                      }`}
                      style={highlight ? undefined : { color: ACCENT }}
                    >
                      {eyebrow}
                    </div>
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {title}
                      </h3>
                      <span
                        className={`text-sm font-medium ${
                          highlight
                            ? "text-gray-950/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {subtitle}
                      </span>
                    </div>
                    <p
                      className={`text-sm leading-relaxed mb-5 mt-2 ${
                        highlight ? "text-gray-950/85" : "text-muted-foreground"
                      }`}
                    >
                      {desc}
                    </p>
                    <ul className="space-y-2 mb-7">
                      {bullets.map((b) => (
                        <li
                          key={b}
                          className={`flex items-center gap-2 text-sm ${
                            highlight
                              ? "text-gray-950/90"
                              : "text-foreground/80"
                          }`}
                        >
                          <Check
                            className="h-4 w-4"
                            style={
                              highlight
                                ? { color: "#0a0a0a" }
                                : { color: ACCENT }
                            }
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <Button
                        size="lg"
                        className={`w-full group font-semibold transition-all duration-200 ${
                          highlight
                            ? "bg-background text-[hsl(var(--ads))] hover:bg-background/90"
                            : "bg-[hsl(var(--ads))] hover:bg-[hsl(var(--ads))]/90 text-gray-950"
                        }`}
                      >
                        {cta}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Ads;
