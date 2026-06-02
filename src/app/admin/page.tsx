"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

type Lead = { source: string; title: string; url: string }

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [leadCount, setLeadCount] = useState(0)
  const [scanning, setScanning] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [posting, setPosting] = useState(false)
  const [postResult, setPostResult] = useState("")

  const scanLeads = async () => {
    setScanning(true)
    try {
      const res = await fetch("/api/find-leads")
      const data = await res.json()
      if (data.leads) {
        setLeads(data.leads)
        setLeadCount(data.count)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setScanning(false)
    }
  }

  const generateContent = async () => {
    setGenerating(true)
    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: "blog", topic: "Why choose AI SaaS Starter Kit", tone: "professional" }),
      })
      const data = await res.json()
      if (data.content) setGeneratedContent(data.content)
    } catch (err) {
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const autoPost = async () => {
    setPosting(true)
    try {
      const res = await fetch("/api/auto-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: "twitter" }),
      })
      const data = await res.json()
      setPostResult(data.content || "Failed")
    } catch (err) {
      console.error(err)
    } finally {
      setPosting(false)
    }
  }

  useEffect(() => { scanLeads() }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">← Site</Link>
          <h1 className="font-bold">AI Sales Agent Dashboard</h1>
        </div>
        <div className="flex gap-3 text-sm">
          <Link href="/admin/leads" className="text-gray-400 hover:text-white">Leads</Link>
          <Link href="/admin/content" className="text-gray-400 hover:text-white">Content</Link>
          <Link href="/admin/settings" className="text-gray-400 hover:text-white">Settings</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <div className="text-3xl font-bold text-blue-400">{leadCount}</div>
            <div className="text-gray-400 text-sm mt-1">Leads Found</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <div className="text-3xl font-bold text-green-400">0</div>
            <div className="text-gray-400 text-sm mt-1">Sales</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <div className="text-3xl font-bold text-purple-400">{generatedContent ? 1 : 0}</div>
            <div className="text-gray-400 text-sm mt-1">Content Pieces</div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <button onClick={scanLeads} disabled={scanning} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded-xl p-4 text-left transition">
            <div className="font-semibold mb-1">{scanning ? "Scanning..." : "🔍 Find Leads"}</div>
            <div className="text-sm text-blue-200">Scour Twitter for potential customers</div>
          </button>
          <button onClick={generateContent} disabled={generating} className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 rounded-xl p-4 text-left transition">
            <div className="font-semibold mb-1">{generating ? "Generating..." : "✍️ Generate Content"}</div>
            <div className="text-sm text-green-200">AI writes blog posts & tweets</div>
          </button>
          <button onClick={autoPost} disabled={posting} className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 rounded-xl p-4 text-left transition">
            <div className="font-semibold mb-1">{posting ? "Posting..." : "🚀 Auto-Post"}</div>
            <div className="text-sm text-purple-200">Post to social media</div>
          </button>
        </div>

        {/* Leads */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 mb-8">
          <h2 className="font-semibold mb-4">Recent Leads</h2>
          {leads.length === 0 ? (
            <p className="text-gray-500 text-sm">No leads found yet. Click "Find Leads" above.</p>
          ) : (
            <div className="space-y-2">
              {leads.map((lead, i) => (
                <div key={i} className="flex items-start gap-3 text-sm p-2 hover:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-500 mt-0.5">{i + 1}.</span>
                  <div className="flex-1">
                    <p className="text-gray-200">{lead.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      <a href={lead.url} target="_blank" className="text-blue-400 hover:underline">{lead.url}</a>
                      <span className="ml-2">via {lead.source}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Generated Content */}
        {generatedContent && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
            <h2 className="font-semibold mb-4">Generated Content</h2>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">{generatedContent}</pre>
          </div>
        )}

        {postResult && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 mt-4">
            <h2 className="font-semibold mb-4">Auto-Post Result</h2>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap bg-gray-900 rounded-lg p-4">{postResult}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
