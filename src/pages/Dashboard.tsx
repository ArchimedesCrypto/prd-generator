import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Loader2, 
  LogOut, 
  Bell, 
  CircleHelp, 
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
  Plus, 
  Download, 
  CheckCircle2, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowDown, 
  ArrowUp, 
  Server, 
  Database, 
  Zap, 
  ShieldHalf, 
  Lock, 
  Certificate,
  LayoutGrid
} from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          navigate("/auth");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <SEO 
        title="Dashboard - PRD Generator"
        description="Manage your subscription, payment methods, and view transaction history"
      />

      {/* Header */}
      <div id="header" className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
                <LayoutGrid className="text-white h-4 w-4" />
              </div>
              <span className="text-lg font-semibold text-gray-900">FinanceHub</span>
            </div>
            <nav className="flex items-center space-x-1">
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
              <span className="text-xs font-medium text-white">JD</span>
            </div>
            <button onClick={handleSignOut} className="text-gray-500 hover:text-gray-900">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside id="sidebar" className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
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
                  <ShieldCheck className="w-4 h-4 mr-3" />
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
                  <button className="w-full px-3 py-1.5 bg-sky-600 text-white text-xs font-medium rounded-lg hover:bg-sky-600/90 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div id="page-header" class="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-semibold text-gray-900">Billing & Payments</h1>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all flex items-center">
                    <Download className="mr-2 h-3 w-3" />
                    Export
                  </button>
                  <button className="px-4 py-2 text-sm text-white bg-sky-600 rounded-xl hover:bg-sky-600/90 transition-all shadow-sm flex items-center">
                    <Plus className="mr-2 h-3 w-3" />
                    Add Payment Method
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500">Manage your subscription, payment methods, and view transaction history</p>
            </div>

            {/* Subscription Status */}
            <section id="subscription-status" className="mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-lg font-semibold text-gray-900">Current Subscription</h2>
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">Active</span>
                    </div>
                    <p className="text-sm text-gray-500">Your subscription renews on March 15, 2024</p>
                  </div>
                  <button className="text-sm text-sky-600 hover:text-sky-600/80 font-medium">Manage Plan</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Plan Type</div>
                    <div className="text-lg font-semibold text-gray-900">Professional</div>
                    <div className="text-xs text-gray-500 mt-1">Monthly billing</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Monthly Cost</div>
                    <div className="text-lg font-semibold text-gray-900">$49.00</div>
                    <div className="text-xs text-emerald-600 mt-1 flex items-center">
                      <ArrowDown className="h-2 w-2 mr-1" />
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
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                        <span className="text-sm text-gray-600">Unlimited projects</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                        <span className="text-sm text-gray-600">Advanced analytics</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                        <span className="text-sm text-gray-600">Priority support</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                        <span className="text-sm text-gray-600">Custom integrations</span>
                      </div>
                    </div>
                    <button className="text-sm text-sky-600 hover:text-sky-600/80 font-medium">View All Features</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Methods */}
            <section id="payment-methods" className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                <button className="text-sm text-sky-600 hover:text-sky-600/80 font-medium flex items-center">
                  <Plus className="mr-1 h-3 w-3" />
                  Add New
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm relative overflow-hidden">
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 bg-sky-600/10 text-sky-600 text-xs font-medium rounded-full">Primary</span>
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
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm relative overflow-hidden">
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
                </div>
              </div>
            </section>

            {/* Usage Statistics */}
            <section id="usage-statistics" className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Usage Period</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
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
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
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
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
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
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Zap className="text-orange-600 h-5 w-5" />
                    </div>
                    <span className="text-xs text-emerald-600">Unlimited</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Projects</div>
                  <div className="text-2xl font-semibold text-gray-900 mb-2">24</div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-orange-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">No limit on plan</div>
                </div>
              </div>
            </section>

            {/* Recent Invoices */}
            <section id="invoice-list" className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input type="text" placeholder="Search invoices..." className="w-64 pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-3 w-3" />
                  </div>
                  <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all flex items-center">
                    <Filter className="mr-2 h-3 w-3" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-sky-600/10 rounded-lg flex items-center justify-center mr-3">
                              <FileText className="text-sky-600 h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">INV-2024-0215</div>
                              <div className="text-xs text-gray-500">February billing</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">Feb 15, 2024</div>
                          <div className="text-xs text-gray-500">Due: Feb 22, 2024</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">Professional Plan</div>
                          <div className="text-xs text-gray-500">Monthly subscription</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">$49.00</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">Paid</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-sm text-sky-600 hover:text-sky-600/80 font-medium mr-3 flex items-center inline-flex">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </button>
                          <button className="text-sm text-gray-500 hover:text-gray-700">
                            <MoreVertical className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Payment Security */}
            <section id="payment-security" className="mb-8">
              <div className="bg-gray-900 rounded-xl p-8 text-white shadow-lg">
                <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <ShieldHalf className="text-emerald-400 h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold">Secure Payment Processing</h3>
                    </div>
                    <p className="text-gray-300 mb-6 max-w-2xl">All transactions are encrypted and processed through industry-leading payment providers. Your payment information is never stored on our servers.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <Lock className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="text-sm font-medium">SSL Encrypted</div>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <ShieldCheck className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="text-sm font-medium">PCI Compliant</div>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <User className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="text-sm font-medium">Data Protected</div>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <Certificate className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="text-sm font-medium">Verified Secure</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
