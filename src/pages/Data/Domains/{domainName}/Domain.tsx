import { DomainCard } from "@/components/domain/Domain";
import ItemPage from "@/pages/_Layout/ItemPage";

export default function Domain() {
  return <ItemPage itemKeys="Domains" Card={({ item }) => <DomainCard domain={item} showDescription showRewards showCharactersBenefitFromRewards />} />
}