import { create } from 'zustand';
import { DataStore, DataStoreModelCollections } from "./DataStoreTypes";
import { DataStoreContent } from './DataStoreConstants';
import { Model } from '@/common/models';
import ModelType from './ModelType';

export const useDataStore = create<DataStore>((setState, getState) => {
  const cache = new Map<string, any>();
  const memo = <T>(model: string, name: string, fn: () => T): T => {
    const key = `${model}:${name}`;
    if (cache.has(key)) return cache.get(key);
    const result = fn();
    cache.set(key, result);
    return result;
  };
  const findByName = <TKey extends DataStoreModelCollections>(arrKey: TKey, name: string): DataStore[TKey][number] | undefined => memo<DataStore[TKey][number]>(
    arrKey, 
    name, 
    () => (getState()[arrKey] as Array<Model>).find(item => item.name.toLowerCase() === name.toLowerCase()) as DataStore[TKey][number]
  );

  return {
    ...DataStoreContent,
    findCharacterByName: (name: string) => findByName('Characters', name),
    findArtifactByName: (name: string) => findByName('Artifacts', name),
    findDomainByName: (name: string) => findByName('Domains', name),

    getDomainsFromArtifact: (artifactName: string) => {
      const artifact = findByName('Artifacts', artifactName);
      if (!artifact) return undefined;

      return getState().Domains.filter(domain => artifact.domainNames.includes(domain.name));
    },
    getArtifactsFromDomain: (domainName: string) => {
      const domain = findByName('Domains', domainName);
      if (!domain) return undefined;

      return getState().Artifacts
        .filter(artifact => artifact.domainNames.includes(domain.name))
        .sort((a, b) => b.rarity - a.rarity);
    },

    getModelType: <TModel extends Model>(model: TModel) => new ModelType<TModel>(model),
  };
});