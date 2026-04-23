import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import blog2 from "@/assets/blog-2.png";
import blog3 from "@/assets/blog-3.png";
import blogSolvers from "@/assets/blog-solvers.png";

const posts = [
  {
    tag: "Institucional",
    title: "Venha pro time! Faça o teste de perfil e veja se você tem o espírito de um Solvers",
    author: "Dayany Gerhardt",
    date: "15 Abr 2026",
    image: blogSolvers,
  },
  {
    tag: "Performance",
    title: "5 estratégias de mídia paga conectadas ao CRM para escalar com previsibilidade",
    author: "Marina Costa",
    date: "28 Fev 2025",
    image: blog2,
  },
  {
    tag: "Cases",
    title: "WhatsApp Business API: o canal que está reescrevendo o relacionamento B2B",
    author: "Rafael Lima",
    date: "14 Fev 2025",
    image: blog3,
  },
];

export const Blog = () => {
  return (
    <section className="py-16 md:py-24 bg-card/40 border-y border-border">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.1]">
            Acompanhe nossos conteúdos!
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors group"
          >
            Ver Todos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer rounded-2xl bg-background border border-border overflow-hidden shadow-soft hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 md:h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground">
                    {p.tag}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-bold tracking-tight leading-tight mb-3 group-hover:text-primary transition-colors text-balance">
                  {p.title}
                </h3>
                <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{p.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{p.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
