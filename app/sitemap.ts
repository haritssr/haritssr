import { allBlogs } from "contentlayer/generated";

export default async function sitemap() {
	const blogs = allBlogs.map((post) => ({
		url: `https://haritssr.com/blog/${post.slug}`,
		lastModified: post.publishedAt,
	}));

	const routes = [
		"",
		"/blog",
		"/experience",
		"/experiments",
		"/design-system",
	].map((route) => ({
		url: `https://haritssr.com${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes, ...blogs];
}
