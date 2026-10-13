import type { Metadata } from "next";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import { NextjsStudentsData } from "@/data/NextjsExperimentsData";

export const metadata: Metadata = getExperimentMetadata("nextjs", "students");

export default function StudentsPage() {
  return (
    <>
      <ExperimentPageHeader title="Students">
        <PageDescription>
          A list of students from local data, rendered as static App Router
          pages.
        </PageDescription>
      </ExperimentPageHeader>

      <div className="flex flex-col space-y-3">
        {NextjsStudentsData.map((student) => (
          <InternalLink
            href={`/experiments/nextjs/students/${student.id}`}
            key={student.id}
          >
            {student.name}
          </InternalLink>
        ))}
      </div>
    </>
  );
}
