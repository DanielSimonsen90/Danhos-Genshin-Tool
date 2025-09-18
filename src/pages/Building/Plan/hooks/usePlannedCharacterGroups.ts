import { Character, List } from "@/common/models";
import FarmableService from "@/services/FarmableService";
import { useCharacterData, useRegionData } from "@/stores";

type CharacterGroups = [
  highlighted: List<Character>,
  planned: List<Character>,
  remaining: List<Character>
];

type CharacterGroup = {
  title: string;
  characters: List<Character>;
};

class CharacterGroupsManager extends Array<CharacterGroup> {
  constructor(groups: CharacterGroups, titles: string[] = ['Highlighted', 'Planned', 'Remaining']) {
    super();

    for (let i = 0; i < groups.length; i++) {
      this.push({ title: titles[i], characters: groups[i] });
    }
  }
  public get highlighted() { return this[0] }
  public get planned() { return this[1] }
  public get remaining() { return this[2] }

  public hasPlannedCharacters() {
    return !!this.highlighted.characters.length || !!this.planned.characters.length;
  }
  public isPlannedCharacter(name: string) {
    return this.highlighted.characters.some(c => c.name === name) || this.planned.characters.some(c => c.name === name);
  }
}

export default function usePlannedCharacterGroups() {
  const { Characters } = useCharacterData();
  const farmableCharacters = FarmableService.useFarmableCharacters();

  const { plans = [] } = useRegionData();
  const isPlannedCharacter = (name: string) => plans.some(p => p.characterName === name);

  const groups = Characters.group(
    c => isPlannedCharacter(c.name) && farmableCharacters.some(fc => fc.name === c.name),
    c => isPlannedCharacter(c.name),
    () => true  
  ) as CharacterGroups;

  return new CharacterGroupsManager(groups);
}