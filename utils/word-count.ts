import fs from "node:fs";

export default function countWords(title: string): number {
	try {
		const filePath = title
			.split(" ")
			.map((word) => word.toLowerCase())
			.join("-");
		const content = fs.readFileSync(`./content/${filePath}.mdx`, "utf-8");
		const wordCount = content
			.split(/\s+/)
			.filter((word) => word.length > 0).length;
		return wordCount;
	} catch (error) {
		console.error(`Error reading the file: ${error.message}`);
		return -1;
	}
}
