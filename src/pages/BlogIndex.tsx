import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { MOCK_POSTS } from "@/lib/mock-data";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { Search, ChevronLeft, ChevronRight, ArrowRight, User, Calendar } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AREAS = [
  "Comercial",
  "Marketing",
  "Tecnologia",
  "Produto",
  "Institucional",
  "Inteligência Artificial",
];

const SOLUTIONS = ["CPaaS", "Ads", "Marketing", "CRM", "Agents", "Cloud"];

// Remove tags HTML do conteúdo antes de pesquisar
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");

// Busca avançada: todas as palavras-chave devem estar presentes (AND)
const postMatchesSearch = (post: any, search: string) => {
  const keywords = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (keywords.length === 0) return true;
  const text = [
    post.title || "",
    post.excerpt || "",
    stripHtml(post.body || post.content || ""),
  ].join(" ").toLowerCase();
  return keywords.every((kw) => text.includes(kw));
};

// Busca simples de um termo (usado pelos filtros)
const postMatchesTerm = (post: any, term: string) => {
  const lower = term.toLowerCase();
  const text = [
    post.title || "",
    post.excerpt || "",
    stripHtml(post.body || post.content || ""),
  ].join(" ").toLowerCase();
  return text.includes(lower);
};

export default function BlogIndex() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const pageSize = 6;

  // ── Post em destaque: sempre o mais recente, independente de filtros ────────
  const { data: featuredPost } = useQuery({
    queryKey: ["featured-post"],
    queryFn: async () => {
      if (!isSupabaseConfigured) return (MOCK_POSTS as any[])[0] ?? null;
      try {
        const { data } = await supabase
          .from("posts")
          .select("*, post_categories(categories(name, slug)), authors(name, avatar_url)")
          .eq("status", "published")
          .order("created_at", { ascending: false })
          .limit(1)
          .single();
        return data ?? null;
      } catch {
        return (MOCK_POSTS as any[])[0] ?? null;
      }
    },
  });

  // ── Grid: posts a partir do segundo, com filtros e paginação ────────────────
  const { data: postsData, isLoading } = useQuery({
    queryKey: ["posts", page, search, selectedFilter],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        let filtered = (MOCK_POSTS as any[]).slice(1); // exclui o destaque
        if (search) filtered = filtered.filter((p) => postMatchesSearch(p, search));
        if (selectedFilter) filtered = filtered.filter((p) => postMatchesTerm(p, selectedFilter));
        const start = page * pageSize;
        return { posts: filtered.slice(start, start + pageSize), count: filtered.length };
      }
      try {
        const featuredId = featuredPost?.id ?? null;
        let query = supabase
          .from("posts")
          .select("*, post_categories(categories(name, slug)), authors(name)", { count: "exact" })
          .eq("status", "published");

        if (featuredId) query = query.neq("id", featuredId);

        if (search) {
          const keywords = search.trim().split(/\s+/).filter(Boolean);
          keywords.forEach((kw) => {
            query = query.or(`title.ilike.%${kw}%,body.ilike.%${kw}%`);
          });
        }

        if (selectedFilter)
          query = query.or(
            `title.ilike.%${selectedFilter}%,body.ilike.%${selectedFilter}%`
          );

        const { data, error, count } = await query
          .order("created_at", { ascending: false })
          .range(page * pageSize, (page + 1) * pageSize - 1);
        if (error) throw error;
        return { posts: data, count };
      } catch {
        return { posts: (MOCK_POSTS as any[]).slice(1), count: MOCK_POSTS.length - 1 };
      }
    },
    enabled: !isSupabaseConfigured || !!featuredPost !== undefined,
  });

  const totalPages = postsData?.count ? Math.ceil(postsData.count / pageSize) : 1;

  // Helpers para o post em destaque
  const featuredCategory =
    featuredPost?.post_categories?.name ||
    featuredPost?.post_categories?.[0]?.categories?.name ||
    null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Blog — Comunicação B2B e Marketing Digital"
        description="Artigos, guias e novidades sobre comunicação multicanal, CRM, CPaaS e marketing digital. Conteúdo especializado da Solvefy."
        canonical="/blog"
      />
      <Header />

      <main className="flex-1">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-20">

          {/* ── POST EM DESTAQUE ──────────────────────────────────────────────── */}
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="group rounded-2xl border border-border overflow-hidden flex flex-col md:flex-row bg-card mb-12"
            >
              {/* Imagem */}
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="relative w-full md:w-1/2 aspect-video md:aspect-auto overflow-hidden block shrink-0"
                style={{ minHeight: "320px" }}
              >
                {featuredPost.og_image || featuredPost.cover_image ? (
                  <img
                    src={featuredPost.og_image || featuredPost.cover_image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-medium">Sem Imagem</span>
                  </div>
                )}
                {/* Badge "Destaque" sobre a imagem */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow">
                    Destaque
                  </span>
                </div>
              </Link>

              {/* Conteúdo */}
              <div className="flex flex-col justify-center p-8 md:p-12 flex-1 gap-4">
                {featuredCategory && (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary w-fit">
                    {featuredCategory}
                  </span>
                )}

                <Link to={`/blog/${featuredPost.slug}`} className="block">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-foreground hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                </Link>

                {featuredPost.excerpt && (
                  <p className="text-muted-foreground leading-relaxed line-clamp-3 text-base">
                    {featuredPost.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between mt-2 pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {featuredPost.authors?.name || "Equipe Solvefy"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(featuredPost.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline shrink-0 ml-4"
                  >
                    Ler artigo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          )}

          {/* ── BARRA DE FERRAMENTAS: TÍTULO + BUSCA + FILTROS ───────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <h1 className="text-xl md:text-2xl tracking-tight shrink-0">Artigos</h1>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Campo de busca */}
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Pesquisar artigos..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                  }}
                />
              </div>

              {/* Filtro unificado */}
              <div className="relative shrink-0 w-40 sm:w-48">
                <select
                  className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer appearance-none text-sm"
                  value={selectedFilter}
                  onChange={(e) => {
                    setSelectedFilter(e.target.value);
                    setPage(0);
                  }}
                >
                  <option value="">Filtros</option>
                  <optgroup label="Área">
                    {AREAS.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Solução">
                    {SOLUTIONS.map((sol) => (
                      <option key={sol} value={sol}>{sol}</option>
                    ))}
                  </optgroup>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── GRID DE ARTIGOS ───────────────────────────────────────────────── */}
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {postsData?.posts?.length === 0 ? (
                  <p className="text-muted-foreground col-span-3 text-center py-12">
                    Nenhum post encontrado.
                  </p>
                ) : (
                  postsData?.posts?.map((p, i) => (
                    <BlogCard key={p.id} post={p} index={i} />
                  ))
                )}
              </div>

              {(postsData?.posts?.length ?? 0) > 0 && (
                <div className="flex justify-center items-center gap-4 mt-16">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </button>

                  <span className="text-sm font-medium text-muted-foreground">
                    Página {page + 1} de {totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                  >
                    Próximo
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
