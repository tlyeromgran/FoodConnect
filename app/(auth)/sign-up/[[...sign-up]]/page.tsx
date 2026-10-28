import { redirect } from "next/navigation";

// Demo auth has a single built-in account, so there is nothing to sign up for.
export default function Page() {
  redirect("/sign-in");
}
