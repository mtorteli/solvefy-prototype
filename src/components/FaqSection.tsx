import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { faqSchema, type FaqItem } from "@/lib/schemas";

interface FaqSectionProps {
  /** Título visível da seção (ex: "Perguntas frequentes"). */
  title?: string;
  /** Subtítulo opcional acima do acordeão. */
  description?: string;
  /** Lista de Q&A — também injeta FAQPage schema. */
  items: FaqItem[];
  /** ID do `<section>` (para skip-link / âncoras). */
  id?: string;
  /** Classe CSS extra do container. */
  className?: string;
}

/**
 * Seção FAQ acessível e citável por LLMs.
 *
 * Usa `<details>`/`<summary>` nativo (não-JS-dependent → o conteúdo é
 * visível para crawlers de IA mesmo sem JavaScript) e injeta
 * `<script type="application/ld+json">` com schema FAQPage.
 */
export function FaqSection({
  title = "Perguntas frequentes",
  description,
  items,
  id = "perguntas-frequentes",
  className,
}: FaqSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      id={id}
      className={["py-16 md:py-24", className].filter(Boolean).join(" ")}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema(items))}
        </script>
      </Helmet>

      <div className="container mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </header>

        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-border bg-card px-6 py-4 transition-colors open:border-primary/40 open:bg-primary/5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-base md:text-lg">
                <span>{item.question}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="mt-3 text-muted-foreground leading-relaxed text-sm md:text-base">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
