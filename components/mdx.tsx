"use client";

import * as React from "react";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";

const CustomLink = (props) => {
	const href = props.href;

	if (href.startsWith("/")) {
		return (
			<Link href={href} {...props}>
				{props.children}
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
			className="text-zinc-800 dark:text-zinc-300"
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
