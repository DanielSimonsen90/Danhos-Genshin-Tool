import StoreBuilder from "@/stores/StoreBuilder";
import artifactsSlice from "../models/artifacts.slice";
import artifactDomainSlice from "./artifact-domain.slice";
import type { TeyvatRegion } from '@/common/types/genshin';
import { List, WorldBoss } from "@/common/models";
import memoSlice from "../memo.slice";
import materialMobSlice from "./material-mob.slice";

export default new StoreBuilder()
  .addSlice(artifactsSlice)
  .addSlice(artifactDomainSlice)
  .addSlice(materialMobSlice)
  .addSlice(memoSlice)
  .addApi(({ api }) => {
    function getRegionsFromArtifact(artifactName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.artifactRegions(artifactName),
        () => {
          const artifact = api.findArtifactByName(artifactName);
          if (!artifact) return new List<TeyvatRegion>();
    
          const registeredRegion = artifact.region;
    
          const domains = api.getDomainsFromArtifact(artifactName);
          const domainRegions = domains.flatMap<TeyvatRegion>(domain => domain.region);
    
          const mobs = api.getMobsDroppingMaterial(artifactName);
          const mobRegions = mobs.flatMap(mob =>
            WorldBoss.isBoss(mob)
              && 'region' in mob
              && mob.region
              ? [mob.region]
              : []
          );
    
          return List
            .from([registeredRegion, ...domainRegions, ...mobRegions])
            .unique()
            .filter((region): region is TeyvatRegion => Boolean(region))
            .orderBy((a, b) => {
              const order = ['Mondstadt', 'Liyue', 'Inazuma', 'Sumeru', 'Fontaine', 'Natlan', 'Nod-Krai', 'Snezhnaya', 'Unknown'];
              return order.indexOf(a) - order.indexOf(b);
            });
        }
      )
    }

    return {
      getRegionsFromArtifact,
    };
  });