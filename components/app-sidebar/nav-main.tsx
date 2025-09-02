"use client";

import { Image, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const NavMain = () => {
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="New Chat"
            onClick={() => {
              router.push("/");
            }}
          >
            <SquarePen />
            <span>New Chat</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Generate Image"
            onClick={() => {
              router.push("/image");
            }}
          >
            <Image />
            <span>Generate Image</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};
