# DeepWriter AI Application Template

A production-ready React + Supabase template for building AI-powered document generation applications. This template includes authentication, credit-based payments (Stripe), email notifications (Resend), SEO optimization, and blog integration (SEObot).

## 🚀 Features

- **Authentication**: Email/password auth with Supabase
- **Credit System**: One-time purchases and monthly subscriptions via Stripe
- **Document Generation**: Integration with DeepWriter AI API
- **Email Notifications**: Transactional emails via Resend
- **SEO Optimized**: Meta tags, sitemap, robots.txt, and SEObot blog integration
- **Responsive Design**: Mobile-first UI with Tailwind CSS and shadcn/ui
- **History Tracking**: View and manage generated documents

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Payments**: Stripe (one-time + subscriptions)
- **Email**: Resend
- **SEO**: SEObot for blog content

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── blog/            # Blog-related components
│   │   ├── CreditsModal.tsx # Payment modal
│   │   └── SEO.tsx          # SEO meta component
│   ├── config/
│   │   └── payments.ts      # Stripe product/price configuration
│   ├── pages/
│   │   ├── Landing.tsx      # Marketing landing page
│   │   ├── App.tsx          # Main application page
│   │   ├── History.tsx      # Document history page
│   │   ├── Auth.tsx         # Authentication page
│   │   └── Blog*.tsx        # Blog pages
│   ├── integrations/
│   │   └── supabase/        # Supabase client and types
│   └── styles/
│       └── blog.css         # Blog-specific styles
├── supabase/
│   ├── functions/           # Edge functions
│   │   ├── deepwriter-generate/    # Document generation
│   │   ├── deepwriter-check-status/ # Job status polling
│   │   ├── deepwriter-fetch-jobs/  # Fetch user jobs
│   │   ├── create-payment/         # One-time Stripe payment
│   │   ├── create-checkout/        # Subscription checkout
│   │   ├── verify-payment/         # Payment verification
│   │   ├── check-subscription/     # Subscription status
│   │   ├── send-confirmation-email/ # Email notifications
│   │   └── refresh-job-statuses/   # Background status refresh
│   └── config.toml          # Edge function configuration
├── public/
│   ├── samples/             # Sample PDF documents
│   └── robots.txt           # SEO robots file
└── templatesetup.md         # LLM setup guide
```

## 🔧 Configuration

### Environment Variables

The following secrets must be configured in Supabase:

| Secret | Description |
|--------|-------------|
| `STRIPE_SECRET_KEY` | Stripe API secret key |
| `RESEND_API_KEY` | Resend email API key |
| `DEEPWRITER_API_KEY` | DeepWriter AI API key |
| `SEOBOT_API_KEY` | SEObot API key (optional) |

### Stripe Configuration

Update `src/config/payments.ts` with your Stripe product and price IDs:

```typescript
export const PAYMENT_CONFIG = {
  creditPack: {
    price_id: "price_xxx",
    product_id: "prod_xxx",
    amount: 999,      // $9.99
    credits: 10,
  },
  subscription: {
    price_id: "price_xxx",
    product_id: "prod_xxx",
    amount: 1599,     // $15.99/month
    credits: 30,
  },
};
```

## 🗄 Database Schema

The template uses the following main tables:

- `profiles` - User profiles with credit balance
- `campaigns` - Generated documents (rename for your use case)
- `credit_transactions` - Payment and usage history
- `stripe_subscriptions` - Active subscriptions

## 🚀 Getting Started

### Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Using Lovable

Visit [Lovable](https://lovable.dev/projects/7bc2b606-6d0f-4808-a5ee-de71784f0f5a) and start prompting to make changes.

## 📖 Template Setup Guide

For LLMs setting up this template for a new application, see **[templatesetup.md](./templatesetup.md)** for comprehensive step-by-step instructions covering:

1. Gathering all required information upfront
2. Database migrations and table renaming
3. Edge function configuration
4. Secrets and API key setup
5. Email template customization
6. SEO metadata configuration
7. UI and content customization
8. Payment system setup
9. Blog/SEObot integration
10. Testing and verification

## 🔗 Useful Links

- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

## 📄 License

This project is built with Lovable.
