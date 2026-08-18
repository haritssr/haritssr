"use client";

import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

export default function TailwindPlanetscaleNavbarDemo() {
  return (
    <>
      <SubTitle>
        Responsive PlanetScale navigation bar.{" "}
        <ExternalLink href="https://www.planetscale.com" name="Source" />
      </SubTitle>
      <div className="flex h-auto w-full flex-col items-start justify-between space-y-5 rounded-md bg-[#1a1b21] px-6 py-6 text-tiny md:flex-row md:items-center md:space-y-0 md:py-4 md:pr-4">
        <div className="flex w-full items-center space-x-2 md:w-1/3">
          <svg
            className="block shrink-0 text-zinc-100"
            fill="currentColor"
            height="30"
            viewBox="0 0 44 44"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>PlanetScale Icon</title>
            <path d="M0 22C1.03435e-06 9.84973 9.84974 -1.03435e-06 22 0C30.9336 7.80998e-07 38.6235 5.3248 42.069 12.9737L12.9737 42.069C11.7252 41.5066 10.5385 40.8311 9.42689 40.0555L27.4824 22H22L6.44366 37.5563C2.46244 33.5751 -5.31105e-07 28.0751 0 22Z" />
            <path d="M44 22.0076L22.0076 44C34.1518 43.9959 43.9959 34.1518 44 22.0076Z" />
          </svg>
          <div className="font-medium text-white">Documentation</div>
        </div>
        <div className="justify-left flex flex-col-reverse md:w-2/3 md:flex-row md:justify-between md:space-y-0">
          <input
            className="mt-4 rounded-md border border-gray-400 bg-[#30313a] px-3 py-1.5 text-gray-300 placeholder-gray-400 caret-white md:mt-0"
            placeholder="Search documentation"
            type="text"
          />
          <div className="flex items-center space-x-3">
            <button
              className="rounded-md border border-gray-400 px-3 py-1.5 font-medium text-white duration-100 hover:bg-[#30313a]"
              type="button"
            >
              Get started
            </button>
            <button
              className="rounded-md border border-gray-400 px-3 py-1.5 font-medium text-white duration-100 hover:bg-[#30313a]"
              type="button"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
