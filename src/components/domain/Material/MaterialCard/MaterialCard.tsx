import { useState, useMemo, useCallback } from "react";

import Material from "@/common/models/materials/Material";
import CraftableMaterial from "@/common/models/materials/CraftableMaterial";
import { classNames } from "@/common/functions/strings";

import { useSettingsStore } from "@/stores";
import { Relations, Pagination, ObtainableDays, Region } from "./components";
import ModelCard, { BaseModelCardProps } from "@/components/common/ModelCard";
import { MaterialImage } from "@/components/common/Images";
import AscensionMaterial from "@/common/models/materials/AscensionMaterial";

export interface Props extends BaseModelCardProps {
  material: Material;
  allowCycle?: boolean;

  showDetails?: boolean;
  showModelsUsing?: boolean;
  showModelAquired?: boolean;
}

export default function MaterialCard({
  material,
  allowCycle = true,
  showRarity, showModelsUsing, showModelAquired, showDetails,
  ...props
}: Props) {
  const view = useSettingsStore(ss => ss.getSetting('preferredTabs').craftableMaterial);

  const craftingTree = CraftableMaterial.isCraftableMaterial(material) ?
    [material, ...material.getCraftingTreeAsMaterials()] :
    undefined;
  const [currentIndex, setCurrentIndex] = useState(() => (view === 'rarest' && allowCycle ? craftingTree?.length - 1 : undefined) ?? 0);
  const currentMaterial = useMemo(() => allowCycle ? craftingTree?.[currentIndex] ?? material : material, [craftingTree, currentIndex, material]);

  const onIndexChange = useCallback((index: number) => setCurrentIndex(index), []);

  return (
    <ModelCard
      model="Material"
      item={currentMaterial}
      {...props}
      data-show-details={showDetails}
      data-allow-pagination={allowCycle && craftingTree?.length > 1}
      {...{ 'data-today': AscensionMaterial.isAscensionMaterial(material) && material.isObtainableToday() }}

      renderImage={() => <MaterialImage material={currentMaterial.name} />}
      renderHeaderContent={(() => (
        <>
          {(showDetails || AscensionMaterial.isAscensionMaterial(material)) && (
            <div className="material-card__details">
              <div className="material-card__details-container">
                {showDetails && (
                  <p className="material-card__description">
                    {currentMaterial.description}
                  </p>
                )}
                {showDetails && <Region material={material} />}
                {AscensionMaterial.isAscensionMaterial(material) && <ObtainableDays material={material} />}
              </div>
            </div>
          )}
          {allowCycle && craftingTree?.length > 1 && (
            <Pagination
              materialName={material.name}
              craftingTree={craftingTree}
              currentIndex={currentIndex}
              onIndexChange={onIndexChange}
            />
          )}
        </>
      ))}

      renderContent={() => (<Relations
        material={material}
        showModelsUsing={showModelsUsing}
        showModelAquired={showModelAquired}
      />)}
    />
  );
}