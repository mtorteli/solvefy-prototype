import { useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  Building2,
  Wallet,
  Layers,
  Server,
  Gauge,
  DatabaseBackup,
  HardDrive,
  Database,
  Map,
  Users,
  BookOpen,
  X,
  Code2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import { ProductHero } from "@/components/ProductHero";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import iconCloud from "@/assets/icons/cloud.svg";
import { CloudHeroMockup } from "@/components/CloudHeroMockup";
import roiCalculatorHtml from "@/data/roi-calculator.html?raw";

const ACCENT = "hsl(var(--cloud))";

// ─── DATA ────────────────────────────────────────────────────────────────────

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

const block1ExtraCards: Array<{ icon: ReactNode; title: string; desc: string }> = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="1" width="6" height="4" rx="1"/><rect x="1" y="19" width="6" height="4" rx="1"/>
        <rect x="17" y="19" width="6" height="4" rx="1"/><rect x="9" y="10" width="6" height="4" rx="1"/>
        <line x1="12" y1="5" x2="12" y2="10"/><line x1="4" y1="19" x2="10" y2="14"/>
        <line x1="20" y1="19" x2="14" y2="14"/>
      </svg>
    ),
    title: "Gestão Avançada de Recursos e Rede (SDN)",
    desc: "Automação completa de IPs Flutuantes e vinculação dinâmica entre VMs. Controle total de redes privadas via Software Defined Network (SDN) para ambientes multi-tenant.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: "Segurança e Resiliência Nativa",
    desc: "Implementação de Firewall Proxmox gerenciável diretamente pelo cliente. Suporte a autenticação segura com dois fatores (2FA) e gerenciamento de snapshots em tempo real.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Performance Garantida",
    desc: "Atualizações mensais de software inclusas em todos os planos, garantindo que sua plataforma opere sempre na última versão estável do Proxmox VE (V8 e V9).",
  },
];

const block2Items: Array<{ icon: ReactNode; title: string; desc: string }> = [
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Dimensionamento Cirúrgico",
    desc: "Consultoria completa na escolha do hardware ideal para evitar degradação silenciosa de performance.",
  },
  {
    icon: <Server className="h-5 w-5" />,
    title: "Cluster HA & Ceph (Armazenamento Distribuído)",
    desc: "Eliminação de pontos únicos de falha com self-healing automático e zero dependência de controladoras RAID.",
  },
  {
    icon: <DatabaseBackup className="h-5 w-5" />,
    title: "Backup e Disaster Recovery (PBS)",
    desc: "Proxmox Backup Server com deduplicação incremental e proteção nativa contra perda de dados.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4" r="2" /><circle cx="4" cy="20" r="2" /><circle cx="20" cy="20" r="2" />
        <line x1="12" y1="6" x2="12" y2="12" /><line x1="12" y1="12" x2="4" y2="18" /><line x1="12" y1="12" x2="20" y2="18" />
      </svg>
    ),
    title: "Topologia de Rede de Alta Performance",
    desc: "Projetamos separação de tráfego crítica com redes de 25 Gbps+ para o cluster Ceph e 10 Gbps+ para tráfego público, eliminando gargalos de I/O.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="6" rx="2" /><rect x="2" y="9" width="20" height="6" rx="2" /><rect x="2" y="16" width="20" height="6" rx="2" />
      </svg>
    ),
    title: "Arquitetura de Storage Inteligente",
    desc: "Uso de algoritmos CRUSH para distribuição uniforme de dados, evitando domínios de falha por host ou rack. Implementação de pools diferenciados por classe de disco (NVMe para performance e HDD para backup).",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />
      </svg>
    ),
    title: "Continuidade de Negócios (PBS Offsite)",
    desc: "Configuração de Remote Sync entre instâncias do Proxmox Backup Server para replicação offsite, garantindo que seus dados estejam seguros mesmo em desastres geográficos.",
  },
];

