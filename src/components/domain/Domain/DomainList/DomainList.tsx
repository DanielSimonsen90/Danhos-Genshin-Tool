import { useDomainData } from "@/stores";
import DomainCard from "../DomainCard";
import TabBar from "@/components/common/TabBar";

type Props = {
  title: string;
  domainNames: string[];
}

export default function DomainList({ title = "Domains", domainNames }: Props) {
  const { findDomainByName } = useDomainData();

  return (
    <section className="domain-list-section">
      <h2>{title}</h2>
      <TabBar tabs={domainNames.map(name => [name, name])}
        {...domainNames.reduce((acc, name) => ({ 
          ...acc, 
          [name]: <DomainCard domain={findDomainByName(name)} /> 
        }), {} as any)}
      />
    </section>
  );
}