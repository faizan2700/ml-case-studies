"use client";

import dynamic from "next/dynamic";

const Mermaid = dynamic(() => import("./Mermaid"), { ssr: false });

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
}

function CodeBlock({ className, children, ...props }: CodeProps) {
  const language = className?.replace("language-", "") ?? "";
  const code = String(children).trim();

  if (language === "mermaid") {
    return <Mermaid chart={code} />;
  }

  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-700 bg-slate-900">
      <div className="flex items-center gap-2 border-b border-slate-700 px-4 py-2">
        <span className="text-xs font-mono text-slate-400">{language || "code"}</span>
      </div>
      <pre className="p-4 text-sm leading-relaxed overflow-x-auto">
        <code className={className} {...props}>{children}</code>
      </pre>
    </div>
  );
}

export const mdxComponents = {
  code: CodeBlock,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-100 border-b border-slate-700 pb-2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-slate-200" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-7 text-slate-300" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-slate-300" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-slate-300" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-slate-100" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300 transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full text-sm text-slate-300" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-slate-800 text-slate-200" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th className="px-4 py-3 text-left font-semibold" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td className="px-4 py-3 border-t border-slate-700" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLElement>) => (
    <blockquote className="my-6 border-l-4 border-indigo-500 pl-4 italic text-slate-400" {...props} />
  ),
  hr: () => <hr className="my-8 border-slate-700" />,
  Mermaid,
};
