import { openai, PRODUCT_INFO } from "@/lib/openai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const systemMessage = {
      role: "system",
      content: `Jesteś AI Sales Agentem. Sprzedajesz produkt: AI SaaS Starter Kit za $997.
      
${PRODUCT_INFO}

Zasady:
- Jesteś pomocny, profesjonalny i przekonujący
- Odpowiadasz na pytania o produkt, technologię, cenę
- Zachęcasz do zakupu, ale nie jesteś nachalny
- Jeśli ktoś ma obiekcje, wyjaśniasz wartość produktu
- Na koniec każdej rozmowy pytasz czy mogą zadać jeszcze jakieś pytanie
- Jeśli ktoś jest gotowy kupić, podajesz link: https://cyruliks.gumroad.com/l/ghhvqh
- Nie udzielasz rabatów - cena to $997
- Odpowiadasz w języku, w którym pisze klient
- Mówisz zwięźle i na temat`,
    }

    const response = await openai.chat.completions.create({
      model: process.env.OLLAMA_MODEL || "llama3",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    })

    const reply = response.choices[0]?.message?.content || ""

    return Response.json({ reply })
  } catch (error) {
    console.error("Chat error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
