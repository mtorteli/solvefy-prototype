import {
  ArrowRight,
  Check,
  Cpu,
  Activity,
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
  Code2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import iconCloud from "@/assets/icons/cloud-blue.png";
import cloudHero1 from "@/assets/cloud-hero/hero-1.png";
import cloudHero2 from "@/assets/cloud-hero/hero-2.png";
import cloudHero3 from "@/assets/cloud-hero/hero-3.png";
import cloudUseCase1 from "@/assets/cloud-hero/usecase-1.png";
import cloudUseCase2 from "@/assets/cloud-hero/usecase-2.png";
import cloudUseCase3 from "@/assets/cloud-hero/usecase-3.png";
import { StackedCardsCarousel, type StackedSlide } from "@/components/StackedCardsCarousel";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";

const ACCENT = "#00cbff";

const features = [
  {
    icon: Zap,
    title: "Provisionamento Imediato",
    desc: "Crie VMS/VPS em poucos cliques, com sistemas operacionais pré-configurados e redes prontas.",
  },
  {
    icon: Terminal,
    title: "Console & SSH",
    desc: "Gestão completa e segura via painel web ou acesso SSH com chaves gerenciadas.",
  },
  {
    icon: DatabaseBackup,
    title: "Backup & Snapshots",
    desc: "Proteção automatizada de dados críticos com agendamento flexível e restauração em 1 clique.",
  },
  {
    icon: Gauge,
    title: "Upgrades a Quente",
    desc: "Escale RAM e CPU sem interromper o serviço. Sua aplicação cresce sem janela de manutenção.",
  },
];

const opportunityCards = [
  {
    icon: TrendingUp,
    title: "Um mercado de US$ 155 Bilhões.",
    desc: "A demanda por nuvem local e Edge Computing cresce 37% ao ano. Posicione seu Provedor ou Data Center para abocanhar essa fatia e reter clientes B2B sem aumentar seu custo operacional.",
  },
  {
    icon: Sparkles,
    title: "A sua marca no centro de tudo.",
    desc: "Não seja apenas um revendedor invisível. Entregue um painel de controle robusto (com console e SSH integrados) usando a sua logomarca, suas cores e seus preços. Fidelização garantida.",
  },
  {
    icon: Zap,
    title: "O fim do processo manual.",
    desc: "Esqueça a abertura de tickets para criar ou fazer upgrade de VMs. Nossa plataforma integra o faturamento ao provisionamento técnico. O cliente compra, o sistema fatura e a nuvem liga.",
  },
];

const cloudHeroSlides: StackedSlide[] = [
  { src: cloudHero1, alt: "Equipe analisando infraestrutura cloud" },
  { src: cloudHero2, alt: "Profissional em data center" },
  { src: cloudHero3, alt: "Especialista de cloud com laptop" },
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
    name: "Closer",
    price: "R$ 89",
    period: "/mês",
    ideal: "Para quem está iniciando na nuvem com cargas leves.",
    features: [
      "2 vCPU dedicada",
      "4 GB de RAM",
      "80 GB SSD NVMe",
      "Snapshots semanais",
      "Suporte em português",
    ],
    cta: "Começar com Closer",
    highlight: false,
  },
  {
    name: "Quicker",
    price: "R$ 189",
    period: "/mês",
    ideal: "Para times que já operam em produção e precisam escalar.",
    features: [
      "4 vCPU dedicada",
      "8 GB de RAM",
      "160 GB SSD NVMe",
      "Backups diários gerenciados",
      "Console & SSH integrados",
      "Suporte prioritário 24/7",
    ],
    cta: "Quero o Quicker",
    highlight: true,
    badge: "Mais Popular",
  },
  {
    name: "Better",
    price: "R$ 389",
    period: "/mês",
    ideal: "Para cargas críticas e ambientes corporativos.",
    features: [
      "8 vCPU dedicada",
      "16 GB de RAM",
      "320 GB SSD NVMe",
      "Backups + replicação geográfica",
      "Upgrades a quente (RAM/CPU)",
      "SLA contratual de 99.99%",
    ],
    cta: "Falar com Vendas",
    highlight: false,
  },
];

const apiPlan = {
  name: "Solve Customizing",
  priceTag: "Customizado",
  ideal: "Para Provedores, Data Centers e operações que precisam de uma plataforma sob medida com White-Label completo.",
  features: [
    "Portal White-Label com a sua marca",
    "Faturamento e cobrança automatizados",
    "Catálogo de planos personalizável",
    "Onboarding técnico assistido",
  ],
  cta: "Falar com Especialista",
};

