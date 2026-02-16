import { useDataStore } from "./DataStore";

export const useArtifactData = () => useDataStore(({
  ArtifactsData, Artifacts, ArtifactNames,
  findArtifactByName,
  getArtifactsFromDomain,
  getRegionsFromArtifact,
}) => ({
  ArtifactsData, Artifacts, ArtifactNames,
  findArtifactByName,
  getArtifactsFromDomain,
  getRegionsFromArtifact,
}));
export const useCharacterData = () => useDataStore(({
  CharactersData, Characters, CharacterNames,
  findCharacterByName,
  getCharactersUsingArtifact,
  getCharactersUsingMaterial,
  getRecommendedCharactersForWeapon
}) => ({
  CharactersData, Characters, CharacterNames,
  findCharacterByName,
  getCharactersUsingArtifact,
  getCharactersUsingMaterial,
  getRecommendedCharactersForWeapon
}));
export const useDomainData = () => useDataStore(({
  DomainsData, Domains, DomainNames,
  findDomainByName,
  getDomainDroppingMaterial,
  getDomainsFromArtifact,
  getDomainsFromMaterial,
  getRewardsFromDomain,
}) => ({
  DomainsData, Domains, DomainNames,
  findDomainByName,
  getDomainDroppingMaterial,
  getDomainsFromArtifact,
  getDomainsFromMaterial,
  getRewardsFromDomain,
}));
export const useMaterialsData = () => useDataStore(({
  MaterialsData, Materials, MaterialNames,
  findMaterialByName,
  getModelKeysUsingMaterial,
  getTalentAscensionMaterialsFromDomain,
  getWeaponAscensionMaterialsFromDomain,
}) => ({
  MaterialsData, Materials, MaterialNames,
  findMaterialByName,
  getModelKeysUsingMaterial,
  getTalentAscensionMaterialsFromDomain,
  getWeaponAscensionMaterialsFromDomain,
}));
export const useMobData = () => useDataStore(({
  MobsData, Mobs, MobNames,
  findMobByName,
  getMobsDroppingMaterial,
  getBossesFromMaterial
}) => ({
  MobsData, Mobs, MobNames,
  findMobByName,
  getMobsDroppingMaterial,
  getBossesFromMaterial
}))
export const useWeaponData = () => useDataStore(({ 
  WeaponsData, Weapons, WeaponNames, 
  findWeaponByName,
  getWeaponsUsingMaterial,
  getSignatureWeaponFor,
  getRecommendedWeaponsForCharacter,
  getRecommendedCharactersForWeapon 
}) => ({
  WeaponsData, Weapons, WeaponNames,
  findWeaponByName,
  getWeaponsUsingMaterial,
  getSignatureWeaponFor,
  getRecommendedWeaponsForCharacter,
  getRecommendedCharactersForWeapon
}))