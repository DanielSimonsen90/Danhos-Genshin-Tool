import { useState, useMemo, useCallback, useEffect, useRef } from "react";

import Material from "@/common/models/materials/Material";
import CraftableMaterial from "@/common/models/materials/CraftableMaterial";
import { classNames } from "@/common/functions/strings";

import { useRegionStore, useSettingsStore } from "@/stores";
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
  showModelAcquired?: boolean;
}

export default function MaterialCard({
  material,
  allowCycle = true,
  showModelsUsing, showModelAcquired, showDetails, showRegion,
  ...props
}: Props) {
  const RegionStore = useRegionStore();
  const view = useSettingsStore(ss => ss.getSetting('preferredTabs')?.craftableMaterial);
  const hasInteractedWithPagination = useRef(false);

  const craftingTree = CraftableMaterial.isCraftableMaterial(material) ?
    material.getCraftingTreeAsMaterials() :
    undefined;
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMaterial = useMemo(() => allowCycle ? craftingTree?.[currentIndex] ?? material : material, [craftingTree, currentIndex, material]);
  const materialRegions = material ? Billet.isBillet(material) ? material.regions : [material.region] : [];
  const hasRegion = materialRegions.filter(Boolean).length > 0;

  const onIndexChange = useCallback((index: number) => {
    hasInteractedWithPagination.current = true;
    setCurrentIndex(index);
  }, []);

  // Set the initial index based on user preferences and update when settings change
  useEffect(() => {
    // Only auto-set the index if the user hasn't manually interacted with pagination
    if (!hasInteractedWithPagination.current) {
      if (view === 'rarest' && allowCycle && craftingTree && craftingTree.length > 0) {
        setCurrentIndex(craftingTree.length - 1);
      } else if (view !== 'rarest' || !allowCycle) {
        setCurrentIndex(0);
      }
    }
  }, [view, allowCycle, craftingTree]);

  // Reset user interaction flag when the material changes
  useEffect(() => {
    hasInteractedWithPagination.current = false;
  }, [material]);
    <ModelCard
      key={`${RegionStore.currentRegion}-${currentMaterial.name}`}
      model="Material"
      item={currentMaterial}
      {...props}
      data-show-details={showDetails}
      data-allow-pagination={allowCycle && craftingTree?.length > 1}
      {...{ 'data-today': AscensionMaterial.isAscensionMaterial(material) && material.isObtainableToday(RegionStore) }}

      renderImage={() => <MaterialImage material={currentMaterial.name} />}
      renderHeaderContent={(() => (
        <>
          {(showDetails || (showRegion && hasRegion) || AscensionMaterial.isAscensionMaterial(material)) && (
            <div className="material-card__details-container">
              {showDetails && (
                <p className="material-card__description">
                  {currentMaterial.description}
                </p>
              )}
              {(showDetails || showRegion) && (
                <Region
                  region={materialRegions}
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
        showModelAcquired={showModelAcquired}
      />)}
    />
  );
}