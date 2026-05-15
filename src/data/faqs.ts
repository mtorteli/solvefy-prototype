/**
 * FAQs por página. Cada array é consumido pelo componente <FaqSection> de
 * src/components/FaqSection.tsx, que injeta automaticamente o schema FAQPage.
 *
 * Conteúdo baseado nos documentos de produto do vault Obsidian da Solvefy
 * (pasta `03 - Produto/`). Atualizar aqui sempre que houver mudança de copy,
 * pricing ou positioning.
 */

import type { FaqItem } from "@/lib/schemas";

export const homeFaqs: FaqItem[] = [
  {
    question: "O que é a Solvefy?",
    answer:
      "A Solvefy é um ecossistema brasileiro de tecnologia que unifica seis produtos integrados: CPaaS (APIs de comunicação multicanal), Marketing (automação), Ads (tráfego pago via comunicação direta), CRM (gestão de relacionamento), Agents (agentes de IA) e Cloud (infraestrutura). Tudo em uma plataforma única, com billing unificado e suporte em português.",
  },
  {
    question: "Quais canais de comunicação a Solvefy suporta?",
    answer:
      "WhatsApp (API oficial Business), SMS, RCS, voz e e-mail — todos disponíveis via API única no Solvefy/CPaaS e integrados aos demais produtos do ecossistema (Marketing, Ads, CRM e Agents).",
  },
  {
    question: "A Solvefy atende empresas de qual porte?",
    answer:
      "Atendemos desde pequenas e médias empresas (PMEs) com times de marketing e comercial estruturados até operações enterprise com alto volume de mensagens. A precificação varia por produto: SaaS por tiers no Marketing, volume no CPaaS, freemium no CRM e CPC/CPM no Ads.",
  },
  {
    question: "Onde fica a Solvefy?",
    answer:
      "A Solvefy é uma empresa brasileira sediada em Florianópolis/SC (Rua Manoel de Oliveira Ramos, 205 — Estreito). Atende clientes em todo o Brasil, com selo ACATE 2024 e suporte 100% em português.",
  },
  {
    question: "Como começo a usar a Solvefy?",
    answer:
      "O melhor caminho depende da sua necessidade: se quer disparar comunicações via API, comece pelo CPaaS; se precisa de automação e jornadas, pelo Marketing; se quer organizar pipeline de vendas, pelo CRM (que tem plano free). Fale com nossa equipe pela página de Contato e indicamos o ponto de entrada ideal.",
  },
];

export const cpaasFaqs: FaqItem[] = [
  {
    question: "O que é uma plataforma CPaaS?",
    answer:
      "CPaaS (Communications Platform as a Service) é uma plataforma que entrega APIs prontas para que seus sistemas enviem e recebam mensagens em múltiplos canais — WhatsApp, SMS, RCS, voz e e-mail — sem precisar negociar com cada operadora ou plataforma separadamente. O Solvefy/CPaaS é o núcleo do ecossistema Solvefy.",
  },
  {
    question: "Quais canais o Solvefy/CPaaS suporta?",
    answer:
      "Cinco canais em uma plataforma: WhatsApp (API oficial Business com templates aprovados, mídia e chatbots), SMS (envio individual e em massa, OTP, transacional), RCS (mensagens ricas com carrosséis e botões), e-mail (API transacional e marketing) e voz (chamadas programáticas, URA e Flash Call).",
  },
  {
    question: "Como é a precificação do CPaaS?",
    answer:
      "Precificação por volume (per-message / per-minute), em reais e sem surpresa cambial. Quanto maior o volume contratado, menor o preço unitário. Suportamos três modelos: pós-pago (paga pelo consumo), pré-pago (compra créditos antecipados) e contrato anual com consumo mínimo (melhor preço unitário).",
  },
  {
    question: "Preciso de equipe técnica para integrar?",
    answer:
      "O Solvefy/CPaaS expõe uma REST API documentada em português e inglês, com webhooks e sandbox gratuito para desenvolvedores testarem antes de produção. Para times que não querem integrar via API, o dashboard permite disparo simples por upload de lista, sem código.",
  },
  {
    question: "Quem usa o Solvefy/CPaaS?",
    answer:
      "Empresas que precisam de alto volume de mensagens transacionais (OTP, notificações, confirmações), campanhas de comunicação em massa, atendimento via WhatsApp e ferramentas B2B que querem comunicação nativa multicanal — todos com infraestrutura brasileira, billing em reais e suporte local.",
  },
];

