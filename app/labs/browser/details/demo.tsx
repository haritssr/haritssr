import ExternalLink from "@/components/ExternalLink";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";

export default function DetailsDemo() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>
          <ExternalLink
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details"
            name="The Details disclosure element"
          />
          <br /> Browser built-in disclosure.
          <br />
          The summary toggles this disclosure without JavaScript. Use Base UI
          when a disclosure needs richer controlled behavior.
        </PageDescription>
      </LabPageHeader>

      <details className="cursor-pointer hover:ring-2 hover:ring-blue-500">
        <summary className="hover:text-rose-500">Expand this</summary>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque dolores
        debitis eius? Quidem corporis adipisci maiores exercitationem deleniti?
        Nesciunt, incidunt.
      </details>
    </>
  );
}
