import { Domain } from "@/common/models";
import { FilterObject } from "@/components/common/FormItems/Filter/Filter";
import { SortObject } from "@/components/common/FormItems/Sort/Sort";
import { Regions } from "@/data/regions";

export type DomainFilterKeys = 'type' | 'region';

export function getDomainFilterChecks(): FilterObject<DomainFilterKeys, Domain> {
  return {
    type: {
      artifacts: domain => domain.getDomainType() === 'Blessing',
      talents: domain => domain.getDomainType() === 'Mastery',
      weapons: domain => domain.getDomainType() === 'Forgery',
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
  };
}

export function getDomainSortChecks(): SortObject<Domain> {
  return {
    name: (a, b) => a.name.localeCompare(b.name),
    region: (a, b) => {
      const regionAIndex = Regions.findIndex(region => region === a.region);
      const regionBIndex = Regions.findIndex(region => region === b.region);
      return regionAIndex - regionBIndex;
    },
  };
}