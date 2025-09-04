"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useSidebar } from "./ui/sidebar";

export const Logout = () => {
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    isMobile && setOpenMobile(false);
  };

  return (
    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
      <LogOut className="size-4 text-destructive" />
      <span className="text-destructive">Log out</span>
    </DropdownMenuItem>
  );
};