const allConsultoriaCards: Array<{ icon: ReactNode; title: string; desc: string }> = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Docker & Kubernetes (K8s)",
    desc: "Migração, conteinerização de aplicações legadas, autoscaling dinâmico e integração com pipelines CI/CD (GitOps).",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: "Tuning de Banco de Dados Relacional",
    desc: "Otimização profunda, alta disponibilidade e replicação para PostgreSQL e MariaDB (Galera Cluster).",
  },
  {
    icon: <HardDrive className="h-5 w-5" />,
    title: "MongoDB (NoSQL)",
    desc: "Modelagem orientada a performance, Sharding para escalonamento horizontal e Replica Sets para failover automático.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
    title: "Observabilidade e Resposta a Incidentes",
    desc: "Entrega de runbooks operacionais e stack de monitoramento completa (Prometheus + Grafana) com alertas proativos de consumo e falha.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <polyline points="9 11 12 14 15 11" />
      </svg>
    ),
    title: "Alta Disponibilidade de Dados (Patroni & Galera)",
    desc: "Implementação de failover automático para PostgreSQL via Patroni e replicação síncrona multi-master para MariaDB via Galera Cluster, garantindo zero perda de dados.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Segurança em Camadas (K8s)",
    desc: "Aplicação de políticas de RBAC, Network Policies para isolamento de pods e gestão de segredos via Vault ou Kubernetes Secrets.",
  },
];

const roadmapItems = [
  {
    icon: Map,
    label: "Roadmap de Expansão 2026",
    desc: "Integração prevista com VMware e Hyper-V, além da gestão de servidores Bare Metal e Buckets S3 nativos. Gestão de bancos de dados gerenciados diretamente pelo Portal do Cliente.",
  },
  {
    icon: Users,
    label: "Onboarding Estruturado",
    desc: "Processo estruturado em 5 etapas: Diagnóstico, Arquitetura Técnica, Implantação Dedicada, Testes de Validação e Treinamento de Equipe.",
  },
  {
    icon: BookOpen,
    label: "Transferência de Conhecimento",
    desc: "Todos os nossos projetos incluem documentação técnica completa de Benchmark, sugestão de precificação para o seu mercado e treinamento operacional para até 2 pessoas.",
  },
];

const plans = [
  {
    name: "Próximo",
    price: "R$ 990",
    period: "/mês",
    features: [
      "VMs e vCPUs ilimitadas",
      "Backups e Snapshots ilimitados",
      "Pagamento Pré ou Pós-Pago",
      "Até 03 Servidores e até 01 Cluster",
      "Suporte via ticket/e-mail em horário comercial",
      "Atualizações de Software garantidas",
    ],
    cta: "Quero o Próximo",
    highlight: false,
  },
  {
    name: "Veloz",
    price: "R$ 1.590",
    period: "/mês",
    features: [
      "VMs e vCPUs ilimitadas",
      "Backups e Snapshots ilimitados",
      "Pagamento Pré ou Pós-Pago",
      "Até 06 Servidores e até 02 Clusters",
      "Suporte via ticket/e-mail em horário comercial",
      "Atualizações de Software garantidas",
      "Acesso a ADD-ON",
    ],
    cta: "Quero o Veloz",
    highlight: true,
    badge: "Mais Popular",
  },
  {
    name: "Melhor",
    price: "R$ 2.390",
    period: "/mês",
    features: [
      "VMs e vCPUs ilimitadas",
      "Backups e Snapshots ilimitados",
      "Pagamento Pré ou Pós-Pago",
      "Até 9 Servidores e até 03 Clusters",
      "Suporte via ticket/e-mail em horário comercial",
      "Atualizações de Software garantidas",
      "Acesso a ADD-ON",
    ],
    cta: "Quero o Melhor",
    highlight: false,
  },
];

