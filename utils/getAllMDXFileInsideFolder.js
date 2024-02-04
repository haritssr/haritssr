import fs from "fs";

function generateTableOfContents(mdxFilePath) {
	try {
		const mdxContent = fs.readFileSync(mdxFilePath, "utf-8");

		// Regular expression to match MDX headings
		const headingRegex = /^#+\s+(.+)$/gm;

		//headings: Heading[]
		const headings = [];
		let match;

		// Extract headings from MDX content
		while ((match = headingRegex.exec(mdxContent)) !== null) {
			const level = match[0].indexOf("#") + 1;
			const title = match[1].trim();
			headings.push({ level, title });
		}

		// Generate table of contents
		const tableOfContents = headings.map(({ level, title }) => {
			const indent = "  ".repeat(level - 1);
			return `${indent}- [${title}](#${title.toLowerCase().replace(/\s/g, "-")})`;
		});
		// .join("\n");
		console.log(headings.map((heading) => heading.title));
		// return tableOfContents;
	} catch (error) {
		console.error(`Error reading MDX file: ${error.message}`);
		return "";
	}
}

export default function getAllMDXFileInsideFolder(folderPath) {
	try {
		//get the content of the directory
		const files = fs.readdirSync(folderPath);

		//filter file with .mdx extention
		const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

		return mdxFiles;
	} catch (error) {
		console.error(`Error reading a directory: ${error.message}`);
		return [];
	}
}

const arr = getAllMDXFileInsideFolder("../content");

const firstMDXFile = arr[0];

console.log(arr);

console.log(generateTableOfContents(`../content/${firstMDXFile}`), "\n", typeof generateTableOfContents(`../content/${firstMDXFile}`));
