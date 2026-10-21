import FlowDiagram from "@/components/FlowDiagram";

export default function NavigationDiagram({
  definition,
  title,
}: {
  definition: string;
  title: string;
}) {
  return <FlowDiagram definition={definition} title={title} />;
}
