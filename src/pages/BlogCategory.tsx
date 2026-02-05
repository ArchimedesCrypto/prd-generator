import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { BlogClient } from "seobot";
import ArticleCard from "@/components/blog/ArticleCard";
import Pagination from "@/components/blog/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { ArticleIndex } from "@/types/seobot";
import { SEO } from "@/components/SEO";

function deslugify(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

export default function BlogCategory() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState<ArticleIndex[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const page = Math.max(parseInt(searchParams.get("page") || "1") - 1, 0);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const key = import.meta.env.VITE_SEOBOT_API_KEY;
        if (!key) throw new Error("VITE_SEOBOT_API_KEY must be set");

        const client = new BlogClient(key);
        const result = await client.getCategoryArticles(slug, page, 10);
        setArticles(result.articles || []);
        setTotal(result.total || 0);
      } catch (error) {
        console.error("Error fetching category articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [slug, page]);

  const lastPage = Math.ceil(total / 10);

  return (
    <div className="min-h-screen parchment-bg">
      {slug && (
        <SEO 
          title={`${deslugify(slug)} Category - Deepwriter AI Blog`}
          description={`Explore ${deslugify(slug)} articles and guides about AI document generation on the Deepwriter AI blog.`}
          canonical={`https://yourdomain.com/blog/category/${slug}`}
        />
      )}
      <div className="max-w-4xl my-8 lg:mt-10 mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="hover:text-fantasy-gold transition-colors text-stone-gray-light">
            <i className="fa-solid fa-dragon mr-1"></i> Home
          </Link>
          <span className="text-fantasy-gold">›</span>
          <Link to="/blog" className="hover:text-fantasy-gold transition-colors text-stone-gray-light">Blog</Link>
          <span className="text-fantasy-gold">›</span>
          <span className="text-stone-gray">{slug && deslugify(slug)}</span>
        </div>

        <h1 className="text-4xl md:text-5xl my-6 font-medieval text-fantasy-purple-dark">
          <i className="fa-solid fa-book-open mr-3"></i>
          {slug && deslugify(slug)}
        </h1>
        <p className="text-stone-gray-light mb-8">Explore articles in the {slug && deslugify(slug)} category</p>

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/80 rounded-lg shadow-lg border-2 border-scroll-dark p-6">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {!loading && lastPage > 1 && slug && (
          <Pagination basePath={`/blog/category/${slug}`} pageNumber={page} lastPage={lastPage} />
        )}
      </div>
    </div>
  );
}
