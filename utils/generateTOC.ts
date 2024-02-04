import fs from "fs";

interface Heading {
	level: number;
	title: string;
}

function generateTableOfContents(mdxFilePath: string): string {
	try {
		const mdxContent = fs.readFileSync(mdxFilePath, "utf-8");

		// Regular expression to match MDX headings
		const headingRegex = /^#+\s+(.+)$/gm;

		const headings: Heading[] = [];
		let match;

		// Extract headings from MDX content
		while ((match = headingRegex.exec(mdxContent)) !== null) {
			const level = match[0].indexOf("#") + 1;
			const title = match[1].trim();
			headings.push({ level, title });
		}

		// Generate table of contents
		const tableOfContents = headings
			.map(({ level, title }) => {
				const indent = "  ".repeat(level - 1);
				return `${indent}- [${title}](#${title.toLowerCase().replace(/\s/g, "-")})`;
			})
			.join("\n");

		return tableOfContents;
	} catch (error) {
		console.error(`Error reading MDX file: ${error.message}`);
		return "";
	}
}

// Example usage
const mdxFilePath = "path/to/your/file.mdx";
const tableOfContents = generateTableOfContents(mdxFilePath);

console.log("Table of Contents:\n", tableOfContents);
