import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient();

export const signInWithGithub = async (nextUrl?: string) => {
  const data = await authClient.signIn.social({
    provider: "github",
    callbackURL: nextUrl,
  });
  console.dir(data, { depth: null });
  return data;
};

export const signInWithGoogle = async (nextUrl?: string) => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: nextUrl,
  });
  console.dir(data, { depth: null });
  return data;
};
