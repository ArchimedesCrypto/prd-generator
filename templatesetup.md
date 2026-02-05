# Template Setup Guide for LLMs

This document provides step-by-step instructions for setting up this D&D Campaign Generator template for a new application. Follow these steps in order to ensure proper configuration.

## Phase 1: Gather All Required Information

**CRITICAL: Before making ANY changes, collect ALL of the following information from the user in a SINGLE message:**

### Required Information Checklist

1. **Application Details**
   - New application name
   - Application description
   - Target domain (if custom domain needed)

2. **Supabase Configuration**
   - Is Supabase already connected? (If not, guide user to connect)
   - Supabase project ID
   - Supabase URL
   - Supabase Anon/Publishable Key

3. **Email Service (Resend)**
   - Does the app need email functionality?
   - If yes: Resend API key
   - Sender email address to use

4. **Payment System (Stripe)**
   - Does the app need payment functionality?
   - If yes: Stripe Secret Key
   - Product/pricing structure details

5. **SEO Configuration**
   - Primary keywords for the app
   - Meta description (max 160 characters)
   - Author/company name
   - Social media image URL (OG image)

6. **SEObot Configuration**
   - Does the app need blog/content features?
   - If yes: SEObot API key

7. **Content/Feature Customization**
   - What type of content does the app generate? (e.g., "blog posts", "recipes", "workout plans")
   - What should replace "campaigns" in the UI?
   - What should replace "D&D" or "dungeon crawler" references?
   - Credit pricing structure (if different from template)

---

## Phase 2: Database Setup (FIRST PRIORITY)

### Step 1: Verify Supabase Connection
- Confirm Supabase is connected to the project
- Verify `supabase/config.toml` has correct project_id

### Step 2: Review Existing Schema
- Check `src/integrations/supabase/types.ts` to understand current tables
- Main template table: `campaigns` - this will likely need to be renamed/modified

### Step 3: Database Migration for New App
Create migration to:
- Rename `campaigns` table to match new app purpose (e.g., `recipes`, `workouts`, `articles`)
- Update column names to match new domain
- Keep `user_id`, `status`, `created_at`, `updated_at` structure
- Modify content-specific columns (e.g., `story_type` → `recipe_type`)
- Update RLS policies with new table name

**Migration Example Pattern:**
```sql
-- Rename table
ALTER TABLE campaigns RENAME TO [new_table_name];

-- Update columns as needed
ALTER TABLE [new_table_name] RENAME COLUMN story_type TO [new_type_column];
ALTER TABLE [new_table_name] RENAME COLUMN party_composition TO [new_relevant_field];

-- Update RLS policies
DROP POLICY IF EXISTS "Users can view own campaigns" ON [new_table_name];
CREATE POLICY "Users can view own [items]" ON [new_table_name]
  FOR SELECT USING (auth.uid() = user_id);

-- Repeat for INSERT, UPDATE, DELETE policies
```

---

## Phase 3: Edge Functions Renaming

### Step 1: Identify Functions to Rename
Current edge functions in template:
- `deepwriter-generate` (main generation function)
- `deepwriter-check-status` (status checking)
- `deepwriter-fetch-jobs` (job fetching)
- `create-payment` (one-time payment)
- `create-checkout` (subscription)
- `verify-payment` (payment verification)
- `check-subscription` (subscription status)
- `send-confirmation-email` (email sending)

### Step 2: Rename Functions
For content generation functions, rename to match new app:
- `deepwriter-generate` → `[app]-generate` (e.g., `recipe-generate`)
- `deepwriter-check-status` → `[app]-check-status`
- `deepwriter-fetch-jobs` → `[app]-fetch-jobs`

**Keep payment and email functions as-is** unless user requests specific naming.

### Step 3: Update supabase/config.toml
```toml
project_id = "[user_project_id]"

[functions.[new-function-name]]
verify_jwt = true

# Repeat for all renamed functions
```

### Step 4: Update Database References
In the database migration, update:
- `deepwriter_job_id` → `[app]_job_id`
- `deepwriter_project_id` → `[app]_project_id`

### Step 5: Update Frontend Function Calls
Search and replace in:
- `src/pages/App.tsx`
- `src/pages/History.tsx`
- Any components calling these functions

Replace:
```typescript
supabase.functions.invoke('deepwriter-generate')
// with
supabase.functions.invoke('[new-function-name]')
```

---

## Phase 4: Secrets Configuration

### Step 1: Add Required Secrets
Use the secrets tool to add (only if needed):

1. **RESEND_API_KEY** (if email functionality needed)
2. **STRIPE_SECRET_KEY** (if payment functionality needed)
3. **SEOBOT_API_KEY** (if blog functionality needed)
4. **DEEPWRITER_API_KEY** (for content generation)

**Note:** SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY are auto-configured.

### Step 2: Update Payment Configuration (if needed)
Edit `src/config/payments.ts`:
- Update price_id values with user's Stripe prices
- Update credit amounts and pricing
- Update product descriptions

---

## Phase 5: Email Configuration (Resend)

### Step 1: Update send-confirmation-email Function
Edit `supabase/functions/send-confirmation-email/index.ts`:
- Update email templates to match new app
- Change subject lines
- Update email body content
- Replace D&D/campaign references with new terminology

### Step 2: Update Email Triggers
In the generation function, update:
```typescript
await supabase.functions.invoke('send-confirmation-email', {
  body: {
    email: user.email,
    itemType: '[new_item_type]', // e.g., 'recipe', 'workout'
    itemTitle: data.title
  }
});
```

---

## Phase 6: SEO Configuration

