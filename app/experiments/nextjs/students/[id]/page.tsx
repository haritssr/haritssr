import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import {
  getNextjsStudent,
  NextjsStudentsData,
} from "@/data/NextjsExperimentsData";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const student = getNextjsStudent(id);

  return student
    ? {
        title: `Student: ${student.name}`,
        description: `Details for ${student.name}`,
      }
    : {};
}

export default async function StudentPage({ params }: Props) {
  const { id } = await params;
  const student = getNextjsStudent(id);

  if (!student) {
    notFound();
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-5 xl:px-0">
      <PageTitle title="Student Details" />
      <div className="mt-5 space-y-2">
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

export async function generateStaticParams() {
  return NextjsStudentsData.map((student) => ({
    id: student.id.toString(),
  }));
}