const enterpriseBullets = [
  "Servidores e clusters personalizados",
  "Suporte chat, ticket, e-mail e telefone",
  "Acesso a add-ons + roadmap colaborativo",
  "Onboarding e licenciamento sob medida",
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function AccordionBlock({
  items,
  openIdx,
  onToggle,
  className = "mt-0",
}: {
  items: { title: string; content: string }[];
  openIdx: number | null;
  onToggle: (i: number) => void;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden ${className}`}>
      <div className="px-6 py-5 border-b border-border/60">
        <h3 className="text-base font-semibold tracking-tight">Recursos Avançados</h3>
      </div>
      {items.map((item, i) => (
        <div key={i} className={i < items.length - 1 ? "border-b border-border/60" : ""}>
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 hover:bg-muted/30 transition-colors"
            onClick={() => onToggle(i)}
            aria-expanded={openIdx === i}
          >
            <span className="font-medium text-sm" style={{ color: ACCENT }}>
              {item.title}
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`}
              style={{ color: ACCENT }}
            />
          </button>
          {openIdx === i && (
            <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const Cloud = () => {
  const [roiOpen, setRoiOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState<Record<string, number | null>>({});
  const [openCard, setOpenCard] = useState<number | null>(null);

  const toggle = (section: string, i: number) =>
    setOpenAcc((prev) => ({ ...prev, [section]: prev[section] === i ? null : i }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Cloud — Infraestrutura em Nuvem para Empresas"
        description="Hospede suas aplicações com performance e segurança na infraestrutura cloud da Solvefy. Escalabilidade sob demanda para empresas B2B."
        canonical="/cloud"
        ogImage="/og/og-cloud.jpg"
        schemas={[
          serviceSchema({
            name: "Solvefy/Cloud",
            description:
              "Infraestrutura cloud para hospedagem e escala de aplicações B2B, com SLA, suporte técnico em pt-BR e migração assistida.",
            path: "/cloud",
            serviceType: "Hospedagem em nuvem / VPS / IaaS",
            offers: { lowPrice: "990", highPrice: "2390", priceCurrency: "BRL" },
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solvefy/Cloud", path: "/cloud" },
          ]),
        ]}
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
            "lowPrice": "990",
            "highPrice": "2390",
            "priceCurrency": "BRL",
          },
        }}
      />
      <Header />

      {/* ── ROI MODAL ───────────────────────────────────────────────────────── */}
      {roiOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setRoiOpen(false); }}
        >
          <button
            onClick={() => setRoiOpen(false)}
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Fechar calculadora"
          >
            <X className="h-4 w-4" />
          </button>
          <div
            className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxHeight: "90vh" }}
          >
            <iframe
              srcDoc={roiCalculatorHtml}
              title="Calculadora de ROI Solvefy Cloud"
              className="w-full"
              style={{ height: "85vh", border: "none", display: "block" }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}

      <main id="main" className="flex-1">

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <ProductHero
          accentVar="--cloud"
          badgeIcon={iconCloud}
          badgeLabel="Solvefy/Cloud"
          title={
            <>
              A plataforma para você{" "}
              <span className="text-[hsl(var(--cloud))]">
                criar e vender a sua própria Cloud.
              </span>
            </>
          }
          subtitle="Transforme a infraestrutura ociosa do seu Provedor de Internet (ISP) ou Data Center em um negócio rentável. Automatize 100% da venda, o provisionamento e o faturamento de serviços de cloud com a sua marca, sem depender de terceiros."
          ctaText="Solicite uma Demonstração"
          ctaHref="/contato"
          ctaTextColor="text-gray-950"
          ctaSecondary={{ text: "Simular Retorno (ROI)", onClick: () => setRoiOpen(true) }}
          trustItems={[
            "Plataforma Whitelabel On-Premises",
            "Proxmox Reseller/Partner Oficial",
            "Do zero ao fim do processo",
          ]}
          right={<CloudHeroMockup />}
        />

        {/* ── BLOCO 1: E-CLOUD PLATFORM ───────────────────────────────────── */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-[hsl(var(--cloud-tint))]">
          <div
            className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full blur-3xl opacity-10"
            style={{ background: ACCENT }}
          />
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="mb-10 md:mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Pioneirismo no Brasil
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

            {/* 6-card accordion grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ...opportunityCards.map(({ icon: Icon, title, desc }) => ({
                  iconEl: <Icon className="h-5 w-5" />,
                  title,
                  desc,
                })),
                ...block1ExtraCards.map(({ icon, title, desc }) => ({
                  iconEl: icon,
                  title,
                  desc,
                })),
              ].map(({ iconEl, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  onClick={() => setOpenCard(openCard === i ? null : i)}
                  className="flex flex-col items-center rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl cursor-pointer select-none transition-shadow duration-200 hover:shadow-md"
                >
                  {/* Closed face — fixed min-h keeps all cards the same height */}
                  <div className="flex flex-col items-center justify-center gap-3 w-full min-h-[148px] px-5 pt-5 pb-3 text-center">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                    >
                      {iconEl}
                    </div>
                    <h3 className="text-sm font-medium tracking-tight leading-snug">{title}</h3>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground/40 transition-transform duration-200 ${openCard === i ? "rotate-180" : ""}`}
                    />
                  </div>

                  {/* Collapsible description */}
                  <div
                    className={`w-full overflow-hidden transition-all duration-300 px-5 ${
                      openCard === i ? "max-h-48 pb-5 opacity-100" : "max-h-0 pb-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3 text-left">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOCO 2: INFRAESTRUTURA VIRTUALIZADA ────────────────────────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left */}
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-5"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                  Infraestrutura On-Premises & Proxmox
                </div>
                <h2 className="tracking-tight leading-tight text-balance mb-4">
                  Arquitetura Proxmox de{" "}
                  <span style={{ color: ACCENT }}>alta disponibilidade</span> para operações críticas.
                </h2>
                <p className="section-subtitle">
                  Não arrisque a estabilidade do seu negócio. Como Resellers e Partners Oficiais da
                  Proxmox, projetamos, implementamos e sustentamos clusters hiper convergentes que
                  garantem a continuidade da sua operação com até 99,999% de uptime.
                </p>
              </div>

              {/* Right — 6 accordion items (icon + title, description expands) */}
              <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden">
                {block2Items.map((item, i) => (
                  <div key={i} className={i < block2Items.length - 1 ? "border-b border-border/60" : ""}>
                    <button
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-muted/30 transition-colors"
                      onClick={() => toggle("block2", i)}
                      aria-expanded={openAcc["block2"] === i}
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                      >
                        {item.icon}
                      </div>
                      <span className="flex-1 font-medium text-sm">{item.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${openAcc["block2"] === i ? "rotate-180" : ""}`}
                        style={{ color: ACCENT }}
                      />
                    </button>
                    {openAcc["block2"] === i && (
                      <div className="px-5 pb-4 pl-16 text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOCO 3: CONSULTORIA ESPECIALIZADA ──────────────────────────── */}
        <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: "#000" }}>
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full blur-3xl opacity-[0.06]"
            style={{ background: ACCENT }}
          />
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="max-w-4xl text-left mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-5"
                style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
                Consultoria Cloud Native & Bancos de Dados
              </div>
              <h2 className="tracking-tight leading-tight text-balance mb-4 text-white">
                DevOps e DBA sob demanda:{" "}
                <span style={{ color: ACCENT }}>
                  Escale sem inflar sua folha de pagamento.
                </span>
              </h2>
              <p className="section-subtitle" style={{ color: "rgba(255,255,255,0.6)" }}>
                Sua infraestrutura não pode ser o limite do seu crescimento. Ter um time sênior
                interno custa caro. Entregamos especialistas de elite sob demanda para otimizar,
                orquestrar (K8s/Docker) e blindar seus Bancos de Dados críticos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {allConsultoriaCards.map(({ icon, title, desc }, i) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${ACCENT}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
                  >
                    {icon}
                  </div>
                  <h3 className="text-base font-bold tracking-tight mb-2 text-white">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOCO 4: ROADMAP & ONBOARDING ────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-5"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /><polyline points="8 13 10 15 16 9" />
                </svg>
                Evolução e Projetos
              </div>
              <h2 className="tracking-tight leading-tight text-balance mb-4">
                Pronto para o futuro:{" "}
                <span style={{ color: ACCENT }}>Roadmap 2026 e Onboarding de Elite.</span>
              </h2>
              <p className="section-subtitle">
                Não entregamos apenas software; entregamos uma jornada de crescimento. Nossa
                plataforma já nasce pronta para as demandas de amanhã.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {roadmapItems.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-card p-6"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight mb-2">{label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[hsl(var(--cloud-tint))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl text-left mb-14">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                Planos & Precificação
              </div>
              <h2 className="tracking-tight leading-tight text-balance">
                Planos <span style={{ color: ACCENT }}>escaláveis</span> para a sua operação.
              </h2>
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
                  </div>

                  <ul className="space-y-2.5 mb-7 text-sm flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                        <span className="text-foreground/85">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    asChild
                    className={`w-full font-semibold ${
                      plan.highlight
                        ? "bg-[hsl(var(--cloud))] hover:bg-[hsl(var(--cloud))]/90 text-gray-950"
                        : "bg-foreground/90 hover:bg-foreground text-background"
                    }`}
                  >
                    <Link to="/contato" className="inline-flex items-center justify-center">
                      {plan.cta}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Enterprise card — inline with accordion + note */}
            <div
              className="mt-8 relative rounded-3xl p-8 md:p-10 overflow-hidden border"
              style={{
                borderColor: `${ACCENT}40`,
                background: "var(--dark-section-bg)",
                boxShadow: `0 24px 60px -30px ${ACCENT}80`,
              }}
            >
              <div
                className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl opacity-20"
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
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>
                      Plano Customizado
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                    Enterprise
                  </h3>
                  <p className="text-sm text-white/70 mb-5 max-w-xl">
                    Para Provedores e Data Centers com escala customizada, servidores e clusters sob medida, suporte dedicado e onboarding ajustado ao seu cenário.
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-2 text-sm mb-6">
                    {enterpriseBullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-white/80">
                        <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Infraestrutura Ilimitada — accordion inside Enterprise */}
                  <div
                    className="rounded-xl overflow-hidden border"
                    style={{ borderColor: `${ACCENT}30` }}
                  >
                    <button
                      className="w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-white/5"
                      onClick={() => toggle("enterprise", 0)}
                      aria-expanded={openAcc["enterprise"] === 0}
                    >
                      <span className="font-medium text-sm" style={{ color: ACCENT }}>
                        Infraestrutura Ilimitada
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${openAcc["enterprise"] === 0 ? "rotate-180" : ""}`}
                        style={{ color: ACCENT }}
                      />
                    </button>
                    {openAcc["enterprise"] === 0 && (
                      <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                        Todos os planos (Próximo, Veloz e Melhor) permitem a criação de VMs e VCPUs de forma ilimitada, sem cobrança extra por recurso provisionado. A diferenciação ocorre apenas pelo número de servidores físicos (nodes) e clusters gerenciados.
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Custos de Onboarding e Setup da plataforma cobrados à parte (consulte condições).
                    Consultoria técnica adicional disponível a partir de{" "}
                    <span className="font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>R$ 250,00/h</span>.
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end justify-center gap-4">
                  <div
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold border"
                    style={{ color: ACCENT, borderColor: `${ACCENT}55`, backgroundColor: `${ACCENT}15` }}
                  >
                    Personalizado
                  </div>
                  <Button
                    size="lg"
                    asChild
                    className="group font-semibold text-white w-full md:w-auto"
                    style={{ backgroundColor: ACCENT }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = `color-mix(in srgb, ${ACCENT} 90%, black)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = ACCENT;
                    }}
                  >
                    <Link to="/contato">
                      Falar com Especialista
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
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
