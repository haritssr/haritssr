import ToolChangelog from "@/app/(tools)/_components/ToolChangelog";
import ExplanationList from "@/components/ExplanationList";
import FlowDiagram from "@/components/FlowDiagram";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Table from "@/components/Table";
import { urlDetailsRoute, urlRoute } from "@/data/routes";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

const relationships = `flowchart TD
  accTitle: URL inspection and cleaning
  accDescr: URLCleaner keeps the entered URL and removal choices in browser memory. parseURL validates and separates the URL, parameterLabel decodes labels for display, and cleanURL combines the retained raw parts. Copy controls write the chosen text to the clipboard.
  Input["Entered URL"] --> Parse["parseURL: validate and separate parts"]
  Parse --> View["Inspect the path, parameters, and fragment"]
  View --> Choices["Choose parameters and fragment to remove"]
  Parse --> Clean["cleanURL: retain unselected raw parts"]
  Choices --> Clean
  Clean --> Result["Cleaned URL"]
  Result --> Clipboard["Copy to clipboard"]
`;

export const metadata = createPageMetadata({
  title: "URL Details",
  description: urlDetailsRoute.description,
  path: urlDetailsRoute.route,
});

export default function URLDetailsPage() {
  return (
    <>
      <PageHeader
        back={{ href: urlRoute.route, name: urlRoute.title }}
        path={urlDetailsRoute.route}
      >
        <PageTitle>Details</PageTitle>
        <PageDescription>
          Inspect a URL, remove unwanted parts, and copy the cleaned result.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section
          id="what-you-can-do"
          title="What you can do"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>
              Paste a complete URL to inspect its path, query parameters, and
              fragment.
            </li>
            <li>
              Copy individual path segments, parameter names, or parameter
              values.
            </li>
            <li>
              Remove individual parameters or use Remove all and Keep all.
            </li>
            <li>Choose whether to remove the fragment after the hash sign.</li>
            <li>
              Preview and copy the cleaned URL as you change your selections.
            </li>
            <li>
              Start again with Clear, with no saved history of pasted URLs.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="cleaning-rules"
          title="What to know"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>The URL field receives focus when you open the tool.</li>
            <li>Enter a complete URL with its scheme, such as https://.</li>
            <li>
              Surrounding curly quotes are removed automatically when you paste
              a URL.
            </li>
            <li>
              All parameters and the fragment stay included until you select
              them for removal.
            </li>
            <li>
              Repeated parameters can be removed individually, and retained
              parameters keep their original order and encoding.
            </li>
            <li>
              Parameter names and values are decoded for display, while retained
              parts keep their original text in the result.
            </li>
            <li>
              Changing the input resets your removal choices, and entered URLs
              are not saved to a history.
            </li>
            <li>
              If copying is unavailable, select the cleaned URL and copy it
              manually.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="parts-of-a-url"
          title="Parts of a URL"
          contentClassName="max-w-3xl"
        >
          <div className="space-y-5">
            <p>
              A URL (Uniform Resource Locator) identifies a resource and how to
              access it, for example:
            </p>
            <p className="border-border bg-surface rounded-md border p-3 text-sm wrap-anywhere">
              <code>
                https://docs.example.com:8443/guides/setup?lang=en&amp;view=compact#install
              </code>
            </p>
            <Table>
              <caption className="sr-only">
                URL parts and their meanings
              </caption>
              <thead>
                <tr className="divide-border bg-foreground/5 divide-x">
                  <th className="px-3 text-left font-medium" scope="col">
                    Part
                  </th>
                  <th className="px-3 text-left font-medium" scope="col">
                    Meaning
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                <tr className="divide-border divide-x">
                  <th
                    className="px-3 py-2 text-left align-top font-medium"
                    scope="row"
                  >
                    Scheme
                  </th>
                  <td className="px-3 py-2 align-top">
                    <code>https</code> specifies how to access the resource;
                    HTTPS uses an encrypted connection.
                  </td>
                </tr>
                <tr className="divide-border divide-x">
                  <th
                    className="px-3 py-2 text-left align-top font-medium"
                    scope="row"
                  >
                    Host
                  </th>
                  <td className="px-3 py-2 align-top wrap-anywhere">
                    <code>docs.example.com</code> identifies the server by its
                    domain name, with <code>docs</code> as a subdomain of{" "}
                    <code>example.com</code>; a host can also be an IP address.
                  </td>
                </tr>
                <tr className="divide-border divide-x">
                  <th
                    className="px-3 py-2 text-left align-top font-medium"
                    scope="row"
                  >
                    Port
                  </th>
                  <td className="px-3 py-2 align-top">
                    <code>:8443</code> selects a port on the server and can be
                    omitted when the scheme’s default port is used.
                  </td>
                </tr>
                <tr className="divide-border divide-x">
                  <th
                    className="px-3 py-2 text-left align-top font-medium"
                    scope="row"
                  >
                    Path
                  </th>
                  <td className="px-3 py-2 align-top">
                    <code>/guides/setup</code> identifies the resource within
                    the site, with slashes separating path segments.
                  </td>
                </tr>
                <tr className="divide-border divide-x">
                  <th
                    className="px-3 py-2 text-left align-top font-medium"
                    scope="row"
                  >
                    Query
                  </th>
                  <td className="px-3 py-2 align-top wrap-anywhere">
                    <code>?lang=en&amp;view=compact</code> supplies extra
                    information, such as filters or preferences, after a
                    question mark.
                  </td>
                </tr>
                <tr className="divide-border divide-x">
                  <th
                    className="px-3 py-2 text-left align-top font-medium"
                    scope="row"
                  >
                    Parameter
                  </th>
                  <td className="px-3 py-2 align-top">
                    In <code>lang=en</code>, <code>lang</code> is the name and{" "}
                    <code>en</code> is its value; an ampersand separates it from
                    the next parameter.
                  </td>
                </tr>
                <tr className="divide-border divide-x">
                  <th
                    className="px-3 py-2 text-left align-top font-medium"
                    scope="row"
                  >
                    Fragment
                  </th>
                  <td className="px-3 py-2 align-top">
                    <code>#install</code> identifies a section or client-side
                    state within the resource and is not sent in the HTTP
                    request.
                  </td>
                </tr>
                <tr className="divide-border divide-x">
                  <th
                    className="px-3 py-2 text-left align-top font-medium"
                    scope="row"
                  >
                    User information
                  </th>
                  <td className="px-3 py-2 align-top">
                    Some URLs include a username and optional password before
                    the host, such as <code>user:password@</code>; this optional
                    part is absent from the example above.
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Section>
        <Section id="how-it-works" title="How it works">
          <p className="max-w-3xl">
            Your browser checks and separates the URL, then rebuilds the result
            from the parts you keep; cleaning does not send the URL to a server
            or visit its destination.
          </p>
          <FlowDiagram
            definition={relationships}
            title="URL components and data flow"
          />
        </Section>
        <ToolChangelog tool="url" />
      </div>
    </>
  );
}
