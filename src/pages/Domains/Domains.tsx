import { useDomainData } from "@/stores";
import SearchableDomainList from "@/components/common/SearchableList/SearchableLists/SearchableDomainList";

export default function Domains() {
  const domains = useDomainData().Domains;
  return <SearchableDomainList liClassName='domains-list-item' items={domains} cardProps={{ wrapInLink: true }} />;
}