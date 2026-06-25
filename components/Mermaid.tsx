"use client";

import { useEffect, useRef } from "react";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const render = async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#6366f1",
          primaryTextColor: "#f1f5f9",
          primaryBorderColor: "#4f46e5",
          lineColor: "#94a3b8",
          secondaryColor: "#1e293b",
          tertiaryColor: "#0f172a",
          background: "#0f172a",
          mainBkg: "#1e293b",
          nodeBorder: "#4f46e5",
          clusterBkg: "#1e293b",
          titleColor: "#f1f5f9",
          edgeLabelBackground: "#1e293b",
        },
      });

      if (ref.current) {
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);
        ref.current.innerHTML = svg;
      }
    };

    render();
  }, [chart]);

  return (
    <div
      ref={ref}
      className="my-8 flex justify-center rounded-xl border border-slate-700 bg-slate-900 p-6 overflow-x-auto"
    />
  );
}
