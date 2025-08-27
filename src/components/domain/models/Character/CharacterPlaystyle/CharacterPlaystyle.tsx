import { useCallback } from "react";
import { ArtifactSet, Character, CharacterPlaystyle } from "@/common/models";
import { fromList } from "@/common/functions/strings";
import CharacterArtifactsPlaystylesTabBar from "../CharacterArtifactsSetsTabBar";
import { TalentImage } from "@/components/common/media/Images";

type Props = {
  character: Character;
  artifactSet?: ArtifactSet;

  showRecommendedArtifactSets?: boolean;
  showRecommendedTalentAscension?: boolean;
};

export default function CharacterPlaystyleComponent({
  character, artifactSet,
  showRecommendedArtifactSets,
  showRecommendedTalentAscension
}: Props) {
  if (!character.playstyle) return (
    <p className="character-playstyle character-result">
      No playstyle information available for {character.name}.
    </p>
  );

  if (artifactSet && !character.playstyle.recommendedArtifactSets.some(cSet => cSet.set.name === artifactSet.name)) return (
    <div className="character-playstyle character-result">
      <PlaystyleDescription playstyle={character.playstyle} />
      <span className="muted">
        {character.name} has no set that uses <b>{artifactSet?.name ?? 'this artifact'}</b>, but may benefit from its stats temporarily.
      </span>
    </div>
  );

  const { recommendedArtifactSets, talentPriorities } = character.playstyle;

  return (
    <div className='character-playstyle'>
      <PlaystyleDescription playstyle={character.playstyle} />
      {(showRecommendedArtifactSets || showRecommendedTalentAscension) && (
        <section className="playstyle-recommendations">
          {showRecommendedArtifactSets && (
            <div className="recommended-artifact-playstyles">
              <h4>Recommended Artifact Sets</h4>
              {recommendedArtifactSets.length > 0 ? (
                <CharacterArtifactsPlaystylesTabBar artifactSets={recommendedArtifactSets} />
              ) : (
                <p>No recommended artifact sets yet</p>
              )}
            </div>
          )}
          {showRecommendedTalentAscension && talentPriorities.length > 0 && (
            <div className="recommended-talent-ascension">
              <h4>Recommended Talent Ascension</h4>
              <ol className="recommended-talent-ascension__list">
                {talentPriorities.map((talent, index) => (
                  <li key={index} className="recommended-talent-ascension__item">
                    <TalentImage character={character} talent={talent} />
                    <span>{talent}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

type PlaystyleDescriptionProps = {
  playstyle: CharacterPlaystyle;
};

export function PlaystyleDescription({ playstyle }: PlaystyleDescriptionProps) {
  const { name, talentPriorities, talentStats } = playstyle;
  const [favoredAbility] = talentPriorities;

  return (
    <p className="character-playstyle__description">
      <span className='character-playstyle__name'>{name}</span> focused on
      <span className='character-playstyle__favoredAbility'>{favoredAbility}</span>, requiring
      <span className='character-playstyle__talentStats'>{fromList(talentStats)}</span>.
    </p>
  );
}