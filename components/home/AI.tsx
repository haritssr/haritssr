import HomeSectionWrapper from "./HomeSectionWrapper";

export default function AI() {
  return (
    <HomeSectionWrapper id="AI" isTitleLink={false} topic="AI">
      <ol className="list-inside space-y-1.5">
        <li className="text-zinc-500">
          <span className="font-medium text-zinc-700">Code Editor:</span> Zed
        </li>
        <li className="text-zinc-500">
          <span className="font-medium text-zinc-700">Terminal:</span> Zed Agent
        </li>
        <li className="text-zinc-500">
          <span className="font-medium text-zinc-700">Agent:</span> Codex CLI in
          Zed
        </li>
        <li className="text-zinc-500">
          <span className="font-medium text-zinc-700">Model:</span> GPT 5.6
        </li>
      </ol>
    </HomeSectionWrapper>
  );
}
