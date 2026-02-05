import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, CreditCard, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PAYMENT_CONFIG, formatPrice } from "@/config/payments";

interface CreditsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreditsModal = ({ open, onOpenChange, onSuccess }: CreditsModalProps) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (type: "creditPack" | "subscription") => {
    setLoading(type);
    
    try {
      const config = PAYMENT_CONFIG[type];
      const functionName = type === "creditPack" ? "create-payment" : "create-checkout";
      
      console.log(`Calling ${functionName} with price_id:`, config.price_id);
      
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: { price_id: config.price_id },
      });

      if (error) {
        console.error("Error creating checkout:", error);
        throw error;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, "_blank");
        toast.success("Checkout opened in new tab");
        onOpenChange(false);
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to start checkout");
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Get More Credits</DialogTitle>
          <DialogDescription>
            Choose the option that best fits your needs
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* One-time purchase option */}
          <Card className="p-6 border-2 hover:border-primary transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{PAYMENT_CONFIG.creditPack.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {PAYMENT_CONFIG.creditPack.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{formatPrice(PAYMENT_CONFIG.creditPack.amount)}</p>
                <p className="text-xs text-muted-foreground">one-time</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">✓</span>
                <span>{PAYMENT_CONFIG.creditPack.credits} credits</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">✓</span>
                <span>No expiration</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">✓</span>
                <span>Use anytime</span>
              </div>
            </div>

            <Button 
              onClick={() => handlePurchase("creditPack")}
              disabled={loading !== null}
              className="w-full"
            >
              {loading === "creditPack" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Opening checkout...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Purchase Credits
                </>
              )}
            </Button>
          </Card>

          {/* Subscription option */}
          <Card className="p-6 border-2 border-primary hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    {PAYMENT_CONFIG.subscription.name}
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      BEST VALUE
                    </span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {PAYMENT_CONFIG.subscription.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{formatPrice(PAYMENT_CONFIG.subscription.amount)}</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">✓</span>
                <span>{PAYMENT_CONFIG.subscription.credits} credits every month</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">✓</span>
                <span>Auto-renewed monthly</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">✓</span>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">✓</span>
                <span className="font-semibold">Save {formatPrice((PAYMENT_CONFIG.creditPack.amount * 3) - PAYMENT_CONFIG.subscription.amount)} per month</span>
              </div>
            </div>

            <Button 
              onClick={() => handlePurchase("subscription")}
              disabled={loading !== null}
              className="w-full"
              variant="default"
            >
              {loading === "subscription" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Opening checkout...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Subscribe Now
                </>
              )}
            </Button>
          </Card>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Payments are securely processed by Stripe
        </p>
      </DialogContent>
    </Dialog>
  );
};
