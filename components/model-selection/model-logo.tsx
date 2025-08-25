import { ProviderLogos } from "@/components/ui/provider-logos";
import Icons from "../ui/icons";

type Props = {
  provider: string;
};

export const ModelLogo = (props: Props) => {
  const { provider } = props;
  return (
    <div>
      {(() => {
        const providerKey = provider as keyof typeof ProviderLogos;
        const Logo = ProviderLogos[providerKey];
        return Logo ? Logo(16) : <Icons.logo className="size-4" />;
      })()}
    </div>
  );
};
