import { cookies } from "next/headers";

import { DEMO_USER, DemoUser, SESSION_COOKIE } from "./session";

// Drop-in replacement for Clerk's currentUser(): returns the demo user when signed in, otherwise null.
export async function currentUser(): Promise<DemoUser | null> {
  return cookies().get(SESSION_COOKIE)?.value === DEMO_USER.id ? DEMO_USER : null;
}
