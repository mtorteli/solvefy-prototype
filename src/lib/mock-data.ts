// PROTÓTIPO DE PORTFÓLIO — apenas metadados de capa dos artigos.
// O conteúdo completo dos posts foi removido: o blog funciona como uma
// galeria navegável de capas, sem páginas de artigo abertas.
export const MOCK_POSTS = [
  {
    id: "7",
    title: "Como escalar vendas de infoprodutos com estratégias multicanal e automação",
    slug: "como-escalar-vendas-infoprodutos-multicanal-automacao",
    excerpt: "Descubra como escalar vendas de cursos, mentorias e e-books combinando WhatsApp, SMS e RCS. Automatize seu funil, recupere carrinhos e aumente o faturamento.",
    cover_image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
    created_at: new Date("2026-05-14").toISOString(),
    authors: { name: "Equipe de Conteúdo" },
    post_categories: { name: "Produto", slug: "produto" }
  },
  {
    id: "6",
    title: "Como evitar bloqueio no WhatsApp Business: O guia definitivo para proteger sua conta",
    slug: "como-evitar-bloqueio-whatsapp-business",
    excerpt: "Ter o WhatsApp bloqueado pode paralisar suas vendas. Descubra as novas regras da Meta, as melhores práticas antibloqueio e como escalar seus disparos com segurança.",
    cover_image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60",
    created_at: new Date("2026-05-13").toISOString(),
    authors: { name: "Equipe de Conteúdo" },
    post_categories: { name: "Comercial", slug: "comercial" }
  },
  {
    id: "5",
    title: "RCS para empresas de SaaS: Como vender, engajar e escalar a comunicação",
    slug: "rcs-saas-vender-engajar-escalar",
    excerpt: "Descubra o impacto do RCS na jornada de clientes de SaaS. Aprenda a automatizar onboarding, reduzir churn e escalar vendas.",
    cover_image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
    created_at: new Date("2026-05-12").toISOString(),
    authors: { name: "Equipe de Conteúdo" },
    post_categories: { name: "Tecnologia", slug: "tecnologia" }
  },
  {
    id: "4",
    title: "WhatsApp Marketing: O guia definitivo para escalar vendas e atendimento",
    slug: "whatsapp-marketing-guia-definitivo",
    excerpt: "Descubra o que é WhatsApp Marketing, suas vantagens, boas práticas e como uma plataforma multicanal pode transformar a comunicação da sua empresa.",
    cover_image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop&q=60",
    created_at: new Date("2026-05-11").toISOString(),
    authors: { name: "Equipe de Conteúdo" },
    post_categories: { name: "Marketing", slug: "marketing" }
  },
  {
    id: "1",
    title: "Como automatizar a comunicação multicanal e escalar o atendimento",
    slug: "automacao-comunicacao-multicanal",
    excerpt: "Aprenda como automatizar sua comunicação multicanal e escalar o atendimento ao cliente integrando sistemas, dados e canais.",
    cover_image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60",
    created_at: new Date("2026-05-10").toISOString(),
    authors: { name: "Equipe de Conteúdo" },
    post_categories: { name: "Tecnologia", slug: "tecnologia" }
  },
  {
    id: "2",
    title: "WhatsApp e LGPD: O guia completo para vender e atender com segurança",
    slug: "whatsapp-lgpd-guia-completo",
    excerpt: "Entenda o que a LGPD exige para o uso do WhatsApp corporativo. Evite multas, bloqueios e automatize seu atendimento com segurança.",
    cover_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
    created_at: new Date("2026-05-09").toISOString(),
    authors: { name: "Equipe de Conteúdo" },
    post_categories: { name: "Tecnologia", slug: "tecnologia" }
  },
  {
    id: "3",
    title: "RCS para empresas de SaaS: Como vender, engajar e escalar a comunicação",
    slug: "rcs-para-empresas-saas",
    excerpt: "Descubra o impacto do RCS na jornada de clientes de SaaS. Aprenda a automatizar onboarding, reduzir churn e escalar vendas.",
    cover_image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
    created_at: new Date("2026-05-05").toISOString(),
    authors: { name: "Equipe de Conteúdo" },
    post_categories: { name: "Tecnologia", slug: "tecnologia" }
  }
];

export const MOCK_CATEGORIES = [
  { id: "1", name: "Tecnologia", slug: "tecnologia" },
  { id: "2", name: "Marketing", slug: "marketing" },
  { id: "3", name: "Vendas", slug: "vendas" },
  { id: "4", name: "Comercial", slug: "comercial" },
  { id: "5", name: "Produto", slug: "produto" }
];
