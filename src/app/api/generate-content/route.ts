import { openai, PRODUCT_INFO } from "@/lib/openai"

export async function POST(req: Request) {
  try {
    const { platform, topic, tone } = await req.json()

    const prompt = `You are an AI marketing copywriter. Generate promotional content for the following product:

${PRODUCT_INFO}

Platform: ${platform || "blog"}
Topic: ${topic || "Why you need a Next.js SaaS starter kit"}
Tone: ${tone || "professional"}

Generate complete, ready-to-publish content. Include:
- For blog: title, meta description, full article with headings (500-800 words)
- For twitter: 5-7 tweet thread
- For linkedin: professional post with hashtags
- For email: subject line + email body

Output only the content, no explanations.`

    const response = await openai.chat.completions.create({
      model: process.env.OLLAMA_MODEL || "llama3",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 2000,
    })

    const content = response.choices[0]?.message?.content || ""

    return Response.json({ content })
  } catch (error) {
    console.error("Generate content error:", error)
    return Response.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
