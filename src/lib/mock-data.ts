export const MOCK_POSTS = [
  {
    id: "1",
    title: "Como a Solvefy está revolucionando o CPaaS no Brasil",
    slug: "revolucionando-cpaas-brasil",
    excerpt: "Descubra como nossa plataforma integrada está ajudando empresas a escalarem sua comunicação de forma nativa e eficiente.",
    content: "O mercado de CPaaS está mudando rapidamente. Na Solvefy, acreditamos que a integração nativa é a chave para o sucesso...",
    cover_image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60",
    created_at: new Date().toISOString(),
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
    title: "5 Estratégias de Ads para reduzir seu CPA em 20%",
    slug: "estrategias-ads-reduzir-cpa",
    excerpt: "Pare de queimar orçamento. Aprenda as técnicas que nossos clientes usam para otimizar campanhas de alta performance.",
    content: "Reduzir o CPA não é mágica, é técnica. Comece revisando seu público-alvo e a qualidade dos seus criativos...",
    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    created_at: new Date().toISOString(),
    authors: {
      name: "Marketing Solvefy",
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
      name: "Equipe de Marketing",
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
