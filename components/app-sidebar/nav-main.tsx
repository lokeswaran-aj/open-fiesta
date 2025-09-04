"use client";

import { Image, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export const NavMain = () => {
  const router = useRouter();
  const { setOpenMobile, isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="New Chat"
            onClick={() => {
              router.push("/");
              isMobile && setOpenMobile(false);
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
              isMobile && setOpenMobile(false);
            }}
          >
            <Image />
            <span>Generate Image</span>
            <span className="ml-auto rounded-full bg-purple-500 px-2 py-0.5 text-xs font-medium text-white animate-bounce">
              New
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};
