"use client";

import { Menu } from "@base-ui/react/menu";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useSWR from "swr";
import { z } from "zod";

interface Session {
  account: { email: string; picture: string | null } | null;
}

async function fetchSession(url: string): Promise<Session> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Account status is unavailable.");
  }
  return z
    .object({
      account: z
        .object({ email: z.string(), picture: z.string().nullable() })
        .nullable(),
    })
    .parse(await response.json());
}

export default function TopBarAccount({ showLabel }: { showLabel: boolean }) {
  const { data } = useSWR<Session>("/api/timer/auth/session", fetchSession);
  const [failedPicture, setFailedPicture] = useState<string | null>(null);
  const account = data?.account;
  const label = account ? "Account" : "Sign in with Google";
  const className = showLabel
    ? "focus-visible:outline-action text-foreground hover:bg-foreground/5 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm focus-visible:outline-2 focus-visible:-outline-offset-2"
    : "focus-visible:outline-action text-foreground/70 hover:text-foreground flex cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2";
  const icon =
    account?.picture !== undefined &&
    account.picture !== null &&
    failedPicture !== account.picture ? (
      // Google serves this small avatar directly; no image optimizer or URL allowlist is needed.
      // oxlint-disable-next-line nextjs/no-img-element
      <img
        alt=""
        className="size-5 shrink-0 rounded-full object-cover sm:size-4.5"
        height={20}
        onError={() => {
          setFailedPicture(account.picture);
        }}
        referrerPolicy="no-referrer"
        src={account.picture}
        width={20}
      />
    ) : (
      <UserCircleIcon
        aria-hidden="true"
        className="size-5 shrink-0 sm:size-4.5"
      />
    );

  if (!account) {
    return (
      <form action="/api/timer/auth/login" method="get">
        <button
          type="submit"
          aria-label={label}
          className={className}
          title={label}
        >
          {icon}
          {showLabel ? <span>{label}</span> : null}
        </button>
      </form>
    );
  }

  return (
    <Menu.Root modal={false}>
      <Menu.Trigger
        aria-label={label}
        className={className}
        data-account-control=""
        title={label}
      >
        {icon}
        {showLabel ? <span>{label}</span> : null}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end" sideOffset={12} className="z-60">
          <Menu.Popup className="border-border text-foreground corner-squircle max-w-[calc(100vw-2rem)] rounded-2xl border bg-white/80 p-1 shadow-xl outline-hidden backdrop-blur-lg">
            <p className="text-muted px-3 py-2 text-sm break-all">
              {account.email}
            </p>
            <form action="/api/timer/auth/logout" method="post">
              <Menu.Item
                nativeButton
                render={<button aria-label="Sign out" type="submit" />}
                className="data-highlighted:bg-foreground/10 flex w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm outline-hidden"
              >
                Sign out
              </Menu.Item>
            </form>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
