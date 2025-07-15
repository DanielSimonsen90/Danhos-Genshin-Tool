import { ArtifactSet, Character, DomainReward, DomainType, Weapon } from "@/common/models";
import TabBar from "@/components/common/TabBar";
import ArtifactCard from "../../Artifacts/ArtifactCard";
import SearchableList from "@/components/common/SearchableList";
import { useDataStore } from "@/stores";
import { CharacterCard } from "../../Character";
import { effectivenessString } from "@/common/functions/strings";
import { MaterialCard } from "../../Material";
import { useCallback } from "react";
import { WeaponCard } from "../../Weapon";

type Props<TDomainType extends DomainType> = {
  domainType: TDomainType,
  rewards: Array<(
    TDomainType extends 'Blessing' ? ArtifactSet : Exclude<DomainReward, ArtifactSet>
  )>;
};


export default function DomainRewardsTabBar<TDomainType extends DomainType>({ rewards, domainType }: Props<TDomainType>) {
  switch (domainType) {
    case 'Blessing': return <ArtifactTabBar domainType='Blessing' rewards={rewards as Props<'Blessing'>['rewards']} />;
    case 'Forgery':
    case 'Mastery':
      return <AscensionMaterialTabBar domainType={domainType} rewards={rewards as Props<'Forgery' | 'Mastery'>['rewards']} />;
    default: return null;
  }
}

function AscensionMaterialTabBar({ rewards, domainType }: Props<'Forgery' | 'Mastery'>) {
  const DataStore = useDataStore();
  const getItems = useCallback((name: string) => (
    domainType === 'Mastery' ? DataStore.getCharactersUsingMaterial(name)
      : domainType === 'Forgery' ? DataStore.getWeaponsUsingMaterial(name)
        : undefined
  ), [DataStore]);

  return <TabBar className="domain-rewards-tab-bar"
    tabs={create => rewards.map(reward => create(
      reward.name,
      <MaterialCard key={reward.name} material={reward} allowCycle={false} />,
      <SearchableList key={reward.name}
        items={getItems(reward.name) as Array<(Character & Weapon)>}
        onSearch={(query, item) => item.name.toLowerCase().includes(query.toLowerCase())}
        renderItem={item => (
          item instanceof Character 
            ? <CharacterCard key={item.name} className="character-result" character={item} wrapInLink />
            : <WeaponCard key={(item as Weapon).name} className="weapon-result" weapon={item} wrapInLink />
        )}
      />
    ))}
    defaultTab={rewards.find(reward => reward.isObtainableToday())?.name}
  />;
}

function ArtifactTabBar({ rewards: artifacts }: Props<'Blessing'>) {
  const DataStore = useDataStore();

  return <TabBar className="domain-rewards-tab-bar"
    tabs={create => artifacts.map(artifact => create(
      artifact.name,
      <ArtifactCard key={artifact.name} artifact={artifact} nameTag="b" />,
      <SearchableList key={artifact.name}
        items={DataStore.getCharactersUsingArtifact(artifact.name)}
        onSearch={(query, item) => item.character.name.toLowerCase().includes(query.toLowerCase())}
        renderItem={({ character, set, pieces, effectiveness }) => (
          <CharacterCard key={character.name} className="character-result" character={character} wrapInLink>
            <p>
              <span className="character-info__name">{character.name}</span> is
              <span className="character-info__effectiveness">{effectivenessString(effectiveness)}</span> on a
              <span className="character-info__pieces">{pieces}-piece</span>
              <span className="character-info__artifact-name">{artifact.name}</span> using the
              <span className="character-info__set-name">{set.name}</span> set.
            </p>
          </CharacterCard>
        )}
      />
    ))}
  />;
}