import { useMemo, useCallback } from "react";

import TabBar, { type TabsFunction } from "@/components/common/TabBar";
import MaterialRelationsForModel from "../RelationsForModel";
import { useDataStore } from "@/stores";
import { Material } from "@/common/models";
import LocalSpecialty from "@/common/models/materials/LocalSpecialty";
import Region from "../Region";

export type Props = {
  material: Material,
  showModelsUsing?: boolean;
  showModelAquired?: boolean;
};

export default function Relations({
  material,
  showModelsUsing,
  showModelAquired
}: Props) {
  const DataStore = useDataStore();
  const { name } = material;
  const modelKeys = useMemo(() => DataStore.getModelKeysUsingMaterial(name), [DataStore, name]);

  const usedByTabs = useCallback<TabsFunction>((tab) => [
    modelKeys.includes('Character') && tab(`${name}-used-by-characters`, 'Characters', (
      <MaterialRelationsForModel key={`char-${name}`} model='Character' materialName={name} />
    )),
    // modelKeys.includes('Weapon') && tab(`${materialName}-used-by-weapons`, 'Weapons', (
    //   <MaterialRelationsForModel key={`weapon-${materialName}`} model='Weapon' materialName={materialName} />
    // )), // TODO: Add when Weapon model is implemented
  ].filter(Boolean), [modelKeys, name]);

  const acquiredFromTabs = useCallback<TabsFunction>((tab) => [
    modelKeys.includes('Mob') && tab(`${name}-used-by-mobs`, 'Mobs', (
      <MaterialRelationsForModel key={`mob-${name}`} model='Mob' materialName={name} />
    )),
    LocalSpecialty.isLocalSpecialty(material) && tab(`${name}-used-by-local-specialty`, 'Local Specialty', (
      <div className="local-specialty">
        The wilderness of <Region material={material} />.
      </div>
    )),
    modelKeys.includes('Domain') && tab(`${name}-used-by-domains`, 'Domains', (
      <MaterialRelationsForModel key={`domain-${name}`} model='Domain' materialName={name} />
    )),
  ].filter(Boolean), [modelKeys, name]);

  if (!showModelsUsing && !showModelAquired) {
    return null;
  }

  return (
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
  );
}