export const adsFaqs: FaqItem[] = [
  {
    question: "Como o Solvefy/Ads se diferencia de Google Ads e Meta Ads?",
    answer:
      "O Solvefy/Ads é a 'terceira via' do tráfego pago: em vez de comprar atenção disputada em display ou search, você entrega a mensagem diretamente nos canais que o cliente já usa — WhatsApp, SMS, RCS, e-mail e voz — com taxa de abertura entre 70% e 98% (vs. 0,5% de CTR em display).",
  },
  {
    question: "Como funciona a cobrança?",
    answer:
      "Por performance: CPC (custo por clique) ou CPM (custo por mil envios), com orçamento diário ou lifetime definido pelo cliente. Sem leilão dinâmico — o custo é previsível.",
  },
  {
    question: "Preciso de cookies, pixels ou rastreamento de terceiros?",
    answer:
      "Não. O Solvefy/Ads usa exclusivamente dados 1st-party do ecossistema Solvefy e listas próprias do cliente. Isso elimina dependência de cookies de terceiros (que estão sendo descontinuados pelos navegadores) e mantém a estratégia em compliance com a LGPD.",
  },
  {
    question: "Como crio uma campanha?",
    answer:
      "Em seis passos no painel: (1) objetivo da campanha (com sugestões de IA), (2) detalhes, (3) orçamento e datas, (4) seleção de canais (mínimo 2 — WhatsApp, SMS, e-mail, RCS ou voz), (5) segmentação por canal e (6) criativos. A IA do Solvefy/Agents auxilia textos e variações.",
  },
  {
    question: "Posso integrar com meu CRM ou plataforma de marketing?",
    answer:
      "Sim — o Solvefy/Ads é nativamente integrado ao Solvefy/CRM (leads gerados entram com contexto completo no pipeline) e ao Solvefy/Marketing (retargeting automático). Para times que usam outras ferramentas, expomos APIs e webhooks para sincronização.",
  },
];

export const marketingFaqs: FaqItem[] = [
  {
    question: "O que o Solvefy/Marketing entrega que o CPaaS não entrega?",
    answer:
      "O CPaaS é a infraestrutura de envio (API, disparo simples, OTP, dashboards de entrega). O Marketing concentra a inteligência: criação de jornadas multicanal com if/else, lead scoring, segmentação avançada com tags e comportamento, landing pages, formulários e IA para criação de campanhas. CPaaS = envio, Marketing = orquestração.",
  },
  {
    question: "Quais canais ficam disponíveis nas jornadas?",
    answer:
      "Todos os canais nativos da Solvefy: WhatsApp, SMS, RCS, voz e e-mail. Diferente da maioria dos concorrentes (RD Station, HubSpot, ActiveCampaign, Mailchimp), que dependem de integração com CPaaS externos, na Solvefy o envio acontece dentro da própria plataforma com billing unificado.",
  },
  {
    question: "Como funciona a precificação?",
    answer:
      "SaaS por tiers de plano: Basic, Advanced, Ultimate e API. Cada tier libera mais funcionalidades e um volume maior de contatos. Os créditos de envio nos canais já estão incluídos no plano — você não paga separado por canal nem precisa contratar SMS, WhatsApp ou e-mail de fornecedores diferentes.",
  },
  {
    question: "Como o Marketing se compara ao RD Station Marketing?",
    answer:
      "O RD Station é forte em e-mail marketing e tem comunidade grande no Brasil, mas depende de integrações externas para SMS, WhatsApp e RCS. O Solvefy/Marketing já nasce com esses canais nativos, com billing unificado e dados de campanha alimentando o ecossistema (Ads, CRM, Agents).",
  },
  {
    question: "Preciso ser técnico para criar uma jornada?",
    answer:
      "Não — o editor visual permite construir workflows com arrasta-e-solta, condicionais e cadências sem código. Para times que querem ir além, a IA do Solvefy/Agents sugere jornadas com base em objetivos descritos em linguagem natural.",
  },
];

