"use client";

import { useHistory } from "@/stores/use-history";

export const ChatTitle = () => {
  const title = useHistory((state) => state.title);
  return (
    <div>
      <h3 className="hidden sm:block text-base font-medium" title={title}>
        {title}
      </h3>
    </div>
  );
};
