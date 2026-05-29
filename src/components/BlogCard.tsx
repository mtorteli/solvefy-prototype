import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/i18n/useLocale";

interface BlogCardProps {
  post: any;
  index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
  const { t, i18n } = useTranslation("blog");
  const { localizedPath } = useLocale();

  const category =
    post.post_categories?.[0]?.categories || post.post_categories;
  const authorName = post.authors?.name || t("common.defaultAuthor");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-2xl bg-background border border-border overflow-hidden flex flex-col transition-all duration-300"
    >
      <Link
        to={localizedPath(`/blog/${post.slug}`)}
        className="relative aspect-video overflow-hidden rounded-t-2xl block"
      >
        {post.og_image || post.cover_image ? (
          <img
            src={post.og_image || post.cover_image}
            alt={post.title}
            width="800"
            height="450"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <span className="text-muted-foreground font-medium">
              {t("common.noImage")}
            </span>
          </div>
        )}
        {category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground">
              {category.name || category.label || t("common.articleBadge")}
            </span>
          </div>
        )}
      </Link>
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <Link to={localizedPath(`/blog/${post.slug}`)} className="block mb-3">
          <h3 className="text-lg md:text-xl font-regular tracking-tight leading-tight text-[#000000] transition-colors text-balance">
            {post.title}
          </h3>
        </Link>
        <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {authorName}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.created_at).toLocaleDateString(i18n.language)}
          </span>
        </div>
      </div>
    </motion.article>
  );
};
