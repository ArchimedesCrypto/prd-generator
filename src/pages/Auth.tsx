import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wand2, 
  Loader2, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Zap, 
  Users, 
  Star,
  ArrowRight,
  Lock,
  CheckCircle2,
  Github
} from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered. Please sign in instead.");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Account created! Please check your email to verify your account.");
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password. Please try again.");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset email sent! Check your inbox.");
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <SEO 
        title="Sign In - Deepwriter AI | Access Your Account"
        description="Sign in to your Deepwriter AI account to create and manage professional documents. New users can sign up for free to get started."
        canonical="https://deepwriter.ai/auth"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Deepwriter AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Product</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Resources</a>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setActiveTab("signin")}>Sign In</Button>
            <Button className="text-sm text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm" onClick={() => setActiveTab("signup")}>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Side: Hero Content */}
            <section className="lg:sticky lg:top-32">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-2">
                    <Wand2 className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium text-primary">Trusted by 50,000+ teams</span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Welcome back to<br/>
                    <span className="text-primary">productivity</span>
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                    Sign in to access your workspace and continue building amazing things with your team. Seamless collaboration starts here.
                  </p>
                </div>

                <div className="space-y-6 pt-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">Enterprise-grade security</h3>
                      <p className="text-sm text-gray-600">Bank-level encryption and SOC 2 Type II compliance to keep your data safe</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">Lightning-fast performance</h3>
                      <p className="text-sm text-gray-600">Optimized infrastructure ensures your workspace loads in milliseconds</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">Real-time collaboration</h3>
                      <p className="text-sm text-gray-600">Work together seamlessly with your team across any device, anywhere</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mt-12">
                  <div className="flex items-center space-x-3 mb-4">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="User" className="w-12 h-12 rounded-full object-cover"/>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Sarah Chen</div>
                      <div className="text-xs text-gray-600">Product Lead at TechCorp</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    "Switching to Deepwriter AI transformed how our team collaborates. The interface is incredibly intuitive, and the performance is unmatched."
                  </p>
                  <div className="flex items-center space-x-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Right Side: Auth Form */}
            <section className="lg:pl-8">
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 lg:p-10">
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="flex items-center space-x-2 bg-gray-50 rounded-xl p-1 mb-8 h-auto">
                    <TabsTrigger 
                      value="signin" 
                      className="flex-1 py-3 px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium transition-all"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup" 
                      className="flex-1 py-3 px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium transition-all"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="mt-0">
                    <form onSubmit={handleSignIn} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <div className="relative">
                          <Input 
                            id="email"
                            type="email" 
                            placeholder="name@company.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm h-12"
                            required
                          />
                          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <button 
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-xs text-primary hover:underline transition-colors"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative">
                          <Input 
                            id="password"
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm h-12"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-medium text-sm transition-all shadow-sm"
                        disabled={loading}
                      >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Sign in to your account
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-4 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <Button 
                          type="button"
                          variant="outline" 
                          className="w-full py-6 rounded-xl border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700"
                          onClick={() => handleSocialLogin('google')}
                        >
                          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          Continue with Google
                        </Button>
                        <Button 
                          type="button"
                          variant="outline" 
                          className="w-full py-6 rounded-xl border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700"
                          onClick={() => handleSocialLogin('github')}
                        >
                          <Github className="h-5 w-5 mr-3" />
                          Continue with GitHub
                        </Button>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          Don't have an account?{" "}
                          <button 
                            type="button"
                            onClick={() => setActiveTab("signup")}
                            className="text-primary hover:underline font-medium transition-colors"
                          >
                            Sign up for free
                          </button>
                        </p>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="mt-0">
                    <form onSubmit={handleSignUp} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Work email</Label>
                        <div className="relative">
                          <Input 
                            id="signup-email"
                            type="email" 
                            placeholder="name@company.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm h-12"
                            required
                          />
                          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Create password</Label>
                        <div className="relative">
                          <Input 
                            id="signup-password"
                            type={showPassword ? "text" : "password"} 
                            placeholder="Minimum 8 characters" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm h-12"
                            required
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <CheckCircle2 className="h-3 w-3 text-gray-300" />
                            <span>At least 8 characters</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-medium text-sm transition-all shadow-sm"
                        disabled={loading}
                      >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Create your account
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <Button 
                          type="button"
                          variant="outline" 
                          className="w-full py-6 rounded-xl border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700"
                          onClick={() => handleSocialLogin('google')}
                        >
                          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          Sign up with Google
                        </Button>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          Already have an account?{" "}
                          <button 
                            type="button"
                            onClick={() => setActiveTab("signin")}
                            className="text-primary hover:underline font-medium transition-colors"
                          >
                            Sign in
                          </button>
                        </p>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="mt-8 flex items-center justify-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Lock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">256-bit SSL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">SOC 2 Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">GDPR Ready</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-8">Trusted by industry leaders</p>
            <div className="flex items-center justify-center space-x-12 opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">Deepwriter AI</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">Building the future of team collaboration, one feature at a time.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm">© 2024 Deepwriter AI. All rights reserved.</p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;