export interface ArticleIndex {
  id: string;
  slug: string;
  headline: string;
  metaDescription: string;
  image: string;
  publishedAt?: string;
  category?: {
    title: string;
    slug: string;
  };
  tags?: Array<{
    title: string;
    slug: string;
  }>;
}

export interface Article {
  id: string;
  slug: string;
  headline: string;
  metaDescription: string;
  image: string;
  html: string;
  publishedAt?: string;
  category?: {
    title: string;
    slug: string;
  };
  tags?: Array<{
    title: string;
    slug: string;
  }>;
}
