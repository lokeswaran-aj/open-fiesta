"use client";
import { Github, Google } from "@lobehub/icons";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signInWithGithub, signInWithGoogle } from "@/lib/auth-client";
import Icons from "./ui/icons";

type LoginFormProps = {
  nextUrl?: string;
};

export function LoginForm(props: LoginFormProps) {
  const { nextUrl } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignInWithGoogle() {
    setIsLoading(true);
    setError(null);

    const { data, error } = await signInWithGoogle(nextUrl);

    if (data?.url) {
      window.location.href = data.url;
      return;
    } else if (error) {
      setError(
        error.message || "An unexpected error occurred. Please try again.",
      );
      setIsLoading(false);
    }
  }

  async function handleSignInWithGithub() {
    setIsLoading(true);
    setError(null);

    const { data, error } = await signInWithGithub(nextUrl);

    if (data?.url) {
      window.location.href = data.url;
      return;
    } else if (error) {
      setError(
        error.message || "An unexpected error occurred. Please try again.",
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 text-center">
        <div className="flex items-center justify-center gap-4">
          <Icons.logo className="h-6 md:h-8 w-auto" />
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome to Open Fiesta
          </h1>
        </div>
        <p className="text-muted-foreground">
          One more click and you&apos;re in the party. Let&apos;s get this
          bread! 🥖✨
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {isLoading ? (
          <div className="flex items-center justify-center h-24">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <>
            <Button
              onClick={handleSignInWithGoogle}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              <Google.Color className="h-4 w-4" />
              Continue with Google
            </Button>
            <Button
              onClick={handleSignInWithGithub}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              <Github className="h-4 w-4" />
              Continue with Github
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
