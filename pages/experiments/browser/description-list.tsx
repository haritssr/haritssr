import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function DescriptionList() {
  return (
    <LayoutToExperiments domain="Browser" title="Description List">
      <SubTitle>
        <ExternalLink
          href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl"
          name="The Description List element"
        />
        <ExplanationList>
          <li>Glossary with built-in dl, dt, dd browser API.</li>
          <li>The default style overrided by Tailwind CSS preflight.</li>
          <li>
            In apperance it just about styling, but from HTML perspective it is
            semantic element for accesibility.
          </li>
        </ExplanationList>
      </SubTitle>
      <dl className="sm:w-1/2">
        <dt className="font-bold">This is title</dt>
        <dd className="mb-5 pl-10">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, nam.
        </dd>
        <dt className="font-bold">This is title</dt>
        <dd className="mb-5 pl-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla autem
          ipsa ullam voluptatibus vero deleniti provident officia id. Id
          recusandae minus facilis deleniti maiores non possimus doloribus
          perspiciatis fugiat unde.
        </dd>
        <dt className="font-bold">This is title</dt>
        <dd className="mb-5 pl-10">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, nam.
        </dd>
      </dl>
    </LayoutToExperiments>
  );
}
