import { useState } from "react";
import {
  ArrowRight,
  Check,
  Zap,
  Terminal,
  DatabaseBackup,
  Gauge,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Building2,
  Layers,
  Sparkles,
  Server,
  Network,
  Briefcase,
  Wallet,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { ProductHero } from "@/components/ProductHero";
import { PricingCustomPlan } from "@/components/PricingCustomPlan";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import iconCloud from "@/assets/icons/cloud.svg";
import cloudUseCase1 from "@/assets/cloud-hero/usecase-1.png";
import cloudUseCase2 from "@/assets/cloud-hero/usecase-2.png";
import cloudUseCase3 from "@/assets/cloud-hero/usecase-3.png";
import { CloudHeroMockup } from "@/components/CloudHeroMockup";
import { StackedCardsCarousel, type StackedSlide } from "@/components/StackedCardsCarousel";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";

const ACCENT = "hsl(var(--cloud))";

const features = [
  {
    icon: Zap,
    title: "Provisionamento Imediato",
    desc: "Cliente final cria, modifica e deleta VMs Windows e Linux com provisionamento automatizado e seguro.",
  },
  {
    icon: Terminal,
    title: "Console & SSH",
    desc: "Acesso remoto via console gráfica direto na interface web, sem VPN ou cliente externo, com gestão de chaves SSH.",
  },
  {
    icon: DatabaseBackup,
    title: "Backup & Snapshots",
    desc: "Backups automáticos com Proxmox Backup Server (deduplication + AES-256-GCM) e snapshots em tempo real.",
  },
  {
    icon: Gauge,
    title: "Upgrades a Quente",
    desc: "Agendamento e execução de upgrades de RAM, vCPU e disco da VM sem migração manual.",
  },
];

const opportunityCards = [
  {
    icon: Building2,
    title: "100% White Label.",
    desc: "Operação com a sua logomarca, cores e domínio próprio.",
  },
  {
    icon: Wallet,
    title: "Faturamento Automático.",
    desc: "Integração nativa com gateways de pagamento recorrentes.",
  },
  {
    icon: Layers,
    title: "Painel e Portal.",
    desc: "Um painel administrativo para você gerenciar os recursos e um portal self-service para seu cliente.",
  },
];

const accordionItems = [
  {
    title: "Gestão Avançada de Recursos e Rede (SDN)",
    content:
      "Automação completa de IPs Flutuantes e vinculação dinâmica entre VMs. Controle total de redes privadas via Software Defined Network (SDN) para ambientes multi-tenant.",
  },
  {
    title: "Segurança e Resiliência Nativa",
    content:
      "Implementação de Firewall Proxmox gerenciável diretamente pelo cliente. Suporte a autenticação segura com dois fatores (2FA) e gerenciamento de snapshots em tempo real para recuperação rápida.",
  },
  {
    title: "Performance Garantida",
    content:
      "Atualizações mensais de software inclusas em todos os planos, garantindo máxima estabilidade e acesso a novas funcionalidades contínuas.",
  },
];

const useCaseSlides: StackedSlide[] = [
  { src: cloudUseCase1, alt: "Provedores ISPs" },
  { src: cloudUseCase2, alt: "Data Centers" },
  { src: cloudUseCase3, alt: "MSPs e Revendedores" },
];

const automationPills = [
  { icon: Wallet, label: "Faturamento Automático" },
  { icon: Server, label: "Provisionamento Instantâneo" },
  { icon: DatabaseBackup, label: "Backups Gerenciados" },
];

const plans = [
  {
    name: "Basic",
    price: "R$ 990",
    period: "/mês",
    setup: "Implantação: R$ 18.890 (3x sem juros)",
    ideal: "Pequenas operações iniciando a venda de cloud com a própria marca.",
    features: [
      "Até 3 servidores (nodes)",
      "1 cluster",
      "VMs, vCPUs, backups e snapshots ilimitados",
      "Pagamento pré e pós-pago",
      "Suporte via ticket e e-mail",
      "Atualizações mensais",
    ],
    cta: "Quero o Basic",
    highlight: false,
  },
  {
    name: "Standard",
    price: "R$ 1.590",
    period: "/mês",
    setup: "Implantação: R$ 25.890 (3x sem juros)",
    ideal: "Operações em crescimento com necessidade de escalar a oferta.",
    features: [
      "Até 6 servidores (nodes)",
      "2 clusters",
      "VMs, vCPUs, backups e snapshots ilimitados",
      "Suporte via chat, ticket e e-mail",
      "Acesso a add-ons da plataforma",
      "Atualizações mensais",
    ],
    cta: "Quero o Standard",
    highlight: true,
    badge: "Mais Popular",
  },
  {
    name: "Premium",
    price: "R$ 2.390",
    period: "/mês",
    setup: "Implantação: R$ 34.890 (3x sem juros)",
    ideal: "Operações estabelecidas com demanda por suporte e canais avançados.",
    features: [
      "Até 9 servidores (nodes)",
      "3 clusters",
      "VMs, vCPUs, backups e snapshots ilimitados",
      "Suporte via chat, ticket, e-mail e telefone",
      "Acesso completo a add-ons",
      "Atualizações mensais",
    ],
    cta: "Quero o Premium",
    highlight: false,
  },
];

const apiPlan = {
  name: "Enterprise",
  priceTag: "Personalizado",
  ideal: "Para Provedores e Data Centers com escala customizada — servidores e clusters sob medida, suporte dedicado e onboarding ajustado ao seu cenário.",
  features: [
    "Servidores e clusters personalizados",
    "Suporte chat, ticket, e-mail e telefone",
    "Acesso a add-ons + roadmap colaborativo",
    "Onboarding e licenciamento sob medida",
  ],
  cta: "Falar com Especialista",
};

const Cloud = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Cloud — Infraestrutura em Nuvem para Empresas"
        description="Hospede suas aplicações com performance e segurança na infraestrutura cloud da Solvefy. Escalabilidade sob demanda para empresas B2B."
        canonical="/cloud"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Solvefy Cloud",
          "applicationCategory": "BusinessApplication",
          "description": "Infraestrutura VMS/VPS com portal White-Label para provedores, data centers e revendedores.",
          "operatingSystem": "Web",
          "url": "https://solvefy.com/cloud",
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "89",
            "highPrice": "389",
            "priceCurrency": "BRL"
          }
        }}
      />
      <Header />
      <main className="flex-1">
        <ProductHero
          accentVar="--cloud"
          badgeIcon={iconCloud}
          badgeLabel="Solvefy/Cloud"
          title={<>A Plataforma para você{" "}
            <span className="text-[hsl(var(--cloud))]">criar e vender a sua própria Cloud.</span></>}
          subtitle="Transforme a infraestrutura ociosa do seu Provedor de Internet (ISP) ou Data Center em um negócio rentável. Automatize 100% da venda, o provisionamento e o faturamento de serviços de cloud com a sua marca, sem depender de terceiros."
          ctaText="Falar com Especialista"
          ctaTextColor="text-gray-950"
          ctaSecondary={{ text: "Simular Retorno (ROI)", href: "#" }}
          trustItems={["Plataforma Whitelabel On-Premises", "Proxmox Reseller/Partner Oficial", "Do zero ao fim do processo"]}
          right={<CloudHeroMockup />}
        />

        {/* ============ 1. PLATAFORMA PIONEIRA (White-Label) ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden border border-border">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}14 0%, transparent 60%)`,
                }}
              />
              <div className="relative grid md:grid-cols-2 gap-10 p-8 md:p-12 items-center">
                <div>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-5"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Pioneirismo no Brasil
                  </div>
                  <h2 className="tracking-tight leading-tight text-balance mb-4">
                    A 1ª plataforma do Brasil a{" "}
                    <span style={{ color: ACCENT }}>automatizar a venda de Cloud</span>.
                  </h2>
                  <p className="section-subtitle mb-6">
                    Produto 100% brasileiro da Solvefy — grupo com 20 anos de mercado em
                    Telecomunicações, Martech e Cloud. Equipe Proxmox Reseller/Partner oficial e
                    programa de cibersegurança Bug Bounty (HuntersPay). Você foca no cliente; a
                    Solvefy cuida da infraestrutura.
                  </p>
                  <ul className="space-y-3 text-sm text-foreground/85 mb-7">
                    {[
                      "Sua marca, seu domínio, sua identidade visual.",
                      "Painel Administrativo + Portal do Cliente self-service em um único produto.",
                      "Integração nativa com Proxmox VE V8 e V9 e gateways Stripe e Bradesco.",
                      "Billing completo: catálogo, planos, faturamento e medição de consumo automatizados.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: ACCENT }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="lg"
                    className="group bg-[hsl(var(--cloud))] hover:bg-[hsl(var(--cloud))]/90 text-gray-950 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Quero ser parceiro White-Label
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                {/* RIGHT — White-label preview card */}
                <div className="relative h-[360px]">
                  <div
                    className="absolute inset-0 rounded-2xl border border-border bg-card overflow-hidden"
                    style={{ boxShadow: "var(--shadow-soft)" }}
                  >
                    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/40">
                      <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                      <div className="ml-3 text-[11px] text-muted-foreground truncate">
                        cloud.suamarca.com.br
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                          >
                            <Building2 className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-semibold">SuaMarca Cloud</span>
                        </div>
                        <span
                          className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                        >
                          Powered
                        </span>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: "Plano Starter", specs: "2 vCPU · 4 GB RAM · 80 GB SSD", price: "R$ 89/mês" },
                          { name: "Plano Pro", specs: "4 vCPU · 8 GB RAM · 160 GB SSD", price: "R$ 189/mês" },
                          { name: "Plano Business", specs: "8 vCPU · 16 GB RAM · 320 GB SSD", price: "R$ 389/mês" },
                        ].map((p) => (
                          <div
                            key={p.name}
                            className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-4 py-3"
                          >
                            <div>
                              <div className="text-sm font-semibold">{p.name}</div>
                              <div className="text-[11px] text-muted-foreground">{p.specs}</div>
                            </div>
                            <div className="text-sm font-bold" style={{ color: ACCENT }}>
                              {p.price}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 2. O PROBLEMA E A SOLUÇÃO E-CLOUD (3 cards + accordion) ============ */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-[hsl(var(--cloud-tint))]">
          <div
            className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="max-w-4xl text-left mb-12 md:mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                E-Cloud Platform
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                Você entra com a infraestrutura,{" "}
                <span style={{ color: ACCENT }}>nós entregamos a automação comercial.</span>
              </h2>
              <p className="section-subtitle mt-4">
                Chega de vendas por e-mail e faturamento manual. Nossa plataforma White Label
                automatiza de ponta a ponta, entregando uma experiência self-service enterprise
                para o seu cliente final.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {opportunityCards.map(({ icon: Icon, title, desc }, i) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative h-full rounded-3xl p-8 border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{ boxShadow: "0 12px 40px -20px rgba(0,0,0,0.12)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 50px -20px ${ACCENT}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 12px 40px -20px rgba(0,0,0,0.12)";
                  }}
                >
                  <div
                    className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{ background: ACCENT }}
                  />
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl mb-5"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-3">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </motion.article>
              ))}
            </div>

            {/* Recursos Avançados — Accordion */}
            <div className="mt-10 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-border/60">
                <h3 className="text-base font-semibold tracking-tight">Recursos Avançados</h3>
              </div>
              {accordionItems.map((item, i) => (
                <div key={i} className={i < accordionItems.length - 1 ? "border-b border-border/60" : ""}>
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 hover:bg-muted/30 transition-colors"
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    aria-expanded={openAccordion === i}
                  >
                    <span className="font-medium text-sm text-foreground">{item.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        openAccordion === i ? "rotate-180" : ""
                      }`}
                      style={{ color: ACCENT }}
                    />
                  </button>
                  {openAccordion === i && (
                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 3. ECOSSISTEMA E TECNOLOGIA ============ */}
        <EcosystemDiagram accent={ACCENT} />

        {/* ============ 3.1 IaaS DE CLASSE MUNDIAL (features) ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Tecnologia que simplifica, automação que gera receita
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                Tudo que você precisa para{" "}
                <span style={{ color: ACCENT }}>operar com confiança</span>.
              </h2>
              <p className="section-subtitle mt-4">
                Recursos pensados para times que precisam de agilidade sem abrir mão da estabilidade.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. CASOS DE USO — Stacked Cards ============ */}
        <section className="py-20 bg-[hsl(var(--cloud-tint))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              <div className="max-w-xl">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  Casos de uso
                </div>
                <h2 className="tracking-tight leading-tight text-balance">
                  Feita para quem{" "}
                  <span style={{ color: ACCENT }}>vende infraestrutura</span>.
                </h2>
                <p className="section-subtitle mt-4 mb-8">
                  Provedores, Data Centers, MSPs e Revendedores: transforme capacidade ociosa em
                  receita recorrente.
                </p>

                <div className="space-y-5">
                  {[
                    {
                      icon: Network,
                      title: "Provedores (ISPs)",
                      desc: "Diferencie-se da concorrência vendendo muito mais que conectividade. Transforme custos de rede em receita oferecendo serviços de Cloud corporativa com a sua marca.",
                    },
                    {
                      icon: Server,
                      title: "Data Centers",
                      desc: "Monetize infraestrutura subutilizada. Abandone a venda tradicional lenta e crie um negócio de nuvem self-service altamente escalável.",
                    },
                    {
                      icon: Briefcase,
                      title: "MSPs e Revendedores",
                      desc: "Garanta uma plataforma própria com automação total. Aumente drasticamente sua margem de lucro empacotando infraestrutura sob medida para seus clientes.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold tracking-tight text-gray-900 mb-1">
                          {title}
                        </h3>
                        <p className="text-sm text-[#1e1e1e] leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <StackedCardsCarousel
                  accent={ACCENT}
                  slides={useCaseSlides}
                  badge={{ iconSrc: iconCloud, label: "Solvefy/Cloud" }}
                  notifications={[
                    { title: "Nova VM provisionada", description: "Cliente: Provedor Beta · 4 vCPU", icon: "message" },
                    { title: "Fatura emitida", description: "Cobrança automática · R$ 1.840", icon: "whatsapp" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============ 5. DESTAQUE DE FUNCIONALIDADE (estilo EasyIA) ============ */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0f]">
          {/* Subtle grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
          {/* Glows */}
          <div
            className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div
            className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: "#0094bf" }}
          />

          <div className="container relative mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative max-w-4xl mx-auto rounded-[2rem] p-[1.5px]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, transparent 40%, transparent 60%, ${ACCENT} 100%)`,
                boxShadow: `0 30px 90px -30px ${ACCENT}80`,
              }}
            >
              <div className="relative rounded-[2rem] bg-[#0a0a0f]/95 p-10 md:p-14 backdrop-blur-xl text-white">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-6 border border-white/10 bg-white/5 text-white/80">
                  <Wallet className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  Gestão Financeira Integrada
                </div>

                <h2 className="tracking-tight leading-[1.05] text-white mb-6">
                  Faturamento e provisionamento em{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${ACCENT} 0%, #fff 100%)`,
                    }}
                  >
                    piloto automático.
                  </span>
                </h2>

                <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-3xl font-light mb-8">
                  Painel Administrativo e Portal do Cliente unificam gestão de contratos,
                  provisionamento de VMs, backups gerenciados e billing. Integração nativa com
                  gateways Stripe e Bradesco, medição de consumo automatizada e relatórios em
                  tempo real. Você define os pacotes; a plataforma cobra e entrega.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {automationPills.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur"
                    >
                      <Icon className="h-4 w-4" style={{ color: ACCENT }} />
                      {label}
                    </span>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="group bg-[hsl(var(--cloud))] hover:bg-[hsl(var(--cloud))]/90 text-gray-950 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Comprar Agora
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ 6. PRICING ============ */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Planos & Precificação
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                Escolha o plano <span style={{ color: ACCENT }}>certo</span> para crescer.
              </h2>
              <p className="section-subtitle mt-4">
                Faturamento em reais, parcelamento em até 3x sem juros e mensalidade só após a
                entrega do ambiente em produção.
              </p>
            </div>

            {/* 3 main plans */}
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-7 flex flex-col transition-all ${
                    plan.highlight
                      ? "shadow-2xl md:-translate-y-2"
                      : "border border-border bg-card hover:-translate-y-1 hover:shadow-md"
                  }`}
                  style={
                    plan.highlight
                      ? {
                          borderWidth: "2px",
                          borderStyle: "solid",
                          borderColor: ACCENT,
                          background: `linear-gradient(160deg, ${ACCENT}10 0%, hsl(var(--card)) 60%)`,
                          boxShadow: `0 24px 60px -24px ${ACCENT}80`,
                        }
                      : undefined
                  }
                >
                  {plan.highlight && plan.badge && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-950 shadow-lg"
                      style={{ background: ACCENT }}
                    >
                      {plan.badge}
                    </span>
                  )}
                  <div className="mb-5">
                    <div
                      className="text-sm font-bold uppercase tracking-wider mb-2"
                      style={{ color: ACCENT }}
                    >
                      {plan.name}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    {plan.setup && (
                      <p className="mt-1 text-xs text-muted-foreground">{plan.setup}</p>
                    )}
                    <p className="mt-2 text-sm text-muted-foreground">
                      Ideal para: <span className="text-foreground/80">{plan.ideal}</span>
                    </p>
                  </div>

                  <ul className="space-y-2.5 mb-7 text-sm flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: ACCENT }}
                        />
                        <span className="text-foreground/85">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className={`w-full font-semibold ${
                      plan.highlight
                        ? "bg-[hsl(var(--cloud))] hover:bg-[hsl(var(--cloud))]/90 text-gray-950"
                        : "bg-foreground/90 hover:bg-foreground text-background"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PricingCustomPlan
                accentVar="--cloud"
                title={apiPlan.name}
                description={apiPlan.ideal}
                bullets={apiPlan.features}
                badgeText={apiPlan.priceTag}
                ctaText={apiPlan.cta}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cloud;

