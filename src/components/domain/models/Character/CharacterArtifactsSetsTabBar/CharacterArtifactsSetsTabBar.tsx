import { useMemo } from "react";

import { ArtifactSet, Character, CharacterArtifactSet } from "@/common/models";
import { classNames, effectivenessString } from "@/common/functions/strings";
import { generateId } from "@/common/functions/random";

import TabBar from "@/components/common/TabBar";
import { SearchResultItem } from "@/services";
import { Link } from "react-router-dom";
import { ArtifactImage } from "@/components/common/media/Images";
import { ROUTES } from "@/common/constants/routes";

type Props = {
  character: Character;
  set: ArtifactSet;
  artifactSets: SearchResultItem['set']['artifactSets'];
};

export default function CharacterArtifactsSetsTabBar({ character, set, artifactSets = [] }: Props) {
  const defaultTab = useMemo(() => {
    const foundEffectiveness = artifactSets.find(cSet => cSet.set.name === set?.name)?.effectiveness ?? CharacterArtifactSet.MOST_EFFECTIVE;
    return foundEffectiveness.toString();
  }, [artifactSets, set]);

  const content = useMemo(() => {
    const contentMap = artifactSets.reduce((acc, { pieces, set, effectiveness }) => acc.set(effectiveness, [
      ...(acc.get(effectiveness) || []),
      <Link to={`/${ROUTES.data_artifacts}/${set.name}`} key={`${character.name}-set-${set.name}-${generateId()}`}>
        <p className="set-short-description" title={classNames(
          ArtifactSet.bonusDescription(set, pieces),
          ArtifactSet.bonusDescription(set, pieces).endsWith('.') ? '' : '.'
        )}>
          <ArtifactImage set={set.name} piece="Flower" className="set-icon" />
          {pieces} piece {set.name}
        </p>
      </Link>
    ]), new Map<number, Array<JSX.Element>>());
    return [...contentMap.entries()].map(([key, content]) => [key.toString(), content] as const);
  }, [artifactSets]);

  return artifactSets.length
    ? <TabBar className="character-artifacts-sets-tab-bar"
      id={`${character.name}-artifacts-sets-${generateId()}`}
      defaultTab={defaultTab}
      tabs={create => artifactSets.map(({ effectiveness }) => create(
        effectiveness.toString(), 
        effectivenessString(effectiveness), 
        <>{content.find(([key]) => key === effectiveness.toString())?.[1]}</>
      ))}
    />
    : null;
}