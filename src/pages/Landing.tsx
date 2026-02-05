import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, FileText, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SEO 
        title="PRD Generator - AI-Powered Product Requirements Documents"
        description="Generate professional Product Requirements Documents (PRDs) in seconds using AI. Streamline your product development process with Deepwriter AI."
        canonical="https://prd-generator.vercel.app"
      />
      <main id="main_content">
        {/* Hero Section */}
        <section className="relative hero-bg min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
          {/* Header */}
          <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="w-8 h-8 text-primary" />
              <span>PRD Generator</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#features" className="hover:text-primary transition-colors duration-300 cursor-pointer">Features</a>
              <a href="#preview" className="hover:text-primary transition-colors duration-300 cursor-pointer">Sample PRD</a>
              <div className="flex items-center gap-4 ml-4">
                <Link to="/auth" className="text-sm font-medium hover:text-primary transition-colors">Sign In</Link>
                <Button asChild variant="default" size="sm">
                  <Link to="/auth">Create Account</Link>
                </Button>
              </div>
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
            <div className="absolute top-16 left-0 right-0 z-20 bg-background border-b border-border p-6 md:hidden shadow-xl">
              <nav className="flex flex-col space-y-4 text-lg font-medium">
                <a 
                  href="#features" 
                  className="hover:text-primary transition-colors duration-300 py-2 border-b border-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#preview" 
                  className="hover:text-primary transition-colors duration-300 py-2 border-b border-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sample PRD
                </a>
                <Link 
                  to="/auth"
                  className="hover:text-primary transition-colors duration-300 py-2 border-b border-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Button asChild variant="default" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/auth">Create Account</Link>
                </Button>
              </nav>
            </div>
          )}

          {/* Hero Content */}
          <div className="z-0 text-center px-4 md:px-6 max-w-5xl mt-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Product Management</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Generate Professional <span className="text-primary">PRDs</span> in Seconds
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground leading-relaxed">
              Stop spending hours on documentation. Our AI-powered generator creates comprehensive, structured Product Requirements Documents from simple prompts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                <Link to="/auth">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base font-semibold">
                <a href="#preview">View Sample</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Sample PRD Preview Section */}
        <section id="preview" className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Sample PRD Output</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See the quality of documentation our AI generates for your product ideas.
              </p>
            </div>
            
            <Card className="max-w-4xl mx-auto p-8 md:p-12 shadow-xl border-border/50 bg-card">
              <div className="space-y-8">
                <div className="border-b pb-6">
                  <h3 className="text-2xl font-bold mb-2">Project: SmartTask AI Assistant</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Version: 1.0</span>
                    <span>Status: Draft</span>
                    <span>Date: Feb 5, 2024</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    1. Executive Summary
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    SmartTask is an AI-driven task management system designed to automate prioritization and scheduling for high-performance teams. It leverages machine learning to analyze workload and suggest optimal task sequences.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    2. Target Audience
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Project Managers in tech startups</li>
                    <li>Freelancers managing multiple clients</li>
                    <li>Remote teams requiring asynchronous coordination</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    3. Key Features
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <span className="font-medium block mb-1">Auto-Prioritization</span>
                      <span className="text-sm text-muted-foreground">ML-based ranking of tasks based on deadlines and impact.</span>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <span className="font-medium block mb-1">Natural Language Input</span>
                      <span className="text-sm text-muted-foreground">Create complex tasks using simple conversational English.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-center">
                  <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
                    <Link to="/auth" className="flex items-center gap-2">
                      Sign up to see full PRD <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Use PRD Generator?</h2>
              <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
                Built for product managers who want to focus on strategy, not formatting.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Zap className="w-8 h-8 text-primary" />, title: "Lightning Fast", desc: "Go from idea to a 10-page PRD in under 60 seconds." },
                { icon: <Sparkles className="w-8 h-8 text-primary" />, title: "AI-Optimized", desc: "Trained on thousands of industry-standard product documents." },
                { icon: <Shield className="w-8 h-8 text-primary" />, title: "Structured & Consistent", desc: "Ensure every PRD follows your team's preferred framework." },
              ].map((feature, idx) => (
                <div key={idx} className="bg-card p-8 rounded-xl border border-border transition-all duration-300 hover:border-primary hover:shadow-lg">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <footer className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to build better products?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-10 opacity-90">
              Join hundreds of product managers using AI to streamline their documentation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base font-bold">
                <Link to="/auth">Create Free Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base font-bold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
            <div className="mt-20 pt-8 border-t border-primary-foreground/20 text-sm opacity-70">
              <p>© 2024 PRD Generator. Powered by Deepwriter AI.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
