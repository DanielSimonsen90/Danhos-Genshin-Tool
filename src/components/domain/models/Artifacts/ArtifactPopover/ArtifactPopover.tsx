import Popover, { PopoverProps } from "@/components/common/Popover";
import { useDataStore } from "@/stores";

import ArtifactCard from "../ArtifactCard";

type Props = Omit<PopoverProps, 'content'> & {
  artifactName: string;
};

export default function ArtifactPopover({ artifactName, children, ...popoverProps }: Props) {
  const artifact = useDataStore(store => store.findArtifactByName(artifactName));

  if (!artifact) return null;

  return (
    <Popover {...popoverProps} content={() => (
      <ArtifactCard
        artifact={artifact}
        showCharacterSets
        showCraftable
        showDomainList
        showDomainRewards
        showRegion
        showSetDescriptions
      />
    )}>
      {children}
    </Popover>
  );
}
