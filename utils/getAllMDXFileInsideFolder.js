import fs from "node:fs";

function getAllMDXFileInsideFolder(folderPath) {
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
