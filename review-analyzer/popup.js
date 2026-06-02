// Popup script

document.getElementById("analyzeBtn").addEventListener("click", analyze);

async function analyze() {
  show("loading");

  try {
    // 1. Get reviews from content script
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];
    if (!tab?.id) throw new Error("No active tab");

    // Check if we're on a supported site
    const hostname = new URL(tab.url).hostname;
    const supported = hostname.includes("amazon") || hostname.includes("allegro")
      || hostname.includes("etsy") || hostname.includes("shopify");
    if (!supported) {
      throw new Error("Unsupported site. Go to Amazon, Allegro, or Etsy product page.");
    }

    const response = await chrome.tabs.sendMessage(tab.id, { action: "scrape" });
    if (!response || !response.reviews || response.reviews.length === 0) {
      throw new Error("No reviews found on this page. Try scrolling down to load more.");
    }

    document.getElementById("reviewCount").textContent = `${response.count} reviews found`;
    document.getElementById("productName").textContent = response.product;

    // 2. Analyze with Ollama
    const analysis = await analyzeWithOllama(response.reviews);

    // 3. Display results
    displayResults(analysis);
    show("result");

  } catch (e) {
    document.getElementById("error").textContent = e.message;
    document.getElementById("error").classList.remove("hidden");
    show("error");
  }
}

async function analyzeWithOllama(reviews) {
  const prompt = `You are a product analyst. Analyze these customer reviews and return a JSON object (ONLY valid JSON, no markdown, no code blocks) with:
- "complaints": array of 5 most common complaints (each with "count" of how many reviews mention it)
- "praises": array of 5 most common praises (each with "count")
- "summary": one sentence summary of overall sentiment (max 15 words)

Reviews:
${reviews.map((r, i) => `${i+1}. ${r}`).join("\n")}`;

  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral",
      messages: [{ role: "user", content: prompt }],
      stream: false,
      options: { temperature: 0.3 }
    })
  });

  if (!res.ok) throw new Error("Ollama error. Is it running? (ollama run mistral)");

  const data = await res.json();
  let text = data.message?.content || "";

  // Try to extract JSON from the response
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    return JSON.parse(text);
  } catch {
    // Fallback: parse structured text
    return {
      complaints: [{text: "Could not parse AI response. Raw output:", count: 1}],
      praises: [],
      summary: text.slice(0, 100)
    };
  }
}

function displayResults(analysis) {
  const complaints = document.getElementById("complaintList");
  const praises = document.getElementById("praiseList");
  const summary = document.getElementById("summaryText");

  complaints.innerHTML = "";
  praises.innerHTML = "";

  (analysis.complaints || []).forEach(c => {
    const li = document.createElement("li");
    li.className = "complaint";
    li.textContent = `${c.text || c}${c.count ? ` (${c.count}x)` : ""}`;
    complaints.appendChild(li);
  });

  (analysis.praises || []).forEach(p => {
    const li = document.createElement("li");
    li.className = "praise";
    li.textContent = `${p.text || p}${p.count ? ` (${p.count}x)` : ""}`;
    praises.appendChild(li);
  });

  summary.textContent = analysis.summary || "Analysis complete.";
}

function show(section) {
  ["initial", "loading", "result", "error"].forEach(id => {
    document.getElementById(id).classList.toggle("hidden", id !== section);
  });
}
