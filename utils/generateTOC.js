import fs from "node:fs";

export default function generateTOC(mdxFilePath) {
	try {
		const mdxContent = fs.readFileSync(mdxFilePath, "utf-8");

		// Regular expression to match MDX headings
		const headingRegex = /^#+\s+(.+)$/gm;

		//headings: Heading[]
		const headings = [];
		const match = headingRegex.exec(mdxContent);

		// Extract headings from MDX content
		while (match !== null) {
			const level = match[0].indexOf("#") + 1;
			const title = match[1].trim();
			headings.push({ level, title });
		}

		// Generate table of contents
		// tableOfContents: string[]
		const heading = headings.map(({ level, title }) => {
			const indent = "  ".repeat(level - 1);
			// return `${indent}- [${title}](#${title.toLowerCase().replace(/\s/g, "-")})`;
			return title.toLowerCase();
		});
		// .join("\n");

		return heading;
	} catch (error) {
		console.error(`Error reading MDX file: ${error.message}`);
		return [];
	}
}
