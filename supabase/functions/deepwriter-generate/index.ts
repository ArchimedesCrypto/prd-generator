import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEEPWRITER_API_KEY = Deno.env.get("DEEPWRITER_API_KEY");
const DEEPWRITER_BASE_URL = "https://app.deepwriter.com";

interface CampaignRequest {
  title: string;
  num_players: number;
  party_composition: string[];
  story_type: string;
  include_riddles: boolean;
  additional_notes?: string;
  action?: string;
  project_id?: string;
  questions_answers?: string;
  formatted_prompt?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get user from auth header
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

    // Check content type to determine how to parse the body
    const contentType = req.headers.get("content-type") || "";
    
    // Handle file upload action separately (uses FormData)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file");
      const projectId = formData.get("project_id");
      
      if (!file || !(file instanceof File)) {
        throw new Error("No file provided");
      }

      if (!projectId || typeof projectId !== "string") {
        throw new Error("Project ID is required for file upload");
      }

      // Create new FormData for DeepWriter
      const deepwriterFormData = new FormData();
      deepwriterFormData.append("file", file);
      deepwriterFormData.append("projectId", projectId);

      const uploadResponse = await fetch(`${DEEPWRITER_BASE_URL}/api/uploadProjectFiles`, {
        method: "POST",
        headers: {
          "x-api-key": DEEPWRITER_API_KEY!,
          "Origin": DEEPWRITER_BASE_URL,
        },
        body: deepwriterFormData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || "Failed to upload file");
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: `File uploaded successfully`,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // For all other actions, parse as JSON
    const campaignData: CampaignRequest = await req.json();

    // Check campaign limit (3 max) - only for generation actions, not prepare/update
    if (!campaignData.action || campaignData.action === "") {
      const { count, error: countError } = await supabase
        .from("campaigns")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if (countError) {
        console.error("Error checking campaign count:", countError);
      } else if (count !== null && count >= 3) {
        throw new Error("You have reached the maximum of 3 campaigns. Try the full featured product at DeepWriter.com!");
      }
    }

    // Handle prepare action - format prompt and create project
    if (campaignData.action === "prepare") {
      const prompt = buildCampaignPrompt(campaignData);
      
      console.log("Calling formatPrompt...");
      
      const formatResponse = await fetch(`${DEEPWRITER_BASE_URL}/api/formatPrompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": DEEPWRITER_API_KEY,
          "Origin": DEEPWRITER_BASE_URL,
        },
        body: JSON.stringify({ prompt }),
      });

      const formatData = await formatResponse.json();
      console.log("FormatPrompt response:", JSON.stringify(formatData));

      if (!formatResponse.ok) {
        throw new Error(`Failed to format prompt: ${formatData.error || "Unknown error"}`);
      }

      // Create DeepWriter project
      console.log("Creating DeepWriter project...");
      const createProjectResponse = await fetch(`${DEEPWRITER_BASE_URL}/api/createProject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": DEEPWRITER_API_KEY,
          "Origin": DEEPWRITER_BASE_URL,
        },
        body: JSON.stringify({
          newProjectName: campaignData.title,
        }),
      });

      const createProjectData = await createProjectResponse.json();
      if (!createProjectResponse.ok || !createProjectData.id) {
        throw new Error(`Failed to create project: ${createProjectData.error || "Unknown error"}`);
      }

      const projectId = createProjectData.id;
      console.log("Created project:", projectId);

