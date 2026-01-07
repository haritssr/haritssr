"use client";

import Link, { type LinkProps } from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import type * as React from "react";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & { href: string };

const CustomLink: React.FC<CustomLinkProps> = (props) => {
  const { href, children, ...rest } = props;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return (
    <a
      className="text-zinc-800"
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    />
  );
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose prose-zinc max-w-none">
      <Component components={{ a: CustomLink }} />
    </article>
  );
}
