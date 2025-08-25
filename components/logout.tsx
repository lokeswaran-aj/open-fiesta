"use client";

import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export const Logout = () => {
  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      <LogOut className="size-4" />
      Logout
    </Button>
  );
};
