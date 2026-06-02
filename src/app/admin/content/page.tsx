"use client"

import { useState } from "react"
import Link from "next/link"

export default function ContentPage() {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [platform, setPlatform] = useState("blog")
  const [topic, setTopic] = useState("Why you need a production-ready Next.js SaaS starter kit")

  const generate = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, topic, tone: "professional" }),
      })
      const data = await res.json()
      setContent(data.content || "")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center gap-6">
        <Link href="/admin" className="text-blue-400 hover:text-blue-300 text-sm">← Dashboard</Link>
        <h1 className="font-bold">Content Generator</h1>
      </nav>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Platform</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm">
                <option value="blog">Blog Post</option>
                <option value="twitter">Twitter/X Thread</option>
                <option value="linkedin">LinkedIn Post</option>
                <option value="email">Email Campaign</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Topic</label>
              <input value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <button onClick={generate} disabled={loading} className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 px-6 py-3 rounded-xl font-medium transition">
            {loading ? "Generating..." : "Generate Content"}
          </button>
        </div>

        {content && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Generated {platform}</h2>
              <button onClick={copyToClipboard} className="text-sm text-blue-400 hover:underline">Copy</button>
            </div>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap bg-gray-900 rounded-lg p-4 max-h-[600px] overflow-y-auto">{content}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
