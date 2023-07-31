// Internal Components
import ExperimentsComponent from "@/components/ExperimentsCard";
import Contact from "@/components/Contact";
import InternalLink from "@/components/InternalLink";
import InternalLinkWithoutArrow from "@/components/InternalLinkWithoutArrow";
import ExternalLink from "@/components/ExternalLink";
import Layout from "@/components/Layout";
import ExperienceCard from "@/components/ExperienceCard";
import { TechStackComponent } from "@/components/TechStackComponents";

// Icons
import {
  ArrowRightIcon,
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
import ExperimentsGrid from "@/components/ExperimentsGrid";

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
                className=" text-2xl sm:text-3xl font-bold text-zinc-700"
              >
                {topic}
              </Link>
              <div className="flex space-x-1.5 sm:space-x-2">
                <Disclosure.Button className="group">
                  <div className="px-1.5 pb-[5px] pt-1.5 sm:pl-2.5 sm:pr-[15px] sm:py-[5px] sm:space-x-1 flex items-center justify-center hover:bg-zinc-200/70 rounded-full bg-zinc-100 group">
                    {open ? (
                      <ChevronUpIcon
                        className="text-zinc-500 h-4 w-4 group-hover:text-zinc-700"
                        strokeWidth={2}
                      />
                    ) : (
                      <ChevronDownIcon
                        className="text-zinc-500 h-4 w-4 group-hover:text-zinc-700"
                        strokeWidth={2}
                      />
                    )}
                    <div className="hidden sm:block text-tiny text-zinc-500 group-hover:text-zinc-700">
                      {open ? "Show Less" : "Show More"}
                    </div>
                  </div>
                </Disclosure.Button>
                <Link
                  href={`/${topic.toLowerCase().replace(" ", "-")}`}
                  className="pl-2.5 pr-1 pb-[1.5px] pt-[2.5px] sm:pl-3.5 sm:pr-2 sm:py-[5px] flex items-center justify-center hover:bg-zinc-200/70 rounded-full bg-zinc-100 group"
                >
                  <div className="text-sm sm:text-tiny text-blue-500 group-hover:text-blue-600">
                    Details
                  </div>
                  <ChevronRightIcon
                    strokeWidth={2}
                    className="text-blue-500 h-4 w-4 group-hover:text-blue-600"
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
    <div
      id="contacts"
      className="grid grid-cols-1 gap-10 bg-white px-14 pt-5 sm:grid-cols-3 sm:gap-5 sm:px-0 sm:pt-10 lg:grid-cols-4 mb-16 sm:mb-20"
    >
      <section className="flex justify-center sm:justify-start">
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
      <section className="space-y-3 sm:space-y-4">
        <div className="text-xl font-bold text-zinc-700 text-center sm:text-left mb-3 sm:mb-0">
          Harits Syah
        </div>
        <div className="flex items-center space-x-1">
          <BriefcaseIcon className=" h-5 w-5 text-zinc-700" strokeWidth={1.8} />
          <div className=" text-zinc-500">
            Software Engineer,{" "}
            <InternalLinkWithoutArrow href="#techstack" name="Web" />
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <BuildingOfficeIcon
            className=" h-5 w-5 text-zinc-700"
            strokeWidth={1.8}
          />
          <div className=" text-zinc-500">
            Founder,{" "}
            <ExternalLink href="https://www.harislab.com" name="Haris Lab" />
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <MapPinIcon className=" h-5 w-5 text-zinc-700" strokeWidth={1.8} />
          <div className=" text-zinc-500">Tangerang, Indonesia</div>
        </div>
      </section>
      <section className="space-y-3 sm:space-y-4">
        <div className="text-xl font-bold text-zinc-700 text-center sm:text-left mb-3 sm:mb-0">
          Contacts
        </div>
        {WorkContacts.map((c) => (
          <Contact
            href={c.href}
            name={c.name}
            key={c.imgSrc}
            imgSrc={c.imgSrc}
            title={c.title}
          />
        ))}
      </section>
      <section className="space-y-3 sm:space-y-4">
        <div className="text-xl font-bold text-zinc-700 text-center sm:text-left mb-3 sm:mb-0">
          Social Media
        </div>
        {SocialMediaContacts.map((c) => (
          <Contact
            href={c.href}
            name={c.name}
            key={c.imgSrc}
            imgSrc={c.imgSrc}
            title={c.title}
          />
        ))}
      </section>
    </div>
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
        <TechStackComponent
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
              className={` border border-zinc-400 w-full flex items-center justify-between  px-4 py-2 select-none cursor-pointer ${
                open ? "rounded-b-none rounded-t-md" : "rounded-md"
              }`}
            >
              <div>Skills</div>
              <ChevronDownIcon
                className={` h-5 w-5 ${open ? "rotate-180" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="-mt-[1px] p-4 border border-zinc-400 rounded-b">
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
              className={` border border-zinc-400 w-full flex items-center justify-between  px-4 py-2 select-none cursor-pointer ${
                open ? "rounded-b-none rounded-t-md" : "rounded-md"
              }`}
            >
              <div>CV Details</div>
              <ChevronDownIcon
                className={` h-5 w-5 ${open ? "rotate-180" : ""}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="-mt-[1px] px-4 py-8 border border-zinc-400	 rounded-b">
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
