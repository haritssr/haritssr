import { EducationData } from "data/EducationData";
import { NonFormalEducationData } from "data/NonFormalEducationData";
import Image from "next/image";
import Box from "../Box";
import SecondaryButton from "../SecondaryButton";
import HomeSectionWrapper from "./HomeSectionWrapper";

export default function CV() {
  return (
    <HomeSectionWrapper
      className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-5"
      explanation="Formal working experience, education history, and core skills."
      id="cv-dec-2024.pdf"
      topic="CV"
    >
      <Box title="Formal Working Experiences">
        <div>
          <div className="flex items-center space-x-2">
            <Image
              alt="logo"
              blurDataURL="/Icons/sman5.jpg"
              className="aspect-auto h-5 w-5"
              height={20}
              src="/Icons/sman5.jpg"
              width={20}
            />
            <div className="font-semibold text-lg">Privat Teacher</div>
          </div>
          <div className="mt-1.5 space-y-1.5 pl-7 text-zinc-500">
            <div>Lia Privat & personal</div>
            <div> June 2018 - Now (7 years)</div>
            <div>Teaching math and physics for junior and senior highschool students at home</div>
          </div>
        </div>
      </Box>

      <Box title="Formal Education">
        {EducationData.map((school) => (
          <div key={school.school}>
            <div className="flex items-center space-x-2">
              <Image
                alt={school.school}
                blurDataURL={school.logo}
                className="aspect-auto h-5 w-5"
                height={20}
                src={school.logo}
                width={20}
                // placeholder='blur'
              />
              <div className="font-semibold text-lg">{school.level}</div>
            </div>
            <div className="mt-1.5 space-y-1.5 pl-7 text-zinc-500">
              <div>{school.school}</div>
              <div>{school.period}</div>
              <div>{school.status}</div>
            </div>
          </div>
        ))}
      </Box>

      <Box title="Non Formal Education">
        {NonFormalEducationData.map((school) => (
          <div key={school.school}>
            <div className="flex items-center space-x-2">
              <Image
                alt={school.school}
                blurDataURL={school.logo}
                className="aspect-auto h-5 w-5"
                height={20}
                src={school.logo}
                width={20}
                // placeholder='blur'
              />
              <div className="font-semibold text-lg">{school.level}</div>
            </div>
            <div className="mt-1.5 space-y-1.5 pl-7 text-zinc-500">
              <div>{school.school}</div>
              <div>{school.period}</div>
              <div>Status: {school.status}</div>
            </div>
          </div>
        ))}
      </Box>

      <Box title="Core Skills">
        <div className="">
          <div className="font-semibold">Web Software Engineering</div>
          <p className="text-zinc-500">
            JavaScript, TypeScript, React.js, Next.js, Web platform, PWA, Node.js ecosystem.
          </p>
        </div>
        <div className="">
          <div className="font-semibold">Math & Physics</div>
          <p className="text-zinc-500">High school and early college level.</p>
        </div>
        <div className="">
          <div className="font-semibold">UI Design (with Figma)</div>
          <p className="text-zinc-500">
            Experiments, mockup, prototyping UI for mobile/desktop web.
          </p>
        </div>
      </Box>
      <div className="flex justify-end sm:justify-start">
        <SecondaryButton
          className="corner-squircle select-none rounded-xl px-3 py-1 font-medium text-zinc-800 shadow ring-1 ring-zinc-950/20 hover:bg-zinc-50 focus:outline-hidden focus:ring-zinc-800 active:ring-1 active:ring-zinc-500 active:ring-offset-1"
          download="cv-dec-2024.pdf"
          href="/cv-dec-2024.pdf"
        >
          Download CV
        </SecondaryButton>
      </div>
    </HomeSectionWrapper>
  );
}
