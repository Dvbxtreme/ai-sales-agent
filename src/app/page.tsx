import Link from "next/link"

const features = [
  { title: "Next.js 15", desc: "App Router, Server Components, Server Actions, Streaming" },
  { title: "OpenAI Integration", desc: "Chat completions with streaming, per-tier credit limits, usage tracking" },
  { title: "Stripe Subscriptions", desc: "Monthly/yearly billing, webhook lifecycle, customer portal" },
  { title: "JWT Auth", desc: "httpOnly cookies, bcrypt hashing, protected routes, role-based access" },
  { title: "Admin Dashboard", desc: "Usage analytics, user management, revenue reports" },
  { title: "SQLite Database", desc: "Zero config, no external DB needed — just works" },
  { title: "Docker + Vercel", desc: "One-click deploy, containerized dev environment" },
  { title: "TypeScript Strict", desc: "Full type safety, strict mode throughout" },
]

const techStack = ["Next.js 15", "TypeScript", "Tailwind CSS v4", "SQLite", "Stripe", "OpenAI", "JWT", "Docker"]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Nav */}
      <nav className="border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-white font-bold text-lg">AI SaaS Starter Kit</span>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-gray-300 hover:text-white text-sm transition">Blog</Link>
            <Link href="/admin" className="text-gray-300 hover:text-white text-sm transition">Dashboard</Link>
            <a
              href="https://cyruliks.gumroad.com/l/ghhvqh"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Buy Now — $997
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-24 text-center">
        <div className="inline-block bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1 text-blue-400 text-xs font-medium mb-6">
          Production Ready • Commercial License
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Ship Your AI SaaS<br />
          <span className="text-blue-400">in Days, Not Months</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Production-ready Next.js 15 boilerplate with Stripe billing, OpenAI chat, JWT auth, and admin dashboard.
          Stop rebuilding the same foundation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://cyruliks.gumroad.com/l/ghhvqh"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition"
          >
            Buy Now — $997
          </a>
          <a
            href="#features"
            className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-xl text-lg font-semibold transition"
          >
            See Features
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Everything You Need</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 hover:border-blue-500/30 transition">
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-8">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <span key={tech} className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-white mb-4">Stop Building From Scratch</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Get the AI SaaS Starter Kit with a commercial license for unlimited projects.
          </p>
          <a
            href="https://cyruliks.gumroad.com/l/ghhvqh"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition inline-block"
          >
            Buy Now — $997
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>AI SaaS Starter Kit © {new Date().getFullYear()} • Commercial License</p>
      </footer>
    </div>
  )
}
