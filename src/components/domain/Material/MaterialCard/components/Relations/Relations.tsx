import { useMemo, useCallback } from "react";

import TabBar, { type TabsFunction } from "@/components/common/TabBar";
import MaterialRelationsForModel from "../RelationsForModel";
import { useDataStore } from "@/stores";

export type Props = {
  materialName: string;
  showModelsUsing?: boolean;
  showModelAquired?: boolean;
};

export default function Relations({
  materialName,
  showModelsUsing,
  showModelAquired
}: Props) {
  const DataStore = useDataStore();
  const modelKeys = useMemo(() => {
    return DataStore.getModelKeysUsingMaterial(materialName);
  }, [DataStore, materialName]);

  const usedByTabs = useCallback<TabsFunction>((tab) => [
    modelKeys.includes('Character') && tab(`${materialName}-used-by-characters`, 'Characters', (
      <MaterialRelationsForModel key={`char-${materialName}`} model='Character' materialName={materialName} />
    )),
    // modelKeys.includes('Weapon') && tab(`${materialName}-used-by-weapons`, 'Weapons', (
    //   <MaterialRelationsForModel key={`weapon-${materialName}`} model='Weapon' materialName={materialName} />
    // )), // TODO: Add when Weapon model is implemented
  ].filter(Boolean), [modelKeys, materialName]);

  const acquiredFromTabs = useCallback<TabsFunction>((tab) => [
    modelKeys.includes('Mob') && tab(`${materialName}-used-by-mobs`, 'Mobs', (
      <MaterialRelationsForModel key={`mob-${materialName}`} model='Mob' materialName={materialName} />
    )),
  ].filter(Boolean), [modelKeys, materialName]);

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
