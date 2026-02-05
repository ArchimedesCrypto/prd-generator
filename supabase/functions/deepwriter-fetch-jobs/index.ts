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

    const { jobIds } = await req.json();

    if (!jobIds || !Array.isArray(jobIds) || jobIds.length === 0) {
      throw new Error("jobIds array is required");
    }

    console.log("Fetching job statuses for:", { jobIds });

    // Fetch all job statuses in parallel
    const jobPromises = jobIds.map(async (jobId: string) => {
      try {
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
          console.error(`Failed to fetch job ${jobId}:`, response.status);
          return null;
        }

        const jobData = await response.json();
        console.log(`Job ${jobId} status:`, {
          id: jobData.id,
          status: jobData.status,
          percent_complete: jobData.percent_complete,
          has_pdf: !!jobData.output_url_pdf,
        });

        return {
          job_id: jobData.id,
          status: jobData.status,
          percent_complete: jobData.percent_complete || 0,
          pdf_url: jobData.output_url_pdf,
          title: jobData.title,
        };
      } catch (error) {
        console.error(`Error fetching job ${jobId}:`, error);
        return null;
      }
    });

    const jobs = (await Promise.all(jobPromises)).filter(Boolean);

    return new Response(
      JSON.stringify({ jobs }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error fetching jobs:", error);
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
