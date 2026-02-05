import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { BlogClient } from "seobot";
import { Skeleton } from "@/components/ui/skeleton";
import type { ArticleIndex } from "@/types/seobot";
import { SEO } from "@/components/SEO";

export default function Blog() {
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState<ArticleIndex[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const page = Math.max(parseInt(searchParams.get("page") || "1") - 1, 0);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const key = import.meta.env.VITE_SEOBOT_API_KEY;
        if (!key) throw new Error("VITE_SEOBOT_API_KEY must be set");

        const client = new BlogClient(key);
        const result = await client.getArticles(page, 9);
        setArticles(result.articles || []);
        setTotal(result.total || 0);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  const lastPage = Math.ceil(total / 9);
  const featuredArticles = articles.slice(0, 2);
  const recentArticles = articles.slice(2);

  return (
    <main className="min-h-screen">
      <SEO 
        title="Blog - Deepwriter AI | AI Document Generation Tips & Guides"
        description="Read our blog for tips, guides, and insights about AI document generation. Learn how to create better documents with Deepwriter AI."
        canonical="https://yourdomain.com/blog"
      />
      {/* Hero Section */}
      <section className="relative h-[500px] flex flex-col items-center justify-center text-white overflow-hidden bg-primary">
        <div className="z-10 text-center px-4 max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Deepwriter AI <span className="text-primary-foreground/80">Blog</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-primary-foreground/80">
            Tips, guides, and insights about AI document generation
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Featured Articles</h2>
          <p className="text-lg max-w-3xl mx-auto mb-16 text-center text-muted-foreground">
            Essential reading for document generation
          </p>
          
          {loading ? (
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-[500px] rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto mb-16">
              {featuredArticles.map((article) => (
                <Link 
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="group bg-card rounded-lg shadow-xl border overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative h-64">
                    <img 
                      src={article.image} 
                      alt={article.headline}
                      className="w-full h-full object-cover"
                    />
                    {article.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full font-bold">
                          {article.category.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {article.headline}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{article.metaDescription}</p>
                    <div className="flex items-center justify-between">
                      <time className="text-sm text-muted-foreground">
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                      </time>
                      <span className="bg-primary text-primary-foreground px-6 py-2 rounded-lg group-hover:bg-primary/90 transition-colors font-bold">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-24 bg-secondary border-t">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Articles</h2>
              <p className="text-lg text-muted-foreground">Recent updates and insights</p>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[400px] rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="group bg-card rounded-lg shadow-lg border overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative h-48">
                    <img 
                      src={article.image} 
                      alt={article.headline}
                      className="w-full h-full object-cover"
                    />
                    {article.category && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
                          {article.category.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.headline}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.metaDescription}</p>
                    <div className="flex items-center justify-between">
                      <time className="text-xs text-muted-foreground">
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                      </time>
                      <span className="text-primary group-hover:text-primary/70 transition-colors">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && lastPage > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                {page > 0 && (
                  <Link
                    to={`/blog?page=${page}`}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-bold"
                  >
                    ← Previous
                  </Link>
                )}
                {page < lastPage - 1 && (
                  <Link
                    to={`/blog?page=${page + 2}`}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-bold"
                  >
                    Next →
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
