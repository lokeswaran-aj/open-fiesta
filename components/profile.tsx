import { CircleUserRound } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Logout } from "./logout";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Profile = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data) {
    return (
      <Link
        href="/auth"
        className="cursor-pointer hover:underline hover:underline-offset-4"
      >
        Login
      </Link>
    );
  }

  const random = Math.floor(Math.random() * 100) + 1;
  const { email, name, image } = data.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="size-8 h-8 shadow-none"
          aria-label="Open account menu"
        >
          <CircleUserRound className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex items-start gap-3">
          <Image
            src={image ?? `https://avatar.iran.liara.run/public/${random}`}
            alt="Avatar"
            width={32}
            height={32}
            className="shrink-0 rounded-full"
            loading="eager"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              {name}
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