const Cloud = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-gray-950">
          <div
            className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-25"
            style={{ background: ACCENT }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full blur-3xl opacity-20"
            style={{ background: ACCENT }}
          />

          <div className="container relative mx-auto px-4 py-20 md:py-28">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-6 bg-[#00cbff]/10 text-[#00cbff]">
                  <img src={iconCloud} alt="Solvefy/Cloud" className="w-4 h-4 object-contain" />
                  Solvefy/Cloud
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance mb-6 text-white">
                  Transforme sua infraestrutura ociosa em produto com{" "}
                  <span className="text-[#00cbff]">segurança e automação total.</span>
                </h1>
                <p className="text-sm md:text-base font-light text-gray-300 leading-relaxed text-balance mb-8">
                  Infraestrutura em nuvem de alta performance (VMS/VPS) com total segurança e
                  autonomia operacional. Provisionamento imediato, gestão simplificada e
                  escalabilidade real.
                </p>
                <Button
                  size="lg"
                  className="group bg-[#00cbff] hover:bg-[#00cbff]/90 text-gray-950 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Comprar Agora
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400">
                  {["Provisionamento Imediato", "Portal White-Label", "Alta Performance VMS/VPS"].map((item) => (
                    <li key={item} className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#00cbff]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <StackedCardsCarousel
                accent={ACCENT}
                slides={cloudHeroSlides}
                badge={{ iconSrc: iconCloud, label: "Solvefy/Cloud" }}
                notifications={[
                  { title: "vm-prod-sao-01", description: "Ubuntu 22.04 · São Paulo · Ativo", icon: "message" },
                  { title: "Auto-scaling", description: "RAM 4.8 / 16 GB · headroom saudável", icon: "whatsapp" },
                ]}
                metrics={[
                  { label: "Uptime SLA", value: "99.99%", icon: <Activity className="h-4 w-4" />, position: "bottom-left" },
                  { label: "CPU usage", value: "12%", icon: <Cpu className="h-4 w-4" />, position: "top-right" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* ============ 1. PLATAFORMA PIONEIRA (White-Label) ============ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
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
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-balance mb-4">
                    A 1ª plataforma do Brasil a{" "}
                    <span style={{ color: ACCENT }}>automatizar a venda de Cloud</span>.
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    Com o nosso Portal White-Label, parceiros e revendedores podem comercializar
                    VMS/VPS com a sua própria marca, identidade visual e faturamento automatizado.
                    Você foca no cliente, a Solvefy cuida da infraestrutura.
                  </p>
                  <ul className="space-y-3 text-sm text-foreground/85 mb-7">
                    {[
                      "Sua marca, seu domínio, sua identidade visual.",
                      "Faturamento e cobrança automatizados em Reais.",
                      "Catálogo de planos personalizável por revendedor.",
                      "Margem comercial controlada por você, em tempo real.",
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
                    className="group bg-[#00cbff] hover:bg-[#00cbff]/90 text-gray-950 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
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

        {/* ============ 2. DORES E MERCADO (3 cards) ============ */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div
            className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div className="container relative mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Oportunidade de Mercado
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
                A nuvem deixou de ser custo.{" "}
                <span style={{ color: ACCENT }}>Virou produto.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
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
                    className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity"
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
          </div>
        </section>

        {/* ============ 3. ECOSSISTEMA E TECNOLOGIA ============ */}
        <EcosystemDiagram accent={ACCENT} />

        {/* ============ 3.1 IaaS DE CLASSE MUNDIAL (features) ============ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Tecnologia que simplifica, automação que gera receita
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                Tudo que você precisa para{" "}
                <span style={{ color: ACCENT }}>operar com confiança</span>.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-snug text-balance">
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
        <section className="py-20" style={{ backgroundColor: "#F5F8FB" }}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              <div className="max-w-xl">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  Casos de uso
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance text-gray-900">
                  Feita para quem{" "}
                  <span style={{ color: ACCENT }}>vende infraestrutura</span>.
                </h2>
                <p className="mt-4 text-base md:text-lg text-gray-500 leading-snug text-balance mb-8">
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
                        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
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
            className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-30"
            style={{ background: ACCENT }}
          />
          <div
            className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl opacity-20"
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
              <div className="relative rounded-[2rem] bg-[#0a0a0f]/95 p-10 md:p-14 backdrop-blur-xl">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-6 border border-white/10 bg-white/5 text-white/80">
                  <Wallet className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  ✦ Gestão Financeira Integrada
                </div>

                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white mb-6">
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

                <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mb-8">
                  Gerenciar a cobrança de recursos computacionais não precisa ser uma dor de cabeça.
                  A Solvefy/Cloud unifica o painel administrativo, o provisionamento de recursos, os
                  backups gerenciados e o sistema de assinaturas. Você define os pacotes, a
                  plataforma cobra e entrega.
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
                  className="group bg-[#00cbff] hover:bg-[#00cbff]/90 text-gray-950 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Comprar Agora
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ 6. PRICING ============ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                Planos & Precificação
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
                Escolha o plano <span style={{ color: ACCENT }}>certo</span> para crescer.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-snug text-balance">
                Faturamento em reais, sem oscilação cambial e sem letras miúdas.
              </p>
            </div>

            {/* 3 main plans */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
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
                        ? "bg-[#00cbff] hover:bg-[#00cbff]/90 text-gray-950"
                        : "bg-foreground/90 hover:bg-foreground text-background"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Solve Customizing — wide row */}
            <div className="max-w-6xl mx-auto mt-8">
              <div
                className="relative rounded-3xl p-8 md:p-10 overflow-hidden border"
                style={{
                  borderColor: `${ACCENT}40`,
                  background: `linear-gradient(120deg, #0a0a0f 0%, #0d1620 100%)`,
                  boxShadow: `0 24px 60px -30px ${ACCENT}80`,
                }}
              >
                <div
                  className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl opacity-30"
                  style={{ background: ACCENT }}
                />
                <div className="relative grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${ACCENT}25`, color: ACCENT }}
                      >
                        <Code2 className="h-5 w-5" />
                      </div>
                      <div
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: ACCENT }}
                      >
                        Plano Customizado
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                      {apiPlan.name}
                    </h3>
                    <p className="text-sm text-white/70 mb-5 max-w-xl">{apiPlan.ideal}</p>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                      {apiPlan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-white/80">
                          <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-4">
                    <div
                      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold border"
                      style={{
                        color: ACCENT,
                        borderColor: `${ACCENT}55`,
                        backgroundColor: `${ACCENT}15`,
                      }}
                    >
                      {apiPlan.priceTag}
                    </div>
                    <Button
                      size="lg"
                      className="group bg-[#00cbff] hover:bg-[#00cbff]/90 text-gray-950 font-semibold w-full md:w-auto"
                    >
                      {apiPlan.cta}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cloud;
