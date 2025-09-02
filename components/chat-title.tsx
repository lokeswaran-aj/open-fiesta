"use client";

import { usePathname } from "next/navigation";
import { useHistory } from "@/stores/use-history";

export const ChatTitle = () => {
  const pathname = usePathname();
  const isChatPage = pathname.startsWith("/c/");
  const title = useHistory((state) => state.title);
  if (!isChatPage) return null;
  return (
    <div>
      <h3 className="hidden sm:block text-base font-medium" title={title}>
        {title}
      </h3>
    </div>
  );
};
