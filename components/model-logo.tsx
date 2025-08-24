import { MessageAvatar } from "./prompt-kit/message";
import ProviderLogos from "./ui/provider-logos";

type Props = {
  modelId: string;
};

export const ModelLogo = (props: Props) => {
  const { modelId } = props;
  return (
    <div>
      {(() => {
        const providerKey = modelId.split("/")[0] as keyof typeof ProviderLogos;
        const Logo = ProviderLogos[providerKey];
        return Logo ? (
          Logo(16)
        ) : (
          <MessageAvatar fallback={providerKey.charAt(0).toUpperCase()} />
        );
      })()}
    </div>
  );
};
