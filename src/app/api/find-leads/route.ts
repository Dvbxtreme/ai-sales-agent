export async function GET() {
  try {
    // Wyszukuje leady z różnych źródeł
    const searchQueries = [
      "looking for Next.js SaaS boilerplate",
      "best Next.js starter kit 2026",
      "Next.js 15 SaaS template recommendation",
      "Stripe OpenAI integration Next.js",
      "building AI SaaS need starter",
      "Next.js boilerplate with Stripe",
      "SaaS starter kit recommendation",
      "how to build AI SaaS fast",
    ]

    const leads: Array<{ source: string; title: string; url: string; relevance: string }> = []

    // Szukaj na Twitterze przez Nitter (public)
    for (const query of searchQueries) {
      try {
        const encoded = encodeURIComponent(query)
        const res = await fetch(`https://nitter.net/search?q=${encoded}`, {
          signal: AbortSignal.timeout(5000),
          headers: { "User-Agent": "Mozilla/5.0" },
        })
        const html = await res.text()
        const tweetMatches = html.matchAll(/<a href="\/([^"]+)"[^>]*>([^<]+)<\/a>/g)
        let count = 0
        for (const match of tweetMatches) {
          if (count++ > 3) break
          leads.push({
            source: "twitter",
            title: match[2],
            url: `https://nitter.net/${match[1]}`,
            relevance: query,
          })
        }
      } catch {
        // skip if nitter fails
      }
    }

    return Response.json({ leads, count: leads.length })
  } catch (error) {
    console.error("Find leads error:", error)
    return Response.json({ error: "Failed to find leads" }, { status: 500 })
  }
}
