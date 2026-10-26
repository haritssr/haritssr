import { NextResponse } from "next/server";

import {
  TimerAuthConfigurationError,
  timerSession,
  timerSignIn,
  timerSignInCallback,
  timerSignOut,
} from "@/app/(tools)/timer/server/timerAuth";

export const runtime = "nodejs";
interface Context {
  params: Promise<{ action: string }>;
}
export async function GET(request: Request, { params }: Context) {
  const { action } = await params;
  try {
    let response: NextResponse;
    if (action === "session") {
      response = NextResponse.json({ account: await timerSession() });
    } else if (action === "login") {
      response = timerSignIn();
    } else if (action === "callback") {
      response = await timerSignInCallback(request);
    } else {
      response = NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    if (error instanceof TimerAuthConfigurationError) {
      console.error("Timer authentication configuration is invalid.", {
        action,
        issues: error.issues,
      });
      return NextResponse.json(
        {
          error: error.message,
          code: "AUTH_CONFIGURATION_INVALID",
          issues: error.issues,
        },
        { status: 503, headers: { "Cache-Control": "no-store" } }
      );
    }
    // Raw errors can include tokens, URLs, or other credentials.
    console.error("Timer authentication request failed.", {
      action,
      errorType: error instanceof TypeError ? "TypeError" : "UnexpectedError",
    });
    return NextResponse.json(
      {
        error:
          "Timer sign-in is unavailable. Check the server authentication configuration and try again.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
export async function POST(request: Request, { params }: Context) {
  const { action } = await params;
  return action === "logout"
    ? timerSignOut(request)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
