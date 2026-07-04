import Popover, { PopoverProps } from "@/components/common/Popover";
import { useDataStore } from "@/stores";

import MaterialCard from "../MaterialCard";

type Props = Omit<PopoverProps, 'content'> & {
  materialName: string;
};

export default function MaterialPopover({ materialName, children, ...popoverProps }: Props) {
  const material = useDataStore(store => store.findMaterialByName(materialName));

  if (!material) return null;

  return (
    <Popover {...popoverProps} content={() => (
      <MaterialCard
        material={material}
        showDetails
        showModelAcquired
        showModelsUsing
        showRegion
      />
    )}>
      {children}
    </Popover>
  );
}
