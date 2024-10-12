import { DomainCard } from "@/components/domain/Domain";
import ItemsPage from "../_Layout/ItemsPage";

export default function Domains() {
  return <ItemsPage data="Domains" itemKey="domains" Card={({ item }) => <DomainCard domain={item} wrapInLink />} />
}