import { allBlogs } from ".contentlayer/generated";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";
import BackButton from "@/components/BackButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Mdx } from "@/components/mdx";
import SidebarBlog from "./SidebarBlog";
import TableOfContents from "./TableOfContent";

// export async function generateMetadata({
// 	params,
// }: {
// 	params: Promise<{ slug: string }>;
// }): Promise<Metadata | undefined> {
// 	const { slug } = await params;
// 	const blog = allBlogs.find((blog) => blog.slug === slug);

// 	if (!blog) {
// 		return;
// 	}

// 	const {
// 		title,
// 		publishedAt: publishedTime,
// 		summary: description,
// 		image,
// 		slug: blogSlug,
// 	} = blog;

// 	const ogImage = image
// 		? `https://haritssr.com${image}`
// 		: `https://haritssr.com/og?title=${title}`;

// 	return {
// 		title,
// 		description,
// 		openGraph: {
// 			title,
// 			description,
// 			type: "article",
// 			publishedTime,
// 			url: `https://haritssr.com/blog/${blogSlug}`,
// 			images: [
// 				{
// 					url: ogImage,
// 				},
// 			],
// 		},
// 		twitter: {
// 			card: "summary_large_image",
// 			title,
// 			description,
// 			images: [ogImage],
// 		},
// 	};
// }

function formatDate(date: string) {
	const currentDate = new Date();
	const targetDate = new Date(date);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = "Today";
	}

	const fullDate = targetDate.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	return `${fullDate} (${formattedDate})`;
}

export default async function Blog({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const blog = allBlogs.find((blog) => blog.slug === slug);

	if (!blog) {
		notFound();
	}

	return (
		// <section className="max-w-2xl mx-auto py-5 sm:py-10">
		<div className="grid grid-cols-1 sm:grid-cols-5 min-h-screen w-full">
			<SidebarBlog />
			{/* Content */}
			<div className="sm:col-span-3 sm:border-b sm:border-r pb-5 sm:px-5 ">
				<Breadcrumbs />
				<div className="my-5">
					<BackButton href="/blog" name="All Articles" />
				</div>
				<script type="application/ld+json" suppressHydrationWarning>
					{JSON.stringify(blog.structuredData)}
				</script>
				<h1 className="font-bold text-2xl tracking-tighter">
					<Balancer>{blog.title}</Balancer>
				</h1>
				<div className="flex items-center mt-2 mb-8 text-sm">
					<p>{formatDate(blog.publishedAt)}</p>
					&nbsp;&nbsp; <span className="text-zinc-400">•</span> &nbsp;&nbsp;
					<p>{blog.structuredData.wordCount} Words</p>
					&nbsp;&nbsp; <span className="text-zinc-400">•</span> &nbsp;&nbsp;
					<p>{Math.ceil(blog.structuredData.wordCount / 200)} Min Read</p>
				</div>
				<Mdx code={blog.body.code} />
			</div>
			{/* Table of Content */}
			<TableOfContents
				title={blog.title.toLocaleLowerCase().split(" ").join("-")}
			/>
		</div>
	);
}
