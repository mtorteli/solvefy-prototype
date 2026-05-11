import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { MOCK_POSTS } from "@/lib/mock-data";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";

const blogCover = "/images/blog-cover.webp";

const AREAS = [
  "Comercial",
  "Marketing",
  "Tecnologia",
  "Produto",
  "Institucional",
  "Inteligência Artificial",
];

const SOLUTIONS = ["CPaaS", "Ads", "Marketing", "CRM", "Agents", "Cloud"];

// Busca o termo no título e no corpo do post
const postMatchesTerm = (post: any, term: string) => {
  const lower = term.toLowerCase();
  return (
    (post.title || "").toLowerCase().includes(lower) ||
    (post.body || post.content || post.excerpt || "").toLowerCase().includes(lower)
  );
};

export default function BlogIndex() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pageSize = 9;

  const toggleSolution = (sol: string) => {
    setSelectedSolutions((prev) =>
      prev.includes(sol) ? prev.filter((s) => s !== sol) : [...prev, sol]
    );
    setPage(0);
  };

  const hasActiveFilters = selectedArea !== "" || selectedSolutions.length > 0;

  const clearFilters = () => {
    setSelectedArea("");
    setSelectedSolutions([]);
    setPage(0);
  };

  const { data: postsData, isLoading } = useQuery({
    queryKey: ["posts", page, search, selectedArea, selectedSolutions],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        let filtered = MOCK_POSTS as any[];
        if (search) filtered = filtered.filter((p) => postMatchesTerm(p, search));
        if (selectedArea) filtered = filtered.filter((p) => postMatchesTerm(p, selectedArea));
        if (selectedSolutions.length > 0)
          filtered = filtered.filter((p) =>
            selectedSolutions.some((sol) => postMatchesTerm(p, sol))
          );
        const start = page * pageSize;
        return { posts: filtered.slice(start, start + pageSize), count: filtered.length };
      }
      try {
        let query = supabase
          .from("posts")
          .select("*, post_categories(categories(name, slug)), authors(name)", { count: "exact" })
          .eq("status", "published");

        if (search)
          query = query.or(`title.ilike.%${search}%,body.ilike.%${search}%`);

        if (selectedArea)
          query = query.or(
            `title.ilike.%${selectedArea}%,body.ilike.%${selectedArea}%`
          );

        if (selectedSolutions.length > 0) {
          const solFilters = selectedSolutions
            .flatMap((sol) => [`title.ilike.%${sol}%`, `body.ilike.%${sol}%`])
            .join(",");
          query = query.or(solFilters);
        }

        const { data, error, count } = await query
          .order("created_at", { ascending: false })
          .range(page * pageSize, (page + 1) * pageSize - 1);
        if (error) throw error;
        return { posts: data, count };
      } catch (e) {
        return { posts: MOCK_POSTS, count: MOCK_POSTS.length };
      }
    },
  });

  const totalPages = postsData?.count ? Math.ceil(postsData.count / pageSize) : 1;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Blog — Comunicação B2B e Marketing Digital"
        description="Artigos, guias e novidades sobre comunicação multicanal, CRM, CPaaS e marketing digital. Conteúdo especializado da Solvefy."
        canonical="/blog"
      />
      <Header />

      <main className="flex-1 flex flex-col">

        {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
        <div
          className="relative w-full h-52 sm:h-64 md:h-80 overflow-hidden"
          style={{
            backgroundImage: `url('${blogCover}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#4caf50",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Pesquisar artigos..."
                  className="w-full pl-11 pr-5 py-3.5 rounded-2xl bg-white/95 shadow-2xl text-sm text-foreground placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTEÚDO: SIDEBAR + GRID ─────────────────────────────────────────── */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-20">
          <div className="flex gap-8 items-start">

            {/* ── SIDEBAR (desktop) ────────────────────────────────────────────── */}
            <aside className="hidden md:flex flex-col gap-6 w-48 shrink-0 sticky top-24 mt-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Filtros
                </p>
                <ul className="flex flex-col gap-2.5">
                  {SOLUTIONS.map((sol) => (
                    <li key={sol}>
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedSolutions.includes(sol)}
                          onChange={() => toggleSolution(sol)}
                          className="h-4 w-4 rounded border-border accent-primary cursor-pointer shrink-0"
                        />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors select-none">
                          {sol}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors w-fit"
                >
                  <X className="h-3.5 w-3.5" />
                  Limpar filtros
                </button>
              )}
            </aside>

            {/* ── COLUNA PRINCIPAL ─────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Cabeçalho: título + botão mobile + filtro de área */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl md:text-2xl tracking-tight">Blog</h1>
                  <button
                    className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
                    onClick={() => setSidebarOpen((o) => !o)}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtros
                    {hasActiveFilters && (
                      <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                    )}
                  </button>
                </div>

                {/* Filtro por Área */}
                <div className="relative shrink-0 w-full sm:w-56">
                  <select
                    className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer appearance-none text-sm"
                    value={selectedArea}
                    onChange={(e) => {
                      setSelectedArea(e.target.value);
                      setPage(0);
                    }}
                  >
                    <option value="">Filtrar por Área</option>
                    {AREAS.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Filtros mobile expandidos */}
              {sidebarOpen && (
                <div className="md:hidden mb-6 p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Filtros
                    </span>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                        Limpar
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {SOLUTIONS.map((sol) => (
                      <label key={sol} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSolutions.includes(sol)}
                          onChange={() => toggleSolution(sol)}
                          className="h-4 w-4 rounded border-border accent-primary cursor-pointer shrink-0"
                        />
                        <span className="text-sm text-foreground select-none">{sol}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Grid de posts */}
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

                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-16">
                      <button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="p-2 rounded-lg border border-border disabled:opacity-50 hover:bg-muted transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="text-sm font-medium text-muted-foreground">
                        Página {page + 1} de {totalPages}
                      </span>
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={page >= totalPages - 1}
                        className="p-2 rounded-lg border border-border disabled:opacity-50 hover:bg-muted transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
