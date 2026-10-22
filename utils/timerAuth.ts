import "server-only";
import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

import { createRemoteJWKSet, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const secure = process.env.NODE_ENV === "production";
const sessionCookie = secure ? "__Host-timer-session" : "timer-session";
const oauthCookie = secure ? "__Host-timer-oauth" : "timer-oauth";
const cookieOptions = {
  httpOnly: true,
  secure,
  sameSite: "lax" as const,
  path: "/",
};
const authOrigin = z
  .string()
  .trim()
  .pipe(z.url())
  .transform((value, context) => {
    const origin = new URL(value);
    if (
      !["http:", "https:"].includes(origin.protocol) ||
      (secure && origin.protocol !== "https:") ||
      origin.username !== "" ||
      origin.password !== "" ||
      origin.pathname !== "/" ||
      origin.search !== "" ||
      origin.hash !== ""
    ) {
      context.issues.push({
        code: "custom",
        input: value,
        message: "Use an HTTP origin, HTTPS in production, without a path.",
      });
      return z.NEVER;
    }
    return origin.origin;
  });
const authConfig = z.object({
  TIMER_GOOGLE_CLIENT_ID: z.string().trim().min(1),
  TIMER_GOOGLE_CLIENT_SECRET: z
    .string()
    .refine((value) => value.trim().length > 0),
  TIMER_GOOGLE_EMAIL: z
    .string()
    .trim()
    .pipe(z.email())
    .transform((email) => email.toLowerCase()),
  TIMER_GOOGLE_USER_ID: z
    .string()
    .trim()
    .max(255)
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  TIMER_SESSION_SECRET: z
    .string()
    .min(32)
    .refine((value) => value.trim().length > 0),
  TIMER_AUTH_ORIGIN: authOrigin,
});
const configurationMessages = {
  TIMER_GOOGLE_CLIENT_ID: "Set the Google OAuth client ID.",
  TIMER_GOOGLE_CLIENT_SECRET: "Set the Google OAuth client secret.",
  TIMER_GOOGLE_EMAIL: "Set a valid owner email address.",
  TIMER_GOOGLE_USER_ID:
    "Omit this optional value or use at most 255 characters.",
  TIMER_SESSION_SECRET:
    "Set a session secret containing at least 32 characters.",
  TIMER_AUTH_ORIGIN:
    "Set an HTTP origin, HTTPS in production, without a path, query, credentials, or fragment.",
};

export class TimerAuthConfigurationError extends Error {
  readonly issues: { variable: string; message: string }[];
  constructor(issues: { variable: string; message: string }[]) {
    super(
      `Timer sign-in configuration is invalid. ${issues.map(({ variable, message }) => `${variable}: ${message}`).join(" ")}`
    );
    this.name = "TimerAuthConfigurationError";
    this.issues = issues;
  }
}

function config() {
  const settings = authConfig.safeParse(process.env);
  if (!settings.success) {
    const variables = new Set(
      settings.error.issues.map((issue) => issue.path[0])
    );
    const issues = Object.entries(configurationMessages)
      .filter(([variable]) => variables.has(variable))
      .map(([variable, message]) => ({ variable, message }));
    throw new TimerAuthConfigurationError(issues);
  }
  return settings.data;
}

function sign(payload: object, secret: string) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(encoded)
    .digest("base64url");
  return `${encoded}.${signature}`;
}

function verify(value: string | undefined, secret: string): unknown {
  if (value === undefined || value.length > 2048) {
    return null;
  }
  const [payload, signature, extra] = value.split(".");
  if (payload === undefined || signature === undefined || extra !== undefined) {
    return null;
  }
  const expected = createHmac("sha256", secret).update(payload).digest();
  const actual = Buffer.from(signature, "base64url");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return null;
  }
  try {
    return JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8")
    ) as unknown;
  } catch {
    return null;
  }
}

const profilePicture = z
  .url()
  .max(512)
  .refine((value) => new URL(value).protocol === "https:")
  .nullish()
  .catch(null);

const sessionSchema = z.object({
  kind: z.literal("google-session"),
  owner: z.string().min(1).max(255),
  email: z.email(),
  expires: z.number(),
  picture: profilePicture,
});
export async function timerSession() {
  const settings = authConfig.safeParse(process.env);
  if (!settings.success) {
    return null;
  }
  const jar = await cookies();
  const session = sessionSchema.safeParse(
    verify(jar.get(sessionCookie)?.value, settings.data.TIMER_SESSION_SECRET)
  );
  const allowed =
    session.success &&
    session.data.expires > Date.now() &&
    session.data.email === settings.data.TIMER_GOOGLE_EMAIL &&
    (settings.data.TIMER_GOOGLE_USER_ID === undefined ||
      session.data.owner === settings.data.TIMER_GOOGLE_USER_ID);
  return allowed && session.success
    ? { email: session.data.email, picture: session.data.picture ?? null }
    : null;
}

