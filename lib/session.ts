// Demo-only auth (replaces Clerk). There is a single hard-coded demo user and the
// session is just a cookie holding that user's id — fine for local demos, not for production.
// Kept free of server-only imports so middleware.ts (edge runtime) can use it.

export const SESSION_COOKIE = "fc_session";

export const DEMO_USER = {
  id: "demo-user",
  username: "demo",
  firstName: "Demo",
  // Must be an absolute URL (the profile form validates it as one); placehold.co is allowed in next.config.js.
  imageUrl: "https://placehold.co/96x96/png?text=Demo",
};

export type DemoUser = typeof DEMO_USER;
