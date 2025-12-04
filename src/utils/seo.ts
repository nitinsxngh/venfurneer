/**
 * SEO Utility Functions
 * Comprehensive SEO metadata, structured data, and canonical URL helpers
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://venfurneer.com';
export const SITE_NAME = 'venfurneer';
export const SITE_DESCRIPTION = 'Premium luxury scent diffusers and essential oils for home and office. Elevate your space with bespoke fragrance experiences from venfurneer.';
export const DEFAULT_IMAGE = `${SITE_URL}/logo-venfurneer.png`;

export interface SEOData {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'product' | 'article';
    noindex?: boolean;
    keywords?: string[];
    structuredData?: object;
}

/**
 * Generate full page title with site name
 */
export const generateTitle = (pageTitle: string): string => {
    if (!pageTitle) return `${SITE_NAME} - Premium Scent Diffusers & Essential Oils`;
    return `${pageTitle} | ${SITE_NAME}`;
};

/**
 * Generate canonical URL
 */
export const generateCanonical = (path: string): string => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_URL}${cleanPath}`;
};

/**
 * Generate full image URL
 */
export const generateImageUrl = (imagePath: string): string => {
    if (!imagePath) return DEFAULT_IMAGE;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return `${SITE_URL}${imagePath}`;
    return `${SITE_URL}/${imagePath}`;
};

/**
 * Generate meta description (truncate if too long)
 */
export const generateDescription = (description?: string, maxLength: number = 160): string => {
    if (!description) return SITE_DESCRIPTION;
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength - 3) + '...';
};

/**
 * Organization Structured Data (JSON-LD)
 */
export const getOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: generateImageUrl('/logo-venfurneer.png'),
    description: SITE_DESCRIPTION,
    sameAs: [
        // Add social media links here
        // 'https://www.facebook.com/venfurneer',
        // 'https://www.instagram.com/venfurneer',
        // 'https://twitter.com/venfurneer',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'support@venfurneer.com',
    },
});

/**
 * Website Structured Data (JSON-LD)
 */
export const getWebsiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
    },
});

/**
 * Breadcrumb Structured Data (JSON-LD)
 */
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: generateCanonical(item.url),
    })),
});

/**
 * Product Structured Data (JSON-LD)
 */
export interface ProductSchemaData {
    name: string;
    description: string;
    image: string[];
    price: number;
    currency?: string;
    availability?: string;
    brand?: string;
    sku?: string;
    mpn?: string;
    category?: string;
    aggregateRating?: {
        ratingValue: number;
        reviewCount: number;
    };
    offers?: {
        price: number;
        priceCurrency: string;
        availability: string;
        url: string;
        priceValidUntil?: string;
    };
}

export const getProductSchema = (product: ProductSchemaData, url: string) => {
    const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image.map((img) => generateImageUrl(img)),
        brand: {
            '@type': 'Brand',
            name: product.brand || SITE_NAME,
        },
        category: product.category || 'Home Fragrance',
        url: generateCanonical(url),
    };

    if (product.sku) {
        schema.sku = product.sku;
    }

    if (product.mpn) {
        schema.mpn = product.mpn;
    }

    // Add aggregate rating if available
    if (product.aggregateRating) {
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: product.aggregateRating.ratingValue.toString(),
            reviewCount: product.aggregateRating.reviewCount.toString(),
        };
    }

    // Add offer
    if (product.offers) {
        schema.offers = {
            '@type': 'Offer',
            price: product.offers.price.toString(),
            priceCurrency: product.offers.priceCurrency || 'INR',
            availability: product.offers.availability || 'https://schema.org/InStock',
            url: generateCanonical(product.offers.url || url),
            ...(product.offers.priceValidUntil && {
                priceValidUntil: product.offers.priceValidUntil,
            }),
        };
    } else if (product.price) {
        schema.offers = {
            '@type': 'Offer',
            price: product.price.toString(),
            priceCurrency: product.currency || 'INR',
            availability: product.availability || 'https://schema.org/InStock',
            url: generateCanonical(url),
        };
    }

    return schema;
};

/**
 * Local Business Structured Data (if applicable)
 */
export const getLocalBusinessSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}#organization`,
    name: SITE_NAME,
    image: generateImageUrl('/logo-venfurneer.png'),
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: '+91-XXXXXXXXXX', // Update with actual phone number
    priceRange: '₹₹',
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressLocality: 'Mumbai', // Update with actual city
        addressRegion: 'Maharashtra', // Update with actual state
    },
});

/**
 * FAQ Structured Data (JSON-LD)
 */
export interface FAQItem {
    question: string;
    answer: string;
}

export const getFAQSchema = (faqs: FAQItem[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
});

/**
 * ItemList Structured Data (for product listings)
 */
export const getItemListSchema = (
    items: Array<{
        name: string;
        url: string;
        image?: string;
        description?: string;
    }>,
    name: string = 'Products',
) => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: generateCanonical(item.url),
        ...(item.image && { image: generateImageUrl(item.image) }),
        ...(item.description && { description: item.description }),
    })),
});

/**
 * CollectionPage Structured Data (for category pages)
 */
export const getCollectionPageSchema = (categoryName: string, products: any[]) => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryName} - ${SITE_NAME}`,
    description: `Browse our collection of ${categoryName.toLowerCase()} diffusers and home fragrances.`,
    url: generateCanonical(`/products?category=${categoryName.toLowerCase().replace(/\s+/g, '-')}`),
    mainEntity: {
        '@type': 'ItemList',
        itemListElement: products.slice(0, 10).map((product: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product',
                name: product.name,
                url: generateCanonical(`/product/${product.id}`),
                image: product.images?.[0] ? generateImageUrl(product.images[0]) : undefined,
            },
        })),
    },
});

