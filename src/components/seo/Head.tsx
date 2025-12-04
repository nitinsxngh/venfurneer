import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { SEOData } from '@/utils/seo';
import {
  SITE_NAME,
  generateTitle,
  generateCanonical,
  generateImageUrl,
  generateDescription,
  getOrganizationSchema,
  getWebsiteSchema,
} from '@/utils/seo';

interface SEOHeadProps extends Omit<SEOData, 'structuredData' | 'description'> {
  description?: string;
  structuredData?: object | object[];
  children?: React.ReactNode;
}

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  keywords = [],
  structuredData,
  children,
}: SEOHeadProps) => {
  const router = useRouter();
  const fullTitle = useMemo(() => generateTitle(title), [title]);
  const metaDescription = useMemo(() => generateDescription(description), [description]);
  const canonicalUrl = useMemo(
    () => canonical || generateCanonical(router.asPath.split('?')[0]),
    [canonical, router.asPath]
  );
  const ogImageUrl = useMemo(() => generateImageUrl(ogImage || '/logo-venfurneer.png'), [ogImage]);

  // Default keywords for diffusers and fragrances
  const defaultKeywords = [
    'scent diffusers',
    'aroma diffusers',
    'essential oils',
    'home fragrances',
    'luxury diffusers',
    'room diffusers',
    'aromatherapy',
    'home scents',
    'fragrance diffusers',
    'reed diffusers',
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      {keywords.length > 0 && <meta name="keywords" content={allKeywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1a1a1a" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationSchema()),
        }}
      />

      {/* Structured Data - Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebsiteSchema()),
        }}
      />

      {/* Structured Data */}
      {structuredData && (
        <>
          {Array.isArray(structuredData) ? (
            structuredData.map((schema, index) => (
              <script
                key={`structured-data-${index}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(schema),
                }}
              />
            ))
          ) : (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData),
              }}
            />
          )}
        </>
      )}

      {children}
    </Head>
  );
};

export default SEOHead;

