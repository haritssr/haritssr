"use client";

// Content Collections compiles MDX to HTML
export function Mdx({ html }: { html: string }) {
  return (
    <article
      className="prose prose-zinc max-w-none"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: MDX is compiled safely by Content Collections
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