export const crmFaqs: FaqItem[] = [
  {
    question: "O Solvefy/CRM tem versão gratuita?",
    answer:
      "Sim. O CRM básico é gratuito (modelo freemium) e funciona como porta de entrada para o ecossistema. Os planos pagos cobram por usuário/mês (per-seat) e desbloqueiam funcionalidades avançadas como automação, IA e integrações premium.",
  },
  {
    question: "Como funciona a comunicação dentro do CRM?",
    answer:
      "Você envia WhatsApp, SMS, e-mail e voz direto do CRM, sem precisar abrir outra ferramenta. As mensagens são despachadas via Solvefy/CPaaS e ficam registradas automaticamente no histórico do contato. Os créditos de envio são cobrados via wallet do ecossistema.",
  },
  {
    question: "Posso migrar do Pipedrive, RD Station CRM, Ploomes ou Moskit?",
    answer:
      "Sim. O Solvefy/CRM aceita importação via CSV padrão (contatos, empresas, deals) e expõe APIs para migração mais complexa. Times de implantação ajudam a mapear pipelines e estágios da ferramenta antiga.",
  },
  {
    question: "Leads do Solvefy/Marketing entram automaticamente no pipeline?",
    answer:
      "Sim — leads qualificados pelo Marketing caem direto no funil de vendas do CRM com todo o contexto da jornada (origem, score, interações, campanhas tocadas). O mesmo vale para leads gerados pelo Solvefy/Ads, que entram com dados da campanha que os converteu.",
  },
  {
    question: "Qual a diferença para o RD Station CRM ou o Pipedrive?",
    answer:
      "Nenhum CRM disponível no Brasil tem WhatsApp, SMS, RCS, voz e e-mail nativos. O RD Station integra com o RD Marketing mas não tem CPaaS próprio. O Pipedrive tem UX excelente mas não tem marketing nem comunicação multicanal. O Solvefy/CRM nasce dentro de um ecossistema que cobre todas essas camadas.",
  },
];

export const agentsFaqs: FaqItem[] = [
  {
    question: "O que são os agentes do Solvefy/Agents?",
    answer:
      "São agentes de IA treinados para tarefas específicas de marketing, vendas e operações — Content Creator, SEO Analyst, Campaign Optimizer, Prospector, Outreach Writer, Follow-up Bot, Pipeline Analyst e mais 10+ especializações. Funcionam como um time de especialistas disponível 24/7.",
  },
  {
    question: "Os agentes acessam meus dados do CRM e do Marketing?",
    answer:
      "Sim — esse é o principal diferencial. Diferente de agentes genéricos (Jasper, Copy.ai), os agentes da Solvefy operam dentro do ecossistema com acesso aos dados reais do seu Solvefy/CRM, Marketing, Ads e CPaaS. As recomendações e ações são contextualizadas, não baseadas em prompts vazios.",
  },
  {
    question: "Os agentes só geram texto ou também executam ações?",
    answer:
      "Executam ações. Um Outreach Writer não apenas escreve o e-mail — dispara via Solvefy/CPaaS. Um Campaign Optimizer pode ajustar a campanha ativa no Solvefy/Ads. Um Follow-up Bot atualiza o estágio do deal no CRM. O nível de autonomia é configurável.",
  },
  {
    question: "Como funciona a precificação?",
    answer:
      "Modelo usage-based: créditos de IA consumidos por execução de agente, com tier freemium para times começarem testando antes de escalar. Planos pagos a partir de R$ 80/mês para o time Veloz.",
  },
  {
    question: "Os agentes operam em WhatsApp e em outros canais?",
    answer:
      "Sim — como o Solvefy/Agents é integrado nativamente ao Solvefy/CPaaS, os agentes despacham mensagens em WhatsApp, SMS, RCS, e-mail e voz, sem precisar de integrações externas.",
  },
];

export const cloudFaqs: FaqItem[] = [
  {
    question: "Para quem é o Solvefy/Cloud?",
    answer:
      "Para Provedores de Internet (ISPs) e Data Centers brasileiros que querem transformar infraestrutura ociosa (servidores, racks, bandwidth) em uma nova fonte de receita oferecendo serviços de cloud (VMs, storage, networking) com sua própria marca.",
  },
  {
    question: "Como funciona o modelo white-label?",
    answer:
      "A Solvefy implanta a plataforma na infraestrutura do ISP, e o ISP passa a oferecer cloud com sua própria marca, seus preços e seus clientes — competindo regionalmente com AWS, Google Cloud e Azure. Painel para o ISP gerenciar e painel para o cliente final consumir, ambos com a marca do provedor.",
  },
  {
    question: "Como é cobrado?",
    answer:
      "Modelo híbrido B2B: SaaS fee mensal (R$ 1.000–R$ 2.390 dependendo do plano) pela plataforma + revenue share sobre a receita de cloud gerada. Existe também setup fee único de implantação e configuração.",
  },
  {
    question: "Preciso de equipe técnica de cloud no ISP?",
    answer:
      "Não. A Solvefy gerencia a plataforma — o ISP foca em vender e atender os clientes finais. Não há investimento em desenvolvimento de software porque o produto é SaaS implantado na infra existente, com expertise em Proxmox.",
  },
  {
    question: "Funciona com a infraestrutura que já tenho?",
    answer:
      "Sim. O Solvefy/Cloud é projetado para rodar em infraestrutura existente (servidores físicos, virtualização Proxmox, redes do ISP). A equipe técnica avalia o ambiente atual durante a fase de setup e dimensiona o provisioning.",
  },
];
