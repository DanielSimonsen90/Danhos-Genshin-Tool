import { ArtifactSet, Character, CharacterSet } from "@/common/models";
import CharacterArtifactsSetsTabBar from "./CharacterArtifactsSetsTabBar";
import { fromList } from "@/common/functions/strings";

type Props = {
  character: Character;
  artifactSet: ArtifactSet
  set: CharacterSet | undefined;
};

export default function CharacterSetResult({ set, character, artifactSet }: Props) {
  if (!set) return (
    <p className="character-result">
      {character.name} has no set that uses {artifactSet.name}, but may benefit from its stats temporarily.
    </p>
  )

  const { name: setName, artifactSets, favoredAbility, onField, talentStats } = set;

  return (
    <div className='character-result'>
      <h3>{setName}</h3>
      <p>
        <span className='character-result__onField'>{onField ? 'On field' : 'Off-field'}</span> focused
        <span className='character-result__favoredAbility'>{favoredAbility}</span> ability priority, requiring
        <span className='character-result__talentStats'>{fromList(talentStats)}</span>.
      </p>
      <CharacterArtifactsSetsTabBar {...{
        character, artifactSets, set: artifactSet
      }} />
    </div>
  );
}