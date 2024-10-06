import { useMemo } from "react";

import { ArtifactSet, Character } from "@/common/models";
import { classNames, effectivenessString } from "@/common/functions/strings";
import { generateId } from "@/common/functions/random";

import TabBar from "@/components/common/TabBar";
import { SearchResultItem } from "@/services";

type Props = {
  character: Character;
  set: ArtifactSet;
  artifactSets: SearchResultItem['set']['artifactSets'];
};

export default function CharacterArtifactsSetsTabBar({ character, set, artifactSets = [] }: Props) {
  const tabs = useMemo(() => artifactSets.map(({ effectiveness }) => [
    effectiveness.toString(), 
    effectivenessString(effectiveness)
  ] as [string, string]), [artifactSets]);
  const defaultTab = useMemo(() => {
    const foundEffectiveness = artifactSets.find(cSet => cSet.set.name === set?.name)?.effectiveness ?? -1;
    return foundEffectiveness.toString();
  }, [artifactSets, set]);

  const contents = useMemo(() => {
    const contentMap = artifactSets.reduce((acc, { pieces, set, effectiveness }) => acc.set(effectiveness, [
      ...(acc.get(effectiveness) || []),
      <p key={generateId()} title={classNames(
        ArtifactSet.bonusDescription(set, pieces),
        ArtifactSet.bonusDescription(set, pieces).endsWith('.') ? '' : '.'
      )}>
        <span className='character-details__set__pieces'>{pieces}</span> piece
        <span className='character-details__set__set'>{set.name}</span>
      </p>
    ]), new Map<number, Array<JSX.Element>>());
    return [...contentMap.entries()].reduce((acc, [key, content]) => ({
      ...acc,
      [key.toString()]: () => <>{content}</>
    }), {} as Record<string, JSX.Element>);
  }, [artifactSets]);

  return artifactSets.length 
    ? <TabBar id={`${character.name}-artifacts-sets-${generateId()}`} 
        defaultTab={defaultTab}
        tabs={tabs} {...contents} 
      /> 
    : null;
}