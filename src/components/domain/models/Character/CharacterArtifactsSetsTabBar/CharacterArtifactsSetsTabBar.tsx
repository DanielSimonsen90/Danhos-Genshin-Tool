import { useMemo } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/common/constants/routes";
import { generateId } from "@/common/functions/random";
import { ArtifactSet, Character, CharacterArtifactSet, List } from "@/common/models";
import { classNames } from "@/common/functions/strings";

import TabBar from "@/components/common/TabBar";
import { ArtifactImage } from "@/components/common/media/Images";

type Props = {
  character: Character;
  set: ArtifactSet;
  artifactSets: CharacterArtifactSet[];
};

export default function CharacterArtifactsSetsTabBar({ character, set, artifactSets = [] }: Props) {
  const defaultTab = useMemo(() => {
    const [foundEffectiveness] = artifactSets.sort((a, b) => b.effectiveness - a.effectiveness);
    return foundEffectiveness ? `${foundEffectiveness.effectiveness}%` : '0%';
  }, [artifactSets, set]);

  const content = useMemo(() => {
    const contentMap = artifactSets.reduce((acc, { pieces, set, effectiveness }) => acc.set(`${effectiveness.toString()}%`, [
      ...(acc.get(`${effectiveness.toString()}%`) || []),
      <Link to={`/${ROUTES.data_artifacts}/${set.name}`} key={`${character.name}-set-${set.name}-${generateId()}`}>
        <p className="set-short-description" title={classNames(
          ArtifactSet.bonusDescription(set, pieces),
          ArtifactSet.bonusDescription(set, pieces).endsWith('.') ? '' : '.'
        )}>
          <ArtifactImage set={set.name} piece="Flower" className="set-icon" />
          {pieces} piece {set.name}
        </p>
      </Link>
    ]), new Map<string, Array<JSX.Element>>());
    return [...contentMap.entries()];
  }, [artifactSets]);

  return artifactSets.length
    ? <TabBar className="character-artifacts-sets-tab-bar"
      id={`${character.name}-artifacts-sets-${generateId()}`}
      defaultTab={defaultTab}
      tabs={create => List
        .from(content)
        .map(([effectiveness, _content]) => create(
          effectiveness,
          effectiveness,
          <>{_content}</>
        ))
        .toArray()
      }
    />
    : null;
}