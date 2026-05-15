/**
 * Helpers para emitir blocos JSON-LD do Schema.org consistentes em todo o site.
 *
 * Todos os schemas referenciam a Organização via `@id` para que crawlers e LLMs
 * consigam costurar o grafo (a Organization é a "entidade-mãe"). Use sempre
 * `[organizationSchema(), websiteSchema()]` no array `schemas` da home, e
 * `breadcrumbSchema(...)` em todas as páginas internas.
 */

export const SITE_URL = "https://solvefy.com";

export const SOLVEFY_ORG = {
  name: "Solvefy",
  legalName: "Solvefy",
  url: SITE_URL,
  logoUrl: `${SITE_URL}/favicon-512x512.png`,
  description:
    "Plataforma B2B brasileira de comunicação multicanal, CRM, automação de marketing, gestão de tráfego pago, agentes de IA e infraestrutura em nuvem.",
  /** CNPJ público do rodapé. */
  taxID: "35.693.806/0001-97",
  /** Cidade-sede informada no site. */
  addressLocality: "Florianópolis",
  addressRegion: "SC",
  addressCountry: "BR",
  /** Redes sociais. Footer atualmente tem `href="#"`; placeholders abaixo serão
   * substituídos quando o usuário fornecer URLs reais. */
  sameAs: [
    // "https://www.linkedin.com/company/solvefy",
    // "https://www.instagram.com/solvefy",
    // "https://www.facebook.com/solvefy",
    // "https://www.youtube.com/@solvefy",
  ] as string[],
} as const;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SOLVEFY_ORG.name,
    legalName: SOLVEFY_ORG.legalName,
    url: SOLVEFY_ORG.url,
    logo: {
      "@type": "ImageObject",
      url: SOLVEFY_ORG.logoUrl,
      width: 512,
      height: 512,
    },
    description: SOLVEFY_ORG.description,
    taxID: SOLVEFY_ORG.taxID,
    address: {
      "@type": "PostalAddress",
      addressLocality: SOLVEFY_ORG.addressLocality,
      addressRegion: SOLVEFY_ORG.addressRegion,
      addressCountry: SOLVEFY_ORG.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        areaServed: "BR",
        availableLanguage: ["pt-BR"],
        url: `${SITE_URL}/contato`,
      },
    ],
    ...(SOLVEFY_ORG.sameAs.length > 0 ? { sameAs: SOLVEFY_ORG.sameAs } : {}),
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SOLVEFY_ORG.name,
    description: SOLVEFY_ORG.description,
    inLanguage: "pt-BR",
    publisher: { "@id": ORG_ID },
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Path relativo, ex: "/cpaas" (a função prefixa com SITE_URL). */
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export interface ServiceSchemaInput {
  /** Nome do serviço (ex: "Solvefy/CPaaS"). */
  name: string;
  /** Descrição em 1-2 frases. */
  description: string;
  /** Path relativo da página de serviço (ex: "/cpaas"). */
  path: string;
  /** Categoria do serviço — corresponde a `serviceType` no Schema.org. */
  serviceType?: string;
  /** Faixa de preços, se aplicável. */
  offers?: {
    lowPrice?: string;
    highPrice?: string;
    priceCurrency?: string;
  };
}

export function serviceSchema(input: ServiceSchemaInput): JsonLd {
  const url = `${SITE_URL}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url,
    serviceType: input.serviceType,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Brasil" },
    inLanguage: "pt-BR",
    ...(input.offers
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: input.offers.priceCurrency ?? "BRL",
            ...(input.offers.lowPrice ? { lowPrice: input.offers.lowPrice } : {}),
            ...(input.offers.highPrice
              ? { highPrice: input.offers.highPrice }
              : {}),
            url,
          },
        }
      : {}),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  /** Path relativo, ex: "/blog/slug-do-post". */
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  category?: string;
  wordCount?: number;
}

export function articleSchema(input: ArticleSchemaInput): JsonLd {
  const url = `${SITE_URL}${input.path}`;
  const img = input.image.startsWith("http")
    ? input.image
    : `${SITE_URL}${input.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: input.title,
    description: input.description,
    image: [img],
    url,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: "pt-BR",
    author: {
      "@type": "Person",
      name: input.authorName,
      ...(input.authorUrl ? { url: input.authorUrl } : {}),
    },
    publisher: { "@id": ORG_ID },
    ...(input.category ? { articleSection: input.category } : {}),
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
  };
}
