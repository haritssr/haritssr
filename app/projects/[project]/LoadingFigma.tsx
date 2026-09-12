import type { ProjectsDataType } from "../../../data/ProjectsData";

export default function LoadingFigma({
  project,
}: {
  project: ProjectsDataType;
}) {
  return (
    <div>
      {project.figma.length === 0 ? (
        <p className="text-zinc-800">No design</p>
      ) : (
        project.figma.map((a, index) => (
          <iframe
            allowFullScreen
            className="h-150 w-full"
            key={a}
            loading="lazy"
            sandbox="allow-scripts"
            src={a}
            title={`${project.project_name} Figma design ${index + 1}`}
          />
        ))
      )}
    </div>
  );
}
