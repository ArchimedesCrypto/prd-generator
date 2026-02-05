import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEEPWRITER_API_KEY = Deno.env.get("DEEPWRITER_API_KEY");
const DEEPWRITER_BASE_URL = "https://app.deepwriter.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    if (!DEEPWRITER_API_KEY) {
      throw new Error("DEEPWRITER_API_KEY not configured");
    }

    const { jobId } = await req.json();

    if (!jobId) {
      throw new Error("jobId is required");
    }

    console.log("Checking job status:", { jobId });

    const response = await fetch(
      `${DEEPWRITER_BASE_URL}/api/getJobStatus?jobId=${jobId}`,
      {
        method: "GET",
        headers: {
          "x-api-key": DEEPWRITER_API_KEY,
          "Origin": DEEPWRITER_BASE_URL,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch job status: ${errorData.error || "Unknown error"}`);
    }

    const jobData = await response.json();
    console.log("Job status response:", jobData);

    return new Response(
      JSON.stringify({
        status: jobData.status,
        percent_complete: jobData.percent_complete || 0,
        pdf_url: jobData.output_url_pdf,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error checking job status:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
