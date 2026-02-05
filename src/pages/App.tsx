import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { 
  Loader2, 
  LogOut, 
  FileText, 
  Menu, 
  X, 
  FileText, 
  Keyboard, 
  Bell, 
  Lightbulb, 
  Mic, 
  Paperclip, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Plus, 
  Layers, 
  FileText, 
  CheckCircle, 
  Circle, 
  Sliders, 
  Wand2, 
  LineChart, 
  Save, 
  History as HistoryIcon, 
  Sparkles, 
  GripVertical, 
  ArrowRight, 
  Smartphone, 
  MoreVertical, 
  Store, 
  Rocket, 
  Brain, 
  Check, 
  Twitter, 
  Linkedin, 
  Github, 
  Slack, 
  Figma, 
  Database, 
  Cloud, 
  Table as TableIcon, 
  Box, 
  BarChart3,
  Star
} from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { CreditsModal } from "@/components/CreditsModal";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const AppPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [timeline, setTimeline] = useState("Select timeline");
  const [budget, setBudget] = useState("Select budget");
  const [metrics, setMetrics] = useState("");
  const [template, setTemplate] = useState("comprehensive");
  const [detailLevel, setDetailLevel] = useState([3]);
  const [tone, setTone] = useState("professional");
  const [includeSuggestions, setIncludeSuggestions] = useState(true);
  const [includeMarketResearch, setIncludeMarketResearch] = useState(true);
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "summary", "problem", "goals", "personas", "stories", "features", "timeline", "metrics"
  ]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchCredits(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          navigate("/auth");
        } else {
          setUser(session.user);
          fetchCredits(session.user.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const payment = searchParams.get('payment');
    const subscription = searchParams.get('subscription');
    
    if (payment === 'success') {
      toast.success('Payment successful! Your credits will be updated shortly.');
      setTimeout(() => {
        if (user?.id) fetchCredits(user.id);
      }, 2000);
      setSearchParams({});
    } else if (payment === 'cancelled') {
      toast.error('Payment was cancelled.');
      setSearchParams({});
    } else if (subscription === 'success') {
      toast.success('Subscription activated! Your credits will be updated shortly.');
      setTimeout(() => {
        if (user?.id) fetchCredits(user.id);
      }, 2000);
      setSearchParams({});
    } else if (subscription === 'cancelled') {
      toast.error('Subscription checkout was cancelled.');
      setSearchParams({});
    }
  }, [searchParams, user, setSearchParams]);

  const fetchCredits = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("credits")
        .eq("user_id", userId)
        .maybeSingle();

      if (!error && data) {
        setCredits(data.credits || 1);
      } else {
        setCredits(1);
      }
    } catch (error) {
      console.error("Error fetching credits:", error);
      setCredits(1);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please describe your product idea");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("deepwriter-generate", {
        body: {
          title: title || "Untitled PRD",
          description: description,
          context: {
            targetAudience,
            competitors,
            timeline,
            budget,
            metrics,
            template,
            detailLevel: detailLevel[0],
            tone,
            includeSuggestions,
            includeMarketResearch,
            selectedSections
          }
        },
      });

      if (error) {
        console.error("Generation error:", error);
        throw error;
      }

      toast.success("Generation started! Check history for status.");
      navigate("/history");
      
    } catch (error: any) {
      console.error("Error generating:", error);
      toast.error(error.message || "Failed to start generation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setSelectedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <SEO 
        title="App - Deepwriter AI | AI PRD Generator"
        description="Transform your product ideas into comprehensive PRDs with AI-powered assistance."
        canonical="https://deepwriter.ai/app"
      />

      {/* Header */}
      <div id="header" className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 z-50">
        <div className="max-w-[1920px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-semibold text-neutral-800">Deepwriter AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              <button className="px-4 py-2 text-sm font-medium text-primary bg-primary/5 rounded-lg">Generator</button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors">Templates</button>
              <button onClick={() => navigate("/history")} className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors">History</button>
              <button onClick={() => navigate("/dashboard")} className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors">Settings</button>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors flex items-center space-x-2">
              <Keyboard className="w-3 h-3" />
              <span>Shortcuts</span>
            </button>
            <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <div 
              className="w-8 h-8 rounded-full bg-black flex items-center justify-center cursor-pointer"
              onClick={() => setCreditsModalOpen(true)}
            >
              <span className="text-xs font-semibold text-white">{credits}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-neutral-600">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div id="main-layout" className="pt-16">
        <div className="max-w-[1600px] mx-auto px-8 py-12">
          
          <div id="hero-section" class="mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-neutral-900 mb-4 tracking-tight">Generate Product Requirements</h1>
              <p className="text-lg text-neutral-500 mb-8 leading-relaxed">Transform your product ideas into comprehensive PRDs with AI-powered assistance. Configure sections, customize output, and iterate instantly.</p>
              <div className="flex items-center justify-center space-x-3">
                <div className="flex items-center space-x-2 px-4 py-2 bg-neutral-50 rounded-lg border border-neutral-200">
                  <Sparkles className="text-primary w-4 h-4" />
                  <span className="text-sm text-neutral-600">Fast Generation</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-neutral-50 rounded-lg border border-neutral-200">
                  <Wand2 className="text-primary w-4 h-4" />
                  <span className="text-sm text-neutral-600">AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-neutral-50 rounded-lg border border-neutral-200">
                  <Sliders className="text-primary w-4 h-4" />
                  <span className="text-sm text-neutral-600">Fully Customizable</span>
                </div>
              </div>
            </div>
          </div>

          <div id="main-content" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div id="input-section" className="lg:col-span-2 space-y-6">
              
              <div id="prompt-card" className="bg-white border border-neutral-200 rounded-[12px] p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Lightbulb className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-neutral-900">Product Idea</h2>
                      <p className="text-sm text-neutral-500">Describe your product concept in detail</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors flex items-center space-x-2">
                    <Mic className="w-3 h-3" />
                    <span>Voice Input</span>
                  </button>
                </div>
                
                <div className="mb-6">
                  <textarea 
                    className="w-full min-h-[240px] p-4 bg-neutral-50 border border-neutral-200 rounded-[12px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all" 
                    placeholder="Example: A mobile app that helps freelancers track their time, manage invoices, and analyze productivity patterns. The app should integrate with popular project management tools and provide insights on billable hours vs. non-billable work..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4">
                      <button className="text-sm text-neutral-500 hover:text-neutral-700 flex items-center space-x-2">
                        <Paperclip className="w-3 h-3" />
                        <span>Attach files</span>
                      </button>
                      <button className="text-sm text-neutral-500 hover:text-neutral-700 flex items-center space-x-2">
                        <ImageIcon className="w-3 h-3" />
                        <span>Add images</span>
                      </button>
                      <button className="text-sm text-neutral-500 hover:text-neutral-700 flex items-center space-x-2">
                        <LinkIcon className="w-3 h-3" />
                        <span>Insert link</span>
                      </button>
                    </div>
                    <span className="text-sm text-neutral-400">{description.length} / 5000</span>
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-3">Quick Context Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {["B2B SaaS", "Mobile App", "Web Platform", "E-commerce", "Marketplace", "Analytics", "Social"].map(tag => (
                      <button 
                        key={tag}
                        className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm rounded-lg transition-colors"
                        onClick={() => setDescription(prev => prev + (prev ? " " : "") + tag)}
                      >
                        {tag}
                      </button>
                    ))}
                    <button className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-sm rounded-lg transition-colors flex items-center space-x-1">
                      <Plus className="w-3 h-3" />
                      <span>Custom</span>
                    </button>
                  </div>
                </div>
              </div>

              <div id="additional-context-card" className="bg-white border border-neutral-200 rounded-[12px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Layers className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-neutral-900">Additional Context</h2>
                      <p className="text-sm text-neutral-500">Optional fields to enhance PRD quality</p>
                    </div>
                  </div>
                  <button className="text-sm text-primary hover:text-primary-dark font-medium">Collapse</button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Target Audience</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-[12px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                      placeholder="e.g., Small business owners, freelancers, enterprise teams"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Key Competitors</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-[12px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                      placeholder="e.g., Asana, Monday.com, Notion"
                      value={competitors}
                      onChange={(e) => setCompetitors(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Timeline</label>
                      <select 
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-[12px] text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                      >
                        <option>Select timeline</option>
                        <option>1-3 months</option>
                        <option>3-6 months</option>
                        <option>6-12 months</option>
                        <option>12+ months</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Budget Range</label>
                      <select 
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-[12px] text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                      >
                        <option>Select budget</option>
                        <option>$10k - $50k</option>
                        <option>$50k - $100k</option>
                        <option>$100k - $500k</option>
                        <option>$500k+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Success Metrics</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-[12px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                      placeholder="e.g., User retention, conversion rate, revenue growth"
                      value={metrics}
                      onChange={(e) => setMetrics(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div id="template-selector-card" className="bg-white border border-neutral-200 rounded-[12px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-neutral-900">PRD Template</h2>
                      <p className="text-sm text-neutral-500">Choose a starting template structure</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "comprehensive", title: "Comprehensive", desc: "Full detailed PRD with all sections" },
                    { id: "lean", title: "Lean", desc: "Essential sections only" },
                    { id: "technical", title: "Technical", desc: "Engineering-focused PRD" }
                  ].map(t => (
                    <button 
                      key={t.id}
                      className={`p-4 border-2 rounded-[12px] text-left transition-colors ${template === t.id ? 'border-primary bg-primary/5' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'}`}
                      onClick={() => setTemplate(t.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        {template === t.id ? <CheckCircle className="text-primary w-4 h-4" /> : <Circle className="text-neutral-300 w-4 h-4" />}
                        {template === t.id && <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">Selected</span>}
                      </div>
                      <h3 className="font-semibold text-neutral-900 mb-1">{t.title}</h3>
                      <p className="text-xs text-neutral-500">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div id="generation-settings-card" className="bg-white border border-neutral-200 rounded-[12px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Sliders className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-neutral-900">Generation Settings</h2>
                      <p className="text-sm text-neutral-500">Fine-tune AI output preferences</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-neutral-700">Detail Level</label>
                      <span className="text-sm text-neutral-500">{detailLevel[0] === 1 ? 'Brief' : detailLevel[0] === 2 ? 'Moderate' : 'Detailed'}</span>
                    </div>
                    <Slider 
                      value={detailLevel} 
                      onValueChange={setDetailLevel} 
                      max={3} 
                      min={1} 
                      step={1} 
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-neutral-400">Brief</span>
                      <span className="text-xs text-neutral-400">Moderate</span>
                      <span className="text-xs text-neutral-400">Detailed</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-neutral-700">Tone</label>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {["formal", "professional", "casual", "technical"].map(t => (
                        <button 
                          key={t}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors capitalize ${tone === t ? 'bg-primary text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'}`}
                          onClick={() => setTone(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Wand2 className="text-primary w-5 h-5" />
                      <div>
                        <p className="text-sm font-medium text-neutral-900">Include AI Suggestions</p>
                        <p className="text-xs text-neutral-500">Add innovative feature ideas</p>
                      </div>
                    </div>
                    <Switch checked={includeSuggestions} onCheckedChange={setIncludeSuggestions} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <LineChart className="text-primary w-5 h-5" />
                      <div>
                        <p className="text-sm font-medium text-neutral-900">Market Research Insights</p>
                        <p className="text-xs text-neutral-500">Include competitive analysis</p>
                      </div>
                    </div>
                    <Switch checked={includeMarketResearch} onCheckedChange={setIncludeMarketResearch} />
                  </div>
                </div>
              </div>

              <div id="action-buttons" className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-[12px] transition-colors flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Draft</span>
                  </button>
                  <button onClick={() => navigate("/history")} className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-[12px] transition-colors flex items-center space-x-2">
                    <HistoryIcon className="w-4 h-4" />
                    <span>Load Previous</span>
                  </button>
                </div>
                <button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-[12px] transition-colors flex items-center space-x-2 shadow-sm hover:shadow-md disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{loading ? 'Generating...' : 'Generate PRD'}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded">⌘G</span>
                </button>
              </div>

            </div>

            <div id="sidebar-section" className="lg:col-span-1 space-y-6">
              
              <div id="section-toggles-card" className="bg-white border border-neutral-200 rounded-[12px] p-6 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900">PRD Sections</h3>
                  <button 
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                    onClick={() => setSelectedSections(["summary", "problem", "goals", "personas", "stories", "features", "architecture", "timeline", "resources", "metrics", "risks", "appendix"])}
                  >
                    Select All
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "summary", title: "Executive Summary", desc: "High-level overview" },
                    { id: "problem", title: "Problem Statement", desc: "Core problem definition" },
                    { id: "goals", title: "Goals & Objectives", desc: "Success criteria" },
                    { id: "personas", title: "User Personas", desc: "Target audience profiles" },
                    { id: "stories", title: "User Stories", desc: "Feature narratives" },
                    { id: "features", title: "Feature Requirements", desc: "Detailed specifications" },
                    { id: "architecture", title: "Technical Architecture", desc: "System design overview" },
                    { id: "timeline", title: "Timeline & Milestones", desc: "Project roadmap" },
                    { id: "resources", title: "Resource Requirements", desc: "Team & budget needs" },
                    { id: "metrics", title: "Success Metrics", desc: "KPIs & measurement" },
                    { id: "risks", title: "Risk Assessment", desc: "Potential challenges" },
                    { id: "appendix", title: "Appendix", desc: "Supporting materials" }
                  ].map(section => (
                    <div key={section.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Switch 
                          checked={selectedSections.includes(section.id)} 
                          onCheckedChange={() => toggleSection(section.id)} 
                        />
                        <div>
                          <p className="text-sm font-medium text-neutral-900">{section.title}</p>
                          <p className="text-xs text-neutral-500">{section.desc}</p>
                        </div>
                      </div>
                      <GripVertical className="text-neutral-300 w-3 h-3" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <button className="w-full px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Plus className="w-3 h-3" />
                    <span>Add Custom Section</span>
                  </button>
                </div>
              </div>

              <div id="quick-stats-card" className="bg-neutral-50 border border-neutral-200 rounded-[12px] p-6">
                <h3 className="text-sm font-semibold text-neutral-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Sections Selected</span>
                    <span className="text-lg font-semibold text-primary">{selectedSections.length} / 12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Estimated Length</span>
                    <span className="text-lg font-semibold text-primary">~{selectedSections.length * 1.5} pages</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Generation Time</span>
                    <span className="text-lg font-semibold text-primary">~2 min</span>
                  </div>
                </div>
              </div>

              <div id="tips-card" className="bg-white border border-neutral-200 rounded-[12px] p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="text-amber-500 w-4 h-4" />
                  <h3 className="text-sm font-semibold text-neutral-900">Pro Tips</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Be specific about your target audience for better user stories",
                    "Include competitor names to get comparative analysis",
                    "Add success metrics for data-driven objectives",
                    "Use voice input for faster idea capture"
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="text-primary w-3 h-3 mt-1" />
                      <p className="text-sm text-neutral-600">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          <div id="recent-generations-section" className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Recent Generations</h2>
                <p className="text-neutral-500">Your previously generated PRDs</p>
              </div>
              <button onClick={() => navigate("/history")} className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark flex items-center space-x-2">
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Freelancer Time Tracker", desc: "Mobile app for time tracking and invoicing for freelancers...", icon: Smartphone, color: "from-blue-500 to-blue-600", time: "2 hours ago", pages: "14 pages" },
                { title: "B2B Marketplace Platform", desc: "Enterprise marketplace connecting suppliers with buyers...", icon: Store, color: "from-purple-500 to-purple-600", time: "1 day ago", pages: "18 pages" },
                { title: "Analytics Dashboard SaaS", desc: "Real-time analytics platform for e-commerce businesses...", icon: BarChart3, color: "from-emerald-500 to-emerald-600", time: "3 days ago", pages: "22 pages" }
              ].map((gen, i) => (
                <div key={i} className="bg-white border border-neutral-200 rounded-[12px] p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${gen.color} rounded-lg flex items-center justify-center`}>
                      <gen.icon className="text-white w-6 h-6" />
                    </div>
                    <button className="text-neutral-400 hover:text-neutral-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{gen.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{gen.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">{gen.time}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Complete</span>
                      <span className="text-xs text-neutral-400">{gen.pages}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="templates-showcase-section" className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Popular Templates</h2>
                <p className="text-neutral-500">Start with proven PRD structures</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark flex items-center space-x-2">
                <span>Browse Library</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "SaaS Product", desc: "For B2B and B2C software products", icon: Rocket, color: "bg-primary/10", iconColor: "text-primary", sections: "12 sections" },
                { title: "Mobile App", desc: "iOS and Android applications", icon: Smartphone, color: "bg-purple-100", iconColor: "text-purple-600", sections: "10 sections" },
                { title: "E-commerce", desc: "Online stores and marketplaces", icon: Store, color: "bg-emerald-100", iconColor: "text-emerald-600", sections: "14 sections" },
                { title: "Platform", desc: "Multi-sided platforms and ecosystems", icon: Layers, color: "bg-amber-100", iconColor: "text-amber-600", sections: "16 sections" }
              ].map((t, i) => (
                <div key={i} className="bg-white border border-neutral-200 rounded-[12px] p-6 hover:border-primary hover:shadow-md transition-all cursor-pointer">
                  <div className={`w-12 h-12 ${t.color} rounded-lg flex items-center justify-center mb-4`}>
                    <t.icon className={`${t.iconColor} w-6 h-6`} />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 mb-2">{t.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{t.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">{t.sections}</span>
                    <ArrowRight className={`${t.iconColor} w-3 h-3`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="ai-insights-section" className="mt-16 bg-neutral-50 border border-neutral-200 rounded-[12px] p-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="text-white w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">AI-Powered Insights</h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">Our advanced AI analyzes market trends, competitor strategies, and user behavior patterns to generate comprehensive, data-driven PRDs that align with industry best practices.</p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <p className="text-sm text-neutral-600">Accuracy Rate</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">2.5M+</div>
                  <p className="text-sm text-neutral-600">PRDs Generated</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">45s</div>
                  <p className="text-sm text-neutral-600">Avg Generation Time</p>
                </div>
              </div>
            </div>
          </div>

          <div id="keyboard-shortcuts-section" className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Keyboard Shortcuts</h2>
                <p className="text-neutral-500">Work faster with these shortcuts</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Generate PRD", keys: ["⌘", "G"] },
                { label: "Save Draft", keys: ["⌘", "S"] },
                { label: "Toggle Sections", keys: ["⌘", "K"] },
                { label: "Open History", keys: ["⌘", "H"] },
                { label: "Voice Input", keys: ["⌘", "Shift", "V"] },
                { label: "Search Templates", keys: ["⌘", "T"] }
              ].map((s, i) => (
                <div key={i} className="bg-white border border-neutral-200 rounded-[12px] p-4 flex items-center justify-between">
                  <span className="text-sm text-neutral-700">{s.label}</span>
                  <div className="flex items-center space-x-1">
                    {s.keys.map(k => (
                      <kbd key={k} className="px-2 py-1 bg-neutral-100 border border-neutral-300 rounded text-xs font-medium">{k}</kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="features-grid-section" className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Why Choose Deepwriter AI</h2>
              <p className="text-lg text-neutral-500">Everything you need to create professional product requirements</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "AI-Powered Generation", desc: "Advanced language models trained on thousands of successful PRDs generate comprehensive, professional documents in minutes.", icon: Wand2, color: "bg-primary/10", iconColor: "text-primary" },
                { title: "Fully Customizable", desc: "Toggle sections, adjust detail levels, and customize tone to match your team's workflow and documentation standards.", icon: Sliders, color: "bg-purple-100", iconColor: "text-purple-600" },
                { title: "Team Collaboration", desc: "Share PRDs with stakeholders, collect feedback, and iterate together in real-time with built-in collaboration tools.", icon: Slack, color: "bg-emerald-100", iconColor: "text-emerald-600" },
                { title: "Template Library", desc: "Access industry-specific templates for SaaS, mobile apps, e-commerce, and more to jumpstart your documentation.", icon: Layers, color: "bg-amber-100", iconColor: "text-amber-600" },
                { title: "Market Insights", desc: "Automatically include competitive analysis, market trends, and user behavior data to strengthen your product strategy.", icon: LineChart, color: "bg-blue-100", iconColor: "text-blue-600" },
                { title: "Lightning Fast", desc: "Generate comprehensive PRDs in under 2 minutes with our optimized AI engine and intuitive interface.", icon: Sparkles, color: "bg-rose-100", iconColor: "text-rose-600" }
              ].map((f, i) => (
                <div key={i} className="bg-white border border-neutral-200 rounded-[12px] p-8 hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 ${f.color} rounded-xl flex items-center justify-center mb-6`}>
                    <f.icon className={`${f.iconColor} w-7 h-7`} />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{f.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="integration-section" className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Seamless Integrations</h2>
              <p className="text-lg text-neutral-500">Connect with your favorite tools and workflows</p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-[12px] p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {[
                  { name: "Jira", icon: Database, color: "text-blue-600" },
                  { name: "Slack", icon: Slack, color: "text-purple-600" },
                  { name: "Figma", icon: Figma, color: "text-pink-600" },
                  { name: "GitHub", icon: Github, color: "text-neutral-900" },
                  { name: "Notion", icon: FileText, color: "text-neutral-900" },
                  { name: "Drive", icon: Cloud, color: "text-blue-500" },
                  { name: "Trello", icon: TableIcon, color: "text-blue-600" },
                  { name: "Confluence", icon: Box, color: "text-blue-700" },
                  { name: "Airtable", icon: TableIcon, color: "text-green-600" },
                  { name: "Dropbox", icon: Box, color: "text-blue-600" },
                  { name: "Analytics", icon: BarChart3, color: "text-orange-600" },
                  { name: "More", icon: Plus, color: "text-neutral-400" }
                ].map((int, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-3">
                      <int.icon className={`${int.color} w-6 h-6`} />
                    </div>
                    <span className="text-sm text-neutral-700 font-medium">{int.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="testimonials-section" className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Trusted by Product Teams</h2>
              <p className="text-lg text-neutral-500">See what product managers are saying about Deepwriter AI</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Michael Chen", role: "Senior PM at TechCorp", text: "Deepwriter AI cut our documentation time by 70%. The AI-generated insights are incredibly accurate and save us countless hours of research.", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" },
                { name: "Sarah Williams", role: "VP Product at StartupX", text: "The template library is a game-changer. We can now standardize our PRD process across multiple product teams effortlessly.", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" },
                { name: "David Park", role: "Product Lead at InnovateCo", text: "Best investment we've made this year. The quality of generated PRDs rivals what our team would produce manually in weeks.", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" }
              ].map((t, i) => (
                <div key={i} className="bg-white border border-neutral-200 rounded-[12px] p-8">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-neutral-700 mb-6 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center space-x-3">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-neutral-900">{t.name}</p>
                      <p className="text-sm text-neutral-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="cta-section" className="mt-16 mb-16 bg-black rounded-[12px] p-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your PRD Process?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Join thousands of product teams who are shipping faster with AI-powered documentation.</p>
            <div className="flex items-center justify-center space-x-4">
              <button className="px-8 py-4 bg-white text-black font-semibold rounded-[12px] hover:bg-neutral-50 transition-colors shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-neutral-800 text-white font-semibold rounded-[12px] border-2 border-white/20 hover:bg-neutral-700 transition-colors">
                Watch Demo
              </button>
            </div>
            <p className="text-sm text-white/70 mt-6">No credit card required • 14-day free trial • Cancel anytime</p>
          </div>

        </div>
      </div>

      <div id="footer" className="bg-neutral-50 border-t border-neutral-200 mt-16">
        <div className="max-w-[1600px] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="text-white w-4 h-4" />
                </div>
                <span className="text-lg font-semibold text-neutral-800">Deepwriter AI</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">AI-powered product requirements documentation for modern product teams.</p>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">Features</button></li>
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">Templates</button></li>
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">Integrations</button></li>
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">Documentation</button></li>
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">Blog</button></li>
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">Support</button></li>
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">API</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">About</button></li>
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">Careers</button></li>
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">Privacy</button></li>
                <li><button className="text-sm text-neutral-600 hover:text-primary transition-colors">Terms</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-200 pt-8 flex items-center justify-between">
            <p className="text-sm text-neutral-500">© 2024 Deepwriter AI. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <button className="text-neutral-400 hover:text-primary transition-colors"><Twitter className="w-4 h-4" /></button>
              <button className="text-neutral-400 hover:text-primary transition-colors"><Linkedin className="w-4 h-4" /></button>
              <button className="text-neutral-400 hover:text-primary transition-colors"><Github className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      <CreditsModal 
        open={creditsModalOpen} 
        onOpenChange={setCreditsModalOpen}
        onSuccess={() => {
          fetchCredits(user.id);
          toast.success("Credits updated!");
        }}
      />
    </div>
  );
};

export default AppPage;
