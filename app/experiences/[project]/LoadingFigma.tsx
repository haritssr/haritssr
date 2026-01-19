"use client";

import type { ExperiencesDataType } from "data/ExperiencesData";

export default function LoadingFigma({
  project,
}: {
  project: ExperiencesDataType;
}) {
  return (
    <div>
      {project.figma.length !== 0 ? (
        project.figma.map((a) => (
          <iframe
            allowFullScreen
            className="h-[600px] w-full"
            key={a}
            src={a}
            title="figma"
          />
        ))
      ) : (
        <p className="text-zinc-800">No design</p>
      )}
    </div>
  );
}
