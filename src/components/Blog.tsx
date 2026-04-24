import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { MOCK_POSTS } from "@/lib/mock-data";

export const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["latest-posts"],
    queryFn: async () => {
      if (!isSupabaseConfigured) return MOCK_POSTS.slice(0, 3);
      
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*, post_categories(categories(name, slug)), authors(name)")
          .eq("status", "published")
          .order("created_at", { ascending: false })
          .limit(3);
        
        if (error) throw error;
        return data || MOCK_POSTS.slice(0, 3);
      } catch (e) {
        return MOCK_POSTS.slice(0, 3);
      }
    },
  });

  return (
    <section className="py-16 md:py-24 bg-card/40 border-y border-border">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.1]">
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
            {posts?.map((p, i) => {
              const category = p.post_categories?.[0]?.categories;
              const authorName = p.authors?.name || "Equipe Solvefy";
              
              return (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group cursor-pointer rounded-2xl bg-background border border-border overflow-hidden shadow-soft hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <Link to={`/blog/${p.slug}`} className="relative aspect-video overflow-hidden rounded-t-2xl block">
                    {p.og_image || p.cover_image ? (
                      <img
                        src={p.og_image || p.cover_image}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        <span className="text-muted-foreground font-medium">Sem Imagem</span>
                      </div>
                    )}
                    {category && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground">
                          {category.name}
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <Link to={`/blog/${p.slug}`} className="block mb-3">
                      <h3 className="text-lg md:text-xl font-bold tracking-tight leading-tight group-hover:text-primary transition-colors text-balance">
                        {p.title}
                      </h3>
                    </Link>
                    <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{authorName}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(p.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
