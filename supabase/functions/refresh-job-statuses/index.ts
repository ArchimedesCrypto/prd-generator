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

  const startTime = Date.now();
  console.log("Starting periodic job status refresh...");

  try {
    // Create Supabase client with service role key for server-side operations
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    if (!DEEPWRITER_API_KEY) {
      throw new Error("DEEPWRITER_API_KEY not configured");
    }

    // Fetch all documents with pending/processing status
    const { data: pendingDocs, error: fetchError } = await supabase
      .from("documents")
      .select("id, deepwriter_job_id, title, status")
      .in("status", ["pending", "processing"])
      .not("deepwriter_job_id", "is", null);

    if (fetchError) {
      console.error("Error fetching pending documents:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${pendingDocs?.length || 0} documents to check`);

    if (!pendingDocs || pendingDocs.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: "No pending jobs to refresh",
          checked: 0,
          updated: 0,
          duration_ms: Date.now() - startTime
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check status for each job
    const updatePromises = pendingDocs.map(async (doc) => {
      try {
        console.log(`Checking status for job: ${doc.deepwriter_job_id}`);

        const response = await fetch(
          `${DEEPWRITER_BASE_URL}/api/getJobStatus?jobId=${doc.deepwriter_job_id}`,
          {
            method: "GET",
            headers: {
              "x-api-key": DEEPWRITER_API_KEY,
              "Origin": DEEPWRITER_BASE_URL,
            },
          }
        );

        if (!response.ok) {
          console.error(`Failed to fetch status for job ${doc.deepwriter_job_id}:`, response.status);
          return { success: false, jobId: doc.deepwriter_job_id };
        }

        const jobData = await response.json();
        const newStatus = jobData.status;
        const pdfUrl = jobData.output_url_pdf;

        console.log(`Job ${doc.deepwriter_job_id} status: ${newStatus}`);

        // Only update if status has changed
        if (newStatus !== doc.status) {
          const updateData: any = {
            status: newStatus,
            updated_at: new Date().toISOString(),
          };

          // If completed and has PDF, store the URL
          if (newStatus === "completed" && pdfUrl) {
            updateData.content = pdfUrl;
          }

          const { error: updateError } = await supabase
            .from("documents")
            .update(updateData)
            .eq("id", doc.id);

          if (updateError) {
            console.error(`Error updating document ${doc.id}:`, updateError);
            return { success: false, jobId: doc.deepwriter_job_id };
          }

          console.log(`Updated document ${doc.id} to status: ${newStatus}`);
          return { success: true, jobId: doc.deepwriter_job_id, updated: true };
        }

        return { success: true, jobId: doc.deepwriter_job_id, updated: false };
      } catch (error) {
        console.error(`Error processing job ${doc.deepwriter_job_id}:`, error);
        return { success: false, jobId: doc.deepwriter_job_id };
      }
    });

    const results = await Promise.all(updatePromises);
    const successful = results.filter(r => r.success).length;
    const updated = results.filter(r => r.updated).length;

    const duration = Date.now() - startTime;
    console.log(`Job refresh completed: ${successful}/${results.length} successful, ${updated} updated, ${duration}ms`);

    return new Response(
      JSON.stringify({
        message: "Job status refresh completed",
        checked: results.length,
        successful,
        updated,
        duration_ms: duration,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in refresh-job-statuses:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred",
        duration_ms: Date.now() - startTime,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
