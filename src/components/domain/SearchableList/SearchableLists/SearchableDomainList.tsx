import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Domain } from "@/common/models";
import { DomainCard } from "@/components/domain/models/Domain";
import { Props as DomainCardProps } from "@/components/domain/models/Domain/DomainCard/DomainCard";

import { useContextMenu } from "@/providers/ContextMenuProvider";
import { useFavorite } from "@/stores";

import SearchableList from "@/components/domain/SearchableList/SearchableList";
import { OptionalProps, UncrontrolledProps } from "@/components/domain/SearchableList/Props";
import { FavoriteStar } from "@/components/common/media/icons/Star";

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
  const { query, filters } = useParams();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(new Array<Domain<any>>());
  const FavoriteStore = useFavorite('domains');

  return <SearchableList items={items ?? []}
    placeholder="Search domains..."
    sort={(a, b) => FavoriteStore.isFavorite(a) === FavoriteStore.isFavorite(b) ? 0 : FavoriteStore.isFavorite(a) ? -1 : 1}
    renderItem={domain => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/domains/${domain.name}`), '👁️'),
        item('option', FavoriteStore.isFavorite(domain) ? 'Unfavorite' : 'Favorite', () => FavoriteStore.isFavorite(domain) ? FavoriteStore.remove(domain) : FavoriteStore.add(domain), '⭐'),
        item('option', 'Hide', () => setHidden([...hidden, domain]), '🙈'),
      ]);      
      
      return hidden.includes(domain) ? null : (
        <div className="context-menu-item-container" onContextMenu={open}>
          {FavoriteStore.isFavorite(domain) && <FavoriteStar model={domain} />}
          <DomainCard domain={domain} {...cardProps} />
        </div>
      );
    }}
    search={query}
    filters={filters ? JSON.parse(filters) : {}}
    onSearchOrFilterChange={(search, filters) => {
      setHidden([]);
      navigate(`?query=${search}&filters=${JSON.stringify(filters)}`);
    }}
    onSearch={noBaseSearch ? onSearch ?? (() => true) : (query, item) => item.name.toLowerCase().includes(query.toLowerCase()) && (onSearch?.(query, item) ?? true)}
    filterChecks={noBaseFilterChecks ? filterChecks : {
      type: {
        artifacts: domain => domain.isBlessing(),
        talents: domain => domain.isMastery(),
        weapons: domain => domain.isForgery(),
      },
      region: {
        mondstadt: domain => domain.region === "Mondstadt",
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
