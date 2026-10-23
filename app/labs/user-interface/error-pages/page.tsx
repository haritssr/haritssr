import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";

import ErrorPreview from "./ErrorPreview";

export const metadata = getLabMetadata("user-interface", "error-pages");

export default function ErrorPagesLab() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>
          Explore offline screens, HTTP errors, and application failures.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-16">
        <Section
          title="Error playground"
          description="Choose a state to compare its message, meaning, and recovery action."
        >
          <ErrorPreview />
        </Section>
        <Section
          title="This site’s offline page"
          description="The actual standalone fallback, displayed here while you are online."
        >
          <iframe
            className="border-border h-[32rem] w-full rounded-xl border"
            loading="lazy"
            sandbox="allow-scripts"
            src="/offline.html"
            title="Existing offline page preview"
          />
          <div className="max-w-3xl space-y-5">
            <p>
              The service worker serves this fallback when a same-origin page
              navigation fails to reach the network. It needs an installed,
              controlling service worker; opening this preview does not enable
              offline mode.
            </p>
            <InternalLink href="/offline.html">Open offline page</InternalLink>
          </div>
        </Section>
        <Section
          title="This site’s 404 page"
          description="A missing address displays the existing Page not found interface."
        >
          <iframe
            className="border-border h-[32rem] w-full rounded-xl border"
            loading="lazy"
            sandbox=""
            src="/labs/user-interface/error-pages/missing-page-preview"
            title="Existing page not found preview"
          />
          <p className="text-muted">
            This static preview disables scripts. Back to home opens inside the
            frame; the scripted Go back control is inactive.
          </p>
        </Section>
        <Section
          title="Which kind of failure?"
          contentClassName="max-w-3xl space-y-5"
        >
          <ul className="list-disc space-y-3 pl-5">
            <li>
              Offline: the browser cannot reach the network. There may be no
              server response at all.
            </li>
            <li>
              4xx: the request needs attention, such as an incorrect address,
              missing authentication, or a rate limit.
            </li>
            <li>
              5xx: the server or an upstream service failed to fulfill the
              request. A 500 is a general server error; 505 specifically
              concerns the HTTP version.
            </li>
            <li>
              Application crash: rendering can fail after a page has loaded
              successfully. This site’s global error boundary offers Try again
              and Back to home, with an error ID when available. The playground
              illustrates this state without crashing the app.
            </li>
          </ul>
          <p>
            Maintenance commonly uses 503. An empty list and a loading indicator
            are ordinary interface states, rather than error pages.
          </p>
          <p>
            References:{" "}
            <ExternalLink
              href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status"
              name="MDN HTTP status codes"
            />{" "}
            and{" "}
            <ExternalLink
              href="https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes"
              name="HTTP Semantics"
            />
            .
          </p>
        </Section>
      </div>
    </>
  );
}
