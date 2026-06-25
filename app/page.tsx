import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-indigo-400 font-mono text-lg font-bold">faizan.dev</span>
            <span className="text-slate-500 text-sm">/ml-case-studies</span>
          </Link>
          <a
            href="https://github.com/faizan2700"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400 font-mono mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          ML Engineering Case Studies
        </div>
        <h1 className="text-5xl font-bold text-slate-100 leading-tight mb-4">
          Building ML Systems<br />
          <span className="text-indigo-400">That Actually Ship</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          Deep dives into production machine learning — architecture decisions, performance tradeoffs,
          and lessons learned building real systems with FastAPI, GCP, and Python.
        </p>
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Case Studies</h2>
          <div className="flex-1 h-px bg-slate-800"></div>
          <span className="text-sm text-slate-600">{posts.length} posts</span>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all hover:border-indigo-500/50 hover:bg-slate-900/80"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        year: "numeric", month: "short", day: "numeric"
                      })}
                    </span>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs text-slate-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-400 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-slate-600 group-hover:text-indigo-400 transition-colors mt-1 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-sm text-slate-600">
          <span>Syed Faizan · Backend & ML Engineering</span>
          <span className="font-mono">Bengaluru, India</span>
        </div>
      </footer>
    </main>
  );
}
