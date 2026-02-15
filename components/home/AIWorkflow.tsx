import HomeSectionWrapper from "./HomeSectionWrapper";

export default function AIWorkflow() {
  return (
    <HomeSectionWrapper
      explanation="AI tools I use"
      id="AI"
      topic="AI Workflow"
    >
      <ol className="list-inside list-disc space-y-1.5">
        <li className="text-zinc-500">
          <span className="font-medium">Editor:</span> Zed
        </li>
        <li className="text-zinc-500">
          <span className="font-medium">Terminal:</span> Ghostty
        </li>
        <li className="text-zinc-500">
          <span className="font-medium">AI Agent:</span> Codex CLI, Kimi Code
          CLI, Factory Droid
        </li>
        <li className="text-zinc-500">
          <span className="font-medium">AI Model:</span> GPT 5.3 Codex, Kimi
          K2.5
        </li>
      </ol>
    </HomeSectionWrapper>
  );
}
