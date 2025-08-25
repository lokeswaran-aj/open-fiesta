"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      <LogOut className="size-4" />
      Logout
    </Button>
  );
};
