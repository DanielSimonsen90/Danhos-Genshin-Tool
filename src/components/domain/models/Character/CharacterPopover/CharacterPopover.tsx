import { useMemo } from "react";

import Popover, { PopoverProps } from "@/components/common/Popover";
import { useDataStore } from "@/stores";

import CharacterCard from "../CharacterCard";

type Props = Omit<PopoverProps, 'content'> & {
  characterName: string;
};

export default function CharacterPopover({ characterName, children, ...popoverProps }: Props) {
  const character = useDataStore(store => store.findCharacterByName(characterName));

  if (!character) return null;

  return (
    <Popover {...popoverProps} content={() => (
      <CharacterCard
        character={character}
        showAscensionSection
        showCharacterPlaystyle
        showRecommendedWeapons
        showSignatureWeapon
      />
    )}>
      {children}
    </Popover>
  );
}
