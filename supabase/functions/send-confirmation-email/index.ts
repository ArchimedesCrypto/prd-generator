import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  name?: string;
  platformName?: string;
  fromEmail?: string;
  fromName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      email, 
      name = "there",
      platformName = "Deepwriter AI",
      fromEmail = "onboarding@resend.dev",
      fromName = "Deepwriter AI Team"
    }: ConfirmationEmailRequest = await req.json();

    console.log(`Sending confirmation email to: ${email}`);

    if (!email) {
      throw new Error("Email is required");
    }

    const emailResponse = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [email],
      subject: `Welcome to ${platformName}!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #000 0%, #333 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background: #fff;
                padding: 30px 20px;
                border: 1px solid #e5e5e5;
                border-top: none;
                border-radius: 0 0 8px 8px;
              }
              h1 {
                margin: 0;
                font-size: 28px;
              }
              .greeting {
                font-size: 18px;
                margin-bottom: 20px;
              }
              .message {
                font-size: 16px;
                margin-bottom: 20px;
              }
              .features {
                background: #f9f9f9;
                padding: 20px;
                border-radius: 6px;
                margin: 20px 0;
              }
              .features h2 {
                margin-top: 0;
                font-size: 18px;
                color: #000;
              }
              .features ul {
                margin: 10px 0;
                padding-left: 20px;
              }
              .features li {
                margin: 8px 0;
              }
              .cta {
                text-align: center;
                margin: 30px 0;
              }
              .button {
                display: inline-block;
                padding: 12px 30px;
                background: #000;
                color: white !important;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
              }
              .footer {
                text-align: center;
                color: #666;
                font-size: 14px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e5e5;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Welcome to ${platformName}!</h1>
            </div>
            <div class="content">
              <p class="greeting">Hi ${name}!</p>
              
              <p class="message">
                Thank you for signing up for ${platformName}! We're excited to have you on board.
              </p>
              
              <div class="features">
                <h2>🚀 What you can do:</h2>
                <ul>
                  <li>Generate professional documents with AI</li>
                  <li>Track your document history</li>
                  <li>Download your content as PDFs</li>
                  <li>Access your documents anytime</li>
                </ul>
              </div>
              
              <p class="message">
                Your account is now active and ready to use. Start creating amazing content today!
              </p>
              
              <div class="cta">
                <a href="${Deno.env.get('SUPABASE_URL') || 'https://yourdomain.com'}/app" class="button">
                  Get Started
                </a>
              </div>
              
              <p style="font-size: 14px; color: #666;">
                If you have any questions or need assistance, feel free to reach out to our support team.
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ${platformName}. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
