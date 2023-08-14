// Internal Components
import ExperimentsGrid from "@/components/ExperimentsGrid";
import InternalLink from "@/components/InternalLink";
import Layout from "@/components/Layout";
import ExperienceCard from "@/components/ExperienceCard";
import { TechnologyCard } from "@/components/TechnologyCard";

// Icons
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

// Internal Next.js
import Image from "next/image";
import Link from "next/link";

// Internal React.js
import React from "react";

// Data
import { TechStackData } from "../data/TechStackData";
import { ExperiencesData } from "data/ExperiencesData";

// Headless UI
import { Disclosure } from "@headlessui/react";

export default function Home() {
  return (
    <Layout browserTitle="Home" description="Home">
      <section className="mt-5 sm:mt-10 space-y-16 sm:space-y-24">
        <Contacts />
        <Services />
        <Experiences />
        <Experiments />
        <TechStack />
        <DesignSystem />
        <Blog />
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
      <div
        title="Copy this section page"
        className="cursor-pointer p-[5px] bg-zinc-50 border rounded-full hover:bg-zinc-200/80"
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
          className="-rotate-45 text-zinc-600 h-4 w-4 hover:text-zinc-800 stroke-2"
          fill="none"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M15 7h3a5 5 0 015 5 5 5 0 01-5 5h-3m-6 0H6a5 5 0 01-5-5 5 5 0 015-5h3" />
          <path d="M8 12h8" />
        </svg>
      </div>

      <Toast.Root
        className="border border-zinc-300 bg-white/70 saturate-150 backdrop-blur-md rounded-lg py-3 px-4 grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut shadow-xl"
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
      <Toast.Viewport className="p-3 sm:p-6 fixed bottom-0 right-0 flex flex-col gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
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
              <Link
                href={`/#${id}`}
                className=" text-xl sm:text-3xl font-semibold sm:font-bold text-zinc-800"
              >
                {topic}
              </Link>
              <div className="flex items-center space-x-3 ">
                <div>
                  <ToastCopy topic={topic} handleCopy={handleCopy} />
                </div>
                <Disclosure.Button as="div" className="group cursor-pointer">
                  {open ? (
                    <div
                      className={`px-[5px] pt-[6px] pb-[4px] rounded-full border border-zinc-200 group hover:bg-zinc-200/80 bg-zinc-50`}
                    >
                      <ChevronDownIcon
                        className={`h-4 w-4 stroke-[2.5] ${
                          open
                            ? "text-zinc-600 group-hover:text-zinc-800"
                            : "text-zinc-50 group-hover:text-zinc-50"
                        }`}
                      />
                    </div>
                  ) : (
                    <div
                      className={`p-[5px] rounded-full border border-zinc-800 group bg-zinc-800 hover:bg-zinc-700`}
                    >
                      <ChevronUpIcon
                        className={`h-4 w-4 stroke-[2.5] ${
                          open
                            ? "text-zinc-600 group-hover:text-zinc-800"
                            : "text-zinc-50 group-hover:text-zinc-50"
                        }`}
                      />
                    </div>
                  )}
                </Disclosure.Button>
                <Link
                  passHref
                  href={`/${topic.toLowerCase().replace(" ", "-")}`}
                  className="group flex w-fit cursor-pointer items-center justify-start py-1 text-[13px] border bg-zinc-50 hover:bg-zinc-100 rounded-full pl-3 pr-1.5 text-blue-600 hover:text-blue-700sm:text-sm select-none"
                >
                  <p className="flex items-center">
                    Explore
                    <ChevronRightIcon
                      className="h-4 w-4 text-blue-600 -mb-[1.5px] duration-200 group-hover:text-blue-700"
                      strokeWidth={2}
                    />
                  </p>
                </Link>
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

const Services = () => {
  return (
    <Wrapper
      id="services"
      topic="Services"
      className="bg-zinc-100 rounded-md p-5 w-full flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5 justify-end items-center"
      explanation="Open for design and programming a website services for personal or small business."
    >
      <div className="rounded-md bg-blue-600 text-white px-3 py-2 text-center w-full sm:w-fit">
        See example
      </div>
      <div className="rounded-md bg-blue-600 text-white px-3 py-2 text-center w-full sm:w-fit">
        Place an order
      </div>
    </Wrapper>
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
      <section className="lg:col-span-3 lg:border lg:border-zinc-300 rounded-lg lg:pt-[5px] lg:pl-3.5">
        <div className="divide-y divide-zinc-200">
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-zinc-800 font-medium text-tiny sm:text-base">
              Roles
            </span>
            <span className=" col-span-2 flex items-center space-x-2">
              <span className="text-zinc-500 text-tiny sm:text-base">
                Web Product Engineer
              </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://leerob.io/blog/product-engineers"
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
            <span className="text-white font-medium ">Role</span>
            <span className="text-zinc-500 col-span-2 text-tiny sm:text-base">
              Math Physics Teacher
            </span>
          </div>
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-zinc-800 font-medium  text-tiny sm:text-base">
              At
            </span>
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
                    <span className="text-tiny sm:text-base">Haris Lab</span>
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
            <span className="text-zinc-800 font-medium  text-tiny sm:text-base">
              Email
            </span>
            <a
              title="Send me an email"
              href="mailto:haritssr@gmail.com"
              className="text-zinc-500 col-span-2 hover:underline hover:text-zinc-800 text-tiny sm:text-base"
            >
              haritssr@gmail.com
            </a>
          </div>
          <div className="grid grid-cols-3 py-1.5">
            <span className="text-zinc-800 font-medium  text-tiny sm:text-base">
              Location
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              title="See South Tangerang at Google Maps"
              href="https://www.google.com/maps/place/Tangerang+Selatan,+Kota+Tangerang+Selatan,+Banten/data=!4m2!3m1!1s0x2e69fab10419c095:0x8706481c2c4aafe4?sa=X&ved=2ahUKEwjHuNjfgMKAAxXIw6ACHUSwDMwQ8gF6BAgPEAA&ved=2ahUKEwjHuNjfgMKAAxXIw6ACHUSwDMwQ8gF6BAgQEAI"
              className="text-zinc-500 col-span-2 hover:underline hover:text-zinc-800 text-tiny sm:text-base"
            >
              South Tangerang, Indonesia
            </a>
          </div>
          <div className="grid grid-cols-3 py-1.5">
            <Link
              passHref
              href="/about"
              className="group flex w-fit cursor-pointer items-center justify-start py-0.5 text-tiny text-blue-600 hover:text-blue-700 hover:underline sm:text-base"
            >
              <p className="flex items-center">
                Details
                <ChevronRightIcon
                  className="h-4 w-4 text-blue-600 -mb-[1.5px] duration-200 group-hover:text-blue-700 group-hover:underline"
                  strokeWidth={2}
                />
              </p>
            </Link>
            <span className=" col-span-2 flex items-center space-x-2">
              <Link
                passHref
                href="/cv"
                className="group flex w-fit cursor-pointer items-center justify-start py-0.5 text-tiny text-blue-600 hover:text-blue-700 hover:underline sm:text-base"
              >
                <p className="flex items-center">
                  Curriculum Vitae
                  <ChevronRightIcon
                    className="h-4 w-4 text-blue-600 -mb-[1.5px] duration-200 group-hover:text-blue-700 group-hover:underline"
                    strokeWidth={2}
                  />
                </p>
              </Link>
            </span>
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
      id="technology"
      topic="Technology"
      className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-4"
      explanation="My choosen libraries and framework to build web application"
    >
      {TechStackData.map((data) => (
        <TechnologyCard
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
      <InternalLink name="Take a look" href="/design-system" />
    </Wrapper>
  );
};

const Blog = () => {
  return (
    <Wrapper
      id="blog"
      topic="Blog"
      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      explanation="Selected notes to share with the world."
    >
      List of posts. Coming soon.
    </Wrapper>
  );
};
