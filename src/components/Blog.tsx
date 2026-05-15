import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MOCK_POSTS } from "@/lib/mock-data";
import { BlogCard } from "./BlogCard";

export const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["latest-posts"],
    queryFn: async () => {
      // Dynamic import mantém o cliente Supabase fora do bundle inicial da
      // home — o chunk só baixa quando o usuário cruza esta seção e o
      // react-query dispara o fetch.
      const { isSupabaseConfigured, supabase } = await import(
        "@/lib/supabase"
      );

      if (!isSupabaseConfigured) return MOCK_POSTS.slice(0, 3);

      try {
        const { data: supabasePosts } = await supabase
          .from("posts")
          .select("*, post_categories(categories(name, slug)), authors(name)")
          .eq("status", "published")
          .order("created_at", { ascending: false })
          .limit(50);

        // MOCK_POSTS são sempre os artigos mais recentes/destacados;
        // artigos do Supabase aparecem depois (sem duplicar slugs)
        const mockSlugs = new Set((MOCK_POSTS as any[]).map((p) => p.slug));
        const supabaseOnly = (supabasePosts || []).filter(
          (p) => !mockSlugs.has(p.slug)
        );

        return [...(MOCK_POSTS as any[]), ...supabaseOnly].slice(0, 3);
      } catch {
        return MOCK_POSTS.slice(0, 3);
      }
    },
  });

  return (
    <section className="py-16 md:py-24 bg-card/40 border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <h2 className="tracking-tighter leading-[1.1]">
            Acompanhe nossos conteúdos!
          </h2>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors group"
          >
            Ver Todos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((p, i) => (
              <BlogCard key={p.id} post={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
