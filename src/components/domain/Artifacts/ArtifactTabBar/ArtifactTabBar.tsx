import { ArtifactSet } from "@/common/models";
import TabBar from "@/components/common/TabBar";
import ArtifactCard from "../ArtifactCard";
import SearchableList from "@/components/common/SearchableList";
import { useDataStore } from "@/stores";
import { CharacterCard } from "../../Character";
import { ReactNode } from "react";
import { effectivenessString } from "@/common/functions/strings";

type Props = {
  artifacts: ArtifactSet[];
};

export default function ArtifactTabBar({ artifacts }: Props) {
  const DataStore = useDataStore();

  return <TabBar className="artifact-tab-bar"
    tabs={create => artifacts.map(artifact => create(
      artifact.name,
      <ArtifactCard key={artifact.name} artifact={artifact} nameTag="b" />,
      <SearchableList key={artifact.name}
        items={DataStore.getCharactersUsingArtifact(artifact.name)}
        onSearch={(query, item) => item.character.name.toLowerCase().includes(query.toLowerCase())}
        renderItem={({ character, set, pieces, effectiveness }) => (
          <div key={character.name} className="character-result">
            <CharacterCard character={character} wrapInLink>
              <p>
                <span className="character-info__name">{character.name}</span> is
                <span className="character-info__effectiveness">{effectivenessString(effectiveness)}</span> on a
                <span className="character-info__pieces">{pieces}-piece</span>
                <span className="character-info__artifact-name">{artifact.name}</span> using the
                <span className="character-info__set-name">{set.name}</span> set.
              </p>
            </CharacterCard>
          </div>
        )}
      />
    ))}
  />;
}