import MemoizeService from "@/services/MemoizeService";
import StoreBuilder from "@/stores/StoreBuilder";

export default new StoreBuilder()
  .addApi(() => {
    const memoService = new MemoizeService();
    const CACHE_KEYS = {
      signatureWeapons: () => 'signature_weapons',

      // artifactName
      artifactRegions: (artifactName: string) => `artifact_regions_${artifactName}`,
      charactersUsingArtifact: (artifactName: string) => `characters_using_artifact_${artifactName}`,
      domainsFromArtifact: (artifactName: string) => `domains_from_artifact_${artifactName}`,

      // characterName
      signatureWeaponFor: (characterName: string) => `signature_weapon_for_${characterName}`,
      recommendedWeaponsForCharacter: (characterName: string) => `recommended_weapons_for_character_${characterName}`,

      // domainName
      artifactsFromDomain: (domainName: string) => `artifacts_from_domain_${domainName}`,
      rewardsFromDomain: (domainName: string) => `domain_rewards_from_domain_${domainName}`,
      weaponAscensionMaterialsFromDomain: (domainName: string) => `weapon_ascension_materials_from_domain_${domainName}`,
      talentAscensionMaterialsFromDomain: (domainName: string) => `talent_ascension_materials_from_domain_${domainName}`,

      // materialName
      bossesFromMaterial: (materialName: string) => `bosses_from_material_${materialName}`,
      charactersUsingMaterial: (materialName: string) => `characters_using_material_${materialName}`,
      domainsFromMaterial: (materialName: string) => `domains_from_material_${materialName}`,
      domainDroppingMaterial: (materialName: string) => `domains_dropping_material_${materialName}`,
      materialWeapons: (materialName: string) => `material_weapons_${materialName}`,
      mobsDroppingMaterial: (materialName: string) => `mobs_dropping_material_${materialName}`,
      modelKeysUsingMaterial: (materialName: string) => `model_keys_using_material_${materialName}`,

      // weaponName
      recommendedCharactersForWeapon: (weaponName: string) => `recommended_characters_for_weapon_${weaponName}`,
    };

    function memoize<T>(
      key: (cacheKeys: typeof CACHE_KEYS) => string,
      initializer: () => T,
      ...dependencies: any[]
    ) {
      const cacheKey = key(CACHE_KEYS);
      return memoService.memoize(initializer, cacheKey, ...dependencies);
    }

    function clearCache(key?: (cacheKeys: typeof CACHE_KEYS) => string) {
      if (key) {
        const cacheKey = key(CACHE_KEYS);
        const foundKey = memoService.findCacheKey(cacheKey);
        if (foundKey) memoService.unmemoize(foundKey);
      } else {
        memoService.clear();
      }
    }

    return {
      memoize,
      clearCache
    }
  })