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
			target="_blank"
			rel="noopener noreferrer"
			className="text-zinc-800"
			{...props}
		/>
	);
};

const components = {
	a: CustomLink,
};

interface MdxProps {
	code: string;
}
export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<article className="prose prose-zinc max-w-none">
			<Component components={{ ...components }} />
		</article>
	);
}
