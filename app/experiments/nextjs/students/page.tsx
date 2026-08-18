import PageTitle from "components/PageTitle";
import type { Metadata } from "next";
import InternalLink from "@/components/InternalLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import { NextjsStudentsData } from "@/data/NextjsExperimentsData";

export const metadata: Metadata = getExperimentMetadata("nextjs", "students");

export default function StudentsPage() {
  return (
    <>
      <PageTitle title="Students" />
      <SubTitle>
        A list of students from local data, rendered as static App Router pages.
      </SubTitle>
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
