import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  /** @deprecated use `schemas` */
  schema?: Record<string, unknown>;
  schemas?: Array<Record<string, unknown>>;
  noindex?: boolean;
  keywords?: string[];
}

const BASE_URL = "https://solvefy.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/og-default.jpg`;
const SITE_NAME = "Solvefy";
const TWITTER_HANDLE = "@Solvefy";

export function SEO({
  title,
  description,
  canonical,
  ogImage,
  schema,
  schemas,
  noindex,
  keywords,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const rawImage = ogImage ?? DEFAULT_OG_IMAGE;
  const image = rawImage.startsWith("http") ? rawImage : `${BASE_URL}${rawImage}`;

  const allSchemas = [
    ...(schemas ?? []),
    ...(schema ? [schema] : []),
  ];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1"
        }
      />

      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} — ${SITE_NAME}`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${title} — ${SITE_NAME}`} />

      {allSchemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
