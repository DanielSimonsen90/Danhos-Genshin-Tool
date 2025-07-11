import { useMemo, useCallback } from "react";
import { TabCreator, type TabsFunction } from "@/components/common/TabBar";
import MaterialRelationsForModel from "../RelationsForModel";
import { useDataStore } from "@/stores";
import { Material } from "@/common/models";
import LocalSpecialty from "@/common/models/materials/LocalSpecialty";
import Region from "../Region";
import { createTabItem } from "@/components/common/TabBar/TabBarFunctions";

export function useRelationsTabs(material: Material) {
  const DataStore = useDataStore();
  const { name } = material;
  const modelKeys = useMemo(() => DataStore.getModelKeysUsingMaterial(name), [DataStore, name]);

  const createUsedByTabs = useCallback(() => [
    modelKeys.includes('Character') && createTabItem(`${name}-used-by-characters`, 'Characters', (
      <MaterialRelationsForModel key={`char-${name}`} model='Character' materialName={name} />
    )),
    // modelKeys.includes('Weapon') && createTabItem(`${name}-used-by-weapons`, 'Weapons', (
    //   <MaterialRelationsForModel key={`weapon-${name}`} model='Weapon' materialName={name} />
    // )), // TODO: Add when Weapon model is implemented
  ].filter(Boolean), [modelKeys, name]);
  const usedByTabs = useCallback<TabsFunction>((tab) => createUsedByTabs().map(([key, tabData]) =>
    tab(key, tabData.title, tabData.content)
  ), [createUsedByTabs]);
  const hasUsedByTabs = useMemo(() => createUsedByTabs().length > 0, [createUsedByTabs]);

  const createAcquiredFromTabs = useCallback(() => [
    modelKeys.includes('Mob') && createTabItem(`${name}-used-by-mobs`, 'Mobs', (
      <MaterialRelationsForModel key={`mob-${name}`} model='Mob' materialName={name} />
    )),
    LocalSpecialty.isLocalSpecialty(material) && createTabItem(`${name}-used-by-local-specialty`, 'Local Specialty', (
      <div className="local-specialty">
        The wilderness of <Region material={material} />.
      </div>
    )),
    modelKeys.includes('Domain') && createTabItem(`${name}-used-by-domains`, 'Domains', (
      <MaterialRelationsForModel key={`domain-${name}`} model='Domain' materialName={name} />
    )),
  ].filter(Boolean), [modelKeys, name, material]);
  const acquiredFromTabs = useCallback<TabsFunction>((tab) => createAcquiredFromTabs().map(([key, tabData]) =>
    tab(key, tabData.title, tabData.content)
  ), [createAcquiredFromTabs]);
  const hasAcquiredFromTabs = useMemo(() => createAcquiredFromTabs().length > 0, [createAcquiredFromTabs]);

  return {
    usedByTabs,
    acquiredFromTabs,
    hasUsedByTabs,
    hasAcquiredFromTabs,
  };
}
