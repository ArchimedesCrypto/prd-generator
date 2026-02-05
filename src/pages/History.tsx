import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Loader2, 
  FileText, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Download, 
  Menu, 
  X, 
  Search, 
  Sliders, 
  Filter, 
  ArrowDownWideNarrow, 
  TableProperties, 
  LayoutGrid, 
  Calendar, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Rocket, 
  Star,
  Home,
  FolderOpen,
  ChartLine,
  Users,
  Bell,
  Settings,
  Tag,
  Archive,
  CheckSquare
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { CreditsModal } from "@/components/CreditsModal";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  status: string;
  content: string | null;
  created_at: string;
  updated_at: string;
  deepwriter_job_id: string | null;
  story_type?: string;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (doc.story_type && doc.story_type.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === "All" || 
                           (statusFilter === "In Progress" && doc.status === "in_progress") ||
                           (statusFilter === "Completed" && doc.status === "completed") ||
                           (statusFilter === "Archived" && doc.status === "archived") ||
                           (statusFilter === "On Hold" && doc.status === "on_hold");
      return matchesSearch && matchesStatus;
    });
  }, [documents, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: documents.length,
      inProgress: documents.filter(d => d.status === "in_progress").length,
      completed: documents.filter(d => d.status === "completed").length,
      onHold: documents.filter(d => d.status === "on_hold").length,
      archived: documents.filter(d => d.status === "archived").length,
    };
  }, [documents]);

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <SEO 
        title="PRD Archive - Deepwriter AI"
        description="Searchable collection view for existing PRDs."
      />

      {/* Sidebar Navigation */}
      <div id="sidebar" className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 z-50">
        <div className="mb-8">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <FileText className="text-white h-5 w-5" />
          </div>
        </div>
        
        <nav className="flex flex-col items-center space-y-6 flex-1">
          <button onClick={() => navigate("/")} className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-primary hover:bg-gray-50 transition-all">
            <Home className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-primary bg-primary/5 transition-all">
            <FolderOpen className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-primary hover:bg-gray-50 transition-all">
            <ChartLine className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-primary hover:bg-gray-50 transition-all">
            <Users className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-primary hover:bg-gray-50 transition-all">
            <Calendar className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-primary hover:bg-gray-50 transition-all">
            <Bell className="h-5 w-5" />
          </button>
        </nav>
        
        <div className="mt-auto space-y-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-primary hover:bg-gray-50 transition-all">
            <Settings className="h-5 w-5" />
          </button>
          <button onClick={handleSignOut} className="w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden border border-gray-200">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="User" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div id="main-container" className="ml-16">
        
        {/* Top Header Bar */}
        <div id="header" className="fixed top-0 right-0 left-16 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-40">
          <div className="h-full px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">PRD Archive</h1>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">{documents.length} documents</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all flex items-center space-x-2">
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </Button>
              <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all flex items-center space-x-2">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
              <Button onClick={() => navigate("/app")} size="sm" className="h-9 px-5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all flex items-center space-x-2 shadow-sm">
                <Plus className="h-3.5 w-3.5" />
                <span>New PRD</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div id="search-section" className="pt-24 pb-6 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  type="text" 
                  placeholder="Search by title, tag, or status..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <Button variant="outline" className="h-12 px-5 rounded-xl border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all flex items-center space-x-2">
                <Sliders className="h-4 w-4" />
                <span>Advanced</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div id="quick-filters" className="px-8 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 font-medium">Quick filters:</span>
              {["All", "In Progress", "Completed", "Archived", "On Hold"].map((filter) => (
                <button 
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={cn(
                    "h-8 px-4 rounded-lg text-xs font-medium transition-all",
                    statusFilter === filter 
                      ? "bg-primary text-white shadow-sm" 
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {filter}
                </button>
              ))}
              <div className="flex-1"></div>
              <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg border-gray-200 bg-white text-gray-500 text-xs hover:bg-gray-50 transition-all flex items-center space-x-2">
                <ArrowDownWideNarrow className="h-3.5 w-3.5" />
                <span>Sort by date</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div id="stats-section" className="px-8 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total PRDs</span>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="text-primary h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-semibold text-gray-900">{stats.total}</div>
                <div className="mt-2 text-xs text-gray-500">All time</div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">In Progress</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Clock className="text-amber-500 h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-semibold text-gray-900">{stats.inProgress}</div>
                <div className="mt-2 text-xs text-gray-500">{((stats.inProgress / (stats.total || 1)) * 100).toFixed(1)}% of total</div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Completed</span>
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="text-green-500 h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-semibold text-gray-900">{stats.completed}</div>
                <div className="mt-2 text-xs text-gray-500">{((stats.completed / (stats.total || 1)) * 100).toFixed(1)}% of total</div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">On Hold</span>
                  <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center">
                    <Clock className="text-gray-500 h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-semibold text-gray-900">{stats.onHold}</div>
                <div className="mt-2 text-xs text-gray-500">{((stats.onHold / (stats.total || 1)) * 100).toFixed(1)}% of total</div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Archived</span>
                  <div className="w-8 h-8 rounded-lg bg-gray-400/10 flex items-center justify-center">
                    <Archive className="text-gray-400 h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-semibold text-gray-900">{stats.archived}</div>
                <div className="mt-2 text-xs text-gray-500">{((stats.archived / (stats.total || 1)) * 100).toFixed(1)}% of total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Controls */}
        <div id="table-controls" className="px-8 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg border-gray-200 bg-white text-gray-600 text-sm hover:bg-gray-50 transition-all flex items-center space-x-2">
                  <CheckSquare className="h-3.5 w-3.5" />
                  <span>Select all</span>
                </Button>
                <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg border-gray-200 bg-white text-gray-600 text-sm hover:bg-gray-50 transition-all flex items-center space-x-2">
                  <Tag className="h-3.5 w-3.5" />
                  <span>Bulk tag</span>
                </Button>
                <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg border-gray-200 bg-white text-gray-600 text-sm hover:bg-gray-50 transition-all flex items-center space-x-2">
                  <Archive className="h-3.5 w-3.5" />
                  <span>Archive</span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">View:</span>
                <button className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
                  <TableProperties className="h-4 w-4" />
                </button>
                <button className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-all">
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-all">
                  <Calendar className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main PRD Table */}
        <div id="prd-table" className="px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              
              {/* Table Header */}
              <div className="border-b border-gray-200 bg-gray-50/50">
                <div className="grid grid-cols-12 gap-4 px-6 py-3">
                  <div className="col-span-1 flex items-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0" />
                  </div>
                  <div className="col-span-4 flex items-center space-x-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    <span>Title</span>
                  </div>
                  <div className="col-span-2 flex items-center space-x-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    <span>Date</span>
                  </div>
                  <div className="col-span-2 flex items-center text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    <span>Type</span>
                  </div>
                  <div className="col-span-2 flex items-center text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    <span>Status</span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    <span>Actions</span>
                  </div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-100">
                {filteredDocuments.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">No documents found matching your criteria.</p>
                  </div>
                ) : (
                  filteredDocuments.map((doc) => (
                    <div key={doc.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50/50 transition-all group">
                      <div className="col-span-1 flex items-center">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0" />
                      </div>
                      <div className="col-span-4 flex items-center">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                            doc.status === "completed" ? "bg-green-500/10" : "bg-primary/10"
                          )}>
                            <FileText className={cn(
                              "h-5 w-5",
                              doc.status === "completed" ? "text-green-600" : "text-primary"
                            )} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">{doc.title}</div>
                            <div className="text-xs text-gray-500 truncate">ID: {doc.id.split('-')[0]}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <div>
                          <div className="text-sm text-gray-900">{new Date(doc.created_at).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">{new Date(doc.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <div className="flex flex-wrap gap-1.5">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none rounded-lg px-2.5 py-1 text-xs font-medium">
                            {doc.story_type || "PRD"}
                          </Badge>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className={cn(
                          "inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium",
                          doc.status === "completed" ? "bg-green-50 text-green-700" : 
                          doc.status === "in_progress" ? "bg-amber-50 text-amber-700" :
                          doc.status === "archived" ? "bg-gray-100 text-gray-600" :
                          "bg-gray-100 text-gray-500"
                        )}>
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full mr-2",
                            doc.status === "completed" ? "bg-green-500" : 
                            doc.status === "in_progress" ? "bg-amber-500" :
                            "bg-gray-400"
                          )}></span>
                          {doc.status.replace('_', ' ').charAt(0).toUpperCase() + doc.status.replace('_', ' ').slice(1)}
                        </span>
                      </div>
                      <div className="col-span-1 flex items-center justify-end">
                        <div className="flex items-center space-x-2">
                          {doc.status === "completed" && (
                            <button onClick={() => handleDownload(doc)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-all">
                              <Download className="h-4 w-4" />
                            </button>
                          )}
                          <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Pagination */}
        <div id="pagination-section" className="px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">{filteredDocuments.length}</span> of <span className="font-medium text-gray-900">{filteredDocuments.length}</span> results
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg border-gray-200 bg-white text-gray-400 hover:bg-gray-50 transition-all">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="icon" className="w-9 h-9 rounded-lg bg-primary text-white shadow-sm">
                  1
                </Button>
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg border-gray-200 bg-white text-gray-400 hover:bg-gray-50 transition-all">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div id="recent-activity-section" className="px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-sm text-primary font-medium hover:text-primary-dark transition-colors">View all</button>
              </div>
              
              <div className="space-y-4">
                {documents.slice(0, 3).map((doc, idx) => (
                  <div key={doc.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`} alt="User" className="w-9 h-9 rounded-full bg-gray-100" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">You</span>
                        <span className="text-xs text-gray-400">{doc.status === "completed" ? "completed" : "updated"}</span>
                        <span className="text-sm font-medium text-gray-900 truncate">{doc.title}</span>
                      </div>
                      <div className="text-xs text-gray-500">{new Date(doc.updated_at).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
                {documents.length === 0 && <p className="text-sm text-gray-500">No recent activity.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline View */}
        <div id="timeline-section" className="px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">PRD Timeline</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-all">7 days</Button>
                  <Button size="sm" className="h-8 px-3 rounded-lg bg-primary text-white text-xs font-medium shadow-sm">30 days</Button>
                  <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-all">90 days</Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  <div className="relative flex items-start space-x-4">
                    <div className="relative z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Rocket className="text-white h-5 w-5" />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-900">Latest Documents</span>
                        <span className="text-xs text-gray-500">{documents.slice(0, 3).length} PRDs</span>
                      </div>
                      <div className="space-y-2">
                        {documents.slice(0, 3).map(doc => (
                          <div key={doc.id} className="text-sm text-gray-600">• {doc.title}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start space-x-4">
                    <div className="relative z-10 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-white h-5 w-5" />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-900">Completed Recently</span>
                        <span className="text-xs text-gray-500">{documents.filter(d => d.status === "completed").slice(0, 2).length} PRDs</span>
                      </div>
                      <div className="space-y-2">
                        {documents.filter(d => d.status === "completed").slice(0, 2).map(doc => (
                          <div key={doc.id} className="text-sm text-gray-600">• {doc.title}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div id="footer" className="px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between py-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                © 2024 PRD Archive. All rights reserved.
              </div>
              <div className="flex items-center space-x-6">
                <button className="text-sm text-gray-500 hover:text-primary transition-colors">Help</button>
                <button className="text-sm text-gray-500 hover:text-primary transition-colors">Privacy</button>
                <button className="text-sm text-gray-500 hover:text-primary transition-colors">Terms</button>
                <button className="text-sm text-gray-500 hover:text-primary transition-colors">Contact</button>
              </div>
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

export default History;
