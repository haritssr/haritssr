// Internal Components
import ExperimentsGrid from "@/components/ExperimentsGrid";
import Contact from "@/components/ContactCard";
import InternalLink from "@/components/InternalLink";
import ExternalLink from "@/components/ExternalLink";
import Layout from "@/components/Layout";
import ExperienceCard from "@/components/ExperienceCard";
import { TechStackCard } from "@/components/TechStackCard";
import ContactCard from "@/components/ContactCard";

// Icons
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

// Internal Next.js
import Image from "next/image";
import Link from "next/link";

// Internal React.js
import React from "react";

// Data
import { WorkContacts } from "../data/WorkContacts";
import { SocialMediaContacts } from "../data/SocialMediaContacts";
import { TechStackData } from "../data/TechStackData";
import { experienceCaseStudyData } from "data/experienceCaseStudyData";
import { nonFormalEducationData } from "data/nonFormalEducationData";
import { educationData } from "data/educationData";

// Headless UI
import { Disclosure } from "@headlessui/react";

export default function Home() {
  return (
    <Layout browserTitle="Home" description="Home">
      <section className="mt-5 sm:mt-10 space-y-10 sm:space-y-16">
        <Contacts />
        <Experiences />
        <CV />
        <Experiments />
        <TechStack />
        <DesignSystem />
      </section>
    </Layout>
  );
}

