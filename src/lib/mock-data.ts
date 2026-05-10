export const MOCK_POSTS = [
  {
    id: "1",
    title: "Como automatizar comunicação multicanal e escalar o atendimento ao cliente",
    slug: "automacao-comunicacao-multicanal",
    excerpt: "Descubra como integrar múltiplos canais de comunicação em uma única plataforma e transformar o atendimento ao cliente em vantagem competitiva.",
    content: "A comunicação multicanal deixou de ser diferencial para se tornar exigência. Empresas que automatizam seus fluxos de mensagens — via SMS, WhatsApp, e-mail e voz — conseguem atender mais clientes com menos esforço e muito mais consistência...",
    cover_image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60",
    created_at: new Date("2026-05-10").toISOString(),
    authors: {
      name: "Equipe Solvefy",
      avatar_url: "https://github.com/shadcn.png"
    },
    post_categories: {
      name: "Tecnologia",
      slug: "tecnologia"
    }
  },
  {
    id: "2",
    title: "Estratégias de Ads para reduzir seu CPA",
    slug: "estrategias-ads-reduzir-cpa",
    excerpt: "Pare de queimar orçamento. Aprenda as técnicas que nossos clientes usam para otimizar campanhas de alta performance.",
    content: "Reduzir o CPA não é mágica, é técnica. Comece revisando seu público-alvo e a qualidade dos seus criativos...",
    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    created_at: new Date().toISOString(),
    authors: {
      name: "Equipe Solvefy",
      avatar_url: "https://github.com/shadcn.png"
    },
    post_categories: {
      name: "Marketing",
      slug: "marketing"
    }
  },
  {
    id: "3",
    title: "Como segmentar a comunicação e tornar suas mensagens mais relevantes em cada etapa da jornada",
    slug: "segmentar-comunicacao-jornada",
    excerpt: "Descubra como usar segmentação inteligente para entregar a mensagem certa, para a pessoa certa, no momento certo — e transformar comunicação em conversão.",
    content: "A segmentação é o alicerce de qualquer estratégia de comunicação eficiente. Quando você fala com todos da mesma forma, não fala com ninguém...",
    cover_image: "/images/blog/segmentar-comunicacao-jornada.jpg",
    created_at: new Date("2026-05-05").toISOString(),
    authors: {
      name: "Equipe Solvefy",
      avatar_url: "https://github.com/shadcn.png"
    },
    post_categories: {
      name: "Marketing",
      slug: "marketing"
    }
  }
];

export const MOCK_CATEGORIES = [
  { id: "1", name: "Tecnologia", slug: "tecnologia" },
  { id: "2", name: "Marketing", slug: "marketing" },
  { id: "3", name: "Vendas", slug: "vendas" }
];
