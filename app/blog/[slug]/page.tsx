import { getPost, getAllPosts } from "@/lib/posts";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/MDXContent";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
          {post.github && (
            <a href={post.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          )}
        </div>
      </header>

      {/* Post Header */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs text-indigo-400 font-mono">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-slate-100 leading-tight mb-6">{post.title}</h1>
        <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl">{post.summary}</p>
        <div className="flex items-center gap-4 text-sm text-slate-500 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs text-indigo-400 font-bold">F</div>
            <span>Syed Faizan</span>
          </div>
          <span>·</span>
          <span>{new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Post Body */}
      <article className="max-w-4xl mx-auto px-6 pb-24">{content}</article>

      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-400 transition-colors">← All case studies</Link>
          <span className="font-mono">Bengaluru, India</span>
        </div>
      </footer>
    </main>
  );
}
