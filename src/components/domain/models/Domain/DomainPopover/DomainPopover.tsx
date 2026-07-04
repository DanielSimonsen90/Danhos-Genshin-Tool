import Popover, { PopoverProps } from "@/components/common/Popover";
import { useDataStore } from "@/stores";

import DomainCard from "../DomainCard";

type Props = Omit<PopoverProps, 'content'> & {
  domainName: string;
};

export default function DomainPopover({ domainName, children, ...popoverProps }: Props) {
  const domain = useDataStore(store => store.findDomainByName(domainName));

  if (!domain) return null;

  return (
    <Popover {...popoverProps} content={() => (
      <DomainCard
        domain={domain}
        showCharactersBenefitFromRewards
        showDescription
        showDetailedRewards
        showMinRewards
      />
    )}>
      {children}
    </Popover>
  );
}
