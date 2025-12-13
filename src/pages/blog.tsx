import Link from "next/link";
import Layout from "../layouts/Main";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";

// Blog post data structure
type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date?: string;
  category?: string;
};

// All blog posts
const blogPosts: BlogPost[] = [
  {
    slug: "/how-to-choose-perfect-home-fragrance",
    title: "How to Choose the Perfect Home Fragrance: A Guide to VenFurneer's Luxury Diffusers",
    description: "Discover how to choose the perfect home fragrance for your space. Learn about VenFurneer's luxury diffusers, room-specific scents, and cold-air technology for long-lasting aromatherapy.",
    excerpt: "Choosing a home fragrance is more than picking a pleasant smell — it's about setting the tone of your space. At VenFurneer, we design luxury diffusers that elevate everyday living into a sensory experience.",
    category: "Fragrance Guide",
  },
  {
    slug: "/benefits-of-smart-scent-diffusers",
    title: "Top 5 Benefits of Smart Scent Diffusers for Modern Homes & Offices",
    description: "Discover the top 5 benefits of smart scent diffusers for modern homes and offices. Learn about VenFurneer's cold-air technology, long-lasting performance, and health benefits.",
    excerpt: "Smart scent diffusers have revolutionized how we experience fragrance in our living and working spaces. Discover why VenFurneer diffusers are the perfect choice for modern homes and offices.",
    category: "Benefits",
  },
  {
    slug: "/scenting-for-every-room",
    title: "Scenting for Every Room: Best Fragrances for Living Room, Bedroom, Kitchen & Office",
    description: "Discover the best fragrances for each room in your home. Expert guide to choosing scents for living room, bedroom, kitchen, and office spaces with VenFurneer luxury diffusers.",
    excerpt: "Each space has a personality, and your fragrance should complement it. Discover the perfect scents for every room in your home and office.",
    category: "Room Guide",
  },
  {
    slug: "/how-premium-diffusers-affect-mood-productivity",
    title: "How Premium Diffusers Affect Mood and Productivity",
    description: "Discover how premium diffusers and fragrances affect mood and productivity. Learn about the science of scent and how VenFurneer's nano-mist technology enhances wellbeing.",
    excerpt: "Your brain reacts to scent faster than it reacts to sound or visuals. That's why a single whiff can change your mood instantly.",
    category: "Wellness",
  },
];

const Blog = () => {
  return (
    <Layout
      title="Blog - Expert Guides on Home Fragrance, Diffusers & Aromatherapy | VenFurneer"
      description="Explore our blog for expert guides on home fragrance, luxury diffusers, aromatherapy benefits, and room-specific scenting tips. Learn how to transform your space with VenFurneer."
      canonical="/blog"
      keywords={[
        "home fragrance blog",
        "diffuser guides",
        "aromatherapy tips",
        "scenting advice",
        "luxury diffusers blog",
        "home fragrance articles",
        "room fragrance guides",
        "VenFurneer blog",
      ]}
    >
      <Breadcrumb />
      <section className="content-page">
        <div className="container">
          <header className="content-header" style={{ marginBottom: "60px" }}>
            <h1>Blog</h1>
            <p className="content-intro">
              Discover expert guides, tips, and insights on home fragrance, luxury diffusers, and aromatherapy. 
              Learn how to transform your space with the perfect scents.
            </p>
          </header>

          <div className="blog-list" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
            marginTop: "40px",
          }}>
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="blog-card"
                style={{
                  background: "#FFF",
                  borderRadius: "12px",
                  border: "1px solid #E5E5E5",
                  padding: "30px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Link href={post.slug} style={{ textDecoration: "none", color: "inherit" }}>
                  {post.category && (
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#666",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "12px",
                      }}
                    >
                      {post.category}
                    </div>
                  )}
                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: "600",
                      color: "#333",
                      marginBottom: "12px",
                      lineHeight: "1.4",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#666",
                      lineHeight: "1.6",
                      marginBottom: "20px",
                      fontFamily: "'Lato', sans-serif",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#333",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Read More
                    <span style={{ fontSize: "12px" }}>→</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Blog;

