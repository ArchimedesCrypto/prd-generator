import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import {
  FileText,
  Menu,
  X,
  Play, 
  Check, 
  Sparkles, 
  Flag, 
  Bolt, 
  Brain, 
  Users, 
  Wand2, 
  LineChart, 
  GitBranch, 
  Plug, 
  ArrowRight,
  Smartphone,
  Globe,
  Code,
  Palette,
  ShieldCheck,
  Bell,
  Rocket,
  Star,
  Plus,
  Twitter,
  Linkedin,
  Github,
  Youtube
} from "lucide-react";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SEO 
        title="PRD Generator - Build better products with intelligent PRDs"
        description="Transform your product ideas into comprehensive, structured PRDs in minutes. Built for modern product teams who move fast."
        canonical="https://prdgenerator.io"
      />
      
      {/* Navigation */}
      <nav id="header" className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-12">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="text-primary-foreground w-4 h-4" />
                </div>
                <span className="text-lg font-semibold tracking-tight">PRD Generator</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
                <a href="#workflow" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Workflow</a>
                <a href="#templates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Templates</a>
                <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
                <Button asChild className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-xl hover:bg-primary/90 transition-all shadow-sm">
                  <Link to="/auth">Get started</Link>
                </Button>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 z-20 bg-background border-b border-border p-6 md:hidden">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#workflow"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                Workflow
              </a>
              <a
                href="#templates"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                Templates
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Link
                to="/blog"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  to="/auth"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Button asChild className="w-full bg-primary text-primary-foreground" onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/auth">Get started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero-section" className="pt-32 pb-20 px-6 lg:px-8 min-h-[700px] flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-[#0284c7] rounded-full"></span>
                <span className="text-sm font-medium text-gray-700">Introducing AI-powered PRD generation</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Build better products<br/>with intelligent PRDs
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Transform your product ideas into comprehensive, structured PRDs in minutes. Built for modern product teams who move fast.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button asChild size="lg" className="bg-[#0284c7] text-white text-base font-medium px-6 py-3 rounded-xl hover:bg-[#0284c7]/90 transition-all shadow-lg shadow-[#0284c7]/20">
                  <Link to="/auth">Start writing for free</Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-white text-gray-700 text-base font-medium px-6 py-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
                  Watch demo
                  <Play className="ml-2 w-3 h-3 fill-current" />
                </Button>
              </div>
              <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Check className="text-[#0284c7] w-4 h-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="text-[#0284c7] w-4 h-4" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="text-[#0284c7] w-4 h-4" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Preview */}
        <section id="product-preview" className="py-20 px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl shadow-gray-200/50 border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-1.5 text-sm text-gray-600 max-w-md w-full">
                    app.prdgenerator.io/documents/new-mobile-feature
                  </div>
                </div>
              </div>
              <div className="p-12">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="w-10 h-10 bg-[#0284c7]/10 rounded-xl flex items-center justify-center">
                        <Sparkles className="text-[#0284c7] w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Product Requirement Document</h3>
                        <h2 className="text-2xl font-semibold">New Mobile Checkout Flow</h2>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Overview</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Redesign the mobile checkout experience to reduce cart abandonment by 35% and increase conversion rates through a streamlined, one-page checkout process.</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Success Metrics</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="text-2xl font-bold text-[#0284c7]">35%</div>
                            <div className="text-xs text-gray-500 mt-1">Cart abandonment</div>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="text-2xl font-bold text-[#0284c7]">2.5s</div>
                            <div className="text-xs text-gray-500 mt-1">Load time</div>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="text-2xl font-bold text-[#0284c7]">4.8</div>
                            <div className="text-xs text-gray-500 mt-1">User rating</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-80 space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-xs font-semibold text-gray-500 mb-3">Status</div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">In Progress</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-xs font-semibold text-gray-500 mb-3">Priority</div>
                      <div className="inline-flex items-center bg-red-50 text-red-700 text-sm font-medium px-3 py-1 rounded-lg">
                        <Flag className="mr-2 w-3 h-3" />
                        High
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-xs font-semibold text-gray-500 mb-3">Owner</div>
                      <div className="flex items-center space-x-2">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Owner" className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="text-sm font-medium">Sarah Chen</div>
                          <div className="text-xs text-gray-500">Product Manager</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section id="value-props" className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Why product teams choose us</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to create world-class product documentation, faster than ever before.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:shadow-gray-200/50 transition-all">
                <div className="w-12 h-12 bg-[#0284c7]/10 rounded-xl flex items-center justify-center mb-6">
                  <Bolt className="text-[#0284c7] w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning fast</h3>
                <p className="text-gray-600 leading-relaxed mb-6">Generate comprehensive PRDs in minutes, not hours. Our AI understands context and creates structured documents instantly.</p>
                <div className="flex items-center space-x-2 text-sm font-medium text-[#0284c7]">
                  <span>10x faster than manual writing</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:shadow-gray-200/50 transition-all">
                <div className="w-12 h-12 bg-[#0284c7]/10 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="text-[#0284c7] w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-powered intelligence</h3>
                <p className="text-gray-600 leading-relaxed mb-6">Smart suggestions for user stories, acceptance criteria, and edge cases based on industry best practices.</p>
                <div className="flex items-center space-x-2 text-sm font-medium text-[#0284c7]">
                  <span>Built on GPT-4 architecture</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:shadow-gray-200/50 transition-all">
                <div className="w-12 h-12 bg-[#0284c7]/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="text-[#0284c7] w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Built for collaboration</h3>
                <p className="text-gray-600 leading-relaxed mb-6">Real-time editing, comments, and version control. Keep your entire team aligned on product direction.</p>
                <div className="flex items-center space-x-2 text-sm font-medium text-[#0284c7]">
                  <span>Unlimited team members</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-6 lg:px-8 bg-secondary/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">Everything you need to ship faster</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Powerful features designed for modern product development workflows.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-background rounded-xl p-10 border border-border">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Wand2 className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">AI Template Library</h3>
                    <p className="text-muted-foreground leading-relaxed">Choose from dozens of pre-built templates for different product types, industries, and use cases. Customize to match your workflow.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                    <div className="text-sm font-medium text-foreground">Feature Launch</div>
                    <div className="text-xs text-muted-foreground mt-1">Complete PRD template</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                    <div className="text-sm font-medium text-foreground">API Design</div>
                    <div className="text-xs text-muted-foreground mt-1">Technical spec template</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                    <div className="text-sm font-medium text-foreground">Mobile App</div>
                    <div className="text-xs text-muted-foreground mt-1">Platform-specific PRD</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                    <div className="text-sm font-medium text-foreground">Redesign</div>
                    <div className="text-xs text-muted-foreground mt-1">UX improvement doc</div>
                  </div>
                </div>
              </div>
              <div className="bg-background rounded-xl p-10 border border-border">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <LineChart className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Smart Analytics</h3>
                    <p className="text-muted-foreground leading-relaxed">Track document engagement, completion rates, and team velocity. Understand what's working and what needs improvement.</p>
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 border border-border mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Document Health Score</span>
                    <span className="text-2xl font-bold text-primary">92%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completeness</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-[95%] h-full bg-primary rounded-full"></div>
                        </div>
                        <span className="text-foreground font-medium">95%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Clarity</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-[88%] h-full bg-primary rounded-full"></div>
                        </div>
                        <span className="text-foreground font-medium">88%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Feasibility</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-[93%] h-full bg-primary rounded-full"></div>
                        </div>
                        <span className="text-foreground font-medium">93%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-background rounded-xl p-10 border border-border">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GitBranch className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Version Control</h3>
                    <p className="text-muted-foreground leading-relaxed">Track every change with automatic versioning. Compare versions, restore previous states, and maintain a complete audit trail.</p>
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <div className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg border border-border">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs font-bold">v3</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Updated success metrics</div>
                      <div className="text-xs text-muted-foreground">2 hours ago by Sarah Chen</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg border border-border">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-xs font-bold">v2</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Added technical requirements</div>
                      <div className="text-xs text-muted-foreground">Yesterday by Alex Kim</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg border border-border">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-xs font-bold">v1</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Initial draft created</div>
                      <div className="text-xs text-muted-foreground">3 days ago by Sarah Chen</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-background rounded-xl p-10 border border-border">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Plug className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Seamless Integrations</h3>
                    <p className="text-muted-foreground leading-relaxed">Connect with your favorite tools. Sync with Jira, Linear, Notion, Slack, and 50+ other platforms your team already uses.</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="bg-secondary/50 rounded-lg p-4 border border-border flex items-center justify-center">
                    <Github className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 border border-border flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 border border-border flex items-center justify-center">
                    <Twitter className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 border border-border flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 border border-border flex items-center justify-center text-xs font-bold text-muted-foreground">+50</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section id="workflow" className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">How it works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">From idea to comprehensive PRD in three simple steps.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="relative">
                <div className="bg-white border border-gray-200 rounded-xl p-8 h-full">
                  <div className="w-12 h-12 bg-[#0284c7] text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6">1</div>
                  <h3 className="text-2xl font-semibold mb-4">Describe your idea</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">Tell us about your product feature in plain English. No need for complex formatting or structure.</p>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-xs font-medium text-gray-500 mb-2">Example input:</div>
                    <div className="text-sm text-gray-700 italic">"We need a mobile checkout flow that reduces steps from 5 to 2 and supports Apple Pay..."</div>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="text-[#0284c7] w-6 h-6" />
                </div>
              </div>
              <div className="relative">
                <div className="bg-white border border-gray-200 rounded-xl p-8 h-full">
                  <div className="w-12 h-12 bg-[#0284c7] text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6">2</div>
                  <h3 className="text-2xl font-semibold mb-4">AI generates structure</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">Our AI analyzes your input and creates a complete PRD with all standard sections automatically.</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Check className="text-[#0284c7] w-4 h-4" />
                      <span>Overview & objectives</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Check className="text-[#0284c7] w-4 h-4" />
                      <span>User stories & acceptance criteria</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Check className="text-[#0284c7] w-4 h-4" />
                      <span>Technical requirements</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Check className="text-[#0284c7] w-4 h-4" />
                      <span>Success metrics & KPIs</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="text-[#0284c7] w-6 h-6" />
                </div>
              </div>
              <div>
                <div className="bg-white border border-gray-200 rounded-xl p-8 h-full">
                  <div className="w-12 h-12 bg-[#0284c7] text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6">3</div>
                  <h3 className="text-2xl font-semibold mb-4">Refine & collaborate</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">Edit, comment, and iterate with your team in real-time. Export to any format when ready.</p>
                  <div className="flex items-center space-x-2 mt-6">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 -ml-2">+5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates */}
        <section id="templates" className="py-24 px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Start with a template</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Pre-built templates for every product scenario. Customize to fit your needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Smartphone, title: "Mobile App Feature", desc: "Complete PRD for iOS and Android features with platform-specific requirements.", sections: 12, color: "blue" },
                { icon: Globe, title: "Web Application", desc: "Full-stack web app PRD with frontend, backend, and API specifications.", sections: 15, color: "purple" },
                { icon: Code, title: "API Development", desc: "Technical spec for RESTful or GraphQL APIs with endpoints and schemas.", sections: 10, color: "green" },
                { icon: Palette, title: "UX Redesign", desc: "Comprehensive redesign PRD with user research and design system updates.", sections: 14, color: "orange" },
                { icon: ShieldCheck, title: "Security Feature", desc: "Security-focused PRD with compliance requirements and threat modeling.", sections: 13, color: "red" },
                { icon: LineChart, title: "Analytics Dashboard", desc: "Data visualization PRD with metrics, KPIs, and reporting requirements.", sections: 11, color: "indigo" },
                { icon: Bell, title: "Notification System", desc: "Multi-channel notification PRD with email, push, and in-app messaging.", sections: 9, color: "pink" },
                { icon: Rocket, title: "MVP Launch", desc: "Minimum viable product PRD focused on core features and quick launch.", sections: 8, color: "cyan" }
              ].map((template, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all cursor-pointer">
                  <div className={`w-12 h-12 bg-${template.color}-50 rounded-xl flex items-center justify-center mb-4`}>
                    <template.icon className={`text-${template.color}-600 w-6 h-6`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.desc}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{template.sections} sections</span>
                    <span className="text-[#0284c7] font-medium">Use template →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Loved by product teams worldwide</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of product managers who ship faster with PRD Generator.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">"PRD Generator cut our documentation time by 75%. What used to take days now takes hours. The AI suggestions are incredibly accurate and save us from missing critical details."</p>
                <div className="flex items-center space-x-3">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Sarah Chen" className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Chen</div>
                    <div className="text-sm text-gray-500">Senior PM at Stripe</div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">"The collaboration features are game-changing. Our entire product team can work on PRDs simultaneously, and the version control keeps everything organized. Best tool we've adopted this year."</p>
                <div className="flex items-center space-x-3">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Marcus Rodriguez" className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-semibold text-gray-900">Marcus Rodriguez</div>
                    <div className="text-sm text-gray-500">Head of Product at Notion</div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">"As a startup, we needed to move fast without sacrificing quality. PRD Generator gives us enterprise-level documentation standards with a fraction of the effort. Absolutely essential."</p>
                <div className="flex items-center space-x-3">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="Emily Park" className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-semibold text-gray-900">Emily Park</div>
                    <div className="text-sm text-gray-500">Founder at TechFlow</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 bg-gray-50 border border-gray-200 rounded-xl px-8 py-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">12,000+</div>
                  <div className="text-sm text-gray-600 mt-1">Active users</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50,000+</div>
                  <div className="text-sm text-gray-600 mt-1">PRDs created</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600 mt-1">Average rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Start free, upgrade when you need more. No hidden fees.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Free</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">Perfect for individuals and small projects.</p>
                <Button asChild variant="secondary" className="w-full text-center bg-gray-100 text-gray-900 font-medium py-3 rounded-xl hover:bg-gray-200 transition-all mb-6">
                  <Link to="/auth">Get started</Link>
                </Button>
                <div className="space-y-3">
                  {["5 PRDs per month", "Basic AI templates", "Export to PDF & Markdown", "Community support"].map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Check className="text-[#0284c7] w-4 h-4 mt-1" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border-2 border-[#0284c7] rounded-xl p-8 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#0284c7] text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Pro</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">For growing teams and power users.</p>
                <Button asChild className="w-full text-center bg-[#0284c7] text-white font-medium py-3 rounded-xl hover:bg-[#0284c7]/90 transition-all mb-6 shadow-lg shadow-[#0284c7]/20">
                  <Link to="/auth">Start free trial</Link>
                </Button>
                <div className="space-y-3">
                  {["Unlimited PRDs", "Advanced AI templates", "Real-time collaboration", "Version control", "All integrations", "Priority support"].map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Check className="text-[#0284c7] w-4 h-4 mt-1" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">Custom</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">For large organizations with custom needs.</p>
                <Button asChild variant="secondary" className="w-full text-center bg-gray-100 text-gray-900 font-medium py-3 rounded-xl hover:bg-gray-200 transition-all mb-6">
                  <Link to="/auth">Contact sales</Link>
                </Button>
                <div className="space-y-3">
                  {["Everything in Pro", "Custom AI training", "SSO & advanced security", "Dedicated account manager", "Custom integrations", "SLA guarantee"].map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Check className="text-[#0284c7] w-4 h-4 mt-1" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Frequently asked questions</h2>
              <p className="text-xl text-gray-600">Everything you need to know about PRD Generator.</p>
            </div>
            <div className="space-y-4">
              {[
                { q: "How does the AI generate PRDs?", a: "Our AI is trained on thousands of successful PRDs across different industries. It analyzes your input, understands context, and generates structured documentation following industry best practices. You can then refine and customize the output to match your specific needs." },
                { q: "Can I use my own templates?", a: "Absolutely! While we provide comprehensive templates, you can create and save your own custom templates that match your organization's specific requirements and workflows. Pro and Enterprise plans include unlimited custom templates." },
                { q: "Is my data secure?", a: "Yes. We use enterprise-grade encryption for data in transit and at rest. Your PRDs are private by default, and we never use your data to train our models. Enterprise customers get additional security features including SSO, custom data retention policies, and SOC 2 compliance." },
                { q: "What integrations are available?", a: "We integrate with 50+ tools including Jira, Linear, Notion, Slack, GitHub, Figma, and more. You can sync PRDs, create tasks automatically, and keep your entire team aligned. New integrations are added regularly based on user feedback." },
                { q: "Can I cancel anytime?", a: "Yes, there are no long-term contracts. You can cancel your subscription at any time, and you'll continue to have access until the end of your billing period. You can also export all your PRDs before canceling." }
              ].map((faq, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="cta-final" className="py-24 px-6 lg:px-8 bg-gradient-to-br from-[#0284c7] to-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to ship faster?</h2>
            <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto">Join thousands of product teams who build better products with PRD Generator. Start free, no credit card required.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-[#0284c7] text-base font-medium px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-xl">
                <Link to="/auth">Start writing for free</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent text-white text-base font-medium px-8 py-4 rounded-xl border-2 border-white hover:bg-white/10 transition-all">
                Schedule a demo
              </Button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-blue-50">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-white border-t border-gray-200 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#0284c7] rounded-lg flex items-center justify-center">
                  <FileText className="text-white w-4 h-4" />
                </div>
                <span className="text-lg font-semibold tracking-tight">PRD Generator</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">Build better products with intelligent PRDs. Transform your product ideas into comprehensive documentation in minutes.</p>
              <div className="flex items-center space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Twitter className="w-5 h-5 text-gray-700" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Linkedin className="w-5 h-5 text-gray-700" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Github className="w-5 h-5 text-gray-700" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Youtube className="w-5 h-5 text-gray-700" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Templates</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Integrations</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Documentation</a></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Blog</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">© 2024 PRD Generator. All rights reserved.</p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
