"use client"

import { useState } from "react"
import Link from "next/link"

export default function LeadsPage() {
  const [leads, setLeads] = useState<Array<{ source: string; title: string; url: string; relevance: string }>>([])
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [emailResult, setEmailResult] = useState("")

  const findLeads = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/find-leads")
      const data = await res.json()
      if (data.leads) setLeads(data.leads)
    } finally {
      setLoading(false)
    }
  }

  const generateEmail = async (lead: { title: string }) => {
    setEmailResult("Generating...")
    const res = await fetch("/api/outreach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadEmail: email || "lead@example.com", leadName: "", leadContext: lead.title }),
    })
    const data = await res.json()
    setEmailResult(data.emailContent || "Failed")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center gap-6">
        <Link href="/admin" className="text-blue-400 hover:text-blue-300 text-sm">← Dashboard</Link>
        <h1 className="font-bold">Lead Finder</h1>
      </nav>
      <div className="max-w-4xl mx-auto p-6">
        <button onClick={findLeads} disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 px-6 py-3 rounded-xl font-medium transition mb-6">
          {loading ? "Scanning..." : "Scan for Leads"}
        </button>

        {leads.length > 0 && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 mb-6">
            <h2 className="font-semibold mb-4">Found {leads.length} Leads</h2>
            {leads.map((lead, i) => (
              <div key={i} className="border-b border-gray-700 last:border-0 py-3">
                <p className="text-sm text-gray-200">{lead.title}</p>
                <a href={lead.url} target="_blank" className="text-xs text-blue-400 hover:underline">{lead.url}</a>
                <button onClick={() => generateEmail(lead)} className="text-xs text-green-400 hover:underline ml-3">Generate Email</button>
              </div>
            ))}
          </div>
        )}

        {emailResult && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
            <h2 className="font-semibold mb-4">Generated Outreach Email</h2>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap bg-gray-900 rounded-lg p-4">{emailResult}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
