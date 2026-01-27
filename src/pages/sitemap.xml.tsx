import type { GetServerSideProps } from 'next';

/**
 * Dynamic XML Sitemap Generator
 * Generates sitemap for all products and static pages
 */
const Sitemap = () => {
  // This component won't render, getServerSideProps handles everything
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  // Fetch all products for dynamic routes
  let products: any[] = [];
  try {
    const productsRes = await fetch(`${baseUrl}/api/products`);
    if (productsRes.ok) {
      products = await productsRes.json();
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  // Static pages
  const staticPages = [
    '',
    '/products',
    '/about',
    '/help',
    '/privacy',
    '/terms',
    '/blog',
    '/how-to-choose-perfect-home-fragrance',
    '/benefits-of-smart-scent-diffusers',
    '/scenting-for-every-room',
    '/how-premium-diffusers-affect-mood-productivity',
    '/ultimate-guide-aroma-diffuser-machine-luxury-scenting',
    '/luxury-scenting-high-end-aroma-diffuser-machine-guide',
  ];

  // Generate product URLs
  const productPages = products.map((product) => `/product/${product.id || product._id}`);

  // Combine all URLs
  const allPages = [...staticPages, ...productPages];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages
      .map((url) => {
        // Determine priority based on page type
        let priority = '0.7';
        let changeFreq = 'monthly';

        if (url === '') {
          priority = '1.0';
          changeFreq = 'daily';
        } else if (url.startsWith('/product/')) {
          priority = '0.8';
          changeFreq = 'weekly';
        } else if (url === '/blog' || url.startsWith('/how-') || url.startsWith('/benefits-') || url.startsWith('/scenting-') || url.startsWith('/ultimate-guide-') || url.startsWith('/luxury-scenting-')) {
          priority = '0.8';
          changeFreq = 'monthly';
        } else if (url === '/products') {
          priority = '0.9';
          changeFreq = 'weekly';
        }

        return `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
      })
      .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;

