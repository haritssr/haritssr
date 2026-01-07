import { useState } from "react";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

type Base = {
  id: string;
  title: string;
};

type GenericTypeSelect<TValue> = {
  values: TValue[];
  onChange: (value: TValue) => void;
  selectType: string;
};

type Subject = {
  id: string;
  title: string;
  author: string;
};

type Teacher = {
  id: string;
  title: string;
  region: string;
};

const subjects: Subject[] = [
  { id: "1", title: "Math", author: "Haris Lab" },
  { id: "2", title: "Physics", author: "Haris Lab" },
];

const teachers: Teacher[] = [
  { id: "1", title: "Harits Syah", region: "South Tangerang" },
  { id: "2", title: "Aura Salvia", region: "West Jakarta" },
];

//individual generict select option components
function GenericSelectComponent<TValue extends Base>({
  values,
  onChange,
  selectType,
}: GenericTypeSelect<TValue>) {
  //will fire if the option choosed (after click)
  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = values.find((value) => value.id === event.target.value);
    if (val) onChange(val);
  };

  return (
    <div>
      <div className="text-sm">{selectType}</div>
      <select
        className="rounded border border-zinc-400"
        onChange={onSelectChange}
      >
        {values.map((value) => (
          <option key={value.id} value={value.id}>
            {value.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function GenericSelect() {
  const [subject, setSubject] = useState<Subject>(subjects[0]);
  const [teacher, setTeacher] = useState<Teacher>(teachers[0]);

  return (
    <LayoutToExperiments domain="React" title="Generic TS <select>">
      <SubTitle>
        Inspired by{" "}
        <ExternalLink
          href="https://www.developerway.com/posts/typescript-generics-for-react-developers"
          name="Nadia Makarevich Article&lsquo;s"
        />
        <ExplanationList>
          <li>The option you choose will immedietly appear in Results.</li>
        </ExplanationList>
      </SubTitle>
      <div className="font-semibold text-xl">
        Please choose your subject and teacher
      </div>
      <div className="flex space-x-5">
        <GenericSelectComponent<Subject>
          onChange={(value) => setSubject(value)}
          selectType="Choose Subject"
          values={subjects}
        />
        <GenericSelectComponent<Teacher>
          onChange={(value) => setTeacher(value)}
          selectType="Choose Teacher"
          values={teachers}
        />
      </div>

      <div className="my-5 w-fit space-y-1">
        <div className="font-semibold text-xl">Results</div>
        <div>
          <span className="text-zinc-500">Pelajaran yang dipilih :</span>{" "}
          {subject.title}
        </div>
        <div>
          <span className="text-zinc-500">Guru yang dipilih :</span>{" "}
          {teacher.title}
        </div>
        <div>
          <span className="text-zinc-500">Domisili guru :</span>{" "}
          {teacher.region}
        </div>
      </div>
    </LayoutToExperiments>
  );
}
