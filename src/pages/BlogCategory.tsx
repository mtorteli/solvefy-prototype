import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { MOCK_POSTS, MOCK_CATEGORIES } from "@/lib/mock-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema } from "@/lib/schemas";
import { ArrowLeft, Search } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";

export default function BlogCategory() {
  const { category } = useParams();
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

  const { data: categoryData, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["category", category],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        return MOCK_CATEGORIES.find(c => c.slug === category) || null;
      }
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .eq("slug", category)
          .single();
        
        if (error) throw error;
        return data;
      } catch (e) {
        return MOCK_CATEGORIES.find(c => c.slug === category) || null;
      }
    },
  });

  const { data: postsData, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["posts-by-category", category, page, search],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        const filtered = MOCK_POSTS.filter(p => 
          p.post_categories.slug === category && 
          (search ? p.title.toLowerCase().includes(search.toLowerCase()) : true)
        );
        return { posts: filtered, count: filtered.length };
      }

      if (!categoryData?.id) return { posts: [], count: 0 };

      try {
        const { data: postCats, error: catError } = await supabase
          .from("post_categories")
          .select("post_id")
          .eq("category_id", categoryData.id);
          
        if (catError) throw catError;
        
        const postIds = postCats.map(pc => pc.post_id);
        
        if (postIds.length === 0) return { posts: [], count: 0 };

        let query = supabase
          .from("posts")
          .select("*, post_categories(categories(name, slug)), authors(name)", { count: "exact" })
          .in("id", postIds)
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
        const filtered = MOCK_POSTS.filter(p => p.post_categories.slug === category);
        return { posts: filtered, count: filtered.length };
      }
    },
    enabled: !!categoryData?.id || !isSupabaseConfigured,
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    if (slug) {
      navigate(`/blog/categoria/${slug}`);
    } else {
      navigate('/blog');
    }
  };

  if (isLoadingCategory) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-24 text-center px-4">
          <h1 className="text-4xl mb-4">Categoria não encontrada</h1>
          <p className="section-subtitle mb-8">A categoria que você está procurando não existe ou foi removida.</p>
          <button onClick={() => navigate('/blog')} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
            Voltar para o Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={categoryData?.name ? `${categoryData.name} — Blog` : "Categoria — Blog"}
        description={`Artigos sobre ${categoryData?.name ?? "este tema"} no blog da Solvefy. Conteúdo especializado em comunicação B2B e marketing digital.`}
        canonical={`/blog/categoria/${category}`}
        ogImage="/og/og-blog.jpg"
        schemas={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            {
              name: categoryData?.name ?? "Categoria",
              path: `/blog/categoria/${category}`,
            },
          ]),
        ]}
      />
      <Header />
      <main id="main" className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 mt-8">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para todos os posts
          </Link>
        </div>

        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl tracking-tight mb-4">
              Categoria: <span className="text-primary">{categoryData.name}</span>
            </h1>
            {categoryData.description && (
              <p className="section-subtitle max-w-2xl">{categoryData.description}</p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Pesquisar nesta categoria..." 
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
                value={category || ""}
              >
                <option value="">Todas as Categorias</option>
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

        {isLoadingPosts ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postsData?.posts?.length === 0 ? (
                <p className="text-muted-foreground col-span-3 text-center py-12">Nenhum post encontrado nesta categoria.</p>
              ) : (
                postsData?.posts?.map((p, i) => (
                  <BlogCard key={p.id} post={p} index={i} />
                ))
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
