import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogClient } from "seobot";
import { Skeleton } from "@/components/ui/skeleton";
import HighlightCode from "@/components/blog/HighlightCode";
import type { Article } from "@/types/seobot";
import { SEO } from "@/components/SEO";
import "../styles/blog.css";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const key = import.meta.env.VITE_SEOBOT_API_KEY;
        if (!key) throw new Error("VITE_SEOBOT_API_KEY must be set");

        const client = new BlogClient(key);
        const result = await client.getArticle(slug);
        console.log('Article data:', result);
        console.log('HTML property:', result.html);
        console.log('HTML type:', typeof result.html);
        setPost(result as unknown as Article);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen parchment-bg">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-8 rounded-lg" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen parchment-bg flex items-center justify-center">
        <div className="text-center">
          <i className="fa-solid fa-scroll text-6xl text-fantasy-gold mb-4"></i>
          <h1 className="text-4xl font-medieval text-stone-gray mb-4">Scroll Not Found</h1>
          <p className="text-stone-gray-light mb-6">This ancient text has been lost to time...</p>
          <Link to="/blog" className="px-6 py-3 bg-fantasy-gold text-stone-gray font-bold rounded-lg hover:bg-fantasy-gold-hover transition-all duration-300 inline-block">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <div className="min-h-screen parchment-bg">
      <SEO 
        title={`${post.headline} - Deepwriter AI Blog`}
        description={post.metaDescription}
        canonical={`https://yourdomain.com/blog/${post.slug}`}
        ogImage={post.image || undefined}
      />
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-sm">
          <Link to="/" className="hover:text-fantasy-gold transition-colors text-stone-gray-light">
            <i className="fa-solid fa-dragon mr-1"></i> Home
          </Link>
          <span className="text-fantasy-gold">›</span>
          <Link to="/blog" className="hover:text-fantasy-gold transition-colors text-stone-gray-light">Blog</Link>
          {post.category && (
            <>
              <span className="text-fantasy-gold">›</span>
              <Link 
                to={`/blog/category/${post.category.slug}`}
                className="hover:text-fantasy-gold transition-colors text-stone-gray-light"
              >
                {post.category.title}
              </Link>
            </>
          )}
        </div>

        {/* Article Header */}
        <article className="bg-white/80 rounded-lg shadow-xl border-2 border-scroll-dark overflow-hidden">
          {/* Hero Image */}
          {post.image && (
            <div className="relative h-96">
              <img 
                src={post.image} 
                alt={post.headline}
                className="w-full h-full object-cover"
              />
              {post.category && (
                <div className="absolute top-6 left-6">
                  <span className="bg-gradient-to-r from-fantasy-purple to-fantasy-purple-dark text-white text-sm px-4 py-2 rounded-full font-bold">
                    {post.category.title}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-medieval text-fantasy-purple-dark mb-6 leading-tight">
              {post.headline}
            </h1>
            
            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b-2 border-scroll-dark">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-calendar text-fantasy-gold"></i>
                <time className="text-sm text-stone-gray-light">{formattedDate}</time>
              </div>
            </div>

            {/* Article Content */}
            <div className="article prose prose-lg max-w-none">
              <HighlightCode>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
              </HighlightCode>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t-2 border-scroll-dark">
                <h3 className="text-xl font-medieval text-fantasy-purple-dark mb-4">
                  <i className="fa-solid fa-tags mr-2"></i>
                  Related Tags
                </h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <Link 
                      key={tag.slug}
                      to={`/blog/tag/${tag.slug}`}
                      className="inline-block bg-fantasy-purple/20 hover:bg-fantasy-purple/30 text-fantasy-purple-dark border border-fantasy-purple/30 rounded-full px-4 py-2 transition-all duration-300 font-bold text-sm"
                    >
                      #{tag.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 bg-fantasy-purple text-white px-8 py-4 rounded-lg hover:bg-fantasy-purple-dark transition-all duration-300 transform hover:scale-105 font-bold"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Back to All Chronicles
          </Link>
        </div>
      </div>
    </div>
  );
}
