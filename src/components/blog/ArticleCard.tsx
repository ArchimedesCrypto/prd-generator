import { Link } from "react-router-dom";
import type { ArticleIndex } from "@/types/seobot";
import { Users } from "lucide-react";

interface ArticleCardProps {
  article: ArticleIndex;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  }) : '';

  return (
    <article className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-neutral-300 transition-all duration-300">
      <Link to={`/blog/${article.slug}`}>
        <div className="h-48 bg-neutral-100 overflow-hidden">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            src={article.image} 
            alt={article.headline} 
          />
        </div>
        <div className="p-5">
          <div className="flex items-center space-x-2 mb-3">
            {article.category && (
              <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-md">
                {article.category.title}
              </span>
            )}
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs text-neutral-500">10 min read</span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary transition line-clamp-2">
            {article.headline}
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {article.metaDescription}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
                <Users className="w-3 h-3 text-neutral-500" />
              </div>
              <span className="text-xs font-medium text-neutral-700">Emma Wilson</span>
            </div>
            <span className="text-xs text-neutral-400">{formattedDate}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
