import { ModelLogo } from "./model-selection/model-logo";
import { Loader } from "./prompt-kit/loader";
import { MessageAvatar } from "./prompt-kit/message";

type Props = {
  provider: string;
};

export const Loading = ({ provider }: Props) => {
  return (
    <div className="group min-h-scroll-anchor mt-[0.5px] flex w-full gap-2">
      <div className="flex items-start">
        <MessageAvatar
          className="size-5"
          component={<ModelLogo provider={provider} />}
        />
      </div>
      <Loader variant="text-shimmer" size="md" text="Thinking..." />
    </div>
  );
};
