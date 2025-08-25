import { ArrowLeftIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { auth } from "@/lib/auth";

type AuthPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: AuthPageProps) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  const params = await searchParams;
  const nextUrl = params.next;

  if (data) {
    return redirect(nextUrl || "/");
  }

  return (
    <div className="relative h-screen">
      <Link
        href="/"
        className="absolute top-4 left-4 z-10 flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to home
      </Link>
      <main className="flex h-full flex-col items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md">
          <LoginForm nextUrl={nextUrl} />
        </div>
      </main>
    </div>
  );
}
