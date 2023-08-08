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
import { TechStackData } from "../data/TechStackData";
import { ExperiencesData } from "data/ExperiencesData";
import { NonFormalEducationData } from "data/NonFormalEducationData";
import { EducationData } from "data/EducationData";

// Headless UI
import { Disclosure } from "@headlessui/react";

export default function Home() {
  return (
    <Layout browserTitle="Home" description="Home">
      <section className="mt-5 sm:mt-10 space-y-16 sm:space-y-24">
        <Contacts />
        <Experiences />
        <Resume />
        <Experiments />
        <TechStack />
        <DesignSystem />
      </section>
    </Layout>
  );
}

import * as Toast from "@radix-ui/react-toast";

const ToastCopy = ({
  topic,
  handleCopy,
}: {
  topic: string;
  handleCopy: (page: string) => Promise<void>;
}) => {
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  function oneWeekAway() {
    const now = new Date();
    const inOneWeek = now.setDate(now.getDate() + 7);
    return new Date(inOneWeek);
  }

  return (
    <Toast.Provider swipeDirection="right">
      <a
        title="Copy this section page"
        className="cursor-pointer active:scale-95 active:ring-1 active:ring-blue-600"
        onClick={() => {
          handleCopy(
            `haritssr.vercel.app/${topic.toLowerCase().split(" ").join("-")}`
          );
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            eventDateRef.current = oneWeekAway();
            setOpen(true);
          }, 100);
        }}
      >
        <svg
          className="-rotate-45 text-zinc-400 h-5 w-5 hover:text-zinc-800"
          fill="none"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M15 7h3a5 5 0 015 5 5 5 0 01-5 5h-3m-6 0H6a5 5 0 01-5-5 5 5 0 015-5h3" />
          <path d="M8 12h8" />
        </svg>
      </a>

      <Toast.Root
        className="border border-zinc-300 bg-white/70 saturate-150 backdrop-blur-md rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
          Link copied to clipboard
        </Toast.Title>
        <Toast.Description asChild>
          <div className="[grid-area:_description] m-0 text-zinc-500 text-[13px] leading-[1.3]">{`haritssr.vercel.app/${topic
            .toLowerCase()
            .split(" ")
            .join("-")}`}</div>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

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
  async function handleCopy(page: string) {
    try {
      await navigator.clipboard.writeText(page);
    } catch (err: any) {
      console.log(err);
    }
  }
  return (
    <div id={id}>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <section className="mb-3 flex items-center justify-between">
              <div className="space-x-2 sm:space-x-3 flex items-center">
                <Link
                  href={`/#${id}`}
                  className=" text-lg sm:text-3xl font-semibold sm:font-bold text-zinc-800"
                >
                  {topic}
                </Link>

                <ToastCopy topic={topic} handleCopy={handleCopy} />
              </div>
              <div className="flex space-x-2 sm:space-x-3 text-tiny">
                <Link
                  passHref
                  href={`/${topic.toLowerCase().replace(" ", "-")}`}
                  className="px-3 py-1 flex items-center justify-center hover:bg-zinc-200/80 rounded-full bg-zinc-100/60 text-blue-600 group-hover:text-blue-700"
                >
                  Details
                </Link>
                <Disclosure.Button className="group">
                  <div
                    className={`px-1.5 pb-[5.25px] pt-1.5 sm:pl-2.5 sm:pr-[15px] sm:py-[5px] sm:space-x-1 flex items-center justify-center  rounded-full group ${
                      open
                        ? "hover:bg-zinc-200/80 bg-zinc-100"
                        : "bg-zinc-800 hover:bg-zinc-700"
                    }`}
                  >
                    {open ? (
                      <ChevronUpIcon
                        className={`h-[17.5px] w-[17.5px] stroke-[2.5] sm:stroke-2 ${
                          open
                            ? "text-zinc-600 group-hover:text-zinc-800"
                            : "text-zinc-50 group-hover:text-zinc-50"
                        }`}
                      />
                    ) : (
                      <ChevronDownIcon
                        className={`h-[17.5px] w-[17.5px] stroke-[2.5] sm:stroke-2 ${
                          open
                            ? "text-zinc-600 group-hover:text-zinc-800"
                            : "text-zinc-50 group-hover:text-zinc-50"
                        }`}
                      />
                    )}
                    <div
                      className={`hidden sm:block text-tiny  ${
                        open
                          ? "text-zinc-600 group-hover:text-zinc-800"
                          : "text-zinc-50 group-hover:text-zinc-50"
                      }`}
                    >
                      {open ? "Show Less" : "Show More"}
                    </div>
                  </div>
                </Disclosure.Button>
              </div>
            </section>
            <Disclosure.Panel className="mb-20">
              <div className="mb-5 sm:mb-[18px] text-base text-zinc-600">
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
      <section className="lg:col-span-1 space-y-5 md:mb-0 rounded-xl lg:bg-zinc-50 lg:border lg:border-zinc-300 lg:h-full lg:self-center lg:grid">
        <div className="grid lg:border-white rounded-xl lg:border">
          <div className="self-center space-y-2">
            <div className="justify-center w-full flex ">
              <section className="flex justify-center">
                <Image
                  priority
                  src="/images/blur.jpg"
                  height="165"
                  width="165"
                  className="z-10 rounded-full aspect-ratio h-32 w-32"
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
                title="twitter.com/haritssr | Harits Syah"
                className="block text-center text-zinc-500 hover:underline"
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
      {/* lg:pt-2 lg:px-4 */}
      <section className="lg:col-span-3 lg:border lg:border-zinc-300 rounded-lg lg:pt-1">
        <div className="divide-y divide-zinc-200">
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-zinc-800 lg:pl-3.5 font-medium">Roles</span>
            <span className=" col-span-2 flex items-center space-x-2">
              <span className="text-zinc-500">Web Product Engineer</span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.twitter.com/leeerob/status/1687446725919711232"
                title="Product engineers consider the frontend, backend, design, and everything in between to create a great user experience."
              >
                <svg
                  className="w-4 h-4 text-zinc-400 hover:text-blue-600 active:scale-90"
                  fill="none"
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                  <circle cx="12" cy="17" r=".5" />
                </svg>
              </a>
            </span>
          </div>

          <div className="grid grid-cols-3 py-1.5">
            <span className="text-white lg:pl-3.5 font-medium">Role</span>
            <span className="text-zinc-500 col-span-2">
              Math Physics Teacher
            </span>
          </div>
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-zinc-800 lg:pl-3.5 font-medium">At</span>
            <span className="text-zinc-500 col-span-2">
              <cite className="group not-italic">
                <a
                  title="harislab.com | Haris Lab : Reference, analyze, and test math-physics for high school students"
                  href="https://www.harislab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block w-fit cursor-pointer items-center text-zinc-500 hover:underline group-hover:text-zinc-800"
                >
                  <span className="flex items-center">
                    <span className="text-base">Haris Lab</span>
                    {/* External Link Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1  text-zinc-500 group-hover:text-zinc-800 mt-0.5"
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
            <span className="text-zinc-800 lg:pl-3.5 font-medium">Email</span>
            <a
              title="Send me an email"
              href="mailto:haritssr@gmail.com"
              className="text-zinc-500 col-span-2 hover:underline hover:text-zinc-800"
            >
              haritssr@gmail.com
            </a>
          </div>
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-zinc-800 lg:pl-3.5 font-medium">
              Location
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              title="See South Tangerang at Google Maps"
              href="https://www.google.com/maps/place/Tangerang+Selatan,+Kota+Tangerang+Selatan,+Banten/data=!4m2!3m1!1s0x2e69fab10419c095:0x8706481c2c4aafe4?sa=X&ved=2ahUKEwjHuNjfgMKAAxXIw6ACHUSwDMwQ8gF6BAgPEAA&ved=2ahUKEwjHuNjfgMKAAxXIw6ACHUSwDMwQ8gF6BAgQEAI"
              className="text-zinc-500 col-span-2 hover:underline hover:text-zinc-800"
            >
              South Tangerang, Indonesia
            </a>
          </div>
          <div className="py-1.5 lg:pl-3.5">
            <InternalLink href="/about" name="Details" />
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
      {ExperiencesData.map((d) => (
        <ExperienceCard
          key={d.project_name}
          href={d.about_client.website}
          description={d.about_client.short_about}
          title={d.project_name}
          period={d.about_project.working_period}
          status={d.about_project.website_status}
          imgSrc={d.about_client.logo_src}
          industry={d.about_client.industry}
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
      id="design-system"
      topic="Design System"
      className=""
      explanation="My user interface components library and guidelines"
    >
      <InternalLink name="Design System" href="/design-system" />
    </Wrapper>
  );
};

const Resume = () => {
  return (
    <Wrapper
      id="cv"
      topic="CV"
      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      explanation="What I have been doing"
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
                <div className="font-semibold text-2xl">Working Experience</div>
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
                    <div className="font-semibold text-lg">Privat Teacher</div>
                  </div>
                  <div className="pl-7 text-zinc-500 space-y-1.5 mt-1.5">
                    <div>Lia Privat</div>
                    <div> June 2018 - Now (5 years)</div>
                    <div>
                      Teaching math and physics for junior and senior highschool
                      students at home
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
    </Wrapper>
  );
};
