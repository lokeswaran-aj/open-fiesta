import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Logout } from "./logout";

export const Profile = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data) {
    return <Link href="/auth">Login</Link>;
  }

  return <Logout />;
};
