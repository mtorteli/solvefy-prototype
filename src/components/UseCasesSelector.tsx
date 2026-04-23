import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingCart,
  Store,
  Gamepad2,
  Dice5,
  Megaphone,
  Cloud,
  Cpu,
  GraduationCap,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";

type UseCase = { title: string; description: string; icon: LucideIcon };
type Segment = {
  id: string;
  label: string;
  icon: LucideIcon;
  cases: UseCase[];
};

const ACCENT = "#9c7bff";
const BRAND_GREEN = "#00de71";

const segments: Segment[] = [
  {
    id: "agencias",
    label: "Agências de Marketing",
    icon: Megaphone,
    cases: [
      { title: "Campanhas RCS", description: "Encante com imagens, vídeos e botões interativos direto na caixa de mensagens nativa.", icon: Megaphone },
      { title: "Qualificação de Leads", description: "Use chatbots no WhatsApp para captar dados e qualificar contatos automaticamente.", icon: Store },
      { title: "Réguas de Nutrição", description: "Crie fluxos de mensagens cadenciadas para aquecer leads até o momento da conversão.", icon: Cpu },
    ],
  },
  {
    id: "bets",
    label: "Apostas",
    icon: Dice5,
    cases: [
      { title: "Atualização Rápida de Odds", description: "Envie variações de odds imperdíveis diretamente no celular do apostador.", icon: Dice5 },
      { title: "Saque Aprovado", description: "Gere confiança e fidelidade avisando instantaneamente que o dinheiro está na conta.", icon: Megaphone },
      { title: "Verificação (OTP Seguro)", description: "Valide a identidade e proteja transações com senhas temporárias de altíssima entrega.", icon: Cpu },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingCart,
    cases: [
      { title: "Recuperação de Carrinho", description: "Envie mensagens automáticas com ofertas irresistíveis minutos após o abandono.", icon: ShoppingCart },
      { title: "Alertas de Rastreio", description: "Mantenha o cliente seguro com atualizações em tempo real, do despacho à porta.", icon: Megaphone },
      { title: "Confirmação de Compra", description: "Reduza a ansiedade do cliente com comprovantes instantâneos via WhatsApp ou SMS.", icon: Store },
    ],
  },
  {
    id: "educacao",
    label: "Educação",
    icon: GraduationCap,
    cases: [
      { title: "Lembretes de Rematrícula", description: "Facilite a renovação com links de pagamento e alertas de vencimento pelo WhatsApp.", icon: GraduationCap },
      { title: "Avisos de Provas", description: "Mantenha o engajamento dos alunos alto com lembretes automáticos do calendário acadêmico.", icon: Megaphone },
      { title: "Comunicação Ativa", description: "Envie boletins, convites para reuniões e comunicados urgentes de forma centralizada.", icon: HeartPulse },
    ],
  },
  {
    id: "igaming",
    label: "iGaming",
    icon: Gamepad2,
    cases: [
      { title: "Notificação de Bônus", description: "Incentive novos depósitos com alertas de bônus e rodadas grátis em tempo real.", icon: Gamepad2 },
      { title: "Alertas de Eventos", description: "Avise os jogadores minutos antes do evento começar para impulsionar apostas ao vivo.", icon: Megaphone },
      { title: "Reativação de Jogadores", description: "Traga usuários inativos de volta com ofertas exclusivas via SMS ou WhatsApp.", icon: Cpu },
    ],
  },
  {
    id: "saas",
    label: "SaaS",
    icon: Cloud,
    cases: [
      { title: "Onboarding Guiado", description: "Reduza o churn enviando dicas de uso e tutoriais nos primeiros dias de assinatura.", icon: Cloud },
      { title: "Alertas de Faturamento", description: "Evite inadimplência com lembretes amigáveis e links diretos para pagamento via Pix.", icon: Megaphone },
      { title: "Campanhas de Up-sell", description: "Ofereça upgrades de plano no exato momento em que o cliente atinge o limite de uso.", icon: Store },
    ],
  },
  {
    id: "saude",
    label: "Saúde",
    icon: HeartPulse,
    cases: [
      { title: "Agendamento de Consultas", description: "Zere as faltas (no-show) com lembretes interativos onde o paciente confirma ou reagenda.", icon: HeartPulse },
      { title: "Lembretes de Exames", description: "Fidelize pacientes com convites automáticos para check-ups anuais preventivos.", icon: Megaphone },
      { title: "Resultados Disponíveis", description: "Envie links seguros por SMS ou WhatsApp para o paciente acessar laudos sem sair de casa.", icon: Cpu },
    ],
  },
  {
    id: "tech",
    label: "Tech",
    icon: Cpu,
    cases: [
      { title: "Alertas Críticos (Downtime)", description: "Avise sua equipe e usuários sobre instabilidades em segundos, via SMS de rota crítica.", icon: Cpu },
      { title: "Autenticação 2FA/OTP", description: "Blinde o acesso às suas plataformas com a API de OTP mais rápida e estável do mercado.", icon: Cloud },
      { title: "Atualização de Produto", description: "Comunique novas features e release notes diretamente onde o usuário mais engaja.", icon: Megaphone },
    ],
  },
  {
    id: "varejo",
    label: "Varejo",
    icon: Store,
    cases: [
      { title: "Ofertas Segmentadas", description: "Dispare campanhas hiper-direcionadas baseadas no histórico de compras do cliente.", icon: Megaphone },
      { title: "Avisos de Estoque", description: "Avise clientes automaticamente quando aquele produto desejado voltar à prateleira.", icon: Store },
      { title: "Pesquisa NPS Pós-venda", description: "Colete feedback valioso por canais de alta taxa de resposta logo após a compra.", icon: HeartPulse },
    ],
  },
];

export const UseCasesSelector = () => {
  const [activeId, setActiveId] = useState<string>("ecommerce");
  const active = segments.find((s) => s.id === activeId) ?? segments[0];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 p-6 md:p-10"
      style={{
        background:
          "linear-gradient(135deg, #0a041f 0%, #1a1033 55%, #0a041f 100%)",
        boxShadow:
          "0 30px 80px -30px rgba(108, 74, 255, 0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-[360px] w-[360px] rounded-full blur-3xl opacity-30"
        style={{ background: ACCENT }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[360px] w-[360px] rounded-full blur-3xl opacity-20"
        style={{ background: BRAND_GREEN }}
      />

      <div className="relative flex flex-col gap-6">
        {/* Custom Dropdown */}
        <div className="flex flex-col items-start">
          <label className="mb-2 text-sm font-medium text-gray-400">
            Selecione seu segmento
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="group inline-flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium text-white transition-all duration-200 backdrop-blur-md hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-offset-0 min-w-[260px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(156,123,255,0.18), rgba(0,222,113,0.08))",
                borderColor: "rgba(156,123,255,0.35)",
                boxShadow:
                  "0 10px 30px -12px rgba(156,123,255,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(0, 222, 113, 0.18)",
                  color: BRAND_GREEN,
                }}
              >
                <active.icon className="h-4 w-4" />
              </span>
              <span className="flex-1 text-left">{active.label}</span>
              <ChevronDown className="h-4 w-4 opacity-70 transition-transform group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-[260px] border-white/10 p-1.5 text-white"
              style={{
                background:
                  "linear-gradient(160deg, #120726 0%, #1a1033 100%)",
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {segments.map((seg) => {
                const Icon = seg.icon;
                const isActive = seg.id === activeId;
                return (
                  <DropdownMenuItem
                    key={seg.id}
                    onSelect={() => setActiveId(seg.id)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:bg-white/[0.06] focus:text-white"
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-md"
                      style={{
                        background: isActive
                          ? "rgba(0,222,113,0.18)"
                          : "rgba(156,123,255,0.12)",
                        color: isActive ? BRAND_GREEN : ACCENT,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">{seg.label}</span>
                    {isActive && (
                      <Check className="h-4 w-4" style={{ color: BRAND_GREEN }} />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Result panel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
            >
              {active.cases.map(({ title, description, icon: Icon }, idx) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="group relative h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                    boxShadow:
                      "0 20px 50px -25px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(156,123,255,0.45)";
                    e.currentTarget.style.boxShadow =
                      "0 24px 60px -20px rgba(156,123,255,0.45), inset 0 1px 0 rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 50px -25px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)";
                  }}
                >
                  <div
                    className="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"
                    style={{ background: ACCENT }}
                  />
                  <div
                    className="relative flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                    style={{
                      background: "rgba(156,123,255,0.15)",
                      color: ACCENT,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative text-lg font-semibold tracking-tight text-white leading-snug">
                    {title}
                  </h3>
                  <p className="relative mt-2 text-sm text-gray-400 leading-relaxed">
                    {description}
                  </p>
                  <div className="relative mt-auto pt-4 flex items-center gap-2 text-xs text-gray-400">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: BRAND_GREEN, boxShadow: `0 0 8px ${BRAND_GREEN}` }}
                    />
                    <span>Caso de uso ativo</span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
