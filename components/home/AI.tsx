import HomeSectionWrapper from "./HomeSectionWrapper";

export default function AI() {
  return (
    <HomeSectionWrapper explanation="Tools I use in the agentic programming era." id="AI" isTitleLink={false} topic="AI">
      <ol className="list-inside space-y-1.5">
        <li className="text-zinc-500">
          <span className="font-medium text-zinc-700">Code Editor:</span> Zed
        </li>
        <li className="text-zinc-500">
          <span className="font-medium text-zinc-700">Terminal:</span> Ghostty
        </li>
        <li className="text-zinc-500">
          <span className="font-medium text-zinc-700">Agent:</span> Codex CLI, <span className="line-through">Kimi Code CLI</span>, <span className="line-through">Factory Droid</span>,{" "}
          <span className="line-through">OpenCode</span>
        </li>
        <li className="text-zinc-500">
          <span className="font-medium text-zinc-700">Model:</span> GPT 5.3 Codex, <span className="line-through">Kimi K2.5</span>
        </li>
      </ol>
    </HomeSectionWrapper>
  );
}
