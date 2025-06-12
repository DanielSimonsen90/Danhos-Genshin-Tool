import { ArtifactSet, Character, Domain, Model } from '@/common/models';
import type { DataStoreContent } from './DataStoreConstants';
import ModelType from './ModelType';


export type DataStoreModelCollections = Extract<
  keyof typeof DataStoreContent,
  'Characters' | 'Artifacts' | 'Domains'
>;
export type DataStore = typeof DataStoreContent & {
  findCharacterByName: (name: string) => Character | undefined;
  findArtifactByName: (name: string) => ArtifactSet | undefined;
  findDomainByName: (name: string) => Domain<any> | undefined;

  getDomainsFromArtifact: (artifactName: string) => Domain<any>[] | undefined;
  getArtifactsFromDomain: (domainName: string) => ArtifactSet[] | undefined;

  getModelType: <TModel extends Model>(model: TModel) => ModelType<TModel>;
};