import Popover, { PopoverProps } from "@/components/common/Popover";
import { useDataStore } from "@/stores";

import MobCard from "../MobCard";

type Props = Omit<PopoverProps, 'content'> & {
  mobName: string;
};

export default function MobPopover({ mobName, children, ...popoverProps }: Props) {
  const mob = useDataStore(store => store.findMobByName(mobName));

  if (!mob) return null;

  return (
    <Popover {...popoverProps} content={() => (
      <MobCard
        mob={mob}
        showDetails
        showDrops
        showRarity
        showRegion
        showRelations
        showResin
        noSeparator
      />
    )}>
      {children}
    </Popover>
  );
}
