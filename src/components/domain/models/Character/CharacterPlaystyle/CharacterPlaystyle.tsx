import { ArtifactSet, Character } from "@/common/models";
import { fromList } from "@/common/functions/strings";
import CharacterArtifactsPlaystylesTabBar from "../CharacterArtifactsSetsTabBar";

type Props = {
  character: Character;
  artifactSet?: ArtifactSet;
};

export default function CharacterPlaystyleComponent({ character, artifactSet }: Props) {
  if (artifactSet && !character.playstyle.recommendedArtifactSets.some(cSet => cSet.set === artifactSet)) return (
    <p className="character-playstyle character-result">
      {character.name} has no set that uses {artifactSet?.name ?? 'this artifact'}, but may benefit from its stats temporarily.
    </p>
  );

  const { name, recommendedArtifactSets, talentPriorities, onField, talentStats } = character.playstyle;
  const [favoredAbility] = talentPriorities;

  return (
    <div className='character-playstyle'>
      <p>
        <span className='character-playstyle__name'>{name}</span> focused on
        <span className='character-playstyle__favoredAbility'>{favoredAbility}</span>, requiring
        <span className='character-playstyle__talentStats'>{fromList(talentStats)}</span>.
      </p>
      <section className="playstyle-recommendations">
        <div className="recommended-artifact-playstyles">
          <h4>Recommended Artifact Sets</h4>
          {recommendedArtifactSets.length > 0 ? (
            <CharacterArtifactsPlaystylesTabBar character={character} artifactSets={recommendedArtifactSets} set={artifactSet} />
          ) : (
            <p>No recommended artifact sets yet</p>
          )}
        </div>
        <div className="recommended-talent-ascension">
          <h4>Recommended Talent Ascension</h4>
          <ol className="recommended-talent-ascension__list">
            {talentPriorities.map((priority, index) => (
              <li key={index} className="recommended-talent-ascension__item">{priority}</li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}