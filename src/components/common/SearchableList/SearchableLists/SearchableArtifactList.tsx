import { ArtifactSet } from "@/common/models";
import SearchableList from "../SearchableList";
import { ArtifactCard } from "@/components/domain/Artifacts";
import { OptionalProps, UncrontrolledProps } from "../Props";
import { Props as ArtifactCardProps } from "@/components/domain/Artifacts/ArtifactCard/ArtifactCard";
import { Rarity } from "@/common/types";

type Props<TFilterKeys extends string> = (
  & Partial<UncrontrolledProps<ArtifactSet, TFilterKeys>>
  & OptionalProps<ArtifactSet, TFilterKeys>
  & {
    noBaseSearch?: boolean;
    noBaseFilterChecks?: boolean;
    cardProps?: Partial<Omit<ArtifactCardProps, 'artifact'>>
  }
);
export default function SearchableArtifactList<TFilterKeys extends string>({ 
  items, filterChecks = {} as any, onSearch,
  noBaseFilterChecks, noBaseSearch, cardProps,
  ...props
}: Props<TFilterKeys>) {
  return <SearchableList items={items} renderItem={artifact => <ArtifactCard artifact={artifact} {...cardProps} />}
    onSearch={noBaseSearch ? onSearch : (query, item) => item.name.toLowerCase().includes(query.toLowerCase()) && (onSearch?.(query, item) ?? true)}
    filterChecks={noBaseFilterChecks ? filterChecks : {
      obtainableThrough: {
        domains: artifact => artifact.domainNames.length > 0 && artifact.domainNames[0] !== "BOSS_DROP",
        boss: artifact => artifact.domainNames.length > 0 && artifact.domainNames.includes("BOSS_DROP"),
        crafting: artifact => artifact.isCraftable,
      },
      rarity: {
        legendary: artifact => artifact.rarity === Rarity.Legendary,
        epic: artifact => artifact.rarity === Rarity.Epic,
        rare: artifact => artifact.rarity === Rarity.Rare,
        uncommon: artifact => artifact.rarity === Rarity.Uncommon,
        common: artifact => artifact.rarity === Rarity.Common,
      },

      ...filterChecks
    }}
    {...props}
  />;
}