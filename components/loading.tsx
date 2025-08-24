import { ModelLogo } from "./model-selection/model-logo";
import { Loader } from "./prompt-kit/loader";
import { MessageAvatar } from "./prompt-kit/message";

type Props = {
  modelId: string;
};

export const Loading = ({ modelId }: Props) => {
  return (
    <div className="group min-h-scroll-anchor mt-[0.5px] flex w-full gap-2">
      <div className="flex items-start">
        <MessageAvatar
          className="size-5"
          component={<ModelLogo modelId={modelId} />}
        />
      </div>
      <Loader variant="text-shimmer" size="md" text="Thinking..." />
    </div>
  );
};
