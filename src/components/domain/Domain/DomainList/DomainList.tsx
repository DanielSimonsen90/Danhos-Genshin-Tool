import { useDataStore, useDomainData } from "@/stores";
import DomainCard from "../DomainCard";
import TabBar from "@/components/common/TabBar";
import { SearchableMobList } from "@/components/common/SearchableList";

type Props = {
  artifactSetName: string;
  title: string;
  domainNames: string[];
}

export default function DomainList({ title = "Domains", domainNames, artifactSetName }: Props) {
  const DataStore = useDataStore();
  const { findDomainByName } = useDomainData();
  const checkIsBossDrop = (name: string) => name === 'BOSS_DROP';
  

  return (
    <section className="domain-list-section">
      <h2>{title}</h2>
      <TabBar tabs={create => domainNames.map(name => create(
        name,
        checkIsBossDrop(name) ? 'World Bosses' : name,
        checkIsBossDrop(name) 
          ? (
            <SearchableMobList items={DataStore.getMobsDroppingMaterial(artifactSetName)} cardProps={{ wrapInLink: true, showRegion: true }} />
          )
          : <DomainCard domain={findDomainByName(name)} showDescription showNavButton />
      ))}
      />
    </section>
  );
}