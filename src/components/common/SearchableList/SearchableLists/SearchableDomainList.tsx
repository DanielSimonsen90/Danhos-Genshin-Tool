import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Domain } from "@/common/models";
import { DomainCard } from "@/components/domain/Domain";
import { Props as DomainCardProps } from "@/components/domain/Domain/DomainCard/DomainCard";

import { useContextMenu } from "@/providers/ContextMenuProvider";
import { useFavoriteStore } from "@/stores";

import SearchableList from "../SearchableList";
import { OptionalProps, UncrontrolledProps } from "../Props";
import Star from "../../icons/Star";

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
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(new Array<Domain<any>>());
  const { add, remove, isFavorite } = useFavoriteStore('domains');

  return <SearchableList items={items} 
    sort={(a, b) => isFavorite(a) === isFavorite(b) ? 0 : isFavorite(a) ? -1 : 1}
    onSearchOrFilterChange={() => setHidden([])}
  renderItem={domain => {
    const open = useContextMenu(item => [
      item('option', 'View', () => navigate(`/domains/${domain.name}`), '👁️'),
      item('option', isFavorite(domain) ? 'Unfavorite' : 'Favorite', () => isFavorite(domain) ? remove(domain) : add(domain), '⭐'),
      item('option', 'Hide', () => setHidden([...hidden, domain]), '🙈'),
    ]);

    return hidden.includes(domain) ? null : (
      <div className="context-menu-item-container" onContextMenu={open}>
        {isFavorite(domain) && <Star className="favorite-star" onClick={() => remove(domain)} />}
        <DomainCard domain={domain} {...cardProps} />
      </div>
    );
  }}
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