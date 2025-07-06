import { create } from 'zustand';
import { DataStore, CharacterUsingArtifactResult } from "./DataStoreTypes";
import { DataStoreContent } from './DataStoreConstants';
import { ArtifactSet, Boss, Character, CharacterArtifactSet, DomainOfBlessing, DomainOfForgery, DomainOfMastery, Material, Mob, Model, ModelKeys, TalentAscensionMaterial, WeaponAscensionMaterial } from '@/common/models';
import ModelType from './ModelType';
import CraftableMaterial from '@/common/models/materials/CraftableMaterial';

export const useDataStore = create<DataStore>((setState, getState) => {
  const findByName = <T extends { name: string; }>(arr: T[], name: string): T | undefined => {
    const result = arr.find(item => item.name.toLowerCase() === name.toLowerCase() 
      || (CraftableMaterial.isCraftableMaterial(item) && item.getCraftingTreeAsMaterials().some(m => m.name.toLowerCase() === name.toLowerCase())));
    if (result) return result;

    console.warn(`Item with name "${name}" not found in array.`, arr);
    return undefined;
  };

  return {
    ...DataStoreContent,
    findCharacterByName(name: string) { return findByName(getState().Characters, name); },
    findArtifactByName(name: string) { return findByName(getState().Artifacts, name); },
    findDomainByName(name: string) { return findByName(getState().Domains, name); },
    findMobByName(name: string) { return findByName(getState().Mobs, name); },
    findMaterialByName(name: string) { return findByName(getState().Materials, name); },

    getDomainsFromArtifact(artifactName: string) {
      const artifact = this.findArtifactByName(artifactName);
      if (!artifact) return undefined;

      return getState().Domains.filter(domain => artifact.domainNames.includes(domain.name));
    },
    getArtifactsFromDomain(domainName: string) {
      const domain = this.findDomainByName(domainName);
      if (!domain) return undefined;

      return getState().Artifacts
        .filter(artifact => artifact.domainNames.includes(domain.name))
        .sort((a, b) => b.rarity - a.rarity);
    },
    getTalentAscensionMaterialsFromDomain(domainName: string) {
      const domain = this.findDomainByName(domainName);
      if (!domain) return undefined;

      return getState().Materials
        .filter(material => TalentAscensionMaterial.isAscensionMaterial(material) && material.domain.name === domain.name)
        .sort((a, b) => b.rarity - a.rarity)
        .map(material => material as TalentAscensionMaterial);
    },
    getWeaponAscensionMaterialsFromDomain(domainName: string) {
      const domain = this.findDomainByName(domainName);
      if (!domain) return undefined;

      return getState().Materials
        .filter(material => WeaponAscensionMaterial.isAscensionMaterial(material) && material.domain.name === domain.name)
        .sort((a, b) => b.rarity - a.rarity)
        .map(material => material as WeaponAscensionMaterial);
    },

    getModelKeysUsingMaterial(materialName: string) {
      const material = this.findMaterialByName(materialName);
      if (!material) {
        console.warn(`Material "${materialName}" not found.`, getState().Materials);
        return [];
      }

      const modelKeys: ModelKeys[] = [];
      if (this.getCharactersUsingMaterial(materialName).length) modelKeys.push('Character');
      if (this.getMobsDroppingMaterial(materialName).length) modelKeys.push('Mob');
      return modelKeys;
    },
    getCharactersUsingMaterial(materialName: string) {
      const material = this.findMaterialByName(materialName);
      if (!material) {
        console.warn(`Material "${materialName}" not found.`, getState().Materials);
        return [];
      }

      return getState().Characters.filter(character => {
        const { crystal, localSpecialty, material, mobDrop, weeklyBossDrop, worldBossDrop } = character.ascension;
        const items = [
          ...crystal.getCraftingTreeAsMaterials(),
          localSpecialty,
          material,
          mobDrop,
          weeklyBossDrop,
          worldBossDrop
        ].filter(Boolean);
        return items.some(item => item.name === materialName);
      }) as Character[];
    },
    getMobsDroppingMaterial(materialName: string) {
      const material = this.findMaterialByName(materialName);
      if (!material) {
        console.warn(`Material "${materialName}" not found.`, getState().Materials);
        return [];
      }

      return getState().Mobs.filter(mob => mob.drops.some(drop => drop.name === materialName)) as Mob[];
    },
    getDomainsFromMaterial(material: Material) {
      const domains = getState().Domains.filter(domain => (
        (TalentAscensionMaterial.isTalentAscensionMaterial(material) && DomainOfMastery.isDomainMastery(domain)) 
        || (WeaponAscensionMaterial.isWeaponAscensionMaterial(material) && DomainOfForgery.isDomainForgery(domain)) 
        || (ArtifactSet.isArtifactSet(material) && DomainOfBlessing.isDomainBlessing(domain))
      ));
      return domains.filter(domain => domain.getRewards(this).some(mat => mat.name === material.name));
    },
    getBossesFromMaterial(material: Material) {
      return getState().Mobs.filter(mob => Boss.isBoss(mob) && mob.drops.some(drop => drop.name === material.name)) as Boss[];
    },    getCharactersUsingArtifact(artifactName: string) {
      const relevantCharacters = getState().Characters.filter(character =>
        character.sets.some(cSet =>
          cSet.artifactSets.some(artifact => artifact.set.name === artifactName
            && artifact.effectiveness === CharacterArtifactSet.MOST_EFFECTIVE
          )));

      const getCharacterSet = (character: Character) => character.sets.find(cSet => 
        cSet.artifactSets.some(artifact => 
          artifact.set.name === artifactName 
          && artifact.effectiveness === CharacterArtifactSet.MOST_EFFECTIVE
      ));
      
      return relevantCharacters.map(character => {
        const set = getCharacterSet(character);
        const cSet = set.artifactSets.find(artifact => artifact.set.name === artifactName);

        return {
          character, set,
          pieces: cSet.pieces,
          effectiveness: cSet.effectiveness
        } as CharacterUsingArtifactResult;
      });
    },

    getModelType: <TModel extends Model>(model: TModel) => new ModelType<TModel>(model),
  };
});