import StoreBuilder from "@/stores/StoreBuilder";
import DomainsSlice from "../models/domains.slice";
import ArtifactsSlice from "../models/artifacts.slice";
import { sortByRarityDesc } from "../../DataStoreFunctions";
import { Domain, List } from "@/common/models";
import memoSlice from "../memo.slice";

export default new StoreBuilder()
  .addSlice(ArtifactsSlice)
  .addSlice(DomainsSlice)
  .addSlice(memoSlice)
  .addApi(({ get, api }) => {
    function getDomainsFromArtifact(artifactName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.domainsFromArtifact(artifactName),
        () => {
          const artifact = api.findArtifactByName(artifactName);
          if (!artifact) return new List<Domain>();

        return get().Domains.filter(domain => (
          artifact.domainNames.includes(domain.name)
        ));
      }, [get().Artifacts, get().Domains]);
    }
    function getArtifactsFromDomain(domainName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.artifactsFromDomain(domainName),
        () => {
          const domain = api.findDomainByName(domainName);
          if (!domain) return [];

        return sortByRarityDesc(
          get().Artifacts.filter(artifact => (
            artifact.domainNames.includes(domain.name)
          )
        ));
      }, [get().Artifacts, get().Domains]);
    }

    return {
      getDomainsFromArtifact,
      getArtifactsFromDomain,
    }
  })