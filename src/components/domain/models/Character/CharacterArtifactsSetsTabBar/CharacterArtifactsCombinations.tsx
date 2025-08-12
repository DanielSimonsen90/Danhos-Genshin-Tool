import { useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/common/constants/routes";
import { ArtifactSet, Character, CharacterArtifactSet } from "@/common/models";

import { ArtifactImage } from "@/components/common/media/Images";

type Props = {
  character: Character;
  set: ArtifactSet;
  artifactSets: CharacterArtifactSet[];
};

type GroupedSet = {
  representative: CharacterArtifactSet;
  allSets: CharacterArtifactSet[];
  isGroup: boolean;
};

export default function CharacterArtifactsCombinations({ character, set, artifactSets = [] }: Props) {
  const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null);
  const [hoveredSetBonus, setHoveredSetBonus] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (groupId: string, setBonus?: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setHoveredGroupId(groupId);
    setHoveredSetBonus(setBonus || null);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setHoveredGroupId(null);
      setHoveredSetBonus(null);
      timeoutRef.current = null;
    }, 100);
  }; const groupedSets = useMemo(() => {
    const groups: { [key: string]: CharacterArtifactSet[]; } = {};

    artifactSets.forEach((artifactSet) => {
      if (artifactSet.pieces === 2) {
        // For 2-piece sets, group by effectiveness (original behavior)
        groups[artifactSet.effectiveness] ??= [];
        groups[artifactSet.effectiveness].push(artifactSet);
      } else {
        // For 4-piece sets, keep them separate
        const uniqueKey = `${artifactSet.set.name}-${artifactSet.pieces}-${artifactSet.effectiveness}`;
        groups[uniqueKey] = [artifactSet];
      }
    });

    return Object.values(groups).map((group): GroupedSet => ({
      representative: group[0],
      allSets: group,
      isGroup: group.length > 1
    }));
  }, [artifactSets]);

  if (!artifactSets.length) return null;

  return (
    <ul className="character-artifacts-combinations">
      {groupedSets.map(({ representative, allSets, isGroup }, key) => {
        const groupId = `group-${key}`;

        // For 2-piece combinations, find a second unique set
        const secondRepresentative = isGroup && representative.pieces === 2
          ? (
            allSets.find(cSet => cSet.set.twoPieceSetDescription !== representative.set.twoPieceSetDescription)
            || allSets.find(cSet => cSet.set.name !== representative.set.name)
          )
          : null; return (
            <li key={key}
              onMouseLeave={() => handleMouseLeave()}
              style={{ position: 'relative' }}
            >
              <Link to={`/${ROUTES.data_artifacts}/${representative.set.name}`} title={representative.set.name}>
                <div className="combination-container"
                  onMouseEnter={() => isGroup && handleMouseEnter(groupId, representative.set.twoPieceSetDescription)}
                >
                  <ArtifactImage set={representative.set.name} piece='Flower' />
                  <span className="piece">{representative.pieces}</span>
                </div>
                {secondRepresentative && (
                  <div className="combination-container"
                    onMouseEnter={() => isGroup && handleMouseEnter(groupId, secondRepresentative.set.twoPieceSetDescription)}
                  >
                    <ArtifactImage set={secondRepresentative.set.name} piece='Flower' />
                    <span className="piece">{secondRepresentative.pieces}</span>
                  </div>
                )}
                <span className="character-artifacts-combinations__effectiveness">
                  {representative.effectiveness}%
                </span>
              </Link>
              {/* Hover tooltip for grouped sets - positioned below */}
              {isGroup && hoveredGroupId === groupId && hoveredSetBonus && (
                <div
                  className="group-tooltip"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    marginTop: '8px',
                    zIndex: 1000
                  }}
                  onMouseEnter={() => handleMouseEnter(groupId, hoveredSetBonus)}
                  onMouseLeave={() => setHoveredGroupId(null)}
                >
                  <p>{hoveredSetBonus}</p>
                  <ul>
                    {allSets
                      .filter(artifactSet => artifactSet.set.twoPieceSetDescription === hoveredSetBonus)
                      .map(({ set }) => (
                        <li key={set.name}>
                          <Link to={`/${ROUTES.data_artifacts}/${set.name}`}>
                            <ArtifactImage set={set.name} piece='Flower' />
                            <span>{set.name}</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </li>
          );
      })}
    </ul>
  );
}