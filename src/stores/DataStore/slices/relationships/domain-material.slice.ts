import StoreBuilder from "@/stores/StoreBuilder";
import domainsSlice from "../models/domains.slice";
import materialsSlice from "../models/materials.slice";
import { sortByRarityDesc } from "../../DataStoreFunctions";
import { ArtifactSet, DomainOfBlessing, DomainOfForgery, DomainOfMastery, TalentAscensionMaterial, WeaponAscensionMaterial } from "@/common/models";
import memoSlice from "../memo.slice";
import AscensionMaterial from "@/common/models/materials/AscensionMaterial";
import artifactDomainSlice from "./artifact-domain.slice";

export default new StoreBuilder()
  .addSlice(artifactDomainSlice)
  .addSlice(materialsSlice)
  .addSlice(memoSlice)
  .addApi(({ get, api, builder }) => {
    function getTalentAscensionMaterialsFromDomain(domainName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.talentAscensionMaterialsFromDomain(domainName),
        () => {
          const domain = api.findDomainByName(domainName);
          if (!domain) return [];
    
          return sortByRarityDesc(
            get().Materials.filter(material => (
              TalentAscensionMaterial.isTalentAscensionMaterial(material)
              && material.domain.name === domain.name
            ))
          ) as TalentAscensionMaterial[];
        }
      )
    }

    function getWeaponAscensionMaterialsFromDomain(domainName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.weaponAscensionMaterialsFromDomain(domainName),
        () => {
          const domain = api.findDomainByName(domainName);
          if (!domain) return [];
    
          return sortByRarityDesc(
            get().Materials.filter(material => (
              WeaponAscensionMaterial.isWeaponAscensionMaterial(material)
              && material.domain.name === domain.name
            ))
          ) as WeaponAscensionMaterial[];
        }
      )
    }

    function getDomainDroppingMaterial(materialName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.domainDroppingMaterial(materialName),
        () => {
          const material = api.findMaterialByName(materialName);
          if (!material) return [];

          AscensionMaterial.isAscensionMaterial(material)
            ? material.domain
            : undefined;
        }
      )
    }

    function getRewardsFromDomain(domainName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.rewardsFromDomain(domainName),
        () => {
          const domain = api.findDomainByName(domainName);
          if (!domain) return [];

          switch (domain.getDomainType()) {
            case 'Blessing': return api.getArtifactsFromDomain(domain.name);
            case 'Forgery': return getTalentAscensionMaterialsFromDomain(domain.name);
            case 'Mastery': return getWeaponAscensionMaterialsFromDomain(domain.name);
            default: return [];
          }
        }
      );
    }

    function getDomainsFromMaterial(materialName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.domainsFromMaterial(materialName),
        () => {
          const material = api.findMaterialByName(materialName);
          if (!material) return [];

          return get().Domains.filter(domain => {
            const isTalentAscensionMaterial = TalentAscensionMaterial.isTalentAscensionMaterial(material) && DomainOfMastery.isDomainMastery(domain);
            const isWeaponAscensionMaterial = WeaponAscensionMaterial.isWeaponAscensionMaterial(material) && DomainOfForgery.isDomainForgery(domain);
            const isArtifactMaterial = ArtifactSet.isArtifactSet(material) && DomainOfBlessing.isDomainBlessing(domain);

            const materialMatchesDomain = (
              isTalentAscensionMaterial
              || isWeaponAscensionMaterial
              || isArtifactMaterial
            );

            if (!materialMatchesDomain) return false;

            return getRewardsFromDomain(domain.name).some(reward => reward.name === material.name);
          });
        }
      );
    }

    return {
      getTalentAscensionMaterialsFromDomain,
      getWeaponAscensionMaterialsFromDomain,
      getDomainDroppingMaterial,
      getRewardsFromDomain,
      getDomainsFromMaterial,
    }
  });