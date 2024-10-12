import { CharacterImage } from "@/components/common/Images";
import { CharacterUsingArtifactResult } from "@/services";
import { Link } from "react-router-dom";
import { effectivenessString } from '@/common/functions/strings';
import RarityList from "@/components/common/icons/Rarity";

type ArtifactSetsPiecesContentProps = {
  results: CharacterUsingArtifactResult[];
  displayPieces?: boolean;
};

export default function ArtifactSetsPiecesContent({ results, displayPieces }: ArtifactSetsPiecesContentProps) {
  return (
    <ul className="artifact-sets-pieces-content">
      {results.sort((a, b) => {
        const setA = a.character.sets.indexOf(a.set);
        const setB = b.character.sets.indexOf(b.set);
        return setA - setB;
      }).map(({ character, set, pieces }) => (
        <li className="artifact-sets-pieces-content__list-item" key={character.name}>
          <Link className="clickable" to={`/characters/${character.name}`}>
            <CharacterImage character={character.name} />
            <div className="artifact-sets-pieces-content__character-info">
              <header>
                <h3>{character.name}</h3>
                <RarityList rarity={character.rarity} />
              </header>
              <p>
                <span className="artifact-sets-pieces-content__set-name">
                  {set.name}
                </span>
                <span className="artifact-sets-pieces-content__set-effectiveness">
                  [{effectivenessString(character.sets.indexOf(set), true)}]
                </span>
              </p>
              {displayPieces && <p className="set-pieces">{pieces}-Piece</p>}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}