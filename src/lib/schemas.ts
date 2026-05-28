/**
 * Helpers para emitir blocos JSON-LD do Schema.org consistentes em todo o site.
 *
 * Todos os schemas referenciam a Organização via `@id` para que crawlers e LLMs
 * consigam costurar o grafo (a Organization é a "entidade-mãe"). Use sempre
 * `[organizationSchema(locale), websiteSchema(locale)]` no array `schemas` da
 * home, e `breadcrumbSchema(items, locale)` em todas as páginas internas.
 *
 * O `locale` controla:
 * - `inLanguage` em cada schema;
 * - URLs (canonical + IDs) — versões EN/ES ganham prefixo `/en` ou `/es`.
 */

import {
  DEFAULT_LOCALE,
  HREFLANG,
  Locale,
  localizePath,
} from "@/i18n/locales";

export const SITE_URL = "https://solvefy.com";

const DESCRIPTIONS: Record<Locale, string> = {
  "pt-BR":
    "Ecossistema brasileiro de tecnologia que unifica soluções de comunicação multicanal, marketing, CRM, agentes de IA e cloud para gerar performance real às empresas B2B.",
  en: "Brazilian technology ecosystem that unifies multichannel communication, marketing, CRM, AI agents and cloud solutions to deliver real performance to B2B companies.",
  es: "Ecosistema brasileño de tecnología que unifica soluciones de comunicación multicanal, marketing, CRM, agentes de IA y cloud para generar desempeño real a las empresas B2B.",
};

const SLOGANS: Record<Locale, string> = {
  "pt-BR": "+Perto. +Rápido. Melhor.",
  en: "Closer. Quicker. Better.",
  es: "+Cerca. +Rápido. Mejor.",
};

const AREA_SERVED: Record<Locale, string> = {
  "pt-BR": "Brasil",
  en: "Brazil",
  es: "Brasil",
};

export const SOLVEFY_ORG = {
  name: "Solvefy",
  legalName: "Solvefy",
  url: SITE_URL,
  logoUrl: `${SITE_URL}/favicon-512x512.png`,
  /** CNPJ público do rodapé. */
  taxID: "35.693.806/0001-97",
  /** Endereço da sede. */
  streetAddress: "Rua Manoel de Oliveira Ramos, 205",
  addressLocality: "Estreito",
  addressRegion: "SC",
  addressCountry: "BR",
  addressArea: "Florianópolis",
  sameAs: [
    "https://www.instagram.com/solvefy__",
    "https://www.linkedin.com/company/brasilfonetelecom/",
  ] as string[],
} as const;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type JsonLd = Record<string, unknown>;

function absUrl(path: string, locale: Locale): string {
  const localized = localizePath(path, locale);
  return `${SITE_URL}${localized || "/"}`;
}

export function organizationSchema(locale: Locale = DEFAULT_LOCALE): JsonLd {
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
    description: DESCRIPTIONS[locale],
    slogan: SLOGANS[locale],
    taxID: SOLVEFY_ORG.taxID,
    address: {
      "@type": "PostalAddress",
      streetAddress: SOLVEFY_ORG.streetAddress,
      addressLocality: SOLVEFY_ORG.addressArea,
      addressRegion: SOLVEFY_ORG.addressRegion,
      addressCountry: SOLVEFY_ORG.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        areaServed: "BR",
        availableLanguage: ["pt-BR", "en", "es"],
        url: absUrl("/contato", locale),
      },
    ],
    ...(SOLVEFY_ORG.sameAs.length > 0 ? { sameAs: SOLVEFY_ORG.sameAs } : {}),
  };
}

export function websiteSchema(locale: Locale = DEFAULT_LOCALE): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absUrl("/", locale),
    name: SOLVEFY_ORG.name,
    description: DESCRIPTIONS[locale],
    inLanguage: HREFLANG[locale],
    publisher: { "@id": ORG_ID },
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Path relativo SEM prefixo de locale, ex: "/cpaas". */
  path: string;
}

export function breadcrumbSchema(
  items: BreadcrumbItem[],
  locale: Locale = DEFAULT_LOCALE,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path, locale),
    })),
  };
}

export interface ServiceSchemaInput {
  /** Nome do serviço (ex: "Solvefy/CPaaS"). */
  name: string;
  /** Descrição em 1-2 frases. */
  description: string;
  /** Path relativo SEM prefixo de locale (ex: "/cpaas"). */
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

export function serviceSchema(
  input: ServiceSchemaInput,
  locale: Locale = DEFAULT_LOCALE,
): JsonLd {
  const url = absUrl(input.path, locale);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url,
    serviceType: input.serviceType,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: AREA_SERVED[locale] },
    inLanguage: HREFLANG[locale],
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
  /** Path relativo SEM prefixo de locale, ex: "/blog/slug-do-post". */
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  category?: string;
  wordCount?: number;
}

export function articleSchema(
  input: ArticleSchemaInput,
  locale: Locale = DEFAULT_LOCALE,
): JsonLd {
  const url = absUrl(input.path, locale);
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
    inLanguage: HREFLANG[locale],
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
