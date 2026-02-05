import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Loader2, 
  LogOut, 
  Menu, 
  X, 
  CreditCard, 
  FileText, 
  Clock, 
  Wallet, 
  ChartLine, 
  User, 
  Users, 
  Settings, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  ArrowDown, 
  ArrowUp, 
  Server, 
  Database, 
  Bolt, 
  CheckCircle, 
  MoreVertical,
  Bell,
  CircleHelp,
  ShieldHalf
} from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { CreditsModal } from "@/components/CreditsModal";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(1);
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
        setLoading(false);
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
        title="Billing - FinanceHub | Manage your subscription"
        description="Manage your subscription, payment methods, and view transaction history."
        canonical="https://yourdomain.com/dashboard"
      />

      {/* Header */}
      <div id="header" className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
                <Server className="text-white h-4 w-4" />
              </div>
              <span className="text-lg font-semibold text-gray-900">FinanceHub</span>
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              <button onClick={() => navigate("/app")} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">Dashboard</button>
              <button className="px-3 py-2 text-sm text-gray-900 bg-gray-100 rounded-lg">Billing</button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">Analytics</button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">Settings</button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
              <Bell className="h-4 w-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
              <CircleHelp className="h-4 w-4" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xs font-medium text-white">{user.email?.substring(0, 2).toUpperCase()}</span>
            </div>
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
          <div className="md:hidden bg-white border-t border-gray-200 p-4">
            <nav className="flex flex-col space-y-2">
              <button onClick={() => { navigate("/app"); setMobileMenuOpen(false); }} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-left">Dashboard</button>
              <button className="px-3 py-2 text-sm text-gray-900 bg-gray-100 rounded-lg text-left">Billing</button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-left">Analytics</button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-left">Settings</button>
              <button onClick={handleSignOut} className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg text-left flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </nav>
          </div>
        )}
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside id="sidebar" className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="mb-8">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Billing</div>
              <nav className="space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg">
                  <CreditCard className="w-4 h-4 mr-3 text-sky-600" />
                  Overview
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                  <FileText className="w-4 h-4 mr-3" />
                  Invoices
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                  <Clock className="w-4 h-4 mr-3" />
                  Transactions
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                  <Wallet className="w-4 h-4 mr-3" />
                  Payment Methods
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                  <ChartLine className="w-4 h-4 mr-3" />
                  Usage & Limits
                </a>
              </nav>
            </div>

            <div className="mb-8">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Account</div>
              <nav className="space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                  <Users className="w-4 h-4 mr-3" />
                  Team
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                  <Settings className="w-4 h-4 mr-3" />
                  Preferences
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                  <ShieldHalf className="w-4 h-4 mr-3" />
                  Security
                </a>
              </nav>
            </div>

            <div className="p-4 bg-gradient-to-br from-sky-600/5 to-blue-50 rounded-xl border border-sky-600/10">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-sky-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-sky-600 h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">Upgrade to Pro</div>
                  <div className="text-xs text-gray-600 mb-3">Unlock advanced features and unlimited access</div>
                  <button 
                    onClick={() => setCreditsModalOpen(true)}
                    className="w-full px-3 py-1.5 bg-sky-600 text-white text-xs font-medium rounded-lg hover:bg-sky-600/90 transition-all"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div id="page-header" className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                <h1 className="text-3xl font-semibold text-gray-900">Billing & Payments</h1>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="rounded-xl border-gray-200 hover:border-gray-300">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button className="bg-sky-600 hover:bg-sky-600/90 rounded-xl shadow-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">Manage your subscription, payment methods, and view transaction history</p>
            </div>

            <section id="subscription-status" className="mb-8">
              <Card className="p-6 shadow-sm border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-lg font-semibold text-gray-900">Current Subscription</h2>
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-500">Your subscription renews on March 15, 2024</p>
                  </div>
                  <button className="text-sm text-sky-600 hover:text-sky-600/80 font-medium">Manage Plan</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Plan Type</div>
                    <div className="text-lg font-semibold text-gray-900">Professional</div>
                    <div className="text-xs text-gray-500 mt-1">Monthly billing</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Monthly Cost</div>
                    <div className="text-lg font-semibold text-gray-900">$49.00</div>
                    <div className="text-xs text-emerald-600 mt-1 flex items-center">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      Save $98/year
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Next Billing Date</div>
                    <div className="text-lg font-semibold text-gray-900">Mar 15</div>
                    <div className="text-xs text-gray-500 mt-1">21 days remaining</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Team Members</div>
                    <div className="text-lg font-semibold text-gray-900">8 / 10</div>
                    <div className="text-xs text-gray-500 mt-1">2 seats available</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="text-emerald-500 h-4 w-4" />
                        <span className="text-sm text-gray-600">Unlimited projects</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="text-emerald-500 h-4 w-4" />
                        <span className="text-sm text-gray-600">Advanced analytics</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="text-emerald-500 h-4 w-4" />
                        <span className="text-sm text-gray-600">Priority support</span>
                      </div>
                    </div>
                    <button className="text-sm text-sky-600 hover:text-sky-600/80 font-medium">View All Features</button>
                  </div>
                </div>
              </Card>
            </section>

            <section id="payment-methods" className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                <button className="text-sm text-sky-600 hover:text-sky-600/80 font-medium flex items-center">
                  <Plus className="h-3 w-3 mr-1" />
                  Add New
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="p-5 shadow-sm relative overflow-hidden border-gray-200">
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-sky-600/10 text-sky-600 border-none hover:bg-sky-600/10">Primary</Badge>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CreditCard className="text-white h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900 mb-1">Visa ending in 4242</div>
                      <div className="text-xs text-gray-500 mb-3">Expires 12/2025</div>
                      <div className="flex items-center space-x-3">
                        <button className="text-xs text-sky-600 hover:text-sky-600/80 font-medium">Edit</button>
                        <button className="text-xs text-gray-500 hover:text-gray-700">Remove</button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 shadow-sm relative overflow-hidden border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CreditCard className="text-white h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900 mb-1">Mastercard ending in 8888</div>
                      <div className="text-xs text-gray-500 mb-3">Expires 08/2024</div>
                      <div className="flex items-center space-x-3">
                        <button className="text-xs text-sky-600 hover:text-sky-600/80 font-medium">Set as Primary</button>
                        <button className="text-xs text-gray-500 hover:text-gray-700">Edit</button>
                        <button className="text-xs text-gray-500 hover:text-gray-700">Remove</button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            <section id="usage-statistics" className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Usage Period</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 shadow-sm border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-sky-600/10 rounded-lg flex items-center justify-center">
                      <Server className="text-sky-600 h-5 w-5" />
                    </div>
                    <span className="text-xs text-gray-500">75% used</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-1">API Requests</div>
                  <div className="text-2xl font-semibold text-gray-900 mb-2">75,432</div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-sky-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">of 100,000 requests</div>
                </Card>

                <Card className="p-5 shadow-sm border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Database className="text-purple-600 h-5 w-5" />
                    </div>
                    <span className="text-xs text-gray-500">42% used</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Storage</div>
                  <div className="text-2xl font-semibold text-gray-900 mb-2">42 GB</div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">of 100 GB storage</div>
                </Card>

                <Card className="p-5 shadow-sm border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Users className="text-emerald-600 h-5 w-5" />
                    </div>
                    <span className="text-xs text-gray-500">80% used</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Team Seats</div>
                  <div className="text-2xl font-semibold text-gray-900 mb-2">8 / 10</div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">2 seats available</div>
                </Card>

                <Card className="p-5 shadow-sm border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Bolt className="text-orange-600 h-5 w-5" />
                    </div>
                    <span className="text-xs text-emerald-600">Unlimited</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Projects</div>
                  <div className="text-2xl font-semibold text-gray-900 mb-2">24</div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-orange-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">No limit on plan</div>
                </Card>
              </div>
            </section>

            <section id="invoice-list" className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Input placeholder="Search invoices..." className="w-full md:w-64 pl-9 rounded-xl border-gray-200" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  <Button variant="outline" className="rounded-xl border-gray-200">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>

              <Card className="shadow-sm border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { id: 'INV-2024-0215', date: 'Feb 15, 2024', amount: '$49.00', status: 'Paid' },
                        { id: 'INV-2024-0115', date: 'Jan 15, 2024', amount: '$49.00', status: 'Paid' },
                        { id: 'INV-2023-1215', date: 'Dec 15, 2023', amount: '$49.00', status: 'Paid' },
                      ].map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-sky-600/10 rounded-lg flex items-center justify-center mr-3">
                                <FileText className="text-sky-600 h-4 w-4" />
                              </div>
                              <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{invoice.date}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">{invoice.amount}</td>
                          <td className="px-6 py-4">
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">Paid</Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-sm text-sky-600 hover:text-sky-600/80 font-medium mr-3">Download</button>
                            <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="h-4 w-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            <section id="payment-security" className="mb-8">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white shadow-lg">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <ShieldCheck className="text-emerald-400 h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold">Secure Payment Processing</h3>
                    </div>
                    <p className="text-gray-300 mb-6 max-w-2xl">All transactions are encrypted and processed through industry-leading payment providers. Your payment information is never stored on our servers.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <ShieldCheck className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="text-xs font-medium">SSL Encrypted</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <ShieldCheck className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="text-xs font-medium">PCI Compliant</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <CreditsModal 
        open={creditsModalOpen} 
        onOpenChange={setCreditsModalOpen}
        onSuccess={() => {
          if (user?.id) fetchCredits(user.id);
          toast.success("Credits updated!");
        }}
      />
    </div>
  );
};

export default Dashboard;
