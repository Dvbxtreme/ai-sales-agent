import OpenAI from "openai"

export const openai = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama",
})

export const MODEL = "llama3"

export const PRODUCT_INFO = `
Product: AI SaaS Starter Kit
Price: $997 (one-time, commercial license for unlimited projects)
URL: https://cyruliks.gumroad.com/l/ghhvqh

What it includes:
- Next.js 15 (App Router, Server Components, Server Actions)
- TypeScript strict mode
- Tailwind CSS v4
- OpenAI integration (chat completions with streaming, per-tier credit limits)
- Stripe subscriptions (monthly/yearly, webhook lifecycle management)
- JWT authentication (httpOnly cookies, bcrypt hashing)
- Admin dashboard with usage analytics
- SQLite database (zero config, no external DB needed)
- Docker support + one-click Vercel deploy
- SEO optimized
- Responsive design

Target customers:
- SaaS founders building AI products
- Indie hackers launching quickly
- Agencies building AI apps for clients
- Non-technical founders who want to start

Key selling points:
- Saves 2-3 weeks of development time
- Production-ready, not a toy
- No database setup needed (SQLite)
- Commercial license included
- Full source code included
`
