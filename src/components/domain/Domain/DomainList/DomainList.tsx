import { useDomainData } from "@/stores";
import DomainCard from "../DomainCard";
import TabBar from "@/components/common/TabBar";

type Props = {
  title: string;
  domainNames: string[];
} & {
  showDetails?: boolean;
  showRewards?: boolean;
};

export default function DomainList({ title = "Domains", domainNames, ...props }: Props) {
  const { findDomainByName } = useDomainData();
  const checkIsBossDrop = (name: string) => name === 'BOSS_DROP';

  return (
    <section className="domain-list-section">
      <h2>{title}</h2>
      <TabBar tabs={create => domainNames.map(name => create(
        name,
        checkIsBossDrop(name) ? 'World Bosses' : name,
        // TODO: Render custom component that displays "Dropped from bosses" + resin count
        checkIsBossDrop(name) ? <p>Dropped from world bosses.</p> : <DomainCard domain={findDomainByName(name)} {...props} showNavButton />
      ))}
      />
    </section>
  );
}