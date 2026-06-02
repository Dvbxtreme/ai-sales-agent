import { openai, MODEL } from "@/lib/openai"

export async function POST(req: Request) {
  try {
    const { platform } = await req.json()

    const prompt = `Generate a promotional tweet thread (5-7 tweets) about the AI SaaS Starter Kit.
Product: $997 AI SaaS Starter Kit with Next.js 15, Stripe, OpenAI, JWT auth, admin dashboard.
Target: developers, indie hackers, SaaS founders.
Tone: professional, helpful, not spammy.
Include: pain point, solution, key features, CTA to buy.
Each tweet max 280 chars.
Output numbered tweets only.`

    const response = await openai.chat.completions.create({
      model: process.env.OLLAMA_MODEL || MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    })

    const content = response.choices[0]?.message?.content || ""

    // TODO: Integracja z Twitter API gdy token podany
    // if (process.env.TWITTER_BEARER_TOKEN) { ... }

    return Response.json({
      content,
      posted: false,
      message: "Content generated. Set TWITTER_BEARER_TOKEN in .env.local to enable auto-posting.",
      nextSteps: [
        "Add TWITTER_BEARER_TOKEN to .env.local",
        "Or copy this content and post manually",
      ],
    })
  } catch (error) {
    console.error("Auto post error:", error)
    return Response.json({ error: "Failed" }, { status: 500 })
  }
}
