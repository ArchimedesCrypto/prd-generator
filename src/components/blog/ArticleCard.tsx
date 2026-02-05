import { Link } from "react-router-dom";
import type { ArticleIndex } from "@/types/seobot";

interface ArticleCardProps {
  article: ArticleIndex;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <li className="mb-8 list-none">
      <Link to={`/blog/${article.slug}`} className="group flex flex-col md:flex-row gap-6 p-6 bg-stone-gray/50 hover:bg-stone-gray/70 border-2 border-scroll-dark rounded-lg transition-all duration-300 hover:shadow-glowing-gold">
        <img 
          src={article.image} 
          alt={article.headline}
          className="w-full md:w-56 h-40 object-cover rounded-lg border-2 border-fantasy-gold/30"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-medieval mb-3 text-white group-hover:text-fantasy-gold transition-colors">
            {article.headline}
          </h2>
          <p className="text-gray-300 mb-3 line-clamp-2">{article.metaDescription}</p>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-scroll text-fantasy-gold text-sm"></i>
            <time className="text-sm text-gray-400">{formattedDate}</time>
          </div>
        </div>
      </Link>
    </li>
  );
}
