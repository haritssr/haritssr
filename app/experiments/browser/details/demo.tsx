"use client";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import ExternalLink from "@/components/ExternalLink";
import PageDescription from "@/components/PageDescription";

export default function DetailsDemo() {
  return (
    <>
      <ExperimentPageHeader>
        <PageDescription>
          <ExternalLink
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details"
            name="The Details disclosure element"
          />
          <br /> Browser built-in disclosure.
          <br />
          If you use the Google Translate extension in Chrome, double-clicking
          the details element or its summary can select the text and lead to odd
          translations.
          <br />I prefer Headless UI or Radix UI similar UI component than this
          weird native API.
        </PageDescription>
      </ExperimentPageHeader>

      <details className="cursor-pointer hover:ring-2 hover:ring-blue-500">
        <summary className="hover:text-rose-500">Expand this</summary>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque dolores
        debitis eius? Quidem corporis adipisci maiores exercitationem deleniti?
        Nesciunt, incidunt.
      </details>
    </>
  );
}
