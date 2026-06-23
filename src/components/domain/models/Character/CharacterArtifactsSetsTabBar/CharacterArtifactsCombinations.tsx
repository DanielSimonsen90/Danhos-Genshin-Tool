import { useMemo } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/common/constants/routes";
import { ArtifactSet, Character, CharacterArtifactSet } from "@/common/models";

import { ArtifactImage } from "@/components/common/media/Images";
import Popover from "@/components/common/Popover";

type Props = {
  artifactSets?: CharacterArtifactSet[];
};

type GroupedSet = {
  representative: CharacterArtifactSet;
  allSets: CharacterArtifactSet[];
  isGroup: boolean;
};

export default function CharacterArtifactsCombinations({ artifactSets = [] }: Props) {
  const groupedSets = useMemo(() => {
    const groups = artifactSets.reduce((acc, artifactSet) => {
      if (artifactSet.pieces === 2) {
        // For 2-piece sets, group by effectiveness (original behavior)
        acc[artifactSet.effectiveness] ??= Object.assign([], { effectiveness: artifactSet.effectiveness });
        acc[artifactSet.effectiveness].push(artifactSet);
      } else {
        // For 4-piece sets, keep them separate
        const uniqueKey = `${artifactSet.set.name}-${artifactSet.pieces}-${artifactSet.effectiveness}`;
        acc[uniqueKey] = [artifactSet];
      }

      return acc;
    }, {} as { [key: string]: (CharacterArtifactSet & { effectiveness: number; })[]; });

    return Object
      .values(groups)
      .sort((a, b) => b[0].effectiveness - a[0].effectiveness)
      .map((group): GroupedSet => ({
        representative: group[0],
        allSets: group,
        isGroup: group.length > 1
      }));
  }, [artifactSets]);

  const renderGroupTooltip = (setBonus: string, sets: CharacterArtifactSet[]) => (
    <div className="artifact-group-popover">
      <p>{setBonus}</p>
      <ul>
        {sets.map(({ set }) => (
          <li key={set.name}>
            <Link to={`/${ROUTES.data_artifacts}/${set.name}`}>
              <ArtifactImage set={set.name} piece='Flower' />
              <span>{set.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  if (!artifactSets.length) return null;

  return (
    <ul className="character-artifacts-combinations">
      {groupedSets.map(({ representative, allSets, isGroup }, key) => {
        // For 2-piece combinations, find a second unique set
        const secondRepresentative = isGroup && representative.pieces === 2
          ? (
            allSets.find(cSet => cSet.set.twoPieceSetDescription !== representative.set.twoPieceSetDescription)
            || allSets.find(cSet => cSet.set.name !== representative.set.name)
          )
          : null;

        const firstSetContent = isGroup && representative.pieces === 2
          ? renderGroupTooltip(
              representative.set.twoPieceSetDescription,
              allSets.filter(s => s.set.twoPieceSetDescription === representative.set.twoPieceSetDescription)
            )
          : null;

        const secondSetContent = secondRepresentative && isGroup
          ? renderGroupTooltip(
              secondRepresentative.set.twoPieceSetDescription,
              allSets.filter(s => s.set.twoPieceSetDescription === secondRepresentative.set.twoPieceSetDescription)
            )
          : null;

        return (
          <li key={key}>
            <Link to={`/${ROUTES.data_artifacts}/${representative.set.name}`}
              title={representative.set.name}
            >
              {firstSetContent ? (
                <Popover
                  trigger="hover"
                  position="bottom"
                  alignment="start"
                  content={firstSetContent}
                >
                  <div className="combination-container">
                    <ArtifactImage set={representative.set.name} piece='Flower' />
                    <span className="piece">{representative.pieces}</span>
                  </div>
                </Popover>
              ) : (
                <div className="combination-container">
                  <ArtifactImage set={representative.set.name} piece='Flower' />
                  <span className="piece">{representative.pieces}</span>
                </div>
              )}

              {secondRepresentative && (
                secondSetContent ? (
                  <Popover
                    trigger="hover"
                    position="bottom"
                    alignment="start"
                    content={secondSetContent}
                  >
                    <div className="combination-container">
                      <ArtifactImage set={secondRepresentative.set.name} piece='Flower' />
                      <span className="piece">{secondRepresentative.pieces}</span>
                    </div>
                  </Popover>
                ) : (
                  <div className="combination-container">
                    <ArtifactImage set={secondRepresentative.set.name} piece='Flower' />
                    <span className="piece">{secondRepresentative.pieces}</span>
                  </div>
                )
              )}

              <span className="character-artifacts-combinations__effectiveness">
                {representative.effectiveness}%
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}