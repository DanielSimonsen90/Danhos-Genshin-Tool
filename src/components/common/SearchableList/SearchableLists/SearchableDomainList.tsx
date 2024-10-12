import { Domain } from "@/common/models";
import SearchableList from "../SearchableList";
import { DomainCard } from "@/components/domain/Domain";
import { OptionalProps, UncrontrolledProps } from "../Props";
import { Props as DomainCardProps } from "@/components/domain/Domain/DomainCard/DomainCard";

type Props<TFilterKeys extends string> = (
  & Partial<UncrontrolledProps<Domain<any>, TFilterKeys>>
  & OptionalProps<Domain<any>, TFilterKeys>
  & {
    noBaseSearch?: boolean;
    noBaseFilterChecks?: boolean;
    cardProps?: Omit<DomainCardProps, 'domain'>;
  }
);
export default function SearchableDomainList<TFilterKeys extends string>({
  items, filterChecks = {} as any, onSearch,
  noBaseFilterChecks, noBaseSearch, cardProps,
  ...props
}: Props<TFilterKeys>) {
  return <SearchableList items={items} renderItem={domain => <DomainCard domain={domain} {...cardProps} />}
    onSearch={noBaseSearch ? onSearch : (query, item) => item.name.toLowerCase().includes(query.toLowerCase()) && (onSearch?.(query, item) ?? true)}
    filterChecks={noBaseFilterChecks ? filterChecks : {
      region: {
        monstadt: domain => domain.region === "Mondstadt",
        liyue: domain => domain.region === "Liyue",
        inazuma: domain => domain.region === "Inazuma",
        sumeru: domain => domain.region === "Sumeru",
        fontaine: domain => domain.region === "Fontaine",
        natlan: domain => domain.region === "Natlan",
        snezhnaya: domain => domain.region === "Snezhnaya",
      },
      ...filterChecks
    }}
    {...props}
  />;
}