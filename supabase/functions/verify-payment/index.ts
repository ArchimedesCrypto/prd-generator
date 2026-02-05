import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    console.log("[VERIFY-PAYMENT] Function started");
    
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData } = await supabaseClient.auth.getUser(token);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");
    
    console.log("[VERIFY-PAYMENT] User authenticated:", user.id);

    const { session_id, credits } = await req.json();
    if (!session_id || !credits) throw new Error("session_id and credits are required");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Verify the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("[VERIFY-PAYMENT] Session status:", session.payment_status);
    
    if (session.payment_status === "paid" && session.metadata?.user_id === user.id) {
      // Update user credits
      const { data: profile, error: profileError } = await supabaseClient
        .from("profiles")
        .select("credits")
        .eq("user_id", user.id)
        .single();

      if (profileError) throw profileError;

      const newCredits = (profile.credits || 0) + credits;
      
      const { error: updateError } = await supabaseClient
        .from("profiles")
        .update({ credits: newCredits })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      // Record transaction
      const { error: transactionError } = await supabaseClient
        .from("credit_transactions")
        .insert({
          user_id: user.id,
          amount: credits,
          transaction_type: "purchase",
          description: `Purchased ${credits} credits`,
          stripe_payment_id: session.payment_intent as string,
        });

      if (transactionError) throw transactionError;

      console.log("[VERIFY-PAYMENT] Credits added successfully:", newCredits);

      return new Response(JSON.stringify({ 
        success: true, 
        credits: newCredits 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      console.log("[VERIFY-PAYMENT] Payment not completed or user mismatch");
      return new Response(JSON.stringify({ 
        success: false, 
        message: "Payment not completed" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
  } catch (error) {
    console.error("[VERIFY-PAYMENT] Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
