import { DomainCard } from "@/components/domain/Domain";
import ItemsPage from "../_Layout/ItemsPage";

export default function Domains() {
  return <ItemsPage itemsKey="Domains" Card={({ item }) => <DomainCard domain={item} wrapInLink />} />
}