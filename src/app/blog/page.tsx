import Link from "next/link"

const posts = [
  {
    title: "Why Next.js 15 is the Perfect Foundation for Your AI SaaS",
    desc: "Learn why Next.js 15 with App Router and Server Components gives you the best foundation for building a production-ready AI SaaS product.",
    date: "2026-06-01",
    slug: "nextjs-15-ai-saas",
  },
  {
    title: "How to Integrate Stripe Subscriptions in Next.js 15",
    desc: "Step-by-step guide to setting up monthly and yearly subscriptions with Stripe webhooks in your Next.js application.",
    date: "2026-05-28",
    slug: "stripe-subscriptions-nextjs",
  },
  {
    title: "Building a ChatGPT Clone with OpenAI Streaming in Next.js",
    desc: "Implement real-time chat completions with streaming responses using OpenAI API and Next.js 15 Server Actions.",
    date: "2026-05-25",
    slug: "openai-streaming-nextjs",
  },
  {
    title: "JWT Authentication in Next.js: Best Practices",
    desc: "Secure your Next.js app with httpOnly JWT cookies, bcrypt password hashing, and role-based access control.",
    date: "2026-05-22",
    slug: "jwt-auth-nextjs",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">← Home</Link>
          <span className="font-bold">Blog</span>
          <span />
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">AI SaaS Blog</h1>
        <p className="text-gray-400 mb-10">Tips, tutorials, and insights on building AI-powered SaaS products.</p>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500/30 transition">
              <time className="text-xs text-gray-500">{post.date}</time>
              <h2 className="text-xl font-semibold mt-1 mb-2">{post.title}</h2>
              <p className="text-gray-400 text-sm">{post.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="https://cyruliks.gumroad.com/l/ghhvqh"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium inline-block transition"
          >
            Get the AI SaaS Starter Kit — $997
          </a>
        </div>
      </main>
    </div>
  )
}
