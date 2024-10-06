import { ArtifactSet, Character, CharacterSet } from "@/common/models";
import { fromList } from "@/common/functions/strings";
import CharacterArtifactsSetsTabBar from "../CharacterArtifactsSetsTabBar";

type Props = {
  character: Character;
  set: CharacterSet | undefined;
  artifactSet?: ArtifactSet;
};

export default function CharacterSetComponent({ set, character, artifactSet }: Props) {
  if (!set) return (
    <p className="character-result">
      {character.name} has no set that uses {artifactSet?.name ?? 'this artifact'}, but may benefit from its stats temporarily.
    </p>
  );

  const { name: setName, artifactSets, favoredAbility, onField, talentStats } = set;

  return (
    <div className='character-set'>
      <h3>{setName}</h3>
      <p>
        <span className='character-set__onField'>{onField ? 'On field' : 'Off-field'}</span> focused
        <span className='character-set__favoredAbility'>{favoredAbility}</span> ability priority, requiring
        <span className='character-set__talentStats'>{fromList(talentStats)}</span>.
      </p>
      <CharacterArtifactsSetsTabBar {...{
        character, artifactSets, set: artifactSet
      }} />
    </div>
  );
}