### Step 1: Update index.html Metadata
Edit `index.html`:
```html
<title>[App Name] - [Tagline]</title>
<meta name="description" content="[User's meta description]">
<meta property="og:title" content="[App Name]">
<meta property="og:description" content="[User's meta description]">
<meta property="og:image" content="[User's OG image URL]">
<meta name="twitter:title" content="[App Name]">
<meta name="twitter:description" content="[User's meta description]">
```

### Step 2: Update Landing Page SEO
Edit `src/pages/Landing.tsx`:
- Update SEO component props with new title/description
- Update H1 with main keyword
- Update all content with new app terminology

### Step 3: Update Sitemap Configuration
Edit `vite.config.ts`:
```typescript
const staticRoutes = [
  "/",
  "/auth",
  "/app",
  "/history",
  "/blog",
  // Add any new routes
];
```

### Step 4: Update robots.txt
Edit `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://[user-domain]/sitemap.xml
```

---

## Phase 7: Content & UI Customization

### Step 1: Update All UI References
Search and replace across all files:
- "campaign" → "[new_item_type]"
- "Campaign" → "[New_Item_Type]"
- "D&D" → "[New_App_Focus]"
- "dungeon crawler" → "[new_relevant_term]"
- "story type" → "[new_type_field]"

### Step 2: Update Component Names
Rename components if needed:
- `CampaignCard` → `[Item]Card`
- `CampaignForm` → `[Item]Form`

### Step 3: Update Sample Files
Replace sample PDFs in `public/samples/`:
- Remove D&D samples
- Add samples relevant to new app (if applicable)

### Step 4: Update Cover Images
Replace images in `src/assets/`:
- Remove D&D themed images
- Add new app-themed images

---

## Phase 8: Payment System Configuration

### Step 1: Configure Stripe Products (if applicable)
1. Create products in Stripe dashboard
2. Note price IDs
3. Update `src/config/payments.ts` with actual IDs

### Step 2: Update Payment Functions
Verify edge functions use correct price_id from config:
```typescript
import { PAYMENT_CONFIG } from './config/payments.ts';

// In edge function
line_items: [{
  price: PAYMENT_CONFIG.creditPack.price_id,
  quantity: 1
}]
```

### Step 3: Update Credit Logic
- Review credit costs per generation
- Update deduction logic in generation function
- Update UI to reflect new credit economy

---

## Phase 9: Blog/SEObot Configuration (if applicable)

### Step 1: Configure SEObot Integration
If app needs blog functionality:
- Verify SEOBOT_API_KEY is set
- Update blog components in `src/pages/Blog.tsx`
- Update SEObot config in `vite.config.ts`

### Step 2: Update Blog Content
- Modify blog fetching to match new app niche
- Update blog UI components for new brand

---

## Phase 10: Testing & Verification

### Step 1: Test Database Operations
- Create a test item
- Verify it saves correctly
- Check RLS policies work

### Step 2: Test Edge Functions
- Test generation function
- Check status updates
- Verify email sending (if applicable)

### Step 3: Test Payment Flow (if applicable)
- Test one-time payment
- Test subscription flow
- Verify credit updates

### Step 4: Test SEO
- Verify meta tags render
- Check sitemap generates
- Confirm robots.txt accessible

---

## Common Pitfalls to Avoid

1. **Don't rename edge functions before updating database references** - Do database migration first
2. **Don't forget to update supabase/config.toml** - Functions won't work without proper config
3. **Don't skip RLS policy updates** - Security issue if policies reference old table names
4. **Don't hardcode secrets** - Always use environment variables
5. **Don't forget to update both frontend and backend** - Function renames must be reflected everywhere
6. **Don't mix HSL and RGB colors** - Template uses HSL exclusively

---

## Quick Reference: File Update Checklist

- [ ] `supabase/config.toml` - project_id and function configs
- [ ] Database migration - table/column renames, RLS policies
- [ ] Edge functions - rename and update logic
- [ ] `src/config/payments.ts` - Stripe configuration
- [ ] `index.html` - SEO metadata
- [ ] `src/pages/Landing.tsx` - landing page content
- [ ] `src/pages/App.tsx` - main app UI and function calls
- [ ] `src/pages/History.tsx` - history page and function calls
- [ ] `vite.config.ts` - sitemap routes
- [ ] `public/robots.txt` - domain
- [ ] Component files - terminology updates
- [ ] Asset files - replace themed images
- [ ] Sample files - replace with relevant samples

---

## Example Conversation Flow

**LLM:** "I'll help you set up this template for your new app. To configure everything in one go, I need the following information:

1. What is your new app about? (e.g., recipe generator, workout planner)
2. What should users generate? (e.g., recipes, workout plans, blog posts)
3. Do you have Supabase connected? If yes, provide project ID and keys.
4. Do you need email functionality? If yes, provide Resend API key and sender email.
5. Do you need payment functionality? If yes, provide Stripe secret key and pricing details.
6. Do you need blog functionality? If yes, provide SEObot API key.
7. What's your app name and meta description?
8. What domain will you use?
9. What's your desired credit pricing structure?"

**After receiving all information, execute steps in order:**
1. Database migration
2. Edge function renames
3. Secrets configuration
4. Code updates
5. SEO updates
6. Testing instructions

---

## Notes for LLMs

- **Always gather ALL information upfront** - Don't proceed step-by-step asking for details
- **Follow the order** - Database changes must come before function renames
- **Be thorough** - Update ALL references, not just obvious ones
- **Test references** - Search for old terminology across entire codebase
- **Maintain security** - Keep RLS policies intact and properly updated
- **Preserve functionality** - Don't remove working features unless explicitly asked
