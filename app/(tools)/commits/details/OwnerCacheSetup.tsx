"use client";

import ExplanationList from "@/components/ExplanationList";
import Section from "@/components/Section";
import { useTimerSession } from "@/utils/timerSession";

/** Setup notes for the site owner; shown only while signed in as the owner. */
export default function OwnerCacheSetup() {
  const { data } = useTimerSession();
  if (!data?.account) {
    return null;
  }
  return (
    <Section id="cache-refresh" title="Cache refresh (owner)">
      <div className="max-w-3xl space-y-5">
        <p>
          After an import, <code>sync:commits</code> calls{" "}
          <code>POST /api/commits/revalidate</code> so new commits show up
          without waiting for the 24-hour cache. The call must carry{" "}
          <code>COMMITS_REVALIDATE_SECRET</code>, which acts as the password for
          that route.
        </p>
        <ExplanationList>
          <li>
            Set <code>COMMITS_REVALIDATE_SECRET</code> to the same value in{" "}
            <code>.env.local</code>, the Vercel project, and the GitHub
            repository secrets.
          </li>
          <li>
            Set <code>COMMITS_REVALIDATE_URL</code> to the full route address,
            for example <code>https://haritssr.com/api/commits/revalidate</code>
            , in <code>.env.local</code> and the GitHub repository secrets. The
            deployment does not need it.
          </li>
          <li>
            The values must match exactly. A mismatch returns 401: the import
            still succeeds, but the page keeps its old data until the cache
            expires.
          </li>
        </ExplanationList>
        <p className="text-muted text-sm">
          If it leaks, someone could call the route in a loop and force uncached
          database reads. They could not read or change data. Generate a new
          value, update all three places, and redeploy; the old one stops
          working at once. Keep it out of git, logs, and screenshots.
        </p>
      </div>
    </Section>
  );
}
