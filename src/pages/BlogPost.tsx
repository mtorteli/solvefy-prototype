import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { MOCK_POSTS } from "@/lib/mock-data";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { renderContent } from "@/lib/renderContent";
import { motion } from "framer-motion";

export default function BlogPost() {
  const { slug } = useParams();

  const { data: postData, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        const post = MOCK_POSTS.find(p => p.slug === slug);
        const related = MOCK_POSTS.filter(p => p.slug !== slug).slice(0, 2);
        return { post, related };
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*, post_categories(category_id, categories(name, slug)), authors(name)")
          .eq("slug", slug)
          .eq("status", "published")
          .single();
        
        if (error) throw error;

        let relatedPosts: any[] = [];
        const catId = data.post_categories?.[0]?.category_id;
        
        if (catId) {
          const { data: pivotData } = await supabase
            .from("post_categories")
            .select("post_id")
            .eq("category_id", catId);
            
          if (pivotData) {
            const postIds = pivotData.map(p => p.post_id).filter(id => id !== data.id);
            if (postIds.length > 0) {
              const { data: related } = await supabase
                .from("posts")
                .select("*, post_categories(categories(name, slug)), authors(name)")
                .in("id", postIds)
                .eq("status", "published")
                .order("created_at", { ascending: false })
                .limit(2);
              if (related) relatedPosts = related;
            }
          }
        }

        return { post: data, related: relatedPosts };
      } catch (e) {
        const post = MOCK_POSTS.find(p => p.slug === slug);
        const related = MOCK_POSTS.filter(p => p.slug !== slug).slice(0, 2);
        return { post, related };
      }
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!postData?.post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col justify-center items-center p-4">
          <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
          <Link to="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar para o blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const { post, related } = postData;
  const category = post.post_categories?.[0]?.categories;
  const authorName = post.authors?.name || "Equipe Solvefy";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={post.title}
        description={post.excerpt || post.description || `Leia o artigo "${post.title}" no blog da Solvefy.`}
        canonical={`/blog/${post.slug}`}
        ogImage={post.cover_image || post.thumbnail || undefined}
      />
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-8 py-12 mt-8">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Voltar para o blog
          </Link>
          
          {category && (
            <Link 
              to={`/blog/categoria/${category.slug || category.name?.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-6 hover:bg-primary/20 transition-colors"
            >
              {category.name}
            </Link>
          )}

          <h1 className="text-3xl md:text-5xl tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-8 border-b border-border">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {authorName}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
            {post.reading_time && (
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.reading_time} min de leitura</span>
            )}
          </div>
        </div>

        {(post.og_image || post.cover_image) && (
          <div className="mb-12 rounded-2xl overflow-hidden aspect-video bg-muted border border-border">
            <img 
              src={post.og_image || post.cover_image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <article 
          className="prose prose-slate prose-lg dark:prose-invert max-w-none mb-24
            prose-headings:font-light prose-headings:tracking-tight
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:border prose-img:border-border"
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />

        {related && related.length > 0 && (
          <div className="border-t border-border pt-16 mb-8">
            <h2 className="mb-8">Artigos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((p, i) => {
                const pCat = p.post_categories?.[0]?.categories;
                return (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <Link to={`/blog/${p.slug}`} className="relative h-48 overflow-hidden rounded-t-2xl block">
                      {p.og_image || p.cover_image ? (
                        <img
                          src={p.og_image || p.cover_image}
                          alt={p.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                          <span className="text-muted-foreground font-medium text-xs">Sem Imagem</span>
                        </div>
                      )}
                      {pCat && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground">
                            {pCat.name}
                          </span>
                        </div>
                      )}
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <Link to={`/blog/${p.slug}`} className="block mb-3">
                        <h3 className="text-lg font-bold tracking-tight leading-tight group-hover:text-primary transition-colors text-balance line-clamp-2">
                          {p.title}
                        </h3>
                      </Link>
                      <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(p.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
