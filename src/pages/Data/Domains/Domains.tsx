import { ItemHeader } from "@/components/domain/Item";
import { useDomainData } from "@/stores";
import SearchableDomainList from "@/components/domain/SearchableList/SearchableLists/SearchableDomainList";

export default function Domains() {
  const domains = useDomainData().Domains;
  
  return (
    <>
      <ItemHeader item={domains} itemName="Domains" showItemName />
      <SearchableDomainList liClassName='domains-list-item' items={domains} placeholder="Search for a domain..." cardProps={{ 
        wrapInLink: true,
        showMinRewards: true,
      }} />
    </>
  );
}