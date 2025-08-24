import { ProviderLogos } from "@/components/ui/provider-logos";
import Icons from "../ui/icons";

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
        return Logo ? Logo(16) : <Icons.logo className="size-4" />;
      })()}
    </div>
  );
};
