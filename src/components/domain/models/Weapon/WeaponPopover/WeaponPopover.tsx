import Popover, { PopoverProps } from "@/components/common/Popover";
import { useDataStore } from "@/stores";

import WeaponCard from "../WeaponCard";

type Props = Omit<PopoverProps, 'content'> & {
  weaponName: string;
};

export default function WeaponPopover({ weaponName, children, ...popoverProps }: Props) {
  const weapon = useDataStore(store => store.findWeaponByName(weaponName));

  if (!weapon) return null;

  return (
    <Popover {...popoverProps} content={() => (
      <WeaponCard
        weapon={weapon}
        showDetails
        showAscensionSection
        showRecommendedCharacters
        showSignatureCharacter
        showSource
        showStats
        noSeparator
      />
    )}>
      {children}
    </Popover>
  );
}
