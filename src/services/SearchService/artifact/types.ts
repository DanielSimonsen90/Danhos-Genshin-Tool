import { ArtifactSet, Character } from '@/common/models';

export type SearchResult = {
  byArtifact: SearchResultItem[];
  byCharacterRecommendation: SearchResultItem[];
  combined: SearchResultItem[];

  setName: ArtifactSet['name'];
};

export class SearchResultItem {
  constructor(
    character: Character,
    public score: number,
    public shouldSave: boolean,
    public setScore: number,
    public statScore: number,
  ) {
    this.characterName = character.name;
  }

  public characterName: Character['name'];
}

export type LastResult = {
  search: SearchResult;
  searchArtifactSets: SearchResultItem[];
  searchCharacterRecommendations: SearchResultItem[];
  piecesScore: number;
  mainStatRarity: number;
};
