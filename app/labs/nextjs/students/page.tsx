import type { Metadata } from "next";

import { getLabMetadata } from "@/app/labs/data";
import InternalLink from "@/components/InternalLink";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";

import { NextjsStudentsData } from "./data";

export const metadata: Metadata = getLabMetadata("nextjs", "students");

export default function StudentsPage() {
  return (
    <>
      <LabPageHeader title="Students">
        <PageDescription>
          A list of students from local data, rendered as static App Router
          pages.
        </PageDescription>
      </LabPageHeader>

      <div className="flex flex-col space-y-3">
        {NextjsStudentsData.map((student) => (
          <InternalLink
            href={`/labs/nextjs/students/${student.id}`}
            key={student.id}
          >
            {student.name}
          </InternalLink>
        ))}
      </div>
    </>
  );
}
