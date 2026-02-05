import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, LogOut, FileText, Plus, Clock, CheckCircle, XCircle, Download, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { CreditsModal } from "@/components/CreditsModal";

interface Document {
  id: string;
  title: string;
  status: string;
  content: string | null;
  created_at: string;
  updated_at: string;
  deepwriter_job_id: string | null;
}

const History = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(1);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchCredits(session.user.id);
        fetchDocuments(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          navigate("/auth");
        } else {
          setUser(session.user);
          fetchCredits(session.user.id);
          fetchDocuments(session.user.id);
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

  const fetchDocuments = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDocuments((data || []) as Document[]);
    } catch (error: any) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
      case "moderated":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "in_progress":
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-700">Completed</Badge>;
      case "failed":
        return <Badge className="bg-red-500/20 text-red-700">Failed</Badge>;
      case "moderated":
        return <Badge className="bg-orange-500/20 text-orange-700">Moderated</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500/20 text-blue-700">In Progress</Badge>;
      default:
        return <Badge className="bg-yellow-500/20 text-yellow-700">Pending</Badge>;
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      if (doc.content) {
        const content = JSON.parse(doc.content);
        if (content.pdf_url) {
          window.open(content.pdf_url, '_blank');
          toast.success("Opening PDF...");
          return;
        }
      }
      toast.error("PDF not available for this document");
    } catch (error) {
      console.error("Error downloading:", error);
      toast.error("Failed to download PDF");
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Document History - Deepwriter AI | Your Generated Documents"
        description="View and manage your document generation history. Access all your AI-generated documents, check status, and download completed files."
        canonical="https://yourdomain.com/history"
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
                onClick={() => navigate("/app")}
                className="hover:bg-primary/10 hover:text-primary font-bold"
              >
                Create
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="bg-primary/10 text-primary font-bold"
              >
                History
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 border-l border-border pl-4">
              <div className="text-right">
                <p className="text-sm font-bold hidden md:block">{user.email}</p>
                <div className="flex items-center justify-end gap-2">
                  <p className="text-xs text-muted-foreground hidden md:block">
                    {documents.length} document{documents.length !== 1 ? 's' : ''}
                  </p>
                  <button
                    onClick={() => setCreditsModalOpen(true)}
                    className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
                  >
                    {credits} {credits === 1 ? 'credit' : 'credits'}
                  </button>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="hidden md:flex font-bold"
            >
              <LogOut className="h-4 w-4" />
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
                onClick={() => {
                  navigate("/app");
                  setMobileMenuOpen(false);
                }}
                className="hover:text-primary transition-colors duration-300 py-2 border-b border-border text-left"
              >
                Create
              </button>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary py-2 border-b border-border text-left"
              >
                History
              </button>
              <div className="py-2 border-b border-border">
                <p className="text-sm font-bold">{user.email}</p>
                <p className="text-xs text-muted-foreground">
                  {documents.length} document{documents.length !== 1 ? 's' : ''}
                </p>
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
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Your Documents</h2>
          <p className="text-muted-foreground">
            Track your generated documents and their status
          </p>
        </div>

        {documents.length === 0 ? (
          <Card className="p-12 text-center bg-card border shadow-lg">
            <FileText className="h-16 w-16 mx-auto mb-4 text-primary opacity-50" />
            <h3 className="text-xl font-bold mb-2">No documents yet</h3>
            <p className="text-muted-foreground mb-6">
              Start creating your first document!
            </p>
            <Button 
              onClick={() => navigate("/app")}
              className="font-bold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Document
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="p-6 bg-card border hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-bold">{doc.title}</h3>
                      {getStatusBadge(doc.status)}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(doc.status)}
                    {doc.status === "completed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(doc)}
                        className="font-bold"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        <span className="hidden md:inline">Download PDF</span>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
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

export default History;
