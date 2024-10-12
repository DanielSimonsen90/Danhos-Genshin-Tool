import * as CharactersData from '@/data/characters';
import * as ArtifactSetsData from '@/data/artifact-sets';
import * as DomainsData from '@/data/domains';
import { List } from '@/common/models/List';

export const DataStore = {
  ArtifactSetsData,
  ArtifactSets: List.from(ArtifactSetsData),
  ArtifactSetNames: List.from(ArtifactSetsData).map(set => set.name),
  
  CharactersData,
  Characters: List.from(CharactersData),
  CharacterNames: List.from(CharactersData).map(character => character.name),
  
  DomainsData,
  Domains: List.from(DomainsData),
  DomainNames: List.from(DomainsData).map(domain => domain.name),
}