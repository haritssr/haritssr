import { NextResponse } from "next/server";

import {
  timerSession,
  timerSignIn,
  timerSignInCallback,
  timerSignOut,
} from "@/utils/timerAuth";

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
  } catch {
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
