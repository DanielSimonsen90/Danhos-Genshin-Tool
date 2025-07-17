import { useState, useMemo, useCallback } from "react";

import Material from "@/common/models/materials/Material";
import CraftableMaterial from "@/common/models/materials/CraftableMaterial";
import { classNames } from "@/common/functions/strings";

import { useSettingsStore } from "@/stores";
import { Relations, Pagination, ObtainableDays } from "./components";
import { Region } from "@/components/domain";
import { Billet } from "@/common/models/materials/Billet";
import ModelCard, { BaseModelCardProps } from "@/components/domain/ModelCard";
import { MaterialImage } from "@/components/common/media/Images";
import AscensionMaterial from "@/common/models/materials/AscensionMaterial";

export interface Props extends BaseModelCardProps {
  material: Material;
  allowCycle?: boolean;

  showDetails?: boolean;
  showRegion?: boolean;
  showModelsUsing?: boolean;
  showModelAquired?: boolean;
}

export default function MaterialCard({
  material,
  allowCycle = true,
  showModelsUsing, showModelAquired, showDetails, showRegion,
  ...props
}: Props) {
  const view = useSettingsStore(ss => ss.getSetting('preferredTabs').craftableMaterial);

  const craftingTree = CraftableMaterial.isCraftableMaterial(material) ?
    material.getCraftingTreeAsMaterials() :
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
          {(showDetails || showRegion || AscensionMaterial.isAscensionMaterial(material)) && (
            <div className="material-card__details-container">
              {showDetails && (
                <p className="material-card__description">
                  {currentMaterial.description}
                </p>
              )}
              {(showDetails || showRegion) && (
                <Region 
                  region={
                    Billet.isBillet(material) 
                      ? material.regions 
                      : material.region || 'Unknown'
                  }
                  className="material-card__region"
                  tag="ul"
                  keyPrefix={`material-region-${material.name}`}
                />
              )}
              {AscensionMaterial.isAscensionMaterial(material) && <ObtainableDays material={material} />}
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