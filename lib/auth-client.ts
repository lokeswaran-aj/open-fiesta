import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient();

export const signInWithGithub = async () => {
  const data = await authClient.signIn.social({
    provider: "github",
  });
  console.dir(data, { depth: null });
  return data;
};

export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
  console.dir(data, { depth: null });
  return data;
};
