import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import { createPageMetadata } from "@/utils/pageMetadata";

import { getNextjsStudent, NextjsStudentsData } from "../data";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const student = getNextjsStudent(id);

  return student
    ? createPageMetadata({
        path: `/labs/nextjs/students/${id}`,
        title: `Student: ${student.name}`,
        description: `Details for ${student.name}`,
      })
    : {};
}

export default async function StudentPage({ params }: Props) {
  const { id } = await params;
  const student = getNextjsStudent(id);

  if (!student) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-full px-5 xl:px-0">
      <LabPageHeader title="Student Details">
        <PageDescription>
          Contact and location details for {student.name}, rendered from local
          student data.
        </PageDescription>
      </LabPageHeader>

      <div className="space-y-2">
        <div className="text-zinc-500">
          <span className="font-semibold text-zinc-800">Name :</span>{" "}
          {student.name}
        </div>
        <div className="text-zinc-500">
          <span className="font-semibold text-zinc-800">Email </span>:{" "}
          {student.email}
        </div>
        <div className="text-zinc-500">
          <span className="font-semibold text-zinc-800">Website</span>:{" "}
          {student.website}
        </div>
        <div className="text-zinc-500">
          <span className="font-semibold text-zinc-800">City :</span>{" "}
          {student.address.city}
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return NextjsStudentsData.map((student) => ({
    id: student.id.toString(),
  }));
}
