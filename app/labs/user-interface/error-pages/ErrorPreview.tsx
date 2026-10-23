"use client";

import { useState } from "react";

import Button from "@/components/Button";
import { SelectField } from "@/components/SelectField";

const states = [
  {
    code: "Offline",
    title: "You’re offline",
    meaning: "The network is unreachable; this is not an HTTP status.",
    recovery: "Check your connection, then try again.",
    action: "Try again",
  },
  {
    code: "400",
    title: "Bad request",
    meaning: "The server cannot process the request as sent.",
    recovery: "Check the information you entered before submitting again.",
    action: "Review request",
  },
  {
    code: "401",
    title: "Sign in required",
    meaning: "Valid authentication credentials are missing.",
    recovery: "Sign in to continue to this page.",
    action: "Sign in",
  },
  {
    code: "403",
    title: "Access denied",
    meaning: "The server refuses access to this resource.",
    recovery: "Ask the owner for access or use an authorized account.",
    action: "Request access",
  },
  {
    code: "404",
    title: "Page not found",
    meaning: "The resource was not found, or the server will not disclose it.",
    recovery: "Check the address or return to a known page.",
    action: "Back to home",
  },
  {
    code: "408",
    title: "Request timed out",
    meaning: "The server waited too long for the request.",
    recovery: "Check your connection before trying again.",
    action: "Try again",
  },
  {
    code: "410",
    title: "This page is gone",
    meaning: "The resource is no longer available, likely permanently.",
    recovery: "Look for an updated page or return home.",
    action: "Back to home",
  },
  {
    code: "429",
    title: "Too many requests",
    meaning: "A request rate limit has been reached.",
    recovery: "Wait before trying again; follow any retry time provided.",
    action: "Try later",
  },
  {
    code: "500",
    title: "Something went wrong",
    meaning: "The server encountered an unexpected problem.",
    recovery: "Try again later. Contact the site owner if it continues.",
    action: "Try again",
  },
  {
    code: "502",
    title: "Bad gateway",
    meaning: "A gateway received an invalid upstream response.",
    recovery: "The service may recover shortly. Try again later.",
    action: "Try again",
  },
  {
    code: "503",
    title: "Temporarily unavailable",
    meaning: "The service is temporarily unable to handle requests.",
    recovery: "Wait for maintenance or overload to clear before retrying.",
    action: "Try later",
  },
  {
    code: "504",
    title: "Gateway timed out",
    meaning: "A gateway waited too long for an upstream response.",
    recovery: "Try again later while the service recovers.",
    action: "Try again",
  },
  {
    code: "505",
    title: "HTTP version not supported",
    meaning: "The server does not support the request’s HTTP version.",
    recovery: "Contact the site owner to investigate protocol compatibility.",
    action: "Contact support",
  },
  {
    code: "Application error",
    title: "This view couldn’t load",
    meaning:
      "Rendering failed in the application; there may be no new HTTP response.",
    recovery: "Retry the view or return to a working page.",
    action: "Retry view",
  },
];

const options = states.map((state) => ({
  label: `${state.code} · ${state.title}`,
  value: state.code,
}));

export default function ErrorPreview() {
  const [code, setCode] = useState("404");
  const [feedback, setFeedback] = useState("");
  const selected = states.find((state) => state.code === code) ?? states[0];

  return (
    <div className="space-y-5">
      <div className="max-w-md">
        <SelectField
          label="Error state"
          options={options}
          value={code}
          onValueChange={(value) => {
            setCode(value);
            setFeedback("");
          }}
        />
      </div>
      <div className="border-border bg-background rounded-xl border p-6 sm:p-10">
        <div className="max-w-xl space-y-5">
          <p className="text-muted text-sm">Preview · {selected.code}</p>
          <p className="text-3xl font-semibold">{selected.title}</p>
          <p className="text-muted">{selected.recovery}</p>
          <Button
            onClick={() => {
              setFeedback(
                `Demo only: “${selected.action}” does not send a request or leave this page.`
              );
            }}
          >
            {selected.action}
          </Button>
        </div>
      </div>
      <p aria-live="polite" className="text-muted min-h-6 text-sm">
        {feedback}
      </p>
      <dl className="max-w-3xl space-y-2">
        <dt className="font-medium">What happened?</dt>
        <dd className="text-muted">{selected.meaning}</dd>
      </dl>
      <p className="text-muted text-sm">
        These are simulated interfaces. Selecting a code does not change this
        page’s HTTP response.
      </p>
    </div>
  );
}