const Wrapper = ({
  topic,
  className,
  children,
  id,
  explanation,
}: {
  topic: string;
  className?: string;
  children: React.ReactNode;
  id: string;
  explanation: string;
}) => {
  return (
    <div id={id}>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <section className="mb-3 flex items-center justify-between">
              <Link
                href={`/#${id}`}
                className=" text-2xl sm:text-3xl font-bold text-zinc-800"
              >
                {topic}
              </Link>
              <div className="flex space-x-2">
                <Disclosure.Button className="group">
                  <div
                    className={`px-1.5 pb-[5px] pt-1.5 sm:pl-2.5 sm:pr-[15px] sm:py-[5px] sm:space-x-1 flex items-center justify-center  rounded-full group ${
                      open ? "hover:bg-zinc-200/70 bg-zinc-100" : "bg-zinc-800"
                    }`}
                  >
                    {open ? (
                      <ChevronUpIcon
                        className={`h-4 w-4 ${
                          open
                            ? "text-zinc-800 group-hover:text-zinc-800"
                            : "text-zinc-50 group-hover:text-zinc-50"
                        }`}
                        strokeWidth={2}
                      />
                    ) : (
                      <ChevronDownIcon
                        className={`h-4 w-4 ${
                          open
                            ? "text-zinc-800 group-hover:text-zinc-800"
                            : "text-zinc-50 group-hover:text-zinc-50"
                        }`}
                        strokeWidth={2}
                      />
                    )}
                    <div
                      className={`hidden sm:block text-tiny  ${
                        open
                          ? "text-zinc-800 group-hover:text-zinc-800"
                          : "text-zinc-50 group-hover:text-zinc-50"
                      }`}
                    >
                      {open ? "Show Less" : "Show More"}
                    </div>
                  </div>
                </Disclosure.Button>
                <Link
                  passHref
                  href={`/${topic.toLowerCase().replace(" ", "-")}`}
                  className="pl-2.5 pr-1 pb-[1.5px] pt-[2.5px] sm:pl-3.5 sm:pr-2 sm:py-[5px] flex items-center justify-center hover:bg-zinc-200/70 rounded-full bg-zinc-100 group"
                >
                  <div className="text-sm sm:text-tiny text-blue-600 group-hover:text-blue-700">
                    Details
                  </div>
                  <ChevronRightIcon
                    strokeWidth={2}
                    className="text-blue-600 h-4 w-4 group-hover:text-blue-700"
                  />
                </Link>
              </div>
            </section>
            <Disclosure.Panel className="mb-20">
              <div className="mb-[18px] text-lg text-zinc-600">
                {explanation}
              </div>
              <div className={className}>{children}</div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

const Contacts = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 md:items-center my-8 gap-8 md:gap-5">
      <section className="lg:col-span-1 space-y-5 md:mb-0 rounded-md lg:border lg:border-zinc-300 lg:h-full lg:self-center lg:grid">
        <div className="grid lg:border-white rounded-md lg:border">
          <div className="self-center lg:space-y-2">
            <div className="justify-center w-full flex ">
              <section className="flex justify-center">
                <Image
                  priority
                  src="/images/blur.jpg"
                  height="165"
                  width="165"
                  className="z-10 rounded-full aspect-ratio"
                  alt="Harits Syah"
                  blurDataURL="/images/blur.jpg"
                  // placeholder='blur'
                />
              </section>
            </div>
            <div className="">
              <div className="text-zinc-800 w-full text-center text-lg font-semibold">
                Harits Syah
              </div>
              <a
                className="block text-center text-zinc-500"
                href="https://www.twitter.com/haritssr"
                target="_blank"
                rel="noreferrer noopener"
              >
                @haritssr
              </a>
              <div className="bg-zinc-200"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="lg:col-span-3 lg:border lg:border-zinc-300 rounded lg:pt-2 lg:px-4">
        <div className="divide-y divide-zinc-200">
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-zinc-800 font-semibold">Role</span>
            <span className="text-zinc-400 col-span-2">
              Web Software Engineer
            </span>
          </div>
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-white font-semibold">Role</span>
            <span className="text-zinc-400 col-span-2">Web Designer</span>
          </div>
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-white font-semibold">Role</span>
            <span className="text-zinc-400 col-span-2">
              Math Physics Teacher
            </span>
          </div>
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-zinc-800 font-semibold">At</span>
            <span className="text-zinc-400 col-span-2">
              <cite className="group not-italic">
                <a
                  title="Haris Laboratorium Indonesia"
                  href="https://www.harislab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block w-fit cursor-pointer items-center text-zinc-400 hover:underline group-hover:text-zinc-600"
                >
                  <span className="flex items-center">
                    <span className="text-base">Haris Lab</span>
                    {/* External Link Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1  text-zinc-400 group-hover:text-zinc-600 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.7}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </a>
              </cite>
            </span>
          </div>
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-zinc-800 font-semibold">Email</span>
            <span className="text-zinc-400 col-span-2">haritssr@gmail.com</span>
          </div>
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-zinc-800 font-semibold">Location</span>
            <span className="text-zinc-400 col-span-2">
              South Tangerang, Indonesia
            </span>
          </div>
          <div className="py-1.5">
            <InternalLink href="/about" name="More Details" />
          </div>
        </div>
      </section>
    </section>
  );
};

const Experiences = () => {
  return (
    <Wrapper
      id="experiences"
      topic="Experiences"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:px-0"
      explanation="All of my projects with use cases"
    >
      {experienceCaseStudyData.map((d) => (
        <ExperienceCard
          key={d.project_name}
          href={d.about_client.website}
          description={d.about_client.short_about}
          title={d.project_name}
          period={d.about_project.working_period}
          status={d.about_project.website_status}
          imgSrc={d.about_client.logo_src}
          industry={d.about_client.industry}
          hrefCaseStudy={d.hrefCaseStudy}
        />
      ))}
    </Wrapper>
  );
};

const Experiments = () => {
  return (
    <Wrapper
      id="experiments"
      topic="Experiments"
      explanation="My experiments across JavaScript and React ecosystem stack"
    >
      <ExperimentsGrid />
    </Wrapper>
  );
};

const TechStack = () => {
  return (
    <Wrapper
      id="techstack"
      topic="Tech Stack"
      className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-4"
      explanation="My choosen libraries and framework to build web application"
    >
      {TechStackData.map((data) => (
        <TechStackCard
          domain={data?.domain}
          links={data?.links}
          key={data?.domain}
        />
      ))}
    </Wrapper>
  );
};

const DesignSystem = () => {
  return (
    <Wrapper
      id="DesignSystem"
      topic="Design System"
      className=""
      explanation="My user interface components library and guidelines"
    >
      <InternalLink name="Design System" href="/design-system" />
    </Wrapper>
  );
};

const CV = () => {
  return (
    <Wrapper
      id="CV"
      topic="Curriculum Vitae"
      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      explanation="Formal CV sorted by time"
    >
      <Disclosure as="div">
        {({ open }) => (
          <>
            <Disclosure.Button
              className={` border border-zinc-400/70 w-full flex items-center justify-between  px-4 py-2 select-none cursor-pointer ${
                open ? "rounded-b-none rounded-t-md" : "rounded-md"
              }`}
            >
              <div>Skills</div>
              <ChevronDownIcon
                className={` h-5 w-5 ${open ? "rotate-180" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="-mt-[1px] p-4 border border-zinc-400/70 rounded-b">
              <div className="font-semibold">
                Software Engineering (Web Platform)
              </div>
              <p className="text-zinc-500 pb-4">
                JavaScript, TypeScript, React.js, Next.js, Web platform, PWA,
                Node.js.
              </p>
              <div className="font-semibold">Math & Physics</div>
              <p className="text-zinc-500 pb-4">
                High school and early college level.
              </p>
              <div className="font-semibold">UI Design (with Figma)</div>
              <p className="text-zinc-500 ">
                Experiments, mockup, prototyping UI for mobile/desktop web.
              </p>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div">
        {({ open }) => (
          <>
            <Disclosure.Button
              className={` border border-zinc-400/70 w-full flex items-center justify-between  px-4 py-2 select-none cursor-pointer ${
                open ? "rounded-b-none rounded-t-md" : "rounded-md"
              }`}
            >
              <div>CV Details</div>
              <ChevronDownIcon
                className={` h-5 w-5 ${open ? "rotate-180" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="-mt-[1px] px-4 py-8 border border-zinc-400/70	 rounded-b">
              <section className="space-y-8">
                <div className="font-semibold text-2xl">Experience</div>

                {experienceCaseStudyData.map((project) => (
                  <div key={project.project_name}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={project.about_client.logo_src}
                          height={20}
                          width={20}
                          alt={project.about_client.company_name}
                          className="aspect-auto h-5 w-5"
                          blurDataURL={project.about_client.logo_src}
                          // placeholder='blur'
                        />
                        <div className="font-semibold text-lg">
                          {project.about_project.my_role[0]}
                        </div>
                      </div>
                      <Link
                        passHref
                        href={`/case-studies/${project.hrefCaseStudy}`}
                        className="flex items-center justify-end text-zinc-400 hover:underline"
                      >
                        <div className="text-tiny ">Details</div>
                        <ChevronRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="pl-7 text-zinc-500 space-y-1.5 mt-1.5">
                      <div>{project.about_client.company_name}</div>
                      <div>{project.about_project.working_period}</div>
                      <div>{project.skills}</div>
                      <div>
                        <ExternalLink
                          href={project.about_client.website}
                          name={project.about_client.website}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="font-semibold text-2xl">Formal Education</div>

                {educationData.map((school) => (
                  <div key={school.school}>
                    <div className="flex items-center space-x-2">
                      <Image
                        src={school.logo}
                        height={20}
                        width={20}
                        alt={school.school}
                        className="aspect-auto h-5 w-5"
                        blurDataURL={school.logo}
                        // placeholder='blur'
                      />
                      <div className="font-semibold text-lg">
                        {school.level}
                      </div>
                    </div>

                    <div className="pl-7 text-zinc-500 space-y-1.5 mt-1.5">
                      <div>{school.school}</div>
                      <div>{school.period}</div>
                      <div>{school.status}</div>
                    </div>
                  </div>
                ))}

                <div className="font-semibold text-2xl">
                  Non Formal Education
                </div>

                {nonFormalEducationData.map((school) => (
                  <div key={school.school}>
                    <div className="flex items-center space-x-2">
                      <Image
                        src={school.logo}
                        height={20}
                        width={20}
                        alt={school.school}
                        className="aspect-auto h-5 w-5"
                        blurDataURL={school.logo}
                        // placeholder='blur'
                      />
                      <div className="font-semibold text-lg">
                        {school.level}
                      </div>
                    </div>
                    <div className="pl-7 text-zinc-500 space-y-1.5 mt-1.5">
                      <div>{school.school}</div>
                      <div>{school.period}</div>
                      <div>{school.status}</div>
                      <ExternalLink
                        name="Sertificate"
                        href="www.harislab.com"
                      />
                    </div>
                  </div>
                ))}
              </section>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </Wrapper>
  );
};
