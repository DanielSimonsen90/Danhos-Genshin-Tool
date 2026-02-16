import StoreBuilder from "@/stores/StoreBuilder";
import { List } from "@/common/models";
import { findByName } from "../../DataStoreFunctions";
import * as DomainOfBlessingData from '@/data/domains/domain-of-blessing';
import * as DomainOfForgeryData from '@/data/domains/domain-of-forgery';
import * as DomainofMasteryData from '@/data/domains/domain-of-mastery';

const DomainsData = Object.assign({},
  DomainOfBlessingData,
  DomainOfForgeryData,
  DomainofMasteryData
);

export default new StoreBuilder()
  .addState({
    DomainsData,
    Domains: List.from(DomainsData),
    DomainNames: List.from(DomainsData).map(domain => domain.name),
  })
  .addApi(({ get }) => {
    return {
      findDomainByName(name: string, suppressWarning = false) {
        return findByName(get().Domains, name, suppressWarning);
      }
    };
  });