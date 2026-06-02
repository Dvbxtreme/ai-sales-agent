import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center gap-6">
        <Link href="/admin" className="text-blue-400 hover:text-blue-300 text-sm">← Dashboard</Link>
        <h1 className="font-bold">Settings</h1>
      </nav>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-4">
          <h2 className="font-semibold mb-4">API Keys</h2>
          <div className="space-y-4 text-sm">
            <div>
              <label className="text-gray-400 block mb-1">OPENAI_API_KEY</label>
              <input type="password" placeholder="sk-..." className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm" />
              <p className="text-gray-500 text-xs mt-1">Required for AI chat & content generation</p>
            </div>
            <div>
              <label className="text-gray-400 block mb-1">TWITTER_BEARER_TOKEN</label>
              <input type="password" placeholder="Leave empty for manual posting" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm" />
              <p className="text-gray-500 text-xs mt-1">Optional — enables auto-posting to Twitter/X</p>
            </div>
            <div>
              <label className="text-gray-400 block mb-1">RESEND_API_KEY</label>
              <input type="password" placeholder="Leave empty for manual outreach" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm" />
              <p className="text-gray-500 text-xs mt-1">Optional — enables automated email outreach</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="font-semibold mb-4">Product Info</h2>
          <div className="text-sm text-gray-400">
            <p><span className="text-gray-300">Name:</span> AI SaaS Starter Kit</p>
            <p><span className="text-gray-300">Price:</span> $997</p>
            <p><span className="text-gray-300">URL:</span> <a href="https://cyruliks.gumroad.com/l/ghhvqh" className="text-blue-400 hover:underline" target="_blank">cyruliks.gumroad.com/l/ghhvqh</a></p>
            <p className="mt-4 text-gray-500">Edit these in <code className="bg-gray-700 px-1 rounded">src/lib/openai.ts</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}
