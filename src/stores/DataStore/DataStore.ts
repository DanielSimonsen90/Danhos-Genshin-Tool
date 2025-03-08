import { create } from 'zustand';
import { DataStore } from "./DataStoreTypes";
import { DataStoreContent } from './DataStoreConstants';

export const useDataStore = create<DataStore>((setState, getState) => {
  const findByName = <T extends { name: string }>(arr: T[], name: string): T | undefined => arr.find(item => item.name.toLowerCase() === name.toLowerCase());

  return {
    ...DataStoreContent,
    findCharacterByName: (name: string) => findByName(getState().Characters, name),
    findArtifactByName: (name: string) => findByName(getState().Artifacts, name),
    findDomainByName: (name: string) => findByName(getState().Domains, name),

    getDomainsFromArtifact: (artifactName: string) => {
      const artifact = findByName(getState().Artifacts, artifactName);
      if (!artifact) return undefined;

      return getState().Domains.filter(domain => artifact.domainNames.includes(domain.name));
    },
    getArtifactsFromDomain: (domainName: string) => {
      const domain = findByName(getState().Domains, domainName);
      if (!domain) return undefined;

      return getState().Artifacts
        .filter(artifact => artifact.domainNames.includes(domain.name))
        .sort((a, b) => b.rarity - a.rarity);
    },
  };
});