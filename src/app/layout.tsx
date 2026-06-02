import type { Metadata } from "next"
import "./globals.css"
import ChatBot from "@/components/ChatBot"

export const metadata: Metadata = {
  title: "AI SaaS Starter Kit",
  description: "Production-ready Next.js 15 boilerplate with Stripe, OpenAI, and auth. Launch your AI SaaS in hours.",
  openGraph: {
    title: "AI SaaS Starter Kit",
    description: "Launch your AI-powered SaaS in hours. Next.js 15 • Stripe • OpenAI • Auth • Admin Dashboard",
    url: "https://ai-saas-starter.vercel.app",
    siteName: "AI SaaS Starter Kit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SaaS Starter Kit",
    description: "Launch your AI-powered SaaS in hours. Next.js 15 • Stripe • OpenAI • Auth • Admin Dashboard",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ChatBot />
      </body>
    </html>
  )
}
