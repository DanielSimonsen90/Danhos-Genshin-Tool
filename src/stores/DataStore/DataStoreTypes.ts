import { ArtifactSet, Character, Domain } from '@/common/models';
import type { DataStoreContent } from './DataStoreConstants';

export type DataStore = typeof DataStoreContent & {
  findCharacterByName: (name: string) => Character | undefined;
  findArtifactByName: (name: string) => ArtifactSet | undefined;
  findDomainByName: (name: string) => Domain<any> | undefined;

  getDomainsFromArtifact: (artifactName: string) => Domain<any>[] | undefined;
  getArtifactsFromDomain: (domainName: string) => ArtifactSet[] | undefined;
}