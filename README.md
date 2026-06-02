# AI Sales Agent

An open-source, AI-powered sales agent built with **Next.js 15**. Generates content, finds leads, and automates outreach — all running locally with Ollama (no API costs).

## Features

- **AI Chatbot** — Conversational AI assistant powered by Ollama (local, free, no API key)
- **Content Generator** — Auto-generate blog posts, tweets, LinkedIn posts, and emails
- **Lead Finder** — Scrape potential customers from the web
- **Auto Outreach** — Generate personalized outreach emails
- **Admin Dashboard** — Manage leads, content, and settings
- **Blog** — Built-in blog with AI-generated content

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| AI | Ollama (local LLM, free) |
| Database | SQLite (via better-sqlite3) |
| Auth | JWT (httpOnly cookies) |
| Styling | Tailwind CSS |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Run Ollama (required for AI features)
# Download from https://ollama.com and run:
ollama pull llama3

# Start dev server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Need a Complete SaaS Kit?

This AI Sales Agent pairs perfectly with the [AI SaaS Starter Kit](https://cyruliks.gumroad.com/l/ghhvqh) — a production-ready SaaS boilerplate with Stripe subscriptions, OpenAI streaming, JWT auth, admin dashboard, and Docker deployment.

**$997 one-time. Commercial license. Unlimited projects.**
