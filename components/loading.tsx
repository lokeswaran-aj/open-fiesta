import { Loader } from "./prompt-kit/loader";
import { MessageAvatar } from "./prompt-kit/message";
import Icons from "./ui/icons";

export const Loading = () => {
  return (
    <div className="group min-h-scroll-anchor mt-[0.5px] flex w-full gap-2">
      <div className="flex items-start">
        <MessageAvatar className="size-5" component={Icons.logo} />
      </div>
      <Loader variant="text-shimmer" size="md" text="Thinking..." />
    </div>
  );
};
