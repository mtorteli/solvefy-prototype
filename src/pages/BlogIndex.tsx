import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { MOCK_POSTS, MOCK_CATEGORIES } from "@/lib/mock-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BlogCard } from "@/components/BlogCard";

export default function BlogIndex() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 9;

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!isSupabaseConfigured) return MOCK_CATEGORIES;
      try {
        const { data } = await supabase.from("categories").select("*").order("name");
        return data || MOCK_CATEGORIES;
      } catch (e) {
        return MOCK_CATEGORIES;
      }
    }
  });

  const { data: postsData, isLoading } = useQuery({
    queryKey: ["posts", page, search],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        const filtered = search 
          ? MOCK_POSTS.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
          : MOCK_POSTS;
        return { posts: filtered, count: filtered.length };
      }

      try {
        let query = supabase
          .from("posts")
          .select("*, post_categories(categories(name, slug)), authors(name)", { count: "exact" })
          .eq("status", "published");

        if (search) {
          query = query.ilike("title", `%${search}%`);
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    if (slug) {
      navigate(`/blog/categoria/${slug}`);
    }
  };

  const totalPages = postsData?.count ? Math.ceil(postsData.count / pageSize) : 1;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 mt-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl tracking-tight mb-4">Blog</h1>
            <p className="section-subtitle">Acompanhe nossos conteúdos e fique por dentro das novidades.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Pesquisar artigos..." 
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
              />
            </div>
            <div className="relative w-full sm:w-48">
              <select 
                className="w-full pl-4 pr-10 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer appearance-none"
                onChange={handleCategoryChange}
                defaultValue=""
              >
                <option value="" disabled>Filtrar por Categoria</option>
                {categories?.map(c => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postsData?.posts?.length === 0 ? (
                <p className="text-muted-foreground col-span-3 text-center py-12">Nenhum post encontrado.</p>
              ) : (
                postsData?.posts?.map((p, i) => (
                  <BlogCard key={p.id} post={p} index={i} />
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                <button
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="p-2 rounded-lg border border-border disabled:opacity-50 hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm font-medium text-muted-foreground">
                  Página {page + 1} de {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                  className="p-2 rounded-lg border border-border disabled:opacity-50 hover:bg-muted transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
