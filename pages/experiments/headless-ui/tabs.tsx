import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ExportedTabs() {
  return (
    <LayoutToExperiments domain="Headless UI" title="Tabs">
      <SubTitle>
        <ExternalLink
          href="https://headlessui.com/react/tabs"
          name="Headless UI Tabs"
        />
        <ExplanationList>
          <li>
            A fully-managed, renderless dialog component jam-packed with
            accessibility and keyboard features, perfect for building completely
            custom modal and dialog windows for your next application.
          </li>
          <li>
            Click each tab to see what inside and the screen will change to
            clicked tabs button.
          </li>
        </ExplanationList>
      </SubTitle>
      <Example1 />
    </LayoutToExperiments>
  );
}

function Example1() {
  const [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <TabGroup as="div" className="w-full max-w-md px-2 py-16 sm:px-0">
      <TabList className="flex space-x-1 rounded-md border border-zinc-300 bg-zinc-100 p-1">
        {Object.keys(categories).map((category) => (
          <Tab
            as="div"
            className={({ selected }) =>
              classNames(
                "w-full rounded-md py-1.5 text-zinc-800 leading-5",
                "cursor-pointer text-center focus:outline-hidden",
                selected
                  ? "border border-zinc-300 bg-white"
                  : "border border-zinc-100 hover:border-zinc-300"
              )
            }
            key={category}
          >
            {category}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-2 rounded-md border border-zinc-300">
        {/* Object.values(object) returns an 'array of string' from the keys of the object */}
        {/* Here's we looping the keys of the object 'categories' */}
        {Object.entries(categories).map(([category, posts]) => (
          <TabPanel
            className={classNames(
              "rounded-xl bg-white p-1.5",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-hidden focus:ring-2"
            )}
            key={category}
          >
            <ul>
              {posts.map((post) => (
                <li
                  className="relative rounded-md p-3 hover:bg-zinc-100"
                  key={post.id}
                >
                  <h3 className="font-medium text-sm leading-5">
                    {post.title}
                  </h3>

                  <ul className="mt-1 flex space-x-1 text-xs text-coolGray-500">
                    <li>{post.date}</li>
                    <li>&middot;</li>
                    <li>{post.commentCount} comments</li>
                    <li>&middot;</li>
                    <li>{post.shareCount} shares</li>
                  </ul>
                </li>
              ))}
            </ul>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
