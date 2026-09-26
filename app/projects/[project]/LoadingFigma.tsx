import type { ProjectsDataType } from "../../../data/ProjectsData";

export default function LoadingFigma({
  project,
}: {
  project: ProjectsDataType;
}) {
  return (
    <div>
      {project.figma.length === 0 ? (
        <p className="text-foreground">No design</p>
      ) : (
        project.figma.map((figmaUrl, index) => (
          <iframe
            allowFullScreen
            className="h-150 w-full"
            key={figmaUrl}
            loading="lazy"
            sandbox="allow-scripts"
            src={figmaUrl}
            title={`${project.project_name} Figma design ${index + 1}`}
          />
        ))
      )}
    </div>
  );
}
