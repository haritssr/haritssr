"use client";
import { useState } from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <LayoutToExperiments domain="Tailwind CSS" title="Sidebar">
      <SubTitle>Sidebar example</SubTitle>
      <div className="flex flex-row overflow-hidden rounded border border-zinc-400">
        {/* Side Bar */}
        <div className={`w-1/4 bg-zinc-200 ${open ? "block" : "hidden"}`}>
          <div className="flex items-center justify-between border-zinc-400 border-b px-4 py-2">
            <div className="font-semibold text-zinc-800">Trigonometri</div>
          </div>
          <ul className="space-y-1 p-4">
            <li className="rounded bg-blue-500 px-2 py-1 text-white">
              JavaScript
            </li>
            <li className="cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-[#2563eb]/90 hover:text-white">
              JavaScript
            </li>
            <li className="cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-[#2563eb]/90 hover:text-white">
              JavaScript
            </li>
            <li className="cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-[#2563eb]/90 hover:text-white">
              JavaScript
            </li>
            <li className="cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-[#2563eb]/90 hover:text-white">
              JavaScript
            </li>
            <li className="cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-[#2563eb]/90 hover:text-white">
              JavaScript
            </li>
            <li className="cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-[#2563eb]/90 hover:text-white">
              JavaScript
            </li>
            <li className="cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-[#2563eb]/90 hover:text-white">
              JavaScript
            </li>
            <li className="cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-[#2563eb]/90 hover:text-white">
              JavaScript
            </li>
            <li className="cursor-pointer rounded px-2 py-1 text-zinc-800 hover:bg-[#2563eb]/90 hover:text-white">
              JavaScript
            </li>
          </ul>
        </div>
        <div className={`bg-zinc-100 ${open ? "w-3/4" : "w-full"}`}>
          <div className="flex items-center justify-between border-zinc-400 border-b px-2 py-2">
            <button
              onClick={() => setOpen(!open)}
              onKeyDown={() => setOpen(!open)}
              type="button"
            >
              <svg
                className="outline-hidden hover:text-zinc-400"
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Content Icon</title>
                <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
                <path d="M9 3v18" />
              </svg>
            </button>
            <input placeholder="Search" type="search" />
          </div>
          <div className="px-4 py-2">
            <div className="my-4 font-semibold text-xl">JavaScript</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum,
              adipisci, ducimus eligendi ab aperiam velit, cum quo sit facilis
              beatae voluptatem iure sunt? Temporibus consectetur eveniet
              excepturi quibusdam cumque totam repudiandae! Molestiae unde nam
              exercitationem, quia nihil ad quo placeat libero totam, earum,
              quasi laudantium. Facilis architecto, molestiae quidem explicabo
              inventore deserunt quam libero ut aut nesciunt earum accusantium
              rerum dicta blanditiis voluptatibus veniam veritatis deleniti et,
              culpa recusandae voluptates assumenda tempora. Ratione rerum earum
              expedita, aspernatur, voluptas numquam recusandae eaque temporibus
              quibusdam eveniet illo, dolorum tenetur labore error alias quod
              porro animi dignissimos vero. Repellendus ipsa suscipit quaerat
              natus.
            </p>
          </div>
        </div>
      </div>
    </LayoutToExperiments>
  );
}
