import * as CharactersData from '@/data/characters';
import * as ArtifactsData from '@/data/artifact-sets';
import * as DomainsData from '@/data/domains';
import { List } from '@/common/models/List';

export const DataStore = {
  ArtifactsData,
  Artifacts: List.from(ArtifactsData),
  ArtifactNames: List.from(ArtifactsData).map(set => set.name),
  
  CharactersData,
  Characters: List.from(CharactersData),
  CharacterNames: List.from(CharactersData).map(character => character.name),
  
  DomainsData,
  Domains: List.from(DomainsData),
  DomainNames: List.from(DomainsData).map(domain => domain.name),
}