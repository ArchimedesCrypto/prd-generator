import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { BlogClient } from "seobot";
import { Skeleton } from "@/components/ui/skeleton";
import type { ArticleIndex } from "@/types/seobot";
import { SEO } from "@/components/SEO";
import { 
  Search, 
  Sparkles, 
  Filter, 
  ArrowDownWideNarrow, 
  ArrowRight, 
  FileText, 
  Layers, 
  Bolt, 
  Smartphone,
  ListChecks,
  Book,
  MessageSquare,
  Share2,
  Target,
  Users,
  LineChart,
  Star,
  SquarePen,
  RotateCcw,
  Mail,
  Check,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const mainArticles = articles.slice(2);

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-neutral-900">
      <SEO 
        title="Blog - PRD Hub | Master the art of writing exceptional PRDs"
        description="Explore our curated collection of articles, guides, and resources designed to help product managers create clear, comprehensive, and actionable product requirement documents."
        canonical="https://prdgenerator.io/blog"
      />

      {/* Header */}
      <header id="header" className="border-b border-neutral-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="text-white w-4 h-4" />
                </div>
                <span className="text-neutral-900 font-semibold text-lg">PRD Hub</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-1">
                <Link to="/blog" className="px-3 py-2 text-sm font-medium text-neutral-900 bg-neutral-100 rounded-lg">Blog</Link>
                <a href="#" className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition">Resources</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition">Templates</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition">Guides</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition">Community</a>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition">
                <Search className="w-4 h-4" />
              </button>
              <Link to="/auth">
                <button className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition">
                  Sign in
                </button>
              </Link>
              <Link to="/auth">
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition shadow-sm">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero-section" className="bg-gradient-to-b from-neutral-50 to-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6">
                <Sparkles className="w-3 h-3" />
                <span>Best Practices & Insights</span>
              </div>
              <h1 className="text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                Master the art of writing<br/>exceptional PRDs
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Explore our curated collection of articles, guides, and resources designed to help product managers create clear, comprehensive, and actionable product requirement documents.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input type="text" placeholder="Search articles..." className="w-full pl-11 pr-4 py-6 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm" />
                </div>
                <Button className="px-6 py-6 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition shadow-sm">
                  Browse All
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section id="filter-section" className="border-b border-neutral-100 bg-white sticky top-[73px] z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg transition shadow-sm">
                  All Topics
                </button>
                <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition">
                  Fundamentals
                </button>
                <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition">
                  Templates
                </button>
                <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition">
                  Case Studies
                </button>
                <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition">
                  Tools
                </button>
                <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition">
                  Research
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300 rounded-lg transition">
                  <Filter className="w-3 h-3" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300 rounded-lg transition">
                  <ArrowDownWideNarrow className="w-3 h-3" />
                  <span>Sort</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section id="featured-articles" className="bg-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-neutral-900">Featured Articles</h2>
              <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center space-x-1">
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-[500px] rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <article key={article.id} className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-neutral-300 transition-all duration-300">
                    <Link to={`/blog/${article.slug}`}>
                      <div className="h-64 bg-neutral-100 overflow-hidden">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={article.image} alt={article.headline} />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          {article.category && (
                            <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">{article.category.title}</span>
                          )}
                          <span className="text-xs text-neutral-400">•</span>
                          <span className="text-xs text-neutral-500">12 min read</span>
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary transition">
                          {article.headline}
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {article.metaDescription}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
                              <Users className="w-4 h-4 text-neutral-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-neutral-900">Sarah Chen</p>
                              <p className="text-xs text-neutral-500">Product Lead</p>
                            </div>
                          </div>
                          <span className="text-xs text-neutral-400">
                            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Main Articles Grid */}
        <section id="main-articles-grid" className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-[400px] rounded-xl" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {mainArticles.map((article) => (
                    <article key={article.id} className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-neutral-300 transition-all duration-300">
                      <Link to={`/blog/${article.slug}`}>
                        <div className="h-48 bg-neutral-100 overflow-hidden">
                          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={article.image} alt={article.headline} />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center space-x-2 mb-3">
                            {article.category && (
                              <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-md">{article.category.title}</span>
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
                            <span className="text-xs text-neutral-400">
                              {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                {lastPage > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-2">
                      {page > 0 && (
                        <Link
                          to={`/blog?page=${page}`}
                          className="px-6 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-sm font-medium"
                        >
                          Previous
                        </Link>
                      )}
                      {page < lastPage - 1 && (
                        <Link
                          to={`/blog?page=${page + 2}`}
                          className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm font-medium"
                        >
                          Next Page
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates-section" className="bg-neutral-50 border-y border-neutral-100">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">PRD Templates & Frameworks</h2>
                <p className="text-neutral-600">Ready-to-use templates to jumpstart your documentation</p>
              </div>
              <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center space-x-1">
                <span>Browse templates</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg hover:border-neutral-300 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <FileText className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Basic PRD Template</h3>
                <p className="text-sm text-neutral-600 mb-4">A simple, straightforward template for standard product requirements documentation.</p>
                <div className="flex items-center space-x-2 text-xs text-neutral-500">
                  <Download className="w-3 h-3" />
                  <span>2.4k downloads</span>
                </div>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg hover:border-neutral-300 transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition">
                  <Layers className="text-purple-700 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Enterprise PRD</h3>
                <p className="text-sm text-neutral-600 mb-4">Comprehensive template for large-scale enterprise product development initiatives.</p>
                <div className="flex items-center space-x-2 text-xs text-neutral-500">
                  <Download className="w-3 h-3" />
                  <span>1.8k downloads</span>
                </div>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg hover:border-neutral-300 transition-all duration-300 group">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition">
                  <Bolt className="text-emerald-700 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Agile PRD Lite</h3>
                <p className="text-sm text-neutral-600 mb-4">Streamlined template optimized for agile development and rapid iteration cycles.</p>
                <div className="flex items-center space-x-2 text-xs text-neutral-500">
                  <Download className="w-3 h-3" />
                  <span>3.1k downloads</span>
                </div>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg hover:border-neutral-300 transition-all duration-300 group">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition">
                  <Smartphone className="text-orange-700 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Mobile App PRD</h3>
                <p className="text-sm text-neutral-600 mb-4">Specialized template for mobile application development with platform-specific sections.</p>
                <div className="flex items-center space-x-2 text-xs text-neutral-500">
                  <Download className="w-3 h-3" />
                  <span>1.9k downloads</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Essential Resources */}
        <section id="resources-library" className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Essential Resources</h2>
              <p className="text-neutral-600">Curated tools, checklists, and guides for product managers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <ListChecks className="text-primary w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">PRD Checklist</h3>
                    <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                      A comprehensive 47-point checklist covering every essential element of a well-structured PRD. Ensure you never miss critical requirements or specifications.
                    </p>
                    <button className="inline-flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary/80">
                      <span>Download checklist</span>
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <Book className="text-purple-700 w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">PRD Writing Guide</h3>
                    <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                      Complete 120-page guide covering everything from basic principles to advanced techniques. Includes real-world examples and best practices from industry leaders.
                    </p>
                    <button className="inline-flex items-center space-x-2 text-sm font-medium text-purple-700 hover:text-purple-900">
                      <span>Get the guide</span>
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <MessageSquare className="text-emerald-700 w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">Stakeholder Interview Kit</h3>
                    <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                      Pre-written interview questions and frameworks to gather comprehensive requirements from diverse stakeholders across your organization.
                    </p>
                    <button className="inline-flex items-center space-x-2 text-sm font-medium text-emerald-700 hover:text-emerald-900">
                      <span>Access interview kit</span>
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <Share2 className="text-orange-700 w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">PRD Examples Library</h3>
                    <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                      Collection of 25+ real PRDs from successful products at companies like Google, Amazon, and Spotify. Learn from the best in the industry.
                    </p>
                    <button className="inline-flex items-center space-x-2 text-sm font-medium text-orange-700 hover:text-orange-900">
                      <span>Browse examples</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="bg-neutral-50 border-y border-neutral-100">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-3">PRD Best Practices</h2>
              <p className="text-neutral-600 leading-relaxed">
                Key principles and proven methodologies that separate exceptional PRDs from mediocre ones. These practices are distilled from hundreds of successful product launches.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="text-primary w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Start with the Problem</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Always begin by clearly articulating the user problem or business opportunity. A well-defined problem statement is the foundation of every great PRD.
                </p>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-purple-700 w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Know Your Audience</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Tailor your PRD's detail level and technical depth based on who will read it. Engineers need different information than executives or designers.
                </p>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <LineChart className="text-emerald-700 w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Define Success Metrics</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Establish clear, measurable success criteria upfront. Specify exactly how you'll know if the product achieves its intended goals and impact.
                </p>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="text-orange-700 w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Prioritize Ruthlessly</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Use frameworks like MoSCoW or RICE to clearly distinguish must-haves from nice-to-haves. Help your team focus on what truly matters for launch.
                </p>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <SquarePen className="text-blue-700 w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Be Specific and Actionable</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Avoid vague language and ambiguous requirements. Every specification should be clear enough that different team members interpret it the same way.
                </p>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <RotateCcw className="text-red-700 w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Iterate and Update</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Treat your PRD as a living document. Update it as you learn more through development, testing, and stakeholder feedback throughout the project lifecycle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community-section" className="bg-gradient-to-br from-primary/5 to-primary/10 border-y border-primary/20">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
                <Users className="text-primary w-4 h-4" />
                <span className="text-sm font-medium text-neutral-700">Join 15,000+ Product Managers</span>
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Connect with the PRD Community
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Share your experiences, ask questions, and learn from fellow product managers in our active community forum. Get feedback on your PRDs and discover new approaches.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <button className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition shadow-sm">
                  Join Community
                </button>
                <button className="px-6 py-3 bg-white text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 border border-neutral-200 transition">
                  Browse Discussions
                </button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">15k+</div>
                  <div className="text-sm text-neutral-600">Community Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">2.5k+</div>
                  <div className="text-sm text-neutral-600">Discussions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-neutral-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter-section" className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="bg-neutral-900 rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-12">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-full mb-6">
                    <Mail className="w-3 h-3" />
                    <span>Weekly Newsletter</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Stay updated with PRD insights
                  </h2>
                  <p className="text-neutral-300 leading-relaxed mb-8">
                    Get weekly tips, templates, and best practices delivered to your inbox. Join 12,000+ product managers who trust our newsletter.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center space-x-3 text-neutral-300">
                      <Check className="text-primary w-4 h-4" />
                      <span className="text-sm">Weekly PRD tips and tricks</span>
                    </div>
                    <div className="flex items-center space-x-3 text-neutral-300">
                      <Check className="text-primary w-4 h-4" />
                      <span className="text-sm">Exclusive templates and resources</span>
                    </div>
                    <div className="flex items-center space-x-3 text-neutral-300">
                      <Check className="text-primary w-4 h-4" />
                      <span className="text-sm">Industry news and trends</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Input type="email" placeholder="Enter your email" className="flex-1 px-4 py-6 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    <Button className="px-6 py-6 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition shadow-sm whitespace-nowrap">
                      Subscribe
                    </Button>
                  </div>
                </div>
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20"></div>
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8204cade1b-9502fe3851cdc37e10bd.png" alt="newsletter subscription" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-neutral-900 text-white border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="text-white w-4 h-4" />
                </div>
                <span className="text-white font-semibold text-lg">PRD Hub</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Your comprehensive resource for mastering product requirement documents. Created by product managers, for product managers.
              </p>
              <div className="flex items-center space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link to="/blog" className="text-neutral-400 hover:text-white text-sm transition">Blog</Link></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Templates</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Guides</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Case Studies</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Tools</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">About</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Careers</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Community</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Contact</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Privacy Policy</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Terms of Service</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Cookie Policy</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">GDPR</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between">
            <p className="text-neutral-400 text-sm">© 2024 PRD Hub. All rights reserved.</p>
            <p className="text-neutral-500 text-xs mt-4 md:mt-0">Built with care for the product management community</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
