import { openai, MODEL } from "@/lib/openai"

export async function POST(req: Request) {
  try {
    const { leadEmail, leadName, leadContext } = await req.json()

    if (!leadEmail) {
      return Response.json({ error: "Lead email required" }, { status: 400 })
    }

    const prompt = `Generate a personalized cold email for a lead interested in SaaS development.

Lead name: ${leadName || "there"}
Context: ${leadContext || "looking for SaaS boilerplate"}

Product: AI SaaS Starter Kit ($997) - Next.js 15, Stripe, OpenAI, JWT auth, admin dashboard.

Email rules:
- Short (max 150 words)
- Personalized based on context
- Not spammy
- Clear value proposition
- Soft CTA (reply or check link)
- Professional tone`

    const response = await openai.chat.completions.create({
      model: process.env.OLLAMA_MODEL || MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    })

    const emailContent = response.choices[0]?.message?.content || ""

    // TODO: Integracja z Resend/SendGrid gdy API key podany
    // if (process.env.RESEND_API_KEY) { ... }

    return Response.json({
      emailContent,
      sent: false,
      message: "Email generated. Set RESEND_API_KEY in .env.local to enable sending.",
    })
  } catch (error) {
    console.error("Outreach error:", error)
    return Response.json({ error: "Failed" }, { status: 500 })
  }
}
