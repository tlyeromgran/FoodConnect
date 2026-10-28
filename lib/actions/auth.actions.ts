"use server";

import { cookies } from "next/headers";

import { DEMO_USER, SESSION_COOKIE } from "../session";

// Credentials come from DEMO_USERNAME / DEMO_PASSWORD in .env.local.
// Returns instead of redirecting: Next 13 can't redirect from a server action across root layouts
// ((auth) -> (root)), so SignInForm does a full page navigation on success.
export async function signIn(formData: FormData): Promise<{ ok: boolean }> {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    !process.env.DEMO_USERNAME ||
    !process.env.DEMO_PASSWORD ||
    username !== process.env.DEMO_USERNAME ||
    password !== process.env.DEMO_PASSWORD
  ) {
    return { ok: false };
  }

  cookies().set(SESSION_COOKIE, DEMO_USER.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { ok: true };
}

// Callers navigate to /sign-in themselves, for the same root-layout reason as signIn.
export async function signOut() {
  cookies().delete(SESSION_COOKIE);
}
