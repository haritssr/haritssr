import katex from "katex";

export default function katexify(math: string, displayMode: false) {
	const options = {
		displayMode: displayMode,
		thrownOnError: false,
	};
	return katex.renderToString(math, options);
}
