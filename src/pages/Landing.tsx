import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SEO } from "@/components/SEO";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SEO 
        title="Deepwriter AI - Professional AI Document Generation | API Application"
        description="Generate professional documents using Deepwriter AI API. Create, manage, and download AI-generated content with ease. Fast processing and secure document handling."
        canonical="https://yourdomain.com"
      />
      <main id="main_content">
        {/* Hero Section */}
        <section className="relative hero-bg min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
          {/* Header */}
          <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-10 border-b border-border/50">
            <div className="text-2xl md:text-3xl font-bold tracking-wider flex items-center gap-3">
              <span>Deepwriter AI</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-lg font-bold">
              <a href="#features" className="hover:text-primary/70 transition-colors duration-300 cursor-pointer">Features</a>
              <Link to="/blog" className="hover:text-primary/70 transition-colors duration-300 cursor-pointer">Blog</Link>
              <Button asChild variant="default" className="font-bold">
                <Link to="/auth">Login</Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </header>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-16 left-0 right-0 z-20 bg-background border-b border-border p-6 md:hidden">
              <nav className="flex flex-col space-y-4 text-lg font-bold">
                <a 
                  href="#features" 
                  className="hover:text-primary/70 transition-colors duration-300 py-2 border-b border-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <Link 
                  to="/blog"
                  className="hover:text-primary/70 transition-colors duration-300 py-2 border-b border-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Button asChild variant="default" className="font-bold" onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/auth">Login</Link>
                </Button>
              </nav>
            </div>
          )}

          {/* Hero Content */}
          <div className="z-0 text-center px-4 md:px-6 max-w-5xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              API Application for <span className="text-primary">Deepwriter AI</span>
            </h1>
            <p className="text-base md:text-xl max-w-3xl mx-auto mb-8 text-muted-foreground">
              Generate professional documents using the Deepwriter AI API. Create, manage, and download your AI-generated content seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <Button asChild size="lg" className="font-bold text-lg">
                <Link to="/auth">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-bold text-lg">
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-secondary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg max-w-3xl mx-auto mb-16 text-muted-foreground">
              Simple steps to generate your documents with AI
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start max-w-6xl mx-auto gap-8 md:gap-6">
              {[
                { num: 1, title: "Sign Up", desc: "Create your account in seconds" },
                { num: 2, title: "Configure", desc: "Set up your document parameters" },
                { num: 3, title: "Generate", desc: "AI creates your content" },
                { num: 4, title: "Download", desc: "Get your completed document" }
              ].map((step) => (
                <div key={step.num} className="relative flex-1 text-center px-4 max-w-xs md:max-w-none">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-4xl font-bold">
                    {step.num}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Features</h2>
              <p className="text-lg max-w-3xl mx-auto mb-16 text-muted-foreground">
                Everything you need to work with Deepwriter AI
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "📄", title: "Document Generation", desc: "Generate professional documents using AI" },
                { icon: "⚙️", title: "Customizable", desc: "Flexible configuration options for your needs" },
                { icon: "📥", title: "Easy Download", desc: "Download your documents in PDF format" },
                { icon: "🔄", title: "History Tracking", desc: "Keep track of all your generated documents" },
                { icon: "🚀", title: "Fast Processing", desc: "Quick generation times for all documents" },
                { icon: "🔐", title: "Secure", desc: "Your data is encrypted and secure" }
              ].map((feature, idx) => (
                <div key={idx} className="bg-card p-6 rounded-lg border border-border transition-all duration-300 hover:border-primary hover:shadow-lg transform hover:scale-105">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-4xl">{feature.icon}</span>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <footer className="bg-primary text-primary-foreground pt-16 pb-8">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
                Start generating professional documents with Deepwriter AI today
              </p>
              <Button asChild size="lg" variant="secondary" className="font-bold text-xl">
                <Link to="/auth">Create Account</Link>
              </Button>
            </div>
            <div className="mt-12 text-center text-sm opacity-70 border-t border-primary-foreground/20 pt-8">
              <p>© 2024 Deepwriter AI Application. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