      // Update project with formatted prompt
      const updateProjectResponse = await fetch(
        `${DEEPWRITER_BASE_URL}/api/updateProject?projectId=${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": DEEPWRITER_API_KEY,
            "Origin": DEEPWRITER_BASE_URL,
          },
          body: JSON.stringify({
            author: "D&D Campaign Generator",
            email: user.email,
            model: "default",
            prompt: formatData.formattedPrompt || formatData.enhanced_prompt,
            outline_text: "",
            style_text: "",
            supplemental_info: campaignData.additional_notes || "",
            questions_answers: [],
          }),
        }
      );

      if (!updateProjectResponse.ok) {
        const updateError = await updateProjectResponse.json();
        throw new Error(`Failed to update project: ${updateError.error || "Unknown error"}`);
      }

      console.log("Updated project successfully");

      return new Response(
        JSON.stringify({
          success: true,
          projectId: projectId,
          formattedPrompt: formatData.formattedPrompt || formatData.enhanced_prompt,
          questions: formatData.questions,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }


    // Handle format prompt action (legacy)
    if (campaignData.action === "formatPrompt") {
      const prompt = buildCampaignPrompt(campaignData);
      
      console.log("Calling formatPrompt...");
      
      const formatResponse = await fetch(`${DEEPWRITER_BASE_URL}/api/formatPrompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": DEEPWRITER_API_KEY,
          "Origin": DEEPWRITER_BASE_URL,
        },
        body: JSON.stringify({ prompt }),
      });

      const formatData = await formatResponse.json();
      console.log("FormatPrompt response:", JSON.stringify(formatData));

      if (!formatResponse.ok) {
        throw new Error(`Failed to format prompt: ${formatData.error || "Unknown error"}`);
      }

      return new Response(
        JSON.stringify({
          success: true,
          formattedPrompt: formatData.formattedPrompt,
          questions: formatData.questions,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Handle update project with questions/answers
    if (campaignData.action === "updateQuestions" && campaignData.project_id) {
      console.log("Updating project with questions/answers...");
      
      const updateResponse = await fetch(
        `${DEEPWRITER_BASE_URL}/api/updateProject?projectId=${campaignData.project_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": DEEPWRITER_API_KEY,
            "Origin": DEEPWRITER_BASE_URL,
          },
          body: JSON.stringify({
            email: user.email,
            questions_answers: campaignData.questions_answers ? JSON.parse(campaignData.questions_answers) : [],
          }),
        }
      );

      if (!updateResponse.ok) {
        const updateError = await updateResponse.json();
        throw new Error(`Failed to update questions: ${updateError.error || "Unknown error"}`);
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Use formatted prompt if available, otherwise build it
    const prompt = campaignData.formatted_prompt || buildCampaignPrompt(campaignData);
    const projectId = campaignData.project_id;

    if (!projectId) {
      throw new Error("Project ID is required for generation");
    }

    console.log("Updating project with final questions/answers...");

    // Update project with final questions and answers
    const updateProjectResponse = await fetch(
      `${DEEPWRITER_BASE_URL}/api/updateProject?projectId=${projectId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": DEEPWRITER_API_KEY,
          "Origin": DEEPWRITER_BASE_URL,
        },
        body: JSON.stringify({
          email: user.email,
          questions_answers: campaignData.questions_answers ? JSON.parse(campaignData.questions_answers) : [],
        }),
      }
    );

    if (!updateProjectResponse.ok) {
      const updateError = await updateProjectResponse.json();
      throw new Error(`Failed to update project: ${updateError.error || "Unknown error"}`);
    }

    console.log("Updated project successfully");

    // Generate campaign work
    const generatePayload = {
      projectId: projectId,
      prompt: prompt,
      author: "D&D Campaign Generator",
      email: user.email,
      outline_text: "",
      style_text: "",
      supplemental_info: "",
      has_technical_diagrams: "off",
      has_tableofcontents: "on",
      use_web_research: "auto",
      page_length: "10",
      questions_answers: campaignData.questions_answers ? JSON.parse(campaignData.questions_answers) : [],
      mode: "deepwriter",
      model: "default",
      isDefault: true,
    };

    console.log("Generating work with payload:", JSON.stringify(generatePayload));

    const generateResponse = await fetch(`${DEEPWRITER_BASE_URL}/api/generateWizardWork`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": DEEPWRITER_API_KEY,
        "Origin": DEEPWRITER_BASE_URL,
      },
      body: JSON.stringify(generatePayload),
    });

    const generateData = await generateResponse.json();
    console.log("Generate response status:", generateResponse.status);
    console.log("Generate response data:", JSON.stringify(generateData));
    
    if (!generateResponse.ok || !generateData.jobId) {
      throw new Error(`Failed to generate work: ${JSON.stringify(generateData)}`);
    }

    const jobId = generateData.jobId;
    console.log("Started generation job:", jobId);

    // Save to database
    const { error: dbError } = await supabase.from("campaigns").insert({
      user_id: user.id,
      title: campaignData.title,
      num_players: campaignData.num_players,
      party_composition: campaignData.party_composition,
      story_type: campaignData.story_type,
      include_riddles: campaignData.include_riddles,
      additional_notes: campaignData.additional_notes,
      deepwriter_project_id: projectId,
      deepwriter_job_id: jobId,
      status: "pending",
      content: JSON.stringify({
        formatted_prompt: prompt,
        questions_answers: campaignData.questions_answers || "[]",
      }),
    });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save campaign to database");
    }

    return new Response(
      JSON.stringify({
        success: true,
        projectId,
        jobId,
        message: "Campaign generation started successfully",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in generate-campaign function:", error);
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

function buildCampaignPrompt(data: CampaignRequest): string {
  const partyDescription = data.party_composition.join(", ");
  const riddlesNote = data.include_riddles
    ? "Include challenging riddles and puzzles throughout the adventure."
    : "";

  return `Create a complete D&D campaign titled "${data.title}" for ${data.num_players} players.

Party Composition: ${partyDescription}

Story Type: ${data.story_type}

Requirements:
- Do not mention Dungeons and Dragons trademarks
- Craft an engaging storyline that fits the ${data.story_type.toLowerCase()} theme
- Create memorable NPCs with distinct personalities, motivations, and secrets
- Design balanced encounters appropriate for a party of ${data.num_players} with the classes: ${partyDescription}
- Include detailed descriptions of locations, plot hooks, and potential story branches
- Provide clear quest objectives and possible resolutions
${riddlesNote}

${data.additional_notes ? `Additional Notes:\n${data.additional_notes}` : ""}

The campaign should be adventure-ready with all the details a Dungeon Master needs to run an engaging session. Include combat encounters, social interactions, exploration challenges, and opportunities for player creativity.`;
}