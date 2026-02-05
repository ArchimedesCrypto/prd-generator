import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Loader2, 
  LogOut, 
  Plus, 
  History as HistoryIcon, 
  LayoutTemplate, 
  Settings, 
  CreditCard, 
  FileText,
  TrendingUp,
  Clock,
  Menu,
  X
} from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { CreditsModal } from "@/components/CreditsModal";

interface Document {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(0);
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
        fetchRecentDocuments(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          navigate("/auth");
        } else {
          setUser(session.user);
          fetchCredits(session.user.id);
          fetchRecentDocuments(session.user.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchCredits = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("credits")
        .eq("user_id", userId)
        .maybeSingle();

      if (!error && data) {
        setCredits(data.credits || 0);
      }
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  };

  const fetchRecentDocuments = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select("id, title, status, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setDocuments((data || []) as Document[]);
    } catch (error: any) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
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
        title="Dashboard - PRD Generator"
        description="Manage your PRDs, view recent activity, and start new projects."
      />
      
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold tracking-tight text-primary">PRD Generator</h1>
            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="bg-primary/10 text-primary font-semibold">
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/app")} className="font-semibold">
                New PRD
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/history")} className="font-semibold">
                History
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 border-l border-border pl-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user.email}</p>
                <button
                  onClick={() => setCreditsModalOpen(true)}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  {credits} Credits Available
                </button>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="hidden md:flex">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border p-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start bg-primary/10 text-primary">Dashboard</Button>
              <Button variant="ghost" className="justify-start" onClick={() => navigate("/app")}>New PRD</Button>
              <Button variant="ghost" className="justify-start" onClick={() => navigate("/history")}>History</Button>
              <Button variant="ghost" className="justify-start" onClick={handleSignOut}>Sign Out</Button>
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Main Actions & Recent */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card 
                  className="p-6 hover:shadow-md transition-shadow cursor-pointer border-2 border-primary/20 bg-primary/5 group"
                  onClick={() => navigate("/app")}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                      <Plus className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Create New PRD</h3>
                      <p className="text-sm text-muted-foreground">Start a fresh product requirement document</p>
                    </div>
                  </div>
                </Card>
                <Card 
                  className="p-6 hover:shadow-md transition-shadow cursor-pointer border-border group"
                  onClick={() => navigate("/history")}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-secondary text-secondary-foreground group-hover:scale-110 transition-transform">
                      <HistoryIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">View History</h3>
                      <p className="text-sm text-muted-foreground">Access your previously generated PRDs</p>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent PRDs</h2>
                <Button variant="link" onClick={() => navigate("/history")}>View all</Button>
              </div>
              {documents.length === 0 ? (
                <Card className="p-8 text-center border-dashed">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-20" />
                  <p className="text-muted-foreground">No PRDs generated yet.</p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="p-4 hover:bg-accent/50 transition-colors cursor-pointer flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold">{doc.title}</p>
                          <p className="text-xs text-muted-foreground">{new Date(doc.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          doc.status === 'completed' ? 'bg-green-100 text-green-700' : 
                          doc.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Stats & Tips */}
          <div className="space-y-8">
            <Card className="p-6 bg-card border shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Usage Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available Credits</span>
                  <span className="font-bold text-xl">{credits}</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all" 
                    style={{ width: `${Math.min((credits / 10) * 100, 100)}%` }}
                  />
                </div>
                <Button 
                  className="w-full font-bold" 
                  variant="outline"
                  onClick={() => setCreditsModalOpen(true)}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Get More Credits
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/10">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <LayoutTemplate className="h-5 w-5 text-primary" />
                Quick Tips
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Be specific about your target audience for better results.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Define clear success metrics in your PRD prompts.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Use templates to maintain consistency across projects.</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-dashed">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Coming Soon
              </h3>
              <p className="text-sm text-muted-foreground">
                Collaborative editing and team workspaces are currently in development.
              </p>
            </Card>
          </div>

        </div>
      </main>

      <CreditsModal 
        open={creditsModalOpen} 
        onOpenChange={setCreditsModalOpen}
        onSuccess={() => {
          if (user) fetchCredits(user.id);
          toast.success("Credits updated!");
        }}
      />
    </div>
  );
};

export default Dashboard;
