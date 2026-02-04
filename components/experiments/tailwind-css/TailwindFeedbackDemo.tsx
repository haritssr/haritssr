"use client";

import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

export default function TailwindFeedbackDemo() {
  return (
    <>
      <SubTitle>
        From{" "}
        <ExternalLink
          href="https://twitter.com/marckohlbrugge/status/1580915114147921920"
          name="this tweet"
        />
      </SubTitle>
      <form className="absolute right-8 bottom-8 flex flex-col rounded-lg border bg-white">
        <textarea
          className="peer h-12 w-64 resize-none border-0 bg-transparent p-2 text-sm transition-all duration-100 placeholder-shown:h-9 placeholder-shown:w-24 focus:h-12 focus:w-64 focus:outline-hidden"
          minLength={3}
          placeholder="Feedback?"
          rows={3}
        />
        <div className="flex justify-between overflow-hidden p-2 font-medium text-sm opacity-100 transition-all duration-100 peer-placeholder-shown:h-0 peer-placeholder-shown:w-0 peer-placeholder-shown:p-0 peer-placeholder-shown:opacity-100 peer-focus:flex peer-focus:h-auto peer-focus:w-auto peer-focus:p-2 peer-focus:opacity-100">
          <button className="rounded-md bg-gray-100 px-2 py-1" type="button">
            Cancel
          </button>
          <input
            className="cursor-pointer rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-400"
            type="submit"
            value="Send feedback"
          />
        </div>
      </form>
    </>
  );
}
