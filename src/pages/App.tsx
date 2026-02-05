import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, LogOut, FileText, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { CreditsModal } from "@/components/CreditsModal";

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
  const [file, setFile] = useState<File | null>(null);

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

  // Handle payment success/cancellation from URL params
  useEffect(() => {
    const payment = searchParams.get('payment');
    const subscription = searchParams.get('subscription');
    
    if (payment === 'success') {
      toast.success('Payment successful! Your credits will be updated shortly.');
      setTimeout(() => {
        if (user?.id) fetchCredits(user.id);
      }, 2000);
      // Remove query params
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
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("deepwriter-generate", {
        body: {
          title: title,
          description: description,
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Create Document - Deepwriter AI | AI Document Generation"
        description="Create professional documents with Deepwriter AI. Generate high-quality content using advanced AI technology. Start your document generation now."
        canonical="https://yourdomain.com/app"
      />
      {/* Header */}
      <header className="border-b border-border bg-card shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wider">Deepwriter AI</h1>
            <nav className="hidden md:flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                className="bg-primary/10 text-primary font-bold"
              >
                Create
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/history")}
                className="hover:bg-primary/10 hover:text-primary font-bold"
              >
                History
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="hover:bg-primary/10 hover:text-primary font-bold"
              >
                Billing
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground font-medium hidden md:inline">{user.email}</span>
              <button
                onClick={() => setCreditsModalOpen(true)}
                className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
              >
                {credits} {credits === 1 ? 'credit' : 'credits'}
              </button>
            </div>
            <Button
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="hidden md:flex font-bold"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border p-6">
            <nav className="flex flex-col space-y-4 text-lg font-bold">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary py-2 border-b border-border text-left"
              >
                Create
              </button>
              <button
                onClick={() => {
                  navigate("/history");
                  setMobileMenuOpen(false);
                }}
                className="hover:text-primary transition-colors duration-300 py-2 border-b border-border text-left"
              >
                History
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setMobileMenuOpen(false);
                }}
                className="hover:text-primary transition-colors duration-300 py-2 border-b border-border text-left"
              >
                Billing
              </button>
              <div className="py-2 border-b border-border">
                <p className="text-sm font-bold">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 text-center font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6 md:p-8 bg-card border shadow-lg">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Create New Document</h2>
            <p className="text-muted-foreground">
              Fill in the details below to generate your document using Deepwriter AI
            </p>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter document title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add any specific details or requirements..."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file">Upload File (Optional)</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                disabled={loading}
              />
              {file && (
                <p className="text-sm text-muted-foreground">
                  Selected: {file.name}
                </p>
              )}
            </div>

            {/* Action Button */}
            <div className="flex gap-3">
              <Button
                type="button"
                size="lg"
                className="w-full font-bold text-lg"
                disabled={loading}
                onClick={handleGenerate}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Generate Document
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 p-6 bg-secondary/20 border-primary/20">
          <h3 className="font-semibold mb-2">What happens next?</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Your document will be generated in the background</li>
            <li>• You'll receive an email at {user.email} when it's ready</li>
            <li>• Check the History page to track your documents</li>
          </ul>
        </Card>
      </main>

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
