import { ArtifactSet } from "@/common/models";
import TabBar from "@/components/common/TabBar";
import { SearchService } from "@/services";
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
  const tabs = artifacts.map(artifact => [artifact.name, <ArtifactCard key={artifact.name} artifact={artifact} />] as [string, ReactNode]);
  const content = artifacts.reduce((acc, artifact) => {
    acc[artifact.name] = <SearchableList key={artifact.name}
      items={SearchService.getCharactersUsing(artifact.name, DataStore)}
      onSearch={(query, item) => item.character.name.toLowerCase().includes(query.toLowerCase())}
      renderItem={({ character, set, pieces, effectiveness }) => (
        <div className="character-result">
          <CharacterCard key={character.name} character={character} wrapInLink>
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
    />;
    return acc;
  }, {} as Record<string, ReactNode>);

  return <TabBar className="artifact-tab-bar" tabs={tabs} {...content} />;
}