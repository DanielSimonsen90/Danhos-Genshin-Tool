import { useState, useMemo, useCallback } from "react";

import Material from "@/common/models/materials/Material";
import CraftableMaterial from "@/common/models/materials/CraftableMaterial";
import { classNames } from "@/common/functions/strings";

import { MaterialImage } from "@/components/common/Images";
import RarityList from "@/components/common/icons/Rarity";

import { GetContainer } from "../../Item/functions";
import MaterialRegion from "../MaterialRegion";
import { useDataStore, useSettingsStore } from "@/stores";
import TabBar, { type TabsFunction } from "@/components/common/TabBar";
import MaterialRelationsForModel from "../MaterialRelationsForModel";

export type Props = {
  material: Material;
  wrapInLink?: boolean;
  showDetails?: boolean;

  allowCycle?: boolean;
  showRarity?: boolean;
  showModelsUsing?: boolean;
  showModelAquired?: boolean;

  className?: string;
};

export default function MaterialCard({ material, ...props }: Props) {
  const {
    allowCycle = true,
    showRarity, wrapInLink, showDetails, showModelsUsing, showModelAquired,
    className
  } = props;

  const view = useSettingsStore(ss => ss.getSetting('preferredTabs').craftableMaterial);

  const craftingTree = CraftableMaterial.isCraftableMaterial(material) ?
    [material, ...material.getCraftingTreeAsMaterials()] :
    undefined;
  const [currentIndex, setCurrentIndex] = useState(() => (view === 'rarest' && allowCycle ? craftingTree?.length - 1 : undefined) ?? 0); const currentMaterial = useMemo(() => allowCycle ? craftingTree?.[currentIndex] ?? material : material, [craftingTree, currentIndex, material]);
  const { name, description, rarity } = currentMaterial;

  const DataStore = useDataStore();
  const modelKeys = useMemo(() => {
    return DataStore.getModelKeysUsingMaterial(material.name);
  }, [DataStore, material.name]);
  console.log(modelKeys);

  const handleRadioChange = useCallback((index: number) => setCurrentIndex(index), []);  
  const usedByTabs = useCallback<TabsFunction>((tab) => [
    modelKeys.includes('Character') && tab(`${material.name}-used-by-characters`, 'Characters', (
      <MaterialRelationsForModel key={`char-${material.name}`} model='Character' materialName={material.name} />
    )),
    // modelKeys.includes('Weapon') && tab(`${material.name}-used-by-weapons`, 'Weapons', (
    //   <MaterialRelationsForModel key={`weapon-${material.name}`} model='Weapon' materialName={material.name} />
    // )), // TODO: Add when Weapon model is implemented
  ].filter(Boolean), [modelKeys, material.name]);

  const acquiredFromTabs = useCallback<TabsFunction>((tab) => [
    modelKeys.includes('Mob') && tab(`${material.name}-used-by-mobs`, 'Mobs', (
      <MaterialRelationsForModel key={`mob-${material.name}`} model='Mob' materialName={material.name} />
    )),
  ].filter(Boolean), [modelKeys, material.name]);

  const Container = useMemo(() => GetContainer(wrapInLink, material, 'data/materials'), [wrapInLink, material]); 
  
  return (
    <Container className={classNames('material-card', showDetails && 'material-card--show-more', className)}>
      <header>
        <MaterialImage material={name} />
        <h2 className="material-card__name" title={name}>
          <span className="material-card__name-text">
            {name}
          </span>
          {showRarity && <RarityList rarity={rarity} />}
        </h2>
        {showDetails && (
          <div className="material-card__details">
            <div className="material-card__details-container">
              <p className="material-card__description">
                {description}
              </p>
              {wrapInLink && <MaterialRegion material={currentMaterial} />}
            </div>
          </div>
        )}
        {allowCycle && craftingTree?.length > 1 && (
          <div className="material-card__pagination">
            {craftingTree.map((_, index) => (
              <label key={index}
                className="material-card__pagination-item"
                onClick={e => e.stopPropagation()}
              >
                <input
                  type="radio"
                  name={`material-${material.name}-pagination`}
                  checked={currentIndex === index}
                  onChange={() => handleRadioChange(index)}
                  className="material-card__pagination-radio"
                />
              </label>
            ))}
          </div>
        )}
      </header>
      <section>
        {showModelsUsing && (
          <div className="material-card__models-using">
            <h2>Used by</h2>
            <TabBar tabs={usedByTabs} />
          </div>
        )}
        {showModelAquired && (
          <div className="material-card__model-acquired">
            <h2>Acquired from</h2>
            <TabBar tabs={acquiredFromTabs} />
          </div>
        )}
      </section>
    </Container>
  );
}