export async function isTimerOwner() {
  return (await timerSession()) !== null;
}

export function timerSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return (
    origin === new URL(request.url).origin &&
    request.headers.get("sec-fetch-site") !== "cross-site"
  );
}

export function timerSignIn() {
  const settings = config();
  const state = randomBytes(32).toString("base64url");
  const verifier = randomBytes(32).toString("base64url");
  const nonce = randomBytes(32).toString("base64url");
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({
    client_id: settings.TIMER_GOOGLE_CLIENT_ID,
    redirect_uri: `${settings.TIMER_AUTH_ORIGIN}/api/timer/auth/callback`,
    state,
    scope: "openid email profile",
    response_type: "code",
    prompt: "select_account",
    nonce,
    code_challenge: createHash("sha256").update(verifier).digest("base64url"),
    code_challenge_method: "S256",
  }).toString();
  const response = NextResponse.redirect(url);
  response.cookies.set(
    oauthCookie,
    sign(
      {
        kind: "google-oauth",
        state,
        verifier,
        nonce,
        expires: Date.now() + 600_000,
      },
      settings.TIMER_SESSION_SECRET
    ),
    { ...cookieOptions, maxAge: 600 }
  );
  return response;
}

const oauthSchema = z.object({
  kind: z.literal("google-oauth"),
  nonce: z.string().min(1),
  state: z.string(),
  verifier: z.string(),
  expires: z.number(),
});
// Cache Google's rotating public signing keys, never tokens or personal data.
const googleKeys = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs")
);
const googleIdentitySchema = z.object({
  sub: z.string().min(1).max(255),
  email: z.email(),
  email_verified: z.literal(true),
  nonce: z.string(),
  azp: z.string().optional(),
  picture: profilePicture,
});

export async function timerSignInCallback(request: Request) {
  const settings = config();
  const jar = await cookies();
  const pending = oauthSchema.safeParse(
    verify(jar.get(oauthCookie)?.value, settings.TIMER_SESSION_SECRET)
  );
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const failure = NextResponse.redirect(
    `${settings.TIMER_AUTH_ORIGIN}/timer?auth=failed`
  );
  failure.cookies.set(oauthCookie, "", { ...cookieOptions, maxAge: 0 });
  if (
    !pending.success ||
    pending.data.expires <= Date.now() ||
    pending.data.state !== url.searchParams.get("state") ||
    code === null ||
    code.length > 1024
  ) {
    return failure;
  }
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: settings.TIMER_GOOGLE_CLIENT_ID,
      client_secret: settings.TIMER_GOOGLE_CLIENT_SECRET,
      code,
      code_verifier: pending.data.verifier,
      redirect_uri: `${settings.TIMER_AUTH_ORIGIN}/api/timer/auth/callback`,
    }),
  });
  if (!tokenResponse.ok) {
    return failure;
  }
  const token = z
    .object({ id_token: z.string().min(1) })
    .safeParse(await tokenResponse.json());
  if (!token.success) {
    return failure;
  }
  let identity;
  try {
    const { payload } = await jwtVerify(token.data.id_token, googleKeys, {
      issuer: ["https://accounts.google.com", "accounts.google.com"],
      audience: settings.TIMER_GOOGLE_CLIENT_ID,
      algorithms: ["RS256"],
      requiredClaims: ["sub", "exp", "iat", "nonce", "email", "email_verified"],
    });
    identity = googleIdentitySchema.safeParse(payload);
  } catch {
    return failure;
  }
  if (
    !identity.success ||
    identity.data.nonce !== pending.data.nonce ||
    identity.data.email.toLowerCase() !== settings.TIMER_GOOGLE_EMAIL ||
    (identity.data.azp !== undefined &&
      identity.data.azp !== settings.TIMER_GOOGLE_CLIENT_ID) ||
    (settings.TIMER_GOOGLE_USER_ID !== undefined &&
      identity.data.sub !== settings.TIMER_GOOGLE_USER_ID)
  ) {
    return failure;
  }
  const response = NextResponse.redirect(`${settings.TIMER_AUTH_ORIGIN}/timer`);
  response.cookies.set(oauthCookie, "", { ...cookieOptions, maxAge: 0 });
  response.cookies.set(
    sessionCookie,
    sign(
      {
        kind: "google-session",
        owner: identity.data.sub,
        email: identity.data.email.toLowerCase(),
        picture: identity.data.picture,
        expires: Date.now() + 7 * 86_400_000,
      },
      settings.TIMER_SESSION_SECRET
    ),
    { ...cookieOptions, maxAge: 7 * 86_400 }
  );
  return response;
}

export function timerSignOut(request: Request) {
  if (!timerSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const response = NextResponse.redirect(new URL("/timer", request.url), 303);
  response.cookies.set(sessionCookie, "", { ...cookieOptions, maxAge: 0 });
  return response;
}
