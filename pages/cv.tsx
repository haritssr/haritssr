// Internal Components
import ExternalLink from "@/components/ExternalLink";

// Icons
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Internal Next.js
import Image from "next/image";
import Link from "next/link";

// Internal React.js
import React from "react";

// Data
import { ExperiencesData } from "data/ExperiencesData";
import { NonFormalEducationData } from "data/NonFormalEducationData";
import { EducationData } from "data/EducationData";

// Headless UI
import { Disclosure } from "@headlessui/react";

import Layout from "@/components/Layout";
import { PageTitle } from "@/components/SubTitle";

export default function ExperimentsPage() {
  return (
    <Layout browserTitle="CV" description="What I have been doing.">
      <PageTitle title="CV">
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
                <div className="font-semibold">Web Software Engineering</div>
                <p className="text-zinc-500 pb-4">
                  JavaScript, TypeScript, React.js, Next.js, Web platform, PWA,
                  Node.js ecosystem.
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
                <div>Details</div>
                <ChevronDownIcon
                  className={` h-5 w-5 ${open ? "rotate-180" : ""}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="-mt-[1px] px-4 py-8 border border-zinc-400/70	 rounded-b">
                <section className="space-y-8">
                  <div className="font-semibold text-2xl">Experience</div>
                  {ExperiencesData.map((project) => (
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
                          href={`/experiences/${project.project_name
                            .toLowerCase()
                            .split(" ")
                            .join("-")}`}
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
                  <div className="font-semibold text-2xl">
                    Working Experience
                  </div>
                  <div className="">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/Icons/sman5.jpg"
                        height={20}
                        width={20}
                        alt="logo"
                        className="aspect-auto h-5 w-5"
                        blurDataURL="/Icons/sman5.jpg"
                      />
                      <div className="font-semibold text-lg">
                        Privat Teacher
                      </div>
                    </div>
                    <div className="pl-7 text-zinc-500 space-y-1.5 mt-1.5">
                      <div>Lia Privat</div>
                      <div> June 2018 - Now (5 years)</div>
                      <div>
                        Teaching math and physics for junior and senior
                        highschool students at home
                      </div>
                    </div>
                  </div>

                  <div className="font-semibold text-2xl">Formal Education</div>
                  {EducationData.map((school) => (
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
                  {NonFormalEducationData.map((school) => (
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
      </PageTitle>
    </Layout>
  );
}
