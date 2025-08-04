// cSpell:ignore CraftableMaterial
import { create } from 'zustand';
import { DataStore, CharacterUsingArtifactResult } from "./DataStoreTypes";
import { DataStoreContent } from './DataStoreConstants';
import { ArtifactSet, Boss, Character, CharacterArtifactSet, DomainOfBlessing, DomainOfForgery, DomainOfMastery, Material, Mob, Model, ModelKeys, TalentAscensionMaterial, Weapon, WeaponAscensionMaterial } from '@/common/models';
import ModelType from './ModelType';
import CraftableMaterial from '@/common/models/materials/CraftableMaterial';
import AscensionMaterial from '@/common/models/materials/AscensionMaterial';
import MemoizeService from '@/services/MemoizeService';

/**
 * Optimized DataStore implementation with:
 * - Caching for frequently accessed computations
 * - Improved search performance with early returns
 * - Better error handling and validation
 * - Reduced code duplication
 * - Enhanced type safety
 */
export const useDataStore = create<DataStore>((setState, getState) => {
  const cache = new MemoizeService();

  // Cache keys
  const CACHE_KEYS = {
    MATERIAL_CHARACTERS: 'material_characters_',
    MATERIAL_WEAPONS: 'material_weapons_',
    MATERIAL_MODEL_KEYS: 'material_model_keys_',
    ARTIFACT_DOMAINS: 'artifact_domains_',
    DOMAIN_ARTIFACTS: 'domain_artifacts_',
    MATERIAL_DROPPERS: 'material_droppers_',
    CHARACTER_MATERIALS: 'character_materials_',
    WEAPON_SIGNATURES: 'weapon_signatures_',
  } as const;

  const clearCache = () => cache.clear();
  const getCachedOrCompute = <T>(key: string, compute: () => T): T => cache.memoize(compute, [key]);
  const findByName = <T extends { name: string; }>(arr: T[], name: string, suppressWarning = false): T | undefined => {
    const normalizedName = name.toLowerCase();

    // Direct name match first (most common case)
    let result = arr.find(item => item.name.toLowerCase() === normalizedName)
      // Check materials that can be crafted (less common)
      ?? arr.find(item =>
        CraftableMaterial.isCraftableMaterial(item) &&
        item.getCraftingTreeAsMaterials().some(m => m.name.toLowerCase() === normalizedName)
      );

    if (result) return result;

    if (!suppressWarning) console.warn(`Item with name "${name}" not found in array.`, arr);
    return undefined;
  };

  const validateAndGetMaterial = (materialName: string): Material | undefined => {
    const material = findByName(getState().Materials, materialName, true)
      ?? findByName(getState().Artifacts, materialName);
    if (!material) console.warn(`Material "${materialName}" not found.`, getState().Materials);
    return material;
  };
  const sortByRarityDesc = <T extends { rarity: number; }>(items: T[]): T[] => items.sort((a, b) => b.rarity - a.rarity);
  const getSignatureWeapons = () => getCachedOrCompute(CACHE_KEYS.WEAPON_SIGNATURES, () => {
    const weaponsWithSignature = getState().Weapons.filter(weapon => weapon.signatureWeaponFor);
    return weaponsWithSignature.map(weapon => {
      const character = weapon.signatureWeaponFor(getState().CharactersData);
      return { weapon, character };
    });
  });


  // Create the store with proper method binding
  const dataStore: DataStore = {
    ...DataStoreContent,

    // Basic find methods
    findCharacterByName: (name: string) => findByName(getState().Characters, name),
    findArtifactByName: (name: string) => findByName(getState().Artifacts, name),
    findDomainByName: (name: string) => findByName(getState().Domains, name),
    findMobByName: (name: string) => findByName(getState().Mobs, name),
    findMaterialByName: (name: string) => findByName(getState().Materials, name),
    findWeaponByName: (name: string) => findByName(getState().Weapons, name),

    // Domain-Artifact relationships
    getDomainsFromArtifact(artifactName: string) {
      return getCachedOrCompute(`${CACHE_KEYS.ARTIFACT_DOMAINS}${artifactName}`, () => {
        const artifact = findByName(getState().Artifacts, artifactName);
        if (!artifact) return undefined;

        return getState().Domains.filter(domain =>
          artifact.domainNames.includes(domain.name)
        );
      });
    },

    getArtifactsFromDomain(domainName: string) {
      return getCachedOrCompute(`${CACHE_KEYS.DOMAIN_ARTIFACTS}${domainName}`, () => {
        const domain = findByName(getState().Domains, domainName);
        if (!domain) return undefined;

        return sortByRarityDesc(
          getState().Artifacts.filter(artifact =>
            artifact.domainNames.includes(domain.name)
          )
        );
      });
    },

    getTalentAscensionMaterialsFromDomain(domainName: string) {
      const domain = findByName(getState().Domains, domainName);
      if (!domain) return undefined;

      return sortByRarityDesc(
        getState().Materials
          .filter(material =>
            TalentAscensionMaterial.isTalentAscensionMaterial(material) &&
            material.domain.name === domain.name
          )
      ) as TalentAscensionMaterial[];
    },

    getWeaponAscensionMaterialsFromDomain(domainName: string) {
      const domain = findByName(getState().Domains, domainName);
      if (!domain) return undefined;

      return sortByRarityDesc(
        getState().Materials
          .filter(material =>
            WeaponAscensionMaterial.isWeaponAscensionMaterial(material) &&
            material.domain.name === domain.name
          )
      ) as WeaponAscensionMaterial[];
    },

    getCharactersUsingMaterial(materialName: string) {
      const material = validateAndGetMaterial(materialName);
      if (!material) return [];

      return getCachedOrCompute(`${CACHE_KEYS.CHARACTER_MATERIALS}${materialName}`, () => {
        return getState().Characters.filter(character => {
          const { crystal, localSpecialty, material: charMaterial, mobDrop, weeklyBossDrop, worldBossDrop } = character.ascension;
          const materials = [
            crystal,
            ...crystal.getCraftingTreeAsMaterials(),
            localSpecialty,
            charMaterial,
            mobDrop,
            weeklyBossDrop,
            worldBossDrop
          ].filter(Boolean);

          return materials.some(item => item.name === materialName);
        });
      }) as Character[];
    },

    getWeaponsUsingMaterial(materialName) {
      const material = validateAndGetMaterial(materialName);
      if (!material) return [];

      return getCachedOrCompute(`${CACHE_KEYS.MATERIAL_WEAPONS}${materialName}`, () => {
        return getState().Weapons.filter(weapon =>
          weapon.ascensionMaterials.some(mat => mat.name === materialName)
        );
      }) as Weapon[];
    },

    getMobsDroppingMaterial(materialName: string) {
      const material = validateAndGetMaterial(materialName);
      if (!material) return [];

      return getCachedOrCompute(`${CACHE_KEYS.MATERIAL_DROPPERS}${materialName}`, () => {
        return getState().Mobs.filter(mob =>
          mob.drops.some(drop => drop.name === materialName)
        );
      }) as Mob[];
    },

    getDomainDroppingMaterial(materialName: string) {
      const material = validateAndGetMaterial(materialName);
      if (!material) return undefined;

      return AscensionMaterial.isAscensionMaterial(material) ? material.domain : undefined;
    },

    // Material usage methods with proper method binding
    getModelKeysUsingMaterial(materialName: string) {
      const material = validateAndGetMaterial(materialName);
      if (!material) return [];

      return getCachedOrCompute(`${CACHE_KEYS.MATERIAL_MODEL_KEYS}${materialName}`, () => {
        const modelKeys: ModelKeys[] = [];

        if (dataStore.getCharactersUsingMaterial(materialName).length > 0) modelKeys.push('Character');
        if (dataStore.getWeaponsUsingMaterial(materialName).length > 0) modelKeys.push('Weapon');
        if (dataStore.getMobsDroppingMaterial(materialName).length > 0) modelKeys.push('Mob');
        if (dataStore.getDomainDroppingMaterial(materialName)) modelKeys.push('Domain');

        return modelKeys;
      });
    },

    // Advanced material-domain relationships
    getDomainsFromMaterial(material: Material) {
      const domains = getState().Domains.filter(domain => (
        (TalentAscensionMaterial.isTalentAscensionMaterial(material) && DomainOfMastery.isDomainMastery(domain))
        || (WeaponAscensionMaterial.isWeaponAscensionMaterial(material) && DomainOfForgery.isDomainForgery(domain))
        || (ArtifactSet.isArtifactSet(material) && DomainOfBlessing.isDomainBlessing(domain))
      ));

      return domains.filter(domain =>
        domain.getRewards(dataStore).some(mat => mat.name === material.name)
      );
    },

    getBossesFromMaterial(material: Material) {
      return getState().Mobs.filter(mob =>
        Boss.isBoss(mob) && mob.drops.some(drop => drop.name === material.name)
      ) as Boss[];
    },

    getCharactersUsingArtifact(artifactName: string) {
      const artifact = findByName(getState().Artifacts, artifactName);
      if (!artifact) return [];

      const relevantCharacters = getState().Characters.filter(character =>
        character.sets.some(cSet =>
          cSet.artifactSets.some(artifactSet =>
            artifactSet.set.name === artifactName &&
            artifactSet.effectiveness === CharacterArtifactSet.MOST_EFFECTIVE
          )
        )
      );

      const getCharacterSet = (character: Character) =>
        character.sets.find(cSet =>
          cSet.artifactSets.some(artifactSet =>
            artifactSet.set.name === artifactName &&
            artifactSet.effectiveness === CharacterArtifactSet.MOST_EFFECTIVE
          )
        );

      return relevantCharacters.map(character => {
        const set = getCharacterSet(character);
        const cSet = set.artifactSets.find(artifactSet =>
          artifactSet.set.name === artifactName
        );

        return {
          character,
          set,
          pieces: cSet.pieces,
          effectiveness: cSet.effectiveness
        } as CharacterUsingArtifactResult;
      });
    },    
    getSignatureWeaponFor(character: Character) {
      return getCachedOrCompute(`${CACHE_KEYS.WEAPON_SIGNATURES}${character.name}`, () => {
        const signatureWeaponData = getSignatureWeapons();
        if (!signatureWeaponData || signatureWeaponData.length === 0) return undefined;

        return signatureWeaponData.find(weapon => weapon.character.name === character.name)?.weapon;
      });
    },

    getModelType: <TModel extends Model>(model: TModel) => new ModelType<TModel>(model),
    clearCache,
  };

  return dataStore;
});