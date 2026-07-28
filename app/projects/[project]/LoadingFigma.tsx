"use client";

import type { ProjectsDataType } from "data/ProjectsData";

export default function LoadingFigma({ project }: { project: ProjectsDataType }) {
  return (
    <div>
      {project.figma.length !== 0 ? (
        project.figma.map((a) => <iframe allowFullScreen className="h-150 w-full" key={a} src={a} title="figma" />)
      ) : (
        <p className="text-zinc-800">No design</p>
      )}
    </div>
  );
}
