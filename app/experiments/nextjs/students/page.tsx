import PageTitle from "components/PageTitle";
import type { Metadata } from "next";
import ExternalLink from "@/components/ExternalLink";
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
      <div className="mb-14">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/nextjs/students"
          name="Source code"
        />
      </div>
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
